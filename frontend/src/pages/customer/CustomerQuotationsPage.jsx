const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\customer\\CustomerQuotationsPage.tsx";import React, { useState, useEffect } from "react";
import { FileText, Download, Eye, CheckCircle, } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";











export default function CustomerQuotationsPage() {
  const [quotations, setQuotations] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/crm/quotation`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setQuotations(res.data);
      })
      .catch(console.error);
  }, []);

  const handleDownloadPDF = async (quote) => {
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

  const handlePrintPDF = (quote) => {
    const pdfHtml = generateSpeshwayEstimationPdfHtml(quote);
    openPdfPrintPreview(pdfHtml);
  };

  const handleAccept = async (quote) => {
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
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
        , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
          , React.createElement(FileText, { className: "text-rose-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} ), " My Quotation Proposals"
        )
        , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "Review project scope deliverables, plan comparison tiers, and accept proposals"         )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
        , quotations.map((q) => (
          React.createElement('div', { key: q.id || q.number, className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-4 shadow-xl flex flex-col justify-between"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
            , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
                  , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 font-bold block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, q.number || q.id)
                  , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, q.title)
                )
                , React.createElement('span', { className: "text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
                  , q.status || "Approved"
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/5 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
                  , React.createElement('span', { className: "text-[10px] text-slate-400 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, "PLAN A ESTIMATE"  )
                  , React.createElement('span', { className: "font-bold text-amber-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}, "₹", Number(q.planAPrice || 50000).toLocaleString('en-IN'))
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                  , React.createElement('span', { className: "text-[10px] text-slate-400 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, "PLAN B ESTIMATE"  )
                  , React.createElement('span', { className: "font-bold text-rose-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "₹", Number(q.planBPrice || 65000).toLocaleString('en-IN'))
                )
              )
            )

            , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
                , React.createElement('button', {
                  onClick: () => handleDownloadPDF(q),
                  disabled: downloadingId === (q.id || q.number),
                  className: "px-3 py-1.5 rounded-lg bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}

                  , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}} ), " " , downloadingId === (q.id || q.number) ? "Downloading..." : "Download PDF"
                )
                , React.createElement('button', {
                  onClick: () => handlePrintPDF(q),
                  className: "px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1.5 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}

                  , React.createElement(Eye, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}} ), " View / Print"
                )
              )
              , q.status !== "Approved" && (
                React.createElement('button', {
                  onClick: () => handleAccept(q),
                  className: "px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 hover:opacity-90"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}

                  , React.createElement(CheckCircle, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} ), " Accept Proposal"
                )
              )
            )
          )
        ))
      )
    )
  );
}

