const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\ProposalsPage.tsx";import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Search, ArrowRight, } from "lucide-react";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";















export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    projectName: "",
    clientName: "",
    projectType: "Website Application",
    planAPrice: 50000,
    planBPrice: 65000
  });

  const fetchProposals = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/quotation`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setProposals(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleCreateProposal = async (e) => {
    e.preventDefault();
    const propId = `PROP-${Date.now().toString().slice(-4)}`;

    const newProp = {
      id: propId,
      number: propId,
      title: form.title || `${form.projectName || "Project"} Proposal`,
      projectName: form.projectName || "Project",
      clientName: form.clientName || "Enterprise Client",
      projectType: form.projectType,
      currency: "Indian Rupees (INR)",
      planAName: `PLAN A — ${form.projectType}`,
      planAPrice: form.planAPrice,
      planBName: `PLAN B — ${form.projectType} Ecosystem`,
      planBPrice: form.planBPrice,
      status: "Approved",
      discount: 0,
      tax: 18,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      documentRef: `SPW/EST/${(form.projectName || "PROP").toUpperCase().replace(/[^A-Z0-9]/g, '')}/2026`,
      overviewNarrative: `${form.projectType} proposal engineered for ${form.projectName || "Project"}. Delivered with modern architecture, security standards, and comprehensive quality assurance.`,
      serviceItems: [
        { description: "Core Architecture & UI Design", qty: 1, rate: Math.round(form.planAPrice * 0.4) },
        { description: "REST Microservices API & Database", qty: 1, rate: Math.round(form.planAPrice * 0.3) },
        { description: "Admin Governance Panel & Security", qty: 1, rate: Math.round(form.planAPrice * 0.3) }
      ],
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      await fetch(`${API_URL}/crm/quotation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProp)
      });

      // Navigate directly to the 8-section Proposal Studio for this proposal
      navigate(`/admin/proposals/${propId}`);
    } catch (err) {
      console.error(err);
      navigate(`/admin/proposals/${propId}`);
    }
  };

  const filteredProposals = proposals.filter(p =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.clientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.number || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
            , React.createElement(FileText, { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} ), " Proposals & Estimation Studio"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}, "Manage 8-section executive proposals, plan comparison matrices, and live PDF document previews"           )
        )
        , React.createElement('button', {
          onClick: () => setShowCreateModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} ), " Create New Proposal"
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search proposals by title, client name, or document ID..."        ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B2369] border border-white/10 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F05454]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
        , filteredProposals.map((prop) => (
          React.createElement('div', {
            key: prop.id || prop.number,
            className: "rounded-2xl bg-[#0B2369] text-white border border-white/10 p-5 space-y-4 hover:border-white/30 transition-all shadow-xl flex flex-col justify-between group"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}

            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                , React.createElement('span', { className: "text-[10px] font-mono text-blue-200 font-bold bg-white/10 px-2 py-0.5 rounded border border-white/10"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                  , prop.number || prop.id
                )
                , React.createElement('span', { className: "text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                  , prop.status || "Approved"
                )
              )
              , React.createElement('h3', { className: "text-sm font-bold text-white group-hover:text-[#F05454] transition-colors leading-snug"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
                , prop.title
              )
              , React.createElement('p', { className: "text-xs text-slate-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, "Client: " , React.createElement('span', { className: "text-white font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, prop.clientName))
            )

            , React.createElement('div', { className: "grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/10 text-xs font-mono"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                , React.createElement('span', { className: "text-[9px] text-slate-300 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}, "PLAN A" )
                , React.createElement('span', { className: "font-bold text-[#F05454]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, "₹", Number(prop.planAPrice || 50000).toLocaleString('en-IN'))
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
                , React.createElement('span', { className: "text-[9px] text-slate-300 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, "PLAN B" )
                , React.createElement('span', { className: "font-bold text-blue-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, "₹", Number(prop.planBPrice || 65000).toLocaleString('en-IN'))
              )
            )

            , React.createElement('div', { className: "pt-2 border-t border-white/10 flex items-center justify-between"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
              , React.createElement('span', { className: "text-[10px] text-slate-300 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}, "8 Sections Studio"  )
              , React.createElement('button', {
                onClick: () => navigate(`/admin/proposals/${prop.id || prop.number}`),
                className: "px-3.5 py-1.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-extrabold text-xs flex items-center gap-1 shadow-md shadow-[#FF5349]/20 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
, "Open Proposal Studio "
                   , React.createElement(ArrowRight, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}} )
              )
            )
          )
        ))
      )

      , showCreateModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
          , React.createElement('div', { className: "bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
              , React.createElement(Plus, { size: 20, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}} ), " Initialize Proposal Document"
            )
            , React.createElement('form', { onSubmit: handleCreateProposal, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}, "Proposal Title *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.title,
                  onChange: e => setForm({ ...form, title: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "Tours and Travels - Website Application Quotation"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}, "Project Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.projectName,
                  onChange: e => setForm({ ...form, projectName: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "Tours and Travels"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}, "Client Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.clientName,
                  onChange: e => setForm({ ...form, clientName: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "Enterprise Client" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}, "Scope Type" )
                , React.createElement('select', {
                  value: form.projectType,
                  onChange: e => setForm({ ...form, projectType: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}

                  , React.createElement('option', { value: "Website Application" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}, "Website Application" )
                  , React.createElement('option', { value: "Mobile Application" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}, "Mobile Application" )
                  , React.createElement('option', { value: "Web & Mobile Application"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}, "Web & Mobile Application"   )
                  , React.createElement('option', { value: "Custom ERP & AI Suite"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}, "Custom ERP & AI Suite"    )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowCreateModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-bold shadow-md"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}
, "Open Proposal Studio →"

                )
              )
            )
          )
        )
      )
    )
  );
}

