const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\customer\\tickets\\page.tsx";"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import GlassCard from "../../../components/ui/GlassCard";








export default function CustomerTickets() {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const [tickets, setTickets] = useState([
    { id: "#1040", subject: "Invoice Dispute", date: "June 24, 2026", status: "resolved" },
    { id: "#0921", subject: "Portal Access Restrict", date: "May 12, 2026", status: "closed" },
  ]);

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketBody.trim()) return;

    // Append to list
    const newTicket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: "open",
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketSuccess(true);
    setTicketSubject("");
    setTicketBody("");

    setTimeout(() => {
      setTicketSuccess(false);
    }, 4000);
  };

  return (
    React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-3 gap-8"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
      /* Ticket form */
      , React.createElement(GlassCard, { className: "lg:col-span-2 p-6 bg-white/50 border border-gray-200"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
        , React.createElement('h3', { className: "font-heading font-bold text-base text-navy-950 mb-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "Raise Support Ticket"  )
        , React.createElement('form', { onSubmit: handleRaiseTicket, className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
          , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
            , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, "Subject / Ticket Title *"    )
            , React.createElement('input', { 
              type: "text", 
              required: true,
              placeholder: "Short description of the technical issue"     ,
              value: ticketSubject,
              onChange: (e) => setTicketSubject(e.target.value),
              className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-navy-950 placeholder:text-gray-400 focus:outline-none focus:border-teal-500"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            )
          )
          , React.createElement('div', { className: "flex flex-col gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
            , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, "Ticket Description *"  )
            , React.createElement('textarea', { 
              required: true,
              rows: 4,
              placeholder: "Provide details regarding steps to reproduce or invoices related..."        ,
              value: ticketBody,
              onChange: (e) => setTicketBody(e.target.value),
              className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-xs text-navy-950 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 resize-none"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
            )
          )

          , ticketSuccess && (
            React.createElement('div', { className: "text-[11px] text-green-600 bg-green-50 border border-green-200 p-2.5 rounded-xl font-medium"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}, "Ticket submitted successfully! Support staff will contact you shortly."

            )
          )

          , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}, "Submit Ticket"

          )
        )
      )

      /* Ticket log */
      , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        , React.createElement('h3', { className: "font-heading font-bold text-sm text-navy-950 px-2 uppercase tracking-wide"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, "My Ticket Logs"  )
        , tickets.map((t) => (
          React.createElement('div', { key: t.id, className: "p-4 rounded-xl bg-white border border-gray-250 shadow-sm flex items-center justify-between text-xs gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
              , React.createElement('h4', { className: "font-bold text-navy-950" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, t.id, ": " , t.subject)
              , React.createElement('span', { className: "text-[10px] text-gray-400 mt-1 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}, "Submitted: " , t.date)
            )
            , React.createElement('span', { className: `text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
              t.status === "resolved" ? "bg-green-50 text-green-600" :
              t.status === "open" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
              , t.status
            )
          )
        ))
      )
    )
  );
}

