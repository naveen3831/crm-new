const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\admin\\dashboard\\page.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  FileText, 
  CreditCard,
 
  LogOut,
 
  BarChart3, 
  Plus, 
  Search,
  CheckCircle,

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

  Trash2,
  Edit,
  Eye,
  ArrowRight,
  ArrowLeft,
  Download,

  ChevronRight,
  ChevronLeft,
  Target,
  Trophy,

  Columns,

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

  Stamp
} from "lucide-react";
import GlassCard from "../../../components/ui/GlassCard";
import Button from "../../../components/ui/Button";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, generateSpeshwayAgreementPdfHtml, triggerDirectPdfDownload as utilsTriggerDirectPdfDownload, generatePdfDataUri, openPdfPrintPreview, saveGlobalCompanyDetails, getGlobalCompanyDetails } from "../../../utils/pdfGenerator";
import { getCrmSocket } from "../../../utils/realtime";
import CrmBrandLogo from "../../../src/components/public/CrmBrandLogo";


const loadProjectDetailModal = () => import("../../../components/admin/ProjectDetailModal");
const loadProjectProposalsWorkspace = () => import("../../../components/admin/ProjectProposalsWorkspace");
const loadLeadDetailInspectorModal = () => import("../../../components/admin/LeadDetailInspectorModal");

const ProjectDetailModal = lazy(loadProjectDetailModal);
const ProjectProposalsWorkspace = lazy(loadProjectProposalsWorkspace);
const LeadDetailInspectorModal = lazy(loadLeadDetailInspectorModal);

const API_URL = (typeof process !== "undefined" && _optionalChain([process, 'access', _2 => _2.env, 'optionalAccess', _3 => _3.NEXT_PUBLIC_API_URL])) || (typeof window !== "undefined" && _optionalChain([(import.meta ), 'access', _4 => _4.env, 'optionalAccess', _5 => _5.VITE_API_URL])) || "http://localhost:5000/api/v1";

const DEFAULT_SEED_PROJECTS = [];

const DEFAULT_SEED_OUR_PROJECTS = [];

const DEFAULT_SEED_LEADS = [];

// ==========================================
// TYPE DEFINITIONS
// ==========================================





























































































































































const getInitialCrmTab = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get("tab");
      if (urlTab) return urlTab;
      const storedTab = localStorage.getItem("speshway_crm_active_tab");
      if (storedTab) return storedTab;
    } catch (e2) {
      // fallback
    }
  }
  return "overview";
};

const getInitialCrmProjectId = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProj = params.get("projectId");
      if (urlProj) return urlProj;
      const storedProj = localStorage.getItem("speshway_crm_active_project_id");
      if (storedProj) return storedProj;
    } catch (e3) {
      // fallback
    }
  }
  return null;
};

const getInitialCrmClientId = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlClientId = params.get("clientId");
      if (urlClientId) return urlClientId;
      const storedClientId = localStorage.getItem("speshway_crm_active_client_id");
      if (storedClientId) return storedClientId;
    } catch (e4) {
      // fallback
    }
  }
  return null;
};

const getInitialCrmClientProjectId = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProjId = params.get("clientProjectId");
      if (urlProjId) return urlProjId;
      const storedProjId = localStorage.getItem("speshway_crm_active_client_project_id");
      if (storedProjId) return storedProjId;
    } catch (e5) {
      // fallback
    }
  }
  return null;
};

const getInitialCrmLeadId = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLeadId = params.get("leadId");
      if (urlLeadId) return urlLeadId;
      const storedLeadId = localStorage.getItem("speshway_crm_active_lead_id");
      if (storedLeadId) return storedLeadId;
    } catch (e6) {
      // fallback
    }
  }
  return null;
};

const getInitialCrmWorkspaceSubtab = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const subtab = params.get("subtab");
      if (subtab === "invoices" || subtab === "quotations" || subtab === "proposals") return subtab;
    } catch (e7) {
      // fallback
    }
  }
  return "proposals";
};

const getInitialCrmProjectTab = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const section = params.get("section") || params.get("projectTab");
      if (section) return section;
      const stored = localStorage.getItem("speshway_crm_active_project_tab");
      if (stored) return stored;
    } catch (e8) {}
  }
  return "overview";
};

const getInitialCrmViewMode = () => {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view") || params.get("mode");
      if (view === "detail" || view === "8-sections") return "detail";
      if (view === "proposals") return "proposals";
      if (params.has("section") || params.has("projectTab")) return "detail";
      const storedView = localStorage.getItem("speshway_crm_active_view_mode");
      if (storedView === "detail") return "detail";
    } catch (e9) {}
  }
  return null;
};

const getCachedCrmBulkData = () => {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem("crm_bulk_data_cache");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e10) {}
  }
  return null;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const initialBulkCache = getCachedCrmBulkData();

  const [activeTab, setActiveTab] = useState(getInitialCrmTab);
  const [isLoading, setIsLoading] = useState(!initialBulkCache);
  const [hasError, setHasError] = useState(false);

  // States fetched live from MongoDB with instant local cache hydration
  const [clients, setClients] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _6 => _6.client]) || []);
  const [selectedClientProjectId, setSelectedClientProjectId] = useState(null);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [selectedTodoProjectId, setSelectedTodoProjectId] = useState("");
  const [activeProjectWorkspaceSubtab, setActiveProjectWorkspaceSubtab] = useState(getInitialCrmWorkspaceSubtab);
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

  const [activeClientDetail, setActiveClientDetail] = useState(null);
  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [activeProjectTab, setActiveProjectTab] = useState(getInitialCrmProjectTab);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState(false);
  const [clientPdfPreviewModal, setClientPdfPreviewModal] = useState(null);
  const [clientDocumentRecords, setClientDocumentRecords] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _7 => _7["client-document"]]) || []);
  const [projectTodoInputs, setProjectTodoInputs] = useState({});
  const [clientDocumentOverrides, setClientDocumentOverrides] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("crm_client_document_overrides") || "{}");
    } catch (e11) {
      localStorage.removeItem("crm_client_document_overrides");
      return {};
    }
  });
  const [clientEmailModal, setClientEmailModal] = useState







(null);

  const [calls, setCalls] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _8 => _8.call]) || []);
  const [leads, setLeads] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _9 => _9.lead]) || DEFAULT_SEED_LEADS);
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [projects, setProjects] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _10 => _10.project]) || DEFAULT_SEED_PROJECTS);
  const [ourProjects, setOurProjects] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _11 => _11["our-projects"]]) || _optionalChain([initialBulkCache, 'optionalAccess', _12 => _12.ourprojects]) || DEFAULT_SEED_OUR_PROJECTS);
  const [activeProjectProposalsView, setActiveProjectProposalsView] = useState(null);
  const [autoOpenAgreementStudio, setAutoOpenAgreementStudio] = useState(false);
  const [initialRestoreProjectId, setInitialRestoreProjectId] = useState(getInitialCrmProjectId);
  const [initialRestoreViewMode] = useState(getInitialCrmViewMode);
  const [initialRestoreClientId, setInitialRestoreClientId] = useState(getInitialCrmClientId);
  const [initialRestoreClientProjectId, setInitialRestoreClientProjectId] = useState(getInitialCrmClientProjectId);
  const [showOurProjectModal, setShowOurProjectModal] = useState(false);
  const [activeOurProjectQuotation, setActiveOurProjectQuotation] = useState(null);
  const [activeSelectedQuoteId, setActiveSelectedQuoteId] = useState(null);
  const [modalViewTab, setModalViewTab] = useState("full-pdf");
  const [ourProjectForm, setOurProjectForm] = useState({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
  const [quotations, setQuotations] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _13 => _13.quotation]) || []);
  const [features, setFeatures] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _14 => _14.feature]) || []);
  const [editingQuote, setEditingQuote] = useState(null);
  const [reviewingQuote, setReviewingQuote] = useState(null);
  const [reviewMode, setReviewMode] = useState("live-editor");
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [editingFeature, setEditingFeature] = useState(null);
  const [draggedOverCol, setDraggedOverCol] = useState(null);
  const [draggingLeadId, setDraggingLeadId] = useState(null);
  const [draggedProjectStatus, setDraggedProjectStatus] = useState(null);
  const [draggingClientProjectId, setDraggingClientProjectId] = useState(null);
  const [inlineAddColKey, setInlineAddColKey] = useState(null);
  const [inlineLeadName, setInlineLeadName] = useState("");
  const [columns, setColumns] = useState([
    { title: "New", key: "New", dot: "bg-[#06132D]", text: "text-[#06132D]" },
    { title: "Contacted", key: "Contacted", dot: "bg-slate-400", text: "text-slate-500" },
    { title: "Qualified", key: "Qualified", dot: "bg-[#FF5349]/80", text: "text-[#FF5349]" },
    { title: "Proposal Sent", key: "Proposal sent", dot: "bg-[#06132D]/70", text: "text-[#06132D]" },
    { title: "Won", key: "Won", dot: "bg-emerald-500", text: "text-emerald-650" },
    { title: "Lost", key: "Lost", dot: "bg-rose-500", text: "text-rose-650" }
  ]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [showTrashOnly, setShowTrashOnly] = useState(false);
  const [showStagesModal, setShowStagesModal] = useState(false);
  const [newStageTitle, setNewStageTitle] = useState("");
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState(null);
  const [leadDetailForm, setLeadDetailForm] = useState(null);
  const [initialRestoreLeadId, setInitialRestoreLeadId] = useState(getInitialCrmLeadId);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [innovations, setInnovations] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _15 => _15.innovation]) || []);
  const [invoices, setInvoices] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _16 => _16.invoice]) || []);
  const [agreements, setAgreements] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _17 => _17.agreement]) || []);
  const [payments, setPayments] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _18 => _18.payment]) || []);
  const [expenses, setExpenses] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _19 => _19.expense]) || []);
  const [users, setUsers] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _20 => _20.user]) || []);
  const [employees, setEmployees] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _21 => _21.employee]) || []);
  const [teams, setTeams] = useState(_optionalChain([initialBulkCache, 'optionalAccess', _22 => _22.team]) || []);
  const [toast, setToast] = useState(null);
  const [sentEmailLogs, setSentEmailLogs] = useState([
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
  const [previewZoom, setPreviewZoom] = useState(0.6);
  const [isFullScreenPdf, setIsFullScreenPdf] = useState(true);
  const [editingClientDoc, setEditingClientDoc] = useState






















































(null);

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

  const getClientDocumentUrlParam = (name) => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get(name) || "";
  };

  const uniqueClientDocumentValues = (values) => (
    Array.from(new Set(values.map(value => `${value || ""}`.trim()).filter(Boolean)))
  );

  const stripLargeClientDocumentFields = (value) => {
    if (Array.isArray(value)) return value.map(stripLargeClientDocumentFields);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, fieldValue]) => {
      if (typeof fieldValue === "string" && fieldValue.length > 5000) {
        return [key, ""];
      }
      return [key, stripLargeClientDocumentFields(fieldValue)];
    }));
  };

  const persistClientDocumentOverridesCache = (overrides) => {
    if (typeof window === "undefined") return;
    try {
      const entries = Object.entries(overrides).slice(-12);
      const cache = Object.fromEntries(entries.map(([key, value]) => [key, stripLargeClientDocumentFields(value)]));
      localStorage.setItem("crm_client_document_overrides", JSON.stringify(cache));
    } catch (err) {
      console.warn("Client PDF cache skipped because browser storage is full.", err);
      try {
        localStorage.removeItem("crm_client_document_overrides");
      } catch (e12) {
        // Ignore storage cleanup failures.
      }
    }
  };

  const getActiveClientDocumentScopeId = () => getClientDocumentScopeCandidates()[0] || "client-workspace";

  const getClientDocumentScopeCandidates = () => uniqueClientDocumentValues([
    _optionalChain([activeClientDetail, 'optionalAccess', _23 => _23.id]),
    _optionalChain([leadDetailForm, 'optionalAccess', _24 => _24.id]),
    _optionalChain([selectedLeadForDetail, 'optionalAccess', _25 => _25.id]),
    getClientDocumentUrlParam("clientId"),
    _optionalChain([activeClientDetail, 'optionalAccess', _26 => _26.email]),
    _optionalChain([leadDetailForm, 'optionalAccess', _27 => _27.email]),
    _optionalChain([activeClientDetail, 'optionalAccess', _28 => _28.name]),
    _optionalChain([leadDetailForm, 'optionalAccess', _29 => _29.name]),
    "client-workspace"
  ]);

  const getClientDocumentRefCandidates = (item, type) => uniqueClientDocumentValues([
    _optionalChain([item, 'optionalAccess', _30 => _30.number]),
    _optionalChain([item, 'optionalAccess', _31 => _31.id]),
    _optionalChain([item, 'optionalAccess', _32 => _32.refNumber]),
    _optionalChain([item, 'optionalAccess', _33 => _33.quotationNumber]),
    _optionalChain([item, 'optionalAccess', _34 => _34.invoiceNumber]),
    _optionalChain([item, 'optionalAccess', _35 => _35.projectId]),
    _optionalChain([item, 'optionalAccess', _36 => _36.clientProjectId]),
    selectedProposalId,
    selectedClientProjectId,
    getClientDocumentUrlParam("clientProjectId"),
    type === "invoice" && selectedClientProjectId ? `INV-${selectedClientProjectId}` : "",
    type === "invoice" && getClientDocumentUrlParam("clientProjectId") ? `INV-${getClientDocumentUrlParam("clientProjectId")}` : "",
    type === "quotation" && selectedProposalId ? `QT-${selectedProposalId}` : "",
    type === "quotation" && getClientDocumentUrlParam("clientProjectId") ? `QT-${getClientDocumentUrlParam("clientProjectId")}` : "",
    type === "invoice" && _optionalChain([item, 'optionalAccess', _37 => _37.quotationNumber]) ? `INV-${item.quotationNumber}` : "",
    "document"
  ]);

  const getClientDocumentKey = (item, type, scopeId = getActiveClientDocumentScopeId()) => {
    const ref = getClientDocumentRefCandidates(item, type)[0] || "document";
    return `${scopeId}::${type}::${ref}`;
  };

  const findClientDocumentOverride = (item, type, scopeId) => {
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

  const getClientDocumentOverrideKeys = (item, type) => {
    const keys = [];
    getClientDocumentScopeCandidates().forEach(scope => {
      getClientDocumentRefCandidates(item, type).forEach(ref => {
        keys.push(`${scope}::${type}::${ref}`);
      });
    });
    return uniqueClientDocumentValues(keys);
  };

  const withClientDocumentOverride = (item, type, scopeId = getActiveClientDocumentScopeId()) => {
    const baseItem = item || {};
    const override = findClientDocumentOverride(baseItem, type, scopeId);
    return override ? { ...baseItem, ...override } : baseItem;
  };

  const saveClientDocumentOverride = async (item, type) => {
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
        clientId: getClientDocumentUrlParam("clientId") || _optionalChain([activeClientDetail, 'optionalAccess', _38 => _38.id]) || _optionalChain([leadDetailForm, 'optionalAccess', _39 => _39.id]) || "",
        clientProjectId: getClientDocumentUrlParam("clientProjectId") || selectedClientProjectId || _optionalChain([item, 'optionalAccess', _40 => _40.projectId]) || "",
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
        const records = Array.isArray(_optionalChain([res, 'optionalAccess', _41 => _41.data])) ? res.data : [];
        if (isMounted) {
          setClientDocumentRecords(records);
        }
        const nextOverrides = {};
        records.forEach((record) => {
          const item = record.item || record;
          const keys = Array.isArray(record.overrideKeys) && record.overrideKeys.length > 0
            ? record.overrideKeys
            : [record.documentKey || record.id].filter(Boolean);
          keys.forEach((key) => {
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

  const normalizeClientMatch = (value) => String(value || "").trim().toLowerCase();

  const adminRecordsMatch = (a, b) => {
    const left = normalizeClientMatch(a);
    const right = normalizeClientMatch(b);
    return Boolean(left && right && left === right);
  };

  const dedupeClientRecords = (records) => {
    const seen = new Set();
    return records.filter((record) => {
      const key = String(record.id || record.number || JSON.stringify(record));
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const getClientLinkedWorkspaceData = (client) => {
    if (!client) {
      return { clientProjects: [] , clientQuotes: [] , clientInvoices: []  };
    }

    const clientKeys = uniqueClientDocumentValues([
      client.id,
      client.name,
      client.company,
      client.email,
      client.loginEmail,
    ]);
    const projectStatuses = ["Planning", "Designing", "Development", "Testing", "Completed", "Cancelled", "Quotation sent", "Approved", "In progress", "On hold"];

    const belongsToClient = (record) =>
      clientKeys.some((key) =>
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _42 => _42.clientId]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _43 => _43.clientName]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _44 => _44.clientCompany]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _45 => _45.clientEmail]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _46 => _46.sentToEmail]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _47 => _47.email]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _48 => _48.preparedFor]), key) ||
        adminRecordsMatch(_optionalChain([record, 'optionalAccess', _49 => _49.billedTo]), key) ||
        normalizeClientMatch(_optionalChain([record, 'optionalAccess', _50 => _50.notes])).includes(normalizeClientMatch(key))
      );

    const matchedDocs = clientDocumentRecords.filter((record) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const keyMatchesClient = overrideKeys.some((key) =>
        clientKeys.some((clientKey) => normalizeClientMatch(key).startsWith(`${normalizeClientMatch(clientKey)}::`))
      );
      return record.visibleToClient && (belongsToClient(record) || belongsToClient(item) || keyMatchesClient);
    });

    const directProjects = projects.filter((project) => belongsToClient(project));
    const projectIdsFromDocs = matchedDocs
      .flatMap((record) => [record.clientProjectId, record.projectId, _optionalChain([record, 'access', _51 => _51.item, 'optionalAccess', _52 => _52.projectId])])
      .map(normalizeClientMatch)
      .filter(Boolean);
    const projectNamesFromDocs = matchedDocs
      .flatMap((record) => [record.projectName, _optionalChain([record, 'access', _53 => _53.item, 'optionalAccess', _54 => _54.projectName]), _optionalChain([record, 'access', _55 => _55.item, 'optionalAccess', _56 => _56.productName]), _optionalChain([record, 'access', _57 => _57.item, 'optionalAccess', _58 => _58.title])])
      .map(normalizeClientMatch)
      .filter(Boolean);

    const projectsLinkedByDocs = projects.filter((project) =>
      projectIdsFromDocs.includes(normalizeClientMatch(project.id)) ||
      projectNamesFromDocs.includes(normalizeClientMatch(project.name || project.title))
    );

    const derivedProjects = matchedDocs
      .map((record) => {
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
          priority: (["Low", "Medium", "High", "Critical"].includes(item.priority) ? item.priority : "Medium") ,
          status: (projectStatuses.includes(record.projectStatus) ? record.projectStatus : (projectStatuses.includes(item.projectStatus) ? item.projectStatus : (projectStatuses.includes(record.status) ? record.status : (projectStatuses.includes(item.status) ? item.status : "Planning")))) ,
          progress: Number(item.progress || item.completion || 10),
          budget: Number(item.budget || item.amount || item.rate || item.totalDue || item.planAPrice || 0),
          description: item.description || item.overviewNarrative || "",
          projectTodos: Array.isArray(record.projectTodos) ? record.projectTodos : (Array.isArray(item.projectTodos) ? item.projectTodos : []),
        } ;
      })
      .filter(Boolean) ;

    const seenNames = new Set();
    const seenIds = new Set();
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

    const belongsToClientProject = (record) =>
      clientProjectIds.includes(normalizeClientMatch(_optionalChain([record, 'optionalAccess', _59 => _59.projectId]) || _optionalChain([record, 'optionalAccess', _60 => _60.clientProjectId]))) ||
      clientProjectNames.includes(normalizeClientMatch(_optionalChain([record, 'optionalAccess', _61 => _61.projectName]) || _optionalChain([record, 'optionalAccess', _62 => _62.productName])));

    const directQuotes = quotations.filter((quote) => belongsToClient(quote) || belongsToClientProject(quote));
    const directInvoices = invoices.filter((invoice) => belongsToClient(invoice) || belongsToClientProject(invoice));
    const docQuotes = matchedDocs
      .filter((record) => record.documentType === "quotation")
      .map((record) => ({
        ...(record.item || {}),
        id: _optionalChain([record, 'access', _63 => _63.item, 'optionalAccess', _64 => _64.id]) || record.documentRef || record.id,
        number: _optionalChain([record, 'access', _65 => _65.item, 'optionalAccess', _66 => _66.number]) || record.documentRef || record.id,
        htmlContent: record.htmlContent,
        status: _optionalChain([record, 'access', _67 => _67.item, 'optionalAccess', _68 => _68.status]) || "Sent",
      }));
    const docInvoices = matchedDocs
      .filter((record) => record.documentType === "invoice")
      .map((record) => ({
        ...(record.item || {}),
        id: _optionalChain([record, 'access', _69 => _69.item, 'optionalAccess', _70 => _70.id]) || record.documentRef || record.id,
        number: _optionalChain([record, 'access', _71 => _71.item, 'optionalAccess', _72 => _72.number]) || record.documentRef || record.id,
        htmlContent: record.htmlContent,
        status: _optionalChain([record, 'access', _73 => _73.item, 'optionalAccess', _74 => _74.status]) || "Sent",
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
      companyWebsite: _optionalChain([companyWebsite, 'optionalAccess', _75 => _75.trim, 'call', _76 => _76()]) || "www.speshway.com",
      companyFooterName: _optionalChain([companyFooterName, 'optionalAccess', _77 => _77.trim, 'call', _78 => _78()]) || companyName,
      companyFooterAddress: _optionalChain([companyFooterAddress, 'optionalAccess', _79 => _79.trim, 'call', _80 => _80()]) || companyAddress,
      companyFooterContact: _optionalChain([companyFooterContact, 'optionalAccess', _81 => _81.trim, 'call', _82 => _82()]) || `${_optionalChain([companyWebsite, 'optionalAccess', _83 => _83.trim, 'call', _84 => _84()]) || "www.speshway.com"} - ${companyEmail} - ${companyPhone}`,
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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenClientItemPreview = (item, type) => {
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
        clientName: previewItem.clientName || _optionalChain([activeClientDetail, 'optionalAccess', _85 => _85.name]) || _optionalChain([activeClientDetail, 'optionalAccess', _86 => _86.company]) || _optionalChain([selectedProj, 'optionalAccess', _87 => _87.clientName]) || "naveen",
        productName: previewItem.productName || _optionalChain([selectedProj, 'optionalAccess', _88 => _88.name]) || _optionalChain([selectedProj, 'optionalAccess', _89 => _89.title]) || previewItem.title || "Software Project",
        rate: Number(previewItem.rate || previewItem.planAPrice || previewItem.amount || _optionalChain([selectedProj, 'optionalAccess', _90 => _90.budget]) || 50000),
        taxPct: Number(previewItem.taxPct !== undefined ? previewItem.taxPct : 18),
        totalDue: Number(previewItem.totalDue || Math.round(Number(previewItem.rate || previewItem.planAPrice || previewItem.amount || _optionalChain([selectedProj, 'optionalAccess', _91 => _91.budget]) || 50000) * 1.18))
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
    } catch (err) {
      console.error("[PREVIEW ERROR]", err);
      showToast(`Could not generate PDF preview: ${err.message || err}`, "error");
    }
  };

  const handleOpenLeadInspectorDocumentPreview = (title, html, item) => {
    const type = title.toLowerCase().includes("invoice") ? "invoice" : "quotation";
    const previewItem = withClientDocumentOverride(item, type);
    const hasOverride = Boolean(findClientDocumentOverride(item, type));
    const previewHtml = hasOverride
      ? (type === "invoice"
          ? generateSpeshwayTaxInvoicePdfHtml(previewItem, null, 1.0)
          : generateSpeshwayEstimationPdfHtml(null, previewItem, features.filter(f => f.projectId === _optionalChain([previewItem, 'optionalAccess', _92 => _92.projectId]) || f.projectName === _optionalChain([previewItem, 'optionalAccess', _93 => _93.projectName])), 1.0))
      : html;

    setClientPdfPreviewModal({
      title: hasOverride
        ? `${type === "invoice" ? "Tax Invoice Preview" : "Proposal Quotation Preview"} - ${_optionalChain([previewItem, 'optionalAccess', _94 => _94.number]) || _optionalChain([previewItem, 'optionalAccess', _95 => _95.id]) || _optionalChain([previewItem, 'optionalAccess', _96 => _96.title])}`
        : title,
      html: previewHtml,
      item: previewItem
    });
  };

  const handleOpenClientItemEmailModal = (
    item,
    type,
    preset
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
    const htmlContent = _optionalChain([preset, 'optionalAccess', _97 => _97.htmlContent]) && !hasSavedOverride ? preset.htmlContent : (
      type === "invoice"
        ? generateSpeshwayTaxInvoicePdfHtml(docItem, selectedProj || null, 1.0)
        : type === "agreement"
          ? generateSpeshwayAgreementPdfHtml(docItem, selectedProj || null, 1.0)
          : generateSpeshwayEstimationPdfHtml(null, docItem, features.filter(f => f.projectId === docItem.projectId || f.projectName === docItem.projectName), 1.0)
    );
    const presetFileName = (_optionalChain([preset, 'optionalAccess', _98 => _98.fileName]) || "").toLowerCase();
    const isCombinedDoc = presetFileName.includes("quotation_invoice") || presetFileName.includes("quotation-and-invoice");
    const docLabel = isCombinedDoc ? "Quotation and Tax Invoice" : (type === "invoice" ? "Tax Invoice" : type === "agreement" ? "Service Agreement" : "Quotation");
    const ref = docItem.number || docItem.id || docItem.title || docLabel;
    const clientName = docItem.clientName || _optionalChain([activeClientDetail, 'optionalAccess', _99 => _99.name]) || _optionalChain([leadDetailForm, 'optionalAccess', _100 => _100.name]) || "Client";
    const toEmail = (_optionalChain([preset, 'optionalAccess', _101 => _101.toEmail]) || docItem.clientEmail || _optionalChain([activeClientDetail, 'optionalAccess', _102 => _102.email]) || _optionalChain([leadDetailForm, 'optionalAccess', _103 => _103.email]) || "").trim();

    if (!toEmail) {
      showToast("Client email is missing. Add the email address before sending.", "error");
      return;
    }

    setClientEmailModal({
      toEmail,
      subject: _optionalChain([preset, 'optionalAccess', _104 => _104.subject]) || `${docLabel} ${ref} from Speshway Solutions`,
      textContent: _optionalChain([preset, 'optionalAccess', _105 => _105.textContent]) || `Hello ${clientName},\n\nPlease find attached your ${docLabel.toLowerCase()} PDF.\n\nBest regards,\nSpeshway Solutions`,
      fileName: _optionalChain([preset, 'optionalAccess', _106 => _106.fileName]) || `${docLabel}_${String(ref).replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
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
    const leadScope = leadDetailForm || {};
    const selectedLeadScope = selectedLeadForDetail || {};
    const sentDocItem = {
      ...baseSentDocItem,
      id: baseSentDocItem.id || baseSentDocItem.number || mailData.fileName.replace(".pdf", ""),
      number: baseSentDocItem.number || baseSentDocItem.id || mailData.fileName.replace(".pdf", ""),
      clientId: baseSentDocItem.clientId || getClientDocumentUrlParam("clientId") || _optionalChain([activeClientDetail, 'optionalAccess', _107 => _107.id]) || leadScope.clientId || "",
      clientName: baseSentDocItem.clientName || _optionalChain([activeClientDetail, 'optionalAccess', _108 => _108.name]) || leadScope.name || selectedLeadScope.name || "",
      clientCompany: baseSentDocItem.clientCompany || _optionalChain([activeClientDetail, 'optionalAccess', _109 => _109.company]) || leadScope.company || leadScope.companyName || selectedLeadScope.company || selectedLeadScope.companyName || "",
      clientEmail: baseSentDocItem.clientEmail || mailData.toEmail || _optionalChain([activeClientDetail, 'optionalAccess', _110 => _110.email]) || leadScope.email || selectedLeadScope.email || "",
      projectId: baseSentDocItem.projectId || selectedClientProjectId || getClientDocumentUrlParam("clientProjectId") || "",
      projectName: baseSentDocItem.projectName || baseSentDocItem.productName || _optionalChain([projects, 'access', _111 => _111.find, 'call', _112 => _112(p => p.id === selectedClientProjectId), 'optionalAccess', _113 => _113.name]) || "",
      sentToEmail: mailData.toEmail,
      status: baseSentDocItem.status || "Sent",
      updatedAt: new Date().toISOString(),
    };
    const sentDocRef = sentDocItem.number || sentDocItem.id || mailData.fileName.replace(".pdf", "");
    const sentDocScopes = uniqueClientDocumentValues([
      getActiveClientDocumentScopeId(),
      _optionalChain([activeClientDetail, 'optionalAccess', _114 => _114.id]),
      _optionalChain([activeClientDetail, 'optionalAccess', _115 => _115.name]),
      _optionalChain([activeClientDetail, 'optionalAccess', _116 => _116.company]),
      _optionalChain([activeClientDetail, 'optionalAccess', _117 => _117.email]),
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
    const sentDocKeys = sentDocScopes.flatMap((scope) => sentDocRefs.map((ref) => `${scope}::${sentDocType}::${ref}`));
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
      docRef: _optionalChain([mailData, 'access', _118 => _118.item, 'optionalAccess', _119 => _119.number]) || _optionalChain([mailData, 'access', _120 => _120.item, 'optionalAccess', _121 => _121.id]) || mailData.fileName.replace('.pdf', ''),
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
            const matchingQuote = quotations.find((quote) => {
              const quoteRefs = uniqueClientDocumentValues([quote.id, quote.number, quote.projectId, quote.projectName]);
              const invoiceRefs = uniqueClientDocumentValues([
                sentDocItem.id,
                sentDocItem.number,
                sentDocItem.quotationId,
                sentDocItem.proposalId,
                sentDocItem.projectId,
                sentDocItem.projectName,
              ]);
              return quoteRefs.some((quoteRef) =>
                invoiceRefs.some((invoiceRef) => invoiceRef === quoteRef || invoiceRef.includes(quoteRef) || quoteRef.includes(invoiceRef))
              );
            });
            if (matchingQuote) {
              const quoteDocRef = matchingQuote.number || matchingQuote.id;
              const quoteKeys = sentDocScopes.flatMap((scope) => [quoteDocRef, matchingQuote.id, matchingQuote.number, matchingQuote.projectId, matchingQuote.projectName]
                .filter(Boolean)
                .map((ref) => `${scope}::quotation::${ref}`));
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
                    clientEmail: (matchingQuote ).clientEmail || sentDocItem.clientEmail,
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
          showToast(_optionalChain([res, 'optionalAccess', _122 => _122.message]) || "Failed to deliver email. Please check SMTP settings.", "error");
        }
      } catch (err) {
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

  const isPdfBinaryNoise = (str) => {
    if (!str) return true;
    const s = str.trim();
    if (s.startsWith("%PDF") || s.startsWith("%") || s.startsWith("<<") || s.startsWith(">>") || s.includes("obj") || s.includes("endobj")) return true;
    if (/^\/[A-Z][a-zA-Z0-9_]*/.test(s)) return true;
    if (/^\d+\s+\d+\s+obj/i.test(s) || /0\s+obj/i.test(s)) return true;
    if (s.includes("Mozilla/5.0") || s.includes("AppleWebKit") || s.includes("Skia/PDF") || s.includes("CreationDate")) return true;
    return false;
  };

  const sanitizeTextContent = (text, defaultFallback = "") => {
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

  const extractReadableTextFromFile = (file, content) => {
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
          const lines = [];
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
      } catch (e13) {}
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
      const pdfTextLines = [];
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

  const getCleanPlanComparisonItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return defaultPlanComparisonDeliverables;
    const cleaned = items.filter((it) => {
      const name = it.deliverable || it.title || it.name || it.service || "";
      return name && !isPdfBinaryNoise(name);
    }).map((it) => ({
      deliverable: it.deliverable || it.title || it.name || it.service || "Deliverable Item",
      planA: it.planA !== undefined ? Boolean(it.planA) : true,
      planB: it.planB !== undefined ? Boolean(it.planB) : true
    }));
    return cleaned.length > 0 ? cleaned : defaultPlanComparisonDeliverables;
  };

  const [quotePlanComparisonItems, setQuotePlanComparisonItems] = useState(defaultPlanComparisonDeliverables);
  const [newComparisonDeliverableText, setNewComparisonDeliverableText] = useState("");

  const featureFileInputRef = React.useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFeatureFileUpload = (e) => {
    const file = _optionalChain([e, 'access', _123 => _123.target, 'access', _124 => _124.files, 'optionalAccess', _125 => _125[0]]);
    if (!file || !activeProjectDetail) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = _optionalChain([event, 'access', _126 => _126.target, 'optionalAccess', _127 => _127.result]) ;
      if (!content) return;

      let extractedFeatures = [];

      try {
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(content);
          const items = Array.isArray(parsed) ? parsed : (parsed.features || parsed.serviceItems || parsed.deliverables || [parsed]);
          extractedFeatures = items.map((item, idx) => ({
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

  const universalSectionFileInputRef = React.useRef(null);
  const [activeSectionToUpload, setActiveSectionToUpload] = useState("overview");

  const handleSaveQuotationSection = async (quoteId, updatedFields) => {
    const existingQuote = quotations.find(q => 
      q.id === quoteId || 
      (q ).number === quoteId || 
      (activeProjectDetail && (q.projectId === activeProjectDetail.id || (activeProjectDetail.name && q.projectName === activeProjectDetail.name)))
    ) || {
      id: quoteId,
      number: quoteId,
      projectId: _optionalChain([activeProjectDetail, 'optionalAccess', _128 => _128.id]) || _optionalChain([updatedFields, 'optionalAccess', _129 => _129.projectId]) || "PRJ-7030",
      clientName: _optionalChain([activeProjectDetail, 'optionalAccess', _130 => _130.clientName]) || _optionalChain([updatedFields, 'optionalAccess', _131 => _131.clientName]) || "Enterprise Client",
      projectName: _optionalChain([activeProjectDetail, 'optionalAccess', _132 => _132.name]) || _optionalChain([updatedFields, 'optionalAccess', _133 => _133.projectName]) || "Project",
      title: `${_optionalChain([activeProjectDetail, 'optionalAccess', _134 => _134.name]) || _optionalChain([updatedFields, 'optionalAccess', _135 => _135.projectName]) || "Project"} Custom Estimation Proposal`
    };

    const targetId = existingQuote.id || quoteId;
    const updatedData = {
      ...existingQuote,
      ...updatedFields,
      id: targetId,
      number: targetId,
      projectId: existingQuote.projectId || _optionalChain([activeProjectDetail, 'optionalAccess', _136 => _136.id]),
      clientName: existingQuote.clientName || _optionalChain([activeProjectDetail, 'optionalAccess', _137 => _137.clientName]),
      projectName: existingQuote.projectName || _optionalChain([activeProjectDetail, 'optionalAccess', _138 => _138.name])
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
          (q ).number === targetId || 
          (activeProjectDetail && (q.projectId === activeProjectDetail.id || (activeProjectDetail.name && q.projectName === activeProjectDetail.name)))
        );
        let updatedList = [];
        if (exists) {
          updatedList = prev.map(q => (
            q.id === targetId || 
            (q ).number === targetId || 
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

  const handleUniversalSectionFileUpload = (e, sectionId, activeQuote) => {
    const file = _optionalChain([e, 'access', _139 => _139.target, 'access', _140 => _140.files, 'optionalAccess', _141 => _141[0]]);
    if (!file || !activeProjectDetail) return;

    const currentSection = sectionId || activeProjectTab || "overview";
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = _optionalChain([event, 'access', _142 => _142.target, 'optionalAccess', _143 => _143.result]) ;
      if (!content) return;

      const lines = extractReadableTextFromFile(file, content);
      const cleanText = lines.join('\n');
      const qId = _optionalChain([activeQuote, 'optionalAccess', _144 => _144.id]) || _optionalChain([activeQuote, 'optionalAccess', _145 => _145.number]) || `QT-${activeProjectDetail.id}`;

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
        } catch (e14) {}
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

  const getQuoteFinalVal = (q) => {
    if (!q) return 0;
    let subtotal = 0;
    if (q.serviceItems && Array.isArray(q.serviceItems) && q.serviceItems.length > 0) {
      subtotal = q.serviceItems.reduce((acc, item) => {
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

  const quoteFileInputRef = React.useRef(null);
  const [uploadedQuoteFileName, setUploadedQuoteFileName] = useState("");

  const handleQuoteFileUpload = (e) => {
    const file = _optionalChain([e, 'access', _146 => _146.target, 'access', _147 => _147.files, 'optionalAccess', _148 => _148[0]]);
    if (!file) return;

    setUploadedQuoteFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = _optionalChain([event, 'access', _149 => _149.target, 'optionalAccess', _150 => _150.result]) ;
      if (!content) return;

      const projId = activeProjectDetail ? activeProjectDetail.id : `PROJ-${Date.now().toString().slice(-4)}`;
      const projName = activeProjectDetail ? activeProjectDetail.name : "General Proposal";
      const clientName = activeProjectDetail ? (activeProjectDetail.clientName || "Enterprise Client") : "Enterprise Client";

      let parsedQuoteData = null;

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
              ? (parsed.planComparisonItems || parsed.planComparison).map((it) => ({
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
              ? (parsed.serviceItems || parsed.items || parsed.deliverables).map((it) => ({
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
        const finalQuoteRecord = {
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

  const handleToggleProjectType = (typeKey) => {
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

    const typeMap = {
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

    let combinedFeatures = [];
    selectedData.forEach(d => {
      combinedFeatures = [...combinedFeatures, ...d.features];
    });

    const docRef = `SPW/EST/${projName.toUpperCase().replace(/[^A-Z0-9]/g, '')}/${selectedProjectTypes.join('-').toUpperCase()}/2026`;

    const newQuote = {
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

  const handleCreateScopeQuotation = async (project, scopeKey) => {
    if (!project) return;
    const projId = project.id || `PRJ-${Date.now().toString().slice(-4)}`;
    const projName = project.name || "Project";
    const clientName = project.clientName || "Enterprise Client";

    const scopeConfigs = {
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

      const newQuoteRecord = {
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

  const triggerDirectPdfDownload = (htmlBody, fileName, compNameOverride) => {
    return utilsTriggerDirectPdfDownload(htmlBody, fileName, compNameOverride);
  };


  const handleDownloadProjectReport = (project) => {
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

  const handleDownloadSingleQuote = (q) => {
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
      links: [{ name: "Dashboard Hub", id: "overview", icon: React.createElement(BarChart3, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2225}} ) }]
    },
    {
      title: "CRM Management",
      links: [
        { name: "Clients", id: "clients", icon: React.createElement(Users, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2230}} ) },
        { name: "Leads Log", id: "leads", icon: React.createElement(TrendingUp, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2231}} ) }
      ]
    },
    {
      title: "Projects workspace",
      links: [
        { name: "Our Projects", id: "our-projects", icon: React.createElement(Briefcase, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2237}} ) }
      ]
    },
    {
      title: "Corporate Management",
      links: [
        { name: "System Users", id: "users", icon: React.createElement(Users, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2243}} ) }
      ]
    },
    {
      title: "Analytics Reports",
      links: [
        { name: "Lead Reports", id: "reports-leads", icon: React.createElement(TrendingUp, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2249}} ) }
      ]
    },
    {
      title: "Configurations",
      links: [
        { name: "General Settings", id: "settings-general", icon: React.createElement(Settings, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2255}} ) }
      ]
    }
  ];

  const safeSetStateIfChanged = (setter, newData) => {
    setter((prev) => {
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
          } catch (e15) {}
        }
        
        if (Array.isArray(dataMap.client)) safeSetStateIfChanged(setClients, dataMap.client);
        if (Array.isArray(dataMap.call)) safeSetStateIfChanged(setCalls, dataMap.call);
        if (Array.isArray(dataMap.lead)) safeSetStateIfChanged(setLeads, dataMap.lead);
        
        if (Array.isArray(dataMap.project)) {
          const rawProjects = dataMap.project;
          const cleanProjects = rawProjects.filter((p) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");
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

      const fetchSingleEndpoint = async (t, retries = 2) => {
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
              const cleanProjects = payload.filter((p) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");
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

      const projectPayload = Array.isArray(_optionalChain([projectRes, 'optionalAccess', _151 => _151.data])) ? projectRes.data : [];
      const cleanProjects = projectPayload.filter((p) => p && (p.name || p.title || "").toLowerCase() !== "new" && p.id !== "PRJ-9961");

      safeSetStateIfChanged(setProjects, cleanProjects);
      safeSetStateIfChanged(setQuotations, Array.isArray(_optionalChain([quoteRes, 'optionalAccess', _152 => _152.data])) ? quoteRes.data : []);
      safeSetStateIfChanged(setInvoices, Array.isArray(_optionalChain([invoiceRes, 'optionalAccess', _153 => _153.data])) ? invoiceRes.data : []);
      safeSetStateIfChanged(setClientDocumentRecords, Array.isArray(_optionalChain([docRes, 'optionalAccess', _154 => _154.data])) ? docRes.data : []);
      safeSetStateIfChanged(setAgreements, Array.isArray(_optionalChain([agreementRes, 'optionalAccess', _155 => _155.data])) ? agreementRes.data : []);
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
    } catch (e16) {
      localStorage.setItem("user", JSON.stringify({ id: "ADM-001", name: "Admin", role: "admin", email: "admin@speshway.com" }));
    }
    loadDatabase(Boolean(initialBulkCache && _optionalChain([initialBulkCache, 'access', _156 => _156.client, 'optionalAccess', _157 => _157.length]) > 0 && _optionalChain([initialBulkCache, 'access', _158 => _158.lead, 'optionalAccess', _159 => _159.length]) > 0));
    
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

      if (_optionalChain([activeProjectDetail, 'optionalAccess', _160 => _160.id])) {
        params.set("projectId", activeProjectDetail.id);
        params.set("view", "detail");
        localStorage.setItem("speshway_crm_active_project_id", activeProjectDetail.id);
        localStorage.setItem("speshway_crm_active_view_mode", "detail");
        if (activeProjectTab) {
          params.set("section", activeProjectTab);
          localStorage.setItem("speshway_crm_active_project_tab", activeProjectTab);
        }
      } else if (_optionalChain([activeProjectProposalsView, 'optionalAccess', _161 => _161.id])) {
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
        
        if (_optionalChain([activeClientDetail, 'optionalAccess', _162 => _162.id])) {
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
        if (_optionalChain([selectedLeadForDetail, 'optionalAccess', _163 => _163.id])) {
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
        (p )._id === cleanId || 
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
      const found = clients.find(c => c.id === initialRestoreClientId || (c )._id === initialRestoreClientId);
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
      const found = leads.find(l => l.id === initialRestoreLeadId || (l )._id === initialRestoreLeadId);
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
    { label: "Active Clients", value: activeClientsCount, suffix: "Client Accounts", icon: React.createElement(UserCheck, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2718}} ), tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Open Leads", value: openLeadsCount, suffix: "Sales Pipeline", icon: React.createElement(Target, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2719}} ), tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Active Projects", value: activeProjectsCount, suffix: "Running Workloads", icon: React.createElement(Briefcase, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2720}} ), tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Quotations", value: quotations.length, suffix: "Client Proposals", icon: React.createElement(FileText, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2721}} ), tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Invoices", value: invoices.length, suffix: "Billing Documents", icon: React.createElement(CreditCard, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2722}} ), tone: "text-[#FF5349] bg-red-50 border-red-100" },
    { label: "Revenue", value: totalPaymentsValue, suffix: "Payments Collected", icon: React.createElement(DollarSign, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2723}} ), tone: "text-emerald-700 bg-emerald-50 border-emerald-100", currency: true },
    { label: "Project Scope", value: features.length, suffix: "Approved Features", icon: React.createElement(Layers, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2724}} ), tone: "text-[#06132D] bg-[#06132D]/5 border-slate-200" },
    { label: "Team Capacity", value: employees.length + teams.length, suffix: "People & Teams", icon: React.createElement(Users, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 2725}} ), tone: "text-violet-700 bg-violet-50 border-violet-100" }
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

  const openProjectQuotation = (p) => {
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
  const [clientFilterTab, setClientFilterTab] = useState("All");
  const [callForm, setCallForm] = useState({
    clientId: "", calledBy: "Nisha Rao", type: "Incoming", status: "Connected", purpose: "", notes: "", nextAction: ""
  });
  const [leadForm, setLeadForm] = useState({
    name: "", companyName: "", email: "", phone: "", whatsapp: "", source: "Other", interestedService: "Website", expectedBudget: 0, priority: "Medium", notes: "", status: "New", assignedEmployee: "Unassigned", nextFollowUpDate: new Date().toISOString().split("T")[0]
  });
  const [projectForm, setProjectForm] = useState({
    name: "", clientName: "", category: "", manager: "Nisha Rao", budget: 0, priority: "Medium", description: ""
  });
  const [editingOurProject, setEditingOurProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    clientName: "", projectName: "", title: "", itemsInput: "", discount: 0, tax: 18, validUntil: "", terms: ""
  });
  const [quoteItems, setQuoteItems] = useState([
    { description: "Vite React Animated UI & Shadcn Component Suite", qty: 1, rate: 20000 },
    { description: "Node.js Backend & Content API Server Integration", qty: 1, rate: 18000 },
    { description: "Production Deployment & Domain Binding", qty: 1, rate: 7000 }
  ]);

  const handleAddQuoteItemRow = () => {
    setQuoteItems(prev => [...prev, { description: "", qty: 1, rate: 1000 }]);
  };

  const handleRemoveQuoteItemRow = (index) => {
    setQuoteItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleQuoteItemChange = (index, field, value) => {
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
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "", email: "", password: "", role: "Client Access", status: "Active"
  });

  const handleOpenAddUserModal = () => {
    setUserForm({ name: "", email: "", password: "", role: "Client Access", status: "Active" });
    setShowAddUserModal(true);
  };

  const handleOpenEditUserModal = (u) => {
    setEditingUser(u);
    setUserForm({
      name: u.name || "",
      email: u.email || "",
      password: "",
      role: u.role || "Client Access",
      status: u.status || "Active"
    });
  };

  const handleCreateUserSubmit = async (e) => {
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

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!userForm.name || !userForm.email) {
      showToast("Full Name and Email Address are required.", "error");
      return;
    }

    const targetKey = editingUser.email || editingUser.id;
    const updatedPayload = {
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

    const idleId = (window ).requestIdleCallback
      ? (window ).requestIdleCallback(preloadForActiveWorkspace, { timeout: 1200 })
      : window.setTimeout(preloadForActiveWorkspace, 300);

    return () => {
      if ((window ).cancelIdleCallback && typeof idleId === "number") {
        (window ).cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId );
      }
    };
  }, [activeTab]);

  // ==========================================
  // CRUD OPERATIONS & HANDLERS (LIVE DB FETCH)
  // ==========================================

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const newClient = {
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

  const handleUpgradeClientToPermanent = async (id) => {
    try {
      const existingClient = clients.find(c => c.id === id || (c )._id === id);
      const existingLead = leads.find(l => l.id === id || (l )._id === id || (existingClient && l.email && existingClient.email && l.email.toLowerCase().trim() === existingClient.email.toLowerCase().trim()));

      const targetName = _optionalChain([existingClient, 'optionalAccess', _164 => _164.name]) || _optionalChain([existingLead, 'optionalAccess', _165 => _165.name]) || "Client";

      if (existingClient) {
        await fetch(`${API_URL}/crm/client/${encodeURIComponent(existingClient.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "Permanent", clientType: "Permanent", status: "Active" })
        }).catch(console.error);

        setClients(prev => prev.map(c => (c.id === existingClient.id || c.id === id) ? { ...c, type: "Permanent", clientType: "Permanent", status: "Active" } : c));
        if (_optionalChain([activeClientDetail, 'optionalAccess', _166 => _166.id]) === id || _optionalChain([activeClientDetail, 'optionalAccess', _167 => _167.id]) === existingClient.id) {
          setActiveClientDetail(prev => prev ? { ...prev, type: "Permanent", clientType: "Permanent", status: "Active" } : null);
        }
      } else if (existingLead) {
        const newClientRecord = {
          id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
          name: existingLead.name,
          company: existingLead.companyName || existingLead.name,
          email: existingLead.email || "",
          phone: existingLead.phone || "",
          whatsapp: existingLead.whatsapp || existingLead.phone || "",
          address: "Upgraded Client Profile",
          industry: "Technology",
          type: "Permanent",
          clientType: "Permanent" ,
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

        const saved = _optionalChain([res, 'optionalAccess', _168 => _168.data]) || newClientRecord;
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

  const handleDeactivateClient = async (id) => {
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
        if (_optionalChain([activeClientDetail, 'optionalAccess', _169 => _169.id]) === id) {
          setActiveClientDetail(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogCall = async (e) => {
    e.preventDefault();
    const client = clients.find(c => c.id === callForm.clientId) || clients[0];
    if (!client) return;

    const newCall = {
      id: `CAL-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: callForm.clientId,
      clientName: client.name,
      phoneNumber: client.phone,
      calledBy: callForm.calledBy,
      type: callForm.type ,
      date: new Date().toISOString().split("T")[0],
      startTime: "12:00 PM",
      endTime: "12:15 PM",
      duration: "15 mins",
      status: callForm.status ,
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

  const handleDeleteCall = async (id) => {
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

  const handleCreateLead = async (e) => {
    e.preventDefault();
    setShowTrashOnly(false);
    setLeadSearchQuery("");
    const createdId = `LEA-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`;
    const newLead = {
      id: createdId,
      name: leadForm.name || "New Lead Contact",
      companyName: leadForm.companyName || "Independent Business",
      email: leadForm.email || "",
      phone: leadForm.phone || "",
      whatsapp: leadForm.whatsapp || leadForm.phone || "",
      source: leadForm.source  || "Other",
      interestedService: leadForm.interestedService || "Website",
      expectedBudget: Number(leadForm.expectedBudget || 0),
      assignedEmployee: leadForm.assignedEmployee || "Unassigned",
      priority: leadForm.priority  || "Medium",
      leadScore: 50,
      nextFollowUpDate: leadForm.nextFollowUpDate || new Date(Date.now() + 3*24*60*60*1000).toISOString().split("T")[0],
      notes: leadForm.notes || "",
      status: (leadForm.status ) || "New",
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

  const handleCreateLeadInline = async (statusKey) => {
    if (!inlineLeadName.trim()) return;

    setShowTrashOnly(false);
    setLeadSearchQuery("");
    const nameVal = inlineLeadName.trim();
    const createdId = `LEA-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`;
    const newLead = {
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

  const handleConvertLead = async (lead) => {
    const credentialSlug = (lead.name || lead.companyName || "client")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 18) || "client";
    const loginEmail = `${credentialSlug}${Math.floor(1000 + Math.random() * 9000)}@crm.com`;
    const targetEmail = (lead.email || "").trim() || loginEmail;
    const tempPassword = `Spw@${Math.floor(100000 + Math.random() * 900000)}`;
    const clientLoginUrl = typeof window !== "undefined" ? `${window.location.origin}/auth/login` : "http://localhost:3000/auth/login";

    const newClient = {
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

    const newProject = {
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

        if (_optionalChain([resUser, 'optionalAccess', _170 => _170.success])) {
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

      let savedClient;
      if (existingClient) {
        const resClient = await fetch(`${API_URL}/crm/client/${existingClient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...existingClient, type: "Permanent", status: "Active", loginEmail, loginPassword: tempPassword, loginUrl: clientLoginUrl })
        }).then(r => r.json()).catch(() => null);
        savedClient = _optionalChain([resClient, 'optionalAccess', _171 => _171.data]) || { ...existingClient, type: "Permanent", status: "Active", loginEmail, loginPassword: tempPassword, loginUrl: clientLoginUrl };
        setClients(prev => prev.map(c => c.id === existingClient.id ? savedClient : c));
      } else {
        const resClient = await fetch(`${API_URL}/crm/client`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newClient)
        }).then(r => r.json()).catch(() => null);
        savedClient = _optionalChain([resClient, 'optionalAccess', _172 => _172.data]) || newClient;
        setClients(prev => [...prev.filter(c => c.id !== savedClient.id), savedClient]);
      }

      const resProj = await fetch(`${API_URL}/crm/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      }).then(r => r.json()).catch(() => null);
      const savedProj = _optionalChain([resProj, 'optionalAccess', _173 => _173.data]) || newProject;
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
        credentialsSent = Boolean(_optionalChain([credentialsRes, 'optionalAccess', _174 => _174.success]));
        credentialsMessage = _optionalChain([credentialsRes, 'optionalAccess', _175 => _175.message]) || "";
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

  const handleMarkTemporaryClient = async (lead) => {
    const updatedLead = {
      ...lead,
      status: "Won" ,
      clientType: "Temporary" ,
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

  const handleMoveToFollowUp = async (lead) => {
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

  const handleStartEditOurProject = (proj) => {
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

  const handleStartEditProject = (proj) => {
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

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setShowProjectModal(false);
    const isEdit = !!editingProject;
    const currentEditing = editingProject;
    setEditingProject(null);

    const projData = {
      id: currentEditing ? currentEditing.id : `PRJ-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`,
      name: projectForm.name,
      title: projectForm.name,
      clientName: projectForm.clientName,
      category: projectForm.category || "Custom Development",
      manager: projectForm.manager || "Nisha Rao",
      teamMembers: _optionalChain([currentEditing, 'optionalAccess', _176 => _176.teamMembers]) || ["Karan (Developer)"],
      startDate: _optionalChain([currentEditing, 'optionalAccess', _177 => _177.startDate]) || new Date().toISOString().split("T")[0],
      expectedCompletionDate: _optionalChain([currentEditing, 'optionalAccess', _178 => _178.expectedCompletionDate]) || new Date(Date.now() + 45*24*60*60*1000).toISOString().split("T")[0],
      budget: Number(projectForm.budget || 0),
      priority: (projectForm.priority ) || "Medium",
      description: projectForm.description || "",
      progress: _optionalChain([currentEditing, 'optionalAccess', _179 => _179.progress]) || 0,
      status: _optionalChain([currentEditing, 'optionalAccess', _180 => _180.status]) || "Planning"
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

  const handleCreateOurProject = async (e) => {
    e.preventDefault();
    setShowOurProjectModal(false);
    const isEdit = !!editingOurProject;
    const currentEditing = editingOurProject;
    setEditingOurProject(null);

    const projData = {
      id: currentEditing ? currentEditing.id : `OPRJ-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 899)}`,
      name: ourProjectForm.name,
      title: ourProjectForm.name,
      clientName: ourProjectForm.clientName || "Internal Enterprise",
      category: ourProjectForm.category || "Web Application",
      budget: Number(ourProjectForm.budget || 0),
      status: _optionalChain([currentEditing, 'optionalAccess', _181 => _181.status]) || "Live Production",
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

  const handleDeleteLeadFromWorkspace = async (leadId) => {
    const targetLead = leads.find(l => l.id === leadId);
    const targetName = _optionalChain([targetLead, 'optionalAccess', _182 => _182.name]) || leadId;

    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (_optionalChain([selectedLeadForDetail, 'optionalAccess', _183 => _183.id]) === leadId) {
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

  const handleDeleteClientPermanent = async (clientId) => {
    const targetClient = clients.find(c => c.id === clientId);
    const targetName = _optionalChain([targetClient, 'optionalAccess', _184 => _184.name]) || clientId;

    setClients(prev => prev.filter(c => c.id !== clientId));
    if (_optionalChain([activeClientDetail, 'optionalAccess', _185 => _185.id]) === clientId) {
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

  const handleDeleteProjectFromWorkspace = async (projectId) => {
    const targetProj = projects.find(p => p.id === projectId);
    const targetName = _optionalChain([targetProj, 'optionalAccess', _186 => _186.name]) || projectId;

    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (_optionalChain([activeProjectDetail, 'optionalAccess', _187 => _187.id]) === projectId) setActiveProjectDetail(null);
    if (_optionalChain([activeProjectProposalsView, 'optionalAccess', _188 => _188.id]) === projectId) setActiveProjectProposalsView(null);
    showToast(`Project '${targetName}' deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/project/${encodeURIComponent(projectId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Project Error]", err);
    }
  };

  const handleDeleteQuotation = async (quoteId) => {
    setQuotations(prev => prev.filter(q => q.id !== quoteId && (q ).number !== quoteId));
    showToast(`Quotation record deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/quotations/${encodeURIComponent(quoteId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Quotation Error]", err);
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    setInvoices(prev => prev.filter(i => i.id !== invoiceId && (i ).number !== invoiceId));
    showToast(`Invoice record deleted successfully!`, "success");

    try {
      localStorage.removeItem("speshway_crm_bulk_cache");
      await fetch(`${API_URL}/crm/invoice/${encodeURIComponent(invoiceId)}`, { method: "DELETE" }).catch(() => {});
      await fetch(`${API_URL}/crm/invoices/${encodeURIComponent(invoiceId)}`, { method: "DELETE" }).catch(() => {});
    } catch (err) {
      console.error("[Delete Invoice Error]", err);
    }
  };

  const handleDeleteOurProject = async (id) => {
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

  const handleUpdateProjectStatus = async (id, status) => {
    // 1. Optimistic UI Updates (Case-Insensitive)
    setProjects(prev => prev.map(p => String(p.id || "").toLowerCase() === String(id || "").toLowerCase() ? { ...p, status } : p));
    if (activeProjectDetail && String(activeProjectDetail.id || "").toLowerCase() === String(id || "").toLowerCase()) {
      setActiveProjectDetail(prev => prev ? { ...prev, status } : null);
    }

    setClientDocumentRecords(prev => prev.map((record) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const matchesDoc = (
        String(record.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(record.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(item.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        String(item.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
        overrideKeys.some((key) => String(key || "").toLowerCase().includes(`::${String(id || "").toLowerCase()}`))
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

      const docsToUpdate = clientDocumentRecords.filter((record) => {
        const item = record.item || {};
        const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
        return (
          String(record.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(record.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(item.projectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          String(item.clientProjectId || "").toLowerCase() === String(id || "").toLowerCase() ||
          overrideKeys.some((key) => String(key || "").toLowerCase().includes(`::${String(id || "").toLowerCase()}`))
        );
      });

      const updatedAt = new Date().toISOString();
      await Promise.all(docsToUpdate.map(async (record) => {
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

  const handleViewClientDoc = async (log) => {
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
      const fullDoc = _optionalChain([res, 'optionalAccess', _189 => _189.data]);
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

  const getProjectDocumentMatches = (project) => {
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

    return clientDocumentRecords.filter((record) => {
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
        overrideKeys.some((key) => projectKeys.some((projectKey) => normalizeClientMatch(key).includes(`::${projectKey}`)));
      const clientMatch = !clientKeys.length || recordClientKeys.some((key) => clientKeys.includes(key));
      return projectMatch && clientMatch;
    });
  };

  const getProjectTodos = (project) => {
    const match = getProjectDocumentMatches(project).find((record) =>
      Array.isArray(record.projectTodos) || Array.isArray(_optionalChain([record, 'access', _190 => _190.item, 'optionalAccess', _191 => _191.projectTodos]))
    );
    const todos = _optionalChain([match, 'optionalAccess', _192 => _192.projectTodos]) || _optionalChain([match, 'optionalAccess', _193 => _193.item, 'optionalAccess', _194 => _194.projectTodos]) || project.projectTodos || [];
    return Array.isArray(todos) ? todos : [];
  };

  const persistProjectTodos = async (project, todos) => {
    const matches = getProjectDocumentMatches(project);
    const updatedAt = new Date().toISOString();
    const clientId = _optionalChain([activeClientDetail, 'optionalAccess', _195 => _195.id]) || project.clientId || "";
    const documentKey = `${clientId || project.clientName || "client"}::project::${project.id}`;
    const baseRecord = {
      documentKey,
      id: documentKey,
      documentType: "project",
      documentRef: project.id,
      visibleToClient: true,
      clientId,
      clientName: _optionalChain([activeClientDetail, 'optionalAccess', _196 => _196.name]) || project.clientName || "",
      clientCompany: _optionalChain([activeClientDetail, 'optionalAccess', _197 => _197.company]) || project.clientName || "",
      clientEmail: _optionalChain([activeClientDetail, 'optionalAccess', _198 => _198.email]) || "",
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
        clientName: _optionalChain([activeClientDetail, 'optionalAccess', _199 => _199.name]) || project.clientName || "",
        clientEmail: _optionalChain([activeClientDetail, 'optionalAccess', _200 => _200.email]) || "",
        projectStatus: project.status,
        projectTodos: todos,
        updatedAt,
      },
    };
    const recordsToSave = matches.length ? matches : [baseRecord];

    await Promise.all(recordsToSave.map(async (record) => {
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
          projectId: _optionalChain([record, 'access', _201 => _201.item, 'optionalAccess', _202 => _202.projectId]) || project.id,
          projectName: _optionalChain([record, 'access', _203 => _203.item, 'optionalAccess', _204 => _204.projectName]) || project.name || project.title,
          projectStatus: _optionalChain([record, 'access', _205 => _205.item, 'optionalAccess', _206 => _206.projectStatus]) || project.status,
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
      const savedKeys = new Set(recordsToSave.map((record) => record.documentKey || record.id || documentKey));
      const next = prev.map((record) => {
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

  const handleAddProjectTodo = async (project) => {
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

  const handleToggleProjectTodo = async (project, todoId) => {
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

  const handleDeleteProjectTodo = async (project, todoId) => {
    const todos = getProjectTodos(project).filter((todo) => todo.id !== todoId);
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo removed.", "success");
    } catch (err) {
      console.error("[Project Todo Delete Error]", err);
      showToast("Failed to remove project todo.", "error");
    }
  };

  const handleEditQuote = (q) => {
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
    } );
    const cleanedCompItems = getCleanPlanComparisonItems(q.planComparisonItems || []);
    setQuotePlanComparisonItems(cleanedCompItems);
    setShowQuoteModal(true);
  };

  const handleDeleteQuote = async (idOrNumber) => {
    if (!window.confirm("Are you sure you want to delete this quotation?")) return;
    try {
      await fetch(`${API_URL}/crm/quotation/${idOrNumber}`, { method: "DELETE" });
      setQuotations(prev => prev.filter(q => q.id !== idOrNumber && (q ).number !== idOrNumber));
    } catch (err) {
      console.error("[Delete Quotation Error]", err);
    }
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();

    const cleanCompItems = getCleanPlanComparisonItems(quotePlanComparisonItems);

    const quoteId = editingQuote ? (editingQuote.id || editingQuote.number) : `QT-${Date.now().toString().slice(-4)}`;
    const quoteData = {
      id: quoteId,
      number: quoteId,
      projectId: _optionalChain([activeProjectDetail, 'optionalAccess', _207 => _207.id]),
      clientName: quoteForm.clientName || _optionalChain([activeProjectDetail, 'optionalAccess', _208 => _208.clientName]) || "Client Profile",
      projectName: quoteForm.projectName || _optionalChain([activeProjectDetail, 'optionalAccess', _209 => _209.name]) || "General Service Contract",
      title: quoteForm.title,
      currency: (quoteForm ).currency || "Indian Rupees (INR)",
      planAPrice: Number((quoteForm ).planAPrice || 60000),
      planBPrice: Number((quoteForm ).planBPrice || 65000),
      planComparisonItems: cleanCompItems,
      discount: Number(quoteForm.discount),
      tax: Number(quoteForm.tax),
      validUntil: quoteForm.validUntil || new Date(Date.now() + 30*24*60*60*1000).toISOString().split("T")[0],
      terms: (quoteForm ).termsAndConditions || quoteForm.terms || "",
      notes: "Invoice terms active upon signature.",
      createdBy: "Admin Operator",
      createdDate: _optionalChain([editingQuote, 'optionalAccess', _210 => _210.createdDate]) || new Date().toISOString().split("T")[0],
      status: editingQuote ? editingQuote.status : "Approved",
      overviewNarrative: (quoteForm ).overviewNarrative || "",
      customerDesc: (quoteForm ).customerDesc || "",
      merchantDesc: (quoteForm ).merchantDesc || "",
      adminDesc: (quoteForm ).adminDesc || "",
      paymentTerms: (quoteForm ).paymentTerms || "",
      termsAndConditions: (quoteForm ).termsAndConditions || quoteForm.terms || ""
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
        setQuotations(prev => prev.map(q => (q.id === qId || (q ).number === qId) ? updated : q));
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

  const handleApproveQuotation = async (number) => {
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

  const handleEditFeature = (feat) => {
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

  const handleDeleteFeature = async (featureId) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    try {
      await fetch(`${API_URL}/crm/feature/${featureId}`, { method: "DELETE" });
      setFeatures(prev => prev.filter(f => f.id !== featureId));
    } catch (err) {
      console.error("[Delete Feature Error]", err);
    }
  };

  const handleCreateFeature = async (e) => {
    e.preventDefault();
    const projId = featureForm.projectId || _optionalChain([activeProjectDetail, 'optionalAccess', _211 => _211.id]) || "OPRJ-7001";
    const projName = _optionalChain([activeProjectDetail, 'optionalAccess', _212 => _212.name]) || "Build Your Thoughts";

    const featData = {
      id: editingFeature ? editingFeature.id : `FEAT-${Math.floor(100 + Math.random() * 899)}`,
      projectId: projId,
      projectName: projName,
      title: featureForm.title,
      moduleName: featureForm.moduleName || "Core Feature",
      description: featureForm.description || `Feature requirement: ${featureForm.title}`,
      requirementType: "Functional",
      priority: featureForm.priority || "High",
      assignedDeveloper: featureForm.assignedDeveloper || "Development Team",
      startDate: _optionalChain([editingFeature, 'optionalAccess', _213 => _213.startDate]) || new Date().toISOString().split("T")[0],
      dueDate: _optionalChain([editingFeature, 'optionalAccess', _214 => _214.dueDate]) || new Date(Date.now() + 14*24*60*60*1000).toISOString().split("T")[0],
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

  const handleCreateInnovation = async (e) => {
    e.preventDefault();
    const project = projects.find(p => p.id === innovationForm.projectId) || projects[0];
    if (!project) return;

    const newInn = {
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

  const handleCreateInvoice = async (e) => {
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

  const handleCreatePayment = async (e) => {
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

  const handleCreateExpense = async (e) => {
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

  const handleCreateEmployee = async (e) => {
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

  const handleCreateTeam = async (e) => {
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

  const handleDeleteUser = async (userKey) => {
    if (userKey === "admin@crm.com") {
      showToast("Primary Seeded Admin account cannot be deleted.", "error");
      return;
    }

    const targetUser = users.find(u => u.email === userKey || u.id === userKey);
    const userName = _optionalChain([targetUser, 'optionalAccess', _215 => _215.name]) || userKey;

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

  const handleResendClientCredentials = async (client) => {
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
          projectName: _optionalChain([projects, 'access', _216 => _216.find, 'call', _217 => _217(p => p.clientId === client.id || p.clientName === client.name || p.clientName === client.company), 'optionalAccess', _218 => _218.name]) || "Client dashboard"
        })
      }).then(r => r.json());

      if (_optionalChain([res, 'optionalAccess', _219 => _219.success])) {
        const credentialsSentAt = new Date().toISOString();
        await fetch(`${API_URL}/crm/client/${encodeURIComponent(client.id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credentialsSentAt })
        });
        setClients(prev => prev.map(c => c.id === client.id ? { ...c, credentialsSentAt } : c));
        setActiveClientDetail(prev => _optionalChain([prev, 'optionalAccess', _220 => _220.id]) === client.id ? { ...prev, credentialsSentAt } : prev);
        showToast(`Credentials sent to ${client.email}.`, "success");
      } else {
        showToast(_optionalChain([res, 'optionalAccess', _221 => _221.message]) || "Failed to send credentials.", "error");
      }
    } catch (err) {
      console.error("Resend credentials failed:", err);
      showToast("Failed to send credentials.", "error");
    }
  };

  const handleDeleteClient = async (id) => {
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

  const handleRestoreClient = async (id) => {
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

  const calculateQuoteFinal = (quote) => {
    const subtotal = quote.serviceItems.reduce((acc, curr) => acc + (curr.qty * curr.rate), 0);
    const discVal = subtotal * (quote.discount / 100);
    const taxVal = (subtotal - discVal) * (quote.tax / 100);
    return Math.floor(subtotal - discVal + taxVal);
  };

  const handleDeleteProject = async (id) => {
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
  const handleImportLeads = (e) => {
    const file = _optionalChain([e, 'access', _222 => _222.target, 'access', _223 => _223.files, 'optionalAccess', _224 => _224[0]]);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = _optionalChain([event, 'access', _225 => _225.target, 'optionalAccess', _226 => _226.result]) ;
      if (!content) return;

      try {
        let importedCount = 0;
        if (file.name.toLowerCase().endsWith(".json")) {
          const parsed = JSON.parse(content);
          const rawList = Array.isArray(parsed) ? parsed : [parsed];
          
          for (const item of rawList) {
            const cleanLead = {
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
            const cleanLead = {
              id: `LEA-${Math.floor(1000 + Math.random() * 9000)}`,
              name: _optionalChain([parts, 'access', _227 => _227[0], 'optionalAccess', _228 => _228.trim, 'call', _229 => _229()]) || "Imported Lead",
              companyName: _optionalChain([parts, 'access', _230 => _230[1], 'optionalAccess', _231 => _231.trim, 'call', _232 => _232()]) || "Imported Company",
              email: _optionalChain([parts, 'access', _233 => _233[2], 'optionalAccess', _234 => _234.trim, 'call', _235 => _235()]) || "imported@speshway.com",
              phone: _optionalChain([parts, 'access', _236 => _236[3], 'optionalAccess', _237 => _237.trim, 'call', _238 => _238()]) || "7702233931",
              whatsapp: _optionalChain([parts, 'access', _239 => _239[3], 'optionalAccess', _240 => _240.trim, 'call', _241 => _241()]) || "7702233931",
              source: "Other",
              interestedService: _optionalChain([parts, 'access', _242 => _242[4], 'optionalAccess', _243 => _243.trim, 'call', _244 => _244()]) || "Website",
              expectedBudget: Number(_optionalChain([parts, 'access', _245 => _245[5], 'optionalAccess', _246 => _246.trim, 'call', _247 => _247()]) || 50000),
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
  const handleDeleteCustomStage = (keyToDelete) => {
    if (["New", "Contacted", "Qualified", "Proposal sent", "Won", "Lost"].includes(keyToDelete)) {
      alert("Primary core stages cannot be deleted.");
      return;
    }
    if (!confirm("Are you sure you want to delete this custom stage? Any leads in this stage will need to be re-assigned.")) return;

    setColumns(prev => prev.filter(c => c.key !== keyToDelete));
    showToast("Stage removed from Kanban board.", "info");
  };

  const importLeadsFileInputRef = React.useRef(null);

  const handleDeleteLead = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this lead from the database?")) return;

    if (_optionalChain([selectedLeadForDetail, 'optionalAccess', _248 => _248.id]) === id) {
      setSelectedLeadForDetail(null);
      setLeadDetailForm(null);
    }

    try {
      setLeads(prev => prev.filter(l => l.id !== id && (l )._id !== id));
      await Promise.all([
        fetch(`${API_URL}/crm/lead/${encodeURIComponent(id)}`, { method: "DELETE" }),
        fetch(`${API_URL}/crm/leads/${encodeURIComponent(id)}`, { method: "DELETE" })
      ]).catch(() => {});

      showToast("Lead record permanently deleted from database.", "success");
      loadDatabase(true);
    } catch (err) {
      console.error("[Delete Lead Error]", err);
      setLeads(prev => prev.filter(l => l.id !== id && (l )._id !== id));
    }
  };

  const handleRestoreLead = async (id) => {
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

  const handleNavigateLeadDetail = (dir) => {
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

  const handleRevertLead = async (lead) => {
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

  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    const currentLead = leads.find(lead => lead.id === leadId);
    if (!currentLead || currentLead.status === newStatus) return;

    if (newStatus === "Won" && currentLead.clientType !== "Permanent") {
      await handleConvertLead(currentLead);
      return;
    }

    const previousLeads = leads;
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus  } : lead));

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
      React.createElement('div', { className: "min-h-screen bg-gray-50 flex items-center justify-center font-sans"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4880}}
        , React.createElement(GlassCard, { className: "p-10 flex flex-col items-center gap-4 bg-white/70 shadow-elevated border border-red-500/10 text-center max-w-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4881}}
          , React.createElement(ShieldAlert, { className: "w-10 h-10 text-red-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4882}} )
          , React.createElement('span', { className: "font-heading font-extrabold text-[#071E34] text-sm tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4883}}, "Database Sync Failed"  )
          , React.createElement('p', { className: "text-xs text-gray-500 leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4884}}, "Could not establish connection to the Node.js API server ("         , API_URL, "). Please ensure the backend is active and running."        )
          , React.createElement(Button, { onClick: () => loadDatabase(), variant: "primary", className: "mt-2 w-full text-xs font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4885}}, "Retry Connection"

          )
        )
      )
    );
  }

  // Derived state for active project detail modal
  let activeQuoteForDetail = null;
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
  let reviewFeatures = [];
  if (reviewingQuote) {
    reviewFeatures = features.filter(f => 
      f.projectId === reviewingQuote.projectId || 
      f.projectId === _optionalChain([activeProjectDetail, 'optionalAccess', _249 => _249.id]) || 
      f.projectName === reviewingQuote.projectName || 
      f.projectName === _optionalChain([activeProjectDetail, 'optionalAccess', _250 => _250.name])
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
    React.createElement('div', { className: "min-h-screen bg-[#F4F7FC] flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-[#FF5349] selection:text-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4953}}
      , !hideSidebar && (
        React.createElement('aside', { className: "w-full md:w-64 md:h-screen md:sticky md:top-0 bg-[#06132D] text-white flex flex-col shrink-0 px-5 py-5 border-r border-slate-800/40 relative overflow-hidden"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4955}}
          , React.createElement('div', { className: "flex flex-col gap-6 min-h-0 flex-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4956}}
            /* Brand Logo and icon - Matching Image 2 */
            , React.createElement('div', { className: "border-b border-slate-800/60 pb-4 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4958}}
              , React.createElement(CrmBrandLogo, { size: "sm", dark: true, onlyCrm: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 4959}} )
            )

            /* Unified Navigation List with Perfect Alignment */
            , React.createElement('div', { className: "flex flex-col min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 no-scrollbar"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4963}}
              , React.createElement('nav', { className: "flex flex-col gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4964}}
                , sidebarCategories.flatMap(category => category.links).map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    React.createElement('div', { key: link.id, className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 4968}}
                      , React.createElement('button', {
                        onClick: () => {
                          setActiveTab(link.id);
                          setActiveClientDetail(null);
                          setActiveProjectDetail(null);
                          setActiveProjectProposalsView(null);
                          setSelectedClientProjectId(null);
                        },
                        className: `w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all duration-200 ease-out overflow-hidden [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0 [&>svg]:text-current ${
                          isActive
                            ? "bg-[#FF5349] hover:bg-[#F05454] !text-white shadow-lg shadow-[#FF5349]/25 scale-[1.02]"
                            : "!text-slate-300 hover:!text-white hover:bg-white/10"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 4969}}

                        , link.icon
                        , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 4984}}, link.name)
                      )
                    )
                  );
                })
              )
            )

            /* Bottom Floating White User Card - Matching Image 2 */
            , React.createElement('div', { className: "pt-4 border-t border-slate-800/60 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4993}}
              , React.createElement('div', { className: "bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex items-center justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4994}}
                , React.createElement('div', { className: "flex items-center gap-2.5 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4995}}
                  , React.createElement('div', { className: "w-8 h-8 rounded-xl bg-[#06132D] text-white font-black flex items-center justify-center text-xs shrink-0 shadow-sm"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 4996}}, "AD"

                  )
                  , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 4999}}
                    , React.createElement('p', { className: "text-xs font-black text-slate-900 truncate leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5000}}, "Admin Operator" )
                    , React.createElement('p', { className: "text-[10px] text-slate-500 font-medium truncate leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5001}}, "Super Admin Account"  )
                  )
                )
                , React.createElement('button', { 
                  onClick: handleLogout,
                  title: "Log Out Workspace"  ,
                  className: "p-1.5 rounded-lg text-[#FF5349] hover:bg-red-50 transition-colors shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5004}}

                  , React.createElement(LogOut, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5009}} )
                )
              )
            )
          )
        )
      )

      /* 2. MAIN WORKSPACE CONTENT CONTAINER */
      , React.createElement('main', { className: "flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto animate-page-enter"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5018}}
        , React.createElement('input', { 
          type: "file", 
          ref: quoteFileInputRef, 
          accept: ".txt,.json,.csv,.doc,.docx,.pdf", 
          onChange: handleQuoteFileUpload, 
          className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5019}} 
        )
        , activeProjectDetail ? (
          React.createElement(Suspense, { fallback: React.createElement('div', { className: "p-12 text-center text-xs font-semibold text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5027}}, "Loading project details workspace..."   ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 5027}}
            , React.createElement(ProjectDetailModal, {
              activeProjectDetail: activeProjectDetail,
              setActiveProjectDetail: setActiveProjectDetail,
              activeProjectTab: activeProjectTab,
              setActiveProjectTab: setActiveProjectTab,
              quotations: quotations,
              setQuotations: setQuotations,
              features: features,
              setFeatures: setFeatures,
              setReviewingQuote: setReviewingQuote,
              API_URL: API_URL,
              loadDatabase: loadDatabase,
              defaultPlanComparisonDeliverables: defaultPlanComparisonDeliverables,
              getCleanPlanComparisonItems: getCleanPlanComparisonItems,
              generateSpeshwayEstimationPdfHtml: generateSpeshwayEstimationPdfHtml,
              triggerDirectPdfDownload: triggerDirectPdfDownload,
              universalSectionFileInputRef: universalSectionFileInputRef,
              activeSectionToUpload: activeSectionToUpload,
              setActiveSectionToUpload: setActiveSectionToUpload,
              handleUniversalSectionFileUpload: handleUniversalSectionFileUpload,
              handleSaveQuotationSection: handleSaveQuotationSection, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5028}}
            )
          )
        ) : activeProjectProposalsView ? (
          React.createElement(Suspense, { fallback: React.createElement('div', { className: "p-12 text-center text-xs font-semibold text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5052}}, "Loading proposal workspace..."  ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 5052}}
            , React.createElement(ProjectProposalsWorkspace, {
              project: activeProjectProposalsView,
              quotations: quotations,
              setQuotations: setQuotations,
              invoices: invoices,
              agreements: agreements,
              autoOpenAgreement: autoOpenAgreementStudio,
              onBackToProjects: () => {
                setActiveProjectProposalsView(null);
                setAutoOpenAgreementStudio(false);
              },
              onOpen8Sections: (quote) => {
                setActiveProjectDetail(activeProjectProposalsView);
                setActiveProjectTab("overview");
                setReviewingQuote(null);
              },
              API_URL: API_URL,
              loadDatabase: loadDatabase,
              triggerDirectPdfDownload: triggerDirectPdfDownload,
              onWorkspaceSubtabChange: setActiveProjectWorkspaceSubtab,
              onInvoiceStudioChange: setIsProjectInvoiceStudioOpen, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5053}}
            )
          )
        ) : (
          React.createElement(React.Fragment, null
            , React.createElement('header', { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5078}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5079}}
                , React.createElement('h1', { className: "text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5080}}, "Welcome back, "
                    , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5081}}, "Admin Operator" ), " 👋"
                )
                , React.createElement('p', { className: "text-xs font-semibold text-slate-500 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5083}}, "Here's what's happening with your CRM today."

                )
              )
              , React.createElement('div', { className: "flex items-center gap-3 w-full sm:w-auto"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5087}}
                , React.createElement('div', { className: "relative flex-1 sm:w-64"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5088}}
                  , React.createElement('input', {
                    type: "text",
                    placeholder: "Search clients, projects, leads..."   ,
                    className: "w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-[#FF5349] focus:ring-2 focus:ring-red-100 shadow-xs"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5089}}
                  )
                  , React.createElement(Search, { size: 14, className: "absolute left-3 top-2.5 text-slate-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5094}} )
                )
              )
            )

            /* Tab: Overview (Hub Dashboard) */
            , activeTab === "overview" && (
              React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5101}}
                , React.createElement('div', { className: "flex items-center justify-between gap-3 flex-wrap"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5102}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5103}}
                    , React.createElement('h2', { className: "font-heading font-extrabold text-base text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5104}}, "Executive Dashboard" )
                    , React.createElement('p', { className: "text-xs text-gray-500 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5105}}, "Key business health across clients, sales, projects, billing, and delivery."         )
                  )
                  , React.createElement('div', { className: "text-[10px] font-bold text-[#FF5349] bg-red-50 border border-red-100 px-3 py-1.5 rounded-full uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5107}}, "Core operating metrics"

                  )
                )

                , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5112}}
                  , dashboardMetricCards.map((card) => (
                    React.createElement('div', { key: card.label, className: "p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 min-w-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5114}}
                      , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5115}}
                        , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5116}}, card.label)
                        , React.createElement('span', { className: `w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${card.tone}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5117}}
                          , card.icon
                        )
                      )
                      , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5121}}
                        , React.createElement('span', { className: "text-2xl font-extrabold text-[#06132D] leading-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5122}}
                          , (card ).currency ? `₹${Number(card.value || 0).toLocaleString('en-IN')}` : Number(card.value || 0).toLocaleString('en-IN')
                        )
                        , React.createElement('span', { className: "text-[10px] text-gray-500 font-semibold uppercase tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5125}}, card.suffix)
                      )
                    )
                  ))
                )

                , React.createElement('div', { className: "grid grid-cols-1 gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5131}}
                  , React.createElement(GlassCard, { className: "p-5 bg-white/50 border border-gray-200 flex flex-col gap-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5132}}
                    , React.createElement('h3', { className: "font-heading font-bold text-sm text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5133}}, "Active Deal pipeline"  )
                    , React.createElement('div', { className: "flex flex-col gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5134}}
                      , pipelineStages.map((stage, idx) => (
                        React.createElement('div', { key: idx, className: "flex flex-col gap-1 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5136}}
                          , React.createElement('div', { className: "flex justify-between text-gray-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5137}}
                            , React.createElement('span', { className: "font-semibold", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5138}}, stage.name)
                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5139}}, stage.count, " Deals ("  , stage.percentage, ")")
                          )
                          , React.createElement('div', { className: "w-full h-2 rounded-full bg-slate-100 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5141}}
                            , React.createElement('div', { className: `h-full rounded-full ${stage.color}`, style: { width: stage.percentage }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5142}})
                          )
                        )
                      ))
                    )
                  )
                )

                , React.createElement('div', { className: "grid grid-cols-1 xl:grid-cols-4 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5150}}
                  , React.createElement(GlassCard, { className: "xl:col-span-3 p-5 bg-white/60 border border-gray-200 flex flex-col gap-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5151}}
                    , React.createElement('div', { className: "flex items-center justify-between gap-3 flex-wrap"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5152}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5153}}
                        , React.createElement('h3', { className: "font-heading font-bold text-sm text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5154}}, "Reports & Analytics"  )
                        , React.createElement('p', { className: "text-[10px] text-gray-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5155}}, "Conversion, collection, proposal, and revenue health."     )
                      )
                      , React.createElement('span', { className: "text-[10px] font-bold text-[#FF5349] bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5157}}, "Live CRM Metrics"

                      )
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5162}}
                      , analyticsCards.map((card) => (
                        React.createElement('div', { key: card.label, className: "p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-all flex flex-col gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5164}}
                          , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5165}}
                            , React.createElement('span', { className: "text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5166}}, card.label)
                            , React.createElement('span', { className: `w-2.5 h-2.5 rounded-full ${card.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5167}} )
                          )
                          , React.createElement('span', { className: "text-2xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5169}}, card.value)
                          , React.createElement('p', { className: "text-[10px] text-slate-500 leading-relaxed font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5170}}, card.detail)
                        )
                      ))
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5175}}
                      , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5176}}
                        , React.createElement('div', { className: "text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5177}}, "Finance Snapshot" )
                        , React.createElement('div', { className: "mt-3 space-y-2 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5178}}
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5179}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5179}}, "Invoice Value" ), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5179}}, "₹", totalInvoiceValue.toLocaleString('en-IN')))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5180}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5180}}, "Payments"), React.createElement('strong', { className: "text-emerald-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5180}}, "₹", totalPaymentsValue.toLocaleString('en-IN')))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5181}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5181}}, "Expenses"), React.createElement('strong', { className: "text-rose-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5181}}, "₹", totalExpensesValue.toLocaleString('en-IN')))
                        )
                      )
                      , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5184}}
                        , React.createElement('div', { className: "text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5185}}, "Project Snapshot" )
                        , React.createElement('div', { className: "mt-3 space-y-2 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5186}}
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5187}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5187}}, "Client Projects" ), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5187}}, projects.length))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5188}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5188}}, "Showcase Projects" ), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5188}}, ourProjects.length))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5189}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5189}}, "Scoped Features" ), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5189}}, features.length))
                        )
                      )
                      , React.createElement('div', { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5192}}
                        , React.createElement('div', { className: "text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5193}}, "People Snapshot" )
                        , React.createElement('div', { className: "mt-3 space-y-2 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5194}}
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5195}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5195}}, "Users"), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5195}}, users.length))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5196}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5196}}, "Employees"), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5196}}, employees.length))
                          , React.createElement('div', { className: "flex justify-between font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5197}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5197}}, "Teams"), React.createElement('strong', { className: "text-slate-900", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5197}}, teams.length))
                        )
                      )
                    )
                  )

                  , React.createElement(GlassCard, { className: "p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col gap-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5203}}
                    , React.createElement('h3', { className: "font-heading font-extrabold text-sm text-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5204}}, "Lead Source Report"  )
                    , React.createElement('div', { className: "flex flex-col gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5205}}
                      , ["Website", "Facebook", "Instagram", "Google Ads", "WhatsApp", "Phone call", "Referral", "Direct enquiry", "Other"].map((source) => {
                        const sourceCount = leads.filter(l => l.source === source).length;
                        const pct = leads.length ? Math.round((sourceCount / leads.length) * 100) : 0;
                        return (
                          React.createElement('div', { key: source, className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5210}}
                            , React.createElement('div', { className: "flex justify-between text-[10px] font-bold text-slate-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5211}}
                              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5212}}, source)
                              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5213}}, sourceCount, " (" , pct, "%)")
                            )
                            , React.createElement('div', { className: "w-full h-1.5 rounded-full bg-slate-100 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5215}}
                              , React.createElement('div', { className: "h-full rounded-full bg-[#4F46E5]"  , style: { width: `${pct}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5216}} )
                            )
                          )
                        );
                      })
                    )
                  )
                )
              )
            )

        /* Tab: Clients */
        , activeTab === "clients" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5229}}
            , activeClientDetail ? (
              React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-200"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5231}}
                /* TOP BREADCRUMB & ACTION BAR */
                , React.createElement('div', { className: "flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex-wrap gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5233}}
                  , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5234}}
                    , React.createElement(Button, { 
                      type: "button", 
                      onClick: () => setActiveClientDetail(null), 
                      variant: "secondary", 
                      size: "sm", 
                      className: "text-xs font-bold gap-1 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5235}}

                      , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5242}} ), " Back to Clients Directory"
                    )
                    , React.createElement('span', { className: "text-gray-300 hidden sm:inline"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5244}}, "|")
                    , React.createElement('span', { className: "text-xs font-mono font-bold text-[#FF5349] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5245}}, "Client Profile #"
                        , activeClientDetail.id
                    )
                  )

                  , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5250}}
                    , React.createElement(Button, { 
                      onClick: () => {
                        setProjectForm(prev => ({
                          ...prev,
                          clientName: activeClientDetail.name || activeClientDetail.company,
                          clientId: activeClientDetail.id
                        }));
                        setShowProjectModal(true);
                      }, 
                      variant: "primary", 
                      size: "sm", 
                      className: "text-xs font-bold gap-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white shadow-sm"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5251}}

                      , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5264}} ), " Create Project for "    , activeClientDetail.name
                    )
                  )
                )

                /* CLIENT DETAILS OVERVIEW CARD */
                , React.createElement('div', { className: "p-6 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5270}}
                  , React.createElement('div', { className: "flex items-start gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5271}}
                    , React.createElement('div', { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5349] to-[#06132D] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5272}}
                      , (activeClientDetail.name || activeClientDetail.company || "C").charAt(0).toUpperCase()
                    )
                    , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5275}}
                      , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5276}}
                        , React.createElement('h2', { className: "font-heading font-extrabold text-[#071E34] text-xl"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5277}}, activeClientDetail.name)
                        , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-extrabold uppercase text-[10px] border ${
                          activeClientDetail.status === "Active" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-gray-100 text-gray-600 border-gray-200"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5278}}
                          , activeClientDetail.status || "ACTIVE"
                        )
                      )
                      , React.createElement('p', { className: "text-xs text-gray-500 font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5284}}, activeClientDetail.company || "Enterprise Client Organization")

                      , React.createElement('div', { className: "flex items-center gap-4 text-xs text-gray-600 mt-2 flex-wrap"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5286}}
                        , React.createElement('span', { className: "flex items-center gap-1 font-mono text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5287}}, React.createElement(Mail, { size: 13, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5287}} ), " " , activeClientDetail.email)
                        , React.createElement('span', { className: "flex items-center gap-1 font-mono text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5288}}, React.createElement(Phone, { size: 13, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5288}} ), " " , activeClientDetail.whatsapp || activeClientDetail.phone)
                        , React.createElement('span', { className: "flex items-center gap-1 font-semibold text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5289}}, React.createElement(Building2, { size: 13, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5289}} ), " " , activeClientDetail.industry || "Retail / Services")
                      )
                    )
                  )

                  , React.createElement('div', { className: "flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 min-w-[240px] text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5294}}
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5295}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5296}}, "Assigned Associate" )
                      , React.createElement('strong', { className: "text-[#071E34] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5297}}, activeClientDetail.assignedEmployee || "Nisha Rao (Sales Lead)")
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5299}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5300}}, "Total Client Projects"  )
                      , React.createElement('strong', { className: "text-[#FF5349] font-bold font-mono text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5301}}
                        , getClientLinkedWorkspaceData(activeClientDetail).clientProjects.length
                      )
                    )
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5305}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5306}}, "Quotations Count" )
                      , React.createElement('strong', { className: "text-[#FF5349] font-bold font-mono text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5307}}
                        , getClientLinkedWorkspaceData(activeClientDetail).clientQuotes.length
                      )
                    )
                  )
                )

                , activeClientDetail.loginEmail && (
                  React.createElement('div', { className: "bg-slate-50/80 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5315}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5316}}
                      , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5317}}, "Client Dashboard Credentials"  )
                      , React.createElement('div', { className: "flex flex-wrap gap-3 mt-2 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5318}}
                        , React.createElement('span', { className: "font-mono font-bold text-[#071E34] bg-white border border-slate-200 px-2.5 py-1 rounded-lg"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5319}}, "Email: "
                           , activeClientDetail.loginEmail
                        )
                        , React.createElement('span', { className: "font-mono font-bold text-[#071E34] bg-white border border-slate-200 px-2.5 py-1 rounded-lg"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5322}}, "Password: "
                           , activeClientDetail.loginPassword || "Saved"
                        )
                        , React.createElement('span', { className: "font-mono font-bold text-[#FF5349] bg-white border border-rose-100 px-2.5 py-1 rounded-lg"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5325}}
                          , activeClientDetail.credentialsSentAt ? "Credentials Sent" : "Not Sent Yet"
                        )
                      )
                    )
                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5330}}
                      , React.createElement('button', {
                        onClick: () => {
                          const text = `Login URL: ${activeClientDetail.loginUrl || `${window.location.origin}/auth/login`}\nEmail: ${activeClientDetail.loginEmail}\nPassword: ${activeClientDetail.loginPassword || ""}`;
                          _optionalChain([navigator, 'access', _251 => _251.clipboard, 'optionalAccess', _252 => _252.writeText, 'call', _253 => _253(text)]);
                          showToast("Client credentials copied.", "success");
                        },
                        className: "px-3 py-2 bg-white hover:bg-slate-100 text-[#071E34] border border-slate-200 rounded-xl text-xs font-extrabold"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5331}}
, "Copy"

                      )
                      , React.createElement('button', {
                        onClick: () => handleResendClientCredentials(activeClientDetail),
                        className: "px-4 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl text-xs font-extrabold shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5341}}
, "Resend Credentials"

                      )
                    )
                  )
                )

                /* CLIENT SERVICE AGREEMENT ACTION BANNER (EDIT, PREVIEW & SEND EMAIL) */
                , (() => {
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
                  const clientAgr = agreements.find((a) => 
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
                      clientName: _optionalChain([activeClientDetail, 'optionalAccess', _254 => _254.name]) || clientAgr.clientName || "Client Enterprise",
                      clientEmail: _optionalChain([activeClientDetail, 'optionalAccess', _255 => _255.email]) || clientAgr.clientEmail || "",
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
                    React.createElement('div', { className: "bg-gradient-to-r from-purple-50 via-indigo-50/50 to-teal-50/60 p-5 rounded-2xl border border-purple-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5448}}
                      , React.createElement('div', { className: "flex items-center gap-3.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5449}}
                        , React.createElement('div', { className: "w-11 h-11 rounded-2xl bg-[#5D3ADF] text-white flex items-center justify-center shadow-md shrink-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5450}}
                          , React.createElement(FileText, { size: 22, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5451}} )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5453}}
                          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5454}}
                            , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5455}}, "Client Software Development Agreement"   )
                            , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5456}}, "Legal Contract"

                            )
                          )
                          , React.createElement('p', { className: "text-xs text-gray-600 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5460}}, "Edit agreement terms, preview live PDF, and dispatch directly to client email: "
                                        , React.createElement('strong', { className: "text-[#5D3ADF] font-mono" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5461}}, activeClientDetail.email)
                          )
                        )
                      )

                      , React.createElement('div', { className: "flex items-center gap-2 flex-wrap shrink-0"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5466}}
                        /* 1. EDIT AGREEMENT BUTTON */
                        , React.createElement('button', {
                          onClick: handleEditAgreement,
                          className: "px-3.5 py-2 bg-white hover:bg-purple-50 text-purple-900 border border-purple-300 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5468}}

                          , React.createElement(Edit, { size: 14, className: "text-[#5D3ADF]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5472}} ), " Edit Agreement"
                        )

                        /* 2. PREVIEW AGREEMENT PDF BUTTON */
                        , React.createElement('button', {
                          onClick: handlePreviewAgreement,
                          className: "px-3.5 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5476}}

                          , React.createElement(Eye, { size: 14, className: "text-teal-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5480}} ), " Preview PDF"
                        )

                        /* 3. SEND AGREEMENT TO CLIENT MAIL BUTTON */
                        , React.createElement('button', {
                          onClick: handleSendAgreementMail,
                          className: "px-4 py-2 bg-[#5D3ADF] hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5484}}

                          , React.createElement(Send, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5488}} ), " Send Agreement to Client Email"
                        )
                      )
                    )
                  );
                })()

                , (() => {
                  const { clientProjects } = getClientLinkedWorkspaceData(activeClientDetail);
                  const kanbanColumns = [
                    { title: "Planning", status: "Planning", dot: "bg-purple-400", empty: "No projects in planning" },
                    { title: "Designing", status: "Designing", dot: "bg-indigo-400", empty: "No projects in design" },
                    { title: "Development", status: "Development", dot: "bg-amber-400", empty: "No projects in development" },
                    { title: "Testing", status: "Testing", dot: "bg-pink-400", empty: "No projects in testing" },
                    { title: "Completed", status: "Completed", dot: "bg-emerald-400", empty: "No completed projects" },
                  ];
                  const projectColumnStatus = (status) => {
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
                    React.createElement('div', { className: "bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5518}}
                      , React.createElement('div', { className: "flex items-center justify-between gap-3 flex-wrap border-b border-gray-150 pb-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5519}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5520}}
                          , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5521}}, "Client Project Workspaces"  )
                          , React.createElement('p', { className: "text-xs text-gray-500 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5522}}, "Drag project cards between stages. Status syncs to the client dashboard."          )
                        )
                        , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5524}}
                          , React.createElement('span', { className: "text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5525}}, "Total " , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5525}}, clientProjects.length))
                          , React.createElement('span', { className: "text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5526}}, "Ongoing " , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5526}}, ongoingCount))
                          , React.createElement('span', { className: "text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5527}}, "Budget " , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5527}}, "₹", totalBudget.toLocaleString()))
                          , React.createElement('span', { className: "text-xs font-bold text-slate-600 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5528}}, "Completed " , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5528}}, completedCount))
                        )
                      )

                      , clientProjects.length === 0 ? (
                        React.createElement('div', { className: "p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-500"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5533}}, "No project workspace is linked to this client yet. Permanent-client conversion will create one automatically."

                        )
                      ) : (
                        React.createElement(React.Fragment, null
                        , React.createElement('div', { className: "flex flex-row overflow-x-auto gap-4 pb-4 select-none scrollbar-thin"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5538}}
                          , kanbanColumns.map(column => {
                            const columnProjects = clientProjects.filter(project => projectColumnStatus(project.status) === column.status);
                            return (
                              React.createElement('div', {
                                key: column.status,
                                onDragOver: (event) => {
                                  event.preventDefault();
                                  event.dataTransfer.dropEffect = "move";
                                  if (draggedProjectStatus !== column.status) setDraggedProjectStatus(column.status);
                                },
                                onDragEnter: (event) => {
                                  event.preventDefault();
                                  setDraggedProjectStatus(column.status);
                                },
                                onDrop: (event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  const projectId = event.dataTransfer.getData("application/x-crm-client-project-id") || event.dataTransfer.getData("text/plain") || (window ).draggedProjectId || draggingClientProjectId;
                                  if (projectId) {
                                    handleUpdateProjectStatus(projectId, column.status);
                                  }
                                  setDraggedProjectStatus(null);
                                  setDraggingClientProjectId(null);
                                  (window ).draggedProjectId = null;
                                },
                                className: `min-h-[340px] w-full min-w-[270px] max-w-[320px] flex-1 rounded-2xl border p-4 transition-all duration-200 ease-out ${
                                  draggedProjectStatus === column.status
                                    ? "border-[#FF5349] bg-rose-50/70 shadow-md ring-2 ring-rose-500/10 scale-[1.01]"
                                    : "border-gray-200 bg-gray-50/60 hover:border-rose-200 hover:bg-rose-50/30"
                                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5542}}

                                , React.createElement('div', { className: "flex items-center justify-between pb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5570}}
                                  , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5571}}
                                    , React.createElement('span', { className: `w-2 h-2 rounded-full ${column.dot}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5572}} )
                                    , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5573}}, column.title)
                                    , React.createElement('span', { className: "text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5574}}, columnProjects.length)
                                  )
                                  , React.createElement('span', { className: "text-xl leading-none text-gray-400 font-light"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5576}}, "+")
                                )

                                , columnProjects.length === 0 ? (
                                  React.createElement('div', { className: "h-[190px] flex items-center justify-center text-sm text-gray-400"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5580}}
                                    , column.empty
                                  )
                                ) : (
                                  React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5584}}
                                    , columnProjects.map(project => {
                                      const budget = Number(project.budget || 0);
                                      const progress = Math.max(0, Math.min(100, Number(project.progress || 0)));
                                      return (
                                        React.createElement('div', {
                                          key: project.id,
                                          draggable: true,
                                          onDragStart: (event) => {
                                            setDraggingClientProjectId(project.id);
                                            (window ).draggedProjectId = project.id;
                                            event.dataTransfer.setData("application/x-crm-client-project-id", project.id);
                                            event.dataTransfer.setData("text/plain", project.id);
                                            event.dataTransfer.effectAllowed = "move";
                                          },
                                          onDragEnd: () => {
                                            setDraggingClientProjectId(null);
                                            setDraggedProjectStatus(null);
                                            (window ).draggedProjectId = null;
                                          },
                                          className: `cursor-grab rounded-2xl border bg-white p-4 shadow-sm active:cursor-grabbing transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                            selectedClientProjectId === project.id ? "border-[#FF5349] ring-2 ring-rose-100" : "border-gray-200"
                                          } ${
                                            draggingClientProjectId === project.id ? "opacity-60 ring-2 ring-rose-300 scale-[0.99]" : ""
                                          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5589}}

                                          , React.createElement('div', { className: "flex items-start justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5610}}
                                            , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5611}}
                                              , React.createElement('h5', { className: "font-extrabold text-[#071E34] text-sm truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5612}}, project.name || project.title || project.id)
                                              , React.createElement('p', { className: "text-xs text-gray-500 mt-0.5 truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5613}}, project.clientName || activeClientDetail.name)
                                              , React.createElement('p', { className: "text-xs text-gray-500 mt-2 line-clamp-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5614}}, project.description || project.category || "Client project workspace")
                                            )
                                            , React.createElement('span', { className: "text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shrink-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5616}}, column.title)
                                          )

                                          , React.createElement('div', { className: "mt-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5619}}
                                            , React.createElement('div', { className: "flex justify-between text-[11px] text-gray-500 font-semibold mb-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5620}}
                                              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5621}}, "Budget progress" )
                                              , React.createElement('span', { className: "font-mono text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5622}}, "₹0 / ₹"  , budget.toLocaleString())
                                            )
                                            , React.createElement('div', { className: "h-2 rounded-full bg-gray-100 overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5624}}
                                              , React.createElement('div', { className: "h-full rounded-full bg-[#FF5349]"  , style: { width: `${progress}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5625}} )
                                            )
                                            , React.createElement('div', { className: "mt-2 text-[11px] font-semibold text-rose-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5627}}, "Pending: ₹" , budget.toLocaleString())
                                          )

                                          , React.createElement('div', { className: "mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2.5 text-[11px] text-gray-500"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5630}}
                                             , React.createElement('div', { className: "flex items-center gap-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5631}}
                                               , React.createElement(Calendar, { size: 12, className: "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5632}} )
                                               , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5633}}, project.startDate || project.expectedCompletionDate || "No date")
                                             )
                                             , React.createElement('div', { className: "flex items-center gap-2 w-full justify-between"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5635}}
                                               , React.createElement('button', {
                                                 onClick: () => setSelectedTodoProjectId(project.id),
                                                 className: "flex-1 text-center py-1.5 bg-white hover:bg-rose-50 text-[#FF5349] rounded-lg border border-rose-200 text-[10px] font-extrabold transition-all"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5636}}
, "Todo"

                                               )
                                               , React.createElement('button', {
                                                 onClick: () => {
                                                   setSelectedClientProjectId(project.id);
                                                   setSelectedProposalId(null);
                                                 },
                                                 className: "flex-1 text-center py-1.5 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-lg text-[10px] font-extrabold transition-all shadow-2xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5642}}
, "View Docs"

                                               )
                                             )
                                           )
                                        )
                                      );
                                    })
                                  )
                                )
                              )
                            );
                          })
                        )
                        , (() => {
                          const todoProject = clientProjects.find(project => project.id === selectedTodoProjectId) || clientProjects[0];
                          const todoItems = todoProject ? getProjectTodos(todoProject) : [];
                          const openTodos = todoItems.filter(todo => !todo.completed).length;
                          return (
                            React.createElement('div', { className: "rounded-2xl border border-slate-200 bg-slate-50/50 p-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5667}}
                              , React.createElement('div', { className: "flex flex-col gap-3 border-b border-slate-200 pb-3 md:flex-row md:items-center md:justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5668}}
                                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5669}}
                                  , React.createElement('h4', { className: "flex items-center gap-2 font-heading text-base font-extrabold text-[#071E34]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5670}}
                                    , React.createElement(CheckSquare, { size: 17, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5671}} ), " Project To-do List"
                                  )
                                  , React.createElement('p', { className: "mt-0.5 text-xs font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5673}}, "Select one client project and manage its tasks separately from the stage board."            )
                                )
                                , React.createElement('div', { className: "flex flex-col gap-2 sm:flex-row sm:items-center"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5675}}
                                  , React.createElement('select', {
                                    value: _optionalChain([todoProject, 'optionalAccess', _256 => _256.id]) || "",
                                    onChange: (event) => setSelectedTodoProjectId(event.target.value),
                                    className: "min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-[#071E34] outline-none focus:border-[#FF5349]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5676}}

                                    , clientProjects.map(project => (
                                      React.createElement('option', { key: project.id, value: project.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5682}}, project.name || project.title || project.id)
                                    ))
                                  )
                                  , React.createElement('span', { className: "rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-rose-700 border border-rose-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5685}}, openTodos, " open" )
                                )
                              )

                              , todoProject && (
                                React.createElement('div', { className: "mt-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5690}}
                                  , React.createElement('div', { className: "flex flex-col gap-2 sm:flex-row"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5691}}
                                    , React.createElement('input', {
                                      value: projectTodoInputs[todoProject.id] || "",
                                      onChange: (event) => setProjectTodoInputs((prev) => ({ ...prev, [todoProject.id]: event.target.value })),
                                      onKeyDown: (event) => {
                                        if (event.key === "Enter") {
                                          event.preventDefault();
                                          handleAddProjectTodo(todoProject);
                                        }
                                      },
                                      placeholder: "Add project task"  ,
                                      className: "min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#071E34] outline-none focus:border-[#0E9F8A]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5692}}
                                    )
                                    , React.createElement('button', {
                                      onClick: () => handleAddProjectTodo(todoProject),
                                      className: "inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E9F8A] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-teal-700"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5704}}

                                      , React.createElement(Plus, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5708}} ), " Add Task"
                                    )
                                  )

                                  , React.createElement('div', { className: "mt-3 grid gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5712}}
                                    , todoItems.length === 0 ? (
                                      React.createElement('div', { className: "rounded-lg border border-dashed border-teal-200 bg-white/70 px-4 py-5 text-center text-xs font-semibold text-slate-400"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5714}}, "No tasks added for this project yet."

                                      )
                                    ) : (
                                      todoItems.map(todo => (
                                        React.createElement('div', { key: todo.id, className: "flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5719}}
                                          , React.createElement('input', {
                                            type: "checkbox",
                                            checked: todo.completed,
                                            onChange: () => handleToggleProjectTodo(todoProject, todo.id),
                                            className: "h-4 w-4 rounded border-slate-300 text-[#0E9F8A] focus:ring-[#0E9F8A]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5720}}
                                          )
                                          , React.createElement('span', { className: `min-w-0 flex-1 text-sm font-semibold ${todo.completed ? "text-slate-400 line-through" : "text-[#071E34]"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5726}}
                                            , todo.text
                                          )
                                          , React.createElement('button', {
                                            onClick: () => handleDeleteProjectTodo(todoProject, todo.id),
                                            className: "rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"    ,
                                            title: "Remove task" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5729}}

                                            , React.createElement(Trash2, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5734}} )
                                          )
                                        )
                                      ))
                                    )
                                  )
                                )
                              )
                            )
                          );
                        })()
                        , React.createElement('div', { className: "hidden", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5745}}
                          , clientProjects.map(project => (
                            React.createElement('div', {
                              key: project.id,
                              className: `p-4 rounded-xl border transition-all duration-200 ease-out ${
                                selectedClientProjectId === project.id ? "border-[#0E9F8A] bg-teal-50/50" : "border-gray-200 bg-gray-50/40 hover:bg-teal-50/30"
                              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5747}}

                              , React.createElement('div', { className: "flex items-start justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5753}}
                                , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5754}}
                                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-white border border-teal-100 px-2 py-0.5 rounded"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5755}}
                                    , project.id
                                  )
                                  , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-sm mt-2 truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5758}}, project.name)
                                  , React.createElement('p', { className: "text-[10px] text-gray-500 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5759}}, project.category || "Development", " • Budget ₹"   , Number(project.budget || 0).toLocaleString())
                                )
                                , React.createElement('button', {
                                  onClick: () => {
                                    setSelectedClientProjectId(project.id);
                                    setSelectedProposalId(null);
                                  },
                                  className: "px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-[10px] font-extrabold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5761}}
, "View Docs"

                                )
                              )
                              , React.createElement('div', { className: "mt-3 pt-3 border-t border-gray-200 flex items-center justify-between gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5771}}
                                , React.createElement('label', { className: "text-[10px] font-extrabold uppercase text-gray-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5772}}, "Project Status" )
                                , React.createElement('select', {
                                  value: project.status || "Planning",
                                  onChange: (e) => handleUpdateProjectStatus(project.id, e.target.value),
                                  className: "px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-bold text-[#071E34] focus:outline-none focus:border-[#0E9F8A]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5773}}

                                  , projectStatuses.map(status => (
                                    React.createElement('option', { key: status, value: status, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5779}}, status)
                                  ))
                                )
                              )
                            )
                          ))
                        )
                        )
                      )
                    )
                  );
                })()
                /* STEP 1: INITIAL STATE - NO PROJECT SELECTED */
                , !selectedClientProjectId ? (
                  React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5793}}
                    /* OVERALL CLIENT HISTORY TABLES (QUOTATIONS, TAX INVOICES & EMAILS) */
                    , (() => {
                      const { clientQuotes, clientInvoices } = getClientLinkedWorkspaceData(activeClientDetail);

                      return (
                        React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5799}}
                          /* 1. QUOTATIONS & TAX INVOICES HISTORY TABLE */
                          , React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5801}}
                            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5802}}
                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5803}}
                                , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-teal-50 text-[#0E9F8A] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5804}}
                                  , React.createElement(Clock, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5805}} )
                                )
                                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5807}}
                                  , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5808}}, "Client Quotations & Tax Invoices History"     )
                                  , React.createElement('span', { className: "text-xs text-gray-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5809}}, "Complete historical list of all quotations and tax invoices for "          , _optionalChain([activeClientDetail, 'optionalAccess', _257 => _257.name]) || 'naveen')
                                )
                              )

                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5813}}
                                , React.createElement('span', { className: "text-xs font-bold text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5814}}
                                  , clientQuotes.length, " Quotation(s)"
                                )
                                , React.createElement('span', { className: "text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5817}}
                                  , clientInvoices.length, " Invoice(s)"
                                )
                              )
                            )

                            , React.createElement('div', { className: "overflow-x-auto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5823}}
                              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5824}}
                                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5825}}
                                  , React.createElement('tr', { className: "bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5826}}
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5827}}, "Doc Type" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5828}}, "Reference No" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5829}}, "Title / Scope"  )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5830}}, "Date")
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5831}}, "Amount")
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5832}}, "Status")
                                    , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5833}}, "Actions")
                                  )
                                )
                                , React.createElement('tbody', { className: "divide-y divide-gray-150 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5836}}
                                  , clientQuotes.length === 0 ? (
                                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5838}}
                                      , React.createElement('td', { colSpan: 7, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5839}}, "No quotations found for this client."     )
                                    )
                                  ) : (
                                    clientQuotes.map(q => (
                                      React.createElement('tr', { key: q.id || q.number, className: "hover:bg-teal-50/40 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5843}}
                                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5844}}
                                          , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5845}}, "QUOTATION")
                                        )
                                        , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-800"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5847}}, q.id || q.number)
                                        , React.createElement('td', { className: "p-3 font-semibold text-gray-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5848}}, q.title || "Project Proposal Quotation")
                                        , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5849}}, q.createdDate || q.date || "15 July, 2026")
                                        , React.createElement('td', { className: "p-3 font-mono font-extrabold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5850}}, "₹", (q.planAPrice || q.budget || 50000).toLocaleString())
                                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5851}}
                                          , React.createElement('span', { className: "text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5852}}, "VERIFIED")
                                        )
                                        , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5854}}
                                          , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5855}}
                                            , React.createElement('button', {
                                              onClick: () => handleOpenClientItemPreview(q, "quotation"),
                                              className: "px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5856}}

                                              , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5860}} ), " Preview PDF"
                                            )
                                            , React.createElement('button', {
                                              onClick: () => handleOpenClientItemEmailModal(q, "quotation"),
                                              className: "px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5862}}

                                              , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5866}} ), " Send Email"
                                            )
                                          )
                                        )
                                      )
                                    ))
                                  )

                                  , clientInvoices.length === 0 ? (
                                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5875}}
                                      , React.createElement('td', { colSpan: 7, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5876}}, "No invoices found for this client."     )
                                    )
                                  ) : (
                                    clientInvoices.map(inv => (
                                      React.createElement('tr', { key: inv.id || inv.number, className: "hover:bg-teal-50/40 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5880}}
                                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5881}}
                                          , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5882}}, "TAX INVOICE" )
                                        )
                                        , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-800"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5884}}, inv.number || inv.id)
                                        , React.createElement('td', { className: "p-3 font-semibold text-gray-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5885}}, inv.description || `${inv.productName || 'Software'} Tax Invoice`)
                                        , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5886}}, inv.date || "28 July, 2026")
                                        , React.createElement('td', { className: "p-3 font-mono font-extrabold text-teal-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5887}}, "₹", (inv.totalDue || inv.rate || 59000).toLocaleString())
                                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5888}}
                                          , React.createElement('span', { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5889}}, "PAID")
                                        )
                                        , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5891}}
                                          , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5892}}
                                            , React.createElement('button', {
                                              onClick: () => handleOpenClientItemPreview(inv, "invoice"),
                                              className: "px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5893}}

                                              , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5897}} ), " Preview PDF"
                                            )
                                            , React.createElement('button', {
                                              onClick: () => handleOpenClientItemEmailModal(inv, "invoice"),
                                              className: "px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5899}}

                                              , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5903}} ), " Send Email"
                                            )
                                          )
                                        )
                                      )
                                    ))
                                  )
                                )
                              )
                            )
                          )

                          /* 2. DISPATCHED EMAILS & PDF HISTORY TABLE */
                          , React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5916}}
                            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5917}}
                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5918}}
                                , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5919}}
                                  , React.createElement(Mail, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5920}} )
                                )
                                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5922}}
                                  , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5923}}, "Dispatched Emails & PDF Attachment History"     )
                                  , React.createElement('span', { className: "text-xs text-gray-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5924}}, "Complete log of all email dispatches sent to "        , _optionalChain([activeClientDetail, 'optionalAccess', _258 => _258.email]) || 'naveenkumar970100@gmail.com')
                                )
                              )

                              , React.createElement('span', { className: "text-xs font-extrabold text-blue-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5928}}
                                , React.createElement(Send, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5929}} ), " " , sentEmailLogs.length, " Email(s) Sent"
                              )
                            )

                            , React.createElement('div', { className: "overflow-x-auto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5933}}
                              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5934}}
                                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 5935}}
                                  , React.createElement('tr', { className: "bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5936}}
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5937}}, "Log ID" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5938}}, "Dispatched At" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5939}}, "Doc Type" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5940}}, "Recipient Email" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5941}}, "Subject Line" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5942}}, "Attachment File" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5943}}, "Delivery Status" )
                                    , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5944}}, "Actions")
                                  )
                                )
                                , React.createElement('tbody', { className: "divide-y divide-gray-150 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5947}}
                                  , sentEmailLogs.map(log => (
                                    React.createElement('tr', { key: log.id, className: "hover:bg-slate-50 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5949}}
                                      , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5950}}, log.id)
                                      , React.createElement('td', { className: "p-3 text-gray-500 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5951}}, log.sentAt)
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5952}}
                                        , React.createElement('span', { className: `text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${
                                          log.docType.toLowerCase().includes("invoice") 
                                            ? "text-teal-700 bg-teal-50 border-teal-200" 
                                            : "text-[#0E9F8A] bg-teal-50 border-teal-100"
                                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5953}}
                                          , log.docType.toUpperCase()
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3 font-mono text-gray-800 font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5961}}, log.recipient)
                                      , React.createElement('td', { className: "p-3 font-medium text-gray-900 max-w-[220px] truncate"    , title: log.subject, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5962}}, log.subject)
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5963}}
                                        , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100 max-w-[180px] truncate"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5964}}
                                          , React.createElement(Paperclip, { size: 10, className: "shrink-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5965}} )
                                          , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5966}}, log.fileName)
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 5969}}
                                        , React.createElement('span', { className: "text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 w-fit"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5970}}
                                          , React.createElement(CheckCircle, { size: 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5971}} ), " " , log.status
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5974}}
                                        , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5975}}
                                          , (log.htmlContent || log.documentType || log.docType) && (
                                            React.createElement('button', {
                                              onClick: () => handleViewClientDoc(log),
                                              className: "px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5977}}

                                              , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5981}} ), " View Sent PDF"
                                            )
                                          )
                                          , React.createElement('button', {
                                            onClick: () => handleOpenClientItemEmailModal(log.item || { number: log.docRef, title: log.subject }, log.docType.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                                            className: "px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5984}}

                                            , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5988}} ), " Resend Email"
                                          )
                                        )
                                      )
                                    )
                                  ))
                                )
                              )
                            )
                          )
                        )
                      );
                    })()
                  )
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
                      React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6028}}
                        /* ACTIVE PROJECT HEADER BANNER */
                        , React.createElement('div', { className: "p-5 premium-button rounded-2xl text-white flex justify-between items-center shadow-md flex-wrap gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6030}}
                          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6031}}
                            , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6032}}
                              , React.createElement(FolderOpen, { className: "w-6 h-6 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6033}} )
                            )
                            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6035}}
                              , React.createElement('span', { className: "text-[10px] font-extrabold uppercase tracking-wider text-teal-100 block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6036}}, "Step 1 Completed • Selected Project Workspace"      )
                              , React.createElement('h3', { className: "font-extrabold text-base text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6037}}
                                , _optionalChain([currentSelectedProj, 'optionalAccess', _259 => _259.name]) || selectedClientProjectId
                              )
                            )
                          )

                          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6043}}
                            , React.createElement('button', {
                              onClick: () => { setSelectedClientProjectId(null); setSelectedProposalId(null); },
                              className: "px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold backdrop-blur-sm transition-all duration-200 ease-out"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6044}}
, "View All Projects"

                            )
                            , React.createElement('button', {
                              onClick: () => { setSelectedClientProjectId(null); setSelectedProposalId(null); },
                              className: "px-3 py-2 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs font-bold backdrop-blur-sm transition-all duration-200 ease-out"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6050}}
, "Clear Selection"

                            )
                          )
                        )

                        /* PROPOSALS LIST FOR SELECTED PROJECT */
                        , React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6060}}
                          , React.createElement('div', { className: "border-b border-gray-150 pb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6061}}
                            , React.createElement('span', { className: "text-[10px] font-extrabold uppercase text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6062}}, "Step 2: Select a Proposal"    )
                            , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6063}}, "Available Proposals for "
                                 , _optionalChain([currentSelectedProj, 'optionalAccess', _260 => _260.name]) || selectedClientProjectId
                            )
                            , React.createElement('p', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6066}}, "Click on a proposal below to reveal its specific Quotation & Tax Invoice documents."             )
                          )

                          , projectProposals.length === 0 ? (
                            React.createElement('div', { className: "p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-500 flex flex-col items-center gap-2"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6070}}
                              , React.createElement(FileText, { className: "w-6 h-6 text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6071}} )
                              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6072}}, "No proposals found for this project workspace yet."       )
                            )
                          ) : (
                            React.createElement('div', { className: "grid grid-cols-1 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6075}}
                              , projectProposals.map(prop => (
                                React.createElement('div', { 
                                  key: prop.id,
                                  onClick: () => setSelectedProposalId(prop.id || prop.number),
                                  className: "p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-[#0E9F8A] hover:bg-teal-50/50 cursor-pointer transition-all duration-200 ease-out flex flex-col md:flex-row justify-between items-start md:items-center gap-4"                 , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6077}}

                                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6082}}
                                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6083}}
                                      , React.createElement('span', { className: "font-mono font-extrabold text-[#0E9F8A] text-[10px] bg-teal-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6084}}, prop.id || prop.number)
                                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-500 uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6085}}, prop.projectType || "Proposal Document")
                                    )
                                    , React.createElement('h4', { className: "font-bold text-[#071E34] text-base mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6087}}, prop.title)
                                    , React.createElement('span', { className: "text-xs text-gray-400 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6088}}, "Click to select proposal and reveal its quotation & invoice documents."          )
                                  )

                                  , React.createElement('div', { className: "flex items-center gap-4 w-full md:w-auto justify-between md:justify-end"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6091}}
                                    , React.createElement('div', { className: "text-right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6092}}
                                      , React.createElement('span', { className: "font-mono font-extrabold text-[#071E34] text-base block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6093}}, "₹", (prop.planAPrice || prop.budget || 50000).toLocaleString())
                                      , React.createElement('span', { className: "text-[10px] text-green-600 font-extrabold uppercase"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6094}}, "APPROVED")
                                    )

                                    , React.createElement('button', {
                                      onClick: (e) => { e.stopPropagation(); setSelectedProposalId(prop.id || prop.number); },
                                      className: "px-4 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all duration-200 ease-out flex items-center gap-1.5"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6097}}
, "Select Proposal "
                                        , React.createElement(CheckCircle, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6101}} )
                                    )
                                  )
                                )
                              ))
                            )
                          )
                        )
                      )
                    );
                  })()
                ) : (
                  /* STEP 3: PROPOSAL SELECTED - SHOW QUOTATION & TAX INVOICE FOR THIS PROPOSAL ONLY */
                  React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6114}}
                    /* BREADCRUMB HEADER BANNER */
                    , React.createElement('div', { className: "p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex justify-between items-center shadow-md flex-wrap gap-3"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6116}}
                      , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6117}}
                        , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-[#0E9F8A] text-white flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6118}}
                          , React.createElement(FileText, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6119}} )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6121}}
                          , React.createElement('div', { className: "flex items-center gap-2 text-[10px] text-gray-300 uppercase font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6122}}
                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6123}}, _optionalChain([projects, 'access', _261 => _261.find, 'call', _262 => _262(p => p.id === selectedClientProjectId), 'optionalAccess', _263 => _263.name]) || selectedClientProjectId)
                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6124}}, "›")
                            , React.createElement('span', { className: "text-[#5ECBC0] font-extrabold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6125}}, "Selected Proposal Documents"  )
                          )
                          , React.createElement('h3', { className: "font-extrabold text-base text-white mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6127}}
                            , _optionalChain([quotations, 'access', _264 => _264.find, 'call', _265 => _265(q => q.id === selectedProposalId || q.number === selectedProposalId), 'optionalAccess', _266 => _266.title]) || selectedProposalId
                          )
                        )
                      )

                      , React.createElement('button', {
                        onClick: () => setSelectedProposalId(null),
                        className: "px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-extrabold backdrop-blur-sm transition-all duration-200 ease-out border border-white/10 flex items-center gap-1"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6133}}
, "← Back to Proposals List"

                      )
                    )

                    /* SPECIFIC QUOTATION & INVOICE DOCUMENTS FOR SELECTED PROPOSAL ONLY */
                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6142}}
                      /* 1. QUOTATION CARD */
                      , React.createElement('div', { className: "flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm gap-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6144}}
                        , (() => {
                          const baseQuote = quotations.find(q => q.id === selectedProposalId || q.number === selectedProposalId || q.projectId === selectedClientProjectId) || {
                            id: selectedProposalId,
                            title: "Project Proposal Quotation",
                            planAPrice: 140000
                          };
                          const quote = withClientDocumentOverride(baseQuote, "quotation");

                          return (
                            React.createElement(React.Fragment, null
                              , React.createElement('div', { className: "flex flex-col gap-2 border-b border-gray-150 pb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6155}}
                                , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6156}}
                                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6157}}, "QUOTATION DOCUMENT" )
                                  , React.createElement('span', { className: "text-[10px] font-extrabold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6158}}, "VERIFIED")
                                )
                                , React.createElement('h4', { className: "font-bold text-[#071E34] text-base mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6160}}, quote.title || "Project Estimation Quotation")
                                , React.createElement('span', { className: "text-xs font-mono font-extrabold text-gray-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6161}}, "Ref: " , quote.id || quote.number || selectedProposalId)
                                , React.createElement('span', { className: "text-lg font-mono font-extrabold text-[#0E9F8A] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6162}}, "₹", (quote.planAPrice || quote.budget || 140000).toLocaleString())
                              )

                              , React.createElement('div', { className: "flex items-center gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6165}}
                                , React.createElement('button', {
                                  onClick: () => handleOpenClientItemPreview(quote, "quotation"),
                                  className: "flex-1 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-out"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6166}}

                                  , React.createElement(Eye, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6170}} ), " Live Preview PDF"
                                )

                                , React.createElement('button', {
                                  onClick: () => handleOpenClientItemEmailModal(quote, "quotation"),
                                  className: "flex-1 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6173}}

                                  , React.createElement(Mail, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6177}} ), " Send Email"
                                )
                              )
                            )
                          );
                        })()
                      )

                      /* 2. TAX INVOICE CARD */
                      , React.createElement('div', { className: "flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm gap-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6186}}
                        , (() => {
                          const selectedProj = projects.find(p => p.id === selectedClientProjectId);
                          const baseInvoice = invoices.find(inv => 
                            inv.projectId === selectedClientProjectId || 
                            inv.id === selectedProposalId ||
                            (selectedProj && inv.productName && inv.productName.toLowerCase() === (selectedProj.name || "").toLowerCase())
                          ) || {
                            id: `INV-${selectedClientProjectId}`,
                            number: `INV-${selectedClientProjectId}`,
                            productName: _optionalChain([selectedProj, 'optionalAccess', _267 => _267.name]) || "HMS Website + Mobile App",
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
                            React.createElement(React.Fragment, null
                              , React.createElement('div', { className: "flex flex-col gap-2 border-b border-gray-150 pb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6210}}
                                , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6211}}
                                  , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6212}}, "TAX INVOICE DOCUMENT"  )
                                  , React.createElement('span', { className: "text-[10px] font-extrabold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6213}}, "PAID")
                                )
                                , React.createElement('h4', { className: "font-bold text-[#071E34] text-base mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6215}}, invoice.description || `${invoice.productName || 'Software'} Tax Invoice`)
                                , React.createElement('span', { className: "text-xs font-mono font-extrabold text-gray-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6216}}, "Inv No: "  , invoice.number || invoice.id)
                                , React.createElement('span', { className: "text-lg font-mono font-extrabold text-teal-700 mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6217}}, "₹", cardTotal.toLocaleString())
                              )

                              , React.createElement('div', { className: "flex items-center gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6220}}
                                , React.createElement('button', {
                                  onClick: () => handleOpenClientItemPreview(invoice, "invoice"),
                                  className: "flex-1 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-out"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6221}}

                                  , React.createElement(Eye, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6225}} ), " Live Preview PDF"
                                )

                                , React.createElement('button', {
                                  onClick: () => handleOpenClientItemEmailModal(invoice, "invoice"),
                                  className: "flex-1 py-2.5 bg-blue-600 hover:bg-teal-600 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6228}}

                                  , React.createElement(Mail, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6232}} ), " Send Email"
                                )
                              )
                            )
                          );
                        })()
                      )
                    )

                    /* 3. COMPLETE HISTORY OF ALL QUOTATIONS & TAX INVOICES */
                    , (() => {
                      const selectedProj = projects.find(p => p.id === selectedClientProjectId);
                      const projName = _optionalChain([selectedProj, 'optionalAccess', _268 => _268.name]) || _optionalChain([selectedProj, 'optionalAccess', _269 => _269.title]) || "";

                      // Get all projects associated with the active client
                      const clientProjects = projects.filter(p => 
                        (_optionalChain([activeClientDetail, 'optionalAccess', _270 => _270.name]) && _optionalChain([p, 'access', _271 => _271.clientName, 'optionalAccess', _272 => _272.toLowerCase, 'call', _273 => _273()]) === activeClientDetail.name.toLowerCase()) ||
                        (_optionalChain([activeClientDetail, 'optionalAccess', _274 => _274.company]) && _optionalChain([p, 'access', _275 => _275.clientName, 'optionalAccess', _276 => _276.toLowerCase, 'call', _277 => _277()]) === activeClientDetail.company.toLowerCase())
                      );
                      const clientProjIds = clientProjects.map(p => p.id);

                      const historyQuotes = quotations.filter(q => {
                        const matchesClient = q.clientName && (
                          (_optionalChain([activeClientDetail, 'optionalAccess', _278 => _278.name]) && q.clientName.toLowerCase() === activeClientDetail.name.toLowerCase()) ||
                          (_optionalChain([activeClientDetail, 'optionalAccess', _279 => _279.company]) && q.clientName.toLowerCase() === activeClientDetail.company.toLowerCase())
                        );
                        const matchesProject = q.projectId && clientProjIds.includes(q.projectId);
                        return matchesClient || matchesProject;
                      });

                      if (historyQuotes.length === 0 && clientProjIds.length > 0) {
                        historyQuotes.push({
                          id: `QT-${clientProjIds[0]}-01`,
                          number: `QT-${clientProjIds[0]}-01`,
                          title: `${_optionalChain([clientProjects, 'access', _280 => _280[0], 'optionalAccess', _281 => _281.name]) || 'Software Application'} Estimation Proposal`,
                          clientName: _optionalChain([activeClientDetail, 'optionalAccess', _282 => _282.name]) || "naveen",
                          projectName: _optionalChain([clientProjects, 'access', _283 => _283[0], 'optionalAccess', _284 => _284.name]) || "Software Project",
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
                          (_optionalChain([activeClientDetail, 'optionalAccess', _285 => _285.name]) && inv.clientName.toLowerCase() === activeClientDetail.name.toLowerCase()) ||
                          (_optionalChain([activeClientDetail, 'optionalAccess', _286 => _286.company]) && inv.clientName.toLowerCase() === activeClientDetail.company.toLowerCase())
                        );
                        const matchesProject = inv.projectId && clientProjIds.includes(inv.projectId);
                        return matchesClient || matchesProject;
                      });

                      if (historyInvoices.length === 0 && clientProjIds.length > 0) {
                        historyInvoices.push({
                          id: `SPW-INV-${clientProjIds[0]}`,
                          number: `SPW-INV-${clientProjIds[0]}`,
                          productName: _optionalChain([clientProjects, 'access', _287 => _287[0], 'optionalAccess', _288 => _288.name]) || "Software Application",
                          description: `${_optionalChain([clientProjects, 'access', _289 => _289[0], 'optionalAccess', _290 => _290.name]) || 'Software Application'} Tax Invoice`,
                          clientName: _optionalChain([activeClientDetail, 'optionalAccess', _291 => _291.name]) || "naveen",
                          rate: 50000,
                          taxPct: 18,
                          totalDue: 59000,
                          date: "2026-07-28",
                          status: "Paid"
                        });
                      }

                      return (
                        React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6304}}
                          , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6305}}
                            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6306}}
                              , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-teal-50 text-[#0E9F8A] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6307}}
                                , React.createElement(Clock, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6308}} )
                              )
                              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6310}}
                                , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6311}}, "Complete Quotations & Tax Invoices History"     )
                                , React.createElement('span', { className: "text-xs text-gray-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6312}}, "Historical record of all generated quotations and tax invoices for "          , projName || selectedClientProjectId)
                              )
                            )

                            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6316}}
                              , React.createElement('span', { className: "text-xs font-bold text-[#0E9F8A] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6317}}
                                , historyQuotes.length, " Quotation(s)"
                              )
                              , React.createElement('span', { className: "text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6320}}
                                , historyInvoices.length, " Invoice(s)"
                              )
                            )
                          )

                          , React.createElement('div', { className: "overflow-x-auto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6326}}
                            , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6327}}
                              , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6328}}
                                , React.createElement('tr', { className: "bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6329}}
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6330}}, "Doc Type" )
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6331}}, "Reference No" )
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6332}}, "Title / Scope"  )
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6333}}, "Date")
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6334}}, "Amount")
                                  , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6335}}, "Status")
                                  , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6336}}, "Actions")
                                )
                              )
                              , React.createElement('tbody', { className: "divide-y divide-gray-150 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6339}}
                                /* Quotations History */
                                , historyQuotes.map(q => (
                                  React.createElement('tr', { key: q.id, className: "hover:bg-teal-50/40 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6342}}
                                    , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6343}}
                                      , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-[#0E9F8A] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6344}}, "QUOTATION")
                                    )
                                    , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-800"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6346}}, q.id || q.number)
                                    , React.createElement('td', { className: "p-3 font-semibold text-gray-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6347}}, q.title || "Project Proposal Quotation")
                                    , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6348}}, q.createdDate || q.date || "15 July, 2026")
                                    , React.createElement('td', { className: "p-3 font-mono font-extrabold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6349}}, "₹", (q.planAPrice || q.budget || 50000).toLocaleString())
                                    , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6350}}
                                      , React.createElement('span', { className: "text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6351}}, "VERIFIED")
                                    )
                                    , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6353}}
                                      , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6354}}
                                        , React.createElement('button', {
                                          onClick: () => handleOpenClientItemPreview(q, "quotation"),
                                          className: "px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6355}}

                                          , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6359}} ), " Preview PDF"
                                        )
                                        , React.createElement('button', {
                                          onClick: () => handleOpenClientItemEmailModal(q, "quotation"),
                                          className: "px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6361}}

                                          , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6365}} ), " Send Email"
                                        )
                                      )
                                    )
                                  )
                                ))

                                /* Invoices History */
                                , historyInvoices.map(inv => (
                                  React.createElement('tr', { key: inv.id, className: "hover:bg-teal-50/40 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6374}}
                                    , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6375}}
                                      , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6376}}, "TAX INVOICE" )
                                    )
                                    , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-800"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6378}}, inv.number || inv.id)
                                    , React.createElement('td', { className: "p-3 font-semibold text-gray-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6379}}, inv.description || `${inv.productName || 'Software'} Tax Invoice`)
                                    , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6380}}, inv.date || "28 July, 2026")
                                    , React.createElement('td', { className: "p-3 font-mono font-extrabold text-teal-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6381}}, "₹", (inv.totalDue || inv.rate || 59000).toLocaleString())
                                    , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6382}}
                                      , React.createElement('span', { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6383}}, "PAID")
                                    )
                                    , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6385}}
                                      , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6386}}
                                        , React.createElement('button', {
                                          onClick: () => handleOpenClientItemPreview(inv, "invoice"),
                                          className: "px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6387}}

                                          , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6391}} ), " Preview PDF"
                                        )
                                        , React.createElement('button', {
                                          onClick: () => handleOpenClientItemEmailModal(inv, "invoice"),
                                          className: "px-2.5 py-1.5 bg-blue-600 hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6393}}

                                          , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6397}} ), " Send Email"
                                        )
                                      )
                                    )
                                  )
                                ))
                              )
                            )
                          )

                          /* SENT EMAILS & PDF DISPATCH HISTORY TABLE */
                          , React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6408}}
                            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6409}}
                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6410}}
                                , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6411}}
                                  , React.createElement(Mail, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6412}} )
                                )
                                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6414}}
                                  , React.createElement('h4', { className: "font-extrabold text-[#071E34] text-base"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6415}}, "Dispatched Emails & PDF Attachment History"     )
                                  , React.createElement('span', { className: "text-xs text-gray-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6416}}, "Complete log of all email dispatches sent to "        , _optionalChain([activeClientDetail, 'optionalAccess', _292 => _292.email]) || 'naveenkumar970100@gmail.com')
                                )
                              )

                              , React.createElement('span', { className: "text-xs font-extrabold text-blue-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6420}}
                                , React.createElement(Send, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6421}} ), " " , sentEmailLogs.length, " Email(s) Sent"
                              )
                            )

                            , React.createElement('div', { className: "overflow-x-auto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6425}}
                              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6426}}
                                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6427}}
                                  , React.createElement('tr', { className: "bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-500 font-extrabold tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6428}}
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6429}}, "Log ID" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6430}}, "Dispatched At" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6431}}, "Doc Type" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6432}}, "Recipient Email" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6433}}, "Subject Line" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6434}}, "Attachment File" )
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6435}}, "Delivery Status" )
                                    , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6436}}, "Actions")
                                  )
                                )
                                , React.createElement('tbody', { className: "divide-y divide-gray-150 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6439}}
                                  , sentEmailLogs.map(log => (
                                    React.createElement('tr', { key: log.id, className: "hover:bg-slate-50 transition-all duration-200 ease-out"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6441}}
                                      , React.createElement('td', { className: "p-3 font-mono font-bold text-gray-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6442}}, log.id)
                                      , React.createElement('td', { className: "p-3 text-gray-500 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6443}}, log.sentAt)
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6444}}
                                        , React.createElement('span', { className: `text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${
                                          log.docType.toLowerCase().includes("invoice") 
                                            ? "text-teal-700 bg-teal-50 border-teal-200" 
                                            : "text-[#0E9F8A] bg-teal-50 border-teal-100"
                                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6445}}
                                          , log.docType.toUpperCase()
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3 font-mono text-gray-800 font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6453}}, log.recipient)
                                      , React.createElement('td', { className: "p-3 font-medium text-gray-900 max-w-[220px] truncate"    , title: log.subject, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6454}}, log.subject)
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6455}}
                                        , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-mono font-bold text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100 max-w-[180px] truncate"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6456}}
                                          , React.createElement(Paperclip, { size: 10, className: "shrink-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6457}} )
                                          , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6458}}, log.fileName)
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6461}}
                                        , React.createElement('span', { className: "text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 w-fit"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6462}}
                                          , React.createElement(CheckCircle, { size: 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6463}} ), " " , log.status
                                        )
                                      )
                                      , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6466}}
                                        , React.createElement('div', { className: "flex items-center justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6467}}
                                          , (log.htmlContent || log.documentType || log.docType) && (
                                            React.createElement('button', {
                                              onClick: () => handleViewClientDoc(log),
                                              className: "px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6469}}

                                              , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6473}} ), " View Sent PDF"
                                            )
                                          )
                                          , React.createElement('button', {
                                            onClick: () => handleOpenClientItemEmailModal(log.item || { number: log.docRef, title: log.subject }, log.docType.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                                            className: "px-2.5 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6476}}

                                            , React.createElement(Mail, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6480}} ), " Resend Email"
                                          )
                                        )
                                      )
                                    )
                                  ))
                                )
                              )
                            )
                          )
                        )
                      );
                    })()
                  )
                )
              )
            ) : (
              // CLIENTS DIRECTORY TABLE VIEW
              (() => {
                const activeDbClients = clients.filter(c => c.status !== "Inactive" && c.status !== "Deleted");
                const convertedLeadsAsClients = leads
                  .filter(l => (l.status === "Won" || l.clientType === "Permanent" || l.clientType === "Temporary" || (l ).type === "Permanent") && l.status !== "Deleted")
                  .map(l => ({
                    id: l.id ? (l.id.startsWith("CLI-") ? l.id : `CLI-${l.id.replace("LEA-", "")}`) : `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: l.name,
                    company: l.companyName || l.name || "Independent Business",
                    email: l.email || "",
                    phone: l.phone || "",
                    whatsapp: l.whatsapp || l.phone || "",
                    assignedEmployee: l.assignedEmployee || "Unassigned (Sales)",
                    industry: "Technology",
                    type: (l.clientType === "Permanent" || l.status === "Won" || (l ).type === "Permanent") ? "Permanent" : (l.clientType || "Temporary"),
                    clientType: (l.clientType === "Permanent" || l.status === "Won" || (l ).type === "Permanent") ? "Permanent" : (l.clientType || "Temporary"),
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
                    const isPerm = c.type === "Permanent" || (c ).clientType === "Permanent" || existing.type === "Permanent" || (existing ).clientType === "Permanent" || c.status === "Won" || existing.status === "Won";
                    clientMap.set(key, {
                      ...existing,
                      ...c,
                      type: isPerm ? "Permanent" : (c.type || existing.type),
                      clientType: isPerm ? "Permanent" : ((c ).clientType || (existing ).clientType)
                    });
                  }
                });

                const allUnifiedClients = Array.from(clientMap.values());

                const isClientPermanent = (c) => {
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
                  React.createElement(React.Fragment, null
                    /* SECTION 1: ACTIVE CLIENTS DIRECTORY HEADER & TYPE TABS */
                    , React.createElement('div', { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6561}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6562}}
                        , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6563}}, "Clients Database Directory"  )
                        , React.createElement('span', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6564}}, "Click on any active client profile row to open dedicated client workspace & details."             )
                      )
                      , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6566}}
                        , React.createElement('div', { className: "flex items-center gap-1 bg-[#06132D]/5 border border-red-500/20 p-1 rounded-xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6567}}
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => setClientFilterTab("All"),
                            className: `px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              clientFilterTab === "All" ? "bg-[#FF5349] text-white shadow-xs" : "text-slate-650 hover:text-slate-900"
                            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6568}}
, "All Active ("
                              , allUnifiedClients.filter(c => c.status !== "Inactive" && c.status !== "Deleted").length, ")"
                          )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => setClientFilterTab("Permanent"),
                            className: `px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              clientFilterTab === "Permanent" ? "bg-[#06132D] text-white shadow-xs font-extrabold" : "text-slate-600 hover:bg-slate-50"
                            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6577}}

                            , React.createElement(CheckCircle, { size: 12, className: "text-current", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6584}} ), " Permanent Clients ("   , allUnifiedClients.filter(c => (c.type === "Permanent" || (c ).clientType === "Permanent") && c.status !== "Inactive" && c.status !== "Deleted").length, ")"
                          )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => setClientFilterTab("Potential"),
                            className: `px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              clientFilterTab === "Potential" ? "bg-[#FF5349]/80 text-white shadow-xs" : "text-slate-650 hover:bg-slate-50"
                            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6586}}
, "Potential / Prospects ("
                               , allUnifiedClients.filter(c => (c.type !== "Permanent" && (c ).clientType !== "Permanent") && c.status !== "Inactive" && c.status !== "Deleted").length, ")"
                          )
                        )
                        , React.createElement(Button, { onClick: () => { setShowClientModal(false); setShowClientModal(true); }, variant: "primary", size: "sm", className: "gap-1 bg-[#FF5349] hover:bg-[#F05454] text-white border-[#FF5349]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6596}}
                          , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6597}} ), " Create Client Profile"
                        )
                      )
                    )

                    , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm mt-3"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6602}}
                      , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6603}}
                        , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6604}}
                          , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6605}}
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6606}}, "Client ID" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6607}}, "Client Details" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6608}}, "WhatsApp / Phone"  )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6609}}, "Assigned Associate" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6610}}, "Industry")
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6611}}, "Status")
                            , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6612}}, "Actions")
                          )
                        )
                        , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6615}}
                          , activeClients.length === 0 ? (
                            React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6617}}
                              , React.createElement('td', { colSpan: 7, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6618}}, "No " , clientFilterTab !== "All" ? clientFilterTab.toLowerCase() : "active", " client profiles found."   )
                            )
                          ) : (
                            activeClients.map((c) => {
                              const isPermanent = c.type === "Permanent" || (c ).clientType === "Permanent";
                              return (
                                React.createElement('tr', { 
                                  key: c.id, 
                                  onClick: () => setActiveClientDetail(c),
                                  className: "border-b border-gray-100 hover:bg-teal-50/50 cursor-pointer transition-colors group"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6624}}

                                  , React.createElement('td', { className: "p-3 font-mono font-semibold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6629}}, c.id)
                                  , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6630}}
                                    , React.createElement('div', { className: "font-bold text-[#071E34] group-hover:text-[#0E9F8A] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6631}}, c.name)
                                    , React.createElement('span', { className: "text-[10px] text-gray-450" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6632}}, c.company, " • "  , c.email)
                                  )
                                  , React.createElement('td', { className: "p-3 font-mono text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6634}}, c.whatsapp)
                                  , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6635}}, c.assignedEmployee)
                                  , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6636}}, c.industry)
                                  , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6637}}
                                    , React.createElement('span', { className: `px-2 py-0.5 rounded-full font-bold uppercase text-[9px] flex items-center gap-1 w-fit ${
                                      isPermanent ? "bg-emerald-100 text-emerald-800 border border-emerald-300" :
                                      c.status === "Active" ? "bg-green-50 text-green-600 border border-green-200" :
                                      c.status === "Potential" ? "bg-teal-50 text-[#115E59] border border-teal-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6638}}
                                      , isPermanent ? React.createElement(React.Fragment, null, React.createElement(CheckCircle, { size: 9, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6643}} ), " Permanent" ) : c.status
                                    )
                                  )
                                  , React.createElement('td', { className: "p-3 text-right flex justify-end gap-1.5"    , onClick: e => e.stopPropagation(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 6646}}
                                    , !isPermanent && (
                                      React.createElement(Button, { 
                                        onClick: () => handleUpgradeClientToPermanent(c.id), 
                                        variant: "ghost", 
                                        size: "sm", 
                                        className: "px-2 py-1 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 flex items-center gap-1 font-bold text-[10px]"          ,
                                        title: "Upgrade to Permanent Client Profile"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6648}}

                                        , React.createElement(CheckCircle, { size: 11, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6655}} ), " Make Permanent"
                                      )
                                    )
                                    , React.createElement(Button, { onClick: () => setActiveClientDetail(c), variant: "secondary", size: "sm", className: "px-2 py-1 flex items-center"   , title: "Open Client Workspace"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6658}}
                                      , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6659}} )
                                    )
                                    , React.createElement(Button, { 
                                      onClick: () => handleDeactivateClient(c.id), 
                                      variant: "ghost", 
                                      size: "sm", 
                                      className: "px-2 py-1 text-slate-600 border border-teal-100 hover:bg-teal-50"     ,
                                      title: "Archive Client Profile"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6661}}

                                      , React.createElement(UserX, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6668}} )
                                    )
                                    , React.createElement(Button, { 
                                      onClick: () => handleDeleteClient(c.id), 
                                      variant: "outline", 
                                      size: "sm", 
                                      className: "px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"    ,
                                      title: "Delete Client" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6670}}

                                      , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6677}} )
                                    )
                                  )
                                )
                              );
                            })
                          )
                        )
                      )
                    )

                    /* SECTION 2: ARCHIVED / INACTIVE CLIENTS HISTORY */
                    , React.createElement('div', { className: "flex flex-col gap-2 mt-8 pt-4 border-t border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6689}}
                      , React.createElement('h3', { className: "font-heading font-extrabold text-sm text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6690}}, "Archived & Inactive Client Profiles"    )
                      , React.createElement('p', { className: "text-[10px] text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6691}}, "Historical archive of inactive, deleted, suspended, or archived client profiles. Restore any profile when needed."              )
                    )

                    , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6694}}
                      , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6695}}
                        , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6696}}
                          , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6697}}
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6698}}, "Client ID" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6699}}, "Client Details" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6700}}, "WhatsApp / Phone"  )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6701}}, "Assigned Associate" )
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6702}}, "Industry")
                            , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6703}}, "Status")
                            , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6704}}, "Actions")
                          )
                        )
                        , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6707}}
                          , historyClients.length === 0 ? (
                            React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6709}}
                              , React.createElement('td', { colSpan: 7, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6710}}, "No archived history records found."    )
                            )
                          ) : (
                            historyClients.map((c) => (
                              React.createElement('tr', { 
                                key: c.id, 
                                onClick: () => setActiveClientDetail(c),
                                className: "border-b border-gray-100 bg-gray-50/20 hover:bg-gray-50/50 cursor-pointer transition-colors group"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6714}}

                                , React.createElement('td', { className: "p-3 font-mono font-semibold text-gray-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6719}}, c.id)
                                , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6720}}
                                  , React.createElement('div', { className: "font-bold text-[#071E34] group-hover:text-[#0E9F8A] transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6721}}, c.name)
                                  , React.createElement('span', { className: "text-[10px] text-gray-450" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6722}}, c.company, " • "  , c.email)
                                )
                                , React.createElement('td', { className: "p-3 font-mono text-[11px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6724}}, c.whatsapp)
                                , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6725}}, c.assignedEmployee)
                                , React.createElement('td', { className: "p-3 text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6726}}, c.industry)
                                , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6727}}
                                  , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-gray-100 text-gray-500 border border-gray-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6728}}
                                    , c.status
                                  )
                                )
                                , React.createElement('td', { className: "p-3 text-right flex justify-end gap-2"    , onClick: e => e.stopPropagation(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 6732}}
                                  , React.createElement(Button, { onClick: () => setActiveClientDetail(c), variant: "secondary", size: "sm", className: "px-2 py-1 flex items-center"   , title: "Open Client Workspace"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6733}}
                                    , React.createElement(Eye, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6734}} )
                                  )
                                  , React.createElement(Button, { 
                                    onClick: () => handleRestoreClient(c.id), 
                                    variant: "ghost", 
                                    size: "sm", 
                                    className: "px-2 py-1 text-green-700 border border-green-200 hover:bg-green-50"     ,
                                    title: "Restore Client Profile"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6736}}

                                    , React.createElement(UserCheck, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6743}} )
                                  )
                                  , React.createElement(Button, { 
                                    onClick: () => handleDeleteClient(c.id), 
                                    variant: "outline", 
                                    size: "sm", 
                                    className: "px-2 py-1 text-red-650 border-red-200 hover:bg-red-50"    ,
                                    title: "Delete Client Permanently"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6745}}

                                    , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6752}} )
                                  )
                                )
                              )
                            ))
                          )
                        )
                      )
                    )
                  )
                );
              })()
            )
          )
        )

        /* Tab: Client Calls */
        , activeTab === "calls" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6770}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6771}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6772}}, "Call Logs & Outcomes"   )
              , React.createElement(Button, { onClick: () => setShowCallModal(true), variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6773}}
                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6774}} ), " Log Customer Call"
              )
            )

            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6778}}
              , calls.map(call => (
                React.createElement('div', { key: call.id, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 text-xs relative group"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6780}}
                  , React.createElement('button', { 
                    onClick: () => handleDeleteCall(call.id), 
                    className: "absolute right-4 top-4 text-gray-300 hover:text-red-600 transition-colors"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6781}}

                    , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6785}} )
                  )
                  , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6787}}
                    , React.createElement('span', { className: "text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6788}}, call.id)
                    , React.createElement('span', { className: `px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      call.type === "Incoming" ? "bg-teal-50 text-[#115E59]" :
                      call.type === "Outgoing" ? "bg-teal-50 text-[#071E34]" : "bg-amber-100 text-amber-600"
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6789}}, call.type)
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6794}}
                    , React.createElement('h4', { className: "font-bold text-[#071E34] text-sm mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6795}}, call.clientName)
                    , React.createElement('span', { className: "text-gray-400 font-mono text-[10px] mt-0.5 block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6796}}, call.phoneNumber, " • Call date: "    , call.date)
                  )
                  , React.createElement('div', { className: "border-t border-gray-100 pt-2 flex flex-col gap-1.5 text-gray-600"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6798}}
                    , React.createElement('p', { className: "font-semibold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6799}}, "Call Purpose: "  , call.purpose)
                    , React.createElement('p', { className: "text-[11px] leading-relaxed italic text-gray-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6800}}, "\"", call.notes, "\"")
                    , React.createElement('div', { className: "text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded mt-1 font-mono"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6801}}, "Next: " , call.nextAction, " (Follow-up: "  , call.followUpDate, ")")
                  )
                )
              ))
            )
          )
        )

        /* Tab: Leads Log */
        , activeTab === "leads" && (() => {
          const activeLeads = showTrashOnly 
            ? leads.filter(l => l.status === "Deleted") 
            : leads.filter(l => l.status !== "Deleted" && !(l.status === "Won" && l.clientType === "Permanent"));
          const leadHistoryEntries = leads.filter(l => (l.status === "Lost" || (l.status === "Won" && l.clientType === "Permanent")) && l.status !== "Deleted");
          const permanentClients = clients.filter(c => (c.type === "Permanent" || (c ).clientType === "Permanent") && c.status !== "Deleted");

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
              interestedService: (c ).interestedService || "Website",
              expectedBudget: (c ).expectedBudget || (c ).budget || 0,
              status: "Won",
              clientType: "Permanent"
            };
          }).filter(Boolean) ;

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
            React.createElement('div', { className: "flex flex-col gap-7 pb-12 animate-in fade-in duration-300"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6874}}
              /* TOP STATISTICS & HEADER PANEL */
              , React.createElement('div', { className: "flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6876}}
                , React.createElement('div', { className: "flex flex-wrap items-center justify-between gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6877}}
                  , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6878}}
                    , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-red-50 text-[#FF5349] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6879}}
                      , React.createElement(Target, { size: 20, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6880}} )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 6882}}
                      , React.createElement('h2', { className: "font-heading font-extrabold text-base text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6883}}, "Leads")
                      , React.createElement('p', { className: "text-[10px] text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6884}}, "Your sales pipeline"  )
                    )
                  )

                  , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6888}}
                    /* Hidden Import file picker */
                    , React.createElement('input', { 
                      type: "file", 
                      ref: importLeadsFileInputRef, 
                      onChange: handleImportLeads, 
                      className: "hidden", 
                      accept: ".csv,.json", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6890}} 
                    )

                    /* Select / Toggle Multi-Select Mode */
                    , React.createElement('button', { 
                      onClick: () => {
                        setIsMultiSelectMode(!isMultiSelectMode);
                        setSelectedLeadIds([]);
                      },
                      className: `px-3 py-1.5 border rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all duration-200 ease-out ${
                        isMultiSelectMode 
                          ? "bg-red-50 border-[#FF5349] text-[#FF5349]" 
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6899}}

                      , React.createElement(CheckSquare, { size: 12, className: isMultiSelectMode ? "text-[#FF5349]" : "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6910}} )
                      , isMultiSelectMode ? "Cancel Select" : "Select"
                    )

                    /* Trash / View Trash Toggle / Bulk Delete */
                    , isMultiSelectMode ? (
                      React.createElement(React.Fragment, null
                        , React.createElement('button', { 
                          onClick: handleBulkTrash,
                          disabled: selectedLeadIds.length === 0,
                          className: "px-3 py-1.5 border border-red-200 rounded-lg text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-40 flex items-center gap-1 shadow-2xs transition-colors"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6917}}

                          , React.createElement(Trash2, { size: 12, className: "text-red-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6922}} ), " Trash Selected ("   , selectedLeadIds.length, ")"
                        )
                        , React.createElement('button', { 
                          onClick: handleBulkDelete,
                          disabled: selectedLeadIds.length === 0,
                          className: "px-3 py-1.5 border border-red-350 rounded-lg text-[11px] font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-40 flex items-center gap-1 shadow-2xs transition-colors"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6924}}

                          , React.createElement(Trash2, { size: 12, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6929}} ), " Delete Permanent"
                        )
                      )
                    ) : (
                      React.createElement('button', { 
                        onClick: () => setShowTrashOnly(!showTrashOnly),
                        className: `px-3 py-1.5 border rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all duration-200 ease-out ${
                          showTrashOnly 
                            ? "bg-red-50 border-red-400 text-red-650" 
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6933}}

                        , React.createElement(Trash2, { size: 12, className: showTrashOnly ? "text-red-600" : "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6941}} )
                        , showTrashOnly ? "View Active Leads" : "Trash Archive"
                      )
                    )

                    /* Configure Stages Button */
                    , React.createElement('button', { 
                      onClick: () => setShowStagesModal(true),
                      className: "px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6947}}

                      , React.createElement(SlidersHorizontal, { size: 12, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6951}} ), " Stages"
                    )

                    /* New Lead Creator */
                    , React.createElement(Button, { 
                      onClick: () => {
                        setLeadForm(prev => ({ ...prev, status: "New" }));
                        setShowLeadModal(true);
                      }, 
                      variant: "primary", 
                      size: "sm", 
                      className: "gap-1 shadow-xs bg-[#FF5349] hover:bg-[#F05454] font-extrabold text-[11px] rounded-lg border border-[#FF5349]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6955}}

                      , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6964}} ), " New Lead"
                    )

                    /* Import Button */
                    , React.createElement('button', { 
                      onClick: () => _optionalChain([importLeadsFileInputRef, 'access', _293 => _293.current, 'optionalAccess', _294 => _294.click, 'call', _295 => _295()]),
                      className: "px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6968}}

                      , React.createElement(Upload, { size: 12, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6972}} ), " Import"
                    )

                    /* Export Button */
                    , React.createElement('button', { 
                      onClick: handleExportLeads,
                      className: "px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1 shadow-2xs transition-colors"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6976}}

                      , React.createElement(Download, { size: 12, className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 6980}} ), " Export"
                    )
                  )
                )

                /* STAT CARDS */
                , React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6986}}
                  , React.createElement('div', { className: "p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6987}}
                    , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6988}}
                      , React.createElement(Target, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6989}} )
                    )
                    , React.createElement('div', { className: "flex flex-col" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6991}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6992}}, "Open")
                      , React.createElement('strong', { className: "text-sm font-mono text-[#06132D] font-extrabold mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6993}}, openCount)
                    )
                  )
                  , React.createElement('div', { className: "p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6996}}
                    , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-[#06132D]/5 text-[#06132D] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 6997}}
                      , React.createElement(TrendingUp, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 6998}} )
                    )
                    , React.createElement('div', { className: "flex flex-col" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7000}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7001}}, "Pipeline")
                      , React.createElement('strong', { className: "text-sm font-mono text-[#06132D] font-extrabold mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7002}}, "₹", pipelineVal.toLocaleString())
                    )
                  )
                  , React.createElement('div', { className: "p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7005}}
                    , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7006}}
                      , React.createElement(Trophy, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7007}} )
                    )
                    , React.createElement('div', { className: "flex flex-col" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7009}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7010}}, "Won / mo"  )
                      , React.createElement('strong', { className: "text-sm font-mono text-[#06132D] font-extrabold mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7011}}, wonCount || 2)
                    )
                  )
                  , React.createElement('div', { className: "p-4 border border-gray-150 rounded-xl bg-gray-50/30 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7014}}
                    , React.createElement('div', { className: "w-8 h-8 rounded-lg bg-[#06132D]/5 text-[#06132D] flex items-center justify-center font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7015}}
                      , React.createElement(CheckCircle, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7016}} )
                    )
                    , React.createElement('div', { className: "flex flex-col" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7018}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7019}}, "Win rate" )
                      , React.createElement('strong', { className: "text-sm font-mono text-[#06132D] font-extrabold mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7020}}, winRate === "0%" ? "100%" : winRate)
                    )
                  )
                )
              )

              /* SEARCH PIPELINE */
              , React.createElement('div', { className: "relative bg-white border border-gray-200 rounded-xl shadow-2xs px-4 py-2.5 flex items-center gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7027}}
                , React.createElement(Search, { size: 16, className: "text-gray-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7028}} )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "Search leads by name, company, email, phone..."      ,
                  className: "bg-transparent border-0 outline-none text-xs w-full text-gray-700 placeholder-gray-400"      ,
                  value: leadSearchQuery || "",
                  onChange: e => setLeadSearchQuery(e.target.value), __self: this, __source: {fileName: _jsxFileName, lineNumber: 7029}}
                )
              )

              /* KANBAN BOARD GRID */
              , React.createElement('div', { className: "flex gap-5 items-stretch overflow-x-auto pt-1 pb-8 min-h-[620px] scrollbar-thin"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7039}}
                , activeColumns.map(col => {
                  const colLeads = filteredActiveLeads.filter(l => {
                    const leadStatus = (l.status || "New").toLowerCase().replace(/_/g, " ").trim();
                    const colKey = col.key.toLowerCase().replace(/_/g, " ").trim();
                    const colTitle = col.title.toLowerCase().replace(/_/g, " ").trim();

                    if (colKey === "new" && (!l.status || leadStatus === "new")) return true;
                    return leadStatus === colKey || leadStatus === colTitle || leadStatus.includes(colKey) || colKey.includes(leadStatus);
                  });
                  const isDraggedOver = draggedOverCol === col.key;
                  
                  return (
                    React.createElement('div', { 
                      key: col.key, 
                      onDragOver: (e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        if (draggedOverCol !== col.key) setDraggedOverCol(col.key);
                      },
                      onDragEnter: (e) => {
                        e.preventDefault();
                        setDraggedOverCol(col.key);
                      },
                      onDragLeave: (e) => {
                        const nextTarget = e.relatedTarget ;
                        if (!nextTarget || !e.currentTarget.contains(nextTarget)) {
                          setDraggedOverCol(null);
                        }
                      },
                      onDrop: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const leadId = e.dataTransfer.getData("application/x-crm-lead-id") || e.dataTransfer.getData("text/plain") || draggingLeadId;
                        if (leadId) {
                          handleUpdateLeadStatus(leadId, col.key);
                        }
                        setDraggedOverCol(null);
                        setDraggingLeadId(null);
                      },
                      className: `flex flex-col gap-4 w-[300px] min-h-[560px] shrink-0 p-4 rounded-2xl border transition-all duration-200 ease-out ${
                        isDraggedOver 
                          ? "bg-teal-50/50 border-[#0E9F8A] shadow-md ring-2 ring-teal-500/10 scale-[1.01]" 
                          : "bg-[#f8fafc] border-gray-200 shadow-3xs"
                      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7052}}

                      /* Column Header */
                      , React.createElement('div', { className: "flex items-center justify-between pb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7086}}
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7087}}
                          , React.createElement('span', { className: `w-2.5 h-2.5 rounded-full ${col.dot}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7088}} )
                          , React.createElement('span', { className: "font-extrabold text-xs text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7089}}, col.title)
                          , React.createElement('span', { className: "bg-gray-200/80 text-[10px] font-extrabold text-gray-650 px-2 py-0.5 rounded-full"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7090}}, colLeads.length)
                        )
                        , col.key !== "Deleted" && (
                          React.createElement('button', { 
                            onClick: () => {
                              setInlineAddColKey(col.key);
                              setInlineLeadName("");
                            },
                            className: "w-5 h-5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7093}}

                            , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7100}} )
                          )
                        )
                      )

                      /* Add lead inline input card / button */
                      , col.key !== "Deleted" && (
                        inlineAddColKey === col.key ? (
                          React.createElement('div', { className: "p-4 bg-teal-50/30 border border-teal-200 rounded-xl flex flex-col gap-3 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7108}}
                            , React.createElement('input', {
                              type: "text",
                              autoFocus: true,
                              placeholder: "Lead name + Enter"   ,
                              value: inlineLeadName,
                              onChange: (e) => setInlineLeadName(e.target.value),
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleCreateLeadInline(col.key);
                                }
                              },
                              className: "w-full px-3 py-2 border border-teal-200 focus:border-[#0E9F8A] rounded-xl outline-none text-xs text-gray-800 bg-white"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7109}}
                            )
                            , React.createElement('div', { className: "flex justify-end items-center gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7123}}
                              , React.createElement('button', {
                                type: "button",
                                onClick: () => {
                                  setInlineAddColKey(null);
                                  setInlineLeadName("");
                                },
                                className: "text-xs text-gray-500 hover:text-gray-700 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7124}}
, "Cancel"

                              )
                              , React.createElement('button', {
                                type: "button",
                                onClick: () => handleCreateLeadInline(col.key),
                                className: "px-3.5 py-1 bg-[#5ECBC0] hover:bg-teal-600 text-white rounded-lg text-xs font-bold transition-colors"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7134}}
, "Add"

                              )
                            )
                          )
                        ) : (
                          React.createElement('button', { 
                            onClick: () => {
                              setInlineAddColKey(col.key);
                              setInlineLeadName("");
                            },
                            className: "py-2.5 border border-dashed border-gray-300 hover:border-[#0E9F8A] rounded-xl text-gray-400 hover:text-[#0E9F8A] text-xs font-semibold flex items-center justify-center gap-1 bg-white hover:bg-teal-50/50 transition-all duration-200 ease-out shadow-3xs"                   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7144}}

                            , React.createElement(Plus, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7151}} ), " Add lead"
                          )
                        )
                      )

                      /* Leads List */
                      , React.createElement('div', { className: "flex flex-1 flex-col gap-3 min-h-[430px] max-h-[calc(100vh-330px)] overflow-y-auto pr-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7157}}
                        , colLeads.length === 0 ? (
                          React.createElement('div', { className: "min-h-[128px] flex items-center justify-center text-center px-4 py-12 text-[11px] text-gray-400 font-medium bg-white rounded-xl border border-gray-150 shadow-3xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7159}}, "No leads"

                          )
                        ) : (
                          colLeads.map(lead => (
                            React.createElement('div', { 
                              key: lead.id, 
                              draggable: !isMultiSelectMode,
                              onDragStart: (e) => {
                                if (isMultiSelectMode) {
                                  e.preventDefault();
                                  return;
                                }
                                setDraggingLeadId(lead.id);
                                e.dataTransfer.setData("application/x-crm-lead-id", lead.id);
                                e.dataTransfer.setData("text/plain", lead.id);
                                e.dataTransfer.effectAllowed = "move";
                              },
                              onDragEnd: () => {
                                setDraggingLeadId(null);
                                setDraggedOverCol(null);
                              },
                              onClick: (e) => {
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
                              },
                              className: `p-4 bg-white border rounded-xl shadow-2xs flex flex-col gap-2.5 relative group transition-all duration-200 ease-out ${
                                isMultiSelectMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                              } ${
                                draggingLeadId === lead.id ? "opacity-60 ring-2 ring-teal-300 scale-[0.99]" : ""
                              } ${
                                selectedLeadIds.includes(lead.id) 
                                  ? "border-[#0E9F8A] bg-teal-50/20" 
                                  : lead.status === "Won" && lead.clientType !== "Permanent"
                                    ? "border-amber-300 bg-amber-50/70 hover:border-amber-400 hover:shadow-xs"
                                    : "border-gray-200 hover:border-teal-200 hover:shadow-xs"
                              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7164}}

                              , React.createElement('div', { className: "flex items-start justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7210}}
                                , isMultiSelectMode && (
                                  React.createElement('input', { 
                                    type: "checkbox",
                                    checked: selectedLeadIds.includes(lead.id),
                                    onChange: (e) => {
                                      const checked = e.target.checked;
                                      setSelectedLeadIds(prev => 
                                        checked 
                                          ? [...prev, lead.id] 
                                          : prev.filter(id => id !== lead.id)
                                      );
                                    },
                                    onClick: (e) => e.stopPropagation(), // Prevent double triggers
                                    className: "mr-2 rounded border-gray-300 text-[#0E9F8A] focus:ring-[#0E9F8A] w-4 h-4 shrink-0 mt-0.5 cursor-pointer"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7212}}
                                  )
                                )
                                , React.createElement('div', { className: "flex flex-col gap-1 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7227}}
                                  , React.createElement('h4', { className: "font-bold text-sm text-[#071E34] truncate max-w-[120px]"    , title: lead.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7228}}, lead.name)
                                  , React.createElement('div', { className: "text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 truncate max-w-[130px]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7229}}
                                    , React.createElement(Building2, { size: 10, className: "text-gray-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7230}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7231}}, lead.companyName || "No Company")
                                  )
                                  , React.createElement('div', { className: "text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7233}}
                                    , React.createElement(Phone, { size: 10, className: "text-gray-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7234}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7235}}, lead.phone || "No Phone")
                                  )
                                  , React.createElement('div', { className: "text-[10px] text-gray-450 flex items-center gap-1 mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7237}}
                                    , React.createElement(User, { size: 10, className: "text-gray-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7238}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7239}}, "Added by "  , lead.name)
                                  )
                                )

                                , React.createElement('strong', { className: "text-sm font-extrabold text-[#071E34] font-heading font-mono text-right shrink-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7243}}, "₹"
                                  , _optionalChain([lead, 'access', _296 => _296.expectedBudget, 'optionalAccess', _297 => _297.toLocaleString, 'call', _298 => _298()]) || "0"
                                )
                              )

                              /* Badges footer */
                              , React.createElement('div', { className: "flex items-center gap-1.5 flex-wrap pt-2 border-t border-gray-100"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7249}}
                                , React.createElement('span', { className: "text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7250}}
                                  , lead.interestedService || "Website"
                                )
                                , lead.status === "Won" ? (
                                  React.createElement('span', { className: `text-[9px] font-bold px-2.5 py-0.5 rounded border uppercase flex items-center gap-1 ${
                                    lead.clientType !== "Permanent"
                                      ? "text-amber-800 bg-amber-100 border-amber-300"
                                      : "text-teal-700 bg-teal-50 border-teal-200"
                                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7254}}
                                    , React.createElement(CheckCircle, { size: 9, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7259}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7260}}, lead.clientType === "Permanent" ? "Permanent Client" : "Ready for Permanent")
                                  )
                                ) : lead.status === "Lost" ? (
                                  React.createElement('span', { className: "text-[9px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200 uppercase flex items-center gap-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7263}}
                                    , React.createElement(AlertCircle, { size: 9, className: "text-red-650", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7264}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7265}}, "Lost Deal" )
                                  )
                                ) : (
                                  React.createElement('span', { className: "text-[9px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded border border-green-200 uppercase flex items-center gap-1"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7268}}
                                    , React.createElement(MessageSquare, { size: 9, className: "text-green-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7269}} )
                                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7270}}, "Follow up" )
                                  )
                                )
                              )

                              /* Small Quick Actions Bar */
                              , React.createElement('div', { className: "flex items-center justify-between gap-1.5 mt-1 pt-2 border-t border-gray-100 w-full"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7276}}
                                  , col.key !== "Deleted" ? (
                                    React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7278}}
                                      , React.createElement('button', {
                                        onClick: (e) => {
                                          e.stopPropagation();
                                          const idx = columns.findIndex(c => c.key === col.key);
                                          if (idx > 0) handleUpdateLeadStatus(lead.id, columns[idx - 1].key);
                                        },
                                        disabled: columns.findIndex(c => c.key === col.key) === 0,
                                        className: "w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-40 flex items-center justify-center transition-colors"          ,
                                        title: "Move Stage Left"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7279}}

                                        , React.createElement(ChevronLeft, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7289}} )
                                      )
                                      , React.createElement('button', {
                                        onClick: (e) => {
                                          e.stopPropagation();
                                          const idx = columns.findIndex(c => c.key === col.key);
                                          if (idx < columns.length - 1) handleUpdateLeadStatus(lead.id, columns[idx + 1].key);
                                        },
                                        disabled: columns.findIndex(c => c.key === col.key) === columns.length - 1,
                                        className: "w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-40 flex items-center justify-center transition-colors"          ,
                                        title: "Move Stage Right"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7291}}

                                        , React.createElement(ChevronRight, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7301}} )
                                      )
                                    )
                                  ) : (
                                    React.createElement('div', { className: "text-[10px] text-red-500 font-semibold uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7305}}, "Archived"

                                    )
                                  )

                                  /* Main CRM Actions */
                                  , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7311}}
                                    , lead.status === "Deleted" ? (
                                      React.createElement('button', {
                                        onClick: (e) => {
                                          e.stopPropagation();
                                          handleRestoreLead(lead.id);
                                        },
                                        className: "px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-0.5"               ,
                                        title: "Restore Lead to Active Pipeline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7313}}
, "Restore"

                                      )
                                    ) : lead.status === "Won" && lead.clientType === "Permanent" ? (
                                        React.createElement('span', { className: "px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7324}}, "Permanent"

                                        )
                                    ) : lead.status === "Won" && lead.clientType !== "Permanent" ? (
                                        React.createElement('button', {
                                          onClick: (e) => {
                                            e.stopPropagation();
                                            handleConvertLead(lead);
                                          },
                                          className: "px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-0.5"               ,
                                          title: "Upgrade Temporary Client to Permanent Client"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7328}}
, "Make Permanent"

                                        )
                                    ) : (
                                      React.createElement('span', { className: "text-[10px] text-gray-400 font-bold px-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7339}}, "Lead")
                                    )
                                    , React.createElement('button', {
                                      onClick: (e) => {
                                        e.stopPropagation();
                                        handleDeleteLead(lead.id);
                                      },
                                      className: "p-1 text-gray-400 hover:text-red-650 transition-colors"   ,
                                      title: lead.status === "Deleted" ? "Delete Permanently" : "Move to Trash", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7341}}

                                      , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7349}} )
                                    )
                                  )
                                )
                            )
                          ))
                        )
                      )
                    )
                  );
                })
              )

              , !showTrashOnly && (
                React.createElement('div', { className: "flex flex-col gap-3 pt-5 border-t border-gray-200"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7363}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7364}}
                    , React.createElement('h3', { className: "font-heading font-extrabold text-sm text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7365}}, "Lead Conversion History"  )
                    , React.createElement('p', { className: "text-[10px] text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7366}}, "Permanent clients and lost leads are stored here after leaving the active pipeline."            )
                  )

                  , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7369}}
                    , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7370}}
                      , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7371}}
                        , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7372}}
                          , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7373}}, "Lead ID" )
                          , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7374}}, "Client / Lead"  )
                          , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7375}}, "Service")
                          , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7376}}, "Value")
                          , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7377}}, "Final Status" )
                          , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7378}}, "Actions")
                        )
                      )
                      , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7381}}
                        , historyLeads.length === 0 ? (
                          React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7383}}
                            , React.createElement('td', { colSpan: 6, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7384}}, "No history records yet."   )
                          )
                        ) : (
                          historyLeads.map(l => (
                            React.createElement('tr', { key: l.id, className: "border-b border-gray-100 bg-gray-50/20 hover:bg-gray-50/60"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7388}}
                              , React.createElement('td', { className: "p-3 font-mono font-semibold text-gray-450"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7389}}, l.id)
                              , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7390}}
                                , React.createElement('div', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7391}}, l.name)
                                , React.createElement('span', { className: "text-[10px] text-gray-450" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7392}}, l.companyName, " • "  , l.phone || l.email)
                              )
                              , React.createElement('td', { className: "p-3 font-semibold text-gray-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7394}}, l.interestedService)
                              , React.createElement('td', { className: "p-3 font-bold text-gray-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7395}}, "₹", Number(l.expectedBudget || 0).toLocaleString())
                              , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7396}}
                                , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                                  l.status === "Won"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7397}}
                                  , l.status === "Won" ? "Permanent Client" : "Lost"
                                )
                              )
                              , React.createElement('td', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7405}}
                                , React.createElement('button', {
                                  onClick: () => handleDeleteLead(l.id),
                                  className: "px-2.5 py-1 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg text-[10px] font-bold"        ,
                                  title: "Delete History Record"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7406}}
, "Delete"

                                )
                              )
                            )
                          ))
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        })()

        /* Tab: Follow-ups */
        , activeTab === "followups" && (() => {
          const activeFollowups = leads.filter(l => l.status === "Follow-up");
          const historyFollowups = leads.filter(l => l.status === "Won" || l.status === "Lost");

          return (
            React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7432}}
              /* SECTION 1: ACTIVE FOLLOW-UP SCHEDULES */
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7434}}
                , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7435}}, "Follow-up Schedules" )
                , React.createElement('p', { className: "text-[10px] text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7436}}, "Leads transitioned to secondary discussion rounds and ongoing follow-up touchpoints."         )
              )

              , React.createElement('div', { className: "flex flex-col gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7439}}
                , activeFollowups.length === 0 ? (
                  React.createElement('div', { className: "p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-450 font-medium text-xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7441}}, "No active follow-up schedules. Check the history ledger below."

                  )
                ) : (
                  activeFollowups.map(l => (
                    React.createElement('div', { key: l.id, className: "p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-between text-xs gap-4"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7446}}
                      , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7447}}
                        , React.createElement(Calendar, { size: 18, className: "text-[#0E9F8A] shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7448}} )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7449}}
                          , React.createElement('h4', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7450}}, l.name, " • "  , l.companyName)
                          , React.createElement('span', { className: "text-[10px] text-gray-500 mt-1 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7451}}, "Expected Budget: **$"  , l.expectedBudget.toLocaleString(), "** • Service: "   , l.interestedService, " • Status: "   , React.createElement('span', { className: "font-bold text-[#0E9F8A] uppercase"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7451}}, l.status))
                        )
                      )
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7454}}
                        , React.createElement('div', { className: "text-right mr-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7455}}
                          , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 block uppercase"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7456}}, "Scheduled Date" )
                          , React.createElement('span', { className: "font-mono text-[#0E9F8A] font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7457}}, l.nextFollowUpDate)
                        )
                        , React.createElement(Button, {
                          onClick: () => handleRevertLead(l),
                          variant: "secondary",
                          size: "sm",
                          className: "text-[10px] py-1.5 px-3 border border-teal-100 text-[#115E59] bg-teal-50 hover:bg-teal-50 font-bold flex items-center gap-1"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7459}}

                          , React.createElement(RotateCcw, { size: 12, className: "shrink-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7465}} ), " Revert to Lead"
                        )
                      )
                    )
                  ))
                )
              )

              /* SECTION 2: FOLLOW-UP CONVERSION HISTORY */
              , React.createElement('div', { className: "flex flex-col gap-2 mt-8 pt-4 border-t border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7474}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-sm text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7475}}, "Follow-up Conversion History"  )
                , React.createElement('p', { className: "text-[10px] text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7476}}, "Archive tracking follow-up leads successfully converted to active client accounts or lost prospects."            )
              )

              , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7479}}
                , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7480}}
                  , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7481}}
                    , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7482}}
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7483}}, "Lead ID" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7484}}, "Lead Details" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7485}}, "Service Interest" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7486}}, "Expected Budget" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7487}}, "Follow-up Date" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7488}}, "Outcome Status" )
                      , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7489}}, "Actions")
                    )
                  )
                  , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7492}}
                    , historyFollowups.length === 0 ? (
                      React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7494}}
                        , React.createElement('td', { colSpan: 7, className: "p-8 text-center text-gray-400 font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7495}}, "No conversion history found."   )
                      )
                    ) : (
                      historyFollowups.map(l => (
                        React.createElement('tr', { key: l.id, className: `border-b border-gray-100 hover:bg-gray-50/50 ${
                          l.status === "Won" && l.clientType !== "Permanent" ? "bg-amber-50/70" : "bg-gray-50/20"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7499}}
                          , React.createElement('td', { className: "p-3 font-mono font-semibold text-gray-450"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7502}}, l.id)
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7503}}
                            , React.createElement('div', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7504}}, l.name)
                            , React.createElement('span', { className: "text-[10px] text-gray-450" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7505}}, l.companyName, " • "  , l.phone)
                          )
                          , React.createElement('td', { className: "p-3 font-semibold text-gray-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7507}}, l.interestedService)
                          , React.createElement('td', { className: "p-3 font-bold text-gray-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7508}}, "$", l.expectedBudget.toLocaleString())
                          , React.createElement('td', { className: "p-3 font-mono text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7509}}, l.nextFollowUpDate)
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7510}}
                            , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                              l.status === "Won" && l.clientType !== "Permanent"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : l.status === "Won" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"
                            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7511}}
                              , l.status === "Won" && l.clientType !== "Permanent" ? "Ready for Permanent" : l.status === "Won" ? "Permanent Client" : l.status
                            )
                          )
                          , React.createElement('td', { className: "p-3 text-right flex justify-end items-center gap-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7519}}
                            , l.status === "Won" && l.clientType !== "Permanent" ? (
                              React.createElement(Button, {
                                onClick: () => handleConvertLead(l),
                                variant: "primary",
                                size: "sm",
                                className: "px-2 py-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white border-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7521}}
, "Make Permanent"

                              )
                            ) : l.status === "Won" ? (
                              React.createElement('span', { className: "text-green-600 font-bold uppercase text-[10px] pr-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7530}}, "Permanent")
                            ) : (
                              React.createElement('span', { className: "text-gray-400 font-bold uppercase text-[10px] pr-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7532}}, "Processed")
                            )
                            , React.createElement(Button, {
                              onClick: () => handleDeleteLead(l.id),
                              variant: "outline",
                              size: "sm",
                              className: "px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"    ,
                              title: "Delete History Record"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7534}}

                              , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7541}} )
                            )
                          )
                        )
                      ))
                    )
                  )
                )
              )
            )
          );
        })()

        /* Tab: All Projects */
        , activeTab === "projects" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7556}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7557}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7558}}, "Project Portfolio" )
              , React.createElement(Button, { onClick: () => setShowProjectModal(true), variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7559}}
                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7560}} ), " Create Client Project"
              )
            )

            , projects.length === 0 ? (
              React.createElement('div', { className: "p-12 bg-white border border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7565}}
                , React.createElement(FolderOpen, { className: "w-10 h-10 text-gray-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7566}} )
                , React.createElement('h4', { className: "font-heading font-bold text-gray-700 text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7567}}, "No Client Projects Found"   )
                , React.createElement('p', { className: "text-xs text-gray-400 max-w-xs leading-relaxed"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7568}}, "There are no active or completed projects in the database. Click "           , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7568}}, "+ Create Client Project"   ), " to add your first project."     )
                , React.createElement(Button, { onClick: () => setShowProjectModal(true), variant: "primary", size: "sm", className: "mt-1 gap-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7569}}
                  , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7570}} ), " Create Client Project"
                )
              )
            ) : (
              React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7574}}
                , projects.map(p => (
                  React.createElement('div', { key: p.id, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-4 relative group"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7576}}
                    , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7577}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7578}}
                        , React.createElement('span', { className: "text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7579}}, p.id)
                        , React.createElement('h3', { 
                          onClick: () => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); },
                          className: "font-heading font-bold text-sm text-[#071E34] mt-1.5 hover:text-[#0E9F8A] cursor-pointer transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7580}}

                          , p.name || p.title
                        )
                        , React.createElement('span', { className: "text-[10px] text-gray-400 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7586}}, "Client: " , p.clientName)
                      )
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7588}}
                        , React.createElement('span', { className: `px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          p.status === "Completed" ? "bg-green-50 text-green-600" :
                          p.status === "Planning" ? "bg-teal-50 text-[#115E59]" : "bg-amber-50 text-amber-600"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7589}}
                          , p.status
                        )
                        , React.createElement('button', {
                          onClick: () => handleStartEditProject(p),
                          className: "text-gray-400 hover:text-[#0E9F8A] transition-colors p-1"   ,
                          title: "Edit Project Data"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7595}}

                          , React.createElement(Edit3, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7600}} )
                        )
                        , React.createElement('button', {
                          onClick: () => handleDeleteProject(p.id),
                          className: "text-gray-300 hover:text-red-600 transition-colors p-1"   ,
                          title: "Delete Project" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7602}}

                          , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7607}} )
                        )
                      )
                    )

                    , React.createElement('div', { className: "flex flex-col gap-1 text-xs text-gray-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7612}}
                      , React.createElement('div', { className: "flex justify-between font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7613}}
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7614}}, "Project Completion:" )
                        , React.createElement('span', { className: "text-[#071E34] font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7615}}, p.progress, "%")
                      )
                      , React.createElement('div', { className: "w-full h-2 rounded-full bg-gray-200 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7617}}
                        , React.createElement('div', { className: "h-full rounded-full bg-[#0E9F8A]"  , style: { width: `${p.progress}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7618}})
                      )
                    )

                    , React.createElement('div', { className: "border-t border-gray-100 pt-3 flex justify-between items-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7622}}
                      , React.createElement('span', { className: "text-xs font-bold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7623}}, "$", (p.budget || 0).toLocaleString(), ".00")
                      , React.createElement(Button, { onClick: () => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }, variant: "secondary", size: "sm", className: "font-bold text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7624}}, "Open Proposal Page →"

                      )
                    )
                  )
                ))
              )
            )
          )
        )

        /* Tab: Our Projects */
        , activeTab === "our-projects" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7637}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7638}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7639}}
                , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7640}}, "Company Showcase & Our Projects"    )
                , React.createElement('span', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7641}}, "Internal software products, portfolio systems, and production showcases."       )
              )
              , React.createElement(Button, { onClick: () => setShowOurProjectModal(true), variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7643}}
                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7644}} ), " Create Our Project"
              )
            )

            , ourProjects.length === 0 ? (
              React.createElement('div', { className: "p-12 bg-white border border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7649}}
                , React.createElement(Briefcase, { className: "w-10 h-10 text-gray-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7650}} )
                , React.createElement('h4', { className: "font-heading font-bold text-gray-700 text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7651}}, "No Company Showcase Projects Found"    )
                , React.createElement('p', { className: "text-xs text-gray-400 max-w-xs leading-relaxed"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7652}}, "There are no internal or showcase projects stored in the database. Click "
                              , React.createElement('strong', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7653}}, "+ Create Our Project"   ), " to add your first company project."
                )
                , React.createElement(Button, { onClick: () => setShowOurProjectModal(true), variant: "primary", size: "sm", className: "mt-1 gap-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7655}}
                  , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7656}} ), " Create Our Project"
                )
              )
            ) : (
              React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7660}}
                , ourProjects.map(p => (
                  React.createElement('div', { key: p.id, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between gap-4 relative group"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7662}}
                    , React.createElement('div', { className: "flex justify-between items-start"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7663}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7664}}
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7665}}
                          , React.createElement('span', { className: "text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7666}}, p.id)
                          , React.createElement('span', { className: "text-[9px] font-bold bg-teal-50 text-teal-600 px-2 py-0.5 rounded uppercase"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7667}}, p.category || "Web App")
                        )
                        , React.createElement('h3', { 
                          onClick: () => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); },
                          className: "font-heading font-bold text-sm text-[#071E34] mt-2 hover:text-[#0E9F8A] cursor-pointer transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7669}}

                          , p.name || p.title
                        )
                        , React.createElement('span', { className: "text-[10px] text-gray-400 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7675}}, "Showcase Client: "  , p.clientName || "Internal Enterprise")
                      )
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7677}}
                        , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-green-50 text-green-600"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7678}}
                          , p.status || "Live Production"
                        )
                        , React.createElement('button', {
                          onClick: () => handleStartEditOurProject(p),
                          className: "text-gray-400 hover:text-[#0E9F8A] transition-colors p-1"   ,
                          title: "Edit Company Project Data"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7681}}

                          , React.createElement(Edit3, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7686}} )
                        )
                        , React.createElement('button', {
                          onClick: () => handleDeleteOurProject(p.id),
                          className: "text-gray-300 hover:text-red-600 transition-colors p-1"   ,
                          title: "Delete Our Project"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7688}}

                          , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7693}} )
                        )
                      )
                    )

                    , React.createElement('p', { className: "text-xs text-gray-500 leading-relaxed italic"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7698}}, p.description || "No description provided.")

                    , React.createElement('div', { className: "border-t border-gray-100 pt-3 flex justify-between items-center text-xs gap-2 flex-wrap"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7700}}
                      , React.createElement('span', { className: "font-mono font-extrabold text-sm text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7701}}, "₹"
                        , (p.budget || (p.id === "OPRJ-7001" ? 45000 : 50000)).toLocaleString("en-IN")
                      )
                      , React.createElement('div', { className: "flex items-center gap-1.5 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7704}}
                        , React.createElement(Button, { 
                          onClick: () => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }, 
                          variant: "secondary", 
                          size: "sm",
                          className: "text-[10px] py-1 px-2.5 flex items-center gap-1 font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7705}}

                          , React.createElement(Layers, { size: 12, className: "text-[#0E9F8A]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7711}} )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7712}}, "Open Proposal Page"  )
                        )

                        , React.createElement(Button, { 
                          onClick: () => { setReviewingQuote(null); setActiveProjectDetail(null); setActiveProjectProposalsView(p); }, 
                          variant: "secondary", 
                          size: "sm",
                          className: "text-[10px] py-1 px-2.5 flex items-center gap-1 font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7715}}

                          , React.createElement(FileText, { size: 12, className: "text-[#0E9F8A]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7721}} )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7722}}, "Quotation Page" )
                        )

                        , p.liveUrl && (
                          React.createElement('a', { 
                            href: p.liveUrl.startsWith("http") ? p.liveUrl : `https://${p.liveUrl}`, 
                            target: "_blank", 
                            rel: "noreferrer", 
                            className: "text-[#0E9F8A] hover:underline font-semibold text-[11px] flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-lg"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7726}}

                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7732}}, "Live Demo" )
                            , React.createElement(ArrowRight, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7733}} )
                          )
                        )
                      )
                    )
                  )
                ))
              )
            )
          )
        )

        /* Tab: Proposals Studio */
        , activeTab === "proposals" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7747}}
            , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7748}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7749}}
                , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7750}}, "Proposals Builder Studio"  )
                , React.createElement('p', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7751}}, "Configure 8-section executive proposals, project scopes, role specifications, and deliverable matrices."          )
              )
              , React.createElement(Button, {
                onClick: () => {
                  const defaultProj = ourProjects[0] || projects[0] || { id: "OPRJ-7030", name: "Tours and Travels", clientName: "Internal Enterprise" };
                  setActiveProjectDetail(defaultProj);
                  setActiveProjectTab("overview");
                },
                variant: "primary",
                size: "sm",
                className: "gap-1 bg-[#0E9F8A] hover:bg-teal-600 text-white font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7753}}

                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7763}} ), " Create Proposal Workspace"
              )
            )

            /* List of active proposal project workspaces */
            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7768}}
              , (ourProjects.length > 0 ? ourProjects : projects).map((proj) => {
                const existingQuote = quotations.find(q => q.projectId === proj.id || (q ).projectName === proj.name);
                return (
                  React.createElement('div', { key: proj.id, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between gap-4"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7772}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7773}}
                      , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7774}}
                        , React.createElement('span', { className: "text-[10px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7775}}, proj.id)
                        , React.createElement('span', { className: "text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 uppercase"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7776}}, "8-Section Proposal"

                        )
                      )
                      , React.createElement('h3', { className: "font-heading font-bold text-sm text-[#071E34] mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7780}}, proj.name || proj.title)
                      , React.createElement('span', { className: "text-[10px] text-gray-400 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7781}}, "Sponsor: " , proj.clientName || "Enterprise Client")
                    )

                    , React.createElement('div', { className: "p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7784}}
                      , React.createElement('span', { className: "text-[10px] font-bold text-gray-500 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7785}}, "Selected Proposal Scope"  )
                      , React.createElement('span', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7786}}, _optionalChain([existingQuote, 'optionalAccess', _299 => _299.projectType]) || "Website Application")
                    )

                    , React.createElement('div', { className: "border-t border-gray-100 pt-3 flex justify-between items-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7789}}
                      , React.createElement(Button, {
                        onClick: () => {
                          setActiveProjectDetail(proj);
                          setActiveProjectTab("overview");
                        },
                        variant: "secondary",
                        size: "sm",
                        className: "text-xs font-bold gap-1 text-[#0E9F8A] hover:bg-teal-50"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7790}}

                        , React.createElement(Sparkles, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7799}} )
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7800}}, "Edit 8 Sections"  )
                      )

                      , React.createElement(Button, {
                        onClick: async () => {
                          if (existingQuote) {
                            setReviewingQuote(existingQuote);
                            setReviewMode("exact-pdf");
                          } else {
                            await handleCreateScopeQuotation(proj, "website");
                            setActiveTab("quotations");
                          }
                        },
                        variant: "primary",
                        size: "sm",
                        className: "text-xs font-bold gap-1 bg-[#0E9F8A] hover:bg-teal-600 text-white"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7803}}

                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7817}}, "Create Proposal & Open Quotation →"     )
                      )
                    )
                  )
                );
              })
            )
          )
        )

        /* Tab: Quotations */
        , activeTab === "quotations" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7829}}
            , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7830}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7831}}
                , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7832}}, "Quotations Ledger" )
                , React.createElement('p', { className: "text-[10px] text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7833}}, "Manage, create, and upload custom estimation files to generate tailored proposals."          )
              )
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7835}}
                , React.createElement(Button, { 
                  type: "button",
                  onClick: () => _optionalChain([quoteFileInputRef, 'access', _300 => _300.current, 'optionalAccess', _301 => _301.click, 'call', _302 => _302()]), 
                  variant: "secondary", 
                  size: "sm", 
                  className: "text-xs py-1.5 px-3 flex items-center gap-1.5 border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7836}}

                  , React.createElement(Upload, { size: 14, className: "text-purple-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7843}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7844}}, "Upload Quotation File"  )
                )
                , React.createElement(Button, { onClick: () => { setEditingQuote(null); setShowQuoteModal(true); }, variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7846}}
                  , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7847}} ), " Create Quotation"
                )
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7852}}
              , quotations.map(quote => {
                const totalVal = getQuoteFinalVal(quote);
                return (
                  React.createElement('div', { key: quote.number, className: "p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7856}}
                    , React.createElement('div', { className: "flex flex-col gap-1 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7857}}
                      , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7858}}
                        , React.createElement('span', { className: "text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold max-w-fit"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7859}}, quote.number)
                        , React.createElement('span', { className: `text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                          (quote.projectType || "").includes("Mobile")
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : (quote.projectType || "").includes("Web & Mobile")
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : (quote.projectType || "").includes("Website")
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7860}}
                          , quote.projectType || "Scope Quotation"
                        )
                      )
                      , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34] mt-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7872}}, quote.title)
                      , React.createElement('p', { className: "text-gray-400 text-[10px] mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7873}}, "Project: " , quote.projectName, " • Client: "   , quote.clientName)
                    )

                    , React.createElement('div', { className: "flex items-center gap-4 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7876}}
                      , React.createElement('div', { className: "text-right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7877}}
                        , React.createElement('span', { className: "text-[9px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7878}}, "Total Amount" )
                        , React.createElement('strong', { className: "text-[#071E34] text-sm font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7879}}, "$", totalVal.toLocaleString())
                      )
                      , quote.status !== "Approved" ? (
                        React.createElement(Button, { onClick: () => handleApproveQuotation(quote.number), variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7882}}, "Approve"

                        )
                      ) : (
                        React.createElement('span', { className: "px-3 py-1 rounded bg-green-50 border border-green-200 text-green-600 font-bold uppercase text-[9px]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7886}}, "Approved")
                      )
                    )
                  )
                );
              })
            )
          )
        )

        /* Tab: Project Features */
        , activeTab === "features" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7898}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7899}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7900}}, "Logged Features" )
              , React.createElement(Button, { onClick: () => setShowFeatureModal(true), variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7901}}
                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7902}} ), " Add Project Feature"
              )
            )

            , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7906}}
              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7907}}
                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7908}}
                  , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7909}}
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7910}}, "Feature ID" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7911}}, "Feature Detail" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7912}}, "Requirement Module" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7913}}, "Developer")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7914}}, "Priority")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7915}}, "Status")
                  )
                )
                , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7918}}
                  , features.map(f => (
                    React.createElement('tr', { key: f.id, className: "border-b border-gray-100 hover:bg-gray-50/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7920}}
                      , React.createElement('td', { className: "p-3 font-mono font-semibold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7921}}, f.id)
                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7922}}
                        , React.createElement('div', { className: "font-bold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7923}}, f.title)
                        , React.createElement('span', { className: "text-[10px] text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7924}}, f.projectName)
                      )
                      , React.createElement('td', { className: "p-3 font-semibold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7926}}, f.moduleName)
                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7927}}, f.assignedDeveloper)
                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7928}}
                        , React.createElement('span', { className: `px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          f.priority === "Critical" ? "bg-red-100 text-red-600" :
                          f.priority === "High" ? "bg-amber-100 text-amber-600" : "bg-teal-50 text-[#115E59]"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7929}}, f.priority)
                      )
                      , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7934}}
                        , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-teal-50 text-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7935}}, f.status)
                      )
                    )
                  ))
                )
              )
            )
          )
        )

        /* Tab: Innovations */
        , activeTab === "innovations" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7947}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7948}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7949}}, "Advanced Solutions Proposed"  )
              , React.createElement(Button, { onClick: () => setShowInnovationModal(true), variant: "primary", size: "sm", className: "gap-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7950}}
                , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7951}} ), " Propose Solution"
              )
            )

            , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7955}}
              , innovations.map(inn => (
                React.createElement('div', { key: inn.id, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-3 text-xs relative"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7957}}
                  , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7958}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7959}}
                      , React.createElement('span', { className: "text-[9px] font-mono bg-teal-50 text-[#0E9F8A] px-2 py-0.5 rounded font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7960}}, inn.id)
                      , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7961}}, inn.title)
                      , React.createElement('p', { className: "text-gray-400 text-[10px] mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7962}}, "Project: " , inn.projectName, " • Proposed by: "    , inn.proposedBy)
                    )
                    , React.createElement('span', { className: "px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-teal-50 text-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7964}}, inn.approvalStatus)
                  )
                  , React.createElement('div', { className: "border-t border-gray-100 pt-2 flex flex-col gap-1 text-gray-600"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7966}}
                    , React.createElement('p', { className: "font-medium text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7967}}, inn.description)
                    , React.createElement('p', { className: "text-[#0E9F8A] mt-1 font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7968}}, "Business Benefit: "  , inn.businessBenefit)
                    , React.createElement('p', { className: "text-green-600 font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7969}}, "Technical Benefit: "  , inn.technicalBenefit)
                  )
                )
              ))
            )
          )
        )

        /* Tab: Invoices */
        , activeTab === "invoices" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7979}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7980}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7981}}, "Billing Invoices" )
              , React.createElement(Button, { onClick: () => setShowInvoiceModal(true), variant: "primary", className: "text-xs px-3.5 py-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7982}}, "+ Generate Invoice"

              )
            )
            , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7986}}
              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7987}}
                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7988}}
                  , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7989}}
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7990}}, "Invoice ID" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7991}}, "Client")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7992}}, "Due Date" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7993}}, "Value")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 7994}}, "Status")
                  )
                )
                , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 7997}}
                  , invoices.length === 0 ? (
                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7999}}
                      , React.createElement('td', { colSpan: 5, className: "p-8 text-center text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8000}}, "No invoices in database. Click + Generate Invoice to create one."          )
                    )
                  ) : (
                    invoices.map(inv => (
                      React.createElement('tr', { key: inv.id, className: "border-b border-gray-100" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8004}}
                        , React.createElement('td', { className: "p-3 font-mono font-semibold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8005}}, inv.id)
                        , React.createElement('td', { className: "p-3 font-bold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8006}}, inv.clientName)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8007}}, inv.due || inv.dueDate)
                        , React.createElement('td', { className: "p-3 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8008}}, "$", (inv.value || inv.amount || 0).toLocaleString())
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8009}}
                          , React.createElement('span', { className: `px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                            inv.status === "Paid" || inv.status === "paid" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8010}}, inv.status)
                        )
                      )
                    ))
                  )
                )
              )
            )
          )
        )

        /* Tab: Payments Log */
        , activeTab === "payments" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8025}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8026}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8027}}, "Receipt Payments Log"  )
              , React.createElement(Button, { onClick: () => setShowPaymentModal(true), variant: "primary", className: "text-xs px-3.5 py-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8028}}, "+ Log Payment"

              )
            )
            , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8032}}
              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8033}}
                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8034}}
                  , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8035}}
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8036}}, "Txn ID" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8037}}, "Client")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8038}}, "Receipt Value" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8039}}, "Gateway")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8040}}, "Date")
                  )
                )
                , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8043}}
                  , payments.length === 0 ? (
                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8045}}
                      , React.createElement('td', { colSpan: 5, className: "p-8 text-center text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8046}}, "No payment logs in database. Click + Log Payment to record one."           )
                    )
                  ) : (
                    payments.map(pay => (
                      React.createElement('tr', { key: pay.id, className: "border-b border-gray-100" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8050}}
                        , React.createElement('td', { className: "p-3 font-mono font-semibold text-green-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8051}}, pay.id)
                        , React.createElement('td', { className: "p-3 font-bold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8052}}, pay.clientName)
                        , React.createElement('td', { className: "p-3 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8053}}, "$", pay.amount.toLocaleString())
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8054}}, pay.gateway)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8055}}, pay.date)
                      )
                    ))
                  )
                )
              )
            )
          )
        )

        /* Tab: Expense Ledger */
        , activeTab === "expenses" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8067}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8068}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8069}}, "Corporate Expenses" )
              , React.createElement(Button, { onClick: () => setShowExpenseModal(true), variant: "primary", className: "text-xs px-3.5 py-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8070}}, "+ Add Expense"

              )
            )
            , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8074}}
              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8075}}
                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8076}}
                  , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8077}}
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8078}}, "Exp ID" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8079}}, "Title Description" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8080}}, "Value")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8081}}, "Category")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8082}}, "Date")
                  )
                )
                , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8085}}
                  , expenses.length === 0 ? (
                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8087}}
                      , React.createElement('td', { colSpan: 5, className: "p-8 text-center text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8088}}, "No expenses recorded. Click + Add Expense to create one."         )
                    )
                  ) : (
                    expenses.map(exp => (
                      React.createElement('tr', { key: exp.id, className: "border-b border-gray-100" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8092}}
                        , React.createElement('td', { className: "p-3 font-mono font-semibold text-red-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8093}}, exp.id)
                        , React.createElement('td', { className: "p-3 font-semibold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8094}}, exp.title)
                        , React.createElement('td', { className: "p-3 font-bold text-red-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8095}}, "$", exp.value)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8096}}, exp.category)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8097}}, exp.date)
                      )
                    ))
                  )
                )
              )
            )
          )
        )

        /* Tab: Corporate Users */
        , activeTab === "users" && (() => {
          const activeDbUsers = users.filter(u => u && u.status !== "Deleted");

          const permanentClientsAsUsers = (clients || [])
            .filter(c => c && (c.type === "Permanent" || (c ).clientType === "Permanent" || c.status === "Active") && c.status !== "Deleted")
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
            React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8145}}
              , React.createElement('div', { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8146}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8147}}
                  , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8148}}, "System Users & Accounts"   )
                  , React.createElement('span', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8149}}, "Manage all system users, authorization roles, and permanent client user accounts."          )
                )
                , React.createElement(Button, { 
                  onClick: handleOpenAddUserModal, 
                  variant: "primary", 
                  size: "sm", 
                  className: "gap-1 bg-[#FF5349] hover:bg-[#F05454] text-white border-[#FF5349]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8151}}

                  , React.createElement(Plus, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8157}} ), " Add System User"
                )
              )
              , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8160}}
                , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8161}}
                  , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8162}}
                    , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8163}}
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8164}}, "User")
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8165}}, "Email Address" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8166}}, "Role Authorization" )
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8167}}, "Status")
                      , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8168}}, "Actions")
                    )
                  )
                  , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8171}}
                    , unifiedSystemUsers.length === 0 ? (
                      React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8173}}
                        , React.createElement('td', { colSpan: 5, className: "p-8 text-center text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8174}}, "No system users found. Click Add System User to create one."          )
                      )
                    ) : (
                      unifiedSystemUsers.map(u => (
                        React.createElement('tr', { key: u.email || u.id, className: "border-b border-gray-100 hover:bg-slate-50/50 transition-colors"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8178}}
                          , React.createElement('td', { className: "p-3 font-bold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8179}}, u.name)
                          , React.createElement('td', { className: "p-3 font-mono text-slate-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8180}}, u.email)
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8181}}
                            , React.createElement('span', { className: "px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-extrabold text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8182}}
                              , u.role || "Client Access"
                            )
                          )
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8186}}
                            , React.createElement('span', { className: `px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                              (u.status || "Active") === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8187}}
                              , u.status || "Active"
                            )
                          )
                          , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8193}}
                            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8194}}
                              , React.createElement('button', {
                                onClick: () => handleOpenEditUserModal(u),
                                className: "px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8195}}

                                , React.createElement(Edit, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8199}} )
                                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8200}}, "Edit")
                              )
                              , u.email !== "admin@crm.com" && (
                                React.createElement('button', {
                                  onClick: () => handleDeleteUser(u.email || u.id),
                                  className: "px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors inline-flex items-center gap-1"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8203}}

                                  , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8207}} )
                                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8208}}, "Delete")
                                )
                              )
                            )
                          )
                        )
                      ))
                    )
                  )
                )
              )
            )
          );
        })()

        /* Tab: Employees Profile */
        , activeTab === "employees" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8225}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8226}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8227}}, "Employee Roster" )
              , React.createElement(Button, { onClick: () => setShowEmployeeModal(true), variant: "primary", className: "text-xs px-3.5 py-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8228}}, "+ Add Employee Profile"

              )
            )
            , React.createElement('div', { className: "overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8232}}
              , React.createElement('table', { className: "w-full text-left border-collapse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8233}}
                , React.createElement('thead', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8234}}
                  , React.createElement('tr', { className: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8235}}
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8236}}, "Employee ID" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8237}}, "Name")
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8238}}, "Corporate Role" )
                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8239}}, "Department")
                  )
                )
                , React.createElement('tbody', { className: "text-xs text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8242}}
                  , employees.length === 0 ? (
                    React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8244}}
                      , React.createElement('td', { colSpan: 4, className: "p-8 text-center text-gray-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8245}}, "No employees listed. Click + Add Employee Profile to create one."          )
                    )
                  ) : (
                    employees.map(e => (
                      React.createElement('tr', { key: e.id, className: "border-b border-gray-100" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8249}}
                        , React.createElement('td', { className: "p-3 font-mono font-semibold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8250}}, e.id)
                        , React.createElement('td', { className: "p-3 font-bold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8251}}, e.name)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8252}}, e.role)
                        , React.createElement('td', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8253}}, e.dept)
                      )
                    ))
                  )
                )
              )
            )
          )
        )

        /* Tab: Department Teams */
        , activeTab === "teams" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8265}}
            , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8266}}
              , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8267}}, "Department Teams" )
              , React.createElement(Button, { onClick: () => setShowTeamModal(true), variant: "primary", className: "text-xs px-3.5 py-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8268}}, "+ Create Department Team"

              )
            )
            , teams.length === 0 ? (
              React.createElement('div', { className: "p-8 bg-white border border-dashed border-gray-200 rounded-2xl text-center text-xs text-gray-400"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8273}}, "No department teams found. Click + Create Department Team to add one."

              )
            ) : (
              React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8277}}
                , teams.map(team => (
                  React.createElement('div', { key: team.name, className: "p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col gap-2 text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8279}}
                    , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8280}}, team.name)
                    , React.createElement('span', { className: "text-gray-400 text-[10px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8281}}, "Leader: " , team.lead)
                    , React.createElement('div', { className: "border-t border-gray-100 pt-2 text-gray-600 mt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8282}}
                      , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8283}}, "Members: " , React.createElement('strong', { className: "text-gray-800", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8283}}, team.members))
                      , React.createElement('p', { className: "mt-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8284}}, "Active Projects: "  , React.createElement('strong', { className: "text-gray-800", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8284}}, team.activeProjects))
                    )
                  )
                ))
              )
            )
          )
        )


        /* Tab: Lead Reports */
        , activeTab === "reports-leads" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8296}}
            , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8297}}, "Lead Generation Reports"  )
            , React.createElement(GlassCard, { className: "p-6 bg-white border border-gray-200 flex flex-col gap-4 text-xs"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8298}}
              , React.createElement('h3', { className: "font-heading font-bold text-[#071E34] text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8299}}, "Lead Conversion Ratios"  )
              , React.createElement('p', { className: "text-gray-500", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8300}}, "Overall lead acquisition split by sources."     )
              , React.createElement('div', { className: "flex flex-col gap-3 mt-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8301}}
                , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8302}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8303}}, "Google Ads" )
                  , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8304}}, "40%")
                )
                , React.createElement('div', { className: "w-full h-2 rounded bg-gray-150 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8306}}
                  , React.createElement('div', { className: "h-full bg-teal-500" , style: { width: "40%" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8307}})
                )
                , React.createElement('div', { className: "flex justify-between items-center mt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8309}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8310}}, "Direct Website Forms"  )
                  , React.createElement('strong', { className: "text-[#071E34]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8311}}, "35%")
                )
                , React.createElement('div', { className: "w-full h-2 rounded bg-gray-150 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8313}}
                  , React.createElement('div', { className: "h-full bg-teal-500" , style: { width: "35%" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8314}})
                )
              )
            )
          )
        )

        /* Tab: Settings */
        , activeTab === "settings-general" && (
          React.createElement('div', { className: "flex flex-col gap-6 animate-in fade-in duration-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8323}}
            , React.createElement('h2', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8324}}, "General System Settings"  )
            , React.createElement(GlassCard, { className: "p-6 bg-white border border-gray-200 text-xs flex flex-col gap-4 max-w-xl"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8325}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8326}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8327}}, "Company Registered Name"  )
                , React.createElement('input', { 
                  type: "text", 
                  defaultValue: "CRM Enterprise Solutions Ltd"   ,
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8328}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8334}}
                , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8335}}, "Admin Contact Email"  )
                , React.createElement('input', { 
                  type: "text", 
                  defaultValue: "support@crm.com",
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8336}}
                )
              )
              , React.createElement('div', { className: "flex gap-2.5 items-center mt-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8342}}
                , React.createElement('input', { type: "checkbox", defaultChecked: true, id: "gst-switch", className: "rounded border-gray-300 text-[#0E9F8A] focus:ring-teal-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8343}} )
                , React.createElement('label', { htmlFor: "gst-switch", className: "font-semibold text-[#071E34]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8344}}, "Enable automatic invoice taxes calculations (18% GST)"      )
              )
              , React.createElement(Button, { variant: "primary", className: "w-fit mt-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8346}}, "Save Configurations" )

              , React.createElement('div', { className: "border-t border-gray-200 pt-4 mt-2 flex flex-col gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8348}}
                , React.createElement('span', { className: "text-[10px] font-bold text-red-500 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8349}}, "Danger Zone" )
                , React.createElement('p', { className: "text-gray-500 text-[11px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8350}}, "Wipe all old demo records from MongoDB to start with a completely empty database."             )
                , React.createElement(Button, { 
                  type: "button", 
                  onClick: handleClearAllDemoData, 
                  variant: "outline", 
                  className: "w-fit border-red-200 text-red-600 hover:bg-red-50 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8351}}

                  , React.createElement(Trash2, { size: 14, className: "mr-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8357}} ), " Clear All Records From MongoDB"
                )
              )
            )
          )
        )
          )
        )
      )

      /* ==========================================
          CRUD MODALS FOR DYNAMIC INPUTS
          ========================================== */

      /* 0. Modal: Create / Edit Our Project */
      , showOurProjectModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8373}}
          , React.createElement(GlassCard, { className: "w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8374}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8375}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8376}}
                , editingOurProject ? "Edit Our Project Profile" : "Create Our Project Profile"
              )
              , React.createElement('button', { 
                onClick: () => {
                  setShowOurProjectModal(false);
                  setEditingOurProject(null);
                  setOurProjectForm({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
                }, 
                className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8379}}
, "×"

              )
            )

            , React.createElement('form', { onSubmit: handleCreateOurProject, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8391}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8392}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8393}}, "Project Name *"  )
                , React.createElement('input', {
                  type: "text",
                  required: true,
                  placeholder: "e.g. Enterprise Cloud ERP, Mobile CRM Portal"      ,
                  value: ourProjectForm.name,
                  onChange: e => setOurProjectForm(prev => ({ ...prev, name: e.target.value })),
                  className: "px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8394}}
                )
              )

              , React.createElement('div', { className: "grid grid-cols-3 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8404}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8405}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8406}}, "Client / Industry"  )
                  , React.createElement('input', {
                    type: "text",
                    placeholder: "e.g. Internal / Logistics"   ,
                    value: ourProjectForm.clientName,
                    onChange: e => setOurProjectForm(prev => ({ ...prev, clientName: e.target.value })),
                    className: "px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8407}}
                  )
                )

                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8416}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8417}}, "Contract / Valuation ($)"   )
                  , React.createElement('input', {
                    type: "number",
                    placeholder: "50000",
                    value: ourProjectForm.budget,
                    onChange: e => setOurProjectForm(prev => ({ ...prev, budget: Number(e.target.value) })),
                    className: "px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8418}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8426}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8427}}, "Live URL / Website"   )
                  , React.createElement('input', {
                    type: "text",
                    placeholder: "https://example.com",
                    value: ourProjectForm.liveUrl,
                    onChange: e => setOurProjectForm(prev => ({ ...prev, liveUrl: e.target.value })),
                    className: "px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8428}}
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8438}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8439}}, "Project Summary & Details"   )
                , React.createElement('textarea', {
                  rows: 3,
                  placeholder: "Outline key project features, stack, and business value..."       ,
                  value: ourProjectForm.description,
                  onChange: e => setOurProjectForm(prev => ({ ...prev, description: e.target.value })),
                  className: "px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-xs focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8440}}
                )
              )

              , React.createElement('div', { className: "flex justify-end gap-2 mt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8449}}
                , React.createElement(Button, { 
                  type: "button", 
                  onClick: () => {
                    setShowOurProjectModal(false);
                    setEditingOurProject(null);
                    setOurProjectForm({ name: "", category: "Web Application", clientName: "Internal / Showcase", budget: 0, liveUrl: "", description: "" });
                  }, 
                  variant: "secondary", 
                  size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8450}}
, "Cancel"

                )
                , React.createElement(Button, { type: "submit", variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8462}}
                  , editingOurProject ? "Update Our Project" : "Save Our Project"
                )
              )
            )
          )
        )
      )

      /* Modal: Our Project Quotation View */
      , activeOurProjectQuotation && (() => {
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
          React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8487}}
            , React.createElement(GlassCard, { className: "w-full max-w-3xl max-h-[90vh] bg-white border border-gray-200 shadow-2xl flex flex-col p-6 overflow-y-auto animate-in fade-in zoom-in duration-200 gap-5"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8488}}

              /* HEADER */
              , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3 shrink-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8491}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8492}}
                  , React.createElement('span', { className: "text-[9px] font-mono text-[#0E9F8A] font-bold uppercase tracking-wider"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8493}}, "PROJECT PROPOSALS & SEPARATE QUOTATIONS HUB"     )
                  , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-lg mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8494}}, projName)
                  , React.createElement('span', { className: "text-xs text-gray-400 block mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8495}}, "Client / Sponsor: "   , proj.clientName || "Enterprise Client")
                )
                , React.createElement('button', { onClick: () => setActiveOurProjectQuotation(null), className: "text-gray-400 hover:text-[#071E34] text-lg font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8497}}, "×")
              )

              /* QUICK GENERATE SEPARATE QUOTATIONS BAR */
              , React.createElement('div', { className: "p-4 bg-teal-50/50 rounded-2xl border border-teal-100 flex flex-col gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8501}}
                , React.createElement('div', { className: "flex justify-between items-center flex-wrap gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8502}}
                  , React.createElement('span', { className: "text-xs font-bold text-[#071E34] flex items-center gap-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8503}}
                    , React.createElement(Sparkles, { size: 14, className: "text-[#0E9F8A]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8504}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8505}}, "Create / Generate Separate Scope Quotation"     )
                  )
                  , React.createElement(Button, { 
                    onClick: () => handleCreateScopeQuotation(proj, "all"), 
                    variant: "primary", 
                    size: "sm",
                    className: "text-[10px] py-1 px-3 premium-button font-extrabold shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8507}}
, "⚡ Generate Separate Quotations for All Scopes"

                  )
                )

                , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8517}}
                  , React.createElement('button', {
                    onClick: () => handleCreateScopeQuotation(proj, "website"),
                    className: "p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8518}}

                    , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-bold text-[#071E34]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8522}}
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8523}}, "🌐"), " " , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8523}}, "Website App" )
                    )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8525}}, "Web Portal, Auth, Admin & SEO"     )
                    , React.createElement('span', { className: "text-[10px] font-mono font-bold text-[#0E9F8A] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8526}}, "₹50,000 / $50k"  )
                  )

                  , React.createElement('button', {
                    onClick: () => handleCreateScopeQuotation(proj, "mobile"),
                    className: "p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8529}}

                    , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-bold text-[#071E34]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8533}}
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8534}}, "📱"), " " , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8534}}, "Mobile App" )
                    )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8536}}, "iOS & Android Apps, QR & Push"      )
                    , React.createElement('span', { className: "text-[10px] font-mono font-bold text-[#0E9F8A] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8537}}, "₹90,000 / $90k"  )
                  )

                  , React.createElement('button', {
                    onClick: () => handleCreateScopeQuotation(proj, "both"),
                    className: "p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8540}}

                    , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-bold text-[#071E34]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8544}}
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8545}}, "⚡"), " " , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8545}}, "Both (Web+App)" )
                    )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8547}}, "Full Web + Mobile Ecosystem"    )
                    , React.createElement('span', { className: "text-[10px] font-mono font-bold text-[#0E9F8A] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8548}}, "₹130,000 / $130k"  )
                  )

                  , React.createElement('button', {
                    onClick: () => handleCreateScopeQuotation(proj, "others"),
                    className: "p-2.5 rounded-xl border border-teal-100 bg-white hover:bg-teal-50 text-left transition-all duration-200 ease-out group flex flex-col gap-1 shadow-sm"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8551}}

                    , React.createElement('div', { className: "flex items-center gap-1 text-[11px] font-bold text-[#071E34]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8555}}
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8556}}, "🛠️"), " " , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8556}}, "Others / Custom"  )
                    )
                    , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8558}}, "ERP, CRM, AI & Custom SLA"     )
                    , React.createElement('span', { className: "text-[10px] font-mono font-bold text-[#0E9F8A] mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8559}}, "₹100,000 / $100k"  )
                  )
                )
              )

              /* SEPARATE QUOTATIONS TABS BAR */
              , projectQuotes.length > 0 && (
                React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8566}}
                  , React.createElement('div', { className: "flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8567}}
                    , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase shrink-0 mr-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8568}}, "Quotations (" , projectQuotes.length, "):")
                    , projectQuotes.map((q) => {
                      const isSelected = selectedQuote && selectedQuote.id === q.id;
                      return (
                        React.createElement('button', {
                          key: q.id,
                          onClick: () => setActiveSelectedQuoteId(_nullishCoalesce(q.id, () => ( null))),
                          className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ease-out shrink-0 flex items-center gap-1.5 border ${
                            isSelected
                              ? "bg-[#0E9F8A] text-white border-[#0E9F8A] shadow-md shadow-teal-700/20"
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8572}}

                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8581}}, _optionalChain([q, 'access', _303 => _303.projectType, 'optionalAccess', _304 => _304.includes, 'call', _305 => _305("Mobile")]) ? "📱" : _optionalChain([q, 'access', _306 => _306.projectType, 'optionalAccess', _307 => _307.includes, 'call', _308 => _308("Web & Mobile")]) ? "⚡" : _optionalChain([q, 'access', _309 => _309.projectType, 'optionalAccess', _310 => _310.includes, 'call', _311 => _311("Website")]) ? "🌐" : "🛠️")
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8582}}, _optionalChain([q, 'access', _312 => _312.title, 'optionalAccess', _313 => _313.split, 'call', _314 => _314("-"), 'access', _315 => _315[1], 'optionalAccess', _316 => _316.trim, 'call', _317 => _317()]) || q.projectType || q.id)
                        )
                      );
                    })
                  )

                  /* ACTIVE QUOTATION DETAILS CARD */
                  , selectedQuote && (() => {
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
                      React.createElement('div', { className: "flex flex-col gap-4 bg-white rounded-xl border border-gray-200 p-4 shadow-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8602}}
                        , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-150 text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8603}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8604}}
                            , React.createElement('span', { className: "text-[9px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8605}}, "Quote ID" )
                            , React.createElement('span', { className: "font-mono font-bold text-[#0E9F8A]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8606}}, selectedQuote.number || selectedQuote.id)
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8608}}
                            , React.createElement('span', { className: "text-[9px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8609}}, "Scope Type" )
                            , React.createElement('span', { className: "font-bold text-gray-800" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8610}}, selectedQuote.projectType || "Web Application")
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8612}}
                            , React.createElement('span', { className: "text-[9px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8613}}, "Ref Code" )
                            , React.createElement('span', { className: "font-mono text-[10px] text-gray-600 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8614}}, selectedQuote.documentRef || `SPW/EST/${projName.toUpperCase().slice(0, 6)}/2026`)
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8616}}
                            , React.createElement('span', { className: "text-[9px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8617}}, "Status")
                            , React.createElement('span', { className: "font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8618}}, "Approved")
                          )
                        )

                        /* VIEW MODE TOGGLE BAR */
                        , React.createElement('div', { className: "flex justify-between items-center bg-gray-100 p-1 rounded-xl border border-gray-200 flex-wrap gap-2"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8623}}
                          , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8624}}
                            , React.createElement('button', {
                              onClick: () => setModalViewTab("full-pdf"),
                              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ease-out ${
                                modalViewTab === "full-pdf" ? "bg-[#0E9F8A] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8625}}
, "📄 Full Page Proposal PDF"

                            )
                            , React.createElement('button', {
                              onClick: () => setModalViewTab("summary"),
                              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ease-out ${
                                modalViewTab === "summary" ? "bg-[#0E9F8A] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8633}}
, "📊 Deliverables & Valuation Summary"

                            )
                          )

                          , modalViewTab === "full-pdf" && (
                            React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8644}}
                              , React.createElement('div', { className: "flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8645}}
                                , React.createElement('button', {
                                  type: "button",
                                  onClick: () => setPreviewZoom(prev => Math.max(0.4, Number((prev - 0.1).toFixed(2)))),
                                  className: "p-1 text-gray-600 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"       ,
                                  title: "Zoom Out (-10%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8646}}

                                  , React.createElement(ZoomOut, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8652}} )
                                )
                                , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-gray-800 px-1 min-w-[36px] text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8654}}
                                  , Math.round(previewZoom * 100), "%"
                                )
                                , React.createElement('button', {
                                  type: "button",
                                  onClick: () => setPreviewZoom(prev => Math.min(1.5, Number((prev + 0.1).toFixed(2)))),
                                  className: "p-1 text-gray-600 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"       ,
                                  title: "Zoom In (+10%)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8657}}

                                  , React.createElement(ZoomIn, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8663}} )
                                )
                                , React.createElement('button', {
                                  type: "button",
                                  onClick: () => setPreviewZoom(0.6),
                                  className: "p-1 text-gray-400 hover:text-[#0E9F8A] hover:bg-gray-100 rounded-lg transition-all duration-200 ease-out"       ,
                                  title: "Reset Zoom to 60%"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8665}}

                                  , React.createElement(RotateCcw, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8671}} )
                                )
                              )

                              , React.createElement('button', {
                                onClick: () => setIsFullScreenPdf(true),
                                className: "px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1 shadow-2xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8675}}

                                , React.createElement(Maximize2, { size: 13, className: "text-[#0E9F8A]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8679}} ), " Full Screen View"
                              )
                            )
                          )
                        )

                        /* FULL PAGE PROPOSAL PREVIEW TAB */
                        , modalViewTab === "full-pdf" ? (
                          React.createElement('div', { className: "w-full h-[650px] bg-slate-100 rounded-xl border border-gray-200 overflow-hidden relative shadow-inner"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8687}}
                            , React.createElement('iframe', {
                              srcDoc: pdfHtml,
                              className: "w-full h-full border-0 bg-white"   ,
                              title: "Full Page Proposal Document Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8688}}
                            )
                          )
                        ) : (
                          React.createElement(React.Fragment, null
                            /* DELIVERABLES TABLE */
                            , React.createElement('div', { className: "border border-gray-200 rounded-xl overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8697}}
                              , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8698}}
                                , React.createElement('thead', { className: "bg-gray-100 text-gray-500 text-[10px] font-bold uppercase border-b border-gray-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8699}}
                                  , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 8700}}
                                    , React.createElement('th', { className: "p-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8701}}, "Service Deliverable / Technical Scope"    )
                                    , React.createElement('th', { className: "p-3 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8702}}, "Qty")
                                    , React.createElement('th', { className: "p-3 text-right" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8703}}, "Estimated Price" )
                                  )
                                )
                                , React.createElement('tbody', { className: "divide-y divide-gray-150" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8706}}
                                  , items.map((it, idx) => (
                                    React.createElement('tr', { key: idx, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8708}}
                                      , React.createElement('td', { className: "p-3 font-semibold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8709}}, it.description || it.title || it.service)
                                      , React.createElement('td', { className: "p-3 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8710}}, it.qty || 1)
                                      , React.createElement('td', { className: "p-3 text-right font-mono font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8711}}, "₹", (it.rate || 15000).toLocaleString())
                                    )
                                  ))
                                )
                              )
                            )

                            /* PRICE VALUATION SUMMARY */
                            , React.createElement('div', { className: "flex justify-between items-center p-4 bg-teal-50/70 rounded-xl border border-teal-100"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8719}}
                              , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8720}}
                                , React.createElement('span', { className: "text-xs font-extrabold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8721}}, selectedQuote.title)
                                , React.createElement('span', { className: "text-[10px] text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8722}}, "Plan A: ₹"  , (selectedQuote.planAPrice || 50000).toLocaleString(), " | Plan B: ₹"    , (selectedQuote.planBPrice || 90000).toLocaleString(), " | Taxes: "   , selectedQuote.tax || 18, "%")
                              )
                              , React.createElement('div', { className: "text-right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8724}}
                                , React.createElement('span', { className: "text-[10px] font-bold text-gray-400 uppercase block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8725}}, "Total Net Valuation"  )
                                , React.createElement('span', { className: "font-mono text-xl font-extrabold text-[#0E9F8A]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8726}}, "₹", finalVal.toLocaleString())
                              )
                            )
                          )
                        )

                        /* ACTIONS BAR */
                        , React.createElement('div', { className: "flex justify-between items-center pt-2 border-t border-gray-100 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8733}}
                          , React.createElement(Button, {
                            onClick: async () => {
                              if (!confirm(`Delete quotation '${selectedQuote.id}'?`)) return;
                              try {
                                await fetch(`${API_URL}/crm/quotation/${selectedQuote.id}`, { method: "DELETE" });
                              } catch (e) {}
                              setQuotations(prev => prev.filter(q => q.id !== selectedQuote.id));
                            },
                            variant: "secondary",
                            size: "sm",
                            className: "text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8734}}

                            , React.createElement(Trash2, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8746}} ), " Delete Quotation"
                          )

                          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8749}}
                            , React.createElement(Button, {
                              onClick: () => {
                                const projectFeatures = features.filter(f => f.projectId === proj.id || f.projectName === proj.name);
                                const compName = selectedQuote.companyName || "Speshway_Solutions";
                                triggerDirectPdfDownload(pdfHtml, `${compName}_${projName}_${selectedQuote.projectType || "Quotation"}.pdf`, compName);
                              },
                              variant: "secondary",
                              size: "sm",
                              className: "text-xs font-bold border border-gray-200 gap-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8750}}

                              , React.createElement(Download, { size: 14, className: "text-[#0E9F8A]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8760}} ), " Download PDF"
                            )

                            , React.createElement(Button, {
                              onClick: () => {
                                setActiveProjectDetail(proj);
                                setActiveProjectTab("overview");
                                setActiveOurProjectQuotation(null);
                              },
                              variant: "primary",
                              size: "sm",
                              className: "text-xs font-bold gap-1.5 bg-[#0E9F8A] hover:bg-teal-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8763}}

                              , React.createElement(Eye, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8773}} ), " Open Proposal Studio"
                            )
                          )
                        )

                        /* FULL SCREEN PROPOSAL OVERLAY */
                        , isFullScreenPdf && (
                          React.createElement('div', { className: "fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md p-4 flex flex-col gap-3 animate-in fade-in duration-150"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8780}}
                            , React.createElement('div', { className: "flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-xl text-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8781}}
                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8782}}
                                , React.createElement('span', { className: "text-xs font-bold text-[#5ECBC0] font-mono"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8783}}, "100% FULL SCREEN PROPOSAL VIEW"    )
                                , React.createElement('span', { className: "text-xs font-bold border-l border-slate-700 pl-2 text-gray-300"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8784}}, selectedQuote.title)
                              )
                              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8786}}
                                , React.createElement(Button, {
                                  onClick: () => {
                                    const projectFeatures = features.filter(f => f.projectId === proj.id || f.projectName === proj.name);
                                    const compName = selectedQuote.companyName || "Speshway_Solutions";
                                    triggerDirectPdfDownload(pdfHtml, `${compName}_${projName}_${selectedQuote.projectType || "Quotation"}.pdf`, compName);
                                  },
                                  variant: "secondary",
                                  size: "sm",
                                  className: "text-xs font-bold bg-[#0E9F8A] text-white hover:bg-teal-600 border-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8787}}

                                  , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8797}} ), " Download PDF"
                                )
                                , React.createElement('button', {
                                  onClick: () => setIsFullScreenPdf(false),
                                  className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8799}}

                                  , React.createElement(Minimize2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8803}} ), " Close Full Screen"
                                )
                              )
                            )
                            , React.createElement('div', { className: "flex-1 bg-white rounded-xl border border-slate-800 overflow-hidden"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8807}}
                              , React.createElement('iframe', {
                                srcDoc: pdfHtml,
                                className: "w-full h-full border-0"  ,
                                title: "Full Screen Proposal Document Viewer"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8808}}
                              )
                            )
                          )
                        )
                      )
                    );
                  })()
                )
              )
            )
          )
        )
      })

      /* 1. Modal: Create Client Profile */
      , showClientModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8828}}
          , React.createElement(GlassCard, { className: "w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8829}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8830}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8831}}, "Create Client Profile"  )
              , React.createElement('button', { onClick: () => setShowClientModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8832}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateClient, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8835}}
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8836}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8837}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8838}}, "Client / Contact Name *"    )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. Ramesh Kumar"  ,
                    value: clientForm.name,
                    onChange: (e) => setClientForm({ ...clientForm, name: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8839}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8847}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8848}}, "Company / Organization *"   )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. TechCorp Solutions"  ,
                    value: clientForm.company,
                    onChange: (e) => setClientForm({ ...clientForm, company: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8849}}
                  )
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8859}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8860}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8861}}, "Email Address *"  )
                  , React.createElement('input', { 
                    type: "email", required: true,
                    placeholder: "ramesh@techcorp.com",
                    value: clientForm.email,
                    onChange: (e) => setClientForm({ ...clientForm, email: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8862}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8870}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8871}}, "Phone / WhatsApp Number *"    )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "+91 98765 43210"  ,
                    value: clientForm.phone,
                    onChange: (e) => setClientForm({ ...clientForm, phone: e.target.value, whatsapp: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8872}}
                  )
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8882}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8883}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8884}}, "Industry Sector" )
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "e.g. Technology, Retail, Healthcare"   ,
                    value: clientForm.industry,
                    onChange: (e) => setClientForm({ ...clientForm, industry: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8885}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8893}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider font-extrabold text-emerald-800"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8894}}, "Client Type *"  )
                  , React.createElement('select', { 
                    value: clientForm.type,
                    onChange: (e) => setClientForm({ ...clientForm, type: e.target.value }),
                    className: "w-full px-3 py-2 border border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-emerald-50/50 font-bold text-emerald-900"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8895}}

                    , React.createElement('option', { value: "Permanent", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8900}}, "Permanent Client (Active Database)"   )
                    , React.createElement('option', { value: "Potential", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8901}}, "Potential Prospect" )
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8906}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8907}}, "Address / Location"  )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "e.g. Bangalore, Karnataka"  ,
                  value: clientForm.address,
                  onChange: (e) => setClientForm({ ...clientForm, address: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8908}}
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8917}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8918}}, "Client Notes & Requirements"   )
                , React.createElement('textarea', { 
                  rows: 2,
                  placeholder: "Key account notes or project objectives..."     ,
                  value: clientForm.notes,
                  onChange: (e) => setClientForm({ ...clientForm, notes: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8919}}
                )
              )

              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2 bg-[#0E9F8A] hover:bg-teal-600 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8928}}, "Save & Create Client Profile"

              )
            )
          )
        )
      )

      /* 2. Modal: Log Call */
      , showCallModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8938}}
          , React.createElement(GlassCard, { className: "w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8939}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8940}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8941}}, "Log Client Call"  )
              , React.createElement('button', { onClick: () => setShowCallModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8942}}, "×")
            )

            , React.createElement('form', { onSubmit: handleLogCall, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8945}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8946}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8947}}, "Select Client *"  )
                , React.createElement('select', { 
                  required: true,
                  value: callForm.clientId,
                  onChange: (e) => setCallForm({ ...callForm, clientId: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8948}}

                  , React.createElement('option', { value: "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8954}}, "-- Choose Client Profile --"    )
                  , clients.map(c => (
                    React.createElement('option', { key: c.id, value: c.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8956}}, c.company, " (" , c.name, ")")
                  ))
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8961}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8962}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8963}}, "Call Type *"  )
                  , React.createElement('select', { 
                    value: callForm.type,
                    onChange: (e) => setCallForm({ ...callForm, type: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8964}}

                    , React.createElement('option', { value: "Incoming", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8969}}, "Incoming")
                    , React.createElement('option', { value: "Outgoing", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8970}}, "Outgoing")
                    , React.createElement('option', { value: "Follow-up", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8971}}, "Follow-up")
                    , React.createElement('option', { value: "Sales call" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8972}}, "Sales call" )
                    , React.createElement('option', { value: "Support call" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8973}}, "Support call" )
                    , React.createElement('option', { value: "Project discussion" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8974}}, "Project discussion" )
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8977}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8978}}, "Call Status *"  )
                  , React.createElement('select', { 
                    value: callForm.status,
                    onChange: (e) => setCallForm({ ...callForm, status: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8979}}

                    , React.createElement('option', { value: "Connected", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8984}}, "Connected")
                    , React.createElement('option', { value: "Not answered" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8985}}, "Not answered" )
                    , React.createElement('option', { value: "Busy", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8986}}, "Busy")
                    , React.createElement('option', { value: "Switched off" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8987}}, "Switched off" )
                    , React.createElement('option', { value: "Call back later"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8988}}, "Call back later"  )
                    , React.createElement('option', { value: "Completed", __self: this, __source: {fileName: _jsxFileName, lineNumber: 8989}}, "Completed")
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8994}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8995}}, "Call Purpose *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. negotiation review, pricing audit"    ,
                  value: callForm.purpose,
                  onChange: (e) => setCallForm({ ...callForm, purpose: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8996}}
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9005}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9006}}, "Discussion Notes" )
                , React.createElement('textarea', { 
                  rows: 2,
                  placeholder: "Summary of notes discussed..."   ,
                  value: callForm.notes,
                  onChange: (e) => setCallForm({ ...callForm, notes: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9007}}
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9016}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9017}}, "Next Action Required"  )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "e.g. send proposal details"   ,
                  value: callForm.nextAction,
                  onChange: (e) => setCallForm({ ...callForm, nextAction: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9018}}
                )
              )

              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9027}}, "Log Call Outcomes"

              )
            )
          )
        )
      )

      /* 3. Modal: Create Lead */
      , showLeadModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2px] p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9037}}
          , React.createElement('div', { className: "w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9038}}
            , React.createElement('div', { className: "flex justify-between items-start border-b border-gray-100 pb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9039}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9040}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-lg tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9041}}, "New Lead" )
                , React.createElement('p', { className: "text-xs text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9042}}, "Add a prospect to your pipeline"     )
              )
              , React.createElement('button', { 
                onClick: () => setShowLeadModal(false), 
                className: "text-gray-400 hover:text-gray-700 text-xl font-semibold transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9044}}
, "×"

              )
            )

            , React.createElement('form', { onSubmit: handleCreateLead, className: "flex flex-col gap-3.5 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9052}}
              /* Contact Name */
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9054}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9055}}, "Contact Name *"  )
                , React.createElement('input', { 
                  type: "text", 
                  required: true,
                  placeholder: "e.g., Jane Doe"  ,
                  value: leadForm.name,
                  onChange: (e) => setLeadForm({ ...leadForm, name: e.target.value }),
                  className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9056}}
                )
              )

              /* Company & Phone */
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9067}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9068}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9069}}, "Company")
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "Company name" ,
                    value: leadForm.companyName,
                    onChange: (e) => setLeadForm({ ...leadForm, companyName: e.target.value }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9070}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9078}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9079}}, "Phone")
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "Phone",
                    value: leadForm.phone,
                    onChange: (e) => setLeadForm({ ...leadForm, phone: e.target.value }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9080}}
                  )
                )
              )

              /* Email */
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9091}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9092}}, "Email")
                , React.createElement('input', { 
                  type: "email",
                  placeholder: "email@example.com",
                  value: leadForm.email,
                  onChange: (e) => setLeadForm({ ...leadForm, email: e.target.value }),
                  className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-medium text-gray-800 bg-gray-50/30 focus:bg-white"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9093}}
                )
              )

              /* Source & Estimated Value */
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9103}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9104}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9105}}, "Source")
                  , React.createElement('select', { 
                    value: leadForm.source,
                    onChange: (e) => setLeadForm({ ...leadForm, source: e.target.value  }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9106}}

                    , React.createElement('option', { value: "Other", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9111}}, "Other")
                    , React.createElement('option', { value: "Website", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9112}}, "Website")
                    , React.createElement('option', { value: "Facebook", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9113}}, "Facebook")
                    , React.createElement('option', { value: "Instagram", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9114}}, "Instagram")
                    , React.createElement('option', { value: "Google Ads" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9115}}, "Google Ads" )
                    , React.createElement('option', { value: "WhatsApp", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9116}}, "WhatsApp")
                    , React.createElement('option', { value: "Phone call" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9117}}, "Phone call" )
                    , React.createElement('option', { value: "Referral", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9118}}, "Referral")
                    , React.createElement('option', { value: "Direct enquiry" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9119}}, "Direct enquiry" )
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9122}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9123}}, "Estimated Value" )
                  , React.createElement('input', { 
                    type: "number",
                    placeholder: "0.00",
                    value: leadForm.expectedBudget || "",
                    onChange: (e) => setLeadForm({ ...leadForm, expectedBudget: Number(e.target.value) }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out font-mono font-medium text-gray-800 bg-gray-50/30 focus:bg-white"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9124}}
                  )
                )
              )

              /* Stage & Assign To */
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9135}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9136}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9137}}, "Stage")
                  , React.createElement('select', { 
                    value: leadForm.status,
                    onChange: (e) => setLeadForm({ ...leadForm, status: e.target.value }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9138}}

                    , React.createElement('option', { value: "New", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9143}}, "New")
                    , React.createElement('option', { value: "Contacted", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9144}}, "Contacted")
                    , React.createElement('option', { value: "Qualified", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9145}}, "Qualified")
                    , React.createElement('option', { value: "Proposal sent" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9146}}, "Proposal Sent" )
                    , React.createElement('option', { value: "Won", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9147}}, "Won")
                    , React.createElement('option', { value: "Lost", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9148}}, "Lost")
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9151}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9152}}, "Assign To" )
                  , React.createElement('select', { 
                    value: leadForm.assignedEmployee,
                    onChange: (e) => setLeadForm({ ...leadForm, assignedEmployee: e.target.value }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:bg-white focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9153}}

                    , React.createElement('option', { value: "Unassigned", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9158}}, "Unassigned")
                    , employees.map(emp => (
                      React.createElement('option', { key: emp.id, value: emp.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 9160}}, emp.name)
                    ))
                  )
                )
              )

              /* Follow-up Date */
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9167}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9168}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9169}}, "Follow-up Date" )
                  , React.createElement('input', { 
                    type: "date",
                    value: leadForm.nextFollowUpDate,
                    onChange: (e) => setLeadForm({ ...leadForm, nextFollowUpDate: e.target.value }),
                    className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-medium text-gray-800 bg-gray-50/30 focus:bg-white"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9170}}
                  )
                )
              )

              /* Footer Buttons */
              , React.createElement('div', { className: "flex justify-end gap-3 border-t border-gray-100 pt-4 mt-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9180}}
                , React.createElement('button', { 
                  type: "button",
                  onClick: () => setShowLeadModal(false),
                  className: "px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all duration-200 ease-out"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9181}}
, "Cancel"

                )
                , React.createElement('button', { 
                  type: "submit",
                  className: "px-6 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl font-bold shadow-xs hover:shadow-md transition-all duration-200 ease-out"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9188}}
, "Add Lead"

                )
              )
            )
          )
        )
      )

      /* 4. Modal: Create / Edit Project */
      , showProjectModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9202}}
          , React.createElement(GlassCard, { className: "w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9203}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9204}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9205}}
                , editingProject ? "Edit Client Project Profile" : "Setup Client Project"
              )
              , React.createElement('button', { 
                onClick: () => {
                  setShowProjectModal(false);
                  setEditingProject(null);
                  setProjectForm({ name: "", clientName: "", category: "Custom Development", manager: "Nisha Rao", budget: 0, priority: "Medium", description: "" });
                }, 
                className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9208}}
, "×"

              )
            )

            , React.createElement('form', { onSubmit: handleCreateProject, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9220}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9221}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9222}}, "Project Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "Enter project workflow name"   ,
                  value: projectForm.name,
                  onChange: (e) => setProjectForm({ ...projectForm, name: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9223}}
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9232}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9233}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9234}}, "Select Client *"  )
                  , React.createElement('select', { 
                    required: true,
                    value: projectForm.clientName,
                    onChange: (e) => setProjectForm({ ...projectForm, clientName: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9235}}

                    , React.createElement('option', { value: "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9241}}, "-- Choose Client Profile --"    )
                    , clients.map(c => (
                      React.createElement('option', { key: c.id, value: c.company, __self: this, __source: {fileName: _jsxFileName, lineNumber: 9243}}, c.company)
                    ))
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9247}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9248}}, "Category / Industry"  )
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "Custom Development" ,
                    value: projectForm.category,
                    onChange: (e) => setProjectForm({ ...projectForm, category: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9249}}
                  )
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9259}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9260}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9261}}, "Assigned Budget (INR ₹) *"    )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    value: projectForm.budget,
                    onChange: (e) => setProjectForm({ ...projectForm, budget: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9262}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9269}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9270}}, "Priority Level *"  )
                  , React.createElement('select', { 
                    value: projectForm.priority,
                    onChange: (e) => setProjectForm({ ...projectForm, priority: e.target.value  }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9271}}

                    , React.createElement('option', { value: "Low", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9276}}, "Low")
                    , React.createElement('option', { value: "Medium", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9277}}, "Medium")
                    , React.createElement('option', { value: "High", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9278}}, "High")
                    , React.createElement('option', { value: "Critical", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9279}}, "Critical")
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9284}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9285}}, "Project Scope Description"  )
                , React.createElement('textarea', { 
                  rows: 3,
                  required: true,
                  placeholder: "Outline feature specifications and timeline conditions..."     ,
                  value: projectForm.description,
                  onChange: (e) => setProjectForm({ ...projectForm, description: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9286}}
                )
              )

              , React.createElement('div', { className: "flex justify-end gap-2 mt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9296}}
                , React.createElement(Button, { 
                  type: "button", 
                  onClick: () => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    setProjectForm({ name: "", clientName: "", category: "Custom Development", manager: "Nisha Rao", budget: 0, priority: "Medium", description: "" });
                  }, 
                  variant: "secondary", 
                  size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9297}}
, "Cancel"

                )
                , React.createElement(Button, { type: "submit", variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9309}}
                  , editingProject ? "Update Client Project" : "Initialize Client Project"
                )
              )
            )
          )
        )
      )

      /* 5. Modal: Create / Edit Quotation Proposal */
      , showQuoteModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9320}}
          , React.createElement(GlassCard, { className: "w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-4 animate-in fade-in zoom-in duration-200"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9321}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2.5 shrink-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9322}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9323}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9324}}
                  , editingQuote ? "Edit Proposal Document & Plan Comparison" : "Generate Quotation Proposal"
                )
                , React.createElement('span', { className: "text-[10px] text-purple-700 font-medium block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9327}}, "Configure document overview narrative, user roles, plan comparison matrix & terms."          )
              )
              , React.createElement('button', { onClick: () => { setShowQuoteModal(false); setEditingQuote(null); }, className: "text-gray-400 hover:text-[#071E34] text-lg font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9329}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateQuotation, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9332}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9333}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9334}}, "Quotation Title *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. JoyEvents Custom Quotation Proposal"    ,
                  value: quoteForm.title,
                  onChange: (e) => setQuoteForm({ ...quoteForm, title: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-semibold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9335}}
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9344}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9345}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9346}}, "Client Name / Sponsor *"    )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. JoyEvents / Speshway"   ,
                    value: quoteForm.clientName,
                    onChange: (e) => setQuoteForm({ ...quoteForm, clientName: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9347}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9355}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9356}}, "Project Name *"  )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. JoyEvents" ,
                    value: quoteForm.projectName,
                    onChange: (e) => setQuoteForm({ ...quoteForm, projectName: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9357}}
                  )
                )
              )

              /* 5. PLAN COMPARISON MATRIX DELIVERABLES */
              , React.createElement('div', { className: "flex flex-col gap-2.5 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9368}}
                , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9369}}
                  , React.createElement('span', { className: "text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9370}}
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9371}}, "5. Plan Comparison Matrix Deliverables *"     )
                  )
                  , React.createElement('span', { className: "text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9373}}, "PDF Page 3"  )
                )

                , React.createElement('div', { className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9376}}
                  , React.createElement('input', { 
                    type: "text", 
                    placeholder: "Add new deliverable item (e.g. Multi-Currency Support)..."      ,
                    value: newComparisonDeliverableText,
                    onChange: e => setNewComparisonDeliverableText(e.target.value),
                    onKeyDown: e => {
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
                    },
                    className: "flex-1 px-3 py-1.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-purple-500 text-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9377}}
                  )
                  , React.createElement(Button, { 
                    type: "button", 
                    onClick: () => {
                      if (newComparisonDeliverableText.trim()) {
                        setQuotePlanComparisonItems(prev => [
                          ...prev, 
                          { deliverable: newComparisonDeliverableText.trim(), planA: true, planB: true }
                        ]);
                        setNewComparisonDeliverableText("");
                      }
                    }, 
                    variant: "secondary", 
                    size: "sm", 
                    className: "text-[10px] py-1.5 px-3 flex items-center gap-1 border border-purple-200 text-purple-800 bg-purple-100 font-bold shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9396}}

                    , React.createElement(Plus, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 9411}} ), " Add Deliverable"
                  )
                )

                , React.createElement('div', { className: "flex flex-col gap-2 max-h-56 overflow-y-auto pr-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9415}}
                  , quotePlanComparisonItems.map((item, idx) => (
                    React.createElement('div', { key: idx, className: "flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-purple-150 text-xs shadow-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9417}}
                      , React.createElement('input', { 
                        type: "text", 
                        value: item.deliverable, 
                        onChange: e => {
                          const val = e.target.value;
                          setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, deliverable: val } : it));
                        },
                        className: "flex-1 font-semibold text-gray-800 border-b border-dashed border-gray-300 focus:outline-none focus:border-purple-600 px-1 py-0.5 text-xs bg-transparent"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9418}}
                      )
                      , React.createElement('div', { className: "flex items-center gap-4 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9427}}
                        , React.createElement('label', { className: "flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9428}}
                          , React.createElement('input', { 
                            type: "checkbox", 
                            checked: item.planA !== false, 
                            onChange: e => {
                              const checked = e.target.checked;
                              setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, planA: checked } : it));
                            },
                            className: "rounded border-gray-300 text-purple-600 focus:ring-purple-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9429}}
                          )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9438}}, "Plan A (Web)"  )
                        )
                        , React.createElement('label', { className: "flex items-center gap-1.5 text-[10px] font-bold text-purple-800 cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9440}}
                          , React.createElement('input', { 
                            type: "checkbox", 
                            checked: item.planB !== false, 
                            onChange: e => {
                              const checked = e.target.checked;
                              setQuotePlanComparisonItems(prev => prev.map((it, i) => i === idx ? { ...it, planB: checked } : it));
                            },
                            className: "rounded border-gray-300 text-purple-600 focus:ring-purple-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9441}}
                          )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9450}}, "Plan B (Web+App)"  )
                        )
                        , quotePlanComparisonItems.length > 1 && (
                          React.createElement('button', { 
                            type: "button", 
                            onClick: () => setQuotePlanComparisonItems(prev => prev.filter((_, i) => i !== idx)),
                            className: "text-gray-400 hover:text-red-600 p-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9453}}

                            , React.createElement(Trash2, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 9458}} )
                          )
                        )
                      )
                    )
                  ))
                )
              )

              , React.createElement('div', { className: "grid grid-cols-3 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9467}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9468}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9469}}, "Currency *" )
                  , React.createElement('select', { 
                    value: (quoteForm ).currency || "Indian Rupees (INR)",
                    onChange: (e) => setQuoteForm({ ...quoteForm, currency: e.target.value } ),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-semibold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9470}}

                    , React.createElement('option', { value: "Indian Rupees (INR ₹)"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9475}}, "Indian Rupees (INR ₹)"   )
                    , React.createElement('option', { value: "US Dollars (USD $)"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9476}}, "US Dollars (USD $)"   )
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9479}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9480}}, "Plan A Valuation (Without WebSockets) *"     )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    placeholder: "e.g. 50000" ,
                    value: (quoteForm ).planAPrice || 50000,
                    onChange: (e) => setQuoteForm({ ...quoteForm, planAPrice: Number(e.target.value) } ),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono font-semibold"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9481}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9489}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9490}}, "Plan B Valuation (With WebSockets) *"     )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    placeholder: "e.g. 65000" ,
                    value: (quoteForm ).planBPrice || 65000,
                    onChange: (e) => setQuoteForm({ ...quoteForm, planBPrice: Number(e.target.value) } ),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-mono font-semibold text-purple-700"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9491}}
                  )
                )
              )

              , React.createElement('div', { className: "grid grid-cols-3 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9501}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9502}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9503}}, "Discount (%)" )
                  , React.createElement('input', { 
                    type: "number",
                    value: quoteForm.discount,
                    onChange: (e) => setQuoteForm({ ...quoteForm, discount: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9504}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9511}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9512}}, "Tax GST (%)"  )
                  , React.createElement('input', { 
                    type: "number",
                    value: quoteForm.tax,
                    onChange: (e) => setQuoteForm({ ...quoteForm, tax: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9513}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9520}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9521}}, "Valid Until" )
                  , React.createElement('input', { 
                    type: "date",
                    value: quoteForm.validUntil,
                    onChange: (e) => setQuoteForm({ ...quoteForm, validUntil: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9522}}
                  )
                )
              )

              /* PDF REPORT SECTION 1: PROJECT OVERVIEW NARRATIVE */
              , React.createElement('div', { className: "flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9532}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9533}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9534}}, "1. Project Overview Narrative (PDF Page 1)"      )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9536}}
                  , React.createElement('textarea', {
                    rows: 3,
                    placeholder: "Outline comprehensive project overview narrative for PDF proposal..."       ,
                    value: (quoteForm ).overviewNarrative || "",
                    onChange: e => setQuoteForm({ ...quoteForm, overviewNarrative: e.target.value } ),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9537}}
                  )
                )
              )

              /* PDF REPORT SECTION 2: USER ROLES & ACCESS SCOPE */
              , React.createElement('div', { className: "flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9548}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9549}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9550}}, "2. User Roles & Access Scope (PDF Page 1)"        )
                )
                , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-3 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9552}}
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9553}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9554}}, "Customer / Buyer Role"   )
                    , React.createElement('textarea', {
                      rows: 2,
                      placeholder: "Customer role specifications..."  ,
                      value: (quoteForm ).customerDesc || "",
                      onChange: e => setQuoteForm({ ...quoteForm, customerDesc: e.target.value } ),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9555}}
                    )
                  )
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9563}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9564}}, "Merchant / Vendor Role"   )
                    , React.createElement('textarea', {
                      rows: 2,
                      placeholder: "Merchant role specifications..."  ,
                      value: (quoteForm ).merchantDesc || "",
                      onChange: e => setQuoteForm({ ...quoteForm, merchantDesc: e.target.value } ),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9565}}
                    )
                  )
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9573}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9574}}, "Admin Governance Role"  )
                    , React.createElement('textarea', {
                      rows: 2,
                      placeholder: "Admin governance specifications..."  ,
                      value: (quoteForm ).adminDesc || "",
                      onChange: e => setQuoteForm({ ...quoteForm, adminDesc: e.target.value } ),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9575}}
                    )
                  )
                )
              )

              /* PDF REPORT SECTION 6 & 7: PAYMENT TERMS & TERMS AND CONDITIONS */
              , React.createElement('div', { className: "flex flex-col gap-2 border-t border-purple-200 pt-3 bg-purple-50/40 p-3.5 rounded-2xl border"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9587}}
                , React.createElement('span', { className: "text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9588}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 9589}}, "6 & 7. Payment Terms & Terms & Conditions (PDF Page 4)"           )
                )
                , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9591}}
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9592}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9593}}, "6. Payment Terms"  )
                    , React.createElement('textarea', {
                      rows: 3,
                      placeholder: "e.g. 40% advance on project kick-off\n30% on completion of core module\n30% on final delivery"             ,
                      value: (quoteForm ).paymentTerms || "",
                      onChange: e => setQuoteForm({ ...quoteForm, paymentTerms: e.target.value } ),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9594}}
                    )
                  )
                  , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9602}}
                    , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9603}}, "7. Terms & Conditions"   )
                    , React.createElement('textarea', {
                      rows: 3,
                      placeholder: "e.g. Estimation is valid for 30 days.\nIncludes 30 days complimentary bug-fix support.\nSource code handed over upon full payment."                 ,
                      value: (quoteForm ).termsAndConditions || "",
                      onChange: e => setQuoteForm({ ...quoteForm, termsAndConditions: e.target.value } ),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-xl resize-none text-xs focus:outline-none focus:border-purple-500 font-sans"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9604}}
                    )
                  )
                )
              )

              , React.createElement('div', { className: "flex gap-2.5 mt-2 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9615}}
                , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full py-2.5 shadow-md bg-purple-900 text-white font-bold hover:bg-purple-950"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9616}}
                  , editingQuote ? "Save & Update Proposal Settings" : "Save & Add Proposal Settings"
                )
              )
            )
          )
        )
      )

      /* 6. Modal: Add / Edit Project Feature */
      , showFeatureModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9627}}
          , React.createElement(GlassCard, { className: "w-full max-w-md max-h-[90vh] overflow-y-auto p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9628}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9629}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9630}}
                , editingFeature ? "Edit Project Feature" : "Add Project Feature"
              )
              , React.createElement('button', { onClick: () => { setShowFeatureModal(false); setEditingFeature(null); }, className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9633}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateFeature, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9636}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9637}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9638}}, "Feature Title / Name *"    )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. AI Content Generation Engine"    ,
                  value: featureForm.title,
                  onChange: (e) => setFeatureForm({ ...featureForm, title: e.target.value }),
                  className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-semibold text-xs text-[#071E34]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9639}}
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9648}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9649}}, "Feature Description & Scope"   )
                , React.createElement('textarea', { 
                  rows: 3,
                  placeholder: "Outline feature specifications, description and scope details..."      ,
                  value: featureForm.description,
                  onChange: (e) => setFeatureForm({ ...featureForm, description: e.target.value }),
                  className: "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A] font-medium text-xs text-gray-700 resize-none"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9650}}
                )
              )

              , React.createElement('div', { className: "flex justify-end gap-2 mt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9659}}
                , React.createElement(Button, { type: "button", onClick: () => { setShowFeatureModal(false); setEditingFeature(null); }, variant: "secondary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9660}}, "Cancel")
                , React.createElement(Button, { type: "submit", variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9661}}
                  , editingFeature ? "Update Feature" : "Add Feature"
                )
              )
            )
          )
        )
      )

      /* 7. Modal: Propose Innovation */
      , showInnovationModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9672}}
          , React.createElement(GlassCard, { className: "w-full max-w-lg p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9673}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9674}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9675}}, "Propose Project Innovation"  )
              , React.createElement('button', { onClick: () => setShowInnovationModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9676}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateInnovation, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9679}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9680}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9681}}, "Innovation Title *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. AI-assisted shipping automation"   ,
                  value: innovationForm.title,
                  onChange: (e) => setInnovationForm({ ...innovationForm, title: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9682}}
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9691}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9692}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9693}}, "Business Benefit *"  )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. Cuts workflow lag by 40%"     ,
                    value: innovationForm.businessBenefit,
                    onChange: (e) => setInnovationForm({ ...innovationForm, businessBenefit: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9694}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9702}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9703}}, "Technical Benefit *"  )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. Redundant server cleanup"   ,
                    value: innovationForm.technicalBenefit,
                    onChange: (e) => setInnovationForm({ ...innovationForm, technicalBenefit: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9704}}
                  )
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9714}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9715}}, "Estimated Cost (INR ₹) *"    )
                , React.createElement('input', { 
                  type: "number", required: true,
                  value: innovationForm.estimatedCost,
                  onChange: (e) => setInnovationForm({ ...innovationForm, estimatedCost: Number(e.target.value) }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9716}}
                )
              )

              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9724}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9725}}, "Description of Idea"  )
                , React.createElement('textarea', { 
                  rows: 2,
                  required: true,
                  placeholder: "Outline solution benefits and technical scopes..."     ,
                  value: innovationForm.description,
                  onChange: (e) => setInnovationForm({ ...innovationForm, description: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9726}}
                )
              )

              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9736}}, "Log Proposal"

              )
            )
          )
        )
      )

      /* 8. Modal: Create Invoice */
      , showInvoiceModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9746}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9747}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9748}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9749}}, "Generate New Invoice"  )
              , React.createElement('button', { onClick: () => setShowInvoiceModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9750}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateInvoice, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9753}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9754}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9755}}, "Client Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Vanguard Retail Inc"   ,
                  value: invoiceForm.clientName,
                  onChange: (e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E9F8A]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9756}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9764}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9765}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9766}}, "Invoice Amount ($) *"   )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    value: invoiceForm.amount,
                    onChange: (e) => setInvoiceForm({ ...invoiceForm, amount: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9767}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9774}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9775}}, "Due Date" )
                  , React.createElement('input', { 
                    type: "date",
                    value: invoiceForm.dueDate,
                    onChange: (e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9776}}
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9784}}, "Generate Invoice & Save to DB"

              )
            )
          )
        )
      )

      /* 9. Modal: Log Payment */
      , showPaymentModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9794}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9795}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9796}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9797}}, "Log Payment Record"  )
              , React.createElement('button', { onClick: () => setShowPaymentModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9798}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreatePayment, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9801}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9802}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9803}}, "Client Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. AeroSpace Logistics"  ,
                  value: paymentForm.clientName,
                  onChange: (e) => setPaymentForm({ ...paymentForm, clientName: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9804}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9812}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9813}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9814}}, "Payment Amount ($) *"   )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    value: paymentForm.amount,
                    onChange: (e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9815}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9822}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9823}}, "Gateway / Method"  )
                  , React.createElement('select', { 
                    value: paymentForm.gateway,
                    onChange: (e) => setPaymentForm({ ...paymentForm, gateway: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9824}}

                    , React.createElement('option', { value: "Stripe", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9829}}, "Stripe")
                    , React.createElement('option', { value: "Wire Transfer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9830}}, "Wire Transfer" )
                    , React.createElement('option', { value: "PayPal", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9831}}, "PayPal")
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9835}}, "Log Payment & Save to DB"

              )
            )
          )
        )
      )

      /* 10. Modal: Add Expense */
      , showExpenseModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9845}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9846}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9847}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9848}}, "Add Expense Item"  )
              , React.createElement('button', { onClick: () => setShowExpenseModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9849}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateExpense, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9852}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9853}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9854}}, "Expense Title *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. AWS Cloud Server Hosting"    ,
                  value: expenseForm.title,
                  onChange: (e) => setExpenseForm({ ...expenseForm, title: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9855}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9863}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9864}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9865}}, "Value ($) *"  )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    value: expenseForm.value,
                    onChange: (e) => setExpenseForm({ ...expenseForm, value: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9866}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9873}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9874}}, "Category")
                  , React.createElement('select', { 
                    value: expenseForm.category,
                    onChange: (e) => setExpenseForm({ ...expenseForm, category: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9875}}

                    , React.createElement('option', { value: "Infrastructure", __self: this, __source: {fileName: _jsxFileName, lineNumber: 9880}}, "Infrastructure")
                    , React.createElement('option', { value: "Software Retainer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9881}}, "Software Retainer" )
                    , React.createElement('option', { value: "Marketing & Outreach"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9882}}, "Marketing & Outreach"  )
                    , React.createElement('option', { value: "Office Operations" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9883}}, "Office Operations" )
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9887}}, "Add Expense Item"

              )
            )
          )
        )
      )

      /* 11. Modal: Add Employee Profile */
      , showEmployeeModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9897}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9898}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9899}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9900}}, "Add Employee Profile"  )
              , React.createElement('button', { onClick: () => setShowEmployeeModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9901}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateEmployee, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9904}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9905}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9906}}, "Full Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Nisha Rao"  ,
                  value: employeeForm.name,
                  onChange: (e) => setEmployeeForm({ ...employeeForm, name: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9907}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9915}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9916}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9917}}, "Job Role *"  )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. Sales Executive Lead"   ,
                    value: employeeForm.role,
                    onChange: (e) => setEmployeeForm({ ...employeeForm, role: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9918}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9926}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9927}}, "Department")
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "e.g. Corporate CRM"  ,
                    value: employeeForm.dept,
                    onChange: (e) => setEmployeeForm({ ...employeeForm, dept: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9928}}
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9937}}, "Add Employee Profile"

              )
            )
          )
        )
      )

      /* 12. Modal: Create Department Team */
      , showTeamModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9947}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9948}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9949}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9950}}, "Create Department Team"  )
              , React.createElement('button', { onClick: () => setShowTeamModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9951}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateTeam, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9954}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9955}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9956}}, "Team Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Enterprise Delivery Team"   ,
                  value: teamForm.name,
                  onChange: (e) => setTeamForm({ ...teamForm, name: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9957}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9965}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9966}}, "Team Lead Name *"   )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Nisha Rao"  ,
                  value: teamForm.lead,
                  onChange: (e) => setTeamForm({ ...teamForm, lead: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9967}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9975}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9976}}, "Team Members List"  )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "e.g. Nisha R, Karan J, Sophia W"      ,
                  value: teamForm.members,
                  onChange: (e) => setTeamForm({ ...teamForm, members: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9977}}
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9985}}, "Create Team & Save to DB"

              )
            )
          )
        )
      )

      /* 10. Modal: Add Expense */
      , showExpenseModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9995}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9996}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9997}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9998}}, "Add Expense Item"  )
              , React.createElement('button', { onClick: () => setShowExpenseModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9999}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateExpense, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10002}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10003}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10004}}, "Expense Title *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. AWS Cloud Server Hosting"    ,
                  value: expenseForm.title,
                  onChange: (e) => setExpenseForm({ ...expenseForm, title: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10005}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10013}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10014}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10015}}, "Value ($) *"  )
                  , React.createElement('input', { 
                    type: "number", required: true,
                    value: expenseForm.value,
                    onChange: (e) => setExpenseForm({ ...expenseForm, value: Number(e.target.value) }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10016}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10023}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10024}}, "Category")
                  , React.createElement('select', { 
                    value: expenseForm.category,
                    onChange: (e) => setExpenseForm({ ...expenseForm, category: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10025}}

                    , React.createElement('option', { value: "Infrastructure", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10030}}, "Infrastructure")
                    , React.createElement('option', { value: "Software Retainer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10031}}, "Software Retainer" )
                    , React.createElement('option', { value: "Marketing & Outreach"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10032}}, "Marketing & Outreach"  )
                    , React.createElement('option', { value: "Office Operations" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10033}}, "Office Operations" )
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10037}}, "Add Expense Item"

              )
            )
          )
        )
      )

      /* 11. Modal: Add Employee Profile */
      , showEmployeeModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10047}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10048}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10049}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10050}}, "Add Employee Profile"  )
              , React.createElement('button', { onClick: () => setShowEmployeeModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10051}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateEmployee, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10054}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10055}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10056}}, "Full Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Nisha Rao"  ,
                  value: employeeForm.name,
                  onChange: (e) => setEmployeeForm({ ...employeeForm, name: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10057}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10065}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10066}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10067}}, "Job Role *"  )
                  , React.createElement('input', { 
                    type: "text", required: true,
                    placeholder: "e.g. Sales Executive Lead"   ,
                    value: employeeForm.role,
                    onChange: (e) => setEmployeeForm({ ...employeeForm, role: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10068}}
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10076}}
                  , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10077}}, "Department")
                  , React.createElement('input', { 
                    type: "text",
                    placeholder: "e.g. Corporate CRM"  ,
                    value: employeeForm.dept,
                    onChange: (e) => setEmployeeForm({ ...employeeForm, dept: e.target.value }),
                    className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10078}}
                  )
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10087}}, "Add Employee Profile"

              )
            )
          )
        )
      )

      /* 12. Modal: Create Department Team */
      , showTeamModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/40 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10097}}
          , React.createElement(GlassCard, { className: "w-full max-w-md p-6 bg-white border border-gray-200 shadow-elevated flex flex-col gap-5 animate-in fade-in zoom-in duration-200"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10098}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10099}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10100}}, "Create Department Team"  )
              , React.createElement('button', { onClick: () => setShowTeamModal(false), className: "text-gray-400 hover:text-[#071E34] text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10101}}, "×")
            )

            , React.createElement('form', { onSubmit: handleCreateTeam, className: "flex flex-col gap-4 text-xs text-gray-700"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10104}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10105}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10106}}, "Team Name *"  )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Enterprise Delivery Team"   ,
                  value: teamForm.name,
                  onChange: (e) => setTeamForm({ ...teamForm, name: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10107}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10115}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10116}}, "Team Lead Name *"   )
                , React.createElement('input', { 
                  type: "text", required: true,
                  placeholder: "e.g. Nisha Rao"  ,
                  value: teamForm.lead,
                  onChange: (e) => setTeamForm({ ...teamForm, lead: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10117}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10125}}
                , React.createElement('label', { className: "text-[9px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10126}}, "Team Members List"  )
                , React.createElement('input', { 
                  type: "text",
                  placeholder: "e.g. Nisha R, Karan J, Sophia W"      ,
                  value: teamForm.members,
                  onChange: (e) => setTeamForm({ ...teamForm, members: e.target.value }),
                  className: "w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10127}}
                )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", className: "w-full mt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10135}}, "Create Team & Save to DB"

              )
            )
          )
        )
      )

      /* 13. Modal: Client Live PDF Preview */
      , clientPdfPreviewModal && (
        React.createElement('div', { className: `fixed inset-0 z-[80] flex items-center justify-center bg-[#071E34]/55 backdrop-blur-sm ${isFullScreenPdf ? 'p-0' : 'p-4'} overflow-y-auto`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10145}}
          , React.createElement('div', { className: `w-full bg-white border border-gray-200 shadow-2xl flex flex-col transition-all duration-300 ${
            isFullScreenPdf 
              ? 'w-full max-w-none h-full min-h-screen rounded-none my-0' 
              : 'max-w-5xl h-[min(92vh,900px)] max-h-[92vh] rounded-3xl my-auto'
          } overflow-hidden animate-in fade-in zoom-in-95 duration-200`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10146}}
            , React.createElement('div', { className: "flex shrink-0 justify-between items-center p-4 border-b border-gray-200 bg-gray-50"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10151}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10152}}
                , React.createElement(Eye, { className: "w-5 h-5 text-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10153}} )
                , React.createElement('h3', { className: "font-extrabold text-sm text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10154}}, clientPdfPreviewModal.title)
                , React.createElement('span', { className: "text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10155}}, "FULL PAGE PREVIEW"  )
              )
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10157}}
                , React.createElement('button', {
                  onClick: () => setIsFullScreenPdf(!isFullScreenPdf),
                  className: "px-3 py-1.5 bg-white hover:bg-gray-100 text-[#071E34] border border-gray-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ease-out cursor-pointer shadow-3xs"                 ,
                  title: isFullScreenPdf ? "Exit Full Page View" : "Expand to Full Page View", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10158}}

                  , isFullScreenPdf ? React.createElement(Minimize2, { size: 13, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10163}} ) : React.createElement(Maximize2, { size: 13, className: "text-teal-600", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10163}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10164}}, isFullScreenPdf ? "Exit Full Page" : "Full Page View")
                )
                , React.createElement('button', {
                  onClick: () => {
                    const globalBranding = getGlobalCompanyDetails();
                    setEditingClientDoc({
                      type: clientPdfPreviewModal.title.toLowerCase().includes("agreement") ? "agreement" : (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                      item: clientPdfPreviewModal.item,
                      refNumber: _optionalChain([clientPdfPreviewModal, 'access', _318 => _318.item, 'optionalAccess', _319 => _319.number]) || _optionalChain([clientPdfPreviewModal, 'access', _320 => _320.item, 'optionalAccess', _321 => _321.id]) || "QT-REF-1001",
                      issueDate: _optionalChain([clientPdfPreviewModal, 'access', _322 => _322.item, 'optionalAccess', _323 => _323.date]) || _optionalChain([clientPdfPreviewModal, 'access', _324 => _324.item, 'optionalAccess', _325 => _325.createdDate]) || "28 July, 2026",
                      clientName: _optionalChain([clientPdfPreviewModal, 'access', _326 => _326.item, 'optionalAccess', _327 => _327.clientName]) || _optionalChain([activeClientDetail, 'optionalAccess', _328 => _328.name]) || "Internal Enterprise",
                      clientEmail: _optionalChain([clientPdfPreviewModal, 'access', _329 => _329.item, 'optionalAccess', _330 => _330.clientEmail]) || _optionalChain([activeClientDetail, 'optionalAccess', _331 => _331.email]) || "naveenkumar970100@gmail.com",
                      productName: _optionalChain([clientPdfPreviewModal, 'access', _332 => _332.item, 'optionalAccess', _333 => _333.productName]) || _optionalChain([clientPdfPreviewModal, 'access', _334 => _334.item, 'optionalAccess', _335 => _335.projectName]) || _optionalChain([clientPdfPreviewModal, 'access', _336 => _336.item, 'optionalAccess', _337 => _337.title]) || "Software Project Application",
                      category: _optionalChain([clientPdfPreviewModal, 'access', _338 => _338.item, 'optionalAccess', _339 => _339.category]) || _optionalChain([clientPdfPreviewModal, 'access', _340 => _340.item, 'optionalAccess', _341 => _341.projectType]) || "Website Application",
                      overviewNarrative: _optionalChain([clientPdfPreviewModal, 'access', _342 => _342.item, 'optionalAccess', _343 => _343.overviewNarrative]) || _optionalChain([clientPdfPreviewModal, 'access', _344 => _344.item, 'optionalAccess', _345 => _345.description]) || "Full-stack responsive application development and delivery.",
                      rate: Number(_optionalChain([clientPdfPreviewModal, 'access', _346 => _346.item, 'optionalAccess', _347 => _347.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _348 => _348.item, 'optionalAccess', _349 => _349.planAPrice]) || 50000),
                      taxPct: Number(_optionalChain([clientPdfPreviewModal, 'access', _350 => _350.item, 'optionalAccess', _351 => _351.taxPct]) !== undefined ? clientPdfPreviewModal.item.taxPct : 18),
                      totalDue: Number(_optionalChain([clientPdfPreviewModal, 'access', _352 => _352.item, 'optionalAccess', _353 => _353.totalDue]) || Math.round(Number(_optionalChain([clientPdfPreviewModal, 'access', _354 => _354.item, 'optionalAccess', _355 => _355.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _356 => _356.item, 'optionalAccess', _357 => _357.planAPrice]) || 50000) * 1.18)),
                      paymentTerms: _optionalChain([clientPdfPreviewModal, 'access', _358 => _358.item, 'optionalAccess', _359 => _359.paymentTerms]) || "50% Advance upon signing proposal, 50% upon deployment.",
                      customFeatures: _optionalChain([clientPdfPreviewModal, 'access', _360 => _360.item, 'optionalAccess', _361 => _361.customFeatures]) || _optionalChain([clientPdfPreviewModal, 'access', _362 => _362.item, 'optionalAccess', _363 => _363.features]) || [
                        { title: "Responsive Web Portal & Cloud Architecture", description: "Modern React & Next.js web application optimized for mobile and desktop." },
                        { title: "Secure Payment Gateway Integration", description: "Razorpay / Stripe integration with instant automated tax receipt generation." },
                        { title: "Real-time Push Notifications & Audit Log", description: "Instant status updates, SMS alerts, and database activity tracking." },
                        { title: "Admin Management & Customer Dashboard", description: "Comprehensive reporting analytics, user roles, and order tracking." }
                      ],
                      companyName: _optionalChain([clientPdfPreviewModal, 'access', _364 => _364.item, 'optionalAccess', _365 => _365.companyName]) || _optionalChain([clientPdfPreviewModal, 'access', _366 => _366.item, 'optionalAccess', _367 => _367.billedByCompany]) || globalBranding.billedByCompany || globalBranding.companyName || "Speshway Solutions Private Limited",
                      companyTagline: _optionalChain([clientPdfPreviewModal, 'access', _368 => _368.item, 'optionalAccess', _369 => _369.companyTagline]) || _optionalChain([clientPdfPreviewModal, 'access', _370 => _370.item, 'optionalAccess', _371 => _371.companyHeaderSub]) || globalBranding.companyTagline || globalBranding.billedBySub || "Software Development Company",
                      companyAddress: _optionalChain([clientPdfPreviewModal, 'access', _372 => _372.item, 'optionalAccess', _373 => _373.companyAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _374 => _374.item, 'optionalAccess', _375 => _375.billedByAddress]) || globalBranding.companyAddress || globalBranding.billedByAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                      companyEmail: _optionalChain([clientPdfPreviewModal, 'access', _376 => _376.item, 'optionalAccess', _377 => _377.companyEmail]) || globalBranding.companyEmail || "info@speshway.com",
                      companyPhone: _optionalChain([clientPdfPreviewModal, 'access', _378 => _378.item, 'optionalAccess', _379 => _379.companyPhone]) || globalBranding.companyPhone || "+91 91000 06020",
                      companyWebsite: _optionalChain([clientPdfPreviewModal, 'access', _380 => _380.item, 'optionalAccess', _381 => _381.companyWebsite]) || globalBranding.companyWebsite || "www.speshway.com",
                      companyFooterName: _optionalChain([clientPdfPreviewModal, 'access', _382 => _382.item, 'optionalAccess', _383 => _383.companyFooterName]) || _optionalChain([clientPdfPreviewModal, 'access', _384 => _384.item, 'optionalAccess', _385 => _385.companyName]) || _optionalChain([clientPdfPreviewModal, 'access', _386 => _386.item, 'optionalAccess', _387 => _387.billedByCompany]) || globalBranding.companyFooterName || globalBranding.billedByCompany || "Speshway Solutions Private Limited",
                      companyFooterAddress: _optionalChain([clientPdfPreviewModal, 'access', _388 => _388.item, 'optionalAccess', _389 => _389.companyFooterAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _390 => _390.item, 'optionalAccess', _391 => _391.companyAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _392 => _392.item, 'optionalAccess', _393 => _393.billedByAddress]) || globalBranding.companyFooterAddress || globalBranding.companyAddress || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                      companyFooterContact: _optionalChain([clientPdfPreviewModal, 'access', _394 => _394.item, 'optionalAccess', _395 => _395.companyFooterContact]) || globalBranding.companyFooterContact || `${_optionalChain([clientPdfPreviewModal, 'access', _396 => _396.item, 'optionalAccess', _397 => _397.companyWebsite]) || "www.speshway.com"} - ${_optionalChain([clientPdfPreviewModal, 'access', _398 => _398.item, 'optionalAccess', _399 => _399.companyEmail]) || "info@speshway.com"} - ${_optionalChain([clientPdfPreviewModal, 'access', _400 => _400.item, 'optionalAccess', _401 => _401.companyPhone]) || "+91 91000 06020"}`,
                      pdfFooterTheme: _optionalChain([clientPdfPreviewModal, 'access', _402 => _402.item, 'optionalAccess', _403 => _403.pdfFooterTheme]) || globalBranding.pdfFooterTheme || "dark",
                      pdfPrimaryColor: _optionalChain([clientPdfPreviewModal, 'access', _404 => _404.item, 'optionalAccess', _405 => _405.pdfPrimaryColor]) || globalBranding.pdfPrimaryColor || "#5D3ADF",
                      pdfSecondaryColor: _optionalChain([clientPdfPreviewModal, 'access', _406 => _406.item, 'optionalAccess', _407 => _407.pdfSecondaryColor]) || globalBranding.pdfSecondaryColor || "#B8F7A1",
                      companyLogoUrl: _optionalChain([clientPdfPreviewModal, 'access', _408 => _408.item, 'optionalAccess', _409 => _409.companyLogoUrl]) || _optionalChain([clientPdfPreviewModal, 'access', _410 => _410.item, 'optionalAccess', _411 => _411.logoUrl]) || globalBranding.companyLogoUrl || "",
                      companyLogoSize: Number(_optionalChain([clientPdfPreviewModal, 'access', _412 => _412.item, 'optionalAccess', _413 => _413.companyLogoSize]) || _optionalChain([clientPdfPreviewModal, 'access', _414 => _414.item, 'optionalAccess', _415 => _415.logoSize]) || globalBranding.companyLogoSize || 40),
                      showWatermark: _optionalChain([clientPdfPreviewModal, 'access', _416 => _416.item, 'optionalAccess', _417 => _417.showWatermark]) !== undefined ? Boolean(clientPdfPreviewModal.item.showWatermark) : (globalBranding.showWatermark !== undefined ? Boolean(globalBranding.showWatermark) : true),
                      companyWatermarkText: _optionalChain([clientPdfPreviewModal, 'access', _418 => _418.item, 'optionalAccess', _419 => _419.companyWatermarkText]) || globalBranding.companyWatermarkText || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                      companyWatermarkUrl: _optionalChain([clientPdfPreviewModal, 'access', _420 => _420.item, 'optionalAccess', _421 => _421.companyWatermarkUrl]) || globalBranding.companyWatermarkUrl || "",
                      companyWatermarkOpacity: _optionalChain([clientPdfPreviewModal, 'access', _422 => _422.item, 'optionalAccess', _423 => _423.companyWatermarkOpacity]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkOpacity) : (globalBranding.companyWatermarkOpacity !== undefined ? Number(globalBranding.companyWatermarkOpacity) : 0.08),
                      companyWatermarkRotation: _optionalChain([clientPdfPreviewModal, 'access', _424 => _424.item, 'optionalAccess', _425 => _425.companyWatermarkRotation]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkRotation) : (globalBranding.companyWatermarkRotation !== undefined ? Number(globalBranding.companyWatermarkRotation) : -15),
                      companyWatermarkSize: _optionalChain([clientPdfPreviewModal, 'access', _426 => _426.item, 'optionalAccess', _427 => _427.companyWatermarkSize]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkSize) : (globalBranding.companyWatermarkSize !== undefined ? Number(globalBranding.companyWatermarkSize) : 26),
                      companyWatermarkImgSize: Number(_optionalChain([clientPdfPreviewModal, 'access', _428 => _428.item, 'optionalAccess', _429 => _429.companyWatermarkImgSize]) || _optionalChain([clientPdfPreviewModal, 'access', _430 => _430.item, 'optionalAccess', _431 => _431.watermarkImgSize]) || globalBranding.companyWatermarkImgSize || 220),
                      customerDesc: _optionalChain([clientPdfPreviewModal, 'access', _432 => _432.item, 'optionalAccess', _433 => _433.customerDesc]) || "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.",
                      merchantDesc: _optionalChain([clientPdfPreviewModal, 'access', _434 => _434.item, 'optionalAccess', _435 => _435.merchantDesc]) || "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.",
                      adminDesc: _optionalChain([clientPdfPreviewModal, 'access', _436 => _436.item, 'optionalAccess', _437 => _437.adminDesc]) || "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe.",
                      planAName: _optionalChain([clientPdfPreviewModal, 'access', _438 => _438.item, 'optionalAccess', _439 => _439.planAName]) || "Standard App Package",
                      planBName: _optionalChain([clientPdfPreviewModal, 'access', _440 => _440.item, 'optionalAccess', _441 => _441.planBName]) || "Enterprise Premium Package",
                      planBPrice: Number(_optionalChain([clientPdfPreviewModal, 'access', _442 => _442.item, 'optionalAccess', _443 => _443.planBPrice]) || Math.round((Number(_optionalChain([clientPdfPreviewModal, 'access', _444 => _444.item, 'optionalAccess', _445 => _445.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _446 => _446.item, 'optionalAccess', _447 => _447.planAPrice]) || 50000)) * 1.4)),
                      includePlanB: _optionalChain([clientPdfPreviewModal, 'access', _448 => _448.item, 'optionalAccess', _449 => _449.includePlanB]) !== false && _optionalChain([clientPdfPreviewModal, 'access', _450 => _450.item, 'optionalAccess', _451 => _451.enablePlanB]) !== false,
                      sec4Subtitle: _optionalChain([clientPdfPreviewModal, 'access', _452 => _452.item, 'optionalAccess', _453 => _453.sec4Subtitle]) || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
                      planAHighlights: typeof _optionalChain([clientPdfPreviewModal, 'access', _454 => _454.item, 'optionalAccess', _455 => _455.planAHighlights]) === "string" ? clientPdfPreviewModal.item.planAHighlights : (Array.isArray(_optionalChain([clientPdfPreviewModal, 'access', _456 => _456.item, 'optionalAccess', _457 => _457.planAHighlights])) ? clientPdfPreviewModal.item.planAHighlights.join("\n") : "Responsive web application (Customer, Merchant & Admin portals)\nAll core features from Section 3\nSecure payment gateway integration (Card / UPI)\nQR-based ticket check-in (web scanner)\nAdmin & Merchant dashboards\nCross-browser, mobile-responsive UI\nBasic SEO setup & deployment"),
                      planBHighlights: typeof _optionalChain([clientPdfPreviewModal, 'access', _458 => _458.item, 'optionalAccess', _459 => _459.planBHighlights]) === "string" ? clientPdfPreviewModal.item.planBHighlights : (Array.isArray(_optionalChain([clientPdfPreviewModal, 'access', _460 => _460.item, 'optionalAccess', _461 => _461.planBHighlights])) ? clientPdfPreviewModal.item.planBHighlights.join("\n") : "Everything in Plan A, plus:\nNative/hybrid mobile apps for Customer & Merchant (Android + iOS)\nPush notifications for promotions & alerts\nIn-app QR scanner for on-site check-in\nMobile-optimized chat & booking flow\nApp Store & Play Store submission support"),
                      planComparisonItems: _optionalChain([clientPdfPreviewModal, 'access', _462 => _462.item, 'optionalAccess', _463 => _463.planComparisonItems]) || [
                        { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                        { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                        { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                        { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                        { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                        { deliverable: "Push Notifications", planA: false, planB: true },
                        { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                      ],
                      termsAndConditions: _optionalChain([clientPdfPreviewModal, 'access', _464 => _464.item, 'optionalAccess', _465 => _465.termsAndConditions]) || "Estimation is valid for 30 days from the date of this document.\nTimeline: Plan A — approx. 6–8 weeks; Plan B — approx. 10–12 weeks from kick-off.\nCost excludes third-party charges such as payment gateway fees, SMS/email fees.\nIncludes 30 days of complimentary post-launch bug-fix support.",
                      inclusions: _optionalChain([clientPdfPreviewModal, 'access', _466 => _466.item, 'optionalAccess', _467 => _467.inclusions]) || _optionalChain([clientPdfPreviewModal, 'access', _468 => _468.item, 'optionalAccess', _469 => _469.scopeInclusions]) || "Full source code and deployment credentials handover upon final settlement.\nComplimentary 30-day post-deployment bug-fix technical support.\nProduction server deployment, SSL configuration & DNS domain mapping.",
                      exclusions: _optionalChain([clientPdfPreviewModal, 'access', _470 => _470.item, 'optionalAccess', _471 => _471.exclusions]) || _optionalChain([clientPdfPreviewModal, 'access', _472 => _472.item, 'optionalAccess', _473 => _473.scopeExclusions]) || "Third-party API charges (SMS, WhatsApp API, Payment Gateway fees).\nGoogle Play ($25) & Apple Developer ($99/year) console registration fees.\nContent copywriting, stock video/image purchasing.",
                      accountName: _optionalChain([clientPdfPreviewModal, 'access', _474 => _474.item, 'optionalAccess', _475 => _475.accountName]) || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                      accountNumber: _optionalChain([clientPdfPreviewModal, 'access', _476 => _476.item, 'optionalAccess', _477 => _477.accountNumber]) || "018326900000850",
                      ifscCode: _optionalChain([clientPdfPreviewModal, 'access', _478 => _478.item, 'optionalAccess', _479 => _479.ifscCode]) || "YESB0000183",
                      branch: _optionalChain([clientPdfPreviewModal, 'access', _480 => _480.item, 'optionalAccess', _481 => _481.branch]) || "HITECH CITY",
                      invoiceDescription: _optionalChain([clientPdfPreviewModal, 'access', _482 => _482.item, 'optionalAccess', _483 => _483.description]) || `${_optionalChain([clientPdfPreviewModal, 'access', _484 => _484.item, 'optionalAccess', _485 => _485.productName]) || _optionalChain([clientPdfPreviewModal, 'access', _486 => _486.item, 'optionalAccess', _487 => _487.projectName]) || "Software Project"} Web & Mobile Application`,
                      invoiceSubdesc: _optionalChain([clientPdfPreviewModal, 'access', _488 => _488.item, 'optionalAccess', _489 => _489.subdesc]) || `Design, development & delivery of web and mobile applications for the product, provided to ${_optionalChain([clientPdfPreviewModal, 'access', _490 => _490.item, 'optionalAccess', _491 => _491.clientName]) || "Client"}`
                    });
                  },
                  className: "px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#071E34] border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ease-out"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10166}}

                  , React.createElement(Edit3, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10242}} ), " Edit Document for Client"
                )
                , React.createElement('button', {
                  onClick: () => setClientPdfPreviewModal(null),
                  className: "w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-lg font-bold"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10244}}
, "×"

                )
              )
            )

            , React.createElement('div', { className: "flex-1 min-h-0 bg-slate-900 p-4 flex justify-center items-center overflow-hidden"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10253}}
              , React.createElement('iframe', {
                srcDoc: clientPdfPreviewModal.html,
                className: "w-full h-full border border-gray-800 rounded-2xl bg-slate-900 shadow-inner"      ,
                title: "Client Document Preview"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10254}}
              )
            )

            , React.createElement('div', { className: "shrink-0 p-4 border-t border-gray-200 flex justify-between items-center bg-white flex-wrap gap-2"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10261}}
              , React.createElement('button', {
                onClick: () => setClientPdfPreviewModal(null),
                className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10262}}
, "Close Preview"

              )

              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10269}}
                , React.createElement('button', {
                  onClick: () => setEditingClientDoc({
                    type: clientPdfPreviewModal.title.toLowerCase().includes("agreement") ? "agreement" : (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "invoice" : "quotation"),
                    item: clientPdfPreviewModal.item,
                    refNumber: _optionalChain([clientPdfPreviewModal, 'access', _492 => _492.item, 'optionalAccess', _493 => _493.number]) || _optionalChain([clientPdfPreviewModal, 'access', _494 => _494.item, 'optionalAccess', _495 => _495.id]) || "QT-REF-1001",
                    issueDate: _optionalChain([clientPdfPreviewModal, 'access', _496 => _496.item, 'optionalAccess', _497 => _497.date]) || _optionalChain([clientPdfPreviewModal, 'access', _498 => _498.item, 'optionalAccess', _499 => _499.createdDate]) || "28 July, 2026",
                    clientName: _optionalChain([clientPdfPreviewModal, 'access', _500 => _500.item, 'optionalAccess', _501 => _501.clientName]) || _optionalChain([activeClientDetail, 'optionalAccess', _502 => _502.name]) || "Internal Enterprise",
                    clientEmail: _optionalChain([clientPdfPreviewModal, 'access', _503 => _503.item, 'optionalAccess', _504 => _504.clientEmail]) || _optionalChain([activeClientDetail, 'optionalAccess', _505 => _505.email]) || "naveenkumar970100@gmail.com",
                    productName: _optionalChain([clientPdfPreviewModal, 'access', _506 => _506.item, 'optionalAccess', _507 => _507.productName]) || _optionalChain([clientPdfPreviewModal, 'access', _508 => _508.item, 'optionalAccess', _509 => _509.projectName]) || _optionalChain([clientPdfPreviewModal, 'access', _510 => _510.item, 'optionalAccess', _511 => _511.title]) || "Software Project Application",
                    category: _optionalChain([clientPdfPreviewModal, 'access', _512 => _512.item, 'optionalAccess', _513 => _513.category]) || _optionalChain([clientPdfPreviewModal, 'access', _514 => _514.item, 'optionalAccess', _515 => _515.projectType]) || "Website Application",
                    overviewNarrative: _optionalChain([clientPdfPreviewModal, 'access', _516 => _516.item, 'optionalAccess', _517 => _517.overviewNarrative]) || _optionalChain([clientPdfPreviewModal, 'access', _518 => _518.item, 'optionalAccess', _519 => _519.description]) || "Full-stack responsive application development and delivery.",
                    rate: Number(_optionalChain([clientPdfPreviewModal, 'access', _520 => _520.item, 'optionalAccess', _521 => _521.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _522 => _522.item, 'optionalAccess', _523 => _523.planAPrice]) || 50000),
                    taxPct: Number(_optionalChain([clientPdfPreviewModal, 'access', _524 => _524.item, 'optionalAccess', _525 => _525.taxPct]) !== undefined ? clientPdfPreviewModal.item.taxPct : 18),
                    totalDue: Number(_optionalChain([clientPdfPreviewModal, 'access', _526 => _526.item, 'optionalAccess', _527 => _527.totalDue]) || Math.round(Number(_optionalChain([clientPdfPreviewModal, 'access', _528 => _528.item, 'optionalAccess', _529 => _529.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _530 => _530.item, 'optionalAccess', _531 => _531.planAPrice]) || 50000) * 1.18)),
                    paymentTerms: _optionalChain([clientPdfPreviewModal, 'access', _532 => _532.item, 'optionalAccess', _533 => _533.paymentTerms]) || "50% Advance upon signing proposal, 50% upon deployment.",
                    customFeatures: _optionalChain([clientPdfPreviewModal, 'access', _534 => _534.item, 'optionalAccess', _535 => _535.customFeatures]) || _optionalChain([clientPdfPreviewModal, 'access', _536 => _536.item, 'optionalAccess', _537 => _537.features]) || [
                      { title: "Responsive Web Portal & Cloud Architecture", description: "Modern React & Next.js web application optimized for mobile and desktop." },
                      { title: "Secure Payment Gateway Integration", description: "Razorpay / Stripe integration with instant automated tax receipt generation." },
                      { title: "Real-time Push Notifications & Audit Log", description: "Instant status updates, SMS alerts, and database activity tracking." },
                      { title: "Admin Management & Customer Dashboard", description: "Comprehensive reporting analytics, user roles, and order tracking." }
                    ],
                    companyName: _optionalChain([clientPdfPreviewModal, 'access', _538 => _538.item, 'optionalAccess', _539 => _539.companyName]) || _optionalChain([clientPdfPreviewModal, 'access', _540 => _540.item, 'optionalAccess', _541 => _541.billedByCompany]) || "Speshway Solutions Private Limited",
                    companyTagline: _optionalChain([clientPdfPreviewModal, 'access', _542 => _542.item, 'optionalAccess', _543 => _543.companyTagline]) || _optionalChain([clientPdfPreviewModal, 'access', _544 => _544.item, 'optionalAccess', _545 => _545.companyHeaderSub]) || "Software Development Company",
                    companyAddress: _optionalChain([clientPdfPreviewModal, 'access', _546 => _546.item, 'optionalAccess', _547 => _547.companyAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _548 => _548.item, 'optionalAccess', _549 => _549.billedByAddress]) || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                    companyEmail: _optionalChain([clientPdfPreviewModal, 'access', _550 => _550.item, 'optionalAccess', _551 => _551.companyEmail]) || "info@speshway.com",
                    companyPhone: _optionalChain([clientPdfPreviewModal, 'access', _552 => _552.item, 'optionalAccess', _553 => _553.companyPhone]) || "+91 91000 06020",
                    companyWebsite: _optionalChain([clientPdfPreviewModal, 'access', _554 => _554.item, 'optionalAccess', _555 => _555.companyWebsite]) || "www.speshway.com",
                    companyFooterName: _optionalChain([clientPdfPreviewModal, 'access', _556 => _556.item, 'optionalAccess', _557 => _557.companyFooterName]) || _optionalChain([clientPdfPreviewModal, 'access', _558 => _558.item, 'optionalAccess', _559 => _559.companyName]) || _optionalChain([clientPdfPreviewModal, 'access', _560 => _560.item, 'optionalAccess', _561 => _561.billedByCompany]) || "Speshway Solutions Private Limited",
                    companyFooterAddress: _optionalChain([clientPdfPreviewModal, 'access', _562 => _562.item, 'optionalAccess', _563 => _563.companyFooterAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _564 => _564.item, 'optionalAccess', _565 => _565.companyAddress]) || _optionalChain([clientPdfPreviewModal, 'access', _566 => _566.item, 'optionalAccess', _567 => _567.billedByAddress]) || "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
                    companyFooterContact: _optionalChain([clientPdfPreviewModal, 'access', _568 => _568.item, 'optionalAccess', _569 => _569.companyFooterContact]) || `${_optionalChain([clientPdfPreviewModal, 'access', _570 => _570.item, 'optionalAccess', _571 => _571.companyWebsite]) || "www.speshway.com"} - ${_optionalChain([clientPdfPreviewModal, 'access', _572 => _572.item, 'optionalAccess', _573 => _573.companyEmail]) || "info@speshway.com"} - ${_optionalChain([clientPdfPreviewModal, 'access', _574 => _574.item, 'optionalAccess', _575 => _575.companyPhone]) || "+91 91000 06020"}`,
                    pdfFooterTheme: _optionalChain([clientPdfPreviewModal, 'access', _576 => _576.item, 'optionalAccess', _577 => _577.pdfFooterTheme]) || "dark",
                    pdfPrimaryColor: _optionalChain([clientPdfPreviewModal, 'access', _578 => _578.item, 'optionalAccess', _579 => _579.pdfPrimaryColor]) || (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "#003b8e" : "#4c1d95"),
                    pdfSecondaryColor: _optionalChain([clientPdfPreviewModal, 'access', _580 => _580.item, 'optionalAccess', _581 => _581.pdfSecondaryColor]) || (clientPdfPreviewModal.title.toLowerCase().includes("invoice") ? "#d97706" : "#7c3aed"),
                    companyLogoUrl: _optionalChain([clientPdfPreviewModal, 'access', _582 => _582.item, 'optionalAccess', _583 => _583.companyLogoUrl]) || _optionalChain([clientPdfPreviewModal, 'access', _584 => _584.item, 'optionalAccess', _585 => _585.logoUrl]) || "",
                    companyLogoSize: Number(_optionalChain([clientPdfPreviewModal, 'access', _586 => _586.item, 'optionalAccess', _587 => _587.companyLogoSize]) || _optionalChain([clientPdfPreviewModal, 'access', _588 => _588.item, 'optionalAccess', _589 => _589.logoSize]) || 40),
                    showWatermark: _optionalChain([clientPdfPreviewModal, 'access', _590 => _590.item, 'optionalAccess', _591 => _591.showWatermark]) !== undefined ? Boolean(clientPdfPreviewModal.item.showWatermark) : true,
                    companyWatermarkText: _optionalChain([clientPdfPreviewModal, 'access', _592 => _592.item, 'optionalAccess', _593 => _593.companyWatermarkText]) || _optionalChain([clientPdfPreviewModal, 'access', _594 => _594.item, 'optionalAccess', _595 => _595.companyName]) || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                    companyWatermarkUrl: _optionalChain([clientPdfPreviewModal, 'access', _596 => _596.item, 'optionalAccess', _597 => _597.companyWatermarkUrl]) || "",
                    companyWatermarkOpacity: _optionalChain([clientPdfPreviewModal, 'access', _598 => _598.item, 'optionalAccess', _599 => _599.companyWatermarkOpacity]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkOpacity) : 0.08,
                    companyWatermarkRotation: _optionalChain([clientPdfPreviewModal, 'access', _600 => _600.item, 'optionalAccess', _601 => _601.companyWatermarkRotation]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkRotation) : -15,
                    companyWatermarkSize: _optionalChain([clientPdfPreviewModal, 'access', _602 => _602.item, 'optionalAccess', _603 => _603.companyWatermarkSize]) !== undefined ? Number(clientPdfPreviewModal.item.companyWatermarkSize) : 26,
                    companyWatermarkImgSize: Number(_optionalChain([clientPdfPreviewModal, 'access', _604 => _604.item, 'optionalAccess', _605 => _605.companyWatermarkImgSize]) || _optionalChain([clientPdfPreviewModal, 'access', _606 => _606.item, 'optionalAccess', _607 => _607.watermarkImgSize]) || 220),
                    customerDesc: _optionalChain([clientPdfPreviewModal, 'access', _608 => _608.item, 'optionalAccess', _609 => _609.customerDesc]) || "Buys tickets or hires services, adds multiple items to a cart, and checks out together in a single transaction.",
                    merchantDesc: _optionalChain([clientPdfPreviewModal, 'access', _610 => _610.item, 'optionalAccess', _611 => _611.merchantDesc]) || "Sells tickets/services, manages bookings, markets their business, and earns money through the platform.",
                    adminDesc: _optionalChain([clientPdfPreviewModal, 'access', _612 => _612.item, 'optionalAccess', _613 => _613.adminDesc]) || "Owns and controls the platform — approves merchants, earns commission, and keeps the ecosystem safe.",
                    planAName: _optionalChain([clientPdfPreviewModal, 'access', _614 => _614.item, 'optionalAccess', _615 => _615.planAName]) || "Standard App Package",
                    planBName: _optionalChain([clientPdfPreviewModal, 'access', _616 => _616.item, 'optionalAccess', _617 => _617.planBName]) || "Enterprise Premium Package",
                    planBPrice: Number(_optionalChain([clientPdfPreviewModal, 'access', _618 => _618.item, 'optionalAccess', _619 => _619.planBPrice]) || Math.round((Number(_optionalChain([clientPdfPreviewModal, 'access', _620 => _620.item, 'optionalAccess', _621 => _621.rate]) || _optionalChain([clientPdfPreviewModal, 'access', _622 => _622.item, 'optionalAccess', _623 => _623.planAPrice]) || 50000)) * 1.4)),
                    includePlanB: _optionalChain([clientPdfPreviewModal, 'access', _624 => _624.item, 'optionalAccess', _625 => _625.includePlanB]) !== false && _optionalChain([clientPdfPreviewModal, 'access', _626 => _626.item, 'optionalAccess', _627 => _627.enablePlanB]) !== false,
                    sec4Subtitle: _optionalChain([clientPdfPreviewModal, 'access', _628 => _628.item, 'optionalAccess', _629 => _629.sec4Subtitle]) || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
                    planAHighlights: typeof _optionalChain([clientPdfPreviewModal, 'access', _630 => _630.item, 'optionalAccess', _631 => _631.planAHighlights]) === "string" ? clientPdfPreviewModal.item.planAHighlights : (Array.isArray(_optionalChain([clientPdfPreviewModal, 'access', _632 => _632.item, 'optionalAccess', _633 => _633.planAHighlights])) ? clientPdfPreviewModal.item.planAHighlights.join("\n") : "Responsive web application (Customer, Merchant & Admin portals)\nAll core features from Section 3\nSecure payment gateway integration (Card / UPI)\nQR-based ticket check-in (web scanner)\nAdmin & Merchant dashboards\nCross-browser, mobile-responsive UI\nBasic SEO setup & deployment"),
                    planBHighlights: typeof _optionalChain([clientPdfPreviewModal, 'access', _634 => _634.item, 'optionalAccess', _635 => _635.planBHighlights]) === "string" ? clientPdfPreviewModal.item.planBHighlights : (Array.isArray(_optionalChain([clientPdfPreviewModal, 'access', _636 => _636.item, 'optionalAccess', _637 => _637.planBHighlights])) ? clientPdfPreviewModal.item.planBHighlights.join("\n") : "Everything in Plan A, plus:\nNative/hybrid mobile apps for Customer & Merchant (Android + iOS)\nPush notifications for promotions & alerts\nIn-app QR scanner for on-site check-in\nMobile-optimized chat & booking flow\nApp Store & Play Store submission support"),
                    planComparisonItems: _optionalChain([clientPdfPreviewModal, 'access', _638 => _638.item, 'optionalAccess', _639 => _639.planComparisonItems]) || [
                      { deliverable: "Customer, Merchant & Admin Web Portals", planA: true, planB: true },
                      { deliverable: "All Core Marketplace Features", planA: true, planB: true },
                      { deliverable: "Secure Payment Gateway (Card / UPI)", planA: true, planB: true },
                      { deliverable: "QR Ticket Check-In", planA: true, planB: true },
                      { deliverable: "Android & iOS Mobile Apps", planA: false, planB: true },
                      { deliverable: "Push Notifications", planA: false, planB: true },
                      { deliverable: "App Store / Play Store Publishing", planA: false, planB: true }
                    ],
                    termsAndConditions: _optionalChain([clientPdfPreviewModal, 'access', _640 => _640.item, 'optionalAccess', _641 => _641.termsAndConditions]) || "Estimation is valid for 30 days from the date of this document.\nTimeline: Plan A — approx. 6–8 weeks; Plan B — approx. 10–12 weeks from kick-off.\nCost excludes third-party charges such as payment gateway fees, SMS/email fees.\nIncludes 30 days of complimentary post-launch bug-fix support.",
                    inclusions: _optionalChain([clientPdfPreviewModal, 'access', _642 => _642.item, 'optionalAccess', _643 => _643.inclusions]) || _optionalChain([clientPdfPreviewModal, 'access', _644 => _644.item, 'optionalAccess', _645 => _645.scopeInclusions]) || "Full source code and deployment credentials handover upon final settlement.\nComplimentary 30-day post-deployment bug-fix technical support.\nProduction server deployment, SSL configuration & DNS domain mapping.",
                    exclusions: _optionalChain([clientPdfPreviewModal, 'access', _646 => _646.item, 'optionalAccess', _647 => _647.exclusions]) || _optionalChain([clientPdfPreviewModal, 'access', _648 => _648.item, 'optionalAccess', _649 => _649.scopeExclusions]) || "Third-party API charges (SMS, WhatsApp API, Payment Gateway fees).\nGoogle Play ($25) & Apple Developer ($99/year) console registration fees.\nContent copywriting, stock video/image purchasing.",
                    accountName: _optionalChain([clientPdfPreviewModal, 'access', _650 => _650.item, 'optionalAccess', _651 => _651.accountName]) || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                    accountNumber: _optionalChain([clientPdfPreviewModal, 'access', _652 => _652.item, 'optionalAccess', _653 => _653.accountNumber]) || "018326900000850",
                    ifscCode: _optionalChain([clientPdfPreviewModal, 'access', _654 => _654.item, 'optionalAccess', _655 => _655.ifscCode]) || "YESB0000183",
                    branch: _optionalChain([clientPdfPreviewModal, 'access', _656 => _656.item, 'optionalAccess', _657 => _657.branch]) || "HITECH CITY",
                    invoiceDescription: _optionalChain([clientPdfPreviewModal, 'access', _658 => _658.item, 'optionalAccess', _659 => _659.description]) || `${_optionalChain([clientPdfPreviewModal, 'access', _660 => _660.item, 'optionalAccess', _661 => _661.productName]) || _optionalChain([clientPdfPreviewModal, 'access', _662 => _662.item, 'optionalAccess', _663 => _663.projectName]) || "Software Project"} Web & Mobile Application`,
                    invoiceSubdesc: _optionalChain([clientPdfPreviewModal, 'access', _664 => _664.item, 'optionalAccess', _665 => _665.subdesc]) || `Design, development & delivery of web and mobile applications for the product, provided to ${_optionalChain([clientPdfPreviewModal, 'access', _666 => _666.item, 'optionalAccess', _667 => _667.clientName]) || "Client"}`
                  }),
                  className: "px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all duration-200 ease-out"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10270}}

                  , React.createElement(Edit3, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10343}} ), " Edit & Customise Document"
                )

                , React.createElement('button', {
                  onClick: () => openPdfPrintPreview(clientPdfPreviewModal.html),
                  className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all duration-200 ease-out active:scale-95 cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10346}}

                  , React.createElement(Printer, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10350}} ), " Print / Save PDF"
                )

                , React.createElement('button', {
                  onClick: () => {
                    showToast("⚡ Preparing PDF download...", "info");
                    triggerDirectPdfDownload(clientPdfPreviewModal.html, `${clientPdfPreviewModal.title.replace(/[^a-zA-Z0-9]/gi, '_')}.pdf`);
                  },
                  className: "px-5 py-2 bg-blue-600 hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all duration-200 ease-out active:scale-95 cursor-pointer"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10353}}

                  , React.createElement(Download, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10360}} ), " Download PDF"
                )
              )
            )
          )
        )
      )

      /* 13b. Modal: Edit Client Document (Full-Page Split Studio: Left Edit Options & Right Live PDF Preview) */
      , editingClientDoc && (() => {
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
          React.createElement('div', { className: "fixed inset-0 z-[100000] flex flex-col bg-slate-950 text-white animate-in fade-in duration-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10531}}
            /* STUDIO TOP HEADER BAR */
            , React.createElement('div', { className: "flex shrink-0 justify-between items-center px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex-wrap gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10533}}
              , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10534}}
                , React.createElement('div', { className: "p-2 bg-[#0E9F8A]/20 rounded-xl border border-[#0E9F8A]/40 text-[#0E9F8A]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10535}}
                  , React.createElement(Edit3, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10536}} )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10538}}
                  , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10539}}
                    , React.createElement('h3', { className: "font-extrabold text-base text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10540}}, "Full-Page " , editingClientDoc.type === "agreement" ? "Service Agreement" : (editingClientDoc.type === "invoice" ? "Tax Invoice" : "Quotation"), " Studio" )
                    , React.createElement('span', { className: "text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-500/30"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10541}}, "Side-by-Side Live Editor"  )
                  )
                  , React.createElement('span', { className: "text-[10px] text-slate-400 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10543}}, "Edit logo, theme colors & watermark on the left • Real-time interactive PDF preview updates on the right"                 )
                )
              )

              , React.createElement('div', { className: "flex items-center gap-3 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10547}}
                , React.createElement('button', {
                  type: "button",
                  onClick: handleSaveAsGlobalDefaultCompanyBranding,
                  className: "px-3.5 py-2 bg-[#FF5349] hover:bg-[#e04940] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"             ,
                  title: "Save current company details as global default for all future documents"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10548}}

                  , React.createElement(Building2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10554}} ), " Update Global Company Details"
                )

                , React.createElement('button', {
                  onClick: () => openPdfPrintPreview(liveStudioPreviewHtml),
                  className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10557}}

                  , React.createElement(Printer, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10561}} ), " Print / Save PDF"
                )

                , React.createElement('button', {
                  onClick: handleSaveCustomizedClientDoc,
                  className: "px-5 py-2 bg-[#0E9F8A] hover:bg-teal-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10564}}

                  , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10568}} ), " Save & Update Client Document"
                )

                , React.createElement('button', {
                  onClick: () => setEditingClientDoc(null),
                  className: "w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xl font-bold transition-all cursor-pointer"             ,
                  title: "Close Studio" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10571}}
, "×"

                )
              )
            )

            /* STUDIO SPLIT CONTAINER */
            , React.createElement('div', { className: "flex-1 min-h-0 p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10582}}
              , React.createElement('div', { className: "lg:col-span-5 bg-white text-gray-800 p-5 rounded-2xl border border-slate-800 shadow-2xl overflow-y-auto space-y-4 text-xs"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10583}}
                /* STEP 1: COMPANY BRANDING & LOGO */
                , React.createElement('div', { className: "bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10585}}
                  , React.createElement('div', { className: "flex items-center gap-2 border-b border-teal-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10586}}
                    , React.createElement(Building, { className: "w-4 h-4 text-teal-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10587}} )
                    , React.createElement('h4', { className: "font-extrabold text-xs text-teal-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10588}}, "Step 1. Company & Agency Branding Details"      )
                  )

                  /* Logo Upload & Image URL Box */
                  , React.createElement('div', { className: "p-3 bg-white rounded-xl border border-teal-200 space-y-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10592}}
                    , React.createElement('div', { className: "flex justify-between items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10593}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10594}}, "Company Logo Image"  )
                      , editingClientDoc.companyLogoUrl && (
                        React.createElement('button', {
                          type: "button",
                          onClick: () => setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: "" }),
                          className: "text-[10px] text-red-600 hover:underline font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10596}}
, "Remove Logo"

                        )
                      )
                    )
                    , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10605}}
                      , editingClientDoc.companyLogoUrl ? (
                        React.createElement('div', { className: "p-1.5 border border-teal-300 rounded-lg bg-teal-50 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10607}}
                          , React.createElement('img', { src: editingClientDoc.companyLogoUrl, alt: "Company Logo" , className: "h-10 max-w-[110px] object-contain"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10608}} )
                        )
                      ) : (
                        React.createElement('div', { className: "w-11 h-11 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-[10px] font-bold shrink-0 bg-gray-50"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10611}}, "No Logo"

                        )
                      )
                      , React.createElement('div', { className: "flex-1 space-y-1.5 min-w-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10615}}
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10616}}
                          , React.createElement('label', { className: "px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-extrabold cursor-pointer transition-all shrink-0 shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10617}}, "Upload Logo File"

                            , React.createElement('input', {
                              type: "file",
                              accept: "image/*",
                              className: "hidden",
                              onChange: (e) => {
                                const file = _optionalChain([e, 'access', _668 => _668.target, 'access', _669 => _669.files, 'optionalAccess', _670 => _670[0]]);
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = async (ev) => {
                                    if (_optionalChain([ev, 'access', _671 => _671.target, 'optionalAccess', _672 => _672.result])) {
                                      const base64Logo = ev.target.result ;
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
                              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10619}}
                            )
                          )
                          , React.createElement('span', { className: "text-[10px] text-gray-400 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10655}}, "or paste image URL"   )
                        )
                        , React.createElement('input', {
                          type: "text",
                          placeholder: "https://example.com/logo.png or Base64 data URL"    ,
                          value: editingClientDoc.companyLogoUrl,
                          onChange: e => {
                            const newUrl = e.target.value;
                            saveGlobalCompanyDetails({ companyLogoUrl: newUrl });
                            setEditingClientDoc({ ...editingClientDoc, companyLogoUrl: newUrl });
                          },
                          className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-mono bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10657}}
                        )
                      )
                    )

                    , editingClientDoc.companyLogoUrl && (
                      React.createElement('div', { className: "pt-2 border-t border-teal-100 flex items-center justify-between gap-3 text-xs"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10672}}
                        , React.createElement('label', { className: "font-bold text-gray-700 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10673}}, "Logo Height / Scale:"   )
                        , React.createElement('div', { className: "flex items-center gap-2 flex-1 max-w-[210px]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10674}}
                          , React.createElement('input', {
                            type: "range",
                            min: "20",
                            max: "100",
                            step: "2",
                            value: editingClientDoc.companyLogoSize || 40,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, companyLogoSize: Number(e.target.value) }),
                            className: "w-full cursor-pointer accent-teal-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10675}}
                          )
                          , React.createElement('span', { className: "font-mono font-extrabold text-teal-800 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10684}}, editingClientDoc.companyLogoSize || 40, "px")
                        )
                      )
                    )
                  )

                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10690}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10691}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10692}}, "Company Business Name *"   )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.companyName,
                        onChange: e => {
                          const nextCompanyName = e.target.value;
                          const currentWatermarkText = editingClientDoc.companyWatermarkText || "";
                          const shouldSyncWatermarkText = !currentWatermarkText.trim() || currentWatermarkText === editingClientDoc.companyName;
                          setEditingClientDoc({
                            ...editingClientDoc,
                            companyName: nextCompanyName,
                            companyWatermarkText: shouldSyncWatermarkText ? nextCompanyName : currentWatermarkText
                          });
                        },
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10693}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10710}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10711}}, "Company Subtitle / Tagline *"    )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.companyTagline,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyTagline: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10712}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10720}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10721}}, "Company Email *"  )
                      , React.createElement('input', {
                        type: "email",
                        required: true,
                        value: editingClientDoc.companyEmail,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyEmail: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10722}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10730}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10731}}, "Company Phone *"  )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.companyPhone,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyPhone: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10732}}
                      )
                    )
                    , React.createElement('div', { className: "col-span-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10740}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10741}}, "Company Address *"  )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.companyAddress,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyAddress: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10742}}
                      )
                    )
                  )
                )

                /* STEP 1B: PDF FOOTER DETAILS */
                , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10754}}
                  , React.createElement('div', { className: "flex items-center justify-between border-b border-slate-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10755}}
                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10756}}
                      , React.createElement(FileText, { className: "w-4 h-4 text-slate-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10757}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-slate-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10758}}, "PDF Footer Details"  )
                    )
                    , editingClientDoc.type === "quotation" && (
                      React.createElement('select', {
                        value: editingClientDoc.pdfFooterTheme || "dark",
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, pdfFooterTheme: e.target.value  }),
                        className: "p-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 bg-white"       ,
                        title: "Quotation footer theme"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10761}}

                        , React.createElement('option', { value: "dark", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10767}}, "Dark Footer" )
                        , React.createElement('option', { value: "white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10768}}, "White Footer" )
                      )
                    )
                  )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10772}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10773}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10774}}, "Footer Company Name"  )
                      , React.createElement('input', {
                        type: "text",
                        value: _optionalChain([editingClientDoc, 'access', _673 => _673.companyFooterName, 'optionalAccess', _674 => _674.trim, 'call', _675 => _675()]) || editingClientDoc.companyName,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyFooterName: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10775}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10782}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10783}}, "Company Website" )
                      , React.createElement('input', {
                        type: "text",
                        value: _optionalChain([editingClientDoc, 'access', _676 => _676.companyWebsite, 'optionalAccess', _677 => _677.trim, 'call', _678 => _678()]) || "www.speshway.com",
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyWebsite: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#071E34] bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10784}}
                      )
                    )
                    , React.createElement('div', { className: "col-span-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10791}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10792}}, "Footer Address Line"  )
                      , React.createElement('input', {
                        type: "text",
                        value: _optionalChain([editingClientDoc, 'access', _679 => _679.companyFooterAddress, 'optionalAccess', _680 => _680.trim, 'call', _681 => _681()]) || editingClientDoc.companyAddress,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyFooterAddress: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10793}}
                      )
                    )
                    , React.createElement('div', { className: "col-span-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10800}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10801}}, "Footer Contact Line"  )
                      , React.createElement('input', {
                        type: "text",
                        value: _optionalChain([editingClientDoc, 'access', _682 => _682.companyFooterContact, 'optionalAccess', _683 => _683.trim, 'call', _684 => _684()]) || `${_optionalChain([editingClientDoc, 'access', _685 => _685.companyWebsite, 'optionalAccess', _686 => _686.trim, 'call', _687 => _687()]) || "www.speshway.com"} - ${editingClientDoc.companyEmail} - ${editingClientDoc.companyPhone}`,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, companyFooterContact: e.target.value }),
                        placeholder: "www.speshway.com · info@speshway.com · +91 91000 06020"      ,
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-mono text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10802}}
                      )
                    )
                  )
                )

                /* STEP 2: MULTI-COLOR THEME & ACCENT COLORS */
                , React.createElement('div', { className: "bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10814}}
                  , React.createElement('div', { className: "flex justify-between items-center border-b border-purple-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10815}}
                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10816}}
                      , React.createElement(Palette, { className: "w-4 h-4 text-purple-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10817}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-purple-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10818}}, "Step 2. Multi-Color Theme & Accent Colors"      )
                    )
                    , React.createElement('button', {
                      type: "button",
                      onClick: () => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: "#4c1d95", pdfSecondaryColor: "#7c3aed" }),
                      className: "text-[10px] text-purple-700 hover:text-purple-950 font-bold underline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10820}}
, "Reset Colors"

                    )
                  )

                  , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-purple-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10829}}
                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10830}}
                      , React.createElement('label', { className: "font-bold text-gray-750 text-[11px] block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10831}}, "Primary Header Color (Hex)"   )
                      , React.createElement('div', { className: "flex gap-1.5 items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10832}}
                        , React.createElement('input', {
                          type: "color",
                          value: editingClientDoc.pdfPrimaryColor || "#4c1d95",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: e.target.value }),
                          className: "w-8 h-8 rounded border border-gray-300 cursor-pointer p-0 shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10833}}
                        )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.pdfPrimaryColor || "#4c1d95",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: e.target.value }),
                          className: "w-full text-xs font-mono font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none uppercase"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10839}}
                        )
                      )
                    )

                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10848}}
                      , React.createElement('label', { className: "font-bold text-gray-750 text-[11px] block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10849}}, "Secondary Accent Color (Hex)"   )
                      , React.createElement('div', { className: "flex gap-1.5 items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10850}}
                        , React.createElement('input', {
                          type: "color",
                          value: editingClientDoc.pdfSecondaryColor || "#7c3aed",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, pdfSecondaryColor: e.target.value }),
                          className: "w-8 h-8 rounded border border-gray-300 cursor-pointer p-0 shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10851}}
                        )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.pdfSecondaryColor || "#7c3aed",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, pdfSecondaryColor: e.target.value }),
                          className: "w-full text-xs font-mono font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none uppercase"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10857}}
                        )
                      )
                    )
                  )

                  /* PRESET PALETTES */
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10868}}
                    , React.createElement('span', { className: "text-[10px] font-extrabold text-purple-900 uppercase tracking-wider block mb-1.5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10869}}, "Preset Theme Palettes:"  )
                    , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10870}}
                      , [
                        { name: "Royal Purple", primary: "#4c1d95", secondary: "#7c3aed" },
                        { name: "Speshway Teal", primary: "#0E9F8A", secondary: "#0d9488" },
                        { name: "Corporate Blue", primary: "#003b8e", secondary: "#2563eb" },
                        { name: "Emerald Green", primary: "#065f46", secondary: "#10b981" },
                        { name: "Midnight Onyx", primary: "#0f172a", secondary: "#334155" },
                        { name: "Crimson Red", primary: "#881337", secondary: "#e11d48" }
                      ].map((pal, pIdx) => (
                        React.createElement('button', {
                          key: pIdx,
                          type: "button",
                          onClick: () => setEditingClientDoc({ ...editingClientDoc, pdfPrimaryColor: pal.primary, pdfSecondaryColor: pal.secondary }),
                          className: "px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-200 rounded-lg text-[10px] font-bold text-gray-800 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10879}}

                          , React.createElement('span', { className: "w-2.5 h-2.5 rounded-full inline-block"   , style: { background: pal.primary }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10885}})
                          , pal.name
                        )
                      ))
                    )
                  )
                )

                /* STEP 3: WATERMARK STAMP & BACKGROUND BRANDING */
                , React.createElement('div', { className: "bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10894}}
                  , React.createElement('div', { className: "flex justify-between items-center border-b border-amber-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10895}}
                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10896}}
                      , React.createElement(Stamp, { className: "w-4 h-4 text-amber-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10897}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-amber-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10898}}, "Step 3. Watermark Stamp & Background Branding"      )
                    )
                    , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10900}}
                      , React.createElement('button', {
                        type: "button",
                        onClick: () => setEditingClientDoc({
                          ...editingClientDoc,
                          showWatermark: true,
                          companyWatermarkText: editingClientDoc.companyName || "SPESHWAY SOLUTIONS PRIVATE LIMITED",
                          companyWatermarkUrl: "",
                          companyWatermarkOpacity: 0.08,
                          companyWatermarkRotation: -15,
                          companyWatermarkSize: 26,
                          companyWatermarkImgSize: 220
                        }),
                        className: "text-[10px] text-amber-700 hover:text-amber-950 font-bold underline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10901}}
, "Reset Defaults"

                      )
                      , React.createElement('label', { className: "flex items-center gap-1.5 cursor-pointer font-bold text-xs text-amber-900"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10917}}
                        , React.createElement('input', {
                          type: "checkbox",
                          checked: editingClientDoc.showWatermark,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, showWatermark: e.target.checked }),
                          className: "w-4 h-4 rounded text-amber-600 accent-amber-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10918}}
                        ), "Enable Watermark"

                      )
                    )
                  )

                  , editingClientDoc.showWatermark && (
                    React.createElement('div', { className: "space-y-3 bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10930}}
                      , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10931}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10932}}
                          , React.createElement('label', { className: "font-extrabold text-[11px] text-gray-800 block mb-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10933}}, "Watermark Text" )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.companyWatermarkText,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkText: e.target.value }),
                            placeholder: "e.g. SPESHWAY SOLUTIONS PRIVATE LIMITED"    ,
                            className: "w-full h-10 px-3 border border-gray-300 rounded-xl font-extrabold uppercase text-[11px] text-[#071E34] focus:outline-none focus:ring-2 focus:ring-amber-300"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10934}}
                          )
                        )

                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10943}}
                          , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10944}}
                            , React.createElement('label', { className: "font-extrabold text-[11px] text-gray-800 block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10945}}, "Watermark Image Stamp"  )
                            , editingClientDoc.companyWatermarkUrl && (
                              React.createElement('button', {
                                type: "button",
                                onClick: () => setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: "" }),
                                className: "text-[10px] text-red-600 hover:underline font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10947}}
, "Clear Image"

                              )
                            )
                          )
                          , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10956}}
                            , React.createElement('label', { className: "h-10 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shrink-0 flex items-center"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10957}}, "Upload Image"

                              , React.createElement('input', {
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: (e) => {
                                  const file = _optionalChain([e, 'access', _688 => _688.target, 'access', _689 => _689.files, 'optionalAccess', _690 => _690[0]]);
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (_optionalChain([ev, 'access', _691 => _691.target, 'optionalAccess', _692 => _692.result])) {
                                        setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: ev.target.result  });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 10959}}
                              )
                            )
                            , React.createElement('input', {
                              type: "text",
                              placeholder: "Image URL..." ,
                              value: editingClientDoc.companyWatermarkUrl,
                              onChange: e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkUrl: e.target.value }),
                              className: "w-full h-10 px-3 border border-gray-300 rounded-xl text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10977}}
                            )
                          )
                        )
                      )

                      , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10988}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 10989}}
                          , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10990}}
                            , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10991}}, "Opacity:")
                            , React.createElement('span', { className: "font-mono font-extrabold text-amber-800"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10992}}, Math.round((editingClientDoc.companyWatermarkOpacity || 0.08) * 100), "%")
                          )
                          , React.createElement('input', {
                            type: "range",
                            min: "0.02",
                            max: "0.40",
                            step: "0.01",
                            value: editingClientDoc.companyWatermarkOpacity || 0.08,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkOpacity: Number(e.target.value) }),
                            className: "w-full h-2 cursor-pointer accent-amber-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 10994}}
                          )
                        )

                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11005}}
                          , React.createElement('div', { className: "flex justify-between items-center mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11006}}
                            , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11007}}, "Text Size:" )
                            , React.createElement('span', { className: "font-mono font-extrabold text-amber-800"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11008}}, editingClientDoc.companyWatermarkSize || 26, "px")
                          )
                          , React.createElement('input', {
                            type: "range",
                            min: "14",
                            max: "140",
                            step: "2",
                            value: editingClientDoc.companyWatermarkSize || 26,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, companyWatermarkSize: Number(e.target.value) }),
                            className: "w-full h-2 cursor-pointer accent-amber-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11010}}
                          )
                        )
                      )
                    )
                  )
                )

                /* STEP 4: DOCUMENT & CLIENT INFORMATION */
                , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11026}}
                  , React.createElement('div', { className: "flex items-center gap-2 border-b border-slate-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11027}}
                    , React.createElement(FileText, { className: "w-4 h-4 text-slate-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11028}} )
                    , React.createElement('h4', { className: "font-extrabold text-xs text-slate-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11029}}, "Step 4. Document Reference & Client Information"      )
                  )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11031}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11032}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11033}}, "Document Reference Number *"   )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.refNumber,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, refNumber: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11034}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11042}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11043}}, "Issue Date *"  )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.issueDate,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, issueDate: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11044}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11052}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11053}}, "Client Business / Person Name *"     )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.clientName,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, clientName: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11054}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11062}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11063}}, "Client Email Address *"   )
                      , React.createElement('input', {
                        type: "email",
                        required: true,
                        value: editingClientDoc.clientEmail,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, clientEmail: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11064}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11072}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11073}}, "Product Title / Main Scope *"     )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.productName,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, productName: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11074}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11082}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11083}}, "Project Category / Type *"    )
                      , React.createElement('input', {
                        type: "text",
                        required: true,
                        value: editingClientDoc.category,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, category: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-[#071E34] bg-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11084}}
                      )
                    )
                  )
                )

                /* STEP 5: SERVICE AGREEMENT TERMS & FINANCIAL MILESTONES (AGREEMENT ONLY) */
                , editingClientDoc.type === "agreement" && (
                  React.createElement('div', { className: "bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 p-4 rounded-2xl border border-purple-200 space-y-3 shadow-xs"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11097}}
                    , React.createElement('div', { className: "flex items-center gap-2 border-b border-purple-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11098}}
                      , React.createElement(FileText, { className: "w-4 h-4 text-purple-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11099}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-purple-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11100}}, "Step 5. Service Agreement Terms, Scope & Financial Milestones"        )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11103}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11104}}, "Agreement Duration / Timeline *"    )
                      , React.createElement('input', {
                        type: "text",
                        value: editingClientDoc.duration || "one (1) month",
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, duration: e.target.value }),
                        placeholder: "e.g. one (1) month"   ,
                        className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-gray-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11105}}
                      )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11114}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11115}}, "Total Project Budget Rate (₹) *"     )
                      , React.createElement('input', {
                        type: "number",
                        value: editingClientDoc.rate || 80000,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, rate: Number(e.target.value) }),
                        className: "w-full p-2.5 border border-purple-300 rounded-xl font-mono font-extrabold text-xs text-purple-900 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11116}}
                      )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11124}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11125}}, "Scope of Work Overview Narrative"    )
                      , React.createElement('textarea', {
                        rows: 3,
                        value: editingClientDoc.overviewNarrative,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, overviewNarrative: e.target.value }),
                        className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11126}}
                      )
                    )

                    , React.createElement('div', { className: "grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-purple-100"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11134}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11135}}
                        , React.createElement('label', { className: "font-extrabold text-[10px] text-gray-700 block mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11136}}, "Advance Stage (%)"  )
                        , React.createElement('input', {
                          type: "number",
                          value: editingClientDoc.m1Pct !== undefined ? editingClientDoc.m1Pct : 40,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, m1Pct: Number(e.target.value) }),
                          className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11137}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11144}}
                        , React.createElement('label', { className: "font-extrabold text-[10px] text-gray-700 block mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11145}}, "Beta Stage (%)"  )
                        , React.createElement('input', {
                          type: "number",
                          value: editingClientDoc.m2Pct !== undefined ? editingClientDoc.m2Pct : 40,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, m2Pct: Number(e.target.value) }),
                          className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11146}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11153}}
                        , React.createElement('label', { className: "font-extrabold text-[10px] text-gray-700 block mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11154}}, "Delivery Stage (%)"  )
                        , React.createElement('input', {
                          type: "number",
                          value: editingClientDoc.m3Pct !== undefined ? editingClientDoc.m3Pct : 20,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, m3Pct: Number(e.target.value) }),
                          className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-mono font-bold text-purple-800"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11155}}
                        )
                      )
                    )

                    /* SECTION 1 SUBSECTIONS */
                    , React.createElement('div', { className: "space-y-3 pt-2 border-t border-purple-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11165}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11166}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11167}}, "Subsection 1.1 Title"  )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.sec1Subsection1Title || "1.1 User Mobile Application (Android & iOS)",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection1Title: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 bg-white mb-1.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11168}}
                        )
                        , React.createElement('label', { className: "font-bold text-gray-700 block text-[11px] mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11174}}, "Subsection 1.1 Bullet Points (Line per item)"      )
                        , React.createElement('textarea', {
                          rows: 4,
                          value: editingClientDoc.sec1Subsection1BulletText !== undefined ? editingClientDoc.sec1Subsection1BulletText : `Authentication: Secure registration and login for academy members.\nSlot Booking (External): Deep-linking functionality to open third-party apps for slot bookings.\nTeam Matching: Feature to match users with other players/teams.\nCoupon Codes & Payments: Integration for applying coupons and a payment gateway.\nProfile Management: User personal details and history.`,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection1BulletText: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11175}}
                        )
                      )

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11183}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11184}}, "Subsection 1.2 Title"  )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.sec1Subsection2Title || "1.2 Admin Web Panel",
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection2Title: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 bg-white mb-1.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11185}}
                        )
                        , React.createElement('label', { className: "font-bold text-gray-700 block text-[11px] mb-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11191}}, "Subsection 1.2 Bullet Points (Line per item)"      )
                        , React.createElement('textarea', {
                          rows: 4,
                          value: editingClientDoc.sec1Subsection2BulletText !== undefined ? editingClientDoc.sec1Subsection2BulletText : `Dashboard: Real-time overview of active bookings and user activity.\nSlot & Capacity Management: Configuration of available hours and maximum members.\nSubscription Management: Tools to manage memberships, tiers, and renewals.\nModeration: Management of users and overview of social sessions.`,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec1Subsection2BulletText: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11192}}
                        )
                      )
                    )

                    /* SECTION 4: RESPONSIBILITIES */
                    , React.createElement('div', { className: "space-y-3 pt-2 border-t border-purple-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11202}}
                      , React.createElement('h5', { className: "font-extrabold text-xs text-purple-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11203}}, "Responsibilities of Company & Client"    )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11204}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11205}}, "Company Responsibilities (Bullets)"  )
                        , React.createElement('textarea', {
                          rows: 4,
                          value: editingClientDoc.sec4Subsection1BulletText !== undefined ? editingClientDoc.sec4Subsection1BulletText : `Custom Development: End-to-end coding of the mobile application and admin dashboard.\nUI/UX Design: Professional interface design focused on usability.\nBackend Engineering: Robust API development and database architecture.\nDeployment Support: Assistance in hosting and publishing to app stores.\nWarranty: Inclusion of 3 months post-deployment technical support for bug fixes.`,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec4Subsection1BulletText: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11206}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11213}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11214}}, "Client Responsibilities (Bullets)"  )
                        , React.createElement('textarea', {
                          rows: 4,
                          value: editingClientDoc.sec4Subsection2BulletText !== undefined ? editingClientDoc.sec4Subsection2BulletText : `Assets & Media: Provision of high-resolution logos, images, and branding guidelines.\nThird-Party Credentials: Provision of API keys for payment gateways, SMS services, and developer accounts.\nTimely Review: Feedback on design mockups and staging deployments within 48 hours.`,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec4Subsection2BulletText: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11215}}
                        )
                      )
                    )

                    /* SECTIONS 5-10: LEGAL TERMS & CLAUSES */
                    , React.createElement('div', { className: "space-y-3 pt-2 border-t border-purple-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11225}}
                      , React.createElement('h5', { className: "font-extrabold text-xs text-purple-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11226}}, "Legal Terms & Contract Clauses"    )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11227}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11228}}, "5.1 Intellectual Property Clause"   )
                        , React.createElement('textarea', {
                          rows: 3,
                          value: editingClientDoc.sec5Subsection1Content || 'Upon full and final payment of the total budget, the source code and assets specifically developed for this project shall be transferred to the Client. The Company retains the right to use underlying generic libraries and frameworks.',
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec5Subsection1Content: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11229}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11236}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11237}}, "5.2 Confidentiality Clause"  )
                        , React.createElement('textarea', {
                          rows: 2,
                          value: editingClientDoc.sec5Subsection2Content || 'Both parties agree to protect and keep confidential any proprietary information, business data, or technical secrets disclosed during the project.',
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec5Subsection2Content: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11238}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11245}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11246}}, "6. Termination Clause"  )
                        , React.createElement('textarea', {
                          rows: 2,
                          value: editingClientDoc.sec6Content || 'Either party may terminate this Agreement with 7 days written notice. In the event of termination, the Client shall pay for all work completed up to the termination date. If the Company terminates without cause, it shall return any unearned advance payments.',
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec6Content: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11247}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11254}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11255}}, "7. Dispute Resolution Clause"   )
                        , React.createElement('textarea', {
                          rows: 2,
                          value: editingClientDoc.sec7Content || 'Any disputes arising out of this Agreement shall first be resolved through good-faith negotiations. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, India.',
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec7Content: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11256}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11263}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11264}}, "8. Force Majeure Clause"   )
                        , React.createElement('textarea', {
                          rows: 2,
                          value: editingClientDoc.sec8Content || 'Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including but not limited to natural disasters, government restrictions, or widespread internet outages.',
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec8Content: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11265}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11272}}
                        , React.createElement('label', { className: "font-bold text-gray-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11273}}, "10. Terms & Exclusions Bullets"    )
                        , React.createElement('textarea', {
                          rows: 3,
                          value: editingClientDoc.sec10BulletText || `Third-Party Fees: Costs for Play Store ($25), Apple Store ($99), and Cloud Hosting are not included in the budget.\nContent Entry: Uploading extensive historical marketing data is excluded.\nStandard Tech Stack: Development will follow standard modern frameworks suitable for mobile and web.`,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, sec10BulletText: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11274}}
                        )
                      )
                    )
                  )
                )

                /* STEP 5: SECTION 1 - EXECUTIVE SUMMARY & OVERVIEW NARRATIVE (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11287}}
                    , React.createElement('div', { className: "flex items-center gap-2 border-b border-blue-200 pb-2 mb-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11288}}
                      , React.createElement(FileCode, { className: "w-4 h-4 text-blue-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11289}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-blue-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11290}}, "Step 5. PDF Section 1: Executive Summary & Overview Narrative"         )
                    )
                    , React.createElement('textarea', {
                      rows: 3,
                      value: editingClientDoc.overviewNarrative,
                      onChange: e => setEditingClientDoc({ ...editingClientDoc, overviewNarrative: e.target.value }),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11292}}
                    )
                  )
                )

                /* STEP 6: SECTION 2 - USER ROLES & ECOSYSTEM NARRATIVE (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11303}}
                    , React.createElement('div', { className: "flex items-center gap-2 border-b border-indigo-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11304}}
                      , React.createElement(Users, { className: "w-4 h-4 text-indigo-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11305}} )
                      , React.createElement('h4', { className: "font-extrabold text-xs text-indigo-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11306}}, "Step 6. PDF Section 2: Ecosystem User Roles Narrative"        )
                    )
                    , React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11308}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11309}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11310}}, "Customer / End User Role"    )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.customerDesc,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, customerDesc: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11311}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11318}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11319}}, "Merchant / Vendor Role"   )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.merchantDesc,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, merchantDesc: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11320}}
                        )
                      )
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11327}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11328}}, "Admin Platform Owner Role"   )
                        , React.createElement('input', {
                          type: "text",
                          value: editingClientDoc.adminDesc,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, adminDesc: e.target.value }),
                          className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11329}}
                        )
                      )
                    )
                  )
                )

                /* STEP 7: SECTION 3 - PROJECT FEATURES & SCOPE DELIVERABLES (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "bg-purple-50/50 p-4 rounded-2xl border border-purple-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11342}}
                    , React.createElement('div', { className: "flex justify-between items-center border-b border-purple-200 pb-2 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11343}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11344}}
                        , React.createElement(Sparkles, { className: "w-4 h-4 text-purple-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11345}} )
                        , React.createElement('h4', { className: "font-extrabold text-xs text-purple-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11346}}, "Step 7. PDF Section 3: Project Features & Scope Deliverables ("          , _optionalChain([editingClientDoc, 'access', _693 => _693.customFeatures, 'optionalAccess', _694 => _694.length]) || 0, ")")
                      )
                      , React.createElement('button', {
                        type: "button",
                        onClick: () => setEditingClientDoc({
                          ...editingClientDoc,
                          customFeatures: [...(editingClientDoc.customFeatures || []), { title: "New Custom Feature", description: "Detailed feature description and scope specification." }]
                        }),
                        className: "px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-200 ease-out shadow-xs cursor-pointer"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11348}}

                        , React.createElement(Plus, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11356}} ), " Add Feature Item"
                      )
                    )

                    , React.createElement('div', { className: "space-y-2.5 max-h-[220px] overflow-y-auto pr-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11360}}
                      , (editingClientDoc.customFeatures || []).map((feat, idx) => (
                        React.createElement('div', { key: idx, className: "p-3 bg-white rounded-xl border border-purple-200 flex flex-col gap-2 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11362}}
                          , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11363}}
                            , React.createElement('span', { className: "text-[10px] font-mono font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11364}}, "Feature #" , idx + 1)
                            , React.createElement('button', {
                              type: "button",
                              onClick: () => setEditingClientDoc({
                                ...editingClientDoc,
                                customFeatures: editingClientDoc.customFeatures.filter((_, i) => i !== idx)
                              }),
                              className: "text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11365}}

                              , React.createElement(Trash2, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11373}} )
                            )
                          )
                          , React.createElement('input', {
                            type: "text",
                            placeholder: "Feature Title" ,
                            value: feat.title,
                            onChange: e => {
                              const updatedFeats = [...editingClientDoc.customFeatures];
                              updatedFeats[idx].title = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, customFeatures: updatedFeats });
                            },
                            className: "w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 focus:border-purple-500 focus:outline-none"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11376}}
                          )
                          , React.createElement('input', {
                            type: "text",
                            placeholder: "Feature Details & Scope Description"    ,
                            value: feat.description,
                            onChange: e => {
                              const updatedFeats = [...editingClientDoc.customFeatures];
                              updatedFeats[idx].description = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, customFeatures: updatedFeats });
                            },
                            className: "w-full p-2 border border-gray-200 rounded-lg text-xs text-gray-700 focus:border-purple-500 focus:outline-none"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11387}}
                          )
                        )
                      ))
                    )
                  )
                )

                /* STEP 8: SECTION 4 - COMMERCIAL INVESTMENT PLANS CARDS (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3 shadow-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11406}}
                    , React.createElement('div', { className: "flex items-center justify-between border-b border-emerald-200 pb-2 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11407}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11408}}
                        , React.createElement(Layers, { className: "w-4 h-4 text-emerald-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11409}} )
                        , React.createElement('h4', { className: "font-extrabold text-xs text-emerald-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11410}}, "Step 8. PDF Section 4: Commercial Investment Plans Cards"        )
                      )
                      , React.createElement('label', { className: "flex items-center gap-1.5 cursor-pointer font-bold text-xs text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11412}}
                        , React.createElement('input', {
                          type: "checkbox",
                          checked: editingClientDoc.includePlanB !== false,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, includePlanB: e.target.checked }),
                          className: "w-4 h-4 rounded text-emerald-600 accent-emerald-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11413}}
                        ), "Enable Dual-Plan Comparison (Plan A vs Plan B)"

                      )
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11423}}
                      , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11424}}, "Section 4 Subtitle / Engagement Description"     )
                      , React.createElement('input', {
                        type: "text",
                        value: editingClientDoc.sec4Subtitle || "Two engagement options are proposed based on platform reach. Both plans deliver the complete feature set listed in Section 3.",
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, sec4Subtitle: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11425}}
                      )
                    )

                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11433}}
                      /* PLAN A CARD */
                      , React.createElement('div', { className: "p-3 bg-white rounded-xl border border-emerald-200 space-y-2 shadow-2xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11435}}
                        , React.createElement('span', { className: "text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11436}}, "Plan A Card Details"   )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11437}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11438}}, "Plan A Package Title"   )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.planAName || "Standard App Package",
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, planAName: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11439}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11446}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11447}}, "Plan A Price Rate (₹)"    )
                          , React.createElement('input', {
                            type: "number",
                            value: editingClientDoc.rate,
                            onChange: e => {
                              const r = Number(e.target.value);
                              const t = Number(editingClientDoc.taxPct || 0);
                              const tot = Math.round(r * (1 + t / 100));
                              setEditingClientDoc({ ...editingClientDoc, rate: r, totalDue: tot });
                            },
                            className: "w-full p-2 border border-emerald-300 rounded-lg font-mono font-extrabold text-xs text-emerald-800 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11448}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11460}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11461}}, "Plan A Bullet Highlights (Line per item)"      )
                          , React.createElement('textarea', {
                            rows: 5,
                            value: editingClientDoc.planAHighlights,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, planAHighlights: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11462}}
                          )
                        )
                      )

                      /* PLAN B CARD */
                      , editingClientDoc.includePlanB !== false ? (
                        React.createElement('div', { className: "p-3 bg-white rounded-xl border border-purple-200 space-y-2 shadow-2xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11473}}
                          , React.createElement('span', { className: "text-[10px] font-extrabold uppercase tracking-wider text-purple-800 block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11474}}, "Plan B Card Details"   )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11475}}
                            , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11476}}, "Plan B Package Title"   )
                            , React.createElement('input', {
                              type: "text",
                              value: editingClientDoc.planBName || "Enterprise Premium Package",
                              onChange: e => setEditingClientDoc({ ...editingClientDoc, planBName: e.target.value }),
                              className: "w-full p-2 border border-gray-300 rounded-lg font-bold text-xs text-gray-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11477}}
                            )
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11484}}
                            , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11485}}, "Plan B Price Rate (₹)"    )
                            , React.createElement('input', {
                              type: "number",
                              value: editingClientDoc.planBPrice,
                              onChange: e => setEditingClientDoc({ ...editingClientDoc, planBPrice: Number(e.target.value) }),
                              className: "w-full p-2 border border-purple-300 rounded-lg font-mono font-extrabold text-xs text-purple-800 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11486}}
                            )
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11493}}
                            , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11494}}, "Plan B Bullet Highlights (Line per item)"      )
                            , React.createElement('textarea', {
                              rows: 5,
                              value: editingClientDoc.planBHighlights,
                              onChange: e => setEditingClientDoc({ ...editingClientDoc, planBHighlights: e.target.value }),
                              className: "w-full p-2 border border-gray-300 rounded-lg text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11495}}
                            )
                          )
                        )
                      ) : (
                        React.createElement('div', { className: "p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col justify-center items-center text-center text-gray-400 text-xs"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11504}}
                          , React.createElement('span', { className: "font-bold text-gray-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11505}}, "Plan B is Hidden"   )
                          , React.createElement('span', { className: "text-[10px] text-gray-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11506}}, "Check box above to compare Plan A & Plan B"         )
                        )
                      )
                    )
                  )
                )

                /* STEP 9: SECTION 5 - PLAN COMPARISON MATRIX TABLE (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-3 shadow-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11515}}
                    , React.createElement('div', { className: "flex justify-between items-center border-b border-teal-200 pb-2 flex-wrap gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11516}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11517}}
                        , React.createElement(Columns, { className: "w-4 h-4 text-teal-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11518}} )
                        , React.createElement('h4', { className: "font-extrabold text-xs text-teal-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11519}}, "Step 9. PDF Section 5: Plan Comparison Matrix Table ("         , _optionalChain([editingClientDoc, 'access', _695 => _695.planComparisonItems, 'optionalAccess', _696 => _696.length]) || 0, " Deliverables)" )
                      )
                      , React.createElement('button', {
                        type: "button",
                        onClick: () => setEditingClientDoc({
                          ...editingClientDoc,
                          planComparisonItems: [
                            ...(editingClientDoc.planComparisonItems || []),
                            { deliverable: "New Deliverable Scope Item", planA: true, planB: true }
                          ]
                        }),
                        className: "px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11521}}

                        , React.createElement(Plus, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11532}} ), " Add Comparison Row"
                      )
                    )

                    , React.createElement('div', { className: "space-y-2 max-h-[260px] overflow-y-auto pr-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11536}}
                      , (editingClientDoc.planComparisonItems || []).map((row, idx) => (
                        React.createElement('div', { key: idx, className: "p-2.5 bg-white rounded-xl border border-teal-200 flex items-center gap-3 shadow-2xs"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11538}}
                          , React.createElement('input', {
                            type: "text",
                            placeholder: "Deliverable Name (e.g. Android & iOS Mobile Apps)"       ,
                            value: row.deliverable,
                            onChange: e => {
                              const updated = [...(editingClientDoc.planComparisonItems || [])];
                              updated[idx].deliverable = e.target.value;
                              setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                            },
                            className: "flex-1 p-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11539}}
                          )
                          , React.createElement('div', { className: "flex items-center gap-3 shrink-0 bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-200"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11550}}
                            , React.createElement('label', { className: "flex items-center gap-1 cursor-pointer text-xs font-bold text-emerald-800"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11551}}
                              , React.createElement('input', {
                                type: "checkbox",
                                checked: row.planA !== false,
                                onChange: e => {
                                  const updated = [...(editingClientDoc.planComparisonItems || [])];
                                  updated[idx].planA = e.target.checked;
                                  setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                                },
                                className: "w-3.5 h-3.5 rounded text-emerald-600 accent-emerald-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11552}}
                              ), "Plan A"

                            )

                            , editingClientDoc.includePlanB !== false && (
                              React.createElement('label', { className: "flex items-center gap-1 cursor-pointer text-xs font-bold text-purple-800"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11566}}
                                , React.createElement('input', {
                                  type: "checkbox",
                                  checked: row.planB !== false,
                                  onChange: e => {
                                    const updated = [...(editingClientDoc.planComparisonItems || [])];
                                    updated[idx].planB = e.target.checked;
                                    setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                                  },
                                  className: "w-3.5 h-3.5 rounded text-purple-600 accent-purple-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11567}}
                                ), "Plan B"

                              )
                            )
                          )
                          , React.createElement('button', {
                            type: "button",
                            onClick: () => {
                              const updated = editingClientDoc.planComparisonItems.filter((_, i) => i !== idx);
                              setEditingClientDoc({ ...editingClientDoc, planComparisonItems: updated });
                            },
                            className: "text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg cursor-pointer"     ,
                            title: "Delete row" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11581}}

                            , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11590}} )
                          )
                        )
                      ))
                    )
                  )
                )

                /* STEP 10: SECTIONS 6, 7 & 8 - TERMS, INCLUSIONS & EXCLUSIONS (QUOTATION ONLY) */
                , editingClientDoc.type === "quotation" && (
                  React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11600}}
                  , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11601}}
                    , React.createElement('label', { className: "font-bold text-slate-800 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11602}}, "Step 10. PDF Section 6: Payment Terms Notes"       )
                    , React.createElement('textarea', {
                      rows: 2,
                      value: editingClientDoc.paymentTerms,
                      onChange: e => setEditingClientDoc({ ...editingClientDoc, paymentTerms: e.target.value }),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11603}}
                    )
                  )

                  , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11611}}
                    , React.createElement('label', { className: "font-bold text-slate-800 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11612}}, "PDF Section 7: General Terms & Legal Conditions (Line per rule)"          )
                    , React.createElement('textarea', {
                      rows: 4,
                      value: editingClientDoc.termsAndConditions,
                      onChange: e => setEditingClientDoc({ ...editingClientDoc, termsAndConditions: e.target.value }),
                      className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11613}}
                    )
                  )

                  , React.createElement('div', { className: "grid grid-cols-2 gap-3 bg-purple-50/60 p-4 rounded-2xl border border-purple-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11621}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11622}}
                      , React.createElement('label', { className: "font-bold text-emerald-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11623}}, "PDF Section 8: ✓ Scope Inclusions"     )
                      , React.createElement('textarea', {
                        rows: 4,
                        value: editingClientDoc.inclusions,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, inclusions: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11624}}
                      )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11631}}
                      , React.createElement('label', { className: "font-bold text-rose-800 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11632}}, "PDF Section 8: ✖ Scope Exclusions"     )
                      , React.createElement('textarea', {
                        rows: 4,
                        value: editingClientDoc.exclusions,
                        onChange: e => setEditingClientDoc({ ...editingClientDoc, exclusions: e.target.value }),
                        className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-sans text-gray-800 resize-none bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11633}}
                      )
                    )
                  )
                  )
                )

                /* STEP 11: INVOICE LINE ITEM SCOPE & REMITTANCE BANK DETAILS (INVOICE ONLY) */
                , editingClientDoc.type === "invoice" && (
                  React.createElement(React.Fragment, null
                    , React.createElement('div', { className: "bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11647}}
                      , React.createElement('div', { className: "flex items-center gap-2 border-b border-blue-200 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11648}}
                        , React.createElement(FileText, { className: "w-4 h-4 text-blue-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11649}} )
                        , React.createElement('h4', { className: "font-extrabold text-xs text-blue-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11650}}, "Step 11. Invoice Line Item Description"     )
                      )
                      , React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 11652}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11653}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11654}}, "Main Invoice Line Item Description"    )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.invoiceDescription,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, invoiceDescription: e.target.value }),
                            className: "w-full p-2.5 border border-gray-300 rounded-xl font-bold text-xs text-gray-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11655}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11662}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11663}}, "Invoice Sub-description Narrative"  )
                          , React.createElement('textarea', {
                            rows: 2,
                            value: editingClientDoc.invoiceSubdesc,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, invoiceSubdesc: e.target.value }),
                            className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11664}}
                          )
                        )
                      )
                    )

                    , React.createElement('div', { className: "bg-slate-100 p-4 rounded-2xl border border-slate-300 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11674}}
                      , React.createElement('div', { className: "flex items-center gap-2 border-b border-slate-300 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11675}}
                        , React.createElement(CreditCard, { className: "w-4 h-4 text-slate-800"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11676}} )
                        , React.createElement('h4', { className: "font-extrabold text-xs text-slate-950 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11677}}, "Bank Account Remittance Details"   )
                      )
                      , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11679}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11680}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11681}}, "Account Holder Name"  )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.accountName,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, accountName: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11682}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11689}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11690}}, "Bank Account Number"  )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.accountNumber,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, accountNumber: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-slate-900 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11691}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11698}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11699}}, "Bank IFSC Code"  )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.ifscCode,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, ifscCode: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-mono font-bold text-slate-900 bg-white"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11700}}
                          )
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11707}}
                          , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11708}}, "Bank Branch" )
                          , React.createElement('input', {
                            type: "text",
                            value: editingClientDoc.branch,
                            onChange: e => setEditingClientDoc({ ...editingClientDoc, branch: e.target.value }),
                            className: "w-full p-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-900 bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11709}}
                          )
                        )
                      )
                    )

                    /* FINANCIALS & TAX SUMMARY FOR INVOICE */
                    , React.createElement('div', { className: "grid grid-cols-3 gap-3 bg-teal-50/50 p-3.5 rounded-2xl border border-teal-100"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11720}}
                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11721}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11722}}, "Base Rate (₹) *"   )
                        , React.createElement('input', {
                          type: "number",
                          required: true,
                          value: editingClientDoc.rate,
                          onChange: e => {
                            const valStr = e.target.value;
                            const r = valStr === "" ? ("" ) : Number(valStr);
                            const t = Number(editingClientDoc.taxPct || 0);
                            const numR = typeof r === "number" ? r : 0;
                            const tot = Math.round(numR * (1 + t / 100));
                            setEditingClientDoc({ ...editingClientDoc, rate: r, totalDue: tot });
                          },
                          className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11723}}
                        )
                      )

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11739}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11740}}, "GST Tax % *"   )
                        , React.createElement('input', {
                          type: "number",
                          required: true,
                          value: editingClientDoc.taxPct,
                          onChange: e => {
                            const t = Number(e.target.value);
                            const r = editingClientDoc.rate;
                            const tot = Math.round(r * (1 + t / 100));
                            setEditingClientDoc({ ...editingClientDoc, taxPct: t, totalDue: tot });
                          },
                          className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono font-bold text-[#071E34] bg-white"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11741}}
                        )
                      )

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11755}}
                        , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11756}}, "Total Due (₹)"  )
                        , React.createElement('input', {
                          type: "number",
                          required: true,
                          value: editingClientDoc.totalDue,
                          onChange: e => setEditingClientDoc({ ...editingClientDoc, totalDue: Number(e.target.value) }),
                          className: "w-full p-2.5 border border-teal-200 bg-white rounded-xl font-mono font-extrabold text-[#0E9F8A]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11757}}
                        )
                      )
                    )
                  )
                )
              )

              /* RIGHT COLUMN: REAL-TIME INTERACTIVE LIVE PDF PREVIEW (lg:col-span-7) */
              , React.createElement('div', { className: "lg:col-span-7 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl flex flex-col min-h-0"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11771}}
                , React.createElement('div', { className: "flex justify-between items-center pb-2.5 border-b border-slate-800 text-white shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11772}}
                  , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11773}}
                    , React.createElement(Eye, { className: "w-4 h-4 text-teal-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11774}} )
                    , React.createElement('span', { className: "font-extrabold text-xs text-slate-200 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11775}}, "Real-Time PDF Live Preview"   )
                    , React.createElement('span', { className: "text-[10px] font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold border border-teal-500/30"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11776}}, "Live Sync" )
                  )
                  , React.createElement('span', { className: "text-[10px] text-slate-400 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11778}}, "Updates automatically as you type"    )
                )
                , React.createElement('div', { className: "flex-1 min-h-0 mt-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11780}}
                  , React.createElement('iframe', {
                    srcDoc: liveStudioPreviewHtml,
                    className: "w-full h-full border-none bg-slate-950"   ,
                    title: "Realtime PDF Live Studio Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11781}}
                  )
                )
              )
            )
          )
        );
      })()
      , clientEmailModal && (
        React.createElement('div', { className: "fixed inset-0 z-[10000] flex items-start justify-center bg-[#071E34]/50 backdrop-blur-sm p-4 pt-6 sm:pt-10 overflow-y-auto"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11793}}
          , React.createElement('div', { className: "w-full max-w-lg max-h-[calc(100vh-3rem)] bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200 overflow-y-auto"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11794}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-150 pb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11795}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11796}}
                , React.createElement(Mail, { className: "w-5 h-5 text-[#0E9F8A]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11797}} )
                , React.createElement('h3', { className: "font-extrabold text-base text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11798}}, "Send PDF Document to Client"    )
              )
              , React.createElement('button', {
                onClick: () => setClientEmailModal(null),
                className: "text-gray-400 hover:text-gray-700 text-xl font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11800}}
, "×"

              )
            )

            , React.createElement('div', { className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11808}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11809}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11810}}, "Recipient Email Address *"   )
                , React.createElement('input', {
                  type: "email",
                  required: true,
                  value: clientEmailModal.toEmail,
                  onChange: e => setClientEmailModal(prev => prev ? { ...prev, toEmail: e.target.value } : null),
                  className: "w-full p-2.5 border border-gray-300 rounded-xl font-mono text-xs font-bold text-[#071E34] bg-gray-50 focus:bg-white"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11811}}
                )
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11820}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11821}}, "Email Subject *"  )
                , React.createElement('input', {
                  type: "text",
                  required: true,
                  value: clientEmailModal.subject,
                  onChange: e => setClientEmailModal(prev => prev ? { ...prev, subject: e.target.value } : null),
                  className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-[#071E34]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11822}}
                )
              )

              /* ATTACHMENT NOTICE PILL */
              , React.createElement('div', { className: "p-3 bg-teal-50/80 border border-teal-200 rounded-xl flex items-center gap-2"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11832}}
                , React.createElement(Paperclip, { size: 16, className: "text-teal-600 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11833}} )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11834}}
                  , React.createElement('span', { className: "font-extrabold text-blue-900 text-xs block"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11835}}, "Attached PDF Document"  )
                  , React.createElement('span', { className: "text-[10px] text-teal-700 font-mono font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11836}}, clientEmailModal.fileName, " (Direct PDF Attachment)"   )
                )
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11840}}
                , React.createElement('label', { className: "font-bold text-gray-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11841}}, "Email Body Message"  )
                , React.createElement('textarea', {
                  rows: 4,
                  value: clientEmailModal.textContent,
                  onChange: e => setClientEmailModal(prev => prev ? { ...prev, textContent: e.target.value } : null),
                  className: "w-full p-2.5 border border-gray-300 rounded-xl text-xs text-gray-800 resize-none font-sans"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11842}}
                )
              )
            )

            , React.createElement('div', { className: "flex justify-between items-center pt-2 border-t border-gray-150"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11851}}
              , React.createElement('button', {
                onClick: () => setClientEmailModal(null),
                className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11852}}
, "Cancel"

              )

              , React.createElement('button', {
                onClick: handleSendEmailPdfAttachment,
                disabled: clientEmailModal.isSending,
                className: "px-5 py-2.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all duration-200 ease-out"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11859}}

                , React.createElement(Mail, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11864}} ), " " , clientEmailModal.isSending ? "Dispatching PDF Email..." : "Send Email (PDF Attached)"
              )
            )
          )
        )
      )

      /* 15. Modal: Assign / Select Project */
      , showAssignProjectModal && activeClientDetail && (
        React.createElement('div', { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-[#071E34]/55 backdrop-blur-sm p-4 overflow-y-auto"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11873}}
          , React.createElement('div', { className: "w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 my-auto max-h-[min(88vh,780px)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"                 , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11874}}
            , React.createElement('div', { className: "flex shrink-0 justify-between items-center border-b border-gray-150 pb-3"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11875}}
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11876}}
                , React.createElement(FolderOpen, { className: "w-5 h-5 text-[#0E9F8A]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11877}} )
                , React.createElement('h3', { className: "font-extrabold text-base text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11878}}, "Assign / Select Project Workspace for "      , activeClientDetail.name)
              )
              , React.createElement('button', {
                onClick: () => setShowAssignProjectModal(false),
                className: "text-gray-400 hover:text-gray-700 text-xl font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11880}}
, "×"

              )
            )

            , React.createElement('p', { className: "shrink-0 text-xs text-gray-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11888}}, "Select any project from all available projects below to open its specific proposals, quotations, and tax invoices:"

            )

            , React.createElement('div', { className: "grid grid-cols-1 gap-3 overflow-y-auto pr-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11892}}
              , (() => {
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
                    React.createElement('div', {
                      key: p.id,
                      onClick: () => {
                        setSelectedClientProjectId(p.id);
                        setSelectedProposalId(null);
                        setShowAssignProjectModal(false);
                      },
                      className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 ease-out flex justify-between items-center ${
                        isSelected 
                          ? "bg-teal-50 border-[#0E9F8A] shadow-sm" 
                          : "bg-gray-50 border-gray-200 hover:border-teal-200 hover:bg-gray-100"
                      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11915}}

                      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11928}}
                        , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11929}}
                          , React.createElement('span', { className: "text-[10px] font-mono font-bold text-[#0E9F8A] bg-teal-50 px-2 py-0.5 rounded"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11930}}, p.id)
                          , React.createElement('span', { className: "text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11931}}, p.category || "Web App")
                          , isSelected && (
                            React.createElement('span', { className: "text-[9px] font-extrabold bg-[#0E9F8A] text-white px-2 py-0.5 rounded flex items-center gap-1"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11933}}
                              , React.createElement(CheckCircle, { size: 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11934}} ), " Active Workspace"
                            )
                          )
                        )
                        , React.createElement('h4', { className: "font-bold text-sm text-[#071E34] mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11938}}, p.name || p.title)
                        , React.createElement('span', { className: "text-[10px] text-gray-400 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11939}}, p.description || "Project specification included.")
                      )

                      , React.createElement('button', {
                        className: `px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ease-out ${
                          isSelected 
                            ? "bg-[#0E9F8A] text-white shadow-xs" 
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-[#0E9F8A] hover:text-white"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11942}}

                        , isSelected ? "Selected Workspace" : "Select Project"
                      )
                    )
                  );
                });
              })()
            )
          )
        )
      )

      /* Stages Configuration Modal */
      , showStagesModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2px] p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11962}}
          , React.createElement('div', { className: "w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11963}}
            , React.createElement('div', { className: "flex justify-between items-center border-b border-gray-100 pb-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11964}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 11965}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-[#071E34] text-base tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11966}}, "Configure Pipeline Stages"  )
                , React.createElement('p', { className: "text-[10px] text-gray-400 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11967}}, "Add or remove custom Kanban columns"     )
              )
              , React.createElement('button', { 
                onClick: () => setShowStagesModal(false), 
                className: "text-gray-400 hover:text-gray-700 text-lg font-bold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11969}}
, "×"

              )
            )

            /* Stages List */
            , React.createElement('div', { className: "space-y-2 max-h-[250px] overflow-y-auto pr-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11978}}
              , columns.map(col => {
                const isCore = ["New", "Contacted", "Qualified", "Follow-up", "Won", "Lost"].includes(col.key);
                return (
                  React.createElement('div', { key: col.key, className: "flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-200"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11982}}
                    , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11983}}
                      , React.createElement('span', { className: `w-2 h-2 rounded-full ${col.dot}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11984}} )
                      , React.createElement('span', { className: "font-bold text-xs text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11985}}, col.title)
                      , isCore && React.createElement('span', { className: "text-[8px] bg-gray-200 text-gray-650 px-1.5 py-0.5 rounded font-extrabold uppercase"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11986}}, "Core")
                    )
                    , !isCore && (
                      React.createElement('button', { 
                        onClick: () => handleDeleteCustomStage(col.key),
                        className: "text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11989}}

                        , React.createElement(Trash2, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11993}} )
                      )
                    )
                  )
                );
              })
            )

            /* Add Custom Stage */
            , React.createElement('div', { className: "flex flex-col gap-2 pt-2 border-t border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12002}}
              , React.createElement('label', { className: "font-bold text-gray-700 block text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12003}}, "Add Custom Stage"  )
              , React.createElement('div', { className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12004}}
                , React.createElement('input', { 
                  type: "text", 
                  placeholder: "e.g., Under Review"  ,
                  value: newStageTitle,
                  onChange: (e) => setNewStageTitle(e.target.value),
                  className: "flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0E9F8A]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12005}}
                )
                , React.createElement('button', { 
                  onClick: handleAddCustomStage,
                  className: "px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all duration-200 ease-out shadow-xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12012}}
, "Add"

                )
              )
            )

            , React.createElement('div', { className: "flex justify-end pt-3 border-t border-gray-100 mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12021}}
              , React.createElement('button', { 
                onClick: () => setShowStagesModal(false),
                className: "px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all duration-200 ease-out"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12022}}
, "Close Settings"

              )
            )
          )
        )
      )

      /* Lead Detailed Inspector Modal */
      , selectedLeadForDetail && leadDetailForm && (
        React.createElement(Suspense, { fallback: 
          React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2.5px] p-3 sm:p-5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12036}}
            , React.createElement('div', { className: "w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 animate-pulse"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12037}}
              , React.createElement('div', { className: "h-5 w-36 bg-gray-100 rounded mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12038}} )
              , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-5 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12039}}
                , React.createElement('div', { className: "lg:col-span-3 h-80 bg-gray-50 rounded-xl border border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12040}} )
                , React.createElement('div', { className: "lg:col-span-2 h-80 bg-gray-50 rounded-xl border border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12041}} )
              )
            )
          )
        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12035}}
          , React.createElement(LeadDetailInspectorModal, {
            leadDetailForm: leadDetailForm,
            setLeadDetailForm: setLeadDetailForm,
            setSelectedLeadForDetail: setSelectedLeadForDetail,
            columns: columns,
            employees: employees,
            handleUpdateLeadStatus: handleUpdateLeadStatus,
            handleConvertLead: handleConvertLead,
            handleDeleteLead: handleDeleteLead,
            handleNavigateLeadDetail: handleNavigateLeadDetail,
            handleSaveLeadDetailChanges: handleSaveLeadDetailChanges,
            projects: projects,
            ourProjects: ourProjects,
            quotations: quotations,
            invoices: invoices,
            setClients: setClients,
            setLeads: setLeads,
            showToast: showToast,
            API_URL: API_URL,
            onPreviewDoc: handleOpenLeadInspectorDocumentPreview,
            onSendEmailDoc: (toEmail, subject, textContent, fileName, htmlContent, item) => {
              const type = fileName.toLowerCase().includes("invoice") && !fileName.toLowerCase().includes("quotation_invoice") ? "invoice" : "quotation";
              handleOpenClientItemEmailModal(item || { number: "PROP-DOC", title: subject }, type, {
                toEmail,
                subject,
                textContent,
                fileName,
                htmlContent
              });
            },
            onMarkTemporaryClient: handleMarkTemporaryClient, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12046}}
          )
        )
      )

      /* Inline lead inspector retained as a disabled fallback during lazy-load migration. */
      , false && selectedLeadForDetail && leadDetailForm && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#071E34]/30 backdrop-blur-[2.5px] p-3 sm:p-5 overflow-y-auto"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12083}}
          , React.createElement('div', { className: "w-full max-w-4xl bg-[#fcfbfc] rounded-2xl border border-gray-200 shadow-2xl p-4 sm:p-5 flex flex-col gap-4 my-4 animate-in fade-in zoom-in duration-200 max-h-[94vh] overflow-y-auto"                  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12084}}
            /* Header row */
            , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3 border-b border-gray-100"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12086}}
              , React.createElement('div', { className: "flex flex-col gap-1 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12087}}
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12088}}
                  , React.createElement('h2', { className: "text-lg font-extrabold text-[#071E34] tracking-tight truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12089}}, leadDetailForm.name)
                )
                , React.createElement('div', { className: "flex flex-wrap items-center gap-2 text-[10px] text-gray-500 font-medium"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12091}}
                  , React.createElement('span', { className: "flex items-center gap-1 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12092}}
                    , React.createElement(Building2, { size: 11, className: "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12093}} )
                    , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12094}}, leadDetailForm.companyName)
                  )
                  , React.createElement('span', { className: "w-0.5 h-0.5 rounded-full bg-gray-300"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12096}} )
                  , React.createElement('span', { className: "text-[9px] font-extrabold text-[#0E9F8A] bg-teal-50 px-1.5 py-0.5 rounded uppercase border border-teal-100"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12097}}
                    , _optionalChain([columns, 'access', _697 => _697.find, 'call', _698 => _698(c => c.key === leadDetailForm.status), 'optionalAccess', _699 => _699.title]) || leadDetailForm.status
                  )
                )
              )

              /* Action buttons */
              , React.createElement('div', { className: "flex flex-wrap items-center justify-end gap-1.5 shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12104}}
                , leadDetailForm.status !== "Lost" && (
                  React.createElement('button', {
                    onClick: () => {
                      handleUpdateLeadStatus(leadDetailForm.id, "Lost");
                      setSelectedLeadForDetail(null);
                      setLeadDetailForm(null);
                    },
                    className: "px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-655 rounded-lg text-[10px] font-bold transition-all duration-200 ease-out flex items-center gap-1 bg-white shadow-3xs"                , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12106}}

                    , React.createElement(AlertCircle, { size: 11, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12114}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 12115}}, "Mark Lost" )
                  )
                )
                , leadDetailForm.status === "Won" && leadDetailForm.clientType === "Temporary" && (
                  React.createElement('button', {
                    onClick: () => {
                      handleConvertLead(leadDetailForm);
                      setSelectedLeadForDetail(null);
                      setLeadDetailForm(null);
                    },
                    className: "px-3 py-1.5 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-[10px] font-extrabold transition-all duration-200 ease-out flex items-center gap-1 shadow-2xs"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12119}}

                    , React.createElement(CheckCircle, { size: 11, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12127}} )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 12128}}, "Make Permanent" )
                  )
                )
                , React.createElement('button', {
                  onClick: () => {
                    handleDeleteLead(leadDetailForm.id);
                    setSelectedLeadForDetail(null);
                    setLeadDetailForm(null);
                  },
                  className: "p-1.5 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-655 rounded-lg transition-all duration-200 ease-out bg-white"           ,
                  title: "Move to Trash"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12131}}

                  , React.createElement(Trash2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12140}} )
                )
                , React.createElement('div', { className: "h-4 w-[1px] bg-gray-200 mx-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12142}} )
                , React.createElement('button', {
                  onClick: () => handleNavigateLeadDetail("prev"),
                  className: "p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all duration-200 ease-out bg-white"         ,
                  title: "Previous Lead" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12143}}

                  , React.createElement(ChevronLeft, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12148}} )
                )
                , React.createElement('button', {
                  onClick: () => handleNavigateLeadDetail("next"),
                  className: "p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg transition-all duration-200 ease-out bg-white"         ,
                  title: "Next Lead" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12150}}

                  , React.createElement(ChevronRight, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12155}} )
                )
                , React.createElement('button', {
                  onClick: () => {
                    setSelectedLeadForDetail(null);
                    setLeadDetailForm(null);
                  },
                  className: "p-1.5 text-gray-400 hover:text-gray-700 text-base font-bold"    ,
                  title: "Close Inspector" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12157}}
, "×"

                )
              )
            )

            /* Main content grid */
            , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-5 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12171}}
              /* Left columns (Lead Details) */
              , React.createElement('div', { className: "lg:col-span-3 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12173}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-xs text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12174}}, "Lead Details" )

                /* Contact name */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12177}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12178}}, "Contact Name" )
                  , React.createElement('input', { 
                    type: "text",
                    value: leadDetailForm.name,
                    onChange: (e) => setLeadDetailForm({ ...leadDetailForm, name: e.target.value }),
                    className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12179}}
                  )
                )

                /* Company & Phone */
                , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12188}}
                  , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12189}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12190}}, "Company")
                    , React.createElement('input', { 
                      type: "text",
                      value: leadDetailForm.companyName,
                      onChange: (e) => setLeadDetailForm({ ...leadDetailForm, companyName: e.target.value }),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12191}}
                    )
                  )
                  , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12198}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12199}}, "Phone")
                    , React.createElement('input', { 
                      type: "text",
                      value: leadDetailForm.phone,
                      onChange: (e) => setLeadDetailForm({ ...leadDetailForm, phone: e.target.value }),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12200}}
                    )
                  )
                )

                /* Email & Source */
                , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12210}}
                  , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12211}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12212}}, "Email")
                    , React.createElement('input', { 
                      type: "email",
                      value: leadDetailForm.email,
                      onChange: (e) => setLeadDetailForm({ ...leadDetailForm, email: e.target.value }),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12213}}
                    )
                  )
                  , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12220}}
                    , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12221}}, "Source")
                    , React.createElement('select', { 
                      value: leadDetailForm.source,
                      onChange: (e) => setLeadDetailForm({ ...leadDetailForm, source: e.target.value  }),
                      className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12222}}

                      , React.createElement('option', { value: "Other", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12227}}, "Other")
                      , React.createElement('option', { value: "Website", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12228}}, "Website")
                      , React.createElement('option', { value: "Facebook", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12229}}, "Facebook")
                      , React.createElement('option', { value: "Instagram", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12230}}, "Instagram")
                      , React.createElement('option', { value: "Google Ads" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12231}}, "Google Ads" )
                      , React.createElement('option', { value: "WhatsApp", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12232}}, "WhatsApp")
                      , React.createElement('option', { value: "Phone call" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12233}}, "Phone call" )
                      , React.createElement('option', { value: "Referral", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12234}}, "Referral")
                      , React.createElement('option', { value: "Direct enquiry" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12235}}, "Direct enquiry" )
                    )
                  )
                )

                /* Estimated Value */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12241}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12242}}, "Estimated Value (INR)"  )
                  , React.createElement('input', { 
                    type: "number",
                    value: leadDetailForm.expectedBudget || 0,
                    onChange: (e) => setLeadDetailForm({ ...leadDetailForm, expectedBudget: Number(e.target.value) }),
                    className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-mono font-medium text-gray-800 bg-gray-50/20"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12243}}
                  )
                )

                /* Notes */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12252}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12253}}, "Notes")
                  , React.createElement('textarea', { 
                    rows: 3,
                    value: leadDetailForm.notes,
                    onChange: (e) => setLeadDetailForm({ ...leadDetailForm, notes: e.target.value }),
                    className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0E9F8A] transition-all duration-200 ease-out text-xs font-medium text-gray-800 bg-gray-50/20 resize-none"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12254}}
                  )
                )

                , React.createElement('div', { className: "flex justify-end pt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12262}}
                  , React.createElement('button', {
                    onClick: handleSaveLeadDetailChanges,
                    className: "px-4 py-2 bg-[#0E9F8A] hover:bg-teal-600 text-white rounded-lg text-xs font-extrabold transition-all duration-200 ease-out shadow-2xs"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12263}}
, "Save Changes"

                  )
                )
              )

              /* Right column (Pipeline settings) */
              , React.createElement('div', { className: "lg:col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col gap-3 min-w-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12273}}
                , React.createElement('h3', { className: "font-heading font-extrabold text-xs text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12274}}, "Pipeline")

                /* Stage */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12277}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12278}}, "Stage")
                  , React.createElement('select', {
                    value: leadDetailForm.status,
                    onChange: (e) => setLeadDetailForm({ ...leadDetailForm, status: e.target.value }),
                    className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12279}}

                    , columns.map(col => (
                      React.createElement('option', { key: col.key, value: col.key, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12285}}, col.title)
                    ))
                  )
                )

                /* Assigned To */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12291}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12292}}, "Assigned To" )
                  , React.createElement('select', {
                    value: leadDetailForm.assignedEmployee,
                    onChange: (e) => setLeadDetailForm({ ...leadDetailForm, assignedEmployee: e.target.value }),
                    className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] text-xs font-medium text-gray-800 cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12293}}

                    , React.createElement('option', { value: "Unassigned", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12298}}, "Unassigned")
                    , employees.map(emp => (
                      React.createElement('option', { key: emp.id, value: emp.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12300}}, emp.name)
                    ))
                  )
                )

                /* Follow-up date & time row */
                , React.createElement('div', { className: "flex flex-col gap-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12306}}
                  , React.createElement('label', { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12307}}, "Follow-up")
                  , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12308}}
                    , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12309}}
                      , React.createElement('input', { 
                        type: "date",
                        value: leadDetailForm.nextFollowUpDate || "",
                        onChange: (e) => setLeadDetailForm({ ...leadDetailForm, nextFollowUpDate: e.target.value }),
                        className: "w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A] cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12310}}
                      )
                    )
                    , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12317}}
                      , React.createElement('input', { 
                        type: "text",
                        placeholder: "Time",
                        className: "w-full min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-gray-50/20 focus:outline-none focus:border-[#0E9F8A]"           ,
                        defaultValue: "12:00 PM" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12318}}
                      )
                    )
                  )
                )

                /* Auto reminders banner */
                , React.createElement('div', { className: "p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[9px] text-amber-900 leading-normal"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12329}}
                  , React.createElement('span', { className: "text-amber-700 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12330}}, "🔒")
                  , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12331}}
                    , React.createElement('strong', { className: "text-amber-950 font-bold block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12332}}, "Automatic reminders" ), "are an Ultra feature. The date is saved; upgrade to get notified."

                  )
                )

                /* Summary table */
                , React.createElement('div', { className: "mt-1.5 pt-2.5 border-t border-gray-100 flex flex-col text-[10px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12338}}
                  , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2 [&>strong]:text-right [&>strong]:break-words"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12339}}
                    , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12340}}, "Value")
                    , React.createElement('strong', { className: "font-mono font-extrabold text-[#071E34]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12341}}, "₹", _optionalChain([leadDetailForm, 'access', _700 => _700.expectedBudget, 'optionalAccess', _701 => _701.toLocaleString, 'call', _702 => _702()]) || "0")
                  )
                  , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12343}}
                    , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12344}}, "Source")
                    , React.createElement('span', { className: "text-gray-700 font-semibold text-right break-words"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12345}}, leadDetailForm.source)
                  )
                  , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start border-b border-gray-50 py-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12347}}
                    , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12348}}, "Phone")
                    , React.createElement('span', { className: "text-[#0E9F8A] font-semibold flex items-center justify-end gap-1 font-mono select-all min-w-0 text-right break-all"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12349}}, "📞 "
                       , leadDetailForm.phone
                    )
                  )
                  , React.createElement('div', { className: "grid grid-cols-[72px_minmax(0,1fr)] gap-3 items-start py-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12353}}
                    , React.createElement('span', { className: "text-gray-400 font-medium shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12354}}, "Email")
                    , React.createElement('span', { className: "text-gray-600 font-mono text-[9px] leading-relaxed break-all text-right select-all min-w-0"       , title: leadDetailForm.email, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12355}}, leadDetailForm.email)
                  )
                )
              )
            )
          )
        )
      )

      /* ADD / CREATE SYSTEM USER MODAL */
      , showAddUserModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12366}}
          , React.createElement('div', { className: "bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12367}}
            , React.createElement('div', { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12368}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12369}}, "Create System User"  )
              , React.createElement('button', { 
                onClick: () => setShowAddUserModal(false),
                className: "text-gray-400 hover:text-gray-600 font-bold p-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12370}}
, "×"

              )
            )
            , React.createElement('form', { onSubmit: handleCreateUserSubmit, className: "p-6 flex flex-col gap-4 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12377}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12378}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12379}}, "Full Name *"  )
                , React.createElement('input', { 
                  type: "text", 
                  required: true,
                  placeholder: "e.g. Rahul Sharma"  ,
                  value: userForm.name,
                  onChange: e => setUserForm({ ...userForm, name: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12380}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12389}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12390}}, "Email Address *"  )
                , React.createElement('input', { 
                  type: "email", 
                  required: true,
                  placeholder: "rahul@company.com",
                  value: userForm.email,
                  onChange: e => setUserForm({ ...userForm, email: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12391}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12400}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12401}}, "Account Password *"  )
                , React.createElement('input', { 
                  type: "password", 
                  required: true,
                  placeholder: "••••••••",
                  value: userForm.password,
                  onChange: e => setUserForm({ ...userForm, password: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12402}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12411}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12412}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12413}}, "Role Authorization" )
                  , React.createElement('select', { 
                    value: userForm.role,
                    onChange: e => setUserForm({ ...userForm, role: e.target.value }),
                    className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12414}}

                    , React.createElement('option', { value: "Super Admin" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12419}}, "Super Admin" )
                    , React.createElement('option', { value: "Sales Manager" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12420}}, "Sales Manager" )
                    , React.createElement('option', { value: "Project Manager" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12421}}, "Project Manager" )
                    , React.createElement('option', { value: "Developer", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12422}}, "Developer")
                    , React.createElement('option', { value: "Client Access" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12423}}, "Client Access" )
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12426}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12427}}, "Status")
                  , React.createElement('select', { 
                    value: userForm.status,
                    onChange: e => setUserForm({ ...userForm, status: e.target.value }),
                    className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12428}}

                    , React.createElement('option', { value: "Active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12433}}, "Active")
                    , React.createElement('option', { value: "Inactive", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12434}}, "Inactive")
                  )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2 border-t border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12438}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowAddUserModal(false),
                  className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12439}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-5 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl font-bold shadow-md transition-all"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12446}}
, "Create System User"

                )
              )
            )
          )
        )
      )

      /* EDIT SYSTEM USER MODAL */
      , editingUser && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12460}}
          , React.createElement('div', { className: "bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12461}}
            , React.createElement('div', { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12462}}
              , React.createElement('h3', { className: "font-heading font-extrabold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12463}}, "Edit System User Details"   )
              , React.createElement('button', { 
                onClick: () => setEditingUser(null),
                className: "text-gray-400 hover:text-gray-600 font-bold p-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12464}}
, "×"

              )
            )
            , React.createElement('form', { onSubmit: handleEditUserSubmit, className: "p-6 flex flex-col gap-4 text-xs"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12471}}
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12472}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12473}}, "Full Name *"  )
                , React.createElement('input', { 
                  type: "text", 
                  required: true,
                  value: userForm.name,
                  onChange: e => setUserForm({ ...userForm, name: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12474}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12482}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12483}}, "Email Address *"  )
                , React.createElement('input', { 
                  type: "email", 
                  required: true,
                  value: userForm.email,
                  onChange: e => setUserForm({ ...userForm, email: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12484}}
                )
              )
              , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12492}}
                , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12493}}, "New Password (leave blank to keep current)"      )
                , React.createElement('input', { 
                  type: "password", 
                  placeholder: "••••••••",
                  value: userForm.password,
                  onChange: e => setUserForm({ ...userForm, password: e.target.value }),
                  className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12494}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12502}}
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12503}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12504}}, "Role Authorization" )
                  , React.createElement('select', { 
                    value: userForm.role,
                    onChange: e => setUserForm({ ...userForm, role: e.target.value }),
                    className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12505}}

                    , React.createElement('option', { value: "Super Admin" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12510}}, "Super Admin" )
                    , React.createElement('option', { value: "Sales Manager" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12511}}, "Sales Manager" )
                    , React.createElement('option', { value: "Project Manager" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12512}}, "Project Manager" )
                    , React.createElement('option', { value: "Developer", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12513}}, "Developer")
                    , React.createElement('option', { value: "Client Access" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12514}}, "Client Access" )
                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12517}}
                  , React.createElement('label', { className: "font-bold text-gray-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12518}}, "Status")
                  , React.createElement('select', { 
                    value: userForm.status,
                    onChange: e => setUserForm({ ...userForm, status: e.target.value }),
                    className: "px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5349] bg-white cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12519}}

                    , React.createElement('option', { value: "Active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12524}}, "Active")
                    , React.createElement('option', { value: "Inactive", __self: this, __source: {fileName: _jsxFileName, lineNumber: 12525}}, "Inactive")
                  )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2 border-t border-gray-100"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12529}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setEditingUser(null),
                  className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12530}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-5 py-2 bg-[#FF5349] hover:bg-[#F05454] text-white rounded-xl font-bold shadow-md transition-all"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12537}}
, "Save User Changes"

                )
              )
            )
          )
        )
      )

      /* BOTTOM RIGHT FLOATING TOAST NOTIFICATION */
      , toast && (
        React.createElement('div', { className: `fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md ${
          toast.type === "error" 
            ? "bg-red-950 text-white border-red-700 backdrop-blur-md shadow-red-950/40" 
            : toast.type === "info"
            ? "bg-slate-950 text-white border-slate-700 backdrop-blur-md"
            : "bg-emerald-950 text-white border-emerald-600 backdrop-blur-md shadow-emerald-950/40"
        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12551}}
          , React.createElement('div', { className: `w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
            toast.type === "error" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12558}}
            , toast.type === "error" ? "!" : "✓"
          )
          , React.createElement('div', { className: "flex-1 pr-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12563}}
            , React.createElement('span', { className: "font-extrabold text-xs block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12564}}, toast.type === "error" ? "Notice / Alert" : "Success")
            , React.createElement('span', { className: "text-[11px] opacity-90 leading-tight block mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12565}}, toast.message)
          )
          , React.createElement('button', { 
            onClick: () => setToast(null),
            className: "text-white/60 hover:text-white text-lg font-bold px-1.5 py-0.5 rounded-lg hover:bg-white/10"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12567}}
, "×"

          )
        )
      )
    )
  );
}




