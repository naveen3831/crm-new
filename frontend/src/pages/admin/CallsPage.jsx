const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\CallsPage.tsx";import React, { useState, useEffect } from "react";
import { PhoneCall, } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";











export default function CallsPage() {
  const [calls, setCalls] = useState([]);

  const fetchCalls = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/call`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setCalls(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
            , React.createElement(PhoneCall, { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} ), " Telephony & Call Logs"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, "Record incoming inquiries, sales calls, and follow-up schedules"       )
        )
      )

      , React.createElement('div', { className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 overflow-x-auto shadow-xl"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
        , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
          , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
            , React.createElement('tr', { className: "border-b border-rose-500/10 text-slate-400 font-mono uppercase"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "Call ID" )
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "Client")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, "Type")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}, "Duration")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, "Purpose")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}, "Status")
            )
          )
          , React.createElement('tbody', { className: "divide-y divide-rose-500/10 text-slate-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
            , calls.map((c) => (
              React.createElement('tr', { key: c.id, className: "hover:bg-white/5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
                , React.createElement('td', { className: "py-3 font-mono text-rose-400 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}, c.id)
                , React.createElement('td', { className: "py-3 font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}, c.clientName)
                , React.createElement('td', { className: "py-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, React.createElement('span', { className: "px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, c.type || "Outgoing"))
                , React.createElement('td', { className: "py-3 font-mono text-slate-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}, c.duration || "12 mins")
                , React.createElement('td', { className: "py-3 text-slate-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, c.purpose || "Scope Review")
                , React.createElement('td', { className: "py-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, React.createElement('span', { className: "text-emerald-400 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, c.status || "Completed"))
              )
            ))
          )
        )
      )
    )
  );
}

