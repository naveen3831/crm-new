const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\ProjectsPage.tsx";import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Plus, Search, ArrowRight, Building2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";













export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
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

  const handleCreateProject = async (e) => {
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
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
            , React.createElement(Briefcase, { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}} ), " Active Software Projects"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}, "Select any project to open its dedicated full page and generate scope proposals"            )
        )
        , React.createElement('button', {
          onClick: () => setShowAddModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}} ), " Create New Project"
        )
      )

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
        , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}} )
        , React.createElement('input', {
          type: "text",
          placeholder: "Search projects by name or client..."     ,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
        )
      )

      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
        , filteredProjects.map((project) => (
          React.createElement('div', {
            key: project.id,
            onClick: () => navigate(`/admin/projects/${project.id}`),
            className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/50 transition-all shadow-xl cursor-pointer group hover:scale-[1.01]"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}

            , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
                , React.createElement('span', { className: "text-[10px] font-mono text-rose-400 font-bold block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}, project.id)
                , React.createElement('h3', { className: "text-sm font-bold text-white group-hover:text-amber-300 transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}, project.name)
                , React.createElement('p', { className: "text-xs text-amber-400 font-medium flex items-center gap-1 mt-0.5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
                  , React.createElement(Building2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} ), " " , project.clientName
                )
              )
              , React.createElement('span', { className: "text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
                , project.status || "In Progress"
              )
            )

            , React.createElement('p', { className: "text-xs text-slate-400 line-clamp-2 leading-relaxed"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
              , project.description || "Comprehensive software engineering project scope."
            )

            , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
                , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "BUDGET")
                , React.createElement('span', { className: "font-bold text-emerald-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}, "₹", Number(project.budget || 0).toLocaleString('en-IN'))
              )
              , React.createElement('div', { className: "text-right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
                , React.createElement('span', { className: "text-xs font-semibold text-rose-400 group-hover:underline flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, "Open Project Full Page "
                      , React.createElement(ArrowRight, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} )
                )
              )
            )
          )
        ))
      )

      , showAddModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
          , React.createElement('div', { className: "bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}, "Initialize New Software Project"   )
            , React.createElement('form', { onSubmit: handleCreateProject, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}, "Project Title *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.name,
                  onChange: e => setForm({ ...form, name: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "E-Commerce Mobile Platform"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}, "Client Name *"  )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.clientName,
                  onChange: e => setForm({ ...form, clientName: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}, "Budget ($) *"  )
                  , React.createElement('input', {
                    type: "number", required: true,
                    value: form.budget,
                    onChange: e => setForm({ ...form, budget: Number(e.target.value) }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
                  )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}, "Priority")
                  , React.createElement('select', {
                    value: form.priority,
                    onChange: e => setForm({ ...form, priority: e.target.value }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}

                    , React.createElement('option', { value: "Low", __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, "Low")
                    , React.createElement('option', { value: "Medium", __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}, "Medium")
                    , React.createElement('option', { value: "High", __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}, "High")
                    , React.createElement('option', { value: "Critical", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}, "Critical")
                  )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowAddModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
, "Save Project"

                )
              )
            )
          )
        )
      )
    )
  );
}

