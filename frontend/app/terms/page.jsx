const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\terms\\page.tsx";"use client";

import React from "react";

export default function TermsPage() {
  return (
    React.createElement('div', { className: "min-h-screen py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto flex flex-col gap-10"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7}}
      , React.createElement('div', { className: "text-center max-w-2xl mx-auto"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8}}
        , React.createElement('h1', { className: "display-lg text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}, "Terms & Conditions"  )
        , React.createElement('p', { className: "text-sm text-[#475569] font-semibold font-sans mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}, "Last Updated: July 21, 2026"    )
      )

      , React.createElement('div', { className: "rounded-2xl bg-white border border-teal-200 shadow-md p-6 sm:p-10 flex flex-col gap-7 leading-relaxed font-sans"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}
        , [
          ["1. Acceptance of Terms", "By creating an account or accessing the CRM, you agree to comply with and be bound by these service conditions, including billing verification terms and support desk usage boundaries."],
          ["2. User Accounts", "Customers are responsible for maintaining the confidentiality of their profile credentials. Any activity taking place under a user profile is the customer's sole responsibility. Admin roles are strictly isolated and locked."],
          ["3. Quotations & Billing Rules", "Quotations sent by administrators are proposals and remain valid for the period specified. Acceptance of a quotation creates a binding invoice. Invoices must be cleared by the due dates via our designated Stripe/Razorpay endpoints."],
          ["4. Support Desk & Fair Use", "Customers may use the support ticketing tool to report service issues. Abusive language, uploading malicious payloads, or spamming ticket comments may lead to immediate profile suspension or deletion."],
        ].map(([title, content]) => (
          React.createElement('div', { key: title, __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
            , React.createElement('h2', { className: "font-heading font-bold text-lg sm:text-xl text-[#071E34] mb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}, title)
            , React.createElement('p', { className: "text-sm sm:text-base text-[#475569]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}, content)
          )
        ))
      )
    )
  );
}

