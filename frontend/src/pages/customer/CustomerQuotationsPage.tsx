import React, { useState, useEffect } from "react";
import { FileText, Download, Eye, CheckCircle, XCircle } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Quotation {
  id: string;
  number: string;
  title: string;
  clientName: string;
  planAPrice?: number;
  planBPrice?: number;
  status: string;
}

export default function CustomerQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/crm/quotation`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setQuotations(res.data);
      })
      .catch(console.error);
  }, []);

  const handleDownloadPDF = async (quote: Quotation) => {
    setDownloadingId(quote.id || quote.number);
    try {
      const pdfHtml = generateSpeshwayEstimationPdfHtml(quote, null, [], 1.0);
      const filename = `${(quote.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_")}_${(quote.number || "Quotation").replace(/[^a-zA-Z0-9]/g, "_")}_Proposal.pdf`;
      await triggerDirectPdfDownload(pdfHtml, filename);
    } catch (err) {
      console.error("Quotation download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrintPDF = (quote: Quotation) => {
    const pdfHtml = generateSpeshwayEstimationPdfHtml(quote);
    openPdfPrintPreview(pdfHtml);
  };

  const handleAccept = async (quote: Quotation) => {
    try {
      await fetch(`${API_URL}/crm/quotation/${quote.id || quote.number}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quote, status: "Approved" })
      });
      setQuotations(prev => prev.map(q => (q.id === quote.id ? { ...q, status: "Approved" } : q)));
      alert("Proposal accepted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
          <FileText className="text-rose-400" /> My Quotation Proposals
        </h1>
        <p className="text-xs text-slate-400 mt-1">Review project scope deliverables, plan comparison tiers, and accept proposals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotations.map((q) => (
          <div key={q.id || q.number} className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold block">{q.number || q.id}</span>
                  <h3 className="text-sm font-bold text-white">{q.title}</h3>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {q.status || "Approved"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">PLAN A ESTIMATE</span>
                  <span className="font-bold text-amber-400">₹{Number(q.planAPrice || 50000).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">PLAN B ESTIMATE</span>
                  <span className="font-bold text-rose-400">₹{Number(q.planBPrice || 65000).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPDF(q)}
                  disabled={downloadingId === (q.id || q.number)}
                  className="px-3 py-1.5 rounded-lg bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"
                >
                  <Download size={13} /> {downloadingId === (q.id || q.number) ? "Downloading..." : "Download PDF"}
                </button>
                <button
                  onClick={() => handlePrintPDF(q)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1.5 transition-all text-xs"
                >
                  <Eye size={13} /> View / Print
                </button>
              </div>
              {q.status !== "Approved" && (
                <button
                  onClick={() => handleAccept(q)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 hover:opacity-90"
                >
                  <CheckCircle size={13} /> Accept Proposal
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

