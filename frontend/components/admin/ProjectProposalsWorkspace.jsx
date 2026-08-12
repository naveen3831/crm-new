const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\admin\\ProjectProposalsWorkspace.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Edit, Search, ArrowLeft, FileText, Sparkles, CheckCircle, Smartphone, Globe, Layers, Cpu, Megaphone, Receipt, CreditCard, Eye, Printer, Download, Save, Building2, Upload, Palette, Image as ImageIcon, Type, ZoomIn, ZoomOut, RotateCcw, FileSignature, GripVertical } from "lucide-react";
import { triggerDirectPdfDownload as defaultPdfDownload, saveGlobalCompanyDetails, getGlobalCompanyDetails, generateSpeshwayTaxInvoicePdfHtml, openPdfPrintPreview, generateSpeshwayAgreementPdfHtml } from "../../utils/pdfGenerator";
import { showToast } from "../../utils/toast";





















// Convert numbers to words (Indian Rupee Format)
const numberToWords = (amount) => {
  if (!amount || isNaN(amount)) return "Indian Rupees Zero Only";
  const num = Math.round(amount);
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : " ");
    if (n < 1000) return a[Math.floor(n / 100)] + "Hundred " + (n % 100 !== 0 ? "and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 !== 0 ? inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 !== 0 ? inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 !== 0 ? inWords(n % 10000000) : "");
  };

  return `Indian Rupees ${inWords(num).trim()} Only`;
};

const getInitialWorkspaceTab = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get("subtab");
      if (sub === "invoices" || sub === "quotations" || sub === "proposals" || sub === "agreements") return sub;
      const stored = localStorage.getItem("crm_active_workspace_subtab");
      if (stored === "invoices" || stored === "quotations" || stored === "proposals" || stored === "agreements") return stored;
    } catch (e2) {}
  }
  return "proposals";
};


















export default function ProjectProposalsWorkspace({
  project,
  quotations,
  setQuotations,
  invoices = [],
  agreements = [],
  initialSubtab,
  autoOpenAgreement,
  onBackToProjects,
  onOpen8Sections,
  API_URL,
  loadDatabase,
  triggerDirectPdfDownload,
  onWorkspaceSubtabChange,
  onInvoiceStudioChange
}) {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState(
    initialSubtab || getInitialWorkspaceTab()
  );
  const [invoicePreviewZoom, setInvoicePreviewZoom] = useState(0.6);

  useEffect(() => {
    if (initialSubtab) {
      setActiveWorkspaceTab(initialSubtab);
    }
  }, [initialSubtab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("crm_active_workspace_subtab", activeWorkspaceTab);
        const params = new URLSearchParams(window.location.search);
        params.set("subtab", activeWorkspaceTab);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      } catch (e3) {}
    }
  }, [activeWorkspaceTab]);

  useEffect(() => {
    _optionalChain([onWorkspaceSubtabChange, 'optionalCall', _ => _(activeWorkspaceTab)]);
  }, [activeWorkspaceTab, onWorkspaceSubtabChange]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandingUpdateTrigger, setBrandingUpdateTrigger] = useState(0);

  useEffect(() => {
    const handleBrandingUpdate = () => {
      setBrandingUpdateTrigger(prev => prev + 1);
    };
    window.addEventListener("crm:company-logo-updated", handleBrandingUpdate);
    return () => {
      window.removeEventListener("crm:company-logo-updated", handleBrandingUpdate);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Proposal Modals
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [editingProposal, setEditingProposal] = useState(null);

  // Full-Screen Invoice Studio Page State (With Left Sidebar Section Switcher & Right Live PDF Preview)
  const [activeInvoiceStudioPage, setActiveInvoiceStudioPage] = useState(null);
  const [activeInvoiceSectionId, setActiveInvoiceSectionId] = useState("header");
  const [showInvoicePdfPreviewModal, setShowInvoicePdfPreviewModal] = useState(false);
  const [localInvoices, setLocalInvoices] = useState(invoices);

  // Full-Screen Agreement Studio Page State
  const [activeAgreementStudioPage, setActiveAgreementStudioPage] = useState(null);
  const [activeAgreementSectionId, setActiveAgreementSectionId] = useState("header");
  const [showAgreementPdfPreviewModal, setShowAgreementPdfPreviewModal] = useState(false);
  const [localAgreements, setLocalAgreements] = useState(agreements);
  const [agreementPreviewZoom, setAgreementPreviewZoom] = useState(0.6);

  useEffect(() => {
    _optionalChain([onInvoiceStudioChange, 'optionalCall', _2 => _2(Boolean(activeInvoiceStudioPage || activeAgreementStudioPage))]);
  }, [activeInvoiceStudioPage, activeAgreementStudioPage, onInvoiceStudioChange]);

  useEffect(() => {
    if (invoices && invoices.length > 0) {
      setLocalInvoices(invoices);
    }
  }, [invoices]);

  useEffect(() => {
    if (agreements && agreements.length > 0) {
      setLocalAgreements(agreements);
    }
  }, [agreements]);

  useEffect(() => {
    if (autoOpenAgreement) {
      setActiveWorkspaceTab("agreements");
      const qId = `QT-${_optionalChain([project, 'optionalAccess', _3 => _3.id]) || '001'}`;
      const agrId = `SPW-AGR-${qId.replace(/[^A-Z0-9]/gi, '')}`;
      const existing = (localAgreements || []).find((a) => a.id === agrId || a.number === agrId || a.projectId === _optionalChain([project, 'optionalAccess', _4 => _4.id]));
      const targetAgr = existing || (displayAgreementsList && displayAgreementsList[0]) || {
        id: agrId,
        number: agrId,
        proposalId: qId,
        projectId: _optionalChain([project, 'optionalAccess', _5 => _5.id]),
        projectName: _optionalChain([project, 'optionalAccess', _6 => _6.name]) || _optionalChain([project, 'optionalAccess', _7 => _7.title]) || "Software Project",
        clientName: _optionalChain([project, 'optionalAccess', _8 => _8.clientName]) || "Client Organization",
        clientAddress: "Hyderabad, Telangana",
        duration: "one (1) month",
        rate: _optionalChain([project, 'optionalAccess', _9 => _9.budget]) || 80000,
        amount: _optionalChain([project, 'optionalAccess', _10 => _10.budget]) || 80000,
        budget: _optionalChain([project, 'optionalAccess', _11 => _11.budget]) || 80000,
        m1Pct: 40,
        m2Pct: 40,
        m3Pct: 20,
        status: "SIGNED",
        pdfPrimaryColor: "#5D3ADF",
        pdfSecondaryColor: "#B8F7A1",
        companyLogoUrl: "/logo.png",
        companyWatermarkUrl: "/watermark.png",
        showWatermark: true,
        companyWatermarkText: "SPESHWAY SOLUTIONS"
      };
      setActiveAgreementStudioPage(targetAgr);
      setActiveAgreementSectionId("header");
    }
  }, [autoOpenAgreement]);

  // Local Quotations / Proposals state
  const [localQuotations, setLocalQuotations] = useState(quotations || []);

  // Stateful Drag-and-Drop Card State
  const [draggedCardIndex, setDraggedCardIndex] = useState(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState(null);

  useEffect(() => {
    if (quotations && quotations.length > 0) {
      setLocalQuotations(quotations);
    }
  }, [quotations]);

  // Sync quotations / proposals directly from database API on workspace mount
  useEffect(() => {
    const fetchDbQuotations = async () => {
      try {
        const API_BASE = API_URL || (window.location.origin.includes("localhost") ? "http://localhost:5000/api/v1" : "/api/v1");
        const res = await fetch(`${API_BASE}/crm/quotation`).then(r => r.json());
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setLocalQuotations(res.data);
          _optionalChain([setQuotations, 'optionalCall', _12 => _12(res.data)]);
        }
      } catch (err) {
        console.error("Failed to sync quotations from API", err);
      }
    };
    fetchDbQuotations();
  }, [API_URL, setQuotations]);

  // Sync invoices directly from database API on workspace mount
  useEffect(() => {
    const fetchDbInvoices = async () => {
      try {
        const res = await fetch(`${API_URL}/crm/invoice`).then(r => r.json());
        if (res && res.success && Array.isArray(res.data)) {
          setLocalInvoices(res.data);
        }
      } catch (err) {
        console.error("Failed to sync invoices from API", err);
      }
    };
    if (API_URL) {
      fetchDbInvoices();
    }
  }, [API_URL]);

  // Sync agreements directly from database API on workspace mount
  useEffect(() => {
    const fetchDbAgreements = async () => {
      try {
        const res = await fetch(`${API_URL}/crm/agreement`).then(r => r.json());
        if (res && res.success && Array.isArray(res.data)) {
          setLocalAgreements(res.data);
        }
      } catch (err) {
        console.error("Failed to sync agreements from API", err);
      }
    };
    if (API_URL) {
      fetchDbAgreements();
    }
  }, [API_URL]);

  // Logo & Watermark File Upload Refs for Invoice Branding
  const invoiceLogoInputRef = useRef(null);
  const invoiceWatermarkInputRef = useRef(null);

  const handleInvoiceLogoUpload = (e) => {
    const file = _optionalChain([e, 'access', _13 => _13.target, 'access', _14 => _14.files, 'optionalAccess', _15 => _15[0]]);
    if (!file) return;
    showToast("Uploading logo to AWS S3...", "info");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = _optionalChain([event, 'access', _16 => _16.target, 'optionalAccess', _17 => _17.result]) ;
      if (base64Url) {
        try {
          const API_BASE = window.location.origin.includes("localhost") ? "http://localhost:5000/api/v1" : "/api/v1";
          const res = await fetch(`${API_BASE}/crm/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileData: base64Url,
              fileName: file.name,
              fileType: file.type
            })
          });
          const data = await res.json();
          const finalUrl = data.success && data.url ? data.url : base64Url;

          saveGlobalCompanyDetails({ companyLogoUrl: finalUrl });
          setActiveInvoiceStudioPage((prev) => ({ ...prev, companyLogoUrl: finalUrl }));
          showToast(data.url && data.url.includes("amazonaws.com") ? "Logo uploaded to AWS S3 bucket!" : "Invoice & Global company logo uploaded successfully!", "success");
        } catch (err) {
          saveGlobalCompanyDetails({ companyLogoUrl: base64Url });
          setActiveInvoiceStudioPage((prev) => ({ ...prev, companyLogoUrl: base64Url }));
          showToast("Invoice company logo uploaded successfully!", "success");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInvoiceWatermarkUpload = (e) => {
    const file = _optionalChain([e, 'access', _18 => _18.target, 'access', _19 => _19.files, 'optionalAccess', _20 => _20[0]]);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = _optionalChain([event, 'access', _21 => _21.target, 'optionalAccess', _22 => _22.result]) ;
      if (base64Url) {
        setActiveInvoiceStudioPage((prev) => ({
          ...prev,
          companyWatermarkUrl: base64Url,
          showWatermark: true
        }));
        showToast("Watermark image uploaded successfully!", "success");
      }
    };
    reader.readAsDataURL(file);
  };

  // Logo & Watermark File Upload Refs for Agreement Branding
  const agreementLogoInputRef = useRef(null);
  const agreementWatermarkInputRef = useRef(null);

  const handleAgreementLogoUpload = (e) => {
    const file = _optionalChain([e, 'access', _23 => _23.target, 'access', _24 => _24.files, 'optionalAccess', _25 => _25[0]]);
    if (!file) return;
    showToast("Uploading logo to AWS S3...", "info");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = _optionalChain([event, 'access', _26 => _26.target, 'optionalAccess', _27 => _27.result]) ;
      if (base64Url) {
        try {
          const API_BASE = window.location.origin.includes("localhost") ? "http://localhost:5000/api/v1" : "/api/v1";
          const res = await fetch(`${API_BASE}/crm/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileData: base64Url,
              fileName: file.name,
              fileType: file.type
            })
          });
          const data = await res.json();
          const finalUrl = data.success && data.url ? data.url : base64Url;

          saveGlobalCompanyDetails({ companyLogoUrl: finalUrl });
          setActiveAgreementStudioPage((prev) => ({ ...prev, companyLogoUrl: finalUrl }));
          showToast(data.url && data.url.includes("amazonaws.com") ? "Logo uploaded to AWS S3 bucket!" : "Agreement & Global company logo uploaded successfully!", "success");
        } catch (err) {
          saveGlobalCompanyDetails({ companyLogoUrl: base64Url });
          setActiveAgreementStudioPage((prev) => ({ ...prev, companyLogoUrl: base64Url }));
          showToast("Agreement company logo uploaded successfully!", "success");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAgreementWatermarkUpload = (e) => {
    const file = _optionalChain([e, 'access', _28 => _28.target, 'access', _29 => _29.files, 'optionalAccess', _30 => _30[0]]);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = _optionalChain([event, 'access', _31 => _31.target, 'optionalAccess', _32 => _32.result]) ;
      if (base64Url) {
        saveGlobalCompanyDetails({ companyWatermarkUrl: base64Url });
        setActiveAgreementStudioPage((prev) => ({
          ...prev,
          companyWatermarkUrl: base64Url,
          showWatermark: true
        }));
        showToast("Agreement company watermark image uploaded successfully!", "success");
      }
    };
    reader.readAsDataURL(file);
  };

  // Scope Config Options for Proposal Creation / Edition
  const scopeOptions = [
    {
      key: "website",
      name: "Website Application",
      sub: "React/Next Portal & Admin",
      icon: React.createElement(Globe, { className: "w-4 h-4 text-rose-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 386}} )
    },
    {
      key: "mobile",
      name: "Mobile Application",
      sub: "iOS & Android Native Apps",
      icon: React.createElement(Smartphone, { className: "w-4 h-4 text-purple-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 392}} )
    },
    {
      key: "both",
      name: "Web & Mobile Application",
      sub: "Full Web + Mobile Package",
      icon: React.createElement(Layers, { className: "w-4 h-4 text-amber-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 398}} )
    },
    {
      key: "marketing",
      name: "Digital Marketing Campaign",
      sub: "SEO, SMM, PPC & Content",
      icon: React.createElement(Megaphone, { className: "w-4 h-4 text-pink-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 404}} )
    },
    {
      key: "others",
      name: "Custom / ERP / AI Suite",
      sub: "ERP, AI & Microservices",
      icon: React.createElement(Cpu, { className: "w-4 h-4 text-emerald-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 410}} )
    }
  ];

  const [formState, setFormState] = useState({
    title: "",
    projectType: "Website Application",
    overviewNarrative: ""
  });

  if (!project) return null;

  const globalBranding = getGlobalCompanyDetails();

  // Filter proposals that belong to this project
  const currentQuotesPool = (localQuotations && localQuotations.length > 0) ? localQuotations : (quotations || []);
  
  let rawProjectQuotations = currentQuotesPool.filter(q => {
    if (!q) return false;
    const pId = String(project.id || "").toLowerCase();
    const pName = String(project.name || project.title || "").toLowerCase();
    if (q.projectId && String(q.projectId).toLowerCase() === pId) return true;
    if (q.id && (String(q.id).toLowerCase().includes(pId) || (pId && pId.includes(String(q.id).toLowerCase())))) return true;
    if (q.number && String(q.number).toLowerCase().includes(pId)) return true;
    if (q.projectName && pName && String(q.projectName).toLowerCase() === pName) return true;
    return false;
  });
  const projectQuotations = rawProjectQuotations;

  // Dynamically map invoices so they correspond 1-to-1 with created proposals
  const displayInvoicesList = projectQuotations.map(q => {
    const qId = q.id || q.number || `QT-${project.id}`;
    const invId = `SPW-INV-${qId.replace(/[^A-Z0-9]/gi, '')}`;
    
    // Find if custom stored invoice exists in localInvoices
    const existing = localInvoices.find(inv => inv.id === invId || inv.number === invId || inv.proposalId === qId);

    return existing || {
      id: invId,
      number: invId,
      proposalId: qId,
      projectId: project.id,
      projectName: project.name || project.title,
      clientName: q.clientName || project.clientName || "Hyper Mobility Services",
      productName: project.name || project.title || "Carzzi",
      billedByCompany: globalBranding.billedByCompany || globalBranding.companyName || "Speshway Solutions Private Limited",
      billedBySub: globalBranding.companyTagline || globalBranding.billedBySub || "Software Development Company",
      date: q.createdDate || new Date().toISOString().split("T")[0],
      description: `${project.name || project.title} (${q.projectType || "Web & Mobile Application"})`,
      subdesc: `Design, development & delivery of web and mobile applications for the ${project.name || project.title} product, provided to ${q.clientName || project.clientName || "Hyper Mobility Services"}`,
      rate: q.planAPrice || project.budget || 170000,
      amount: q.planAPrice || project.budget || 170000,
      taxPct: 18,
      status: "PAID",
      accountName: "SPESHWAY SOLUTIONS PRIVATE LIMITED",
      accountNumber: "018326900000850",
      branch: "HITECH CITY",
      ifscCode: "YESB0000183",
      pdfPrimaryColor: globalBranding.pdfPrimaryColor || "#5D3ADF",
      pdfSecondaryColor: globalBranding.pdfSecondaryColor || "#B8F7A1",
      pdfBodyFont: "Poppins",
      pdfHeadingFont: "Times New Roman",
      companyEmail: globalBranding.companyEmail || "info@speshway.com",
      companyPhone: globalBranding.companyPhone || "+91 91000 06020",
      companyWebsite: globalBranding.companyWebsite || "www.speshway.com",
      companyLogoUrl: globalBranding.companyLogoUrl || "/logo.png",
      companyWatermarkUrl: globalBranding.companyWatermarkUrl || "/watermark.png",
      companyGstin: globalBranding.companyGstin || "36AAAAA0000A1Z5",
      companyAddress: globalBranding.companyAddress || "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
      showWatermark: globalBranding.showWatermark !== undefined ? globalBranding.showWatermark : true,
      companyWatermarkText: globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: _nullishCoalesce(globalBranding.companyWatermarkOpacity, () => ( 0.25)),
      companyWatermarkContrast: _nullishCoalesce(globalBranding.companyWatermarkContrast, () => ( 150)),
      companyWatermarkGrayscale: _nullishCoalesce(globalBranding.companyWatermarkGrayscale, () => ( false)),
      companyWatermarkRotation: 0,
      companyWatermarkSize: _nullishCoalesce(globalBranding.companyWatermarkSize, () => ( 50)),
      companyWatermarkImgSize: _nullishCoalesce(globalBranding.companyWatermarkImgSize, () => ( 290))
    };
  });

  // Dynamically map agreements so they correspond 1-to-1 with created proposals
  const displayAgreementsList = projectQuotations.map(q => {
    const qId = q.id || q.number || `QT-${project.id}`;
    const agrId = `SPW-AGR-${qId.replace(/[^A-Z0-9]/gi, '')}`;
    
    // Find if custom stored agreement exists in localAgreements
    const existing = localAgreements.find(agr => agr.id === agrId || agr.number === agrId || agr.proposalId === qId);

    return existing || {
      id: agrId,
      number: agrId,
      proposalId: qId,
      projectId: project.id,
      projectName: project.name || project.title,
      clientName: q.clientName || project.clientName || "AMY SPORTS ARENA",
      clientAddress: "Kukatpally, Hyderabad Telangana",
      duration: "one (1) month",
      rate: q.planAPrice || project.budget || 80000,
      amount: q.planAPrice || project.budget || 80000,
      budget: q.planAPrice || project.budget || 80000,
      m1Pct: 40,
      m2Pct: 40,
      m3Pct: 20,
      status: "SIGNED",
      billedByCompany: globalBranding.billedByCompany || globalBranding.companyName || "SPESHWAY SOLUTIONS PVT LTD",
      companyAddress: globalBranding.companyAddress || "Plot No 1/C, Sy No 83/1, Raidurgam Knowledge City Rd, Serilingampalle, Telangana 500081",
      companyEmail: globalBranding.companyEmail || "info@speshway.com",
      companyPhone: globalBranding.companyPhone || "+91 91000 06020",
      companyWebsite: globalBranding.companyWebsite || "www.speshway.com",
      companyLogoUrl: globalBranding.companyLogoUrl || "/logo.png",
      companyWatermarkUrl: globalBranding.companyWatermarkUrl || "/watermark.png",
      pdfPrimaryColor: globalBranding.pdfPrimaryColor || "#5D3ADF",
      pdfSecondaryColor: globalBranding.pdfSecondaryColor || "#B8F7A1",
      pdfBodyFont: "Inter",
      pdfHeadingFont: "Inter",
      showWatermark: globalBranding.showWatermark !== undefined ? globalBranding.showWatermark : true,
      companyWatermarkText: globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: _nullishCoalesce(globalBranding.companyWatermarkOpacity, () => ( 0.25)),
      companyWatermarkContrast: _nullishCoalesce(globalBranding.companyWatermarkContrast, () => ( 150)),
      companyWatermarkGrayscale: _nullishCoalesce(globalBranding.companyWatermarkGrayscale, () => ( false)),
      companyWatermarkRotation: 0,
      companyWatermarkSize: _nullishCoalesce(globalBranding.companyWatermarkSize, () => ( 50)),
      companyWatermarkImgSize: _nullishCoalesce(globalBranding.companyWatermarkImgSize, () => ( 290))
    };
  });

  // Apply search query filter
  const searchFilteredQuotations = projectQuotations.filter(q => 
    !searchQuery || (q.title && q.title.toLowerCase().includes(searchQuery.toLowerCase())) || (q.projectType && q.projectType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Open modal for Create Proposal
  const handleOpenCreateModal = () => {
    const projName = project.name || project.title || "Project";
    const defaultScope = scopeOptions[0];

    setEditingProposal(null);
    setFormState({
      title: `${projName} - ${defaultScope.name} Quotation`,
      projectType: defaultScope.name,
      overviewNarrative: project.description || `Executive proposal for ${projName} (${defaultScope.name}).`
    });
    setShowProposalModal(true);
  };

  // Select scope card inside modal
  const handleSelectScopeOption = (opt) => {
    const projName = project.name || project.title || "Project";
    setFormState(prev => ({
      ...prev,
      projectType: opt.name,
      title: `${projName} - ${opt.name} Quotation`,
      overviewNarrative: `The ${projName} ${opt.name} is engineered for high performance, maximum scalability, and modern user experience.`
    }));
  };

  // Open modal for Edit Proposal (CRUD Update)
  const handleOpenEditModal = (proposal) => {
    setEditingProposal(proposal);
    setFormState({
      title: proposal.title || `${project.name || project.title} Proposal`,
      projectType: proposal.projectType || project.category || "Website Application",
      overviewNarrative: proposal.overviewNarrative || ""
    });
    setShowProposalModal(true);
  };

  // Submit Handler for Create & Update Proposal (CRUD)
  const handleSaveProposalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const projName = project.name || project.title || "Project";
    const clientName = project.clientName || "Internal Enterprise";
    const qId = editingProposal ? (editingProposal.id || editingProposal.number) : `QT-${project.id}-${Math.floor(1000 + Math.random() * 9000)}`;

    const currentGlobal = getGlobalCompanyDetails();

    const payload = {
      ...currentGlobal,
      ...(editingProposal || {}),
      id: qId,
      number: qId,
      projectId: project.id,
      projectName: projName,
      clientName: clientName,
      title: formState.title,
      projectType: formState.projectType,
      currency: "Indian Rupees (INR)",
      pdfPrimaryColor: _optionalChain([editingProposal, 'optionalAccess', _33 => _33.pdfPrimaryColor]) || currentGlobal.pdfPrimaryColor || "#5D3ADF",
      pdfSecondaryColor: _optionalChain([editingProposal, 'optionalAccess', _34 => _34.pdfSecondaryColor]) || currentGlobal.pdfSecondaryColor || "#B8F7A1",
      companyLogoUrl: _optionalChain([editingProposal, 'optionalAccess', _35 => _35.companyLogoUrl]) || currentGlobal.companyLogoUrl || "/logo.png",
      companyWatermarkUrl: _optionalChain([editingProposal, 'optionalAccess', _36 => _36.companyWatermarkUrl]) || currentGlobal.companyWatermarkUrl || "/watermark.png",
      showWatermark: _optionalChain([editingProposal, 'optionalAccess', _37 => _37.showWatermark]) !== undefined ? editingProposal.showWatermark : (currentGlobal.showWatermark !== undefined ? currentGlobal.showWatermark : true),
      companyWatermarkText: _optionalChain([editingProposal, 'optionalAccess', _38 => _38.companyWatermarkText]) || currentGlobal.companyWatermarkText || "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: _optionalChain([editingProposal, 'optionalAccess', _39 => _39.companyWatermarkOpacity]) !== undefined ? editingProposal.companyWatermarkOpacity : (_nullishCoalesce(currentGlobal.companyWatermarkOpacity, () => ( 0.25))),
      companyWatermarkContrast: _optionalChain([editingProposal, 'optionalAccess', _40 => _40.companyWatermarkContrast]) !== undefined ? editingProposal.companyWatermarkContrast : (_nullishCoalesce(currentGlobal.companyWatermarkContrast, () => ( 150))),
      companyWatermarkGrayscale: _optionalChain([editingProposal, 'optionalAccess', _41 => _41.companyWatermarkGrayscale]) !== undefined ? editingProposal.companyWatermarkGrayscale : (_nullishCoalesce(currentGlobal.companyWatermarkGrayscale, () => ( false))),
      companyWatermarkRotation: 0,
      companyWatermarkSize: _optionalChain([editingProposal, 'optionalAccess', _42 => _42.companyWatermarkSize]) !== undefined ? editingProposal.companyWatermarkSize : (_nullishCoalesce(currentGlobal.companyWatermarkSize, () => ( 50))),
      companyWatermarkImgSize: _optionalChain([editingProposal, 'optionalAccess', _43 => _43.companyWatermarkImgSize]) !== undefined ? editingProposal.companyWatermarkImgSize : (_nullishCoalesce(currentGlobal.companyWatermarkImgSize, () => ( 290))),
      planAName: `PLAN A — ${formState.projectType} Core`,
      planAPrice: _optionalChain([editingProposal, 'optionalAccess', _44 => _44.planAPrice]) || 50000,
      planBName: `PLAN B — ${formState.projectType} Premium`,
      planBPrice: _optionalChain([editingProposal, 'optionalAccess', _45 => _45.planBPrice]) || 65000,
      status: "APPROVED",
      createdDate: _optionalChain([editingProposal, 'optionalAccess', _46 => _46.createdDate]) || new Date().toISOString().split("T")[0],
      documentRef: _optionalChain([editingProposal, 'optionalAccess', _47 => _47.documentRef]) || `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/2026`,
      termsAndConditions: _optionalChain([editingProposal, 'optionalAccess', _48 => _48.termsAndConditions]) || "Estimation is valid for 30 days from date of issue.\nIncludes 30 days complimentary post-launch support.",
      paymentTerms: _optionalChain([editingProposal, 'optionalAccess', _49 => _49.paymentTerms]) || "40% advance on project kick-off\n30% on completion of core module\n30% on final release & launch",
      overviewNarrative: formState.overviewNarrative
    };

    // 1. INSTANT OPTIMISTIC UI UPDATE (0ms speed)
    if (editingProposal) {
      setLocalQuotations(prev => prev.map(q => (q.id === qId || q.number === qId) ? payload : q));
      _optionalChain([setQuotations, 'optionalCall', _50 => _50(prev => prev.map(q => (q.id === qId || q.number === qId) ? payload : q))]);
      showToast("Proposal record updated successfully!", "success");
    } else {
      setLocalQuotations(prev => [payload, ...prev]);
      _optionalChain([setQuotations, 'optionalCall', _51 => _51(prev => [payload, ...prev])]);
      showToast("New proposal created successfully!", "success");
    }

    // 2. CLOSE MODAL IMMEDIATELY IN 0ms
    setIsSubmitting(false);
    setShowProposalModal(false);
    setEditingProposal(null);

    // 3. ASYNC BACKGROUND PERSISTENCE TO MONGO DB
    try {
      const endpoint = editingProposal ? `${API_URL}/crm/quotation/${encodeURIComponent(qId)}` : `${API_URL}/crm/quotation`;
      const method = editingProposal ? "PUT" : "POST";

      fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(r => r.json()).then(res => {
        if (res && res.data) {
          setLocalQuotations(prev => prev.map(q => (q.id === qId || q.number === qId) ? res.data : q));
          _optionalChain([setQuotations, 'optionalCall', _52 => _52(prev => prev.map(q => (q.id === qId || q.number === qId) ? res.data : q))]);
        }
      }).catch(err => {
        console.error("Background DB save error:", err);
      });
    } catch (e) {
      console.error("Async save exception:", e);
    }
  };

  // DELETE Proposal (CRUD Delete)
  const handleDeleteProposal = async (quoteId) => {
    if (!confirm("Are you sure you want to delete this proposal record from database?")) return;
    // 1. INSTANT OPTIMISTIC UI REMOVAL (0ms speed)
    setLocalQuotations(prev => prev.filter(q => q.id !== quoteId && q.number !== quoteId));
    _optionalChain([setQuotations, 'optionalCall', _53 => _53(prev => prev.filter(q => q.id !== quoteId && q.number !== quoteId))]);
    showToast("Proposal deleted successfully!", "success");

    // 2. ASYNC BACKGROUND DB DELETE
    try {
      fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, { method: "DELETE" }).catch(err => {
        console.error("Background DB deletion error:", err);
      });
    } catch (err) {
      console.error("Failed to delete quotation", err);
    }
  };

  // OPEN INVOICE STUDIO PAGE (Full Screen Page like Quotation Page ProjectDetailModal)
  const handleOpenInvoiceStudioPage = (invRecord) => {
    setActiveInvoiceStudioPage(JSON.parse(JSON.stringify(invRecord)));
    setActiveInvoiceSectionId("header");
  };

  // SAVE INVOICE STUDIO PAGE RECORD TO DB & LOCAL STATE
  const handleSaveInvoiceStudioPageRecord = async () => {
    if (!activeInvoiceStudioPage) return;
    setIsSubmitting(true);

    const invId = activeInvoiceStudioPage.id || activeInvoiceStudioPage.number;
    const rateNum = Number(activeInvoiceStudioPage.rate || 170000);
    const taxNum = Number(activeInvoiceStudioPage.taxPct !== undefined ? activeInvoiceStudioPage.taxPct : 18);
    const totalDueNum = Math.round(rateNum * (1 + taxNum / 100));

    const payload = {
      ...activeInvoiceStudioPage,
      id: invId,
      number: invId,
      projectId: project.id,
      projectName: project.name || project.title,
      rate: rateNum,
      amount: rateNum,
      taxPct: taxNum,
      taxAmount: Math.round(rateNum * (taxNum / 100)),
      totalDue: totalDueNum,
      amountInWords: numberToWords(totalDueNum)
    };

    saveGlobalCompanyDetails({
      billedByCompany: payload.billedByCompany,
      companyName: payload.billedByCompany,
      billedBySub: payload.billedBySub,
      companyTagline: payload.billedBySub,
      billedByAddress: payload.billedByAddress,
      companyAddress: payload.billedByAddress,
      billedByContact: payload.billedByContact,
      companyEmail: payload.companyEmail,
      companyPhone: payload.companyPhone,
      companyWebsite: payload.companyWebsite,
      companyGstin: payload.companyGstin,
      companyLogoUrl: payload.companyLogoUrl,
      showWatermark: payload.showWatermark,
      companyWatermarkText: payload.companyWatermarkText,
      companyWatermarkRotation: payload.companyWatermarkRotation,
      companyWatermarkOpacity: payload.companyWatermarkOpacity,
      companyWatermarkContrast: payload.companyWatermarkContrast,
      companyWatermarkGrayscale: payload.companyWatermarkGrayscale,
      companyWatermarkSize: payload.companyWatermarkSize,
      companyWatermarkImgSize: payload.companyWatermarkImgSize,
      pdfPrimaryColor: payload.pdfPrimaryColor,
      pdfSecondaryColor: payload.pdfSecondaryColor
    });

    try {
      const res = await fetch(`${API_URL}/crm/invoice/${encodeURIComponent(invId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      const updated = res.data || payload;
      setActiveInvoiceStudioPage(updated);
      setLocalInvoices(prev => {
        const exists = prev.some(inv => inv.id === invId || inv.number === invId);
        const updatedList = exists ? prev.map(inv => (inv.id === invId || inv.number === invId) ? updated : inv) : [updated, ...prev];
        localStorage.setItem("crm_invoices", JSON.stringify(updatedList));
        return updatedList;
      });

      showToast("Tax Invoice & Global Default Company Branding saved to MongoDB Atlas database!", "success");
      _optionalChain([loadDatabase, 'optionalCall', _54 => _54()]);
    } catch (err) {
      console.error("Failed to save invoice changes", err);
      setLocalInvoices(prev => {
        const exists = prev.some(inv => inv.id === invId || inv.number === invId);
        const updatedList = exists ? prev.map(inv => (inv.id === invId || inv.number === invId) ? payload : inv) : [payload, ...prev];
        localStorage.setItem("crm_invoices", JSON.stringify(updatedList));
        return updatedList;
      });
      showToast("Tax Invoice saved locally!", "info");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadInvoicePdf = (inv) => {
    if (!inv) return;
    showToast("⚡ Preparing Tax Invoice PDF file for download...", "info");
    const invId = inv.id || inv.number || "SPW-INV-001";
    const compName = (inv.billedByCompany || inv.companyName || "Speshway_Solutions").replace(/[^a-zA-Z0-9]/g, "_");
    const clientName = (inv.clientName || inv.billedToClient || _optionalChain([project, 'optionalAccess', _55 => _55.clientName]) || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const projTitle = (inv.productName || inv.billedToProduct || _optionalChain([project, 'optionalAccess', _56 => _56.name]) || _optionalChain([project, 'optionalAccess', _57 => _57.title]) || "Project").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${compName}_${clientName}_${projTitle}_${invId}_Tax_Invoice.pdf`;
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv, project, 1.0);

    const downloader = triggerDirectPdfDownload || defaultPdfDownload;
    downloader(pdfHtml, fileName);
  };

  const handleOpenAgreementStudioPage = (agrRecord) => {
    setActiveAgreementStudioPage(JSON.parse(JSON.stringify(agrRecord)));
    setActiveAgreementSectionId("header");
  };

  const handleSaveAgreementStudioPageRecord = async () => {
    if (!activeAgreementStudioPage) return;
    setIsSubmitting(true);

    const agrId = activeAgreementStudioPage.id || activeAgreementStudioPage.number;

    const payload = {
      ...activeAgreementStudioPage,
      id: agrId,
      number: agrId,
      projectId: project.id,
      projectName: project.name || project.title,
    };

    saveGlobalCompanyDetails({
      billedByCompany: payload.billedByCompany,
      companyName: payload.billedByCompany,
      companyAddress: payload.companyAddress,
      billedByAddress: payload.companyAddress,
      companyLogoUrl: payload.companyLogoUrl,
      showWatermark: payload.showWatermark,
      companyWatermarkUrl: payload.companyWatermarkUrl,
      companyWatermarkText: payload.companyWatermarkText,
      companyWatermarkRotation: payload.companyWatermarkRotation,
      companyWatermarkOpacity: payload.companyWatermarkOpacity,
      companyWatermarkContrast: payload.companyWatermarkContrast,
      companyWatermarkGrayscale: payload.companyWatermarkGrayscale,
      companyWatermarkSize: payload.companyWatermarkSize,
      companyWatermarkImgSize: payload.companyWatermarkImgSize
    });

    try {
      const res = await fetch(`${API_URL}/crm/agreement/${encodeURIComponent(agrId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      const updated = res.data || payload;
      setActiveAgreementStudioPage(updated);
      setLocalAgreements(prev => {
        const exists = prev.some(agr => agr.id === agrId || agr.number === agrId);
        const updatedList = exists ? prev.map(agr => (agr.id === agrId || agr.number === agrId) ? updated : agr) : [updated, ...prev];
        localStorage.setItem("crm_agreements", JSON.stringify(updatedList));
        return updatedList;
      });

      showToast("Service Agreement & Global Default Company Branding saved to MongoDB Atlas database!", "success");
      _optionalChain([loadDatabase, 'optionalCall', _58 => _58()]);
    } catch (err) {
      console.error("Failed to save agreement changes", err);
      setLocalAgreements(prev => {
        const exists = prev.some(agr => agr.id === agrId || agr.number === agrId);
        const updatedList = exists ? prev.map(agr => (agr.id === agrId || agr.number === agrId) ? payload : agr) : [payload, ...prev];
        localStorage.setItem("crm_agreements", JSON.stringify(updatedList));
        return updatedList;
      });
      showToast("Service Agreement saved locally!", "info");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadAgreementPdf = (agr) => {
    if (!agr) return;
    showToast("⚡ Preparing Service Agreement PDF file for download...", "info");
    const agrId = agr.id || agr.number || "SPW-AGR-001";
    const compName = (agr.billedByCompany || agr.companyName || "Speshway_Solutions").replace(/[^a-zA-Z0-9]/g, "_");
    const clientName = (agr.clientName || agr.billedToClient || _optionalChain([project, 'optionalAccess', _59 => _59.clientName]) || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const projTitle = (agr.projectName || _optionalChain([project, 'optionalAccess', _60 => _60.name]) || _optionalChain([project, 'optionalAccess', _61 => _61.title]) || "Project").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${compName}_${clientName}_${projTitle}_${agrId}_Service_Agreement.pdf`;
    const pdfHtml = generateSpeshwayAgreementPdfHtml(agr, project, 1.0);

    const downloader = triggerDirectPdfDownload || defaultPdfDownload;
    downloader(pdfHtml, fileName);
  };

  // IF FULL-SCREEN INVOICE STUDIO PAGE IS ACTIVE (3-COLUMN: LEFT SIDEBAR + MIDDLE FORM + RIGHT LIVE PREVIEW)
  if (activeInvoiceStudioPage) {
    const invId = activeInvoiceStudioPage.id || activeInvoiceStudioPage.number;
    const rateNum = Number(activeInvoiceStudioPage.rate || 170000);
    const taxNum = Number(activeInvoiceStudioPage.taxPct !== undefined ? activeInvoiceStudioPage.taxPct : 18);
    const totalDueNum = Math.round(rateNum * (1 + taxNum / 100));

    return (
      React.createElement('div', { className: "w-full min-h-screen bg-slate-50/70 p-4 md:p-5 flex flex-col gap-5 animate-in fade-in duration-300 font-sans"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 870}}

        /* HIDDEN LOGO AND WATERMARK FILE INPUTS */
        , React.createElement('input', { 
          type: "file", 
          ref: invoiceLogoInputRef, 
          accept: "image/*", 
          onChange: handleInvoiceLogoUpload, 
          className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 873}} 
        )
        , React.createElement('input', { 
          type: "file", 
          ref: invoiceWatermarkInputRef, 
          accept: "image/*", 
          onChange: handleInvoiceWatermarkUpload, 
          className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 880}} 
        )

        /* TOP BREADCRUMB & BACK BUTTON */
        , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-3 text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 889}}
          , React.createElement('div', { className: "flex items-center gap-2 text-gray-500 font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 890}}
            , React.createElement('button', { 
              onClick: () => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              },
              className: "hover:text-rose-600 transition-colors flex items-center gap-1 font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 891}}

              , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 898}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 899}}, "Proposals Workspace" )
            )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 901}}, "/")
            , React.createElement('span', { className: "font-mono text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 902}}, invId)
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 903}}, "/")
            , React.createElement('span', { className: "text-[#FF5349] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 904}}, "Tax Invoice Studio Page"   )
          )

          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 907}}
            , React.createElement('button', {
              onClick: () => openPdfPrintPreview(generateSpeshwayTaxInvoicePdfHtml(activeInvoiceStudioPage, project, 1.0)),
              className: "bg-[#FF5349] hover:bg-[#F05454] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer border-0"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 908}}

              , React.createElement(Printer, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 912}} ), " Print / Save PDF"
            )

            , React.createElement('button', {
              onClick: () => handleDownloadInvoicePdf(activeInvoiceStudioPage),
              className: "bg-[#0e387a] hover:bg-[#0a2959] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 915}}

              , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 919}} ), " Download PDF"
            )

            , React.createElement('button', {
              onClick: handleSaveInvoiceStudioPageRecord,
              disabled: isSubmitting,
              className: "bg-[#FF5349] hover:bg-[#F05454] text-white px-5 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all border-0"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 922}}

              , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 927}} ), " " , isSubmitting ? "Saving..." : "Save Invoice Page"
            )

            , React.createElement('button', {
              onClick: () => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              },
              className: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 930}}

              , React.createElement(ArrowLeft, { size: 14, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 937}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 938}}, "Back to Workspace"  )
            )
          )
        )

        /* DARK HERO BANNER FOR INVOICE PAGE */
        , React.createElement('div', { className: "w-full bg-gradient-to-r from-[#0e2a4a] via-[#10345e] to-[#0c1f38] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-rose-950/40"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 944}}
          , React.createElement('div', { className: "space-y-3 z-10 max-w-2xl"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 945}}
            , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 946}}
              , React.createElement('span', { className: "text-[10px] font-mono bg-blue-950/80 text-rose-300 border border-blue-800/50 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 947}}
                , invId
              )
              , React.createElement('span', { className: "text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-800/50 px-2.5 py-0.5 rounded uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 950}}
                , activeInvoiceStudioPage.status || "PAID"
              )
            )

            , React.createElement('h1', { className: "text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 955}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 956}}, activeInvoiceStudioPage.productName || project.name, " Tax Invoice Studio"   )
            )

            , React.createElement('p', { className: "text-xs text-gray-300 font-sans tracking-wide"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 959}}, "Official Tax Invoice Studio for Billed Client: "
                     , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 960}}, activeInvoiceStudioPage.clientName || project.clientName), ". Edit details & branding on middle, see live PDF on right."
            )
          )

          , React.createElement('div', { className: "z-10 shrink-0 flex items-center gap-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 964}}
            , React.createElement('button', {
              onClick: () => handleDownloadInvoicePdf(activeInvoiceStudioPage),
              className: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-rose-700/30 flex items-center gap-2 transition-all transform hover:scale-[1.02]"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 965}}

              , React.createElement(Download, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 969}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 970}}, "Download PDF Invoice"  )
            )
          )
        )

        /* 3-COLUMN STUDIO LAYOUT: LEFT SIDEBAR + MIDDLE EDIT FORM + RIGHT REAL-TIME LIVE PDF PREVIEW */
        , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-[250px_360px_minmax(560px,1fr)] gap-4 items-start"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 976}}

          /* LEFT SIDEBAR SECTION NAVIGATION (lg:col-span-3) */
          , React.createElement('div', { className: "bg-white p-3.5 rounded-3xl border border-gray-200 shadow-sm space-y-2.5 sticky top-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 979}}
            /* BACK TO PROPOSALS PAGE BUTTON ON TOP LEFT SIDEBAR */
            , React.createElement('button', {
              type: "button",
              onClick: () => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              },
              className: "w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all mb-1"                  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 981}}

              , React.createElement(ArrowLeft, { size: 14, className: "text-rose-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 989}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 990}}, "< Back to Proposals Page"    )
            )

            , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-3 pt-1 pb-1"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 993}}, "Invoice Studio Sections"

            )

            , [
              { id: "header", label: "1. Header & Billing Information", sub: "Ref No, Dates & Billed Info", icon: React.createElement(Building2, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 998}} ) },
              { id: "items", label: "2. Item Description, Rate & GST", sub: "Items, Subtotal & GST Tax", icon: React.createElement(CreditCard, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 999}} ) },
              { id: "bank", label: "3. Bank Details & Payment Status", sub: "Bank Account & Status", icon: React.createElement(Globe, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1000}} ) },
              { id: "branding", label: "4. Company Details & Branding", sub: "Fonts, Colors, Logo & Watermark", icon: React.createElement(Palette, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1001}} ) },
              { id: "preview", label: "5. Full Screen PDF View", sub: "Expand & Download PDF", icon: React.createElement(Eye, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1002}} ) }
            ].map((section) => {
              const isSelected = activeInvoiceSectionId === section.id;
              return (
                React.createElement('button', {
                  key: section.id,
                  onClick: () => setActiveInvoiceSectionId(section.id),
                  className: `w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 shadow-2xs ${
                    isSelected
                      ? "border-[#FF5349] bg-blue-600 text-white shadow-md ring-2 ring-rose-500/20"
                      : "border-gray-150 bg-white text-gray-800 hover:border-blue-300 hover:bg-rose-50/70"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1006}}

                  , React.createElement('div', { className: `p-2 rounded-xl shrink-0 transition-colors ${
                    isSelected ? "bg-white/20 text-white" : "bg-rose-50 text-rose-700"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1015}}
                    , section.icon
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1020}}
                    , React.createElement('h4', { className: `font-extrabold text-xs line-clamp-1 ${isSelected ? "text-white" : "text-gray-800"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1021}}
                      , section.label
                    )
                    , React.createElement('p', { className: `text-[10px] line-clamp-1 mt-0.5 ${isSelected ? "text-rose-100" : "text-gray-400"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1024}}
                      , section.sub
                    )
                  )
                )
              );
            })

            , React.createElement('div', { className: "pt-2 border-t border-gray-100"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1032}}
              , React.createElement('button', {
                onClick: handleSaveInvoiceStudioPageRecord,
                disabled: isSubmitting,
                className: "w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1033}}

                , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1038}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1039}}, isSubmitting ? "Saving..." : "Save Invoice Record")
              )
            )
          )

          /* MIDDLE EDIT FORM CONTENT (lg:col-span-4) */
          , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1045}}

            /* SECTION 1: HEADER & BILLING INFORMATION */
            , activeInvoiceSectionId === "header" && (
              React.createElement('div', { className: "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1049}}
                , React.createElement('div', { className: "border-b border-gray-150 pb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1050}}
                  , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1051}}, "1. Header & Billing Information"    )
                  , React.createElement('p', { className: "text-xs text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1052}}, "Configure reference numbers & billing details."     )
                )

                , React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1055}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1056}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1057}}, "Invoice Reference Number"  )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.number || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, number: e.target.value, id: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-xs text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1058}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1066}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1067}}, "Invoice Issue Date"  )
                    , React.createElement('input', { 
                      type: "date",
                      value: activeInvoiceStudioPage.date || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, date: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1068}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1076}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1077}}, "Billed By Company Title"   )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.billedByCompany !== undefined ? activeInvoiceStudioPage.billedByCompany : "Speshway Solutions Private Limited",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, billedByCompany: e.target.value, companyName: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1078}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1086}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1087}}, "Billed By Subtitle / Tagline"    )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.billedBySub !== undefined ? activeInvoiceStudioPage.billedBySub : "Software Development Company",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, billedBySub: e.target.value, companyTagline: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1088}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1096}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1097}}, "Billed By Address & Office Location"     )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.billedByAddress !== undefined ? activeInvoiceStudioPage.billedByAddress : (activeInvoiceStudioPage.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081"),
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, billedByAddress: e.target.value, companyAddress: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1098}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1106}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1107}}, "Billed By Email & Phone"    )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.billedByContact !== undefined ? activeInvoiceStudioPage.billedByContact : "info@speshway.com | +91 91000 06020",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, billedByContact: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1108}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1116}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1117}}, "Billed To Client Company Name"    )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.clientName || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, clientName: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1118}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1126}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1127}}, "Product / Project Title"   )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.productName || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, productName: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1128}}
                    )
                  )
                )
              )
            )

            /* SECTION 2: ITEM DESCRIPTION, RATE & GST TAX */
            , activeInvoiceSectionId === "items" && (
              React.createElement('div', { className: "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1141}}
                , React.createElement('div', { className: "border-b border-gray-150 pb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1142}}
                  , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1143}}, "2. Item Description, Rate & GST Tax"      )
                  , React.createElement('p', { className: "text-xs text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1144}}, "Specify deliverables, rate, and GST tax percentage."      )
                )

                , React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1147}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1148}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1149}}, "Item Description Header"  )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.description || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, description: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1150}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1158}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1159}}, "Detailed Scope Sub-Description"  )
                    , React.createElement('textarea', { 
                      rows: 3,
                      value: activeInvoiceStudioPage.subdesc || "",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, subdesc: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs resize-none"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1160}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1168}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1169}}, "Subtotal Rate (₹ INR)"   )
                    , React.createElement('input', { 
                      type: "number",
                      value: activeInvoiceStudioPage.rate !== undefined && activeInvoiceStudioPage.rate !== null ? activeInvoiceStudioPage.rate : 50000,
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, rate: e.target.value === "" ? "" : Number(e.target.value) })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-xs text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1170}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1178}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1179}}, "GST Tax Percentage (%)"   )
                    , React.createElement('input', { 
                      type: "number",
                      value: activeInvoiceStudioPage.taxPct !== undefined ? activeInvoiceStudioPage.taxPct : 18,
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, taxPct: Number(e.target.value) })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1180}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1188}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1189}}, "Calculated Total Due (Auto)"   )
                    , React.createElement('input', { 
                      type: "text",
                      readOnly: true,
                      value: `₹ ${totalDueNum.toLocaleString('en-IN')}`,
                      className: "w-full p-2.5 border border-teal-200 bg-teal-50 text-blue-900 font-mono font-extrabold text-sm rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1190}}
                    )
                  )

                  , React.createElement('div', { className: "p-3 bg-slate-50 border border-slate-200 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1198}}
                    , React.createElement('span', { className: "text-[10px] text-gray-500 font-bold uppercase block mb-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1199}}, "Amount in Words"  )
                    , React.createElement('span', { className: "text-xs font-semibold text-slate-800"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1200}}, numberToWords(totalDueNum))
                  )
                )
              )
            )

            /* SECTION 3: BANK DETAILS & PAYMENT STATUS */
            , activeInvoiceSectionId === "bank" && (
              React.createElement('div', { className: "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1208}}
                , React.createElement('div', { className: "border-b border-gray-150 pb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1209}}
                  , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1210}}, "3. Bank Details & Payment Status"     )
                  , React.createElement('p', { className: "text-xs text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1211}}, "Configure bank account details & payment badge."      )
                )

                , React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1214}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1215}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1216}}, "Bank Account Name"  )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.accountName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, accountName: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1217}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1225}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1226}}, "Bank Account Number"  )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.accountNumber || "018326900000850",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, accountNumber: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1227}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1235}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1236}}, "Branch Name" )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.branch || "HITECH CITY",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, branch: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1237}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1245}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1246}}, "IFSC Code" )
                    , React.createElement('input', { 
                      type: "text",
                      value: activeInvoiceStudioPage.ifscCode || "YESB0000183",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, ifscCode: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1247}}
                    )
                  )

                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1255}}
                    , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1256}}, "Payment Status Badge"  )
                    , React.createElement('select', {
                      value: activeInvoiceStudioPage.status || "PAID",
                      onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, status: e.target.value })),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1257}}

                      , React.createElement('option', { value: "PAID", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1262}}, "PAID")
                      , React.createElement('option', { value: "PARTIAL", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1263}}, "PARTIAL")
                      , React.createElement('option', { value: "UNPAID", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1264}}, "UNPAID")
                    )
                  )
                )
              )
            )

            /* SECTION 4: COMPANY DETAILS & INVOICE BRANDING (NEW SECTION!) */
            , activeInvoiceSectionId === "branding" && (
              React.createElement('div', { className: "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1273}}
                , React.createElement('div', { className: "border-b border-gray-150 pb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1274}}
                  , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34] flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1275}}
                    , React.createElement(Palette, { className: "w-4 h-4 text-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1276}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1277}}, "4. Company Details & Invoice Branding"     )
                  )
                  , React.createElement('p', { className: "text-xs text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1279}}, "Customize company contact details, fonts, colors, company logo, and watermark background image."           )
                )

                , React.createElement('div', { className: "space-y-5 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1282}}

                  /* COMPANY CONTACT INFORMATION */
                  , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1285}}
                    , React.createElement('span', { className: "font-bold text-blue-900 uppercase text-[10px] tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1286}}, "Company & Contact Details"   )

                    , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1288}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1289}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1290}}, "Official Contact Email"  )
                        , React.createElement('input', { 
                          type: "email",
                          value: activeInvoiceStudioPage.companyEmail || "info@speshway.com",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyEmail: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1291}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1298}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1299}}, "Official Phone / WhatsApp"   )
                        , React.createElement('input', { 
                          type: "text",
                          value: activeInvoiceStudioPage.companyPhone || "+91 91000 06020",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyPhone: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1300}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1307}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1308}}, "Official Website URL"  )
                        , React.createElement('input', { 
                          type: "text",
                          value: activeInvoiceStudioPage.companyWebsite || "www.speshway.com",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWebsite: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1309}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1316}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1317}}, "TAX ID / GSTIN Identification"    )
                        , React.createElement('input', { 
                          type: "text",
                          value: activeInvoiceStudioPage.companyGstin || "36AAAAA0000A1Z5",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyGstin: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1318}}
                        )
                      )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1327}}
                      , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1328}}, "Registered Address & Footer Location"    )
                      , React.createElement('textarea', { 
                        rows: 2,
                        value: activeInvoiceStudioPage.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, Panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032",
                        onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyAddress: e.target.value })),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs resize-none"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1329}}
                      )
                    )
                  )

                  /* TYPOGRAPHY & GOOGLE FONTS */
                  , React.createElement('div', { className: "space-y-3 pt-3 border-t border-gray-150"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1339}}
                    , React.createElement('span', { className: "font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1340}}
                      , React.createElement(Type, { className: "w-3.5 h-3.5 text-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1341}} )
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1342}}, "PDF Typography & Google Fonts Config"     )
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1345}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1346}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1347}}, "PDF Body Font (Google Fonts)"    )
                        , React.createElement('select', {
                          value: activeInvoiceStudioPage.pdfBodyFont || "Segoe UI",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfBodyFont: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1348}}

                          , React.createElement('option', { value: "Segoe UI" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1353}}, "Segoe UI (Default Clean)"   )
                          , React.createElement('option', { value: "Poppins", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1354}}, "Poppins (Modern Clean Sans)"   )
                          , React.createElement('option', { value: "Inter", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1355}}, "Inter (Sleek UI Sans)"   )
                          , React.createElement('option', { value: "Roboto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1356}}, "Roboto (Google Standard)"  )
                          , React.createElement('option', { value: "Montserrat", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1357}}, "Montserrat (Bold Modern)"  )
                          , React.createElement('option', { value: "Open Sans" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1358}}, "Open Sans (Neutral Reading)"   )
                        )
                      )

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1362}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1363}}, "Company & Headings Font"   )
                        , React.createElement('select', {
                          value: activeInvoiceStudioPage.pdfHeadingFont || "Segoe UI",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfHeadingFont: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1364}}

                          , React.createElement('option', { value: "Segoe UI" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1369}}, "Segoe UI (Default Clean)"   )
                          , React.createElement('option', { value: "Outfit", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1370}}, "Outfit (Geometric Modern)"  )
                          , React.createElement('option', { value: "Times New Roman"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1371}}, "Times New Roman (Classic Serif)"    )
                          , React.createElement('option', { value: "Playfair Display" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1372}}, "Playfair Display (Luxury Serif)"   )
                          , React.createElement('option', { value: "Cinzel", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1373}}, "Cinzel (Corporate Premium)"  )
                        )
                      )
                    )
                  )

                  /* COLOR THEME CONTROLS */
                  , React.createElement('div', { className: "space-y-3 pt-3 border-t border-gray-150"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1380}}
                    , React.createElement('span', { className: "font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1381}}
                      , React.createElement(Palette, { className: "w-3.5 h-3.5 text-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1382}} )
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1383}}, "PDF Banner & Table Accent Colors"     )
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1386}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1387}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1388}}, "Header Bar Primary Color (Hex)"    )
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1389}}
                          , React.createElement('input', { 
                            type: "color",
                            value: activeInvoiceStudioPage.pdfPrimaryColor || "#5D3ADF",
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfPrimaryColor: e.target.value })),
                            className: "w-10 h-10 rounded-xl border border-gray-300 cursor-pointer p-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1390}}
                          )
                          , React.createElement('input', { 
                            type: "text",
                            value: activeInvoiceStudioPage.pdfPrimaryColor || "#5D3ADF",
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfPrimaryColor: e.target.value })),
                            className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1396}}
                          )
                        )
                      )

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1405}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1406}}, "Secondary Accent Color (Hex)"   )
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1407}}
                          , React.createElement('input', { 
                            type: "color",
                            value: activeInvoiceStudioPage.pdfSecondaryColor || "#B8F7A1",
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfSecondaryColor: e.target.value })),
                            className: "w-10 h-10 rounded-xl border border-gray-300 cursor-pointer p-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1408}}
                          )
                          , React.createElement('input', { 
                            type: "text",
                            value: activeInvoiceStudioPage.pdfSecondaryColor || "#B8F7A1",
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfSecondaryColor: e.target.value })),
                            className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1414}}
                          )
                        )
                      )
                    )

                      /* COLOR PALETTE PRESETS */
                      , React.createElement('div', { className: "flex flex-wrap gap-2 pt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1425}}
                        , [
                          { name: "Purple Theme (Default)", primary: "#5D3ADF", secondary: "#B8F7A1" },
                          { name: "Flame Red", primary: "#0B2369", secondary: "#FF5349" },
                          { name: "Royal Purple", primary: "#4c1d95", secondary: "#7c3aed" },
                          { name: "Emerald Green", primary: "#065f46", secondary: "#059669" },
                          { name: "Crimson Red", primary: "#991b1b", secondary: "#dc2626" },
                          { name: "Slate Dark", primary: "#0f172a", secondary: "#334155" }
                        ].map(pal => (
                          React.createElement('button', {
                            key: pal.name,
                            type: "button",
                            onClick: () => setActiveInvoiceStudioPage((prev) => ({ ...prev, pdfPrimaryColor: pal.primary, pdfSecondaryColor: pal.secondary })),
                            className: "px-2 py-0.5 rounded-lg text-[10px] font-bold text-white shadow-2xs flex items-center gap-1 transition-all hover:scale-105"           ,
                            style: { background: `linear-gradient(135deg, ${pal.primary}, ${pal.secondary})` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1434}}

                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1441}}, pal.name)
                          )
                        ))
                      )
                    )

                    /* LOGO & WATERMARK BACKGROUND IMAGE CONFIG */
                    , React.createElement('div', { className: "space-y-4 pt-3 border-t border-gray-150"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1448}}
                      , React.createElement('span', { className: "font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1449}}
                        , React.createElement(ImageIcon, { className: "w-3.5 h-3.5 text-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1450}} )
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1451}}, "Company Logo & Background Watermark Image"     )
                      )

                      /* LOGO UPLOAD & URL */
                      , React.createElement('div', { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1455}}
                        , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1456}}
                          , React.createElement('span', { className: "font-bold text-gray-800 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1457}}, "Official Header Logo Image (Upload or URL)"      )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => _optionalChain([invoiceLogoInputRef, 'access', _62 => _62.current, 'optionalAccess', _63 => _63.click, 'call', _64 => _64()]),
                            className: "px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1458}}

                            , React.createElement(Upload, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1463}} ), " Upload Logo"
                          )
                        )

                        , React.createElement('input', {
                          type: "text",
                          placeholder: "Paste image URL or click upload button..."      ,
                          value: activeInvoiceStudioPage.companyLogoUrl || "",
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyLogoUrl: e.target.value })),
                          className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1467}}
                        )

                        , activeInvoiceStudioPage.companyLogoUrl && (
                          React.createElement('div', { className: "flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1476}}
                            , React.createElement('img', { src: activeInvoiceStudioPage.companyLogoUrl, alt: "Logo", className: "h-10 max-w-[140px] object-contain"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1477}} )
                            , React.createElement('span', { className: "text-[10px] font-mono text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1478}}, "Logo Active" )
                            , React.createElement('button', {
                              type: "button",
                              onClick: () => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyLogoUrl: "" })),
                              className: "text-red-500 hover:text-red-700 text-xs font-bold ml-auto"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1479}}
, "Remove Logo"

                            )
                          )
                        )
                      )

                    /* WATERMARK BACKGROUND UPLOAD & CONFIG */
                    , React.createElement('div', { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1491}}
                      /* WATERMARK ENABLE / DISABLE TOGGLE OPTION */
                      , React.createElement('div', { className: "flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1493}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1494}}
                          , React.createElement('span', { className: "font-bold text-gray-900 text-xs block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1495}}, "Background Watermark" )
                          , React.createElement('span', { className: "text-[11px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1496}}, "Enable or disable background watermark display on PDF"       )
                        )
                        , React.createElement('label', { className: "relative inline-flex items-center cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1498}}
                          , React.createElement('input', { 
                            type: "checkbox", 
                            checked: activeInvoiceStudioPage.showWatermark === true,
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, showWatermark: e.target.checked })),
                            className: "sr-only peer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1499}}
                          )
                          , React.createElement('div', { className: "w-10 h-5.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1505}})
                        )
                      )

                      , React.createElement('div', { className: "flex justify-between items-center pt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1509}}
                        , React.createElement('span', { className: "font-bold text-gray-800 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1510}}, "Background Watermark Image / Text"    )
                        , React.createElement('button', {
                          type: "button",
                          onClick: () => _optionalChain([invoiceWatermarkInputRef, 'access', _65 => _65.current, 'optionalAccess', _66 => _66.click, 'call', _67 => _67()]),
                          className: "px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1511}}

                          , React.createElement(Upload, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1516}} ), " Upload Watermark Image"
                        )
                      )

                      /* WATERMARK IMAGE PREVIEW IF UPLOADED */
                      , activeInvoiceStudioPage.companyWatermarkUrl && (
                        React.createElement('div', { className: "flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1522}}
                          , React.createElement('img', { src: activeInvoiceStudioPage.companyWatermarkUrl, alt: "Watermark", className: "h-12 max-w-[140px] object-contain opacity-50"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1523}} )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkUrl: "" })),
                            className: "text-red-500 hover:text-red-700 text-xs font-bold ml-auto"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1524}}
, "Remove Image"

                          )
                        )
                      )

                      /* WATERMARK TEXT / BRAND NAME INPUT (ALWAYS EDITABLE) */
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1535}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1536}}, "Background Watermark Text / Brand Name"     )
                        , React.createElement('input', { 
                          type: "text",
                          value: activeInvoiceStudioPage.companyWatermarkText !== undefined ? activeInvoiceStudioPage.companyWatermarkText : (activeInvoiceStudioPage.billedByCompany || "SPESHWAY SOLUTIONS"),
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkText: e.target.value })),
                          placeholder: "e.g. SPESHWAY SOLUTIONS"  ,
                          className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1537}}
                        )
                      )

                      /* WATERMARK TEXT FONT SIZE CONTROLS */
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1547}}
                        , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1548}}
                          , React.createElement('label', { className: "font-bold text-gray-800 text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1549}}, "Watermark Text Font Size (px)"    )
                          , React.createElement('div', { className: "flex items-center gap-1 font-mono font-extrabold text-teal-700 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1550}}
                            , React.createElement('button', {
                              type: "button",
                              onClick: () => setActiveInvoiceStudioPage((prev) => ({
                                ...prev,
                                companyWatermarkSize: Math.max(14, (prev.companyWatermarkSize || prev.watermarkSize || 26) - 2)
                              })),
                              className: "w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1551}}
, "-"

                            )
                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1561}}, activeInvoiceStudioPage.companyWatermarkSize || activeInvoiceStudioPage.watermarkSize || 26, "px")
                            , React.createElement('button', {
                              type: "button",
                              onClick: () => setActiveInvoiceStudioPage((prev) => ({
                                ...prev,
                                companyWatermarkSize: Math.min(64, (prev.companyWatermarkSize || prev.watermarkSize || 26) + 2)
                              })),
                              className: "w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1562}}
, "+"

                            )
                          )
                        )
                        , React.createElement('input', {
                          type: "range",
                          min: 14,
                          max: 64,
                          step: 1,
                          value: activeInvoiceStudioPage.companyWatermarkSize || activeInvoiceStudioPage.watermarkSize || 26,
                          onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkSize: Number(e.target.value) })),
                          className: "w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1574}}
                        )
                      )

                      /* WATERMARK LOGO IMAGE WIDTH CONTROLS */
                      , activeInvoiceStudioPage.companyWatermarkUrl && (
                        React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1587}}
                          , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1588}}
                            , React.createElement('label', { className: "font-bold text-gray-800 text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1589}}, "Watermark Logo Image Width (px)"    )
                            , React.createElement('div', { className: "flex items-center gap-1 font-mono font-extrabold text-teal-700 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1590}}
                              , React.createElement('button', {
                                type: "button",
                                onClick: () => setActiveInvoiceStudioPage((prev) => ({
                                  ...prev,
                                  companyWatermarkImgSize: Math.max(60, (prev.companyWatermarkImgSize || prev.watermarkImgSize || 220) - 10)
                                })),
                                className: "w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1591}}
, "-"

                              )
                              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1601}}, activeInvoiceStudioPage.companyWatermarkImgSize || activeInvoiceStudioPage.watermarkImgSize || 220, "px")
                              , React.createElement('button', {
                                type: "button",
                                onClick: () => setActiveInvoiceStudioPage((prev) => ({
                                  ...prev,
                                  companyWatermarkImgSize: Math.min(350, (prev.companyWatermarkImgSize || prev.watermarkImgSize || 220) + 10)
                                })),
                                className: "w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1602}}
, "+"

                              )
                            )
                          )
                          , React.createElement('input', {
                            type: "range",
                            min: 60,
                            max: 350,
                            step: 5,
                            value: activeInvoiceStudioPage.companyWatermarkImgSize || activeInvoiceStudioPage.watermarkImgSize || 220,
                            onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkImgSize: Number(e.target.value) })),
                            className: "w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1614}}
                          )
                        )
                      )

                      , React.createElement('div', { className: "space-y-3 pt-2 border-t border-gray-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1626}}

                        /* OPACITY SLIDER & SELECT */
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1629}}
                          , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1630}}
                            , React.createElement('label', { className: "font-bold text-gray-800 text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1631}}, "Watermark Opacity Transparency"  )
                            , React.createElement('span', { className: "font-mono font-extrabold text-teal-700 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1632}}, Math.round((activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06) * 100), "%")
                          )
                          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1634}}
                            , React.createElement('input', { 
                              type: "range", 
                              min: 0.01, 
                              max: 0.80, 
                              step: 0.02,
                              value: activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06,
                              onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkOpacity: Number(e.target.value) })),
                              className: "w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1635}}
                            )
                            , React.createElement('select', {
                              value: activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06,
                              onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkOpacity: Number(e.target.value) })),
                              className: "p-1.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1644}}

                              , React.createElement('option', { value: 0.03, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1649}}, "3% (Ultra Subtle)"  )
                              , React.createElement('option', { value: 0.06, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1650}}, "6% (Standard)" )
                              , React.createElement('option', { value: 0.12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1651}}, "12% (Medium)" )
                              , React.createElement('option', { value: 0.25, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1652}}, "25% (High Visibility)"  )
                              , React.createElement('option', { value: 0.50, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1653}}, "50% (Ultra Dark)"  )
                              , React.createElement('option', { value: 0.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1654}}, "75% (Maximum)" )
                            )
                          )
                        )

                        /* CONTRAST & COLOR / BLACK & WHITE MODE */
                        , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1660}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1661}}
                            , React.createElement('label', { className: "font-bold text-gray-800 block mb-1 text-[11px]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1662}}, "Image Contrast" )
                            , React.createElement('select', {
                              value: activeInvoiceStudioPage.companyWatermarkContrast !== undefined ? activeInvoiceStudioPage.companyWatermarkContrast : 100,
                              onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkContrast: Number(e.target.value) })),
                              className: "w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] focus:outline-none focus:border-teal-500 shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1663}}

                              , React.createElement('option', { value: 100, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1668}}, "100% Normal" )
                              , React.createElement('option', { value: 150, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1669}}, "150% High" )
                              , React.createElement('option', { value: 200, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1670}}, "200% Ultra High"  )
                              , React.createElement('option', { value: 300, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1671}}, "300% Maximum" )
                            )
                          )

                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1675}}
                            , React.createElement('label', { className: "font-bold text-gray-800 block mb-1 text-[11px]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1676}}, "Color Filter Mode"  )
                            , React.createElement('select', {
                              value: activeInvoiceStudioPage.companyWatermarkGrayscale ? "grayscale" : "color",
                              onChange: e => setActiveInvoiceStudioPage((prev) => ({ ...prev, companyWatermarkGrayscale: e.target.value === "grayscale" })),
                              className: "w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] focus:outline-none focus:border-teal-500 shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1677}}

                              , React.createElement('option', { value: "color", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1682}}, "Full Color" )
                              , React.createElement('option', { value: "grayscale", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1683}}, "Grayscale (B&W)" )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )

            /* SECTION 5: FULL SCREEN PDF PREVIEW NOTICE */
            , activeInvoiceSectionId === "preview" && (
              React.createElement('div', { className: "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1696}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1697}}, "5. Full Screen PDF View"    )
                , React.createElement('p', { className: "text-xs text-gray-500 leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1698}}, "Reviewing live Tax Invoice document output in full detail. Use the download button to export directly."

                )
                , React.createElement('button', {
                  onClick: () => handleDownloadInvoicePdf(activeInvoiceStudioPage),
                  className: "w-full py-3 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1701}}

                  , React.createElement(Download, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1705}} ), " Download Tax Invoice PDF"
                )
              )
            )

          )

          /* RIGHT SIDE REAL-TIME LIVE TAX INVOICE PDF PREVIEW PANEL */
          , React.createElement('div', { className: "min-w-0 bg-white p-4 rounded-3xl border border-gray-200 shadow-sm space-y-3 sticky top-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1713}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1714}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1715}}
                , React.createElement(Eye, { size: 16, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1716}} )
                , React.createElement('span', { className: "font-extrabold text-xs text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1717}}, "Live Tax Invoice PDF Preview"    )
              )

              /* INTERACTIVE ZOOM CONTROLS WITH FIT TO BOX & 100% PRESETS */
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1721}}
                , React.createElement('div', { className: "flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1722}}
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setInvoicePreviewZoom(0.6),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      invoicePreviewZoom === 0.6 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "Fit to Box (60%)"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1723}}
, "Fit Box"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setInvoicePreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom Out (-5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1733}}

                    , React.createElement(ZoomOut, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1739}} )
                  )
                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1741}}
                    , Math.round(invoicePreviewZoom * 100), "%"
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setInvoicePreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom In (+5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1744}}

                    , React.createElement(ZoomIn, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1750}} )
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setInvoicePreviewZoom(1.0),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      invoicePreviewZoom === 1.0 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "100% Actual Size"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1752}}
, "100%"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setInvoicePreviewZoom(0.6),
                    className: "p-1 text-gray-400 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Reset to 60%"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1762}}

                    , React.createElement(RotateCcw, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1768}} )
                  )
                )

                , React.createElement('button', {
                  onClick: () => handleDownloadInvoicePdf(activeInvoiceStudioPage),
                  className: "px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1772}}

                  , React.createElement(Download, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1776}} ), " Download PDF"
                )
              )
            )

            , React.createElement('div', { className: "w-full aspect-[210/297] max-h-[82vh] min-h-[620px] border border-gray-200 rounded-2xl overflow-x-auto overflow-y-auto shadow-inner bg-slate-900"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1781}}
              , React.createElement('iframe', {
                srcDoc: generateSpeshwayTaxInvoicePdfHtml(activeInvoiceStudioPage, project, invoicePreviewZoom),
                className: "h-full min-w-[640px] border-0 bg-slate-900"   ,
                style: { width: "100%", overflowX: "auto" },
                title: "Live Tax Invoice PDF Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1782}}
              )
            )
          )

        )

        /* BOTTOM SAVE & NAVIGATION BUTTONS */
        , React.createElement('div', { className: "flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-6"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1794}}
          , React.createElement('button', {
            onClick: () => {
              setActiveInvoiceStudioPage(null);
              setActiveWorkspaceTab("proposals");
            },
            className: "w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1795}}

            , React.createElement(ArrowLeft, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1802}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1803}}, "Back to Proposals Workspace"   )
          )

          , React.createElement('div', { className: "flex items-center gap-3 w-full sm:w-auto flex-wrap justify-end"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1806}}
            , React.createElement('button', {
              onClick: () => handleDownloadInvoicePdf(activeInvoiceStudioPage),
              className: "flex-1 sm:flex-initial px-5 py-2.5 bg-[#0e387a] hover:bg-[#0a2959] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1807}}

              , React.createElement(Download, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1811}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1812}}, "Download PDF Invoice"  )
            )

            , React.createElement('button', {
              onClick: handleSaveInvoiceStudioPageRecord,
              disabled: isSubmitting,
              className: "flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1815}}

              , React.createElement(Save, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1820}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1821}}, isSubmitting ? "Saving..." : "Save Invoice Page Record")
            )
          )
        )



      )
    );
  }

  if (activeAgreementStudioPage) {
    const agrId = activeAgreementStudioPage.id || activeAgreementStudioPage.number;

    return (
      React.createElement('div', { className: "w-full min-h-screen bg-slate-50/70 p-4 md:p-5 flex flex-col gap-5 animate-in fade-in duration-300 font-sans"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1836}}

        /* HIDDEN LOGO AND WATERMARK FILE INPUTS */
        , React.createElement('input', { 
          type: "file", 
          ref: agreementLogoInputRef, 
          accept: "image/*", 
          onChange: handleAgreementLogoUpload, 
          className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1839}} 
        )
        , React.createElement('input', { 
          type: "file", 
          ref: agreementWatermarkInputRef, 
          accept: "image/*", 
          onChange: handleAgreementWatermarkUpload, 
          className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1846}} 
        )

        /* TOP BREADCRUMB & BACK BUTTON */
        , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-3 text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1855}}
          , React.createElement('div', { className: "flex items-center gap-2 text-gray-500 font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1856}}
            , React.createElement('button', { 
              onClick: () => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("proposals");
              },
              className: "hover:text-teal-600 transition-colors flex items-center gap-1 font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1857}}

              , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1864}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1865}}, "Proposals Workspace" )
            )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1867}}, "/")
            , React.createElement('span', { className: "font-mono text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1868}}, agrId)
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1869}}, "/")
            , React.createElement('span', { className: "text-teal-600 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1870}}, "Service Agreement Studio"  )
          )

          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1873}}
            , React.createElement('button', {
              onClick: () => openPdfPrintPreview(generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, 1.0)),
              className: "bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1874}}

              , React.createElement(Printer, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1878}} ), " Print / Save PDF"
            )

            , React.createElement('button', {
              onClick: () => handleDownloadAgreementPdf(activeAgreementStudioPage),
              className: "bg-[#0e387a] hover:bg-[#0a2959] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1881}}

              , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1885}} ), " Download PDF"
            )

            , React.createElement('button', {
              onClick: handleSaveAgreementStudioPageRecord,
              disabled: isSubmitting,
              className: "bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1888}}

              , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1893}} ), " " , isSubmitting ? "Saving..." : "Save Agreement"
            )

            , React.createElement('button', {
              onClick: () => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("agreements");
              },
              className: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1896}}

              , React.createElement(ArrowLeft, { size: 14, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1903}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1904}}, "Back to Workspace"  )
            )
          )
        )

        /* DARK HERO BANNER */
        , React.createElement('div', { className: "w-full bg-gradient-to-r from-[#0e2a4a] via-[#10345e] to-[#0c1f38] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-teal-950/40"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1910}}
          , React.createElement('div', { className: "space-y-3 z-10 max-w-2xl"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1911}}
            , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1912}}
              , React.createElement('span', { className: "text-[10px] font-mono bg-blue-950/80 text-teal-300 border border-blue-800/50 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1913}}
                , agrId
              )
              , React.createElement('span', { className: "text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-2.5 py-0.5 rounded uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1916}}
                , activeAgreementStudioPage.status || "SIGNED"
              )
            )

            , React.createElement('h1', { className: "text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1921}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1922}}, activeAgreementStudioPage.projectName || project.name, " Service Agreement Studio"   )
            )

            , React.createElement('p', { className: "text-xs text-gray-300 font-sans tracking-wide"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1925}}, "Official Service Level Agreement (SLA) Studio for Billed Client: "
                       , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1926}}, activeAgreementStudioPage.clientName || project.clientName), ". Edit details & branding on middle, see live PDF on right."
            )
          )

          , React.createElement('div', { className: "z-10 shrink-0 flex items-center gap-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1930}}
            , React.createElement('button', {
              onClick: () => handleDownloadAgreementPdf(activeAgreementStudioPage),
              className: "bg-blue-600 hover:bg-teal-500 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-teal-700/30 flex items-center gap-2 transition-all transform hover:scale-[1.02]"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1931}}

              , React.createElement(Download, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1935}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1936}}, "Download PDF Agreement"  )
            )
          )
        )

        /* 3-COLUMN STUDIO LAYOUT */
        , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-[250px_360px_minmax(560px,1fr)] gap-4 items-start"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1942}}

          /* LEFT SIDEBAR SECTION NAVIGATION */
          , React.createElement('div', { className: "bg-white p-3.5 rounded-3xl border border-gray-200 shadow-sm space-y-2.5 sticky top-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1945}}
            , React.createElement('button', {
              type: "button",
              onClick: () => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("agreements");
              },
              className: "w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all mb-1"                  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1946}}

              , React.createElement(ArrowLeft, { size: 14, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1954}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1955}}, "< Back to Agreements List"    )
            )

            , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-3 pt-1 pb-1"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1958}}, "Agreement Studio Sections"

            )

            , [
              { id: "header", label: "1. Header & Contracting Parties", sub: "Ref No, Dates & Client Info", icon: React.createElement(Building2, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1963}} ) },
              { id: "scope", label: "2. Scope of Work (Section 1)", sub: "App & Admin Panel Bullets", icon: React.createElement(Layers, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1964}} ) },
              { id: "duration", label: "3. Duration & Financial Milestones", sub: "Duration, Budget & Stage %", icon: React.createElement(CreditCard, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1965}} ) },
              { id: "responsibilities", label: "4. Responsibilities (Section 4)", sub: "Company & Client Roles", icon: React.createElement(CheckCircle, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1966}} ) },
              { id: "clauses", label: "5. Legal Clauses (Sections 5-10)", sub: "IP, Dispute, Termination, Exclusions", icon: React.createElement(FileSignature, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1967}} ) },
              { id: "branding", label: "6. Company Details & Branding", sub: "Fonts, Colors, Logo & Watermark", icon: React.createElement(Palette, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1968}} ) },
              { id: "preview", label: "7. Full Screen Print / PDF Mode", sub: "Full Print and Save Layout", icon: React.createElement(Eye, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1969}} ) }
            ].map((section) => {
              const isSelected = activeAgreementSectionId === section.id;
              return (
                React.createElement('button', {
                  key: section.id,
                  type: "button",
                  onClick: () => setActiveAgreementSectionId(section.id),
                  className: `w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 text-blue-950 border-blue-200 shadow-2xs"
                      : "bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1973}}

                  , React.createElement('div', { className: `p-1.5 rounded-xl border shrink-0 transition-colors ${
                    isSelected ? "bg-blue-600 text-white border-blue-500" : "bg-gray-50 text-gray-400 border-gray-100"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1983}}
                    , section.icon
                  )
                  , React.createElement('div', { className: "space-y-0.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1988}}
                    , React.createElement('div', { className: "text-[11px] font-extrabold leading-tight tracking-tight"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1989}}, section.label)
                    , React.createElement('div', { className: "text-[9px] text-gray-400 font-medium leading-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1990}}, section.sub)
                  )
                )
              );
            })
          )

          /* MIDDLE EDIT FORM */
          , React.createElement('div', { className: "bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1998}}

            , activeAgreementSectionId === "header" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2001}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2002}}, "Header & Contracting Parties"   )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2004}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2005}}, "Agreement Reference ID"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.number || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, number: e.target.value, id: e.target.value })),
                    className: "w-full text-xs font-mono font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2006}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2014}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2015}}, "Effective Date" )
                  , React.createElement('input', {
                    type: "date",
                    value: activeAgreementStudioPage.date || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, date: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2016}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2024}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2025}}, "Project / Scope Title"   )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.projectName || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, projectName: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2026}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2034}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2035}}, "Client Company Name"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.clientName || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, clientName: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2036}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2044}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2045}}, "Client Address Details"  )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.clientAddress || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, clientAddress: e.target.value })),
                    rows: 2,
                    className: "w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2046}}
                  )
                )
              )
            )

            , activeAgreementSectionId === "scope" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2057}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2058}}, "Project Overview & Scope"   )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2060}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2061}}, "Agreement Document Title"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.docTitle || "Software Development Agreement",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, docTitle: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2062}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2070}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2071}}, "Agreement Introduction Text"  )
                  , React.createElement('textarea', {
                    value: _nullishCoalesce(activeAgreementStudioPage.introduction, () => ( "")),
                    placeholder: "Leave blank for automatic contracting parties intro..."      ,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, introduction: e.target.value })),
                    rows: 4,
                    className: "w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2072}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2081}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2082}}, "Section 1 Header Title"   )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec1Title || "1. Project Overview & Scope",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2083}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2091}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2092}}, "Section 1 Scope Narrative"   )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.sec1Content || "The Company agrees to design and develop a sports Management platform including a mobile application for users and a centralized web-based admin panel.",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Content: e.target.value })),
                    rows: 3,
                    className: "w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2093}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2101}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2102}}, "1.1 Subsection Title"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec1Subsection1Title || "1.1 User Mobile Application (Android & iOS)",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Subsection1Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2103}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2111}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2112}}, "1.1 Scope Bullets (Newline separated)"    )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.sec1Subsection1BulletText || `Authentication: Secure registration and login for academy members.
Slot Booking (External): Deep-linking functionality to open third-party apps (Playo or District) for slot bookings.
Team Matching: Feature to match users with other players/teams; mobile numbers are visible only to subscribed users.
Coupon Codes & Payments: Integration for applying coupons and a payment gateway for services.
Profile Management: User personal details and history.`,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Subsection1BulletText: e.target.value })),
                    rows: 5,
                    className: "w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2113}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2125}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2126}}, "1.2 Subsection Title"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec1Subsection2Title || "1.2 Admin Web Panel",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Subsection2Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2127}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2135}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2136}}, "1.2 Scope Bullets (Newline separated)"    )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.sec1Subsection2BulletText || `Dashboard: Real-time overview of active bookings and user activity.
Slot & Capacity Management: Configuration of available hours and maximum members per session.
Subscription Management: Tools to manage memberships, tiers, and renewals.
Moderation: Management of users and overview of social sessions.`,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec1Subsection2BulletText: e.target.value })),
                    rows: 5,
                    className: "w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2137}}
                  )
                )
              )
            )

            , activeAgreementSectionId === "duration" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2151}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2152}}, "Duration & Financial Milestones"   )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2154}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2155}}, "Project Duration Timeframe"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.duration || "",
                    placeholder: "e.g. one (1) month"   ,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, duration: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2156}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2165}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2166}}, "Total Project Cost Budget (₹)"    )
                  , React.createElement('input', {
                    type: "number",
                    value: activeAgreementStudioPage.budget || 80000,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, budget: Number(e.target.value), rate: Number(e.target.value), amount: Number(e.target.value) })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2167}}
                  )
                )

                , React.createElement('div', { className: "p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2175}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-blue-900 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2176}}, "Milestone Percentages Split"  )

                  , React.createElement('div', { className: "grid grid-cols-3 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2178}}
                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2179}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2180}}, "M1 (Initiation)" )
                      , React.createElement('input', {
                        type: "number",
                        value: _nullishCoalesce(activeAgreementStudioPage.m1Pct, () => ( 40)),
                        onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, m1Pct: Number(e.target.value) })),
                        className: "w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2181}}
                      )
                    )
                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2188}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2189}}, "M2 (Beta)" )
                      , React.createElement('input', {
                        type: "number",
                        value: _nullishCoalesce(activeAgreementStudioPage.m2Pct, () => ( 40)),
                        onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, m2Pct: Number(e.target.value) })),
                        className: "w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2190}}
                      )
                    )
                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2197}}
                      , React.createElement('label', { className: "text-[9px] font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2198}}, "M3 (Handover)" )
                      , React.createElement('input', {
                        type: "number",
                        value: _nullishCoalesce(activeAgreementStudioPage.m3Pct, () => ( 20)),
                        onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, m3Pct: Number(e.target.value) })),
                        className: "w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2199}}
                      )
                    )
                  )

                  , React.createElement('p', { className: "text-[9px] text-gray-400 text-center font-medium mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2208}}, "Make sure the milestone splits sum to exactly 100%."        )
                )
              )
            )

            , activeAgreementSectionId === "responsibilities" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2214}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2215}}, "Responsibilities")

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2217}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2218}}, "Section 4 Header Title"   )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec4Title || "4. Responsibilities",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec4Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2219}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2227}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2228}}, "4.1 Provider Responsibilities Title"   )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec4Subsection1Title || "4.1 Responsibilities of the Company",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec4Subsection1Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2229}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2237}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2238}}, "Provider Bullets (Newline separated)"   )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.sec4Subsection1BulletText || `Custom Development: End-to-end coding of the mobile application and administrative dashboard.
UI/UX Design: Professional interface design focused on sports usability.
Backend Engineering: Robust API development and database architecture.
Deployment Support: Assistance in hosting the admin panel and publishing to app stores.
Warranty: Inclusion of 3 months post-deployment technical support for bug fixes.`,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec4Subsection1BulletText: e.target.value })),
                    rows: 6,
                    className: "w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2239}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2251}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2252}}, "4.2 Client Responsibilities Title"   )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.sec4Subsection2Title || "4.2 Responsibilities of the Client",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec4Subsection2Title: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2253}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2261}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2262}}, "Client Bullets (Newline separated)"   )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.sec4Subsection2BulletText || `Assets & Media: Provision of high-resolution logos, images, and branding guidelines.
Third-Party Credentials: Provision of API keys for payment gateways, SMS services, and developer accounts (Google Play/Apple Store).
Timely Review: Feedback on design mockups and staging deployments within 48 hours to avoid timeline shifts.`,
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec4Subsection2BulletText: e.target.value })),
                    rows: 6,
                    className: "w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2263}}
                  )
                )
              )
            )

            , activeAgreementSectionId === "clauses" && (
              React.createElement('div', { className: "space-y-4 max-h-[60vh] overflow-y-auto pr-1 animate-in fade-in duration-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2276}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2277}}, "Legal Clauses & Exclusions"   )

                /* Section 5 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2280}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2281}}, "5. IP & Confidentiality"   )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2282}}
                    , React.createElement('input', {
                      type: "text",
                      placeholder: "Section 5 Title"  ,
                      value: activeAgreementStudioPage.sec5Title || "5. Intellectual Property & Confidentiality",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec5Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2283}}
                    )
                    , React.createElement('input', {
                      type: "text",
                      placeholder: "Subsection 5.1 Title"  ,
                      value: activeAgreementStudioPage.sec5Subsection1Title || "5.1 Intellectual Property",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec5Subsection1Title: e.target.value })),
                      className: "w-full text-[11px] font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2290}}
                    )
                    , React.createElement('textarea', {
                      placeholder: "Subsection 5.1 Content"  ,
                      value: activeAgreementStudioPage.sec5Subsection1Content || "Upon full and final payment of the total budget, the source code and assets specifically developed for this project shall be transferred to the Client. The Company retains the right to use underlying generic libraries and frameworks.",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec5Subsection1Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2297}}
                    )
                    , React.createElement('input', {
                      type: "text",
                      placeholder: "Subsection 5.2 Title"  ,
                      value: activeAgreementStudioPage.sec5Subsection2Title || "5.2 Confidentiality",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec5Subsection2Title: e.target.value })),
                      className: "w-full text-[11px] font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2304}}
                    )
                    , React.createElement('textarea', {
                      placeholder: "Subsection 5.2 Content"  ,
                      value: activeAgreementStudioPage.sec5Subsection2Content || "Both parties agree to protect and keep confidential any proprietary information, business data, or technical secrets disclosed during the project.",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec5Subsection2Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2311}}
                    )
                  )
                )

                /* Section 6 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2322}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2323}}, "6. Termination Clause"  )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2324}}
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.sec6Title || "6. Termination",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec6Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2325}}
                    )
                    , React.createElement('textarea', {
                      value: activeAgreementStudioPage.sec6Content || "Either party may terminate this Agreement with 7 days written notice. In the event of termination, the Client shall pay for all work completed up to the termination date. If the Company terminates without cause, it shall return any unearned advance payments.",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec6Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2331}}
                    )
                  )
                )

                /* Section 7 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2341}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2342}}, "7. Dispute Resolution"  )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2343}}
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.sec7Title || "7. Dispute Resolution",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec7Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2344}}
                    )
                    , React.createElement('textarea', {
                      value: activeAgreementStudioPage.sec7Content || "Any disputes arising out of this Agreement shall first be resolved through good-faith negotiations. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec7Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2350}}
                    )
                  )
                )

                /* Section 8 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2360}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2361}}, "8. Force Majeure"  )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2362}}
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.sec8Title || "8. Force Majeure",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec8Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2363}}
                    )
                    , React.createElement('textarea', {
                      value: activeAgreementStudioPage.sec8Content || "Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to natural disasters, government restrictions, or widespread internet outages.",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec8Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2369}}
                    )
                  )
                )

                /* Section 9 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2379}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2380}}, "9. Amendments Clause"  )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2381}}
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.sec9Title || "9. Amendments",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec9Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2382}}
                    )
                    , React.createElement('textarea', {
                      value: activeAgreementStudioPage.sec9Content || 'Any changes to the scope of work (Scope Modifications) defined in Section 1 must be documented in a written "Change Request" and may be subject to additional billing and timeline extensions.',
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec9Content: e.target.value })),
                      rows: 3,
                      className: "w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2388}}
                    )
                  )
                )

                /* Section 10 */
                , React.createElement('div', { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2398}}
                  , React.createElement('span', { className: "text-[10px] font-bold text-slate-700 uppercase block border-b pb-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2399}}, "10. Terms, Conditions & Exclusions"    )
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2400}}
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.sec10Title || "10. Terms and Conditions",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec10Title: e.target.value })),
                      className: "w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2401}}
                    )
                    , React.createElement('textarea', {
                      value: activeAgreementStudioPage.sec10BulletText || `Third-Party Fees: Costs for Play Store ($25), Apple Store ($99), and Cloud Hosting are not included in the budget.
Content Entry: Uploading extensive historical marketing data is excluded.
Standard Tech Stack: Development will follow standard modern frameworks suitable for mobile and web.`,
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, sec10BulletText: e.target.value })),
                      rows: 4,
                      className: "w-full text-xs font-mono text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2407}}
                    )
                  )
                )
              )
            )

            , activeAgreementSectionId === "branding" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2421}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2422}}, "Company Details & Branding"   )

                /* LOGO UPLOAD & CONFIG */
                , React.createElement('div', { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2425}}
                  , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2426}}
                    , React.createElement('span', { className: "font-bold text-gray-800 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2427}}, "Company Logo Image"  )
                    , React.createElement('button', {
                      type: "button",
                      onClick: () => _optionalChain([agreementLogoInputRef, 'access', _68 => _68.current, 'optionalAccess', _69 => _69.click, 'call', _70 => _70()]),
                      className: "px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2428}}

                      , React.createElement(Upload, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2433}} ), " Upload Logo"
                    )
                  )

                  , React.createElement('input', {
                    type: "text",
                    placeholder: "Paste image URL or click upload button..."      ,
                    value: activeAgreementStudioPage.companyLogoUrl || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyLogoUrl: e.target.value })),
                    className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs outline-none"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2437}}
                  )

                  , activeAgreementStudioPage.companyLogoUrl && (
                    React.createElement('div', { className: "space-y-3 pt-1.5 border-t border-gray-150"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2446}}
                      , React.createElement('div', { className: "flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2447}}
                        , React.createElement('img', { src: activeAgreementStudioPage.companyLogoUrl, alt: "Logo", className: "h-10 max-w-[140px] object-contain"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2448}} )
                        , React.createElement('span', { className: "text-[10px] font-mono text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2449}}, "Logo Active" )
                        , React.createElement('button', {
                          type: "button",
                          onClick: () => setActiveAgreementStudioPage((p) => ({ ...p, companyLogoUrl: "" })),
                          className: "text-red-500 hover:text-red-700 text-xs font-bold ml-auto cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2450}}
, "Remove"

                        )
                      )

                      , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2459}}
                        , React.createElement('div', { className: "flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2460}}
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2461}}, "Logo Height ("  , activeAgreementStudioPage.companyLogoSize || 38, "px)")
                          , React.createElement('input', {
                            type: "range",
                            min: "20",
                            max: "100",
                            value: activeAgreementStudioPage.companyLogoSize || 38,
                            onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyLogoSize: Number(e.target.value) })),
                            className: "w-24 cursor-pointer accent-blue-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2462}}
                          )
                        )

                        , React.createElement('div', { className: "flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2472}}
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2473}}, "Logo Opacity ("  , Math.round((_nullishCoalesce(activeAgreementStudioPage.companyLogoOpacity, () => ( 1))) * 100), "%)")
                          , React.createElement('input', {
                            type: "range",
                            min: "10",
                            max: "100",
                            step: "5",
                            value: (_nullishCoalesce(activeAgreementStudioPage.companyLogoOpacity, () => ( 1))) * 100,
                            onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyLogoOpacity: Number(e.target.value) / 100 })),
                            className: "w-24 cursor-pointer accent-blue-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2474}}
                          )
                        )

                        , React.createElement('div', { className: "flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2485}}
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2486}}, "Logo Rotation ("  , activeAgreementStudioPage.companyLogoRotation || 0, "°)")
                          , React.createElement('input', {
                            type: "range",
                            min: "-180",
                            max: "180",
                            step: "5",
                            value: activeAgreementStudioPage.companyLogoRotation || 0,
                            onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyLogoRotation: Number(e.target.value) })),
                            className: "w-24 cursor-pointer accent-blue-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2487}}
                          )
                        )
                      )
                    )
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2502}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2503}}, "Provider Company Name"  )
                  , React.createElement('input', {
                    type: "text",
                    value: activeAgreementStudioPage.billedByCompany || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, billedByCompany: e.target.value })),
                    className: "w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2504}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2512}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2513}}, "Provider Address" )
                  , React.createElement('textarea', {
                    value: activeAgreementStudioPage.companyAddress || "",
                    onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyAddress: e.target.value })),
                    rows: 3,
                    className: "w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2514}}
                  )
                )

                , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2522}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2523}}, "Primary Color Accent"  )
                  , React.createElement('div', { className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2524}}
                    , React.createElement('input', {
                      type: "color",
                      value: activeAgreementStudioPage.pdfPrimaryColor || "#0e2a4a",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, pdfPrimaryColor: e.target.value })),
                      className: "w-12 h-10 border border-gray-200 rounded-xl cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2525}}
                    )
                    , React.createElement('input', {
                      type: "text",
                      value: activeAgreementStudioPage.pdfPrimaryColor || "#0e2a4a",
                      onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, pdfPrimaryColor: e.target.value })),
                      className: "flex-1 text-xs font-mono font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2531}}
                    )
                  )
                )

                /* WATERMARK BACKGROUND CONFIG */
                , React.createElement('div', { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2541}}
                  , React.createElement('div', { className: "flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2542}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2543}}
                      , React.createElement('span', { className: "font-bold text-gray-900 text-xs block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2544}}, "Background Watermark" )
                      , React.createElement('span', { className: "text-[11px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2545}}, "Display background watermark on PDF"    )
                    )
                    , React.createElement('label', { className: "relative inline-flex items-center cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2547}}
                      , React.createElement('input', { 
                        type: "checkbox", 
                        checked: activeAgreementStudioPage.showWatermark !== false,
                        onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, showWatermark: e.target.checked })),
                        className: "sr-only peer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2548}}
                      )
                      , React.createElement('div', { className: "w-10 h-5.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2554}})
                    )
                  )

                  , activeAgreementStudioPage.showWatermark !== false && (
                    React.createElement('div', { className: "space-y-3 pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2559}}
                      , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2560}}
                        , React.createElement('span', { className: "font-bold text-gray-800 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2561}}, "Watermark Image" )
                        , React.createElement('button', {
                          type: "button",
                          onClick: () => _optionalChain([agreementWatermarkInputRef, 'access', _71 => _71.current, 'optionalAccess', _72 => _72.click, 'call', _73 => _73()]),
                          className: "px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2562}}

                          , React.createElement(Upload, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2567}} ), " Upload Watermark Image"
                        )
                      )

                      , React.createElement('input', {
                        type: "text",
                        placeholder: "Watermark image URL (optional)..."   ,
                        value: activeAgreementStudioPage.companyWatermarkUrl || "",
                        onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyWatermarkUrl: e.target.value })),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs outline-none animate-in fade-in"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2571}}
                      )

                      , activeAgreementStudioPage.companyWatermarkUrl && (
                        React.createElement('div', { className: "flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2580}}
                          , React.createElement('img', { src: activeAgreementStudioPage.companyWatermarkUrl, alt: "Watermark Preview" , className: "h-10 max-w-[140px] object-contain opacity-50"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2581}} )
                          , React.createElement('span', { className: "text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2582}}, "Image Active" )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => setActiveAgreementStudioPage((p) => ({ ...p, companyWatermarkUrl: "" })),
                            className: "text-red-500 hover:text-red-700 text-xs font-bold ml-auto cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2583}}
, "Remove"

                          )
                        )
                      )

                      , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2593}}
                        , React.createElement('label', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2594}}, "Watermark Text fallback"  )
                        , React.createElement('input', {
                          type: "text",
                          value: activeAgreementStudioPage.companyWatermarkText || "SPESHWAY SOLUTIONS",
                          onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyWatermarkText: e.target.value })),
                          className: "w-full text-xs font-bold text-gray-800 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2595}}
                        )
                      )

                      , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2603}}
                        , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2604}}
                          , React.createElement('label', { className: "text-[9px] font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2605}}, "Opacity (0.01 - 0.2)"   )
                          , React.createElement('input', {
                            type: "number",
                            step: "0.01",
                            min: "0",
                            max: "1",
                            value: _nullishCoalesce(activeAgreementStudioPage.companyWatermarkOpacity, () => ( 0.05)),
                            onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyWatermarkOpacity: Number(e.target.value) })),
                            className: "w-full p-2.5 text-xs font-bold text-center bg-white border border-gray-200 rounded-xl outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2606}}
                          )
                        )
                        , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2616}}
                          , React.createElement('label', { className: "text-[9px] font-bold text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2617}}, "Rotation (degrees)" )
                          , React.createElement('input', {
                            type: "number",
                            value: _nullishCoalesce(activeAgreementStudioPage.companyWatermarkRotation, () => ( -15)),
                            onChange: (e) => setActiveAgreementStudioPage((p) => ({ ...p, companyWatermarkRotation: Number(e.target.value) })),
                            className: "w-full p-2.5 text-xs font-bold text-center bg-white border border-gray-200 rounded-xl outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2618}}
                          )
                        )
                      )
                    )
                  )
                )
              )
            )

            , activeAgreementSectionId === "preview" && (
              React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2633}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2634}}, "Full Screen Print / PDF Mode"     )
                , React.createElement('p', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2635}}, "Launch standard print dialog or compile PDF documents."       )
                , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2636}}
                  , React.createElement('button', {
                    onClick: () => openPdfPrintPreview(generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, 1.0)),
                    className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2637}}

                    , React.createElement(Printer, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2641}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2642}}, "Print & Save PDF Document"    )
                  )
                  , React.createElement('button', {
                    onClick: () => handleDownloadAgreementPdf(activeAgreementStudioPage),
                    className: "w-full bg-[#0e387a] hover:bg-[#0a2959] text-white py-3 px-4 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2644}}

                    , React.createElement(Download, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2648}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2649}}, "Download Agreement PDF"  )
                  )
                )
              )
            )

          )

          /* RIGHT REAL-TIME LIVE PDF PREVIEW */
          , React.createElement('div', { className: "bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4 lg:col-span-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2658}}
            , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-3 pb-2 border-b border-gray-100"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2659}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2660}}
                , React.createElement(FileText, { className: "text-blue-700 w-4 h-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2661}} )
                , React.createElement('span', { className: "font-extrabold text-xs text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2662}}, "Live Service Agreement PDF Preview"    )
              )

              /* ZOOM CONTROLS */
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2666}}
                , React.createElement('div', { className: "flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2667}}
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setAgreementPreviewZoom(0.6),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      agreementPreviewZoom === 0.6 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "Fit to Box (60%)"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2668}}
, "Fit Box"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setAgreementPreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom Out (-5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2678}}

                    , React.createElement(ZoomOut, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2684}} )
                  )
                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2686}}
                    , Math.round(agreementPreviewZoom * 100), "%"
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setAgreementPreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2)))),
                    className: "p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Zoom In (+5%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2689}}

                    , React.createElement(ZoomIn, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2695}} )
                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setAgreementPreviewZoom(1.0),
                    className: `px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      agreementPreviewZoom === 1.0 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`,
                    title: "100% Actual Size"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2697}}
, "100%"

                  )
                  , React.createElement('button', {
                    type: "button",
                    onClick: () => setAgreementPreviewZoom(0.6),
                    className: "p-1 text-gray-400 hover:text-teal-600 hover:bg-white rounded-lg transition-all"     ,
                    title: "Reset to 60%"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2707}}

                    , React.createElement(RotateCcw, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2713}} )
                  )
                )
              )
            )

            , React.createElement('div', { className: "w-full aspect-[210/297] max-h-[82vh] min-h-[620px] border border-gray-200 rounded-2xl overflow-x-auto overflow-y-auto shadow-inner bg-slate-900"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2719}}
              , React.createElement('iframe', {
                srcDoc: generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, agreementPreviewZoom),
                className: "h-full min-w-[640px] border-0 bg-slate-900"   ,
                style: { width: "100%", overflowX: "auto" },
                title: "Live Service Agreement PDF Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2720}}
              )
            )
          )

        )

        /* BOTTOM SAVE & NAVIGATION BUTTONS */
        , React.createElement('div', { className: "flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-6"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2732}}
          , React.createElement('button', {
            onClick: () => {
              setActiveAgreementStudioPage(null);
              setActiveWorkspaceTab("agreements");
            },
            className: "w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2733}}

            , React.createElement(ArrowLeft, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2740}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2741}}, "Back to Agreements List"   )
          )

          , React.createElement('div', { className: "flex items-center gap-3 w-full sm:w-auto flex-wrap justify-end"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2744}}
            , React.createElement('button', {
              onClick: () => handleDownloadAgreementPdf(activeAgreementStudioPage),
              className: "flex-1 sm:flex-initial px-5 py-2.5 bg-[#0e387a] hover:bg-[#0a2959] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2745}}

              , React.createElement(Download, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2749}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2750}}, "Download PDF Agreement"  )
            )

            , React.createElement('button', {
              onClick: handleSaveAgreementStudioPageRecord,
              disabled: isSubmitting,
              className: "flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2753}}

              , React.createElement(Save, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2758}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2759}}, isSubmitting ? "Saving..." : "Save Agreement Record")
            )
          )
        )

      )
    );
  }

  // WORKSPACE MAIN VIEW (PROPOSALS, QUOTATIONS, INVOICES CARDS LIST)
  return (
    React.createElement('div', { className: "w-full min-h-screen bg-slate-50/70 p-4 md:p-8 flex flex-col gap-6 animate-in fade-in duration-300 font-sans"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2770}}

      /* TOP BREADCRUMB & BACK BUTTON */
      , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-3 text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2773}}
        , React.createElement('div', { className: "flex items-center gap-2 text-gray-500 font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2774}}
          , React.createElement('button', { 
            onClick: onBackToProjects,
            className: "hover:text-teal-600 transition-colors flex items-center gap-1 font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2775}}

            , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2779}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2780}}, "Our Projects" )
          )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2782}}, "/")
          , React.createElement('span', { className: "font-mono text-gray-700 font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2783}}, project.id)
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2784}}, "/")
          , React.createElement('span', { className: "text-teal-600 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2785}}, "Proposals Workspace" )
        )

        , React.createElement('button', {
          onClick: onBackToProjects,
          className: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2788}}

          , React.createElement(ArrowLeft, { size: 14, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2792}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2793}}, "Back to Projects Showcase"   )
        )
      )

      /* DARK HERO BANNER - Matching Image 2 */
      , React.createElement('div', { className: "w-full bg-[#06132D] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-slate-800/40"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2798}}
        , React.createElement('div', { className: "space-y-3 z-10 max-w-2xl"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2799}}
          /* BADGES */
          , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2801}}
            , React.createElement('span', { className: "text-[10px] font-mono bg-[#FF5349]/20 text-[#FF5349] border border-[#FF5349]/30 px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2802}}
              , project.id
            )
            , React.createElement('span', { className: "text-[10px] font-bold bg-[#FF5349]/20 text-[#FF5349] border border-[#FF5349]/30 px-2.5 py-0.5 rounded uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2805}}
              , project.category || "WEB APPLICATION"
            )
          )

          /* MAIN HERO TITLE */
          , React.createElement('h1', { className: "text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2811}}
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2812}}, project.name || project.title)
            , React.createElement('span', { className: "text-[#FF5349] font-light" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2813}}, "•")
            , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2814}}, "Proposals Workspace Page"  )
          )

          , React.createElement('p', { className: "text-xs text-slate-300 font-sans tracking-wide"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2817}}, "Manage proposals, view quotations, and edit dynamic invoices linked to created proposals."

          )
        )

        /* HERO TOP RIGHT ACTION BUTTON */
        , React.createElement('div', { className: "z-10 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2823}}
          , React.createElement('button', {
            onClick: handleOpenCreateModal,
            className: "bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-[#FF5349]/25 flex items-center gap-2 transition-all transform hover:scale-[1.02]"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2824}}

            , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2828}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2829}}, "+ Create New Proposal"   )
          )
        )
      )

      /* SIDE-BY-SIDE WORKSPACE NAVIGATION TABS - Matching Image 2 */
      , React.createElement('div', { className: "flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-fit"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2835}}
        , React.createElement('button', {
          onClick: () => setActiveWorkspaceTab("proposals"),
          className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "proposals"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2836}}

          , React.createElement(FileText, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2844}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2845}}, "Proposals")
          , React.createElement('span', { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "proposals" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2846}}
            , projectQuotations.length
          )
        )

        , React.createElement('button', {
          onClick: () => setActiveWorkspaceTab("quotations"),
          className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "quotations"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2853}}

          , React.createElement(Receipt, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2861}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2862}}, "Quotations")
          , React.createElement('span', { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "quotations" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2863}}
            , projectQuotations.length
          )
        )

        , React.createElement('button', {
          onClick: () => setActiveWorkspaceTab("invoices"),
          className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "invoices"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2870}}

          , React.createElement(CreditCard, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2878}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2879}}, "Invoices")
          , React.createElement('span', { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "invoices" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2880}}
            , displayInvoicesList.length
          )
        )

        , React.createElement('button', {
          onClick: () => setActiveWorkspaceTab("agreements"),
          className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "agreements"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2887}}

          , React.createElement(FileSignature, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2895}} )
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2896}}, "Agreements")
          , React.createElement('span', { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "agreements" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2897}}
            , displayAgreementsList.length
          )
        )
      )

      /* 1. PROPOSALS TAB VIEW */
      , activeWorkspaceTab === "proposals" && (
        React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2907}}
          , React.createElement('div', { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2908}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2909}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2910}}
                , React.createElement(FileText, { className: "text-[#FF5349] w-5 h-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2911}} )
                , React.createElement('h2', { className: "font-heading font-extrabold text-base text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2912}}, "Proposal Names List"  )
              )
              , React.createElement('p', { className: "text-xs text-slate-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2914}}, "Total proposals: "
                  , React.createElement('strong', { className: "text-slate-800", __self: this, __source: {fileName: _jsxFileName, lineNumber: 2915}}, projectQuotations.length), ". Click Quotations on any proposal card to open section details."
              )
            )

            , React.createElement('div', { className: "flex items-center gap-3 w-full md:w-auto flex-wrap"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2919}}
              , React.createElement('div', { className: "relative flex-1 md:w-64"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2920}}
                , React.createElement(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2921}} )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "Search proposal titles..."  ,
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5349]"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2922}}
                )
              )

              , React.createElement('button', {
                onClick: handleOpenCreateModal,
                className: "bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 shrink-0 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2931}}

                , React.createElement(Plus, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2935}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2936}}, "Create Proposal Page"  )
              )
            )
          )

          , searchFilteredQuotations.length === 0 ? (
            React.createElement('div', { className: "p-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3 my-2"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2942}}
              , React.createElement(Sparkles, { className: "w-10 h-10 text-[#FF5349]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2943}} )
              , React.createElement('h4', { className: "font-heading font-extrabold text-slate-800 text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2944}}, "No Proposals Found for this Project"     )
              , React.createElement('p', { className: "text-xs text-slate-500 max-w-sm leading-relaxed"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2945}}, "There are currently no proposal documents stored for "
                        , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2946}}, project.name || project.title), ". Click "  , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2946}}, "Create Proposal Page"  ), " above to add your first proposal record."
              )
              , React.createElement('button', {
                onClick: handleOpenCreateModal,
                className: "mt-2 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2948}}

                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2952}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2953}}, "Create Proposal Page"  )
              )
            )
          ) : (
            React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 2957}}
              , searchFilteredQuotations.map((q, idx) => {
                const qId = q.id || q.number || `QT-${project.id}`;
                const scopeCat = q.projectType || "Website Application";
                const createdDateStr = q.createdDate || q.createdAt || new Date().toISOString().split("T")[0];
                const isDragging = draggedCardIndex === idx;
                const isDragOver = dragOverCardIndex === idx;

                return (
                  React.createElement('div', { 
                    key: qId, 
                    draggable: true,
                    onDragStart: (e) => {
                      setDraggedCardIndex(idx);
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", String(idx));
                    },
                    onDragOver: (e) => {
                      e.preventDefault();
                      if (dragOverCardIndex !== idx) setDragOverCardIndex(idx);
                    },
                    onDrop: (e) => {
                      e.preventDefault();
                      if (draggedCardIndex !== null && draggedCardIndex !== idx) {
                        setLocalQuotations(prev => {
                          const copy = [...prev];
                          const [moved] = copy.splice(draggedCardIndex, 1);
                          copy.splice(idx, 0, moved);
                          return copy;
                        });
                        showToast("Card order updated!", "info");
                      }
                      setDraggedCardIndex(null);
                      setDragOverCardIndex(null);
                    },
                    onDragEnd: () => {
                      setDraggedCardIndex(null);
                      setDragOverCardIndex(null);
                    },
                    className: `p-6 rounded-2xl bg-white border shadow-sm flex flex-col justify-between gap-5 relative group transition-all cursor-grab active:cursor-grabbing ${
                      isDragging 
                        ? "opacity-40 scale-95 border-dashed border-[#FF5349] ring-2 ring-[#FF5349]/30" 
                        : isDragOver 
                        ? "border-[#FF5349] ring-2 ring-[#FF5349] scale-[1.01] bg-rose-50/30" 
                        : "border-slate-200 hover:shadow-md hover:border-slate-300"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2966}}

                    , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3004}}
                      , React.createElement('div', { className: "flex items-start gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3005}}
                        , React.createElement('div', { className: "p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing shrink-0"     , title: "Drag to reorder card"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3006}}
                          , React.createElement(GripVertical, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3007}} )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3009}}
                          , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3010}}
                            , React.createElement('span', { className: "text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3011}}
                              , qId
                            )
                          )

                          , React.createElement('h3', { className: "font-heading font-extrabold text-base text-slate-900 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3016}}
                            , q.title || `${project.name || project.title} Custom Proposal`
                          )
                          , React.createElement('span', { className: "text-[11px] text-slate-500 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3019}}, "Client: "
                             , q.clientName || project.clientName || "Internal / Showcase"
                          )
                        )
                      )

                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3025}}
                        , React.createElement('button', {
                          onClick: () => handleOpenEditModal(q),
                          className: "text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"          ,
                          title: "Edit Proposal Details"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3026}}

                          , React.createElement(Edit, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3031}} )
                          , React.createElement('span', { className: "text-[11px] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3032}}, "Edit")
                        )
                        , React.createElement('button', {
                          onClick: () => handleDeleteProposal(qId),
                          className: "text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"     ,
                          title: "Delete Proposal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3034}}

                          , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3039}} )
                        )
                      )
                    )

                    , React.createElement('div', { className: "p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3044}}
                      , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3045}}
                        , React.createElement('span', { className: "text-slate-500 text-[11px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3046}}, "Scope Category:" )
                        , React.createElement('span', { className: "font-bold text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3047}}, scopeCat)
                      )
                      , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3049}}
                        , React.createElement('span', { className: "text-slate-500 text-[11px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3050}}, "Created:")
                        , React.createElement('span', { className: "font-mono text-slate-600 text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3051}}, createdDateStr)
                      )
                    )

                    , React.createElement('button', {
                      onClick: () => _optionalChain([onOpen8Sections, 'optionalCall', _74 => _74(q)]),
                      className: "w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3055}}

                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3059}}, "Quotations")
                      , React.createElement('span', { className: "text-sm font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3060}}, ">")
                    )
                  )
                );
              })
            )
          )
        )
      )

      /* 2. QUOTATIONS TAB VIEW */
      , activeWorkspaceTab === "quotations" && (
        React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3072}}
          , React.createElement('div', { className: "flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3073}}
            , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3074}}
              , React.createElement(Receipt, { className: "text-[#FF5349] w-5 h-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3075}} )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3076}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-base text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3077}}, "Quotations List" )
                , React.createElement('p', { className: "text-xs text-slate-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3078}}, "Quotations generated directly from created proposals. Click to open 8-Section Studio."          )
              )
            )
            , React.createElement('span', { className: "text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3081}}
              , projectQuotations.length, " Quotations Total"
            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3086}}
            , projectQuotations.map((q) => {
              const qId = q.id || q.number || `QT-${project.id}`;
              const scopeCat = q.projectType || "Website Application";

              return (
                React.createElement('div', { key: qId, className: "p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3092}}
                  , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3093}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3094}}
                      , React.createElement('span', { className: "text-[10px] font-mono bg-red-50 text-[#FF5349] px-2 py-0.5 rounded font-extrabold border border-red-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3095}}
                        , qId
                      )
                      , React.createElement('h4', { className: "font-heading font-extrabold text-base text-slate-900 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3098}}
                        , q.title || `${project.name || project.title} Quotation`
                      )
                      , React.createElement('span', { className: "text-xs text-slate-500 mt-0.5 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3101}}, "Category: " , scopeCat)
                    )
                    , React.createElement('span', { className: "text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3103}}, "ACTIVE QUOTATION"

                    )
                  )

                  , React.createElement('button', {
                    onClick: () => _optionalChain([onOpen8Sections, 'optionalCall', _75 => _75(q)]),
                    className: "w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3108}}

                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3112}}, "Quotations")
                    , React.createElement('span', { className: "text-sm font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3113}}, ">")
                  )
                )
              );
            })
          )
        )
      )

      /* 3. INVOICES TAB VIEW */
      , activeWorkspaceTab === "invoices" && (
        React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3124}}
          , React.createElement('div', { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3125}}
            , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3126}}
              , React.createElement(CreditCard, { className: "text-[#FF5349] w-5 h-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3127}} )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3128}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-base text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3129}}, "Invoices List" )
                , React.createElement('p', { className: "text-xs text-slate-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3130}}, "Tax Invoices generated from created proposals. Click Invoices button to open full Tax Invoice Studio Page."               )
              )
            )
            , React.createElement('span', { className: "text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3133}}
              , displayInvoicesList.length, " Invoices Total"
            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3138}}
            , displayInvoicesList.map((inv) => {
              const invId = inv.id || inv.number || `SPW-INV-${project.id}`;
              const rateNum = Number(inv.rate || inv.amount || 170000);
              const taxNum = Number(inv.taxPct !== undefined ? inv.taxPct : 18);
              const totalDueNum = inv.totalDue || Math.round(rateNum * (1 + taxNum / 100));

              return (
                React.createElement('div', { key: invId, className: "p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3146}}

                  /* INVOICE CARD HEADER */
                  , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3149}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3150}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3151}}
                        , React.createElement('span', { className: "text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3152}}
                          , invId
                        )
                        , React.createElement('span', { className: "text-[9px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3155}}
                          , inv.status || "PAID"
                        )
                      )

                      , React.createElement('h4', { className: "font-heading font-extrabold text-base text-slate-900 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3160}}
                        , inv.productName || project.name || project.title, " Tax Invoice"
                      )
                      , React.createElement('span', { className: "text-xs text-slate-500 mt-0.5 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3163}}, "Billed To: "
                          , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3164}}, inv.clientName || project.clientName || "Hyper Mobility Services")
                      )
                    )

                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3168}}
                      , React.createElement('button', {
                        onClick: () => handleOpenInvoiceStudioPage(inv),
                        className: "text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"          ,
                        title: "Edit Invoice Details"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3169}}

                        , React.createElement(Edit, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3174}} )
                        , React.createElement('span', { className: "text-[11px] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3175}}, "Edit")
                      )
                    )
                  )

                  /* INVOICE SUMMARY MATRIX */
                  , React.createElement('div', { className: "p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-sans"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3181}}
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3182}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3183}}, "Subtotal Rate:" )
                      , React.createElement('span', { className: "font-mono text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3184}}, "₹", rateNum.toLocaleString('en-IN'))
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3186}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3187}}, "GST Tax ("  , taxNum, "%):")
                      , React.createElement('span', { className: "font-mono text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3188}}, "₹", Math.round(rateNum * (taxNum / 100)).toLocaleString('en-IN'))
                    )
                    , React.createElement('div', { className: "flex justify-between items-center pt-1.5 border-t border-slate-200"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3190}}
                      , React.createElement('span', { className: "font-bold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3191}}, "Total Due Amount:"  )
                      , React.createElement('span', { className: "font-extrabold text-[#06132D] text-sm font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3192}}, "₹", totalDueNum.toLocaleString('en-IN'))
                    )
                  )

                  /* MAIN BUTTON */
                  , React.createElement('button', {
                    onClick: () => handleOpenInvoiceStudioPage(inv),
                    className: "w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3197}}

                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3201}}, "Invoices")
                    , React.createElement('span', { className: "text-sm font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3202}}, ">")
                  )

                )
              );
            })
          )
        )
      )

      /* 4. AGREEMENTS TAB VIEW */
      , activeWorkspaceTab === "agreements" && (
        React.createElement('div', { className: "space-y-4 animate-in fade-in duration-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3214}}
          , React.createElement('div', { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3215}}
            , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3216}}
              , React.createElement(FileSignature, { className: "text-[#FF5349] w-5 h-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3217}} )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3218}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-base text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3219}}, "Agreements List" )
                , React.createElement('p', { className: "text-xs text-slate-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3220}}, "Service Agreements generated from created proposals. Click Agreements button to open full Service Agreement Studio Page."               )
              )
            )
            , React.createElement('span', { className: "text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3223}}
              , displayAgreementsList.length, " Agreements Total"
            )
          )

          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3228}}
            , displayAgreementsList.map((agr) => {
              const agrId = agr.id || agr.number || `SPW-AGR-${project.id}`;
              const budgetNum = Number(agr.budget || agr.rate || agr.amount || 80000);

              return (
                React.createElement('div', { key: agrId, className: "p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3234}}

                  /* AGREEMENT CARD HEADER */
                  , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3237}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3238}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3239}}
                        , React.createElement('span', { className: "text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3240}}
                          , agrId
                        )
                        , React.createElement('span', { className: "text-[9px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3243}}
                          , agr.status || "SIGNED"
                        )
                      )

                      , React.createElement('h4', { className: "font-heading font-extrabold text-base text-slate-900 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3248}}
                        , agr.projectName || project.name || project.title, " Service Agreement"
                      )
                      , React.createElement('span', { className: "text-xs text-slate-500 mt-0.5 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3251}}, "Prepared For: "
                          , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3252}}, agr.clientName || project.clientName || "AMY SPORTS ARENA")
                      )
                    )

                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3256}}
                      , React.createElement('button', {
                        onClick: () => handleOpenAgreementStudioPage(agr),
                        className: "text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"          ,
                        title: "Edit Agreement Details"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3257}}

                        , React.createElement(Edit, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3262}} )
                        , React.createElement('span', { className: "text-[11px] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3263}}, "Edit")
                      )
                    )
                  )

                  /* AGREEMENT SUMMARY MATRIX */
                  , React.createElement('div', { className: "p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-sans"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3269}}
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3270}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3271}}, "Project Duration:" )
                      , React.createElement('span', { className: "font-bold text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3272}}, agr.duration || "one (1) month")
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3274}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3275}}, "Milestone Stage 1 (40%):"   )
                      , React.createElement('span', { className: "font-mono text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3276}}, "₹", Math.round(budgetNum * 0.40).toLocaleString('en-IN'))
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3278}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3279}}, "Milestone Stage 2 (40%):"   )
                      , React.createElement('span', { className: "font-mono text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3280}}, "₹", Math.round(budgetNum * 0.40).toLocaleString('en-IN'))
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3282}}
                      , React.createElement('span', { className: "text-slate-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3283}}, "Milestone Stage 3 (20%):"   )
                      , React.createElement('span', { className: "font-mono text-slate-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3284}}, "₹", Math.round(budgetNum * 0.20).toLocaleString('en-IN'))
                    )
                    , React.createElement('div', { className: "flex justify-between items-center pt-1.5 border-t border-slate-200"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3286}}
                      , React.createElement('span', { className: "font-bold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3287}}, "Total Fixed Contract Price:"   )
                      , React.createElement('span', { className: "font-extrabold text-[#06132D] text-sm font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3288}}, "₹", budgetNum.toLocaleString('en-IN'))
                    )
                  )

                  /* MAIN BUTTON */
                  , React.createElement('button', {
                    onClick: () => handleOpenAgreementStudioPage(agr),
                    className: "w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3293}}

                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3297}}, "Agreements")
                    , React.createElement('span', { className: "text-sm font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3298}}, ">")
                  )

                )
              );
            })
          )
        )
      )

      /* CREATE & EDIT PROPOSAL MODAL */
      , showProposalModal && (
        React.createElement('div', { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3310}}
          , React.createElement('div', { className: "bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3311}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3312}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34] flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3313}}
                , React.createElement(FileText, { className: "w-4 h-4 text-[#FF5349]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3314}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3315}}, editingProposal ? "Edit Proposal Record" : "Create New Proposal Record")
              )
              , React.createElement('button', { 
                onClick: () => setShowProposalModal(false),
                className: "text-gray-400 hover:text-gray-700 text-lg font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3317}}
, "×"

              )
            )

            , React.createElement('form', { onSubmit: handleSaveProposalSubmit, className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3325}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3326}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-2 uppercase text-[10px] tracking-wider"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3327}}, "Select Target Proposal Scope Option *"

                )
                , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3330}}
                  , scopeOptions.map((opt) => {
                    const isSelected = formState.projectType === opt.name;
                    return (
                      React.createElement('button', {
                        key: opt.key,
                        type: "button",
                        onClick: () => handleSelectScopeOption(opt),
                        className: `p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "border-2 border-[#FF5349] bg-rose-50/70 shadow-sm ring-1 ring-rose-500/20"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 3334}}

                        , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3344}}
                          , React.createElement('div', { className: "flex items-center gap-1.5 font-bold text-xs text-[#071E34]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3345}}
                            , opt.icon
                            , React.createElement('span', { className: "line-clamp-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 3347}}, opt.name)
                          )
                          , isSelected && React.createElement(CheckCircle, { className: "w-3.5 h-3.5 text-[#FF5349] shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3349}} )
                        )
                        , React.createElement('span', { className: "text-[10px] text-gray-500 line-clamp-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3351}}, opt.sub)
                      )
                    );
                  })
                )
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3358}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3359}}, "Proposal Document Title"  )
                , React.createElement('input', { 
                  type: "text",
                  required: true,
                  value: formState.title,
                  onChange: e => setFormState(prev => ({ ...prev, title: e.target.value })),
                  placeholder: `e.g. ${project.name || project.title} Custom Proposal`,
                  className: "w-full p-2.5 border border-gray-300 rounded-xl font-sans text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3360}}
                )
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3370}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3371}}, "Selected Scope Category"  )
                , React.createElement('input', {
                  type: "text",
                  readOnly: true,
                  value: formState.projectType,
                  className: "w-full p-2.5 border border-gray-200 rounded-xl font-sans text-xs font-bold text-blue-950 bg-teal-50/60"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3372}}
                )
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3380}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3381}}, "Overview Narrative / Notes"   )
                , React.createElement('textarea', { 
                  rows: 3,
                  value: formState.overviewNarrative,
                  onChange: e => setFormState(prev => ({ ...prev, overviewNarrative: e.target.value })),
                  placeholder: "Executive overview details..."  ,
                  className: "w-full p-2.5 border border-gray-300 rounded-xl font-sans text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3382}}
                )
              )

              , React.createElement('div', { className: "pt-2 flex justify-end gap-2 border-t border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3391}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowProposalModal(false),
                  className: "px-4 py-2.5 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3392}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "px-5 py-2.5 rounded-xl text-white bg-[#4F46E5] hover:bg-[#4338CA] font-extrabold shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 3399}}

                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3404}}, isSubmitting ? "Saving..." : editingProposal ? "Update Proposal Record" : "Save Proposal Record")
                )
              )
            )
          )
        )
      )

    )
  );
}
