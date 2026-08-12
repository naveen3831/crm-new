const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\QuotationsPage.tsx";import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, Search, Download, Bot, Eye, Zap } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
















export default function QuotationsPage() {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get("id");

  const [quotations, setQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchQuotations = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/quotation`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setQuotations(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleGenerateAIProposal = async () => {
    setIsGeneratingAI(true);
    try {
      const aiRes = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-quote",
          actionType: "Generate Quotation",
          payload: { projectName: "Fintech Mobile & Web Ecosystem", clientName: "Quantum Capital" }
        })
      }).then(r => r.json());

      const newQuote = {
        id: `QT-AI-${Date.now().toString().slice(-4)}`,
        number: `QT-AI-${Date.now().toString().slice(-4)}`,
        title: "Fintech Mobile & Web Ecosystem Quotation Proposal",
        clientName: "Quantum Capital",
        projectName: "Fintech Mobile & Web Ecosystem",
        planAPrice: 50000,
        planBPrice: 65000,
        status: "Approved",
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        serviceItems: [
          { description: "Cross-Platform iOS & Android Native App", qty: 1, rate: 35000 },
          { description: "Secure Banking REST API & Microservices", qty: 1, rate: 25000 },
          { description: "Admin Financial Control Panel", qty: 1, rate: 15000 }
        ]
      };

      await fetch(`${API_URL}/crm/quotation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuote)
      });

      setQuotations(prev => [newQuote, ...prev]);
      alert("Quotation Agent successfully generated proposal!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleDownloadPDF = async (quote) => {
    setDownloadingId(quote.id || quote.number);
    try {
      const pdfHtml = generateSpeshwayEstimationPdfHtml(quote, null, [], 1.0);
      const filename = `${(quote.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_")}_${(quote.number || "Quotation").replace(/[^a-zA-Z0-9]/g, "_")}_Quotation.pdf`;
      await triggerDirectPdfDownload(pdfHtml, filename);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrintPDF = (quote) => {
    const pdfHtml = generateSpeshwayEstimationPdfHtml(quote);
    openPdfPrintPreview(pdfHtml);
  };

  const filteredQuotations = quotations.filter(q =>
    (q.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.clientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.number || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
            , React.createElement(FileText, { className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} ), " Quotation Proposal Studio"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Review multi-tier plan estimations, line-item budgets, and client proposals"        )
        )
        , React.createElement('button', {
          onClick: handleGenerateAIProposal,
          disabled: isGeneratingAI,
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto disabled:opacity-50"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}

          , React.createElement(Bot, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} ), " " , isGeneratingAI ? "AI Agent Drafting..." : "Generate AI Proposal"
        )
      )

      , highlightedId && (
        React.createElement('div', { className: "p-4 rounded-xl bg-gradient-to-r from-amber-950/80 to-blue-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between shadow-xl animate-in fade-in"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
            , React.createElement(Zap, { size: 18, className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Successfully generated & redirected to proposal "      , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "#", highlightedId), "!")
          )
          , React.createElement('span', { className: "font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, "Active Proposal" )
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search quotations by title, client, or quotation number..."       ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
        , filteredQuotations.map((quote) => {
          const isHighlighted = highlightedId && (quote.id === highlightedId || quote.number === highlightedId);
          return (
            React.createElement('div', {
              key: quote.id || quote.number,
              className: `rounded-2xl bg-[#071E34] p-5 space-y-4 transition-all shadow-xl ${
                isHighlighted
                  ? "border-2 border-amber-500 bg-amber-950/20 ring-2 ring-amber-500/30"
                  : "border border-rose-500/20 hover:border-rose-500/40"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}

              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                  , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 block font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}, quote.number || quote.id)
                  , React.createElement('h3', { className: "text-sm font-bold text-white leading-snug"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, quote.title)
                  , React.createElement('p', { className: "text-xs text-slate-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}, "Client: " , React.createElement('span', { className: "text-amber-300 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}, quote.clientName))
                )
                , React.createElement('span', { className: "text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
                  , quote.status || "Approved"
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                  , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}, "PLAN A ESTIMATE"  )
                  , React.createElement('span', { className: "font-bold text-amber-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, "₹", Number(quote.planAPrice || 50000).toLocaleString('en-IN'))
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                  , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}, "PLAN B ESTIMATE"  )
                  , React.createElement('span', { className: "font-bold text-rose-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}, "₹", Number(quote.planBPrice || 65000).toLocaleString('en-IN'))
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between pt-2 border-t border-rose-500/10 text-xs gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
                , React.createElement('span', { className: "text-[10px] text-slate-500 font-mono hidden sm:inline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, "Valid Until: "  , quote.validUntil || "30 Days")
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
                  , React.createElement('button', {
                    onClick: () => handleDownloadPDF(quote),
                    disabled: downloadingId === (quote.id || quote.number),
                    className: "px-3 py-1.5 rounded-lg bg-[#FF5349] hover:bg-[#e04940] text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-md disabled:opacity-50"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}

                    , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}} ), " " , downloadingId === (quote.id || quote.number) ? "Downloading..." : "Download PDF"
                  )
                  , React.createElement('button', {
                    onClick: () => handlePrintPDF(quote),
                    className: "px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1.5 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}

                    , React.createElement(Eye, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}} ), " View / Print"
                  )
                )
              )
            )
          );
        })
      )
    )
  );
}

