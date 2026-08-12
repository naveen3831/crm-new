const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\SettingsPage.tsx";import React, { useState } from "react";
import { Settings, Save, } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Speshway Technologies",
    smtpHost: "smtp.speshway.com",
    stripeKey: "pk_test_51Px92...",
    taxRate: 18,
    currency: "INR (₹)"
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("System Settings saved successfully!");
  };

  return (
    React.createElement('div', { className: "space-y-6 max-w-4xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
        , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
          , React.createElement(Settings, { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}} ), " System Settings & Configuration"
        )
        , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}, "Configure company branding, SMTP mailer, payment gateways, and security controls"         )
      )

      , React.createElement('form', { onSubmit: handleSave, className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-6 shadow-xl"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
        , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
          , React.createElement('h3', { className: "text-sm font-bold text-amber-400 font-heading uppercase tracking-wider"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}, "Company Profile" )
          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
              , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}, "Company Name" )
              , React.createElement('input', {
                type: "text",
                value: settings.companyName,
                onChange: e => setSettings({ ...settings, companyName: e.target.value }),
                className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
              )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
              , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, "Default Currency" )
              , React.createElement('input', {
                type: "text",
                value: settings.currency,
                onChange: e => setSettings({ ...settings, currency: e.target.value }),
                className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
              )
            )
          )
        )

        , React.createElement('div', { className: "space-y-4 pt-4 border-t border-rose-500/10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
          , React.createElement('h3', { className: "text-sm font-bold text-amber-400 font-heading uppercase tracking-wider"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, "Payment Gateways & Taxes"   )
          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
              , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "Stripe Publishable Key"  )
              , React.createElement('input', {
                type: "text",
                value: settings.stripeKey,
                onChange: e => setSettings({ ...settings, stripeKey: e.target.value }),
                className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white font-mono focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
              )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
              , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Standard GST / Tax Rate (%)"     )
              , React.createElement('input', {
                type: "number",
                value: settings.taxRate,
                onChange: e => setSettings({ ...settings, taxRate: Number(e.target.value) }),
                className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
              )
            )
          )
        )

        , React.createElement('div', { className: "pt-4 border-t border-rose-500/10 flex justify-end"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
          , React.createElement('button', {
            type: "submit",
            className: "px-6 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}

            , React.createElement(Save, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}} ), " Save Settings"
          )
        )
      )
    )
  );
}

