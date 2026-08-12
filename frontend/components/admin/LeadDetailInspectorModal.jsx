const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\admin\\LeadDetailInspectorModal.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import * as React from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  FolderOpen,
  FileText,
  Receipt,
  CreditCard,
  Edit,
  Eye,
  Mail,
  Sparkles,
  Save,
  Maximize2,
  Minimize2,
  UserCheck
} from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml } from "../../utils/pdfGenerator";

























export default function LeadDetailInspectorModal({
  leadDetailForm,
  setLeadDetailForm,
  setSelectedLeadForDetail,
  columns,
  employees,
  handleUpdateLeadStatus,
  handleConvertLead,
  handleDeleteLead,
  handleNavigateLeadDetail,
  handleSaveLeadDetailChanges,
  projects = [],
  ourProjects = [],
  quotations = [],
  invoices = [],
  setClients,
  setLeads,
  showToast,
  API_URL = "http://localhost:5000/api/v1",
  onPreviewDoc,
  onSendEmailDoc,
  onMarkTemporaryClient
}) {
  if (!leadDetailForm) return null;

  const close = () => {
    setSelectedLeadForDetail(null);
    setLeadDetailForm(null);
  };

  const allAvailableProjects = React.useMemo(() => {
    const combined = [
      ...projects,
      ...ourProjects.map((op) => ({
        id: op.id || `OPRJ-${op.name}`,
        name: op.name || op.title,
        title: op.title || op.name,
        category: op.category || "Web Application",
        clientName: op.clientName || "Enterprise Showcase",
        budget: op.budget || 45000,
        status: op.status || "Active",
        description: op.description || "Portfolio project specification."
      }))
    ];
    if (combined.length === 0) {
      return [
        {
          id: "PRJ-7314",
          name: "Proposal for HMS (Hospital Management System) Complete Ecosystem",
          title: "Proposal for HMS (Hospital Management System) Complete Ecosystem",
          category: "Web + Mobile App",
          clientName: leadDetailForm.name,
          budget: 140000,
          status: "Active",
          description: "Complete Healthcare Management System with Patient Portal, OPD, IPD & Mobile Apps."
        },
        {
          id: "PRJ-5355",
          name: "Proposal for LMS (Learning Management System) Ecosystem",
          title: "Proposal for LMS (Learning Management System) Ecosystem",
          category: "Web + Mobile App",
          clientName: leadDetailForm.name,
          budget: 140000,
          status: "Active",
          description: "Interactive Online Education Platform with Live Classes, Student CRM & Mobile Apps."
        }
      ];
    }
    return combined;
  }, [projects, ourProjects, leadDetailForm.name]);

  const [selectedProjId, setSelectedProjId] = React.useState(_optionalChain([allAvailableProjects, 'access', _ => _[0], 'optionalAccess', _2 => _2.id]) || "");
  const [selectedProposalId, setSelectedProposalId] = React.useState("");
  const [selectedQuoteId, setSelectedQuoteId] = React.useState("");
  const [selectedInvoiceId, setSelectedInvoiceId] = React.useState("");
  const [activePreviewType, setActivePreviewType] = React.useState("quotation");

  const selectedProj = React.useMemo(() => {
    return allAvailableProjects.find(p => p.id === selectedProjId) || allAvailableProjects[0];
  }, [allAvailableProjects, selectedProjId]);

  const availableProposals = React.useMemo(() => {
    if (!selectedProj) return [];
    const leadName = (leadDetailForm.name || "").toLowerCase().trim();
    const leadEmail = (leadDetailForm.email || "").toLowerCase().trim();
    const projName = (selectedProj.name || selectedProj.title || "").toLowerCase().trim();
    const projId = (selectedProj.id || "");
    const matched = quotations.filter((q) => {
      const qClientName = (q.clientName || "").toLowerCase().trim();
      const qProjectName = (q.projectName || "").toLowerCase().trim();
      const qId = (q.id || q.number || "").toLowerCase();
      return (
        q.projectId === projId ||
        (projName && qProjectName === projName) ||
        (projName && qProjectName.includes(projName)) ||
        (projId && qId.includes(projId.toLowerCase())) ||
        (leadName && qClientName === leadName) ||
        (leadEmail && (q.clientEmail || "").toLowerCase().trim() === leadEmail)
      );
    });
    if (matched.length > 0) return matched;
    return [
      {
        id: `PROP-${selectedProj.id}-01`,
        number: `PROP-${selectedProj.id}-01`,
        title: `Proposal for ${selectedProj.name || selectedProj.title}`,
        clientName: leadDetailForm.name,
        projectName: selectedProj.name || selectedProj.title,
        budget: selectedProj.budget || 50000,
        planAName: "PLAN A - Core Package",
        planAPrice: selectedProj.budget || 50000,
        planBName: "PLAN B - Premium Package",
        planBPrice: Math.round((selectedProj.budget || 50000) * 1.3),
        overviewNarrative: selectedProj.description || `Executive proposal for ${selectedProj.name || selectedProj.title}.`,
        status: "Draft"
      }
    ];
  }, [quotations, selectedProj, leadDetailForm.name, leadDetailForm.email]);

  const selectedProposal = React.useMemo(() => {
    return availableProposals.find(p => p.id === selectedProposalId) || availableProposals[0];
  }, [availableProposals, selectedProposalId]);

  const availableQuotations = React.useMemo(() => {
    if (!selectedProj) return [];
    const leadName = (leadDetailForm.name || "").toLowerCase().trim();
    const leadEmail = (leadDetailForm.email || "").toLowerCase().trim();
    const projName = (selectedProj.name || selectedProj.title || "").toLowerCase().trim();
    const projId = (selectedProj.id || "");
    const matched = quotations.filter((q) => {
      const qClientName = (q.clientName || "").toLowerCase().trim();
      const qProjectName = (q.projectName || "").toLowerCase().trim();
      const qId = (q.id || q.number || "").toLowerCase();
      return (
        q.projectId === projId ||
        (projName && qProjectName === projName) ||
        (projName && qProjectName.includes(projName)) ||
        (projId && qId.includes(projId.toLowerCase())) ||
        (selectedProposal && (q.id === selectedProposal.id || q.number === selectedProposal.number)) ||
        (leadName && qClientName === leadName) ||
        (leadEmail && (q.clientEmail || "").toLowerCase().trim() === leadEmail)
      );
    });
    if (matched.length > 0) return matched;
    return [
      {
        id: `QT-${selectedProj.id}`,
        number: `QT-${selectedProj.id}`,
        title: `${selectedProj.name || selectedProj.title} Quotation`,
        clientName: leadDetailForm.name,
        projectName: selectedProj.name || selectedProj.title,
        planAName: _optionalChain([selectedProposal, 'optionalAccess', _3 => _3.planAName]) || "PLAN A - Core Package",
        planAPrice: _optionalChain([selectedProposal, 'optionalAccess', _4 => _4.planAPrice]) || selectedProj.budget || 50000,
        planBName: _optionalChain([selectedProposal, 'optionalAccess', _5 => _5.planBName]) || "PLAN B - Premium Package",
        planBPrice: _optionalChain([selectedProposal, 'optionalAccess', _6 => _6.planBPrice]) || Math.round((selectedProj.budget || 50000) * 1.3),
        tax: 18,
        status: "Sent",
        createdDate: new Date().toISOString().split("T")[0]
      }
    ];
  }, [quotations, selectedProposal, selectedProj, leadDetailForm.name, leadDetailForm.email]);

  const selectedQuote = React.useMemo(() => {
    return availableQuotations.find(q => q.id === selectedQuoteId) || availableQuotations[0];
  }, [availableQuotations, selectedQuoteId]);

  const availableInvoices = React.useMemo(() => {
    if (!selectedProj) return [];
    const leadName = (leadDetailForm.name || "").toLowerCase().trim();
    const leadEmail = (leadDetailForm.email || "").toLowerCase().trim();
    const projName = (selectedProj.name || selectedProj.title || "").toLowerCase().trim();
    const projId = (selectedProj.id || "");
    const matched = invoices.filter((i) => {
      const iClientName = (i.clientName || "").toLowerCase().trim();
      const iProjectName = (i.projectName || i.productName || "").toLowerCase().trim();
      const iId = (i.id || i.number || "").toLowerCase();
      return (
        i.projectId === projId ||
        (projName && iProjectName === projName) ||
        (projName && iProjectName.includes(projName)) ||
        (projId && iId.includes(projId.toLowerCase())) ||
        (selectedQuote && (iId.includes((selectedQuote.number || "").toLowerCase()) || (i.proposalId === selectedQuote.id))) ||
        (leadName && iClientName === leadName) ||
        (leadEmail && (i.clientEmail || i.sentToEmail || "").toLowerCase().trim() === leadEmail)
      );
    });
    if (matched.length > 0) return matched;
    return [
      {
        id: `INV-${selectedProj.id}`,
        number: `INV-${selectedProj.id}`,
        clientName: leadDetailForm.name,
        projectName: selectedProj.name || selectedProj.title,
        productName: selectedProj.name || selectedProj.title,
        title: `${selectedProj.name || selectedProj.title} Tax Invoice`,
        amount: _optionalChain([selectedQuote, 'optionalAccess', _7 => _7.planAPrice]) || selectedProj.budget || 50000,
        tax: 18,
        totalDue: Math.round((_optionalChain([selectedQuote, 'optionalAccess', _8 => _8.planAPrice]) || selectedProj.budget || 50000) * 1.18),
        status: "Issued",
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      }
    ];
  }, [invoices, selectedQuote, selectedProj, leadDetailForm.name, leadDetailForm.email]);

  const selectedInvoice = React.useMemo(() => {
    return availableInvoices.find(i => i.id === selectedInvoiceId) || availableInvoices[0];
  }, [availableInvoices, selectedInvoiceId]);

  const [isEditingDoc, setIsEditingDoc] = React.useState(false);
  const [docForm, setDocForm] = React.useState({
    title: "",
    planAPrice: 0,
    planBPrice: 0,
    taxPct: 18,
    overviewNarrative: "",
    paymentTerms: "50% Advance Upon Signing, 50% Final Delivery",
    companyName: "Speshway Solutions Private Limited",
    companyTagline: "Software Development Company",
    companyAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
    companyEmail: "info@speshway.com",
    companyPhone: "+91 91000 06020",
    pdfPrimaryColor: "#4c1d95",
    pdfSecondaryColor: "#7c3aed",
    companyLogoUrl: "/logo.jpg",
    showWatermark: true,
    companyWatermarkText: "SPESHWAY SOLUTIONS PRIVATE LIMITED",
    companyWatermarkOpacity: 0.08,
    companyWatermarkRotation: -15,
    companyWatermarkSize: 26
  });
  const [savedLeadDocuments, setSavedLeadDocuments] = React.useState({});

  React.useEffect(() => {
    if (selectedProposal || selectedQuote || selectedInvoice) {
      setDocForm({
        title: _optionalChain([selectedProposal, 'optionalAccess', _9 => _9.title]) || _optionalChain([selectedQuote, 'optionalAccess', _10 => _10.title]) || `${_optionalChain([selectedProj, 'optionalAccess', _11 => _11.name])} Proposal`,
        planAPrice: _optionalChain([selectedProposal, 'optionalAccess', _12 => _12.planAPrice]) || _optionalChain([selectedQuote, 'optionalAccess', _13 => _13.planAPrice]) || _optionalChain([selectedProj, 'optionalAccess', _14 => _14.budget]) || 50000,
        planBPrice: _optionalChain([selectedProposal, 'optionalAccess', _15 => _15.planBPrice]) || _optionalChain([selectedQuote, 'optionalAccess', _16 => _16.planBPrice]) || Math.round((_optionalChain([selectedProj, 'optionalAccess', _17 => _17.budget]) || 50000) * 1.4),
        taxPct: _optionalChain([selectedQuote, 'optionalAccess', _18 => _18.tax]) || _optionalChain([selectedInvoice, 'optionalAccess', _19 => _19.tax]) || 18,
        overviewNarrative: _optionalChain([selectedProposal, 'optionalAccess', _20 => _20.overviewNarrative]) || _optionalChain([selectedProj, 'optionalAccess', _21 => _21.description]) || "Enterprise Software Solution Proposal.",
        paymentTerms: _optionalChain([selectedProposal, 'optionalAccess', _22 => _22.paymentTerms]) || _optionalChain([selectedQuote, 'optionalAccess', _23 => _23.paymentTerms]) || "50% Advance Upon Signing, 50% Final Handover",
        companyName: _optionalChain([selectedProposal, 'optionalAccess', _24 => _24.companyName]) || _optionalChain([selectedQuote, 'optionalAccess', _25 => _25.companyName]) || _optionalChain([selectedInvoice, 'optionalAccess', _26 => _26.companyName]) || "Speshway Solutions Private Limited",
        companyTagline: _optionalChain([selectedProposal, 'optionalAccess', _27 => _27.companyTagline]) || _optionalChain([selectedQuote, 'optionalAccess', _28 => _28.companyTagline]) || _optionalChain([selectedInvoice, 'optionalAccess', _29 => _29.companyTagline]) || "Software Development Company",
        companyAddress: _optionalChain([selectedProposal, 'optionalAccess', _30 => _30.companyAddress]) || _optionalChain([selectedQuote, 'optionalAccess', _31 => _31.companyAddress]) || _optionalChain([selectedInvoice, 'optionalAccess', _32 => _32.companyAddress]) || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
        companyEmail: _optionalChain([selectedProposal, 'optionalAccess', _33 => _33.companyEmail]) || _optionalChain([selectedQuote, 'optionalAccess', _34 => _34.companyEmail]) || _optionalChain([selectedInvoice, 'optionalAccess', _35 => _35.companyEmail]) || "info@speshway.com",
        companyPhone: _optionalChain([selectedProposal, 'optionalAccess', _36 => _36.companyPhone]) || _optionalChain([selectedQuote, 'optionalAccess', _37 => _37.companyPhone]) || _optionalChain([selectedInvoice, 'optionalAccess', _38 => _38.companyPhone]) || "+91 91000 06020",
        pdfPrimaryColor: _optionalChain([selectedProposal, 'optionalAccess', _39 => _39.pdfPrimaryColor]) || _optionalChain([selectedQuote, 'optionalAccess', _40 => _40.pdfPrimaryColor]) || _optionalChain([selectedInvoice, 'optionalAccess', _41 => _41.pdfPrimaryColor]) || "#4c1d95",
        pdfSecondaryColor: _optionalChain([selectedProposal, 'optionalAccess', _42 => _42.pdfSecondaryColor]) || _optionalChain([selectedQuote, 'optionalAccess', _43 => _43.pdfSecondaryColor]) || _optionalChain([selectedInvoice, 'optionalAccess', _44 => _44.pdfSecondaryColor]) || "#7c3aed",
        companyLogoUrl: _optionalChain([selectedProposal, 'optionalAccess', _45 => _45.companyLogoUrl]) || _optionalChain([selectedQuote, 'optionalAccess', _46 => _46.companyLogoUrl]) || _optionalChain([selectedInvoice, 'optionalAccess', _47 => _47.companyLogoUrl]) || "",
        showWatermark: _optionalChain([selectedProposal, 'optionalAccess', _48 => _48.showWatermark]) !== undefined ? Boolean(selectedProposal.showWatermark) : true,
        companyWatermarkText: _optionalChain([selectedProposal, 'optionalAccess', _49 => _49.companyWatermarkText]) || _optionalChain([selectedQuote, 'optionalAccess', _50 => _50.companyWatermarkText]) || _optionalChain([selectedProposal, 'optionalAccess', _51 => _51.companyName]) || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
        companyWatermarkOpacity: _optionalChain([selectedProposal, 'optionalAccess', _52 => _52.companyWatermarkOpacity]) !== undefined ? Number(selectedProposal.companyWatermarkOpacity) : 0.08,
        companyWatermarkRotation: _optionalChain([selectedProposal, 'optionalAccess', _53 => _53.companyWatermarkRotation]) !== undefined ? Number(selectedProposal.companyWatermarkRotation) : -15,
        companyWatermarkSize: _optionalChain([selectedProposal, 'optionalAccess', _54 => _54.companyWatermarkSize]) !== undefined ? Number(selectedProposal.companyWatermarkSize) : 26
      });
    }
  }, [selectedProj, selectedProposal, selectedQuote, selectedInvoice]);

  // Real-Time Preview Handlers
  const handlePreviewProposal = () => {
    if (!onPreviewDoc) return;
    setActivePreviewType("quotation");
    const propData = {
      title: docForm.title || _optionalChain([selectedProposal, 'optionalAccess', _55 => _55.title]) || `${_optionalChain([selectedProj, 'optionalAccess', _56 => _56.name])} Proposal`,
      projectName: _optionalChain([selectedProj, 'optionalAccess', _57 => _57.name]),
      clientName: leadDetailForm.name,
      companyName: docForm.companyName,
      companyTagline: docForm.companyTagline,
      companyAddress: docForm.companyAddress,
      companyEmail: docForm.companyEmail,
      companyPhone: docForm.companyPhone,
      pdfPrimaryColor: docForm.pdfPrimaryColor,
      pdfSecondaryColor: docForm.pdfSecondaryColor,
      planAPrice: docForm.planAPrice,
      planBPrice: docForm.planBPrice,
      overviewNarrative: docForm.overviewNarrative,
      paymentTerms: docForm.paymentTerms
    };
    const html = generateSpeshwayEstimationPdfHtml(propData, selectedProj, [], 0.65);
    onPreviewDoc(`Master Proposal - ${propData.title}`, html, selectedProposal || propData);
  };

  const handlePreviewQuotation = () => {
    if (!onPreviewDoc) return;
    setActivePreviewType("quotation");
    const quoteData = {
      ...(selectedQuote || selectedProposal || {}),
      id: _optionalChain([selectedQuote, 'optionalAccess', _58 => _58.id]) || _optionalChain([selectedQuote, 'optionalAccess', _59 => _59.number]) || `QT-${_optionalChain([selectedProj, 'optionalAccess', _60 => _60.id]) || leadDetailForm.id}`,
      number: _optionalChain([selectedQuote, 'optionalAccess', _61 => _61.number]) || `QT-${_optionalChain([selectedProj, 'optionalAccess', _62 => _62.id]) || leadDetailForm.id}`,
      title: docForm.title || _optionalChain([selectedQuote, 'optionalAccess', _63 => _63.title]) || `${_optionalChain([selectedProj, 'optionalAccess', _64 => _64.name])} Quotation`,
      projectId: _optionalChain([selectedProj, 'optionalAccess', _65 => _65.id]),
      projectName: _optionalChain([selectedProj, 'optionalAccess', _66 => _66.name]),
      clientName: leadDetailForm.name,
      clientEmail: leadDetailForm.email,
      companyName: docForm.companyName,
      billedByCompany: docForm.companyName,
      companyTagline: docForm.companyTagline,
      companyHeaderSub: docForm.companyTagline,
      billedBySub: docForm.companyTagline,
      companyAddress: docForm.companyAddress,
      billedByAddress: docForm.companyAddress,
      companyEmail: docForm.companyEmail,
      companyPhone: docForm.companyPhone,
      pdfPrimaryColor: docForm.pdfPrimaryColor,
      pdfSecondaryColor: docForm.pdfSecondaryColor,
      companyLogoUrl: docForm.companyLogoUrl,
      showWatermark: docForm.showWatermark,
      companyWatermarkText: docForm.companyWatermarkText,
      companyWatermarkOpacity: docForm.companyWatermarkOpacity,
      companyWatermarkRotation: docForm.companyWatermarkRotation,
      companyWatermarkSize: docForm.companyWatermarkSize,
      planAPrice: docForm.planAPrice,
      rate: docForm.planAPrice,
      planBPrice: docForm.planBPrice,
      tax: docForm.taxPct,
      taxPct: docForm.taxPct,
      overviewNarrative: docForm.overviewNarrative,
      paymentTerms: docForm.paymentTerms
    };
    const updatedQuoteData = getUpdatedLeadDocument(quoteData, "quotation");
    const html = generateSpeshwayEstimationPdfHtml(updatedQuoteData, selectedProj, [], 0.65);
    onPreviewDoc(`Real-Time Quotation - ${updatedQuoteData.number || updatedQuoteData.title}`, html, updatedQuoteData);
  };

  const handlePreviewInvoice = () => {
    if (!onPreviewDoc) return;
    setActivePreviewType("invoice");
    const totalVal = Math.round(docForm.planAPrice * (1 + docForm.taxPct / 100));
    const invData = {
      ...(selectedInvoice || {}),
      id: _optionalChain([selectedInvoice, 'optionalAccess', _67 => _67.id]) || _optionalChain([selectedInvoice, 'optionalAccess', _68 => _68.number]) || `INV-${_optionalChain([selectedQuote, 'optionalAccess', _69 => _69.number]) || _optionalChain([selectedProj, 'optionalAccess', _70 => _70.id]) || leadDetailForm.id}`,
      number: _optionalChain([selectedInvoice, 'optionalAccess', _71 => _71.number]) || `INV-${_optionalChain([selectedQuote, 'optionalAccess', _72 => _72.number]) || _optionalChain([selectedProj, 'optionalAccess', _73 => _73.id]) || leadDetailForm.id}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: _optionalChain([selectedInvoice, 'optionalAccess', _74 => _74.dueDate]) || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      projectId: _optionalChain([selectedProj, 'optionalAccess', _75 => _75.id]),
      projectName: _optionalChain([selectedProj, 'optionalAccess', _76 => _76.name]),
      clientName: leadDetailForm.name,
      clientEmail: leadDetailForm.email,
      productName: _optionalChain([selectedProj, 'optionalAccess', _77 => _77.name]) || docForm.title,
      title: docForm.title || _optionalChain([selectedProj, 'optionalAccess', _78 => _78.name]),
      description: `${_optionalChain([selectedProj, 'optionalAccess', _79 => _79.name]) || docForm.title || "Software"} Web & Mobile Application`,
      companyName: docForm.companyName,
      billedByCompany: docForm.companyName,
      companyTagline: docForm.companyTagline,
      companyHeaderSub: docForm.companyTagline,
      billedBySub: docForm.companyTagline,
      companyAddress: docForm.companyAddress,
      billedByAddress: docForm.companyAddress,
      companyEmail: docForm.companyEmail,
      companyPhone: docForm.companyPhone,
      pdfPrimaryColor: docForm.pdfPrimaryColor || "#003b8e",
      pdfSecondaryColor: docForm.pdfSecondaryColor || "#d97706",
      amount: docForm.planAPrice,
      rate: docForm.planAPrice,
      tax: docForm.taxPct,
      taxPct: docForm.taxPct,
      totalDue: totalVal,
      paymentTerms: docForm.paymentTerms,
      status: "Issued",
      serviceItems: [
        { serviceName: _optionalChain([selectedProj, 'optionalAccess', _80 => _80.name]) || "Enterprise Custom Development Ecosystem", qty: 1, rate: docForm.planAPrice }
      ]
    };
    const updatedInvData = getUpdatedLeadDocument(invData, "invoice");
    const html = generateSpeshwayTaxInvoicePdfHtml(updatedInvData, selectedProj, 0.65);
    onPreviewDoc(`Real-Time Tax Invoice - ${updatedInvData.number}`, html, updatedInvData);
  };

  const getHtmlBody = (html) => {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : html;
  };

  const handleSendLeadPdfEmail = (mode) => {
    if (!onSendEmailDoc) {
      if (showToast) showToast("Email sender is not ready on this page.", "error");
      return;
    }

    const quoteDoc = getUpdatedLeadDocument(buildLeadQuotationDoc(), "quotation");
    const invoiceDoc = getUpdatedLeadDocument(buildLeadInvoiceDoc(), "invoice");
    const quoteHtml = generateSpeshwayEstimationPdfHtml(quoteDoc, selectedProj, [], 1);
    const invoiceHtml = generateSpeshwayTaxInvoicePdfHtml(invoiceDoc, selectedProj, 1);
    const toEmail = (leadDetailForm.email || "").trim();
    if (!toEmail) {
      if (showToast) showToast("Client email is missing. Add the email address before sending.", "error");
      return;
    }

    if (mode === "quotation") {
      onSendEmailDoc(
        toEmail,
        `Quotation ${quoteDoc.number || ""} - ${_optionalChain([selectedProj, 'optionalAccess', _81 => _81.name]) || quoteDoc.title || "Project"}`,
        `Hello ${leadDetailForm.name},\n\nPlease find attached the quotation PDF for ${_optionalChain([selectedProj, 'optionalAccess', _82 => _82.name]) || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
        `Quotation_${(quoteDoc.number || _optionalChain([selectedProj, 'optionalAccess', _83 => _83.id]) || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
        quoteHtml,
        quoteDoc
      );
      if (showToast) showToast(`Quotation email ready for ${toEmail}.`, "info");
      return;
    }

    if (mode === "invoice") {
      onSendEmailDoc(
        toEmail,
        `Tax Invoice ${invoiceDoc.number || ""} - ${_optionalChain([selectedProj, 'optionalAccess', _84 => _84.name]) || invoiceDoc.title || "Project"}`,
        `Hello ${leadDetailForm.name},\n\nPlease find attached the tax invoice PDF for ${_optionalChain([selectedProj, 'optionalAccess', _85 => _85.name]) || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
        `Invoice_${(invoiceDoc.number || _optionalChain([selectedProj, 'optionalAccess', _86 => _86.id]) || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
        invoiceHtml,
        invoiceDoc
      );
      if (showToast) showToast(`Invoice email ready for ${toEmail}.`, "info");
      return;
    }

    const combinedHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Quotation and Invoice</title>
  <style>
    body { margin: 0; background: #f8fafc; font-family: Arial, sans-serif; }
    .doc-page { page-break-after: always; }
    .doc-page:last-child { page-break-after: auto; }
  </style>
</head>
<body>
  <section class="doc-page">${getHtmlBody(quoteHtml)}</section>
  <section class="doc-page">${getHtmlBody(invoiceHtml)}</section>
</body>
</html>`;

    onSendEmailDoc(
      toEmail,
      `Quotation and Tax Invoice - ${_optionalChain([selectedProj, 'optionalAccess', _87 => _87.name]) || quoteDoc.title || "Project"}`,
      `Hello ${leadDetailForm.name},\n\nPlease find attached the quotation and tax invoice PDFs for ${_optionalChain([selectedProj, 'optionalAccess', _88 => _88.name]) || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
      `Quotation_Invoice_${(_optionalChain([selectedProj, 'optionalAccess', _89 => _89.id]) || quoteDoc.number || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
      combinedHtml,
      { ...quoteDoc, bundledInvoice: invoiceDoc, number: `${quoteDoc.number || "Quotation"}_${invoiceDoc.number || "Invoice"}` }
    );
    if (showToast) showToast(`Quotation and invoice email ready for ${toEmail}.`, "info");
  };

  const getLeadClientDocumentKeys = (item, type) => {
    const scopes = Array.from(new Set([
      leadDetailForm.id,
      leadDetailForm.email,
      leadDetailForm.name,
      `lead-${leadDetailForm.id}`
    ].map(value => `${value || ""}`.trim()).filter(Boolean)));
    const refs = Array.from(new Set([
      _optionalChain([item, 'optionalAccess', _90 => _90.number]),
      _optionalChain([item, 'optionalAccess', _91 => _91.id]),
      _optionalChain([item, 'optionalAccess', _92 => _92.refNumber]),
      _optionalChain([selectedProj, 'optionalAccess', _93 => _93.id]),
      _optionalChain([selectedProposal, 'optionalAccess', _94 => _94.id]),
      _optionalChain([selectedQuote, 'optionalAccess', _95 => _95.number]),
      type === "invoice" && _optionalChain([selectedInvoice, 'optionalAccess', _96 => _96.number]),
      type === "invoice" && _optionalChain([selectedQuote, 'optionalAccess', _97 => _97.number]) ? `INV-${selectedQuote.number}` : "",
      type === "quotation" && _optionalChain([selectedQuote, 'optionalAccess', _98 => _98.number]),
      type === "quotation" && _optionalChain([selectedProposal, 'optionalAccess', _99 => _99.id]) ? `QT-${selectedProposal.id}` : ""
    ].map(value => `${value || ""}`.trim()).filter(Boolean)));
    return scopes.flatMap(scope => refs.map(ref => `${scope}::${type}::${ref}`));
  };

  const getUpdatedLeadDocument = (item, type) => {
    const overrideKey = getLeadClientDocumentKeys(item, type).find(key => savedLeadDocuments[key]);
    const merged = overrideKey ? { ...item, ...savedLeadDocuments[overrideKey] } : item;
    const projName = _optionalChain([selectedProj, 'optionalAccess', _100 => _100.name]) || _optionalChain([selectedProj, 'optionalAccess', _101 => _101.title]) || merged.projectName || "Project";
    return {
      ...merged,
      projectId: _optionalChain([selectedProj, 'optionalAccess', _102 => _102.id]) || merged.projectId,
      projectName: projName,
      productName: projName,
      title: `${projName} ${type === "invoice" ? "Tax Invoice" : "Quotation"}`
    };
  };

  const buildLeadQuotationDoc = () => ({
    ...(selectedQuote || selectedProposal || {}),
    id: _optionalChain([selectedQuote, 'optionalAccess', _103 => _103.id]) || _optionalChain([selectedQuote, 'optionalAccess', _104 => _104.number]) || `QT-${_optionalChain([selectedProj, 'optionalAccess', _105 => _105.id]) || leadDetailForm.id}`,
    number: _optionalChain([selectedQuote, 'optionalAccess', _106 => _106.number]) || `QT-${_optionalChain([selectedProj, 'optionalAccess', _107 => _107.id]) || leadDetailForm.id}`,
    title: docForm.title || _optionalChain([selectedQuote, 'optionalAccess', _108 => _108.title]) || `${_optionalChain([selectedProj, 'optionalAccess', _109 => _109.name])} Quotation`,
    projectId: _optionalChain([selectedProj, 'optionalAccess', _110 => _110.id]),
    projectName: _optionalChain([selectedProj, 'optionalAccess', _111 => _111.name]),
    clientName: leadDetailForm.name,
    clientEmail: leadDetailForm.email,
    companyName: docForm.companyName,
    billedByCompany: docForm.companyName,
    companyTagline: docForm.companyTagline,
    companyHeaderSub: docForm.companyTagline,
    billedBySub: docForm.companyTagline,
    companyAddress: docForm.companyAddress,
    billedByAddress: docForm.companyAddress,
    companyEmail: docForm.companyEmail,
    companyPhone: docForm.companyPhone,
    pdfPrimaryColor: docForm.pdfPrimaryColor,
    pdfSecondaryColor: docForm.pdfSecondaryColor,
    companyLogoUrl: docForm.companyLogoUrl,
    showWatermark: docForm.showWatermark,
    companyWatermarkText: docForm.companyWatermarkText,
    companyWatermarkOpacity: docForm.companyWatermarkOpacity,
    companyWatermarkRotation: docForm.companyWatermarkRotation,
    companyWatermarkSize: docForm.companyWatermarkSize,
    planAPrice: docForm.planAPrice,
    rate: docForm.planAPrice,
    planBPrice: docForm.planBPrice,
    tax: docForm.taxPct,
    taxPct: docForm.taxPct,
    overviewNarrative: docForm.overviewNarrative,
    paymentTerms: docForm.paymentTerms,
    updatedAt: new Date().toISOString()
  });

  const buildLeadInvoiceDoc = () => {
    const totalVal = Math.round(docForm.planAPrice * (1 + docForm.taxPct / 100));
    return {
      ...(selectedInvoice || {}),
      id: _optionalChain([selectedInvoice, 'optionalAccess', _112 => _112.id]) || _optionalChain([selectedInvoice, 'optionalAccess', _113 => _113.number]) || `INV-${_optionalChain([selectedQuote, 'optionalAccess', _114 => _114.number]) || _optionalChain([selectedProj, 'optionalAccess', _115 => _115.id]) || leadDetailForm.id}`,
      number: _optionalChain([selectedInvoice, 'optionalAccess', _116 => _116.number]) || `INV-${_optionalChain([selectedQuote, 'optionalAccess', _117 => _117.number]) || _optionalChain([selectedProj, 'optionalAccess', _118 => _118.id]) || leadDetailForm.id}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: _optionalChain([selectedInvoice, 'optionalAccess', _119 => _119.dueDate]) || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      projectId: _optionalChain([selectedProj, 'optionalAccess', _120 => _120.id]),
      projectName: _optionalChain([selectedProj, 'optionalAccess', _121 => _121.name]),
      clientName: leadDetailForm.name,
      clientEmail: leadDetailForm.email,
      productName: _optionalChain([selectedProj, 'optionalAccess', _122 => _122.name]) || docForm.title,
      title: docForm.title || _optionalChain([selectedProj, 'optionalAccess', _123 => _123.name]),
      description: `${_optionalChain([selectedProj, 'optionalAccess', _124 => _124.name]) || docForm.title || "Software"} Web & Mobile Application`,
      companyName: docForm.companyName,
      billedByCompany: docForm.companyName,
      companyTagline: docForm.companyTagline,
      companyHeaderSub: docForm.companyTagline,
      billedBySub: docForm.companyTagline,
      companyAddress: docForm.companyAddress,
      billedByAddress: docForm.companyAddress,
      companyEmail: docForm.companyEmail,
      companyPhone: docForm.companyPhone,
      pdfPrimaryColor: docForm.pdfPrimaryColor || "#003b8e",
      pdfSecondaryColor: docForm.pdfSecondaryColor || "#d97706",
      amount: docForm.planAPrice,
      rate: docForm.planAPrice,
      tax: docForm.taxPct,
      taxPct: docForm.taxPct,
      totalDue: totalVal,
      paymentTerms: docForm.paymentTerms,
      status: "Issued",
      serviceItems: [
        { serviceName: _optionalChain([selectedProj, 'optionalAccess', _125 => _125.name]) || "Enterprise Custom Development Ecosystem", qty: 1, rate: docForm.planAPrice }
      ],
      updatedAt: new Date().toISOString()
    };
  };

  const saveLeadClientDocument = async (item, type) => {
    const overrideKeys = getLeadClientDocumentKeys(item, type);
    setSavedLeadDocuments(prev => {
      const next = { ...prev };
      overrideKeys.forEach(key => {
        next[key] = item;
      });
      return next;
    });
    const documentKey = overrideKeys[0] || `${leadDetailForm.id || leadDetailForm.email}::${type}::${item.number || item.id}`;
    await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(documentKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: documentKey,
        documentKey,
        overrideKeys,
        documentType: type,
        clientScope: leadDetailForm.id || leadDetailForm.email || leadDetailForm.name,
        documentRef: item.number || item.id,
        clientId: leadDetailForm.id,
        clientProjectId: _optionalChain([selectedProj, 'optionalAccess', _126 => _126.id]) || "",
        source: "lead-detail",
        item,
        updatedAt: new Date().toISOString()
      })
    });
  };

  React.useEffect(() => {
    let isMounted = true;
    const loadSavedLeadDocuments = async () => {
      try {
        const res = await fetch(`${API_URL}/crm/client-document`).then(r => r.json());
        const records = Array.isArray(_optionalChain([res, 'optionalAccess', _127 => _127.data])) ? res.data : [];
        const nextDocs = {};
        records.forEach((record) => {
          const type = record.documentType === "invoice" ? "invoice" : record.documentType === "quotation" ? "quotation" : null;
          const item = record.item || record;
          if (!type || !item) return;
          const recordKeys = Array.isArray(record.overrideKeys) && record.overrideKeys.length > 0
            ? record.overrideKeys
            : [record.documentKey || record.id].filter(Boolean);
          const currentKeys = getLeadClientDocumentKeys(item, type);
          const belongsToCurrentLead = recordKeys.some((key) => currentKeys.includes(key));
          if (!belongsToCurrentLead) return;
          recordKeys.forEach((key) => {
            nextDocs[key] = item;
          });
        });
        if (isMounted && Object.keys(nextDocs).length > 0) {
          setSavedLeadDocuments(prev => ({ ...prev, ...nextDocs }));
        }
      } catch (err) {
        console.error("Failed to load saved lead PDF documents", err);
      }
    };
    loadSavedLeadDocuments();
    return () => {
      isMounted = false;
    };
  }, [API_URL, leadDetailForm.id, leadDetailForm.email, leadDetailForm.name, _optionalChain([selectedProj, 'optionalAccess', _128 => _128.id]), _optionalChain([selectedProposal, 'optionalAccess', _129 => _129.id]), _optionalChain([selectedQuote, 'optionalAccess', _130 => _130.number]), _optionalChain([selectedInvoice, 'optionalAccess', _131 => _131.number])]);

  const handleSaveLeadDocumentCustomizations = async () => {
    const quoteDoc = buildLeadQuotationDoc();
    const invoiceDoc = buildLeadInvoiceDoc();
    setIsEditingDoc(false);
    if (showToast) showToast("Quotation and invoice PDF edits saved.", "success");
    if (activePreviewType === "invoice" && onPreviewDoc) {
      const html = generateSpeshwayTaxInvoicePdfHtml(invoiceDoc, selectedProj, 0.65);
      onPreviewDoc(`Real-Time Tax Invoice - ${invoiceDoc.number}`, html, invoiceDoc);
    } else if (onPreviewDoc) {
      const html = generateSpeshwayEstimationPdfHtml(quoteDoc, selectedProj, [], 0.65);
      onPreviewDoc(`Real-Time Quotation - ${quoteDoc.number || quoteDoc.title}`, html, quoteDoc);
    }
    Promise.all([
      saveLeadClientDocument(quoteDoc, "quotation"),
      saveLeadClientDocument(invoiceDoc, "invoice")
    ]).catch(err => {
      console.error("Failed to save lead PDF documents to database", err);
      if (showToast) showToast("Preview updated. Database save failed, please try Save again.", "error");
    });
  };

  const handleSendProposalMail = async () => {
    const updatedForm = { ...leadDetailForm, status: "Won", clientType: "Temporary" };
    setLeadDetailForm(updatedForm);

    if (onMarkTemporaryClient) {
      onMarkTemporaryClient(updatedForm);
    } else {
      handleUpdateLeadStatus(leadDetailForm.id, "Won");
      if (setLeads) {
        setLeads(prev => prev.map(l => l.id === leadDetailForm.id ? updatedForm : l));
      }
    }

    if (showToast) {
      showToast(`Proposal sent to ${leadDetailForm.email || leadDetailForm.name}! Lead moved to Won as Temporary Client immediately.`, "success");
    }
  };

  const handleAcceptProposal = () => {
    handleConvertLead({ ...leadDetailForm, status: "Won", clientType: "Permanent" });
  };

  const [isFullScreen, setIsFullScreen] = React.useState(true);

  return (
    React.createElement('div', { className: `fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-[3px] overflow-y-auto ${isFullScreen ? 'p-0' : 'p-3 sm:p-5'}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 711}}
      , React.createElement('div', { className: `w-full bg-[#fcfbfc] border border-gray-200 shadow-2xl flex flex-col gap-4 transition-all duration-300 ${
        isFullScreen 
          ? 'w-full max-w-none h-full min-h-screen rounded-none p-5 sm:p-7 my-0 overflow-y-auto' 
          : 'max-w-6xl max-h-[95vh] rounded-2xl p-4 sm:p-6 my-4 overflow-y-auto'
      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 712}}
        , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-gray-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 717}}
          , React.createElement('div', { className: "flex flex-col gap-1 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 718}}
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 719}}
              , React.createElement('h2', { className: "text-xl font-extrabold text-[#071E34] tracking-tight truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 720}}, leadDetailForm.name)
              , React.createElement('span', { className: "text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 721}}, "FULL PAGE WORKSPACE"  )
            )
            , React.createElement('div', { className: "flex flex-wrap items-center gap-2 text-[10px] text-gray-500 font-medium"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 723}}
              , React.createElement('span', { className: "flex items-center gap-1 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}}
                , React.createElement(Building2, { size: 11, className: "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 725}} )
                , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 726}}, leadDetailForm.companyName)
              )
              , React.createElement('span', { className: "w-0.5 h-0.5 rounded-full bg-gray-300"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 728}} )
              , React.createElement('span', { className: "text-[9px] font-extrabold text-[#FF5349] bg-red-50 px-1.5 py-0.5 rounded uppercase border border-red-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 729}}
                , _optionalChain([columns, 'access', _132 => _132.find, 'call', _133 => _133(c => c.key === leadDetailForm.status), 'optionalAccess', _134 => _134.title]) || leadDetailForm.status
              )
            )
          )

          , React.createElement('div', { className: "flex flex-wrap items-center justify-end gap-1.5 shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 735}}
            , leadDetailForm.status !== "Lost" && (
              React.createElement('button', {
                onClick: () => {
                  handleUpdateLeadStatus(leadDetailForm.id, "Lost");
                  close();
                },
                className: "px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 bg-white shadow-3xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 737}}

                , React.createElement(AlertCircle, { size: 11, __self: this, __source: {fileName: _jsxFileName, lineNumber: 744}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 745}}, "Mark Lost" )
              )
            )
            , leadDetailForm.status !== "Won" && (
              React.createElement('button', {
                onClick: () => {
                  handleAcceptProposal();
                  close();
                },
                className: "px-3 py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-[10px] font-extrabold transition-all flex items-center gap-1 shadow-xs"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 749}}

                , React.createElement(CheckCircle, { size: 11, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 756}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 757}}, "Make Permanent Client"  )
              )
            )
            , React.createElement('button', {
              onClick: () => {
                handleDeleteLead(leadDetailForm.id);
                close();
              },
              className: "p-1.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all bg-white"         ,
              title: "Move to Trash"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 760}}

              , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 768}} )
            )
            , React.createElement('div', { className: "h-4 w-[1px] bg-gray-200 mx-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 770}} )
            , React.createElement('button', {
              onClick: () => setIsFullScreen(!isFullScreen),
              className: "px-2 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg transition-all bg-white flex items-center gap-1 text-[11px] font-extrabold shadow-3xs cursor-pointer"               ,
              title: isFullScreen ? "Exit Full Page View" : "Expand to Full Page View", __self: this, __source: {fileName: _jsxFileName, lineNumber: 771}}

              , isFullScreen ? React.createElement(Minimize2, { size: 13, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 776}} ) : React.createElement(Maximize2, { size: 13, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 776}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 777}}, isFullScreen ? "Exit Full Page" : "Full Page")
            )
            , React.createElement('div', { className: "h-4 w-[1px] bg-gray-200 mx-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 779}} )
            , React.createElement('button', {
              onClick: () => handleNavigateLeadDetail("prev"),
              className: "p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all bg-white"       ,
              title: "Previous Lead" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 780}}

              , React.createElement(ChevronLeft, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 785}} )
            )
            , React.createElement('button', {
              onClick: () => handleNavigateLeadDetail("next"),
              className: "p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all bg-white"       ,
              title: "Next Lead" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 787}}

              , React.createElement(ChevronRight, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 792}} )
            )
            , React.createElement('button', {
              onClick: close,
              className: "p-1.5 text-gray-400 hover:text-gray-700 text-lg font-bold"    ,
              title: "Close Inspector" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 794}}
, "×"

            )
          )
        )

        /* PROPOSAL SENT SESSION WORKSPACE - Matching Image 2 */
        , React.createElement('div', { className: "p-4 bg-[#06132D] rounded-xl text-white space-y-4 shadow-xl border border-slate-800/40"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 805}}
          , React.createElement('div', { className: "flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800/60"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 806}}
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 807}}
              , React.createElement(Sparkles, { className: "text-[#FF5349] w-5 h-5 animate-pulse"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 808}} )
              , React.createElement('h3', { className: "font-heading font-extrabold text-sm text-white"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 809}}, "Proposal Sent Session & Real-Time PDF Document Workspace"

              )
            )
            , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 813}}
              , React.createElement('select', {
                value: leadDetailForm.status || "Follow-up",
                onChange: (e) => {
                  handleUpdateLeadStatus(leadDetailForm.id, e.target.value);
                  setLeadDetailForm((prev) => ({ ...prev, status: e.target.value }));
                },
                className: "px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-[#FF5349]"          ,
                title: "Update lead status"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 814}}

                , columns.map(col => (
                  React.createElement('option', { key: col.key, value: col.key, className: "bg-[#06132D] text-white" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 824}}, col.title)
                ))
              )
              , React.createElement('button', {
                onClick: () => setIsEditingDoc(!isEditingDoc),
                className: "px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 827}}

                , React.createElement(Edit, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 831}} ), " " , isEditingDoc ? "Close Editor" : "Edit Details"
              )
              , React.createElement('button', {
                onClick: handlePreviewQuotation,
                className: "px-2.5 py-1 rounded-lg bg-[#FF5349]/20 hover:bg-[#FF5349]/30 text-[#FF5349] text-xs font-bold border border-[#FF5349]/30 flex items-center gap-1 transition-all"             ,
                title: "Preview Full Real-Time Quotation PDF"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 833}}

                , React.createElement(Receipt, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 838}} ), " Preview Quotation"
              )
              , React.createElement('button', {
                onClick: handlePreviewInvoice,
                className: "px-2.5 py-1 rounded-lg bg-[#FF5349]/20 hover:bg-[#FF5349]/30 text-[#FF5349] text-xs font-bold border border-[#FF5349]/30 flex items-center gap-1 transition-all"             ,
                title: "Preview Full Real-Time Tax Invoice PDF"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 840}}

                , React.createElement(CreditCard, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 845}} ), " Preview Invoice"
              )
              , React.createElement('button', {
                onClick: () => handleSendLeadPdfEmail("quotation"),
                className: "px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"             ,
                title: "Send quotation PDF by email"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 847}}

                , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 852}} ), " Send Quotation"
              )
              , React.createElement('button', {
                onClick: () => handleSendLeadPdfEmail("invoice"),
                className: "px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"             ,
                title: "Send invoice PDF by email"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 854}}

                , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 859}} ), " Send Invoice"
              )
              , React.createElement('button', {
                onClick: () => handleSendLeadPdfEmail("both"),
                className: "px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"             ,
                title: "Send quotation and invoice in one PDF"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 861}}

                , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 866}} ), " Send Both"
              )
              , leadDetailForm.status === "Won" ? (
                React.createElement('button', {
                  onClick: () => {
                    handleAcceptProposal();
                    close();
                  },
                  className: "px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1 transition-all shadow-md"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 869}}

                  , React.createElement(UserCheck, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 876}} ), " Permanent Client"
                )
              ) : (
                React.createElement('button', {
                  onClick: handleSendProposalMail,
                  className: "px-3 py-1 rounded-lg bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs flex items-center gap-1 transition-all shadow-md"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 879}}

                  , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 883}} ), " Temporary Client"
                )
              )
            )
          )

          /* STEP 1 TO 4 SELECTORS */
          , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 890}}
            /* STEP 1: SELECT PROJECT */
            , React.createElement('div', { className: "bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col gap-1.5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 892}}
              , React.createElement('span', { className: "text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}
                , React.createElement(FolderOpen, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 894}} ), " 1. Select Available Project"
              )
              , React.createElement('select', {
                value: selectedProjId,
                onChange: (e) => {
                  setSelectedProjId(e.target.value);
                  setSelectedProposalId("");
                  setSelectedQuoteId("");
                  setSelectedInvoiceId("");
                },
                className: "w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 896}}

                , allAvailableProjects.map(p => (
                  React.createElement('option', { key: p.id, value: p.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 907}}, p.name || p.title)
                ))
              )
              , React.createElement('div', { className: "text-[10px] text-slate-300 font-mono mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}, "Budget: "
                 , React.createElement('span', { className: "text-emerald-400 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 911}}, "INR " , (_optionalChain([selectedProj, 'optionalAccess', _135 => _135.budget]) || 0).toLocaleString())
              )
            )

            /* STEP 2: SELECT PROPOSAL */
            , React.createElement('div', { className: "bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 916}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 917}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 918}}
                  , React.createElement(FileText, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 919}} ), " 2. Select Proposal"
                )
                , React.createElement('select', {
                  value: selectedProposalId,
                  onChange: (e) => {
                    setSelectedProposalId(e.target.value);
                    setSelectedQuoteId("");
                    setSelectedInvoiceId("");
                  },
                  className: "w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 921}}

                  , availableProposals.map(p => (
                    React.createElement('option', { key: p.id, value: p.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 931}}, p.title || p.number)
                  ))
                )
              )
              , React.createElement('div', { className: "flex items-center justify-between pt-1 border-t border-white/10 text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 935}}
                , React.createElement('span', { className: "text-[#FF5349] font-mono font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 936}}, "INR " , (_optionalChain([selectedProposal, 'optionalAccess', _136 => _136.planAPrice]) || _optionalChain([selectedProj, 'optionalAccess', _137 => _137.budget]) || 0).toLocaleString())
              )
            )

            /* STEP 3: SELECT QUOTATION */
            , React.createElement('div', { className: "bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 941}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 942}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 943}}
                  , React.createElement(Receipt, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 944}} ), " 3. Select Quotation"
                )
                , React.createElement('select', {
                  value: selectedQuoteId,
                  onChange: (e) => {
                    setSelectedQuoteId(e.target.value);
                    setSelectedInvoiceId("");
                  },
                  className: "w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 946}}

                  , availableQuotations.map(q => (
                    React.createElement('option', { key: q.id, value: q.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 955}}, q.number, " - "  , q.title)
                  ))
                )
              )
              , React.createElement('div', { className: "flex items-center justify-between pt-1 border-t border-white/10 text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 959}}
                , React.createElement('span', { className: "text-slate-300 font-mono font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 960}}, _optionalChain([selectedQuote, 'optionalAccess', _138 => _138.number]) || "QT-DEFAULT")
                , React.createElement('button', {
                  onClick: handlePreviewQuotation,
                  className: "text-[#FF5349] hover:underline font-bold flex items-center gap-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 961}}

                  , React.createElement(Eye, { size: 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 965}} ), " View Realtime Quote"
                )
              )
            )

            /* STEP 4: SELECT INVOICE */
            , React.createElement('div', { className: "bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 971}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 972}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 973}}
                  , React.createElement(CreditCard, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 974}} ), " 4. Select Invoice"
                )
                , React.createElement('select', {
                  value: selectedInvoiceId,
                  onChange: (e) => setSelectedInvoiceId(e.target.value),
                  className: "w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 976}}

                  , availableInvoices.map(inv => (
                    React.createElement('option', { key: inv.id, value: inv.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 982}}, inv.number, " (INR "  , _optionalChain([inv, 'access', _139 => _139.totalDue, 'optionalAccess', _140 => _140.toLocaleString, 'call', _141 => _141()]), ")")
                  ))
                )
              )
              , React.createElement('div', { className: "flex items-center justify-between pt-1 border-t border-white/10 text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 986}}
                , React.createElement('span', { className: "text-[#FF5349] font-mono font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 987}}, "INR " , (_optionalChain([selectedInvoice, 'optionalAccess', _142 => _142.totalDue]) || 0).toLocaleString())
                , React.createElement('button', {
                  onClick: handlePreviewInvoice,
                  className: "text-[#FF5349] hover:underline font-bold flex items-center gap-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 988}}

                  , React.createElement(Eye, { size: 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 992}} ), " View Realtime Invoice"
                )
              )
            )
          )

          , isEditingDoc && (() => {
            const inlineLivePdfHtml = generateSpeshwayEstimationPdfHtml(null, {
              ...(selectedQuote || {}),
              title: docForm.title,
              clientName: leadDetailForm.name,
              planAPrice: docForm.planAPrice,
              planBPrice: docForm.planBPrice,
              overviewNarrative: docForm.overviewNarrative,
              companyName: docForm.companyName,
              companyTagline: docForm.companyTagline,
              companyAddress: docForm.companyAddress,
              companyEmail: docForm.companyEmail,
              companyPhone: docForm.companyPhone,
              pdfPrimaryColor: docForm.pdfPrimaryColor,
              pdfSecondaryColor: docForm.pdfSecondaryColor,
              companyLogoUrl: docForm.companyLogoUrl,
              showWatermark: docForm.showWatermark,
              companyWatermarkText: docForm.companyWatermarkText,
              companyWatermarkOpacity: docForm.companyWatermarkOpacity,
              companyWatermarkRotation: docForm.companyWatermarkRotation,
              companyWatermarkSize: docForm.companyWatermarkSize
            }, [], 0.8);

            return (
              React.createElement('div', { className: "bg-white/10 p-4 rounded-xl border border-teal-500/40 space-y-4 animate-in fade-in"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1022}}
                , React.createElement('div', { className: "flex justify-between items-center pb-2 border-b border-teal-500/20"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1023}}
                  , React.createElement('h4', { className: "text-xs font-bold text-amber-300 flex items-center gap-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1024}}
                    , React.createElement(Edit, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1025}} ), " Customizing Document Branding, Company Details & Colors"
                  )
                  , React.createElement('span', { className: "text-[10px] text-teal-300 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1027}}, "Live Sync Editor & Real-time Preview"     )
                )

                , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-12 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1030}}
                  /* LEFT SIDE: EDIT OPTIONS */
                  , React.createElement('div', { className: "lg:col-span-6 space-y-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1032}}
                    /* Company Details Section */
                    , React.createElement('div', { className: "bg-black/20 p-3 rounded-lg border border-white/10 space-y-2.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1034}}
                      , React.createElement('span', { className: "text-[10px] font-extrabold uppercase tracking-wider text-teal-300 block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1035}}, "1. Company & Agency Branding Details"     )
                      , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1036}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1037}}
                          , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1038}}, "Company Business Name"  )
                          , React.createElement('input', {
                            type: "text",
                            value: docForm.companyName,
                            onChange: e => setDocForm({ ...docForm, companyName: e.target.value }),
                            className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs font-bold"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1039}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1046}}
                          , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1047}}, "Company Subtitle / Tagline"   )
                          , React.createElement('input', {
                            type: "text",
                            value: docForm.companyTagline,
                            onChange: e => setDocForm({ ...docForm, companyTagline: e.target.value }),
                            className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1048}}
                          )
                        )
                      )
                      , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1056}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1057}}
                          , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1058}}, "Company Email" )
                          , React.createElement('input', {
                            type: "email",
                            value: docForm.companyEmail,
                            onChange: e => setDocForm({ ...docForm, companyEmail: e.target.value }),
                            className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1059}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1066}}
                          , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1067}}, "Company Phone" )
                          , React.createElement('input', {
                            type: "text",
                            value: docForm.companyPhone,
                            onChange: e => setDocForm({ ...docForm, companyPhone: e.target.value }),
                            className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1068}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1075}}
                          , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1076}}, "Company Address" )
                          , React.createElement('input', {
                            type: "text",
                            value: docForm.companyAddress,
                            onChange: e => setDocForm({ ...docForm, companyAddress: e.target.value }),
                            className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1077}}
                          )
                        )
                      )
                    )

                    /* PDF Theme Colors & Accent Palette */
                    , React.createElement('div', { className: "bg-black/20 p-3 rounded-lg border border-white/10 space-y-2.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1088}}
                      , React.createElement('span', { className: "text-[10px] font-extrabold uppercase tracking-wider text-purple-300 block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1089}}, "2. Document Theme & Accent Colors"     )
                      , React.createElement('div', { className: "flex items-center gap-3 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1090}}
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1091}}
                          , React.createElement('label', { className: "text-[10px] text-slate-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1092}}, "Primary Color:" )
                          , React.createElement('input', {
                            type: "color",
                            value: docForm.pdfPrimaryColor,
                            onChange: e => setDocForm({ ...docForm, pdfPrimaryColor: e.target.value }),
                            className: "w-8 h-8 rounded border-none cursor-pointer bg-transparent"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1093}}
                          )
                          , React.createElement('span', { className: "font-mono text-xs text-amber-300 font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1099}}, docForm.pdfPrimaryColor)
                        )

                        , React.createElement('div', { className: "flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1102}}
                          , React.createElement('span', { className: "text-[10px] text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1103}}, "Quick Presets:" )
                          , [
                            { name: "Purple", hex: "#4c1d95" },
                            { name: "Navy", hex: "#003b8e" },
                            { name: "Teal", hex: "#0E9F8A" },
                            { name: "Crimson", hex: "#DC2626" },
                            { name: "Sapphire", hex: "#2563EB" },
                            { name: "Emerald", hex: "#059669" },
                            { name: "Slate", hex: "#0F172A" }
                          ].map(p => (
                            React.createElement('button', {
                              key: p.hex,
                              type: "button",
                              onClick: () => setDocForm({ ...docForm, pdfPrimaryColor: p.hex }),
                              style: { backgroundColor: p.hex },
                              title: p.name,
                              className: `w-6 h-6 rounded-full border-2 transition-all ${docForm.pdfPrimaryColor === p.hex ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1113}}
                            )
                          ))
                        )
                      )
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-3 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1126}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1127}}
                        , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1128}}, "Proposal Title" )
                        , React.createElement('input', {
                          type: "text",
                          value: docForm.title,
                          onChange: e => setDocForm({ ...docForm, title: e.target.value }),
                          className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1129}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1136}}
                        , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1137}}, "Plan A Rate (INR)"   )
                        , React.createElement('input', {
                          type: "number",
                          value: docForm.planAPrice,
                          onChange: e => setDocForm({ ...docForm, planAPrice: Number(e.target.value) }),
                          className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1138}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1145}}
                        , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1146}}, "Plan B Rate (INR)"   )
                        , React.createElement('input', {
                          type: "number",
                          value: docForm.planBPrice,
                          onChange: e => setDocForm({ ...docForm, planBPrice: Number(e.target.value) }),
                          className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1147}}
                        )
                      )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1156}}
                      , React.createElement('label', { className: "block text-[10px] text-slate-300 mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1157}}, "Overview Narrative" )
                      , React.createElement('textarea', {
                        rows: 2,
                        value: docForm.overviewNarrative,
                        onChange: e => setDocForm({ ...docForm, overviewNarrative: e.target.value }),
                        className: "w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs resize-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1158}}
                      )
                    )

                    , React.createElement('div', { className: "flex justify-end pt-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1166}}
                      , React.createElement('button', {
                        onClick: handleSaveLeadDocumentCustomizations,
                        className: "px-4 py-2 bg-teal-500 text-slate-950 text-xs font-extrabold rounded-lg hover:bg-teal-400 flex items-center gap-1.5 shadow-md cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1167}}

                        , React.createElement(Save, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1171}} ), " Save Customizations"
                      )
                    )
                  )

                  /* RIGHT SIDE: REALTIME LIVE PDF PREVIEW */
                  , React.createElement('div', { className: "lg:col-span-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col min-h-[420px]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1177}}
                    , React.createElement('div', { className: "flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] font-bold text-teal-300"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1178}}
                      , React.createElement('span', { className: "flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1179}}, React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1179}} ), " REAL-TIME LIVE PREVIEW"   )
                      , React.createElement('span', { className: "text-[9px] font-mono text-slate-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1180}}, "Syncs as you type"   )
                    )
                    , React.createElement('div', { className: "flex-1 mt-2 rounded-lg overflow-hidden bg-slate-900 border border-slate-800"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1182}}
                      , React.createElement('iframe', {
                        srcDoc: inlineLivePdfHtml,
                        className: "w-full h-full min-h-[380px] border-none bg-slate-900"    ,
                        title: "Inline Live Realtime PDF Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1183}}
                      )
                    )
                  )
                )
              )
            );
          })()
        )

        , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-5 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1196}}
          , React.createElement('div', { className: "lg:col-span-3 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1197}}
            , React.createElement('h3', { className: "font-heading font-extrabold text-xs text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1198}}, "Lead Details" )
            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1199}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1200}}, "Contact Name" )
              , React.createElement('input', { type: "text", value: leadDetailForm.name, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, name: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1201}} )
            )

            , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1204}}
              , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1205}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1206}}, "Company")
                , React.createElement('input', { type: "text", value: leadDetailForm.companyName, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, companyName: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1207}} )
              )
              , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1209}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1210}}, "Phone")
                , React.createElement('input', { type: "text", value: leadDetailForm.phone, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, phone: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1211}} )
              )
            )

            , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1215}}
              , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1216}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1217}}, "Email")
                , React.createElement('input', { type: "email", value: leadDetailForm.email, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, email: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1218}} )
              )
              , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1220}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1221}}, "Source")
                , React.createElement('select', { value: leadDetailForm.source, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, source: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1222}}
                  , ["Other", "Website", "Facebook", "Instagram", "Google Ads", "WhatsApp", "Phone call", "Referral", "Direct enquiry"].map(source => (
                    React.createElement('option', { key: source, value: source, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1224}}, source)
                  ))
                )
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1230}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1231}}, "Estimated Value (INR)"  )
              , React.createElement('input', { type: "number", value: leadDetailForm.expectedBudget || 0, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, expectedBudget: Number(e.target.value) }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-mono font-medium text-gray-800 bg-gray-50/20"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1232}} )
            )

            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1235}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1236}}, "Notes")
              , React.createElement('textarea', { rows: 3, value: leadDetailForm.notes, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, notes: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20 resize-none"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1237}} )
            )

            , React.createElement('div', { className: "flex justify-end pt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1240}}
              , React.createElement('button', { onClick: handleSaveLeadDetailChanges, className: "px-4 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-xs font-extrabold transition-all shadow-md"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1241}}, "Save Changes"

              )
            )
          )

          , React.createElement('div', { className: "lg:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1247}}
            , React.createElement('h3', { className: "font-heading font-extrabold text-xs text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1248}}, "Pipeline")
            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1249}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1250}}, "Stage")
              , React.createElement('select', { value: leadDetailForm.status, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, status: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1251}}
                , columns.map(col => React.createElement('option', { key: col.key, value: col.key, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1252}}, col.title))
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1256}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1257}}, "Assigned To" )
              , React.createElement('select', { value: leadDetailForm.assignedEmployee, onChange: (e) => setLeadDetailForm({ ...leadDetailForm, assignedEmployee: e.target.value }), className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1258}}
                , React.createElement('option', { value: "Unassigned", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1259}}, "Unassigned")
                , employees.map(emp => React.createElement('option', { key: emp.id, value: emp.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1260}}, emp.name))
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1264}}
              , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1265}}, "Follow-up")
              , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1266}}
                , React.createElement('input', { type: "date", value: leadDetailForm.nextFollowUpDate || "", onChange: (e) => setLeadDetailForm({ ...leadDetailForm, nextFollowUpDate: e.target.value }), className: "w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-teal-500 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1267}} )
                , React.createElement('input', { type: "text", placeholder: "Time", className: "w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-teal-500"           , defaultValue: "12:00 PM" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1268}} )
              )
            )

            , React.createElement('div', { className: "p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[9px] text-amber-900 leading-normal"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1272}}
              , React.createElement(AlertCircle, { size: 12, className: "text-amber-700 shrink-0 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1273}} )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1274}}
                , React.createElement('strong', { className: "text-amber-950 font-bold block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1275}}, "Automatic reminders" ), "are an Ultra feature. The date is saved; upgrade to get notified."

              )
            )

            , React.createElement('div', { className: "mt-1.5 pt-2.5 border-t border-gray-100 flex flex-col text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1280}}
              , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1281}}
                , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1282}}, "Value")
                , React.createElement('strong', { className: "font-mono font-extrabold text-[#071E34] text-right break-words"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1283}}, "INR " , _optionalChain([leadDetailForm, 'access', _143 => _143.expectedBudget, 'optionalAccess', _144 => _144.toLocaleString, 'call', _145 => _145()]) || "0")
              )
              , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1285}}
                , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1286}}, "Source")
                , React.createElement('span', { className: "text-gray-700 font-semibold text-right break-words"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1287}}, leadDetailForm.source)
              )
              , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1289}}
                , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1290}}, "Phone")
                , React.createElement('span', { className: "text-teal-600 font-semibold font-mono select-all min-w-0 text-right break-all"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1291}}, leadDetailForm.phone)
              )
              , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start py-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1293}}
                , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1294}}, "Email")
                , React.createElement('span', { className: "text-gray-600 font-mono text-[9px] leading-relaxed break-all text-right select-all min-w-0"       , title: leadDetailForm.email, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1295}}, leadDetailForm.email)
              )
            )
          )
        )
      )
    )
  );
}
