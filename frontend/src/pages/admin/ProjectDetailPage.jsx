const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\ProjectDetailPage.tsx";import React, { useState, useEffect } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import {
  ArrowLeft,


  Plus,
  Sparkles,

  Globe,
  Smartphone,
  Layers,
  Cpu,

  Building2,


  Zap,


} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";














export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScopeModal, setShowScopeModal] = useState(false);
  const [selectedScope, setSelectedScope] = useState("website");
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);

  useEffect(() => {
    async function fetchProjectDetail() {
      try {
        const res = await fetch(`${API_URL}/crm/project`).then(r => r.json());
        if (res.data && Array.isArray(res.data)) {
          const found = res.data.find((p) => p.id === id || p.id === `PRJ-${id}`);
          if (found) {
            setProject(found);
          } else {
            // Fallback default mock project if not found
            setProject({
              id: id || "PRJ-001",
              name: "Build Your Thoughts / E-Commerce System",
              clientName: "Speshway Enterprise Client",
              category: "Web & Mobile Application",
              manager: "Admin Lead",
              budget: 45000,
              priority: "High",
              status: "In Progress",
              description: "Full-stack AI thought workspace & content generation engine built with React, Node.js, and TailwindCSS."
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjectDetail();
  }, [id]);

  const scopeTypes = [
    {
      key: "website",
      title: "Website Application",
      icon: React.createElement(Globe, { size: 24, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}} ),
      desc: "Responsive Web Portal, User Auth, Admin Dashboard, Payment Gateway, SEO Tuning",
      planAName: "PLAN A — Responsive Web Portal",
      planAPrice: 50000,
      planBName: "PLAN B — Web Platform & Admin Suite",
      planBPrice: 65000,
      badge: "Web Only"
    },
    {
      key: "mobile",
      title: "Mobile Application (iOS & Android)",
      icon: React.createElement(Smartphone, { size: 24, className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}} ),
      desc: "Cross-Platform Native Mobile Apps, Real-time Push Notifications, In-App QR Scanner",
      planAName: "PLAN A — Native Mobile Apps (iOS & Android)",
      planAPrice: 70000,
      planBName: "PLAN B — Mobile Apps + Cloud Microservices API",
      planBPrice: 120000,
      badge: "Mobile Apps"
    },
    {
      key: "both",
      title: "Web & Mobile Application (Combined)",
      icon: React.createElement(Layers, { size: 24, className: "text-emerald-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}} ),
      desc: "Complete Ecosystem: Full Web Portal + Native iOS/Android Apps + Central Cloud Backend",
      planAName: "PLAN A — Web & Mobile Ecosystem",
      planAPrice: 110000,
      planBName: "PLAN B — Enterprise Platform Suite & AI Assistant",
      planBPrice: 175000,
      badge: "Full Ecosystem"
    },
    {
      key: "others",
      title: "Custom Software & AI Suite",
      icon: React.createElement(Cpu, { size: 24, className: "text-purple-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}} ),
      desc: "Tailored Microservices, Multi-Vendor Marketplace, AI Document Parsing & LLM Automation",
      planAName: "PLAN A — Custom Software Solution",
      planAPrice: 95000,
      planBName: "PLAN B — Enterprise Cloud ERP & AI Suite",
      planBPrice: 160000,
      badge: "Enterprise AI"
    }
  ];

  const handleGenerateProposal = async () => {
    if (!project) return;
    setIsCreatingQuote(true);

    const config = scopeTypes.find(s => s.key === selectedScope) || scopeTypes[0];
    const quoteId = `QT-${Date.now().toString().slice(-4)}`;
    const projName = project.name;
    const clientName = project.clientName;

    const newQuotation = {
      id: quoteId,
      number: quoteId,
      projectId: project.id,
      projectName: projName,
      clientName: clientName,
      title: `${projName} - ${config.title} Quotation Proposal`,
      projectType: config.title,
      currency: "Indian Rupees (INR)",
      planAName: config.planAName,
      planAPrice: config.planAPrice,
      planBName: config.planBName,
      planBPrice: config.planBPrice,
      status: "Approved",
      discount: 0,
      tax: 18,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      documentRef: `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/${config.key.toUpperCase()}/2026`,
      overviewNarrative: `${config.title} engineered for ${projName}. Delivered with modern architecture, security standards, and comprehensive quality assurance.`,
      serviceItems: [
        { description: `${config.title} Core Architecture & UI Design`, qty: 1, rate: Math.round(config.planAPrice * 0.4) },
        { description: "Backend Microservices & Security Auth Engine", qty: 1, rate: Math.round(config.planAPrice * 0.3) },
        { description: "Admin Governance Dashboard & Payment Integration", qty: 1, rate: Math.round(config.planAPrice * 0.3) }
      ],
      paymentTerms: "40% advance on kick-off\n30% on core milestone completion\n30% on final release & launch",
      termsAndConditions: "Estimation proposal valid for 30 days.\nIncludes 30 days complimentary post-launch support.",
      createdBy: "Quotation Proposal Studio",
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      await fetch(`${API_URL}/crm/quotation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuotation)
      });
      // Redirect directly to full Quotations page with active quote ID
      navigate(`/admin/quotations?id=${quoteId}`);
    } catch (err) {
      console.error(err);
      navigate(`/admin/quotations?id=${quoteId}`);
    } finally {
      setIsCreatingQuote(false);
    }
  };

  if (loading) {
    return (
      React.createElement('div', { className: "p-8 text-center text-slate-400 font-mono text-xs animate-pulse"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}, "Loading Project Full Details..."

      )
    );
  }

  if (!project) return null;

  return (
    React.createElement('div', { className: "space-y-6 max-w-5xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}
      /* Top Back Navigation Bar */
      , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
        , React.createElement('button', {
          onClick: () => navigate("/admin/projects"),
          className: "px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#FF5349] font-bold text-xs flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}

          , React.createElement(ArrowLeft, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}} ), " Back to Projects List"
        )
        , React.createElement('span', { className: "text-xs font-mono text-[#06132D] font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}, "PROJECT ID: "  , project.id)
      )

      /* Main Hero Header */
      , React.createElement('div', { className: "relative overflow-hidden rounded-2xl bg-[#06132D] p-6 sm:p-8 border border-slate-800/40 shadow-xl space-y-4 text-white"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}
        , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
            , React.createElement('div', { className: "flex items-center gap-2 mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}
              , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full bg-[#FF5349]/20 text-[#FF5349] text-[10px] font-extrabold border border-[#FF5349]/30 uppercase tracking-wider font-mono"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 210}}
                , project.category || "Full-Stack System"
              )
              , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
                , project.status || "In Progress"
              )
            )
            , React.createElement('h1', { className: "text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}
              , project.name
            )
            , React.createElement('p', { className: "text-xs sm:text-sm text-slate-300 font-semibold mt-1 flex items-center gap-1.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}
              , React.createElement(Building2, { size: 15, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}} ), " Client Account: "   , project.clientName
            )
          )

          /* Action Button to Create Proposal */
          , React.createElement('button', {
            onClick: () => setShowScopeModal(true),
            className: "px-5 py-3 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/25 transition-all self-start sm:self-auto shrink-0"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}

            , React.createElement(Plus, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}} ), " Create Proposal"
          )
        )

        , React.createElement('p', { className: "text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/60 leading-relaxed max-w-3xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}
          , project.description
        )
      )

      /* Metrics Row */
      , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
        , React.createElement('div', { className: "p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
          , React.createElement('span', { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}, "Estimated Budget" )
          , React.createElement('span', { className: "text-2xl font-black text-slate-900 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, "₹", Number(project.budget || 0).toLocaleString('en-IN'))
        )
        , React.createElement('div', { className: "p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
          , React.createElement('span', { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, "Priority Tier" )
          , React.createElement('span', { className: "text-2xl font-black text-[#FF5349] font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, project.priority || "High")
        )
        , React.createElement('div', { className: "p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}
          , React.createElement('span', { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}, "Assigned Lead" )
          , React.createElement('span', { className: "text-2xl font-black text-[#06132D] font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}, project.manager || "Admin Lead")
        )
      )

      /* Project Scope & Proposal Generation Modal */
      , showScopeModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}
          , React.createElement('div', { className: "bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-xl space-y-6 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}
            , React.createElement('div', { className: "flex items-center justify-between border-b border-slate-100 pb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
                , React.createElement('h2', { className: "text-lg font-black text-slate-900 font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
                  , React.createElement(Sparkles, { size: 20, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}} ), " Select Proposal Scope Type"
                )
                , React.createElement('p', { className: "text-xs font-medium text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}, "Choose the architectural scope for '"     , project.name, "'")
              )
              , React.createElement('button', {
                onClick: () => setShowScopeModal(false),
                className: "text-slate-400 hover:text-slate-700 text-sm font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}
, "✕"

              )
            )

            /* Scope Selection Options */
            , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}}
              , scopeTypes.map((st) => (
                React.createElement('div', {
                  key: st.key,
                  onClick: () => setSelectedScope(st.key),
                  className: `p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                    selectedScope === st.key
                      ? "bg-red-50/40 border-[#FF5349] shadow-sm ring-1 ring-[#FF5349]"
                      : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}}

                  , React.createElement('div', { className: "p-2.5 rounded-xl bg-white border border-slate-200 shrink-0 mt-0.5 shadow-xs"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}}, st.icon)
                  , React.createElement('div', { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}}
                    , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 288}}
                      , React.createElement('h3', { className: "text-sm font-extrabold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 289}}, st.title)
                      , React.createElement('span', { className: "text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-red-50 text-[#FF5349] border border-red-100 font-mono"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 290}}
                        , st.badge
                      )
                    )
                    , React.createElement('p', { className: "text-xs font-medium text-slate-500 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 294}}, st.desc)
                    , React.createElement('div', { className: "flex items-center gap-4 mt-2 text-[11px] font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}
                      , React.createElement('span', { className: "text-[#06132D] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}, "Plan A: ₹"  , st.planAPrice.toLocaleString('en-IN'))
                      , React.createElement('span', { className: "text-[#FF5349] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 297}}, "Plan B: ₹"  , st.planBPrice.toLocaleString('en-IN'))
                    )
                  )
                )
              ))
            )

            /* Modal Actions */
            , React.createElement('div', { className: "flex justify-end gap-3 pt-3 border-t border-slate-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}
              , React.createElement('button', {
                type: "button",
                onClick: () => setShowScopeModal(false),
                className: "px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
, "Cancel"

              )
              , React.createElement('button', {
                type: "button",
                onClick: handleGenerateProposal,
                disabled: isCreatingQuote,
                className: "px-5 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs flex items-center gap-2 shadow-md disabled:opacity-50"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 313}}

                , React.createElement(Zap, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 319}} ), " " , isCreatingQuote ? "Generating Proposal..." : "Generate & Open Quotation Full Page →"
              )
            )
          )
        )
      )
    )
  );
}

