const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\admin\\leads\\page.tsx";"use client";

import React, { useState } from "react";
import GlassCard from "../../../components/ui/GlassCard";









export default function AdminLeads() {
  const [deals] = useState([
    { id: "D-802", title: "Enterprise Database Migration Setup", value: 45000, stage: "Proposal", probability: "70%" },
    { id: "D-803", title: "Managed IT Support Retainer 2026", value: 12000, stage: "Negotiation", probability: "90%" },
    { id: "D-804", title: "Cloud Security Configuration", value: 8500, stage: "Prospecting", probability: "30%" },
    { id: "D-805", title: "API Gateway Integration Project", value: 15000, stage: "Closed Won", probability: "100%" },
  ]);

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
      , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}, "Leads & Deals Pipeline"   )
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
        , deals.map((deal) => (
          React.createElement(GlassCard, { key: deal.id, className: "bg-white/50 border border-gray-200 p-5 flex flex-col justify-between gap-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
            , React.createElement('div', { className: "flex flex-col gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
              , React.createElement('span', { className: "text-[10px] font-mono font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded max-w-fit"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}, deal.id)
              , React.createElement('h4', { className: "font-heading font-bold text-sm text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}, deal.title)
            )
            , React.createElement('div', { className: "border-t border-gray-150 pt-3 flex flex-col gap-1.5 text-xs text-gray-500"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "Deal Value:" )
                , React.createElement('strong', { className: "text-navy-950", __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "₹", deal.value.toLocaleString('en-IN'))
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, "Pipeline Stage:" )
                , React.createElement('strong', { className: "text-teal-600 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, deal.stage)
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, "Conversion Probability:" )
                , React.createElement('strong', { className: "text-gray-700", __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, deal.probability)
              )
            )
          )
        ))
      )
    )
  );
}

