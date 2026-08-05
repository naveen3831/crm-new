import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Search, Bot, UserCheck, Phone, Mail, Sparkles, CheckCircle2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Lead {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  source: string;
  expectedBudget: number;
  priority: string;
  leadScore: number;
  status: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isQualifying, setIsQualifying] = useState(false);

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    source: "Website",
    expectedBudget: 45000,
    priority: "High",
    status: "New"
  });

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/lead`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setLeads(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      ...form,
      leadScore: Math.floor(Math.random() * 30) + 70
    };

    try {
      const res = await fetch(`${API_URL}/crm/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      }).then(r => r.json());

      const saved = res.data || newLead;
      setLeads(prev => [saved, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunLeadAgent = async (lead: Lead) => {
    setIsQualifying(true);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-lead",
          actionType: "Score Lead",
          payload: { name: lead.name, company: lead.companyName, budget: lead.expectedBudget }
        })
      }).then(r => r.json());

      alert(res.result || "Lead Qualification Agent executed successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsQualifying(false);
    }
  };

  const filteredLeads = leads.filter(l =>
    (l.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.companyName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <TrendingUp className="text-purple-400" /> Sales Lead Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">Qualify leads, score opportunities, and track deal conversions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Register New Lead
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search leads by name or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{lead.name}</h3>
                <p className="text-xs text-purple-400 font-semibold">{lead.companyName}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 block">
                  Score: {lead.leadScore || 85}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-rose-500/10">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Budget:</span>
                <span className="font-bold text-emerald-400">₹{Number(lead.expectedBudget || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="text-slate-300">{lead.source}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs">
              <span className="text-[10px] text-slate-500 font-mono">ID: {lead.id}</span>
              <button
                onClick={() => handleRunLeadAgent(lead)}
                disabled={isQualifying}
                className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold border border-purple-500/30 flex items-center gap-1 transition-all text-xs"
              >
                <Bot size={13} /> AI Score
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading">Register New Sales Lead</h2>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Contact Name *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Company Name *</label>
                <input
                  type="text" required
                  value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Budget ($)</label>
                  <input
                    type="number"
                    value={form.expectedBudget}
                    onChange={e => setForm({ ...form, expectedBudget: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

