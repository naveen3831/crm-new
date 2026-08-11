const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\admin\\customers\\page.tsx";"use client";

import React, { useState } from "react";
import { UserX, UserCheck } from "lucide-react";










export default function AdminCustomers() {
  const [customers, setCustomers] = useState([
    { id: "C-1002", name: "John Doe", company: "Acme Corporation", email: "john@acme.com", industry: "Manufacturing", status: "active" },
    { id: "C-1003", name: "Sarah Jenkins", company: "AeroSpace Logistics", email: "s.jenkins@aerolog.com", industry: "Transportation", status: "active" },
    { id: "C-1004", name: "Marcus Vance", company: "Vanguard Retail Inc", email: "m.vance@vanguard.com", industry: "Retail", status: "active" },
    { id: "C-1005", name: "Devin Miller", company: "Cyber Systems", email: "d.miller@cybersys.com", industry: "Technology", status: "suspended" },
  ]);

  const toggleCustomerStatus = (id) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === "active" ? "suspended" : "active" };
      }
      return c;
    }));
  };

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
      , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "Customer Profiles Database"  )
      , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
          , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
            , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, "Customer ID" )
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, "Name")
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, "Company")
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, "Email")
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, "Industry")
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "Status")
              , React.createElement('th', { className: "p-4 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "Actions")
            )
          )
          , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
            , customers.map((c) => (
              React.createElement('tr', { key: c.id, className: "border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
                , React.createElement('td', { className: "p-4 font-mono font-semibold text-teal-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, c.id)
                , React.createElement('td', { className: "p-4 font-bold text-navy-950"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}, c.name)
                , React.createElement('td', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, c.company)
                , React.createElement('td', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}, c.email)
                , React.createElement('td', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, c.industry)
                , React.createElement('td', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
                  , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                    c.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
                    , c.status
                  )
                )
                , React.createElement('td', { className: "p-4 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
                  , React.createElement('button', {
                    onClick: () => toggleCustomerStatus(c.id),
                    className: `inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                      c.status === "active" 
                        ? "bg-red-50 hover:bg-red-100 text-red-600" 
                        : "bg-green-50 hover:bg-green-100 text-green-600"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}

                    , c.status === "active" ? (
                      React.createElement(React.Fragment, null, React.createElement(UserX, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}} ), " Suspend" )
                    ) : (
                      React.createElement(React.Fragment, null, React.createElement(UserCheck, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}} ), " Activate" )
                    )
                  )
                )
              )
            ))
          )
        )
      )
    )
  );
}

