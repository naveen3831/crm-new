const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\customer\\invoices\\page.tsx";"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import GlassCard from "../../../components/ui/GlassCard";
import { Check } from "lucide-react";









export default function CustomerInvoices() {
  const [invoices, setInvoices] = useState([
    { id: "INV-1024", title: "Setup Fee & Initial Migration Setup", value: 4500, due: "July 30, 2026", status: "pending" },
    { id: "INV-0982", title: "Consulting Retainer - June 2026", value: 1200, due: "June 30, 2026", status: "paid" },
  ]);

  const [showPayModal, setShowPayModal] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const triggerPayment = (invoice) => {
    setPayingInvoice(invoice);
    setPaymentSuccess(false);
    setShowPayModal(true);
  };

  const executeMockPayment = async () => {
    if (!payingInvoice) return;
    setIsPaying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsPaying(false);
    setPaymentSuccess(true);
    
    // Update local invoice state to Paid
    setInvoices(prev => prev.map(inv => inv.id === payingInvoice.id ? { ...inv, status: "paid" } : inv));
    
    setTimeout(() => {
      setShowPayModal(false);
      setPayingInvoice(null);
    }, 2000);
  };

  return (
    React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
      , React.createElement('h2', { className: "font-heading font-bold text-xl text-navy-950"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, "Invoices & Payments"  )
      , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
        , invoices.map((inv) => (
          React.createElement('div', { key: inv.id, className: "p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            , React.createElement('div', { className: "flex flex-col gap-1 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
              , React.createElement('span', { className: "text-[10px] font-mono font-semibold text-teal-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "INVOICE ID: "  , inv.id)
              , React.createElement('h4', { className: "font-heading font-bold text-sm text-navy-950 mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}, inv.title)
              , React.createElement('span', { className: "text-gray-500 mt-0.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "Value: " , React.createElement('strong', { className: "text-navy-950", __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "$", inv.value), " • Due: "   , inv.due)
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
              , inv.status === "paid" ? (
                React.createElement('span', { className: "px-3 py-1 rounded bg-green-50 border border-green-200 text-green-600 font-bold uppercase text-[10px]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, "Paid"

                )
              ) : (
                React.createElement(Button, { onClick: () => triggerPayment(inv), variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}, "Pay Online"

                )
              )
            )
          )
        ))
      )

      /* Stripe Modal Overlay */
      , showPayModal && payingInvoice && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white/95 border border-gray-200 shadow-elevated flex flex-col gap-6 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
            , React.createElement('div', { className: "flex justify-between items-center pb-2 border-b border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-navy-950 text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, "Secure Gateway Checkout"  )
              , React.createElement('button', { 
                onClick: () => !isPaying && setShowPayModal(false),
                className: "text-gray-400 hover:text-navy-950 transition-colors text-lg"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
, "×"

              )
            )

            , paymentSuccess ? (
              React.createElement('div', { className: "flex flex-col items-center gap-4 py-6 text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                , React.createElement('div', { className: "w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
                  , React.createElement(Check, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}} )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
                  , React.createElement('h4', { className: "font-heading font-extrabold text-navy-950 text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "Payment Successful!" )
                  , React.createElement('p', { className: "text-xs text-gray-500 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}, "Invoice " , payingInvoice.id, " was marked as Paid."    )
                )
              )
            ) : (
              React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
                , React.createElement('div', { className: "p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col gap-1 text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
                  , React.createElement('span', { className: "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}, "Total Invoice Value:"  )
                  , React.createElement('span', { className: "text-navy-950 font-extrabold text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}, "₹", payingInvoice.value.toLocaleString('en-IN'), ".00 INR" )
                )
                , React.createElement('div', { className: "flex flex-col gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}, "Card Number" )
                    , React.createElement('input', { 
                      type: "text", 
                      placeholder: "4242 4242 4242 4242"   , 
                      className: "w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"         ,
                      defaultValue: "4242 •••• •••• 4242"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
                    )
                  )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
                    , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
                      , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}, "Expiry")
                      , React.createElement('input', { 
                        type: "text", 
                        placeholder: "MM/YY", 
                        className: "w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"         ,
                        defaultValue: "12/28", __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
                      )
                    )
                    , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
                      , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}, "CVC")
                      , React.createElement('input', { 
                        type: "text", 
                        placeholder: "CVC", 
                        className: "w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500"         ,
                        defaultValue: "123", __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
                      )
                    )
                  )
                )

                , React.createElement(Button, { 
                  onClick: executeMockPayment,
                  disabled: isPaying, 
                  variant: "primary",
                  className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}

                  , isPaying ? "Processing..." : `Pay ₹${payingInvoice.value.toLocaleString('en-IN')}.00`
                )
              )
            )
          )
        )
      )
    )
  );
}

