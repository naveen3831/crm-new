"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit3, Upload, ArrowLeft, Eye, Download, FileText, CheckCircle, Building2, Sparkles, Layers, ShieldCheck, ZoomIn, ZoomOut, RotateCcw, Palette, GripVertical } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";
import { saveGlobalCompanyDetails, getGlobalCompanyDetails } from "../../utils/pdfGenerator";

interface ProjectDetailModalProps {
  activeProjectDetail: any;
  setActiveProjectDetail: (val: any) => void;
  activeProjectTab: string;
  setActiveProjectTab: (val: string) => void;
  quotations: any[];
  setQuotations: React.Dispatch<React.SetStateAction<any[]>>;
  features: any[];
  setFeatures: React.Dispatch<React.SetStateAction<any[]>>;
  setReviewingQuote: (val: any) => void;
  API_URL: string;
  loadDatabase: () => Promise<void>;
  defaultPlanComparisonDeliverables: any[];
  getCleanPlanComparisonItems: (items: any) => any[];
  generateSpeshwayEstimationPdfHtml: (proj: any, quote: any, feats: any, zoom?: number) => string;
  triggerDirectPdfDownload: (html: string, filename: string) => void;
  universalSectionFileInputRef: React.RefObject<HTMLInputElement>;
  activeSectionToUpload: string;
  setActiveSectionToUpload: (val: string) => void;
  handleUniversalSectionFileUpload: (e: React.ChangeEvent<HTMLInputElement>, sectionId: string, quote: any) => void;
  handleSaveQuotationSection: (quoteId: string, updatedFields: any) => Promise<void>;
}

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
}: ProjectDetailModalProps) {
  // Inline feature form states
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatModule, setNewFeatModule] = useState("Core Architecture");
  const [newFeatDesc, setNewFeatDesc] = useState("");
  const [newFeatPriority, setNewFeatPriority] = useState<"Low" | "Medium" | "High" | "Critical">("High");
  const [isAddingFeat, setIsAddingFeat] = useState(false);
  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);
  const [previewZoom, setPreviewZoom] = useState<number>(0.6);

  // Stateful Drag-and-Drop for Feature Cards
  const [draggedFeatIdx, setDraggedFeatIdx] = useState<number | null>(null);
  const [dragOverFeatIdx, setDragOverFeatIdx] = useState<number | null>(null);

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
    companyWatermarkOpacity: globalBranding.companyWatermarkOpacity ?? 0.25,
    companyWatermarkContrast: globalBranding.companyWatermarkContrast ?? 150,
    companyWatermarkGrayscale: globalBranding.companyWatermarkGrayscale ?? false,
    companyWatermarkRotation: 0,
    companyWatermarkSize: globalBranding.companyWatermarkSize ?? 50,
    companyWatermarkImgSize: globalBranding.companyWatermarkImgSize ?? 290,
    pdfPrimaryColor: "#FF5349",
    pdfSecondaryColor: "#FF857E",
    status: "Approved"
  };

  const activeQuote = foundQuote ? { ...defaultQuote, ...foundQuote } : defaultQuote;

  const updateQuoteField = (updatedFields: Record<string, any>) => {
    setQuotations(prev => {
      const matchIdx = prev.findIndex(q => 
        q.id === activeQuote.id || 
        (q as any).number === activeQuote.id || 
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

  const saveQuoteSection = async (updatedFields: Record<string, any>) => {
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

  const handleAddFeatureInline = async (e: React.FormEvent) => {
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
    <div className="w-full flex-1 flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[85vh] animate-in fade-in duration-200 font-sans">
      <input 
        type="file" 
        ref={universalSectionFileInputRef} 
        accept=".txt,.json,.csv,.doc,.docx,.pdf" 
        onChange={(e) => {
          handleUniversalSectionFileUpload(e, activeProjectTab, activeQuote);
          if (e.target) e.target.value = "";
        }} 
        className="hidden" 
      />

      {/* LEFT PROJECT PROPOSAL PAGES SIDEBAR */}
      <aside className="w-full md:w-72 bg-white text-gray-700 flex flex-col justify-between shrink-0 p-5 border-r border-gray-200 overflow-y-auto">
        <div className="space-y-5">
          {/* BACK TO PROPOSALS PAGE BUTTON ON TOP LEFT SIDEBAR */}
          <button
            type="button"
            onClick={() => setActiveProjectDetail(null)}
            className="w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
          >
            <ArrowLeft size={14} className="text-[#FF5349]" />
            <span>&lt; Back to Proposals Page</span>
          </button>

          {/* PROJECT HEADER BADGE */}
          <div className="border-b border-gray-150 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#FF5349] font-bold uppercase tracking-wider">
                {activeProjectDetail.id} &bull; WORKSPACE
              </span>
              <button 
                onClick={() => setActiveProjectDetail(null)} 
                className="text-gray-400 hover:text-gray-700 text-xl md:hidden font-bold"
              >
                &times;
              </button>
            </div>
            <h3 className="font-heading font-extrabold text-[#071E34] text-base mt-1 line-clamp-1">
              {activeProjectDetail.name || activeProjectDetail.title}
            </h3>
            <span className="text-xs text-gray-500 block mt-0.5 font-sans">
              Client: {activeProjectDetail.clientName || "Enterprise Client"}
            </span>
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-extrabold uppercase bg-rose-50 text-[#FF5349] border border-rose-200 px-2 py-0.5 rounded-full">
                STATUS: {activeQuote.status || "APPROVED"}
              </span>
              <span className="text-[9px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                {activeQuote.id || activeQuote.number}
              </span>
            </div>
          </div>

          {/* PROPOSAL PAGES VERTICAL NAVIGATION LIST */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
              PROPOSAL PAGES (8 SECTIONS)
            </span>
            {proposalTabs.map(t => {
              const isActive = activeProjectTab === t.id || (activeProjectTab === "quotations" && t.id === "plan-comparison");
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveProjectTab(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs text-left transition-all ${
                    isActive
                      ? "bg-[#FF5349] text-white shadow-md shadow-rose-500/20 scale-[1.02]" 
                      : "text-gray-600 hover:text-[#071E34] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{t.icon}</span>
                    <span className="font-semibold tracking-wide text-[11px]">{t.label}</span>
                  </div>
                  <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                    isActive ? "bg-black/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {t.page}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR BOTTOM ACTION BUTTONS */}
        <div className="pt-4 border-t border-gray-150 space-y-2 mt-4">
          <Button
            onClick={() => setShowPdfPreviewModal(true)}
            variant="primary"
            size="sm"
            className="w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md border-0 transition-all flex items-center justify-center gap-1.5"
          >
            <Eye size={14} />
            <span>Review PDF Proposal</span>
          </Button>
          
          <Button
            onClick={() => {
              const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
              const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures);
              const compName = activeQuote.companyName || "Speshway_Solutions";
              const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
              const scopeTitle = activeQuote.projectType || "Quotation";
              triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
            }}
            variant="secondary"
            size="sm"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-1.5"
          >
            <Download size={14} className="text-[#FF5349]" />
            <span>Download Report PDF</span>
          </Button>

          <button 
            onClick={() => setActiveProjectDetail(null)} 
            className="w-full py-2 text-center text-xs text-gray-500 hover:text-[#071E34] font-bold transition-all flex items-center justify-center gap-1"
          >
            <ArrowLeft size={12} />
            <span>Exit Project Workspace</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE CANVAS */}
      <main className="flex-1 bg-slate-50/50 p-6 md:p-8 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6 shrink-0 flex-wrap gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5349] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              ACTIVE SECTION PAGE: {activeProjectTab.toUpperCase().replace('-', ' ')}
            </span>
            <h2 className="text-xl font-heading font-extrabold text-[#071E34] mt-1.5">
              {activeProjectTab === "overview" && "1. Project Overview & Type Configuration"}
              {activeProjectTab === "user-roles" && "2. Target User Roles & Access Architecture"}
              {activeProjectTab === "features" && "3. Technical Scope & Feature Deliverables"}
              {activeProjectTab === "investment-plans" && "4. Commercial Investment Plans"}
              {activeProjectTab === "plan-comparison" && "5. Detailed Feature Comparison Matrix"}
              {activeProjectTab === "payment-terms" && "6. Milestone Payment Schedule & Terms"}
              {activeProjectTab === "terms-conditions" && "7. Support & Project Terms and Conditions"}
              {activeProjectTab === "company-details" && "8. Company Details & Proposal Branding"}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              type="button"
              onClick={async () => {
                await saveQuoteSection({});
                showToast(`Proposal document '${activeQuote.title || activeQuote.id}' updated and saved to database successfully!`, "success");
              }}
              variant="primary"
              size="sm"
              className="bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all border-0"
            >
              <CheckCircle size={14} />
              <span>Update Proposal</span>
            </Button>
            <Button 
              type="button"
              onClick={() => {
                setActiveSectionToUpload(activeProjectTab);
                universalSectionFileInputRef.current?.click();
              }}
              variant="secondary"
              size="sm"
              className="text-xs py-2 px-3.5 flex items-center gap-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl shadow-sm transition-all"
            >
              <Upload size={14} className="text-[#FF5349]" />
              <span>Upload Section Doc</span>
            </Button>
            <Button
              type="button"
              onClick={async () => {
                if (!confirm(`Delete proposal document '${activeQuote.title || activeQuote.id}' permanently from database?`)) return;
                try {
                  await fetch(`${API_URL}/crm/quotation/${activeQuote.id || activeQuote.number}`, { method: "DELETE" });
                  setQuotations(prev => prev.filter(q => q.id !== activeQuote.id && (q as any).number !== activeQuote.id));
                  showToast("Proposal document deleted from database successfully!", "success");
                  setActiveProjectDetail(null);
                } catch (err) {
                  setQuotations(prev => prev.filter(q => q.id !== activeQuote.id));
                  setActiveProjectDetail(null);
                }
              }}
              variant="secondary"
              size="sm"
              className="bg-rose-50 hover:bg-rose-100 text-[#FF5349] font-bold text-xs py-2 px-3 rounded-xl border border-rose-200 flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              <span>Delete Proposal</span>
            </Button>
            <Button 
              onClick={() => setActiveProjectDetail(null)} 
              variant="secondary" 
              size="sm" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-2 px-3.5 rounded-xl border border-gray-200 flex items-center gap-1"
            >
              <ArrowLeft size={12} />
              <span>Exit Page</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 flex-1 items-start w-full">
          <div className="flex-1 text-xs text-gray-700 space-y-6 w-full">

          {/* 1. OVERVIEW NARRATIVE & PROJECT TYPE TAB */}
          {(activeProjectTab === "overview" || activeProjectTab === "project-details") && (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">1. Project Type Selection & Executive Narrative</h4>
                <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 1</span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Project Scope & Type</label>
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={activeQuote.projectType || activeProjectDetail.category || "Website Application"}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-extrabold text-blue-950 bg-rose-50/80 border-rose-200 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Proposal Document Title</label>
                    <input
                      type="text"
                      value={activeQuote.title || ""}
                      placeholder="Enter quotation proposal title..."
                      onChange={e => updateQuoteField({ title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Executive Overview Narrative</label>
                <textarea
                  rows={6}
                  value={activeQuote.overviewNarrative || activeProjectDetail.description || ""}
                  onChange={e => updateQuoteField({ overviewNarrative: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <Button 
                    type="button" 
                    onClick={() => saveQuoteSection({ projectType: activeQuote.projectType, overviewNarrative: activeQuote.overviewNarrative })}
                    variant="primary" size="sm" className="w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
                  >
                    Save Narrative & Type
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 2. USER ACCESS & ROLES TAB */}
          {activeProjectTab === "user-roles" && (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">2. Target User Access & Roles Architecture</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 1</span>
                  <Button
                    type="button"
                    onClick={async () => {
                      const updated = [
                        ...activeUserRoles,
                        { id: Date.now().toString(), title: `New Role (${activeUserRoles.length + 1})`, description: "Role permissions & access capabilities." }
                      ];
                      await saveQuoteSection({ userRoles: updated });
                    }}
                    variant="secondary"
                    size="sm"
                    className="text-xs py-1 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl"
                  >
                    + Add New Role
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeUserRoles.map((role: any, idx: number) => (
                  <div key={role.id || idx} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={role.title}
                        onChange={e => {
                          const val = e.target.value;
                          const updated = activeUserRoles.map((r: any, i: number) => i === idx ? { ...r, title: val } : r);
                          updateQuoteField({ userRoles: updated });
                        }}
                        className="font-extrabold text-[#071E34] text-xs uppercase bg-gray-50 border border-gray-200 rounded p-1.5 focus:outline-none focus:border-[#FF5349] w-full mr-2"
                      />
                      {activeUserRoles.length > 1 && (
                        <button
                          onClick={async () => {
                            if (!confirm("Delete this user role?")) return;
                            const updated = activeUserRoles.filter((_: any, i: number) => i !== idx);
                            await saveQuoteSection({ userRoles: updated });
                          }}
                          className="text-red-400 hover:text-red-600 p-1 font-bold"
                          title="Delete Role"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={4}
                      value={role.description}
                      onChange={e => {
                        const val = e.target.value;
                        const updated = activeUserRoles.map((r: any, i: number) => i === idx ? { ...r, description: val } : r);
                        updateQuoteField({ userRoles: updated });
                      }}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:outline-none focus:border-[#FF5349] resize-none text-[#071E34]"
                    />
                  </div>
                ))}
              </div>

              <Button 
                type="button" 
                onClick={() => saveQuoteSection({ userRoles: activeUserRoles })}
                variant="primary" size="sm" className="w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
              >
                Save User Access Roles
              </Button>
            </div>
          )}

          {/* 3. FEATURES TAB */}
          {activeProjectTab === "features" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">3. Technical Features & Scope</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 2</span>
                  <Button
                    type="button"
                    onClick={() => setIsAddingFeat(prev => !prev)}
                    variant="secondary"
                    size="sm"
                    className="text-xs py-1 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl"
                  >
                    {isAddingFeat ? "Cancel" : "+ Add Feature to Scope"}
                  </Button>
                </div>
              </div>

              {isAddingFeat && (
                <form onSubmit={handleAddFeatureInline} className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 flex flex-col gap-3">
                  <span className="text-xs font-bold text-rose-700 uppercase">Create New Technical Feature</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase">Feature Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Real-Time Chat & Booking Gateway"
                        value={newFeatTitle}
                        onChange={e => setNewFeatTitle(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase">Module Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Core Booking Module"
                        value={newFeatModule}
                        onChange={e => setNewFeatModule(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase">Priority Level</label>
                      <select
                        value={newFeatPriority}
                        onChange={e => setNewFeatPriority(e.target.value as any)}
                        className="w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase">Feature Specification Description</label>
                    <textarea
                      rows={2}
                      placeholder="Enter detailed feature scope description..."
                      value={newFeatDesc}
                      onChange={e => setNewFeatDesc(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="sm" className="w-fit text-xs py-1.5 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl border-0">
                    + Add Feature
                  </Button>
                </form>
              )}

              <div className="flex flex-col gap-2">
                {features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name).map((feat, idx) => {
                  const isDragging = draggedFeatIdx === idx;
                  const isDragOver = dragOverFeatIdx === idx;

                  return (
                    <div 
                      key={feat.id || idx} 
                      draggable
                      onDragStart={(e) => {
                        setDraggedFeatIdx(idx);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (dragOverFeatIdx !== idx) setDragOverFeatIdx(idx);
                      }}
                      onDrop={(e) => {
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
                      }}
                      onDragEnd={() => {
                        setDraggedFeatIdx(null);
                        setDragOverFeatIdx(null);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing transition-all ${
                        isDragging 
                          ? "opacity-40 bg-rose-50 border-dashed border-[#FF5349]" 
                          : isDragOver 
                          ? "bg-rose-50 border-[#FF5349] ring-2 ring-[#FF5349]/30" 
                          : "bg-white border-gray-200 shadow-sm hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0" title="Drag to reorder feature">
                          <GripVertical size={15} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#FF5349] bg-rose-50 px-1.5 py-0.5 rounded font-bold border border-rose-200">{feat.id}</span>
                            <span className="font-bold text-[#071E34] text-xs">{feat.title}</span>
                            <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{feat.moduleName}</span>
                          </div>
                          <p className="text-[11px] text-gray-600 mt-0.5">{feat.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={async () => {
                          if (!confirm(`Delete feature '${feat.title}'?`)) return;
                          try {
                            await fetch(`${API_URL}/crm/feature/${feat.id}`, { method: "DELETE" });
                            setFeatures(prev => prev.filter(f => f.id !== feat.id));
                          } catch (err) {
                            setFeatures(prev => prev.filter(f => f.id !== feat.id));
                          }
                        }}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors"
                        title="Delete Feature"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. INVESTMENT PLANS TAB */}
          {activeProjectTab === "investment-plans" && (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">4. Commercial Investment Plans</h4>
                <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 3</span>
              </div>

              <div className="flex justify-between items-center bg-rose-50/70 p-4 rounded-xl border border-rose-200">
                <div>
                  <span className="text-xs font-extrabold text-[#071E34] block">Include Plan B (Web + Mobile App Dual Engagement Option)</span>
                  <span className="text-[10px] text-gray-500">Toggle ON to include Plan B in Section 4 Investment Plans & Section 5 Comparison Matrix in PDF</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false}
                    onChange={e => updateQuoteField({ includePlanB: e.target.checked, enablePlanB: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5349]"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-extrabold text-gray-900 uppercase">Plan A Config</span>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Always Primary</span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Plan A Package Name</label>
                    <input
                      type="text"
                      value={activeQuote.planAName || "PLAN A — WEB PLATFORM ONLY"}
                      onChange={e => updateQuoteField({ planAName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Plan A Price (INR &#8377;)</label>
                    <input
                      type="number"
                      value={activeQuote.planAPrice !== undefined && activeQuote.planAPrice !== null ? activeQuote.planAPrice : 50000}
                      onChange={e => updateQuoteField({ planAPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"
                    />
                  </div>
                </div>

                {(activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false) ? (
                  <div className="p-4 bg-rose-50/30 rounded-xl border border-rose-200 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                      <span className="text-xs font-extrabold text-blue-900 uppercase">Plan B Config (Optional Package)</span>
                      <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Recommended</span>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Plan B Package Name</label>
                      <input
                        type="text"
                        value={activeQuote.planBName || "PLAN B — WEB + MOBILE APP"}
                        onChange={e => updateQuoteField({ planBName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Plan B Price (INR &#8377;)</label>
                      <input
                        type="number"
                        value={activeQuote.planBPrice !== undefined && activeQuote.planBPrice !== null ? activeQuote.planBPrice : 85000}
                        onChange={e => updateQuoteField({ planBPrice: e.target.value === "" ? "" : Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center gap-2 min-h-[160px]">
                    <span className="text-xs font-bold text-gray-500">Plan B Option Disabled</span>
                    <p className="text-[10px] text-gray-400 max-w-xs">PDF proposals will generate with single Plan A package only.</p>
                  </div>
                )}
              </div>

              <Button 
                type="button" 
                onClick={() => saveQuoteSection({ 
                  includePlanB: activeQuote.includePlanB,
                  enablePlanB: activeQuote.enablePlanB,
                  planAName: activeQuote.planAName,
                  planAPrice: activeQuote.planAPrice,
                  planBName: activeQuote.planBName,
                  planBPrice: activeQuote.planBPrice 
                })}
                variant="primary" size="sm" className="w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
              >
                Save Investment Plans & Config
              </Button>
            </div>
          )}

          {/* 5. PLAN COMPARISON TAB */}
          {(activeProjectTab === "plan-comparison" || activeProjectTab === "quotations") && (() => {
            const isPlanBEnabled = activeQuote.includePlanB !== false && activeQuote.enablePlanB !== false;
            return (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <h4 className="font-heading font-extrabold text-[#071E34] text-sm">5. Feature Deliverables Comparison Matrix</h4>
                  <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 3</span>
                </div>

                <div className="flex justify-between items-center bg-rose-50/70 p-4 rounded-xl border border-rose-200 shadow-2xs">
                  <div>
                    <span className="text-xs font-extrabold text-[#071E34] block">Include Plan B (Dual Option Engagement)</span>
                    <span className="text-[10px] text-gray-500">Toggle OFF for single Plan A proposal. Toggle ON for dual Plan A + Plan B choices.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPlanBEnabled}
                      onChange={e => {
                        const checked = e.target.checked;
                        saveQuoteSection({ includePlanB: checked, enablePlanB: checked });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5349]"></div>
                  </label>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-700 font-bold text-[11px] uppercase border-b border-gray-200">
                      <tr>
                        <th className="p-3">Deliverable / Feature Description</th>
                        <th className="p-3 text-center w-36">{activeQuote.planAName || "PLAN A"}</th>
                        {isPlanBEnabled && <th className="p-3 text-center w-36">{activeQuote.planBName || "PLAN B"}</th>}
                        <th className="p-3 text-center w-16">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {activeCompItems.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50/60">
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.deliverable}
                              onChange={e => {
                                const val = e.target.value;
                                const updated = activeCompItems.map((it: any, i: number) => i === idx ? { ...it, deliverable: val } : it);
                                updateQuoteField({ planComparisonItems: updated });
                              }}
                              className="w-full p-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50 text-[#071E34] focus:outline-none focus:border-[#FF5349] font-medium"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.planA}
                              onChange={e => {
                                const checked = e.target.checked;
                                const updated = activeCompItems.map((it: any, i: number) => i === idx ? { ...it, planA: checked } : it);
                                updateQuoteField({ planComparisonItems: updated });
                              }}
                              className="w-4 h-4 text-[#FF5349] accent-[#FF5349] rounded cursor-pointer"
                            />
                          </td>
                          {isPlanBEnabled && (
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={item.planB}
                                onChange={e => {
                                  const checked = e.target.checked;
                                  const updated = activeCompItems.map((it: any, i: number) => i === idx ? { ...it, planB: checked } : it);
                                  updateQuoteField({ planComparisonItems: updated });
                                }}
                                className="w-4 h-4 text-[#FF5349] accent-[#FF5349] rounded cursor-pointer"
                              />
                            </td>
                          )}
                          <td className="p-3 text-center">
                            <button
                              onClick={async () => {
                                if (!confirm("Delete this comparison row?")) return;
                                const updated = activeCompItems.filter((_: any, i: number) => i !== idx);
                                await saveQuoteSection({ planComparisonItems: updated });
                              }}
                              className="text-red-400 hover:text-red-600 p-1 font-bold text-sm"
                              title="Delete Comparison Row"
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    type="button" 
                    onClick={async () => {
                      const updated = [...activeCompItems, { deliverable: "New Custom Deliverable", planA: true, planB: true }];
                      await saveQuoteSection({ planComparisonItems: updated });
                    }}
                    variant="secondary" size="sm" className="text-xs py-2 px-3 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-bold rounded-xl shadow-sm"
                  >
                    + Add Comparison Row
                  </Button>
                  <Button 
                    type="button" 
                    onClick={async () => {
                      await saveQuoteSection({ 
                        includePlanB: activeQuote.includePlanB,
                        enablePlanB: activeQuote.enablePlanB,
                        planComparisonItems: activeCompItems 
                      });
                      showToast("Feature Comparison Matrix saved to Database!", "success");
                    }}
                    variant="primary" size="sm" className="text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
                  >
                    Save Matrix to Database
                  </Button>
                </div>
              </div>
            );
          })()}

          {/* 6. PAYMENT TERMS TAB */}
          {activeProjectTab === "payment-terms" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">6. Payment Terms & Milestone Schedule</h4>
                <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 4</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">MILESTONE PAYMENT TERMS BREAKDOWN</label>
                <textarea
                  rows={6}
                  value={activeQuote.paymentTerms || "40% advance on project kick-off\n30% on completion of core module development & UAT build\n30% on final delivery, deployment & go-live"}
                  onChange={e => updateQuoteField({ paymentTerms: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"
                />
                <Button 
                  type="button" 
                  onClick={() => saveQuoteSection({ paymentTerms: activeQuote.paymentTerms })}
                  variant="primary" size="sm" className="w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
                >
                  Save Payment Terms
                </Button>
              </div>
            </div>
          )}

          {/* 7. TERMS & CONDITIONS TAB */}
          {activeProjectTab === "terms-conditions" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h4 className="font-heading font-extrabold text-[#071E34] text-sm">7. Support & Project Terms and Conditions</h4>
                <span className="text-[10px] font-bold text-[#FF5349] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">PDF Page 4</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">TERMS AND CONDITIONS</label>
                <textarea
                  rows={6}
                  value={activeQuote.termsAndConditions || "Estimation valid for 30 days.\nIncludes 30 days complimentary bug-fix support.\nSource code handed over upon full payment."}
                  onChange={e => updateQuoteField({ termsAndConditions: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans text-[#071E34] bg-white focus:outline-none focus:border-[#FF5349] resize-none leading-relaxed"
                />
                <Button 
                  type="button" 
                  onClick={() => saveQuoteSection({ termsAndConditions: activeQuote.termsAndConditions })}
                  variant="primary" size="sm" className="w-fit text-xs py-2 px-4 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold rounded-xl shadow-sm transition-all border-0"
                >
                  Save Terms & Conditions
                </Button>
              </div>
            </div>
          )}

          {/* 8. COMPANY DETAILS & BRANDING TAB */}
          {activeProjectTab === "company-details" && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">BRANDING & PDF CONFIGURATION</label>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">Company Logo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={activeQuote.companyLogoUrl || ""}
                    onChange={e => updateQuoteField({ companyLogoUrl: e.target.value })}
                    onBlur={e => saveQuoteSection({ companyLogoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"
                  />
                  {activeQuote.companyLogoUrl && (
                    <div className="mt-2 flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-200 w-fit">
                      <img src={activeQuote.companyLogoUrl} alt="Company Logo Preview" className="h-8 w-auto max-w-[120px] object-contain rounded-lg bg-white p-1 border border-gray-200" />
                      <span className="text-[10px] font-mono text-[#FF5349] font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Logo Uploaded</span>
                      <button
                        type="button"
                        onClick={() => saveQuoteSection({ companyLogoUrl: "" })}
                        className="text-xs text-red-500 hover:text-red-700 font-bold px-1"
                      >
                        &times; Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200 w-full">
                  <div>
                    <span className="font-bold text-gray-900 text-xs block">Background PDF Watermark</span>
                    <span className="text-[10px] text-gray-500">Enable or disable watermark display on generated PDF</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                    <input 
                      type="checkbox" 
                      checked={activeQuote.showWatermark !== false}
                      onChange={e => saveQuoteSection({ showWatermark: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF5349]"></div>
                  </label>
                </div>

                <div className="w-full">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Background PDF Watermark Text</label>
                  <input
                    type="text"
                    placeholder="e.g. SPESHWAY SOLUTIONS"
                    value={activeQuote.companyWatermarkText || activeQuote.companyName || "SPESHWAY SOLUTIONS"}
                    onChange={e => updateQuoteField({ companyWatermarkText: e.target.value })}
                    onBlur={e => saveQuoteSection({ companyWatermarkText: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#071E34] bg-gray-50 focus:outline-none focus:border-[#FF5349]"
                  />
                </div>
              </div>
            </div>
          )}

          </div>

          {/* RIGHT SIDEBAR LIVE PDF PREVIEW CANVAS */}
          <div className="w-full xl:w-[480px] shrink-0 space-y-4">
            <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs font-extrabold text-[#071E34] flex items-center gap-1.5">
                <Eye size={14} className="text-[#FF5349]" /> Live Quotation PDF Preview
              </span>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(0.6)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      previewZoom === 0.6 ? "bg-[#FF5349] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="Fit to Box (60%)"
                  >
                    Fit Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"
                    title="Zoom Out (-5%)"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"
                    title="Zoom In (+5%)"
                  >
                    <ZoomIn size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(1.0)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      previewZoom === 1.0 ? "bg-[#FF5349] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="100% Actual Size"
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(0.6)}
                    className="p-1 text-gray-400 hover:text-[#FF5349] hover:bg-white rounded-lg transition-all"
                    title="Reset to 60%"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
                    const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures, previewZoom);
                    const compName = activeQuote.companyName || "Speshway_Solutions";
                    const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
                    const scopeTitle = activeQuote.projectType || "Quotation";
                    triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                  }}
                  className="px-3 py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all border-0"
                >
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>

            <div className="w-full h-[750px] border border-gray-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900 flex justify-center items-center">
              <iframe
                key={`${activeQuote.pdfPrimaryColor}-${activeQuote.pdfSecondaryColor}-${activeQuote.companyLogoUrl}-${activeQuote.companyWatermarkOpacity}-${activeQuote.companyWatermarkContrast}-${activeQuote.companyWatermarkRotation}-${activeQuote.companyWatermarkSize}-${activeQuote.companyWatermarkImgSize}-${activeQuote.companyWatermarkGrayscale}-${activeQuote.showWatermark}-${previewZoom}`}
                srcDoc={generateSpeshwayEstimationPdfHtml(
                  activeProjectDetail, 
                  activeQuote, 
                  features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name),
                  previewZoom
                )}
                className="w-full h-full border-0 bg-slate-900"
                style={{ overflowX: "hidden" }}
                title="Live Quotation PDF Preview"
              />
            </div>
          </div>
        </div>
      </main>

      {/* LIVE PDF PREVIEW MODAL OVERLAY */}
      {showPdfPreviewModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 flex flex-col gap-3 animate-in fade-in duration-150 font-sans">
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FF5349] font-mono">LIVE PDF PROPOSAL PREVIEW</span>
              <span className="text-xs font-bold border-l border-slate-700 pl-2 text-gray-300">
                {activeProjectDetail.name || activeProjectDetail.title} ({activeQuote.id || activeQuote.number})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  const projectFeatures = features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name);
                  const pdfHtml = generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, projectFeatures, 1.0);
                  const compName = activeQuote.companyName || "Speshway_Solutions";
                  const projTitle = activeProjectDetail.name || activeProjectDetail.title || "Project";
                  const scopeTitle = activeQuote.projectType || "Quotation";
                  triggerDirectPdfDownload(pdfHtml, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                }}
                variant="primary"
                size="sm"
                className="text-xs font-bold bg-[#FF5349] hover:bg-[#F05454] text-white border-0 gap-1.5"
              >
                <Download size={14} /> Download PDF
              </Button>

              <button
                onClick={() => setShowPdfPreviewModal(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700 transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex justify-center items-center">
            <iframe
              srcDoc={generateSpeshwayEstimationPdfHtml(activeProjectDetail, activeQuote, features.filter(f => f.projectId === activeProjectDetail.id || f.projectName === activeProjectDetail.name))}
              className="w-full h-full border-0 bg-slate-950"
              title="Full Page PDF Proposal Document Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
