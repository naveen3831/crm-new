import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Plus, Search, Layers, CheckCircle2, ArrowRight, FileText, Building2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Project {
  id: string;
  name: string;
  clientName: string;
  category: string;
  manager: string;
  budget: number;
  priority: string;
  status: string;
  description: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    clientName: "Acme Enterprises",
    category: "Web & Mobile Development",
    manager: "Admin Lead",
    budget: 50000,
    priority: "High",
    status: "In progress",
    description: ""
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/project`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProj = {
      id: `PRJ-${Date.now().toString().slice(-4)}`,
      ...form
    };

    try {
      const res = await fetch(`${API_URL}/crm/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProj)
      }).then(r => r.json());

      const saved = res.data || newProj;
      setProjects(prev => [saved, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(p =>
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.clientName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <Briefcase className="text-[#FF5349]" /> Active Software Projects
          </h1>
          <p className="text-xs text-slate-400 mt-1">Select any project to open its dedicated full page and generate scope proposals</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Create New Project
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search projects by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/admin/projects/${project.id}`)}
            className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/50 transition-all shadow-xl cursor-pointer group hover:scale-[1.01]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 font-bold block">{project.id}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{project.name}</h3>
                <p className="text-xs text-amber-400 font-medium flex items-center gap-1 mt-0.5">
                  <Building2 size={12} /> {project.clientName}
                </p>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {project.status || "In Progress"}
              </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {project.description || "Comprehensive software engineering project scope."}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">BUDGET</span>
                <span className="font-bold text-emerald-400">₹{Number(project.budget || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-rose-400 group-hover:underline flex items-center gap-1">
                  Open Project Full Page <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-white font-heading">Initialize New Software Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Project Title *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  placeholder="E-Commerce Mobile Platform"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Client Name *</label>
                <input
                  type="text" required
                  value={form.clientName}
                  onChange={e => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Budget ($) *</label>
                  <input
                    type="number" required
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

