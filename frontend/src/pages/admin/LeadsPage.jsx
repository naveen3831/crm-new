const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\LeadsPage.tsx";import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Search, Bot, } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";














export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isQualifying, setIsQualifying] = useState(false);

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    source: "Website",
    expectedBudget: 45000,
    priority: "High",
    status: "New"
  });

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/lead`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setLeads(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e) => {
    e.preventDefault();
    const newLead = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      ...form,
      leadScore: Math.floor(Math.random() * 30) + 70
    };

    try {
      const res = await fetch(`${API_URL}/crm/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      }).then(r => r.json());

      const saved = res.data || newLead;
      setLeads(prev => [saved, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunLeadAgent = async (lead) => {
    setIsQualifying(true);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-lead",
          actionType: "Score Lead",
          payload: { name: lead.name, company: lead.companyName, budget: lead.expectedBudget }
        })
      }).then(r => r.json());

      alert(res.result || "Lead Qualification Agent executed successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsQualifying(false);
    }
  };

  const filteredLeads = leads.filter(l =>
    (l.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.companyName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
            , React.createElement(TrendingUp, { className: "text-purple-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}} ), " Sales Lead Pipeline"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}, "Qualify leads, score opportunities, and track deal conversions"       )
        )
        , React.createElement('button', {
          onClick: () => setShowAddModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}} ), " Register New Lead"
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search leads by name or company..."     ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
        , filteredLeads.map((lead) => (
          React.createElement('div', {
            key: lead.id,
            className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}

            , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
                , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, lead.name)
                , React.createElement('p', { className: "text-xs text-purple-400 font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, lead.companyName)
              )
              , React.createElement('div', { className: "text-right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                , React.createElement('span', { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 block"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, "Score: "
                   , lead.leadScore || 85
                )
              )
            )

            , React.createElement('div', { className: "space-y-1 text-xs text-slate-300 pt-2 border-t border-rose-500/10"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
                , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}, "Budget:")
                , React.createElement('span', { className: "font-bold text-emerald-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, "₹", Number(lead.expectedBudget || 0).toLocaleString('en-IN'))
              )
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}
                , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}, "Source:")
                , React.createElement('span', { className: "text-slate-300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}, lead.source)
              )
            )

            , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
              , React.createElement('span', { className: "text-[10px] text-slate-500 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, "ID: " , lead.id)
              , React.createElement('button', {
                onClick: () => handleRunLeadAgent(lead),
                disabled: isQualifying,
                className: "px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold border border-purple-500/30 flex items-center gap-1 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}

                , React.createElement(Bot, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}} ), " AI Score"
              )
            )
          )
        ))
      )

      , showAddModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
          , React.createElement('div', { className: "bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}, "Register New Sales Lead"   )
            , React.createElement('form', { onSubmit: handleCreateLead, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}, "Contact Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.name,
                  onChange: e => setForm({ ...form, name: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, "Company Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.companyName,
                  onChange: e => setForm({ ...form, companyName: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}, "Email")
                  , React.createElement('input', {
                    type: "email",
                    value: form.email,
                    onChange: e => setForm({ ...form, email: e.target.value }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}
                  )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}, "Budget ($)" )
                  , React.createElement('input', {
                    type: "number",
                    value: form.expectedBudget,
                    onChange: e => setForm({ ...form, expectedBudget: Number(e.target.value) }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}
                  )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowAddModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
, "Save Lead"

                )
              )
            )
          )
        )
      )
    )
  );
}

