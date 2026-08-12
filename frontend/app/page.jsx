const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\page.tsx";"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, TrendingUp, FileText, CreditCard, TicketCheck, BarChart3,
  ArrowRight, Zap,
} from "lucide-react";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
};

const featureIcons = [
  React.createElement(Users, { key: "u", className: "text-teal-600", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}} ),
  React.createElement(TrendingUp, { key: "t", className: "text-amber-500", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}} ),
  React.createElement(FileText, { key: "f", className: "text-purple-600", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}} ),
  React.createElement(CreditCard, { key: "c", className: "text-green-600", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}} ),
  React.createElement(TicketCheck, { key: "tc", className: "text-red-500", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} ),
  React.createElement(BarChart3, { key: "b", className: "text-teal-500", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} ),
];

const featureData = [
  { title: "Customer Intelligence", description: "Manage detailed records, industrial sectors, GST details, and real-time customer histories in one hub." },
  { title: "Lead & Deal Pipeline", description: "Track lead states from New to Qualification, Proposal Sent, and Conversion using color-coded stage feeds." },
  { title: "Quotations & Invoicing", description: "Generate drafts, verify line items, email PDFs, and instantly convert accepted quotations into active invoices." },
  { title: "Online Invoicing & Payment", description: "Collect payments via UPI, Credit Card, or Net Banking with integrated Stripe & Razorpay gateways." },
  { title: "Support Ticket Desk", description: "Empower customers to submit issues, upload file details, receive admin updates, and track resolution metrics." },
  { title: "Advanced Analytics", description: "Review automated charts of monthly sales, lead conversion metrics, open tickets, and pending collection data." },
];

const workflowSteps = [
  { step: "01", title: "Capture & Qualify", description: "Leads enter from public channels. Assign priority ratings and track correspondence details." },
  { step: "02", title: "Propose & Close", description: "Draft quotations, customize taxes, request client acceptance online, and finalize invoices." },
  { step: "03", title: "Analyze & Support", description: "Evaluate pipeline performance, record UPI transfers, and resolve support requests quickly." },
];

export default function HomePage() {
  return (
    React.createElement('div', { className: "bg-[#F8FAFC] min-h-screen text-slate-900 font-sans"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
      /* Hero */
      , React.createElement('section', { className: "relative overflow-hidden pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
        , React.createElement(motion.div, {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 },
          className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-8 shadow-xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}

          , React.createElement(Zap, { size: 14, className: "text-indigo-600 fill-indigo-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, "Next.js 14 Production-Ready Enterprise CRM"    )
        )

        , React.createElement(motion.h1, {
          className: "text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 max-w-4xl tracking-tight mb-6 leading-tight"        ,
          initial: "initial", animate: "animate", variants: fadeInUp, __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
, "Drive High Growth with the Complete "
                , React.createElement('span', { className: "bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#0F172A] bg-clip-text text-transparent"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, "Customer Platform" )
        )

        , React.createElement(motion.p, {
          className: "text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium"       ,
          initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.2 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
, "Unify sales pipelines, verify deals, compile quotations, process card payments, and manage support tickets in a beautiful, unified dashboard."

        )

        , React.createElement(motion.div, {
          className: "flex flex-col sm:flex-row gap-4"   ,
          initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}

          , React.createElement(Link, { href: "/auth/register", __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
            , React.createElement(Button, { variant: "primary", size: "lg", className: "w-full sm:w-auto gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold shadow-md shadow-indigo-600/25"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, "Start Free Trial "
                 , React.createElement(ArrowRight, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}} )
            )
          )
          , React.createElement(Link, { href: "/contact", __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
            , React.createElement(Button, { variant: "secondary", size: "lg", className: "w-full sm:w-auto border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold shadow-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}, "Book CRM Demo"

            )
          )
        )

        /* Dashboard Preview */
        , React.createElement(motion.div, {
          initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 },
          className: "w-full mt-16 max-w-5xl rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl p-4 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}

          , React.createElement('div', { className: "flex items-center justify-between pb-4 border-b border-slate-100 px-2 mb-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
              , React.createElement('span', { className: "w-3 h-3 rounded-full bg-rose-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}})
              , React.createElement('span', { className: "w-3 h-3 rounded-full bg-amber-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}})
              , React.createElement('span', { className: "w-3 h-3 rounded-full bg-emerald-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}})
              , React.createElement('span', { className: "text-xs text-slate-500 font-mono ml-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, "crm-v1.0.local")
            )
            , React.createElement('div', { className: "text-xs text-indigo-700 px-3 py-1 rounded-full bg-indigo-50 font-mono font-bold border border-indigo-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}, "Role: Admin (Full Access)"

            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-left"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
            , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
              , React.createElement('div', { className: "text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}, "TOTAL REVENUE" )
              , React.createElement('div', { className: "text-2xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}, "$142,500.00")
              , React.createElement('div', { className: "text-xs text-emerald-600 font-bold mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}, "+14.2% from last month"   )
            )
            , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
              , React.createElement('div', { className: "text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "CONVERTED LEADS" )
              , React.createElement('div', { className: "text-2xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}, "82 / 120"  )
              , React.createElement('div', { className: "text-xs text-amber-600 font-bold mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "68% Success Rate"  )
            )
            , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
              , React.createElement('div', { className: "text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}, "OPEN TICKETS" )
              , React.createElement('div', { className: "text-2xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}, "4 Pending" )
              , React.createElement('div', { className: "text-xs text-rose-500 font-bold mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}, "Avg response time <30m"   )
            )
          )

          , React.createElement('div', { className: "mt-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xs text-left"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
            , React.createElement('h4', { className: "text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}, "ACTIVE DEAL STAGES"  )
            , React.createElement('div', { className: "flex flex-col gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
              , React.createElement('div', { className: "flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs border border-slate-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                , React.createElement('span', { className: "font-bold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}, "AeroSpace Logistics (Customer Suite)"   )
                , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black uppercase text-[10px]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}, "Closed Won" )
              )
              , React.createElement('div', { className: "flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs border border-slate-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
                , React.createElement('span', { className: "font-bold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, "Vanguard Retail Inc"  )
                , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black uppercase text-[10px]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "Proposal Stage" )
              )
              , React.createElement('div', { className: "flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs border border-slate-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
                , React.createElement('span', { className: "font-bold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, "Cyber Systems Security Setup"   )
                , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-black uppercase text-[10px]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, "New Lead" )
              )
            )
          )
        )
      )

      /* Stats */
      , React.createElement('section', { className: "py-12 sm:py-16 bg-white border-y border-slate-200/80"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
        , React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
          , [["99.9%","Guaranteed Uptime"],["<300ms","Response Time"],["12,000+","Deals Processed"],["500+","Active Customers"]].map(([val, label]) => (
            React.createElement('div', { key: label, __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
              , React.createElement('div', { className: "text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-heading mb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}, val)
              , React.createElement('div', { className: "text-xs sm:text-sm text-slate-500 uppercase font-bold tracking-wider"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, label)
            )
          ))
        )
      )

      /* Features */
      , React.createElement('section', { className: "py-16 sm:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
        , React.createElement('div', { className: "text-center mb-12 sm:mb-16"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
          , React.createElement('h2', { className: "text-3xl sm:text-4xl font-black text-slate-900 mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, "Engineered for Fast Action"   )
          , React.createElement('p', { className: "text-slate-600 font-medium text-base max-w-xl mx-auto"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, "Everything you need to automate client accounts, trace proposal requests, and close invoices."

          )
        )
        , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
          , featureData.map((feat, i) => (
            React.createElement(GlassCard, { key: i, delay: i * 0.1, className: "flex flex-col gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
              , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
                , featureIcons[i]
              )
              , React.createElement('h3', { className: "font-heading font-extrabold text-lg text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}, feat.title)
              , React.createElement('p', { className: "text-sm text-slate-600 leading-relaxed font-normal"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, feat.description)
            )
          ))
        )
      )

      /* Workflow */
      , React.createElement('section', { className: "py-16 sm:py-20 bg-white border-t border-slate-200/80"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
        , React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-8 md:px-12"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
          , React.createElement('div', { className: "text-center mb-12 sm:mb-16"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
            , React.createElement('h2', { className: "text-3xl sm:text-4xl font-black text-slate-900 mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}, "How the CRM Works"   )
            , React.createElement('p', { className: "text-slate-600 font-medium text-base max-w-xl mx-auto"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, "From public request to invoice verification — a smooth pipeline flow."

            )
          )
          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
            , workflowSteps.map((step, i) => (
              React.createElement('div', { key: i, className: "flex flex-col items-center md:items-start text-center md:text-left gap-3"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
                , React.createElement('span', { className: "text-5xl sm:text-6xl font-black text-indigo-200 font-heading leading-none"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}, step.step)
                , React.createElement('h3', { className: "font-heading font-extrabold text-xl text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}, step.title)
                , React.createElement('p', { className: "text-sm text-slate-600 leading-relaxed max-w-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, step.description)
              )
            ))
          )
        )
      )

      /* Testimonial */
      , React.createElement('section', { className: "py-16 sm:py-24 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto text-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
        , React.createElement('div', { className: "mb-10 sm:mb-16" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
          , React.createElement('h2', { className: "text-3xl sm:text-4xl font-black text-slate-900 mb-4 font-heading"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}, "Trusted by Global Teams"   )
        )
        , React.createElement(GlassCard, { className: "p-6 sm:p-10 md:p-12 relative flex flex-col items-center gap-6 bg-white border border-slate-200/80 rounded-3xl shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
          , React.createElement('span', { className: "text-6xl text-indigo-200 font-serif leading-none absolute left-6 sm:left-8 top-4 sm:top-6 select-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}, "“")
          , React.createElement('p', { className: "text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-sans max-w-3xl italic font-medium pt-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}, "This CRM platform changed how we handle invoice payment tracking. We converted three deals within a week of onboarding, and customers love the transparent support ticketing portal!"

          )
          , React.createElement('div', { className: "mt-2 flex flex-col items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
            , React.createElement('div', { className: "font-heading font-bold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}, "Sarah Jenkins" )
            , React.createElement('div', { className: "text-xs text-slate-500 font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}, "Director of Operations, AeroSpace Logistics Ltd"     )
          )
        )
      )

      /* CTA Banner */
      , React.createElement('section', { className: "py-16 sm:py-20 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#4F46E5] text-center text-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
        , React.createElement('div', { className: "max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center gap-6 sm:gap-8"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
          , React.createElement('h2', { className: "text-3xl sm:text-4xl font-black text-white font-heading"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}, "Ready to Streamline Accounts?"   )
          , React.createElement('p', { className: "text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-medium"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}, "Create your customer account, log tickets, and view quotations. Sign up in less than two minutes."

          )
          , React.createElement('div', { className: "flex flex-col sm:flex-row gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
            , React.createElement(Link, { href: "/auth/register", __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
              , React.createElement(Button, { variant: "secondary", className: "bg-white text-indigo-700 border-none hover:bg-indigo-50 w-full sm:w-auto font-bold shadow-md"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}, "Register as Customer"

              )
            )
            , React.createElement(Link, { href: "/contact", __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
              , React.createElement(Button, { variant: "outline", className: "border-white/40 text-white hover:bg-white/10 w-full sm:w-auto font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "Contact Sales"

              )
            )
          )
        )
      )
    )
  );
}

