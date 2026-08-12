import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Filter, Trash2, Edit3, Phone, Mail, Building2, CheckCircle, ShieldAlert, Eye, FileText, CreditCard, X, Save } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, openPdfPrintPreview } from "../../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

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
  status: string;
  notes: string;
  createdDate: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientDocumentOverrides, setClientDocumentOverrides] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("crm_client_document_overrides") || "{}");
    } catch {
      localStorage.removeItem("crm_client_document_overrides");
      return {};
    }
  });
  const [pdfPreview, setPdfPreview] = useState<{ type: "quotation" | "invoice"; title: string; html: string; item: any; client: Client } | null>(null);
  const [editingPdf, setEditingPdf] = useState<{ type: "quotation" | "invoice"; item: any; client: Client } | null>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    whatsapp: "",
    industry: "Information Technology",
    type: "Enterprise",
    assignedEmployee: "Admin Operator",
    status: "Active",
    notes: ""
  });

  const getClientDocumentKey = (client: Client, item: any, type: "quotation" | "invoice") => {
    const ref = item?.number || item?.id || `${type}-${client.id}`;
    return `${client.id || client.email || client.name}::${type}::${ref}`;
  };

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

  const getClientDocumentOverrideKeys = (client: Client, item: any, type: "quotation" | "invoice") => {
    const scopes = Array.from(new Set([client.id, client.email, client.name].filter(Boolean)));
    const refs = Array.from(new Set([
      item?.number,
      item?.id,
      item?.refNumber,
      `${type}-${client.id}`,
      type === "invoice" ? `INV-${client.id}-01` : `QT-${client.id}-01`
    ].map(ref => `${ref || ""}`.trim()).filter(Boolean)));
    return scopes.flatMap(scope => refs.map(ref => `${scope}::${type}::${ref}`));
  };

  const withClientDocumentOverride = (client: Client, item: any, type: "quotation" | "invoice") => {
    const override = getClientDocumentOverrideKeys(client, item, type)
      .map(key => clientDocumentOverrides[key])
      .find(Boolean);
    return override ? { ...item, ...override } : item;
  };

  const saveClientDocumentOverride = async (client: Client, item: any, type: "quotation" | "invoice") => {
    const overrideKeys = getClientDocumentOverrideKeys(client, item, type);
    const nextOverrides = { ...clientDocumentOverrides };
    overrideKeys.forEach(key => {
      nextOverrides[key] = item;
    });
    setClientDocumentOverrides(nextOverrides);
    persistClientDocumentOverridesCache(nextOverrides);
    const documentKey = overrideKeys[0] || getClientDocumentKey(client, item, type);
    await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(documentKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: documentKey,
        documentKey,
        overrideKeys,
        documentType: type,
        clientScope: client.id || client.email || client.name,
        documentRef: item?.number || item?.id || `${type}-${client.id}`,
        clientId: client.id,
        item,
        updatedAt: new Date().toISOString()
      })
    });
  };

  const getDefaultClientDoc = (client: Client, type: "quotation" | "invoice") => {
    const baseAmount = 50000;
    const taxPct = 18;
    const totalDue = Math.round(baseAmount * (1 + taxPct / 100));
    const common = {
      clientName: client.name,
      clientEmail: client.email,
      productName: client.company || "Software Project",
      title: `${client.company || client.name} ${type === "invoice" ? "Tax Invoice" : "Quotation"}`,
      date: new Date().toISOString().split("T")[0],
      companyName: "Speshway Solutions Private Limited",
      billedByCompany: "Speshway Solutions Private Limited",
      companyTagline: "Software Development Company",
      companyHeaderSub: "Software Development Company",
      billedBySub: "Software Development Company",
      companyAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      billedByAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      companyEmail: "info@speshway.com",
      companyPhone: "+91 91000 06020",
      companyWebsite: "www.speshway.com",
      companyLogoUrl: "/logo.jpg",
      companyFooterName: "Speshway Solutions Private Limited",
      companyFooterAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      companyFooterContact: "www.speshway.com - info@speshway.com - +91 91000 06020",
      pdfFooterTheme: "dark",
      pdfPrimaryColor: type === "invoice" ? "#003b8e" : "#4c1d95",
      pdfSecondaryColor: type === "invoice" ? "#d97706" : "#7c3aed",
      showWatermark: true,
      companyWatermarkText: "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: type === "invoice" ? 0.08 : 0.2,
      companyWatermarkRotation: -15,
      companyWatermarkSize: 40,
      companyWatermarkImgSize: 220
    };

    if (type === "invoice") {
      return {
        ...common,
        id: `INV-${client.id}-01`,
        number: `INV-${client.id}-01`,
        description: `${client.company || "Software"} Web & Mobile Application`,
        subdesc: `Design, development & delivery of software application for ${client.name}`,
        rate: baseAmount,
        amount: baseAmount,
        taxPct,
        totalDue,
        accountName: "SPESHWAY SOLUTIONS PRIVATE LIMITED",
        accountNumber: "018326900000850",
        ifscCode: "YESB0000183",
        branch: "HITECH CITY"
      };
    }

    return {
      ...common,
      id: `QT-${client.id}-01`,
      number: `QT-${client.id}-01`,
      overviewNarrative: "Full-stack responsive application development and delivery.",
      planAPrice: baseAmount,
      rate: baseAmount,
      taxPct,
      paymentTerms: "50% Advance upon signing proposal, 50% upon deployment.",
      customFeatures: [
        { title: "Responsive Web Portal", description: "Modern responsive web application optimized for mobile and desktop." },
        { title: "Admin Dashboard", description: "Management dashboard for tracking operations, users, and reporting." }
      ]
    };
  };

  const renderClientPdfHtml = (item: any, type: "quotation" | "invoice") => (
    type === "invoice"
      ? generateSpeshwayTaxInvoicePdfHtml(item, null, 0.85)
      : generateSpeshwayEstimationPdfHtml(null, item, item.customFeatures || [], 0.85)
  );

  const openClientPdfPreview = (client: Client, type: "quotation" | "invoice") => {
    const baseDoc = getDefaultClientDoc(client, type);
    const item = withClientDocumentOverride(client, baseDoc, type);
    const html = renderClientPdfHtml(item, type);
    setPdfPreview({
      type,
      title: `${type === "invoice" ? "Tax Invoice" : "Quotation"} Preview - ${item.number || item.id}`,
      html,
      item,
      client
    });
  };

  const saveEditedClientPdf = async () => {
    if (!editingPdf) return;
    const item = {
      ...editingPdf.item,
      companyWebsite: editingPdf.item.companyWebsite?.trim() || "www.speshway.com",
      companyFooterName: editingPdf.item.companyFooterName?.trim() || editingPdf.item.companyName,
      companyFooterAddress: editingPdf.item.companyFooterAddress?.trim() || editingPdf.item.companyAddress,
      companyFooterContact: editingPdf.item.companyFooterContact?.trim() || `${editingPdf.item.companyWebsite || "www.speshway.com"} - ${editingPdf.item.companyEmail} - ${editingPdf.item.companyPhone}`
    };
    const savedType = editingPdf.type;
    const savedClient = editingPdf.client;
    setPdfPreview({
      type: savedType,
      title: `${savedType === "invoice" ? "Tax Invoice" : "Quotation"} Preview - ${item.number || item.id}`,
      html: renderClientPdfHtml(item, savedType),
      item,
      client: savedClient
    });
    setEditingPdf(null);
    saveClientDocumentOverride(savedClient, item, savedType).catch(err => {
      console.error("Save client PDF document override error", err);
      alert("Preview updated, but database save failed. Please try Save again.");
    });
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/client`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setClients(res.data);
      }
    } catch (err) {
      console.error("Fetch clients error", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDocumentOverrides = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/client-document`).then(r => r.json());
      const records = Array.isArray(res?.data) ? res.data : [];
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
      if (Object.keys(nextOverrides).length > 0) {
        setClientDocumentOverrides(prev => {
          const merged = { ...prev, ...nextOverrides };
          persistClientDocumentOverridesCache(merged);
          return merged;
        });
      }
    } catch (err) {
      console.error("Fetch client PDF document overrides error", err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchClientDocumentOverrides();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      id: `CLT-${Date.now().toString().slice(-4)}`,
      ...form,
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch(`${API_URL}/crm/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient)
      }).then(r => r.json());

      const saved = res.data || newClient;
      setClients(prev => [saved, ...prev]);
      setShowAddModal(false);
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        whatsapp: "",
        industry: "Information Technology",
        type: "Enterprise",
        assignedEmployee: "Admin Operator",
        status: "Active",
        notes: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await fetch(`${API_URL}/crm/client/${id}`, { method: "DELETE" });
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const [clientTypeTab, setClientTypeTab] = useState<"All" | "Permanent">("All");

  const handleUpgradeToPermanent = async (id: string) => {
    try {
      await fetch(`${API_URL}/crm/client/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "Permanent", status: "Active" })
      });
    } catch (err) {
      console.error(err);
    }
    setClients(prev => prev.map(c => c.id === id ? { ...c, type: "Permanent", status: "Active" } : c));
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || c.status === filterStatus;
    const isTemp = c.type === "Temporary" || c.status === "Temporary";
    const matchesTypeTab = clientTypeTab === "All" ||
                           (clientTypeTab === "Permanent" && !isTemp);
    return !isTemp && matchesSearch && matchesFilter && matchesTypeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <Users className="text-[#FF5349]" /> Client Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage enterprise accounts, contacts, temporary prospects & permanent client profiles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Add New Client
        </button>
      </div>

      {/* TYPE FILTER TABS */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0B2369] border border-white/10 rounded-2xl w-fit">
        <button
          onClick={() => setClientTypeTab("All")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            clientTypeTab === "All" ? "bg-[#F05454] text-white shadow-md" : "text-slate-300 hover:text-white"
          }`}
        >
          All Clients ({clients.filter(c => c.type !== "Temporary" && c.status !== "Temporary").length})
        </button>
        <button
          onClick={() => setClientTypeTab("Permanent")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            clientTypeTab === "Permanent" ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold" : "text-emerald-400/80 hover:text-emerald-300"
          }`}
        >
          <CheckCircle size={13} />
          Permanent Clients ({clients.filter(c => c.type !== "Temporary" && c.status !== "Temporary").length})
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search clients by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 focus:outline-none focus:border-[#FF5349]"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Temporary">Temporary</option>
          <option value="Potential">Potential</option>
          <option value="Existing">Existing</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const isTemporary = client.type === "Temporary" || client.status === "Temporary";
          return (
            <div
              key={client.id}
              className={`rounded-2xl bg-[#071E34] border p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl ${
                isTemporary ? "border-amber-500/30 bg-gradient-to-b from-[#071E34] to-[#1a1205]" : "border-rose-500/20"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border font-bold flex items-center justify-center text-sm ${
                    isTemporary ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "bg-blue-600/20 border-rose-500/30 text-rose-400"
                  }`}>
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{client.name}</h3>
                    <p className="text-xs text-amber-400 flex items-center gap-1">
                      <Building2 size={12} /> {client.company || "Independent"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {isTemporary ? (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                      Temporary Client
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                      Permanent Client
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-rose-500/10">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={14} className="text-rose-400 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone size={14} className="text-rose-400 shrink-0" />
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-rose-500/10">
                <button
                  onClick={() => openClientPdfPreview(client, "quotation")}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText size={12} /> Preview Quote
                </button>
                <button
                  onClick={() => openClientPdfPreview(client, "invoice")}
                  className="px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-blue-300 font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all"
                >
                  <CreditCard size={12} /> Preview Invoice
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs">
                <span className="text-[10px] text-slate-500 font-mono">ID: {client.id}</span>
                <div className="flex items-center gap-2">
                  {isTemporary && (
                    <button
                      onClick={() => handleUpgradeToPermanent(client.id)}
                      className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-lg text-[10px] flex items-center gap-1 shadow-md transition-all"
                    >
                      <CheckCircle size={11} /> Make Permanent
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10 transition-colors"
                    title="Delete Client"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pdfPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          <div className="shrink-0 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Eye className="w-5 h-5 text-[#FF5349]" />
              <h3 className="font-extrabold text-sm text-[#071E34] truncate">{pdfPreview.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingPdf({ type: pdfPreview.type, item: pdfPreview.item, client: pdfPreview.client })}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-[#071E34] border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Edit3 size={13} /> Edit PDF
              </button>
              <button
                onClick={() => openPdfPrintPreview(pdfPreview.html)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
              >
                Print / Save
              </button>
              <button
                onClick={() => setPdfPreview(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 p-4 bg-slate-900">
            <iframe
              srcDoc={pdfPreview.html}
              className="w-full h-full rounded-2xl border border-slate-700 bg-slate-900"
              title="Client PDF Preview"
            />
          </div>
        </div>
      )}

      {editingPdf && (() => {
        const updatePdfItem = (patch: any) => setEditingPdf({ ...editingPdf, item: { ...editingPdf.item, ...patch } });
        const liveHtml = renderClientPdfHtml(editingPdf.item, editingPdf.type);
        const isInvoice = editingPdf.type === "invoice";

        return (
          <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
            <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-5 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-extrabold text-white text-sm">Edit {isInvoice ? "Invoice" : "Quotation"} PDF</h3>
                <p className="text-[10px] text-slate-400">Only PDF content is editable here. Master quotation and invoice data stays separate.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={saveEditedClientPdf}
                  className="px-4 py-2 bg-[#FF5349] hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
                >
                  <Save size={14} /> Save PDF Edits
                </button>
                <button
                  onClick={() => setEditingPdf(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
              <div className="lg:col-span-5 bg-white rounded-2xl overflow-y-auto p-5 space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-950 uppercase tracking-wider">Document Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Document Number</label>
                      <input value={editingPdf.item.number || editingPdf.item.id || ""} onChange={e => updatePdfItem({ number: e.target.value, id: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Date</label>
                      <input value={editingPdf.item.date || ""} onChange={e => updatePdfItem({ date: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-bold" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Client Name</label>
                      <input value={editingPdf.item.clientName || ""} onChange={e => updatePdfItem({ clientName: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-bold" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Product / Scope</label>
                      <input value={editingPdf.item.productName || editingPdf.item.title || ""} onChange={e => updatePdfItem({ productName: e.target.value, title: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-bold" />
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-3">
                  <h4 className="font-extrabold text-rose-950 uppercase tracking-wider">Company Details</h4>
                  <input placeholder="Company name" value={editingPdf.item.companyName || ""} onChange={e => updatePdfItem({ companyName: e.target.value, billedByCompany: e.target.value, companyFooterName: e.target.value })} className="w-full p-2 border border-rose-200 rounded-xl font-bold" />
                  <input placeholder="Tagline" value={editingPdf.item.companyTagline || ""} onChange={e => updatePdfItem({ companyTagline: e.target.value, companyHeaderSub: e.target.value, billedBySub: e.target.value })} className="w-full p-2 border border-rose-200 rounded-xl font-bold" />
                  <input placeholder="Email" value={editingPdf.item.companyEmail || ""} onChange={e => updatePdfItem({ companyEmail: e.target.value })} className="w-full p-2 border border-rose-200 rounded-xl font-mono" />
                  <input placeholder="Phone" value={editingPdf.item.companyPhone || ""} onChange={e => updatePdfItem({ companyPhone: e.target.value })} className="w-full p-2 border border-rose-200 rounded-xl font-mono" />
                  <input placeholder="Address" value={editingPdf.item.companyAddress || ""} onChange={e => updatePdfItem({ companyAddress: e.target.value, billedByAddress: e.target.value, companyFooterAddress: e.target.value })} className="w-full p-2 border border-rose-200 rounded-xl" />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-950 uppercase tracking-wider">Footer</h4>
                  {!isInvoice && (
                    <select value={editingPdf.item.pdfFooterTheme || "dark"} onChange={e => updatePdfItem({ pdfFooterTheme: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-bold">
                      <option value="dark">Dark Footer</option>
                      <option value="white">White Footer</option>
                    </select>
                  )}
                  <input placeholder="Footer company name" value={editingPdf.item.companyFooterName || editingPdf.item.companyName || ""} onChange={e => updatePdfItem({ companyFooterName: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-bold" />
                  <input placeholder="Website" value={editingPdf.item.companyWebsite || "www.speshway.com"} onChange={e => updatePdfItem({ companyWebsite: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-mono" />
                  <input placeholder="Footer address" value={editingPdf.item.companyFooterAddress || editingPdf.item.companyAddress || ""} onChange={e => updatePdfItem({ companyFooterAddress: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl" />
                  <input placeholder="Footer contact line" value={editingPdf.item.companyFooterContact || `${editingPdf.item.companyWebsite || "www.speshway.com"} - ${editingPdf.item.companyEmail || "info@speshway.com"} - ${editingPdf.item.companyPhone || "+91 91000 06020"}`} onChange={e => updatePdfItem({ companyFooterContact: e.target.value })} className="w-full p-2 border border-slate-300 rounded-xl font-mono" />
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-3">
                  <h4 className="font-extrabold text-purple-950 uppercase tracking-wider">Theme & Watermark</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="color" value={editingPdf.item.pdfPrimaryColor || "#003b8e"} onChange={e => updatePdfItem({ pdfPrimaryColor: e.target.value })} className="w-full h-10 rounded-xl border border-purple-200" />
                    <input type="color" value={editingPdf.item.pdfSecondaryColor || "#d97706"} onChange={e => updatePdfItem({ pdfSecondaryColor: e.target.value })} className="w-full h-10 rounded-xl border border-purple-200" />
                  </div>
                  <input placeholder="Watermark text" value={editingPdf.item.companyWatermarkText || ""} onChange={e => updatePdfItem({ companyWatermarkText: e.target.value })} className="w-full p-2 border border-purple-200 rounded-xl font-bold" />
                  <input type="range" min="0.02" max="0.4" step="0.01" value={editingPdf.item.companyWatermarkOpacity ?? 0.08} onChange={e => updatePdfItem({ companyWatermarkOpacity: Number(e.target.value) })} className="w-full accent-purple-600" />
                </div>

                {isInvoice ? (
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-3">
                    <h4 className="font-extrabold text-blue-950 uppercase tracking-wider">Invoice PDF Fields</h4>
                    <input placeholder="Line item description" value={editingPdf.item.description || ""} onChange={e => updatePdfItem({ description: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl font-bold" />
                    <textarea rows={2} placeholder="Sub-description" value={editingPdf.item.subdesc || ""} onChange={e => updatePdfItem({ subdesc: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl" />
                    <div className="grid grid-cols-3 gap-2">
                      <input type="number" value={editingPdf.item.rate || editingPdf.item.amount || 0} onChange={e => { const rate = Number(e.target.value); const taxPct = Number(editingPdf.item.taxPct ?? 18); updatePdfItem({ rate, amount: rate, totalDue: Math.round(rate * (1 + taxPct / 100)) }); }} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                      <input type="number" value={editingPdf.item.taxPct ?? 18} onChange={e => { const taxPct = Number(e.target.value); const rate = Number(editingPdf.item.rate || editingPdf.item.amount || 0); updatePdfItem({ taxPct, totalDue: Math.round(rate * (1 + taxPct / 100)) }); }} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                      <input type="number" value={editingPdf.item.totalDue || 0} onChange={e => updatePdfItem({ totalDue: Number(e.target.value) })} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                    </div>
                    <input placeholder="Account name" value={editingPdf.item.accountName || ""} onChange={e => updatePdfItem({ accountName: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl font-bold" />
                    <input placeholder="Account number" value={editingPdf.item.accountNumber || ""} onChange={e => updatePdfItem({ accountNumber: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                    <input placeholder="IFSC" value={editingPdf.item.ifscCode || ""} onChange={e => updatePdfItem({ ifscCode: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                    <input placeholder="Branch" value={editingPdf.item.branch || ""} onChange={e => updatePdfItem({ branch: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl font-bold" />
                  </div>
                ) : (
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-3">
                    <h4 className="font-extrabold text-blue-950 uppercase tracking-wider">Quotation PDF Fields</h4>
                    <textarea rows={3} value={editingPdf.item.overviewNarrative || ""} onChange={e => updatePdfItem({ overviewNarrative: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl" />
                    <input type="number" value={editingPdf.item.planAPrice || editingPdf.item.rate || 0} onChange={e => updatePdfItem({ planAPrice: Number(e.target.value), rate: Number(e.target.value) })} className="w-full p-2 border border-blue-200 rounded-xl font-mono" />
                    <textarea rows={2} value={editingPdf.item.paymentTerms || ""} onChange={e => updatePdfItem({ paymentTerms: e.target.value })} className="w-full p-2 border border-blue-200 rounded-xl" />
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-4 min-h-0">
                <iframe srcDoc={liveHtml} className="w-full h-full rounded-xl border border-slate-700 bg-slate-900" title="Client PDF Live Editor Preview" />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading">Add New Client Account</h2>
            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Client Full Name *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Company / Organization *</label>
                <input
                  type="text" required
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Phone Number *</label>
                  <input
                    type="text" required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

