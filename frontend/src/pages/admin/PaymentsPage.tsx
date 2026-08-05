import React, { useState, useEffect } from "react";
import { DollarSign, Plus, Search, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Payment {
  id: string;
  clientName: string;
  amount: number;
  gateway: string;
  status: string;
  date: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
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

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPay: Payment = {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <DollarSign className="text-emerald-400" /> Payment Transactions & Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-1">Audit online Stripe payments, wire transfers, and gateway settlements</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Log Payment Entry
        </button>
      </div>

      <div className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-rose-500/10 text-slate-400 font-mono uppercase">
              <th className="pb-3">Transaction ID</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Amount ($)</th>
              <th className="pb-3">Gateway</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-500/10 text-slate-300">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="py-3 font-mono text-rose-400 font-semibold">{p.id}</td>
                <td className="py-3 font-bold text-white">{p.clientName}</td>
                <td className="py-3 font-bold text-emerald-400">₹{Number(p.amount || 0).toLocaleString('en-IN')}</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-white/10 text-slate-200">{p.gateway}</span></td>
                <td className="py-3"><span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle size={12} /> {p.status}</span></td>
                <td className="py-3 text-slate-400 font-mono">{p.date || "2026-07-27"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading">Log Manual Payment Entry</h2>
            <form onSubmit={handleCreatePayment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Client Name *</label>
                <input
                  type="text" required
                  value={form.clientName}
                  onChange={e => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Payment Amount ($) *</label>
                <input
                  type="number" required
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Gateway / Method</label>
                <select
                  value={form.gateway}
                  onChange={e => setForm({ ...form, gateway: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Wire Transfer">Wire Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Razorpay">Razorpay</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

