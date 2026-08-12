const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\customer\\CustomerInvoicesPage.tsx";import React, { useState, useEffect } from "react";
import { CreditCard, Download, Eye, ShieldCheck } from "lucide-react";
import { generateSpeshwayTaxInvoicePdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";











export default function CustomerInvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/crm/invoice`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setInvoices(res.data);
      })
      .catch(console.error);
  }, []);

  const handleDownloadInvoicePDF = async (inv) => {
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

  const handlePrintInvoicePDF = (inv) => {
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv);
    openPdfPrintPreview(pdfHtml);
  };

  const handlePayOnline = (inv) => {
    alert(`Redirecting to secure Stripe Checkout for Invoice #${inv.number || inv.id}...`);
  };

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
        , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
          , React.createElement(CreditCard, { className: "text-rose-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} ), " My Invoices & Online Payments"
        )
        , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "Review active invoices, download Tax Invoice PDFs, and process payments securely via Stripe gateway"             )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
        , invoices.map((inv) => (
          React.createElement('div', { key: inv.id || inv.number, className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-4 shadow-xl flex flex-col justify-between"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
                  , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 font-bold block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}, inv.number || inv.id)
                  , React.createElement('h3', { className: "text-lg font-extrabold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "₹", Number(inv.amount || 15000).toLocaleString('en-IN'))
                )
                , React.createElement('span', { className: `text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
                  , inv.status || "Pending"
                )
              )
              , React.createElement('div', { className: "text-xs text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, "Due Date: "  , React.createElement('strong', { className: "text-slate-300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, inv.dueDate || "2026-08-30"))
              )
            )

            , React.createElement('div', { className: "space-y-2 pt-3 border-t border-rose-500/10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
              , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
                , React.createElement('button', {
                  onClick: () => handleDownloadInvoicePDF(inv),
                  disabled: downloadingId === (inv.id || inv.number),
                  className: "flex-1 px-3 py-1.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}

                  , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}} ), " " , downloadingId === (inv.id || inv.number) ? "Downloading..." : "Download Invoice PDF"
                )
                , React.createElement('button', {
                  onClick: () => handlePrintInvoicePDF(inv),
                  className: "px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}

                  , React.createElement(Eye, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}} ), " View"
                )
              )

              , inv.status !== "Paid" && (
                React.createElement('button', {
                  onClick: () => handlePayOnline(inv),
                  className: "w-full px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#FF5349]/20 transition-all"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}

                  , React.createElement(ShieldCheck, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}} ), " Pay Now (Stripe)"
                )
              )
            )
          )
        ))
      )
    )
  );
}

