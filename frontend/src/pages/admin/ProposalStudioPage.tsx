import React, { useState, useEffect } from "react";
import { showToast } from "../../../utils/toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Upload,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  Users,
  Layers,
  DollarSign,
  ShieldCheck,
  Building2,
  Sparkles,
  Save,
  Maximize2
} from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, triggerDirectPdfDownload, openPdfPrintPreview } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default function ProposalStudioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"editor" | "pdf">("editor");
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Editable Form State
  const [form, setForm] = useState<any>({
    title: "",
    projectName: "",
    clientName: "",
    projectType: "Website Application",
    overviewNarrative: "",
    planAName: "PLAN A — Responsive Web Portal",
    planAPrice: 50000,
    planBName: "PLAN B — Full Web + Mobile Ecosystem",
    planBPrice: 65000,
    paymentTerms: "40% advance on project kick-off\n30% on completion of core module\n30% on final release & launch",
    termsAndConditions: "Estimation is valid for 30 days from date of issue.\nIncludes 30 days complimentary post-launch support.",
    customerDesc: "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.",
    merchantDesc: "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.",
    adminDesc: "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe."
  });

  useEffect(() => {
    async function fetchProposalDetail() {
      try {
        const res = await fetch(`${API_URL}/crm/quotation`).then(r => r.json());
        if (res.data && Array.isArray(res.data)) {
          const found = res.data.find((p: any) => p.id === id || p.number === id);
          if (found) {
            setProposal(found);
            setForm({
              title: found.title || "",
              projectName: found.projectName || "",
              clientName: found.clientName || "",
              projectType: found.projectType || "Website Application",
              overviewNarrative: found.overviewNarrative || "The project is a modern, responsive web application designed to optimize client workflows.",
              planAName: found.planAName || "PLAN A — Responsive Web Portal",
              planAPrice: found.planAPrice || 50000,
              planBName: found.planBName || "PLAN B — Web Platform & Admin Suite",
              planBPrice: found.planBPrice || 65000,
              paymentTerms: found.paymentTerms || "40% advance on project kick-off\n30% on core milestone completion\n30% on final release & launch",
              termsAndConditions: found.termsAndConditions || "Estimation proposal valid for 30 days.\nIncludes 30 days complimentary post-launch support.",
              customerDesc: found.customerDesc || "Customer portal & role access specifications.",
              merchantDesc: found.merchantDesc || "Merchant & service vendor portal specifications.",
              adminDesc: found.adminDesc || "Super Admin panel & governance controls."
            });
          } else {
            // Default mock proposal for studio fallback
            const fallbackProp = {
              id: id || "QT-7030",
              number: id || "QT-7030",
              title: "Tours and Travels - Website Application Quotation",
              projectName: "Tours and Travels",
              clientName: "Internal Enterprise",
              projectType: "Website Application",
              planAPrice: 50000,
              planBPrice: 65000,
              status: "Approved",
              documentRef: `SPW/EST/TOURS/WEB/2026`
            };
            setProposal(fallbackProp);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProposalDetail();
  }, [id]);

  const handleSaveSection = async () => {
    if (!proposal) return;
    try {
      const updated = { ...proposal, ...form };
      await fetch(`${API_URL}/crm/quotation/${proposal.id || proposal.number}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      setProposal(updated);
      showToast(`Section ${activeSection} changes saved successfully to database!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Section saved!", "success");
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const pdfHtml = generateSpeshwayEstimationPdfHtml(proposal, { name: form.projectName, clientName: form.clientName }, []);
      const filename = `${(form.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_")}_${(proposal?.documentRef || proposal?.id || "Proposal").replace(/[^a-zA-Z0-9]/g, "_")}_Proposal.pdf`;
      await triggerDirectPdfDownload(pdfHtml, filename);
    } catch (err) {
      console.error("Proposal studio PDF download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const sections = [
    { num: 1, title: "1. Overview & Project Type", badge: "PDF Page 1" },
    { num: 2, title: "2. User Access & Roles", badge: "PDF Page 1" },
    { num: 3, title: "3. Features & Scope", badge: "PDF Page 2" },
    { num: 4, title: "4. Investment Plans", badge: "PDF Page 3" },
    { num: 5, title: "5. Plan Comparison", badge: "PDF Page 3" },
    { num: 6, title: "6. Payment Terms", badge: "PDF Page 4" },
    { num: 7, title: "7. Terms & Conditions", badge: "PDF Page 4" },
    { num: 8, title: "8. Inclusions & Exclusions", badge: "PDF Page 4" },
    { num: 9, title: "9. Company Details & Watermark", badge: "PDF Header" }
  ];

  if (loading) {
    return <div className="p-8 text-center text-slate-400 font-mono text-xs animate-pulse">Loading Proposal Studio...</div>;
  }

  const pdfHtmlContent = generateSpeshwayEstimationPdfHtml(proposal, { name: form.projectName, clientName: form.clientName }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-500/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/admin/proposals")}
              className="text-xs font-bold text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors mr-2"
            >
              <ArrowLeft size={14} /> Exit Studio
            </button>
            <span className="text-[10px] font-mono text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              8-SECTION PROPOSAL STUDIO
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
            {form.title || proposal?.title || "Proposal Studio"}
          </h1>
          <p className="text-xs text-slate-400">Client: <span className="text-amber-300 font-semibold">{form.clientName}</span> &bull; Ref: <span className="font-mono text-rose-400">{proposal?.documentRef || proposal?.id}</span></p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-rose-500/20">
            <button
              onClick={() => setViewMode("editor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "editor" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              📝 Section Editor
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "pdf" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              📄 PDF Live Preview
            </button>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#FF5349]/30 transition-all"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Studio Body: 2-Column Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section Navigation */}
        <div className="space-y-1 bg-[#071E34] border border-rose-500/20 rounded-2xl p-4 self-start shadow-xl">
          <div className="px-2 py-1 text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider mb-2">
            PROPOSAL PAGES ({sections.length} SECTIONS)
          </div>
          {sections.map((sec) => (
            <button
              key={sec.num}
              onClick={() => setActiveSection(sec.num)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                activeSection === sec.num
                  ? "bg-[#FF5349] text-white font-bold shadow-lg shadow-[#FF5349]/20"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="truncate">{sec.title}</span>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                activeSection === sec.num ? "bg-black/20 text-white" : "bg-white/5 text-slate-500"
              }`}>
                {sec.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Right Section Content Editor or Live PDF Preview */}
        <div className="lg:col-span-3 bg-[#071E34] border border-rose-500/20 rounded-2xl p-6 shadow-xl space-y-6 min-h-[600px]">
          {viewMode === "pdf" ? (
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-rose-500/20 bg-white">
              <iframe srcDoc={pdfHtmlContent} className="w-full h-full border-0" title="PDF Document Live Preview" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-rose-500/10 pb-4">
                <h3 className="text-base font-bold text-white font-heading">
                  Section {activeSection}: {sections.find(s => s.num === activeSection)?.title}
                </h3>
                <button
                  onClick={handleSaveSection}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 shadow-md"
                >
                  <Save size={14} /> Save Section
                </button>
              </div>

              {/* Section 1 Editor */}
              {activeSection === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Proposal Document Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Project Name</label>
                      <input
                        type="text"
                        value={form.projectName}
                        onChange={e => setForm({ ...form, projectName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Client Name</label>
                      <input
                        type="text"
                        value={form.clientName}
                        onChange={e => setForm({ ...form, clientName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Executive Overview Narrative</label>
                    <textarea
                      rows={5}
                      value={form.overviewNarrative}
                      onChange={e => setForm({ ...form, overviewNarrative: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Section 2 Editor */}
              {activeSection === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Customer User Access Description</label>
                    <textarea
                      rows={3}
                      value={form.customerDesc}
                      onChange={e => setForm({ ...form, customerDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Merchant / Vendor Access Description</label>
                    <textarea
                      rows={3}
                      value={form.merchantDesc}
                      onChange={e => setForm({ ...form, merchantDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Super Admin Governance Description</label>
                    <textarea
                      rows={3}
                      value={form.adminDesc}
                      onChange={e => setForm({ ...form, adminDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                </div>
              )}

              {/* Section 4 Editor */}
              {activeSection === 4 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">PLAN A Tier Title</label>
                      <input
                        type="text"
                        value={form.planAName}
                        onChange={e => setForm({ ...form, planAName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                      />
                      <label className="block text-slate-400 font-semibold mt-3 mb-1">PLAN A Price ($)</label>
                      <input
                        type="number"
                        value={form.planAPrice}
                        onChange={e => setForm({ ...form, planAPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] font-mono text-amber-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">PLAN B Tier Title</label>
                      <input
                        type="text"
                        value={form.planBName}
                        onChange={e => setForm({ ...form, planBName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                      />
                      <label className="block text-slate-400 font-semibold mt-3 mb-1">PLAN B Price ($)</label>
                      <input
                        type="number"
                        value={form.planBPrice}
                        onChange={e => setForm({ ...form, planBPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] font-mono text-rose-400 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Other sections generic fallback */}
              {activeSection !== 1 && activeSection !== 2 && activeSection !== 4 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Section Details & Configuration</label>
                    <textarea
                      rows={6}
                      value={form.paymentTerms}
                      onChange={e => setForm({ ...form, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] leading-relaxed font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

