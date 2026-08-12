const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\customer\\CustomerDashboardPage.tsx";import React, { } from "react";
import { Link } from "react-router-dom";
import { FileText, CreditCard, TicketCheck, ShieldCheck, ArrowRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default function CustomerDashboardPage() {
  return (
    React.createElement('div', { className: "space-y-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      , React.createElement('div', { className: "rounded-2xl bg-gradient-to-r from-blue-950 via-[#0d162d] to-indigo-950 p-6 sm:p-8 border border-rose-500/20 shadow-2xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
        , React.createElement('div', { className: "flex items-center gap-3 mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
          , React.createElement(ShieldCheck, { size: 24, className: "text-rose-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}} )
          , React.createElement('span', { className: "text-xs font-semibold text-rose-300 font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}, "Verified Client Portal"  )
        )
        , React.createElement('h1', { className: "text-2xl sm:text-3xl font-extrabold text-white font-heading"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 15}}, "Welcome to Your Speshway Client Dashboard"     )
        , React.createElement('p', { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}, "Review active project quotations, process pending invoices securely, and track support ticket resolutions."

        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
        , React.createElement(Link, {
          to: "/customer/quotations",
          className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}

          , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
            , React.createElement(FileText, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
            , React.createElement('h3', { className: "text-base font-bold text-white group-hover:text-rose-400 transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}, "My Quotations" )
            , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}, "Review proposals, download PDF specifications, and accept plan tiers."        )
          )
          , React.createElement('div', { className: "text-xs text-rose-400 font-semibold flex items-center gap-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "View Proposals "
              , React.createElement(ArrowRight, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}} )
          )
        )

        , React.createElement(Link, {
          to: "/customer/invoices",
          className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}

          , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
            , React.createElement(CreditCard, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
            , React.createElement('h3', { className: "text-base font-bold text-white group-hover:text-amber-400 transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "My Invoices & Payments"   )
            , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, "View billing statements and pay milestone invoices online via Stripe."         )
          )
          , React.createElement('div', { className: "text-xs text-amber-400 font-semibold flex items-center gap-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "Manage Billing "
              , React.createElement(ArrowRight, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
          )
        )

        , React.createElement(Link, {
          to: "/customer/tickets",
          className: "rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}

          , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
            , React.createElement(TicketCheck, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
            , React.createElement('h3', { className: "text-base font-bold text-white group-hover:text-purple-400 transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, "Support Tickets" )
            , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}, "Raise support inquiries and communicate directly with assigned engineering leads."         )
          )
          , React.createElement('div', { className: "text-xs text-purple-400 font-semibold flex items-center gap-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Get Support "
              , React.createElement(ArrowRight, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} )
          )
        )
      )
    )
  );
}

