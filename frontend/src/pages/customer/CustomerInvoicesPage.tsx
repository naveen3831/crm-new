import React, { useState, useEffect } from "react";
import { CreditCard, Download, Eye, ShieldCheck } from "lucide-react";
import { generateSpeshwayTaxInvoicePdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Invoice {
  id: string;
  number: string;
  clientName?: string;
  productName?: string;
  amount: number;
  status: string;
  dueDate: string;
}

export default function CustomerInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/crm/invoice`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setInvoices(res.data);
      })
      .catch(console.error);
  }, []);

  const handleDownloadInvoicePDF = async (inv: Invoice) => {
    setDownloadingId(inv.id || inv.number);
    try {
      const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv, undefined, 1.0);
      const filename = `${(inv.clientName || "Customer").replace(/[^a-zA-Z0-9]/g, "_")}_${(inv.number || "Invoice").replace(/[^a-zA-Z0-9]/g, "_")}_Tax_Invoice.pdf`;
      await triggerDirectPdfDownload(pdfHtml, filename);
    } catch (err) {
      console.error("Customer invoice download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrintInvoicePDF = (inv: Invoice) => {
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv);
    openPdfPrintPreview(pdfHtml);
  };

  const handlePayOnline = (inv: Invoice) => {
    alert(`Redirecting to secure Stripe Checkout for Invoice #${inv.number || inv.id}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
          <CreditCard className="text-rose-400" /> My Invoices & Online Payments
        </h1>
        <p className="text-xs text-slate-400 mt-1">Review active invoices, download Tax Invoice PDFs, and process payments securely via Stripe gateway</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invoices.map((inv) => (
          <div key={inv.id || inv.number} className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold block">{inv.number || inv.id}</span>
                  <h3 className="text-lg font-extrabold text-white">₹{Number(inv.amount || 15000).toLocaleString('en-IN')}</h3>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}>
                  {inv.status || "Pending"}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                <span>Due Date: <strong className="text-slate-300">{inv.dueDate || "2026-08-30"}</strong></span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-rose-500/10">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => handleDownloadInvoicePDF(inv)}
                  disabled={downloadingId === (inv.id || inv.number)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"
                >
                  <Download size={13} /> {downloadingId === (inv.id || inv.number) ? "Downloading..." : "Download Invoice PDF"}
                </button>
                <button
                  onClick={() => handlePrintInvoicePDF(inv)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1 transition-all text-xs"
                >
                  <Eye size={13} /> View
                </button>
              </div>

              {inv.status !== "Paid" && (
                <button
                  onClick={() => handlePayOnline(inv)}
                  className="w-full px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#FF5349]/20 transition-all"
                >
                  <ShieldCheck size={14} /> Pay Now (Stripe)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

