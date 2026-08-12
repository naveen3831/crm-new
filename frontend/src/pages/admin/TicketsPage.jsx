const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\TicketsPage.tsx";import React, { useState, useEffect } from "react";
import { TicketCheck, Search, Bot, } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";










export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDraftingAI, setIsDraftingAI] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/ticket`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setTickets(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDraftAIResponse = async (ticket) => {
    setIsDraftingAI(true);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-support",
          actionType: "Draft Ticket Response",
          payload: { ticketId: ticket.id, subject: ticket.subject }
        })
      }).then(r => r.json());

      alert(res.result || "Support Desk Agent generated draft resolution note!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsDraftingAI(false);
    }
  };

  const filteredTickets = tickets.filter(t =>
    (t.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.clientName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
            , React.createElement(TicketCheck, { className: "text-rose-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} ), " Customer Support Queue"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "Manage technical tickets, SLA resolutions, and AI response drafts"        )
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search tickets by subject or client..."     ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
        , filteredTickets.map((t) => (
          React.createElement('div', {
            key: t.id,
            className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}

            , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 font-bold block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, t.id)
                , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, t.subject)
                , React.createElement('p', { className: "text-xs text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, t.clientName)
              )
              , React.createElement('span', { className: "text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
                , t.priority || "High"
              )
            )

            , React.createElement('p', { className: "text-xs text-slate-400 line-clamp-2 leading-relaxed"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
              , t.description || "Client requested technical investigation regarding API configuration."
            )

            , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
              , React.createElement('span', { className: "text-[10px] text-slate-500 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, "Status: " , t.status || "Open")
              , React.createElement('button', {
                onClick: () => handleDraftAIResponse(t),
                disabled: isDraftingAI,
                className: "px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1 transition-all text-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}

                , React.createElement(Bot, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} ), " AI Reply"
              )
            )
          )
        ))
      )
    )
  );
}

