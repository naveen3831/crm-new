const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\InvoicesPage.tsx";import React, { useState, useEffect } from "react";
import { CreditCard, Search, Download, Eye, } from "lucide-react";
import { generateSpeshwayTaxInvoicePdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";













export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

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

  const handleDownloadInvoicePDF = async (inv) => {
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

  const handlePrintInvoicePDF = (inv) => {
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv);
    openPdfPrintPreview(pdfHtml);
  };

  const filteredInvoices = invoices.filter(inv =>
    (inv.number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.clientName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
            , React.createElement(CreditCard, { className: "text-emerald-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} ), " Invoices & Invoicing"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}, "Track financial invoices, taxes, and payment collection statuses"       )
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search invoices by number or client name..."      ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
        , filteredInvoices.map((inv) => (
          React.createElement('div', {
            key: inv.id || inv.number,
            className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl flex flex-col justify-between"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}

            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                  , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 block font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, inv.number || inv.id)
                  , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}, inv.clientName || "Enterprise Client")
                )
                , React.createElement('span', { className: `text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
                  , inv.status || "Pending"
                )
              )
              , inv.productName && (
                React.createElement('p', { className: "text-xs text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, "Product: " , React.createElement('span', { className: "text-slate-200 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, inv.productName))
              )
            )

            , React.createElement('div', { className: "space-y-3 pt-2 border-t border-rose-500/10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
              , React.createElement('div', { className: "flex items-center justify-between text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
                , React.createElement('span', { className: "text-[10px] text-slate-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}, "INVOICE TOTAL" )
                , React.createElement('span', { className: "text-base font-black text-rose-400 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}, "₹"
                  , Number(inv.amount || 15000).toLocaleString('en-IN')
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between gap-2 pt-2 border-t border-white/5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
                , React.createElement('button', {
                  onClick: () => handleDownloadInvoicePDF(inv),
                  disabled: downloadingId === (inv.id || inv.number),
                  className: "flex-1 px-3 py-1.5 rounded-lg bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}

                  , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} ), " " , downloadingId === (inv.id || inv.number) ? "Downloading..." : "Download PDF"
                )
                , React.createElement('button', {
                  onClick: () => handlePrintInvoicePDF(inv),
                  className: "px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1.5 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}

                  , React.createElement(Eye, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}} ), " View / Print"
                )
              )
            )
          )
        ))
      )
    )
  );
}

