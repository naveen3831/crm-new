const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\admin\\invoices\\page.tsx";"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import { Plus } from "lucide-react";









export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([
    { id: "INV-1024", client: "Acme Corporation", value: 4500, due: "July 30, 2026", status: "pending" },
    { id: "INV-0982", client: "AeroSpace Logistics", value: 1200, due: "June 30, 2026", status: "paid" },
    { id: "INV-0981", client: "Vanguard Retail Inc", value: 3500, due: "June 15, 2026", status: "paid" },
  ]);

  const handleCreateInvoice = () => {
    const newInvoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      client: "New Customer LLC",
      value: Math.floor(1000 + Math.random() * 8000),
      due: "August 15, 2026",
      status: "pending",
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
      , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "Billing Invoices Ledger"  )
        , React.createElement(Button, { onClick: handleCreateInvoice, variant: "primary", size: "sm", className: "gap-1.5 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
          , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} ), " Create Invoice"
        )
      )
      , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
        , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
          , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
            , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "Invoice ID" )
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "Client")
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, "Due Date" )
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}, "Total Amount" )
              , React.createElement('th', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "Status")
            )
          )
          , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
            , invoices.map((inv) => (
              React.createElement('tr', { key: inv.id, className: "border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
                , React.createElement('td', { className: "p-4 font-mono font-semibold text-teal-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, inv.id)
                , React.createElement('td', { className: "p-4 font-bold text-navy-950"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, inv.client)
                , React.createElement('td', { className: "p-4 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}, inv.due)
                , React.createElement('td', { className: "p-4 font-bold text-navy-950"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "₹", inv.value.toLocaleString('en-IN'), ".00")
                , React.createElement('td', { className: "p-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
                  , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                    inv.status === "paid" ? "bg-green-50 text-green-600" : "bg-pipeline-red-100 text-pipeline-red-550"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
                    , inv.status
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

