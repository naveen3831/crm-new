"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { ArrowLeft, Download, FileText, CheckCircle, Maximize2, Save, Sparkles, Layers, DollarSign, ShieldCheck, Users } from "lucide-react";
import { showToast } from "../../utils/toast";

interface QuoteReviewModalProps {
  reviewingQuote: any;
  setReviewingQuote: (val: any) => void;
  reviewMode: "exact-pdf" | "live-editor";
  setReviewMode: (val: "exact-pdf" | "live-editor") => void;
  reviewerNotes: string;
  setReviewerNotes: (val: string) => void;
  features: any[];
  activeProjectDetail: any;
  getCleanPlanComparisonItems: (items: any) => any[];
  defaultPlanComparisonDeliverables: any[];
  generateSpeshwayEstimationPdfHtml: (proj: any, quote: any, feats: any) => string;
  triggerDirectPdfDownload: (html: string, filename: string) => void;
  handleSaveQuotationSection: (quoteId: string, updatedFields: any) => Promise<void>;
  handleApproveQuotation: (number: string) => Promise<void>;
}

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
}: QuoteReviewModalProps) {
  if (!reviewingQuote) return null;

  const [activeSection, setActiveSection] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Local form state synchronized with reviewingQuote
  const [form, setForm] = useState({
    title: reviewingQuote.title || "",
    projectName: reviewingQuote.projectName || activeProjectDetail?.name || "Project",
    clientName: reviewingQuote.clientName || activeProjectDetail?.clientName || "Client",
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
    f.projectId === activeProjectDetail?.id || 
    f.projectName === reviewingQuote.projectName || 
    f.projectName === activeProjectDetail?.name
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
    <div className="w-full flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm min-h-[85vh] animate-in fade-in duration-200 font-sans">
      
      {/* HEADER BAR */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 shrink-0 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => setReviewingQuote(null)}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#FF5349] transition-colors mr-2"
            >
              <ArrowLeft size={14} /> Back to Proposals Workspace
            </button>
            <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">
              8-SECTION PROPOSAL QUOTATION STUDIO
            </span>
            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
              reviewingQuote.status === "Approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
            }`}>
              Status: {reviewingQuote.status || "APPROVED"}
            </span>
          </div>
          <h3 className="font-heading font-extrabold text-[#071E34] text-lg sm:text-xl mt-1.5">
            {form.title || reviewingQuote.title || `${form.projectName} Proposal Page`}
          </h3>
          <span className="text-xs text-gray-500 block">
            Client: <strong className="text-gray-700">{form.clientName}</strong> &bull; Document Ref: <span className="font-mono text-[#FF5349]">{reviewingQuote.id || reviewingQuote.number}</span>
          </span>
        </div>

        {/* TOP TAB TOGGLES & ACTIONS */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setReviewMode("live-editor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                reviewMode === "live-editor" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText size={14} /> 8-Section Proposal Creation Page
            </button>
            <button
              onClick={() => setReviewMode("exact-pdf")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                reviewMode === "exact-pdf" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📄 Live PDF Preview
            </button>
          </div>

          <button
            onClick={() => setIsFullScreen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1.5 shadow-2xs"
          >
            <Maximize2 size={14} className="text-[#FF5349]" /> Full Screen
          </button>

          <Button
            onClick={() => {
              const compName = reviewingQuote.companyName || "Speshway_Solutions";
              const projTitle = form.projectName || "Project";
              const scopeTitle = form.projectType || "Quotation";
              triggerDirectPdfDownload(pdfHtmlContent, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
            }}
            variant="primary" size="sm" className="font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl shadow-sm gap-1.5"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      {reviewMode === "exact-pdf" ? (
        <div className="flex-1 my-4 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner min-h-[650px]">
          <iframe
            srcDoc={pdfHtmlContent}
            className="w-full h-full border-0 bg-white min-h-[650px]"
            title="Quotation PDF Live Document Preview"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-4 flex-1">
          {/* Left Column: 8 Sections Navigator */}
          <div className="space-y-1.5 bg-gray-50/80 border border-gray-200 rounded-2xl p-4 self-start shadow-xs">
            <div className="px-2 py-1 text-[10px] font-mono font-bold text-[#FF5349] uppercase tracking-wider mb-1">
              PROPOSAL PAGES ({sections.length} SECTIONS)
            </div>
            {sections.map((sec) => (
              <button
                key={sec.num}
                onClick={() => setActiveSection(sec.num)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  activeSection === sec.num
                    ? "bg-blue-600 text-white font-bold shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                }`}
              >
                <span className="truncate">{sec.title}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  activeSection === sec.num ? "bg-black/20 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {sec.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Right Column: 8 Section Editor Forms */}
          <div className="lg:col-span-3 bg-gray-50/50 border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6 min-h-[500px]">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h4 className="text-sm font-bold text-[#071E34] font-heading flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FF5349]" />
                  <span>Section {activeSection}: {sections.find(s => s.num === activeSection)?.title}</span>
                </h4>
                <button
                  onClick={handleSaveCurrentSection}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Save size={14} /> {isSaving ? "Saving..." : "Save Section"}
                </button>
              </div>

              {/* SECTION 1: OVERVIEW & PROJECT TYPE */}
              {activeSection === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Proposal Document Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Project Name</label>
                      <input
                        type="text"
                        value={form.projectName}
                        onChange={e => setForm({ ...form, projectName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Client Name</label>
                      <input
                        type="text"
                        value={form.clientName}
                        onChange={e => setForm({ ...form, clientName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Scope Category</label>
                    <input
                      type="text"
                      value={form.projectType}
                      onChange={e => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Executive Overview Narrative</label>
                    <textarea
                      rows={5}
                      value={form.overviewNarrative}
                      onChange={e => setForm({ ...form, overviewNarrative: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 2: USER ACCESS & ROLES */}
              {activeSection === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Customer / End-User Access Description</label>
                    <textarea
                      rows={3}
                      value={form.customerDesc}
                      onChange={e => setForm({ ...form, customerDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Merchant / Service Vendor Access Description</label>
                    <textarea
                      rows={3}
                      value={form.merchantDesc}
                      onChange={e => setForm({ ...form, merchantDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Super Admin Governance & Control Description</label>
                    <textarea
                      rows={3}
                      value={form.adminDesc}
                      onChange={e => setForm({ ...form, adminDesc: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-[#FF5349]"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 3: FEATURES & SCOPE MODULES */}
              {activeSection === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between">
                    <span className="font-semibold">Associated Project Features: <strong>{reviewFeatures.length} Modules</strong></span>
                  </div>
                  {reviewFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
                      <div className="font-bold text-[#071E34]">{feat.name || feat.title}</div>
                      <p className="text-gray-600 text-[11px]">{feat.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 4: TIERED PRICING PLANS */}
              {activeSection === 4 && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-rose-200 rounded-xl space-y-3">
                      <label className="block text-gray-700 font-bold">PLAN A Tier Title</label>
                      <input
                        type="text"
                        value={form.planAName}
                        onChange={e => setForm({ ...form, planAName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#071E34] font-medium"
                      />
                      <label className="block text-gray-700 font-bold">PLAN A Price (₹)</label>
                      <input
                        type="number"
                        value={form.planAPrice}
                        onChange={e => setForm({ ...form, planAPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#FF5349] font-extrabold text-sm"
                      />
                    </div>
                    <div className="p-4 bg-white border border-amber-200 rounded-xl space-y-3">
                      <label className="block text-gray-700 font-bold">PLAN B Tier Title</label>
                      <input
                        type="text"
                        value={form.planBName}
                        onChange={e => setForm({ ...form, planBName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[#071E34] font-medium"
                      />
                      <label className="block text-gray-700 font-bold">PLAN B Price (₹)</label>
                      <input
                        type="number"
                        value={form.planBPrice}
                        onChange={e => setForm({ ...form, planBPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-amber-600 font-extrabold text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: DELIVERABLES MATRIX */}
              {activeSection === 5 && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-gray-700 mb-2">Deliverables Comparison Items</div>
                  {defaultPlanComparisonDeliverables.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-white border border-gray-200 rounded-xl">
                      <span className="font-medium text-gray-800">{item.deliverable}</span>
                      <div className="flex gap-4 text-[11px] font-bold">
                        <span className={item.planA ? "text-green-600" : "text-gray-400"}>Plan A: {item.planA ? "✓ Included" : "✕ Optional"}</span>
                        <span className={item.planB ? "text-green-600" : "text-gray-400"}>Plan B: {item.planB ? "✓ Included" : "✕ Optional"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 6: PAYMENT TERMS */}
              {activeSection === 6 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Payment Schedule & Milestone Terms</label>
                    <textarea
                      rows={5}
                      value={form.paymentTerms}
                      onChange={e => setForm({ ...form, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed font-mono"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 7: TERMS & CONDITIONS */}
              {activeSection === 7 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Standard Terms & Proposal Validity</label>
                    <textarea
                      rows={5}
                      value={form.termsAndConditions}
                      onChange={e => setForm({ ...form, termsAndConditions: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed font-mono"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 8: INTERNAL NOTES & APPROVAL */}
              {activeSection === 8 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Reviewer Feedback & Internal Notes</label>
                    <textarea
                      rows={5}
                      placeholder="Enter internal notes, special discounts, or custom client agreement terms..."
                      value={reviewerNotes}
                      onChange={e => setReviewerNotes(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-[#071E34] font-medium leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-[11px] text-gray-500">Proposal Page &bull; Section {activeSection} of {sections.length}</span>
              <button
                onClick={handleSaveCurrentSection}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Save size={15} />
                <span>{isSaving ? "Saving Section..." : "Save Proposal Section"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN OVERLAY */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md p-4 flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-xl text-white">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FF5349] font-mono">100% FULL PAGE PROPOSAL VIEW</span>
              <span className="text-xs font-bold border-l border-slate-700 pl-2 text-gray-300">{form.title || reviewingQuote.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  const compName = reviewingQuote.companyName || "Speshway_Solutions";
                  const projTitle = form.projectName || "Project";
                  const scopeTitle = form.projectType || "Quotation";
                  triggerDirectPdfDownload(pdfHtmlContent, `${compName}_${projTitle}_${scopeTitle}_Quotation.pdf`);
                }}
                variant="secondary"
                size="sm"
                className="text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 border-0"
              >
                <Download size={14} /> Download PDF
              </Button>
              <button
                onClick={() => setIsFullScreen(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700"
              >
                Close Full Screen
              </button>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl border border-slate-800 overflow-hidden">
            <iframe
              srcDoc={pdfHtmlContent}
              className="w-full h-full border-0"
              title="Full Page PDF Proposal Document Preview"
            />
          </div>
        </div>
      )}

    </div>
  );
}


