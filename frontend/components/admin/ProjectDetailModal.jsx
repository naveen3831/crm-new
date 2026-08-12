const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\admin\\ProjectDetailModal.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React, { useState } from "react";
import { Trash2, Upload, ArrowLeft, Eye, Download, CheckCircle, ZoomIn, ZoomOut, RotateCcw, GripVertical } from "lucide-react";

import Button from "../ui/Button";
import { showToast } from "../../utils/toast";
import { getGlobalCompanyDetails } from "../../utils/pdfGenerator";
























export default function ProjectDetailModal({
  activeProjectDetail,
  setActiveProjectDetail,
  activeProjectTab,
  setActiveProjectTab,
  quotations,
  setQuotations,
  features,
  setFeatures,
  setReviewingQuote,
  API_URL,
  loadDatabase,
  defaultPlanComparisonDeliverables,
  getCleanPlanComparisonItems,
  generateSpeshwayEstimationPdfHtml,
  triggerDirectPdfDownload,
  universalSectionFileInputRef,
  activeSectionToUpload,
  setActiveSectionToUpload,
  handleUniversalSectionFileUpload,
  handleSaveQuotationSection
}) {
  // Inline feature form states
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatModule, setNewFeatModule] = useState("Core Architecture");
  const [newFeatDesc, setNewFeatDesc] = useState("");
  const [newFeatPriority, setNewFeatPriority] = useState("High");
  const [isAddingFeat, setIsAddingFeat] = useState(false);
  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(0.6);

  // Stateful Drag-and-Drop for Feature Cards
  const [draggedFeatIdx, setDraggedFeatIdx] = useState(null);
  const [dragOverFeatIdx, setDragOverFeatIdx] = useState(null);

  if (!activeProjectDetail) return null;

  const foundQuote = quotations.find(q => 
    (q.projectId && q.projectId === activeProjectDetail.id) || 
    (q.projectName && activeProjectDetail.name && q.projectName.toLowerCase() === activeProjectDetail.name.toLowerCase()) ||
    (q.id && q.id === `QT-${activeProjectDetail.id}`)
  );

  const globalBranding = getGlobalCompanyDetails();

  const defaultQuote = {
    id: `QT-${activeProjectDetail.id || "0001"}`,
    number: `QT-${activeProjectDetail.id || "0001"}`,
    projectId: activeProjectDetail.id,
    title: `${activeProjectDetail.name || activeProjectDetail.title} Custom Estimation Proposal`,
    clientName: activeProjectDetail.clientName || "Enterprise Client",
    projectName: activeProjectDetail.name || activeProjectDetail.title,
    projectType: activeProjectDetail.category || "Web Application",
    planAName: "PLAN A - Without WebSockets",
    planAPrice: 50000,
    planBName: "PLAN B - With WebSockets",
    planBPrice: 65000,
    currency: "Indian Rupees (INR)",
    planComparisonItems: defaultPlanComparisonDeliverables,
    overviewNarrative: activeProjectDetail.description || "",
    userRoles: [
      { id: "1", title: "Customer Portal User", description: "Customer portal & cart checkout." },
      { id: "2", title: "Merchant / Seller Portal User", description: "Merchant portal & booking management." },
      { id: "3", title: "Super Admin Portal User", description: "Admin panel & ecosystem governance." }
    ],
    customerDesc: "Customer portal & cart checkout.",
    merchantDesc: "Merchant portal & booking management.",
    adminDesc: "Admin panel & ecosystem governance.",
    paymentTerms: "40% advance on project kick-off\n30% on completion of core module development & UAT build\n30% on final delivery, deployment & go-live",
    termsAndConditions: "Estimation valid for 30 days.\nIncludes 30 days complimentary bug-fix support.\nSource code handed over upon full payment.",
    companyName: "Speshway Solutions Private Limited",
    companyTagline: "Website & App Development Company - Hyderabad, India",
    companyEmail: "info@speshway.com",
    companyPhone: "+91 91000 06020",
    companyWebsite: "www.speshway.com",
    companyGstin: "36AAAAA0000A1Z5",
    companyAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
    companyLogoUrl: globalBranding.companyLogoUrl || "/logo.png",
    companyWatermarkUrl: globalBranding.companyWatermarkUrl || "/watermark.png",
    showWatermark: globalBranding.showWatermark !== undefined ? globalBranding.showWatermark : true,
    companyWatermarkText: globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS",
    companyWatermarkOpacity: _nullishCoalesce(globalBranding.companyWatermarkOpacity, () => ( 0.25)),
    companyWatermarkContrast: _nullishCoalesce(globalBranding.companyWatermarkContrast, () => ( 150)),
    companyWatermarkGrayscale: _nullishCoalesce(globalBranding.companyWatermarkGrayscale, () => ( false)),
    companyWatermarkRotation: 0,
    companyWatermarkSize: _nullishCoalesce(globalBranding.companyWatermarkSize, () => ( 50)),
    companyWatermarkImgSize: _nullishCoalesce(globalBranding.companyWatermarkImgSize, () => ( 290)),
    pdfPrimaryColor: "#FF5349",
    pdfSecondaryColor: "#FF857E",
    status: "Approved"
  };

  const activeQuote = foundQuote ? { ...defaultQuote, ...foundQuote } : defaultQuote;

  const updateQuoteField = (updatedFields) => {
    setQuotations(prev => {
      const matchIdx = prev.findIndex(q => 
        q.id === activeQuote.id || 
        (q ).number === activeQuote.id || 
        q.projectId === activeProjectDetail.id ||
        (activeProjectDetail.name && q.projectName === activeProjectDetail.name)
      );
      const mergedQuote = { ...activeQuote, ...updatedFields };
      if (matchIdx !== -1) {
        const copy = [...prev];
        copy[matchIdx] = mergedQuote;
        return copy;
      } else {
        return [mergedQuote, ...prev];
      }
    });
  };

  const saveQuoteSection = async (updatedFields) => {
    const mergedQuote = { ...activeQuote, ...updatedFields };
    updateQuoteField(updatedFields);
    await handleSaveQuotationSection(activeQuote.id || activeQuote.number, mergedQuote);
  };

  const activeCompItems = getCleanPlanComparisonItems(activeQuote.planComparisonItems);

  const activeUserRoles = activeQuote.userRoles && activeQuote.userRoles.length > 0
    ? activeQuote.userRoles
    : [
        { id: "1", title: "Customer Portal User", description: activeQuote.customerDesc || "Customer portal & cart checkout." },
        { id: "2", title: "Merchant / Seller Portal User", description: activeQuote.merchantDesc || "Merchant portal & booking management." },
        { id: "3", title: "Super Admin Portal User", description: activeQuote.adminDesc || "Admin panel & ecosystem governance." }
      ];

  const proposalTabs = [
    { id: "overview", label: "1. Overview & Project Type", icon: "📄", page: "PDF Page 1" },
    { id: "user-roles", label: "2. User Access & Roles", icon: "👥", page: "PDF Page 1" },
    { id: "features", label: "3. Features & Scope", icon: "⚡", page: "PDF Page 2" },
    { id: "investment-plans", label: "4. Investment Plans", icon: "💰", page: "PDF Page 3" },
    { id: "plan-comparison", label: "5. Plan Comparison", icon: "📊", page: "PDF Page 3" },
    { id: "payment-terms", label: "6. Payment Terms", icon: "💳", page: "PDF Page 4" },
    { id: "terms-conditions", label: "7. Terms & Conditions", icon: "📜", page: "PDF Page 4" },
    { id: "company-details", label: "8. Company Details", icon: "🏢", page: "PDF Header" }
  ];

  const handleAddFeatureInline = async (e) => {
    e.preventDefault();
    if (!newFeatTitle.trim()) return;

    const payload = {
      id: `FEAT-${Date.now().toString().slice(-4)}`,
      projectId: activeProjectDetail.id,
      projectName: activeProjectDetail.name || activeProjectDetail.title,
      title: newFeatTitle,
      moduleName: newFeatModule,
      description: newFeatDesc || "Feature deliverable specification included in technical scope.",
      requirementType: "Functional Deliverable",
      priority: newFeatPriority,
      assignedDeveloper: "Unassigned Lead",
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      estimatedHours: 40,
      progress: 0,
      status: "Planned",
      clientApproval: true,
      notes: "Created via proposal manager workspace."
    };

    try {
      const res = await fetch(`${API_URL}/crm/feature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setFeatures(prev => [data.data, ...prev]);
      } else {
        setFeatures(prev => [payload, ...prev]);
      }
      setNewFeatTitle("");
      setNewFeatDesc("");
      setIsAddingFeat(false);
    } catch (err) {
      setFeatures(prev => [payload, ...prev]);
      setNewFeatTitle("");
      setNewFeatDesc("");
      setIsAddingFeat(false);
    }
  };

  return (
    React.createElement('div', { className: "w-full flex-1 flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[85vh] animate-in fade-in duration-200 font-sans"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}
      , React.createElement('input', { 
        type: "file", 
        ref: universalSectionFileInputRef, 
        accept: ".txt,.json,.csv,.doc,.docx,.pdf", 
        onChange: (e) => {
          handleUniversalSectionFileUpload(e, activeProjectTab, activeQuote);
          if (e.target) e.target.value = "";
        }, 
        className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}} 
      )

      /* LEFT PROJECT PROPOSAL PAGES SIDEBAR */
      , React.createElement('aside', { className: "w-full md:w-72 bg-white text-gray-700 flex flex-col justify-between shrink-0 p-5 border-r border-gray-200 overflow-y-auto"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}
        , React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}
          /* BACK TO PROPOSALS PAGE BUTTON ON TOP LEFT SIDEBAR */
          , React.createElement('button', {
            type: "button",
            onClick: () => setActiveProjectDetail(null),
            className: "w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"                 , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}

            , React.createElement(ArrowLeft, { size: 14, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}, "< Back to Proposals Page"    )
          )

          /* PROJECT HEADER BADGE */
          , React.createElement('div', { className: "border-b border-gray-150 pb-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}
              , React.createElement('span', { className: "text-[10px] font-mono text-[#FF5349] font-bold uppercase tracking-wider"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
                , activeProjectDetail.id, " • WORKSPACE"
              )
              , React.createElement('button', { 
                onClick: () => setActiveProjectDetail(null), 
                className: "text-gray-400 hover:text-gray-700 text-xl md:hidden font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}
, "×"

              )
            )
            , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base mt-1 line-clamp-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}
              , activeProjectDetail.name || activeProjectDetail.title
            )
            , React.createElement('span', { className: "text-xs text-gray-500 block mt-0.5 font-sans"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}, "Client: "
               , activeProjectDetail.clientName || "Enterprise Client"
            )
            , React.createElement('div', { className: "mt-2.5 flex items-center gap-2 flex-wrap"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
              , React.createElement('span', { className: "text-[9px] font-extrabold uppercase bg-rose-50 text-[#FF5349] border border-rose-200 px-2 py-0.5 rounded-full"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}, "STATUS: "
                 , activeQuote.status || "APPROVED"
              )
              , React.createElement('span', { className: "text-[9px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}
                , activeQuote.id || activeQuote.number
              )
            )
          )

          /* PROPOSAL PAGES VERTICAL NAVIGATION LIST */
          , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}}
            , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}, "PROPOSAL PAGES (8 SECTIONS)"

            )
            , proposalTabs.map(t => {
              const isActive = activeProjectTab === t.id || (activeProjectTab === "quotations" && t.id === "plan-comparison");
              return (
                React.createElement('button', {
                  key: t.id,
                  onClick: () => setActiveProjectTab(t.id),
                  className: `w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs text-left transition-all ${
                    isActive
                      ? "bg-[#FF5349] text-white shadow-md shadow-rose-500/20 scale-[1.02]" 
                      : "text-gray-600 hover:text-[#071E34] hover:bg-gray-100"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}

                  , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 291}}
                    , React.createElement('span', { className: "text-sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}, t.icon)
                    , React.createElement('span', { className: "font-semibold tracking-wide text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, t.label)
                  )
                  , React.createElement('span', { className: `text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                    isActive ? "bg-black/20 text-white" : "bg-gray-100 text-gray-500"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}
                    , t.page
                  )
                )
              );
            })
          )
        )

        /* SIDEBAR BOTTOM ACTION BUTTONS */
        , React.createElement('div', { className: "pt-4 border-t border-gray-150 space-y-2 mt-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}
          , React.createElement(Button, {
            onClick: () => setShowPdfPreviewModal(true),
            variant: "primary",
            size: "sm",
            className: "w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md border-0 transition-all flex items-center justify-center gap-1.5"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}

            , React.createElement(Eye, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 315}}, "Review PDF Proposal"  )
          )

          , React.createElement(Button, {
            onClick: () => {
              const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
              const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures);
              const compName = activeQuote.companyName || "Speshway_Solutions";
              const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
              const scopeTitle = activeQuote.projectType || "Quotation";
              triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
            },
            variant: "secondary",
            size: "sm",
            className: "w-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-1.5"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 318}}

            , React.createElement(Download, { size: 14, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 331}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 332}}, "Download Report PDF"  )
          )

          , React.createElement('button', { 
            onClick: () => setActiveProjectDetail(null), 
            className: "w-full py-2 text-center text-xs text-gray-500 hover:text-[#071E34] font-bold transition-all flex items-center justify-center gap-1"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 335}}

            , React.createElement(ArrowLeft, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 339}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 340}}, "Exit Project Workspace"  )
          )
        )
      )

      /* RIGHT MAIN WORKSPACE CANVAS */
      , React.createElement('main', { className: "flex-1 bg-slate-50/50 p-6 md:p-8 flex flex-col overflow-y-auto"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}
        , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-4 mb-6 shrink-0 flex-wrap gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 348}}
            , React.createElement('span', { className: "text-[10px] font-bold uppercase tracking-wider text-[#FF5349] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 349}}, "ACTIVE SECTION PAGE: "
                 , activeProjectTab.toUpperCase().replace('-', ' ')
            )
            , React.createElement('h2', { className: "text-xl font-heading font-extrabold text-[#071E34] mt-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 352}}
              , activeProjectTab === "overview" && "1. Project Overview & Type Configuration"
              , activeProjectTab === "user-roles" && "2. Target User Roles & Access Architecture"
              , activeProjectTab === "features" && "3. Technical Scope & Feature Deliverables"
              , activeProjectTab === "investment-plans" && "4. Commercial Investment Plans"
              , activeProjectTab === "plan-comparison" && "5. Detailed Feature Comparison Matrix"
              , activeProjectTab === "payment-terms" && "6. Milestone Payment Schedule & Terms"
              , activeProjectTab === "terms-conditions" && "7. Support & Project Terms and Conditions"
              , activeProjectTab === "company-details" && "8. Company Details & Proposal Branding"
            )
          )
          , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 363}}
            , React.createElement(Button, { 
              type: "button",
              onClick: async () => {
                await saveQuoteSection({});
                showToast(`Proposal document '${activeQuote.title || activeQuote.id}' updated and saved to database successfully!`, "success");
              },
              variant: "primary",
              size: "sm",
              className: "bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all border-0"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 364}}

              , React.createElement(CheckCircle, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 374}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 375}}, "Update Proposal" )
            )
            , React.createElement(Button, { 
              type: "button",
              onClick: () => {
                setActiveSectionToUpload(activeProjectTab);
                _optionalChain([universalSectionFileInputRef, 'access', _2 => _2.current, 'optionalAccess', _3 => _3.click, 'call', _4 => _4()]);
              },
              variant: "secondary",
              size: "sm",
              className: "text-xs py-2 px-3.5 flex items-center gap-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl shadow-sm transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 377}}

              , React.createElement(Upload, { size: 14, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 387}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 388}}, "Upload Section Doc"  )
            )
            , React.createElement(Button, {
              type: "button",
              onClick: async () => {
                if (!confirm(`Delete proposal document '${activeQuote.title || activeQuote.id}' permanently from database?`)) return;
                try {
                  await fetch(`${API_URL}/crm/quotation/${activeQuote.id || activeQuote.number}`, { method: "DELETE" });
                  setQuotations(prev => prev.filter(q => q.id !== activeQuote.id && (q ).number !== activeQuote.id));
                  showToast("Proposal document deleted from database successfully!", "success");
                  setActiveProjectDetail(null);
                } catch (err) {
                  setQuotations(prev => prev.filter(q => q.id !== activeQuote.id));
                  setActiveProjectDetail(null);
                }
              },
              variant: "secondary",
              size: "sm",
              className: "bg-rose-50 hover:bg-rose-100 text-[#FF5349] font-bold text-xs py-2 px-3 rounded-xl border border-rose-200 flex items-center gap-1.5"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 390}}

              , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 408}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 409}}, "Delete Proposal" )
            )
            , React.createElement(Button, { 
              onClick: () => setActiveProjectDetail(null), 
              variant: "secondary", 
              size: "sm", 
              className: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2 px-3.5 rounded-xl border border-gray-200 flex items-center gap-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 411}}

              , React.createElement(ArrowLeft, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 417}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 418}}, "Exit Page" )
            )
          )
        )

        , React.createElement('div', { className: "flex flex-col xl:flex-row gap-6 flex-1 items-start w-full"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 423}}
          , React.createElement('div', { className: "flex-1 text-xs text-gray-700 space-y-6 w-full"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 424}}

          /* 1. OVERVIEW NARRATIVE & PROJECT TYPE TAB */
          , (activeProjectTab === "overview" || activeProjectTab === "project-details") && (
            React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 428}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 429}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 430}}, "1. Project Type Selection & Executive Narrative"      )
                , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 431}}, "PDF Page 1"  )
              )

              , React.createElement('div', { className: "p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}}
                , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 435}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 436}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 437}}, "Project Scope & Type"   )
                    , React.createElement('input', {
                      type: "text",
                      readOnly: true,
                      disabled: true,
                      value: activeQuote.projectType || activeProjectDetail.category || "Website Application",
                      className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs font-extrabold text-blue-950 bg-rose-50/80 border-rose-200 cursor-not-allowed"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 438}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 447}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 448}}, "Proposal Document Title"  )
                    , React.createElement('input', {
                      type: "text",
                      value: activeQuote.title || "",
                      placeholder: "Enter quotation proposal title..."   ,
                      onChange: e => updateQuoteField({ title: e.target.value }),
                      className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 449}}
                    )
                  )
                )
              )

              , React.createElement('div', { className: "p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 460}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 461}}, "Executive Overview Narrative"  )
                , React.createElement('textarea', {
                  rows: 6,
                  value: activeQuote.overviewNarrative || activeProjectDetail.description || "",
                  onChange: e => updateQuoteField({ overviewNarrative: e.target.value }),
                  className: "w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 462}}
                )
                , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 468}}
                  , React.createElement(Button, { 
                    type: "button", 
                    onClick: () => saveQuoteSection({ projectType: activeQuote.projectType, overviewNarrative: activeQuote.overviewNarrative }),
                    variant: "primary", size: "sm", className: "w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 469}}
, "Save Narrative & Type"

                  )
                )
              )
            )
          )

          /* 2. USER ACCESS & ROLES TAB */
          , activeProjectTab === "user-roles" && (
            React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 483}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 485}}, "2. Target User Access & Roles Architecture"      )
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 486}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 487}}, "PDF Page 1"  )
                  , React.createElement(Button, {
                    type: "button",
                    onClick: async () => {
                      const updated = [
                        ...activeUserRoles,
                        { id: Date.now().toString(), title: `New Role (${activeUserRoles.length + 1})`, description: "Role permissions & access capabilities." }
                      ];
                      await saveQuoteSection({ userRoles: updated });
                    },
                    variant: "secondary",
                    size: "sm",
                    className: "text-xs py-1 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 488}}
, "+ Add New Role"

                  )
                )
              )

              , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 506}}
                , activeUserRoles.map((role, idx) => (
                  React.createElement('div', { key: role.id || idx, className: "p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 relative"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 508}}
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 509}}
                      , React.createElement('input', {
                        type: "text",
                        value: role.title,
                        onChange: e => {
                          const val = e.target.value;
                          const updated = activeUserRoles.map((r, i) => i === idx ? { ...r, title: val } : r);
                          updateQuoteField({ userRoles: updated });
                        },
                        className: "font-extrabold text-[#071E34] text-xs uppercase bg-gray-50 border border-gray-200 rounded p-1.5 focus:outline-none focus:border-[#FF5349] w-full mr-2"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 510}}
                      )
                      , activeUserRoles.length > 1 && (
                        React.createElement('button', {
                          onClick: async () => {
                            if (!confirm("Delete this user role?")) return;
                            const updated = activeUserRoles.filter((_, i) => i !== idx);
                            await saveQuoteSection({ userRoles: updated });
                          },
                          className: "text-red-400 hover:text-red-600 p-1 font-bold"   ,
                          title: "Delete Role" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 521}}

                          , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 530}} )
                        )
                      )
                    )

                    , React.createElement('textarea', {
                      rows: 4,
                      value: role.description,
                      onChange: e => {
                        const val = e.target.value;
                        const updated = activeUserRoles.map((r, i) => i === idx ? { ...r, description: val } : r);
                        updateQuoteField({ userRoles: updated });
                      },
                      className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:outline-none focus:border-[#FF5349] resize-none text-[#071E34]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 535}}
                    )
                  )
                ))
              )

              , React.createElement(Button, { 
                type: "button", 
                onClick: () => saveQuoteSection({ userRoles: activeUserRoles }),
                variant: "primary", size: "sm", className: "w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 549}}
, "Save User Access Roles"

              )
            )
          )

          /* 3. FEATURES TAB */
          , activeProjectTab === "features" && (
            React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 561}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 562}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 563}}, "3. Technical Features & Scope"    )
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 564}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 565}}, "PDF Page 2"  )
                  , React.createElement(Button, {
                    type: "button",
                    onClick: () => setIsAddingFeat(prev => !prev),
                    variant: "secondary",
                    size: "sm",
                    className: "text-xs py-1 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 566}}

                    , isAddingFeat ? "Cancel" : "+ Add Feature to Scope"
                  )
                )
              )

              , isAddingFeat && (
                React.createElement('form', { onSubmit: handleAddFeatureInline, className: "p-4 bg-rose-50/60 rounded-xl border border-rose-200 flex flex-col gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 579}}
                  , React.createElement('span', { className: "text-xs font-bold text-rose-700 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 580}}, "Create New Technical Feature"   )
                  , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 581}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 583}}, "Feature Title" )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        placeholder: "e.g. Real-Time Chat & Booking Gateway"     ,
                        value: newFeatTitle,
                        onChange: e => setNewFeatTitle(e.target.value),
                        className: "w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 584}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 593}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 594}}, "Module Name" )
                      , React.createElement('input', {
                        type: "text",
                        placeholder: "e.g. Core Booking Module"   ,
                        value: newFeatModule,
                        onChange: e => setNewFeatModule(e.target.value),
                        className: "w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 595}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 603}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 604}}, "Priority Level" )
                      , React.createElement('select', {
                        value: newFeatPriority,
                        onChange: e => setNewFeatPriority(e.target.value ),
                        className: "w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 605}}

                        , React.createElement('option', { value: "Low", __self: this, __source: {fileName: _jsxFileName, lineNumber: 610}}, "Low")
                        , React.createElement('option', { value: "Medium", __self: this, __source: {fileName: _jsxFileName, lineNumber: 611}}, "Medium")
                        , React.createElement('option', { value: "High", __self: this, __source: {fileName: _jsxFileName, lineNumber: 612}}, "High")
                        , React.createElement('option', { value: "Critical", __self: this, __source: {fileName: _jsxFileName, lineNumber: 613}}, "Critical")
                      )
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 617}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 618}}, "Feature Specification Description"  )
                    , React.createElement('textarea', {
                      rows: 2,
                      placeholder: "Enter detailed feature scope description..."    ,
                      value: newFeatDesc,
                      onChange: e => setNewFeatDesc(e.target.value),
                      className: "w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none resize-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 619}}
                    )
                  )
                  , React.createElement(Button, { type: "submit", variant: "primary", size: "sm", className: "w-fit text-xs py-1.5 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl border-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 627}}, "+ Add Feature"

                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 633}}
                , features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name).map((feat, idx) => {
                  const isDragging = draggedFeatIdx === idx;
                  const isDragOver = dragOverFeatIdx === idx;

                  return (
                    React.createElement('div', { 
                      key: feat.id || idx, 
                      draggable: true,
                      onDragStart: (e) => {
                        setDraggedFeatIdx(idx);
                        e.dataTransfer.effectAllowed = "move";
                      },
                      onDragOver: (e) => {
                        e.preventDefault();
                        if (dragOverFeatIdx !== idx) setDragOverFeatIdx(idx);
                      },
                      onDrop: (e) => {
                        e.preventDefault();
                        if (draggedFeatIdx !== null && draggedFeatIdx !== idx) {
                          setFeatures(prev => {
                            const copy = [...prev];
                            const [moved] = copy.splice(draggedFeatIdx, 1);
                            copy.splice(idx, 0, moved);
                            return copy;
                          });
                          showToast("Feature cards re-ordered!", "info");
                        }
                        setDraggedFeatIdx(null);
                        setDragOverFeatIdx(null);
                      },
                      onDragEnd: () => {
                        setDraggedFeatIdx(null);
                        setDragOverFeatIdx(null);
                      },
                      className: `p-3 rounded-xl border flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing transition-all ${
                        isDragging 
                          ? "opacity-40 bg-rose-50 border-dashed border-[#FF5349]" 
                          : isDragOver 
                          ? "bg-rose-50 border-[#FF5349] ring-2 ring-[#FF5349]/30" 
                          : "bg-white border-gray-200 shadow-sm hover:border-gray-300"
                      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 639}}

                      , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 676}}
                        , React.createElement('div', { className: "p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0"     , title: "Drag to reorder feature"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 677}}
                          , React.createElement(GripVertical, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 678}} )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 680}}
                          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 681}}
                            , React.createElement('span', { className: "font-mono text-[10px] text-[#FF5349] bg-rose-50 px-1.5 py-0.5 rounded font-bold border border-rose-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 682}}, feat.id)
                            , React.createElement('span', { className: "font-bold text-[#071E34] text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 683}}, feat.title)
                            , React.createElement('span', { className: "text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 684}}, feat.moduleName)
                          )
                          , React.createElement('p', { className: "text-[11px] text-gray-600 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 686}}, feat.description)
                        )
                      )
                      , React.createElement('button', { 
                        onClick: async () => {
                          if (!confirm(`Delete feature '${feat.title}'?`)) return;
                          try {
                            await fetch(`${API_URL}/crm/feature/${feat.id}`, { method: "DELETE" });
                            setFeatures(prev => prev.filter(f => f.id !== feat.id));
                          } catch (err) {
                            setFeatures(prev => prev.filter(f => f.id !== feat.id));
                          }
                        },
                        className: "text-red-400 hover:text-red-600 p-1 transition-colors"   ,
                        title: "Delete Feature" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}

                        , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 702}} )
                      )
                    )
                  );
                })
              )
            )
          )

          /* 4. INVESTMENT PLANS TAB */
          , activeProjectTab === "investment-plans" && (
            React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 713}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 714}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 715}}, "4. Commercial Investment Plans"   )
                , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 716}}, "PDF Page 3"  )
              )

              , React.createElement('div', { className: "flex justify-between items-center bg-rose-50/70 p-4 rounded-xl border border-rose-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 719}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 720}}
                  , React.createElement('span', { className: "text-xs font-extrabold text-[#071E34] block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 721}}, "Include Plan B (Web + Mobile App Dual Engagement Option)"         )
                  , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 722}}, "Toggle ON to include Plan B in Section 4 Investment Plans & Section 5 Comparison Matrix in PDF"                 )
                )
                , React.createElement('label', { className: "relative inline-flex items-center cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}}
                  , React.createElement('input', {
                    type: "checkbox",
                    checked: activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false,
                    onChange: e => updateQuoteField({ includePlanB: e.target.checked, enablePlanB: e.target.checked }),
                    className: "sr-only peer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 725}}
                  )
                  , React.createElement('div', { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5349]"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 731}})
                )
              )

              , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 735}}
                , React.createElement('div', { className: "p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 736}}
                  , React.createElement('div', { className: "flex items-center justify-between border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 737}}
                    , React.createElement('span', { className: "text-xs font-extrabold text-gray-900 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 738}}, "Plan A Config"  )
                    , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 739}}, "Always Primary" )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 741}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-600 uppercase block mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 742}}, "Plan A Package Name"   )
                    , React.createElement('input', {
                      type: "text",
                      value: activeQuote.planAName || "PLAN A — WEB PLATFORM ONLY",
                      onChange: e => updateQuoteField({ planAName: e.target.value }),
                      className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 743}}
                    )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 750}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-600 uppercase block mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 751}}, "Plan A Price (INR ₹)"    )
                    , React.createElement('input', {
                      type: "number",
                      value: activeQuote.planAPrice !== undefined && activeQuote.planAPrice !== null ? activeQuote.planAPrice : 50000,
                      onChange: e => updateQuoteField({ planAPrice: e.target.value === "" ? "" : Number(e.target.value) }),
                      className: "w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 752}}
                    )
                  )
                )

                , (activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false) ? (
                  React.createElement('div', { className: "p-4 bg-rose-50/30 rounded-xl border border-rose-200 shadow-sm flex flex-col gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 762}}
                    , React.createElement('div', { className: "flex items-center justify-between border-b border-rose-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 763}}
                      , React.createElement('span', { className: "text-xs font-extrabold text-blue-900 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 764}}, "Plan B Config (Optional Package)"    )
                      , React.createElement('span', { className: "text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 765}}, "Recommended")
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 767}}
                      , React.createElement('label', { className: "text-[10px] font-bold text-gray-600 uppercase block mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 768}}, "Plan B Package Name"   )
                      , React.createElement('input', {
                        type: "text",
                        value: activeQuote.planBName || "PLAN B — WEB + MOBILE APP",
                        onChange: e => updateQuoteField({ planBName: e.target.value }),
                        className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 769}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 776}}
                      , React.createElement('label', { className: "text-[10px] font-bold text-gray-600 uppercase block mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 777}}, "Plan B Price (INR ₹)"    )
                      , React.createElement('input', {
                        type: "number",
                        value: activeQuote.planBPrice !== undefined && activeQuote.planBPrice !== null ? activeQuote.planBPrice : 85000,
                        onChange: e => updateQuoteField({ planBPrice: e.target.value === "" ? "" : Number(e.target.value) }),
                        className: "w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}
                      )
                    )
                  )
                ) : (
                  React.createElement('div', { className: "p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center gap-2 min-h-[160px]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 787}}
                    , React.createElement('span', { className: "text-xs font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 788}}, "Plan B Option Disabled"   )
                    , React.createElement('p', { className: "text-[10px] text-gray-400 max-w-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 789}}, "PDF proposals will generate with single Plan A package only."         )
                  )
                )
              )

              , React.createElement(Button, { 
                type: "button", 
                onClick: () => saveQuoteSection({ 
                  includePlanB: activeQuote.includePlanB,
                  enablePlanB: activeQuote.enablePlanB,
                  planAName: activeQuote.planAName,
                  planAPrice: activeQuote.planAPrice,
                  planBName: activeQuote.planBName,
                  planBPrice: activeQuote.planBPrice 
                }),
                variant: "primary", size: "sm", className: "w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 794}}
, "Save Investment Plans & Config"

              )
            )
          )

          /* 5. PLAN COMPARISON TAB */
          , (activeProjectTab === "plan-comparison" || activeProjectTab === "quotations") && (() => {
            const isPlanBEnabled = activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false;
            return (
              React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 815}}
                , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 816}}
                  , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 817}}, "5. Feature Deliverables Comparison Matrix"    )
                  , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 818}}, "PDF Page 3"  )
                )

                , React.createElement('div', { className: "flex justify-between items-center bg-rose-50/70 p-4 rounded-xl border border-rose-200 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 821}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 822}}
                    , React.createElement('span', { className: "text-xs font-extrabold text-[#071E34] block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 823}}, "Include Plan B (Dual Option Engagement)"     )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 824}}, "Toggle OFF for single Plan A proposal. Toggle ON for dual Plan A + Plan B choices."                )
                  )
                  , React.createElement('label', { className: "relative inline-flex items-center cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 826}}
                    , React.createElement('input', {
                      type: "checkbox",
                      checked: isPlanBEnabled,
                      onChange: e => {
                        const checked = e.target.checked;
                        saveQuoteSection({ includePlanB: checked, enablePlanB: checked });
                      },
                      className: "sr-only peer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 827}}
                    )
                    , React.createElement('div', { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5349]"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 836}})
                  )
                )

                , React.createElement('div', { className: "overflow-x-auto rounded-xl border border-gray-200 shadow-sm"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 840}}
                  , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 841}}
                    , React.createElement('thead', { className: "bg-gray-100 text-gray-700 font-bold text-[11px] uppercase border-b border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 842}}
                      , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 843}}
                        , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 844}}, "Deliverable / Feature Description"   )
                        , React.createElement('th', { className: "p-3 text-center w-36"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 845}}, activeQuote.planAName || "PLAN A")
                        , isPlanBEnabled && React.createElement('th', { className: "p-3 text-center w-36"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 846}}, activeQuote.planBName || "PLAN B")
                        , React.createElement('th', { className: "p-3 text-center w-16"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 847}}, "Action")
                      )
                    )
                    , React.createElement('tbody', { className: "divide-y divide-gray-100 bg-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                      , activeCompItems.map((item, idx) => (
                        React.createElement('tr', { key: idx, className: "hover:bg-gray-50/60", __self: this, __source: {fileName: _jsxFileName, lineNumber: 852}}
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 853}}
                            , React.createElement('input', {
                              type: "text",
                              value: item.deliverable,
                              onChange: e => {
                                const val = e.target.value;
                                const updated = activeCompItems.map((it, i) => i === idx ? { ...it, deliverable: val } : it);
                                updateQuoteField({ planComparisonItems: updated });
                              },
                              className: "w-full p-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50 text-[#071E34] focus:outline-none focus:border-[#FF5349] font-medium"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 854}}
                            )
                          )
                          , React.createElement('td', { className: "p-3 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 865}}
                            , React.createElement('input', {
                              type: "checkbox",
                              checked: item.planA,
                              onChange: e => {
                                const checked = e.target.checked;
                                const updated = activeCompItems.map((it, i) => i === idx ? { ...it, planA: checked } : it);
                                updateQuoteField({ planComparisonItems: updated });
                              },
                              className: "w-4 h-4 text-[#FF5349] accent-[#FF5349] rounded cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 866}}
                            )
                          )
                          , isPlanBEnabled && (
                            React.createElement('td', { className: "p-3 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 878}}
                              , React.createElement('input', {
                                type: "checkbox",
                                checked: item.planB,
                                onChange: e => {
                                  const checked = e.target.checked;
                                  const updated = activeCompItems.map((it, i) => i === idx ? { ...it, planB: checked } : it);
                                  updateQuoteField({ planComparisonItems: updated });
                                },
                                className: "w-4 h-4 text-[#FF5349] accent-[#FF5349] rounded cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 879}}
                              )
                            )
                          )
                          , React.createElement('td', { className: "p-3 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 891}}
                            , React.createElement('button', {
                              onClick: async () => {
                                if (!confirm("Delete this comparison row?")) return;
                                const updated = activeCompItems.filter((_, i) => i !== idx);
                                await saveQuoteSection({ planComparisonItems: updated });
                              },
                              className: "text-red-400 hover:text-red-600 p-1 font-bold text-sm"    ,
                              title: "Delete Comparison Row"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 892}}
, "×"

                            )
                          )
                        )
                      ))
                    )
                  )
                )

                , React.createElement('div', { className: "flex items-center gap-3 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}
                  , React.createElement(Button, { 
                    type: "button", 
                    onClick: async () => {
                      const updated = [...activeCompItems, { deliverable: "New Custom Deliverable", planA: true, planB: true }];
                      await saveQuoteSection({ planComparisonItems: updated });
                    },
                    variant: "secondary", size: "sm", className: "text-xs py-2 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 911}}
, "+ Add Comparison Row"

                  )
                  , React.createElement(Button, { 
                    type: "button", 
                    onClick: async () => {
                      await saveQuoteSection({ 
                        includePlanB: activeQuote.includePlanB,
                        enablePlanB: activeQuote.enablePlanB,
                        planComparisonItems: activeCompItems 
                      });
                      showToast("Feature Comparison Matrix saved to Database!", "success");
                    },
                    variant: "primary", size: "sm", className: "text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 921}}
, "Save Matrix to Database"

                  )
                )
              )
            );
          })()

          /* 6. PAYMENT TERMS TAB */
          , activeProjectTab === "payment-terms" && (
            React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 942}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 943}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 944}}, "6. Payment Terms & Milestone Schedule"     )
                , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 945}}, "PDF Page 4"  )
              )
              , React.createElement('div', { className: "p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 947}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 948}}, "MILESTONE PAYMENT TERMS BREAKDOWN"   )
                , React.createElement('textarea', {
                  rows: 6,
                  value: activeQuote.paymentTerms || "40% advance on project kick-off\n30% on completion of core module development & UAT build\n30% on final delivery, deployment & go-live",
                  onChange: e => updateQuoteField({ paymentTerms: e.target.value }),
                  className: "w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 949}}
                )
                , React.createElement(Button, { 
                  type: "button", 
                  onClick: () => saveQuoteSection({ paymentTerms: activeQuote.paymentTerms }),
                  variant: "primary", size: "sm", className: "w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 955}}
, "Save Payment Terms"

                )
              )
            )
          )

          /* 7. TERMS & CONDITIONS TAB */
          , activeProjectTab === "terms-conditions" && (
            React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 968}}
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 969}}
                , React.createElement('h4', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 970}}, "7. Support & Project Terms and Conditions"      )
                , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 971}}, "PDF Page 4"  )
              )
              , React.createElement('div', { className: "p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 973}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 974}}, "TERMS AND CONDITIONS"  )
                , React.createElement('textarea', {
                  rows: 6,
                  value: activeQuote.termsAndConditions || "Estimation valid for 30 days.\nIncludes 30 days complimentary bug-fix support.\nSource code handed over upon full payment.",
                  onChange: e => updateQuoteField({ termsAndConditions: e.target.value }),
                  className: "w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 975}}
                )
                , React.createElement(Button, { 
                  type: "button", 
                  onClick: () => saveQuoteSection({ termsAndConditions: activeQuote.termsAndConditions }),
                  variant: "primary", size: "sm", className: "w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 981}}
, "Save Terms & Conditions"

                )
              )
            )
          )

          /* 8. COMPANY DETAILS & BRANDING TAB */
          , activeProjectTab === "company-details" && (
            React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 994}}
              , React.createElement('div', { className: "p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 995}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 996}}, "BRANDING & PDF CONFIGURATION"   )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 997}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-600 uppercase block mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 998}}, "Company Logo URL"  )
                  , React.createElement('input', {
                    type: "text",
                    placeholder: "https://...",
                    value: activeQuote.companyLogoUrl || "",
                    onChange: e => updateQuoteField({ companyLogoUrl: e.target.value }),
                    onBlur: e => saveQuoteSection({ companyLogoUrl: e.target.value }),
                    className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 999}}
                  )
                  , activeQuote.companyLogoUrl && (
                    React.createElement('div', { className: "mt-2 flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-200 w-fit"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1008}}
                      , React.createElement('img', { src: activeQuote.companyLogoUrl, alt: "Company Logo Preview"  , className: "h-8 w-auto max-w-[120px] object-contain rounded-lg bg-white p-1 border border-gray-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1009}} )
                      , React.createElement('span', { className: "text-[10px] font-mono text-[#FF5349] font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1010}}, "Logo Uploaded" )
                      , React.createElement('button', {
                        type: "button",
                        onClick: () => saveQuoteSection({ companyLogoUrl: "" }),
                        className: "text-xs text-red-500 hover:text-red-700 font-bold px-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1011}}
, "× Remove"

                      )
                    )
                  )
                )

                , React.createElement('div', { className: "flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 w-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1022}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1023}}
                    , React.createElement('span', { className: "font-bold text-gray-900 text-xs block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1024}}, "Background PDF Watermark"  )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1025}}, "Enable or disable watermark display on generated PDF"       )
                  )
                  , React.createElement('label', { className: "relative inline-flex items-center cursor-pointer shrink-0 ml-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1027}}
                    , React.createElement('input', { 
                      type: "checkbox", 
                      checked: activeQuote.showWatermark !== false,
                      onChange: e => saveQuoteSection({ showWatermark: e.target.checked }),
                      className: "sr-only peer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1028}}
                    )
                    , React.createElement('div', { className: "w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF5349]"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1034}})
                  )
                )

                , React.createElement('div', { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1038}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1039}}, "Background PDF Watermark Text"   )
                  , React.createElement('input', {
                    type: "text",
                    placeholder: "e.g. SPESHWAY SOLUTIONS"  ,
                    value: activeQuote.companyWatermarkText || activeQuote.companyName || "SPESHWAY SOLUTIONS",
                    onChange: e => updateQuoteField({ companyWatermarkText: e.target.value }),
                    onBlur: e => saveQuoteSection({ companyWatermarkText: e.target.value }),
                    className: "w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1040}}
                  )
                )
              )
            )
          )

          )

          /* RIGHT SIDEBAR LIVE PDF PREVIEW CANVAS */
          , React.createElement('div', { className: "w-full xl:w-[480px] shrink-0 space-y-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1056}}
            , React.createElement('div', { className: "flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1057}}
              , React.createElement('span', { className: "text-xs font-extrabold text-[#071E34] flex items-center gap-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1058}}
                , React.createElement(Eye, { size: 14, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1059}} ), " Live Quotation PDF Preview"
              )

              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1062}}
                , React.createElement('div', { className: "flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1063}}
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setPreviewZoom(0.6),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      previewZoom === 0.6 ? "bg-[#FF5349] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "Fit to Box (60%)"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1064}}
, "Fit Box"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setPreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom Out (-5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1074}}

                    , React.createElement(ZoomOut, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1080}} )
                  )
                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1082}}
                    , Math.round(previewZoom * 100), "%"
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setPreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom In (+5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1085}}

                    , React.createElement(ZoomIn, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1091}} )
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setPreviewZoom(1.0),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      previewZoom === 1.0 ? "bg-[#FF5349] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "100% Actual Size"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1093}}
, "100%"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setPreviewZoom(0.6),
                    className: "p-1 text-gray-400 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"     ,
                    title: "Reset to 60%"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1103}}

                    , React.createElement(RotateCcw, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1109}} )
                  )
                )

                , React.createElement('button', {
                  type: "button",
                  onClick: () => {
                    const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
                    const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures, previewZoom);
                    const compName = activeQuote.companyName || "Speshway_Solutions";
                    const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
                    const scopeTitle = activeQuote.projectType || "Quotation";
                    triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                  },
                  className: "px-3 py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all border-0"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1113}}

                  , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1125}} ), " Download PDF"
                )
              )
            )

            , React.createElement('div', { className: "w-full h-[750px] border border-gray-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900 flex justify-center items-center"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1130}}
              , React.createElement('iframe', {
                key: `${activeQuote.pdfPrimaryColor}-${activeQuote.pdfSecondaryColor}-${activeQuote.companyLogoUrl}-${activeQuote.companyWatermarkOpacity}-${activeQuote.companyWatermarkContrast}-${activeQuote.companyWatermarkRotation}-${activeQuote.companyWatermarkSize}-${activeQuote.companyWatermarkImgSize}-${activeQuote.companyWatermarkGrayscale}-${activeQuote.showWatermark}-${previewZoom}`,
                srcDoc: generateSpeshwayEstimationPdfHtml(
                  activeProjectDetail, 
                  activeQuote, 
                  features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name),
                  previewZoom
                ),
                className: "w-full h-full border-0 bg-slate-900"   ,
                style: { overflowX: "hidden" },
                title: "Live Quotation PDF Preview"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1131}}
              )
            )
          )
        )
      )

      /* LIVE PDF PREVIEW MODAL OVERLAY */
      , showPdfPreviewModal && (
        React.createElement('div', { className: "fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 flex flex-col gap-3 animate-in fade-in duration-150 font-sans"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1150}}
          , React.createElement('div', { className: "flex justify-between items-center bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1151}}
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1152}}
              , React.createElement('span', { className: "text-xs font-bold text-[#FF5349] font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1153}}, "LIVE PDF PROPOSAL PREVIEW"   )
              , React.createElement('span', { className: "text-xs font-bold border-l border-slate-700 pl-2 text-gray-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1154}}
                , activeProjectDetail.name || activeProjectDetail.title, " (" , activeQuote.id || activeQuote.number, ")"
              )
            )
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1158}}
              , React.createElement(Button, {
                onClick: () => {
                  const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
                  const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures, 1.0);
                  const compName = activeQuote.companyName || "Speshway_Solutions";
                  const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
                  const scopeTitle = activeQuote.projectType || "Quotation";
                  triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                },
                variant: "primary",
                size: "sm",
                className: "text-xs font-bold bg-[#FF5349] hover:bg-[#F05454] text-white border-0 gap-1.5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1159}}

                , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1172}} ), " Download PDF"
              )

              , React.createElement('button', {
                onClick: () => setShowPdfPreviewModal(false),
                className: "px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1175}}
, "Close Preview"

              )
            )
          )
          , React.createElement('div', { className: "flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex justify-center items-center"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1183}}
            , React.createElement('iframe', {
              srcDoc: generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name)),
              className: "w-full h-full border-0 bg-slate-950"   ,
              title: "Full Page PDF Proposal Document Preview"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1184}}
            )
          )
        )
      )
    )
  );
}
