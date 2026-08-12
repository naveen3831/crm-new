const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\customer\\CustomerTicketsPage.tsx";import React, { useState, useEffect } from "react";
import { TicketCheck, Plus, } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";









export default function CustomerTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: "", description: "", priority: "Medium" });

  useEffect(() => {
    fetch(`${API_URL}/crm/ticket`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setTickets(res.data);
      })
      .catch(console.error);
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const newTck = {
      id: `TCK-${Date.now().toString().slice(-4)}`,
      ...form,
      status: "Open"
    };

    try {
      await fetch(`${API_URL}/crm/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTck)
      });
      setTickets(prev => [newTck, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
      , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
            , React.createElement(TicketCheck, { className: "text-purple-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}} ), " Support Tickets"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "Submit technical questions and follow support resolution progress"       )
        )
        , React.createElement('button', {
          onClick: () => setShowModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} ), " Raise Support Ticket"
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
        , tickets.map((t) => (
          React.createElement('div', { key: t.id, className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-3 shadow-xl"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
            , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
                , React.createElement('span', { className: "text-[10px] font-mono text-purple-400 font-bold block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}, t.id)
                , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}, t.subject)
              )
              , React.createElement('span', { className: "text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
                , t.status || "Open"
              )
            )
            , React.createElement('p', { className: "text-xs text-slate-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, t.description)
          )
        ))
      )

      , showModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
          , React.createElement('div', { className: "bg-[#0b101f] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, "Raise Support Ticket"  )
            , React.createElement('form', { onSubmit: handleCreateTicket, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, "Subject / Issue Title *"    )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.subject,
                  onChange: e => setForm({ ...form, subject: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-rose-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, "Detailed Description *"  )
                , React.createElement('textarea', {
                  required: true, rows: 3,
                  value: form.description,
                  onChange: e => setForm({ ...form, description: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-rose-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
, "Submit Ticket"

                )
              )
            )
          )
        )
      )
    )
  );
}

