import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Plus, Search, Sparkles, Download, Eye, Layers, CheckCircle, ArrowRight, Bot } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Quotation {
  id: string;
  number: string;
  clientName: string;
  projectName?: string;
  title: string;
  projectType?: string;
  planAPrice?: number;
  planBPrice?: number;
  status: string;
  validUntil: string;
  createdDate?: string;
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Quotation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    projectName: "",
    clientName: "",
    projectType: "Website Application",
    planAPrice: 50000,
    planBPrice: 65000
  });

  const fetchProposals = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/quotation`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setProposals(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    const propId = `PROP-${Date.now().toString().slice(-4)}`;

    const newProp = {
      id: propId,
      number: propId,
      title: form.title || `${form.projectName || "Project"} Proposal`,
      projectName: form.projectName || "Project",
      clientName: form.clientName || "Enterprise Client",
      projectType: form.projectType,
      currency: "Indian Rupees (INR)",
      planAName: `PLAN A — ${form.projectType}`,
      planAPrice: form.planAPrice,
      planBName: `PLAN B — ${form.projectType} Ecosystem`,
      planBPrice: form.planBPrice,
      status: "Approved",
      discount: 0,
      tax: 18,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      documentRef: `SPW/EST/${(form.projectName || "PROP").toUpperCase().replace(/[^A-Z0-9]/g, '')}/2026`,
      overviewNarrative: `${form.projectType} proposal engineered for ${form.projectName || "Project"}. Delivered with modern architecture, security standards, and comprehensive quality assurance.`,
      serviceItems: [
        { description: "Core Architecture & UI Design", qty: 1, rate: Math.round(form.planAPrice * 0.4) },
        { description: "REST Microservices API & Database", qty: 1, rate: Math.round(form.planAPrice * 0.3) },
        { description: "Admin Governance Panel & Security", qty: 1, rate: Math.round(form.planAPrice * 0.3) }
      ],
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      await fetch(`${API_URL}/crm/quotation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProp)
      });

      // Navigate directly to the 8-section Proposal Studio for this proposal
      navigate(`/admin/proposals/${propId}`);
    } catch (err) {
      console.error(err);
      navigate(`/admin/proposals/${propId}`);
    }
  };

  const filteredProposals = proposals.filter(p =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.clientName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.number || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <FileText className="text-[#FF5349]" /> Proposals & Estimation Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage 8-section executive proposals, plan comparison matrices, and live PDF document previews</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Create New Proposal
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search proposals by title, client name, or document ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B2369] border border-white/10 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#F05454]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProposals.map((prop) => (
          <div
            key={prop.id || prop.number}
            className="rounded-2xl bg-[#0B2369] text-white border border-white/10 p-5 space-y-4 hover:border-white/30 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-blue-200 font-bold bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  {prop.number || prop.id}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {prop.status || "Approved"}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#F05454] transition-colors leading-snug">
                {prop.title}
              </h3>
              <p className="text-xs text-slate-300">Client: <span className="text-white font-semibold">{prop.clientName}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/10 text-xs font-mono">
              <div>
                <span className="text-[9px] text-slate-300 block">PLAN A</span>
                <span className="font-bold text-[#F05454]">₹{Number(prop.planAPrice || 50000).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-300 block">PLAN B</span>
                <span className="font-bold text-blue-200">₹{Number(prop.planBPrice || 65000).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-slate-300 font-mono">8 Sections Studio</span>
              <button
                onClick={() => navigate(`/admin/proposals/${prop.id || prop.number}`)}
                className="px-3.5 py-1.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-extrabold text-xs flex items-center gap-1 shadow-md shadow-[#FF5349]/20 transition-all"
              >
                Open Proposal Studio <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Plus size={20} className="text-[#FF5349]" /> Initialize Proposal Document
            </h2>
            <form onSubmit={handleCreateProposal} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Proposal Title *</label>
                <input
                  type="text" required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="Tours and Travels - Website Application Quotation"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Project Name *</label>
                <input
                  type="text" required
                  value={form.projectName}
                  onChange={e => setForm({ ...form, projectName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="Tours and Travels"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Client Name *</label>
                <input
                  type="text" required
                  value={form.clientName}
                  onChange={e => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="Enterprise Client"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Scope Type</label>
                <select
                  value={form.projectType}
                  onChange={e => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                >
                  <option value="Website Application">Website Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Web & Mobile Application">Web & Mobile Application</option>
                  <option value="Custom ERP & AI Suite">Custom ERP & AI Suite</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-bold shadow-md"
                >
                  Open Proposal Studio →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

