const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\PaymentsPage.tsx";import React, { useState, useEffect } from "react";
import { DollarSign, Plus, CheckCircle, } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";










export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    clientName: "Enterprise Corp",
    amount: 15000,
    gateway: "Stripe",
    status: "Completed"
  });

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/payment`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setPayments(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    const newPay = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      ...form,
      date: new Date().toISOString().split("T")[0]
    };

    try {
      await fetch(`${API_URL}/crm/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPay)
      });
      setPayments(prev => [newPay, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
            , React.createElement(DollarSign, { className: "text-emerald-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} ), " Payment Transactions & Ledger"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}, "Audit online Stripe payments, wire transfers, and gateway settlements"        )
        )
        , React.createElement('button', {
          onClick: () => setShowModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}} ), " Log Payment Entry"
        )
      )

      , React.createElement('div', { className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 overflow-x-auto shadow-xl"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
        , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
          , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
            , React.createElement('tr', { className: "border-b border-rose-500/10 text-slate-400 font-mono uppercase"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}, "Transaction ID" )
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}, "Client")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}, "Amount ($)" )
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, "Gateway")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, "Status")
              , React.createElement('th', { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}, "Date")
            )
          )
          , React.createElement('tbody', { className: "divide-y divide-rose-500/10 text-slate-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , payments.map((p) => (
              React.createElement('tr', { key: p.id, className: "hover:bg-white/5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
                , React.createElement('td', { className: "py-3 font-mono text-rose-400 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}, p.id)
                , React.createElement('td', { className: "py-3 font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, p.clientName)
                , React.createElement('td', { className: "py-3 font-bold text-emerald-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}, "₹", Number(p.amount || 0).toLocaleString('en-IN'))
                , React.createElement('td', { className: "py-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}, React.createElement('span', { className: "px-2 py-0.5 rounded bg-white/10 text-slate-200"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}, p.gateway))
                , React.createElement('td', { className: "py-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, React.createElement('span', { className: "text-emerald-400 font-semibold flex items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, React.createElement(CheckCircle, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}} ), " " , p.status))
                , React.createElement('td', { className: "py-3 text-slate-400 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}, p.date || "2026-07-27")
              )
            ))
          )
        )
      )

      , showModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
          , React.createElement('div', { className: "bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}, "Log Manual Payment Entry"   )
            , React.createElement('form', { onSubmit: handleCreatePayment, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Client Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.clientName,
                  onChange: e => setForm({ ...form, clientName: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "Payment Amount ($) *"   )
                , React.createElement('input', {
                  type: "number", required: true,
                  value: form.amount,
                  onChange: e => setForm({ ...form, amount: Number(e.target.value) }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}, "Gateway / Method"  )
                , React.createElement('select', {
                  value: form.gateway,
                  onChange: e => setForm({ ...form, gateway: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}

                  , React.createElement('option', { value: "Stripe", __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, "Stripe")
                  , React.createElement('option', { value: "Wire Transfer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, "Wire Transfer" )
                  , React.createElement('option', { value: "PayPal", __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "PayPal")
                  , React.createElement('option', { value: "Razorpay", __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, "Razorpay")
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
, "Save Entry"

                )
              )
            )
          )
        )
      )
    )
  );
}

