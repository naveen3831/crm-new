const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\faq\\page.tsx";"use client";

import React, { useState } from "react";
import { Search, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/Button";
import Accordion from "../../components/ui/Accordion";

const faqData = [
  { category: "General", questions: [
    { title: "What is this CRM?", content: "This CRM is a production-level Customer Relationship Management system built to coordinate sales pipelines, centralize documents, process billing payments, and organize customer support tickets in a unified ecosystem." },
    { title: "Can anyone register an Admin account?", content: "No. Only Customers can register publicly. Admin accounts can only be created by system administrators via secure database seeds or internal command-line utilities." },
  ]},
  { category: "Quotations & Invoicing", questions: [
    { title: "How do customers accept quotations?", content: "When an Admin sends a quotation, the customer can log in to their dashboard, review the line items, and click Accept or Reject. Once accepted, the Admin can convert it into an invoice with a single click." },
    { title: "What payment gateways are supported?", content: "We support Stripe and Razorpay integrations. Customers can clear invoices using Credit/Debit Cards, UPI transfers, or Net Banking directly from the client billing view." },
  ]},
  { category: "Support Tickets", questions: [
    { title: "How does the support ticket system work?", content: "Registered customers can navigate to the Support section, click Raise Ticket, provide details, and upload attachments. Admins are notified instantly and can reply, assign, or mark the ticket as resolved." },
    { title: "Can I receive email notifications for tickets?", content: "Yes. Every ticket state change triggers automated transactional email alerts using our configured SMTP mailer service." },
  ]},
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqData
    .map(cat => ({ ...cat, questions: cat.questions.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.content.toLowerCase().includes(searchQuery.toLowerCase())) }))
    .filter(cat => cat.questions.length > 0);

  return (
    React.createElement('div', { className: "min-h-screen py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto flex flex-col gap-10 sm:gap-12"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
      , React.createElement('section', { className: "text-center max-w-2xl mx-auto flex flex-col gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
        , React.createElement('h1', { className: "display-lg text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "Frequently Asked Questions"  )
        , React.createElement('p', { className: "text-base text-[#475569] font-medium font-sans leading-relaxed"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "Quickly search or browse categories to find details regarding pipelines, billing setup, and role configurations."

        )
        , React.createElement('div', { className: "relative mt-4 max-w-md mx-auto w-full"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
          , React.createElement('input', { type: "text", placeholder: "Search FAQs..." , value: searchQuery, onChange: e => setSearchQuery(e.target.value),
            className: "w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-[#071E34] font-medium text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-teal-500 shadow-sm"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
          , React.createElement(Search, { size: 18, className: "absolute left-4 top-3.5 text-teal-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} )
        )
      )

      , React.createElement('section', { className: "flex flex-col gap-8 sm:gap-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
        , filteredCategories.length > 0 ? (
          filteredCategories.map((cat, i) => (
            React.createElement('div', { key: i, className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
              , React.createElement('h2', { className: "font-heading font-bold text-base sm:text-lg text-teal-700 border-b-2 border-teal-200 pb-2 uppercase tracking-wider"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, cat.category)
              , React.createElement(Accordion, { items: cat.questions.map(q => ({ title: q.title, content: q.content })), __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
            )
          ))
        ) : (
          React.createElement('div', { className: "text-center py-16 rounded-2xl bg-white border border-teal-200 shadow-md text-[#475569]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            , React.createElement(HelpCircle, { size: 40, className: "mx-auto text-teal-400 mb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}} )
            , React.createElement('p', { className: "text-sm font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "No FAQs match your search query."     )
          )
        )
      )

      , React.createElement('section', { className: "rounded-2xl bg-white border border-teal-200 shadow-md p-6 sm:p-8 text-center flex flex-col items-center gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
        , React.createElement(MessageSquare, { size: 28, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
        , React.createElement('h3', { className: "font-heading font-bold text-lg sm:text-xl text-[#071E34]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}, "Still have questions?"  )
        , React.createElement('p', { className: "text-sm text-[#475569] font-medium max-w-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, "If you can't find answers in our FAQs, please contact our team directly."            )
        , React.createElement(Link, { href: "/contact", className: "mt-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, React.createElement(Button, { variant: "outline", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Contact Support Desk"  ))
      )
    )
  );
}

