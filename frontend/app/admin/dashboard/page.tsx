import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  TicketCheck, 
  LogOut, 
  Activity, 
  BarChart3, 
  Plus, 
  Search,
  CheckCircle,
  X,
  Phone,
  Layers,
  Sparkles,
  CheckSquare,
  FolderOpen,
  DollarSign,
  UserCheck,
  Briefcase,
  Settings,
  Mail,
  Bell,
  Trash2,
  Edit,
  Eye,
  ArrowRight,
  ArrowLeft,
  Download,
  Copy,
  ChevronRight,
  ChevronLeft,
  Target,
  Trophy,
  Trash,
  Columns,
  Square,
  SlidersHorizontal,
  User,
  MessageSquare,
  AlertCircle,
  ShieldAlert,
  Calendar,
  Clock,
  UserX,
  Upload,
  FileCode,
  Paperclip,
  Edit3,
  Send,
  Save,
  Maximize2,
  Minimize2,
  Building,
  Building2,
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  Star,
  Stamp
} from "lucide-react";
import GlassCard from "../../../components/ui/GlassCard";
import Button from "../../../components/ui/Button";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, generateSpeshwayAgreementPdfHtml, triggerDirectPdfDownload as utilsTriggerDirectPdfDownload, generatePdfDataUri, openPdfPrintPreview, saveGlobalCompanyDetails, getGlobalCompanyDetails } from "../../../utils/pdfGenerator";
import { getCrmSocket } from "../../../utils/realtime";
import CrmBrandLogo from "../../../src/components/public/CrmBrandLogo";
import OverviewPage from "../../../src/pages/admin/OverviewPage";

const loadProjectDetailModal = () => import("../../../components/admin/ProjectDetailModal");
const loadProjectProposalsWorkspace = () => import("../../../components/admin/ProjectProposalsWorkspace");
const loadLeadDetailInspectorModal = () => import("../../../components/admin/LeadDetailInspectorModal");

const ProjectDetailModal = lazy(loadProjectDetailModal);
const ProjectProposalsWorkspace = lazy(loadProjectProposalsWorkspace);
const LeadDetailInspectorModal = lazy(loadLeadDetailInspectorModal);

const API_URL = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) || (typeof window !== "undefined" && (import.meta as any).env?.VITE_API_URL) || "http://localhost:5000/api/v1";

const DEFAULT_SEED_PROJECTS: any[] = [];

const DEFAULT_SEED_OUR_PROJECTS: any[] = [];

const DEFAULT_SEED_LEADS: any[] = [];

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  industry: string;
  type: string;
  assignedEmployee: string;
  status: "Active" | "Inactive" | "Potential" | "Existing" | "Blocked" | "Deleted";
  notes: string;
  createdDate: string;
  loginEmail?: string;
  loginPassword?: string;
  loginUrl?: string;
  credentialsSentAt?: string;
  deletedAt?: string | null;
  restoredAt?: string | null;
}

interface Call {
  id: string;
  clientId: string;
  clientName: string;
  phoneNumber: string;
  calledBy: string;
  type: "Incoming" | "Outgoing" | "Follow-up" | "Sales call" | "Support call" | "Project discussion";
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: "Connected" | "Not answered" | "Busy" | "Switched off" | "Call back later" | "Completed";
  purpose: string;
  notes: string;
  followUpDate: string;
  nextAction: string;
}

interface Project {
  id: string;
  name: string;
  title?: string;
  clientId?: string;
  clientName: string;
  category: string;
  manager: string;
  teamMembers: string[];
  startDate: string;
  expectedCompletionDate: string;
  budget: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  description: string;
  progress: number;
  status: "Planning" | "Quotation sent" | "Approved" | "In progress" | "On hold" | "Testing" | "Completed" | "Cancelled";
  projectTodos?: ProjectTodo[];
}

type ProjectTodo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

interface Quotation {
  id?: string;
  number: string;
  clientName: string;
  projectName?: string;
  projectId?: string;
  projectType?: string;
  title: string;
  serviceItems?: { service?: string; description?: string; qty: number; rate: number }[];
  discount?: number;
  tax?: number;
  validUntil?: string;
  terms?: string;
  notes?: string;
  createdBy?: string;
  createdDate?: string;
  status: "Draft" | "Sent" | "Viewed" | "Negotiation" | "Approved" | "Rejected" | "Expired";
  planAPrice?: number;
  planBPrice?: number;
  overviewNarrative?: string;
  customerDesc?: string;
  merchantDesc?: string;
  adminDesc?: string;
  paymentTerms?: string;
  termsAndConditions?: string;
  companyDetailsDoc?: string;
  planComparisonItems?: any[];
  documentRef?: string;
  companyName?: string;
  currency?: string;
}

interface ProjectFeature {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  moduleName: string;
  description: string;
  requirementType: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  assignedDeveloper: string;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  progress: number;
  status: "Planned" | "Approved" | "In development" | "Testing" | "Completed" | "Rejected" | "On hold";
  clientApproval: boolean;
  notes: string;
}

interface Innovation {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  proposedBy: string;
  description: string;
  businessBenefit: string;
  technicalBenefit: string;
  estimatedCost: number;
  estimatedDevTime: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  approvalStatus: "Proposed" | "Under review" | "Client approved" | "Admin approved" | "Rejected";
  implementationStatus: "Not started" | "Researching" | "Planned" | "In development" | "Testing" | "Implemented";
  clientFeedback: string;
  adminNotes: string;
}

interface Lead {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  source: "Website" | "Facebook" | "Instagram" | "Google Ads" | "WhatsApp" | "Phone call" | "Referral" | "Direct enquiry" | "Other";
  interestedService: string;
  expectedBudget: number;
  assignedEmployee: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  leadScore: number;
  nextFollowUpDate: string;
  notes: string;
  status: "New" | "Contacted" | "Follow-up" | "Qualified" | "Proposal sent" | "Negotiation" | "Won" | "Lost";
  clientType?: "Temporary" | "Permanent";
  createdDate: string;
}

const getInitialCrmTab = (): string => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get("tab");
      if (urlTab) return urlTab;
      const storedTab = localStorage.getItem("speshway_crm_active_tab");
      if (storedTab) return storedTab;
    } catch {
      // fallback
    }
  }
  return "overview";
};

const getInitialCrmProjectId = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProj = params.get("projectId");
      if (urlProj) return urlProj;
      const storedProj = localStorage.getItem("speshway_crm_active_project_id");
      if (storedProj) return storedProj;
    } catch {
      // fallback
    }
  }
  return null;
};

const getInitialCrmClientId = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlClientId = params.get("clientId");
      if (urlClientId) return urlClientId;
      const storedClientId = localStorage.getItem("speshway_crm_active_client_id");
      if (storedClientId) return storedClientId;
    } catch {
      // fallback
    }
  }
  return null;
};

const getInitialCrmClientProjectId = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProjId = params.get("clientProjectId");
      if (urlProjId) return urlProjId;
      const storedProjId = localStorage.getItem("speshway_crm_active_client_project_id");
      if (storedProjId) return storedProjId;
    } catch {
      // fallback
    }
  }
  return null;
};

const getInitialCrmLeadId = (): string | null => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLeadId = params.get("leadId");
      if (urlLeadId) return urlLeadId;
      const storedLeadId = localStorage.getItem("speshway_crm_active_lead_id");
      if (storedLeadId) return storedLeadId;
    } catch {
      // fallback
    }
  }
  return null;
};

const getInitialCrmWorkspaceSubtab = (): "proposals" | "quotations" | "invoices" => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const subtab = params.get("subtab");
      if (subtab === "invoices" || subtab === "quotations" || subtab === "proposals") return subtab;
    } catch {
      // fallback
    }
  }
  return "proposals";
};

const getInitialCrmProjectTab = (): string => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const section = params.get("section") || params.get("projectTab");
      if (section) return section;
      const stored = localStorage.getItem("speshway_crm_active_project_tab");
      if (stored) return stored;
    } catch {}
  }
  return "overview";
};

const getInitialCrmViewMode = (): "detail" | "proposals" | null => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view") || params.get("mode");
      if (view === "detail" || view === "8-sections") return "detail";
      if (view === "proposals") return "proposals";
      if (params.has("section") || params.has("projectTab")) return "detail";
      const storedView = localStorage.getItem("speshway_crm_active_view_mode");
      if (storedView === "detail") return "detail";
    } catch {}
  }
  return null;
};

const getCachedCrmBulkData = (): Record<string, any> | null => {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem("crm_bulk_data_cache");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {}
  }
  return null;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const initialBulkCache = getCachedCrmBulkData();

  const [activeTab, setActiveTab] = useState<string>(getInitialCrmTab);
  const [isLoading, setIsLoading] = useState(!initialBulkCache);
  const [hasError, setHasError] = useState(false);

  // States fetched live from MongoDB with instant local cache hydration
  const [clients, setClients] = useState<Client[]>(initialBulkCache?.client || []);
  const [selectedClientProjectId, setSelectedClientProjectId] = useState<string | null>(null);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [selectedTodoProjectId, setSelectedTodoProjectId] = useState<string>("");
  const [activeProjectWorkspaceSubtab, setActiveProjectWorkspaceSubtab] = useState<"proposals" | "quotations" | "invoices">(getInitialCrmWorkspaceSubtab);
  const [isProjectInvoiceStudioOpen, setIsProjectInvoiceStudioOpen] = useState(false);

  const [showClientModal, setShowClientModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showInnovationModal, setShowInnovationModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [activeClientDetail, setActiveClientDetail] = useState<Client | null>(null);
  const [activeProjectDetail, setActiveProjectDetail] = useState<Project | null>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<string>(getInitialCrmProjectTab);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState<boolean>(false);
  const [clientPdfPreviewModal, setClientPdfPreviewModal] = useState<{ title: string; html: string; item: any } | null>(null);
  const [clientDocumentRecords, setClientDocumentRecords] = useState<any[]>(initialBulkCache?.["client-document"] || []);
  const [projectTodoInputs, setProjectTodoInputs] = useState<Record<string, string>>({});
  const [clientDocumentOverrides, setClientDocumentOverrides] = useState<Record<string, any>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("crm_client_document_overrides") || "{}");
    } catch {
      localStorage.removeItem("crm_client_document_overrides");
      return {};
    }
  });
  const [clientEmailModal, setClientEmailModal] = useState<{
    toEmail: string;
    subject: string;
    textContent: string;
    fileName: string;
    htmlContent: string;
    item: any;
    isSending: boolean;
  } | null>(null);

  const [calls, setCalls] = useState<Call[]>(initialBulkCache?.call || []);
  const [leads, setLeads] = useState<Lead[]>(initialBulkCache?.lead || DEFAULT_SEED_LEADS);
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>(initialBulkCache?.project || DEFAULT_SEED_PROJECTS);
  const [ourProjects, setOurProjects] = useState<any[]>(initialBulkCache?.["our-projects"] || initialBulkCache?.ourprojects || DEFAULT_SEED_OUR_PROJECTS);
  const [activeProjectProposalsView, setActiveProjectProposalsView] = useState<any>(null);
  const [autoOpenAgreementStudio, setAutoOpenAgreementStudio] = useState<boolean>(false);
  const [initialRestoreProjectId, setInitialRestoreProjectId] = useState<string | null>(getInitialCrmProjectId);
  const [initialRestoreViewMode] = useState<"detail" | "proposals" | null>(getInitialCrmViewMode);
  const [initialRestoreClientId, setInitialRestoreClientId] = useState<string | null>(getInitialCrmClientId);
  const [initialRestoreClientProjectId, setInitialRestoreClientProjectId] = useState<string | null>(getInitialCrmClientProjectId);
  const [showOurProjectModal, setShowOurProjectModal] = useState(false);
  const [activeOurProjectQuotation, setActiveOurProjectQuotation] = useState<any>(null);
  const [activeSelectedQuoteId, setActiveSelectedQuoteId] = useState<string | null>(null);
  const [modalViewTab, setModalViewTab] = useState<"summary" | "full-pdf">("full-pdf");
  const [ourProjectForm, setOurProjectForm] = useState({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
  const [quotations, setQuotations] = useState<Quotation[]>(initialBulkCache?.quotation || []);
  const [features, setFeatures] = useState<ProjectFeature[]>(initialBulkCache?.feature || []);
  const [editingQuote, setEditingQuote] = useState<any>(null);
  const [reviewingQuote, setReviewingQuote] = useState<any>(null);
  const [reviewMode, setReviewMode] = useState<"exact-pdf" | "live-editor">("live-editor");
  const [reviewerNotes, setReviewerNotes] = useState<string>("");
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const [draggedOverCol, setDraggedOverCol] = useState<string | null>(null);
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [draggedProjectStatus, setDraggedProjectStatus] = useState<string | null>(null);
  const [draggingClientProjectId, setDraggingClientProjectId] = useState<string | null>(null);
  const [inlineAddColKey, setInlineAddColKey] = useState<string | null>(null);
  const [inlineLeadName, setInlineLeadName] = useState<string>("");
  const [columns, setColumns] = useState([
    { title: "New", key: "New", dot: "bg-[#06132D]", text: "text-[#06132D]" },
    { title: "Contacted", key: "Contacted", dot: "bg-slate-400", text: "text-slate-500" },
    { title: "Qualified", key: "Qualified", dot: "bg-[#FF5349]/80", text: "text-[#FF5349]" },
    { title: "Proposal Sent", key: "Proposal sent", dot: "bg-[#06132D]/70", text: "text-[#06132D]" },
    { title: "Won", key: "Won", dot: "bg-emerald-500", text: "text-emerald-650" },
    { title: "Lost", key: "Lost", dot: "bg-rose-500", text: "text-rose-650" }
  ]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [showTrashOnly, setShowTrashOnly] = useState(false);
  const [showStagesModal, setShowStagesModal] = useState(false);
  const [newStageTitle, setNewStageTitle] = useState("");
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [leadDetailForm, setLeadDetailForm] = useState<Lead | null>(null);
  const [initialRestoreLeadId, setInitialRestoreLeadId] = useState<string | null>(getInitialCrmLeadId);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([]);
  const [innovations, setInnovations] = useState<Innovation[]>(initialBulkCache?.innovation || []);
  const [invoices, setInvoices] = useState<any[]>(initialBulkCache?.invoice || []);
  const [agreements, setAgreements] = useState<any[]>(initialBulkCache?.agreement || []);
  const [payments, setPayments] = useState<any[]>(initialBulkCache?.payment || []);
  const [expenses, setExpenses] = useState<any[]>(initialBulkCache?.expense || []);
  const [users, setUsers] = useState<any[]>(initialBulkCache?.user || []);
  const [employees, setEmployees] = useState<any[]>(initialBulkCache?.employee || []);
  const [teams, setTeams] = useState<any[]>(initialBulkCache?.team || []);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [sentEmailLogs, setSentEmailLogs] = useState<any[]>([
    {
      id: "EML-9841",
      recipient: "naveenkumar970100@gmail.com",
      subject: "Tax Invoice INV-OPRJ-5349 from Speshway Solutions Private Limited",
      docType: "Tax Invoice",
      fileName: "Tax_Invoice_INV-OPRJ-5349.pdf",
      sentAt: "28 Jul 2026, 03:25 PM",
      status: "DELIVERED"
    },
    {
      id: "EML-9840",
      recipient: "naveenkumar970100@gmail.com",
      subject: "Project Estimation Proposal QT-WEB-6713 - Speshway Solutions",
      docType: "Quotation",
      docRef: "QT-WEB-6713",
      fileName: "Quotation_Proposal_QT-WEB-6713.pdf",
      sentAt: "28 Jul 2026, 02:40 PM",
      status: "DELIVERED"
    }
  ]);
  const [previewZoom, setPreviewZoom] = useState<number>(0.6);
  const [isFullScreenPdf, setIsFullScreenPdf] = useState<boolean>(true);
  const [editingClientDoc, setEditingClientDoc] = useState<{
    type: "quotation" | "invoice";
    item: any;
    refNumber: string;
    issueDate: string;
    clientName: string;
    clientEmail: string;
    productName: string;
    category: string;
    overviewNarrative: string;
    rate: number;
    taxPct: number;
    totalDue: number;
    paymentTerms: string;
    customFeatures: Array<{ title: string; description: string }>;
    companyName: string;
    companyTagline: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    companyWebsite: string;
    companyFooterName: string;
    companyFooterAddress: string;
    companyFooterContact: string;
    pdfFooterTheme: "dark" | "white";
    pdfPrimaryColor: string;
    pdfSecondaryColor: string;
    companyLogoUrl: string;
    companyLogoSize: number;
    showWatermark: boolean;
    companyWatermarkText: string;
    companyWatermarkUrl: string;
    companyWatermarkOpacity: number;
    companyWatermarkRotation: number;
    companyWatermarkSize: number;
    companyWatermarkImgSize: number;
    customerDesc: string;
    merchantDesc: string;
    adminDesc: string;
    planAName: string;
    planBName: string;
    planBPrice: number;
    includePlanB: boolean;
    sec4Subtitle: string;
    planAHighlights: string;
    planBHighlights: string;
    planComparisonItems: Array<{ deliverable: string; planA: boolean; planB: boolean }>;
    termsAndConditions: string;
    inclusions: string;
    exclusions: string;
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
    invoiceDescription: string;
  } | null>(null);

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

  const getClientDocumentUrlParam = (name: string) => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get(name) || "";
  };

  const uniqueClientDocumentValues = (values: Array<string | number | null | undefined | false>) => (
    Array.from(new Set(values.map(value => `${value || ""}`.trim()).filter(Boolean)))
  );

  const stripLargeClientDocumentFields = (value: any): any => {
    if (Array.isArray(value)) return value.map(stripLargeClientDocumentFields);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, fieldValue]) => {
      if (typeof fieldValue === "string" && fieldValue.length > 5000) {
        return [key, ""];
      }
      return [key, stripLargeClientDocumentFields(fieldValue)];
    }));
  };

  const persistClientDocumentOverridesCache = (overrides: Record<string, any>) => {
    if (typeof window === "undefined") return;
    try {
      const entries = Object.entries(overrides).slice(-12);
      const cache = Object.fromEntries(entries.map(([key, value]) => [key, stripLargeClientDocumentFields(value)]));
      localStorage.setItem("crm_client_document_overrides", JSON.stringify(cache));
    } catch (err) {
      console.warn("Client PDF cache skipped because browser storage is full.", err);
      try {
        localStorage.removeItem("crm_client_document_overrides");
      } catch {
        // Ignore storage cleanup failures.
      }
    }
  };

  const getActiveClientDocumentScopeId = () => getClientDocumentScopeCandidates()[0] || "client-workspace";

  const getClientDocumentScopeCandidates = () => uniqueClientDocumentValues([
    activeClientDetail?.id,
    leadDetailForm?.id,
    selectedLeadForDetail?.id,
    getClientDocumentUrlParam("clientId"),
    activeClientDetail?.email,
    leadDetailForm?.email,
    activeClientDetail?.name,
    leadDetailForm?.name,
    "client-workspace"
  ]);

  const getClientDocumentRefCandidates = (item: any, type: "quotation" | "invoice") => uniqueClientDocumentValues([
    item?.number,
    item?.id,
    item?.refNumber,
    item?.quotationNumber,
    item?.invoiceNumber,
    item?.projectId,
    item?.clientProjectId,
    selectedProposalId,
    selectedClientProjectId,
    getClientDocumentUrlParam("clientProjectId"),
    type === "invoice" && selectedClientProjectId ? `INV-${selectedClientProjectId}` : "",
    type === "invoice" && getClientDocumentUrlParam("clientProjectId") ? `INV-${getClientDocumentUrlParam("clientProjectId")}` : "",
    type === "quotation" && selectedProposalId ? `QT-${selectedProposalId}` : "",
    type === "quotation" && getClientDocumentUrlParam("clientProjectId") ? `QT-${getClientDocumentUrlParam("clientProjectId")}` : "",
    type === "invoice" && item?.quotationNumber ? `INV-${item.quotationNumber}` : "",
    "document"
  ]);

  const getClientDocumentKey = (item: any, type: "quotation" | "invoice", scopeId = getActiveClientDocumentScopeId()) => {
    const ref = getClientDocumentRefCandidates(item, type)[0] || "document";
    return `${scopeId}::${type}::${ref}`;
  };

  const findClientDocumentOverride = (item: any, type: "quotation" | "invoice", scopeId?: string) => {
    const scopes = scopeId ? uniqueClientDocumentValues([scopeId, ...getClientDocumentScopeCandidates()]) : getClientDocumentScopeCandidates();
    const refs = getClientDocumentRefCandidates(item || {}, type);
    for (const scope of scopes) {
      for (const ref of refs) {
        const override = clientDocumentOverrides[`${scope}::${type}::${ref}`];
        if (override) return override;
      }
    }
    return null;
  };

  const getClientDocumentOverrideKeys = (item: any, type: "quotation" | "invoice") => {
    const keys: string[] = [];
    getClientDocumentScopeCandidates().forEach(scope => {
      getClientDocumentRefCandidates(item, type).forEach(ref => {
        keys.push(`${scope}::${type}::${ref}`);
      });
    });
    return uniqueClientDocumentValues(keys);
  };

  const withClientDocumentOverride = (item: any, type: "quotation" | "invoice", scopeId = getActiveClientDocumentScopeId()) => {
    const baseItem = item || {};
    const override = findClientDocumentOverride(baseItem, type, scopeId);
    return override ? { ...baseItem, ...override } : baseItem;
  };

  const saveClientDocumentOverride = async (item: any, type: "quotation" | "invoice") => {
    const nextOverrides = { ...clientDocumentOverrides };
    const overrideKeys = getClientDocumentOverrideKeys(item, type);
    overrideKeys.forEach(key => {
      nextOverrides[key] = item;
    });
    setClientDocumentOverrides(nextOverrides);
    persistClientDocumentOverridesCache(nextOverrides);
    const documentKey = overrideKeys[0] || getClientDocumentKey(item, type);
    await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(documentKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: documentKey,
        documentKey,
        overrideKeys,
        documentType: type,
        clientScope: getActiveClientDocumentScopeId(),
        documentRef: getClientDocumentRefCandidates(item, type)[0] || "document",
        clientId: getClientDocumentUrlParam("clientId") || activeClientDetail?.id || leadDetailForm?.id || "",
        clientProjectId: getClientDocumentUrlParam("clientProjectId") || selectedClientProjectId || item?.projectId || "",
        item,
        updatedAt: new Date().toISOString()
      })
    });
  };

  useEffect(() => {
    let isMounted = true;
    const loadClientDocumentOverrides = async () => {
      try {
        const res = await fetch(`${API_URL}/crm/client-document`).then(r => r.json());
        const records = Array.isArray(res?.data) ? res.data : [];
        if (isMounted) {
          setClientDocumentRecords(records);
        }
        const nextOverrides: Record<string, any> = {};
        records.forEach((record: any) => {
          const item = record.item || record;
          const keys = Array.isArray(record.overrideKeys) && record.overrideKeys.length > 0
            ? record.overrideKeys
            : [record.documentKey || record.id].filter(Boolean);
          keys.forEach((key: string) => {
            nextOverrides[key] = item;
          });
        });
        if (isMounted && Object.keys(nextOverrides).length > 0) {
          setClientDocumentOverrides(prev => {
            const merged = { ...prev, ...nextOverrides };
            persistClientDocumentOverridesCache(merged);
            return merged;
          });
        }
      } catch (err) {
        console.error("Failed to load client PDF document overrides from database", err);
      }
    };
    loadClientDocumentOverrides();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizeClientMatch = (value: any) => String(value || "").trim().toLowerCase();

  const adminRecordsMatch = (a: any, b: any) => {
    const left = normalizeClientMatch(a);
    const right = normalizeClientMatch(b);
    return Boolean(left && right && left === right);
  };

  const dedupeClientRecords = <T extends { id?: string; number?: string }>(records: T[]) => {
    const seen = new Set<string>();
    return records.filter((record) => {
      const key = String(record.id || record.number || JSON.stringify(record));
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const getClientLinkedWorkspaceData = (client: Client | null) => {
    if (!client) {
      return { clientProjects: [] as Project[], clientQuotes: [] as any[], clientInvoices: [] as any[] };
    }

    const clientKeys = uniqueClientDocumentValues([
      client.id,
      client.name,
      client.company,
      client.email,
      client.loginEmail,
    ]);
    const projectStatuses: Project["status"][] = ["Planning", "Designing", "Development", "Testing", "Completed", "Cancelled", "Quotation sent", "Approved", "In progress", "On hold"];

    const belongsToClient = (record: any) =>
      clientKeys.some((key) =>
        adminRecordsMatch(record?.clientId, key) ||
        adminRecordsMatch(record?.clientName, key) ||
        adminRecordsMatch(record?.clientCompany, key) ||
        adminRecordsMatch(record?.clientEmail, key) ||
        adminRecordsMatch(record?.sentToEmail, key) ||
        adminRecordsMatch(record?.email, key) ||
        adminRecordsMatch(record?.preparedFor, key) ||
        adminRecordsMatch(record?.billedTo, key) ||
        normalizeClientMatch(record?.notes).includes(normalizeClientMatch(key))
      );

    const matchedDocs = clientDocumentRecords.filter((record: any) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const keyMatchesClient = overrideKeys.some((key: string) =>
        clientKeys.some((clientKey) => normalizeClientMatch(key).startsWith(`${normalizeClientMatch(clientKey)}::`))
      );
      return record.visibleToClient && (belongsToClient(record) || belongsToClient(item) || keyMatchesClient);
    });

    const directProjects = projects.filter((project: any) => belongsToClient(project));
    const projectIdsFromDocs = matchedDocs
      .flatMap((record: any) => [record.clientProjectId, record.projectId, record.item?.projectId])
      .map(normalizeClientMatch)
      .filter(Boolean);
    const projectNamesFromDocs = matchedDocs
      .flatMap((record: any) => [record.projectName, record.item?.projectName, record.item?.productName, record.item?.title])
      .map(normalizeClientMatch)
      .filter(Boolean);

    const projectsLinkedByDocs = projects.filter((project: any) =>
      projectIdsFromDocs.includes(normalizeClientMatch(project.id)) ||
      projectNamesFromDocs.includes(normalizeClientMatch(project.name || project.title))
    );

    const derivedProjects = matchedDocs
      .map((record: any) => {
        const item = record.item || {};
        const projectId = record.clientProjectId || record.projectId || item.projectId;
        const projectName = record.projectName || item.projectName || item.productName || item.title;
        if (!projectId && !projectName) return null;
        return {
          id: projectId || `CLIENT-PROJECT-${normalizeClientMatch(projectName).replace(/[^a-z0-9]+/g, "-")}`,
          name: projectName || projectId,
          title: projectName || projectId,
          clientId: client.id,
          clientName: client.name || client.company,
          clientEmail: client.email,
          category: item.category || item.projectType || "Client Project",
          manager: item.manager || client.assignedEmployee || "Unassigned",
          teamMembers: Array.isArray(item.teamMembers) ? item.teamMembers : [],
          startDate: item.startDate || item.date || item.createdDate || new Date().toISOString().split("T")[0],
          expectedCompletionDate: item.expectedCompletionDate || item.dueDate || "",
          priority: (["Low", "Medium", "High", "Critical"].includes(item.priority) ? item.priority : "Medium") as Project["priority"],
          status: (projectStatuses.includes(record.projectStatus) ? record.projectStatus : (projectStatuses.includes(item.projectStatus) ? item.projectStatus : (projectStatuses.includes(record.status) ? record.status : (projectStatuses.includes(item.status) ? item.status : "Planning")))) as Project["status"],
          progress: Number(item.progress || item.completion || 10),
          budget: Number(item.budget || item.amount || item.rate || item.totalDue || item.planAPrice || 0),
          description: item.description || item.overviewNarrative || "",
          projectTodos: Array.isArray(record.projectTodos) ? record.projectTodos : (Array.isArray(item.projectTodos) ? item.projectTodos : []),
        } as Project;
      })
      .filter(Boolean) as Project[];

    const seenNames = new Set<string>();
    const seenIds = new Set<string>();
    const clientProjects = [...directProjects, ...projectsLinkedByDocs, ...derivedProjects].filter(project => {
      const idKey = normalizeClientMatch(project.id);
      const nameKey = normalizeClientMatch(project.name || project.title);
      if (seenIds.has(idKey)) return false;
      if (nameKey && seenNames.has(nameKey)) return false;
      seenIds.add(idKey);
      if (nameKey) seenNames.add(nameKey);
      return true;
    });
    const clientProjectIds = clientProjects.map((project) => normalizeClientMatch(project.id)).filter(Boolean);
    const clientProjectNames = clientProjects.map((project) => normalizeClientMatch(project.name || project.title)).filter(Boolean);

    const belongsToClientProject = (record: any) =>
      clientProjectIds.includes(normalizeClientMatch(record?.projectId || record?.clientProjectId)) ||
      clientProjectNames.includes(normalizeClientMatch(record?.projectName || record?.productName));

    const directQuotes = quotations.filter((quote: any) => belongsToClient(quote) || belongsToClientProject(quote));
    const directInvoices = invoices.filter((invoice: any) => belongsToClient(invoice) || belongsToClientProject(invoice));
    const docQuotes = matchedDocs
      .filter((record: any) => record.documentType === "quotation")
      .map((record: any) => ({
        ...(record.item || {}),
        id: record.item?.id || record.documentRef || record.id,
        number: record.item?.number || record.documentRef || record.id,
        htmlContent: record.htmlContent,
        status: record.item?.status || "Sent",
      }));
    const docInvoices = matchedDocs
      .filter((record: any) => record.documentType === "invoice")
      .map((record: any) => ({
        ...(record.item || {}),
        id: record.item?.id || record.documentRef || record.id,
        number: record.item?.number || record.documentRef || record.id,
        htmlContent: record.htmlContent,
        status: record.item?.status || "Sent",
      }));

    return {
      clientProjects,
      clientQuotes: dedupeClientRecords([...docQuotes, ...directQuotes]),
      clientInvoices: dedupeClientRecords([...docInvoices, ...directInvoices]),
    };
  };

  const handleSaveCustomizedClientDoc = async () => {
    if (!editingClientDoc) return;
    const { type, item, refNumber, issueDate, clientName, clientEmail, productName, category, overviewNarrative, rate, taxPct, totalDue, paymentTerms, customFeatures, companyName, companyTagline, companyAddress, companyEmail, companyPhone, companyWebsite, companyFooterName, companyFooterAddress, companyFooterContact, pdfFooterTheme, pdfPrimaryColor, pdfSecondaryColor, companyLogoUrl, companyLogoSize, showWatermark, companyWatermarkText, companyWatermarkUrl, companyWatermarkOpacity, companyWatermarkRotation, companyWatermarkSize, companyWatermarkImgSize, customerDesc, merchantDesc, adminDesc, planAName, planBName, planBPrice, includePlanB, sec4Subtitle, planAHighlights, planBHighlights, planComparisonItems, termsAndConditions, inclusions, exclusions, accountName, accountNumber, ifscCode, branch, invoiceDescription, invoiceSubdesc } = editingClientDoc;

    const allAvailableProjects = [
      ...projects,
      ...ourProjects.map(op => ({
        id: op.id || `OPRJ-${op.name}`,
        name: op.name || op.title,
        title: op.title || op.name,
        category: op.category || "Our Projects",
        clientName: op.clientName || "Our Projects Showcase",
        budget: op.budget || 45000
      }))
    ];
    const selectedProj = allAvailableProjects.find(p => p.id === selectedClientProjectId);

    const updatedItem = {
      ...item,
      id: refNumber || item.id,
      number: refNumber || item.number,
      createdDate: issueDate,
      date: issueDate,
      clientName,
      clientEmail,
      productName,
      title: productName,
      category,
      overviewNarrative,
      description: type === "invoice" ? (invoiceDescription || overviewNarrative) : overviewNarrative,
      subdesc: invoiceSubdesc,
      rate,
      amount: rate,
      planAPrice: rate,
      planAName: planAName || "Standard App Package",
      planBName: planBName || "Enterprise Premium Package",
      planBPrice: planBPrice || 65000,
      includePlanB: includePlanB !== false,
      enablePlanB: includePlanB !== false,
      sec4Subtitle: sec4Subtitle || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
      planAHighlights: planAHighlights || "Responsive web application (Customer, Merchant & Admin portals)\nAll core features from Section 3\nSecure payment gateway integration (Card / UPI)\nAdmin & Merchant dashboards\nCross-browser, mobile-responsive UI\nBasic SEO setup & deployment\nStandard refresh-based updates without WebSocket live sync",
      planBHighlights: planBHighlights || "Everything in Plan A, plus:\nReal-time WebSocket updates for dashboards, project status, chat, and notifications\nLive quotation, invoice, project, and todo sync without page refresh\nPush notifications for promotions & alerts\nMobile-optimized chat & booking flow",
      planComparisonItems: planComparisonItems && planComparisonItems.length > 0 ? planComparisonItems : [
        { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
        { deliverable: "All Core Marketplace Features", planA: true, planB: true },
        { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
        { deliverable: "QR Ticket Check-In", planA: true, planB: true },
        { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
        { deliverable: "Push Notifications", planA: false, planB: true },
        { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
      ],
      budget: rate,
      taxPct,
      taxAmount: Math.round(rate * (taxPct / 100)),
      totalDue,
      paymentTerms,
      termsAndConditions,
      inclusions,
      exclusions,
      customFeatures,
      companyName,
      billedByCompany: companyName,
      companyTagline,
      companyHeaderSub: companyTagline,
      billedBySub: companyTagline,
      companyAddress,
      billedByAddress: companyAddress,
      companyEmail,
      companyPhone,
      companyWebsite: companyWebsite?.trim() || "www.speshway.com",
      companyFooterName: companyFooterName?.trim() || companyName,
      companyFooterAddress: companyFooterAddress?.trim() || companyAddress,
      companyFooterContact: companyFooterContact?.trim() || `${companyWebsite?.trim() || "www.speshway.com"} - ${companyEmail} - ${companyPhone}`,
      pdfFooterTheme,
      pdfPrimaryColor,
      pdfSecondaryColor,
      companyLogoUrl,
      companyLogoSize,
      showWatermark,
      companyWatermarkText,
      companyWatermarkUrl,
      companyWatermarkOpacity,
      companyWatermarkRotation,
      companyWatermarkSize,
      companyWatermarkImgSize,
      customerDesc,
      merchantDesc,
      adminDesc,
      accountName,
      accountNumber,
      ifscCode,
      branch
    };

    let updatedHtml = "";
    if (type === "agreement") {
      updatedHtml = generateSpeshwayAgreementPdfHtml(updatedItem, selectedProj, 1.0);
    } else if (type === "invoice") {
      updatedHtml = generateSpeshwayTaxInvoicePdfHtml(updatedItem, selectedProj);
    } else {
      updatedHtml = generateSpeshwayEstimationPdfHtml(null, updatedItem, customFeatures);
    }

    setEditingClientDoc(null);
    setClientPdfPreviewModal({
      title: `${type === "agreement" ? "Agreement Preview" : (type === "invoice" ? "Tax Invoice Preview" : "Proposal Quotation Preview")} - ${updatedItem.number || updatedItem.id}`,
      html: updatedHtml,
      item: updatedItem
    });
    saveGlobalCompanyDetails({
      companyName,
      billedByCompany: companyName,
      companyTagline,
      billedBySub: companyTagline,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyFooterName,
      companyFooterAddress,
      companyFooterContact,
      pdfFooterTheme,
      pdfPrimaryColor,
      pdfSecondaryColor,
      showWatermark,
      companyWatermarkText,
      companyWatermarkUrl,
      companyWatermarkOpacity,
      companyWatermarkRotation,
      companyWatermarkSize,
      companyWatermarkImgSize
    });

    showToast(`Client-page ${type === "invoice" ? "invoice" : "quotation"} edits saved for ${clientName}.`, "success");
    saveClientDocumentOverride(updatedItem, type).catch(err => {
      console.error("Failed to save client PDF document to database", err);
      showToast("Preview updated. Database save failed, please try Save again.", "error");
    });
  };

  const handleSaveAsGlobalDefaultCompanyBranding = () => {
    if (!editingClientDoc) return;
    saveGlobalCompanyDetails({
      companyName: editingClientDoc.companyName,
      billedByCompany: editingClientDoc.companyName,
      companyTagline: editingClientDoc.companyTagline,
      billedBySub: editingClientDoc.companyTagline,
      companyEmail: editingClientDoc.companyEmail,
      companyPhone: editingClientDoc.companyPhone,
      companyAddress: editingClientDoc.companyAddress,
      billedByAddress: editingClientDoc.companyAddress,
      companyWebsite: editingClientDoc.companyWebsite,
      companyFooterName: editingClientDoc.companyFooterName,
      companyFooterAddress: editingClientDoc.companyFooterAddress,
      companyFooterContact: editingClientDoc.companyFooterContact,
      pdfFooterTheme: editingClientDoc.pdfFooterTheme,
      companyLogoUrl: editingClientDoc.companyLogoUrl,
      companyLogoSize: editingClientDoc.companyLogoSize,
      pdfPrimaryColor: editingClientDoc.pdfPrimaryColor,
      pdfSecondaryColor: editingClientDoc.pdfSecondaryColor,
      showWatermark: editingClientDoc.showWatermark,
      companyWatermarkText: editingClientDoc.companyWatermarkText,
      companyWatermarkUrl: editingClientDoc.companyWatermarkUrl,
      companyWatermarkOpacity: editingClientDoc.companyWatermarkOpacity,
      companyWatermarkRotation: editingClientDoc.companyWatermarkRotation,
      companyWatermarkSize: editingClientDoc.companyWatermarkSize,
      companyWatermarkImgSize: editingClientDoc.companyWatermarkImgSize,
      paymentTerms: editingClientDoc.paymentTerms,
      termsAndConditions: editingClientDoc.termsAndConditions,
      inclusions: editingClientDoc.inclusions,
      exclusions: editingClientDoc.exclusions,
      accountName: editingClientDoc.accountName,
      accountNumber: editingClientDoc.accountNumber,
      ifscCode: editingClientDoc.ifscCode,
      branch: editingClientDoc.branch
    });
    showToast("🌟 Saved current branding, logo, colors & watermark as Permanent Global Defaults!", "success");
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenClientItemPreview = (item: any, type: "quotation" | "invoice") => {
    try {
      console.log("[PREVIEW TRIGGERED]", type, item);
      const previewItem = withClientDocumentOverride(item, type);
      let pdfHtml = "";
      let title = "";
      const allAvailableProjects = [
        ...projects,
        ...ourProjects.map(op => ({
          id: op.id || `OPRJ-${op.name}`,
          name: op.name || op.title,
          title: op.title || op.name,
          category: op.category || "Our Projects",
          clientName: op.clientName || "Our Projects Showcase",
          budget: op.budget || 50000
        }))
      ];
      const selectedProj = allAvailableProjects.find(p => p.id === selectedClientProjectId);
      const enrichedItem = {
        ...previewItem,
        clientName: previewItem.clientName || activeClientDetail?.name || activeClientDetail?.company || selectedProj?.clientName || "naveen",
        productName: previewItem.productName || selectedProj?.name || selectedProj?.title || previewItem.title || "Software Project",
        rate: Number(previewItem.rate || previewItem.planAPrice || previewItem.amount || selectedProj?.budget || 50000),
        taxPct: Number(previewItem.taxPct !== undefined ? previewItem.taxPct : 18),
        totalDue: Number(previewItem.totalDue || Math.round(Number(previewItem.rate || previewItem.planAPrice || previewItem.amount || selectedProj?.budget || 50000) * 1.18))
      };

      if (type === "agreement") {
        pdfHtml = generateSpeshwayAgreementPdfHtml(enrichedItem, selectedProj, 1.0);
        title = `Service Agreement Preview - ${enrichedItem.number || enrichedItem.id}`;
      } else if (type === "invoice") {
        pdfHtml = generateSpeshwayTaxInvoicePdfHtml(enrichedItem, selectedProj, 1.0);
        title = `Tax Invoice Preview - ${enrichedItem.number || enrichedItem.id}`;
      } else {
        const projectFeaturesList = features.filter(f => f.projectId === enrichedItem.projectId || f.projectName === enrichedItem.projectName);
        pdfHtml = generateSpeshwayEstimationPdfHtml(null, enrichedItem, projectFeaturesList);
        title = `Proposal Quotation Preview - ${enrichedItem.number || enrichedItem.id || enrichedItem.title}`;
      }
      setClientPdfPreviewModal({ title, html: pdfHtml, item: enrichedItem });
      showToast(`${type === "agreement" ? "Service Agreement" : (type === "invoice" ? "Tax Invoice" : "Proposal Quotation")} Live Preview loaded cleanly!`, "success");
    } catch (err: any) {
      console.error("[PREVIEW ERROR]", err);
      showToast(`Could not generate PDF preview: ${err.message || err}`, "error");
    }
  };

  const handleOpenLeadInspectorDocumentPreview = (title: string, html: string, item: any) => {
    const type: "quotation" | "invoice" = title.toLowerCase().includes("invoice") ? "invoice" : "quotation";
    const previewItem = withClientDocumentOverride(item, type);
    const hasOverride = Boolean(findClientDocumentOverride(item, type));
    const previewHtml = hasOverride
      ? (type === "invoice"
          ? generateSpeshwayTaxInvoicePdfHtml(previewItem, null, 1.0)
          : generateSpeshwayEstimationPdfHtml(null, previewItem, features.filter(f => f.projectId === previewItem?.projectId || f.projectName === previewItem?.projectName), 1.0))
      : html;

    setClientPdfPreviewModal({
      title: hasOverride
        ? `${type === "invoice" ? "Tax Invoice Preview" : "Proposal Quotation Preview"} - ${previewItem?.number || previewItem?.id || previewItem?.title}`
        : title,
      html: previewHtml,
      item: previewItem
    });
  };

  const handleOpenClientItemEmailModal = (
    item: any,
    type: "quotation" | "invoice" | "agreement",
    preset?: { toEmail?: string; subject?: string; textContent?: string; fileName?: string; htmlContent?: string }
  ) => {
    const hasSavedOverride = Boolean(findClientDocumentOverride(item || {}, type));
    const docItem = withClientDocumentOverride(item || {}, type);
    const allAvailableProjects = [
      ...projects,
      ...ourProjects.map(op => ({
        id: op.id || `OPRJ-${op.name}`,
        name: op.name || op.title,
        title: op.title || op.name,
        category: op.category || "Our Projects",
        clientName: op.clientName || "Our Projects Showcase",
        budget: op.budget || 50000
      }))
    ];
    const selectedProj = allAvailableProjects.find(p => p.id === selectedClientProjectId || p.id === docItem.projectId || p.name === docItem.projectName);
    const htmlContent = preset?.htmlContent && !hasSavedOverride ? preset.htmlContent : (
      type === "invoice"
        ? generateSpeshwayTaxInvoicePdfHtml(docItem, selectedProj || null, 1.0)
        : type === "agreement"
          ? generateSpeshwayAgreementPdfHtml(docItem, selectedProj || null, 1.0)
          : generateSpeshwayEstimationPdfHtml(null, docItem, features.filter(f => f.projectId === docItem.projectId || f.projectName === docItem.projectName), 1.0)
    );
    const presetFileName = (preset?.fileName || "").toLowerCase();
    const isCombinedDoc = presetFileName.includes("quotation_invoice") || presetFileName.includes("quotation-and-invoice");
    const docLabel = isCombinedDoc ? "Quotation and Tax Invoice" : (type === "invoice" ? "Tax Invoice" : type === "agreement" ? "Service Agreement" : "Quotation");
    const ref = docItem.number || docItem.id || docItem.title || docLabel;
    const clientName = docItem.clientName || activeClientDetail?.name || leadDetailForm?.name || "Client";
    const toEmail = (preset?.toEmail || docItem.clientEmail || activeClientDetail?.email || leadDetailForm?.email || "").trim();

    if (!toEmail) {
      showToast("Client email is missing. Add the email address before sending.", "error");
      return;
    }

    setClientEmailModal({
      toEmail,
      subject: preset?.subject || `${docLabel} ${ref} from Speshway Solutions`,
      textContent: preset?.textContent || `Hello ${clientName},\n\nPlease find attached your ${docLabel.toLowerCase()} PDF.\n\nBest regards,\nSpeshway Solutions`,
      fileName: preset?.fileName || `${docLabel}_${String(ref).replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
      htmlContent,
      item: docItem,
      isSending: false
    });
    showToast(`${docLabel} email draft opened for ${toEmail}.`, "info");
  };

  const handleSendEmailPdfAttachment = async () => {
    if (!clientEmailModal || !clientEmailModal.toEmail) {
      showToast("Client email is missing. Add an email address before sending.", "error");
      return;
    }
    const mailData = { ...clientEmailModal };
    const logId = `EML-${Math.floor(1000 + Math.random() * 9000)}`;
    const sentDocType = mailData.fileName.toLowerCase().includes("invoice") ? "invoice" : "quotation";
    const baseSentDocItem = mailData.item || {};
    const leadScope: any = leadDetailForm || {};
    const selectedLeadScope: any = selectedLeadForDetail || {};
    const sentDocItem = {
      ...baseSentDocItem,
      id: baseSentDocItem.id || baseSentDocItem.number || mailData.fileName.replace(".pdf", ""),
      number: baseSentDocItem.number || baseSentDocItem.id || mailData.fileName.replace(".pdf", ""),
      clientId: baseSentDocItem.clientId || getClientDocumentUrlParam("clientId") || activeClientDetail?.id || leadScope.clientId || "",
      clientName: baseSentDocItem.clientName || activeClientDetail?.name || leadScope.name || selectedLeadScope.name || "",
      clientCompany: baseSentDocItem.clientCompany || activeClientDetail?.company || leadScope.company || leadScope.companyName || selectedLeadScope.company || selectedLeadScope.companyName || "",
      clientEmail: baseSentDocItem.clientEmail || mailData.toEmail || activeClientDetail?.email || leadScope.email || selectedLeadScope.email || "",
      projectId: baseSentDocItem.projectId || selectedClientProjectId || getClientDocumentUrlParam("clientProjectId") || "",
      projectName: baseSentDocItem.projectName || baseSentDocItem.productName || projects.find(p => p.id === selectedClientProjectId)?.name || "",
      sentToEmail: mailData.toEmail,
      status: baseSentDocItem.status || "Sent",
      updatedAt: new Date().toISOString(),
    };
    const sentDocRef = sentDocItem.number || sentDocItem.id || mailData.fileName.replace(".pdf", "");
    const sentDocScopes = uniqueClientDocumentValues([
      getActiveClientDocumentScopeId(),
      activeClientDetail?.id,
      activeClientDetail?.name,
      activeClientDetail?.company,
      activeClientDetail?.email,
      leadScope.clientId,
      leadScope.id,
      leadScope.name,
      leadScope.company,
      leadScope.companyName,
      leadScope.email,
      selectedLeadScope.id,
      selectedLeadScope.name,
      selectedLeadScope.company,
      selectedLeadScope.companyName,
      selectedLeadScope.email,
      sentDocItem.clientId,
      sentDocItem.clientName,
      sentDocItem.clientCompany,
      sentDocItem.clientEmail,
      mailData.toEmail,
    ]);
    const sentDocRefs = uniqueClientDocumentValues([
      sentDocRef,
      sentDocItem.id,
      sentDocItem.number,
      sentDocItem.projectId,
      sentDocItem.projectName,
    ]);
    const sentDocKeys = sentDocScopes.flatMap((scope: string) => sentDocRefs.map((ref: string) => `${scope}::${sentDocType}::${ref}`));
    const sentDocKey = sentDocKeys[0] || `${mailData.toEmail}::${sentDocType}::${sentDocRef}`;
    const portalDocument = {
      id: sentDocKey,
      documentKey: sentDocKey,
      overrideKeys: sentDocKeys,
      documentType: sentDocType,
      documentRef: sentDocRef,
      clientScope: getActiveClientDocumentScopeId(),
      clientId: sentDocItem.clientId,
      clientProjectId: sentDocItem.projectId || selectedClientProjectId || "",
      sentToEmail: mailData.toEmail,
      visibleToClient: true,
      source: "email-send",
      subject: mailData.subject,
      fileName: mailData.fileName,
      htmlContent: mailData.htmlContent,
      item: sentDocItem,
      sentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const pendingLog = {
      id: logId,
      recipient: mailData.toEmail,
      subject: mailData.subject,
      docType: mailData.fileName.toLowerCase().includes("quotation_invoice")
        ? "Quotation and Tax Invoice"
        : (mailData.fileName.toLowerCase().includes("invoice") ? "Tax Invoice" : "Quotation"),
      docRef: mailData.item?.number || mailData.item?.id || mailData.fileName.replace('.pdf', ''),
      fileName: mailData.fileName,
      sentAt: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      status: "SENDING...",
      htmlContent: mailData.htmlContent,
      item: mailData.item
    };

    setSentEmailLogs(prev => [pendingLog, ...prev]);
    setClientEmailModal(null);
    showToast(`⚡ Dispatching email with PDF attachment to ${mailData.toEmail}...`, "info");

    (async () => {
      try {
        const pdfDataUri = await generatePdfDataUri(mailData.htmlContent);

        const res = await fetch(`${API_URL}/crm/send-email-pdf`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: mailData.toEmail,
            subject: mailData.subject,
            textContent: mailData.textContent,
            pdfBase64: pdfDataUri,
            fileName: mailData.fileName,
            portalDocument
          })
        }).then(r => r.json());

        if (res && res.success) {
          await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(sentDocKey)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(portalDocument)
          }).catch(err => console.error("Failed to save sent client document for portal", err));
          if (sentDocType === "invoice") {
            const matchingQuote = quotations.find((quote: any) => {
              const quoteRefs = uniqueClientDocumentValues([quote.id, quote.number, quote.projectId, quote.projectName]);
              const invoiceRefs = uniqueClientDocumentValues([
                sentDocItem.id,
                sentDocItem.number,
                sentDocItem.quotationId,
                sentDocItem.proposalId,
                sentDocItem.projectId,
                sentDocItem.projectName,
              ]);
              return quoteRefs.some((quoteRef: string) =>
                invoiceRefs.some((invoiceRef: string) => invoiceRef === quoteRef || invoiceRef.includes(quoteRef) || quoteRef.includes(invoiceRef))
              );
            });
            if (matchingQuote) {
              const quoteDocRef = matchingQuote.number || matchingQuote.id;
              const quoteKeys = sentDocScopes.flatMap((scope: string) => [quoteDocRef, matchingQuote.id, matchingQuote.number, matchingQuote.projectId, matchingQuote.projectName]
                .filter(Boolean)
                .map((ref: any) => `${scope}::quotation::${ref}`));
              const quoteDocKey = quoteKeys[0] || `${mailData.toEmail}::quotation::${quoteDocRef}`;
              await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(quoteDocKey)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...portalDocument,
                  id: quoteDocKey,
                  documentKey: quoteDocKey,
                  overrideKeys: uniqueClientDocumentValues(quoteKeys),
                  documentType: "quotation",
                  documentRef: quoteDocRef,
                  fileName: `Quotation_${String(quoteDocRef).replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
                  item: {
                    ...matchingQuote,
                    clientId: sentDocItem.clientId,
                    clientName: matchingQuote.clientName || sentDocItem.clientName,
                    clientCompany: sentDocItem.clientCompany,
                    clientEmail: (matchingQuote as any).clientEmail || sentDocItem.clientEmail,
                    sentToEmail: mailData.toEmail,
                    status: matchingQuote.status || "Sent",
                  },
                })
              }).catch(err => console.error("Failed to save linked quotation for portal", err));
            }
          }
          setSentEmailLogs(prev => prev.map(log => log.id === logId ? { ...log, status: "DELIVERED" } : log));
          showToast(`✅ Email successfully delivered to ${mailData.toEmail}!`, "success");
        } else {
          setSentEmailLogs(prev => prev.map(log => log.id === logId ? { ...log, status: "FAILED" } : log));
          showToast(res?.message || "Failed to deliver email. Please check SMTP settings.", "error");
        }
      } catch (err: any) {
        console.error("Failed to send PDF email attachment background", err);
        setSentEmailLogs(prev => prev.map(log => log.id === logId ? { ...log, status: "FAILED" } : log));
        showToast(`Error sending email: ${err.message || err}`, "error");
      }
    })();
  };

  const defaultPlanComparisonDeliverables = [
    { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
    { deliverable: "All Core Marketplace Features", planA: true, planB: true },
    { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
    { deliverable: "Real-time WebSocket live updates", planA: false, planB: true },
    { deliverable: "Live project, quotation, invoice & todo sync", planA: false, planB: true },
    { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
    { deliverable: "Push Notifications", planA: false, planB: true },
    { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
  ];

  const isPdfBinaryNoise = (str: string): boolean => {
    if (!str) return true;
    const s = str.trim();
    if (s.startsWith("%PDF") || s.startsWith("%") || s.startsWith("<<") || s.startsWith(">>") || s.includes("obj") || s.includes("endobj")) return true;
    if (/^\/[A-Z][a-zA-Z0-9_]*/.test(s)) return true;
    if (/^\d+\s+\d+\s+obj/i.test(s) || /0\s+obj/i.test(s)) return true;
    if (s.includes("Mozilla/5.0") || s.includes("AppleWebKit") || s.includes("Skia/PDF") || s.includes("CreationDate")) return true;
    return false;
  };

  const sanitizeTextContent = (text: string, defaultFallback: string = ""): string => {
    if (!text || typeof text !== "string") return defaultFallback;

    const hasGarbage = text.includes("\uFFFD") || text.includes("FlateDecode") || text.includes("endstream") || text.includes("endobj") || text.includes("Mozilla/5.0") || text.includes("AppleWebKit") || /\/Font|\/BBox|\/StructParents|\/MediaBox/.test(text);

    if (!hasGarbage) {
      const trimmed = text.trim();
      return trimmed.length > 0 ? trimmed : defaultFallback;
    }

    const lines = text.split(/\r?\n/);
    const cleanLines = lines.filter(line => {
      const l = line.trim();
      if (!l || l.length < 2) return false;
      if (l.includes("\uFFFD")) return false;
      if (l.includes("FlateDecode") || l.includes("endstream") || l.includes("endobj") || l.includes("Mozilla/5.0") || l.includes("AppleWebKit")) return false;
      if (/^\/[A-Z][a-zA-Z0-9_]*/.test(l) || /^\d+\s+\d+\s+obj/i.test(l) || l.includes("stream x")) return false;

      const printableCount = (l.match(/[a-zA-Z0-9\s.,:;!?'"()\-/$%#&*+=@]/g) || []).length;
      return (printableCount / l.length) >= 0.6;
    });

    const result = cleanLines.join("\n").trim();
    return result.length > 0 ? result : defaultFallback;
  };

  const extractReadableTextFromFile = (file: File, content: string): string[] => {
    if (!content) return [];
    const fileName = file.name.toLowerCase();

    // 1. JSON file handling
    if (fileName.endsWith(".json")) {
      try {
        const parsed = JSON.parse(content);
        if (typeof parsed === "string") return [parsed];
        if (Array.isArray(parsed)) {
          return parsed.map(item => typeof item === "string" ? item : (item.title || item.name || item.deliverable || item.description || JSON.stringify(item)));
        }
        if (typeof parsed === "object" && parsed !== null) {
          const lines: string[] = [];
          Object.entries(parsed).forEach(([key, val]) => {
            if (typeof val === "string" && val.trim().length > 0) {
              lines.push(`${key}: ${val.trim()}`);
            } else if (Array.isArray(val)) {
              val.forEach(v => {
                if (typeof v === "string") lines.push(v);
                else if (typeof v === "object" && v !== null) {
                  lines.push(v.deliverable || v.title || v.name || v.description || JSON.stringify(v));
                }
              });
            }
          });
          return lines.length > 0 ? lines : [JSON.stringify(parsed)];
        }
      } catch {}
    }

    // 2. DOCX XML tag extraction
    if (fileName.endsWith(".docx") || content.includes("<w:t")) {
      const matches = content.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
      if (matches && matches.length > 0) {
        const extracted = matches.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
        if (extracted.length > 0) return extracted;
      }
    }

    // 3. PDF stream text extraction
    if (fileName.endsWith(".pdf") || content.startsWith("%PDF")) {
      const parenMatches = content.match(/\(([^()\\]|\\[\s\S])*\)/g);
      const pdfTextLines: string[] = [];
      if (parenMatches) {
        parenMatches.forEach(match => {
          const clean = match.slice(1, -1).replace(/\\([()])/g, "$1").trim();
          const printableCount = (clean.match(/[a-zA-Z0-9\s.,:;!?'"()\-/$%#&*+=@]/g) || []).length;
          if (clean.length >= 3 && (printableCount / clean.length) >= 0.75 && !/^\/[A-Z]/.test(clean) && !clean.startsWith("%") && !clean.includes("Skia/PDF") && !clean.includes("Mozilla/5.0")) {
            pdfTextLines.push(clean);
          }
        });
      }
      if (pdfTextLines.length > 0) return pdfTextLines;
    }

    // 4. TXT / CSV / Raw text fallback - strictly filter binary noise
    const rawLines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const printableLines = rawLines.filter(line => {
      if (line.includes("\uFFFD") || line.includes("\u0000")) return false;
      const isNoise = line.startsWith("%PDF") || line.startsWith("%") || line.includes("endstream") || line.includes("endobj") || line.includes("Mozilla/5.0") || line.includes("AppleWebKit") || /^\/[A-Z][a-zA-Z0-9_]*/.test(line);
      const printableCount = (line.match(/[a-zA-Z0-9\s.,:;!?'"()\-/$%#&*+=@]/g) || []).length;
      return !isNoise && (printableCount / line.length) >= 0.75;
    });

    return printableLines;
  };

  const getCleanPlanComparisonItems = (items: any[]) => {
    if (!Array.isArray(items) || items.length === 0) return defaultPlanComparisonDeliverables;
    const cleaned = items.filter((it: any) => {
      const name = it.deliverable || it.title || it.name || it.service || "";
      return name && !isPdfBinaryNoise(name);
    }).map((it: any) => ({
      deliverable: it.deliverable || it.title || it.name || it.service || "Deliverable Item",
      planA: it.planA !== undefined ? Boolean(it.planA) : true,
      planB: it.planB !== undefined ? Boolean(it.planB) : true
    }));
    return cleaned.length > 0 ? cleaned : defaultPlanComparisonDeliverables;
  };

  const [quotePlanComparisonItems, setQuotePlanComparisonItems] = useState<any[]>(defaultPlanComparisonDeliverables);
  const [newComparisonDeliverableText, setNewComparisonDeliverableText] = useState("");

  const featureFileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleFeatureFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeProjectDetail) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      let extractedFeatures: any[] = [];

      try {
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(content);
          const items = Array.isArray(parsed) ? parsed : (parsed.features || parsed.serviceItems || parsed.deliverables || [parsed]);
          extractedFeatures = items.map((item: any, idx: number) => ({
            id: `FEAT-FILE-${Date.now()}-${idx}`,
            projectId: activeProjectDetail.id,
            projectName: activeProjectDetail.name,
            title: item.title || item.feature || item.name || item.description || `Feature ${idx + 1}`,
            moduleName: item.moduleName || item.category || "Uploaded Module",
            description: item.description || item.details || `Extracted from ${file.name}`,
            priority: item.priority || "High",
            assignedDeveloper: item.assignedDeveloper || "File Upload Import",
            progress: item.progress || 100,
            status: item.status || "Completed",
            sourceFile: file.name
          }));
        } else if (file.name.toLowerCase().endsWith(".csv")) {
          const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
          extractedFeatures = lines.map((line, idx) => {
            const parts = line.split(",");
            const titleVal = (parts[0] || `Feature ${idx + 1}`).replace(/^["']|["']$/g, "").trim();
            const moduleVal = (parts[1] || "Uploaded Scope").replace(/^["']|["']$/g, "").trim();
            const descVal = (parts[2] || `Imported line ${idx + 1} from ${file.name}`).replace(/^["']|["']$/g, "").trim();
            return {
              id: `FEAT-FILE-${Date.now()}-${idx}`,
              projectId: activeProjectDetail.id,
              projectName: activeProjectDetail.name,
              title: titleVal,
              moduleName: moduleVal,
              description: descVal,
              priority: "High",
              assignedDeveloper: "File Upload Import",
              progress: 100,
              status: "Completed",
              sourceFile: file.name
            };
          });
        } else {
          const lines = extractReadableTextFromFile(file, content);
          extractedFeatures = lines
            .filter(l => {
              const lower = l.toLowerCase();
              return !lower.startsWith("ref:") && !lower.startsWith("date:") && !lower.startsWith("project:") && !lower.startsWith("client:") && !lower.startsWith("valid until:");
            })
            .map((line, idx) => {
              const cleanLine = line.replace(/^[•\-\*\d+\.\>\)]+\s*/, "").trim();
              let title = cleanLine;
              let description = `Imported scope feature from '${file.name}'`;
              
              if (cleanLine.includes(":") || cleanLine.includes(" - ")) {
                const splitChar = cleanLine.includes(":") ? ":" : " - ";
                const parts = cleanLine.split(splitChar);
                title = parts[0].trim();
                description = parts.slice(1).join(splitChar).trim() || description;
              }

              return {
                id: `FEAT-FILE-${Date.now()}-${idx}`,
                projectId: activeProjectDetail.id,
                projectName: activeProjectDetail.name,
                title: title.length > 70 ? title.slice(0, 70) + "..." : title,
                moduleName: "Uploaded Scope Module",
                description: description,
                priority: "High",
                assignedDeveloper: "File Upload Import",
                progress: 100,
                status: "Completed",
                sourceFile: file.name
              };
            });
        }

        if (extractedFeatures.length > 0) {
          setFeatures(prev => [...extractedFeatures, ...prev]);

          for (const feat of extractedFeatures) {
            try {
              await fetch(`${API_URL}/crm/feature`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feat)
              });
            } catch (err) {
              console.error("[Save File Feature Error]", err);
            }
          }
          showToast(`Successfully imported ${extractedFeatures.length} features from '${file.name}' into ${activeProjectDetail.name}!`, "success");
        }
      } catch (err) {
        console.error("[File Parse Error]", err);
        showToast("Failed to parse features file. Please ensure it is a valid TXT, JSON, or CSV file.", "error");
      }
      if (e.target) e.target.value = "";
    };
    reader.readAsText(file);
  };

  const universalSectionFileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeSectionToUpload, setActiveSectionToUpload] = useState<string>("overview");

  const handleSaveQuotationSection = async (quoteId: string, updatedFields: any) => {
    const existingQuote = quotations.find(q => 
      q.id === quoteId || 
      (q as any).number === quoteId || 
      (activeProjectDetail && (q.projectId === activeProjectDetail.id || (activeProjectDetail.name && q.projectName === activeProjectDetail.name)))
    ) || {
      id: quoteId,
      number: quoteId,
      projectId: activeProjectDetail?.id || updatedFields?.projectId || "PRJ-7030",
      clientName: activeProjectDetail?.clientName || updatedFields?.clientName || "Enterprise Client",
      projectName: activeProjectDetail?.name || updatedFields?.projectName || "Project",
      title: `${activeProjectDetail?.name || updatedFields?.projectName || "Project"} Custom Estimation Proposal`
    };

    const targetId = existingQuote.id || quoteId;
    const updatedData: any = {
      ...existingQuote,
      ...updatedFields,
      id: targetId,
      number: targetId,
      projectId: existingQuote.projectId || activeProjectDetail?.id,
      clientName: existingQuote.clientName || activeProjectDetail?.clientName,
      projectName: existingQuote.projectName || activeProjectDetail?.name
    };

    try {
      const res = await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(targetId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      }).then(r => r.json());

      const finalQuote = res.data || updatedData;
      setQuotations(prev => {
        const exists = prev.some(q => 
          q.id === targetId || 
          (q as any).number === targetId || 
          (activeProjectDetail && (q.projectId === activeProjectDetail.id || (activeProjectDetail.name && q.projectName === activeProjectDetail.name)))
        );
        let updatedList: any[] = [];
        if (exists) {
          updatedList = prev.map(q => (
            q.id === targetId || 
            (q as any).number === targetId || 
            (activeProjectDetail && (q.projectId === activeProjectDetail.id || (activeProjectDetail.name && q.projectName === activeProjectDetail.name)))
          ) ? finalQuote : q);
        } else {
          updatedList = [finalQuote, ...prev];
        }
        localStorage.setItem("crm_quotations", JSON.stringify(updatedList));
        return updatedList;
      });
      showToast("Section updated & saved to MongoDB Atlas database successfully!", "success");
    } catch (err) {
      console.error("[Save Section Error]", err);
      setQuotations(prev => [updatedData, ...prev.filter(q => q.id !== targetId)]);
      showToast("Section updated!", "success");
    }
  };

  const handleUniversalSectionFileUpload = (e: React.ChangeEvent<HTMLInputElement>, sectionId: string, activeQuote: any) => {
    const file = e.target.files?.[0];
    if (!file || !activeProjectDetail) return;

    const currentSection = sectionId || activeProjectTab || "overview";
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = extractReadableTextFromFile(file, content);
      const cleanText = lines.join('\n');
      const qId = activeQuote?.id || activeQuote?.number || `QT-${activeProjectDetail.id}`;

      // Support full JSON quote configuration upload
      if (file.name.toLowerCase().endsWith(".json")) {
        try {
          const jsonParsed = JSON.parse(content);
          if (typeof jsonParsed === "object" && jsonParsed !== null && !Array.isArray(jsonParsed)) {
            await handleSaveQuotationSection(qId, jsonParsed);
            showToast(`Uploaded JSON proposal document '${file.name}' and updated fields in database!`, "success");
            if (e.target) e.target.value = "";
            return;
          }
        } catch {}
      }

      if (currentSection === "overview") {
        await handleSaveQuotationSection(qId, { overviewNarrative: cleanText });
      } else if (currentSection === "user-roles") {
        const third = Math.ceil(lines.length / 3);
        const cDesc = lines.slice(0, third).join('\n') || cleanText;
        const mDesc = lines.slice(third, third * 2).join('\n') || cleanText;
        const aDesc = lines.slice(third * 2).join('\n') || cleanText;
        await handleSaveQuotationSection(qId, { customerDesc: cDesc, merchantDesc: mDesc, adminDesc: aDesc });
      } else if (currentSection === "features") {
        await handleFeatureFileUpload(e);
        if (e.target) e.target.value = "";
        return;
      } else if (currentSection === "investment-plans") {
        const nums = cleanText.match(/\d[\d,.]*/g);
        if (nums && nums.length >= 2) {
          const pA = Number(nums[0].replace(/,/g, ''));
          const pB = Number(nums[1].replace(/,/g, ''));
          await handleSaveQuotationSection(qId, { planAPrice: pA, planBPrice: pB, overviewNarrative: cleanText });
        } else {
          await handleSaveQuotationSection(qId, { overviewNarrative: cleanText });
        }
      } else if (currentSection === "plan-comparison") {
        const items = lines.map(line => ({ deliverable: line, planA: true, planB: true }));
        await handleSaveQuotationSection(qId, { planComparisonItems: items });
      } else if (currentSection === "payment-terms") {
        await handleSaveQuotationSection(qId, { paymentTerms: cleanText });
      } else if (currentSection === "terms-conditions") {
        await handleSaveQuotationSection(qId, { termsAndConditions: cleanText });
      } else if (currentSection === "company-details") {
        await handleSaveQuotationSection(qId, { companyDetailsDoc: cleanText });
      } else {
        await handleSaveQuotationSection(qId, { overviewNarrative: cleanText });
      }

      showToast(`Uploaded document '${file.name}' and updated section '${currentSection}' successfully!`, "success");
      if (e.target) e.target.value = "";
    };
    reader.readAsText(file);
  };

  const getQuoteFinalVal = (q: any): number => {
    if (!q) return 0;
    let subtotal = 0;
    if (q.serviceItems && Array.isArray(q.serviceItems) && q.serviceItems.length > 0) {
      subtotal = q.serviceItems.reduce((acc: number, item: any) => {
        let r = Number(item.rate || item.amount || 0);
        if (isNaN(r) || r > 10000000) r = 15000;
        let qty = Number(item.qty || 1);
        if (isNaN(qty) || qty > 100) qty = 1;
        return acc + (r * qty);
      }, 0);
    } else {
      let planA = Number(q.planAPrice || q.budget || 50000);
      if (isNaN(planA) || planA > 10000000) planA = 50000;
      subtotal = planA;
    }

    if (isNaN(subtotal) || subtotal > 100000000) subtotal = 50000;

    const discPct = Math.min(100, Math.max(0, Number(q.discount || 0)));
    const afterDiscount = subtotal * (1 - discPct / 100);
    const taxPct = Math.max(0, Number(q.tax || 18));
    const finalVal = Math.round(afterDiscount * (1 + taxPct / 100));
    return (isNaN(finalVal) || finalVal > 100000000) ? 59000 : finalVal;
  };

  const quoteFileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedQuoteFileName, setUploadedQuoteFileName] = useState<string>("");

  const handleQuoteFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedQuoteFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const projId = activeProjectDetail ? activeProjectDetail.id : `PROJ-${Date.now().toString().slice(-4)}`;
      const projName = activeProjectDetail ? activeProjectDetail.name : "General Proposal";
      const clientName = activeProjectDetail ? (activeProjectDetail.clientName || "Enterprise Client") : "Enterprise Client";

      let parsedQuoteData: any = null;

      try {
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(content);
          parsedQuoteData = {
            title: parsed.title || `${projName} Custom Quotation Proposal`,
            clientName: parsed.clientName || clientName,
            projectName: parsed.projectName || projName,
            currency: parsed.currency || "Indian Rupees (INR)",
            planAName: parsed.planAName || "PLAN A — Web Only",
            planAPrice: (parsed.planAPrice && Number(parsed.planAPrice) < 10000000) ? Number(parsed.planAPrice) : 60000,
            planBName: parsed.planBName || "PLAN B — Web + Mobile",
            planBPrice: (parsed.planBPrice && Number(parsed.planBPrice) < 10000000) ? Number(parsed.planBPrice) : 65000,
            planComparisonItems: Array.isArray(parsed.planComparisonItems || parsed.planComparison)
              ? (parsed.planComparisonItems || parsed.planComparison).map((it: any) => ({
                  deliverable: it.deliverable || it.title || it.service || "Deliverable Item",
                  planA: it.planA !== undefined ? Boolean(it.planA) : true,
                  planB: it.planB !== undefined ? Boolean(it.planB) : true
                }))
              : [
                  { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                  { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                  { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                  { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                  { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                  { deliverable: "Push Notifications", planA: false, planB: true },
                  { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                ],
            discount: parsed.discount || 0,
            tax: parsed.tax || 18,
            validUntil: parsed.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            overviewNarrative: parsed.overviewNarrative || parsed.overview || "",
            customerDesc: parsed.customerDesc || "",
            merchantDesc: parsed.merchantDesc || "",
            adminDesc: parsed.adminDesc || "",
            paymentTerms: parsed.paymentTerms || "",
            termsAndConditions: parsed.termsAndConditions || parsed.terms || "",
            serviceItems: Array.isArray(parsed.serviceItems || parsed.items || parsed.deliverables)
              ? (parsed.serviceItems || parsed.items || parsed.deliverables).map((it: any) => ({
                  description: it.description || it.title || it.service || "Scope Item",
                  qty: (it.qty && Number(it.qty) < 100) ? Number(it.qty) : 1,
                  rate: (it.rate && Number(it.rate) < 10000000) ? Number(it.rate) : 15000
                }))
              : []
          };
        } else {
          const lines = extractReadableTextFromFile(file, content);
          const overviewLine = lines.find(l => l.toLowerCase().includes("overview")) || lines[0] || "";
          const termsLine = lines.find(l => l.toLowerCase().includes("term")) || "";

          const parsedItems = lines
            .slice(0, 15)
            .map((line, idx) => {
              const cleanLine = line.replace(/^[•\-\*\d+\.\>\)]+\s*/, "").trim();
              let title = cleanLine;
              let desc = `Scope item imported from file ${file.name}`;
              let rateNum = 15000;

              if (cleanLine.includes(":") || cleanLine.includes(" - ")) {
                const splitChar = cleanLine.includes(":") ? ":" : " - ";
                const parts = cleanLine.split(splitChar);
                title = parts[0].trim();
                desc = parts.slice(1).join(splitChar).trim() || desc;

                const rateMatch = desc.match(/(?:[\$₹]|INR|USD|Rs\.?)?\s*([0-9,]{4,7})/i);
                if (rateMatch && rateMatch[1]) {
                  const r = Number(rateMatch[1].replace(/,/g, ""));
                  if (!isNaN(r) && r >= 1000 && r <= 5000000) rateNum = r;
                }
              }

              return {
                title: title.length > 70 ? title.slice(0, 70) + "..." : title,
                description: title.length > 70 ? title : `${title}: ${desc}`,
                service: title,
                qty: 1,
                rate: rateNum
              };
            });

          parsedQuoteData = {
            title: `${projName} Custom Quotation Proposal`,
            clientName: clientName,
            projectName: projName,
            currency: "Indian Rupees (INR)",
            planAName: "PLAN A — Web Only",
            planAPrice: 50000,
            planBName: "PLAN B — Web + Mobile",
            planBPrice: 65000,
            planComparisonItems: lines.map(l => ({ deliverable: l, planA: true, planB: true })),
            discount: 0,
            tax: 18,
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            overviewNarrative: overviewLine ? overviewLine.replace(/^overview[:\s]*/i, "").trim() : `Imported overview specifications from ${file.name}.`,
            customerDesc: "Customer portal & role access specifications imported from document.",
            merchantDesc: "Merchant & service vendor portal specifications imported from document.",
            adminDesc: "Super Admin panel & governance controls imported from document.",
            paymentTerms: "40% advance on project kick-off\n30% on completion of core module\n30% on final delivery",
            termsAndConditions: termsLine ? termsLine.replace(/^terms[:\s]*/i, "").trim() : `Estimation proposal imported from file ${file.name}. Valid for 30 days.`,
            serviceItems: parsedItems.length > 0 ? parsedItems : [
              { title: `Core Scope Feature`, description: `Core Features from ${file.name}`, service: `Core Scope Feature`, qty: 1, rate: 60000 }
            ]
          };
        }

        const quoteId = `QT-${Date.now().toString().slice(-4)}`;
        const finalQuoteRecord: any = {
          id: quoteId,
          number: quoteId,
          projectId: projId,
          ...parsedQuoteData,
          status: "Approved",
          createdBy: "File Import Operator",
          createdDate: new Date().toISOString().split("T")[0],
          documentRef: `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/FILE/2026`
        };

        try {
          const res = await fetch(`${API_URL}/crm/quotation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalQuoteRecord)
          }).then(r => r.json());

          const newQuote = res.data || finalQuoteRecord;
          setQuotations(prev => [newQuote, ...prev]);
          showToast(`Successfully imported quotation file '${file.name}' and saved proposal to database!`, "success");
        } catch (err) {
          console.error("[Save Quote File Error]", err);
          setQuotations(prev => [finalQuoteRecord, ...prev]);
          showToast(`Imported proposal from '${file.name}'!`, "success");
        }
      } catch (err) {
        console.error("[Quote File Error]", err);
        showToast("Failed to process file. Please ensure it is a valid TXT, JSON, CSV, DOC, or PDF file.", "error");
      }
      if (e.target) e.target.value = "";
    };
    reader.readAsText(file);
  };

  const handleToggleProjectType = (typeKey: string) => {
    if (selectedProjectTypes.includes(typeKey)) {
      setSelectedProjectTypes(prev => prev.filter(t => t !== typeKey));
    } else {
      if (selectedProjectTypes.length >= 2) {
        setSelectedProjectTypes([selectedProjectTypes[1], typeKey]);
      } else {
        setSelectedProjectTypes(prev => [...prev, typeKey]);
      }
    }
  };

  const handleGenerateCombinedQuotation = () => {
    if (!activeProjectDetail || selectedProjectTypes.length === 0) return;

    const projName = activeProjectDetail.name || "Project";
    const clientName = activeProjectDetail.clientName || "Client Profile";

    const typeMap: Record<string, { title: string; price: number; features: any[] }> = {
      website: {
        title: "Website / Web Application",
        price: 50000,
        features: [
          { title: "Responsive Web Portal", description: "Modern, high-performance web portal built with Next.js/React & Tailwind CSS." },
          { title: "User Authentication & Roles", description: "Secure OAuth2 / JWT login, passwordless OTP, and role-based access control." },
          { title: "Admin Management Dashboard", description: "Comprehensive management panel for content, users, and platform analytics." },
          { title: "Payment Gateway Integration", description: "Card, UPI, Netbanking integration via Stripe / Razorpay." },
          { title: "SEO & Speed Optimization", description: "Server-side rendering (SSR), dynamic meta tags, and Lighthouse 95+ performance." },
          { title: "SSL & Cloud Deployment", description: "Automated CI/CD pipeline, SSL encryption, and AWS/Vercel deployment." }
        ]
      },
      mobile: {
        title: "Mobile Application (iOS & Android)",
        price: 90000,
        features: [
          { title: "Cross-Platform iOS & Android App", description: "Native-performance mobile application built with React Native / Flutter." },
          { title: "Push Notification Suite", description: "Real-time automated push notifications for updates, alerts, and promotional campaigns." },
          { title: "In-App Camera & QR Scanner", description: "Hardware integration for QR code scanning, image capture, and document upload." },
          { title: "Offline Data Sync & Storage", description: "Local SQLite database synchronization for seamless offline app usage." },
          { title: "In-App Chat & Messaging", description: "Real-time WebSocket chat between users and support/merchants." },
          { title: "App Store & Play Store Publishing", description: "Complete publishing setup, compliance audit, and release management." }
        ]
      },
      marketplace: {
        title: "Web & Mobile Marketplace Platform",
        price: 120000,
        features: [
          { title: "Customer Booking & Service Hiring Portal", description: "Browse, filter, add to cart, and book events or hire service providers." },
          { title: "Merchant / Vendor Dashboard", description: "Vendor onboarding, catalog management, booking management, and payout ledger." },
          { title: "Super Admin Control Panel", description: "Ecosystem governance, commission rates control, refund approvals, and audit logs." },
          { title: "Multi-Vendor Payment Split & Payouts", description: "Automated payment splits, commission retention, and vendor direct bank payouts." },
          { title: "QR Code Entry & Validation", description: "Unique encrypted QR tickets generated upon checkout with instant scanner validation." }
        ]
      },
      erp: {
        title: "Enterprise Cloud ERP & CRM System",
        price: 150000,
        features: [
          { title: "Lead Lifecycle & Sales CRM", description: "Pipeline tracking, automated follow-up scheduling, and deal stage analytics." },
          { title: "Inventory & Stock Control", description: "Multi-warehouse inventory tracking, reorder alerts, and SKU barcode management." },
          { title: "HRMS & Payroll Management", description: "Employee attendance, leaves, automated monthly payroll, and tax deductions." },
          { title: "Invoicing & Financial Accounting", description: "GST invoice generation, expense tracking, profit/loss ledger, and financial reports." }
        ]
      },
      ai: {
        title: "AI / ML Automation Suite",
        price: 180000,
        features: [
          { title: "LLM Content & Data Extraction Engine", description: "Custom AI pipeline powered by OpenAI / Claude / DeepSeek APIs." },
          { title: "Automated Document Processing (OCR)", description: "PDF/Image invoice parsing, structured data extraction, and automatic database sync." },
          { title: "Intelligent AI Chatbot Assistant", description: "Custom RAG knowledge chatbot for automated 24/7 customer support." },
          { title: "Predictive Analytics & Forecasting", description: "Machine learning models for sales forecasting, churn prediction, and trend analysis." }
        ]
      },
      custom: {
        title: "Custom Software Solution",
        price: 100000,
        features: [
          { title: "Custom Architecture & Database", description: "Tailored microservices/monolith architecture engineered for client requirements." },
          { title: "API Integration & Webhooks", description: "Third-party REST/GraphQL API integrations with robust retry mechanisms." },
          { title: "Dedicated Support & SLAs", description: "99.9% uptime SLA, dedicated technical manager, and 24/7 emergency support." }
        ]
      }
    };

    const selectedData = selectedProjectTypes.map(key => typeMap[key]).filter(Boolean);
    if (selectedData.length === 0) return;

    const combinedTitle = selectedData.map(d => d.title).join(" + ") + " Proposal";
    
    // Price 1 (Option 1 base) and Price 2 (Option 1 + Option 2 combined)
    const planAPrice = selectedData[0].price;
    const planBPrice = selectedData.length > 1 
      ? (selectedData[0].price + selectedData[1].price) 
      : Math.round(planAPrice * 1.75);

    let combinedFeatures: any[] = [];
    selectedData.forEach(d => {
      combinedFeatures = [...combinedFeatures, ...d.features];
    });

    const docRef = `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/${selectedProjectTypes.join('-').toUpperCase()}/2026`;

    const newQuote: Quotation = {
      id: `QT-${Date.now().toString().slice(-4)}`,
      projectId: activeProjectDetail.id,
      number: `QT-${Date.now().toString().slice(-4)}`,
      title: combinedTitle,
      clientName: clientName,
      projectName: projName,
      projectType: selectedData.map(d => d.title).join(" + "),
      currency: "Indian Rupees (INR)",
      planAPrice: planAPrice,
      planBPrice: planBPrice,
      status: "Approved",
      discount: 0,
      tax: 18,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      documentRef: docRef,
      terms: "",
      notes: "",
      createdBy: "Admin Operator",
      createdDate: new Date().toISOString().split("T")[0],
      serviceItems: combinedFeatures.map(f => ({
        service: f.title,
        description: `${f.title}: ${f.description}`,
        qty: 1,
        rate: Math.round(planAPrice / Math.max(1, combinedFeatures.length))
      }))
    };

    setQuotations(prev => [
      newQuote,
      ...prev.filter(q => q.projectId !== activeProjectDetail.id && q.projectName !== projName)
    ]);

    setActiveProjectTab("quotations");
  };

  const handleCreateScopeQuotation = async (project: any, scopeKey: string) => {
    if (!project) return;
    const projId = project.id || `PRJ-${Date.now().toString().slice(-4)}`;
    const projName = project.name || "Project";
    const clientName = project.clientName || "Enterprise Client";

    const scopeConfigs: Record<string, any> = {
      website: {
        scopeTag: "Website Application",
        code: "WEB",
        title: `${projName} - Website Application Quotation`,
        planAName: "PLAN A — Responsive Web Portal",
        planAPrice: 50000,
        planBName: "PLAN B — Web Platform & Admin Suite",
        planBPrice: 65000,
        items: [
          { description: "Responsive Web Portal (Next.js / React & Tailwind CSS)", qty: 1, rate: 15000 },
          { description: "User Authentication & Role Management (OAuth2 / JWT)", qty: 1, rate: 10000 },
          { description: "Admin Operations & Analytics Management Dashboard", qty: 1, rate: 12000 },
          { description: "Payment Gateway Integration (Stripe / Razorpay)", qty: 1, rate: 8000 },
          { description: "SEO Optimization & Speed Tuning (Lighthouse 95+)", qty: 1, rate: 5000 }
        ]
      },
      mobile: {
        scopeTag: "Mobile Application",
        code: "MOB",
        title: `${projName} - Mobile Application (iOS & Android) Quotation`,
        planAName: "PLAN A — Cross-Platform Native Mobile Apps",
        planAPrice: 90000,
        planBName: "PLAN B — Mobile Apps + Backend Cloud API",
        planBPrice: 140000,
        items: [
          { description: "Cross-Platform iOS & Android Native Mobile Application", qty: 1, rate: 35000 },
          { description: "Real-Time Push Notification & Alert Engine", qty: 1, rate: 15000 },
          { description: "In-App Camera & High-Speed QR Code Scanner Integration", qty: 1, rate: 12000 },
          { description: "Offline Local Database Storage & Background Sync", qty: 1, rate: 13000 },
          { description: "WebSocket Real-Time Chat & User Support Suite", qty: 1, rate: 15000 }
        ]
      },
      both: {
        scopeTag: "Web & Mobile Application",
        code: "BOTH",
        title: `${projName} - Web & Mobile Application (Combined) Quotation`,
        planAName: "PLAN A — Full Web + Mobile App Ecosystem",
        planAPrice: 130000,
        planBName: "PLAN B — Enterprise Web + Mobile Platform Suite",
        planBPrice: 190000,
        items: [
          { description: "Full-Stack Web Portal & Customer Web Application Workspace", qty: 1, rate: 30000 },
          { description: "iOS & Android Native Performance Mobile Applications", qty: 1, rate: 45000 },
          { description: "Centralized Node.js REST API & Cloud Microservices Server", qty: 1, rate: 25000 },
          { description: "Super Admin Governance, Audit Logs & Financial Control Panel", qty: 1, rate: 18000 },
          { description: "Multi-Channel Push & Automated Email Notification Workflows", qty: 1, rate: 12000 }
        ]
      },
      others: {
        scopeTag: "Custom / ERP / AI Suite",
        code: "OTH",
        title: `${projName} - Custom Software & Enterprise Suite Quotation`,
        planAName: "PLAN A — Custom Software Solution",
        planAPrice: 100000,
        planBName: "PLAN B — Enterprise Cloud ERP & AI Automation Suite",
        planBPrice: 160000,
        items: [
          { description: "Tailored Microservices / Monolith Architecture & Database Design", qty: 1, rate: 30000 },
          { description: "Enterprise Cloud ERP & CRM Module Pipeline Integration", qty: 1, rate: 25000 },
          { description: "AI Document Parsing & LLM Data Extraction Engine", qty: 1, rate: 25000 },
          { description: "Multi-Vendor Marketplace Split Payout & Commission Ledger", qty: 1, rate: 12000 },
          { description: "24/7 Dedicated Technical Support, 99.9% Uptime & SLA Guarantee", qty: 1, rate: 8000 }
        ]
      }
    };

    const keysToCreate = scopeKey === "all" ? ["website", "mobile", "both", "others"] : [scopeKey];
    let lastCreatedId = "";

    for (const key of keysToCreate) {
      const cfg = scopeConfigs[key] || scopeConfigs.website;
      const quoteId = `QT-${cfg.code}-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 100)}`;
      const docRef = `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/${cfg.code}/2026`;

      const newQuoteRecord: any = {
        id: quoteId,
        number: quoteId,
        projectId: projId,
        title: cfg.title,
        clientName: clientName,
        projectName: projName,
        projectType: cfg.scopeTag,
        currency: "Indian Rupees (INR)",
        planAName: cfg.planAName,
        planAPrice: cfg.planAPrice,
        planBName: cfg.planBName,
        planBPrice: cfg.planBPrice,
        status: "Approved",
        discount: 0,
        tax: 18,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        documentRef: docRef,
        overviewNarrative: `${cfg.scopeTag} proposal engineered for ${projName}. Delivered with modern architecture, security standards, and comprehensive quality assurance.`,
        serviceItems: cfg.items,
        paymentTerms: "40% advance on kick-off\n30% on core milestone completion\n30% on final release & launch",
        termsAndConditions: "Estimation proposal valid for 30 days.\nIncludes 30 days complimentary post-launch support.",
        createdBy: "Quotation Builder Studio",
        date: new Date().toISOString().split("T")[0]
      };

      try {
        const res = await fetch(`${API_URL}/crm/quotation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newQuoteRecord)
        }).then(r => r.json());
        const saved = res.data || newQuoteRecord;
        setQuotations(prev => [saved, ...prev.filter(q => q.id !== saved.id)]);
        setReviewingQuote(saved);
        setReviewMode("exact-pdf");
      } catch (err) {
        setQuotations(prev => [newQuoteRecord, ...prev]);
        setReviewingQuote(newQuoteRecord);
        setReviewMode("exact-pdf");
      }
      lastCreatedId = quoteId;
    }

    setActiveOurProjectQuotation(project);
    setActiveSelectedQuoteId(lastCreatedId);
  };

  const triggerDirectPdfDownload = (htmlBody: string, fileName: string, compNameOverride?: string) => {
    return utilsTriggerDirectPdfDownload(htmlBody, fileName, compNameOverride);
  };


  const handleDownloadProjectReport = (project: any) => {
    if (!project) return;
    const projectFeaturesList = features.filter(f => 
      f.projectId === project.id || 
      f.projectId === project.name || 
      f.projectName === project.name
    );
    const mainQuote = quotations.find(q => q.projectId === project.id || q.projectName === project.name || q.clientName === project.clientName);

    const pdfHtml = generateSpeshwayEstimationPdfHtml(project, mainQuote, projectFeaturesList);
    triggerDirectPdfDownload(pdfHtml, `${(project.name || "Project").replace(/[^a-zA-Z0-9]/gi, "_")}_Estimation_Document.pdf`);
  };

  const handleDownloadSingleQuote = (q: any) => {
    const projectFeaturesList = features.filter(f => 
      f.projectId === q.projectId || 
      f.projectName === q.projectName
    );
    const pdfHtml = generateSpeshwayEstimationPdfHtml(null, q, projectFeaturesList);
    triggerDirectPdfDownload(pdfHtml, `${(q.number || q.title || "Quotation").replace(/[^a-zA-Z0-9]/gi, "_")}_Proposal.pdf`);
  };

  const sidebarCategories = [
    {
      title: "Overview",
      links: [{ name: "Dashboard Hub", id: "overview", icon: <BarChart3 size={16} /> }]
    },
    {
      title: "CRM Management",
      links: [
        { name: "Clients", id: "clients", icon: <Users size={16} /> },
        { name: "Leads Log", id: "leads", icon: <TrendingUp size={16} /> }
      ]
    },
    {
      title: "Projects workspace",
      links: [
        { name: "Our Projects", id: "our-projects", icon: <Briefcase size={16} /> }
      ]
    },
    {
      title: "Corporate Management",
      links: [
        { name: "System Users", id: "users", icon: <Users size={16} /> }
      ]
    },
    {
      title: "Analytics Reports",
      links: [
        { name: "Lead Reports", id: "reports-leads", icon: <TrendingUp size={16} /> }
      ]
    },
    {
      title: "Configurations",
      links: [
        { name: "General Settings", id: "settings-general", icon: <Settings size={16} /> }
      ]
    }
  ];

  const safeSetStateIfChanged = (setter: Function, newData: any[]) => {
    setter((prev: any[]) => {
      if (prev === newData) return prev;
      if (!Array.isArray(newData)) return newData;
      if (!Array.isArray(prev)) return newData;
      if (prev.length === 0 && newData.length === 0) return prev;
      if (prev.length === newData.length) {
        if (JSON.stringify(prev) === JSON.stringify(newData)) {
          return prev;
        }
      }
      return newData;
    });
  };

  // Fetch all DB states on load using fast bulk endpoint with fallback
  const loadDatabase = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      setHasError(false);

      // Fetch global company details and branding defaults
      try {
        fetch(`${API_URL}/crm/company-branding/default?t=${Date.now()}`)
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              const remote = res.data;
              const stored = localStorage.getItem("crm_global_company_details") || "{}";
              const parsed = JSON.parse(stored);
              const merged = { ...parsed, ...remote };
              localStorage.setItem("crm_global_company_details", JSON.stringify(merged));
              localStorage.setItem("global_crm_company_profile", JSON.stringify(merged));
              window.dispatchEvent(new Event("crm:company-logo-updated"));
            }
          })
          .catch(() => null);
      } catch (brandingErr) {
        console.warn("Failed to sync branding inside loadDatabase:", brandingErr);
      }

      let bulkRes = null;
      try {
        const res = await fetch(`${API_URL}/crm/bulk?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          bulkRes = await res.json();
        }
      } catch (e) {
        bulkRes = null;
      }

      if (bulkRes && bulkRes.success && bulkRes.data && typeof bulkRes.data === "object" && !Array.isArray(bulkRes.data)) {
        const dataMap = bulkRes.data;
        
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("crm_bulk_data_cache", JSON.stringify(dataMap));
          } catch {}
        }
        
        if (Array.isArray(dataMap.client)) safeSetStateIfChanged(setClients, dataMap.client);
        if (Array.isArray(dataMap.call)) safeSetStateIfChanged(setCalls, dataMap.call);
        if (Array.isArray(dataMap.lead)) safeSetStateIfChanged(setLeads, dataMap.lead);
        
        if (Array.isArray(dataMap.project)) {
          const rawProjects = dataMap.project;
          const cleanProjects = rawProjects.filter((p: any) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");
          safeSetStateIfChanged(setProjects, cleanProjects);
        }

        const rawOurProjects = dataMap["our-projects"] || dataMap["ourprojects"] || [];
        let list = Array.isArray(rawOurProjects) ? [...rawOurProjects] : [];
        safeSetStateIfChanged(setOurProjects, list);

        if (Array.isArray(dataMap.quotation)) safeSetStateIfChanged(setQuotations, dataMap.quotation);
        if (Array.isArray(dataMap.feature)) safeSetStateIfChanged(setFeatures, dataMap.feature);
        if (Array.isArray(dataMap.innovation)) safeSetStateIfChanged(setInnovations, dataMap.innovation);
        if (Array.isArray(dataMap.invoice)) safeSetStateIfChanged(setInvoices, dataMap.invoice);
        if (Array.isArray(dataMap.agreement)) safeSetStateIfChanged(setAgreements, dataMap.agreement);
        const rawDocs = dataMap["client-document"] || dataMap["clientdocuments"] || [];
        if (Array.isArray(rawDocs)) safeSetStateIfChanged(setClientDocumentRecords, rawDocs);
        if (Array.isArray(dataMap.payment)) safeSetStateIfChanged(setPayments, dataMap.payment);
        if (Array.isArray(dataMap.expense)) safeSetStateIfChanged(setExpenses, dataMap.expense);
        if (Array.isArray(dataMap.user)) safeSetStateIfChanged(setUsers, dataMap.user);
        if (Array.isArray(dataMap.employee)) safeSetStateIfChanged(setEmployees, dataMap.employee);
        if (Array.isArray(dataMap.team)) safeSetStateIfChanged(setTeams, dataMap.team);

        if (!silent) setIsLoading(false);
        return;
      }

      // Fallback: fetch endpoints individually if bulk fails
      const types = [
        "client", "call", "lead", "project", "our-projects", "quotation", 
        "feature", "innovation", "invoice", "client-document", "payment", 
        "expense", "user", "employee", "team", "agreement"
      ];

      const fetchSingleEndpoint = async (t: string, retries = 2) => {
        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            const res = await fetch(`${API_URL}/crm/${t}?t=${Date.now()}`, { cache: "no-store" });
            if (res.ok) return await res.json();
          } catch (e) {
            if (attempt === retries - 1) return { success: false, data: [] };
          }
        }
        return { success: false, data: [] };
      };
      
      const responses = await Promise.all(types.map(t => fetchSingleEndpoint(t)));
      
      responses.forEach((res, index) => {
        try {
          if (!res || res.success === false) {
            // Skip state and cache updates for unsuccessful requests
            return;
          }
          const rawData = res.data !== undefined ? res.data : (Array.isArray(res) ? res : []);
          const payload = Array.isArray(rawData) ? rawData : [];

          switch (types[index]) {
            case "client": safeSetStateIfChanged(setClients, payload); break;
            case "call": safeSetStateIfChanged(setCalls, payload); break;
            case "lead": safeSetStateIfChanged(setLeads, payload); break;
            case "project": {
              const cleanProjects = payload.filter((p: any) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");
              safeSetStateIfChanged(setProjects, cleanProjects);
              break;
            }
            case "our-projects": {
              safeSetStateIfChanged(setOurProjects, payload);
              break;
            }
            case "quotation": safeSetStateIfChanged(setQuotations, payload); break;
            case "feature": safeSetStateIfChanged(setFeatures, payload); break;
            case "innovation": safeSetStateIfChanged(setInnovations, payload); break;
            case "invoice": safeSetStateIfChanged(setInvoices, payload); break;
            case "agreement": safeSetStateIfChanged(setAgreements, payload); break;
            case "client-document": safeSetStateIfChanged(setClientDocumentRecords, payload); break;
            case "payment": safeSetStateIfChanged(setPayments, payload); break;
            case "expense": safeSetStateIfChanged(setExpenses, payload); break;
            case "user": safeSetStateIfChanged(setUsers, payload); break;
            case "employee": safeSetStateIfChanged(setEmployees, payload); break;
            case "team": safeSetStateIfChanged(setTeams, payload); break;
          }
        } catch (itemErr) {
          console.warn(`[loadDatabase] Non-critical parse error for ${types[index]}:`, itemErr);
        }
      });
    } catch (e) {
      console.error("Failed to load records from Live DB:", e);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const loadRealtimeProjectData = async () => {
    try {
      const [projectRes, quoteRes, invoiceRes, docRes, agreementRes] = await Promise.all([
        fetch(`${API_URL}/crm/project`).then(r => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_URL}/crm/quotation`).then(r => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_URL}/crm/invoice`).then(r => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_URL}/crm/client-document`).then(r => r.json()).catch(() => ({ data: [] })),
        fetch(`${API_URL}/crm/agreement`).then(r => r.json()).catch(() => ({ data: [] })),
      ]);

      const projectPayload = Array.isArray(projectRes?.data) ? projectRes.data : [];
      const cleanProjects = projectPayload.filter((p: any) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");

      safeSetStateIfChanged(setProjects, cleanProjects);
      safeSetStateIfChanged(setQuotations, Array.isArray(quoteRes?.data) ? quoteRes.data : []);
      safeSetStateIfChanged(setInvoices, Array.isArray(invoiceRes?.data) ? invoiceRes.data : []);
      safeSetStateIfChanged(setClientDocumentRecords, Array.isArray(docRes?.data) ? docRes.data : []);
      safeSetStateIfChanged(setAgreements, Array.isArray(agreementRes?.data) ? agreementRes.data : []);
    } catch (err) {
      console.error("[Realtime Project Sync Error]", err);
    }
  };

  useEffect(() => {
    let savedUser = localStorage.getItem("user");
    if (!savedUser) {
      savedUser = JSON.stringify({ id: "ADM-001", name: "Admin", role: "admin", email: "admin@speshway.com" });
      localStorage.setItem("user", savedUser);
    }
    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.role !== "admin") {
        window.location.href = "/customer/dashboard";
        return;
      }
    } catch {
      localStorage.setItem("user", JSON.stringify({ id: "ADM-001", name: "Admin", role: "admin", email: "admin@speshway.com" }));
    }
    loadDatabase(Boolean(initialBulkCache && initialBulkCache.client?.length > 0 && initialBulkCache.lead?.length > 0));
    
    // Fast 30s background sync + immediate sync on window focus (WebSocket handles real-time 0ms sync)
    const liveRefreshTimer = window.setInterval(() => loadDatabase(true), 30000);
    const handleFocus = () => loadDatabase(true);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearInterval(liveRefreshTimer);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Live WebSocket real-time updates and fallback interval sync
  useEffect(() => {
    const socket = getCrmSocket();
    if (!socket) return;

    const handleRealtimeUpdate = () => {
      loadDatabase(true);
    };

    const handleSocketReady = () => {
      socket.emit("crm:join", "admin:dashboard");
      loadDatabase(true);
    };

    if (socket.connected) {
      handleSocketReady();
    }

    socket.on("crm:data-changed", handleRealtimeUpdate);
    socket.on("connect", handleSocketReady);

    return () => {
      socket.off("crm:data-changed", handleRealtimeUpdate);
      socket.off("connect", handleSocketReady);
    };
  }, []);

  // Unified URL & LocalStorage State Synchronizer (Preserves exact page, modal, subtab & 8-section proposal tab on browser refresh)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);

      if (activeTab) {
        params.set("tab", activeTab);
        localStorage.setItem("speshway_crm_active_tab", activeTab);
      }

      if (activeProjectDetail?.id) {
        params.set("projectId", activeProjectDetail.id);
        params.set("view", "detail");
        localStorage.setItem("speshway_crm_active_project_id", activeProjectDetail.id);
        localStorage.setItem("speshway_crm_active_view_mode", "detail");
        if (activeProjectTab) {
          params.set("section", activeProjectTab);
          localStorage.setItem("speshway_crm_active_project_tab", activeProjectTab);
        }
      } else if (activeProjectProposalsView?.id) {
        params.set("projectId", activeProjectProposalsView.id);
        params.set("view", "proposals");
        localStorage.setItem("speshway_crm_active_project_id", activeProjectProposalsView.id);
        localStorage.setItem("speshway_crm_active_view_mode", "proposals");
        params.delete("section");
        localStorage.removeItem("speshway_crm_active_project_tab");
      } else if (!initialRestoreProjectId) {
        params.delete("projectId");
        params.delete("view");
        params.delete("section");
        localStorage.removeItem("speshway_crm_active_project_id");
        localStorage.removeItem("speshway_crm_active_view_mode");
        localStorage.removeItem("speshway_crm_active_project_tab");
      }

      if (activeProjectWorkspaceSubtab) {
        params.set("subtab", activeProjectWorkspaceSubtab);
        localStorage.setItem("crm_active_workspace_subtab", activeProjectWorkspaceSubtab);
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    } catch (e) {
      console.error("Failed to sync navigation state to URL", e);
    }
  }, [activeTab, activeProjectDetail, activeProjectProposalsView, activeProjectTab, activeProjectWorkspaceSubtab, initialRestoreProjectId]);

  useEffect(() => {
    if (!activeProjectProposalsView && !activeProjectDetail) {
      setIsProjectInvoiceStudioOpen(false);
    }
  }, [activeProjectProposalsView, activeProjectDetail]);

  // Sync activeClientDetail and selectedClientProjectId to URL query params and localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        
        if (activeClientDetail?.id) {
          localStorage.setItem("speshway_crm_active_client_id", activeClientDetail.id);
          params.set("clientId", activeClientDetail.id);
          if (activeProjectWorkspaceSubtab) {
            params.set("subtab", activeProjectWorkspaceSubtab);
          }
        } else if (!initialRestoreClientId) {
          localStorage.removeItem("speshway_crm_active_client_id");
          params.delete("clientId");
        }

        if (selectedClientProjectId) {
          localStorage.setItem("speshway_crm_active_client_project_id", selectedClientProjectId);
          params.set("clientProjectId", selectedClientProjectId);
        } else if (!initialRestoreClientProjectId) {
          localStorage.removeItem("speshway_crm_active_client_project_id");
          params.delete("clientProjectId");
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      } catch (e) {
        console.error("Failed to sync client/project view to URL", e);
      }
    }
  }, [activeClientDetail, selectedClientProjectId, activeProjectWorkspaceSubtab, initialRestoreClientId, initialRestoreClientProjectId]);

  // Sync selectedLeadForDetail to URL query params and localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        if (selectedLeadForDetail?.id) {
          localStorage.setItem("speshway_crm_active_lead_id", selectedLeadForDetail.id);
          params.set("leadId", selectedLeadForDetail.id);
          if (!params.get("subtab")) params.set("subtab", "proposals");
        } else if (!initialRestoreLeadId) {
          localStorage.removeItem("speshway_crm_active_lead_id");
          params.delete("leadId");
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      } catch (e) {
        console.error("Failed to sync lead workspace to URL", e);
      }
    }
  }, [selectedLeadForDetail, initialRestoreLeadId]);

  // Restore activeProjectProposalsView or activeProjectDetail when projects load after browser refresh
  useEffect(() => {
    if (initialRestoreProjectId) {
      const cleanId = String(initialRestoreProjectId).trim();
      const allAvailableProjects = [...projects, ...ourProjects];
      const found = allAvailableProjects.find(p => 
        p.id === cleanId || 
        (p as any)._id === cleanId || 
        p.id === `OPRJ-${cleanId}` || 
        cleanId === `OPRJ-${p.id}` ||
        (p.name && p.name.toLowerCase() === cleanId.toLowerCase())
      );

      const restoreViewMode = getInitialCrmViewMode();
      const restoreSection = getInitialCrmProjectTab();

      if (found) {
        if (restoreViewMode === "detail" || (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("section"))) {
          setActiveProjectDetail(found);
          setActiveProjectTab(restoreSection || "overview");
          setActiveProjectProposalsView(null);
        } else {
          setActiveProjectProposalsView(found);
          setActiveProjectDetail(null);
        }
        setInitialRestoreProjectId(null);
      } else if (quotations && quotations.length > 0) {
        const matchingQuote = quotations.find(q => q.projectId === cleanId || q.id === cleanId || q.projectName === cleanId);
        if (matchingQuote) {
          const synthProj = {
            id: cleanId,
            name: matchingQuote.projectName || matchingQuote.title,
            clientName: matchingQuote.clientName,
            category: matchingQuote.projectType || "Web Application",
            budget: matchingQuote.planAPrice || matchingQuote.budget || 50000,
            status: "Approved"
          };
          if (restoreViewMode === "detail" || (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("section"))) {
            setActiveProjectDetail(synthProj);
            setActiveProjectTab(restoreSection || "overview");
            setActiveProjectProposalsView(null);
          } else {
            setActiveProjectProposalsView(synthProj);
            setActiveProjectDetail(null);
          }
          setInitialRestoreProjectId(null);
        }
      }
    }
  }, [projects, ourProjects, quotations, initialRestoreProjectId, initialRestoreViewMode]);

  // Restore activeClientDetail when clients load after browser refresh
  useEffect(() => {
    if (initialRestoreClientId && clients && clients.length > 0) {
      const found = clients.find(c => c.id === initialRestoreClientId || (c as any)._id === initialRestoreClientId);
      if (found) {
        setActiveClientDetail(found);
      }
      setInitialRestoreClientId(null);
    }
  }, [clients, initialRestoreClientId]);

  // Restore selectedClientProjectId when ourProjects/projects load after browser refresh
  useEffect(() => {
    if (initialRestoreClientProjectId && (projects.length > 0 || ourProjects.length > 0)) {
      const allAvailableProjects = [...projects, ...ourProjects];
      const found = allAvailableProjects.find(p => p.id === initialRestoreClientProjectId || p.id === `OPRJ-${initialRestoreClientProjectId}`);
      if (found) {
        setSelectedClientProjectId(found.id);
      }
      setInitialRestoreClientProjectId(null);
    }
  }, [projects, ourProjects, initialRestoreClientProjectId]);

  // Restore selected lead full-page workspace when leads load after browser refresh
  useEffect(() => {
    if (initialRestoreLeadId && leads && leads.length > 0) {
      const found = leads.find(l => l.id === initialRestoreLeadId || (l as any)._id === initialRestoreLeadId);
      if (found) {
        setActiveTab("leads");
        setSelectedLeadForDetail(found);
        setLeadDetailForm({ ...found });
      }
      setInitialRestoreLeadId(null);
    }
  }, [leads, initialRestoreLeadId]);

  const recentActivities = invoices.length > 0 || clients.length > 0 ? [
    ...invoices.map(inv => ({ action: "Invoice Created", detail: `Generated Invoice ${inv.id} for ${inv.clientName}`, time: "Recently", type: "billing" })),
    ...clients.map(c => ({ action: "Client Profile Added", detail: `Registered Client Profile for ${c.company || c.name}`, time: "Recently", type: "success" }))
  ] : [];

  const pipelineStages = [
    { name: "Prospecting", count: leads.filter(l => l.status === "New" || l.status === "Contacted").length, percentage: `${leads.length ? Math.round((leads.filter(l => l.status === "New" || l.status === "Contacted").length / leads.length) * 100) : 0}%`, color: "bg-[#FF5349]" },
    { name: "Proposal Stage", count: leads.filter(l => l.status === "Proposal sent").length, percentage: `${leads.length ? Math.round((leads.filter(l => l.status === "Proposal sent").length / leads.length) * 100) : 0}%`, color: "bg-[#06132D]" },
    { name: "Negotiation", count: leads.filter(l => l.status === "Negotiation").length, percentage: `${leads.length ? Math.round((leads.filter(l => l.status === "Negotiation").length / leads.length) * 100) : 0}%`, color: "bg-[#FF5349]/80" },
    { name: "Closed Won", count: leads.filter(l => l.status === "Won").length, percentage: `${leads.length ? Math.round((leads.filter(l => l.status === "Won").length / leads.length) * 100) : 0}%`, color: "bg-emerald-500" }
  ];

  const activeClientsCount = clients.filter(c => c.status !== "Inactive" && c.status !== "Deleted").length;
  const archivedClientsCount = clients.filter(c => c.status === "Inactive" || c.status === "Deleted").length;
  const openLeadsCount = leads.filter(l => l.status !== "Won" && l.status !== "Lost" && l.status !== "Deleted").length;
  const wonLeadsCount = leads.filter(l => l.status === "Won").length;
  const lostLeadsCount = leads.filter(l => l.status === "Lost").length;
  const allProjectsCount = projects.length + ourProjects.length;
  const activeProjectsCount = projects.filter(p => !["Completed", "Cancelled"].includes(p.status)).length;
  const totalInvoiceValue = invoices.reduce((sum, inv) => sum + Number(inv.totalDue || inv.amount || inv.rate || 0), 0);
  const totalPaymentsValue = payments.reduce((sum, payment) => sum + Number(payment.amount || payment.value || 0), 0);
  const totalExpensesValue = expenses.reduce((sum, expense) => sum + Number(expense.value || expense.amount || 0), 0);
  const netRevenueValue = totalPaymentsValue - totalExpensesValue;
  const leadConversionRate = leads.length ? Math.round((wonLeadsCount / leads.length) * 100) : 0;
  const quotationApprovalRate = quotations.length ? Math.round((quotations.filter(q => q.status === "Approved").length / quotations.length) * 100) : 0;
  const invoiceCollectionRate = totalInvoiceValue ? Math.round((totalPaymentsValue / totalInvoiceValue) * 100) : 0;

  const dashboardMetricCards = [
    { label: "Active Clients", value: activeClientsCount, suffix: "Client Accounts", icon: <UserCheck size={16} />, tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Open Leads", value: openLeadsCount, suffix: "Sales Pipeline", icon: <Target size={16} />, tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Active Projects", value: activeProjectsCount, suffix: "Running Workloads", icon: <Briefcase size={16} />, tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Quotations", value: quotations.length, suffix: "Client Proposals", icon: <FileText size={16} />, tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Invoices", value: invoices.length, suffix: "Billing Documents", icon: <CreditCard size={16} />, tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Revenue", value: totalPaymentsValue, suffix: "Payments Collected", icon: <DollarSign size={16} />, tone: "text-emerald-700 bg-emerald-50 border-emerald-100", currency: true },
    { label: "Project Scope", value: features.length, suffix: "Approved Features", icon: <Layers size={16} />, tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Team Capacity", value: employees.length + teams.length, suffix: "People & Teams", icon: <Users size={16} />, tone: "text-violet-700 bg-violet-50 border-violet-100" }
  ];

  const analyticsCards = [
    { label: "Lead Conversion", value: `${leadConversionRate}%`, detail: `${wonLeadsCount} won from ${leads.length} total leads`, color: "bg-[#FF5349]" },
    { label: "Quotation Approval", value: `${quotationApprovalRate}%`, detail: `${quotations.filter(q => q.status === "Approved").length} approved quotations`, color: "bg-[#06132D]" },
    { label: "Invoice Collection", value: `${invoiceCollectionRate}%`, detail: `₹${totalPaymentsValue.toLocaleString('en-IN')} collected`, color: "bg-[#FF5349]" },
    { label: "Net Revenue", value: `₹${netRevenueValue.toLocaleString('en-IN')}`, detail: `₹${totalPaymentsValue.toLocaleString('en-IN')} payments - ₹${totalExpensesValue.toLocaleString('en-IN')} expenses`, color: netRevenueValue >= 0 ? "bg-emerald-500" : "bg-[#FF5349]" }
  ];

  // ==========================================
  // MODALS & INPUT CONTROL STATES
  // ==========================================

  const openProjectQuotation = (p: any) => {
    if (!p) return;
    setActiveProjectDetail(p);
    setActiveProjectTab("overview");
    setActiveProjectProposalsView(null);
    setReviewingQuote(null);
  };

  // Forms dynamic value inputs
  const [clientForm, setClientForm] = useState({
    name: "", company: "", email: "", phone: "", whatsapp: "", address: "", industry: "Technology", type: "Permanent", notes: ""
  });
  const [clientFilterTab, setClientFilterTab] = useState<"All" | "Permanent" | "Potential">("All");
  const [callForm, setCallForm] = useState({
    clientId: "", calledBy: "Nisha Rao", type: "Incoming", status: "Connected", purpose: "", notes: "", nextAction: ""
  });
  const [leadForm, setLeadForm] = useState({
    name: "", companyName: "", email: "", phone: "", whatsapp: "", source: "Other", interestedService: "Website", expectedBudget: 0, priority: "Medium", notes: "", status: "New", assignedEmployee: "Unassigned", nextFollowUpDate: new Date().toISOString().split("T")[0]
  });
  const [projectForm, setProjectForm] = useState({
    name: "", clientName: "", category: "", manager: "Nisha Rao", budget: 0, priority: "Medium", description: ""
  });
  const [editingOurProject, setEditingOurProject] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [quoteForm, setQuoteForm] = useState({
    clientName: "", projectName: "", title: "", itemsInput: "", discount: 0, tax: 18, validUntil: "", terms: ""
  });
  const [quoteItems, setQuoteItems] = useState<{ description: string; qty: number; rate: number }[]>([
    { description: "Vite React Animated UI & Shadcn Component Suite", qty: 1, rate: 20000 },
    { description: "Node.js Backend & Content API Server Integration", qty: 1, rate: 18000 },
    { description: "Production Deployment & Domain Binding", qty: 1, rate: 7000 }
  ]);

  const handleAddQuoteItemRow = () => {
    setQuoteItems(prev => [...prev, { description: "", qty: 1, rate: 1000 }]);
  };

  const handleRemoveQuoteItemRow = (index: number) => {
    setQuoteItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleQuoteItemChange = (index: number, field: string, value: any) => {
    setQuoteItems(prev => prev.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const calculateItemsSubtotal = () => {
    return quoteItems.reduce((sum, item) => sum + ((item.qty || 1) * (item.rate || 0)), 0);
  };
  const [featureForm, setFeatureForm] = useState({
    projectId: "", title: "", moduleName: "", description: "", priority: "Medium", assignedDeveloper: "Karan (Developer)", estimatedHours: 40
  });
  const [innovationForm, setInnovationForm] = useState({
    projectId: "", title: "", proposedBy: "Sophia (Testing)", description: "", businessBenefit: "", technicalBenefit: "", estimatedCost: 1000
  });
  const [invoiceForm, setInvoiceForm] = useState({ clientName: "", amount: 0, dueDate: "" });
  const [paymentForm, setPaymentForm] = useState({ clientName: "", amount: 0, gateway: "Stripe" });
  const [expenseForm, setExpenseForm] = useState({ title: "", value: 0, category: "Infrastructure" });
  const [employeeForm, setEmployeeForm] = useState({ name: "", role: "", dept: "Corporate CRM" });
  const [teamForm, setTeamForm] = useState({ name: "", lead: "", members: "" });

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userForm, setUserForm] = useState({
    name: "", email: "", password: "", role: "Client Access", status: "Active"
  });

  const handleOpenAddUserModal = () => {
    setUserForm({ name: "", email: "", password: "", role: "Client Access", status: "Active" });
    setShowAddUserModal(true);
  };

  const handleOpenEditUserModal = (u: any) => {
    setEditingUser(u);
    setUserForm({
      name: u.name || "",
      email: u.email || "",
      password: "",
      role: u.role || "Client Access",
      status: u.status || "Active"
    });
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.password) {
      showToast("Full Name, Email Address, and Password are required.", "error");
      return;
    }

    const newUserPayload = {
      name: userForm.name.trim(),
      email: userForm.email.toLowerCase().trim(),
      password: userForm.password,
      role: userForm.role,
      status: userForm.status
    };

    try {
      const res = await fetch(`${API_URL}/crm/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserPayload)
      }).then(r => r.json());

      if (res.success && res.data) {
        setUsers(prev => [...prev.filter(u => u.email !== res.data.email), res.data]);
        showToast(`System User '${userForm.name}' created successfully!`, "success");
      } else {
        showToast(res.message || "Failed to create system user.", "error");
      }
    } catch (err) {
      console.error("[Create User Error]", err);
      showToast("Failed to connect to backend server.", "error");
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("crm_bulk_data_cache");
        localStorage.removeItem("speshway_crm_bulk_cache");
      }
    } catch (e) {}

    setShowAddUserModal(false);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!userForm.name || !userForm.email) {
      showToast("Full Name and Email Address are required.", "error");
      return;
    }

    const targetKey = editingUser.email || editingUser.id;
    const updatedPayload: any = {
      name: userForm.name.trim(),
      email: userForm.email.toLowerCase().trim(),
      role: userForm.role,
      status: userForm.status
    };

    if (userForm.password) {
      updatedPayload.password = userForm.password;
    }

    try {
      const res = await fetch(`${API_URL}/crm/user/${encodeURIComponent(targetKey)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload)
      }).then(r => r.json());

      if (res.success && res.data) {
        setUsers(prev => prev.map(u => (u.email === targetKey || u.id === targetKey) ? { ...u, ...res.data } : u));
        showToast(`User details for '${userForm.name}' updated successfully!`, "success");
      } else {
        showToast(res.message || "Failed to update user account.", "error");
      }
    } catch (err) {
      console.error("[Update User Error]", err);
      showToast("Failed to connect to backend server.", "error");
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("crm_bulk_data_cache");
        localStorage.removeItem("speshway_crm_bulk_cache");
      }
    } catch (e) {}

    setEditingUser(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadForActiveWorkspace = () => {
      if (activeTab === "leads") {
        loadLeadDetailInspectorModal();
      }

      if (activeTab === "projects" || activeTab === "our-projects" || activeTab === "quotations") {
        loadProjectDetailModal();
        loadProjectProposalsWorkspace();
      }
    };

    const idleId = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(preloadForActiveWorkspace, { timeout: 1200 })
      : window.setTimeout(preloadForActiveWorkspace, 300);

    return () => {
      if ((window as any).cancelIdleCallback && typeof idleId === "number") {
        (window as any).cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, [activeTab]);

  // ==========================================
  // CRUD OPERATIONS & HANDLERS (LIVE DB FETCH)
  // ==========================================

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
      name: clientForm.name,
      company: clientForm.company,
      email: clientForm.email,
      phone: clientForm.phone,
      whatsapp: clientForm.whatsapp || clientForm.phone,
      address: clientForm.address,
      industry: clientForm.industry || "Technology",
      type: clientForm.type || "Permanent",
      assignedEmployee: "Nisha Rao (Sales Lead)",
      status: "Active",
      notes: clientForm.notes,
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch(`${API_URL}/crm/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient)
      }).then(r => r.json());

      if (res.success) {
        setClients(prev => [...prev, res.data]);
        await loadDatabase();
      }
    } catch (err) {
      console.error(err);
    }

    setShowClientModal(false);
    setClientForm({ name: "", company: "", email: "", phone: "", whatsapp: "", address: "", industry: "Retail", notes: "" });
  };

  const handleUpgradeClientToPermanent = async (id: string) => {
    try {
      const existingClient = clients.find(c => c.id === id || (c as any)._id === id);
      const existingLead = leads.find(l => l.id === id || (l as any)._id === id || (existingClient && l.email && existingClient.email && l.email.toLowerCase().trim() === existingClient.email.toLowerCase().trim()));

      const targetName = existingClient?.name || existingLead?.name || "Client";

      if (existingClient) {
        await fetch(`${API_URL}/crm/client/${encodeURIComponent(existingClient.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "Permanent", clientType: "Permanent", status: "Active" })
        }).catch(console.error);

        setClients(prev => prev.map(c => (c.id === existingClient.id || c.id === id) ? { ...c, type: "Permanent", clientType: "Permanent", status: "Active" } : c));
        if (activeClientDetail?.id === id || activeClientDetail?.id === existingClient.id) {
          setActiveClientDetail(prev => prev ? { ...prev, type: "Permanent", clientType: "Permanent", status: "Active" } : null);
        }
      } else if (existingLead) {
        const newClientRecord: Client = {
          id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
          name: existingLead.name,
          company: existingLead.companyName || existingLead.name,
          email: existingLead.email || "",
          phone: existingLead.phone || "",
          whatsapp: existingLead.whatsapp || existingLead.phone || "",
          address: "Upgraded Client Profile",
          industry: "Technology",
          type: "Permanent",
          clientType: "Permanent" as any,
          assignedEmployee: existingLead.assignedEmployee || "Devon Miller (Sales)",
          status: "Active",
          notes: `Upgraded from Temporary/Lead ID ${existingLead.id}`,
          createdDate: new Date().toISOString().split("T")[0]
        };

        const res = await fetch(`${API_URL}/crm/client`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newClientRecord)
        }).then(r => r.json()).catch(() => null);

        const saved = res?.data || newClientRecord;
        setClients(prev => [...prev.filter(c => c.id !== saved.id), saved]);
      }

      if (existingLead) {
        await fetch(`${API_URL}/crm/lead/${encodeURIComponent(existingLead.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Won", clientType: "Permanent" })
        }).catch(console.error);

        setLeads(prev => prev.map(l => l.id === existingLead.id ? { ...l, status: "Won", clientType: "Permanent" } : l));
      }

      showToast(`Client '${targetName}' successfully upgraded to Permanent Client Profile!`, "success");
      await loadDatabase(true);
    } catch (err) {
      console.error("[Upgrade Client Error]", err);
      showToast("Failed to upgrade client profile.", "error");
    }
  };

  const handleDeactivateClient = async (id: string) => {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    const newStatus = client.status === "Active" ? "Inactive" : "Active";

    try {
      const res = await fetch(`${API_URL}/crm/client/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      }).then(r => r.json());

      if (res.success) {
        setClients(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (activeClientDetail?.id === id) {
          setActiveClientDetail(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogCall = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === callForm.clientId) || clients[0];
    if (!client) return;

    const newCall: Call = {
      id: `CAL-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: callForm.clientId,
      clientName: client.name,
      phoneNumber: client.phone,
      calledBy: callForm.calledBy,
      type: callForm.type as any,
      date: new Date().toISOString().split("T")[0],
      startTime: "12:00 PM",
      endTime: "12:15 PM",
      duration: "15 mins",
      status: callForm.status as any,
      purpose: callForm.purpose,
      notes: callForm.notes,
      followUpDate: new Date(Date.now() + 5*24*60*60*1000).toISOString().split("T")[0],
      nextAction: callForm.nextAction
    };

    try {
      const res = await fetch(`${API_URL}/crm/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCall)
      }).then(r => r.json());

      if (res.success) {
        setCalls(prev => [res.data, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowCallModal(false);
    setCallForm({ clientId: "", calledBy: "Nisha Rao", type: "Incoming", status: "Connected", purpose: "", notes: "", nextAction: "" });
  };

  const handleDeleteCall = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/crm/call/${id}`, {
        method: "DELETE"
      }).then(r => r.json());

      if (res.success) {
        setCalls(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowTrashOnly(false);
    setLeadSearchQuery("");
    const createdId = `LEA-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`;
    const newLead: Lead = {
      id: createdId,
      name: leadForm.name || "New Lead Contact",
      companyName: leadForm.companyName || "Independent Business",
      email: leadForm.email || "",
      phone: leadForm.phone || "",
      whatsapp: leadForm.whatsapp || leadForm.phone || "",
      source: leadForm.source as any || "Other",
      interestedService: leadForm.interestedService || "Website",
      expectedBudget: Number(leadForm.expectedBudget || 0),
      assignedEmployee: leadForm.assignedEmployee || "Unassigned",
      priority: leadForm.priority as any || "Medium",
      leadScore: 50,
      nextFollowUpDate: leadForm.nextFollowUpDate || new Date(Date.now() + 3*24*60*60*1000).toISOString().split("T")[0],
      notes: leadForm.notes || "",
      status: (leadForm.status as any) || "New",
      createdDate: new Date().toISOString().split("T")[0]
    };

    setLeads(prev => [newLead, ...prev.filter(l => l.id !== createdId)]);
    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/crm/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      }).then(r => r.json());

      if (res.success && res.data) {
        setLeads(prev => [res.data, ...prev.filter(l => l.id !== res.data.id && l.id !== createdId)]);
        showToast(`New lead '${newLead.name}' saved to database successfully!`, "success");
      }
    } catch (err) {
      console.error("[Lead Create Error]", err);
      showToast("Lead added and synced.", "info");
    }

    setShowLeadModal(false);
    setLeadForm({ name: "", companyName: "", email: "", phone: "", whatsapp: "", source: "Other", interestedService: "Website", expectedBudget: 0, priority: "Medium", notes: "", status: "New", assignedEmployee: "Unassigned", nextFollowUpDate: new Date().toISOString().split("T")[0] });
  };

  const handleCreateLeadInline = async (statusKey: string) => {
    if (!inlineLeadName.trim()) return;

    setShowTrashOnly(false);
    setLeadSearchQuery("");
    const nameVal = inlineLeadName.trim();
    const createdId = `LEA-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`;
    const newLead: Lead = {
      id: createdId,
      name: nameVal,
      companyName: nameVal + " Business",
      email: `${nameVal.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: "9999900000",
      whatsapp: "9999900000",
      source: "Other",
      interestedService: "Website",
      expectedBudget: 50000,
      assignedEmployee: "Unassigned",
      priority: "Medium",
      leadScore: 50,
      nextFollowUpDate: new Date().toISOString().split("T")[0],
      notes: "Quick inline added lead record.",
      status: statusKey,
      createdDate: new Date().toISOString().split("T")[0]
    };

    setLeads(prev => [newLead, ...prev.filter(l => l.id !== createdId)]);
    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
    } catch (e) {}

    try {
      const res = await fetch(`${API_URL}/crm/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      }).then(r => r.json());

      if (res.success && res.data) {
        setLeads(prev => [res.data, ...prev.filter(l => l.id !== res.data.id && l.id !== createdId)]);
        showToast(`Lead '${nameVal}' added to stage successfully!`, "success");
      }
    } catch (err) {
      console.error("[Inline Lead Create Error]", err);
      showToast("Error creating inline lead.", "error");
    }

    setInlineAddColKey(null);
    setInlineLeadName("");
  };

  const handleConvertLead = async (lead: Lead) => {
    const credentialSlug = (lead.name || lead.companyName || "client")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 18) || "client";
    const loginEmail = `${credentialSlug}${Math.floor(1000 + Math.random() * 9000)}@crm.com`;
    const targetEmail = (lead.email || "").trim() || loginEmail;
    const tempPassword = `Spw@${Math.floor(100000 + Math.random() * 900000)}`;
    const clientLoginUrl = typeof window !== "undefined" ? `${window.location.origin}/auth/login` : "http://localhost:3000/auth/login";

    const newClient: Client = {
      id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
      name: lead.name,
      company: lead.companyName || lead.name,
      email: targetEmail,
      phone: lead.phone || "",
      whatsapp: lead.whatsapp || lead.phone || "",
      address: "Converted Lead Info Record",
      industry: "Technology",
      type: "Permanent",
      assignedEmployee: (lead.assignedEmployee || "Devon Miller") + " (Sales)",
      status: "Active",
      notes: `Converted from Lead ID ${lead.id}. Customer login: ${loginEmail}. Prior notes: ${lead.notes || "None"}`,
      createdDate: new Date().toISOString().split("T")[0],
      loginEmail,
      loginPassword: tempPassword,
      loginUrl: clientLoginUrl
    };

    const newProject: Project = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${lead.interestedService || "Custom Enterprise Integration"}`,
      clientName: lead.companyName || lead.name,
      clientId: newClient.id,
      category: "Development",
      manager: lead.assignedEmployee || "Devon Miller",
      teamMembers: ["Karan (Developer)"],
      startDate: new Date().toISOString().split("T")[0],
      expectedCompletionDate: new Date(Date.now() + 60*24*60*60*1000).toISOString().split("T")[0],
      budget: lead.expectedBudget || 0,
      priority: lead.priority || "Medium",
      description: `Auto-generated Project conversion for customer lead: ${lead.name}`,
      progress: 10,
      status: "Planning"
    };

    try {
      try {
        const resUser = await fetch(`${API_URL.replace("/api/v1", "")}/api/v1/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: lead.name,
            email: loginEmail,
            phone: lead.phone || "",
            company: lead.companyName || lead.name,
            password: tempPassword
          })
        }).then(r => r.json());

        if (resUser?.success) {
          setUsers(prev => [
            ...prev,
            {
              id: loginEmail,
              name: lead.name,
              email: loginEmail,
              phone: lead.phone || "",
              company: lead.companyName || lead.name,
              role: "Client Access",
              status: "Active"
            }
          ]);
        }
      } catch (userErr) {
        console.warn("User registration skipped/existing:", userErr);
      }

      const existingClient = clients.find(c =>
        (c.email && targetEmail && c.email.toLowerCase().trim() === targetEmail.toLowerCase().trim()) ||
        (c.name && lead.name && c.name.toLowerCase().trim() === lead.name.toLowerCase().trim()) ||
        (c.company && lead.companyName && c.company.toLowerCase().trim() === lead.companyName.toLowerCase().trim())
      );

      let savedClient: Client;
      if (existingClient) {
        const resClient = await fetch(`${API_URL}/crm/client/${existingClient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...existingClient, type: "Permanent", status: "Active", loginEmail, loginPassword: tempPassword, loginUrl: clientLoginUrl })
        }).then(r => r.json()).catch(() => null);
        savedClient = resClient?.data || { ...existingClient, type: "Permanent", status: "Active", loginEmail, loginPassword: tempPassword, loginUrl: clientLoginUrl };
        setClients(prev => prev.map(c => c.id === existingClient.id ? savedClient : c));
      } else {
        const resClient = await fetch(`${API_URL}/crm/client`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newClient)
        }).then(r => r.json()).catch(() => null);
        savedClient = resClient?.data || newClient;
        setClients(prev => [...prev.filter(c => c.id !== savedClient.id), savedClient]);
      }

      const resProj = await fetch(`${API_URL}/crm/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      }).then(r => r.json()).catch(() => null);
      const savedProj = resProj?.data || newProject;
      setProjects(prev => [...prev.filter(p => p.id !== savedProj.id), savedProj]);

      await fetch(`${API_URL}/crm/lead/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Won", clientType: "Permanent" })
      }).catch(() => {});
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: "Won", clientType: "Permanent" } : l));

      let credentialsSent = false;
      let credentialsSentAt = "";
      let credentialsMessage = "";
      
      try {
        const credentialsRes = await fetch(`${API_URL}/crm/send-client-credentials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toEmail: targetEmail,
            clientName: lead.name,
            loginEmail,
            password: tempPassword,
            loginUrl: clientLoginUrl,
            projectName: newProject.name
          })
        }).then(r => r.json());
        credentialsSent = Boolean(credentialsRes?.success);
        credentialsMessage = credentialsRes?.message || "";
      } catch (err) {
        console.error("Credentials email failed:", err);
        credentialsMessage = "Credentials email failed.";
      }

      if (credentialsSent) {
        credentialsSentAt = new Date().toISOString();
        fetch(`${API_URL}/crm/client/${encodeURIComponent(savedClient.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginEmail,
            loginPassword: tempPassword,
            loginUrl: clientLoginUrl,
            credentialsSentAt
          })
        }).catch(err => console.error("Failed to mark credentials sent on client", err));
        setClients(prev => prev.map(c => c.id === savedClient.id ? { ...c, credentialsSentAt } : c));
        showToast(`Permanent client created and login credentials emailed to ${targetEmail}!`, "success");
      } else {
        showToast(`Permanent client created successfully! Welcome email status: ${credentialsMessage || "Queued"}`, "success");
      }

      setSelectedLeadForDetail(null);
      setLeadDetailForm(null);

      setActiveTab("clients");
      setActiveClientDetail({
        ...savedClient,
        loginEmail,
        loginPassword: tempPassword,
        loginUrl: clientLoginUrl,
        credentialsSentAt: credentialsSentAt || savedClient.credentialsSentAt
      });
      setSelectedClientProjectId(savedProj.id || newProject.id);
      showToast(`Lead '${lead.name}' successfully converted to Permanent Client!`, "success");
    } catch (err) {
      console.error("Lead conversion failed:", err);
      showToast("Failed to convert lead to client.", "error");
    }
  };

  const handleMarkTemporaryClient = async (lead: Lead) => {
    const updatedLead = {
      ...lead,
      status: "Won" as const,
      clientType: "Temporary" as const,
      notes: `${lead.notes || ""}${lead.notes ? "\n" : ""}Marked as Temporary Client from proposal sent session on ${new Date().toISOString().split("T")[0]}.`
    };

    // 1. INSTANT optimistic state update (0ms delay)
    setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
    setSelectedLeadForDetail(updatedLead);
    setLeadDetailForm({ ...updatedLead });
    setActiveTab("leads");
    showToast(`${lead.name} moved to Won as a Temporary Client immediately!`, "success");
    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
    } catch (e) {}

    // 2. Asynchronous background database persistence
    fetch(`${API_URL}/crm/lead/${encodeURIComponent(lead.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead)
    }).catch(err => {
      console.error("Background DB update for temporary client failed:", err);
    });
  };

  const handleMoveToFollowUp = async (lead: Lead) => {
    try {
      const resLead = await fetch(`${API_URL}/crm/lead/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Follow-up" })
      }).then(r => r.json());

      if (resLead.success) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: "Follow-up" } : l));
        setActiveTab("followups");
        showToast(`Lead '${lead.name}' successfully moved to Follow-up schedules!`, "success");
      }
    } catch (err) {
      console.error("Failed to move lead to follow-up:", err);
      showToast("Failed to update status to Follow-up.", "error");
    }
  };

  const handleStartEditOurProject = (proj: any) => {
    setEditingOurProject(proj);
    setOurProjectForm({
      name: proj.name || proj.title || "",
      category: proj.category || "Web Application",
      clientName: proj.clientName || "Internal Enterprise",
      budget: Number(proj.budget || 0),
      liveUrl: proj.liveUrl || "",
      description: proj.description || ""
    });
    setShowOurProjectModal(true);
  };

  const handleStartEditProject = (proj: any) => {
    setEditingProject(proj);
    setProjectForm({
      name: proj.name || proj.title || "",
      clientName: proj.clientName || "Client",
      category: proj.category || "Custom Development",
      manager: proj.manager || "Nisha Rao",
      budget: Number(proj.budget || 0),
      priority: proj.priority || "Medium",
      description: proj.description || ""
    });
    setShowProjectModal(true);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowProjectModal(false);
    const isEdit = !!editingProject;
    const currentEditing = editingProject;
    setEditingProject(null);

    const projData: any = {
      id: currentEditing ? currentEditing.id : `PRJ-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`,
      name: projectForm.name,
      title: projectForm.name,
      clientName: projectForm.clientName,
      category: projectForm.category || "Custom Development",
      manager: projectForm.manager || "Nisha Rao",
      teamMembers: currentEditing?.teamMembers || ["Karan (Developer)"],
      startDate: currentEditing?.startDate || new Date().toISOString().split("T")[0],
      expectedCompletionDate: currentEditing?.expectedCompletionDate || new Date(Date.now() + 45*24*60*60*1000).toISOString().split("T")[0],
      budget: Number(projectForm.budget || 0),
      priority: (projectForm.priority as any) || "Medium",
      description: projectForm.description || "",
      progress: currentEditing?.progress || 0,
      status: currentEditing?.status || "Planning"
    };

    setProjectForm({ name: "", clientName: "", category: "Custom Development", manager: "Nisha Rao", budget: 0, priority: "Medium", description: "" });

    if (isEdit) {
      setProjects(prev => prev.map(p => p.id === currentEditing.id ? { ...p, ...projData } : p));
      showToast(`Client project '${projData.name}' updated in database globally!`, "success");
    } else {
      setProjects(prev => [projData, ...prev.filter(p => p.id !== projData.id)]);
      showToast(`Client project '${projData.name}' created globally!`, "success");
    }

    try {
      if (isEdit) {
        await Promise.all([
          fetch(`${API_URL}/crm/project/${encodeURIComponent(currentEditing.id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projData)
          }),
          fetch(`${API_URL}/crm/projects/${encodeURIComponent(currentEditing.id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projData)
          })
        ]).catch(() => {});
      } else {
        const res = await fetch(`${API_URL}/crm/project`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projData)
        }).then(r => r.json()).catch(() => null);

        if (res && res.success && res.data) {
          setProjects(prev => [res.data, ...prev.filter(p => p.id !== res.data.id && p.id !== projData.id)]);
        }
      }
      loadDatabase(true);
    } catch (err) {
      console.error("[Project Save Error]", err);
    }
  };

  const handleCreateOurProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowOurProjectModal(false);
    const isEdit = !!editingOurProject;
    const currentEditing = editingOurProject;
    setEditingOurProject(null);

    const projData: any = {
      id: currentEditing ? currentEditing.id : `OPRJ-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`,
      name: ourProjectForm.name,
      title: ourProjectForm.name,
      clientName: ourProjectForm.clientName || "Internal Enterprise",
      category: ourProjectForm.category || "Web Application",
      budget: Number(ourProjectForm.budget || 0),
      status: currentEditing?.status || "Live Production",
      liveUrl: ourProjectForm.liveUrl || "",
      description: ourProjectForm.description || ""
    };

    setOurProjectForm({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
    } catch (e) {}

    if (isEdit) {
      setOurProjects(prev => prev.map(p => p.id === currentEditing.id ? { ...p, ...projData } : p));
      showToast(`Company project '${projData.name}' updated in database globally!`, "success");
    } else {
      setOurProjects(prev => [projData, ...prev.filter(p => p.id !== projData.id)]);
      showToast(`Company project '${projData.name}' created globally!`, "success");
    }

    try {
      if (isEdit) {
        await Promise.all([
          fetch(`${API_URL}/crm/our-projects/${encodeURIComponent(currentEditing.id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projData)
          }),
          fetch(`${API_URL}/crm/ourprojects/${encodeURIComponent(currentEditing.id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projData)
          })
        ]).catch(() => {});
      } else {
        const res = await fetch(`${API_URL}/crm/our-projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projData)
        }).then(r => r.json()).catch(() => null);

        if (res && res.success && res.data) {
          setOurProjects(prev => [res.data, ...prev.filter(p => p.id !== res.data.id && p.id !== projData.id)]);
        }
      }
      loadDatabase(true);
    } catch (err) {
      console.error("[Our Project Save Error]", err);
    }
  };

  const handleDeleteLeadFromWorkspace = async (leadId: string) => {
    const targetLead = leads.find(l => l.id === leadId);
    const targetName = targetLead?.name || leadId;

    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (selectedLeadForDetail?.id === leadId) {
      setSelectedLeadForDetail(null);
      setLeadDetailForm(null);
    }
    showToast(`Lead '${targetName}' deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/lead/${encodeURIComponent(leadId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/leads/${encodeURIComponent(leadId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Lead Error]", err);
    }
  };

  const handleDeleteClientPermanent = async (clientId: string) => {
    const targetClient = clients.find(c => c.id === clientId);
    const targetName = targetClient?.name || clientId;

    setClients(prev => prev.filter(c => c.id !== clientId));
    if (activeClientDetail?.id === clientId) {
      setActiveClientDetail(null);
    }
    showToast(`Client '${targetName}' deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/client/${encodeURIComponent(clientId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/clients/${encodeURIComponent(clientId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Client Error]", err);
    }
  };

  const handleDeleteProjectFromWorkspace = async (projectId: string) => {
    const targetProj = projects.find(p => p.id === projectId);
    const targetName = targetProj?.name || projectId;

    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (activeProjectDetail?.id === projectId) setActiveProjectDetail(null);
    if (activeProjectProposalsView?.id === projectId) setActiveProjectProposalsView(null);
    showToast(`Project '${targetName}' deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/project/${encodeURIComponent(projectId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Project Error]", err);
    }
  };

  const handleDeleteQuotation = async (quoteId: string) => {
    setQuotations(prev => prev.filter(q => q.id !== quoteId && (q as any).number !== quoteId));
    showToast(`Quotation record deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/quotations/${encodeURIComponent(quoteId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Quotation Error]", err);
    }
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    setInvoices(prev => prev.filter(i => i.id !== invoiceId && (i as any).number !== invoiceId));
    showToast(`Invoice record deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/invoice/${encodeURIComponent(invoiceId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/invoices/${encodeURIComponent(invoiceId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Invoice Error]", err);
    }
  };

  const handleDeleteOurProject = async (id: string) => {
    try {
      setOurProjects(prev => prev.filter(p => p.id !== id));
      await fetch(`${API_URL}/crm/our-projects/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/ourprojects/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      showToast("Company project permanently deleted from database!", "success");
    } catch (err) {
      console.error("[Delete Our Project Error]", err);
      setOurProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateProjectStatus = async (id: string, status: any) => {
    // 1. Optimistic UI Updates (Case-Insensitive)
    setProjects(prev => prev.map(p => String(p.id || "").toLowerCase() === String(id || "").toLowerCase() ? { ...p, status } : p));
    if (activeProjectDetail && String(activeProjectDetail.id || "").toLowerCase() === String(id || "").toLowerCase()) {
      setActiveProjectDetail(prev => prev ? { ...prev, status } : null);
    }

    setClientDocumentRecords(prev => prev.map((record: any) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const matchesDoc = (
        String(record.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(record.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(item.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(item.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        overrideKeys.some((key: string) => String(key || "").toLowerCase().includes(`::${String(id || "").toLowerCase()}`))
      );
      return matchesDoc
        ? {
            ...record,
            projectStatus: status,
            status,
            item: { ...(record.item || {}), projectStatus: status, status: status }
          }
        : record;
    }));

    try {
      // 2. Persist to Backend database (both collections)
      const res = await fetch(`${API_URL}/crm/project/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status })
      }).then(r => r.json());

      await fetch(`${API_URL}/crm/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status })
      }).catch(() => {});

      const docsToUpdate = clientDocumentRecords.filter((record: any) => {
        const item = record.item || {};
        const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
        return (
          String(record.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(record.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(item.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(item.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          overrideKeys.some((key: string) => String(key || "").toLowerCase().includes(`::${String(id || "").toLowerCase()}`))
        );
      });

      const updatedAt = new Date().toISOString();
      await Promise.all(docsToUpdate.map(async (record: any) => {
        const documentKey = record.documentKey || record.id;
        if (!documentKey) return;
        const updatedRecord = {
          ...record,
          projectStatus: status,
          status,
          updatedAt,
          item: {
            ...(record.item || {}),
            projectStatus: status,
            status: status,
            updatedAt,
          },
        };
        await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(documentKey)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecord)
        }).catch(() => {});
      }));

      showToast(`Project status updated to ${status}.`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update project status in backend.", "error");
    }
  };

  const handleViewClientDoc = async (log: any) => {
    try {
      if (log.htmlContent) {
        setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html: log.htmlContent, item: log.item });
        return;
      }
      
      const docId = log.id || log.documentKey || log.docRef;
      if (!docId) {
        showToast("Cannot identify document ID to fetch.", "error");
        return;
      }

      // Lazy load htmlContent from backend single-record API
      const res = await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(docId)}`).then(r => r.json());
      const fullDoc = res?.data;
      if (fullDoc && fullDoc.htmlContent) {
        setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html: fullDoc.htmlContent, item: log.item || fullDoc.item });
      } else {
        // Fallback to generating dynamically on the fly
        const docTypeLower = String(log.documentType || log.docType || "").toLowerCase();
        if (docTypeLower.includes("invoice")) {
          const html = generateSpeshwayTaxInvoicePdfHtml(log.item || log, null, 1);
          setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html, item: log.item });
        } else {
          const html = generateSpeshwayEstimationPdfHtml(log.item || log, null, [], 1);
          setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html, item: log.item });
        }
      }
    } catch (err) {
      console.error("[Lazy Load PDF Error]", err);
      // Dynamic fallback
      const docTypeLower = String(log.documentType || log.docType || "").toLowerCase();
      if (docTypeLower.includes("invoice")) {
        const html = generateSpeshwayTaxInvoicePdfHtml(log.item || log, null, 1);
        setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html, item: log.item });
      } else {
        const html = generateSpeshwayEstimationPdfHtml(log.item || log, null, [], 1);
        setClientPdfPreviewModal({ title: `Sent PDF Preview - ${log.fileName}`, html, item: log.item });
      }
    }
  };

  const getProjectDocumentMatches = (project: Project) => {
    const projectKeys = [
      project.id,
      project.name,
      project.title,
    ].map(normalizeClientMatch).filter(Boolean);
    const clientKeys = activeClientDetail ? uniqueClientDocumentValues([
      activeClientDetail.id,
      activeClientDetail.name,
      activeClientDetail.company,
      activeClientDetail.email,
      activeClientDetail.loginEmail,
    ]).map(normalizeClientMatch) : [];

    return clientDocumentRecords.filter((record: any) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const recordProjectKeys = [
        record.clientProjectId,
        record.projectId,
        record.projectName,
        item.clientProjectId,
        item.projectId,
        item.projectName,
        item.productName,
        item.title,
      ].map(normalizeClientMatch).filter(Boolean);
      const recordClientKeys = [
        record.clientId,
        record.clientName,
        record.clientCompany,
        record.clientEmail,
        record.sentToEmail,
        item.clientId,
        item.clientName,
        item.clientCompany,
        item.clientEmail,
        item.sentToEmail,
        item.preparedFor,
        item.billedTo,
      ].map(normalizeClientMatch).filter(Boolean);
      const projectMatch =
        recordProjectKeys.some((key) => projectKeys.includes(key)) ||
        overrideKeys.some((key: string) => projectKeys.some((projectKey) => normalizeClientMatch(key).includes(`::${projectKey}`)));
      const clientMatch = !clientKeys.length || recordClientKeys.some((key) => clientKeys.includes(key));
      return projectMatch && clientMatch;
    });
  };

  const getProjectTodos = (project: Project): ProjectTodo[] => {
    const match = getProjectDocumentMatches(project).find((record: any) =>
      Array.isArray(record.projectTodos) || Array.isArray(record.item?.projectTodos)
    );
    const todos = match?.projectTodos || match?.item?.projectTodos || project.projectTodos || [];
    return Array.isArray(todos) ? todos : [];
  };

  const persistProjectTodos = async (project: Project, todos: ProjectTodo[]) => {
    const matches = getProjectDocumentMatches(project);
    const updatedAt = new Date().toISOString();
    const clientId = activeClientDetail?.id || project.clientId || "";
    const documentKey = `${clientId || project.clientName || "client"}::project::${project.id}`;
    const baseRecord = {
      documentKey,
      id: documentKey,
      documentType: "project",
      documentRef: project.id,
      visibleToClient: true,
      clientId,
      clientName: activeClientDetail?.name || project.clientName || "",
      clientCompany: activeClientDetail?.company || project.clientName || "",
      clientEmail: activeClientDetail?.email || "",
      clientProjectId: project.id,
      projectId: project.id,
      projectName: project.name || project.title,
      projectStatus: project.status,
      projectTodos: todos,
      updatedAt,
      item: {
        ...project,
        id: project.id,
        projectId: project.id,
        projectName: project.name || project.title,
        clientId,
        clientName: activeClientDetail?.name || project.clientName || "",
        clientEmail: activeClientDetail?.email || "",
        projectStatus: project.status,
        projectTodos: todos,
        updatedAt,
      },
    };
    const recordsToSave = matches.length ? matches : [baseRecord];

    await Promise.all(recordsToSave.map(async (record: any) => {
      const key = record.documentKey || record.id || documentKey;
      const updatedRecord = {
        ...record,
        documentKey: key,
        id: record.id || key,
        visibleToClient: true,
        clientProjectId: record.clientProjectId || project.id,
        projectId: record.projectId || project.id,
        projectName: record.projectName || project.name || project.title,
        projectStatus: record.projectStatus || project.status,
        projectTodos: todos,
        updatedAt,
        item: {
          ...(record.item || {}),
          projectId: record.item?.projectId || project.id,
          projectName: record.item?.projectName || project.name || project.title,
          projectStatus: record.item?.projectStatus || project.status,
          projectTodos: todos,
          updatedAt,
        },
      };
      await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord),
      });
    }));

    setClientDocumentRecords((prev) => {
      const savedKeys = new Set(recordsToSave.map((record: any) => record.documentKey || record.id || documentKey));
      const next = prev.map((record: any) => {
        const key = record.documentKey || record.id;
        if (!savedKeys.has(key)) return record;
        return {
          ...record,
          projectTodos: todos,
          updatedAt,
          item: { ...(record.item || {}), projectTodos: todos, updatedAt },
        };
      });
      return matches.length ? next : [{ ...baseRecord, updatedAt }, ...next];
    });
    setProjects((prev) => prev.map((item) => item.id === project.id ? { ...item, projectTodos: todos } : item));
  };

  const handleAddProjectTodo = async (project: Project) => {
    const text = (projectTodoInputs[project.id] || "").trim();
    if (!text) return;
    const now = new Date().toISOString();
    const todos = [
      ...getProjectTodos(project),
      { id: `TODO-${Date.now()}`, text, completed: false, createdAt: now, updatedAt: now },
    ];
    try {
      await persistProjectTodos(project, todos);
      setProjectTodoInputs((prev) => ({ ...prev, [project.id]: "" }));
      showToast("Project todo added.", "success");
    } catch (err) {
      console.error("[Project Todo Save Error]", err);
      showToast("Failed to save project todo.", "error");
    }
  };

  const handleToggleProjectTodo = async (project: Project, todoId: string) => {
    const now = new Date().toISOString();
    const todos = getProjectTodos(project).map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed, updatedAt: now } : todo
    );
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo updated.", "success");
    } catch (err) {
      console.error("[Project Todo Update Error]", err);
      showToast("Failed to update project todo.", "error");
    }
  };

  const handleDeleteProjectTodo = async (project: Project, todoId: string) => {
    const todos = getProjectTodos(project).filter((todo) => todo.id !== todoId);
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo removed.", "success");
    } catch (err) {
      console.error("[Project Todo Delete Error]", err);
      showToast("Failed to remove project todo.", "error");
    }
  };

  const handleEditQuote = (q: any) => {
    setEditingQuote(q);
    setQuoteForm({
      clientName: q.clientName || "",
      projectName: q.projectName || "",
      title: q.title || "",
      itemsInput: "",
      currency: q.currency || "Indian Rupees (INR)",
      planAPrice: q.planAPrice || 60000,
      planBPrice: q.planBPrice || 65000,
      discount: q.discount || 0,
      tax: q.tax || 18,
      validUntil: q.validUntil || "",
      terms: q.terms || "",
      overviewNarrative: q.overviewNarrative || "",
      customerDesc: q.customerDesc || "",
      merchantDesc: q.merchantDesc || "",
      adminDesc: q.adminDesc || "",
      paymentTerms: q.paymentTerms || "",
      termsAndConditions: q.termsAndConditions || q.terms || ""
    } as any);
    const cleanedCompItems = getCleanPlanComparisonItems(q.planComparisonItems || []);
    setQuotePlanComparisonItems(cleanedCompItems);
    setShowQuoteModal(true);
  };

  const handleDeleteQuote = async (idOrNumber: string) => {
    if (!window.confirm("Are you sure you want to delete this quotation?")) return;
    try {
      await fetch(`${API_URL}/crm/quotation/${idOrNumber}`, { method: "DELETE" });
      setQuotations(prev => prev.filter(q => q.id !== idOrNumber && (q as any).number !== idOrNumber));
    } catch (err) {
      console.error("[Delete Quotation Error]", err);
    }
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCompItems = getCleanPlanComparisonItems(quotePlanComparisonItems);

    const quoteId = editingQuote ? (editingQuote.id || editingQuote.number) : `QT-${Date.now().toString().slice(-4)}`;
    const quoteData: any = {
      id: quoteId,
      number: quoteId,
      projectId: activeProjectDetail?.id,
      clientName: quoteForm.clientName || activeProjectDetail?.clientName || "Client Profile",
      projectName: quoteForm.projectName || activeProjectDetail?.name || "General Service Contract",
      title: quoteForm.title,
      currency: (quoteForm as any).currency || "Indian Rupees (INR)",
      planAPrice: Number((quoteForm as any).planAPrice || 60000),
      planBPrice: Number((quoteForm as any).planBPrice || 65000),
      planComparisonItems: cleanCompItems,
      discount: Number(quoteForm.discount),
      tax: Number(quoteForm.tax),
      validUntil: quoteForm.validUntil || new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0],
      terms: (quoteForm as any).termsAndConditions || quoteForm.terms || "",
      notes: "Invoice terms active upon signature.",
      createdBy: "Admin Operator",
      createdDate: editingQuote?.createdDate || new Date().toISOString().split("T")[0],
      status: editingQuote ? editingQuote.status : "Approved",
      overviewNarrative: (quoteForm as any).overviewNarrative || "",
      customerDesc: (quoteForm as any).customerDesc || "",
      merchantDesc: (quoteForm as any).merchantDesc || "",
      adminDesc: (quoteForm as any).adminDesc || "",
      paymentTerms: (quoteForm as any).paymentTerms || "",
      termsAndConditions: (quoteForm as any).termsAndConditions || quoteForm.terms || ""
    };

    try {
      if (editingQuote) {
        const qId = editingQuote.id || editingQuote.number;
        const res = await fetch(`${API_URL}/crm/quotation/${qId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData)
        }).then(r => r.json());

        const updated = res.data || quoteData;
        setQuotations(prev => prev.map(q => (q.id === qId || (q as any).number === qId) ? updated : q));
      } else {
        const res = await fetch(`${API_URL}/crm/quotation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData)
        }).then(r => r.json());

        if (res.success) {
          setQuotations(prev => [res.data, ...prev]);
        } else {
          setQuotations(prev => [quoteData, ...prev]);
        }
      }
    } catch (err) {
      console.error(err);
      if (!editingQuote) setQuotations(prev => [quoteData, ...prev]);
    }

    setShowQuoteModal(false);
    setEditingQuote(null);
    setQuoteForm({ clientName: "", projectName: "", title: "", itemsInput: "", discount: 0, tax: 18, validUntil: "", terms: "" });
  };

  const handleApproveQuotation = async (number: string) => {
    try {
      const res = await fetch(`${API_URL}/crm/quotation/${number}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" })
      }).then(r => r.json());

      if (res.success) {
        setQuotations(prev => prev.map(q => q.number === number ? { ...q, status: "Approved" } : q));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFeature = (feat: any) => {
    setEditingFeature(feat);
    setFeatureForm({
      projectId: feat.projectId || "",
      title: feat.title || "",
      moduleName: feat.moduleName || "Core Feature",
      description: feat.description || "",
      priority: feat.priority || "High",
      assignedDeveloper: feat.assignedDeveloper || "Development Team",
      estimatedHours: feat.estimatedHours || 40
    });
    setShowFeatureModal(true);
  };

  const handleDeleteFeature = async (featureId: string) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      await fetch(`${API_URL}/crm/feature/${featureId}`, { method: "DELETE" });
      setFeatures(prev => prev.filter(f => f.id !== featureId));
    } catch (err) {
      console.error("[Delete Feature Error]", err);
    }
  };

  const handleCreateFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    const projId = featureForm.projectId || activeProjectDetail?.id || "OPRJ-7001";
    const projName = activeProjectDetail?.name || "Build Your Thoughts";

    const featData: any = {
      id: editingFeature ? editingFeature.id : `FEAT-${Math.floor(100 + Math.random() * 899)}`,
      projectId: projId,
      projectName: projName,
      title: featureForm.title,
      moduleName: featureForm.moduleName || "Core Feature",
      description: featureForm.description || `Feature requirement: ${featureForm.title}`,
      requirementType: "Functional",
      priority: featureForm.priority || "High",
      assignedDeveloper: featureForm.assignedDeveloper || "Development Team",
      startDate: editingFeature?.startDate || new Date().toISOString().split("T")[0],
      dueDate: editingFeature?.dueDate || new Date(Date.now() + 14*24*60*60*1000).toISOString().split("T")[0],
      estimatedHours: featureForm.estimatedHours || 40,
      progress: editingFeature ? editingFeature.progress : 100,
      status: editingFeature ? editingFeature.status : "Completed",
      clientApproval: true,
      notes: ""
    };

    try {
      if (editingFeature) {
        const res = await fetch(`${API_URL}/crm/feature/${editingFeature.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(featData)
        }).then(r => r.json());

        const updated = res.data || featData;
        setFeatures(prev => prev.map(f => f.id === editingFeature.id ? updated : f));
      } else {
        const res = await fetch(`${API_URL}/crm/feature`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(featData)
        }).then(r => r.json());

        if (res.success) {
          setFeatures(prev => [...prev, res.data]);
        } else {
          setFeatures(prev => [...prev, featData]);
        }
      }
    } catch (err) {
      console.error(err);
      if (!editingFeature) setFeatures(prev => [...prev, featData]);
    }

    setShowFeatureModal(false);
    setEditingFeature(null);
    setFeatureForm({ projectId: "", title: "", moduleName: "", description: "", priority: "High", assignedDeveloper: "Development Team", estimatedHours: 40 });
  };

  const handleCreateInnovation = async (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find(p => p.id === innovationForm.projectId) || projects[0];
    if (!project) return;

    const newInn: Innovation = {
      id: `INN-${Math.floor(100 + Math.random() * 899)}`,
      title: innovationForm.title,
      projectId: innovationForm.projectId,
      projectName: project.name,
      proposedBy: innovationForm.proposedBy,
      description: innovationForm.description,
      businessBenefit: innovationForm.businessBenefit,
      technicalBenefit: innovationForm.technicalBenefit,
      estimatedCost: Number(innovationForm.estimatedCost),
      estimatedDevTime: "2 weeks",
      priority: "Medium",
      approvalStatus: "Proposed",
      implementationStatus: "Not started",
      clientFeedback: "",
      adminNotes: ""
    };

    try {
      const res = await fetch(`${API_URL}/crm/innovation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInn)
      }).then(r => r.json());

      if (res.success) {
        setInnovations(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowInnovationModal(false);
    setInnovationForm({ projectId: "", title: "", proposedBy: "Sophia (Testing)", description: "", businessBenefit: "", technicalBenefit: "", estimatedCost: 1000 });
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInv = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: invoiceForm.clientName,
      amount: Number(invoiceForm.amount),
      dueDate: invoiceForm.dueDate || new Date(Date.now() + 15*24*60*60*1000).toISOString().split("T")[0],
      status: "Unpaid"
    };

    try {
      const res = await fetch(`${API_URL}/crm/invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInv)
      }).then(r => r.json());

      if (res.success) {
        setInvoices(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowInvoiceModal(false);
    setInvoiceForm({ clientName: "", amount: 0, dueDate: "" });
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPay = {
      id: `TXN-${Math.floor(10000 + Math.random() * 89999)}`,
      clientName: paymentForm.clientName,
      amount: Number(paymentForm.amount),
      gateway: paymentForm.gateway,
      date: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch(`${API_URL}/crm/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPay)
      }).then(r => r.json());

      if (res.success) {
        setPayments(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowPaymentModal(false);
    setPaymentForm({ clientName: "", amount: 0, gateway: "Stripe" });
  };

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExp = {
      id: `EXP-${Math.floor(100 + Math.random() * 899)}`,
      title: expenseForm.title,
      value: Number(expenseForm.value),
      category: expenseForm.category,
      date: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch(`${API_URL}/crm/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExp)
      }).then(r => r.json());

      if (res.success) {
        setExpenses(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowExpenseModal(false);
    setExpenseForm({ title: "", value: 0, category: "Infrastructure" });
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp = {
      id: `EMP-${Math.floor(10 + Math.random() * 89)}`,
      name: employeeForm.name,
      role: employeeForm.role,
      dept: employeeForm.dept,
      status: "Active"
    };

    try {
      const res = await fetch(`${API_URL}/crm/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmp)
      }).then(r => r.json());

      if (res.success) {
        setEmployees(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowEmployeeModal(false);
    setEmployeeForm({ name: "", role: "", dept: "Corporate CRM" });
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam = {
      id: `TEAM-${Math.floor(10 + Math.random() * 89)}`,
      name: teamForm.name,
      lead: teamForm.lead,
      members: teamForm.members,
      activeProjects: 1
    };

    try {
      const res = await fetch(`${API_URL}/crm/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam)
      }).then(r => r.json());

      if (res.success) {
        setTeams(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setShowTeamModal(false);
    setTeamForm({ name: "", lead: "", members: "" });
  };

  const handleDeleteUser = async (userKey: string) => {
    if (userKey === "admin@crm.com") {
      showToast("Primary Seeded Admin account cannot be deleted.", "error");
      return;
    }

    const targetUser = users.find(u => u.email === userKey || u.id === userKey);
    const userName = targetUser?.name || userKey;

    if (!window.confirm(`Are you sure you want to permanently delete user account '${userName}' (${userKey})?`)) {
      return;
    }

    setUsers(prev => prev.filter(u => u.email !== userKey && u.id !== userKey));
    showToast(`User account '${userName}' deleted successfully!`, "success");

    try {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("crm_bulk_data_cache");
          localStorage.removeItem("speshway_crm_bulk_cache");
        } catch (e) {}
      }

      await fetch(`${API_URL}/crm/user/${encodeURIComponent(userKey)}`, {
        method: "DELETE",
      });
      await fetch(`${API_URL}/crm/users/${encodeURIComponent(userKey)}`, {
        method: "DELETE",
      }).catch(() => {});
    } catch (err) {
      console.error("[Delete User Error]", err);
    }
  };

  const handleResendClientCredentials = async (client: Client) => {
    if (!client.email) {
      showToast("Client email is missing. Add an email before sending credentials.", "error");
      return;
    }
    if (!client.loginEmail || !client.loginPassword) {
      showToast("Login credentials are missing on this client profile.", "error");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/crm/send-client-credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: client.email,
          clientName: client.name,
          loginEmail: client.loginEmail,
          password: client.loginPassword,
          loginUrl: client.loginUrl || (typeof window !== "undefined" ? `${window.location.origin}/auth/login` : "http://localhost:3000/auth/login"),
          projectName: projects.find(p => p.clientId === client.id || p.clientName === client.name || p.clientName === client.company)?.name || "Client dashboard"
        })
      }).then(r => r.json());

      if (res?.success) {
        const credentialsSentAt = new Date().toISOString();
        await fetch(`${API_URL}/crm/client/${encodeURIComponent(client.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credentialsSentAt })
        });
        setClients(prev => prev.map(c => c.id === client.id ? { ...c, credentialsSentAt } : c));
        setActiveClientDetail(prev => prev?.id === client.id ? { ...prev, credentialsSentAt } : prev);
        showToast(`Credentials sent to ${client.email}.`, "success");
      } else {
        showToast(res?.message || "Failed to send credentials.", "error");
      }
    } catch (err) {
      console.error("Resend credentials failed:", err);
      showToast("Failed to send credentials.", "error");
    }
  };

  const handleDeleteClient = async (id: string) => {
    const client = clients.find(c => c.id === id);
    if (!client) return;

    if (client.status === "Deleted") {
      if (!confirm(`Are you sure you want to PERMANENTLY delete client record '${id}' from the database? This action cannot be undone.`)) return;

      try {
        const res = await fetch(`${API_URL}/crm/client/${encodeURIComponent(id)}`, {
          method: "DELETE",
        }).then(r => r.json());

        if (res.success) {
          setClients(prev => prev.filter(c => c.id !== id));
          showToast("Client record permanently deleted from database.", "success");
        } else {
          showToast(res.message || "Failed to delete client record.", "error");
        }
      } catch (err) {
        console.error("[Delete Client Error]", err);
        showToast("Error deleting client record.", "error");
      }
    } else {
      if (!confirm(`Are you sure you want to move client record '${id}' to the Trash bin?`)) return;

      try {
        const res = await fetch(`${API_URL}/crm/client/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Deleted", deletedAt: new Date().toISOString() })
        }).then(r => r.json());

        if (res.success) {
          setClients(prev => prev.map(c => c.id === id ? { ...c, status: "Deleted", deletedAt: new Date().toISOString() } : c));
          showToast("Client record moved to Trash archive.", "success");
        } else {
          showToast(res.message || "Failed to archive client record.", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Error archiving client record.", "error");
      }
    }
  };

  const handleRestoreClient = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/crm/client/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Active", deletedAt: null, restoredAt: new Date().toISOString() })
      }).then(r => r.json());

      if (res.success) {
        setClients(prev => prev.map(c => c.id === id ? { ...c, status: "Active", deletedAt: null, restoredAt: new Date().toISOString() } : c));
        showToast("Client profile restored to Active directory successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Error restoring client profile.", "error");
    }
  };

  const calculateQuoteFinal = (quote: Quotation) => {
    const subtotal = quote.serviceItems.reduce((acc, curr) => acc + (curr.qty * curr.rate), 0);
    const discVal = subtotal * (quote.discount / 100);
    const taxVal = (subtotal - discVal) * (quote.tax / 100);
    return Math.floor(subtotal - discVal + taxVal);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm(`Are you sure you want to delete project record '${id}'?`)) return;

    try {
      setProjects(prev => prev.filter(p => p.id !== id));
      await Promise.all([
        fetch(`${API_URL}/crm/project/${encodeURIComponent(id)}`, { method: "DELETE" }),
        fetch(`${API_URL}/crm/projects/${encodeURIComponent(id)}`, { method: "DELETE" })
      ]).catch(() => {});
      showToast("Project record permanently deleted from database!", "success");
    } catch (err) {
      console.error("[Delete Project Error]", err);
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };


  // Export Leads to JSON file
  const handleExportLeads = () => {
    const activeLeads = leads.filter(l => l.status !== "Deleted");
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeLeads, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Speshway_CRM_Leads_Export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Successfully exported active leads to JSON file!", "success");
  };

  // Import Leads from JSON or CSV
  const handleImportLeads = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      try {
        let importedCount = 0;
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(content);
          const rawList = Array.isArray(parsed) ? parsed : [parsed];
          
          for (const item of rawList) {
            const cleanLead: Lead = {
              id: item.id || `LEA-${Math.floor(1000 + Math.random() * 9000)}`,
              name: item.name || "Imported Contact",
              companyName: item.companyName || item.company || "Imported Business",
              email: item.email || "no-email@speshway.com",
              phone: item.phone || "7702233931",
              whatsapp: item.whatsapp || item.phone || "7702233931",
              source: item.source || "Other",
              interestedService: item.interestedService || item.service || "Website",
              expectedBudget: Number(item.expectedBudget || item.budget || 50000),
              assignedEmployee: item.assignedEmployee || "Unassigned",
              priority: item.priority || "Medium",
              leadScore: Number(item.leadScore || 50),
              nextFollowUpDate: item.nextFollowUpDate || new Date().toISOString().split("T")[0],
              notes: item.notes || "Imported via lead dashboard panel.",
              status: item.status || "New",
              createdDate: item.createdDate || new Date().toISOString().split("T")[0]
            };

            await fetch(`${API_URL}/crm/lead`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(cleanLead)
            });
            importedCount++;
          }
        } else {
          // Parse as CSV list
          const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
          const startIdx = lines[0].toLowerCase().includes("name") ? 1 : 0;
          for (let i = startIdx; i < lines.length; i++) {
            const parts = lines[i].split(",");
            const cleanLead: Lead = {
              id: `LEA-${Math.floor(1000 + Math.random() * 9000)}`,
              name: parts[0]?.trim() || "Imported Lead",
              companyName: parts[1]?.trim() || "Imported Company",
              email: parts[2]?.trim() || "imported@speshway.com",
              phone: parts[3]?.trim() || "7702233931",
              whatsapp: parts[3]?.trim() || "7702233931",
              source: "Other",
              interestedService: parts[4]?.trim() || "Website",
              expectedBudget: Number(parts[5]?.trim() || 50000),
              assignedEmployee: "Unassigned",
              priority: "Medium",
              leadScore: 50,
              nextFollowUpDate: new Date().toISOString().split("T")[0],
              notes: "Imported via dashboard CSV.",
              status: "New",
              createdDate: new Date().toISOString().split("T")[0]
            };

            await fetch(`${API_URL}/crm/lead`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(cleanLead)
            });
            importedCount++;
          }
        }
        showToast(`Successfully imported ${importedCount} leads!`, "success");
        loadDatabase();
      } catch (err) {
        console.error("[Import Leads Error]", err);
        showToast("Failed to parse leads file. Ensure it is valid JSON or CSV.", "error");
      }
      if (e.target) e.target.value = "";
    };
    reader.readAsText(file);
  };

  // Bulk Trash selected leads
  const handleBulkTrash = async () => {
    if (selectedLeadIds.length === 0) return;
    if (!confirm(`Are you sure you want to move ${selectedLeadIds.length} selected leads to Trash?`)) return;

    try {
      let successCount = 0;
      for (const id of selectedLeadIds) {
        const res = await fetch(`${API_URL}/crm/lead/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Deleted" })
        }).then(r => r.json());
        if (res.success) successCount++;
      }
      showToast(`Moved ${successCount} leads to Trash archive.`, "success");
      setLeads(prev => prev.map(l => selectedLeadIds.includes(l.id) ? { ...l, status: "Deleted" } : l));
      setSelectedLeadIds([]);
      setIsMultiSelectMode(false);
    } catch (err) {
      console.error(err);
      showToast("Error trashing leads.", "error");
    }
  };

  // Bulk Delete permanently
  const handleBulkDelete = async () => {
    if (selectedLeadIds.length === 0) return;
    if (!confirm(`Are you sure you want to PERMANENTLY delete all ${selectedLeadIds.length} selected leads from the database?`)) return;

    try {
      let successCount = 0;
      for (const id of selectedLeadIds) {
        const res = await fetch(`${API_URL}/crm/lead/${encodeURIComponent(id)}`, {
          method: "DELETE"
        }).then(r => r.json());
        if (res.success) successCount++;
      }
      showToast(`Permanently deleted ${successCount} leads from database.`, "success");
      setLeads(prev => prev.filter(l => !selectedLeadIds.includes(l.id)));
      setSelectedLeadIds([]);
      setIsMultiSelectMode(false);
    } catch (err) {
      console.error(err);
      showToast("Error deleting leads permanently.", "error");
    }
  };

  // Remove a Kanban stage
  const handleDeleteCustomStage = (keyToDelete: string) => {
    if (["New", "Contacted", "Qualified", "Proposal sent", "Won", "Lost"].includes(keyToDelete)) {
      alert("Primary core stages cannot be deleted.");
      return;
    }
    if (!confirm("Are you sure you want to delete this custom stage? Any leads in this stage will need to be re-assigned.")) return;

    setColumns(prev => prev.filter(c => c.key !== keyToDelete));
    showToast("Stage removed from Kanban board.", "info");
  };

  const importLeadsFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDeleteLead = async (id: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this lead from the database?")) return;

    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(null);
      setLeadDetailForm(null);
    }

    try {
      setLeads(prev => prev.filter(l => l.id !== id && (l as any)._id !== id));
      await Promise.all([
        fetch(`${API_URL}/crm/lead/${encodeURIComponent(id)}`, { method: "DELETE" }),
        fetch(`${API_URL}/crm/leads/${encodeURIComponent(id)}`, { method: "DELETE" })
      ]).catch(() => {});

      showToast("Lead record permanently deleted from database.", "success");
      loadDatabase(true);
    } catch (err) {
      console.error("[Delete Lead Error]", err);
      setLeads(prev => prev.filter(l => l.id !== id && (l as any)._id !== id));
    }
  };

  const handleRestoreLead = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/crm/lead/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "New" })
      }).then(r => r.json());

      if (res.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: "New" } : l));
        showToast("Lead record restored successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Error restoring lead record.", "error");
    }
  };

  const handleSaveLeadDetailChanges = async () => {
    if (!leadDetailForm) return;

    try {
      const res = await fetch(`${API_URL}/crm/lead/${encodeURIComponent(leadDetailForm.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadDetailForm)
      }).then(r => r.json());

      if (res.success) {
        setLeads(prev => prev.map(l => l.id === leadDetailForm.id ? { ...leadDetailForm } : l));
        showToast(`Lead '${leadDetailForm.name}' updated successfully!`, "success");
        setSelectedLeadForDetail(null);
        setLeadDetailForm(null);
      } else {
        showToast(res.message || "Failed to save lead updates.", "error");
      }
    } catch (err) {
      console.error("[Save Lead Detail Error]", err);
      showToast("Error updating lead details.", "error");
    }
  };

  const handleNavigateLeadDetail = (dir: "next" | "prev") => {
    if (!selectedLeadForDetail) return;
    const activeLeads = leads.filter(l => l.status !== "Deleted");
    const idx = activeLeads.findIndex(l => l.id === selectedLeadForDetail.id);
    if (idx === -1) return;
    let targetIdx = dir === "next" ? idx + 1 : idx - 1;
    if (targetIdx >= 0 && targetIdx < activeLeads.length) {
      const nextLead = activeLeads[targetIdx];
      setSelectedLeadForDetail(nextLead);
      setLeadDetailForm({ ...nextLead });
    }
  };

  const handleRevertLead = async (lead: Lead) => {
    let targetStatus = "New";
    if (lead.status === "Won") {
      targetStatus = "Follow-up";
    }

    try {
      const res = await fetch(`${API_URL}/crm/lead/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus })
      }).then(r => r.json());

      if (res.success) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: targetStatus } : l));
        showToast(`Lead '${lead.name}' successfully reverted back to '${targetStatus}' status!`, "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Error reverting lead status.", "error");
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    const currentLead = leads.find(lead => lead.id === leadId);
    if (!currentLead || currentLead.status === newStatus) return;

    if (newStatus === "Won" && currentLead.clientType !== "Permanent") {
      await handleConvertLead(currentLead);
      return;
    }

    const previousLeads = leads;
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus as Lead["status"] } : lead));

    try {
      const res = await fetch(`${API_URL}/crm/lead/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      }).then(r => r.json());

      if (res.success) {
        showToast(`Lead status updated to '${newStatus}'!`, "success");
      } else {
        setLeads(previousLeads);
        showToast("Error updating lead status in database.", "error");
      }
    } catch (err) {
      console.error("[Update Lead Status Error]", err);
      setLeads(previousLeads);
      showToast("Error updating lead status in database.", "error");
    }
  };

  const handleClearAllDemoData = async () => {
    if (!confirm("Are you sure you want to permanently clear all records from MongoDB database to start completely clean?")) return;

    try {
      const res = await fetch(`${API_URL}/crm/clear-database`, {
        method: "DELETE",
      }).then(r => r.json());

      if (res.success) {
        showToast("All database records cleared successfully!", "success");
        loadDatabase();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to clear database.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // 1. Render Error state if Node.js server cannot be synced
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <GlassCard className="p-10 flex flex-col items-center gap-4 bg-white/70 shadow-elevated border border-red-500/10 text-center max-w-sm">
          <ShieldAlert className="w-10 h-10 text-red-500" />
          <span className="font-heading font-extrabold text-[#071E34] text-sm tracking-wide">Database Sync Failed</span>
          <p className="text-xs text-gray-500 leading-relaxed">Could not establish connection to the Node.js API server ({API_URL}). Please ensure the backend is active and running.</p>
          <Button onClick={() => loadDatabase()} variant="primary" className="mt-2 w-full text-xs font-semibold">
            Retry Connection
          </Button>
        </GlassCard>
      </div>
    );
  }

  // Derived state for active project detail modal
  let activeQuoteForDetail: Quotation | any = null;
  if (activeProjectDetail) {
    const found = quotations.find(q => 
      q.projectId === activeProjectDetail.id || 
      q.projectName === activeProjectDetail.name || 
      (q.title && activeProjectDetail.name && q.title.toLowerCase().includes(activeProjectDetail.name.toLowerCase())) ||
      q.clientName === activeProjectDetail.clientName
    );
    if (found) {
      activeQuoteForDetail = found;
    } else {
      activeQuoteForDetail = {
        id: `QT-${activeProjectDetail.id || "0001"}`,
        number: `QT-${activeProjectDetail.id || "0001"}`,
        projectId: activeProjectDetail.id,
        title: `${activeProjectDetail.name} Custom Estimation Proposal`,
        clientName: activeProjectDetail.clientName || "Enterprise Client",
        projectName: activeProjectDetail.name,
        planAPrice: 50000,
        planBPrice: 65000,
        currency: "Indian Rupees (INR)",
        planComparisonItems: defaultPlanComparisonDeliverables,
        overviewNarrative: activeProjectDetail.description || "",
        customerDesc: "Customer portal & cart checkout.",
        merchantDesc: "Merchant portal & booking management.",
        adminDesc: "Admin panel & ecosystem governance.",
        paymentTerms: "40% advance on project kick-off\n30% on completion of core module\n30% on final delivery",
        termsAndConditions: "Estimation valid for 30 days.\nIncludes 30 days complimentary bug-fix support.\nSource code handed over upon full payment.",
        status: "Approved"
      };
    }
  }

  const activeCompItems = activeQuoteForDetail ? getCleanPlanComparisonItems(activeQuoteForDetail.planComparisonItems) : [];
  const activeQuote = activeQuoteForDetail;

  // Derived state for reviewing quote modal
  const reviewCompItems = reviewingQuote ? getCleanPlanComparisonItems(reviewingQuote.planComparisonItems || defaultPlanComparisonDeliverables) : [];
  let reviewFeatures: any[] = [];
  if (reviewingQuote) {
    reviewFeatures = features.filter(f => 
      f.projectId === reviewingQuote.projectId || 
      f.projectId === activeProjectDetail?.id || 
      f.projectName === reviewingQuote.projectName || 
      f.projectName === activeProjectDetail?.name
    );
  }
  const reviewPdfHtmlContent = reviewingQuote ? generateSpeshwayEstimationPdfHtml(activeProjectDetail, reviewingQuote, reviewFeatures) : "";
  const pdfHtmlContent = reviewPdfHtmlContent;

  // Check if current view should hide the main CRM sidebar
  const hideSidebar = Boolean(
    activeProjectDetail ||
    (activeProjectProposalsView && activeTab === "our-projects")
  );

  // 3. Render Main CRM Admin Dashboard
  // 3. Render Main CRM Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-[#FF5349] selection:text-white">
      {!hideSidebar && (
        <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 bg-[#06132D] text-white flex flex-col shrink-0 px-5 py-5 border-r border-slate-800/40 relative overflow-hidden">
          <div className="flex flex-col gap-6 min-h-0 flex-1">
            {/* Brand Logo and icon - Matching Image 2 */}
            <div className="border-b border-slate-800/60 pb-4 min-w-0">
              <CrmBrandLogo size="sm" dark onlyCrm />
            </div>

            {/* Unified Navigation List with Perfect Alignment */}
            <div className="flex flex-col min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 no-scrollbar">
              <nav className="flex flex-col gap-2">
                {sidebarCategories.flatMap(category => category.links).map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    <div key={link.id} className="relative">
                      <button
                        onClick={() => {
                          setActiveTab(link.id);
                          setActiveClientDetail(null);
                          setActiveProjectDetail(null);
                          setActiveProjectProposalsView(null);
                          setSelectedClientProjectId(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all duration-200 ease-out overflow-hidden [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0 [&>svg]:text-current ${
                          isActive
                            ? "bg-[#FF5349] hover:bg-[#F05454] !text-white shadow-lg shadow-[#FF5349]/25 scale-[1.02]"
                            : "!text-slate-300 hover:!text-white hover:bg-white/10"
                        }`}
                      >
                        {link.icon}
                        <span className="truncate">{link.name}</span>
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Floating White User Card - Matching Image 2 */}
            <div className="pt-4 border-t border-slate-800/60 shrink-0">
              <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#06132D] text-white font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
                    AD
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate leading-tight">Admin Operator</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate leading-tight">Super Admin Account</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  title="Log Out Workspace"
                  className="p-1.5 rounded-lg text-[#FF5349] hover:bg-red-50 transition-colors shrink-0"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. MAIN WORKSPACE CONTENT CONTAINER */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto animate-page-enter">
        <input 
          type="file" 
          ref={quoteFileInputRef} 
          accept=".txt,.json,.csv,.doc,.docx,.pdf" 
          onChange={handleQuoteFileUpload} 
          className="hidden" 
        />
        {activeProjectDetail ? (
          <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse">Loading project details workspace...</div>}>
            <ProjectDetailModal
              activeProjectDetail={activeProjectDetail}
              setActiveProjectDetail={setActiveProjectDetail}
              activeProjectTab={activeProjectTab}
              setActiveProjectTab={setActiveProjectTab}
              quotations={quotations}
              setQuotations={setQuotations}
              features={features}
              setFeatures={setFeatures}
              setReviewingQuote={setReviewingQuote}
              API_URL={API_URL}
              loadDatabase={loadDatabase}
              defaultPlanComparisonDeliverables={defaultPlanComparisonDeliverables}
              getCleanPlanComparisonItems={getCleanPlanComparisonItems}
              generateSpeshwayEstimationPdfHtml={generateSpeshwayEstimationPdfHtml}
              triggerDirectPdfDownload={triggerDirectPdfDownload}
              universalSectionFileInputRef={universalSectionFileInputRef}
              activeSectionToUpload={activeSectionToUpload}
              setActiveSectionToUpload={setActiveSectionToUpload}
              handleUniversalSectionFileUpload={handleUniversalSectionFileUpload}
              handleSaveQuotationSection={handleSaveQuotationSection}
            />
          </Suspense>
        ) : activeProjectProposalsView ? (
          <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse">Loading proposal workspace...</div>}>
            <ProjectProposalsWorkspace
              project={activeProjectProposalsView}
              quotations={quotations}
              setQuotations={setQuotations}
              invoices={invoices}
              agreements={agreements}
              autoOpenAgreement={autoOpenAgreementStudio}
              onBackToProjects={() => {
                setActiveProjectProposalsView(null);
                setAutoOpenAgreementStudio(false);
              }}
              onOpen8Sections={(quote) => {
                setActiveProjectDetail(activeProjectProposalsView);
                setActiveProjectTab("overview");
                setReviewingQuote(null);
              }}
              API_URL={API_URL}
              loadDatabase={loadDatabase}
              triggerDirectPdfDownload={triggerDirectPdfDownload}
              onWorkspaceSubtabChange={setActiveProjectWorkspaceSubtab}
              onInvoiceStudioChange={setIsProjectInvoiceStudioOpen}
            />
          </Suspense>
        ) : (
          <>
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Welcome back, <span className="text-[#FF5349]">Admin Operator</span> 👋
                </h1>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Here's what's happening with your CRM today.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search clients, projects, leads..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-[#FF5349] focus:ring-2 focus:ring-red-100 shadow-xs"
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>
            </header>

            {/* Tab: Overview (Hub Dashboard) */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="font-heading font-extrabold text-base text-[#06132D]">Executive Dashboard</h2>
                    <p className="text-xs text-gray-500 mt-1">Key business health across clients, sales, projects, billing, and delivery.</p>
                  </div>
                  <div className="text-[10px] font-bold text-[#FF5349] bg-red-50 border border-red-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Core operating metrics
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {dashboardMetricCards.map((card) => (
                    <div key={card.label} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{card.label}</span>
                        <span className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${card.tone}`}>
                          {card.icon}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-2xl font-extrabold text-[#06132D] leading-none">
                          {(card as any).currency ? `₹${Number(card.value || 0).toLocaleString('en-IN')}` : Number(card.value || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{card.suffix}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <GlassCard className="p-5 bg-white/50 border border-gray-200 flex flex-col gap-4">
                    <h3 className="font-heading font-bold text-sm text-[#06132D]">Active Deal pipeline</h3>
                    <div className="flex flex-col gap-3">
                      {pipelineStages.map((stage, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-xs">
                          <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">{stage.name}</span>
                            <span>{stage.count} Deals ({stage.percentage})</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full rounded-full ${stage.color}`} style={{ width: stage.percentage }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                  <GlassCard className="xl:col-span-3 p-5 bg-white/60 border border-gray-200 flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-heading font-bold text-sm text-[#06132D]">Reports & Analytics</h3>
                        <p className="text-[10px] text-gray-500 mt-0.5">Conversion, collection, proposal, and revenue health.</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#FF5349] bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg uppercase">
                        Live CRM Metrics
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                      {analyticsCards.map((card) => (
                        <div key={card.label} className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-all flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">{card.label}</span>
                            <span className={`w-2.5 h-2.5 rounded-full ${card.color}`} />
                          </div>
                          <span className="text-2xl font-black text-slate-900">{card.value}</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{card.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs">
                        <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">Finance Snapshot</div>
                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between font-medium"><span>Invoice Value</span><strong className="text-slate-900">₹{totalInvoiceValue.toLocaleString('en-IN')}</strong></div>
                          <div className="flex justify-between font-medium"><span>Payments</span><strong className="text-emerald-600">₹{totalPaymentsValue.toLocaleString('en-IN')}</strong></div>
                          <div className="flex justify-between font-medium"><span>Expenses</span><strong className="text-rose-600">₹{totalExpensesValue.toLocaleString('en-IN')}</strong></div>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs">
                        <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">Project Snapshot</div>
                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between font-medium"><span>Client Projects</span><strong className="text-slate-900">{projects.length}</strong></div>
                          <div className="flex justify-between font-medium"><span>Showcase Projects</span><strong className="text-slate-900">{ourProjects.length}</strong></div>
                          <div className="flex justify-between font-medium"><span>Scoped Features</span><strong className="text-slate-900">{features.length}</strong></div>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs">
                        <div className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">People Snapshot</div>
                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between font-medium"><span>Users</span><strong className="text-slate-900">{users.length}</strong></div>
                          <div className="flex justify-between font-medium"><span>Employees</span><strong className="text-slate-900">{employees.length}</strong></div>
                          <div className="flex justify-between font-medium"><span>Teams</span><strong className="text-slate-900">{teams.length}</strong></div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col gap-4">
                    <h3 className="font-heading font-extrabold text-sm text-slate-900">Lead Source Report</h3>
                    <div className="flex flex-col gap-3">
                      {["Website", "Facebook", "Instagram", "Google Ads", "WhatsApp", "Phone call", "Referral", "Direct enquiry", "Other"].map((source) => {
                        const sourceCount = leads.filter(l => l.source === source).length;
                        const pct = leads.length ? Math.round((sourceCount / leads.length) * 100) : 0;
                        return (
                          <div key={source} className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-600">
                              <span>{source}</span>
                              <span>{sourceCount} ({pct}%)</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

        {/* Tab: Clients */}
        {activeTab === "clients" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            {activeClientDetail ? (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* TOP BREADCRUMB & ACTION BAR */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button" 
                      onClick={() => setActiveClientDetail(null)} 
                      variant="secondary" 
                      size="sm" 
                      className="text-xs font-bold gap-1 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    >
                      <ArrowLeft size={14} /> Back to Clients Directory
                    </Button>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="text-xs font-mono font-bold text-[#FF5349] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                      Client Profile #{activeClientDetail.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => {
                        setProjectForm(prev => ({
                          ...prev,
                          clientName: activeClientDetail.name || activeClientDetail.company,
                          clientId: activeClientDetail.id
                        }));
                        setShowProjectModal(true);
                      }} 
                      variant="primary" 
                      size="sm" 
                      className="text-xs font-bold gap-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white shadow-sm"
                    >
                      <Plus size={14} /> Create Project for {activeClientDetail.name}
                    </Button>
                  </div>
                </div>

                {/* CLIENT DETAILS OVERVIEW CARD */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5349] to-[#06132D] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0">
                      {(activeClientDetail.name || activeClientDetail.company || "C").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-heading font-extrabold text-[#071E34] text-xl">{activeClientDetail.name}</h2>
                        <span className={`px-2.5 py-0.5 rounded-full font-extrabold uppercase text-[10px] border ${
                          activeClientDetail.status === "Active" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>
                          {activeClientDetail.status || "ACTIVE"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">{activeClientDetail.company || "Enterprise Client Organization"}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 font-mono text-gray-700"><Mail size={13} className="text-[#FF5349]" /> {activeClientDetail.email}</span>
                        <span className="flex items-center gap-1 font-mono text-gray-700"><Phone size={13} className="text-[#FF5349]" /> {activeClientDetail.whatsapp || activeClientDetail.phone}</span>
                        <span className="flex items-center gap-1 font-semibold text-gray-700"><Building2 size={13} className="text-[#FF5349]" /> {activeClientDetail.industry || "Retail / Services"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 min-w-[240px] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Assigned Associate</span>
                      <strong className="text-[#071E34] font-bold">{activeClientDetail.assignedEmployee || "Nisha Rao (Sales Lead)"}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Total Client Projects</span>
                      <strong className="text-[#FF5349] font-bold font-mono text-sm">
                        {getClientLinkedWorkspaceData(activeClientDetail).clientProjects.length}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Quotations Count</span>
                      <strong className="text-[#FF5349] font-bold font-mono text-sm">
                        {getClientLinkedWorkspaceData(activeClientDetail).clientQuotes.length}
                      </strong>
                    </div>
                  </div>
                </div>

                {activeClientDetail.loginEmail && (
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Client Dashboard Credentials</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs">
                        <span className="font-mono font-bold text-[#071E34] bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          Email: {activeClientDetail.loginEmail}
                        </span>
                        <span className="font-mono font-bold text-[#071E34] bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          Password: {activeClientDetail.loginPassword || "Saved"}
                        </span>
                        <span className="font-mono font-bold text-[#FF5349] bg-white border border-rose-100 px-2.5 py-1 rounded-lg">
                          {activeClientDetail.credentialsSentAt ? "Credentials Sent" : "Not Sent Yet"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const text = `Login URL: ${activeClientDetail.loginUrl || `${window.location.origin}/auth/login`}\nEmail: ${activeClientDetail.loginEmail}\nPassword: ${activeClientDetail.loginPassword || ""}`;
                          navigator.clipboard?.writeText(text);
                          showToast("Client credentials copied.", "success");
                        }}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-[#071E34] border border-slate-200 rounded-xl text-xs font-extrabold"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleResendClientCredentials(activeClientDetail)}
                        className="px-4 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl text-xs font-extrabold shadow-sm"
                      >
                        Resend Credentials
                      </button>
                    </div>
                  </div>
                )}

                {/* CLIENT SERVICE AGREEMENT ACTION BANNER (EDIT, PREVIEW & SEND EMAIL) */}
                {(() => {
                  const { clientProjects } = getClientLinkedWorkspaceData(activeClientDetail);
                  const clientProj = clientProjects[0] || {
                    id: `PRJ-${activeClientDetail.id || 'CLIENT'}`,
                    name: `${activeClientDetail.name || activeClientDetail.company || 'Client'} Project`,
                    title: `${activeClientDetail.name || activeClientDetail.company || 'Client'} Project`,
                    clientName: activeClientDetail.name || activeClientDetail.company || "Client Enterprise",
                    clientEmail: activeClientDetail.email,
                    budget: 80000,
                    status: "In Progress"
                  };
                  const clientAgr = agreements.find((a: any) => 
                    (a.clientName && a.clientName.toLowerCase() === (activeClientDetail.name || "").toLowerCase()) ||
                    (a.clientEmail && a.clientEmail.toLowerCase() === (activeClientDetail.email || "").toLowerCase()) ||
                    a.projectId === clientProj.id
                  ) || {
                    id: `SPW-AGR-${activeClientDetail.id}`,
                    number: `SPW-AGR-${activeClientDetail.id}`,
                    proposalId: `QT-${clientProj.id}`,
                    projectId: clientProj.id,
                    projectName: clientProj.name || clientProj.title || "Software Project",
                    clientName: activeClientDetail.name || activeClientDetail.company || "Client Enterprise",
                    clientAddress: activeClientDetail.location || activeClientDetail.address || "Hyderabad, Telangana",
                    duration: "one (1) month",
                    rate: clientProj.budget || 80000,
                    amount: clientProj.budget || 80000,
                    budget: clientProj.budget || 80000,
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

                  const handleEditAgreement = () => {
                    const globalBranding = getGlobalCompanyDetails();
                    setEditingClientDoc({
                      type: "agreement",
                      item: clientAgr,
                      refNumber: clientAgr.number || clientAgr.id || `SPW-AGR-${activeClientDetail.id}`,
                      issueDate: clientAgr.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                      clientName: activeClientDetail?.name || clientAgr.clientName || "Client Enterprise",
                      clientEmail: activeClientDetail?.email || clientAgr.clientEmail || "",
                      productName: clientAgr.projectName || clientProj.name || "Software Development Project",
                      category: clientAgr.projectType || "Software Application",
                      overviewNarrative: clientAgr.sec1Content || "The Company agrees to design and develop a software platform.",
                      rate: Number(clientAgr.rate || clientAgr.budget || 80000),
                      duration: clientAgr.duration || "one (1) month",
                      pdfPrimaryColor: clientAgr.pdfPrimaryColor || globalBranding.pdfPrimaryColor || "#5D3ADF",
                      pdfSecondaryColor: clientAgr.pdfSecondaryColor || globalBranding.pdfSecondaryColor || "#B8F7A1",
                      companyName: clientAgr.billedByCompany || globalBranding.companyName || "Speshway Solutions Private Limited",
                      companyTagline: globalBranding.companyTagline || "Software Development Company",
                      companyAddress: clientAgr.companyAddress || globalBranding.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                      companyEmail: globalBranding.companyEmail || "info@speshway.com",
                      companyPhone: globalBranding.companyPhone || "+91 91000 06020",
                      companyWebsite: globalBranding.companyWebsite || "www.speshway.com",
                      companyLogoUrl: clientAgr.companyLogoUrl || globalBranding.companyLogoUrl || "/logo.png",
                      showWatermark: clientAgr.showWatermark !== undefined ? Boolean(clientAgr.showWatermark) : true,
                      companyWatermarkText: clientAgr.companyWatermarkText || globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS",
                      companyWatermarkUrl: clientAgr.companyWatermarkUrl || globalBranding.companyWatermarkUrl || "/watermark.png",
                      companyWatermarkOpacity: clientAgr.companyWatermarkOpacity !== undefined ? Number(clientAgr.companyWatermarkOpacity) : 0.25,
                      companyWatermarkContrast: clientAgr.companyWatermarkContrast !== undefined ? Number(clientAgr.companyWatermarkContrast) : 150,
                      companyWatermarkGrayscale: clientAgr.companyWatermarkGrayscale !== undefined ? Boolean(clientAgr.companyWatermarkGrayscale) : false,
                      companyWatermarkSize: clientAgr.companyWatermarkSize !== undefined ? Number(clientAgr.companyWatermarkSize) : 50,
                      companyWatermarkImgSize: clientAgr.companyWatermarkImgSize !== undefined ? Number(clientAgr.companyWatermarkImgSize) : 290
                    });
                  };

                  const handlePreviewAgreement = () => {
                    const html = generateSpeshwayAgreementPdfHtml(clientAgr, clientProj, 1.0);
                    setClientPdfPreviewModal({
                      title: `Service Agreement Preview - ${clientAgr.number || clientAgr.id}`,
                      html: html,
                      item: clientAgr
                    });
                    setIsFullScreenPdf(true);
                  };

                  const handleSendAgreementMail = () => {
                    const html = generateSpeshwayAgreementPdfHtml(clientAgr, clientProj, 1.0);
                    setClientEmailModal({
                      toEmail: activeClientDetail.email || activeClientDetail.loginEmail || "",
                      subject: `Software Development Agreement — ${activeClientDetail.name || "Client"}`,
                      fileName: `Software_Development_Agreement_${(activeClientDetail.name || "Client").replace(/[^A-Za-z0-9]/g, "_")}.pdf`,
                      htmlContent: html,
                      textContent: `Dear ${activeClientDetail.name || "Valued Client"},\n\nPlease find attached the official Software Development Agreement for ${clientProj.name || "your software project"}.\n\nKindly review and let us know if you have any questions.\n\nBest regards,\nSpeshway Solutions Team`,
                      item: clientAgr
                    });
                  };

                  return (
                    <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-teal-50/60 p-5 rounded-2xl border border-purple-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#5D3ADF] text-white flex items-center justify-center shadow-md shrink-0">
                          <FileText size={22} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading font-extrabold text-[#071E34] text-sm">Client Software Development Agreement</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                              Legal Contract
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Edit agreement terms, preview live PDF, and dispatch directly to client email: <strong className="text-[#5D3ADF] font-mono">{activeClientDetail.email}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap shrink-0">
                        {/* 1. EDIT AGREEMENT BUTTON */}
                        <button
                          onClick={handleEditAgreement}
                          className="px-3.5 py-2 bg-white hover:bg-purple-50 text-purple-900 border border-purple-300 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Edit size={14} className="text-[#5D3ADF]" /> Edit Agreement
                        </button>

                        {/* 2. PREVIEW AGREEMENT PDF BUTTON */}
                        <button
                          onClick={handlePreviewAgreement}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Eye size={14} className="text-teal-400" /> Preview PDF
                        </button>

                        {/* 3. SEND AGREEMENT TO CLIENT MAIL BUTTON */}
                        <button
                          onClick={handleSendAgreementMail}
                          className="px-4 py-2 bg-[#5D3ADF] hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        >
                          <Send size={14} /> Send Agreement to Client Email
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {(() => {
                  const { clientProjects } = getClientLinkedWorkspaceData(activeClientDetail);
                  const kanbanColumns = [
                    { title: "Planning", status: "Planning", dot: "bg-purple-400", empty: "No projects in planning" },
                    { title: "Designing", status: "Designing", dot: "bg-indigo-400", empty: "No projects in design" },
                    { title: "Development", status: "Development", dot: "bg-amber-400", empty: "No projects in development" },
                    { title: "Testing", status: "Testing", dot: "bg-pink-400", empty: "No projects in testing" },
                    { title: "Completed", status: "Completed", dot: "bg-emerald-400", empty: "No completed projects" },
                  ];
                  const projectColumnStatus = (status?: string) => {
                    const current = String(status || "").trim().toLowerCase();
                    if (current === "completed") return "Completed";
                    if (current === "testing") return "Testing";
                    if (current === "development" || current === "in progress" || current === "in-progress") return "Development";
                    if (current === "designing" || current === "design") return "Designing";
                    return "Planning";
                  };
                  const totalBudget = clientProjects.reduce((sum, project) => sum + Number(project.budget || 0), 0);
                  const ongoingCount = clientProjects.filter(p => !["completed", "cancelled", "planning"].includes(String(p.status || "").toLowerCase())).length;
                  const completedCount = clientProjects.filter(p => String(p.status || "").toLowerCase() === "completed").length;
                  const projectStatuses = ["Planning", "Designing", "Development", "Testing", "Completed", "Cancelled"];

                  return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-gray-150 pb-3">
                        <div>
                          <h3 className="font-heading font-extrabold text-[#071E34] text-base">Client Project Workspaces</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Drag project cards between stages. Status syncs to the client dashboard.</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl">Total <strong className="text-[#071E34]">{clientProjects.length}</strong></span>
                          <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl">Ongoing <strong className="text-[#071E34]">{ongoingCount}</strong></span>
                          <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl">Budget <strong className="text-[#071E34]">₹{totalBudget.toLocaleString()}</strong></span>
                          <span className="text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl">Completed <strong className="text-[#071E34]">{completedCount}</strong></span>
                        </div>
                      </div>

                      {clientProjects.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-500">
                          No project workspace is linked to this client yet. Permanent-client conversion will create one automatically.
                        </div>
                      ) : (
                        <>
                        <div className="flex flex-row overflow-x-auto gap-4 pb-4 select-none scrollbar-thin">
                          {kanbanColumns.map(column => {
                            const columnProjects = clientProjects.filter(project => projectColumnStatus(project.status) === column.status);
                            return (
                              <div
                                key={column.status}
                                onDragOver={(event) => {
                                  event.preventDefault();
                                  event.dataTransfer.dropEffect = "move";
                                  if (draggedProjectStatus !== column.status) setDraggedProjectStatus(column.status);
                                }}
                                onDragEnter={(event) => {
                                  event.preventDefault();
                                  setDraggedProjectStatus(column.status);
                                }}
                                onDrop={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  const projectId = event.dataTransfer.getData("application/x-crm-client-project-id") || event.dataTransfer.getData("text/plain") || (window as any).draggedProjectId || draggingClientProjectId;
                                  if (projectId) {
                                    handleUpdateProjectStatus(projectId, column.status);
                                  }
                                  setDraggedProjectStatus(null);
                                  setDraggingClientProjectId(null);
                                  (window as any).draggedProjectId = null;
                                }}
                                className={`min-h-[340px] w-full min-w-[270px] max-w-[320px] flex-1 rounded-2xl border p-4 transition-all duration-200 ease-out ${
                                  draggedProjectStatus === column.status
                                    ? "border-[#FF5349] bg-rose-50/70 shadow-md ring-2 ring-rose-500/10 scale-[1.01]"
                                    : "border-gray-200 bg-gray-50/60 hover:border-rose-200 hover:bg-rose-50/30"
                                }`}
                              >
                                <div className="flex items-center justify-between pb-3">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${column.dot}`} />
                                    <h4 className="font-extrabold text-[#071E34] text-sm">{column.title}</h4>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{columnProjects.length}</span>
                                  </div>
                                  <span className="text-xl leading-none text-gray-400 font-light">+</span>
                                </div>

                                {columnProjects.length === 0 ? (
                                  <div className="h-[190px] flex items-center justify-center text-sm text-gray-400">
                                    {column.empty}
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    {columnProjects.map(project => {
                                      const budget = Number(project.budget || 0);
                                      const progress = Math.max(0, Math.min(100, Number(project.progress || 0)));
                                      return (
                                        <div
                                          key={project.id}
                                          draggable
                                          onDragStart={(event) => {
                                            setDraggingClientProjectId(project.id);
                                            (window as any).draggedProjectId = project.id;
                                            event.dataTransfer.setData("application/x-crm-client-project-id", project.id);
                                            event.dataTransfer.setData("text/plain", project.id);
                                            event.dataTransfer.effectAllowed = "move";
                                          }}
                                          onDragEnd={() => {
                                            setDraggingClientProjectId(null);
                                            setDraggedProjectStatus(null);
                                            (window as any).draggedProjectId = null;
                                          }}
                                          className={`cursor-grab rounded-2xl border bg-white p-4 shadow-sm active:cursor-grabbing transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                            selectedClientProjectId === project.id ? "border-[#FF5349] ring-2 ring-rose-100" : "border-gray-200"
                                          } ${
                                            draggingClientProjectId === project.id ? "opacity-60 ring-2 ring-rose-300 scale-[0.99]" : ""
                                          }`}
                                        >
                                          <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                              <h5 className="font-extrabold text-[#071E34] text-sm truncate">{project.name || project.title || project.id}</h5>
                                              <p className="text-xs text-gray-500 mt-0.5 truncate">{project.clientName || activeClientDetail.name}</p>
                                              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{project.description || project.category || "Client project workspace"}</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shrink-0">{column.title}</span>
                                          </div>

                                          <div className="mt-4">
                                            <div className="flex justify-between text-[11px] text-gray-500 font-semibold mb-1">
                                              <span>Budget progress</span>
                                              <span className="font-mono text-[#071E34]">₹0 / ₹{budget.toLocaleString()}</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                              <div className="h-full rounded-full bg-[#FF5349]" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="mt-2 text-[11px] font-semibold text-rose-600">Pending: ₹{budget.toLocaleString()}</div>
                                          </div>

                                          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2.5 text-[11px] text-gray-500">
                                             <div className="flex items-center gap-1 font-semibold">
                                               <Calendar size={12} className="text-gray-400" />
                                               <span>{project.startDate || project.expectedCompletionDate || "No date"}</span>
                                             </div>
                                             <div className="flex items-center gap-2 w-full justify-between">
                                               <button
                                                 onClick={() => setSelectedTodoProjectId(project.id)}
                                                 className="flex-1 text-center py-1.5 bg-white hover:bg-rose-50 text-[#FF5349] rounded-lg border border-rose-200 text-[10px] font-extrabold transition-all"
                                               >
                                                 Todo
                                               </button>
                                               <button
                                                 onClick={() => {
                                                   setSelectedClientProjectId(project.id);
                                                   setSelectedProposalId(null);
                                                 }}
                                                 className="flex-1 text-center py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-[10px] font-extrabold transition-all shadow-2xs"
                                               >
                                                 View Docs
                                               </button>
                                             </div>
                                           </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {(() => {
                          const todoProject = clientProjects.find(project => project.id === selectedTodoProjectId) || clientProjects[0];
                          const todoItems = todoProject ? getProjectTodos(todoProject) : [];
                          const openTodos = todoItems.filter(todo => !todo.completed).length;
                          return (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                              <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                  <h4 className="flex items-center gap-2 font-heading text-base font-extrabold text-[#071E34]">
                                    <CheckSquare size={17} className="text-[#FF5349]" /> Project To-do List
                                  </h4>
                                  <p className="mt-0.5 text-xs font-semibold text-slate-500">Select one client project and manage its tasks separately from the stage board.</p>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                  <select
                                    value={todoProject?.id || ""}
                                    onChange={(event) => setSelectedTodoProjectId(event.target.value)}
                                    className="min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-[#071E34] outline-none focus:border-[#FF5349]"
                                  >
                                    {clientProjects.map(project => (
                                      <option key={project.id} value={project.id}>{project.name || project.title || project.id}</option>
                                    ))}
                                  </select>
                                  <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-rose-700 border border-rose-100">{openTodos} open</span>
                                </div>
                              </div>

                              {todoProject && (
                                <div className="mt-4">
                                  <div className="flex flex-col gap-2 sm:flex-row">
                                    <input
                                      value={projectTodoInputs[todoProject.id] || ""}
                                      onChange={(event) => setProjectTodoInputs((prev) => ({ ...prev, [todoProject.id]: event.target.value }))}
                                      onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                          event.preventDefault();
                                          handleAddProjectTodo(todoProject);
                                        }
                                      }}
                                      placeholder="Add project task"
                                      className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#071E34] outline-none focus:border-[#0E9F8A]"
                                    />
                                    <button
                                      onClick={() => handleAddProjectTodo(todoProject)}
                                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E9F8A] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-teal-700"
                                    >
                                      <Plus size={15} /> Add Task
                                    </button>
                                  </div>

                                  <div className="mt-3 grid gap-2">
                                    {todoItems.length === 0 ? (
                                      <div className="rounded-lg border border-dashed border-teal-200 bg-white/70 px-4 py-5 text-center text-xs font-semibold text-slate-400">
                                        No tasks added for this project yet.
                                      </div>
                                    ) : (
                                      todoItems.map(todo => (
                                        <div key={todo.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3">
                                          <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleProjectTodo(todoProject, todo.id)}
                                            className="h-4 w-4 rounded border-slate-300 text-[#0E9F8A] focus:ring-[#0E9F8A]"
                                          />
                                          <span className={`min-w-0 flex-1 text-sm font-semibold ${todo.completed ? "text-slate-400 line-through" : "text-[#071E34]"}`}>
                                            {todo.text}
                                          </span>
                                          <button
                                            onClick={() => handleDeleteProjectTodo(todoProject, todo.id)}
                                            className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                            title="Remove task"
                                          >
                                            <Trash2 size={15} />
                                          </button>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                        <div className="hidden">
                          {clientProjects.map(project => (
                            <div
                              key={project.id}
                              className={`p-4 rounded-xl border transition-all duration-200 ease-out ${
                                selectedClientProjectId === project.id ? "border-[#0E9F8A] bg-teal-50/50" : "border-gray-200 bg-gray-50/40 hover:bg-teal-50/30"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <span className="text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-white border border-teal-100 px-2 py-0.5 rounded">
                                    {project.id}
                                  </span>
                                  <h4 className="font-extrabold text-[#071E34] text-sm mt-2 truncate">{project.name}</h4>
                                  <p className="text-[10px] text-gray-500 mt-1">{project.category || "Development"} &bull; Budget ₹{Number(project.budget || 0).toLocaleString()}</p>
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedClientProjectId(project.id);
                                    setSelectedProposalId(null);
                                  }}
                                  className="px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-[10px] font-extrabold"
                                >
                                  View Docs
                                </button>
                              </div>
                              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
                                <label className="text-[10px] font-extrabold uppercase text-gray-500">Project Status</label>
                                <select
                                  value={project.status || "Planning"}
                                  onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
                                  className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-bold text-[#071E34] focus:outline-none focus:border-[#0E9F8A]"
                                >
                                  {projectStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>
                  );
                })()}
                {/* STEP 1: INITIAL STATE - NO PROJECT SELECTED */}
                {!selectedClientProjectId ? (
                  <div className="flex flex-col gap-6">
                    {/* OVERALL CLIENT HISTORY TABLES (QUOTATIONS, TAX INVOICES & EMAILS) */}
                    {(() => {
                      const { clientQuotes, clientInvoices } = getClientLinkedWorkspaceData(activeClientDetail);

                      return (
                        <div className="flex flex-col gap-5">
                          {/* 1. QUOTATIONS & TAX INVOICES HISTORY TABLE */}
                          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0E9F8A] flex items-center justify-center font-bold">
                                  <Clock size={18} />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-[#071E34] text-base">Client Quotations & Tax Invoices History</h4>
                                  <span className="text-xs text-gray-500 block">Complete historical list of all quotations and tax invoices for {activeClientDetail?.name || 'naveen'}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                                  {clientQuotes.length} Quotation(s)
                                </span>
                                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                                  {clientInvoices.length} Invoice(s)
                                </span>
                              </div>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider">
                                    <th className="p-3">Doc Type</th>
                                    <th className="p-3">Reference No</th>
                                    <th className="p-3">Title / Scope</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150 text-xs">
                                  {clientQuotes.length === 0 ? (
                                    <tr>
                                      <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">No quotations found for this client.</td>
                                    </tr>
                                  ) : (
                                    clientQuotes.map(q => (
                                      <tr key={q.id || q.number} className="hover:bg-teal-50/40 transition-all duration-200 ease-out">
                                        <td className="p-3">
                                          <span className="text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">QUOTATION</span>
                                        </td>
                                        <td className="p-3 font-mono font-bold text-gray-800">{q.id || q.number}</td>
                                        <td className="p-3 font-semibold text-gray-900">{q.title || "Project Proposal Quotation"}</td>
                                        <td className="p-3 text-gray-500">{q.createdDate || q.date || "15 July, 2026"}</td>
                                        <td className="p-3 font-mono font-extrabold text-[#0E9F8A]">₹{(q.planAPrice || q.budget || 50000).toLocaleString()}</td>
                                        <td className="p-3">
                                          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">VERIFIED</span>
                                        </td>
                                        <td className="p-3 text-right">
                                          <div className="flex items-center justify-end gap-2">
                                            <button
                                              onClick={() => handleOpenClientItemPreview(q, "quotation")}
                                              className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                            >
                                              <Eye size={12} /> Preview PDF
                                            </button>
                                            <button
                                              onClick={() => handleOpenClientItemEmailModal(q, "quotation")}
                                              className="px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                            >
                                              <Mail size={12} /> Send Email
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  )}

                                  {clientInvoices.length === 0 ? (
                                    <tr>
                                      <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">No invoices found for this client.</td>
                                    </tr>
                                  ) : (
                                    clientInvoices.map(inv => (
                                      <tr key={inv.id || inv.number} className="hover:bg-teal-50/40 transition-all duration-200 ease-out">
                                        <td className="p-3">
                                          <span className="text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">TAX INVOICE</span>
                                        </td>
                                        <td className="p-3 font-mono font-bold text-gray-800">{inv.number || inv.id}</td>
                                        <td className="p-3 font-semibold text-gray-900">{inv.description || `${inv.productName || 'Software'} Tax Invoice`}</td>
                                        <td className="p-3 text-gray-500">{inv.date || "28 July, 2026"}</td>
                                        <td className="p-3 font-mono font-extrabold text-teal-700">₹{(inv.totalDue || inv.rate || 59000).toLocaleString()}</td>
                                        <td className="p-3">
                                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">PAID</span>
                                        </td>
                                        <td className="p-3 text-right">
                                          <div className="flex items-center justify-end gap-2">
                                            <button
                                              onClick={() => handleOpenClientItemPreview(inv, "invoice")}
                                              className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                            >
                                              <Eye size={12} /> Preview PDF
                                            </button>
                                            <button
                                              onClick={() => handleOpenClientItemEmailModal(inv, "invoice")}
                                              className="px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                            >
                                              <Mail size={12} /> Send Email
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 2. DISPATCHED EMAILS & PDF HISTORY TABLE */}
                          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                  <Mail size={18} />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-[#071E34] text-base">Dispatched Emails & PDF Attachment History</h4>
                                  <span className="text-xs text-gray-500 block">Complete log of all email dispatches sent to {activeClientDetail?.email || 'naveenkumar970100@gmail.com'}</span>
                                </div>
                              </div>

                              <span className="text-xs font-extrabold text-blue-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5">
                                <Send size={12} /> {sentEmailLogs.length} Email(s) Sent
                              </span>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider">
                                    <th className="p-3">Log ID</th>
                                    <th className="p-3">Dispatched At</th>
                                    <th className="p-3">Doc Type</th>
                                    <th className="p-3">Recipient Email</th>
                                    <th className="p-3">Subject Line</th>
                                    <th className="p-3">Attachment File</th>
                                    <th className="p-3">Delivery Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150 text-xs">
                                  {sentEmailLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50 transition-all duration-200 ease-out">
                                      <td className="p-3 font-mono font-bold text-gray-700">{log.id}</td>
                                      <td className="p-3 text-gray-500 font-medium">{log.sentAt}</td>
                                      <td className="p-3">
                                        <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${
                                          log.docType.toLowerCase().includes("invoice") 
                                            ? "text-teal-700 bg-teal-50 border-teal-200" 
                                            : "text-[#0E9F8A] bg-teal-50 border-teal-100"
                                        }`}>
                                          {log.docType.toUpperCase()}
                                        </span>
                                      </td>
                                      <td className="p-3 font-mono text-gray-800 font-bold">{log.recipient}</td>
                                      <td className="p-3 font-medium text-gray-900 max-w-[220px] truncate" title={log.subject}>{log.subject}</td>
                                      <td className="p-3">
                                        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100 max-w-[180px] truncate">
                                          <Paperclip size={10} className="shrink-0" />
                                          <span className="truncate">{log.fileName}</span>
                                        </div>
                                      </td>
                                      <td className="p-3">
                                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 w-fit">
                                          <CheckCircle size={10} /> {log.status}
                                        </span>
                                      </td>
                                      <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          {(log.htmlContent || log.documentType || log.docType) && (
                                            <button
                                              onClick={() => handleViewClientDoc(log)}
                                              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                            >
                                              <Eye size={12} /> View Sent PDF
                                            </button>
                                          )}
                                          <button
                                            onClick={() => handleOpenClientItemEmailModal(log.item || { number: log.docRef, title: log.subject }, log.docType.toLowerCase().includes("invoice") ? "invoice" : "quotation")}
                                            className="px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                          >
                                            <Mail size={12} /> Resend Email
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : !selectedProposalId ? (
                  /* STEP 2: PROJECT SELECTED - SHOW PROPOSALS FOR THIS PROJECT ONLY */
                  (() => {
                    const allAvailableProjects = [
                      ...projects,
                      ...ourProjects.map(op => ({
                        id: op.id || `OPRJ-${op.name}`,
                        name: op.name || op.title,
                        title: op.title || op.name,
                        category: op.category || "Our Projects",
                        clientName: op.clientName || "Our Projects Showcase",
                        budget: op.budget || 45000,
                        status: op.status || "Live Production",
                        description: op.description || "Portfolio project specification."
                      }))
                    ];
                    const currentSelectedProj = allAvailableProjects.find(p => p.id === selectedClientProjectId);

                    const projectProposals = quotations.filter(q => 
                      q.projectId === selectedClientProjectId || 
                      (currentSelectedProj && q.projectName && q.projectName.toLowerCase() === (currentSelectedProj.name || "").toLowerCase()) ||
                      q.id === `QT-${selectedClientProjectId}` ||
                      q.id.includes(selectedClientProjectId)
                    );

                    return (
                      <div className="flex flex-col gap-5">
                        {/* ACTIVE PROJECT HEADER BANNER */}
                        <div className="p-5 premium-button rounded-2xl text-white flex justify-between items-center shadow-md flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <FolderOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-100 block">Step 1 Completed &bull; Selected Project Workspace</span>
                              <h3 className="font-extrabold text-base text-white">
                                {currentSelectedProj?.name || selectedClientProjectId}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setSelectedClientProjectId(null); setSelectedProposalId(null); }}
                              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold backdrop-blur-sm transition-all duration-200 ease-out"
                            >
                              View All Projects
                            </button>
                            <button
                              onClick={() => { setSelectedClientProjectId(null); setSelectedProposalId(null); }}
                              className="px-3 py-2 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs font-bold backdrop-blur-sm transition-all duration-200 ease-out"
                            >
                              Clear Selection
                            </button>
                          </div>
                        </div>

                        {/* PROPOSALS LIST FOR SELECTED PROJECT */}
                        <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                          <div className="border-b border-gray-150 pb-3">
                            <span className="text-[10px] font-extrabold uppercase text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded">Step 2: Select a Proposal</span>
                            <h3 className="font-heading font-extrabold text-[#071E34] text-base mt-2">
                              Available Proposals for {currentSelectedProj?.name || selectedClientProjectId}
                            </h3>
                            <p className="text-xs text-gray-400">Click on a proposal below to reveal its specific Quotation & Tax Invoice documents.</p>
                          </div>

                          {projectProposals.length === 0 ? (
                            <div className="p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
                              <FileText className="w-6 h-6 text-gray-400" />
                              <span>No proposals found for this project workspace yet.</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-3">
                              {projectProposals.map(prop => (
                                <div 
                                  key={prop.id}
                                  onClick={() => setSelectedProposalId(prop.id || prop.number)}
                                  className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-[#0E9F8A] hover:bg-teal-50/50 cursor-pointer transition-all duration-200 ease-out flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono font-extrabold text-[#0E9F8A] text-[10px] bg-teal-50 px-2 py-0.5 rounded">{prop.id || prop.number}</span>
                                      <span className="text-[10px] font-bold text-gray-500 uppercase">{prop.projectType || "Proposal Document"}</span>
                                    </div>
                                    <h4 className="font-bold text-[#071E34] text-base mt-1">{prop.title}</h4>
                                    <span className="text-xs text-gray-400 block mt-0.5">Click to select proposal and reveal its quotation & invoice documents.</span>
                                  </div>

                                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                      <span className="font-mono font-extrabold text-[#071E34] text-base block">₹{(prop.planAPrice || prop.budget || 50000).toLocaleString()}</span>
                                      <span className="text-[10px] text-green-600 font-extrabold uppercase">APPROVED</span>
                                    </div>

                                    <button
                                      onClick={(e) => { e.stopPropagation(); setSelectedProposalId(prop.id || prop.number); }}
                                      className="px-4 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all duration-200 ease-out flex items-center gap-1.5"
                                    >
                                      Select Proposal <CheckCircle size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  /* STEP 3: PROPOSAL SELECTED - SHOW QUOTATION & TAX INVOICE FOR THIS PROPOSAL ONLY */
                  <div className="flex flex-col gap-5">
                    {/* BREADCRUMB HEADER BANNER */}
                    <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex justify-between items-center shadow-md flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0E9F8A] text-white flex items-center justify-center font-bold">
                          <FileText size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-300 uppercase font-bold">
                            <span>{projects.find(p => p.id === selectedClientProjectId)?.name || selectedClientProjectId}</span>
                            <span>&rsaquo;</span>
                            <span className="text-[#5ECBC0] font-extrabold">Selected Proposal Documents</span>
                          </div>
                          <h3 className="font-extrabold text-base text-white mt-0.5">
                            {quotations.find(q => q.id === selectedProposalId || q.number === selectedProposalId)?.title || selectedProposalId}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProposalId(null)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-extrabold backdrop-blur-sm transition-all duration-200 ease-out border border-white/10 flex items-center gap-1"
                      >
                        &larr; Back to Proposals List
                      </button>
                    </div>

                    {/* SPECIFIC QUOTATION & INVOICE DOCUMENTS FOR SELECTED PROPOSAL ONLY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* 1. QUOTATION CARD */}
                      <div className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm gap-4">
                        {(() => {
                          const baseQuote = quotations.find(q => q.id === selectedProposalId || q.number === selectedProposalId || q.projectId === selectedClientProjectId) || {
                            id: selectedProposalId,
                            title: "Project Proposal Quotation",
                            planAPrice: 140000
                          };
                          const quote = withClientDocumentOverride(baseQuote, "quotation");

                          return (
                            <>
                              <div className="flex flex-col gap-2 border-b border-gray-150 pb-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 px-2 py-0.5 rounded">QUOTATION DOCUMENT</span>
                                  <span className="text-[10px] font-extrabold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded">VERIFIED</span>
                                </div>
                                <h4 className="font-bold text-[#071E34] text-base mt-1">{quote.title || "Project Estimation Quotation"}</h4>
                                <span className="text-xs font-mono font-extrabold text-gray-700">Ref: {quote.id || quote.number || selectedProposalId}</span>
                                <span className="text-lg font-mono font-extrabold text-[#0E9F8A] mt-1">₹{(quote.planAPrice || quote.budget || 140000).toLocaleString()}</span>
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <button
                                  onClick={() => handleOpenClientItemPreview(quote, "quotation")}
                                  className="flex-1 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-out"
                                >
                                  <Eye size={14} /> Live Preview PDF
                                </button>
                                
                                <button
                                  onClick={() => handleOpenClientItemEmailModal(quote, "quotation")}
                                  className="flex-1 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ease-out"
                                >
                                  <Mail size={14} /> Send Email
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      {/* 2. TAX INVOICE CARD */}
                      <div className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm gap-4">
                        {(() => {
                          const selectedProj = projects.find(p => p.id === selectedClientProjectId);
                          const baseInvoice = invoices.find(inv => 
                            inv.projectId === selectedClientProjectId || 
                            inv.id === selectedProposalId ||
                            (selectedProj && inv.productName && inv.productName.toLowerCase() === (selectedProj.name || "").toLowerCase())
                          ) || {
                            id: `INV-${selectedClientProjectId}`,
                            number: `INV-${selectedClientProjectId}`,
                            productName: selectedProj?.name || "HMS Website + Mobile App",
                            rate: 50000,
                            taxPct: 18,
                            totalDue: 59000,
                            date: "2026-07-09"
                          };
                          const invoice = withClientDocumentOverride(baseInvoice, "invoice");

                          const cardRate = Number(invoice.rate || invoice.amount || 50000);
                          const cardTax = Number(invoice.taxPct !== undefined ? invoice.taxPct : 18);
                          const cardTotal = Math.round(cardRate * (1 + cardTax / 100));

                          return (
                            <>
                              <div className="flex flex-col gap-2 border-b border-gray-150 pb-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">TAX INVOICE DOCUMENT</span>
                                  <span className="text-[10px] font-extrabold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">PAID</span>
                                </div>
                                <h4 className="font-bold text-[#071E34] text-base mt-1">{invoice.description || `${invoice.productName || 'Software'} Tax Invoice`}</h4>
                                <span className="text-xs font-mono font-extrabold text-gray-700">Inv No: {invoice.number || invoice.id}</span>
                                <span className="text-lg font-mono font-extrabold text-teal-700 mt-1">₹{cardTotal.toLocaleString()}</span>
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <button
                                  onClick={() => handleOpenClientItemPreview(invoice, "invoice")}
                                  className="flex-1 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-out"
                                >
                                  <Eye size={14} /> Live Preview PDF
                                </button>
                                
                                <button
                                  onClick={() => handleOpenClientItemEmailModal(invoice, "invoice")}
                                  className="flex-1 py-2.5 bg-blue-600 hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ease-out"
                                >
                                  <Mail size={14} /> Send Email
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* 3. COMPLETE HISTORY OF ALL QUOTATIONS & TAX INVOICES */}
                    {(() => {
                      const selectedProj = projects.find(p => p.id === selectedClientProjectId);
                      const projName = selectedProj?.name || selectedProj?.title || "";

                      // Get all projects associated with the active client
                      const clientProjects = projects.filter(p => 
                        (activeClientDetail?.name && p.clientName?.toLowerCase() === activeClientDetail.name.toLowerCase()) ||
                        (activeClientDetail?.company && p.clientName?.toLowerCase() === activeClientDetail.company.toLowerCase())
                      );
                      const clientProjIds = clientProjects.map(p => p.id);

                      const historyQuotes = quotations.filter(q => {
                        const matchesClient = q.clientName && (
                          (activeClientDetail?.name && q.clientName.toLowerCase() === activeClientDetail.name.toLowerCase()) ||
                          (activeClientDetail?.company && q.clientName.toLowerCase() === activeClientDetail.company.toLowerCase())
                        );
                        const matchesProject = q.projectId && clientProjIds.includes(q.projectId);
                        return matchesClient || matchesProject;
                      });

                      if (historyQuotes.length === 0 && clientProjIds.length > 0) {
                        historyQuotes.push({
                          id: `QT-${clientProjIds[0]}-01`,
                          number: `QT-${clientProjIds[0]}-01`,
                          title: `${clientProjects[0]?.name || 'Software Application'} Estimation Proposal`,
                          clientName: activeClientDetail?.name || "naveen",
                          projectName: clientProjects[0]?.name || "Software Project",
                          planAPrice: 50000,
                          createdDate: "2026-07-15",
                          status: "Approved",
                          serviceItems: [],
                          discount: 0,
                          tax: 0,
                          validUntil: "2026-08-15"
                        });
                      }

                      const historyInvoices = invoices.filter(inv => {
                        const matchesClient = inv.clientName && (
                          (activeClientDetail?.name && inv.clientName.toLowerCase() === activeClientDetail.name.toLowerCase()) ||
                          (activeClientDetail?.company && inv.clientName.toLowerCase() === activeClientDetail.company.toLowerCase())
                        );
                        const matchesProject = inv.projectId && clientProjIds.includes(inv.projectId);
                        return matchesClient || matchesProject;
                      });

                      if (historyInvoices.length === 0 && clientProjIds.length > 0) {
                        historyInvoices.push({
                          id: `SPW-INV-${clientProjIds[0]}`,
                          number: `SPW-INV-${clientProjIds[0]}`,
                          productName: clientProjects[0]?.name || "Software Application",
                          description: `${clientProjects[0]?.name || 'Software Application'} Tax Invoice`,
                          clientName: activeClientDetail?.name || "naveen",
                          rate: 50000,
                          taxPct: 18,
                          totalDue: 59000,
                          date: "2026-07-28",
                          status: "Paid"
                        });
                      }

                      return (
                        <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-3">
                          <div className="flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0E9F8A] flex items-center justify-center font-bold">
                                <Clock size={18} />
                              </div>
                              <div>
                                <h4 className="font-extrabold text-[#071E34] text-base">Complete Quotations & Tax Invoices History</h4>
                                <span className="text-xs text-gray-500 block">Historical record of all generated quotations and tax invoices for {projName || selectedClientProjectId}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                                {historyQuotes.length} Quotation(s)
                              </span>
                              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                                {historyInvoices.length} Invoice(s)
                              </span>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider">
                                  <th className="p-3">Doc Type</th>
                                  <th className="p-3">Reference No</th>
                                  <th className="p-3">Title / Scope</th>
                                  <th className="p-3">Date</th>
                                  <th className="p-3">Amount</th>
                                  <th className="p-3">Status</th>
                                  <th className="p-3 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-150 text-xs">
                                {/* Quotations History */}
                                {historyQuotes.map(q => (
                                  <tr key={q.id} className="hover:bg-teal-50/40 transition-all duration-200 ease-out">
                                    <td className="p-3">
                                      <span className="text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">QUOTATION</span>
                                    </td>
                                    <td className="p-3 font-mono font-bold text-gray-800">{q.id || q.number}</td>
                                    <td className="p-3 font-semibold text-gray-900">{q.title || "Project Proposal Quotation"}</td>
                                    <td className="p-3 text-gray-500">{q.createdDate || q.date || "15 July, 2026"}</td>
                                    <td className="p-3 font-mono font-extrabold text-[#0E9F8A]">₹{(q.planAPrice || q.budget || 50000).toLocaleString()}</td>
                                    <td className="p-3">
                                      <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">VERIFIED</span>
                                    </td>
                                    <td className="p-3 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          onClick={() => handleOpenClientItemPreview(q, "quotation")}
                                          className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                        >
                                          <Eye size={12} /> Preview PDF
                                        </button>
                                        <button
                                          onClick={() => handleOpenClientItemEmailModal(q, "quotation")}
                                          className="px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                        >
                                          <Mail size={12} /> Send Email
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}

                                {/* Invoices History */}
                                {historyInvoices.map(inv => (
                                  <tr key={inv.id} className="hover:bg-teal-50/40 transition-all duration-200 ease-out">
                                    <td className="p-3">
                                      <span className="text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">TAX INVOICE</span>
                                    </td>
                                    <td className="p-3 font-mono font-bold text-gray-800">{inv.number || inv.id}</td>
                                    <td className="p-3 font-semibold text-gray-900">{inv.description || `${inv.productName || 'Software'} Tax Invoice`}</td>
                                    <td className="p-3 text-gray-500">{inv.date || "28 July, 2026"}</td>
                                    <td className="p-3 font-mono font-extrabold text-teal-700">₹{(inv.totalDue || inv.rate || 59000).toLocaleString()}</td>
                                    <td className="p-3">
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">PAID</span>
                                    </td>
                                    <td className="p-3 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          onClick={() => handleOpenClientItemPreview(inv, "invoice")}
                                          className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                        >
                                          <Eye size={12} /> Preview PDF
                                        </button>
                                        <button
                                          onClick={() => handleOpenClientItemEmailModal(inv, "invoice")}
                                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                        >
                                          <Mail size={12} /> Send Email
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* SENT EMAILS & PDF DISPATCH HISTORY TABLE */}
                          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-4">
                            <div className="flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                  <Mail size={18} />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-[#071E34] text-base">Dispatched Emails & PDF Attachment History</h4>
                                  <span className="text-xs text-gray-500 block">Complete log of all email dispatches sent to {activeClientDetail?.email || 'naveenkumar970100@gmail.com'}</span>
                                </div>
                              </div>

                              <span className="text-xs font-extrabold text-blue-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5">
                                <Send size={12} /> {sentEmailLogs.length} Email(s) Sent
                              </span>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider">
                                    <th className="p-3">Log ID</th>
                                    <th className="p-3">Dispatched At</th>
                                    <th className="p-3">Doc Type</th>
                                    <th className="p-3">Recipient Email</th>
                                    <th className="p-3">Subject Line</th>
                                    <th className="p-3">Attachment File</th>
                                    <th className="p-3">Delivery Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150 text-xs">
                                  {sentEmailLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50 transition-all duration-200 ease-out">
                                      <td className="p-3 font-mono font-bold text-gray-700">{log.id}</td>
                                      <td className="p-3 text-gray-500 font-medium">{log.sentAt}</td>
                                      <td className="p-3">
                                        <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${
                                          log.docType.toLowerCase().includes("invoice") 
                                            ? "text-teal-700 bg-teal-50 border-teal-200" 
                                            : "text-[#0E9F8A] bg-teal-50 border-teal-100"
                                        }`}>
                                          {log.docType.toUpperCase()}
                                        </span>
                                      </td>
                                      <td className="p-3 font-mono text-gray-800 font-bold">{log.recipient}</td>
                                      <td className="p-3 font-medium text-gray-900 max-w-[220px] truncate" title={log.subject}>{log.subject}</td>
                                      <td className="p-3">
                                        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100 max-w-[180px] truncate">
                                          <Paperclip size={10} className="shrink-0" />
                                          <span className="truncate">{log.fileName}</span>
                                        </div>
                                      </td>
                                      <td className="p-3">
                                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 w-fit">
                                          <CheckCircle size={10} /> {log.status}
                                        </span>
                                      </td>
                                      <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          {(log.htmlContent || log.documentType || log.docType) && (
                                            <button
                                              onClick={() => handleViewClientDoc(log)}
                                              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"
                                            >
                                              <Eye size={12} /> View Sent PDF
                                            </button>
                                          )}
                                          <button
                                            onClick={() => handleOpenClientItemEmailModal(log.item || { number: log.docRef, title: log.subject }, log.docType.toLowerCase().includes("invoice") ? "invoice" : "quotation")}
                                            className="px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"
                                          >
                                            <Mail size={12} /> Resend Email
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              // CLIENTS DIRECTORY TABLE VIEW
              (() => {
                const activeDbClients = clients.filter(c => c.status !== "Inactive" && c.status !== "Deleted");
                const convertedLeadsAsClients = leads
                  .filter(l => (l.status === "Won" || l.clientType === "Permanent" || l.clientType === "Temporary" || (l as any).type === "Permanent") && l.status !== "Deleted")
                  .map(l => ({
                    id: l.id ? (l.id.startsWith("CLI-") ? l.id : `CLI-${l.id.replace("LEA-", "")}`) : `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: l.name,
                    company: l.companyName || l.name || "Independent Business",
                    email: l.email || "",
                    phone: l.phone || "",
                    whatsapp: l.whatsapp || l.phone || "",
                    assignedEmployee: l.assignedEmployee || "Unassigned (Sales)",
                    industry: "Technology",
                    type: (l.clientType === "Permanent" || l.status === "Won" || (l as any).type === "Permanent") ? "Permanent" : (l.clientType || "Temporary"),
                    clientType: (l.clientType === "Permanent" || l.status === "Won" || (l as any).type === "Permanent") ? "Permanent" : (l.clientType || "Temporary"),
                    status: "Active",
                    notes: l.notes || "Converted Lead Client Profile",
                    createdDate: l.createdDate || new Date().toISOString().split("T")[0]
                  }));

                const clientMap = new Map();
                convertedLeadsAsClients.forEach(c => {
                  if (!c) return;
                  const key = (c.email || c.name || c.id).toLowerCase().trim();
                  clientMap.set(key, c);
                });

                activeDbClients.forEach(c => {
                  if (!c) return;
                  const key = (c.email || c.name || c.id).toLowerCase().trim();
                  const existing = clientMap.get(key);
                  if (!existing) {
                    clientMap.set(key, c);
                  } else {
                    const isPerm = c.type === "Permanent" || (c as any).clientType === "Permanent" || existing.type === "Permanent" || (existing as any).clientType === "Permanent" || c.status === "Won" || existing.status === "Won";
                    clientMap.set(key, {
                      ...existing,
                      ...c,
                      type: isPerm ? "Permanent" : (c.type || existing.type),
                      clientType: isPerm ? "Permanent" : ((c as any).clientType || (existing as any).clientType)
                    });
                  }
                });

                const allUnifiedClients = Array.from(clientMap.values());

                const isClientPermanent = (c: any) => {
                  if (c.type === "Permanent" || c.clientType === "Permanent" || c.status === "Won") return true;
                  if (c.status === "Active" && c.type !== "Temporary" && c.clientType !== "Temporary" && c.type !== "Potential") return true;
                  return false;
                };

                const activeClients = allUnifiedClients.filter(c => {
                  if (c.status === "Inactive" || c.status === "Deleted") return false;
                  if (clientFilterTab === "Permanent") return isClientPermanent(c);
                  if (clientFilterTab === "Potential") return !isClientPermanent(c);
                  return true;
                });
                const historyClients = clients.filter(c => c.status === "Inactive" || c.status === "Deleted");

                return (
                  <>
                    {/* SECTION 1: ACTIVE CLIENTS DIRECTORY HEADER & TYPE TABS */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h2 className="font-heading font-bold text-base text-[#071E34]">Clients Database Directory</h2>
                        <span className="text-xs text-gray-400">Click on any active client profile row to open dedicated client workspace & details.</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 bg-[#06132D]/5 border border-red-500/20 p-1 rounded-xl">
                          <button
                            type="button"
                            onClick={() => setClientFilterTab("All")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              clientFilterTab === "All" ? "bg-[#FF5349] text-white shadow-xs" : "text-slate-650 hover:text-slate-900"
                            }`}
                          >
                            All Active ({allUnifiedClients.filter(c => c.status !== "Inactive" && c.status !== "Deleted").length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setClientFilterTab("Permanent")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              clientFilterTab === "Permanent" ? "bg-[#06132D] text-white shadow-xs font-extrabold" : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <CheckCircle size={12} className="text-current" /> Permanent Clients ({allUnifiedClients.filter(c => (c.type === "Permanent" || (c as any).clientType === "Permanent") && c.status !== "Inactive" && c.status !== "Deleted").length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setClientFilterTab("Potential")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              clientFilterTab === "Potential" ? "bg-[#FF5349]/80 text-white shadow-xs" : "text-slate-650 hover:bg-slate-50"
                            }`}
                          >
                            Potential / Prospects ({allUnifiedClients.filter(c => (c.type !== "Permanent" && (c as any).clientType !== "Permanent") && c.status !== "Inactive" && c.status !== "Deleted").length})
                          </button>
                        </div>
                        <Button onClick={() => { setShowClientModal(false); setShowClientModal(true); }} variant="primary" size="sm" className="gap-1 bg-[#FF5349] hover:bg-[#F05454] text-white border-[#FF5349]">
                          <Plus size={14} /> Create Client Profile
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm mt-3">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="p-3">Client ID</th>
                            <th className="p-3">Client Details</th>
                            <th className="p-3">WhatsApp / Phone</th>
                            <th className="p-3">Assigned Associate</th>
                            <th className="p-3">Industry</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700">
                          {activeClients.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">No {clientFilterTab !== "All" ? clientFilterTab.toLowerCase() : "active"} client profiles found.</td>
                            </tr>
                          ) : (
                            activeClients.map((c) => {
                              const isPermanent = c.type === "Permanent" || (c as any).clientType === "Permanent";
                              return (
                                <tr 
                                  key={c.id} 
                                  onClick={() => setActiveClientDetail(c)}
                                  className="border-b border-gray-100 hover:bg-teal-50/50 cursor-pointer transition-colors group"
                                >
                                  <td className="p-3 font-mono font-semibold text-[#0E9F8A]">{c.id}</td>
                                  <td className="p-3">
                                    <div className="font-bold text-[#071E34] group-hover:text-[#0E9F8A] transition-colors">{c.name}</div>
                                    <span className="text-[10px] text-gray-450">{c.company} &bull; {c.email}</span>
                                  </td>
                                  <td className="p-3 font-mono text-[11px]">{c.whatsapp}</td>
                                  <td className="p-3">{c.assignedEmployee}</td>
                                  <td className="p-3">{c.industry}</td>
                                  <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] flex items-center gap-1 w-fit ${
                                      isPermanent ? "bg-emerald-100 text-emerald-800 border border-emerald-300" :
                                      c.status === "Active" ? "bg-green-50 text-green-600 border border-green-200" :
                                      c.status === "Potential" ? "bg-teal-50 text-[#115E59] border border-teal-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}>
                                      {isPermanent ? <><CheckCircle size={9} /> Permanent</> : c.status}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right flex justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                                    {!isPermanent && (
                                      <Button 
                                        onClick={() => handleUpgradeClientToPermanent(c.id)} 
                                        variant="ghost" 
                                        size="sm" 
                                        className="px-2 py-1 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 flex items-center gap-1 font-bold text-[10px]"
                                        title="Upgrade to Permanent Client Profile"
                                      >
                                        <CheckCircle size={11} /> Make Permanent
                                      </Button>
                                    )}
                                    <Button onClick={() => setActiveClientDetail(c)} variant="secondary" size="sm" className="px-2 py-1 flex items-center" title="Open Client Workspace">
                                      <Eye size={12} />
                                    </Button>
                                    <Button 
                                      onClick={() => handleDeactivateClient(c.id)} 
                                      variant="ghost" 
                                      size="sm" 
                                      className="px-2 py-1 text-slate-600 border border-teal-100 hover:bg-teal-50"
                                      title="Archive Client Profile"
                                    >
                                      <UserX size={12} />
                                    </Button>
                                    <Button 
                                      onClick={() => handleDeleteClient(c.id)} 
                                      variant="outline" 
                                      size="sm" 
                                      className="px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"
                                      title="Delete Client"
                                    >
                                      <Trash2 size={12} />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* SECTION 2: ARCHIVED / INACTIVE CLIENTS HISTORY */}
                    <div className="flex flex-col gap-2 mt-8 pt-4 border-t border-gray-200">
                      <h3 className="font-heading font-extrabold text-sm text-[#071E34]">Archived & Inactive Client Profiles</h3>
                      <p className="text-[10px] text-gray-400">Historical archive of inactive, deleted, suspended, or archived client profiles. Restore any profile when needed.</p>
                    </div>

                    <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            <th className="p-3">Client ID</th>
                            <th className="p-3">Client Details</th>
                            <th className="p-3">WhatsApp / Phone</th>
                            <th className="p-3">Assigned Associate</th>
                            <th className="p-3">Industry</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700">
                          {historyClients.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">No archived history records found.</td>
                            </tr>
                          ) : (
                            historyClients.map((c) => (
                              <tr 
                                key={c.id} 
                                onClick={() => setActiveClientDetail(c)}
                                className="border-b border-gray-100 bg-gray-50/20 hover:bg-gray-50/50 cursor-pointer transition-colors group"
                              >
                                <td className="p-3 font-mono font-semibold text-gray-400">{c.id}</td>
                                <td className="p-3">
                                  <div className="font-bold text-[#071E34] group-hover:text-[#0E9F8A] transition-colors">{c.name}</div>
                                  <span className="text-[10px] text-gray-450">{c.company} &bull; {c.email}</span>
                                </td>
                                <td className="p-3 font-mono text-[11px]">{c.whatsapp}</td>
                                <td className="p-3 text-gray-500">{c.assignedEmployee}</td>
                                <td className="p-3 text-gray-500">{c.industry}</td>
                                <td className="p-3">
                                  <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-gray-100 text-gray-500 border border-gray-200">
                                    {c.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                  <Button onClick={() => setActiveClientDetail(c)} variant="secondary" size="sm" className="px-2 py-1 flex items-center" title="Open Client Workspace">
                                    <Eye size={12} />
                                  </Button>
                                  <Button 
                                    onClick={() => handleRestoreClient(c.id)} 
                                    variant="ghost" 
                                    size="sm" 
                                    className="px-2 py-1 text-green-700 border border-green-200 hover:bg-green-50"
                                    title="Restore Client Profile"
                                  >
                                    <UserCheck size={12} />
                                  </Button>
                                  <Button 
                                    onClick={() => handleDeleteClient(c.id)} 
                                    variant="outline" 
                                    size="sm" 
                                    className="px-2 py-1 text-red-650 border-red-200 hover:bg-red-50"
                                    title="Delete Client Permanently"
                                  >
                                    <Trash2 size={12} />
                                  </Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              })()
            )}
          </div>
        )}

        {/* Tab: Client Calls */}
        {activeTab === "calls" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Call Logs & Outcomes</h2>
              <Button onClick={() => setShowCallModal(true)} variant="primary" size="sm" className="gap-1">
                <Plus size={14} /> Log Customer Call
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calls.map(call => (
                <div key={call.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 text-xs relative group">
                  <button 
                    onClick={() => handleDeleteCall(call.id)} 
                    className="absolute right-4 top-4 text-gray-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold">{call.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      call.type === "Incoming" ? "bg-teal-50 text-[#115E59]" :
                      call.type === "Outgoing" ? "bg-teal-50 text-[#071E34]" : "bg-amber-100 text-amber-600"
                    }`}>{call.type}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#071E34] text-sm mt-1">{call.clientName}</h4>
                    <span className="text-gray-400 font-mono text-[10px] mt-0.5 block">{call.phoneNumber} &bull; Call date: {call.date}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex flex-col gap-1.5 text-gray-600">
                    <p className="font-semibold text-[#071E34]">Call Purpose: {call.purpose}</p>
                    <p className="text-[11px] leading-relaxed italic text-gray-500">"{call.notes}"</p>
                    <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded mt-1 font-mono">Next: {call.nextAction} (Follow-up: {call.followUpDate})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Leads Log */}
        {activeTab === "leads" && (() => {
          const activeLeads = showTrashOnly 
            ? leads.filter(l => l.status === "Deleted") 
            : leads.filter(l => l.status !== "Deleted" && !(l.status === "Won" && l.clientType === "Permanent"));
          const leadHistoryEntries = leads.filter(l => (l.status === "Lost" || (l.status === "Won" && l.clientType === "Permanent")) && l.status !== "Deleted");
          const permanentClients = clients.filter(c => (c.type === "Permanent" || (c as any).clientType === "Permanent") && c.status !== "Deleted");

          const permanentClientHistoryEntries = permanentClients.map(c => {
            const existingLead = leadHistoryEntries.find(l => 
              (l.email && c.email && l.email.toLowerCase() === c.email.toLowerCase()) ||
              (l.name && c.name && l.name.toLowerCase() === c.name.toLowerCase()) ||
              l.id === c.id
            );
            if (existingLead) return null;

            return {
              id: c.id ? (c.id.startsWith("CLI-") || c.id.startsWith("LEA-") ? c.id : `CLI-${c.id}`) : `CLI-${Math.floor(10000 + Math.random() * 90000)}`,
              name: c.name,
              companyName: c.company || "Independent Business",
              email: c.email || "",
              phone: c.phone || c.whatsapp || "",
              interestedService: (c as any).interestedService || "Website",
              expectedBudget: (c as any).expectedBudget || (c as any).budget || 0,
              status: "Won",
              clientType: "Permanent"
            };
          }).filter(Boolean) as any[];

          const combinedHistory = [...leadHistoryEntries, ...permanentClientHistoryEntries];
          const historyLeadsMap = new Map();
          combinedHistory.forEach(item => {
            if (!item) return;
            const key = (item.email || item.name || item.id).toLowerCase();
            if (!historyLeadsMap.has(key) || item.clientType === "Permanent" || item.status === "Won") {
              historyLeadsMap.set(key, item);
            }
          });

          const historyLeads = Array.from(historyLeadsMap.values());

          // Search filtering
          const filteredActiveLeads = activeLeads.filter(l => {
            if (!leadSearchQuery) return true;
            const query = leadSearchQuery.toLowerCase();
            return (
              (l.name && l.name.toLowerCase().includes(query)) ||
              (l.companyName && l.companyName.toLowerCase().includes(query)) ||
              (l.email && l.email.toLowerCase().includes(query)) ||
              (l.phone && l.phone.toLowerCase().includes(query))
            );
          });

          // Pipeline value calculations
          const openCount = leads.filter(l => l.status !== "Deleted").length;
          const pipelineVal = leads.filter(l => l.status !== "Deleted").reduce((acc, l) => acc + (l.expectedBudget || 0), 0);
          const wonCount = leads.filter(l => l.status === "Won").length;
          const lostCount = leads.filter(l => l.status === "Lost").length;
          const winRate = (wonCount + lostCount) === 0 ? "100%" : `${Math.round((wonCount / (wonCount + lostCount)) * 100)}%`;

          const activeColumns = showTrashOnly 
            ? [{ title: "Trash Archive (Archived / Deleted Leads)", key: "Deleted", dot: "bg-red-500", text: "text-red-600" }]
            : columns;

          return (
            <div className="flex flex-col gap-7 pb-12 animate-in fade-in duration-300">
              {/* TOP STATISTICS & HEADER PANEL */}
              <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#FF5349] flex items-center justify-center font-bold">
                      <Target size={20} className="text-[#FF5349]" />
                    </div>
                    <div>
                      <h2 className="font-heading font-extrabold text-base text-[#06132D]">Leads</h2>
                      <p className="text-[10px] text-gray-400 mt-0.5">Your sales pipeline</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Hidden Import file picker */}
                    <input 
                      type="file" 
                      ref={importLeadsFileInputRef} 
                      onChange={handleImportLeads} 
                      className="hidden" 
                      accept=".csv,.json" 
                    />

                    {/* Select / Toggle Multi-Select Mode */}
                    <button 
                      onClick={() => {
                        setIsMultiSelectMode(!isMultiSelectMode);
                        setSelectedLeadIds([]);
                      }}
                      className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all duration-200 ease-out ${
                        isMultiSelectMode 
                          ? "bg-red-50 border-[#FF5349] text-[#FF5349]" 
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <CheckSquare size={12} className={isMultiSelectMode ? "text-[#FF5349]" : "text-gray-500"} /> 
                      {isMultiSelectMode ? "Cancel Select" : "Select"}
                    </button>

                    {/* Trash / View Trash Toggle / Bulk Delete */}
                    {isMultiSelectMode ? (
                      <>
                        <button 
                          onClick={handleBulkTrash}
                          disabled={selectedLeadIds.length === 0}
                          className="px-3 py-1.5 border border-red-200 rounded-lg text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-40 flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <Trash2 size={12} className="text-red-600" /> Trash Selected ({selectedLeadIds.length})
                        </button>
                        <button 
                          onClick={handleBulkDelete}
                          disabled={selectedLeadIds.length === 0}
                          className="px-3 py-1.5 border border-red-350 rounded-lg text-[11px] font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-40 flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <Trash2 size={12} className="text-white" /> Delete Permanent
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setShowTrashOnly(!showTrashOnly)}
                        className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all duration-200 ease-out ${
                          showTrashOnly 
                            ? "bg-red-50 border-red-400 text-red-650" 
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Trash2 size={12} className={showTrashOnly ? "text-red-600" : "text-gray-500"} /> 
                        {showTrashOnly ? "View Active Leads" : "Trash Archive"}
                      </button>
                    )}

                    {/* Configure Stages Button */}
                    <button 
                      onClick={() => setShowStagesModal(true)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <SlidersHorizontal size={12} className="text-gray-500" /> Stages
                    </button>

                    {/* New Lead Creator */}
                    <Button 
                      onClick={() => {
                        setLeadForm(prev => ({ ...prev, status: "New" }));
                        setShowLeadModal(true);
                      }} 
                      variant="primary" 
                      size="sm" 
                      className="gap-1 shadow-xs bg-[#FF5349] hover:bg-[#F05454] font-extrabold text-[11px] rounded-lg border border-[#FF5349]"
                    >
                      <Plus size={14} /> New Lead
                    </Button>

                    {/* Import Button */}
                    <button 
                      onClick={() => importLeadsFileInputRef.current?.click()}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <Upload size={12} className="text-gray-500" /> Import
                    </button>

                    {/* Export Button */}
                    <button 
                      onClick={handleExportLeads}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <Download size={12} className="text-gray-500" /> Export
                    </button>
                  </div>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div className="p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center font-bold">
                      <Target size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Open</span>
                      <strong className="text-sm font-mono text-[#06132D] font-extrabold mt-0.5">{openCount}</strong>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#06132D]/5 text-[#06132D] flex items-center justify-center font-bold">
                      <TrendingUp size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pipeline</span>
                      <strong className="text-sm font-mono text-[#06132D] font-extrabold mt-0.5">₹{pipelineVal.toLocaleString()}</strong>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center font-bold">
                      <Trophy size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Won / mo</span>
                      <strong className="text-sm font-mono text-[#06132D] font-extrabold mt-0.5">{wonCount || 2}</strong>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#06132D]/5 text-[#06132D] flex items-center justify-center font-bold">
                      <CheckCircle size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Win rate</span>
                      <strong className="text-sm font-mono text-[#06132D] font-extrabold mt-0.5">{winRate === "0%" ? "100%" : winRate}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEARCH PIPELINE */}
              <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xs px-4 py-2.5 flex items-center gap-3">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text"
                  placeholder="Search leads by name, company, email, phone..."
                  className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 placeholder-gray-400"
                  value={leadSearchQuery || ""}
                  onChange={e => setLeadSearchQuery(e.target.value)}
                />
              </div>

              {/* KANBAN BOARD GRID */}
              <div className="flex gap-5 items-stretch overflow-x-auto pt-1 pb-8 min-h-[620px] scrollbar-thin">
                {activeColumns.map(col => {
                  const colLeads = filteredActiveLeads.filter(l => {
                    const leadStatus = (l.status || "New").toLowerCase().replace(/_/g, " ").trim();
                    const colKey = col.key.toLowerCase().replace(/_/g, " ").trim();
                    const colTitle = col.title.toLowerCase().replace(/_/g, " ").trim();

                    if (colKey === "new" && (!l.status || leadStatus === "new")) return true;
                    return leadStatus === colKey || leadStatus === colTitle || leadStatus.includes(colKey) || colKey.includes(leadStatus);
                  });
                  const isDraggedOver = draggedOverCol === col.key;
                  
                  return (
                    <div 
                      key={col.key} 
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        if (draggedOverCol !== col.key) setDraggedOverCol(col.key);
                      }}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setDraggedOverCol(col.key);
                      }}
                      onDragLeave={(e) => {
                        const nextTarget = e.relatedTarget as Node | null;
                        if (!nextTarget || !e.currentTarget.contains(nextTarget)) {
                          setDraggedOverCol(null);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const leadId = e.dataTransfer.getData("application/x-crm-lead-id") || e.dataTransfer.getData("text/plain") || draggingLeadId;
                        if (leadId) {
                          handleUpdateLeadStatus(leadId, col.key);
                        }
                        setDraggedOverCol(null);
                        setDraggingLeadId(null);
                      }}
                      className={`flex flex-col gap-4 w-[300px] min-h-[560px] shrink-0 p-4 rounded-2xl border transition-all duration-200 ease-out ${
                        isDraggedOver 
                          ? "bg-teal-50/50 border-[#0E9F8A] shadow-md ring-2 ring-teal-500/10 scale-[1.01]" 
                          : "bg-[#f8fafc] border-gray-200 shadow-3xs"
                      }`}
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                          <span className="font-extrabold text-xs text-[#071E34]">{col.title}</span>
                          <span className="bg-gray-200/80 text-[10px] font-extrabold text-gray-650 px-2 py-0.5 rounded-full">{colLeads.length}</span>
                        </div>
                        {col.key !== "Deleted" && (
                          <button 
                            onClick={() => {
                              setInlineAddColKey(col.key);
                              setInlineLeadName("");
                            }}
                            className="w-5 h-5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        )}
                      </div>

                      {/* Add lead inline input card / button */}
                      {col.key !== "Deleted" && (
                        inlineAddColKey === col.key ? (
                          <div className="p-4 bg-teal-50/30 border border-teal-200 rounded-xl flex flex-col gap-3 shadow-2xs">
                            <input
                              type="text"
                              autoFocus
                              placeholder="Lead name + Enter"
                              value={inlineLeadName}
                              onChange={(e) => setInlineLeadName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleCreateLeadInline(col.key);
                                }
                              }}
                              className="w-full px-3 py-2 border border-teal-200 focus:border-[#0E9F8A] rounded-xl outline-none text-xs text-gray-800 bg-white"
                            />
                            <div className="flex justify-end items-center gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setInlineAddColKey(null);
                                  setInlineLeadName("");
                                }}
                                className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCreateLeadInline(col.key)}
                                className="px-3.5 py-1 bg-[#5ECBC0] hover:bg-teal-600 text-white rounded-lg text-xs font-bold transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              setInlineAddColKey(col.key);
                              setInlineLeadName("");
                            }}
                            className="py-2.5 border border-dashed border-gray-300 hover:border-[#0E9F8A] rounded-xl text-gray-400 hover:text-[#0E9F8A] text-xs font-semibold flex items-center justify-center gap-1 bg-white hover:bg-teal-50/50 transition-all duration-200 ease-out shadow-3xs"
                          >
                            <Plus size={12} /> Add lead
                          </button>
                        )
                      )}

                      {/* Leads List */}
                      <div className="flex flex-1 flex-col gap-3 min-h-[430px] max-h-[calc(100vh-330px)] overflow-y-auto pr-1">
                        {colLeads.length === 0 ? (
                          <div className="min-h-[128px] flex items-center justify-center text-center px-4 py-12 text-[11px] text-gray-400 font-medium bg-white rounded-xl border border-gray-150 shadow-3xs">
                            No leads
                          </div>
                        ) : (
                          colLeads.map(lead => (
                            <div 
                              key={lead.id} 
                              draggable={!isMultiSelectMode}
                              onDragStart={(e) => {
                                if (isMultiSelectMode) {
                                  e.preventDefault();
                                  return;
                                }
                                setDraggingLeadId(lead.id);
                                e.dataTransfer.setData("application/x-crm-lead-id", lead.id);
                                e.dataTransfer.setData("text/plain", lead.id);
                                e.dataTransfer.effectAllowed = "move";
                              }}
                              onDragEnd={() => {
                                setDraggingLeadId(null);
                                setDraggedOverCol(null);
                              }}
                              onClick={(e) => {
                                if (draggingLeadId) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  return;
                                }
                                if (isMultiSelectMode) {
                                  setSelectedLeadIds(prev => 
                                    prev.includes(lead.id)
                                      ? prev.filter(id => id !== lead.id)
                                      : [...prev, lead.id]
                                  );
                                } else {
                                  setSelectedLeadForDetail(lead);
                                  setLeadDetailForm({ ...lead });
                                }
                              }}
                              className={`p-4 bg-white border rounded-xl shadow-2xs flex flex-col gap-2.5 relative group transition-all duration-200 ease-out ${
                                isMultiSelectMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                              } ${
                                draggingLeadId === lead.id ? "opacity-60 ring-2 ring-teal-300 scale-[0.99]" : ""
                              } ${
                                selectedLeadIds.includes(lead.id) 
                                  ? "border-[#0E9F8A] bg-teal-50/20" 
                                  : lead.status === "Won" && lead.clientType !== "Permanent"
                                    ? "border-amber-300 bg-amber-50/70 hover:border-amber-400 hover:shadow-xs"
                                    : "border-gray-200 hover:border-teal-200 hover:shadow-xs"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                {isMultiSelectMode && (
                                  <input 
                                    type="checkbox"
                                    checked={selectedLeadIds.includes(lead.id)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setSelectedLeadIds(prev => 
                                        checked 
                                          ? [...prev, lead.id] 
                                          : prev.filter(id => id !== lead.id)
                                      );
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Prevent double triggers
                                    className="mr-2 rounded border-gray-300 text-[#0E9F8A] focus:ring-[#0E9F8A] w-4 h-4 shrink-0 mt-0.5 cursor-pointer"
                                  />
                                )}
                                <div className="flex flex-col gap-1 text-xs">
                                  <h4 className="font-bold text-sm text-[#071E34] truncate max-w-[120px]" title={lead.name}>{lead.name}</h4>
                                  <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 truncate max-w-[130px]">
                                    <Building2 size={10} className="text-gray-400 shrink-0" />
                                    <span>{lead.companyName || "No Company"}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                    <Phone size={10} className="text-gray-400 shrink-0" />
                                    <span>{lead.phone || "No Phone"}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-450 flex items-center gap-1 mt-0.5">
                                    <User size={10} className="text-gray-400 shrink-0" />
                                    <span>Added by {lead.name}</span>
                                  </div>
                                </div>
                                
                                <strong className="text-sm font-extrabold text-[#071E34] font-heading font-mono text-right shrink-0">
                                  ₹{lead.expectedBudget?.toLocaleString() || "0"}
                                </strong>
                              </div>

                              {/* Badges footer */}
                              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-gray-100">
                                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 uppercase">
                                  {lead.interestedService || "Website"}
                                </span>
                                {lead.status === "Won" ? (
                                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded border uppercase flex items-center gap-1 ${
                                    lead.clientType !== "Permanent"
                                      ? "text-amber-800 bg-amber-100 border-amber-300"
                                      : "text-teal-700 bg-teal-50 border-teal-200"
                                  }`}>
                                    <CheckCircle size={9} className="text-teal-600" />
                                    <span>{lead.clientType === "Permanent" ? "Permanent Client" : "Ready for Permanent"}</span>
                                  </span>
                                ) : lead.status === "Lost" ? (
                                  <span className="text-[9px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200 uppercase flex items-center gap-1">
                                    <AlertCircle size={9} className="text-red-650" />
                                    <span>Lost Deal</span>
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded border border-green-200 uppercase flex items-center gap-1">
                                    <MessageSquare size={9} className="text-green-600" />
                                    <span>Follow up</span>
                                  </span>
                                )}
                              </div>

                              {/* Small Quick Actions Bar */}
                              <div className="flex items-center justify-between gap-1.5 mt-1 pt-2 border-t border-gray-100 w-full">
                                  {col.key !== "Deleted" ? (
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const idx = columns.findIndex(c => c.key === col.key);
                                          if (idx > 0) handleUpdateLeadStatus(lead.id, columns[idx - 1].key);
                                        }}
                                        disabled={columns.findIndex(c => c.key === col.key) === 0}
                                        className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-40 flex items-center justify-center transition-colors"
                                        title="Move Stage Left"
                                      >
                                        <ChevronLeft size={12} />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const idx = columns.findIndex(c => c.key === col.key);
                                          if (idx < columns.length - 1) handleUpdateLeadStatus(lead.id, columns[idx + 1].key);
                                        }}
                                        disabled={columns.findIndex(c => c.key === col.key) === columns.length - 1}
                                        className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-40 flex items-center justify-center transition-colors"
                                        title="Move Stage Right"
                                      >
                                        <ChevronRight size={12} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-[10px] text-red-500 font-semibold uppercase tracking-wider">
                                      Archived
                                    </div>
                                  )}

                                  {/* Main CRM Actions */}
                                  <div className="flex items-center gap-1">
                                    {lead.status === "Deleted" ? (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRestoreLead(lead.id);
                                        }}
                                        className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-0.5"
                                        title="Restore Lead to Active Pipeline"
                                      >
                                        Restore
                                      </button>
                                    ) : lead.status === "Won" && lead.clientType === "Permanent" ? (
                                        <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-bold">
                                          Permanent
                                        </span>
                                    ) : lead.status === "Won" && lead.clientType !== "Permanent" ? (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleConvertLead(lead);
                                          }}
                                          className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-0.5"
                                          title="Upgrade Temporary Client to Permanent Client"
                                        >
                                          Make Permanent
                                        </button>
                                    ) : (
                                      <span className="text-[10px] text-gray-400 font-bold px-1">Lead</span>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteLead(lead.id);
                                      }}
                                      className="p-1 text-gray-400 hover:text-red-650 transition-colors"
                                      title={lead.status === "Deleted" ? "Delete Permanently" : "Move to Trash"}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!showTrashOnly && (
                <div className="flex flex-col gap-3 pt-5 border-t border-gray-200">
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#071E34]">Lead Conversion History</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Permanent clients and lost leads are stored here after leaving the active pipeline.</p>
                  </div>

                  <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          <th className="p-3">Lead ID</th>
                          <th className="p-3">Client / Lead</th>
                          <th className="p-3">Service</th>
                          <th className="p-3">Value</th>
                          <th className="p-3">Final Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs text-gray-700">
                        {historyLeads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">No history records yet.</td>
                          </tr>
                        ) : (
                          historyLeads.map(l => (
                            <tr key={l.id} className="border-b border-gray-100 bg-gray-50/20 hover:bg-gray-50/60">
                              <td className="p-3 font-mono font-semibold text-gray-450">{l.id}</td>
                              <td className="p-3">
                                <div className="font-bold text-[#071E34]">{l.name}</div>
                                <span className="text-[10px] text-gray-450">{l.companyName} &bull; {l.phone || l.email}</span>
                              </td>
                              <td className="p-3 font-semibold text-gray-600">{l.interestedService}</td>
                              <td className="p-3 font-bold text-gray-600">₹{Number(l.expectedBudget || 0).toLocaleString()}</td>
                              <td className="p-3">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                                  l.status === "Won"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                }`}>
                                  {l.status === "Won" ? "Permanent Client" : "Lost"}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="px-2.5 py-1 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg text-[10px] font-bold"
                                  title="Delete History Record"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Tab: Follow-ups */}
        {activeTab === "followups" && (() => {
          const activeFollowups = leads.filter(l => l.status === "Follow-up");
          const historyFollowups = leads.filter(l => l.status === "Won" || l.status === "Lost");

          return (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              {/* SECTION 1: ACTIVE FOLLOW-UP SCHEDULES */}
              <div>
                <h2 className="font-heading font-bold text-base text-[#071E34]">Follow-up Schedules</h2>
                <p className="text-[10px] text-gray-400 mt-0.5">Leads transitioned to secondary discussion rounds and ongoing follow-up touchpoints.</p>
              </div>

              <div className="flex flex-col gap-3">
                {activeFollowups.length === 0 ? (
                  <div className="p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-450 font-medium text-xs">
                    No active follow-up schedules. Check the history ledger below.
                  </div>
                ) : (
                  activeFollowups.map(l => (
                    <div key={l.id} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between text-xs gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-[#0E9F8A] shrink-0" />
                        <div>
                          <h4 className="font-bold text-[#071E34]">{l.name} &bull; {l.companyName}</h4>
                          <span className="text-[10px] text-gray-500 mt-1 block">Expected Budget: **${l.expectedBudget.toLocaleString()}** &bull; Service: {l.interestedService} &bull; Status: <span className="font-bold text-[#0E9F8A] uppercase">{l.status}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-3">
                          <span className="text-[10px] font-bold text-gray-400 block uppercase">Scheduled Date</span>
                          <span className="font-mono text-[#0E9F8A] font-bold">{l.nextFollowUpDate}</span>
                        </div>
                        <Button
                          onClick={() => handleRevertLead(l)}
                          variant="secondary"
                          size="sm"
                          className="text-[10px] py-1.5 px-3 border border-teal-100 text-[#115E59] bg-teal-50 hover:bg-teal-50 font-bold flex items-center gap-1"
                        >
                          <RotateCcw size={12} className="shrink-0" /> Revert to Lead
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* SECTION 2: FOLLOW-UP CONVERSION HISTORY */}
              <div className="flex flex-col gap-2 mt-8 pt-4 border-t border-gray-200">
                <h3 className="font-heading font-extrabold text-sm text-[#071E34]">Follow-up Conversion History</h3>
                <p className="text-[10px] text-gray-400">Archive tracking follow-up leads successfully converted to active client accounts or lost prospects.</p>
              </div>

              <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="p-3">Lead ID</th>
                      <th className="p-3">Lead Details</th>
                      <th className="p-3">Service Interest</th>
                      <th className="p-3">Expected Budget</th>
                      <th className="p-3">Follow-up Date</th>
                      <th className="p-3">Outcome Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {historyFollowups.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">No conversion history found.</td>
                      </tr>
                    ) : (
                      historyFollowups.map(l => (
                        <tr key={l.id} className={`border-b border-gray-100 hover:bg-gray-50/50 ${
                          l.status === "Won" && l.clientType !== "Permanent" ? "bg-amber-50/70" : "bg-gray-50/20"
                        }`}>
                          <td className="p-3 font-mono font-semibold text-gray-450">{l.id}</td>
                          <td className="p-3">
                            <div className="font-bold text-[#071E34]">{l.name}</div>
                            <span className="text-[10px] text-gray-450">{l.companyName} &bull; {l.phone}</span>
                          </td>
                          <td className="p-3 font-semibold text-gray-600">{l.interestedService}</td>
                          <td className="p-3 font-bold text-gray-600">${l.expectedBudget.toLocaleString()}</td>
                          <td className="p-3 font-mono text-gray-500">{l.nextFollowUpDate}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                              l.status === "Won" && l.clientType !== "Permanent"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : l.status === "Won" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}>
                              {l.status === "Won" && l.clientType !== "Permanent" ? "Ready for Permanent" : l.status === "Won" ? "Permanent Client" : l.status}
                            </span>
                          </td>
                          <td className="p-3 text-right flex justify-end items-center gap-2">
                            {l.status === "Won" && l.clientType !== "Permanent" ? (
                              <Button
                                onClick={() => handleConvertLead(l)}
                                variant="primary"
                                size="sm"
                                className="px-2 py-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                              >
                                Make Permanent
                              </Button>
                            ) : l.status === "Won" ? (
                              <span className="text-green-600 font-bold uppercase text-[10px] pr-2">Permanent</span>
                            ) : (
                              <span className="text-gray-400 font-bold uppercase text-[10px] pr-2">Processed</span>
                            )}
                            <Button
                              onClick={() => handleDeleteLead(l.id)}
                              variant="outline"
                              size="sm"
                              className="px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"
                              title="Delete History Record"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* Tab: All Projects */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Project Portfolio</h2>
              <Button onClick={() => setShowProjectModal(true)} variant="primary" size="sm" className="gap-1">
                <Plus size={14} /> Create Client Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 bg-white border border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3">
                <FolderOpen className="w-10 h-10 text-gray-300" />
                <h4 className="font-heading font-bold text-gray-700 text-sm">No Client Projects Found</h4>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">There are no active or completed projects in the database. Click <strong>+ Create Client Project</strong> to add your first project.</p>
                <Button onClick={() => setShowProjectModal(true)} variant="primary" size="sm" className="mt-1 gap-1">
                  <Plus size={14} /> Create Client Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <div key={p.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4 relative group">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold">{p.id}</span>
                        <h3 
                          onClick={() => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }}
                          className="font-heading font-bold text-sm text-[#071E34] mt-1.5 hover:text-[#0E9F8A] cursor-pointer transition-colors"
                        >
                          {p.name || p.title}
                        </h3>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Client: {p.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          p.status === "Completed" ? "bg-green-50 text-green-600" :
                          p.status === "Planning" ? "bg-teal-50 text-[#115E59]" : "bg-amber-50 text-amber-600"
                        }`}>
                          {p.status}
                        </span>
                        <button
                          onClick={() => handleStartEditProject(p)}
                          className="text-gray-400 hover:text-[#0E9F8A] transition-colors p-1"
                          title="Edit Project Data"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="text-gray-300 hover:text-red-600 transition-colors p-1"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                      <div className="flex justify-between font-semibold">
                        <span>Project Completion:</span>
                        <span className="text-[#071E34] font-bold">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-[#0E9F8A]" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <span className="text-xs font-bold text-[#071E34]">${(p.budget || 0).toLocaleString()}.00</span>
                      <Button onClick={() => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }} variant="secondary" size="sm" className="font-bold text-xs">
                        Open Proposal Page →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Our Projects */}
        {activeTab === "our-projects" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-heading font-bold text-base text-[#071E34]">Company Showcase & Our Projects</h2>
                <span className="text-xs text-gray-400">Internal software products, portfolio systems, and production showcases.</span>
              </div>
              <Button onClick={() => setShowOurProjectModal(true)} variant="primary" size="sm" className="gap-1">
                <Plus size={14} /> Create Our Project
              </Button>
            </div>

            {ourProjects.length === 0 ? (
              <div className="p-12 bg-white border border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3">
                <Briefcase className="w-10 h-10 text-gray-300" />
                <h4 className="font-heading font-bold text-gray-700 text-sm">No Company Showcase Projects Found</h4>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  There are no internal or showcase projects stored in the database. Click <strong>+ Create Our Project</strong> to add your first company project.
                </p>
                <Button onClick={() => setShowOurProjectModal(true)} variant="primary" size="sm" className="mt-1 gap-1">
                  <Plus size={14} /> Create Our Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ourProjects.map(p => (
                  <div key={p.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between gap-4 relative group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold">{p.id}</span>
                          <span className="text-[9px] font-bold bg-teal-50 text-teal-600 px-2 py-0.5 rounded uppercase">{p.category || "Web App"}</span>
                        </div>
                        <h3 
                          onClick={() => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }}
                          className="font-heading font-bold text-sm text-[#071E34] mt-2 hover:text-[#0E9F8A] cursor-pointer transition-colors"
                        >
                          {p.name || p.title}
                        </h3>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Showcase Client: {p.clientName || "Internal Enterprise"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-green-50 text-green-600">
                          {p.status || "Live Production"}
                        </span>
                        <button
                          onClick={() => handleStartEditOurProject(p)}
                          className="text-gray-400 hover:text-[#0E9F8A] transition-colors p-1"
                          title="Edit Company Project Data"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteOurProject(p.id)}
                          className="text-gray-300 hover:text-red-600 transition-colors p-1"
                          title="Delete Our Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed italic">{p.description || "No description provided."}</p>

                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs gap-2 flex-wrap">
                      <span className="font-mono font-extrabold text-sm text-[#071E34]">
                        ₹{(p.budget || (p.id === "OPRJ-7001" ? 45000 : 50000)).toLocaleString("en-IN")}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Button 
                          onClick={() => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }} 
                          variant="secondary" 
                          size="sm"
                          className="text-[10px] py-1 px-2.5 flex items-center gap-1 font-bold"
                        >
                          <Layers size={12} className="text-[#0E9F8A]" />
                          <span>Open Proposal Page</span>
                        </Button>

                        <Button 
                          onClick={() => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }} 
                          variant="secondary" 
                          size="sm"
                          className="text-[10px] py-1 px-2.5 flex items-center gap-1 font-bold"
                        >
                          <FileText size={12} className="text-[#0E9F8A]" />
                          <span>Quotation Page</span>
                        </Button>

                        {p.liveUrl && (
                          <a 
                            href={p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[#0E9F8A] hover:underline font-semibold text-[11px] flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-lg"
                          >
                            <span>Live Demo</span>
                            <ArrowRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Proposals Studio */}
        {activeTab === "proposals" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="font-heading font-bold text-base text-[#071E34]">Proposals Builder Studio</h2>
                <p className="text-xs text-gray-400">Configure 8-section executive proposals, project scopes, role specifications, and deliverable matrices.</p>
              </div>
              <Button
                onClick={() => {
                  const defaultProj = ourProjects[0] || projects[0] || { id: "OPRJ-7030", name: "Tours and Travels", clientName: "Internal Enterprise" };
                  setActiveProjectDetail(defaultProj);
                  setActiveProjectTab("overview");
                }}
                variant="primary"
                size="sm"
                className="gap-1 bg-[#0E9F8A] hover:bg-teal-600 text-white font-bold"
              >
                <Plus size={14} /> Create Proposal Workspace
              </Button>
            </div>

            {/* List of active proposal project workspaces */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(ourProjects.length > 0 ? ourProjects : projects).map((proj) => {
                const existingQuote = quotations.find(q => q.projectId === proj.id || (q as any).projectName === proj.name);
                return (
                  <div key={proj.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold">{proj.id}</span>
                        <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 uppercase">
                          8-Section Proposal
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#071E34] mt-2">{proj.name || proj.title}</h3>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Sponsor: {proj.clientName || "Enterprise Client"}</span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                      <span className="text-[10px] font-bold text-gray-500 uppercase block">Selected Proposal Scope</span>
                      <span className="font-bold text-[#071E34]">{existingQuote?.projectType || "Website Application"}</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <Button
                        onClick={() => {
                          setActiveProjectDetail(proj);
                          setActiveProjectTab("overview");
                        }}
                        variant="secondary"
                        size="sm"
                        className="text-xs font-bold gap-1 text-[#0E9F8A] hover:bg-teal-50"
                      >
                        <Sparkles size={13} />
                        <span>Edit 8 Sections</span>
                      </Button>

                      <Button
                        onClick={async () => {
                          if (existingQuote) {
                            setReviewingQuote(existingQuote);
                            setReviewMode("exact-pdf");
                          } else {
                            await handleCreateScopeQuotation(proj, "website");
                            setActiveTab("quotations");
                          }
                        }}
                        variant="primary"
                        size="sm"
                        className="text-xs font-bold gap-1 bg-[#0E9F8A] hover:bg-teal-600 text-white"
                      >
                        <span>Create Proposal & Open Quotation →</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Quotations */}
        {activeTab === "quotations" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="font-heading font-bold text-base text-[#071E34]">Quotations Ledger</h2>
                <p className="text-[10px] text-gray-400">Manage, create, and upload custom estimation files to generate tailored proposals.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  onClick={() => quoteFileInputRef.current?.click()} 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs py-1.5 px-3 flex items-center gap-1.5 border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold"
                >
                  <Upload size={14} className="text-purple-600" />
                  <span>Upload Quotation File</span>
                </Button>
                <Button onClick={() => { setEditingQuote(null); setShowQuoteModal(true); }} variant="primary" size="sm" className="gap-1">
                  <Plus size={14} /> Create Quotation
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {quotations.map(quote => {
                const totalVal = getQuoteFinalVal(quote);
                return (
                  <div key={quote.number} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold max-w-fit">{quote.number}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                          (quote.projectType || "").includes("Mobile")
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : (quote.projectType || "").includes("Web & Mobile")
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : (quote.projectType || "").includes("Website")
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          {quote.projectType || "Scope Quotation"}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#071E34] mt-1.5">{quote.title}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5">Project: {quote.projectName} &bull; Client: {quote.clientName}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block">Total Amount</span>
                        <strong className="text-[#071E34] text-sm font-heading">${totalVal.toLocaleString()}</strong>
                      </div>
                      {quote.status !== "Approved" ? (
                        <Button onClick={() => handleApproveQuotation(quote.number)} variant="primary" size="sm">
                          Approve
                        </Button>
                      ) : (
                        <span className="px-3 py-1 rounded bg-green-50 border border-green-200 text-green-600 font-bold uppercase text-[9px]">Approved</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Project Features */}
        {activeTab === "features" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Logged Features</h2>
              <Button onClick={() => setShowFeatureModal(true)} variant="primary" size="sm" className="gap-1">
                <Plus size={14} /> Add Project Feature
              </Button>
            </div>

            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-3">Feature ID</th>
                    <th className="p-3">Feature Detail</th>
                    <th className="p-3">Requirement Module</th>
                    <th className="p-3">Developer</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {features.map(f => (
                    <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="p-3 font-mono font-semibold text-[#0E9F8A]">{f.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-[#071E34]">{f.title}</div>
                        <span className="text-[10px] text-gray-400">{f.projectName}</span>
                      </td>
                      <td className="p-3 font-semibold text-[#071E34]">{f.moduleName}</td>
                      <td className="p-3">{f.assignedDeveloper}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          f.priority === "Critical" ? "bg-red-100 text-red-600" :
                          f.priority === "High" ? "bg-amber-100 text-amber-600" : "bg-teal-50 text-[#115E59]"
                        }`}>{f.priority}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-teal-50 text-[#0E9F8A]">{f.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Innovations */}
        {activeTab === "innovations" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Advanced Solutions Proposed</h2>
              <Button onClick={() => setShowInnovationModal(true)} variant="primary" size="sm" className="gap-1">
                <Plus size={14} /> Propose Solution
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {innovations.map(inn => (
                <div key={inn.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 text-xs relative">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold">{inn.id}</span>
                      <h4 className="font-heading font-bold text-sm text-[#071E34] mt-1">{inn.title}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5">Project: {inn.projectName} &bull; Proposed by: {inn.proposedBy}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-teal-50 text-[#0E9F8A]">{inn.approvalStatus}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex flex-col gap-1 text-gray-600">
                    <p className="font-medium text-gray-700">{inn.description}</p>
                    <p className="text-[#0E9F8A] mt-1 font-semibold">Business Benefit: {inn.businessBenefit}</p>
                    <p className="text-green-600 font-semibold">Technical Benefit: {inn.technicalBenefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Invoices */}
        {activeTab === "invoices" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Billing Invoices</h2>
              <Button onClick={() => setShowInvoiceModal(true)} variant="primary" className="text-xs px-3.5 py-2">
                + Generate Invoice
              </Button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400">No invoices in database. Click + Generate Invoice to create one.</td>
                    </tr>
                  ) : (
                    invoices.map(inv => (
                      <tr key={inv.id} className="border-b border-gray-100">
                        <td className="p-3 font-mono font-semibold text-[#0E9F8A]">{inv.id}</td>
                        <td className="p-3 font-bold text-[#071E34]">{inv.clientName}</td>
                        <td className="p-3">{inv.due || inv.dueDate}</td>
                        <td className="p-3 font-bold">${(inv.value || inv.amount || 0).toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                            inv.status === "Paid" || inv.status === "paid" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                          }`}>{inv.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Payments Log */}
        {activeTab === "payments" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Receipt Payments Log</h2>
              <Button onClick={() => setShowPaymentModal(true)} variant="primary" className="text-xs px-3.5 py-2">
                + Log Payment
              </Button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-3">Txn ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Receipt Value</th>
                    <th className="p-3">Gateway</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400">No payment logs in database. Click + Log Payment to record one.</td>
                    </tr>
                  ) : (
                    payments.map(pay => (
                      <tr key={pay.id} className="border-b border-gray-100">
                        <td className="p-3 font-mono font-semibold text-green-600">{pay.id}</td>
                        <td className="p-3 font-bold text-[#071E34]">{pay.clientName}</td>
                        <td className="p-3 font-bold">${pay.amount.toLocaleString()}</td>
                        <td className="p-3">{pay.gateway}</td>
                        <td className="p-3">{pay.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Expense Ledger */}
        {activeTab === "expenses" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Corporate Expenses</h2>
              <Button onClick={() => setShowExpenseModal(true)} variant="primary" className="text-xs px-3.5 py-2">
                + Add Expense
              </Button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-3">Exp ID</th>
                    <th className="p-3">Title Description</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {expenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400">No expenses recorded. Click + Add Expense to create one.</td>
                    </tr>
                  ) : (
                    expenses.map(exp => (
                      <tr key={exp.id} className="border-b border-gray-100">
                        <td className="p-3 font-mono font-semibold text-red-600">{exp.id}</td>
                        <td className="p-3 font-semibold text-[#071E34]">{exp.title}</td>
                        <td className="p-3 font-bold text-red-600">${exp.value}</td>
                        <td className="p-3">{exp.category}</td>
                        <td className="p-3">{exp.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Corporate Users */}
        {activeTab === "users" && (() => {
          const activeDbUsers = users.filter(u => u && u.status !== "Deleted");

          const permanentClientsAsUsers = (clients || [])
            .filter(c => c && (c.type === "Permanent" || (c as any).clientType === "Permanent" || c.status === "Active") && c.status !== "Deleted")
            .map(c => ({
              id: c.id || `USR-${Math.floor(1000 + Math.random() * 9000)}`,
              name: c.name || "Permanent Client",
              email: c.email || (c.name ? `${c.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@crm.com` : "client@crm.com"),
              role: "Client Access",
              status: c.status || "Active"
            }));

          const userMap = new Map();
          permanentClientsAsUsers.forEach(u => {
            if (!u || !u.email) return;
            const key = u.email.toLowerCase().trim();
            userMap.set(key, u);
          });

          activeDbUsers.forEach(u => {
            if (!u) return;
            const key = (u.email || u.name || u.id || "").toLowerCase().trim();
            if (key) {
              const existing = userMap.get(key);
              userMap.set(key, {
                ...existing,
                ...u,
                role: u.role || (existing ? existing.role : "Client Access"),
                status: u.status || (existing ? existing.status : "Active")
              });
            }
          });

          const unifiedSystemUsers = Array.from(userMap.values());

          return (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="font-heading font-bold text-base text-[#071E34]">System Users & Accounts</h2>
                  <span className="text-xs text-gray-400">Manage all system users, authorization roles, and permanent client user accounts.</span>
                </div>
                <Button 
                  onClick={handleOpenAddUserModal} 
                  variant="primary" 
                  size="sm" 
                  className="gap-1 bg-[#FF5349] hover:bg-[#F05454] text-white border-[#FF5349]"
                >
                  <Plus size={14} /> Add System User
                </Button>
              </div>
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="p-3">User</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Role Authorization</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-gray-700">
                    {unifiedSystemUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">No system users found. Click Add System User to create one.</td>
                      </tr>
                    ) : (
                      unifiedSystemUsers.map(u => (
                        <tr key={u.email || u.id} className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors">
                          <td className="p-3 font-bold text-[#071E34]">{u.name}</td>
                          <td className="p-3 font-mono text-slate-600">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-extrabold text-[10px]">
                              {u.role || "Client Access"}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                              (u.status || "Active") === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                            }`}>
                              {u.status || "Active"}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditUserModal(u)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                              >
                                <Edit size={12} />
                                <span>Edit</span>
                              </button>
                              {u.email !== "admin@crm.com" && (
                                <button
                                  onClick={() => handleDeleteUser(u.email || u.id)}
                                  className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors inline-flex items-center gap-1"
                                >
                                  <Trash2 size={12} />
                                  <span>Delete</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* Tab: Employees Profile */}
        {activeTab === "employees" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Employee Roster</h2>
              <Button onClick={() => setShowEmployeeModal(true)} variant="primary" className="text-xs px-3.5 py-2">
                + Add Employee Profile
              </Button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-3">Employee ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Corporate Role</th>
                    <th className="p-3">Department</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700">
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-400">No employees listed. Click + Add Employee Profile to create one.</td>
                    </tr>
                  ) : (
                    employees.map(e => (
                      <tr key={e.id} className="border-b border-gray-100">
                        <td className="p-3 font-mono font-semibold text-[#0E9F8A]">{e.id}</td>
                        <td className="p-3 font-bold text-[#071E34]">{e.name}</td>
                        <td className="p-3">{e.role}</td>
                        <td className="p-3">{e.dept}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Department Teams */}
        {activeTab === "teams" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-base text-[#071E34]">Department Teams</h2>
              <Button onClick={() => setShowTeamModal(true)} variant="primary" className="text-xs px-3.5 py-2">
                + Create Department Team
              </Button>
            </div>
            {teams.length === 0 ? (
              <div className="p-8 bg-white border border-dashed border-gray-200 rounded-2xl text-center text-xs text-gray-400">
                No department teams found. Click + Create Department Team to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.map(team => (
                  <div key={team.name} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-2 text-xs">
                    <h4 className="font-heading font-bold text-sm text-[#071E34]">{team.name}</h4>
                    <span className="text-gray-400 text-[10px]">Leader: {team.lead}</span>
                    <div className="border-t border-gray-100 pt-2 text-gray-600 mt-2">
                      <p>Members: <strong className="text-gray-800">{team.members}</strong></p>
                      <p className="mt-1">Active Projects: <strong className="text-gray-800">{team.activeProjects}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* Tab: Lead Reports */}
        {activeTab === "reports-leads" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h2 className="font-heading font-bold text-base text-[#071E34]">Lead Generation Reports</h2>
            <GlassCard className="p-6 bg-white border border-gray-200 flex flex-col gap-4 text-xs">
              <h3 className="font-heading font-bold text-[#071E34] text-sm">Lead Conversion Ratios</h3>
              <p className="text-gray-500">Overall lead acquisition split by sources.</p>
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex justify-between items-center">
                  <span>Google Ads</span>
                  <strong className="text-[#071E34]">40%</strong>
                </div>
                <div className="w-full h-2 rounded bg-gray-150 overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: "40%" }}></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Direct Website Forms</span>
                  <strong className="text-[#071E34]">35%</strong>
                </div>
                <div className="w-full h-2 rounded bg-gray-150 overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: "35%" }}></div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Tab: Settings */}
        {activeTab === "settings-general" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h2 className="font-heading font-bold text-base text-[#071E34]">General System Settings</h2>
            <GlassCard className="p-6 bg-white border border-gray-200 text-xs flex flex-col gap-4 max-w-xl">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company Registered Name</label>
                <input 
                  type="text" 
                  defaultValue="CRM Enterprise Solutions Ltd"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin Contact Email</label>
                <input 
                  type="text" 
                  defaultValue="support@crm.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none"
                />
              </div>
              <div className="flex gap-2.5 items-center mt-3">
                <input type="checkbox" defaultChecked id="gst-switch" className="rounded border-gray-300 text-[#0E9F8A] focus:ring-teal-500" />
                <label htmlFor="gst-switch" className="font-semibold text-[#071E34]">Enable automatic invoice taxes calculations (18% GST)</label>
              </div>
              <Button variant="primary" className="w-fit mt-3">Save Configurations</Button>

              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Danger Zone</span>
                <p className="text-gray-500 text-[11px]">Wipe all old demo records from MongoDB to start with a completely empty database.</p>
                <Button 
                  type="button" 
                  onClick={handleClearAllDemoData} 
                  variant="outline" 
                  className="w-fit border-red-200 text-red-600 hover:bg-red-50 font-bold"
                >
                  <Trash2 size={14} className="mr-1.5" /> Clear All Records From MongoDB
                </Button>
              </div>
            </GlassCard>
          </div>
        )}
          </>
        )}
      </main>

      {/* ==========================================
          CRUD MODALS FOR DYNAMIC INPUTS
          ========================================== */}

      {/* 0. Modal: Create / Edit Our Project */}
      {showOurProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">
                {editingOurProject ? "Edit Our Project Profile" : "Create Our Project Profile"}
              </h3>
              <button 
                onClick={() => {
                  setShowOurProjectModal(false);
                  setEditingOurProject(null);
                  setOurProjectForm({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
                }} 
                className="text-gray-400 hover:text-[#071E34] text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateOurProject} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud ERP, Mobile CRM Portal"
                  value={ourProjectForm.name}
                  onChange={e => setOurProjectForm(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client / Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. Internal / Logistics"
                    value={ourProjectForm.clientName}
                    onChange={e => setOurProjectForm(prev => ({ ...prev, clientName: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Contract / Valuation ($)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={ourProjectForm.budget}
                    onChange={e => setOurProjectForm(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Live URL / Website</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={ourProjectForm.liveUrl}
                    onChange={e => setOurProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Project Summary & Details</label>
                <textarea
                  rows={3}
                  placeholder="Outline key project features, stack, and business value..."
                  value={ourProjectForm.description}
                  onChange={e => setOurProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  className="px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  type="button" 
                  onClick={() => {
                    setShowOurProjectModal(false);
                    setEditingOurProject(null);
                    setOurProjectForm({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
                  }} 
                  variant="secondary" 
                  size="sm"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingOurProject ? "Update Our Project" : "Save Our Project"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Modal: Our Project Quotation View */}
      {activeOurProjectQuotation && (() => {
        const proj = activeOurProjectQuotation;
        const projName = proj.name || "Project";

        // Find all quotations matching this project
        const projectQuotes = quotations.filter(q => 
          (q.projectId && q.projectId === proj.id) || 
          (q.projectName && q.projectName.toLowerCase() === projName.toLowerCase()) ||
          (q.title && q.title.toLowerCase().includes(projName.toLowerCase()))
        );

        // Active quotation selection logic
        const selectedQuote = projectQuotes.find(q => q.id === activeSelectedQuoteId) || projectQuotes[0];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
            <GlassCard className="w-full max-w-3xl max-h-[90vh] bg-white border border-gray-200 shadow-2xl flex flex-col p-6 overflow-y-auto animate-in fade-in zoom-in duration-200 gap-5">
              
              {/* HEADER */}
              <div className="flex justify-between items-center border-b border-gray-150 pb-3 shrink-0">
                <div>
                  <span className="text-[9px] font-mono text-[#0E9F8A] font-bold uppercase tracking-wider">PROJECT PROPOSALS & SEPARATE QUOTATIONS HUB</span>
                  <h3 className="font-heading font-extrabold text-[#071E34] text-lg mt-0.5">{projName}</h3>
                  <span className="text-xs text-gray-400 block mt-0.5">Client / Sponsor: {proj.clientName || "Enterprise Client"}</span>
                </div>
                <button onClick={() => setActiveOurProjectQuotation(null)} className="text-gray-400 hover:text-[#071E34] text-lg font-bold">&times;</button>
              </div>

              {/* QUICK GENERATE SEPARATE QUOTATIONS BAR */}
              <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 flex flex-col gap-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-[#071E34] flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#0E9F8A]" />
                    <span>Create / Generate Separate Scope Quotation</span>
                  </span>
                  <Button 
                    onClick={() => handleCreateScopeQuotation(proj, "all")} 
                    variant="primary" 
                    size="sm"
                    className="text-[10px] py-1 px-3 premium-button font-extrabold shadow-sm"
                  >
                    ⚡ Generate Separate Quotations for All Scopes
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleCreateScopeQuotation(proj, "website")}
                    className="p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#071E34]">
                      <span>🌐</span> <span>Website App</span>
                    </div>
                    <span className="text-[10px] text-gray-500">Web Portal, Auth, Admin & SEO</span>
                    <span className="text-[10px] font-mono font-bold text-[#0E9F8A] mt-1">₹50,000 / $50k</span>
                  </button>

                  <button
                    onClick={() => handleCreateScopeQuotation(proj, "mobile")}
                    className="p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#071E34]">
                      <span>📱</span> <span>Mobile App</span>
                    </div>
                    <span className="text-[10px] text-gray-500">iOS & Android Apps, QR & Push</span>
                    <span className="text-[10px] font-mono font-bold text-[#0E9F8A] mt-1">₹90,000 / $90k</span>
                  </button>

                  <button
                    onClick={() => handleCreateScopeQuotation(proj, "both")}
                    className="p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#071E34]">
                      <span>⚡</span> <span>Both (Web+App)</span>
                    </div>
                    <span className="text-[10px] text-gray-500">Full Web + Mobile Ecosystem</span>
                    <span className="text-[10px] font-mono font-bold text-[#0E9F8A] mt-1">₹130,000 / $130k</span>
                  </button>

                  <button
                    onClick={() => handleCreateScopeQuotation(proj, "others")}
                    className="p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#071E34]">
                      <span>🛠️</span> <span>Others / Custom</span>
                    </div>
                    <span className="text-[10px] text-gray-500">ERP, CRM, AI & Custom SLA</span>
                    <span className="text-[10px] font-mono font-bold text-[#0E9F8A] mt-1">₹100,000 / $100k</span>
                  </button>
                </div>
              </div>

              {/* SEPARATE QUOTATIONS TABS BAR */}
              {projectQuotes.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0 mr-1">Quotations ({projectQuotes.length}):</span>
                    {projectQuotes.map((q) => {
                      const isSelected = selectedQuote && selectedQuote.id === q.id;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setActiveSelectedQuoteId(q.id ?? null)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ease-out shrink-0 flex items-center gap-1.5 border ${
                            isSelected
                              ? "bg-[#0E9F8A] text-white border-[#0E9F8A] shadow-md shadow-teal-700/20"
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          <span>{q.projectType?.includes("Mobile") ? "📱" : q.projectType?.includes("Web & Mobile") ? "⚡" : q.projectType?.includes("Website") ? "🌐" : "🛠️"}</span>
                          <span>{q.title?.split("-")[1]?.trim() || q.projectType || q.id}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE QUOTATION DETAILS CARD */}
                  {selectedQuote && (() => {
                    const finalVal = getQuoteFinalVal(selectedQuote);
                    const items = Array.isArray(selectedQuote.serviceItems) && selectedQuote.serviceItems.length > 0
                      ? selectedQuote.serviceItems
                      : [
                          { description: "Vite React Animated UI & Component Suite", qty: 1, rate: 20000 },
                          { description: "Node.js Backend REST API & Content Integration", qty: 1, rate: 18000 },
                          { description: "Production Deployment & Security Setup", qty: 1, rate: 7000 }
                        ];
                    const projectFeatures = features.filter(f => f.projectId === proj.id || f.projectName === proj.name);
                    const pdfHtml = generateSpeshwayEstimationPdfHtml(proj, selectedQuote, projectFeatures, previewZoom);

                    return (
                      <div className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-150 text-xs">
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase block">Quote ID</span>
                            <span className="font-mono font-bold text-[#0E9F8A]">{selectedQuote.number || selectedQuote.id}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase block">Scope Type</span>
                            <span className="font-bold text-gray-800">{selectedQuote.projectType || "Web Application"}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase block">Ref Code</span>
                            <span className="font-mono text-[10px] text-gray-600 font-semibold">{selectedQuote.documentRef || `SPW/EST/${projName.toUpperCase().slice(0, 6)}/2026`}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase block">Status</span>
                            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px]">Approved</span>
                          </div>
                        </div>

                        {/* VIEW MODE TOGGLE BAR */}
                        <div className="flex justify-between items-center bg-gray-100 p-1 rounded-xl border border-gray-200 flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setModalViewTab("full-pdf")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ease-out ${
                                modalViewTab === "full-pdf" ? "bg-[#0E9F8A] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              📄 Full Page Proposal PDF
                            </button>
                            <button
                              onClick={() => setModalViewTab("summary")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ease-out ${
                                modalViewTab === "summary" ? "bg-[#0E9F8A] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              📊 Deliverables & Valuation Summary
                            </button>
                          </div>

                          {modalViewTab === "full-pdf" && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => setPreviewZoom(prev => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
                                  className="p-1 text-gray-600 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"
                                  title="Zoom Out (-10%)"
                                >
                                  <ZoomOut size={13} />
                                </button>
                                <span className="text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center">
                                  {Math.round(previewZoom * 100)}%
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setPreviewZoom(prev => Math.min(1.5, Number((prev + 0.1).toFixed(2))))}
                                  className="p-1 text-gray-600 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"
                                  title="Zoom In (+10%)"
                                >
                                  <ZoomIn size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPreviewZoom(0.6)}
                                  className="p-1 text-gray-400 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"
                                  title="Reset Zoom to 60%"
                                >
                                  <RotateCcw size={12} />
                                </button>
                              </div>

                              <button
                                onClick={() => setIsFullScreenPdf(true)}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1 shadow-2xs"
                              >
                                <Maximize2 size={13} className="text-[#0E9F8A]" /> Full Screen View
                              </button>
                            </div>
                          )}
                        </div>

                        {/* FULL PAGE PROPOSAL PREVIEW TAB */}
                        {modalViewTab === "full-pdf" ? (
                          <div className="w-full h-[650px] bg-slate-100 rounded-xl border border-gray-200 overflow-hidden relative shadow-inner">
                            <iframe
                              srcDoc={pdfHtml}
                              className="w-full h-full border-0 bg-white"
                              title="Full Page Proposal Document Preview"
                            />
                          </div>
                        ) : (
                          <>
                            {/* DELIVERABLES TABLE */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-gray-100 text-gray-500 text-[10px] font-bold uppercase border-b border-gray-200">
                                  <tr>
                                    <th className="p-3">Service Deliverable / Technical Scope</th>
                                    <th className="p-3 text-center">Qty</th>
                                    <th className="p-3 text-right">Estimated Price</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150">
                                  {items.map((it: any, idx: number) => (
                                    <tr key={idx}>
                                      <td className="p-3 font-semibold text-[#071E34]">{it.description || it.title || it.service}</td>
                                      <td className="p-3 text-center">{it.qty || 1}</td>
                                      <td className="p-3 text-right font-mono font-bold">₹{(it.rate || 15000).toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* PRICE VALUATION SUMMARY */}
                            <div className="flex justify-between items-center p-4 bg-teal-50/70 rounded-xl border border-teal-100">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-extrabold text-[#071E34]">{selectedQuote.title}</span>
                                <span className="text-[10px] text-gray-500">Plan A: ₹{(selectedQuote.planAPrice || 50000).toLocaleString()} | Plan B: ₹{(selectedQuote.planBPrice || 90000).toLocaleString()} | Taxes: {selectedQuote.tax || 18}%</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-gray-400 uppercase block">Total Net Valuation</span>
                                <span className="font-mono text-xl font-extrabold text-[#0E9F8A]">₹{finalVal.toLocaleString()}</span>
                              </div>
                            </div>
                          </>
                        )}

                        {/* ACTIONS BAR */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 flex-wrap gap-2">
                          <Button
                            onClick={async () => {
                              if (!confirm(`Delete quotation '${selectedQuote.id}'?`)) return;
                              try {
                                await fetch(`${API_URL}/crm/quotation/${selectedQuote.id}`, { method: "DELETE" });
                              } catch (e) {}
                              setQuotations(prev => prev.filter(q => q.id !== selectedQuote.id));
                            }}
                            variant="secondary"
                            size="sm"
                            className="text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold gap-1"
                          >
                            <Trash2 size={13} /> Delete Quotation
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => {
                                const projectFeatures = features.filter(f => f.projectId === proj.id || f.projectName === proj.name);
                                const compName = selectedQuote.companyName || "Speshway_Solutions";
                                triggerDirectPdfDownload(pdfHtml, `${compName}_${projName}_${selectedQuote.projectType || "Quotation"}.pdf`, compName);
                              }}
                              variant="secondary"
                              size="sm"
                              className="text-xs font-bold border border-gray-200 gap-1.5"
                            >
                              <Download size={14} className="text-[#0E9F8A]" /> Download PDF
                            </Button>

                            <Button
                              onClick={() => {
                                setActiveProjectDetail(proj);
                                setActiveProjectTab("overview");
                                setActiveOurProjectQuotation(null);
                              }}
                              variant="primary"
                              size="sm"
                              className="text-xs font-bold gap-1.5 bg-[#0E9F8A] hover:bg-teal-600"
                            >
                              <Eye size={14} /> Open Proposal Studio
                            </Button>
                          </div>
                        </div>

                        {/* FULL SCREEN PROPOSAL OVERLAY */}
                        {isFullScreenPdf && (
                          <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md p-4 flex flex-col gap-3 animate-in fade-in duration-150">
                            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-xl text-white">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#5ECBC0] font-mono">100% FULL SCREEN PROPOSAL VIEW</span>
                                <span className="text-xs font-bold border-l border-slate-700 pl-2 text-gray-300">{selectedQuote.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => {
                                    const projectFeatures = features.filter(f => f.projectId === proj.id || f.projectName === proj.name);
                                    const compName = selectedQuote.companyName || "Speshway_Solutions";
                                    triggerDirectPdfDownload(pdfHtml, `${compName}_${projName}_${selectedQuote.projectType || "Quotation"}.pdf`, compName);
                                  }}
                                  variant="secondary"
                                  size="sm"
                                  className="text-xs font-bold bg-[#0E9F8A] text-white hover:bg-teal-600 border-0"
                                >
                                  <Download size={14} /> Download PDF
                                </Button>
                                <button
                                  onClick={() => setIsFullScreenPdf(false)}
                                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700"
                                >
                                  <Minimize2 size={14} /> Close Full Screen
                                </button>
                              </div>
                            </div>
                            <div className="flex-1 bg-white rounded-xl border border-slate-800 overflow-hidden">
                              <iframe
                                srcDoc={pdfHtml}
                                className="w-full h-full border-0"
                                title="Full Screen Proposal Document Viewer"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </GlassCard>
          </div>
        )
      })}

      {/* 1. Modal: Create Client Profile */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Create Client Profile</h3>
              <button onClick={() => setShowClientModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateClient} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client / Contact Name *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Ramesh Kumar"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Company / Organization *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. TechCorp Solutions"
                    value={clientForm.company}
                    onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" required
                    placeholder="ramesh@techcorp.com"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Phone / WhatsApp Number *</label>
                  <input 
                    type="text" required
                    placeholder="+91 98765 43210"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Industry Sector</label>
                  <input 
                    type="text"
                    placeholder="e.g. Technology, Retail, Healthcare"
                    value={clientForm.industry}
                    onChange={(e) => setClientForm({ ...clientForm, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-extrabold text-emerald-800">Client Type *</label>
                  <select 
                    value={clientForm.type}
                    onChange={(e) => setClientForm({ ...clientForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-emerald-50/50 font-bold text-emerald-900"
                  >
                    <option value="Permanent">Permanent Client (Active Database)</option>
                    <option value="Potential">Potential Prospect</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Address / Location</label>
                <input 
                  type="text"
                  placeholder="e.g. Bangalore, Karnataka"
                  value={clientForm.address}
                  onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client Notes & Requirements</label>
                <textarea 
                  rows={2}
                  placeholder="Key account notes or project objectives..."
                  value={clientForm.notes}
                  onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2 bg-[#0E9F8A] hover:bg-teal-600 font-bold">
                Save & Create Client Profile
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 2. Modal: Log Call */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Log Client Call</h3>
              <button onClick={() => setShowCallModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleLogCall} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Select Client *</label>
                <select 
                  required
                  value={callForm.clientId}
                  onChange={(e) => setCallForm({ ...callForm, clientId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                >
                  <option value="">-- Choose Client Profile --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Call Type *</label>
                  <select 
                    value={callForm.type}
                    onChange={(e) => setCallForm({ ...callForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Incoming">Incoming</option>
                    <option value="Outgoing">Outgoing</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Sales call">Sales call</option>
                    <option value="Support call">Support call</option>
                    <option value="Project discussion">Project discussion</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Call Status *</label>
                  <select 
                    value={callForm.status}
                    onChange={(e) => setCallForm({ ...callForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Connected">Connected</option>
                    <option value="Not answered">Not answered</option>
                    <option value="Busy">Busy</option>
                    <option value="Switched off">Switched off</option>
                    <option value="Call back later">Call back later</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Call Purpose *</label>
                <input 
                  type="text" required
                  placeholder="e.g. negotiation review, pricing audit"
                  value={callForm.purpose}
                  onChange={(e) => setCallForm({ ...callForm, purpose: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Discussion Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Summary of notes discussed..."
                  value={callForm.notes}
                  onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Next Action Required</label>
                <input 
                  type="text"
                  placeholder="e.g. send proposal details"
                  value={callForm.nextAction}
                  onChange={(e) => setCallForm({ ...callForm, nextAction: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2">
                Log Call Outcomes
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 3. Modal: Create Lead */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-[#071E34] text-lg tracking-tight">New Lead</h3>
                <p className="text-xs text-gray-400 mt-0.5">Add a prospect to your pipeline</p>
              </div>
              <button 
                onClick={() => setShowLeadModal(false)} 
                className="text-gray-400 hover:text-gray-700 text-xl font-semibold transition-colors"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} className="flex flex-col gap-3.5 text-xs text-gray-700">
              {/* Contact Name */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Contact Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Jane Doe"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                />
              </div>

              {/* Company & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Company</label>
                  <input 
                    type="text"
                    placeholder="Company name"
                    value={leadForm.companyName}
                    onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Phone</label>
                  <input 
                    type="text"
                    placeholder="Phone"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Email</label>
                <input 
                  type="email"
                  placeholder="email@example.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                />
              </div>

              {/* Source & Estimated Value */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Source</label>
                  <select 
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="Other">Other</option>
                    <option value="Website">Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone call">Phone call</option>
                    <option value="Referral">Referral</option>
                    <option value="Direct enquiry">Direct enquiry</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Estimated Value</label>
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={leadForm.expectedBudget || ""}
                    onChange={(e) => setLeadForm({ ...leadForm, expectedBudget: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-mono font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                  />
                </div>
              </div>

              {/* Stage & Assign To */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Stage</label>
                  <select 
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Assign To</label>
                  <select 
                    value={leadForm.assignedEmployee}
                    onChange={(e) => setLeadForm({ ...leadForm, assignedEmployee: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="Unassigned">Unassigned</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Follow-up Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Follow-up Date</label>
                  <input 
                    type="date"
                    value={leadForm.nextFollowUpDate}
                    onChange={(e) => setLeadForm({ ...leadForm, nextFollowUpDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 bg-gray-50/30 focus:bg-white"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 mt-2">
                <button 
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all duration-200 ease-out"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl font-bold shadow-xs hover:shadow-md transition-all duration-200 ease-out"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal: Create / Edit Project */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">
                {editingProject ? "Edit Client Project Profile" : "Setup Client Project"}
              </h3>
              <button 
                onClick={() => {
                  setShowProjectModal(false);
                  setEditingProject(null);
                  setProjectForm({ name: "", clientName: "", category: "Custom Development", manager: "Nisha Rao", budget: 0, priority: "Medium", description: "" });
                }} 
                className="text-gray-400 hover:text-[#071E34] text-lg"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Project Name *</label>
                <input 
                  type="text" required
                  placeholder="Enter project workflow name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Select Client *</label>
                  <select 
                    required
                    value={projectForm.clientName}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  >
                    <option value="">-- Choose Client Profile --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.company}>{c.company}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Category / Industry</label>
                  <input 
                    type="text"
                    placeholder="Custom Development"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Assigned Budget (INR ₹) *</label>
                  <input 
                    type="number" required
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Priority Level *</label>
                  <select 
                    value={projectForm.priority}
                    onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Project Scope Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Outline feature specifications and timeline conditions..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  type="button" 
                  onClick={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    setProjectForm({ name: "", clientName: "", category: "Custom Development", manager: "Nisha Rao", budget: 0, priority: "Medium", description: "" });
                  }} 
                  variant="secondary" 
                  size="sm"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingProject ? "Update Client Project" : "Initialize Client Project"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 5. Modal: Create / Edit Quotation Proposal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2.5 shrink-0">
              <div>
                <h3 className="font-heading font-extrabold text-[#071E34] text-base">
                  {editingQuote ? "Edit Proposal Document & Plan Comparison" : "Generate Quotation Proposal"}
                </h3>
                <span className="text-[10px] text-purple-700 font-medium block">Configure document overview narrative, user roles, plan comparison matrix & terms.</span>
              </div>
              <button onClick={() => { setShowQuoteModal(false); setEditingQuote(null); }} className="text-gray-400 hover:text-[#071E34] text-lg font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleCreateQuotation} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Quotation Title *</label>
                <input 
                  type="text" required
                  placeholder="e.g. JoyEvents Custom Quotation Proposal"
                  value={quoteForm.title}
                  onChange={(e) => setQuoteForm({ ...quoteForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client Name / Sponsor *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. JoyEvents / Speshway"
                    value={quoteForm.clientName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Project Name *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. JoyEvents"
                    value={quoteForm.projectName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 5. PLAN COMPARISON MATRIX DELIVERABLES */}
              <div className="flex flex-col gap-2.5 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                    <span>5. Plan Comparison Matrix Deliverables *</span>
                  </span>
                  <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">PDF Page 3</span>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add new deliverable item (e.g. Multi-Currency Support)..."
                    value={newComparisonDeliverableText}
                    onChange={e => setNewComparisonDeliverableText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newComparisonDeliverableText.trim()) {
                          setQuotePlanComparisonItems(prev => [
                            ...prev, 
                            { deliverable: newComparisonDeliverableText.trim(), planA: true, planB: true }
                          ]);
                          setNewComparisonDeliverableText("");
                        }
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-purple-500 text-xs"
                  />
                  <Button 
                    type="button" 
                    onClick={() => {
                      if (newComparisonDeliverableText.trim()) {
                        setQuotePlanComparisonItems(prev => [
                          ...prev, 
                          { deliverable: newComparisonDeliverableText.trim(), planA: true, planB: true }
                        ]);
                        setNewComparisonDeliverableText("");
                      }
                    }} 
                    variant="secondary" 
                    size="sm" 
                    className="text-[10px] py-1.5 px-3 flex items-center gap-1 border border-purple-200 text-purple-800 bg-purple-100 font-bold shrink-0"
                  >
                    <Plus size={12} /> Add Deliverable
                  </Button>
                </div>

                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                  {quotePlanComparisonItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-purple-150 text-xs shadow-xs">
                      <input 
                        type="text" 
                        value={item.deliverable} 
                        onChange={e => {
                          const val = e.target.value;
                          setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, deliverable: val } : it));
                        }}
                        className="flex-1 font-semibold text-gray-800 border-b border-dashed border-gray-300 focus:outline-none focus:border-purple-600 px-1 py-0.5 text-xs bg-transparent"
                      />
                      <div className="flex items-center gap-4 shrink-0">
                        <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={item.planA !== false} 
                            onChange={e => {
                              const checked = e.target.checked;
                              setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, planA: checked } : it));
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span>Plan A (Web)</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-[10px] font-bold text-purple-800 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={item.planB !== false} 
                            onChange={e => {
                              const checked = e.target.checked;
                              setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, planB: checked } : it));
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span>Plan B (Web+App)</span>
                        </label>
                        {quotePlanComparisonItems.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => setQuotePlanComparisonItems(prev => prev.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Currency *</label>
                  <select 
                    value={(quoteForm as any).currency || "Indian Rupees (INR)"}
                    onChange={(e) => setQuoteForm({ ...quoteForm, currency: e.target.value } as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-semibold"
                  >
                    <option value="Indian Rupees (INR ₹)">Indian Rupees (INR ₹)</option>
                    <option value="US Dollars (USD $)">US Dollars (USD $)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Plan A Valuation (Without WebSockets) *</label>
                  <input 
                    type="number" required
                    placeholder="e.g. 50000"
                    value={(quoteForm as any).planAPrice || 50000}
                    onChange={(e) => setQuoteForm({ ...quoteForm, planAPrice: Number(e.target.value) } as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Plan B Valuation (With WebSockets) *</label>
                  <input 
                    type="number" required
                    placeholder="e.g. 65000"
                    value={(quoteForm as any).planBPrice || 65000}
                    onChange={(e) => setQuoteForm({ ...quoteForm, planBPrice: Number(e.target.value) } as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono font-semibold text-purple-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Discount (%)</label>
                  <input 
                    type="number"
                    value={quoteForm.discount}
                    onChange={(e) => setQuoteForm({ ...quoteForm, discount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tax GST (%)</label>
                  <input 
                    type="number"
                    value={quoteForm.tax}
                    onChange={(e) => setQuoteForm({ ...quoteForm, tax: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Valid Until</label>
                  <input 
                    type="date"
                    value={quoteForm.validUntil}
                    onChange={(e) => setQuoteForm({ ...quoteForm, validUntil: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* PDF REPORT SECTION 1: PROJECT OVERVIEW NARRATIVE */}
              <div className="flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border">
                <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <span>1. Project Overview Narrative (PDF Page 1)</span>
                </span>
                <div className="flex flex-col gap-1">
                  <textarea
                    rows={3}
                    placeholder="Outline comprehensive project overview narrative for PDF proposal..."
                    value={(quoteForm as any).overviewNarrative || ""}
                    onChange={e => setQuoteForm({ ...quoteForm, overviewNarrative: e.target.value } as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"
                  />
                </div>
              </div>

              {/* PDF REPORT SECTION 2: USER ROLES & ACCESS SCOPE */}
              <div className="flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border">
                <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <span>2. User Roles & Access Scope (PDF Page 1)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Customer / Buyer Role</label>
                    <textarea
                      rows={2}
                      placeholder="Customer role specifications..."
                      value={(quoteForm as any).customerDesc || ""}
                      onChange={e => setQuoteForm({ ...quoteForm, customerDesc: e.target.value } as any)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Merchant / Vendor Role</label>
                    <textarea
                      rows={2}
                      placeholder="Merchant role specifications..."
                      value={(quoteForm as any).merchantDesc || ""}
                      onChange={e => setQuoteForm({ ...quoteForm, merchantDesc: e.target.value } as any)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Admin Governance Role</label>
                    <textarea
                      rows={2}
                      placeholder="Admin governance specifications..."
                      value={(quoteForm as any).adminDesc || ""}
                      onChange={e => setQuoteForm({ ...quoteForm, adminDesc: e.target.value } as any)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* PDF REPORT SECTION 6 & 7: PAYMENT TERMS & TERMS AND CONDITIONS */}
              <div className="flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border">
                <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <span>6 & 7. Payment Terms & Terms & Conditions (PDF Page 4)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">6. Payment Terms</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 40% advance on project kick-off&#10;30% on completion of core module&#10;30% on final delivery"
                      value={(quoteForm as any).paymentTerms || ""}
                      onChange={e => setQuoteForm({ ...quoteForm, paymentTerms: e.target.value } as any)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">7. Terms & Conditions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Estimation is valid for 30 days.&#10;Includes 30 days complimentary bug-fix support.&#10;Source code handed over upon full payment."
                      value={(quoteForm as any).termsAndConditions || ""}
                      onChange={e => setQuoteForm({ ...quoteForm, termsAndConditions: e.target.value } as any)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 mt-2 shrink-0">
                <Button type="submit" variant="primary" className="w-full py-2.5 shadow-md bg-purple-900 text-white font-bold hover:bg-purple-950">
                  {editingQuote ? "Save & Update Proposal Settings" : "Save & Add Proposal Settings"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 6. Modal: Add / Edit Project Feature */}
      {showFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md max-h-[90vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">
                {editingFeature ? "Edit Project Feature" : "Add Project Feature"}
              </h3>
              <button onClick={() => { setShowFeatureModal(false); setEditingFeature(null); }} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateFeature} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Feature Title / Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. AI Content Generation Engine"
                  value={featureForm.title}
                  onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-semibold text-xs text-[#071E34]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Feature Description & Scope</label>
                <textarea 
                  rows={3}
                  placeholder="Outline feature specifications, description and scope details..."
                  value={featureForm.description}
                  onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-medium text-xs text-gray-700 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button type="button" onClick={() => { setShowFeatureModal(false); setEditingFeature(null); }} variant="secondary" size="sm">Cancel</Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingFeature ? "Update Feature" : "Add Feature"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 7. Modal: Propose Innovation */}
      {showInnovationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Propose Project Innovation</h3>
              <button onClick={() => setShowInnovationModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateInnovation} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Innovation Title *</label>
                <input 
                  type="text" required
                  placeholder="e.g. AI-assisted shipping automation"
                  value={innovationForm.title}
                  onChange={(e) => setInnovationForm({ ...innovationForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Business Benefit *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Cuts workflow lag by 40%"
                    value={innovationForm.businessBenefit}
                    onChange={(e) => setInnovationForm({ ...innovationForm, businessBenefit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Technical Benefit *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Redundant server cleanup"
                    value={innovationForm.technicalBenefit}
                    onChange={(e) => setInnovationForm({ ...innovationForm, technicalBenefit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Estimated Cost (INR ₹) *</label>
                <input 
                  type="number" required
                  value={innovationForm.estimatedCost}
                  onChange={(e) => setInnovationForm({ ...innovationForm, estimatedCost: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Description of Idea</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Outline solution benefits and technical scopes..."
                  value={innovationForm.description}
                  onChange={(e) => setInnovationForm({ ...innovationForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2">
                Log Proposal
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 8. Modal: Create Invoice */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Generate New Invoice</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateInvoice} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Vanguard Retail Inc"
                  value={invoiceForm.clientName}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Invoice Amount ($) *</label>
                  <input 
                    type="number" required
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Due Date</label>
                  <input 
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Generate Invoice & Save to DB
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 9. Modal: Log Payment */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Log Payment Record</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreatePayment} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Client Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. AeroSpace Logistics"
                  value={paymentForm.clientName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Payment Amount ($) *</label>
                  <input 
                    type="number" required
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Gateway / Method</label>
                  <select 
                    value={paymentForm.gateway}
                    onChange={(e) => setPaymentForm({ ...paymentForm, gateway: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Log Payment & Save to DB
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 10. Modal: Add Expense */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Add Expense Item</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateExpense} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Expense Title *</label>
                <input 
                  type="text" required
                  placeholder="e.g. AWS Cloud Server Hosting"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Value ($) *</label>
                  <input 
                    type="number" required
                    value={expenseForm.value}
                    onChange={(e) => setExpenseForm({ ...expenseForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
                  <select 
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Software Retainer">Software Retainer</option>
                    <option value="Marketing & Outreach">Marketing & Outreach</option>
                    <option value="Office Operations">Office Operations</option>
                  </select>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Add Expense Item
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 11. Modal: Add Employee Profile */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Add Employee Profile</h3>
              <button onClick={() => setShowEmployeeModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateEmployee} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Nisha Rao"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Job Role *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Sales Executive Lead"
                    value={employeeForm.role}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                  <input 
                    type="text"
                    placeholder="e.g. Corporate CRM"
                    value={employeeForm.dept}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, dept: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Add Employee Profile
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 12. Modal: Create Department Team */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Create Department Team</h3>
              <button onClick={() => setShowTeamModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateTeam} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Enterprise Delivery Team"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Lead Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Nisha Rao"
                  value={teamForm.lead}
                  onChange={(e) => setTeamForm({ ...teamForm, lead: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Members List</label>
                <input 
                  type="text"
                  placeholder="e.g. Nisha R, Karan J, Sophia W"
                  value={teamForm.members}
                  onChange={(e) => setTeamForm({ ...teamForm, members: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Create Team & Save to DB
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 10. Modal: Add Expense */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Add Expense Item</h3>
              <button onClick={() => setShowExpenseModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateExpense} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Expense Title *</label>
                <input 
                  type="text" required
                  placeholder="e.g. AWS Cloud Server Hosting"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Value ($) *</label>
                  <input 
                    type="number" required
                    value={expenseForm.value}
                    onChange={(e) => setExpenseForm({ ...expenseForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
                  <select 
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Software Retainer">Software Retainer</option>
                    <option value="Marketing & Outreach">Marketing & Outreach</option>
                    <option value="Office Operations">Office Operations</option>
                  </select>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Add Expense Item
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 11. Modal: Add Employee Profile */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Add Employee Profile</h3>
              <button onClick={() => setShowEmployeeModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateEmployee} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Nisha Rao"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Job Role *</label>
                  <input 
                    type="text" required
                    placeholder="e.g. Sales Executive Lead"
                    value={employeeForm.role}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                  <input 
                    type="text"
                    placeholder="e.g. Corporate CRM"
                    value={employeeForm.dept}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, dept: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Add Employee Profile
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 12. Modal: Create Department Team */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="font-heading font-extrabold text-[#071E34] text-base">Create Department Team</h3>
              <button onClick={() => setShowTeamModal(false)} className="text-gray-400 hover:text-[#071E34] text-lg">&times;</button>
            </div>
            
            <form onSubmit={handleCreateTeam} className="flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Enterprise Delivery Team"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Lead Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Nisha Rao"
                  value={teamForm.lead}
                  onChange={(e) => setTeamForm({ ...teamForm, lead: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Team Members List</label>
                <input 
                  type="text"
                  placeholder="e.g. Nisha R, Karan J, Sophia W"
                  value={teamForm.members}
                  onChange={(e) => setTeamForm({ ...teamForm, members: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Create Team & Save to DB
              </Button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 13. Modal: Client Live PDF Preview */}
      {clientPdfPreviewModal && (
        <div className={`fixed inset-0 z-[80] flex items-center justify-center bg-[#071E34]/55 backdrop-blur-sm ${isFullScreenPdf ? 'p-0' : 'p-4'} overflow-y-auto`}>
          <div className={`w-full bg-white border border-gray-200 shadow-2xl flex flex-col transition-all duration-300 ${
            isFullScreenPdf 
              ? 'w-full max-w-none h-full min-h-screen rounded-none my-0' 
              : 'max-w-5xl h-[min(92vh,900px)] max-h-[92vh] rounded-3xl my-auto'
          } overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
            <div className="flex shrink-0 justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-sm text-[#071E34]">{clientPdfPreviewModal.title}</h3>
                <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">FULL PAGE PREVIEW</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullScreenPdf(!isFullScreenPdf)}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 text-[#071E34] border border-gray-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ease-out cursor-pointer shadow-3xs"
                  title={isFullScreenPdf ? "Exit Full Page View" : "Expand to Full Page View"}
                >
                  {isFullScreenPdf ? <Minimize2 size={13} className="text-teal-600" /> : <Maximize2 size={13} className="text-teal-600" />}
                  <span>{isFullScreenPdf ? "Exit Full Page" : "Full Page View"}</span>
                </button>
                <button
                  onClick={() => {
                    const globalBranding = getGlobalCompanyDetails();
                    setEditingClientDoc({
                      type: clientPdfPreviewModal.title.toLowerCase().includes("agreement") ? "agreement" : (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                      item: clientPdfPreviewModal.item,
                      refNumber: clientPdfPreviewModal.item?.number || clientPdfPreviewModal.item?.id || "QT-REF-1001",
                      issueDate: clientPdfPreviewModal.item?.date || clientPdfPreviewModal.item?.createdDate || "28 July, 2026",
                      clientName: clientPdfPreviewModal.item?.clientName || activeClientDetail?.name || "Internal Enterprise",
                      clientEmail: clientPdfPreviewModal.item?.clientEmail || activeClientDetail?.email || "naveenkumar970100@gmail.com",
                      productName: clientPdfPreviewModal.item?.productName || clientPdfPreviewModal.item?.projectName || clientPdfPreviewModal.item?.title || "Software Project Application",
                      category: clientPdfPreviewModal.item?.category || clientPdfPreviewModal.item?.projectType || "Website Application",
                      overviewNarrative: clientPdfPreviewModal.item?.overviewNarrative || clientPdfPreviewModal.item?.description || "Full-stack responsive application development and delivery.",
                      rate: Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000),
                      taxPct: Number(clientPdfPreviewModal.item?.taxPct !== undefined ? clientPdfPreviewModal.item.taxPct : 18),
                      totalDue: Number(clientPdfPreviewModal.item?.totalDue || Math.round(Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000) * 1.18)),
                      paymentTerms: clientPdfPreviewModal.item?.paymentTerms || "50% Advance upon signing proposal, 50% upon deployment.",
                      customFeatures: clientPdfPreviewModal.item?.customFeatures || clientPdfPreviewModal.item?.features || [
                        { title: "Responsive Web Portal & Cloud Architecture", description: "Modern React & Next.js web application optimized for mobile and desktop." },
                        { title: "Secure Payment Gateway Integration", description: "Razorpay / Stripe integration with instant automated tax receipt generation." },
                        { title: "Real-time Push Notifications & Audit Log", description: "Instant status updates, SMS alerts, and database activity tracking." },
                        { title: "Admin Management & Customer Dashboard", description: "Comprehensive reporting analytics, user roles, and order tracking." }
                      ],
                      companyName: clientPdfPreviewModal.item?.companyName || clientPdfPreviewModal.item?.billedByCompany || globalBranding.billedByCompany || globalBranding.companyName || "Speshway Solutions Private Limited",
                      companyTagline: clientPdfPreviewModal.item?.companyTagline || clientPdfPreviewModal.item?.companyHeaderSub || globalBranding.companyTagline || globalBranding.billedBySub || "Software Development Company",
                      companyAddress: clientPdfPreviewModal.item?.companyAddress || clientPdfPreviewModal.item?.billedByAddress || globalBranding.companyAddress || globalBranding.billedByAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                      companyEmail: clientPdfPreviewModal.item?.companyEmail || globalBranding.companyEmail || "info@speshway.com",
                      companyPhone: clientPdfPreviewModal.item?.companyPhone || globalBranding.companyPhone || "+91 91000 06020",
                      companyWebsite: clientPdfPreviewModal.item?.companyWebsite || globalBranding.companyWebsite || "www.speshway.com",
                      companyFooterName: clientPdfPreviewModal.item?.companyFooterName || clientPdfPreviewModal.item?.companyName || clientPdfPreviewModal.item?.billedByCompany || globalBranding.companyFooterName || globalBranding.billedByCompany || "Speshway Solutions Private Limited",
                      companyFooterAddress: clientPdfPreviewModal.item?.companyFooterAddress || clientPdfPreviewModal.item?.companyAddress || clientPdfPreviewModal.item?.billedByAddress || globalBranding.companyFooterAddress || globalBranding.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                      companyFooterContact: clientPdfPreviewModal.item?.companyFooterContact || globalBranding.companyFooterContact || `${clientPdfPreviewModal.item?.companyWebsite || "www.speshway.com"} - ${clientPdfPreviewModal.item?.companyEmail || "info@speshway.com"} - ${clientPdfPreviewModal.item?.companyPhone || "+91 91000 06020"}`,
                      pdfFooterTheme: clientPdfPreviewModal.item?.pdfFooterTheme || globalBranding.pdfFooterTheme || "dark",
                      pdfPrimaryColor: clientPdfPreviewModal.item?.pdfPrimaryColor || globalBranding.pdfPrimaryColor || "#5D3ADF",
                      pdfSecondaryColor: clientPdfPreviewModal.item?.pdfSecondaryColor || globalBranding.pdfSecondaryColor || "#B8F7A1",
                      companyLogoUrl: clientPdfPreviewModal.item?.companyLogoUrl || clientPdfPreviewModal.item?.logoUrl || globalBranding.companyLogoUrl || "",
                      companyLogoSize: Number(clientPdfPreviewModal.item?.companyLogoSize || clientPdfPreviewModal.item?.logoSize || globalBranding.companyLogoSize || 40),
                      showWatermark: clientPdfPreviewModal.item?.showWatermark !== undefined ? Boolean(clientPdfPreviewModal.item.showWatermark) : (globalBranding.showWatermark !== undefined ? Boolean(globalBranding.showWatermark) : true),
                      companyWatermarkText: clientPdfPreviewModal.item?.companyWatermarkText || globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                      companyWatermarkUrl: clientPdfPreviewModal.item?.companyWatermarkUrl || globalBranding.companyWatermarkUrl || "",
                      companyWatermarkOpacity: clientPdfPreviewModal.item?.companyWatermarkOpacity !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkOpacity) : (globalBranding.companyWatermarkOpacity !== undefined ? Number(globalBranding.companyWatermarkOpacity) : 0.08),
                      companyWatermarkRotation: clientPdfPreviewModal.item?.companyWatermarkRotation !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkRotation) : (globalBranding.companyWatermarkRotation !== undefined ? Number(globalBranding.companyWatermarkRotation) : -15),
                      companyWatermarkSize: clientPdfPreviewModal.item?.companyWatermarkSize !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkSize) : (globalBranding.companyWatermarkSize !== undefined ? Number(globalBranding.companyWatermarkSize) : 26),
                      companyWatermarkImgSize: Number(clientPdfPreviewModal.item?.companyWatermarkImgSize || clientPdfPreviewModal.item?.watermarkImgSize || globalBranding.companyWatermarkImgSize || 220),
                      customerDesc: clientPdfPreviewModal.item?.customerDesc || "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.",
                      merchantDesc: clientPdfPreviewModal.item?.merchantDesc || "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.",
                      adminDesc: clientPdfPreviewModal.item?.adminDesc || "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe.",
                      planAName: clientPdfPreviewModal.item?.planAName || "Standard App Package",
                      planBName: clientPdfPreviewModal.item?.planBName || "Enterprise Premium Package",
                      planBPrice: Number(clientPdfPreviewModal.item?.planBPrice || Math.round((Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000)) * 1.4)),
                      includePlanB: clientPdfPreviewModal.item?.includePlanB !== false && clientPdfPreviewModal.item?.enablePlanB !== false,
                      sec4Subtitle: clientPdfPreviewModal.item?.sec4Subtitle || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
                      planAHighlights: typeof clientPdfPreviewModal.item?.planAHighlights === "string" ? clientPdfPreviewModal.item.planAHighlights : (Array.isArray(clientPdfPreviewModal.item?.planAHighlights) ? clientPdfPreviewModal.item.planAHighlights.join("\n") : "Responsive web application (Customer, Merchant & Admin portals)\nAll core features from Section 3\nSecure payment gateway integration (Card / UPI)\nQR-based ticket check-in (web scanner)\nAdmin & Merchant dashboards\nCross-browser, mobile-responsive UI\nBasic SEO setup & deployment"),
                      planBHighlights: typeof clientPdfPreviewModal.item?.planBHighlights === "string" ? clientPdfPreviewModal.item.planBHighlights : (Array.isArray(clientPdfPreviewModal.item?.planBHighlights) ? clientPdfPreviewModal.item.planBHighlights.join("\n") : "Everything in Plan A, plus:\nNative/hybrid mobile apps for Customer & Merchant (Android + iOS)\nPush notifications for promotions & alerts\nIn-app QR scanner for on-site check-in\nMobile-optimized chat & booking flow\nApp Store & Play Store submission support"),
                      planComparisonItems: clientPdfPreviewModal.item?.planComparisonItems || [
                        { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                        { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                        { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                        { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                        { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                        { deliverable: "Push Notifications", planA: false, planB: true },
                        { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                      ],
                      termsAndConditions: clientPdfPreviewModal.item?.termsAndConditions || "Estimation is valid for 30 days from the date of this document.\nTimeline: Plan A — approx. 6–8 weeks; Plan B — approx. 10–12 weeks from kick-off.\nCost excludes third-party charges such as payment gateway fees, SMS/email fees.\nIncludes 30 days of complimentary post-launch bug-fix support.",
                      inclusions: clientPdfPreviewModal.item?.inclusions || clientPdfPreviewModal.item?.scopeInclusions || "Full source code and deployment credentials handover upon final settlement.\nComplimentary 30-day post-deployment bug-fix technical support.\nProduction server deployment, SSL configuration & DNS domain mapping.",
                      exclusions: clientPdfPreviewModal.item?.exclusions || clientPdfPreviewModal.item?.scopeExclusions || "Third-party API charges (SMS, WhatsApp API, Payment Gateway fees).\nGoogle Play ($25) & Apple Developer ($99/year) console registration fees.\nContent copywriting, stock video/image purchasing.",
                      accountName: clientPdfPreviewModal.item?.accountName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                      accountNumber: clientPdfPreviewModal.item?.accountNumber || "018326900000850",
                      ifscCode: clientPdfPreviewModal.item?.ifscCode || "YESB0000183",
                      branch: clientPdfPreviewModal.item?.branch || "HITECH CITY",
                      invoiceDescription: clientPdfPreviewModal.item?.description || `${clientPdfPreviewModal.item?.productName || clientPdfPreviewModal.item?.projectName || "Software Project"} Web & Mobile Application`,
                      invoiceSubdesc: clientPdfPreviewModal.item?.subdesc || `Design, development & delivery of web and mobile applications for the product, provided to ${clientPdfPreviewModal.item?.clientName || "Client"}`
                    });
                  }}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#071E34] border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ease-out"
                >
                  <Edit3 size={13} /> Edit Document for Client
                </button>
                <button
                  onClick={() => setClientPdfPreviewModal(null)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 bg-slate-900 p-4 flex justify-center items-center overflow-hidden">
              <iframe
                srcDoc={clientPdfPreviewModal.html}
                className="w-full h-full border border-gray-800 rounded-2xl bg-slate-900 shadow-inner"
                title="Client Document Preview"
              />
            </div>

            <div className="shrink-0 p-4 border-t border-gray-200 flex justify-between items-center bg-white flex-wrap gap-2">
              <button
                onClick={() => setClientPdfPreviewModal(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingClientDoc({
                    type: clientPdfPreviewModal.title.toLowerCase().includes("agreement") ? "agreement" : (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                    item: clientPdfPreviewModal.item,
                    refNumber: clientPdfPreviewModal.item?.number || clientPdfPreviewModal.item?.id || "QT-REF-1001",
                    issueDate: clientPdfPreviewModal.item?.date || clientPdfPreviewModal.item?.createdDate || "28 July, 2026",
                    clientName: clientPdfPreviewModal.item?.clientName || activeClientDetail?.name || "Internal Enterprise",
                    clientEmail: clientPdfPreviewModal.item?.clientEmail || activeClientDetail?.email || "naveenkumar970100@gmail.com",
                    productName: clientPdfPreviewModal.item?.productName || clientPdfPreviewModal.item?.projectName || clientPdfPreviewModal.item?.title || "Software Project Application",
                    category: clientPdfPreviewModal.item?.category || clientPdfPreviewModal.item?.projectType || "Website Application",
                    overviewNarrative: clientPdfPreviewModal.item?.overviewNarrative || clientPdfPreviewModal.item?.description || "Full-stack responsive application development and delivery.",
                    rate: Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000),
                    taxPct: Number(clientPdfPreviewModal.item?.taxPct !== undefined ? clientPdfPreviewModal.item.taxPct : 18),
                    totalDue: Number(clientPdfPreviewModal.item?.totalDue || Math.round(Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000) * 1.18)),
                    paymentTerms: clientPdfPreviewModal.item?.paymentTerms || "50% Advance upon signing proposal, 50% upon deployment.",
                    customFeatures: clientPdfPreviewModal.item?.customFeatures || clientPdfPreviewModal.item?.features || [
                      { title: "Responsive Web Portal & Cloud Architecture", description: "Modern React & Next.js web application optimized for mobile and desktop." },
                      { title: "Secure Payment Gateway Integration", description: "Razorpay / Stripe integration with instant automated tax receipt generation." },
                      { title: "Real-time Push Notifications & Audit Log", description: "Instant status updates, SMS alerts, and database activity tracking." },
                      { title: "Admin Management & Customer Dashboard", description: "Comprehensive reporting analytics, user roles, and order tracking." }
                    ],
                    companyName: clientPdfPreviewModal.item?.companyName || clientPdfPreviewModal.item?.billedByCompany || "Speshway Solutions Private Limited",
                    companyTagline: clientPdfPreviewModal.item?.companyTagline || clientPdfPreviewModal.item?.companyHeaderSub || "Software Development Company",
                    companyAddress: clientPdfPreviewModal.item?.companyAddress || clientPdfPreviewModal.item?.billedByAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                    companyEmail: clientPdfPreviewModal.item?.companyEmail || "info@speshway.com",
                    companyPhone: clientPdfPreviewModal.item?.companyPhone || "+91 91000 06020",
                    companyWebsite: clientPdfPreviewModal.item?.companyWebsite || "www.speshway.com",
                    companyFooterName: clientPdfPreviewModal.item?.companyFooterName || clientPdfPreviewModal.item?.companyName || clientPdfPreviewModal.item?.billedByCompany || "Speshway Solutions Private Limited",
                    companyFooterAddress: clientPdfPreviewModal.item?.companyFooterAddress || clientPdfPreviewModal.item?.companyAddress || clientPdfPreviewModal.item?.billedByAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                    companyFooterContact: clientPdfPreviewModal.item?.companyFooterContact || `${clientPdfPreviewModal.item?.companyWebsite || "www.speshway.com"} - ${clientPdfPreviewModal.item?.companyEmail || "info@speshway.com"} - ${clientPdfPreviewModal.item?.companyPhone || "+91 91000 06020"}`,
                    pdfFooterTheme: clientPdfPreviewModal.item?.pdfFooterTheme || "dark",
                    pdfPrimaryColor: clientPdfPreviewModal.item?.pdfPrimaryColor || (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "#003b8e" : "#4c1d95"),
                    pdfSecondaryColor: clientPdfPreviewModal.item?.pdfSecondaryColor || (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "#d97706" : "#7c3aed"),
                    companyLogoUrl: clientPdfPreviewModal.item?.companyLogoUrl || clientPdfPreviewModal.item?.logoUrl || "",
                    companyLogoSize: Number(clientPdfPreviewModal.item?.companyLogoSize || clientPdfPreviewModal.item?.logoSize || 40),
                    showWatermark: clientPdfPreviewModal.item?.showWatermark !== undefined ? Boolean(clientPdfPreviewModal.item.showWatermark) : true,
                    companyWatermarkText: clientPdfPreviewModal.item?.companyWatermarkText || clientPdfPreviewModal.item?.companyName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                    companyWatermarkUrl: clientPdfPreviewModal.item?.companyWatermarkUrl || "",
                    companyWatermarkOpacity: clientPdfPreviewModal.item?.companyWatermarkOpacity !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkOpacity) : 0.08,
                    companyWatermarkRotation: clientPdfPreviewModal.item?.companyWatermarkRotation !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkRotation) : -15,
                    companyWatermarkSize: clientPdfPreviewModal.item?.companyWatermarkSize !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkSize) : 26,
                    companyWatermarkImgSize: Number(clientPdfPreviewModal.item?.companyWatermarkImgSize || clientPdfPreviewModal.item?.watermarkImgSize || 220),
                    customerDesc: clientPdfPreviewModal.item?.customerDesc || "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.",
                    merchantDesc: clientPdfPreviewModal.item?.merchantDesc || "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.",
                    adminDesc: clientPdfPreviewModal.item?.adminDesc || "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe.",
                    planAName: clientPdfPreviewModal.item?.planAName || "Standard App Package",
                    planBName: clientPdfPreviewModal.item?.planBName || "Enterprise Premium Package",
                    planBPrice: Number(clientPdfPreviewModal.item?.planBPrice || Math.round((Number(clientPdfPreviewModal.item?.rate || clientPdfPreviewModal.item?.planAPrice || 50000)) * 1.4)),
                    includePlanB: clientPdfPreviewModal.item?.includePlanB !== false && clientPdfPreviewModal.item?.enablePlanB !== false,
                    sec4Subtitle: clientPdfPreviewModal.item?.sec4Subtitle || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
                    planAHighlights: typeof clientPdfPreviewModal.item?.planAHighlights === "string" ? clientPdfPreviewModal.item.planAHighlights : (Array.isArray(clientPdfPreviewModal.item?.planAHighlights) ? clientPdfPreviewModal.item.planAHighlights.join("\n") : "Responsive web application (Customer, Merchant & Admin portals)\nAll core features from Section 3\nSecure payment gateway integration (Card / UPI)\nQR-based ticket check-in (web scanner)\nAdmin & Merchant dashboards\nCross-browser, mobile-responsive UI\nBasic SEO setup & deployment"),
                    planBHighlights: typeof clientPdfPreviewModal.item?.planBHighlights === "string" ? clientPdfPreviewModal.item.planBHighlights : (Array.isArray(clientPdfPreviewModal.item?.planBHighlights) ? clientPdfPreviewModal.item.planBHighlights.join("\n") : "Everything in Plan A, plus:\nNative/hybrid mobile apps for Customer & Merchant (Android + iOS)\nPush notifications for promotions & alerts\nIn-app QR scanner for on-site check-in\nMobile-optimized chat & booking flow\nApp Store & Play Store submission support"),
                    planComparisonItems: clientPdfPreviewModal.item?.planComparisonItems || [
                      { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                      { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                      { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                      { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                      { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                      { deliverable: "Push Notifications", planA: false, planB: true },
                      { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                    ],
                    termsAndConditions: clientPdfPreviewModal.item?.termsAndConditions || "Estimation is valid for 30 days from the date of this document.\nTimeline: Plan A — approx. 6–8 weeks; Plan B — approx. 10–12 weeks from kick-off.\nCost excludes third-party charges such as payment gateway fees, SMS/email fees.\nIncludes 30 days of complimentary post-launch bug-fix support.",
                    inclusions: clientPdfPreviewModal.item?.inclusions || clientPdfPreviewModal.item?.scopeInclusions || "Full source code and deployment credentials handover upon final settlement.\nComplimentary 30-day post-deployment bug-fix technical support.\nProduction server deployment, SSL configuration & DNS domain mapping.",
                    exclusions: clientPdfPreviewModal.item?.exclusions || clientPdfPreviewModal.item?.scopeExclusions || "Third-party API charges (SMS, WhatsApp API, Payment Gateway fees).\nGoogle Play ($25) & Apple Developer ($99/year) console registration fees.\nContent copywriting, stock video/image purchasing.",
                    accountName: clientPdfPreviewModal.item?.accountName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                    accountNumber: clientPdfPreviewModal.item?.accountNumber || "018326900000850",
                    ifscCode: clientPdfPreviewModal.item?.ifscCode || "YESB0000183",
                    branch: clientPdfPreviewModal.item?.branch || "HITECH CITY",
                    invoiceDescription: clientPdfPreviewModal.item?.description || `${clientPdfPreviewModal.item?.productName || clientPdfPreviewModal.item?.projectName || "Software Project"} Web & Mobile Application`,
                    invoiceSubdesc: clientPdfPreviewModal.item?.subdesc || `Design, development & delivery of web and mobile applications for the product, provided to ${clientPdfPreviewModal.item?.clientName || "Client"}`
                  })}
                  className="px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all duration-200 ease-out"
                >
                  <Edit3 size={14} /> Edit & Customise Document
                </button>

                <button
                  onClick={() => openPdfPrintPreview(clientPdfPreviewModal.html)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all duration-200 ease-out active:scale-95 cursor-pointer"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>

                <button
                  onClick={() => {
                    showToast("⚡ Preparing PDF download...", "info");
                    triggerDirectPdfDownload(clientPdfPreviewModal.html, `${clientPdfPreviewModal.title.replace(/[^a-zA-Z0-9]/gi, '_')}.pdf`);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all duration-200 ease-out active:scale-95 cursor-pointer"
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13b. Modal: Edit Client Document (Full-Page Split Studio: Left Edit Options & Right Live PDF Preview) */}
      {editingClientDoc && (() => {
        const liveStudioPreviewHtml = editingClientDoc.type === "agreement"
          ? generateSpeshwayAgreementPdfHtml({
              ...editingClientDoc.item,
              id: editingClientDoc.refNumber,
              number: editingClientDoc.refNumber,
              date: editingClientDoc.issueDate,
              clientName: editingClientDoc.clientName,
              clientEmail: editingClientDoc.clientEmail,
              clientAddress: editingClientDoc.companyAddress || "Hyderabad, Telangana",
              projectName: editingClientDoc.productName,
              duration: editingClientDoc.duration || "one (1) month",
              rate: editingClientDoc.rate,
              amount: editingClientDoc.rate,
              budget: editingClientDoc.rate,
              docTitle: editingClientDoc.docTitle,
              introduction: editingClientDoc.introduction,
              sec1Title: editingClientDoc.sec1Title,
              sec1Content: editingClientDoc.overviewNarrative || editingClientDoc.sec1Content,
              sec1Subsection1Title: editingClientDoc.sec1Subsection1Title,
              sec1Subsection1BulletText: editingClientDoc.sec1Subsection1BulletText,
              sec1Subsection2Title: editingClientDoc.sec1Subsection2Title,
              sec1Subsection2BulletText: editingClientDoc.sec1Subsection2BulletText,
              sec2Title: editingClientDoc.sec2Title,
              sec2Content: editingClientDoc.sec2Content,
              sec3Title: editingClientDoc.sec3Title,
              sec3Content: editingClientDoc.sec3Content,
              sec4Title: editingClientDoc.sec4Title,
              sec4Subsection1Title: editingClientDoc.sec4Subsection1Title,
              sec4Subsection1BulletText: editingClientDoc.sec4Subsection1BulletText,
              sec4Subsection2Title: editingClientDoc.sec4Subsection2Title,
              sec4Subsection2BulletText: editingClientDoc.sec4Subsection2BulletText,
              sec5Title: editingClientDoc.sec5Title,
              sec5Subsection1Title: editingClientDoc.sec5Subsection1Title,
              sec5Subsection1Content: editingClientDoc.sec5Subsection1Content,
              sec5Subsection2Title: editingClientDoc.sec5Subsection2Title,
              sec5Subsection2Content: editingClientDoc.sec5Subsection2Content,
              sec6Title: editingClientDoc.sec6Title,
              sec6Content: editingClientDoc.sec6Content,
              sec7Title: editingClientDoc.sec7Title,
              sec7Content: editingClientDoc.sec7Content,
              sec8Title: editingClientDoc.sec8Title,
              sec8Content: editingClientDoc.sec8Content,
              sec9Title: editingClientDoc.sec9Title,
              sec9Content: editingClientDoc.sec9Content,
              sec10Title: editingClientDoc.sec10Title,
              sec10BulletText: editingClientDoc.sec10BulletText,
              m1Pct: editingClientDoc.m1Pct !== undefined ? editingClientDoc.m1Pct : 40,
              m2Pct: editingClientDoc.m2Pct !== undefined ? editingClientDoc.m2Pct : 40,
              m3Pct: editingClientDoc.m3Pct !== undefined ? editingClientDoc.m3Pct : 20,
              billedByCompany: editingClientDoc.companyName,
              companyAddress: editingClientDoc.companyAddress,
              pdfPrimaryColor: editingClientDoc.pdfPrimaryColor,
              pdfSecondaryColor: editingClientDoc.pdfSecondaryColor,
              companyLogoUrl: editingClientDoc.companyLogoUrl,
              showWatermark: editingClientDoc.showWatermark,
              companyWatermarkText: editingClientDoc.companyWatermarkText,
              companyWatermarkUrl: editingClientDoc.companyWatermarkUrl,
              companyWatermarkOpacity: editingClientDoc.companyWatermarkOpacity,
              companyWatermarkRotation: editingClientDoc.companyWatermarkRotation,
              companyWatermarkSize: editingClientDoc.companyWatermarkSize,
              companyWatermarkImgSize: editingClientDoc.companyWatermarkImgSize
            }, null, 1.0)
          : editingClientDoc.type === "invoice"
          ? generateSpeshwayTaxInvoicePdfHtml({
              ...editingClientDoc.item,
              id: editingClientDoc.refNumber,
              number: editingClientDoc.refNumber,
              date: editingClientDoc.issueDate,
              clientName: editingClientDoc.clientName,
              clientEmail: editingClientDoc.clientEmail,
              productName: editingClientDoc.productName,
              description: editingClientDoc.invoiceDescription || `${editingClientDoc.productName} Web & Mobile Application`,
              subdesc: editingClientDoc.invoiceSubdesc || `Design, development & delivery of web and mobile applications for the ${editingClientDoc.productName} product, provided to ${editingClientDoc.clientName}`,
              rate: editingClientDoc.rate,
              amount: editingClientDoc.rate,
              taxPct: editingClientDoc.taxPct,
              totalDue: editingClientDoc.totalDue,
              paymentTerms: editingClientDoc.paymentTerms,
              companyName: editingClientDoc.companyName,
              billedByCompany: editingClientDoc.companyName,
              companyHeaderSub: editingClientDoc.companyTagline,
              billedBySub: editingClientDoc.companyTagline,
              companyTagline: editingClientDoc.companyTagline,
              companyAddress: editingClientDoc.companyAddress,
              billedByAddress: editingClientDoc.companyAddress,
              companyEmail: editingClientDoc.companyEmail,
              companyPhone: editingClientDoc.companyPhone,
              companyWebsite: editingClientDoc.companyWebsite,
              companyFooterName: editingClientDoc.companyFooterName,
              companyFooterAddress: editingClientDoc.companyFooterAddress,
              companyFooterContact: editingClientDoc.companyFooterContact,
              pdfFooterTheme: editingClientDoc.pdfFooterTheme,
              pdfPrimaryColor: editingClientDoc.pdfPrimaryColor,
              pdfSecondaryColor: editingClientDoc.pdfSecondaryColor,
              companyLogoUrl: editingClientDoc.companyLogoUrl,
              companyLogoSize: editingClientDoc.companyLogoSize,
              showWatermark: editingClientDoc.showWatermark,
              companyWatermarkText: editingClientDoc.companyWatermarkText,
              companyWatermarkUrl: editingClientDoc.companyWatermarkUrl,
              companyWatermarkOpacity: editingClientDoc.companyWatermarkOpacity,
              companyWatermarkRotation: editingClientDoc.companyWatermarkRotation,
              companyWatermarkSize: editingClientDoc.companyWatermarkSize,
              companyWatermarkImgSize: editingClientDoc.companyWatermarkImgSize,
              accountName: editingClientDoc.accountName,
              accountNumber: editingClientDoc.accountNumber,
              ifscCode: editingClientDoc.ifscCode,
              branch: editingClientDoc.branch
            }, null, 0.85)
          : generateSpeshwayEstimationPdfHtml(null, {
              ...editingClientDoc.item,
              id: editingClientDoc.refNumber,
              number: editingClientDoc.refNumber,
              date: editingClientDoc.issueDate,
              clientName: editingClientDoc.clientName,
              clientEmail: editingClientDoc.clientEmail,
              productName: editingClientDoc.productName,
              title: editingClientDoc.productName,
              overviewNarrative: editingClientDoc.overviewNarrative,
              planAPrice: editingClientDoc.rate,
              planAName: editingClientDoc.planAName,
              planBName: editingClientDoc.planBName,
              planBPrice: editingClientDoc.planBPrice,
              includePlanB: editingClientDoc.includePlanB !== false,
              enablePlanB: editingClientDoc.includePlanB !== false,
              sec4Subtitle: editingClientDoc.sec4Subtitle,
              planAHighlights: editingClientDoc.planAHighlights,
              planBHighlights: editingClientDoc.planBHighlights,
              planComparisonItems: editingClientDoc.planComparisonItems,
              rate: editingClientDoc.rate,
              taxPct: editingClientDoc.taxPct,
              paymentTerms: editingClientDoc.paymentTerms,
              termsAndConditions: editingClientDoc.termsAndConditions,
              inclusions: editingClientDoc.inclusions,
              exclusions: editingClientDoc.exclusions,
              companyName: editingClientDoc.companyName,
              companyTagline: editingClientDoc.companyTagline,
              companyAddress: editingClientDoc.companyAddress,
              companyEmail: editingClientDoc.companyEmail,
              companyPhone: editingClientDoc.companyPhone,
              companyWebsite: editingClientDoc.companyWebsite,
              companyFooterName: editingClientDoc.companyFooterName,
              companyFooterAddress: editingClientDoc.companyFooterAddress,
              companyFooterContact: editingClientDoc.companyFooterContact,
              pdfFooterTheme: editingClientDoc.pdfFooterTheme,
              pdfPrimaryColor: editingClientDoc.pdfPrimaryColor,
              pdfSecondaryColor: editingClientDoc.pdfSecondaryColor,
              companyLogoUrl: editingClientDoc.companyLogoUrl,
              companyLogoSize: editingClientDoc.companyLogoSize,
              showWatermark: editingClientDoc.showWatermark,
              companyWatermarkText: editingClientDoc.companyWatermarkText,
              companyWatermarkUrl: editingClientDoc.companyWatermarkUrl,
              companyWatermarkOpacity: editingClientDoc.companyWatermarkOpacity,
              companyWatermarkRotation: editingClientDoc.companyWatermarkRotation,
              companyWatermarkSize: editingClientDoc.companyWatermarkSize,
              companyWatermarkImgSize: editingClientDoc.companyWatermarkImgSize,
              customerDesc: editingClientDoc.customerDesc,
              merchantDesc: editingClientDoc.merchantDesc,
              adminDesc: editingClientDoc.adminDesc
            }, editingClientDoc.customFeatures, 0.85);

        return (
          <div className="fixed inset-0 z-[100000] flex flex-col bg-slate-950 text-white animate-in fade-in duration-200">
            {/* STUDIO TOP HEADER BAR */}
            <div className="flex shrink-0 justify-between items-center px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0E9F8A]/20 rounded-xl border border-[#0E9F8A]/40 text-[#0E9F8A]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white">Full-Page {editingClientDoc.type === "agreement" ? "Service Agreement" : (editingClientDoc.type === "invoice" ? "Tax Invoice" : "Quotation")} Studio</h3>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-500/30">Side-by-Side Live Editor</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">Edit logo, theme colors & watermark on the left &bull; Real-time interactive PDF preview updates on the right</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleSaveAsGlobalDefaultCompanyBranding}
                  className="px-3.5 py-2 bg-[#FF5349] hover:bg-[#e04940] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  title="Save current company details as global default for all future documents"
                >
                  <Building2 size={14} /> Update Global Company Details
                </button>

                <button
                  onClick={() => openPdfPrintPreview(liveStudioPreviewHtml)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>

                <button
                  onClick={handleSaveCustomizedClientDoc}
                  className="px-5 py-2 bg-[#0E9F8A] hover:bg-teal-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Save size={14} /> Save & Update Client Document
                </button>

                <button
                  onClick={() => setEditingClientDoc(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xl font-bold transition-all cursor-pointer"
                  title="Close Studio"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* STUDIO SPLIT CONTAINER */}
            <div className="flex-1 min-h-0 p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
              <div className="lg:col-span-5 bg-white text-gray-800 p-5 rounded-2xl border border-slate-800 shadow-2xl overflow-y-auto space-y-4 text-xs">
                {/* STEP 1: COMPANY BRANDING & LOGO */}
                <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-3">
                  <div className="flex items-center gap-2 border-b border-teal-200 pb-2">
                    <Building className="w-4 h-4 text-teal-700" />
                    <h4 className="font-extrabold text-xs text-teal-950 uppercase tracking-wider">Step 1. Company & Agency Branding Details</h4>
                  </div>

                  {/* Logo Upload & Image URL Box */}
                  <div className="p-3 bg-white rounded-xl border border-teal-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-gray-700 block">Company Logo Image</label>
                      {editingClientDoc.companyLogoUrl && (
                        <button
                          type="button"
                          onClick={() => setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: "" })}
                          className="text-[10px] text-red-600 hover:underline font-bold"
                        >
                          Remove Logo
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {editingClientDoc.companyLogoUrl ? (
                        <div className="p-1.5 border border-teal-300 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                          <img src={editingClientDoc.companyLogoUrl} alt="Company Logo" className="h-10 max-w-[110px] object-contain" />
                        </div>
                      ) : (
                        <div className="w-11 h-11 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-[10px] font-bold shrink-0 bg-gray-50">
                          No Logo
                        </div>
                      )}
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-extrabold cursor-pointer transition-all shrink-0 shadow-2xs">
                            Upload Logo File
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = async (ev) => {
                                    if (ev.target?.result) {
                                      const base64Logo = ev.target.result as string;
                                      try {
                                        const res = await fetch(`${API_URL}/crm/upload`, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({
                                            fileData: base64Logo,
                                            fileName: file.name,
                                            fileType: file.type
                                          })
                                        });
                                        const data = await res.json();
                                        const finalUrl = data.success && data.url ? data.url : base64Logo;
                                        saveGlobalCompanyDetails({ companyLogoUrl: finalUrl });
                                        setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: finalUrl });
                                      } catch (err) {
                                        saveGlobalCompanyDetails({ companyLogoUrl: base64Logo });
                                        setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: base64Logo });
                                      }
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <span className="text-[10px] text-gray-400 font-medium">or paste image URL</span>
                        </div>
                        <input
                          type="text"
                          placeholder="https://example.com/logo.png or Base64 data URL"
                          value={editingClientDoc.companyLogoUrl}
                          onChange={e => {
                            const newUrl = e.target.value;
                            saveGlobalCompanyDetails({ companyLogoUrl: newUrl });
                            setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: newUrl });
                          }}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono bg-white"
                        />
                      </div>
                    </div>

                    {editingClientDoc.companyLogoUrl && (
                      <div className="pt-2 border-t border-teal-100 flex items-center justify-between gap-3 text-xs">
                        <label className="font-bold text-gray-700 shrink-0">Logo Height / Scale:</label>
                        <div className="flex items-center gap-2 flex-1 max-w-[210px]">
                          <input
                            type="range"
                            min="20"
                            max="100"
                            step="2"
                            value={editingClientDoc.companyLogoSize || 40}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, companyLogoSize: Number(e.target.value) })}
                            className="w-full cursor-pointer accent-teal-600"
                          />
                          <span className="font-mono font-extrabold text-teal-800 shrink-0">{editingClientDoc.companyLogoSize || 40}px</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Company Business Name *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.companyName}
                        onChange={e => {
                          const nextCompanyName = e.target.value;
                          const currentWatermarkText = editingClientDoc.companyWatermarkText || "";
                          const shouldSyncWatermarkText = !currentWatermarkText.trim() || currentWatermarkText === editingClientDoc.companyName;
                          setEditingClientDoc({
                            ...editingClientDoc,
                            companyName: nextCompanyName,
                            companyWatermarkText: shouldSyncWatermarkText ? nextCompanyName : currentWatermarkText
                          });
                        }}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Company Subtitle / Tagline *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.companyTagline}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyTagline: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Company Email *</label>
                      <input
                        type="email"
                        required
                        value={editingClientDoc.companyEmail}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyEmail: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Company Phone *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.companyPhone}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyPhone: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Company Address *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.companyAddress}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyAddress: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-[#071E34] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 1B: PDF FOOTER DETAILS */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-700" />
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">PDF Footer Details</h4>
                    </div>
                    {editingClientDoc.type === "quotation" && (
                      <select
                        value={editingClientDoc.pdfFooterTheme || "dark"}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, pdfFooterTheme: e.target.value as "dark" | "white" })}
                        className="p-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 bg-white"
                        title="Quotation footer theme"
                      >
                        <option value="dark">Dark Footer</option>
                        <option value="white">White Footer</option>
                      </select>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Footer Company Name</label>
                      <input
                        type="text"
                        value={editingClientDoc.companyFooterName?.trim() || editingClientDoc.companyName}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyFooterName: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Company Website</label>
                      <input
                        type="text"
                        value={editingClientDoc.companyWebsite?.trim() || "www.speshway.com"}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyWebsite: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Footer Address Line</label>
                      <input
                        type="text"
                        value={editingClientDoc.companyFooterAddress?.trim() || editingClientDoc.companyAddress}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyFooterAddress: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-[#071E34] bg-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="font-bold text-gray-700 block mb-1">Footer Contact Line</label>
                      <input
                        type="text"
                        value={editingClientDoc.companyFooterContact?.trim() || `${editingClientDoc.companyWebsite?.trim() || "www.speshway.com"} - ${editingClientDoc.companyEmail} - ${editingClientDoc.companyPhone}`}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, companyFooterContact: e.target.value })}
                        placeholder="www.speshway.com · info@speshway.com · +91 91000 06020"
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-mono text-[#071E34] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: MULTI-COLOR THEME & ACCENT COLORS */}
                <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-purple-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-700" />
                      <h4 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">Step 2. Multi-Color Theme & Accent Colors</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: "#4c1d95", pdfSecondaryColor: "#7c3aed" })}
                      className="text-[10px] text-purple-700 hover:text-purple-950 font-bold underline"
                    >
                      Reset Colors
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-purple-100">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-750 text-[11px] block">Primary Header Color (Hex)</label>
                      <div className="flex gap-1.5 items-center">
                        <input
                          type="color"
                          value={editingClientDoc.pdfPrimaryColor || "#4c1d95"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: e.target.value })}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0 shrink-0"
                        />
                        <input
                          type="text"
                          value={editingClientDoc.pdfPrimaryColor || "#4c1d95"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: e.target.value })}
                          className="w-full text-xs font-mono font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-750 text-[11px] block">Secondary Accent Color (Hex)</label>
                      <div className="flex gap-1.5 items-center">
                        <input
                          type="color"
                          value={editingClientDoc.pdfSecondaryColor || "#7c3aed"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, pdfSecondaryColor: e.target.value })}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0 shrink-0"
                        />
                        <input
                          type="text"
                          value={editingClientDoc.pdfSecondaryColor || "#7c3aed"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, pdfSecondaryColor: e.target.value })}
                          className="w-full text-xs font-mono font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PRESET PALETTES */}
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider block mb-1.5">Preset Theme Palettes:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[
                        { name: "Royal Purple", primary: "#4c1d95", secondary: "#7c3aed" },
                        { name: "Speshway Teal", primary: "#0E9F8A", secondary: "#0d9488" },
                        { name: "Corporate Blue", primary: "#003b8e", secondary: "#2563eb" },
                        { name: "Emerald Green", primary: "#065f46", secondary: "#10b981" },
                        { name: "Midnight Onyx", primary: "#0f172a", secondary: "#334155" },
                        { name: "Crimson Red", primary: "#881337", secondary: "#e11d48" }
                      ].map((pal, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: pal.primary, pdfSecondaryColor: pal.secondary })}
                          className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-200 rounded-lg text-[10px] font-bold text-gray-800 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: pal.primary }}></span>
                          {pal.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 3: WATERMARK STAMP & BACKGROUND BRANDING */}
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Stamp className="w-4 h-4 text-amber-700" />
                      <h4 className="font-extrabold text-xs text-amber-950 uppercase tracking-wider">Step 3. Watermark Stamp & Background Branding</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingClientDoc({
                          ...editingClientDoc,
                          showWatermark: true,
                          companyWatermarkText: editingClientDoc.companyName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                          companyWatermarkUrl: "",
                          companyWatermarkOpacity: 0.08,
                          companyWatermarkRotation: -15,
                          companyWatermarkSize: 26,
                          companyWatermarkImgSize: 220
                        })}
                        className="text-[10px] text-amber-700 hover:text-amber-950 font-bold underline"
                      >
                        Reset Defaults
                      </button>
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-xs text-amber-900">
                        <input
                          type="checkbox"
                          checked={editingClientDoc.showWatermark}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, showWatermark: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-600 accent-amber-600"
                        />
                        Enable Watermark
                      </label>
                    </div>
                  </div>

                  {editingClientDoc.showWatermark && (
                    <div className="space-y-3 bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div>
                          <label className="font-extrabold text-[11px] text-gray-800 block mb-1.5">Watermark Text</label>
                          <input
                            type="text"
                            value={editingClientDoc.companyWatermarkText}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkText: e.target.value })}
                            placeholder="e.g. SPESHWAY SOLUTIONS PRIVATE LIMITED"
                            className="w-full h-10 px-3 border border-gray-300 rounded-xl font-extrabold uppercase text-[11px] text-[#071E34] focus:outline-none focus:ring-2 focus:ring-amber-300"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold text-[11px] text-gray-800 block">Watermark Image Stamp</label>
                            {editingClientDoc.companyWatermarkUrl && (
                              <button
                                type="button"
                                onClick={() => setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: "" })}
                                className="text-[10px] text-red-600 hover:underline font-bold"
                              >
                                Clear Image
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="h-10 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shrink-0 flex items-center">
                              Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (ev.target?.result) {
                                        setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: ev.target!.result as string });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              placeholder="Image URL..."
                              value={editingClientDoc.companyWatermarkUrl}
                              onChange={e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: e.target.value })}
                              className="w-full h-10 px-3 border border-gray-300 rounded-xl text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-bold text-gray-700">Opacity:</label>
                            <span className="font-mono font-extrabold text-amber-800">{Math.round((editingClientDoc.companyWatermarkOpacity || 0.08) * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.02"
                            max="0.40"
                            step="0.01"
                            value={editingClientDoc.companyWatermarkOpacity || 0.08}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkOpacity: Number(e.target.value) })}
                            className="w-full h-2 cursor-pointer accent-amber-600"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-bold text-gray-700">Text Size:</label>
                            <span className="font-mono font-extrabold text-amber-800">{editingClientDoc.companyWatermarkSize || 26}px</span>
                          </div>
                          <input
                            type="range"
                            min="14"
                            max="140"
                            step="2"
                            value={editingClientDoc.companyWatermarkSize || 26}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkSize: Number(e.target.value) })}
                            className="w-full h-2 cursor-pointer accent-amber-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 4: DOCUMENT & CLIENT INFORMATION */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <FileText className="w-4 h-4 text-slate-700" />
                    <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">Step 4. Document Reference & Client Information</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Document Reference Number *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.refNumber}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, refNumber: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Issue Date *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.issueDate}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, issueDate: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Client Business / Person Name *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.clientName}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, clientName: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Client Email Address *</label>
                      <input
                        type="email"
                        required
                        value={editingClientDoc.clientEmail}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, clientEmail: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Product Title / Main Scope *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.productName}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, productName: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Project Category / Type *</label>
                      <input
                        type="text"
                        required
                        value={editingClientDoc.category}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, category: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 5: SERVICE AGREEMENT TERMS & FINANCIAL MILESTONES (AGREEMENT ONLY) */}
                {editingClientDoc.type === "agreement" && (
                  <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 p-4 rounded-2xl border border-purple-200 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-purple-200 pb-2">
                      <FileText className="w-4 h-4 text-purple-700" />
                      <h4 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">Step 5. Service Agreement Terms, Scope & Financial Milestones</h4>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Agreement Duration / Timeline *</label>
                      <input
                        type="text"
                        value={editingClientDoc.duration || "one (1) month"}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, duration: e.target.value })}
                        placeholder="e.g. one (1) month"
                        className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Total Project Budget Rate (₹) *</label>
                      <input
                        type="number"
                        value={editingClientDoc.rate || 80000}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, rate: Number(e.target.value) })}
                        className="w-full p-2.5 border border-purple-300 rounded-xl font-mono font-extrabold text-xs text-purple-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Scope of Work Overview Narrative</label>
                      <textarea
                        rows={3}
                        value={editingClientDoc.overviewNarrative}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, overviewNarrative: e.target.value })}
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-purple-100">
                      <div>
                        <label className="font-extrabold text-[10px] text-gray-700 block mb-1">Advance Stage (%)</label>
                        <input
                          type="number"
                          value={editingClientDoc.m1Pct !== undefined ? editingClientDoc.m1Pct : 40}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, m1Pct: Number(e.target.value) })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-[10px] text-gray-700 block mb-1">Beta Stage (%)</label>
                        <input
                          type="number"
                          value={editingClientDoc.m2Pct !== undefined ? editingClientDoc.m2Pct : 40}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, m2Pct: Number(e.target.value) })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"
                        />
                      </div>
                      <div>
                        <label className="font-extrabold text-[10px] text-gray-700 block mb-1">Delivery Stage (%)</label>
                        <input
                          type="number"
                          value={editingClientDoc.m3Pct !== undefined ? editingClientDoc.m3Pct : 20}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, m3Pct: Number(e.target.value) })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"
                        />
                      </div>
                    </div>

                    {/* SECTION 1 SUBSECTIONS */}
                    <div className="space-y-3 pt-2 border-t border-purple-200">
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Subsection 1.1 Title</label>
                        <input
                          type="text"
                          value={editingClientDoc.sec1Subsection1Title || "1.1 User Mobile Application (Android & iOS)"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection1Title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 bg-white mb-1.5"
                        />
                        <label className="font-bold text-gray-700 block text-[11px] mb-1">Subsection 1.1 Bullet Points (Line per item)</label>
                        <textarea
                          rows={4}
                          value={editingClientDoc.sec1Subsection1BulletText !== undefined ? editingClientDoc.sec1Subsection1BulletText : `Authentication: Secure registration and login for academy members.\nSlot Booking (External): Deep-linking functionality to open third-party apps for slot bookings.\nTeam Matching: Feature to match users with other players/teams.\nCoupon Codes & Payments: Integration for applying coupons and a payment gateway.\nProfile Management: User personal details and history.`}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection1BulletText: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Subsection 1.2 Title</label>
                        <input
                          type="text"
                          value={editingClientDoc.sec1Subsection2Title || "1.2 Admin Web Panel"}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection2Title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 bg-white mb-1.5"
                        />
                        <label className="font-bold text-gray-700 block text-[11px] mb-1">Subsection 1.2 Bullet Points (Line per item)</label>
                        <textarea
                          rows={4}
                          value={editingClientDoc.sec1Subsection2BulletText !== undefined ? editingClientDoc.sec1Subsection2BulletText : `Dashboard: Real-time overview of active bookings and user activity.\nSlot & Capacity Management: Configuration of available hours and maximum members.\nSubscription Management: Tools to manage memberships, tiers, and renewals.\nModeration: Management of users and overview of social sessions.`}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection2BulletText: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                    </div>

                    {/* SECTION 4: RESPONSIBILITIES */}
                    <div className="space-y-3 pt-2 border-t border-purple-200">
                      <h5 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">Responsibilities of Company & Client</h5>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Company Responsibilities (Bullets)</label>
                        <textarea
                          rows={4}
                          value={editingClientDoc.sec4Subsection1BulletText !== undefined ? editingClientDoc.sec4Subsection1BulletText : `Custom Development: End-to-end coding of the mobile application and admin dashboard.\nUI/UX Design: Professional interface design focused on usability.\nBackend Engineering: Robust API development and database architecture.\nDeployment Support: Assistance in hosting and publishing to app stores.\nWarranty: Inclusion of 3 months post-deployment technical support for bug fixes.`}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec4Subsection1BulletText: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">Client Responsibilities (Bullets)</label>
                        <textarea
                          rows={4}
                          value={editingClientDoc.sec4Subsection2BulletText !== undefined ? editingClientDoc.sec4Subsection2BulletText : `Assets & Media: Provision of high-resolution logos, images, and branding guidelines.\nThird-Party Credentials: Provision of API keys for payment gateways, SMS services, and developer accounts.\nTimely Review: Feedback on design mockups and staging deployments within 48 hours.`}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec4Subsection2BulletText: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                    </div>

                    {/* SECTIONS 5-10: LEGAL TERMS & CLAUSES */}
                    <div className="space-y-3 pt-2 border-t border-purple-200">
                      <h5 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">Legal Terms & Contract Clauses</h5>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">5.1 Intellectual Property Clause</label>
                        <textarea
                          rows={3}
                          value={editingClientDoc.sec5Subsection1Content || 'Upon full and final payment of the total budget, the source code and assets specifically developed for this project shall be transferred to the Client. The Company retains the right to use underlying generic libraries and frameworks.'}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec5Subsection1Content: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">5.2 Confidentiality Clause</label>
                        <textarea
                          rows={2}
                          value={editingClientDoc.sec5Subsection2Content || 'Both parties agree to protect and keep confidential any proprietary information, business data, or technical secrets disclosed during the project.'}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec5Subsection2Content: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">6. Termination Clause</label>
                        <textarea
                          rows={2}
                          value={editingClientDoc.sec6Content || 'Either party may terminate this Agreement with 7 days written notice. In the event of termination, the Client shall pay for all work completed up to the termination date. If the Company terminates without cause, it shall return any unearned advance payments.'}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec6Content: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">7. Dispute Resolution Clause</label>
                        <textarea
                          rows={2}
                          value={editingClientDoc.sec7Content || 'Any disputes arising out of this Agreement shall first be resolved through good-faith negotiations. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.'}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec7Content: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">8. Force Majeure Clause</label>
                        <textarea
                          rows={2}
                          value={editingClientDoc.sec8Content || 'Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to natural disasters, government restrictions, or widespread internet outages.'}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec8Content: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-800 block mb-1">10. Terms & Exclusions Bullets</label>
                        <textarea
                          rows={3}
                          value={editingClientDoc.sec10BulletText || `Third-Party Fees: Costs for Play Store ($25), Apple Store ($99), and Cloud Hosting are not included in the budget.\nContent Entry: Uploading extensive historical marketing data is excluded.\nStandard Tech Stack: Development will follow standard modern frameworks suitable for mobile and web.`}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, sec10BulletText: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: SECTION 1 - EXECUTIVE SUMMARY & OVERVIEW NARRATIVE (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2">
                    <div className="flex items-center gap-2 border-b border-blue-200 pb-2 mb-2">
                      <FileCode className="w-4 h-4 text-blue-700" />
                      <h4 className="font-extrabold text-xs text-blue-950 uppercase tracking-wider">Step 5. PDF Section 1: Executive Summary & Overview Narrative</h4>
                    </div>
                    <textarea
                      rows={3}
                      value={editingClientDoc.overviewNarrative}
                      onChange={e => setEditingClientDoc({ ...editingClientDoc, overviewNarrative: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"
                    />
                  </div>
                )}

                {/* STEP 6: SECTION 2 - USER ROLES & ECOSYSTEM NARRATIVE (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200 space-y-3">
                    <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
                      <Users className="w-4 h-4 text-indigo-700" />
                      <h4 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">Step 6. PDF Section 2: Ecosystem User Roles Narrative</h4>
                    </div>
                    <div className="space-y-2.5">
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Customer / End User Role</label>
                        <input
                          type="text"
                          value={editingClientDoc.customerDesc}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, customerDesc: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Merchant / Vendor Role</label>
                        <input
                          type="text"
                          value={editingClientDoc.merchantDesc}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, merchantDesc: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Admin Platform Owner Role</label>
                        <input
                          type="text"
                          value={editingClientDoc.adminDesc}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, adminDesc: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: SECTION 3 - PROJECT FEATURES & SCOPE DELIVERABLES (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200 space-y-3">
                    <div className="flex justify-between items-center border-b border-purple-200 pb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-700" />
                        <h4 className="font-extrabold text-xs text-purple-950 uppercase tracking-wider">Step 7. PDF Section 3: Project Features & Scope Deliverables ({editingClientDoc.customFeatures?.length || 0})</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingClientDoc({
                          ...editingClientDoc,
                          customFeatures: [...(editingClientDoc.customFeatures || []), { title: "New Custom Feature", description: "Detailed feature description and scope specification." }]
                        })}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs cursor-pointer"
                      >
                        <Plus size={12} /> Add Feature Item
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {(editingClientDoc.customFeatures || []).map((feat, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-purple-200 flex flex-col gap-2 shadow-2xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Feature #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => setEditingClientDoc({
                                ...editingClientDoc,
                                customFeatures: editingClientDoc.customFeatures.filter((_, i) => i !== idx)
                              })}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Feature Title"
                            value={feat.title}
                            onChange={e => {
                              const updatedFeats = [...editingClientDoc.customFeatures];
                              updatedFeats[idx].title = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, customFeatures: updatedFeats });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 focus:border-purple-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Feature Details & Scope Description"
                            value={feat.description}
                            onChange={e => {
                              const updatedFeats = [...editingClientDoc.customFeatures];
                              updatedFeats[idx].description = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, customFeatures: updatedFeats });
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs text-gray-700 focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 8: SECTION 4 - COMMERCIAL INVESTMENT PLANS CARDS (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-700" />
                        <h4 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">Step 8. PDF Section 4: Commercial Investment Plans Cards</h4>
                      </div>
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-xs text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                        <input
                          type="checkbox"
                          checked={editingClientDoc.includePlanB !== false}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, includePlanB: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                        />
                        Enable Dual-Plan Comparison (Plan A vs Plan B)
                      </label>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Section 4 Subtitle / Engagement Description</label>
                      <input
                        type="text"
                        value={editingClientDoc.sec4Subtitle || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3."}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, sec4Subtitle: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* PLAN A CARD */}
                      <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2 shadow-2xs">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">Plan A Card Details</span>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Plan A Package Title</label>
                          <input
                            type="text"
                            value={editingClientDoc.planAName || "Standard App Package"}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, planAName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Plan A Price Rate (₹)</label>
                          <input
                            type="number"
                            value={editingClientDoc.rate}
                            onChange={e => {
                              const r = Number(e.target.value);
                              const t = Number(editingClientDoc.taxPct || 0);
                              const tot = Math.round(r * (1 + t / 100));
                              setEditingClientDoc({ ...editingClientDoc, rate: r, totalDue: tot });
                            }}
                            className="w-full p-2 border border-emerald-300 rounded-lg font-mono font-extrabold text-xs text-emerald-800 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Plan A Bullet Highlights (Line per item)</label>
                          <textarea
                            rows={5}
                            value={editingClientDoc.planAHighlights}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, planAHighlights: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg text-xs font-sans text-gray-800 resize-none bg-white"
                          />
                        </div>
                      </div>

                      {/* PLAN B CARD */}
                      {editingClientDoc.includePlanB !== false ? (
                        <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-2 shadow-2xs">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 block">Plan B Card Details</span>
                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Plan B Package Title</label>
                            <input
                              type="text"
                              value={editingClientDoc.planBName || "Enterprise Premium Package"}
                              onChange={e => setEditingClientDoc({ ...editingClientDoc, planBName: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 bg-white"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Plan B Price Rate (₹)</label>
                            <input
                              type="number"
                              value={editingClientDoc.planBPrice}
                              onChange={e => setEditingClientDoc({ ...editingClientDoc, planBPrice: Number(e.target.value) })}
                              className="w-full p-2 border border-purple-300 rounded-lg font-mono font-extrabold text-xs text-purple-800 bg-white"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Plan B Bullet Highlights (Line per item)</label>
                            <textarea
                              rows={5}
                              value={editingClientDoc.planBHighlights}
                              onChange={e => setEditingClientDoc({ ...editingClientDoc, planBHighlights: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg text-xs font-sans text-gray-800 resize-none bg-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col justify-center items-center text-center text-gray-400 text-xs">
                          <span className="font-bold text-gray-500">Plan B is Hidden</span>
                          <span className="text-[10px] text-gray-400 mt-1">Check box above to compare Plan A & Plan B</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 9: SECTION 5 - PLAN COMPARISON MATRIX TABLE (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-3 shadow-xs">
                    <div className="flex justify-between items-center border-b border-teal-200 pb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Columns className="w-4 h-4 text-teal-700" />
                        <h4 className="font-extrabold text-xs text-teal-950 uppercase tracking-wider">Step 9. PDF Section 5: Plan Comparison Matrix Table ({editingClientDoc.planComparisonItems?.length || 0} Deliverables)</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingClientDoc({
                          ...editingClientDoc,
                          planComparisonItems: [
                            ...(editingClientDoc.planComparisonItems || []),
                            { deliverable: "New Deliverable Scope Item", planA: true, planB: true }
                          ]
                        })}
                        className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                      >
                        <Plus size={12} /> Add Comparison Row
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                      {(editingClientDoc.planComparisonItems || []).map((row, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-xl border border-teal-200 flex items-center gap-3 shadow-2xs">
                          <input
                            type="text"
                            placeholder="Deliverable Name (e.g. Android & iOS Mobile Apps)"
                            value={row.deliverable}
                            onChange={e => {
                              const updated = [...(editingClientDoc.planComparisonItems || [])];
                              updated[idx].deliverable = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 bg-white"
                          />
                          <div className="flex items-center gap-3 shrink-0 bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-200">
                            <label className="flex items-center gap-1 cursor-pointer text-xs font-bold text-emerald-800">
                              <input
                                type="checkbox"
                                checked={row.planA !== false}
                                onChange={e => {
                                  const updated = [...(editingClientDoc.planComparisonItems || [])];
                                  updated[idx].planA = e.target.checked;
                                  setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                                }}
                                className="w-3.5 h-3.5 rounded text-emerald-600 accent-emerald-600"
                              />
                              Plan A
                            </label>

                            {editingClientDoc.includePlanB !== false && (
                              <label className="flex items-center gap-1 cursor-pointer text-xs font-bold text-purple-800">
                                <input
                                  type="checkbox"
                                  checked={row.planB !== false}
                                  onChange={e => {
                                    const updated = [...(editingClientDoc.planComparisonItems || [])];
                                    updated[idx].planB = e.target.checked;
                                    setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                                  }}
                                  className="w-3.5 h-3.5 rounded text-purple-600 accent-purple-600"
                                />
                                Plan B
                              </label>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingClientDoc.planComparisonItems.filter((_, i) => i !== idx);
                              setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                            }}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Delete row"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 10: SECTIONS 6, 7 & 8 - TERMS, INCLUSIONS & EXCLUSIONS (QUOTATION ONLY) */}
                {editingClientDoc.type === "quotation" && (
                  <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-800 block">Step 10. PDF Section 6: Payment Terms Notes</label>
                    <textarea
                      rows={2}
                      value={editingClientDoc.paymentTerms}
                      onChange={e => setEditingClientDoc({ ...editingClientDoc, paymentTerms: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <label className="font-bold text-slate-800 block">PDF Section 7: General Terms & Legal Conditions (Line per rule)</label>
                    <textarea
                      rows={4}
                      value={editingClientDoc.termsAndConditions}
                      onChange={e => setEditingClientDoc({ ...editingClientDoc, termsAndConditions: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-purple-50/60 p-4 rounded-2xl border border-purple-200">
                    <div>
                      <label className="font-bold text-emerald-800 block mb-1">PDF Section 8: ✓ Scope Inclusions</label>
                      <textarea
                        rows={4}
                        value={editingClientDoc.inclusions}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, inclusions: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-rose-800 block mb-1">PDF Section 8: ✖ Scope Exclusions</label>
                      <textarea
                        rows={4}
                        value={editingClientDoc.exclusions}
                        onChange={e => setEditingClientDoc({ ...editingClientDoc, exclusions: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"
                      />
                    </div>
                  </div>
                  </div>
                )}

                {/* STEP 11: INVOICE LINE ITEM SCOPE & REMITTANCE BANK DETAILS (INVOICE ONLY) */}
                {editingClientDoc.type === "invoice" && (
                  <>
                    <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-3">
                      <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
                        <FileText className="w-4 h-4 text-blue-700" />
                        <h4 className="font-extrabold text-xs text-blue-950 uppercase tracking-wider">Step 11. Invoice Line Item Description</h4>
                      </div>
                      <div className="space-y-2.5">
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Main Invoice Line Item Description</label>
                          <input
                            type="text"
                            value={editingClientDoc.invoiceDescription}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, invoiceDescription: e.target.value })}
                            className="w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Invoice Sub-description Narrative</label>
                          <textarea
                            rows={2}
                            value={editingClientDoc.invoiceSubdesc}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, invoiceSubdesc: e.target.value })}
                            className="w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-2xl border border-slate-300 space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-300 pb-2">
                        <CreditCard className="w-4 h-4 text-slate-800" />
                        <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider">Bank Account Remittance Details</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Account Holder Name</label>
                          <input
                            type="text"
                            value={editingClientDoc.accountName}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, accountName: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Bank Account Number</label>
                          <input
                            type="text"
                            value={editingClientDoc.accountNumber}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, accountNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Bank IFSC Code</label>
                          <input
                            type="text"
                            value={editingClientDoc.ifscCode}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, ifscCode: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-slate-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-gray-700 block mb-1">Bank Branch</label>
                          <input
                            type="text"
                            value={editingClientDoc.branch}
                            onChange={e => setEditingClientDoc({ ...editingClientDoc, branch: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* FINANCIALS & TAX SUMMARY FOR INVOICE */}
                    <div className="grid grid-cols-3 gap-3 bg-teal-50/50 p-3.5 rounded-2xl border border-teal-100">
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Base Rate (₹) *</label>
                        <input
                          type="number"
                          required
                          value={editingClientDoc.rate}
                          onChange={e => {
                            const valStr = e.target.value;
                            const r = valStr === "" ? ("" as any) : Number(valStr);
                            const t = Number(editingClientDoc.taxPct || 0);
                            const numR = typeof r === "number" ? r : 0;
                            const tot = Math.round(numR * (1 + t / 100));
                            setEditingClientDoc({ ...editingClientDoc, rate: r, totalDue: tot });
                          }}
                          className="w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">GST Tax % *</label>
                        <input
                          type="number"
                          required
                          value={editingClientDoc.taxPct}
                          onChange={e => {
                            const t = Number(e.target.value);
                            const r = editingClientDoc.rate;
                            const tot = Math.round(r * (1 + t / 100));
                            setEditingClientDoc({ ...editingClientDoc, taxPct: t, totalDue: tot });
                          }}
                          className="w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Total Due (₹)</label>
                        <input
                          type="number"
                          required
                          value={editingClientDoc.totalDue}
                          onChange={e => setEditingClientDoc({ ...editingClientDoc, totalDue: Number(e.target.value) })}
                          className="w-full p-2.5 border border-teal-200 bg-white rounded-xl font-mono font-extrabold text-[#0E9F8A]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT COLUMN: REAL-TIME INTERACTIVE LIVE PDF PREVIEW (lg:col-span-7) */}
              <div className="lg:col-span-7 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl flex flex-col min-h-0">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 text-white shrink-0">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-teal-400" />
                    <span className="font-extrabold text-xs text-slate-200 uppercase tracking-wider">Real-Time PDF Live Preview</span>
                    <span className="text-[10px] font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold border border-teal-500/30">Live Sync</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Updates automatically as you type</span>
                </div>
                <div className="flex-1 min-h-0 mt-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                  <iframe
                    srcDoc={liveStudioPreviewHtml}
                    className="w-full h-full border-none bg-slate-950"
                    title="Realtime PDF Live Studio Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      {clientEmailModal && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-[#071E34]/50 backdrop-blur-sm p-4 pt-6 sm:pt-10 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[calc(100vh-3rem)] bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-150 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0E9F8A]" />
                <h3 className="font-extrabold text-base text-[#071E34]">Send PDF Document to Client</h3>
              </div>
              <button
                onClick={() => setClientEmailModal(null)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Recipient Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmailModal.toEmail}
                  onChange={e => setClientEmailModal(prev => prev ? { ...prev, toEmail: e.target.value } : null)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Subject *</label>
                <input
                  type="text"
                  required
                  value={clientEmailModal.subject}
                  onChange={e => setClientEmailModal(prev => prev ? { ...prev, subject: e.target.value } : null)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34]"
                />
              </div>

              {/* ATTACHMENT NOTICE PILL */}
              <div className="p-3 bg-teal-50/80 border border-teal-200 rounded-xl flex items-center gap-2">
                <Paperclip size={16} className="text-teal-600 shrink-0" />
                <div>
                  <span className="font-extrabold text-blue-900 text-xs block">Attached PDF Document</span>
                  <span className="text-[10px] text-teal-700 font-mono font-bold">{clientEmailModal.fileName} (Direct PDF Attachment)</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Body Message</label>
                <textarea
                  rows={4}
                  value={clientEmailModal.textContent}
                  onChange={e => setClientEmailModal(prev => prev ? { ...prev, textContent: e.target.value } : null)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-150">
              <button
                onClick={() => setClientEmailModal(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>

              <button
                onClick={handleSendEmailPdfAttachment}
                disabled={clientEmailModal.isSending}
                className="px-5 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all duration-200 ease-out"
              >
                <Mail size={14} /> {clientEmailModal.isSending ? "Dispatching PDF Email..." : "Send Email (PDF Attached)"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. Modal: Assign / Select Project */}
      {showAssignProjectModal && activeClientDetail && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071E34]/55 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 my-auto max-h-[min(88vh,780px)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex shrink-0 justify-between items-center border-b border-gray-150 pb-3">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#0E9F8A]" />
                <h3 className="font-extrabold text-base text-[#071E34]">Assign / Select Project Workspace for {activeClientDetail.name}</h3>
              </div>
              <button
                onClick={() => setShowAssignProjectModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <p className="shrink-0 text-xs text-gray-500">
              Select any project from all available projects below to open its specific proposals, quotations, and tax invoices:
            </p>

            <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1">
              {(() => {
                const combinedList = [
                  ...projects,
                  ...ourProjects.map(op => ({
                    id: op.id || `OPRJ-${op.name}`,
                    name: op.name || op.title,
                    title: op.title || op.name,
                    category: op.category || "Our Projects",
                    clientName: op.clientName || "Our Projects Portfolio",
                    budget: op.budget || 45000,
                    status: op.status || "Live Production",
                    description: op.description || "Portfolio project specification."
                  }))
                ].filter((p, idx, arr) => 
                  (p.name || p.title || "").toLowerCase() !== "new" && 
                  p.id !== "PRJ-9961" &&
                  arr.findIndex(x => x.id === p.id || (x.name && p.name && x.name.toLowerCase() === p.name.toLowerCase())) === idx
                );

                return combinedList.map(p => {
                  const isSelected = selectedClientProjectId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedClientProjectId(p.id);
                        setSelectedProposalId(null);
                        setShowAssignProjectModal(false);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ease-out flex justify-between items-center ${
                        isSelected 
                          ? "bg-teal-50 border-[#0E9F8A] shadow-sm" 
                          : "bg-gray-50 border-gray-200 hover:border-teal-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-[#0E9F8A] bg-teal-50 px-2 py-0.5 rounded">{p.id}</span>
                          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase">{p.category || "Web App"}</span>
                          {isSelected && (
                            <span className="text-[9px] font-extrabold bg-[#0E9F8A] text-white px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle size={10} /> Active Workspace
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-[#071E34] mt-1">{p.name || p.title}</h4>
                        <span className="text-[10px] text-gray-400 block">{p.description || "Project specification included."}</span>
                      </div>

                      <button
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ease-out ${
                          isSelected 
                            ? "bg-[#0E9F8A] text-white shadow-xs" 
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-[#0E9F8A] hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected Workspace" : "Select Project"}
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Stages Configuration Modal */}
      {showStagesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-[#071E34] text-base tracking-tight">Configure Pipeline Stages</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Add or remove custom Kanban columns</p>
              </div>
              <button 
                onClick={() => setShowStagesModal(false)} 
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Stages List */}
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {columns.map(col => {
                const isCore = ["New", "Contacted", "Qualified", "Follow-up", "Won", "Lost"].includes(col.key);
                return (
                  <div key={col.key} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                      <span className="font-bold text-xs text-[#071E34]">{col.title}</span>
                      {isCore && <span className="text-[8px] bg-gray-200 text-gray-650 px-1.5 py-0.5 rounded font-extrabold uppercase">Core</span>}
                    </div>
                    {!isCore && (
                      <button 
                        onClick={() => handleDeleteCustomStage(col.key)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Custom Stage */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <label className="font-bold text-gray-700 block text-xs">Add Custom Stage</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g., Under Review"
                  value={newStageTitle}
                  onChange={(e) => setNewStageTitle(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0E9F8A]"
                />
                <button 
                  onClick={handleAddCustomStage}
                  className="px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all duration-200 ease-out shadow-xs"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100 mt-1">
              <button 
                onClick={() => setShowStagesModal(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all duration-200 ease-out"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detailed Inspector Modal */}
      {selectedLeadForDetail && leadDetailForm && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2.5px] p-3 sm:p-5">
            <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 animate-pulse">
              <div className="h-5 w-36 bg-gray-100 rounded mb-4" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 h-80 bg-gray-50 rounded-xl border border-gray-100" />
                <div className="lg:col-span-2 h-80 bg-gray-50 rounded-xl border border-gray-100" />
              </div>
            </div>
          </div>
        }>
          <LeadDetailInspectorModal
            leadDetailForm={leadDetailForm}
            setLeadDetailForm={setLeadDetailForm}
            setSelectedLeadForDetail={setSelectedLeadForDetail}
            columns={columns}
            employees={employees}
            handleUpdateLeadStatus={handleUpdateLeadStatus}
            handleConvertLead={handleConvertLead}
            handleDeleteLead={handleDeleteLead}
            handleNavigateLeadDetail={handleNavigateLeadDetail}
            handleSaveLeadDetailChanges={handleSaveLeadDetailChanges}
            projects={projects}
            ourProjects={ourProjects}
            quotations={quotations}
            invoices={invoices}
            setClients={setClients}
            setLeads={setLeads}
            showToast={showToast}
            API_URL={API_URL}
            onPreviewDoc={handleOpenLeadInspectorDocumentPreview}
            onSendEmailDoc={(toEmail, subject, textContent, fileName, htmlContent, item) => {
              const type: "quotation" | "invoice" = fileName.toLowerCase().includes("invoice") && !fileName.toLowerCase().includes("quotation_invoice") ? "invoice" : "quotation";
              handleOpenClientItemEmailModal(item || { number: "PROP-DOC", title: subject }, type, {
                toEmail,
                subject,
                textContent,
                fileName,
                htmlContent
              });
            }}
            onMarkTemporaryClient={handleMarkTemporaryClient}
          />
        </Suspense>
      )}

      {/* Inline lead inspector retained as a disabled fallback during lazy-load migration. */}
      {false && selectedLeadForDetail && leadDetailForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2.5px] p-3 sm:p-5 overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#fcfbfc] rounded-2xl border border-gray-200 shadow-2xl p-4 sm:p-5 flex flex-col gap-4 my-4 animate-in fade-in zoom-in duration-200 max-h-[94vh] overflow-y-auto">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-gray-100">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-[#071E34] tracking-tight truncate">{leadDetailForm.name}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1 min-w-0">
                    <Building2 size={11} className="text-gray-400" />
                    <span className="truncate">{leadDetailForm.companyName}</span>
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                  <span className="text-[9px] font-extrabold text-[#0E9F8A] bg-teal-50 px-1.5 py-0.5 rounded uppercase border border-teal-100">
                    {columns.find(c => c.key === leadDetailForm.status)?.title || leadDetailForm.status}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
                {leadDetailForm.status !== "Lost" && (
                  <button
                    onClick={() => {
                      handleUpdateLeadStatus(leadDetailForm.id, "Lost");
                      setSelectedLeadForDetail(null);
                      setLeadDetailForm(null);
                    }}
                    className="px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-655 rounded-lg text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-1 bg-white shadow-3xs"
                  >
                    <AlertCircle size={11} />
                    <span>Mark Lost</span>
                  </button>
                )}
                {leadDetailForm.status === "Won" && leadDetailForm.clientType === "Temporary" && (
                  <button
                    onClick={() => {
                      handleConvertLead(leadDetailForm);
                      setSelectedLeadForDetail(null);
                      setLeadDetailForm(null);
                    }}
                    className="px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-[10px] font-extrabold transition-all duration-200 ease-out flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle size={11} className="text-white" />
                    <span>Make Permanent</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDeleteLead(leadDetailForm.id);
                    setSelectedLeadForDetail(null);
                    setLeadDetailForm(null);
                  }}
                  className="p-1.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-655 rounded-lg transition-all duration-200 ease-out bg-white"
                  title="Move to Trash"
                >
                  <Trash2 size={12} />
                </button>
                <div className="h-4 w-[1px] bg-gray-200 mx-0.5" />
                <button
                  onClick={() => handleNavigateLeadDetail("prev")}
                  className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all duration-200 ease-out bg-white"
                  title="Previous Lead"
                >
                  <ChevronLeft size={12} />
                </button>
                <button
                  onClick={() => handleNavigateLeadDetail("next")}
                  className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all duration-200 ease-out bg-white"
                  title="Next Lead"
                >
                  <ChevronRight size={12} />
                </button>
                <button
                  onClick={() => {
                    setSelectedLeadForDetail(null);
                    setLeadDetailForm(null);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-700 text-base font-bold"
                  title="Close Inspector"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Left columns (Lead Details) */}
              <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0">
                <h3 className="font-heading font-extrabold text-xs text-[#071E34]">Lead Details</h3>
                
                {/* Contact name */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Name</label>
                  <input 
                    type="text"
                    value={leadDetailForm.name}
                    onChange={(e) => setLeadDetailForm({ ...leadDetailForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"
                  />
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company</label>
                    <input 
                      type="text"
                      value={leadDetailForm.companyName}
                      onChange={(e) => setLeadDetailForm({ ...leadDetailForm, companyName: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                    <input 
                      type="text"
                      value={leadDetailForm.phone}
                      onChange={(e) => setLeadDetailForm({ ...leadDetailForm, phone: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"
                    />
                  </div>
                </div>

                {/* Email & Source */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
                    <input 
                      type="email"
                      value={leadDetailForm.email}
                      onChange={(e) => setLeadDetailForm({ ...leadDetailForm, email: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Source</label>
                    <select 
                      value={leadDetailForm.source}
                      onChange={(e) => setLeadDetailForm({ ...leadDetailForm, source: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"
                    >
                      <option value="Other">Other</option>
                      <option value="Website">Website</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone call">Phone call</option>
                      <option value="Referral">Referral</option>
                      <option value="Direct enquiry">Direct enquiry</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Value */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimated Value (INR)</label>
                  <input 
                    type="number"
                    value={leadDetailForm.expectedBudget || 0}
                    onChange={(e) => setLeadDetailForm({ ...leadDetailForm, expectedBudget: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-mono font-medium text-gray-800 bg-gray-50/20"
                  />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notes</label>
                  <textarea 
                    rows={3}
                    value={leadDetailForm.notes}
                    onChange={(e) => setLeadDetailForm({ ...leadDetailForm, notes: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSaveLeadDetailChanges}
                    className="px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-extrabold transition-all duration-200 ease-out shadow-2xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Right column (Pipeline settings) */}
              <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0">
                <h3 className="font-heading font-extrabold text-xs text-[#071E34]">Pipeline</h3>

                {/* Stage */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stage</label>
                  <select
                    value={leadDetailForm.status}
                    onChange={(e) => setLeadDetailForm({ ...leadDetailForm, status: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"
                  >
                    {columns.map(col => (
                      <option key={col.key} value={col.key}>{col.title}</option>
                    ))}
                  </select>
                </div>

                {/* Assigned To */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned To</label>
                  <select
                    value={leadDetailForm.assignedEmployee}
                    onChange={(e) => setLeadDetailForm({ ...leadDetailForm, assignedEmployee: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="Unassigned">Unassigned</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                {/* Follow-up date & time row */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Follow-up</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                    <div className="relative">
                      <input 
                        type="date"
                        value={leadDetailForm.nextFollowUpDate || ""}
                        onChange={(e) => setLeadDetailForm({ ...leadDetailForm, nextFollowUpDate: e.target.value })}
                        className="w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] cursor-pointer"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Time"
                        className="w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A]"
                        defaultValue="12:00 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Auto reminders banner */}
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[9px] text-amber-900 leading-normal">
                  <span className="text-amber-700 shrink-0">🔒</span>
                  <div className="min-w-0">
                    <strong className="text-amber-950 font-bold block">Automatic reminders</strong>
                    are an Ultra feature. The date is saved; upgrade to get notified.
                  </div>
                </div>

                {/* Summary table */}
                <div className="mt-1.5 pt-2.5 border-t border-gray-100 flex flex-col text-[10px]">
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2 [&>strong]:text-right [&>strong]:break-words">
                    <span className="text-gray-400 font-medium shrink-0">Value</span>
                    <strong className="font-mono font-extrabold text-[#071E34]">₹{leadDetailForm.expectedBudget?.toLocaleString() || "0"}</strong>
                  </div>
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2">
                    <span className="text-gray-400 font-medium shrink-0">Source</span>
                    <span className="text-gray-700 font-semibold text-right break-words">{leadDetailForm.source}</span>
                  </div>
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2">
                    <span className="text-gray-400 font-medium shrink-0">Phone</span>
                    <span className="text-[#0E9F8A] font-semibold flex items-center justify-end gap-1 font-mono select-all min-w-0 text-right break-all">
                      📞 {leadDetailForm.phone}
                    </span>
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
      )}

      {/* ADD / CREATE SYSTEM USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-heading font-extrabold text-base text-[#071E34]">Create System User</h3>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold p-1"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateUserSubmit} className="p-6 flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="rahul@company.com"
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Account Password *</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={userForm.password}
                  onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Role Authorization</label>
                  <select 
                    value={userForm.role}
                    onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Client Access">Client Access</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Status</label>
                  <select 
                    value={userForm.status}
                    onChange={e => setUserForm({ ...userForm, status: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl font-bold shadow-md transition-all"
                >
                  Create System User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SYSTEM USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-heading font-extrabold text-base text-[#071E34]">Edit System User Details</h3>
              <button 
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600 font-bold p-1"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEditUserSubmit} className="p-6 flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">New Password (leave blank to keep current)</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={userForm.password}
                  onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Role Authorization</label>
                  <select 
                    value={userForm.role}
                    onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Client Access">Client Access</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-700">Status</label>
                  <select 
                    value={userForm.status}
                    onChange={e => setUserForm({ ...userForm, status: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl font-bold shadow-md transition-all"
                >
                  Save User Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOTTOM RIGHT FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md ${
          toast.type === "error" 
            ? "bg-red-950 text-white border-red-700 backdrop-blur-md shadow-red-950/40" 
            : toast.type === "info"
            ? "bg-slate-950 text-white border-slate-700 backdrop-blur-md"
            : "bg-emerald-950 text-white border-emerald-600 backdrop-blur-md shadow-emerald-950/40"
        }`}>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
            toast.type === "error" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
          }`}>
            {toast.type === "error" ? "!" : "✓"}
          </div>
          <div className="flex-1 pr-2">
            <span className="font-extrabold text-xs block">{toast.type === "error" ? "Notice / Alert" : "Success"}</span>
            <span className="text-[11px] opacity-90 leading-tight block mt-0.5">{toast.message}</span>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-white/60 hover:text-white text-lg font-bold px-1.5 py-0.5 rounded-lg hover:bg-white/10"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}




