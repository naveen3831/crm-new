const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\admin\\tickets\\page.tsx";"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import { CheckCircle } from "lucide-react";









export default function AdminTickets() {
  const [tickets, setTickets] = useState([
    { id: "T-402", subject: "SMTP Configuration failing on seed logs", client: "Acme Corporation", severity: "high", status: "open" },
    { id: "T-401", subject: "Card payment failed on Stripe endpoint", client: "Vanguard Retail Inc", severity: "medium", status: "resolved" },
    { id: "T-400", subject: "Requesting API documentation details", client: "AeroSpace Logistics", severity: "low", status: "open" },
  ]);

  const resolveTicket = (id) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "resolved" } : t));
  };

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
      , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}, "Support Ticket Center"  )
      , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
        , tickets.map((t) => (
          React.createElement('div', { key: t.id, className: "p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
            , React.createElement('div', { className: "flex flex-col gap-1.5 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
                , React.createElement('span', { className: "text-[10px] font-mono bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, t.id)
                , React.createElement('h4', { className: "font-heading font-bold text-sm text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, t.subject)
                , React.createElement('span', { className: `text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                  t.severity === "high" ? "bg-red-100 text-red-600" :
                  t.severity === "medium" ? "bg-amber-100 text-amber-600" : "bg-teal-100 text-teal-600"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
                  , t.severity, " severity"
                )
              )
              , React.createElement('div', { className: "flex gap-4 text-gray-500 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "Submitted by: "  , React.createElement('strong', { className: "text-gray-700", __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, t.client))
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "Ticket status: "  , React.createElement('strong', { className: t.status === "open" ? "text-amber-600 font-semibold" : "text-green-600 font-semibold", __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, t.status))
              )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
              , t.status === "open" ? (
                React.createElement(Button, { onClick: () => resolveTicket(t.id), variant: "primary", size: "sm", className: "gap-1 flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
                  , React.createElement(CheckCircle, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}} ), " Resolve Ticket"
                )
              ) : (
                React.createElement('span', { className: "px-3 py-1 rounded bg-green-50 border border-green-200 text-green-600 font-bold uppercase text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}, "Resolved")
              )
            )
          )
        ))
      )
    )
  );
}

