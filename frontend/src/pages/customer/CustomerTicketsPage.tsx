import React, { useState, useEffect } from "react";
import { TicketCheck, Plus, MessageSquare } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Ticket {
  id: string;
  subject: string;
  priority: string;
  status: string;
  description: string;
}

export default function CustomerTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: "", description: "", priority: "Medium" });

  useEffect(() => {
    fetch(`${API_URL}/crm/ticket`)
      .then(r => r.json())
      .then(res => {
        if (res.data && Array.isArray(res.data)) setTickets(res.data);
      })
      .catch(console.error);
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTck: Ticket = {
      id: `TCK-${Date.now().toString().slice(-4)}`,
      ...form,
      status: "Open"
    };

    try {
      await fetch(`${API_URL}/crm/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTck)
      });
      setTickets(prev => [newTck, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <TicketCheck className="text-purple-400" /> Support Tickets
          </h1>
          <p className="text-xs text-slate-400 mt-1">Submit technical questions and follow support resolution progress</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all"
        >
          <Plus size={16} /> Raise Support Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((t) => (
          <div key={t.id} className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-5 space-y-3 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold block">{t.id}</span>
                <h3 className="text-sm font-bold text-white">{t.subject}</h3>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {t.status || "Open"}
              </span>
            </div>
            <p className="text-xs text-slate-300">{t.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b101f] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading">Raise Support Ticket</h2>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Subject / Issue Title *</label>
                <input
                  type="text" required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Detailed Description *</label>
                <textarea
                  required rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-rose-500"
                />
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
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

