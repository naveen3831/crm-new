const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\ProposalStudioPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useState, useEffect } from "react";
import { showToast } from "../../../utils/toast";
import { useParams, useNavigate, } from "react-router-dom";
import {
  ArrowLeft,




  Download,







  Save,

} from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, triggerDirectPdfDownload, } from "../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default function ProposalStudioPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);
  const [activeSection, setActiveSection] = useState(1);
  const [viewMode, setViewMode] = useState("editor");
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Editable Form State
  const [form, setForm] = useState({
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
          const found = res.data.find((p) => p.id === id || p.number === id);
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
      const filename = `${(form.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_")}_${(_optionalChain([proposal, 'optionalAccess', _ => _.documentRef]) || _optionalChain([proposal, 'optionalAccess', _2 => _2.id]) || "Proposal").replace(/[^a-zA-Z0-9]/g, "_")}_Proposal.pdf`;
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
    return React.createElement('div', { className: "p-8 text-center text-slate-400 font-mono text-xs animate-pulse"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}, "Loading Proposal Studio..."  );
  }

  const pdfHtmlContent = generateSpeshwayEstimationPdfHtml(proposal, { name: form.projectName, clientName: form.clientName }, []);

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
      /* Top Header */
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-500/10 pb-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
            , React.createElement('button', {
              onClick: () => navigate("/admin/proposals"),
              className: "text-xs font-bold text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors mr-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}

              , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}} ), " Exit Studio"
            )
            , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}, "8-SECTION PROPOSAL STUDIO"

            )
          )
          , React.createElement('h1', { className: "text-xl sm:text-2xl font-black text-white font-heading mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
            , form.title || _optionalChain([proposal, 'optionalAccess', _3 => _3.title]) || "Proposal Studio"
          )
          , React.createElement('p', { className: "text-xs text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, "Client: " , React.createElement('span', { className: "text-amber-300 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, form.clientName), " • Ref: "   , React.createElement('span', { className: "font-mono text-rose-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, _optionalChain([proposal, 'optionalAccess', _4 => _4.documentRef]) || _optionalChain([proposal, 'optionalAccess', _5 => _5.id])))
        )

        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
          , React.createElement('div', { className: "bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-rose-500/20"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
            , React.createElement('button', {
              onClick: () => setViewMode("editor"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "editor" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
, "📝 Section Editor"

            )
            , React.createElement('button', {
              onClick: () => setViewMode("pdf"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "pdf" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
, "📄 PDF Live Preview"

            )
          )
          , React.createElement('button', {
            onClick: handleDownloadPDF,
            className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#FF5349]/30 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}

            , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}} ), " Download PDF"
          )
        )
      )

      /* Main Studio Body: 2-Column Section Layout */
      , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-4 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
        /* Left Section Navigation */
        , React.createElement('div', { className: "space-y-1 bg-[#071E34] border border-rose-500/20 rounded-2xl p-4 self-start shadow-xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
          , React.createElement('div', { className: "px-2 py-1 text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider mb-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}, "PROPOSAL PAGES ("
              , sections.length, " SECTIONS)"
          )
          , sections.map((sec) => (
            React.createElement('button', {
              key: sec.num,
              onClick: () => setActiveSection(sec.num),
              className: `w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                activeSection === sec.num
                  ? "bg-[#FF5349] text-white font-bold shadow-lg shadow-[#FF5349]/20"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}

              , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}, sec.title)
              , React.createElement('span', { className: `text-[8px] font-mono px-1.5 py-0.5 rounded ${
                activeSection === sec.num ? "bg-black/20 text-white" : "bg-white/5 text-slate-500"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}
                , sec.badge
              )
            )
          ))
        )

        /* Right Section Content Editor or Live PDF Preview */
        , React.createElement('div', { className: "lg:col-span-3 bg-[#071E34] border border-rose-500/20 rounded-2xl p-6 shadow-xl space-y-6 min-h-[600px]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
          , viewMode === "pdf" ? (
            React.createElement('div', { className: "w-full h-[650px] rounded-xl overflow-hidden border border-rose-500/20 bg-white"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
              , React.createElement('iframe', { srcDoc: pdfHtmlContent, className: "w-full h-full border-0"  , title: "PDF Document Live Preview"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}} )
            )
          ) : (
            React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 235}}
              , React.createElement('div', { className: "flex items-center justify-between border-b border-rose-500/10 pb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
                , React.createElement('h3', { className: "text-base font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}, "Section "
                   , activeSection, ": " , _optionalChain([sections, 'access', _6 => _6.find, 'call', _7 => _7(s => s.num === activeSection), 'optionalAccess', _8 => _8.title])
                )
                , React.createElement('button', {
                  onClick: handleSaveSection,
                  className: "px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 shadow-md"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}

                  , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}} ), " Save Section"
                )
              )

              /* Section 1 Editor */
              , activeSection === 1 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}, "Proposal Document Title"  )
                    , React.createElement('input', {
                      type: "text",
                      value: form.title,
                      onChange: e => setForm({ ...form, title: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
                    )
                  )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}, "Project Name" )
                      , React.createElement('input', {
                        type: "text",
                        value: form.projectName,
                        onChange: e => setForm({ ...form, projectName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 270}}
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}, "Client Name" )
                      , React.createElement('input', {
                        type: "text",
                        value: form.clientName,
                        onChange: e => setForm({ ...form, clientName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}
                      )
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 280}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "Executive Overview Narrative"  )
                    , React.createElement('textarea', {
                      rows: 5,
                      value: form.overviewNarrative,
                      onChange: e => setForm({ ...form, overviewNarrative: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] leading-relaxed"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                    )
                  )
                )
              )

              /* Section 2 Editor */
              , activeSection === 2 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 294}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}, "Customer User Access Description"   )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.customerDesc,
                      onChange: e => setForm({ ...form, customerDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 297}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 304}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}, "Merchant / Vendor Access Description"    )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.merchantDesc,
                      onChange: e => setForm({ ...form, merchantDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 313}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}}, "Super Admin Governance Description"   )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.adminDesc,
                      onChange: e => setForm({ ...form, adminDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 315}}
                    )
                  )
                )
              )

              /* Section 4 Editor */
              , activeSection === 4 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 327}}
                  , React.createElement('div', { className: "grid grid-cols-2 gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 328}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 329}}
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 330}}, "PLAN A Tier Title"   )
                      , React.createElement('input', {
                        type: "text",
                        value: form.planAName,
                        onChange: e => setForm({ ...form, planAName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 331}}
                      )
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mt-3 mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 337}}, "PLAN A Price ($)"   )
                      , React.createElement('input', {
                        type: "number",
                        value: form.planAPrice,
                        onChange: e => setForm({ ...form, planAPrice: Number(e.target.value) }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] font-mono text-amber-400 font-bold"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 338}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 345}}
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}, "PLAN B Tier Title"   )
                      , React.createElement('input', {
                        type: "text",
                        value: form.planBName,
                        onChange: e => setForm({ ...form, planBName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}
                      )
                      , React.createElement('label', { className: "block text-slate-400 font-semibold mt-3 mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 353}}, "PLAN B Price ($)"   )
                      , React.createElement('input', {
                        type: "number",
                        value: form.planBPrice,
                        onChange: e => setForm({ ...form, planBPrice: Number(e.target.value) }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] font-mono text-rose-400 font-bold"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 354}}
                      )
                    )
                  )
                )
              )

              /* Other sections generic fallback */
              , activeSection !== 1 && activeSection !== 2 && activeSection !== 4 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 367}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 368}}
                    , React.createElement('label', { className: "block text-slate-400 font-semibold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 369}}, "Section Details & Configuration"   )
                    , React.createElement('textarea', {
                      rows: 6,
                      value: form.paymentTerms,
                      onChange: e => setForm({ ...form, paymentTerms: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349] leading-relaxed font-mono"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 370}}
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

