import * as React from "react";
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

interface LeadDetailInspectorModalProps {
  leadDetailForm: any;
  setLeadDetailForm: React.Dispatch<React.SetStateAction<any>>;
  setSelectedLeadForDetail: React.Dispatch<React.SetStateAction<any>>;
  columns: any[];
  employees: any[];
  handleUpdateLeadStatus: (leadId: string, newStatus: string) => void;
  handleConvertLead: (lead: any) => void;
  handleDeleteLead: (id: string) => void;
  handleNavigateLeadDetail: (dir: "next" | "prev") => void;
  handleSaveLeadDetailChanges: () => void;
  projects?: any[];
  ourProjects?: any[];
  quotations?: any[];
  invoices?: any[];
  setClients?: React.Dispatch<React.SetStateAction<any[]>>;
  setLeads?: React.Dispatch<React.SetStateAction<any[]>>;
  showToast?: (msg: string, type: "success" | "error" | "info") => void;
  API_URL?: string;
  onPreviewDoc?: (title: string, html: string, item: any) => void;
  onSendEmailDoc?: (toEmail: string, subject: string, textContent: string, fileName: string, htmlContent: string, item: any) => void;
  onMarkTemporaryClient?: (lead: any) => void;
}

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
}: LeadDetailInspectorModalProps) {
  if (!leadDetailForm) return null;

  const close = () => {
    setSelectedLeadForDetail(null);
    setLeadDetailForm(null);
  };

  const allAvailableProjects = React.useMemo(() => {
    const combined = [
      ...projects,
      ...ourProjects.map((op: any) => ({
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

  const [selectedProjId, setSelectedProjId] = React.useState<string>(allAvailableProjects[0]?.id || "");
  const [selectedProposalId, setSelectedProposalId] = React.useState<string>("");
  const [selectedQuoteId, setSelectedQuoteId] = React.useState<string>("");
  const [selectedInvoiceId, setSelectedInvoiceId] = React.useState<string>("");
  const [activePreviewType, setActivePreviewType] = React.useState<"quotation" | "invoice">("quotation");

  const selectedProj = React.useMemo(() => {
    return allAvailableProjects.find(p => p.id === selectedProjId) || allAvailableProjects[0];
  }, [allAvailableProjects, selectedProjId]);

  const availableProposals = React.useMemo(() => {
    if (!selectedProj) return [];
    const leadName = (leadDetailForm.name || "").toLowerCase().trim();
    const leadEmail = (leadDetailForm.email || "").toLowerCase().trim();
    const projName = (selectedProj.name || selectedProj.title || "").toLowerCase().trim();
    const projId = (selectedProj.id || "");
    const matched = quotations.filter((q: any) => {
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
    const matched = quotations.filter((q: any) => {
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
        planAName: selectedProposal?.planAName || "PLAN A - Core Package",
        planAPrice: selectedProposal?.planAPrice || selectedProj.budget || 50000,
        planBName: selectedProposal?.planBName || "PLAN B - Premium Package",
        planBPrice: selectedProposal?.planBPrice || Math.round((selectedProj.budget || 50000) * 1.3),
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
    const matched = invoices.filter((i: any) => {
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
        amount: selectedQuote?.planAPrice || selectedProj.budget || 50000,
        tax: 18,
        totalDue: Math.round((selectedQuote?.planAPrice || selectedProj.budget || 50000) * 1.18),
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
  const [savedLeadDocuments, setSavedLeadDocuments] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (selectedProposal || selectedQuote || selectedInvoice) {
      setDocForm({
        title: selectedProposal?.title || selectedQuote?.title || `${selectedProj?.name} Proposal`,
        planAPrice: selectedProposal?.planAPrice || selectedQuote?.planAPrice || selectedProj?.budget || 50000,
        planBPrice: selectedProposal?.planBPrice || selectedQuote?.planBPrice || Math.round((selectedProj?.budget || 50000) * 1.4),
        taxPct: selectedQuote?.tax || selectedInvoice?.tax || 18,
        overviewNarrative: selectedProposal?.overviewNarrative || selectedProj?.description || "Enterprise Software Solution Proposal.",
        paymentTerms: selectedProposal?.paymentTerms || selectedQuote?.paymentTerms || "50% Advance Upon Signing, 50% Final Handover",
        companyName: selectedProposal?.companyName || selectedQuote?.companyName || selectedInvoice?.companyName || "Speshway Solutions Private Limited",
        companyTagline: selectedProposal?.companyTagline || selectedQuote?.companyTagline || selectedInvoice?.companyTagline || "Software Development Company",
        companyAddress: selectedProposal?.companyAddress || selectedQuote?.companyAddress || selectedInvoice?.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
        companyEmail: selectedProposal?.companyEmail || selectedQuote?.companyEmail || selectedInvoice?.companyEmail || "info@speshway.com",
        companyPhone: selectedProposal?.companyPhone || selectedQuote?.companyPhone || selectedInvoice?.companyPhone || "+91 91000 06020",
        pdfPrimaryColor: selectedProposal?.pdfPrimaryColor || selectedQuote?.pdfPrimaryColor || selectedInvoice?.pdfPrimaryColor || "#4c1d95",
        pdfSecondaryColor: selectedProposal?.pdfSecondaryColor || selectedQuote?.pdfSecondaryColor || selectedInvoice?.pdfSecondaryColor || "#7c3aed",
        companyLogoUrl: selectedProposal?.companyLogoUrl || selectedQuote?.companyLogoUrl || selectedInvoice?.companyLogoUrl || "",
        showWatermark: selectedProposal?.showWatermark !== undefined ? Boolean(selectedProposal.showWatermark) : true,
        companyWatermarkText: selectedProposal?.companyWatermarkText || selectedQuote?.companyWatermarkText || selectedProposal?.companyName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
        companyWatermarkOpacity: selectedProposal?.companyWatermarkOpacity !== undefined ? Number(selectedProposal.companyWatermarkOpacity) : 0.08,
        companyWatermarkRotation: selectedProposal?.companyWatermarkRotation !== undefined ? Number(selectedProposal.companyWatermarkRotation) : -15,
        companyWatermarkSize: selectedProposal?.companyWatermarkSize !== undefined ? Number(selectedProposal.companyWatermarkSize) : 26
      });
    }
  }, [selectedProj, selectedProposal, selectedQuote, selectedInvoice]);

  // Real-Time Preview Handlers
  const handlePreviewProposal = () => {
    if (!onPreviewDoc) return;
    setActivePreviewType("quotation");
    const propData = {
      title: docForm.title || selectedProposal?.title || `${selectedProj?.name} Proposal`,
      projectName: selectedProj?.name,
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
      id: selectedQuote?.id || selectedQuote?.number || `QT-${selectedProj?.id || leadDetailForm.id}`,
      number: selectedQuote?.number || `QT-${selectedProj?.id || leadDetailForm.id}`,
      title: docForm.title || selectedQuote?.title || `${selectedProj?.name} Quotation`,
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
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
      id: selectedInvoice?.id || selectedInvoice?.number || `INV-${selectedQuote?.number || selectedProj?.id || leadDetailForm.id}`,
      number: selectedInvoice?.number || `INV-${selectedQuote?.number || selectedProj?.id || leadDetailForm.id}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: selectedInvoice?.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      clientName: leadDetailForm.name,
      clientEmail: leadDetailForm.email,
      productName: selectedProj?.name || docForm.title,
      title: docForm.title || selectedProj?.name,
      description: `${selectedProj?.name || docForm.title || "Software"} Web & Mobile Application`,
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
        { serviceName: selectedProj?.name || "Enterprise Custom Development Ecosystem", qty: 1, rate: docForm.planAPrice }
      ]
    };
    const updatedInvData = getUpdatedLeadDocument(invData, "invoice");
    const html = generateSpeshwayTaxInvoicePdfHtml(updatedInvData, selectedProj, 0.65);
    onPreviewDoc(`Real-Time Tax Invoice - ${updatedInvData.number}`, html, updatedInvData);
  };

  const getHtmlBody = (html: string) => {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : html;
  };

  const handleSendLeadPdfEmail = (mode: "quotation" | "invoice" | "both") => {
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
        `Quotation ${quoteDoc.number || ""} - ${selectedProj?.name || quoteDoc.title || "Project"}`,
        `Hello ${leadDetailForm.name},\n\nPlease find attached the quotation PDF for ${selectedProj?.name || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
        `Quotation_${(quoteDoc.number || selectedProj?.id || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
        quoteHtml,
        quoteDoc
      );
      if (showToast) showToast(`Quotation email ready for ${toEmail}.`, "info");
      return;
    }

    if (mode === "invoice") {
      onSendEmailDoc(
        toEmail,
        `Tax Invoice ${invoiceDoc.number || ""} - ${selectedProj?.name || invoiceDoc.title || "Project"}`,
        `Hello ${leadDetailForm.name},\n\nPlease find attached the tax invoice PDF for ${selectedProj?.name || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
        `Invoice_${(invoiceDoc.number || selectedProj?.id || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
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
      `Quotation and Tax Invoice - ${selectedProj?.name || quoteDoc.title || "Project"}`,
      `Hello ${leadDetailForm.name},\n\nPlease find attached the quotation and tax invoice PDFs for ${selectedProj?.name || "your project"}.\n\nBest regards,\nSpeshway Solutions`,
      `Quotation_Invoice_${(selectedProj?.id || quoteDoc.number || "Project").replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
      combinedHtml,
      { ...quoteDoc, bundledInvoice: invoiceDoc, number: `${quoteDoc.number || "Quotation"}_${invoiceDoc.number || "Invoice"}` }
    );
    if (showToast) showToast(`Quotation and invoice email ready for ${toEmail}.`, "info");
  };

  const getLeadClientDocumentKeys = (item: any, type: "quotation" | "invoice") => {
    const scopes = Array.from(new Set([
      leadDetailForm.id,
      leadDetailForm.email,
      leadDetailForm.name,
      `lead-${leadDetailForm.id}`
    ].map(value => `${value || ""}`.trim()).filter(Boolean)));
    const refs = Array.from(new Set([
      item?.number,
      item?.id,
      item?.refNumber,
      selectedProj?.id,
      selectedProposal?.id,
      selectedQuote?.number,
      type === "invoice" && selectedInvoice?.number,
      type === "invoice" && selectedQuote?.number ? `INV-${selectedQuote.number}` : "",
      type === "quotation" && selectedQuote?.number,
      type === "quotation" && selectedProposal?.id ? `QT-${selectedProposal.id}` : ""
    ].map(value => `${value || ""}`.trim()).filter(Boolean)));
    return scopes.flatMap(scope => refs.map(ref => `${scope}::${type}::${ref}`));
  };

  const getUpdatedLeadDocument = (item: any, type: "quotation" | "invoice") => {
    const overrideKey = getLeadClientDocumentKeys(item, type).find(key => savedLeadDocuments[key]);
    const merged = overrideKey ? { ...item, ...savedLeadDocuments[overrideKey] } : item;
    const projName = selectedProj?.name || selectedProj?.title || merged.projectName || "Project";
    return {
      ...merged,
      projectId: selectedProj?.id || merged.projectId,
      projectName: projName,
      productName: projName,
      title: `${projName} ${type === "invoice" ? "Tax Invoice" : "Quotation"}`
    };
  };

  const buildLeadQuotationDoc = () => ({
    ...(selectedQuote || selectedProposal || {}),
    id: selectedQuote?.id || selectedQuote?.number || `QT-${selectedProj?.id || leadDetailForm.id}`,
    number: selectedQuote?.number || `QT-${selectedProj?.id || leadDetailForm.id}`,
    title: docForm.title || selectedQuote?.title || `${selectedProj?.name} Quotation`,
    projectId: selectedProj?.id,
    projectName: selectedProj?.name,
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
      id: selectedInvoice?.id || selectedInvoice?.number || `INV-${selectedQuote?.number || selectedProj?.id || leadDetailForm.id}`,
      number: selectedInvoice?.number || `INV-${selectedQuote?.number || selectedProj?.id || leadDetailForm.id}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: selectedInvoice?.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      projectId: selectedProj?.id,
      projectName: selectedProj?.name,
      clientName: leadDetailForm.name,
      clientEmail: leadDetailForm.email,
      productName: selectedProj?.name || docForm.title,
      title: docForm.title || selectedProj?.name,
      description: `${selectedProj?.name || docForm.title || "Software"} Web & Mobile Application`,
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
        { serviceName: selectedProj?.name || "Enterprise Custom Development Ecosystem", qty: 1, rate: docForm.planAPrice }
      ],
      updatedAt: new Date().toISOString()
    };
  };

  const saveLeadClientDocument = async (item: any, type: "quotation" | "invoice") => {
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
        clientProjectId: selectedProj?.id || "",
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
        const records = Array.isArray(res?.data) ? res.data : [];
        const nextDocs: Record<string, any> = {};
        records.forEach((record: any) => {
          const type = record.documentType === "invoice" ? "invoice" : record.documentType === "quotation" ? "quotation" : null;
          const item = record.item || record;
          if (!type || !item) return;
          const recordKeys = Array.isArray(record.overrideKeys) && record.overrideKeys.length > 0
            ? record.overrideKeys
            : [record.documentKey || record.id].filter(Boolean);
          const currentKeys = getLeadClientDocumentKeys(item, type);
          const belongsToCurrentLead = recordKeys.some((key: string) => currentKeys.includes(key));
          if (!belongsToCurrentLead) return;
          recordKeys.forEach((key: string) => {
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
  }, [API_URL, leadDetailForm.id, leadDetailForm.email, leadDetailForm.name, selectedProj?.id, selectedProposal?.id, selectedQuote?.number, selectedInvoice?.number]);

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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-[3px] overflow-y-auto ${isFullScreen ? 'p-0' : 'p-3 sm:p-5'}`}>
      <div className={`w-full bg-[#fcfbfc] border border-gray-200 shadow-2xl flex flex-col gap-4 transition-all duration-300 ${
        isFullScreen 
          ? 'w-full max-w-none h-full min-h-screen rounded-none p-5 sm:p-7 my-0 overflow-y-auto' 
          : 'max-w-6xl max-h-[95vh] rounded-2xl p-4 sm:p-6 my-4 overflow-y-auto'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#071E34] tracking-tight truncate">{leadDetailForm.name}</h2>
              <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">FULL PAGE WORKSPACE</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 font-medium">
              <span className="flex items-center gap-1 min-w-0">
                <Building2 size={11} className="text-gray-400" />
                <span className="truncate">{leadDetailForm.companyName}</span>
              </span>
              <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
              <span className="text-[9px] font-extrabold text-[#FF5349] bg-red-50 px-1.5 py-0.5 rounded uppercase border border-red-200">
                {columns.find(c => c.key === leadDetailForm.status)?.title || leadDetailForm.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
            {leadDetailForm.status !== "Lost" && (
              <button
                onClick={() => {
                  handleUpdateLeadStatus(leadDetailForm.id, "Lost");
                  close();
                }}
                className="px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 bg-white shadow-3xs"
              >
                <AlertCircle size={11} />
                <span>Mark Lost</span>
              </button>
            )}
            {leadDetailForm.status !== "Won" && (
              <button
                onClick={() => {
                  handleAcceptProposal();
                  close();
                }}
                className="px-3 py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-[10px] font-extrabold transition-all flex items-center gap-1 shadow-xs"
              >
                <CheckCircle size={11} className="text-white" />
                <span>Make Permanent Client</span>
              </button>
            )}
            <button
              onClick={() => {
                handleDeleteLead(leadDetailForm.id);
                close();
              }}
              className="p-1.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all bg-white"
              title="Move to Trash"
            >
              <Trash2 size={12} />
            </button>
            <div className="h-4 w-[1px] bg-gray-200 mx-0.5" />
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="px-2 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg transition-all bg-white flex items-center gap-1 text-[11px] font-extrabold shadow-3xs cursor-pointer"
              title={isFullScreen ? "Exit Full Page View" : "Expand to Full Page View"}
            >
              {isFullScreen ? <Minimize2 size={13} className="text-teal-600" /> : <Maximize2 size={13} className="text-teal-600" />}
              <span>{isFullScreen ? "Exit Full Page" : "Full Page"}</span>
            </button>
            <div className="h-4 w-[1px] bg-gray-200 mx-0.5" />
            <button
              onClick={() => handleNavigateLeadDetail("prev")}
              className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all bg-white"
              title="Previous Lead"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => handleNavigateLeadDetail("next")}
              className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all bg-white"
              title="Next Lead"
            >
              <ChevronRight size={12} />
            </button>
            <button
              onClick={close}
              className="p-1.5 text-gray-400 hover:text-gray-700 text-lg font-bold"
              title="Close Inspector"
            >
              &times;
            </button>
          </div>
        </div>

        {/* PROPOSAL SENT SESSION WORKSPACE - Matching Image 2 */}
        <div className="p-4 bg-[#06132D] rounded-xl text-white space-y-4 shadow-xl border border-slate-800/40">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#FF5349] w-5 h-5 animate-pulse" />
              <h3 className="font-heading font-extrabold text-sm text-white">
                Proposal Sent Session & Real-Time PDF Document Workspace
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={leadDetailForm.status || "Follow-up"}
                onChange={(e) => {
                  handleUpdateLeadStatus(leadDetailForm.id, e.target.value);
                  setLeadDetailForm((prev: any) => ({ ...prev, status: e.target.value }));
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-[#FF5349]"
                title="Update lead status"
              >
                {columns.map(col => (
                  <option key={col.key} value={col.key} className="bg-[#06132D] text-white">{col.title}</option>
                ))}
              </select>
              <button
                onClick={() => setIsEditingDoc(!isEditingDoc)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"
              >
                <Edit size={12} /> {isEditingDoc ? "Close Editor" : "Edit Details"}
              </button>
              <button
                onClick={handlePreviewQuotation}
                className="px-2.5 py-1 rounded-lg bg-[#FF5349]/20 hover:bg-[#FF5349]/30 text-[#FF5349] text-xs font-bold border border-[#FF5349]/30 flex items-center gap-1 transition-all"
                title="Preview Full Real-Time Quotation PDF"
              >
                <Receipt size={12} /> Preview Quotation
              </button>
              <button
                onClick={handlePreviewInvoice}
                className="px-2.5 py-1 rounded-lg bg-[#FF5349]/20 hover:bg-[#FF5349]/30 text-[#FF5349] text-xs font-bold border border-[#FF5349]/30 flex items-center gap-1 transition-all"
                title="Preview Full Real-Time Tax Invoice PDF"
              >
                <CreditCard size={12} /> Preview Invoice
              </button>
              <button
                onClick={() => handleSendLeadPdfEmail("quotation")}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"
                title="Send quotation PDF by email"
              >
                <Mail size={12} /> Send Quotation
              </button>
              <button
                onClick={() => handleSendLeadPdfEmail("invoice")}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"
                title="Send invoice PDF by email"
              >
                <Mail size={12} /> Send Invoice
              </button>
              <button
                onClick={() => handleSendLeadPdfEmail("both")}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"
                title="Send quotation and invoice in one PDF"
              >
                <Mail size={12} /> Send Both
              </button>
              {leadDetailForm.status === "Won" ? (
                <button
                  onClick={() => {
                    handleAcceptProposal();
                    close();
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1 transition-all shadow-md"
                >
                  <UserCheck size={12} /> Permanent Client
                </button>
              ) : (
                <button
                  onClick={handleSendProposalMail}
                  className="px-3 py-1 rounded-lg bg-[#FF5349] hover:bg-[#F05454] text-white font-extrabold text-xs flex items-center gap-1 transition-all shadow-md"
                >
                  <Mail size={12} /> Temporary Client
                </button>
              )}
            </div>
          </div>

          {/* STEP 1 TO 4 SELECTORS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* STEP 1: SELECT PROJECT */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1">
                <FolderOpen size={12} /> 1. Select Available Project
              </span>
              <select
                value={selectedProjId}
                onChange={(e) => {
                  setSelectedProjId(e.target.value);
                  setSelectedProposalId("");
                  setSelectedQuoteId("");
                  setSelectedInvoiceId("");
                }}
                className="w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs"
              >
                {allAvailableProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name || p.title}</option>
                ))}
              </select>
              <div className="text-[10px] text-slate-300 font-mono mt-1">
                Budget: <span className="text-emerald-400 font-bold">INR {(selectedProj?.budget || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* STEP 2: SELECT PROPOSAL */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5">
              <div>
                <span className="text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1">
                  <FileText size={12} /> 2. Select Proposal
                </span>
                <select
                  value={selectedProposalId}
                  onChange={(e) => {
                    setSelectedProposalId(e.target.value);
                    setSelectedQuoteId("");
                    setSelectedInvoiceId("");
                  }}
                  className="w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"
                >
                  {availableProposals.map(p => (
                    <option key={p.id} value={p.id}>{p.title || p.number}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-[#FF5349] font-mono font-bold">INR {(selectedProposal?.planAPrice || selectedProj?.budget || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* STEP 3: SELECT QUOTATION */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5">
              <div>
                <span className="text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1">
                  <Receipt size={12} /> 3. Select Quotation
                </span>
                <select
                  value={selectedQuoteId}
                  onChange={(e) => {
                    setSelectedQuoteId(e.target.value);
                    setSelectedInvoiceId("");
                  }}
                  className="w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"
                >
                  {availableQuotations.map(q => (
                    <option key={q.id} value={q.id}>{q.number} - {q.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-slate-300 font-mono font-bold">{selectedQuote?.number || "QT-DEFAULT"}</span>
                <button
                  onClick={handlePreviewQuotation}
                  className="text-[#FF5349] hover:underline font-bold flex items-center gap-0.5"
                >
                  <Eye size={10} /> View Realtime Quote
                </button>
              </div>
            </div>

            {/* STEP 4: SELECT INVOICE */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between gap-1.5">
              <div>
                <span className="text-[10px] font-extrabold text-[#FF5349] uppercase tracking-wider flex items-center gap-1">
                  <CreditCard size={12} /> 4. Select Invoice
                </span>
                <select
                  value={selectedInvoiceId}
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                  className="w-full bg-[#06132D] border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#FF5349] text-xs mt-1"
                >
                  {availableInvoices.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.number} (INR {inv.totalDue?.toLocaleString()})</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-[#FF5349] font-mono font-bold">INR {(selectedInvoice?.totalDue || 0).toLocaleString()}</span>
                <button
                  onClick={handlePreviewInvoice}
                  className="text-[#FF5349] hover:underline font-bold flex items-center gap-0.5"
                >
                  <Eye size={10} /> View Realtime Invoice
                </button>
              </div>
            </div>
          </div>

          {isEditingDoc && (() => {
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
              <div className="bg-white/10 p-4 rounded-xl border border-teal-500/40 space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-teal-500/20">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Edit size={14} /> Customizing Document Branding, Company Details & Colors
                  </h4>
                  <span className="text-[10px] text-teal-300 font-mono">Live Sync Editor & Real-time Preview</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* LEFT SIDE: EDIT OPTIONS */}
                  <div className="lg:col-span-6 space-y-3">
                    {/* Company Details Section */}
                    <div className="bg-black/20 p-3 rounded-lg border border-white/10 space-y-2.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300 block">1. Company & Agency Branding Details</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] text-slate-300 mb-1">Company Business Name</label>
                          <input
                            type="text"
                            value={docForm.companyName}
                            onChange={e => setDocForm({ ...docForm, companyName: e.target.value })}
                            className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-300 mb-1">Company Subtitle / Tagline</label>
                          <input
                            type="text"
                            value={docForm.companyTagline}
                            onChange={e => setDocForm({ ...docForm, companyTagline: e.target.value })}
                            className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-[10px] text-slate-300 mb-1">Company Email</label>
                          <input
                            type="email"
                            value={docForm.companyEmail}
                            onChange={e => setDocForm({ ...docForm, companyEmail: e.target.value })}
                            className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-300 mb-1">Company Phone</label>
                          <input
                            type="text"
                            value={docForm.companyPhone}
                            onChange={e => setDocForm({ ...docForm, companyPhone: e.target.value })}
                            className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-300 mb-1">Company Address</label>
                          <input
                            type="text"
                            value={docForm.companyAddress}
                            onChange={e => setDocForm({ ...docForm, companyAddress: e.target.value })}
                            className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* PDF Theme Colors & Accent Palette */}
                    <div className="bg-black/20 p-3 rounded-lg border border-white/10 space-y-2.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300 block">2. Document Theme & Accent Colors</span>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-slate-300">Primary Color:</label>
                          <input
                            type="color"
                            value={docForm.pdfPrimaryColor}
                            onChange={e => setDocForm({ ...docForm, pdfPrimaryColor: e.target.value })}
                            className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                          />
                          <span className="font-mono text-xs text-amber-300 font-bold">{docForm.pdfPrimaryColor}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">Quick Presets:</span>
                          {[
                            { name: "Purple", hex: "#4c1d95" },
                            { name: "Navy", hex: "#003b8e" },
                            { name: "Teal", hex: "#0E9F8A" },
                            { name: "Crimson", hex: "#DC2626" },
                            { name: "Sapphire", hex: "#2563EB" },
                            { name: "Emerald", hex: "#059669" },
                            { name: "Slate", hex: "#0F172A" }
                          ].map(p => (
                            <button
                              key={p.hex}
                              type="button"
                              onClick={() => setDocForm({ ...docForm, pdfPrimaryColor: p.hex })}
                              style={{ backgroundColor: p.hex }}
                              title={p.name}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${docForm.pdfPrimaryColor === p.hex ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-300 mb-1">Proposal Title</label>
                        <input
                          type="text"
                          value={docForm.title}
                          onChange={e => setDocForm({ ...docForm, title: e.target.value })}
                          className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-300 mb-1">Plan A Rate (INR)</label>
                        <input
                          type="number"
                          value={docForm.planAPrice}
                          onChange={e => setDocForm({ ...docForm, planAPrice: Number(e.target.value) })}
                          className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-300 mb-1">Plan B Rate (INR)</label>
                        <input
                          type="number"
                          value={docForm.planBPrice}
                          onChange={e => setDocForm({ ...docForm, planBPrice: Number(e.target.value) })}
                          className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-300 mb-1">Overview Narrative</label>
                      <textarea
                        rows={2}
                        value={docForm.overviewNarrative}
                        onChange={e => setDocForm({ ...docForm, overviewNarrative: e.target.value })}
                        className="w-full bg-[#071E34] border border-teal-500/30 rounded px-2.5 py-1.5 text-white text-xs resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSaveLeadDocumentCustomizations}
                        className="px-4 py-2 bg-teal-500 text-slate-950 text-xs font-extrabold rounded-lg hover:bg-teal-400 flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Save size={13} /> Save Customizations
                      </button>
                    </div>
                  </div>

                  {/* RIGHT SIDE: REALTIME LIVE PDF PREVIEW */}
                  <div className="lg:col-span-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col min-h-[420px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] font-bold text-teal-300">
                      <span className="flex items-center gap-1.5"><Eye size={12} /> REAL-TIME LIVE PREVIEW</span>
                      <span className="text-[9px] font-mono text-slate-400">Syncs as you type</span>
                    </div>
                    <div className="flex-1 mt-2 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                      <iframe
                        srcDoc={inlineLivePdfHtml}
                        className="w-full h-full min-h-[380px] border-none bg-slate-900"
                        title="Inline Live Realtime PDF Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0">
            <h3 className="font-heading font-extrabold text-xs text-[#071E34]">Lead Details</h3>
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Name</label>
              <input type="text" value={leadDetailForm.name} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, name: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-0.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company</label>
                <input type="text" value={leadDetailForm.companyName} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, companyName: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20" />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                <input type="text" value={leadDetailForm.phone} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, phone: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-0.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
                <input type="email" value={leadDetailForm.email} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, email: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20" />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Source</label>
                <select value={leadDetailForm.source} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, source: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer">
                  {["Other", "Website", "Facebook", "Instagram", "Google Ads", "WhatsApp", "Phone call", "Referral", "Direct enquiry"].map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimated Value (INR)</label>
              <input type="number" value={leadDetailForm.expectedBudget || 0} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, expectedBudget: Number(e.target.value) })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-mono font-medium text-gray-800 bg-gray-50/20" />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notes</label>
              <textarea rows={3} value={leadDetailForm.notes} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, notes: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all text-xs font-medium text-gray-800 bg-gray-50/20 resize-none" />
            </div>

            <div className="flex justify-end pt-1">
              <button onClick={handleSaveLeadDetailChanges} className="px-4 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-xs font-extrabold transition-all shadow-md">
                Save Changes
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0">
            <h3 className="font-heading font-extrabold text-xs text-[#071E34]">Pipeline</h3>
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stage</label>
              <select value={leadDetailForm.status} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, status: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer">
                {columns.map(col => <option key={col.key} value={col.key}>{col.title}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned To</label>
              <select value={leadDetailForm.assignedEmployee} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, assignedEmployee: e.target.value })} className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-teal-500 text-xs font-medium text-gray-800 cursor-pointer">
                <option value="Unassigned">Unassigned</option>
                {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Follow-up</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                <input type="date" value={leadDetailForm.nextFollowUpDate || ""} onChange={(e) => setLeadDetailForm({ ...leadDetailForm, nextFollowUpDate: e.target.value })} className="w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-teal-500 cursor-pointer" />
                <input type="text" placeholder="Time" className="w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-teal-500" defaultValue="12:00 PM" />
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[9px] text-amber-900 leading-normal">
              <AlertCircle size={12} className="text-amber-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <strong className="text-amber-950 font-bold block">Automatic reminders</strong>
                are an Ultra feature. The date is saved; upgrade to get notified.
              </div>
            </div>

            <div className="mt-1.5 pt-2.5 border-t border-gray-100 flex flex-col text-[10px]">
              <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2">
                <span className="text-gray-400 font-medium shrink-0">Value</span>
                <strong className="font-mono font-extrabold text-[#071E34] text-right break-words">INR {leadDetailForm.expectedBudget?.toLocaleString() || "0"}</strong>
              </div>
              <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2">
                <span className="text-gray-400 font-medium shrink-0">Source</span>
                <span className="text-gray-700 font-semibold text-right break-words">{leadDetailForm.source}</span>
              </div>
              <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2">
                <span className="text-gray-400 font-medium shrink-0">Phone</span>
                <span className="text-teal-600 font-semibold font-mono select-all min-w-0 text-right break-all">{leadDetailForm.phone}</span>
              </div>
              <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start py-2">
                <span className="text-gray-400 font-medium shrink-0">Email</span>
                <span className="text-gray-600 font-mono text-[9px] leading-relaxed break-all text-right select-all min-w-0" title={leadDetailForm.email}>{leadDetailForm.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
