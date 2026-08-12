const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\admin\\QuoteReviewModal.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { ArrowLeft, Download, FileText, Maximize2, Save, Sparkles, } from "lucide-react";
import { showToast } from "../../utils/toast";


















export default function QuoteReviewModal({
  reviewingQuote,
  setReviewingQuote,
  reviewMode,
  setReviewMode,
  reviewerNotes,
  setReviewerNotes,
  features,
  activeProjectDetail,
  getCleanPlanComparisonItems,
  defaultPlanComparisonDeliverables,
  generateSpeshwayEstimationPdfHtml,
  triggerDirectPdfDownload,
  handleSaveQuotationSection,
  handleApproveQuotation
}) {
  if (!reviewingQuote) return null;

  const [activeSection, setActiveSection] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Local form state synchronized with reviewingQuote
  const [form, setForm] = useState({
    title: reviewingQuote.title || "",
    projectName: reviewingQuote.projectName || _optionalChain([activeProjectDetail, 'optionalAccess', _ => _.name]) || "Project",
    clientName: reviewingQuote.clientName || _optionalChain([activeProjectDetail, 'optionalAccess', _2 => _2.clientName]) || "Client",
    projectType: reviewingQuote.projectType || "Web Application",
    overviewNarrative: reviewingQuote.overviewNarrative || "The project is a modern, responsive web application designed to optimize client workflows.",
    planAName: reviewingQuote.planAName || "PLAN A — Responsive Web Portal",
    planAPrice: reviewingQuote.planAPrice || reviewingQuote.budget || 50000,
    planBName: reviewingQuote.planBName || "PLAN B — Full Web + Mobile Ecosystem",
    planBPrice: reviewingQuote.planBPrice || 65000,
    paymentTerms: reviewingQuote.paymentTerms || "40% advance on project kick-off\n30% on completion of core module\n30% on final release & launch",
    termsAndConditions: reviewingQuote.termsAndConditions || "Estimation is valid for 30 days from date of issue.\nIncludes 30 days complimentary post-launch support.",
    customerDesc: reviewingQuote.customerDesc || "Customer portal & role access specifications.",
    merchantDesc: reviewingQuote.merchantDesc || "Merchant & service vendor portal specifications.",
    adminDesc: reviewingQuote.adminDesc || "Super Admin panel & governance controls."
  });

  const reviewFeatures = features.filter(f => 
    f.projectId === reviewingQuote.projectId || 
    f.projectId === _optionalChain([activeProjectDetail, 'optionalAccess', _3 => _3.id]) || 
    f.projectName === reviewingQuote.projectName || 
    f.projectName === _optionalChain([activeProjectDetail, 'optionalAccess', _4 => _4.name])
  );
  
  const mergedQuote = { ...reviewingQuote, ...form };
  const pdfHtmlContent = generateSpeshwayEstimationPdfHtml(activeProjectDetail || mergedQuote, mergedQuote, reviewFeatures);

  const sections = [
    { num: 1, title: "1. Overview & Project Type", badge: "Overview" },
    { num: 2, title: "2. User Access & Roles", badge: "Roles" },
    { num: 3, title: "3. Features & Scope Modules", badge: "Scope" },
    { num: 4, title: "4. Tiered Pricing Plans", badge: "Pricing" },
    { num: 5, title: "5. Plan Deliverables Matrix", badge: "Matrix" },
    { num: 6, title: "6. Payment Terms & Schedule", badge: "Milestones" },
    { num: 7, title: "7. Terms & Conditions", badge: "Terms" },
    { num: 8, title: "8. Internal Notes & Approval", badge: "Notes" }
  ];

  const handleSaveCurrentSection = async () => {
    setIsSaving(true);
    try {
      await handleSaveQuotationSection(reviewingQuote.id || reviewingQuote.number, {
        ...form,
        reviewerNotes,
        notes: reviewerNotes
      });
      showToast(`Proposal Section ${activeSection} saved successfully!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Saved proposal details!", "success");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    React.createElement('div', { className: "w-full flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm min-h-[85vh] animate-in fade-in duration-200 font-sans"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}

      /* HEADER BAR */
      , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-4 shrink-0 flex-wrap gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
          , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
            , React.createElement('button', { 
              onClick: () => setReviewingQuote(null),
              className: "inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#FF5349] transition-colors mr-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}

              , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}} ), " Back to Proposals Workspace"
            )
            , React.createElement('span', { className: "text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}, "8-SECTION PROPOSAL QUOTATION STUDIO"

            )
            , React.createElement('span', { className: `text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
              reviewingQuote.status === "Approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}, "Status: "
               , reviewingQuote.status || "APPROVED"
            )
          )
          , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-lg sm:text-xl mt-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
            , form.title || reviewingQuote.title || `${form.projectName} Proposal Page`
          )
          , React.createElement('span', { className: "text-xs text-gray-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}, "Client: "
             , React.createElement('strong', { className: "text-gray-700", __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}, form.clientName), " • Document Ref: "    , React.createElement('span', { className: "font-mono text-[#FF5349]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}, reviewingQuote.id || reviewingQuote.number)
          )
        )

        /* TOP TAB TOGGLES & ACTIONS */
        , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
          , React.createElement('div', { className: "bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
            , React.createElement('button', {
              onClick: () => setReviewMode("live-editor"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                reviewMode === "live-editor" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}

              , React.createElement(FileText, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} ), " 8-Section Proposal Creation Page"
            )
            , React.createElement('button', {
              onClick: () => setReviewMode("exact-pdf"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                reviewMode === "exact-pdf" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
, "📄 Live PDF Preview"

            )
          )

          , React.createElement('button', {
            onClick: () => setIsFullScreen(true),
            className: "px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1.5 shadow-2xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}

            , React.createElement(Maximize2, { size: 14, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}} ), " Full Screen"
          )

          , React.createElement(Button, {
            onClick: () => {
              const compName = reviewingQuote.companyName || "Speshway_Solutions";
              const projTitle = form.projectName || "Project";
              const scopeTitle = form.projectType || "Quotation";
              triggerDirectPdfDownload(pdfHtmlContent, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
            },
            variant: "primary", size: "sm", className: "font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow-sm gap-1.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}

            , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}, "Download PDF" )
          )
        )
      )

      /* MAIN CONTENT WORKSPACE */
      , reviewMode === "exact-pdf" ? (
        React.createElement('div', { className: "flex-1 my-4 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner min-h-[650px]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
          , React.createElement('iframe', {
            srcDoc: pdfHtmlContent,
            className: "w-full h-full border-0 bg-white min-h-[650px]"    ,
            title: "Quotation PDF Live Document Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
          )
        )
      ) : (
        React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-4 gap-6 my-4 flex-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}
          /* Left Column: 8 Sections Navigator */
          , React.createElement('div', { className: "space-y-1.5 bg-gray-50/80 border border-gray-200 rounded-2xl p-4 self-start shadow-xs"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
            , React.createElement('div', { className: "px-2 py-1 text-[10px] font-mono font-bold text-[#FF5349] uppercase tracking-wider mb-1"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}, "PROPOSAL PAGES ("
                , sections.length, " SECTIONS)"
            )
            , sections.map((sec) => (
              React.createElement('button', {
                key: sec.num,
                onClick: () => setActiveSection(sec.num),
                className: `w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  activeSection === sec.num
                    ? "bg-blue-600 text-white font-bold shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}

                , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}, sec.title)
                , React.createElement('span', { className: `text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  activeSection === sec.num ? "bg-black/20 text-white" : "bg-gray-200 text-gray-600"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
                  , sec.badge
                )
              )
            ))
          )

          /* Right Column: 8 Section Editor Forms */
          , React.createElement('div', { className: "lg:col-span-3 bg-gray-50/50 border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6 min-h-[500px]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
            , React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}
              , React.createElement('div', { className: "flex items-center justify-between border-b border-gray-200 pb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
                , React.createElement('h4', { className: "text-sm font-bold text-[#071E34] font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
                  , React.createElement(Sparkles, { size: 16, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}, "Section " , activeSection, ": " , _optionalChain([sections, 'access', _5 => _5.find, 'call', _6 => _6(s => s.num === activeSection), 'optionalAccess', _7 => _7.title]))
                )
                , React.createElement('button', {
                  onClick: handleSaveCurrentSection,
                  disabled: isSaving,
                  className: "px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}

                  , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}} ), " " , isSaving ? "Saving..." : "Save Section"
                )
              )

              /* SECTION 1: OVERVIEW & PROJECT TYPE */
              , activeSection === 1 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}, "Proposal Document Title"  )
                    , React.createElement('input', {
                      type: "text",
                      value: form.title,
                      onChange: e => setForm({ ...form, title: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}
                    )
                  )
                  , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
                      , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, "Project Name" )
                      , React.createElement('input', {
                        type: "text",
                        value: form.projectName,
                        onChange: e => setForm({ ...form, projectName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}
                      , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}, "Client Name" )
                      , React.createElement('input', {
                        type: "text",
                        value: form.clientName,
                        onChange: e => setForm({ ...form, clientName: e.target.value }),
                        className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
                      )
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}, "Scope Category" )
                    , React.createElement('input', {
                      type: "text",
                      value: form.projectType,
                      onChange: e => setForm({ ...form, projectType: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 270}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}, "Executive Overview Narrative"  )
                    , React.createElement('textarea', {
                      rows: 5,
                      value: form.overviewNarrative,
                      onChange: e => setForm({ ...form, overviewNarrative: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}
                    )
                  )
                )
              )

              /* SECTION 2: USER ACCESS & ROLES */
              , activeSection === 2 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 285}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}}, "Customer / End-User Access Description"    )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.customerDesc,
                      onChange: e => setForm({ ...form, customerDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 294}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}, "Merchant / Service Vendor Access Description"     )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.merchantDesc,
                      onChange: e => setForm({ ...form, merchantDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 303}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 304}}, "Super Admin Governance & Control Description"     )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: form.adminDesc,
                      onChange: e => setForm({ ...form, adminDesc: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}
                    )
                  )
                )
              )

              /* SECTION 3: FEATURES & SCOPE MODULES */
              , activeSection === 3 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 317}}
                  , React.createElement('div', { className: "p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 318}}
                    , React.createElement('span', { className: "font-semibold", __self: this, __source: {fileName: _jsxFileName, lineNumber: 319}}, "Associated Project Features: "   , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 319}}, reviewFeatures.length, " Modules" ))
                  )
                  , reviewFeatures.map((feat, idx) => (
                    React.createElement('div', { key: idx, className: "p-3 bg-white border border-gray-200 rounded-xl space-y-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 322}}
                      , React.createElement('div', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 323}}, feat.name || feat.title)
                      , React.createElement('p', { className: "text-gray-600 text-[11px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 324}}, feat.description)
                    )
                  ))
                )
              )

              /* SECTION 4: TIERED PRICING PLANS */
              , activeSection === 4 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 332}}
                  , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 333}}
                    , React.createElement('div', { className: "p-4 bg-white border border-rose-200 rounded-xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 334}}
                      , React.createElement('label', { className: "block text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 335}}, "PLAN A Tier Title"   )
                      , React.createElement('input', {
                        type: "text",
                        value: form.planAName,
                        onChange: e => setForm({ ...form, planAName: e.target.value }),
                        className: "w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#071E34] font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 336}}
                      )
                      , React.createElement('label', { className: "block text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 342}}, "PLAN A Price (₹)"   )
                      , React.createElement('input', {
                        type: "number",
                        value: form.planAPrice,
                        onChange: e => setForm({ ...form, planAPrice: Number(e.target.value) }),
                        className: "w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#FF5349] font-extrabold text-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}}
                      )
                    )
                    , React.createElement('div', { className: "p-4 bg-white border border-amber-200 rounded-xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 350}}
                      , React.createElement('label', { className: "block text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 351}}, "PLAN B Tier Title"   )
                      , React.createElement('input', {
                        type: "text",
                        value: form.planBName,
                        onChange: e => setForm({ ...form, planBName: e.target.value }),
                        className: "w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#071E34] font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 352}}
                      )
                      , React.createElement('label', { className: "block text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 358}}, "PLAN B Price (₹)"   )
                      , React.createElement('input', {
                        type: "number",
                        value: form.planBPrice,
                        onChange: e => setForm({ ...form, planBPrice: Number(e.target.value) }),
                        className: "w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-amber-600 font-extrabold text-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 359}}
                      )
                    )
                  )
                )
              )

              /* SECTION 5: DELIVERABLES MATRIX */
              , activeSection === 5 && (
                React.createElement('div', { className: "space-y-2 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 372}}
                  , React.createElement('div', { className: "font-bold text-gray-700 mb-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 373}}, "Deliverables Comparison Items"  )
                  , defaultPlanComparisonDeliverables.map((item, i) => (
                    React.createElement('div', { key: i, className: "flex justify-between items-center p-2.5 bg-white border border-gray-200 rounded-xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}}
                      , React.createElement('span', { className: "font-medium text-gray-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 376}}, item.deliverable)
                      , React.createElement('div', { className: "flex gap-4 text-[11px] font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 377}}
                        , React.createElement('span', { className: item.planA ? "text-green-600" : "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 378}}, "Plan A: "  , item.planA ? "✓ Included" : "✕ Optional")
                        , React.createElement('span', { className: item.planB ? "text-green-600" : "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 379}}, "Plan B: "  , item.planB ? "✓ Included" : "✕ Optional")
                      )
                    )
                  ))
                )
              )

              /* SECTION 6: PAYMENT TERMS */
              , activeSection === 6 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 388}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 389}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 390}}, "Payment Schedule & Milestone Terms"    )
                    , React.createElement('textarea', {
                      rows: 5,
                      value: form.paymentTerms,
                      onChange: e => setForm({ ...form, paymentTerms: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed font-mono"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 391}}
                    )
                  )
                )
              )

              /* SECTION 7: TERMS & CONDITIONS */
              , activeSection === 7 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 403}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 404}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}, "Standard Terms & Proposal Validity"    )
                    , React.createElement('textarea', {
                      rows: 5,
                      value: form.termsAndConditions,
                      onChange: e => setForm({ ...form, termsAndConditions: e.target.value }),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed font-mono"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 406}}
                    )
                  )
                )
              )

              /* SECTION 8: INTERNAL NOTES & APPROVAL */
              , activeSection === 8 && (
                React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 418}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 419}}
                    , React.createElement('label', { className: "block text-gray-700 font-bold mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 420}}, "Reviewer Feedback & Internal Notes"    )
                    , React.createElement('textarea', {
                      rows: 5,
                      placeholder: "Enter internal notes, special discounts, or custom client agreement terms..."         ,
                      value: reviewerNotes,
                      onChange: e => setReviewerNotes(e.target.value),
                      className: "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 421}}
                    )
                  )
                )
              )
            )

            , React.createElement('div', { className: "pt-3 border-t border-gray-200 flex justify-between items-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 433}}
              , React.createElement('span', { className: "text-[11px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}}, "Proposal Page • Section "    , activeSection, " of "  , sections.length)
              , React.createElement('button', {
                onClick: handleSaveCurrentSection,
                disabled: isSaving,
                className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 435}}

                , React.createElement(Save, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 440}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 441}}, isSaving ? "Saving Section..." : "Save Proposal Section")
              )
            )
          )
        )
      )

      /* FULL SCREEN OVERLAY */
      , isFullScreen && (
        React.createElement('div', { className: "fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md p-4 flex flex-col gap-3 animate-in fade-in duration-150"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 450}}
          , React.createElement('div', { className: "flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-xl text-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 451}}
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}}
              , React.createElement('span', { className: "text-xs font-bold text-[#FF5349] font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 453}}, "100% FULL PAGE PROPOSAL VIEW"    )
              , React.createElement('span', { className: "text-xs font-bold border-l border-slate-700 pl-2 text-gray-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 454}}, form.title || reviewingQuote.title)
            )
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 456}}
              , React.createElement(Button, {
                onClick: () => {
                  const compName = reviewingQuote.companyName || "Speshway_Solutions";
                  const projTitle = form.projectName || "Project";
                  const scopeTitle = form.projectType || "Quotation";
                  triggerDirectPdfDownload(pdfHtmlContent, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                },
                variant: "secondary",
                size: "sm",
                className: "text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 border-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 457}}

                , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 468}} ), " Download PDF"
              )
              , React.createElement('button', {
                onClick: () => setIsFullScreen(false),
                className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 470}}
, "Close Full Screen"

              )
            )
          )
          , React.createElement('div', { className: "flex-1 bg-white rounded-xl border border-slate-800 overflow-hidden"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 478}}
            , React.createElement('iframe', {
              srcDoc: pdfHtmlContent,
              className: "w-full h-full border-0"  ,
              title: "Full Page PDF Proposal Document Preview"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 479}}
            )
          )
        )
      )

    )
  );
}


