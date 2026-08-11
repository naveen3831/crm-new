const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\customer\\quotations\\page.tsx";"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/Button";








export default function CustomerQuotations() {
  const [quotes, setQuotes] = useState([
    { id: "Q-9082", title: "Enterprise Database Migration & Setup", value: 4500.0, status: "pending" },
    { id: "Q-9041", title: "Monthly Managed IT Support Retainer", value: 1200.0, status: "accepted" },
  ]);

  const handleAcceptQuote = (quoteId) => {
    setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status: "accepted" } : q));
  };

  const handleRejectQuote = (quoteId) => {
    setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status: "rejected" } : q));
  };

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
      , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}, "My Quotations" )
      , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
        , quotes.map((q) => (
          React.createElement('div', { key: q.id, className: "p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
            , React.createElement('div', { className: "flex flex-col gap-1 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
              , React.createElement('span', { className: "text-[10px] font-mono font-semibold text-teal-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "QUOTE ID: "  , q.id)
              , React.createElement('h4', { className: "font-heading font-bold text-sm text-navy-950 mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, q.title)
              , React.createElement('span', { className: "text-gray-500 mt-0.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "Proposed Value: "  , React.createElement('strong', { className: "text-navy-950", __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "$", q.value.toFixed(2)), " (tax inclusive)"  )
            )
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
              , q.status === "pending" && (
                React.createElement(React.Fragment, null
                  , React.createElement(Button, { onClick: () => handleAcceptQuote(q.id), variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, "Accept"

                  )
                  , React.createElement(Button, { onClick: () => handleRejectQuote(q.id), variant: "secondary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "Reject"

                  )
                )
              )
              , q.status === "accepted" && (
                React.createElement('span', { className: "px-3 py-1 rounded bg-green-50 border border-green-200 text-green-600 font-bold uppercase text-[10px]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "Accepted"

                )
              )
              , q.status === "rejected" && (
                React.createElement('span', { className: "px-3 py-1 rounded bg-red-50 border border-red-200 text-red-600 font-bold uppercase text-[10px]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, "Rejected"

                )
              )
            )
          )
        ))
      )
    )
  );
}

