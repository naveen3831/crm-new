import React, { useState, useEffect } from "react";
import { CreditCard, Plus, Search, DollarSign, Download, Eye, CheckCircle, Clock } from "lucide-react";
import { generateSpeshwayTaxInvoicePdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  productName?: string;
  amount: number;
  tax?: number;
  status: string;
  dueDate: string;
  date?: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/invoice`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setInvoices(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDownloadInvoicePDF = async (inv: Invoice) => {
    setDownloadingId(inv.id || inv.number);
    try {
      const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv, undefined, 1.0);
      const filename = `${(inv.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_")}_${(inv.number || "Invoice").replace(/[^a-zA-Z0-9]/g, "_")}_Tax_Invoice.pdf`;
      await triggerDirectPdfDownload(pdfHtml, filename);
    } catch (err) {
      console.error("Invoice download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrintInvoicePDF = (inv: Invoice) => {
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv);
    openPdfPrintPreview(pdfHtml);
  };

  const filteredInvoices = invoices.filter(inv =>
    (inv.number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.clientName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <CreditCard className="text-emerald-400" /> Invoices & Invoicing
          </h1>
          <p className="text-xs text-slate-400 mt-1">Track financial invoices, taxes, and payment collection statuses</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search invoices by number or client name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id || inv.number}
            className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 block font-bold">{inv.number || inv.id}</span>
                  <h3 className="text-sm font-bold text-white">{inv.clientName || "Enterprise Client"}</h3>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}>
                  {inv.status || "Pending"}
                </span>
              </div>
              {inv.productName && (
                <p className="text-xs text-slate-400">Product: <span className="text-slate-200 font-semibold">{inv.productName}</span></p>
              )}
            </div>

            <div className="space-y-3 pt-2 border-t border-rose-500/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500">INVOICE TOTAL</span>
                <span className="text-base font-black text-rose-400 font-heading">
                  ₹{Number(inv.amount || 15000).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => handleDownloadInvoicePDF(inv)}
                  disabled={downloadingId === (inv.id || inv.number)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"
                >
                  <Download size={13} /> {downloadingId === (inv.id || inv.number) ? "Downloading..." : "Download PDF"}
                </button>
                <button
                  onClick={() => handlePrintInvoicePDF(inv)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1.5 transition-all text-xs"
                >
                  <Eye size={13} /> View / Print
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

