"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CreditCard,
  FileText,
  Loader2,
  LogOut,
  Plus,
  RefreshCcw,
  CheckSquare,
  TicketCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import GlassCard from "../../../components/ui/GlassCard";
import Button from "../../../components/ui/Button";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, generateSpeshwayAgreementPdfHtml } from "../../../utils/pdfGenerator";
import { getCrmSocket } from "../../../utils/realtime";
import { showToast } from "../../../utils/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const FORM_INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#06132D] outline-none transition placeholder:text-slate-400 focus:border-[#FF5349] focus:ring-4 focus:ring-red-100";

type CustomerTab = "overview" | "projects" | "quotations" | "billing" | "support";

interface ClientProfile {
  id: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  loginEmail?: string;
  notes?: string;
  status?: string;
}

interface Project {
  id: string;
  name?: string;
  title?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  category?: string;
  status?: string;
  progress?: number;
  budget?: number;
  description?: string;
  expectedCompletionDate?: string;
  projectTodos?: ProjectTodo[];
}

type ProjectTodo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

interface Quote {
  id: string;
  number?: string;
  title?: string;
  projectId?: string;
  projectName?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  email?: string;
  preparedFor?: string;
  billedTo?: string;
  billedToClient?: string;
  documentRef?: string;
  items?: string;
  value?: number;
  total?: number;
  totalDue?: number;
  planAPrice?: number;
  planBPrice?: number;
  date?: string;
  validUntil?: string;
  htmlContent?: string;
  status?: string;
}

interface Invoice {
  id: string;
  number?: string;
  title?: string;
  projectId?: string;
  projectName?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  email?: string;
  proposalId?: string;
  quotationId?: string;
  preparedFor?: string;
  billedTo?: string;
  billedToClient?: string;
  documentRef?: string;
  productName?: string;
  value?: number;
  amount?: number;
  rate?: number;
  totalDue?: number;
  totalAmount?: number;
  due?: string;
  dueDate?: string;
  issuedDate?: string;
  date?: string;
  htmlContent?: string;
  status?: string;
}

interface Ticket {
  id: string;
  subject: string;
  message?: string;
  date: string;
  userEmail?: string;
  userName?: string;
  clientId?: string;
  status?: string;
}

const normalize = (value?: string | number | null) => String(value || "").trim().toLowerCase();
const same = (a?: string | number | null, b?: string | number | null) => normalize(a) === normalize(b) && Boolean(normalize(a));
const isDeletedStatus = (status?: string | null) => normalize(status) === "deleted";
const money = (value?: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));

const uniqueById = <T extends { id?: string; number?: string }>(records: T[]) => {
  const seen = new Set<string>();
  return records.filter((record) => {
    const key = record.id || record.number || JSON.stringify(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const uniqueProjectsByIdentity = (records: Project[]) => {
  const byKey = new Map<string, Project>();
  records.forEach((project) => {
    const nameKey = normalize(project.name || project.title);
    const idKey = normalize(project.id);
    const key = nameKey || idKey;
    if (!key) return;

    const existing = byKey.get(key);
    const existingHasRealId = Boolean(existing?.id && !normalize(existing.id).startsWith("client-project-"));
    const nextHasRealId = Boolean(project.id && !normalize(project.id).startsWith("client-project-"));
    if (!existing || (!existingHasRealId && nextHasRealId)) {
      byKey.set(key, { ...existing, ...project, projectTodos: project.projectTodos || existing?.projectTodos || [] });
    } else {
      byKey.set(key, { ...project, ...existing, projectTodos: existing.projectTodos || project.projectTodos || [] });
    }
  });
  return Array.from(byKey.values());
};

const ProjectStageTimeline = ({ currentStatus }: { currentStatus: string }) => {
  const stages = ["Planning", "Designing", "Development", "Testing", "Completed"];
  const normalized = String(currentStatus || "").trim().toLowerCase();
  let activeIndex = 0;
  if (normalized === "designing" || normalized === "design") activeIndex = 1;
  else if (normalized === "development" || normalized === "in progress" || normalized === "in-progress") activeIndex = 2;
  else if (normalized === "testing") activeIndex = 3;
  else if (normalized === "completed") activeIndex = 4;

  return (
    <div className="mt-5 w-full border-t border-slate-100 pt-4">
      <div className="flex justify-between items-center relative mb-2">
        <div className="absolute left-0 right-0 h-1 bg-slate-200 rounded-full top-[14px] -z-10" />
        <div 
          className="absolute left-0 h-1 bg-[#FF5349] rounded-full top-[14px] -z-10 transition-all duration-500" 
          style={{ width: `${(activeIndex / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;
          const isPending = idx > activeIndex;

          let circleClass = "";
          if (isActive) {
            circleClass = "bg-[#FF5349] text-white ring-4 ring-red-100 scale-110 shadow-md";
          } else if (isCompleted) {
            circleClass = "bg-[#06132D] text-white shadow-sm";
          } else {
            circleClass = "bg-white border-2 border-slate-300 text-slate-400";
          }

          return (
            <div key={stage} className="flex flex-col items-center flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${circleClass}`}>
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span className={`mt-2 text-[10px] sm:text-xs font-bold truncate max-w-full px-1 ${
                isActive ? "text-[#FF5349] font-extrabold" : isCompleted ? "text-[#06132D]" : "text-slate-400"
              }`}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<CustomerTab>("overview");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [clientDocumentRecords, setClientDocumentRecords] = useState<any[]>([]);
  const [selectedProjectForTodos, setSelectedProjectForTodos] = useState<Project | null>(null);
  const [projectTodoInputs, setProjectTodoInputs] = useState<Record<string, string>>({});
  const activeTodoProject = selectedProjectForTodos;
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<{ title: string; html: string } | null>(null);

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const [showPayModal, setShowPayModal] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      window.location.href = "/auth/login";
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.role === "admin") {
        window.location.href = "/admin/dashboard";
        return;
      }
      setCurrentUser(parsed);
    } catch {
      window.location.href = "/auth/login";
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    loadCustomerData(currentUser);
    const timer = window.setInterval(() => loadCustomerData(currentUser, true), 30000);
    return () => window.clearInterval(timer);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const socket = getCrmSocket();
    if (!socket) return;

    const handleRealtimeUpdate = () => {
      loadCustomerData(currentUser, true);
    };

    const handleSocketReady = () => {
      socket.emit("crm:join", `customer:${currentUser.email || currentUser.id || "portal"}`);
      loadCustomerData(currentUser, true);
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
  }, [currentUser]);


  const matchClientProfile = (clients: ClientProfile[], user: any) => {
    const userEmail = normalize(user?.email);
    const userName = normalize(user?.name);
    const scoreClient = (client: ClientProfile) => {
      const deletedPenalty = isDeletedStatus(client.status) ? -50 : 0;
      const notes = normalize(client.notes);
      let score = deletedPenalty;
      if (same(client.loginEmail, userEmail)) score += 100;
      if (notes.includes(userEmail)) score += 95;
      if (same(client.email, userEmail)) score += 85;
      if (same(client.name, userName)) score += 40;
      if (same(client.company, userName)) score += 35;
      return score;
    };

    return [...clients].sort((a, b) => scoreClient(b) - scoreClient(a)).find((client) => scoreClient(client) > 0) || null;
  };

  const loadCustomerData = async (user = currentUser, silent = false) => {
    if (!user) return;
    try {
      if (!silent) setIsLoading(true);

      let bulkData: any = null;
      try {
        const bulkRes = await fetch(`${API_URL}/crm/bulk?t=${Date.now()}`).then((r) => r.json());
        if (bulkRes && bulkRes.success && bulkRes.data && typeof bulkRes.data === "object") {
          bulkData = bulkRes.data;
        }
      } catch (e) {}

      let clientsRaw = bulkData?.client;
      let projectsRaw = bulkData?.project;
      let quotesRaw = bulkData?.quotation;
      let invoicesRaw = bulkData?.invoice;
      let ticketsRaw = bulkData?.ticket;
      let docsRaw = bulkData?.["client-document"] || bulkData?.clientdocuments;

      if (!bulkData) {
        const [resClients, resProjects, resOurProjects, resQ, resInv, resT, resDocs] = await Promise.all([
          fetch(`${API_URL}/crm/client`).then((r) => r.json()),
          fetch(`${API_URL}/crm/project`).then((r) => r.json()),
          fetch(`${API_URL}/crm/our-projects`).then((r) => r.json()),
          fetch(`${API_URL}/crm/quotation`).then((r) => r.json()),
          fetch(`${API_URL}/crm/invoice`).then((r) => r.json()),
          fetch(`${API_URL}/crm/ticket`).then((r) => r.json()),
          fetch(`${API_URL}/crm/client-document`).then((r) => r.json()).catch(() => ({ data: [] })),
        ]);
        clientsRaw = resClients?.data;
        projectsRaw = resProjects?.data;
        quotesRaw = resQ?.data;
        invoicesRaw = resInv?.data;
        ticketsRaw = resT?.data;
        docsRaw = resDocs?.data;
      }

      const clients: ClientProfile[] = Array.isArray(clientsRaw) ? clientsRaw : [];
      const allClientDocs = Array.isArray(docsRaw) ? docsRaw : [];
      const profile = matchClientProfile(clients, user);
      const matchedByGeneratedLogin = Boolean(
        profile &&
        (
          same(profile.loginEmail, user?.email) ||
          normalize(profile.notes).includes(normalize(user?.email))
        )
      );

      const clientEmailKeys = Array.from(new Set([
        normalize(user?.email),
        normalize(profile?.email),
        normalize(profile?.loginEmail),
      ].filter(Boolean)));

      const clientIdKeys = Array.from(new Set([
        normalize(profile?.id),
      ].filter(Boolean)));

      const belongsToClient = (record: any) => {
        if (!record) return false;
        const item = record.item || {};
        const emails = [
          record.sentToEmail,
          record.clientEmail,
          record.toEmail,
          record.email,
          record.userEmail,
          item.sentToEmail,
          item.clientEmail,
          item.toEmail,
          item.email,
          item.userEmail,
        ].map(normalize).filter(Boolean);

        const clientIds = [
          record.clientId,
          item.clientId,
        ].map(normalize).filter(Boolean);

        const emailMatch = clientEmailKeys.some((eKey) =>
          emails.some((rEmail) => rEmail === eKey || rEmail.includes(eKey))
        );
        const idMatch = clientIdKeys.some((idKey) =>
          clientIds.some((rId) => rId === idKey)
        );

        return emailMatch || idMatch;
      };

      const allProjects = Array.isArray(projectsRaw) ? projectsRaw : [];
      const scopedProjects = allProjects.filter((project) => {
        if (belongsToClient(project)) return true;
        const pClientName = normalize(project.clientName);
        if (!pClientName) return false;
        const profileName = normalize(profile?.name);
        const profileCompany = normalize(profile?.company);
        return (
          (profileName && (pClientName === profileName || pClientName.includes(profileName) || profileName.includes(profileName))) ||
          (profileCompany && (pClientName === profileCompany || pClientName.includes(profileCompany) || profileCompany.includes(pClientName)))
        );
      });
      const projectIds = scopedProjects.map((project) => normalize(project.id)).filter(Boolean);
      const projectNames = scopedProjects.map((project) => normalize(project.name || project.title)).filter(Boolean);

      const belongsToProject = (record: any) =>
        projectIds.includes(normalize(record.projectId)) ||
        projectIds.includes(normalize(record.clientProjectId)) ||
        projectIds.includes(normalize(record.id)) ||
        projectNames.includes(normalize(record.projectName)) ||
        projectNames.includes(normalize(record.productName));

      const allQuotes: Quote[] = Array.isArray(quotesRaw) ? quotesRaw : [];
      const scopedQuotes = allQuotes.filter((record: Quote) =>
        belongsToClient(record) || belongsToProject(record)
      );
      const quoteRefs = scopedQuotes.flatMap((quote) => [quote.id, quote.number, quote.documentRef]).map(normalize).filter(Boolean);
      const scopedInvoices = (Array.isArray(invoicesRaw) ? invoicesRaw : []).filter((record: Invoice) =>
        belongsToClient(record) ||
        belongsToProject(record) ||
        quoteRefs.includes(normalize(record.proposalId)) ||
        quoteRefs.includes(normalize(record.quotationId)) ||
        quoteRefs.includes(normalize(record.documentRef)) ||
        quoteRefs.some((ref) => normalize(record.number).includes(ref))
      );
      const scopedTickets = (Array.isArray(ticketsRaw) ? ticketsRaw : []).filter((record: Ticket) =>
        belongsToClient(record)
      );
      const sentClientDocs = allClientDocs.filter((record: any) => {
        const item = record.item || record;
        const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
        const keyMatchesClient = overrideKeys.some((key: string) =>
          clientEmailKeys.some((eKey) => normalize(key).includes(eKey)) ||
          clientIdKeys.some((idKey) => normalize(key).includes(idKey))
        );
        return record.visibleToClient !== false && (
          belongsToClient(record) ||
          belongsToClient(item) ||
          keyMatchesClient
        );
      });
      const sentDocRefs = sentClientDocs
        .flatMap((record: any) => {
          const item = record.item || record;
          return [
            record.documentRef,
            record.id,
            record.documentKey,
            item.id,
            item.number,
            item.quotationId,
            item.proposalId,
            item.refNumber,
            item.projectId,
            item.projectName,
          ];
        })
        .map(normalize)
        .filter(Boolean);
      const quotesLinkedToVisibleDocs = allQuotes.filter((quote: Quote) => {
        const quoteRefs = [quote.id, quote.number, quote.documentRef, quote.projectId, quote.projectName]
          .map(normalize)
          .filter(Boolean);
        return quoteRefs.some((quoteRef) =>
          sentDocRefs.some((docRef) => docRef === quoteRef || docRef.includes(quoteRef) || quoteRef.includes(docRef))
        );
      });
      const sentQuotes = sentClientDocs
        .filter((record: any) => record.documentType === "quotation")
        .map((record: any) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Sent",
        }));
      const sentInvoices = sentClientDocs
        .filter((record: any) => record.documentType === "invoice")
        .map((record: any) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Sent",
        }));
      const sentAgreements = sentClientDocs
        .filter((record: any) => record.documentType === "agreement")
        .map((record: any) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Signed",
        }));
      const docsAndClientRecords = [
        ...sentClientDocs.map((record: any) => ({ ...record, ...(record.item || {}) })),
        ...sentQuotes,
        ...sentInvoices,
        ...sentAgreements,
        ...quotesLinkedToVisibleDocs,
        ...scopedQuotes,
        ...scopedInvoices,
      ];
      const docLinkedProjects = docsAndClientRecords
        .map((record: any) => {
          const projectId = record.projectId || record.clientProjectId;
          const projectName = record.projectName || record.productName || record.title || record.name;
          if (!projectId && !projectName) return null;
          return {
            id: projectId || `CLIENT-PROJECT-${normalize(projectName).replace(/[^a-z0-9]+/g, "-")}`,
            name: projectName || projectId,
            title: projectName || projectId,
            clientId: record.clientId || profile?.id || "",
            clientName: record.clientName || profile?.name || currentUser?.name || "",
            clientEmail: record.clientEmail || record.sentToEmail || profile?.email || currentUser?.email || "",
            category: record.category || record.projectType || "Client Project",
            status: record.projectStatus || record.status || "Active",
            progress: Number(record.progress || record.completion || 10),
            budget: Number(record.budget || record.amount || record.rate || record.totalDue || record.planAPrice || 0),
            description: record.description || record.overviewNarrative || "",
            expectedCompletionDate: record.expectedCompletionDate || record.dueDate || "",
            projectTodos: Array.isArray(record.projectTodos) ? record.projectTodos : (Array.isArray(record.item?.projectTodos) ? record.item.projectTodos : []),
          } as Project;
        })
        .filter(Boolean) as Project[];

      setClientProfile(profile);
      setClientDocumentRecords(sentClientDocs);
      setProjects(uniqueProjectsByIdentity([...scopedProjects, ...docLinkedProjects]));
      setQuotes(uniqueById([...sentQuotes, ...quotesLinkedToVisibleDocs]));
      setInvoices(uniqueById([...sentInvoices]));
      setAgreements(uniqueById([...sentAgreements]));
      setTickets(uniqueById(scopedTickets));
    } catch (err) {
      console.error("[Customer DB Load Error]", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", id: "overview" as const, icon: <FileText size={18} /> },
    { name: "My Projects", id: "projects" as const, icon: <BriefcaseBusiness size={18} /> },
    { name: "My Quotations", id: "quotations" as const, icon: <FileText size={18} /> },
    { name: "Invoices & Payments", id: "billing" as const, icon: <CreditCard size={18} /> },
    { name: "Support Desk", id: "support" as const, icon: <TicketCheck size={18} /> },
  ];

  const displayName = clientProfile?.name || currentUser?.name || "Client";
  const displayCompany = clientProfile?.company || currentUser?.company || "Client Workspace";
  const totalInvoiceValue = useMemo(
    () => invoices.reduce((sum, inv) => sum + Number(inv.totalDue || inv.totalAmount || inv.amount || inv.value || inv.rate || 0), 0),
    [invoices]
  );

  const handleAcceptQuote = async (quoteId: string) => {
    try {
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });
      setQuotes((prev) => prev.map((q) => (q.id === quoteId || q.number === quoteId ? { ...q, status: "accepted" } : q)));
    } catch {}
  };

  const handleRejectQuote = async (quoteId: string) => {
    try {
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      setQuotes((prev) => prev.map((q) => (q.id === quoteId || q.number === quoteId ? { ...q, status: "rejected" } : q)));
    } catch {}
  };

  const triggerPayment = (invoice: Invoice) => {
    setPayingInvoice(invoice);
    setPaymentSuccess(false);
    setShowPayModal(true);
  };

  const executeMockPayment = async () => {
    if (!payingInvoice) return;
    setIsPaying(true);
    try {
      const invId = payingInvoice.id;
      await fetch(`${API_URL}/crm/invoice/${encodeURIComponent(invId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      await fetch(`${API_URL}/crm/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: clientProfile?.id,
          clientName: clientProfile?.name || payingInvoice.clientName || displayName,
          amount: payingInvoice.totalDue || payingInvoice.totalAmount || payingInvoice.value || payingInvoice.amount || 0,
          gateway: "Stripe",
          date: new Date().toISOString().split("T")[0],
        }),
      });

      setPaymentSuccess(true);
      setInvoices((prev) => prev.map((inv) => (inv.id === invId ? { ...inv, status: "paid" } : inv)));
      setTimeout(() => {
        setShowPayModal(false);
        setPayingInvoice(null);
      }, 1500);
    } finally {
      setIsPaying(false);
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketBody.trim()) return;

    const ticketPayload: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      message: ticketBody,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      status: "open",
      clientId: clientProfile?.id,
      userEmail: clientProfile?.email || currentUser?.email || "customer@crm.com",
      userName: clientProfile?.name || currentUser?.name || "Customer Account",
    };

    try {
      await fetch(`${API_URL}/crm/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketPayload),
      });

      setTickets((prev) => [ticketPayload, ...prev]);
      setTicketSuccess(true);
      setTicketSubject("");
      setTicketBody("");
      setTimeout(() => setTicketSuccess(false), 4000);
    } catch (err) {
      console.error("[Create Ticket Error]", err);
    }
  };

  const getProjectDocumentMatches = (project: Project) => {
    const projectKeys = [project.id, project.name, project.title].map(normalize).filter(Boolean);
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
      ].map(normalize).filter(Boolean);
      return (
        recordProjectKeys.some((key) => projectKeys.includes(key)) ||
        overrideKeys.some((key: string) => projectKeys.some((projectKey) => normalize(key).includes(`::${projectKey}`)))
      );
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
    const clientId = clientProfile?.id || project.clientId || currentUser?.id || "";
    const documentKey = `${clientId || currentUser?.email || "client"}::project::${project.id}`;
    const baseRecord = {
      documentKey,
      id: documentKey,
      documentType: "project",
      documentRef: project.id,
      visibleToClient: true,
      clientId,
      clientName: clientProfile?.name || project.clientName || displayName,
      clientCompany: clientProfile?.company || displayCompany,
      clientEmail: clientProfile?.email || currentUser?.email || project.clientEmail || "",
      sentToEmail: currentUser?.email || clientProfile?.email || project.clientEmail || "",
      clientProjectId: project.id,
      projectId: project.id,
      projectName: project.name || project.title,
      projectStatus: project.status,
      projectTodos: todos,
      updatedAt,
      item: {
        ...project,
        projectId: project.id,
        projectName: project.name || project.title,
        clientId,
        clientName: clientProfile?.name || project.clientName || displayName,
        clientEmail: clientProfile?.email || currentUser?.email || project.clientEmail || "",
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
    setProjects((prev) => uniqueProjectsByIdentity(prev.map((item) => item.id === project.id ? { ...item, projectTodos: todos } : item)));
    setSelectedProjectForTodos((prev) => prev && prev.id === project.id ? { ...prev, projectTodos: todos } : prev);
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
      console.error("[Customer Todo Save Error]", err);
      showToast("Failed to save todo.", "error");
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
      console.error("[Customer Todo Update Error]", err);
      showToast("Failed to update todo.", "error");
    }
  };

  const handleDeleteProjectTodo = async (project: Project, todoId: string) => {
    const todos = getProjectTodos(project).filter((todo) => todo.id !== todoId);
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo removed.", "success");
    } catch (err) {
      console.error("[Customer Todo Delete Error]", err);
      showToast("Failed to remove todo.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const openQuotationPreview = (quote: Quote) => {
    if (quote.htmlContent) {
      setPdfPreview({ title: `Quotation Preview - ${quote.number || quote.id}`, html: quote.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, quote.projectId) || same(p.name, quote.projectName));
    const html = generateSpeshwayEstimationPdfHtml(quote, project || {
      name: quote.projectName || quote.title,
      clientName: quote.clientName || displayCompany,
      category: quote.projectName || "Client Project",
    }, [], 1);
    setPdfPreview({ title: `Quotation Preview - ${quote.number || quote.id}`, html });
  };

  const openInvoicePreview = (invoice: Invoice) => {
    if (invoice.htmlContent) {
      setPdfPreview({ title: `Invoice Preview - ${invoice.number || invoice.id}`, html: invoice.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, invoice.projectId) || same(p.name, invoice.projectName || invoice.productName));
    const html = generateSpeshwayTaxInvoicePdfHtml(invoice, project || {
      name: invoice.projectName || invoice.productName || invoice.title,
      clientName: invoice.clientName || displayCompany,
    }, 1);
    setPdfPreview({ title: `Invoice Preview - ${invoice.number || invoice.id}`, html });
  };

  const openAgreementPreview = (agreement: any) => {
    if (agreement.htmlContent) {
      setPdfPreview({ title: `Agreement Preview - ${agreement.number || agreement.id}`, html: agreement.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, agreement.projectId) || same(p.name, agreement.projectName));
    const html = generateSpeshwayAgreementPdfHtml(agreement, project || {
      name: agreement.projectName || agreement.title,
      clientName: agreement.clientName || displayCompany,
    }, 1);
    setPdfPreview({ title: `Agreement Preview - ${agreement.number || agreement.id}`, html });
  };

  const renderStatus = (status?: string) => {
    const value = status || "Pending";
    const tone =
      normalize(value).includes("paid") || normalize(value).includes("approved") || normalize(value).includes("complete") || normalize(value).includes("accepted")
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : normalize(value).includes("reject") || normalize(value).includes("cancel")
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-amber-50 text-amber-700 border-amber-200";
    return <span className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-extrabold uppercase ${tone}`}>{value}</span>;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 md:flex">
      <aside className="w-full bg-[#0F172A] text-white md:sticky md:top-0 md:h-screen md:w-72 border-r border-slate-800/60 shadow-xl">
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-sm">
                <UserRound size={20} />
              </div>
              <div className="min-w-0">
                <div className="truncate font-heading text-base font-black text-white">Client Portal</div>
                <div className="truncate text-xs font-semibold text-slate-300">{currentUser?.email || "customer@crm.com"}</div>
              </div>
            </div>

            <nav className="mt-6 grid gap-1.5">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-extrabold transition-all duration-200 [&>svg]:text-current [&>svg]:w-4 [&>svg]:h-4 ${
                    activeTab === link.id
                      ? "bg-[#FF5349] !text-white shadow-lg shadow-[#FF5349]/30 scale-[1.01]"
                      : "!text-slate-300 hover:!text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.icon}
                  <span className="leading-tight">{link.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-slate-800/60 pt-6">
            <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-inner mb-4">
              <div className="text-[11px] font-extrabold uppercase text-indigo-400">Account Details</div>
              <div className="mt-1 truncate text-xs font-black text-white">{displayName}</div>
              <div className="truncate text-[11px] font-semibold text-slate-400">{displayCompany}</div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-center gap-2 rounded-xl border-red-200/40 py-2.5 text-xs font-extrabold text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <LogOut size={14} /> Log Out
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
          <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#FF5349]">Live Client Workspace</p>
              <h1 className="mt-2 text-3xl font-heading font-extrabold tracking-tight text-[#06132D]">Welcome Back, {displayName}</h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600">
                Your dashboard is synced to your client profile, projects, quotations, invoices, and support tickets.
              </p>
            </div>
            <button
              onClick={() => loadCustomerData(currentUser)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-extrabold text-[#FF5349] shadow-sm transition hover:bg-red-50"
            >
              <RefreshCcw size={14} className={isLoading ? "animate-spin" : ""} />
              Refresh Live Data
            </button>
          </header>

          {isLoading && (
            <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-extrabold text-[#FF5349]">
              <Loader2 size={14} className="animate-spin" /> Syncing your live dashboard records...
            </div>
          )}

          {activeTab === "overview" && (
            <div className="grid gap-6">
              <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                  { label: "Projects", value: projects.length, detail: "Assigned to your account", icon: <BriefcaseBusiness size={18} /> },
                  { label: "Quotations", value: quotes.length, detail: "Your proposal records", icon: <FileText size={18} /> },
                  { label: "Invoices", value: invoices.length, detail: money(totalInvoiceValue), icon: <CreditCard size={18} /> },
                  { label: "Tickets", value: tickets.length, detail: "Support requests", icon: <TicketCheck size={18} /> },
                ].map((metric) => (
                  <GlassCard key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-slate-500">{metric.label}</span>
                      <span className="text-[#FF5349]">{metric.icon}</span>
                    </div>
                    <div className="mt-4 text-3xl font-heading font-extrabold">{metric.value}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">{metric.detail}</div>
                  </GlassCard>
                ))}
              </section>

              <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-extrabold">My Projects</h2>
                    <span className="text-xs font-extrabold text-slate-400">{projects.length} live</span>
                  </div>
                  {projects.length === 0 ? (
                    <EmptyState text="No projects are assigned to this client profile yet." />
                  ) : (
                    <div className="grid gap-3">
                      {projects.slice(0, 4).map((project) => (
                        <RecordRow
                          key={project.id}
                          title={project.name || project.title || "Client Project"}
                          meta={`${project.category || "Project"} - ${money(project.budget)}`}
                          right={renderStatus(project.status || "Planning")}
                        />
                      ))}
                    </div>
                  )}
                </GlassCard>

                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 font-heading text-xl font-extrabold">Client Profile</h2>
                  <div className="grid gap-4 text-sm">
                    <InfoRow label="Name" value={clientProfile?.name || currentUser?.name || "Client"} />
                    <InfoRow label="Company" value={clientProfile?.company || "Not added"} />
                    <InfoRow label="Email" value={clientProfile?.email || currentUser?.email || "Not added"} />
                    <InfoRow label="Phone" value={clientProfile?.phone || "Not added"} />
                  </div>
                </GlassCard>
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-extrabold">My Quotations</h2>
                    <button onClick={() => setActiveTab("quotations")} className="text-xs font-extrabold text-[#FF5349] hover:text-[#06132D]">View all</button>
                  </div>
                  {quotes.length === 0 ? (
                    <EmptyState text="No quotations issued for your account yet." compact />
                  ) : (
                    <div className="grid gap-3">
                      {quotes.slice(0, 3).map((quote) => (
                        <RecordRow
                          key={quote.id || quote.number}
                          title={quote.title || quote.items || "Quotation Proposal"}
                          meta={`${quote.number || quote.id} - ${money(quote.totalDue || quote.value || quote.total || quote.planAPrice)}`}
                          right={<button onClick={() => openQuotationPreview(quote)} className="rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-[#FF5349] hover:bg-red-50">View</button>}
                        />
                      ))}
                    </div>
                  )}
                </GlassCard>

                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-extrabold">My Invoices</h2>
                    <button onClick={() => setActiveTab("billing")} className="text-xs font-extrabold text-[#FF5349] hover:text-[#06132D]">View all</button>
                  </div>
                  {invoices.length === 0 ? (
                    <EmptyState text="No invoices found for your account." compact />
                  ) : (
                    <div className="grid gap-3">
                      {invoices.slice(0, 3).map((invoice) => (
                        <RecordRow
                          key={invoice.id || invoice.number}
                          title={invoice.title || invoice.projectName || "Tax Invoice"}
                          meta={`${invoice.number || invoice.id} - ${money(invoice.totalDue || invoice.totalAmount || invoice.value || invoice.amount || invoice.rate)}`}
                          right={<button onClick={() => openInvoicePreview(invoice)} className="rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-[#FF5349] hover:bg-red-50">View</button>}
                        />
                      ))}
                    </div>
                  )}
                </GlassCard>
              </section>

              <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-heading text-xl font-extrabold">Recent Support Tickets</h2>
                {tickets.length === 0 ? <EmptyState text="No support tickets found for your account." /> : <TicketTable tickets={tickets.slice(0, 5)} renderStatus={renderStatus} />}
              </GlassCard>
            </div>
          )}

          {activeTab === "projects" && (
            <Section title="My Projects" subtitle="All project workspaces connected to your client account.">
              {projects.length === 0 ? (
                <EmptyState text="No projects are assigned to this client profile yet." />
              ) : (
                <div className="grid gap-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {projects.map((project) => {
                      const todoCount = getProjectTodos(project).length;
                      const isSelected = Boolean(activeTodoProject && (same(activeTodoProject.id, project.id) || same(activeTodoProject.name, project.name)));
                      return (
                        <button
                          key={project.id}
                          onClick={() => setSelectedProjectForTodos(project)}
                          className={`rounded-lg border bg-white p-5 text-left shadow-sm transition hover:border-[#FF5349]/60 hover:shadow-md ${
                            isSelected ? "border-[#FF5349] ring-4 ring-red-100" : "border-slate-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-xs font-mono font-extrabold text-[#FF5349]">{project.id}</div>
                              <h3 className="mt-1 truncate text-lg font-heading font-extrabold">{project.name || project.title || "Client Project"}</h3>
                              <p className="mt-1 text-sm font-semibold text-slate-500">{project.category || "Project Workspace"}</p>
                            </div>
                            {renderStatus(project.status || "Planning")}
                          </div>
                          <ProjectStageTimeline currentStatus={project.status || "Planning"} />
                          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-sm">
                            <InfoRow label="Budget" value={money(project.budget)} />
                            <InfoRow label="Due Date" value={project.expectedCompletionDate || "Not scheduled"} />
                            <InfoRow label="Tasks" value={`${todoCount} item${todoCount === 1 ? "" : "s"}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {activeTodoProject && (
                    <GlassCard className="rounded-lg border border-red-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#FF5349]">
                            <CheckSquare size={15} /> Project To-do List
                          </div>
                          <h3 className="mt-1 text-xl font-heading font-extrabold">{activeTodoProject.name || activeTodoProject.title || activeTodoProject.id}</h3>
                          <p className="mt-1 text-sm font-semibold text-slate-500">Tasks are synced with your admin client workspace.</p>
                        </div>
                        {renderStatus(activeTodoProject.status || "Planning")}
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <input
                          value={projectTodoInputs[activeTodoProject.id] || ""}
                          onChange={(event) => setProjectTodoInputs((prev) => ({ ...prev, [activeTodoProject.id]: event.target.value }))}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleAddProjectTodo(activeTodoProject);
                            }
                          }}
                          placeholder="Add a task for this project"
                          className={FORM_INPUT_CLASS}
                        />
                        <Button
                          onClick={() => handleAddProjectTodo(activeTodoProject)}
                          className="shrink-0 justify-center gap-2 rounded-lg bg-[#FF5349] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#F05454]"
                        >
                          <Plus size={15} /> Add Task
                        </Button>
                      </div>

                      <div className="mt-5 grid gap-2">
                        {getProjectTodos(activeTodoProject).length === 0 ? (
                          <EmptyState text="No todo items added for this project yet." compact />
                        ) : (
                          getProjectTodos(activeTodoProject).map((todo) => (
                            <div key={todo.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleProjectTodo(activeTodoProject, todo.id)}
                                className="h-4 w-4 rounded border-slate-300 text-[#FF5349] focus:ring-[#FF5349]"
                              />
                              <span className={`min-w-0 flex-1 text-sm font-semibold ${todo.completed ? "text-slate-400 line-through" : "text-[#06132D]"}`}>
                                {todo.text}
                              </span>
                              <button
                                onClick={() => handleDeleteProjectTodo(activeTodoProject, todo.id)}
                                className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                title="Remove task"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </GlassCard>
                  )}
                </div>
              )}
            </Section>
          )}

          {activeTab === "quotations" && (
            <div className="space-y-6">
              <Section title="My Service Agreements" subtitle="Official service level agreements sent for your signing and review.">
                {agreements.length === 0 ? (
                  <EmptyState text="No service agreements sent to your account yet." compact />
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {agreements.map((agr) => (
                      <GlassCard key={agr.id || agr.number} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-mono font-extrabold text-blue-700">{agr.number || agr.id}</span>
                            <h3 className="mt-1 text-base font-heading font-extrabold">{agr.projectName || agr.title || "Service Level Agreement"}</h3>
                            <p className="mt-1 text-xs font-semibold text-slate-500">{agr.billedByCompany || "SPESHWAY SOLUTIONS PVT LTD"}</p>
                          </div>
                          {renderStatus(agr.status || "Signed")}
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <div>
                            <span className="block text-[11px] font-extrabold uppercase text-slate-500">Contract Cost</span>
                            <span className="text-xl font-heading font-extrabold">{money(agr.budget || agr.rate || agr.amount || 80000)}</span>
                          </div>
                          <button onClick={() => openAgreementPreview(agr)} className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold text-blue-800 hover:bg-blue-50 transition-colors">
                            View Agreement
                          </button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </Section>

              <Section title="My Quotations" subtitle="Only quotations linked to your client profile or your projects.">
                {quotes.length === 0 ? (
                  <EmptyState text="No quotations issued for your account yet." compact />
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {quotes.map((q) => (
                      <GlassCard key={q.id || q.number} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-mono font-extrabold text-[#FF5349]">{q.id || q.number}</span>
                            <h3 className="mt-1 text-base font-heading font-extrabold">{q.title || q.items || "Quotation Proposal"}</h3>
                            <p className="mt-1 text-xs font-semibold text-slate-500">{q.projectName || q.clientName || displayCompany}</p>
                          </div>
                          {renderStatus(q.status || "pending")}
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <div>
                            <span className="block text-[11px] font-extrabold uppercase text-slate-500">Total Estimate</span>
                            <span className="text-xl font-heading font-extrabold">{money(q.totalDue || q.value || q.total)}</span>
                          </div>
                          <div className="flex flex-wrap justify-end gap-2">
                            <button onClick={() => openQuotationPreview(q)} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-[#FF5349] hover:bg-red-50">
                              View Quotation
                            </button>
                            {(normalize(q.status) === "pending" || normalize(q.status) === "pending approval") && (
                              <>
                                <button onClick={() => handleAcceptQuote(q.id || q.number || "")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700">Accept</button>
                                <button onClick={() => handleRejectQuote(q.id || q.number || "")} className="rounded-lg bg-red-50 px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100">Reject</button>
                              </>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </Section>
            </div>
          )}

          {activeTab === "billing" && (
            <Section title="Invoices & Payments" subtitle="Only invoices generated for your client profile or projects.">
              {invoices.length === 0 ? (
                <EmptyState text="No invoices found for your account." />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {invoices.map((inv) => (
                    <GlassCard key={inv.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs font-mono font-extrabold text-[#FF5349]">{inv.id || inv.number}</span>
                          <h3 className="mt-1 text-base font-heading font-extrabold">{inv.title || inv.projectName || "Tax Invoice"}</h3>
                          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <CalendarDays size={13} /> Due: {inv.due || inv.dueDate || "Not scheduled"}
                          </p>
                        </div>
                        {renderStatus(inv.status || "pending")}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div>
                          <span className="block text-[11px] font-extrabold uppercase text-slate-500">Amount Due</span>
                          <span className="text-xl font-heading font-extrabold">{money(inv.totalDue || inv.totalAmount || inv.value || inv.amount || inv.rate)}</span>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2">
                          <button onClick={() => openInvoicePreview(inv)} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-[#FF5349] hover:bg-red-50">
                            View Invoice
                          </button>
                          {(normalize(inv.status) === "pending" || normalize(inv.status) === "unpaid") && (
                            <button onClick={() => triggerPayment(inv)} className="rounded-lg bg-[#06132D] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#0b2369]">
                              Pay Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </Section>
          )}

          {activeTab === "support" && (
            <Section title="Support Ticket Desk" subtitle="Raise a support request connected to your client account.">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  {ticketSuccess && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-extrabold text-emerald-700">
                      <Check size={16} /> Support ticket created successfully.
                    </div>
                  )}
                  <form onSubmit={handleRaiseTicket} className="grid gap-4">
                    <Field label="Ticket Subject">
                      <input value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} className={FORM_INPUT_CLASS} placeholder="Portal access, invoice query, project update..." />
                    </Field>
                    <Field label="Message Details">
                      <textarea value={ticketBody} onChange={(e) => setTicketBody(e.target.value)} className={`${FORM_INPUT_CLASS} min-h-32 resize-y`} placeholder="Describe your request or issue..." />
                    </Field>
                    <Button type="submit" variant="primary" className="w-fit rounded-lg px-5 py-3 text-xs font-extrabold">Submit Support Ticket</Button>
                  </form>
                </GlassCard>

                <GlassCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-extrabold">Your Tickets</h3>
                  <div className="mt-4">
                    {tickets.length === 0 ? <EmptyState text="No tickets submitted yet." compact /> : <TicketTable tickets={tickets} renderStatus={renderStatus} />}
                  </div>
                </GlassCard>
              </div>
            </Section>
          )}
        </div>
      </main>

      {pdfPreview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0f172a]">
          <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-heading text-base font-extrabold text-[#071E34]">{pdfPreview.title}</h3>
                <p className="text-xs font-semibold text-slate-500">Full page customer document preview</p>
              </div>
              <button
                onClick={() => setPdfPreview(null)}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-4 py-6 sm:px-8">
            <div
              className="mx-auto w-fit origin-top bg-white shadow-2xl"
              dangerouslySetInnerHTML={{ __html: pdfPreview.html }}
            />
          </div>
        </div>
      )}

      {showPayModal && payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="font-heading text-xl font-extrabold">Secure Online Payment</h3>
            <p className="mt-2 text-xs font-semibold text-slate-500">Invoice <span className="font-mono text-[#FF5349]">{payingInvoice.id}</span></p>
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
              <span className="block text-xs font-extrabold uppercase text-slate-500">Total Amount</span>
              <span className="mt-1 block text-3xl font-heading font-extrabold">{money(payingInvoice.totalDue || payingInvoice.totalAmount || payingInvoice.value || payingInvoice.amount)}</span>
            </div>
            {paymentSuccess ? (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xs font-extrabold text-emerald-700">
                <Check size={16} /> Payment logged successfully.
              </div>
            ) : (
              <div className="mt-5 grid gap-3">
                <input className={FORM_INPUT_CLASS} defaultValue="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <input className={FORM_INPUT_CLASS} defaultValue="12/28" />
                  <input className={FORM_INPUT_CLASS} defaultValue="123" />
                </div>
                <Button onClick={executeMockPayment} disabled={isPaying} variant="primary" className="mt-2 w-full rounded-lg py-3 text-xs font-extrabold">
                  {isPaying ? "Processing Payment..." : "Confirm & Pay Now"}
                </Button>
                <button onClick={() => setShowPayModal(false)} className="py-2 text-center text-xs font-extrabold text-slate-500 hover:text-slate-800">Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-extrabold text-[#071E34]">{title}</h2>
        <p className="mt-1 text-sm font-medium text-slate-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center text-sm font-semibold text-slate-500 ${compact ? "p-5" : "p-8"}`}>
      {text}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold uppercase text-slate-500">{label}</div>
      <div className="mt-1 break-words text-sm font-bold text-[#071E34]">{value || "Not added"}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-extrabold uppercase text-[#FF5349]">{label} *</span>
      {children}
    </label>
  );
}

function RecordRow({ title, meta, right }: { title: string; meta: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-extrabold">{title}</div>
        <div className="mt-0.5 truncate text-xs font-semibold text-slate-500">{meta}</div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function TicketTable({ tickets, renderStatus }: { tickets: Ticket[]; renderStatus: (status?: string) => React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-slate-200 text-slate-500">
          <tr>
            <th className="pb-3 font-extrabold uppercase">Ticket ID</th>
            <th className="pb-3 font-extrabold uppercase">Subject</th>
            <th className="pb-3 font-extrabold uppercase">Date</th>
            <th className="pb-3 font-extrabold uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-red-50/40">
              <td className="py-3 font-mono font-extrabold text-[#FF5349]">{ticket.id}</td>
              <td className="py-3 font-bold">{ticket.subject}</td>
              <td className="py-3 font-semibold text-slate-500">{ticket.date}</td>
              <td className="py-3">{renderStatus(ticket.status || "open")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
