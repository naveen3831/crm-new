"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Edit, Search, ArrowLeft, FileText, Sparkles, CheckCircle, Smartphone, Globe, Layers, Cpu, Megaphone, Receipt, CreditCard, Eye, Printer, Download, Save, Building2, Upload, Palette, Image as ImageIcon, Type, ZoomIn, ZoomOut, RotateCcw, FileSignature, GripVertical } from "lucide-react";
import { triggerDirectPdfDownload as defaultPdfDownload, saveGlobalCompanyDetails, getGlobalCompanyDetails, generateSpeshwayTaxInvoicePdfHtml, openPdfPrintPreview, generateSpeshwayAgreementPdfHtml } from "../../utils/pdfGenerator";
import { showToast } from "../../utils/toast";

interface Proposal {
  id?: string;
  number?: string;
  projectId?: string;
  projectName?: string;
  projectType?: string;
  title: string;
  clientName: string;
  budget?: number;
  planAPrice?: number;
  planBPrice?: number;
  createdDate?: string;
  createdAt?: string;
  status?: string;
  category?: string;
  overviewNarrative?: string;
}



// Convert numbers to words (Indian Rupee Format)
const numberToWords = (amount: number): string => {
  if (!amount || isNaN(amount)) return "Indian Rupees Zero Only";
  const num = Math.round(amount);
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : " ");
    if (n < 1000) return a[Math.floor(n / 100)] + "Hundred " + (n % 100 !== 0 ? "and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 !== 0 ? inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 !== 0 ? inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 !== 0 ? inWords(n % 10000000) : "");
  };

  return `Indian Rupees ${inWords(num).trim()} Only`;
};

const getInitialWorkspaceTab = (): "proposals" | "quotations" | "invoices" | "agreements" => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get("subtab");
      if (sub === "invoices" || sub === "quotations" || sub === "proposals" || sub === "agreements") return sub;
      const stored = localStorage.getItem("crm_active_workspace_subtab");
      if (stored === "invoices" || stored === "quotations" || stored === "proposals" || stored === "agreements") return stored;
    } catch {}
  }
  return "proposals";
};

interface ProjectProposalsWorkspaceProps {
  project: any;
  quotations: any[];
  setQuotations: React.Dispatch<React.SetStateAction<any[]>>;
  invoices?: any[];
  agreements?: any[];
  initialSubtab?: "proposals" | "quotations" | "invoices" | "agreements";
  autoOpenAgreement?: boolean;
  onBackToProjects: () => void;
  onOpen8Sections?: (quote: any) => void;
  API_URL: string;
  loadDatabase?: () => void;
  triggerDirectPdfDownload?: (pdfHtml: string, filename: string) => void;
  onWorkspaceSubtabChange?: (tab: string) => void;
  onInvoiceStudioChange?: (isOpen: boolean) => void;
}

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
}: ProjectProposalsWorkspaceProps) {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"proposals" | "quotations" | "invoices" | "agreements">(
    initialSubtab || getInitialWorkspaceTab()
  );
  const [invoicePreviewZoom, setInvoicePreviewZoom] = useState<number>(0.6);

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
      } catch {}
    }
  }, [activeWorkspaceTab]);

  useEffect(() => {
    onWorkspaceSubtabChange?.(activeWorkspaceTab);
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
  const [editingProposal, setEditingProposal] = useState<any | null>(null);

  // Full-Screen Invoice Studio Page State (With Left Sidebar Section Switcher & Right Live PDF Preview)
  const [activeInvoiceStudioPage, setActiveInvoiceStudioPage] = useState<any | null>(null);
  const [activeInvoiceSectionId, setActiveInvoiceSectionId] = useState<string>("header");
  const [showInvoicePdfPreviewModal, setShowInvoicePdfPreviewModal] = useState(false);
  const [localInvoices, setLocalInvoices] = useState<any[]>(invoices);

  // Full-Screen Agreement Studio Page State
  const [activeAgreementStudioPage, setActiveAgreementStudioPage] = useState<any | null>(null);
  const [activeAgreementSectionId, setActiveAgreementSectionId] = useState<string>("header");
  const [showAgreementPdfPreviewModal, setShowAgreementPdfPreviewModal] = useState(false);
  const [localAgreements, setLocalAgreements] = useState<any[]>(agreements);
  const [agreementPreviewZoom, setAgreementPreviewZoom] = useState<number>(0.6);

  useEffect(() => {
    onInvoiceStudioChange?.(Boolean(activeInvoiceStudioPage || activeAgreementStudioPage));
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
      const qId = `QT-${project?.id || '001'}`;
      const agrId = `SPW-AGR-${qId.replace(/[^A-Z0-9]/gi, '')}`;
      const existing = (localAgreements || []).find((a: any) => a.id === agrId || a.number === agrId || a.projectId === project?.id);
      const targetAgr = existing || (displayAgreementsList && displayAgreementsList[0]) || {
        id: agrId,
        number: agrId,
        proposalId: qId,
        projectId: project?.id,
        projectName: project?.name || project?.title || "Software Project",
        clientName: project?.clientName || "Client Organization",
        clientAddress: "Hyderabad, Telangana",
        duration: "one (1) month",
        rate: project?.budget || 80000,
        amount: project?.budget || 80000,
        budget: project?.budget || 80000,
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
  const [localQuotations, setLocalQuotations] = useState<any[]>(quotations || []);

  // Stateful Drag-and-Drop Card State
  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState<number | null>(null);

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
          setQuotations?.(res.data);
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
  const invoiceLogoInputRef = useRef<HTMLInputElement>(null);
  const invoiceWatermarkInputRef = useRef<HTMLInputElement>(null);

  const handleInvoiceLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    showToast("Uploading logo to AWS S3...", "info");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target?.result as string;
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
          setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyLogoUrl: finalUrl }));
          showToast(data.url && data.url.includes("amazonaws.com") ? "Logo uploaded to AWS S3 bucket!" : "Invoice & Global company logo uploaded successfully!", "success");
        } catch (err) {
          saveGlobalCompanyDetails({ companyLogoUrl: base64Url });
          setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyLogoUrl: base64Url }));
          showToast("Invoice company logo uploaded successfully!", "success");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInvoiceWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setActiveInvoiceStudioPage((prev: any) => ({
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
  const agreementLogoInputRef = useRef<HTMLInputElement>(null);
  const agreementWatermarkInputRef = useRef<HTMLInputElement>(null);

  const handleAgreementLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    showToast("Uploading logo to AWS S3...", "info");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target?.result as string;
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
          setActiveAgreementStudioPage((prev: any) => ({ ...prev, companyLogoUrl: finalUrl }));
          showToast(data.url && data.url.includes("amazonaws.com") ? "Logo uploaded to AWS S3 bucket!" : "Agreement & Global company logo uploaded successfully!", "success");
        } catch (err) {
          saveGlobalCompanyDetails({ companyLogoUrl: base64Url });
          setActiveAgreementStudioPage((prev: any) => ({ ...prev, companyLogoUrl: base64Url }));
          showToast("Agreement company logo uploaded successfully!", "success");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAgreementWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        saveGlobalCompanyDetails({ companyWatermarkUrl: base64Url });
        setActiveAgreementStudioPage((prev: any) => ({
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
      icon: <Globe className="w-4 h-4 text-rose-500" />
    },
    {
      key: "mobile",
      name: "Mobile Application",
      sub: "iOS & Android Native Apps",
      icon: <Smartphone className="w-4 h-4 text-purple-500" />
    },
    {
      key: "both",
      name: "Web & Mobile Application",
      sub: "Full Web + Mobile Package",
      icon: <Layers className="w-4 h-4 text-amber-500" />
    },
    {
      key: "marketing",
      name: "Digital Marketing Campaign",
      sub: "SEO, SMM, PPC & Content",
      icon: <Megaphone className="w-4 h-4 text-pink-500" />
    },
    {
      key: "others",
      name: "Custom / ERP / AI Suite",
      sub: "ERP, AI & Microservices",
      icon: <Cpu className="w-4 h-4 text-emerald-500" />
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
      companyWatermarkOpacity: globalBranding.companyWatermarkOpacity ?? 0.25,
      companyWatermarkContrast: globalBranding.companyWatermarkContrast ?? 150,
      companyWatermarkGrayscale: globalBranding.companyWatermarkGrayscale ?? false,
      companyWatermarkRotation: 0,
      companyWatermarkSize: globalBranding.companyWatermarkSize ?? 50,
      companyWatermarkImgSize: globalBranding.companyWatermarkImgSize ?? 290
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
      companyWatermarkOpacity: globalBranding.companyWatermarkOpacity ?? 0.25,
      companyWatermarkContrast: globalBranding.companyWatermarkContrast ?? 150,
      companyWatermarkGrayscale: globalBranding.companyWatermarkGrayscale ?? false,
      companyWatermarkRotation: 0,
      companyWatermarkSize: globalBranding.companyWatermarkSize ?? 50,
      companyWatermarkImgSize: globalBranding.companyWatermarkImgSize ?? 290
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
  const handleSelectScopeOption = (opt: typeof scopeOptions[0]) => {
    const projName = project.name || project.title || "Project";
    setFormState(prev => ({
      ...prev,
      projectType: opt.name,
      title: `${projName} - ${opt.name} Quotation`,
      overviewNarrative: `The ${projName} ${opt.name} is engineered for high performance, maximum scalability, and modern user experience.`
    }));
  };

  // Open modal for Edit Proposal (CRUD Update)
  const handleOpenEditModal = (proposal: any) => {
    setEditingProposal(proposal);
    setFormState({
      title: proposal.title || `${project.name || project.title} Proposal`,
      projectType: proposal.projectType || project.category || "Website Application",
      overviewNarrative: proposal.overviewNarrative || ""
    });
    setShowProposalModal(true);
  };

  // Submit Handler for Create & Update Proposal (CRUD)
  const handleSaveProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const projName = project.name || project.title || "Project";
    const clientName = project.clientName || "Internal Enterprise";
    const qId = editingProposal ? (editingProposal.id || editingProposal.number) : `QT-${project.id}-${Math.floor(1000 + Math.random() * 9000)}`;

    const currentGlobal = getGlobalCompanyDetails();

    const payload: any = {
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
      pdfPrimaryColor: editingProposal?.pdfPrimaryColor || currentGlobal.pdfPrimaryColor || "#5D3ADF",
      pdfSecondaryColor: editingProposal?.pdfSecondaryColor || currentGlobal.pdfSecondaryColor || "#B8F7A1",
      companyLogoUrl: editingProposal?.companyLogoUrl || currentGlobal.companyLogoUrl || "/logo.png",
      companyWatermarkUrl: editingProposal?.companyWatermarkUrl || currentGlobal.companyWatermarkUrl || "/watermark.png",
      showWatermark: editingProposal?.showWatermark !== undefined ? editingProposal.showWatermark : (currentGlobal.showWatermark !== undefined ? currentGlobal.showWatermark : true),
      companyWatermarkText: editingProposal?.companyWatermarkText || currentGlobal.companyWatermarkText || "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: editingProposal?.companyWatermarkOpacity !== undefined ? editingProposal.companyWatermarkOpacity : (currentGlobal.companyWatermarkOpacity ?? 0.25),
      companyWatermarkContrast: editingProposal?.companyWatermarkContrast !== undefined ? editingProposal.companyWatermarkContrast : (currentGlobal.companyWatermarkContrast ?? 150),
      companyWatermarkGrayscale: editingProposal?.companyWatermarkGrayscale !== undefined ? editingProposal.companyWatermarkGrayscale : (currentGlobal.companyWatermarkGrayscale ?? false),
      companyWatermarkRotation: 0,
      companyWatermarkSize: editingProposal?.companyWatermarkSize !== undefined ? editingProposal.companyWatermarkSize : (currentGlobal.companyWatermarkSize ?? 50),
      companyWatermarkImgSize: editingProposal?.companyWatermarkImgSize !== undefined ? editingProposal.companyWatermarkImgSize : (currentGlobal.companyWatermarkImgSize ?? 290),
      planAName: `PLAN A — ${formState.projectType} Core`,
      planAPrice: editingProposal?.planAPrice || 50000,
      planBName: `PLAN B — ${formState.projectType} Premium`,
      planBPrice: editingProposal?.planBPrice || 65000,
      status: "APPROVED",
      createdDate: editingProposal?.createdDate || new Date().toISOString().split("T")[0],
      documentRef: editingProposal?.documentRef || `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/2026`,
      termsAndConditions: editingProposal?.termsAndConditions || "Estimation is valid for 30 days from date of issue.\nIncludes 30 days complimentary post-launch support.",
      paymentTerms: editingProposal?.paymentTerms || "40% advance on project kick-off\n30% on completion of core module\n30% on final release & launch",
      overviewNarrative: formState.overviewNarrative
    };

    // 1. INSTANT OPTIMISTIC UI UPDATE (0ms speed)
    if (editingProposal) {
      setLocalQuotations(prev => prev.map(q => (q.id === qId || q.number === qId) ? payload : q));
      setQuotations?.(prev => prev.map(q => (q.id === qId || q.number === qId) ? payload : q));
      showToast("Proposal record updated successfully!", "success");
    } else {
      setLocalQuotations(prev => [payload, ...prev]);
      setQuotations?.(prev => [payload, ...prev]);
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
          setQuotations?.(prev => prev.map(q => (q.id === qId || q.number === qId) ? res.data : q));
        }
      }).catch(err => {
        console.error("Background DB save error:", err);
      });
    } catch (e) {
      console.error("Async save exception:", e);
    }
  };

  // DELETE Proposal (CRUD Delete)
  const handleDeleteProposal = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this proposal record from database?")) return;
    // 1. INSTANT OPTIMISTIC UI REMOVAL (0ms speed)
    setLocalQuotations(prev => prev.filter(q => q.id !== quoteId && q.number !== quoteId));
    setQuotations?.(prev => prev.filter(q => q.id !== quoteId && q.number !== quoteId));
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
  const handleOpenInvoiceStudioPage = (invRecord: any) => {
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

    const payload: any = {
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
      loadDatabase?.();
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

  const handleDownloadInvoicePdf = (inv: any) => {
    if (!inv) return;
    showToast("⚡ Preparing Tax Invoice PDF file for download...", "info");
    const invId = inv.id || inv.number || "SPW-INV-001";
    const compName = (inv.billedByCompany || inv.companyName || "Speshway_Solutions").replace(/[^a-zA-Z0-9]/g, "_");
    const clientName = (inv.clientName || inv.billedToClient || project?.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const projTitle = (inv.productName || inv.billedToProduct || project?.name || project?.title || "Project").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${compName}_${clientName}_${projTitle}_${invId}_Tax_Invoice.pdf`;
    const pdfHtml = generateSpeshwayTaxInvoicePdfHtml(inv, project, 1.0);

    const downloader = triggerDirectPdfDownload || defaultPdfDownload;
    downloader(pdfHtml, fileName);
  };

  const handleOpenAgreementStudioPage = (agrRecord: any) => {
    setActiveAgreementStudioPage(JSON.parse(JSON.stringify(agrRecord)));
    setActiveAgreementSectionId("header");
  };

  const handleSaveAgreementStudioPageRecord = async () => {
    if (!activeAgreementStudioPage) return;
    setIsSubmitting(true);

    const agrId = activeAgreementStudioPage.id || activeAgreementStudioPage.number;

    const payload: any = {
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
      loadDatabase?.();
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

  const handleDownloadAgreementPdf = (agr: any) => {
    if (!agr) return;
    showToast("⚡ Preparing Service Agreement PDF file for download...", "info");
    const agrId = agr.id || agr.number || "SPW-AGR-001";
    const compName = (agr.billedByCompany || agr.companyName || "Speshway_Solutions").replace(/[^a-zA-Z0-9]/g, "_");
    const clientName = (agr.clientName || agr.billedToClient || project?.clientName || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const projTitle = (agr.projectName || project?.name || project?.title || "Project").replace(/[^a-zA-Z0-9]/g, "_");
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
      <div className="w-full min-h-screen bg-slate-50/70 p-4 md:p-5 flex flex-col gap-5 animate-in fade-in duration-300 font-sans">
        
        {/* HIDDEN LOGO AND WATERMARK FILE INPUTS */}
        <input 
          type="file" 
          ref={invoiceLogoInputRef} 
          accept="image/*" 
          onChange={handleInvoiceLogoUpload} 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={invoiceWatermarkInputRef} 
          accept="image/*" 
          onChange={handleInvoiceWatermarkUpload} 
          className="hidden" 
        />

        {/* TOP BREADCRUMB & BACK BUTTON */}
        <div className="flex justify-between items-center flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <button 
              onClick={() => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              }}
              className="hover:text-rose-600 transition-colors flex items-center gap-1 font-bold"
            >
              <ArrowLeft size={14} />
              <span>Proposals Workspace</span>
            </button>
            <span>/</span>
            <span className="font-mono text-gray-700 font-bold">{invId}</span>
            <span>/</span>
            <span className="text-[#FF5349] font-bold">Tax Invoice Studio Page</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openPdfPrintPreview(generateSpeshwayTaxInvoicePdfHtml(activeInvoiceStudioPage, project, 1.0))}
              className="bg-[#FF5349] hover:bg-[#F05454] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer border-0"
            >
              <Printer size={14} /> Print / Save PDF
            </button>

            <button
              onClick={() => handleDownloadInvoicePdf(activeInvoiceStudioPage)}
              className="bg-[#0e387a] hover:bg-[#0a2959] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={14} /> Download PDF
            </button>

            <button
              onClick={handleSaveInvoiceStudioPageRecord}
              disabled={isSubmitting}
              className="bg-[#FF5349] hover:bg-[#F05454] text-white px-5 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all border-0"
            >
              <Save size={14} /> {isSubmitting ? "Saving..." : "Save Invoice Page"}
            </button>

            <button
              onClick={() => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft size={14} className="text-gray-500" />
              <span>Back to Workspace</span>
            </button>
          </div>
        </div>

        {/* DARK HERO BANNER FOR INVOICE PAGE */}
        <div className="w-full bg-gradient-to-r from-[#0e2a4a] via-[#10345e] to-[#0c1f38] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-rose-950/40">
          <div className="space-y-3 z-10 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono bg-blue-950/80 text-rose-300 border border-blue-800/50 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {invId}
              </span>
              <span className="text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-800/50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {activeInvoiceStudioPage.status || "PAID"}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{activeInvoiceStudioPage.productName || project.name} Tax Invoice Studio</span>
            </h1>

            <p className="text-xs text-gray-300 font-sans tracking-wide">
              Official Tax Invoice Studio for Billed Client: <strong>{activeInvoiceStudioPage.clientName || project.clientName}</strong>. Edit details & branding on middle, see live PDF on right.
            </p>
          </div>

          <div className="z-10 shrink-0 flex items-center gap-3">
            <button
              onClick={() => handleDownloadInvoicePdf(activeInvoiceStudioPage)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-rose-700/30 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Download size={16} />
              <span>Download PDF Invoice</span>
            </button>
          </div>
        </div>

        {/* 3-COLUMN STUDIO LAYOUT: LEFT SIDEBAR + MIDDLE EDIT FORM + RIGHT REAL-TIME LIVE PDF PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_360px_minmax(560px,1fr)] gap-4 items-start">
          
          {/* LEFT SIDEBAR SECTION NAVIGATION (lg:col-span-3) */}
          <div className="bg-white p-3.5 rounded-3xl border border-gray-200 shadow-sm space-y-2.5 sticky top-4">
            {/* BACK TO PROPOSALS PAGE BUTTON ON TOP LEFT SIDEBAR */}
            <button
              type="button"
              onClick={() => {
                setActiveInvoiceStudioPage(null);
                setActiveWorkspaceTab("proposals");
              }}
              className="w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all mb-1"
            >
              <ArrowLeft size={14} className="text-rose-600" />
              <span>&lt; Back to Proposals Page</span>
            </button>

            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-3 pt-1 pb-1">
              Invoice Studio Sections
            </span>

            {[
              { id: "header", label: "1. Header & Billing Information", sub: "Ref No, Dates & Billed Info", icon: <Building2 size={16} /> },
              { id: "items", label: "2. Item Description, Rate & GST", sub: "Items, Subtotal & GST Tax", icon: <CreditCard size={16} /> },
              { id: "bank", label: "3. Bank Details & Payment Status", sub: "Bank Account & Status", icon: <Globe size={16} /> },
              { id: "branding", label: "4. Company Details & Branding", sub: "Fonts, Colors, Logo & Watermark", icon: <Palette size={16} /> },
              { id: "preview", label: "5. Full Screen PDF View", sub: "Expand & Download PDF", icon: <Eye size={16} /> }
            ].map((section) => {
              const isSelected = activeInvoiceSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveInvoiceSectionId(section.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 shadow-2xs ${
                    isSelected
                      ? "border-[#FF5349] bg-blue-600 text-white shadow-md ring-2 ring-rose-500/20"
                      : "border-gray-150 bg-white text-gray-800 hover:border-blue-300 hover:bg-rose-50/70"
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                    isSelected ? "bg-white/20 text-white" : "bg-rose-50 text-rose-700"
                  }`}>
                    {section.icon}
                  </div>
                  <div>
                    <h4 className={`font-extrabold text-xs line-clamp-1 ${isSelected ? "text-white" : "text-gray-800"}`}>
                      {section.label}
                    </h4>
                    <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? "text-rose-100" : "text-gray-400"}`}>
                      {section.sub}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={handleSaveInvoiceStudioPageRecord}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <Save size={14} />
                <span>{isSubmitting ? "Saving..." : "Save Invoice Record"}</span>
              </button>
            </div>
          </div>

          {/* MIDDLE EDIT FORM CONTENT (lg:col-span-4) */}
          <div className="min-w-0">
            
            {/* SECTION 1: HEADER & BILLING INFORMATION */}
            {activeInvoiceSectionId === "header" && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-gray-150 pb-3">
                  <h3 className="font-heading font-extrabold text-base text-[#071E34]">1. Header & Billing Information</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Configure reference numbers & billing details.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Invoice Reference Number</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.number || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, number: e.target.value, id: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-xs text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Invoice Issue Date</label>
                    <input 
                      type="date"
                      value={activeInvoiceStudioPage.date || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, date: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Billed By Company Title</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.billedByCompany !== undefined ? activeInvoiceStudioPage.billedByCompany : "Speshway Solutions Private Limited"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, billedByCompany: e.target.value, companyName: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Billed By Subtitle / Tagline</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.billedBySub !== undefined ? activeInvoiceStudioPage.billedBySub : "Software Development Company"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, billedBySub: e.target.value, companyTagline: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Billed By Address & Office Location</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.billedByAddress !== undefined ? activeInvoiceStudioPage.billedByAddress : (activeInvoiceStudioPage.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081")}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, billedByAddress: e.target.value, companyAddress: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Billed By Email & Phone</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.billedByContact !== undefined ? activeInvoiceStudioPage.billedByContact : "info@speshway.com | +91 91000 06020"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, billedByContact: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Billed To Client Company Name</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.clientName || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, clientName: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Product / Project Title</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.productName || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, productName: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: ITEM DESCRIPTION, RATE & GST TAX */}
            {activeInvoiceSectionId === "items" && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-gray-150 pb-3">
                  <h3 className="font-heading font-extrabold text-base text-[#071E34]">2. Item Description, Rate & GST Tax</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Specify deliverables, rate, and GST tax percentage.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Item Description Header</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.description || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Detailed Scope Sub-Description</label>
                    <textarea 
                      rows={3}
                      value={activeInvoiceStudioPage.subdesc || ""}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, subdesc: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Subtotal Rate (₹ INR)</label>
                    <input 
                      type="number"
                      value={activeInvoiceStudioPage.rate !== undefined && activeInvoiceStudioPage.rate !== null ? activeInvoiceStudioPage.rate : 50000}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, rate: e.target.value === "" ? "" : Number(e.target.value) }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-xs text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">GST Tax Percentage (%)</label>
                    <input 
                      type="number"
                      value={activeInvoiceStudioPage.taxPct !== undefined ? activeInvoiceStudioPage.taxPct : 18}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, taxPct: Number(e.target.value) }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Calculated Total Due (Auto)</label>
                    <input 
                      type="text"
                      readOnly
                      value={`₹ ${totalDueNum.toLocaleString('en-IN')}`}
                      className="w-full p-2.5 border border-teal-200 bg-teal-50 text-blue-900 font-mono font-extrabold text-sm rounded-xl"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block mb-0.5">Amount in Words</span>
                    <span className="text-xs font-semibold text-slate-800">{numberToWords(totalDueNum)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: BANK DETAILS & PAYMENT STATUS */}
            {activeInvoiceSectionId === "bank" && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-gray-150 pb-3">
                  <h3 className="font-heading font-extrabold text-base text-[#071E34]">3. Bank Details & Payment Status</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Configure bank account details & payment badge.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Bank Account Name</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.accountName || "SPESHWAY SOLUTIONS PRIVATE LIMITED"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, accountName: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Bank Account Number</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.accountNumber || "018326900000850"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, accountNumber: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Branch Name</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.branch || "HITECH CITY"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, branch: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">IFSC Code</label>
                    <input 
                      type="text"
                      value={activeInvoiceStudioPage.ifscCode || "YESB0000183"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, ifscCode: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-800 block mb-1">Payment Status Badge</label>
                    <select
                      value={activeInvoiceStudioPage.status || "PAID"}
                      onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, status: e.target.value }))}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"
                    >
                      <option value="PAID">PAID</option>
                      <option value="PARTIAL">PARTIAL</option>
                      <option value="UNPAID">UNPAID</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: COMPANY DETAILS & INVOICE BRANDING (NEW SECTION!) */}
            {activeInvoiceSectionId === "branding" && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-gray-150 pb-3">
                  <h3 className="font-heading font-extrabold text-base text-[#071E34] flex items-center gap-2">
                    <Palette className="w-4 h-4 text-teal-600" />
                    <span>4. Company Details & Invoice Branding</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Customize company contact details, fonts, colors, company logo, and watermark background image.</p>
                </div>

                <div className="space-y-5 text-xs">
                  
                  {/* COMPANY CONTACT INFORMATION */}
                  <div className="space-y-3">
                    <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block">Company & Contact Details</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Official Contact Email</label>
                        <input 
                          type="email"
                          value={activeInvoiceStudioPage.companyEmail || "info@speshway.com"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyEmail: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Official Phone / WhatsApp</label>
                        <input 
                          type="text"
                          value={activeInvoiceStudioPage.companyPhone || "+91 91000 06020"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyPhone: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Official Website URL</label>
                        <input 
                          type="text"
                          value={activeInvoiceStudioPage.companyWebsite || "www.speshway.com"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWebsite: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">TAX ID / GSTIN Identification</label>
                        <input 
                          type="text"
                          value={activeInvoiceStudioPage.companyGstin || "36AAAAA0000A1Z5"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyGstin: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-gray-800 block mb-1">Registered Address & Footer Location</label>
                      <textarea 
                        rows={2}
                        value={activeInvoiceStudioPage.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, Panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032"}
                        onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyAddress: e.target.value }))}
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white shadow-2xs resize-none"
                      />
                    </div>
                  </div>

                  {/* TYPOGRAPHY & GOOGLE FONTS */}
                  <div className="space-y-3 pt-3 border-t border-gray-150">
                    <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-teal-600" />
                      <span>PDF Typography & Google Fonts Config</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">PDF Body Font (Google Fonts)</label>
                        <select
                          value={activeInvoiceStudioPage.pdfBodyFont || "Segoe UI"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfBodyFont: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"
                        >
                          <option value="Segoe UI">Segoe UI (Default Clean)</option>
                          <option value="Poppins">Poppins (Modern Clean Sans)</option>
                          <option value="Inter">Inter (Sleek UI Sans)</option>
                          <option value="Roboto">Roboto (Google Standard)</option>
                          <option value="Montserrat">Montserrat (Bold Modern)</option>
                          <option value="Open Sans">Open Sans (Neutral Reading)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Company & Headings Font</label>
                        <select
                          value={activeInvoiceStudioPage.pdfHeadingFont || "Segoe UI"}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfHeadingFont: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shadow-2xs"
                        >
                          <option value="Segoe UI">Segoe UI (Default Clean)</option>
                          <option value="Outfit">Outfit (Geometric Modern)</option>
                          <option value="Times New Roman">Times New Roman (Classic Serif)</option>
                          <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
                          <option value="Cinzel">Cinzel (Corporate Premium)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* COLOR THEME CONTROLS */}
                  <div className="space-y-3 pt-3 border-t border-gray-150">
                    <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-teal-600" />
                      <span>PDF Banner & Table Accent Colors</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Header Bar Primary Color (Hex)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color"
                            value={activeInvoiceStudioPage.pdfPrimaryColor || "#5D3ADF"}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfPrimaryColor: e.target.value }))}
                            className="w-10 h-10 rounded-xl border border-gray-300 cursor-pointer p-1"
                          />
                          <input 
                            type="text"
                            value={activeInvoiceStudioPage.pdfPrimaryColor || "#5D3ADF"}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfPrimaryColor: e.target.value }))}
                            className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Secondary Accent Color (Hex)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color"
                            value={activeInvoiceStudioPage.pdfSecondaryColor || "#B8F7A1"}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfSecondaryColor: e.target.value }))}
                            className="w-10 h-10 rounded-xl border border-gray-300 cursor-pointer p-1"
                          />
                          <input 
                            type="text"
                            value={activeInvoiceStudioPage.pdfSecondaryColor || "#B8F7A1"}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfSecondaryColor: e.target.value }))}
                            className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                      {/* COLOR PALETTE PRESETS */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          { name: "Purple Theme (Default)", primary: "#5D3ADF", secondary: "#B8F7A1" },
                          { name: "Flame Red", primary: "#0B2369", secondary: "#FF5349" },
                          { name: "Royal Purple", primary: "#4c1d95", secondary: "#7c3aed" },
                          { name: "Emerald Green", primary: "#065f46", secondary: "#059669" },
                          { name: "Crimson Red", primary: "#991b1b", secondary: "#dc2626" },
                          { name: "Slate Dark", primary: "#0f172a", secondary: "#334155" }
                        ].map(pal => (
                          <button
                            key={pal.name}
                            type="button"
                            onClick={() => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, pdfPrimaryColor: pal.primary, pdfSecondaryColor: pal.secondary }))}
                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-white shadow-2xs flex items-center gap-1 transition-all hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${pal.primary}, ${pal.secondary})` }}
                          >
                            <span>{pal.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* LOGO & WATERMARK BACKGROUND IMAGE CONFIG */}
                    <div className="space-y-4 pt-3 border-t border-gray-150">
                      <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                        <span>Company Logo & Background Watermark Image</span>
                      </span>

                      {/* LOGO UPLOAD & URL */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800 text-xs">Official Header Logo Image (Upload or URL)</span>
                          <button
                            type="button"
                            onClick={() => invoiceLogoInputRef.current?.click()}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                          >
                            <Upload size={13} /> Upload Logo
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Paste image URL or click upload button..."
                          value={activeInvoiceStudioPage.companyLogoUrl || ""}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyLogoUrl: e.target.value }))}
                          className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs"
                        />

                        {activeInvoiceStudioPage.companyLogoUrl && (
                          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                            <img src={activeInvoiceStudioPage.companyLogoUrl} alt="Logo" className="h-10 max-w-[140px] object-contain" />
                            <span className="text-[10px] font-mono text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-200">Logo Active</span>
                            <button
                              type="button"
                              onClick={() => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyLogoUrl: "" }))}
                              className="text-red-500 hover:text-red-700 text-xs font-bold ml-auto"
                            >
                              Remove Logo
                            </button>
                          </div>
                        )}
                      </div>

                    {/* WATERMARK BACKGROUND UPLOAD & CONFIG */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      {/* WATERMARK ENABLE / DISABLE TOGGLE OPTION */}
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                        <div>
                          <span className="font-bold text-gray-900 text-xs block">Background Watermark</span>
                          <span className="text-[11px] text-gray-500">Enable or disable background watermark display on PDF</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={activeInvoiceStudioPage.showWatermark === true}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, showWatermark: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="font-bold text-gray-800 text-xs">Background Watermark Image / Text</span>
                        <button
                          type="button"
                          onClick={() => invoiceWatermarkInputRef.current?.click()}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Upload size={13} /> Upload Watermark Image
                        </button>
                      </div>

                      {/* WATERMARK IMAGE PREVIEW IF UPLOADED */}
                      {activeInvoiceStudioPage.companyWatermarkUrl && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                          <img src={activeInvoiceStudioPage.companyWatermarkUrl} alt="Watermark" className="h-12 max-w-[140px] object-contain opacity-50" />
                          <button
                            type="button"
                            onClick={() => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkUrl: "" }))}
                            className="text-red-500 hover:text-red-700 text-xs font-bold ml-auto"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}

                      {/* WATERMARK TEXT / BRAND NAME INPUT (ALWAYS EDITABLE) */}
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Background Watermark Text / Brand Name</label>
                        <input 
                          type="text"
                          value={activeInvoiceStudioPage.companyWatermarkText !== undefined ? activeInvoiceStudioPage.companyWatermarkText : (activeInvoiceStudioPage.billedByCompany || "SPESHWAY SOLUTIONS")}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkText: e.target.value }))}
                          placeholder="e.g. SPESHWAY SOLUTIONS"
                          className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs uppercase font-bold text-[#071E34] bg-white shadow-2xs"
                        />
                      </div>

                      {/* WATERMARK TEXT FONT SIZE CONTROLS */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-bold text-gray-800 text-[11px]">Watermark Text Font Size (px)</label>
                          <div className="flex items-center gap-1 font-mono font-extrabold text-teal-700 text-xs">
                            <button
                              type="button"
                              onClick={() => setActiveInvoiceStudioPage((prev: any) => ({
                                ...prev,
                                companyWatermarkSize: Math.max(14, (prev.companyWatermarkSize || prev.watermarkSize || 26) - 2)
                              }))}
                              className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"
                            >
                              -
                            </button>
                            <span>{activeInvoiceStudioPage.companyWatermarkSize || activeInvoiceStudioPage.watermarkSize || 26}px</span>
                            <button
                              type="button"
                              onClick={() => setActiveInvoiceStudioPage((prev: any) => ({
                                ...prev,
                                companyWatermarkSize: Math.min(64, (prev.companyWatermarkSize || prev.watermarkSize || 26) + 2)
                              }))}
                              className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min={14}
                          max={64}
                          step={1}
                          value={activeInvoiceStudioPage.companyWatermarkSize || activeInvoiceStudioPage.watermarkSize || 26}
                          onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkSize: Number(e.target.value) }))}
                          className="w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      {/* WATERMARK LOGO IMAGE WIDTH CONTROLS */}
                      {activeInvoiceStudioPage.companyWatermarkUrl && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-bold text-gray-800 text-[11px]">Watermark Logo Image Width (px)</label>
                            <div className="flex items-center gap-1 font-mono font-extrabold text-teal-700 text-xs">
                              <button
                                type="button"
                                onClick={() => setActiveInvoiceStudioPage((prev: any) => ({
                                  ...prev,
                                  companyWatermarkImgSize: Math.max(60, (prev.companyWatermarkImgSize || prev.watermarkImgSize || 220) - 10)
                                }))}
                                className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"
                              >
                                -
                              </button>
                              <span>{activeInvoiceStudioPage.companyWatermarkImgSize || activeInvoiceStudioPage.watermarkImgSize || 220}px</span>
                              <button
                                type="button"
                                onClick={() => setActiveInvoiceStudioPage((prev: any) => ({
                                  ...prev,
                                  companyWatermarkImgSize: Math.min(350, (prev.companyWatermarkImgSize || prev.watermarkImgSize || 220) + 10)
                                }))}
                                className="w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded font-bold text-gray-700 text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min={60}
                            max={350}
                            step={5}
                            value={activeInvoiceStudioPage.companyWatermarkImgSize || activeInvoiceStudioPage.watermarkImgSize || 220}
                            onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkImgSize: Number(e.target.value) }))}
                            className="w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>
                      )}

                      <div className="space-y-3 pt-2 border-t border-gray-200">

                        {/* OPACITY SLIDER & SELECT */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-bold text-gray-800 text-[11px]">Watermark Opacity Transparency</label>
                            <span className="font-mono font-extrabold text-teal-700 text-xs">{Math.round((activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06) * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <input 
                              type="range" 
                              min={0.01} 
                              max={0.80} 
                              step={0.02}
                              value={activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06}
                              onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkOpacity: Number(e.target.value) }))}
                              className="w-full h-1.5 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <select
                              value={activeInvoiceStudioPage.companyWatermarkOpacity !== undefined ? activeInvoiceStudioPage.companyWatermarkOpacity : 0.06}
                              onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkOpacity: Number(e.target.value) }))}
                              className="p-1.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] shrink-0"
                            >
                              <option value={0.03}>3% (Ultra Subtle)</option>
                              <option value={0.06}>6% (Standard)</option>
                              <option value={0.12}>12% (Medium)</option>
                              <option value={0.25}>25% (High Visibility)</option>
                              <option value={0.50}>50% (Ultra Dark)</option>
                              <option value={0.75}>75% (Maximum)</option>
                            </select>
                          </div>
                        </div>

                        {/* CONTRAST & COLOR / BLACK & WHITE MODE */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="font-bold text-gray-800 block mb-1 text-[11px]">Image Contrast</label>
                            <select
                              value={activeInvoiceStudioPage.companyWatermarkContrast !== undefined ? activeInvoiceStudioPage.companyWatermarkContrast : 100}
                              onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkContrast: Number(e.target.value) }))}
                              className="w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] focus:outline-none focus:border-teal-500 shadow-2xs"
                            >
                              <option value={100}>100% Normal</option>
                              <option value={150}>150% High</option>
                              <option value={200}>200% Ultra High</option>
                              <option value={300}>300% Maximum</option>
                            </select>
                          </div>

                          <div>
                            <label className="font-bold text-gray-800 block mb-1 text-[11px]">Color Filter Mode</label>
                            <select
                              value={activeInvoiceStudioPage.companyWatermarkGrayscale ? "grayscale" : "color"}
                              onChange={e => setActiveInvoiceStudioPage((prev: any) => ({ ...prev, companyWatermarkGrayscale: e.target.value === "grayscale" }))}
                              className="w-full p-2.5 border border-gray-300 rounded-xl bg-white text-xs font-bold text-[#071E34] focus:outline-none focus:border-teal-500 shadow-2xs"
                            >
                              <option value="color">Full Color</option>
                              <option value="grayscale">Grayscale (B&W)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: FULL SCREEN PDF PREVIEW NOTICE */}
            {activeInvoiceSectionId === "preview" && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-base text-[#071E34]">5. Full Screen PDF View</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Reviewing live Tax Invoice document output in full detail. Use the download button to export directly.
                </p>
                <button
                  onClick={() => handleDownloadInvoicePdf(activeInvoiceStudioPage)}
                  className="w-full py-3 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download size={16} /> Download Tax Invoice PDF
                </button>
              </div>
            )}

          </div>

          {/* RIGHT SIDE REAL-TIME LIVE TAX INVOICE PDF PREVIEW PANEL */}
          <div className="min-w-0 bg-white p-4 rounded-3xl border border-gray-200 shadow-sm space-y-3 sticky top-4">
            <div className="flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-teal-600" />
                <span className="font-extrabold text-xs text-[#071E34]">Live Tax Invoice PDF Preview</span>
              </div>

              {/* INTERACTIVE ZOOM CONTROLS WITH FIT TO BOX & 100% PRESETS */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setInvoicePreviewZoom(0.6)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      invoicePreviewZoom === 0.6 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="Fit to Box (60%)"
                  >
                    Fit Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvoicePreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Zoom Out (-5%)"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center">
                    {Math.round(invoicePreviewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setInvoicePreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Zoom In (+5%)"
                  >
                    <ZoomIn size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvoicePreviewZoom(1.0)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      invoicePreviewZoom === 1.0 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="100% Actual Size"
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvoicePreviewZoom(0.6)}
                    className="p-1 text-gray-400 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Reset to 60%"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>

                <button
                  onClick={() => handleDownloadInvoicePdf(activeInvoiceStudioPage)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>

            <div className="w-full aspect-[210/297] max-h-[82vh] min-h-[620px] border border-gray-200 rounded-2xl overflow-x-auto overflow-y-auto shadow-inner bg-slate-900">
              <iframe
                srcDoc={generateSpeshwayTaxInvoicePdfHtml(activeInvoiceStudioPage, project, invoicePreviewZoom)}
                className="h-full min-w-[640px] border-0 bg-slate-900"
                style={{ width: "100%", overflowX: "auto" }}
                title="Live Tax Invoice PDF Preview"
              />
            </div>
          </div>

        </div>

        {/* BOTTOM SAVE & NAVIGATION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-6">
          <button
            onClick={() => {
              setActiveInvoiceStudioPage(null);
              setActiveWorkspaceTab("proposals");
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Proposals Workspace</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap justify-end">
            <button
              onClick={() => handleDownloadInvoicePdf(activeInvoiceStudioPage)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0e387a] hover:bg-[#0a2959] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download size={15} />
              <span>Download PDF Invoice</span>
            </button>

            <button
              onClick={handleSaveInvoiceStudioPageRecord}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save size={15} />
              <span>{isSubmitting ? "Saving..." : "Save Invoice Page Record"}</span>
            </button>
          </div>
        </div>



      </div>
    );
  }

  if (activeAgreementStudioPage) {
    const agrId = activeAgreementStudioPage.id || activeAgreementStudioPage.number;

    return (
      <div className="w-full min-h-screen bg-slate-50/70 p-4 md:p-5 flex flex-col gap-5 animate-in fade-in duration-300 font-sans">
        
        {/* HIDDEN LOGO AND WATERMARK FILE INPUTS */}
        <input 
          type="file" 
          ref={agreementLogoInputRef} 
          accept="image/*" 
          onChange={handleAgreementLogoUpload} 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={agreementWatermarkInputRef} 
          accept="image/*" 
          onChange={handleAgreementWatermarkUpload} 
          className="hidden" 
        />
        
        {/* TOP BREADCRUMB & BACK BUTTON */}
        <div className="flex justify-between items-center flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <button 
              onClick={() => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("proposals");
              }}
              className="hover:text-teal-600 transition-colors flex items-center gap-1 font-bold"
            >
              <ArrowLeft size={14} />
              <span>Proposals Workspace</span>
            </button>
            <span>/</span>
            <span className="font-mono text-gray-700 font-bold">{agrId}</span>
            <span>/</span>
            <span className="text-teal-600 font-bold">Service Agreement Studio</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openPdfPrintPreview(generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, 1.0))}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer size={14} /> Print / Save PDF
            </button>

            <button
              onClick={() => handleDownloadAgreementPdf(activeAgreementStudioPage)}
              className="bg-[#0e387a] hover:bg-[#0a2959] text-white px-4 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={14} /> Download PDF
            </button>

            <button
              onClick={handleSaveAgreementStudioPageRecord}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <Save size={14} /> {isSubmitting ? "Saving..." : "Save Agreement"}
            </button>

            <button
              onClick={() => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("agreements");
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft size={14} className="text-gray-500" />
              <span>Back to Workspace</span>
            </button>
          </div>
        </div>

        {/* DARK HERO BANNER */}
        <div className="w-full bg-gradient-to-r from-[#0e2a4a] via-[#10345e] to-[#0c1f38] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-teal-950/40">
          <div className="space-y-3 z-10 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono bg-blue-950/80 text-teal-300 border border-blue-800/50 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {agrId}
              </span>
              <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {activeAgreementStudioPage.status || "SIGNED"}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{activeAgreementStudioPage.projectName || project.name} Service Agreement Studio</span>
            </h1>

            <p className="text-xs text-gray-300 font-sans tracking-wide">
              Official Service Level Agreement (SLA) Studio for Billed Client: <strong>{activeAgreementStudioPage.clientName || project.clientName}</strong>. Edit details & branding on middle, see live PDF on right.
            </p>
          </div>

          <div className="z-10 shrink-0 flex items-center gap-3">
            <button
              onClick={() => handleDownloadAgreementPdf(activeAgreementStudioPage)}
              className="bg-blue-600 hover:bg-teal-500 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-teal-700/30 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Download size={16} />
              <span>Download PDF Agreement</span>
            </button>
          </div>
        </div>

        {/* 3-COLUMN STUDIO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_360px_minmax(560px,1fr)] gap-4 items-start">
          
          {/* LEFT SIDEBAR SECTION NAVIGATION */}
          <div className="bg-white p-3.5 rounded-3xl border border-gray-200 shadow-sm space-y-2.5 sticky top-4">
            <button
              type="button"
              onClick={() => {
                setActiveAgreementStudioPage(null);
                setActiveWorkspaceTab("agreements");
              }}
              className="w-full bg-white hover:bg-[#FFF0EF] text-[#FF5349] border border-[#FF5349]/40 hover:border-[#FF5349] py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all mb-1"
            >
              <ArrowLeft size={14} className="text-teal-600" />
              <span>&lt; Back to Agreements List</span>
            </button>

            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-3 pt-1 pb-1">
              Agreement Studio Sections
            </span>

            {[
              { id: "header", label: "1. Header & Contracting Parties", sub: "Ref No, Dates & Client Info", icon: <Building2 size={16} /> },
              { id: "scope", label: "2. Scope of Work (Section 1)", sub: "App & Admin Panel Bullets", icon: <Layers size={16} /> },
              { id: "duration", label: "3. Duration & Financial Milestones", sub: "Duration, Budget & Stage %", icon: <CreditCard size={16} /> },
              { id: "responsibilities", label: "4. Responsibilities (Section 4)", sub: "Company & Client Roles", icon: <CheckCircle size={16} /> },
              { id: "clauses", label: "5. Legal Clauses (Sections 5-10)", sub: "IP, Dispute, Termination, Exclusions", icon: <FileSignature size={16} /> },
              { id: "branding", label: "6. Company Details & Branding", sub: "Fonts, Colors, Logo & Watermark", icon: <Palette size={16} /> },
              { id: "preview", label: "7. Full Screen Print / PDF Mode", sub: "Full Print and Save Layout", icon: <Eye size={16} /> }
            ].map((section) => {
              const isSelected = activeAgreementSectionId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveAgreementSectionId(section.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 text-blue-950 border-blue-200 shadow-2xs"
                      : "bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl border shrink-0 transition-colors ${
                    isSelected ? "bg-blue-600 text-white border-blue-500" : "bg-gray-50 text-gray-400 border-gray-100"
                  }`}>
                    {section.icon}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-extrabold leading-tight tracking-tight">{section.label}</div>
                    <div className="text-[9px] text-gray-400 font-medium leading-none">{section.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* MIDDLE EDIT FORM */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-5">
            
            {activeAgreementSectionId === "header" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Header & Contracting Parties</h3>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Agreement Reference ID</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.number || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, number: e.target.value, id: e.target.value }))}
                    className="w-full text-xs font-mono font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Effective Date</label>
                  <input
                    type="date"
                    value={activeAgreementStudioPage.date || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, date: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Project / Scope Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.projectName || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, projectName: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Client Company Name</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.clientName || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, clientName: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Client Address Details</label>
                  <textarea
                    value={activeAgreementStudioPage.clientAddress || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, clientAddress: e.target.value }))}
                    rows={2}
                    className="w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {activeAgreementSectionId === "scope" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Project Overview & Scope</h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Agreement Document Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.docTitle || "Software Development Agreement"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, docTitle: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Agreement Introduction Text</label>
                  <textarea
                    value={activeAgreementStudioPage.introduction ?? ""}
                    placeholder="Leave blank for automatic contracting parties intro..."
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, introduction: e.target.value }))}
                    rows={4}
                    className="w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Section 1 Header Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec1Title || "1. Project Overview & Scope"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Section 1 Scope Narrative</label>
                  <textarea
                    value={activeAgreementStudioPage.sec1Content || "The Company agrees to design and develop a sports Management platform including a mobile application for users and a centralized web-based admin panel."}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Content: e.target.value }))}
                    rows={3}
                    className="w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">1.1 Subsection Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec1Subsection1Title || "1.1 User Mobile Application (Android & iOS)"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Subsection1Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">1.1 Scope Bullets (Newline separated)</label>
                  <textarea
                    value={activeAgreementStudioPage.sec1Subsection1BulletText || `Authentication: Secure registration and login for academy members.
Slot Booking (External): Deep-linking functionality to open third-party apps (Playo or District) for slot bookings.
Team Matching: Feature to match users with other players/teams; mobile numbers are visible only to subscribed users.
Coupon Codes & Payments: Integration for applying coupons and a payment gateway for services.
Profile Management: User personal details and history.`}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Subsection1BulletText: e.target.value }))}
                    rows={5}
                    className="w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">1.2 Subsection Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec1Subsection2Title || "1.2 Admin Web Panel"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Subsection2Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">1.2 Scope Bullets (Newline separated)</label>
                  <textarea
                    value={activeAgreementStudioPage.sec1Subsection2BulletText || `Dashboard: Real-time overview of active bookings and user activity.
Slot & Capacity Management: Configuration of available hours and maximum members per session.
Subscription Management: Tools to manage memberships, tiers, and renewals.
Moderation: Management of users and overview of social sessions.`}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec1Subsection2BulletText: e.target.value }))}
                    rows={5}
                    className="w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>
              </div>
            )}

            {activeAgreementSectionId === "duration" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Duration & Financial Milestones</h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Project Duration Timeframe</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.duration || ""}
                    placeholder="e.g. one (1) month"
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, duration: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Total Project Cost Budget (₹)</label>
                  <input
                    type="number"
                    value={activeAgreementStudioPage.budget || 80000}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, budget: Number(e.target.value), rate: Number(e.target.value), amount: Number(e.target.value) }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-blue-900 uppercase block">Milestone Percentages Split</span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-500">M1 (Initiation)</label>
                      <input
                        type="number"
                        value={activeAgreementStudioPage.m1Pct ?? 40}
                        onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, m1Pct: Number(e.target.value) }))}
                        className="w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-500">M2 (Beta)</label>
                      <input
                        type="number"
                        value={activeAgreementStudioPage.m2Pct ?? 40}
                        onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, m2Pct: Number(e.target.value) }))}
                        className="w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-500">M3 (Handover)</label>
                      <input
                        type="number"
                        value={activeAgreementStudioPage.m3Pct ?? 20}
                        onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, m3Pct: Number(e.target.value) }))}
                        className="w-full p-2 text-xs font-bold text-center bg-white border border-gray-200 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                  
                  <p className="text-[9px] text-gray-400 text-center font-medium mt-1">Make sure the milestone splits sum to exactly 100%.</p>
                </div>
              </div>
            )}

            {activeAgreementSectionId === "responsibilities" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Responsibilities</h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Section 4 Header Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec4Title || "4. Responsibilities"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec4Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">4.1 Provider Responsibilities Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec4Subsection1Title || "4.1 Responsibilities of the Company"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec4Subsection1Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Provider Bullets (Newline separated)</label>
                  <textarea
                    value={activeAgreementStudioPage.sec4Subsection1BulletText || `Custom Development: End-to-end coding of the mobile application and administrative dashboard.
UI/UX Design: Professional interface design focused on sports usability.
Backend Engineering: Robust API development and database architecture.
Deployment Support: Assistance in hosting the admin panel and publishing to app stores.
Warranty: Inclusion of 3 months post-deployment technical support for bug fixes.`}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec4Subsection1BulletText: e.target.value }))}
                    rows={6}
                    className="w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">4.2 Client Responsibilities Title</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.sec4Subsection2Title || "4.2 Responsibilities of the Client"}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec4Subsection2Title: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Client Bullets (Newline separated)</label>
                  <textarea
                    value={activeAgreementStudioPage.sec4Subsection2BulletText || `Assets & Media: Provision of high-resolution logos, images, and branding guidelines.
Third-Party Credentials: Provision of API keys for payment gateways, SMS services, and developer accounts (Google Play/Apple Store).
Timely Review: Feedback on design mockups and staging deployments within 48 hours to avoid timeline shifts.`}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec4Subsection2BulletText: e.target.value }))}
                    rows={6}
                    className="w-full text-xs font-mono font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-y"
                  />
                </div>
              </div>
            )}

            {activeAgreementSectionId === "clauses" && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Legal Clauses & Exclusions</h3>

                {/* Section 5 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">5. IP & Confidentiality</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Section 5 Title"
                      value={activeAgreementStudioPage.sec5Title || "5. Intellectual Property & Confidentiality"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec5Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Subsection 5.1 Title"
                      value={activeAgreementStudioPage.sec5Subsection1Title || "5.1 Intellectual Property"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec5Subsection1Title: e.target.value }))}
                      className="w-full text-[11px] font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      placeholder="Subsection 5.1 Content"
                      value={activeAgreementStudioPage.sec5Subsection1Content || "Upon full and final payment of the total budget, the source code and assets specifically developed for this project shall be transferred to the Client. The Company retains the right to use underlying generic libraries and frameworks."}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec5Subsection1Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Subsection 5.2 Title"
                      value={activeAgreementStudioPage.sec5Subsection2Title || "5.2 Confidentiality"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec5Subsection2Title: e.target.value }))}
                      className="w-full text-[11px] font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      placeholder="Subsection 5.2 Content"
                      value={activeAgreementStudioPage.sec5Subsection2Content || "Both parties agree to protect and keep confidential any proprietary information, business data, or technical secrets disclosed during the project."}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec5Subsection2Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Section 6 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">6. Termination Clause</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeAgreementStudioPage.sec6Title || "6. Termination"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec6Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      value={activeAgreementStudioPage.sec6Content || "Either party may terminate this Agreement with 7 days written notice. In the event of termination, the Client shall pay for all work completed up to the termination date. If the Company terminates without cause, it shall return any unearned advance payments."}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec6Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Section 7 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">7. Dispute Resolution</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeAgreementStudioPage.sec7Title || "7. Dispute Resolution"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec7Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      value={activeAgreementStudioPage.sec7Content || "Any disputes arising out of this Agreement shall first be resolved through good-faith negotiations. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India."}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec7Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Section 8 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">8. Force Majeure</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeAgreementStudioPage.sec8Title || "8. Force Majeure"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec8Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      value={activeAgreementStudioPage.sec8Content || "Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to natural disasters, government restrictions, or widespread internet outages."}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec8Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Section 9 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">9. Amendments Clause</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeAgreementStudioPage.sec9Title || "9. Amendments"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec9Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      value={activeAgreementStudioPage.sec9Content || 'Any changes to the scope of work (Scope Modifications) defined in Section 1 must be documented in a written "Change Request" and may be subject to additional billing and timeline extensions.'}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec9Content: e.target.value }))}
                      rows={3}
                      className="w-full text-xs text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Section 10 */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-slate-700 uppercase block border-b pb-1">10. Terms, Conditions & Exclusions</span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={activeAgreementStudioPage.sec10Title || "10. Terms and Conditions"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec10Title: e.target.value }))}
                      className="w-full text-xs font-bold text-gray-800 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                    <textarea
                      value={activeAgreementStudioPage.sec10BulletText || `Third-Party Fees: Costs for Play Store ($25), Apple Store ($99), and Cloud Hosting are not included in the budget.
Content Entry: Uploading extensive historical marketing data is excluded.
Standard Tech Stack: Development will follow standard modern frameworks suitable for mobile and web.`}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, sec10BulletText: e.target.value }))}
                      rows={4}
                      className="w-full text-xs font-mono text-gray-700 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeAgreementSectionId === "branding" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Company Details & Branding</h3>

                {/* LOGO UPLOAD & CONFIG */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-xs">Company Logo Image</span>
                    <button
                      type="button"
                      onClick={() => agreementLogoInputRef.current?.click()}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      <Upload size={13} /> Upload Logo
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Paste image URL or click upload button..."
                    value={activeAgreementStudioPage.companyLogoUrl || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyLogoUrl: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs outline-none"
                  />

                  {activeAgreementStudioPage.companyLogoUrl && (
                    <div className="space-y-3 pt-1.5 border-t border-gray-150">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                        <img src={activeAgreementStudioPage.companyLogoUrl} alt="Logo" className="h-10 max-w-[140px] object-contain" />
                        <span className="text-[10px] font-mono text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded border border-green-200">Logo Active</span>
                        <button
                          type="button"
                          onClick={() => setActiveAgreementStudioPage((p: any) => ({ ...p, companyLogoUrl: "" }))}
                          className="text-red-500 hover:text-red-700 text-xs font-bold ml-auto cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase">
                          <span>Logo Height ({activeAgreementStudioPage.companyLogoSize || 38}px)</span>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={activeAgreementStudioPage.companyLogoSize || 38}
                            onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyLogoSize: Number(e.target.value) }))}
                            className="w-24 cursor-pointer accent-blue-600"
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase">
                          <span>Logo Opacity ({Math.round((activeAgreementStudioPage.companyLogoOpacity ?? 1) * 100)}%)</span>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={(activeAgreementStudioPage.companyLogoOpacity ?? 1) * 100}
                            onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyLogoOpacity: Number(e.target.value) / 100 }))}
                            className="w-24 cursor-pointer accent-blue-600"
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase">
                          <span>Logo Rotation ({activeAgreementStudioPage.companyLogoRotation || 0}°)</span>
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            step="5"
                            value={activeAgreementStudioPage.companyLogoRotation || 0}
                            onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyLogoRotation: Number(e.target.value) }))}
                            className="w-24 cursor-pointer accent-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Provider Company Name</label>
                  <input
                    type="text"
                    value={activeAgreementStudioPage.billedByCompany || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, billedByCompany: e.target.value }))}
                    className="w-full text-xs font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Provider Address</label>
                  <textarea
                    value={activeAgreementStudioPage.companyAddress || ""}
                    onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyAddress: e.target.value }))}
                    rows={3}
                    className="w-full text-xs font-semibold text-gray-700 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Color Accent</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={activeAgreementStudioPage.pdfPrimaryColor || "#0e2a4a"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, pdfPrimaryColor: e.target.value }))}
                      className="w-12 h-10 border border-gray-200 rounded-xl cursor-pointer"
                    />
                    <input
                      type="text"
                      value={activeAgreementStudioPage.pdfPrimaryColor || "#0e2a4a"}
                      onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, pdfPrimaryColor: e.target.value }))}
                      className="flex-1 text-xs font-mono font-bold text-gray-800 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* WATERMARK BACKGROUND CONFIG */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-2xs">
                    <div>
                      <span className="font-bold text-gray-900 text-xs block">Background Watermark</span>
                      <span className="text-[11px] text-gray-500">Display background watermark on PDF</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={activeAgreementStudioPage.showWatermark !== false}
                        onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, showWatermark: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5.5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {activeAgreementStudioPage.showWatermark !== false && (
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-xs">Watermark Image</span>
                        <button
                          type="button"
                          onClick={() => agreementWatermarkInputRef.current?.click()}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                        >
                          <Upload size={13} /> Upload Watermark Image
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Watermark image URL (optional)..."
                        value={activeAgreementStudioPage.companyWatermarkUrl || ""}
                        onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyWatermarkUrl: e.target.value }))}
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-[#071E34] bg-white shadow-2xs outline-none animate-in fade-in"
                      />

                      {activeAgreementStudioPage.companyWatermarkUrl && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                          <img src={activeAgreementStudioPage.companyWatermarkUrl} alt="Watermark Preview" className="h-10 max-w-[140px] object-contain opacity-50" />
                          <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">Image Active</span>
                          <button
                            type="button"
                            onClick={() => setActiveAgreementStudioPage((p: any) => ({ ...p, companyWatermarkUrl: "" }))}
                            className="text-red-500 hover:text-red-700 text-xs font-bold ml-auto cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Watermark Text fallback</label>
                        <input
                          type="text"
                          value={activeAgreementStudioPage.companyWatermarkText || "SPESHWAY SOLUTIONS"}
                          onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyWatermarkText: e.target.value }))}
                          className="w-full text-xs font-bold text-gray-800 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-500">Opacity (0.01 - 0.2)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={activeAgreementStudioPage.companyWatermarkOpacity ?? 0.05}
                            onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyWatermarkOpacity: Number(e.target.value) }))}
                            className="w-full p-2.5 text-xs font-bold text-center bg-white border border-gray-200 rounded-xl outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-500">Rotation (degrees)</label>
                          <input
                            type="number"
                            value={activeAgreementStudioPage.companyWatermarkRotation ?? -15}
                            onChange={(e) => setActiveAgreementStudioPage((p: any) => ({ ...p, companyWatermarkRotation: Number(e.target.value) }))}
                            className="w-full p-2.5 text-xs font-bold text-center bg-white border border-gray-200 rounded-xl outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeAgreementSectionId === "preview" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Full Screen Print / PDF Mode</h3>
                <p className="text-xs text-gray-400">Launch standard print dialog or compile PDF documents.</p>
                <div className="space-y-3">
                  <button
                    onClick={() => openPdfPrintPreview(generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, 1.0))}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Printer size={16} />
                    <span>Print & Save PDF Document</span>
                  </button>
                  <button
                    onClick={() => handleDownloadAgreementPdf(activeAgreementStudioPage)}
                    className="w-full bg-[#0e387a] hover:bg-[#0a2959] text-white py-3 px-4 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download Agreement PDF</span>
                  </button>
                </div>
              </div>
            )}
            
          </div>

          {/* RIGHT REAL-TIME LIVE PDF PREVIEW */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4 lg:col-span-1">
            <div className="flex justify-between items-center flex-wrap gap-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-700 w-4 h-4" />
                <span className="font-extrabold text-xs text-[#071E34]">Live Service Agreement PDF Preview</span>
              </div>

              {/* ZOOM CONTROLS */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setAgreementPreviewZoom(0.6)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      agreementPreviewZoom === 0.6 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="Fit to Box (60%)"
                  >
                    Fit Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgreementPreviewZoom(prev => Math.max(0.35, Number((prev - 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Zoom Out (-5%)"
                  >
                    <ZoomOut size={13} />
                  </button>
                  <span className="text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center">
                    {Math.round(agreementPreviewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setAgreementPreviewZoom(prev => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                    className="p-1 text-gray-600 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Zoom In (+5%)"
                  >
                    <ZoomIn size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgreementPreviewZoom(1.0)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold transition-all ${
                      agreementPreviewZoom === 1.0 ? "bg-blue-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    title="100% Actual Size"
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgreementPreviewZoom(0.6)}
                    className="p-1 text-gray-400 hover:text-teal-600 hover:bg-white rounded-lg transition-all"
                    title="Reset to 60%"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full aspect-[210/297] max-h-[82vh] min-h-[620px] border border-gray-200 rounded-2xl overflow-x-auto overflow-y-auto shadow-inner bg-slate-900">
              <iframe
                srcDoc={generateSpeshwayAgreementPdfHtml(activeAgreementStudioPage, project, agreementPreviewZoom)}
                className="h-full min-w-[640px] border-0 bg-slate-900"
                style={{ width: "100%", overflowX: "auto" }}
                title="Live Service Agreement PDF Preview"
              />
            </div>
          </div>

        </div>

        {/* BOTTOM SAVE & NAVIGATION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-6">
          <button
            onClick={() => {
              setActiveAgreementStudioPage(null);
              setActiveWorkspaceTab("agreements");
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Agreements List</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap justify-end">
            <button
              onClick={() => handleDownloadAgreementPdf(activeAgreementStudioPage)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0e387a] hover:bg-[#0a2959] text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download size={15} />
              <span>Download PDF Agreement</span>
            </button>

            <button
              onClick={handleSaveAgreementStudioPageRecord}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save size={15} />
              <span>{isSubmitting ? "Saving..." : "Save Agreement Record"}</span>
            </button>
          </div>
        </div>

      </div>
    );
  }

  // WORKSPACE MAIN VIEW (PROPOSALS, QUOTATIONS, INVOICES CARDS LIST)
  return (
    <div className="w-full min-h-screen bg-slate-50/70 p-4 md:p-8 flex flex-col gap-6 animate-in fade-in duration-300 font-sans">
      
      {/* TOP BREADCRUMB & BACK BUTTON */}
      <div className="flex justify-between items-center flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-500 font-semibold">
          <button 
            onClick={onBackToProjects}
            className="hover:text-teal-600 transition-colors flex items-center gap-1 font-bold"
          >
            <ArrowLeft size={14} />
            <span>Our Projects</span>
          </button>
          <span>/</span>
          <span className="font-mono text-gray-700 font-bold">{project.id}</span>
          <span>/</span>
          <span className="text-teal-600 font-bold">Proposals Workspace</span>
        </div>

        <button
          onClick={onBackToProjects}
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft size={14} className="text-gray-500" />
          <span>Back to Projects Showcase</span>
        </button>
      </div>

      {/* DARK HERO BANNER - Matching Image 2 */}
      <div className="w-full bg-[#06132D] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-slate-800/40">
        <div className="space-y-3 z-10 max-w-2xl">
          {/* BADGES */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono bg-[#FF5349]/20 text-[#FF5349] border border-[#FF5349]/30 px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider">
              {project.id}
            </span>
            <span className="text-[10px] font-bold bg-[#FF5349]/20 text-[#FF5349] border border-[#FF5349]/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
              {project.category || "WEB APPLICATION"}
            </span>
          </div>

          {/* MAIN HERO TITLE */}
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>{project.name || project.title}</span>
            <span className="text-[#FF5349] font-light">&bull;</span>
            <span className="text-[#FF5349]">Proposals Workspace Page</span>
          </h1>

          <p className="text-xs text-slate-300 font-sans tracking-wide">
            Manage proposals, view quotations, and edit dynamic invoices linked to created proposals.
          </p>
        </div>

        {/* HERO TOP RIGHT ACTION BUTTON */}
        <div className="z-10 shrink-0">
          <button
            onClick={handleOpenCreateModal}
            className="bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-[#FF5349]/25 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <Plus size={16} />
            <span>+ Create New Proposal</span>
          </button>
        </div>
      </div>

      {/* SIDE-BY-SIDE WORKSPACE NAVIGATION TABS - Matching Image 2 */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-fit">
        <button
          onClick={() => setActiveWorkspaceTab("proposals")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "proposals"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FileText size={16} />
          <span>Proposals</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "proposals" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`}>
            {projectQuotations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab("quotations")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "quotations"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Receipt size={16} />
          <span>Quotations</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "quotations" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`}>
            {projectQuotations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab("invoices")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "invoices"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <CreditCard size={16} />
          <span>Invoices</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "invoices" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`}>
            {displayInvoicesList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab("agreements")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeWorkspaceTab === "agreements"
              ? "bg-[#FF5349] text-white shadow-md shadow-[#FF5349]/20"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FileSignature size={16} />
          <span>Agreements</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeWorkspaceTab === "agreements" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`}>
            {displayAgreementsList.length}
          </span>
        </button>
      </div>

      {/* 1. PROPOSALS TAB VIEW */}
      {activeWorkspaceTab === "proposals" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="text-[#FF5349] w-5 h-5" />
                <h2 className="font-heading font-extrabold text-base text-slate-900">Proposal Names List</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Total proposals: <strong className="text-slate-800">{projectQuotations.length}</strong>. Click Quotations on any proposal card to open section details.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <div className="relative flex-1 md:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search proposal titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5349]"
                />
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 shrink-0 transition-all"
              >
                <Plus size={15} />
                <span>Create Proposal Page</span>
              </button>
            </div>
          </div>

          {searchFilteredQuotations.length === 0 ? (
            <div className="p-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3 my-2">
              <Sparkles className="w-10 h-10 text-[#FF5349]" />
              <h4 className="font-heading font-extrabold text-slate-800 text-sm">No Proposals Found for this Project</h4>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                There are currently no proposal documents stored for <strong>{project.name || project.title}</strong>. Click <strong>Create Proposal Page</strong> above to add your first proposal record.
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-2 bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Create Proposal Page</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchFilteredQuotations.map((q, idx) => {
                const qId = q.id || q.number || `QT-${project.id}`;
                const scopeCat = q.projectType || "Website Application";
                const createdDateStr = q.createdDate || q.createdAt || new Date().toISOString().split("T")[0];
                const isDragging = draggedCardIndex === idx;
                const isDragOver = dragOverCardIndex === idx;

                return (
                  <div 
                    key={qId} 
                    draggable
                    onDragStart={(e) => {
                      setDraggedCardIndex(idx);
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", String(idx));
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (dragOverCardIndex !== idx) setDragOverCardIndex(idx);
                    }}
                    onDrop={(e) => {
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
                    }}
                    onDragEnd={() => {
                      setDraggedCardIndex(null);
                      setDragOverCardIndex(null);
                    }}
                    className={`p-6 rounded-2xl bg-white border shadow-sm flex flex-col justify-between gap-5 relative group transition-all cursor-grab active:cursor-grabbing ${
                      isDragging 
                        ? "opacity-40 scale-95 border-dashed border-[#FF5349] ring-2 ring-[#FF5349]/30" 
                        : isDragOver 
                        ? "border-[#FF5349] ring-2 ring-[#FF5349] scale-[1.01] bg-rose-50/30" 
                        : "border-slate-200 hover:shadow-md hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing shrink-0" title="Drag to reorder card">
                          <GripVertical size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100">
                              {qId}
                            </span>
                          </div>

                          <h3 className="font-heading font-extrabold text-base text-slate-900 mt-2">
                            {q.title || `${project.name || project.title} Custom Proposal`}
                          </h3>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            Client: {q.clientName || project.clientName || "Internal / Showcase"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(q)}
                          className="text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"
                          title="Edit Proposal Details"
                        >
                          <Edit size={14} />
                          <span className="text-[11px] font-bold">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProposal(qId)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                          title="Delete Proposal"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Scope Category:</span>
                        <span className="font-bold text-slate-800">{scopeCat}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Created:</span>
                        <span className="font-mono text-slate-600 text-[11px]">{createdDateStr}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpen8Sections?.(q)}
                      className="w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <span>Quotations</span>
                      <span className="text-sm font-bold">&gt;</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. QUOTATIONS TAB VIEW */}
      {activeWorkspaceTab === "quotations" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Receipt className="text-[#FF5349] w-5 h-5" />
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">Quotations List</h3>
                <p className="text-xs text-slate-500 mt-0.5">Quotations generated directly from created proposals. Click to open 8-Section Studio.</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full">
              {projectQuotations.length} Quotations Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectQuotations.map((q) => {
              const qId = q.id || q.number || `QT-${project.id}`;
              const scopeCat = q.projectType || "Website Application";

              return (
                <div key={qId} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono bg-red-50 text-[#FF5349] px-2 py-0.5 rounded font-extrabold border border-red-100">
                        {qId}
                      </span>
                      <h4 className="font-heading font-extrabold text-base text-slate-900 mt-2">
                        {q.title || `${project.name || project.title} Quotation`}
                      </h4>
                      <span className="text-xs text-slate-500 mt-0.5 block">Category: {scopeCat}</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                      ACTIVE QUOTATION
                    </span>
                  </div>

                  <button
                    onClick={() => onOpen8Sections?.(q)}
                    className="w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Quotations</span>
                    <span className="text-sm font-bold">&gt;</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. INVOICES TAB VIEW */}
      {activeWorkspaceTab === "invoices" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <CreditCard className="text-[#FF5349] w-5 h-5" />
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">Invoices List</h3>
                <p className="text-xs text-slate-500 mt-0.5">Tax Invoices generated from created proposals. Click Invoices button to open full Tax Invoice Studio Page.</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full">
              {displayInvoicesList.length} Invoices Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayInvoicesList.map((inv) => {
              const invId = inv.id || inv.number || `SPW-INV-${project.id}`;
              const rateNum = Number(inv.rate || inv.amount || 170000);
              const taxNum = Number(inv.taxPct !== undefined ? inv.taxPct : 18);
              const totalDueNum = inv.totalDue || Math.round(rateNum * (1 + taxNum / 100));

              return (
                <div key={invId} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative">
                  
                  {/* INVOICE CARD HEADER */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100">
                          {invId}
                        </span>
                        <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase">
                          {inv.status || "PAID"}
                        </span>
                      </div>

                      <h4 className="font-heading font-extrabold text-base text-slate-900 mt-2">
                        {inv.productName || project.name || project.title} Tax Invoice
                      </h4>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Billed To: <strong>{inv.clientName || project.clientName || "Hyper Mobility Services"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenInvoiceStudioPage(inv)}
                        className="text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"
                        title="Edit Invoice Details"
                      >
                        <Edit size={14} />
                        <span className="text-[11px] font-bold">Edit</span>
                      </button>
                    </div>
                  </div>

                  {/* INVOICE SUMMARY MATRIX */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Subtotal Rate:</span>
                      <span className="font-mono text-slate-800">₹{rateNum.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">GST Tax ({taxNum}%):</span>
                      <span className="font-mono text-slate-800">₹{Math.round(rateNum * (taxNum / 100)).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
                      <span className="font-bold text-slate-900">Total Due Amount:</span>
                      <span className="font-extrabold text-[#06132D] text-sm font-mono">₹{totalDueNum.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* MAIN BUTTON */}
                  <button
                    onClick={() => handleOpenInvoiceStudioPage(inv)}
                    className="w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Invoices</span>
                    <span className="text-sm font-bold">&gt;</span>
                  </button>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. AGREEMENTS TAB VIEW */}
      {activeWorkspaceTab === "agreements" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5">
              <FileSignature className="text-[#FF5349] w-5 h-5" />
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">Agreements List</h3>
                <p className="text-xs text-slate-500 mt-0.5">Service Agreements generated from created proposals. Click Agreements button to open full Service Agreement Studio Page.</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-50 text-[#FF5349] border border-red-100 px-3 py-1 rounded-full">
              {displayAgreementsList.length} Agreements Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayAgreementsList.map((agr) => {
              const agrId = agr.id || agr.number || `SPW-AGR-${project.id}`;
              const budgetNum = Number(agr.budget || agr.rate || agr.amount || 80000);

              return (
                <div key={agrId} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative">
                  
                  {/* AGREEMENT CARD HEADER */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-red-50 text-[#FF5349] px-2.5 py-0.5 rounded font-extrabold border border-red-100">
                          {agrId}
                        </span>
                        <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase">
                          {agr.status || "SIGNED"}
                        </span>
                      </div>

                      <h4 className="font-heading font-extrabold text-base text-slate-900 mt-2">
                        {agr.projectName || project.name || project.title} Service Agreement
                      </h4>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Prepared For: <strong>{agr.clientName || project.clientName || "AMY SPORTS ARENA"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenAgreementStudioPage(agr)}
                        className="text-slate-500 hover:text-[#FF5349] transition-colors p-1.5 flex items-center gap-1 text-xs font-semibold rounded-lg hover:bg-red-50"
                        title="Edit Agreement Details"
                      >
                        <Edit size={14} />
                        <span className="text-[11px] font-bold">Edit</span>
                      </button>
                    </div>
                  </div>

                  {/* AGREEMENT SUMMARY MATRIX */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Project Duration:</span>
                      <span className="font-bold text-slate-800">{agr.duration || "one (1) month"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Milestone Stage 1 (40%):</span>
                      <span className="font-mono text-slate-800">₹{Math.round(budgetNum * 0.40).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Milestone Stage 2 (40%):</span>
                      <span className="font-mono text-slate-800">₹{Math.round(budgetNum * 0.40).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Milestone Stage 3 (20%):</span>
                      <span className="font-mono text-slate-800">₹{Math.round(budgetNum * 0.20).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
                      <span className="font-bold text-slate-900">Total Fixed Contract Price:</span>
                      <span className="font-extrabold text-[#06132D] text-sm font-mono">₹{budgetNum.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* MAIN BUTTON */}
                  <button
                    onClick={() => handleOpenAgreementStudioPage(agr)}
                    className="w-full bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Agreements</span>
                    <span className="text-sm font-bold">&gt;</span>
                  </button>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE & EDIT PROPOSAL MODAL */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-[#071E34] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF5349]" />
                <span>{editingProposal ? "Edit Proposal Record" : "Create New Proposal Record"}</span>
              </h3>
              <button 
                onClick={() => setShowProposalModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProposalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-2 uppercase text-[10px] tracking-wider">
                  Select Target Proposal Scope Option *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {scopeOptions.map((opt) => {
                    const isSelected = formState.projectType === opt.name;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelectScopeOption(opt)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "border-2 border-[#FF5349] bg-rose-50/70 shadow-sm ring-1 ring-rose-500/20"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-[#071E34]">
                            {opt.icon}
                            <span className="line-clamp-1">{opt.name}</span>
                          </div>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#FF5349] shrink-0" />}
                        </div>
                        <span className="text-[10px] text-gray-500 line-clamp-1">{opt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Proposal Document Title</label>
                <input 
                  type="text"
                  required
                  value={formState.title}
                  onChange={e => setFormState(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={`e.g. ${project.name || project.title} Custom Proposal`}
                  className="w-full p-2.5 border border-gray-300 rounded-xl font-sans text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Selected Scope Category</label>
                <input
                  type="text"
                  readOnly
                  value={formState.projectType}
                  className="w-full p-2.5 border border-gray-200 rounded-xl font-sans text-xs font-bold text-blue-950 bg-teal-50/60"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Overview Narrative / Notes</label>
                <textarea 
                  rows={3}
                  value={formState.overviewNarrative}
                  onChange={e => setFormState(prev => ({ ...prev, overviewNarrative: e.target.value }))}
                  placeholder="Executive overview details..."
                  className="w-full p-2.5 border border-gray-300 rounded-xl font-sans text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="px-4 py-2.5 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-white bg-[#4F46E5] hover:bg-[#4338CA] font-extrabold shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
                >
                  <span>{isSubmitting ? "Saving..." : editingProposal ? "Update Proposal Record" : "Save Proposal Record"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
