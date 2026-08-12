const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\MultiAgentsPage.tsx";import React, { useState, useEffect } from "react";
import { Bot, Sparkles, Play, RefreshCw, Cpu, Terminal } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

















export default function MultiAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    activeAgentsCount: 4,
    totalTasksExecuted: 759,
    avgAutomationSpeed: "1.4s",
    workflowUptime: "99.98%"
  });
  const [loading, setLoading] = useState(true);
  const [executingAgentId, setExecutingAgentId] = useState(null);

  const fetchAgentStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/agents/status`).then(r => r.json());
      if (res.success) {
        setAgents(res.agents || []);
        setLogs(res.recentLogs || []);
        if (res.systemStats) setStats(res.systemStats);
      }
    } catch (err) {
      console.error("Fetch agents error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRunAgentAction = async (agentId, actionType) => {
    setExecutingAgentId(agentId);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          actionType,
          payload: { projectName: "Enterprise Cloud ERP", name: "Global Logistics Inc", budget: 150000 }
        })
      }).then(r => r.json());

      if (res.success) {
        await fetchAgentStatus();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExecutingAgentId(null);
    }
  };

  return (
    React.createElement('div', { className: "space-y-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
      /* Top Banner */
      , React.createElement('div', { className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-[#1d1003] to-blue-950 p-6 sm:p-8 border border-amber-500/30 shadow-2xl shadow-amber-950/40"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
        , React.createElement('div', { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
            , React.createElement('div', { className: "flex items-center gap-2 mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
              , React.createElement('span', { className: "px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
                , React.createElement(Sparkles, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}} ), " Autonomous Multi-Agent Orchestrator"
              )
            )
            , React.createElement('h1', { className: "text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight flex items-center gap-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
              , React.createElement(Bot, { size: 32, className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} ), " Multi-Agent AI Studio & Fleet"
            )
            , React.createElement('p', { className: "text-sm text-slate-300 mt-1 max-w-2xl"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "Specialized autonomous AI agents working collaboratively to qualify leads, auto-generate proposal estimations, answer support tickets, and audit financial collections."

            )
          )
          , React.createElement('button', {
            onClick: fetchAgentStatus,
            className: "px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-all self-start md:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}

            , React.createElement(RefreshCw, { size: 14, className: loading ? "animate-spin" : "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}} ), " Refresh Fleet State"
          )
        )
      )

      /* System Metrics Bar */
      , React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-4 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
        , React.createElement('div', { className: "p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
          , React.createElement('span', { className: "text-[10px] font-mono text-slate-400 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}, "Active Fleet" )
          , React.createElement('span', { className: "text-2xl font-black text-amber-400 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}, stats.activeAgentsCount, " Agents" )
        )
        , React.createElement('div', { className: "p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
          , React.createElement('span', { className: "text-[10px] font-mono text-slate-400 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Tasks Completed" )
          , React.createElement('span', { className: "text-2xl font-black text-emerald-400 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}, stats.totalTasksExecuted)
        )
        , React.createElement('div', { className: "p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
          , React.createElement('span', { className: "text-[10px] font-mono text-slate-400 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}, "Avg Latency" )
          , React.createElement('span', { className: "text-2xl font-black text-rose-400 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}, stats.avgAutomationSpeed)
        )
        , React.createElement('div', { className: "p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
          , React.createElement('span', { className: "text-[10px] font-mono text-slate-400 uppercase tracking-wider block"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "Workflow Uptime" )
          , React.createElement('span', { className: "text-2xl font-black text-rose-400 font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, stats.workflowUptime)
        )
      )

      /* Agents Cards Grid */
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
        , agents.map((agent) => {
          const isExecuting = executingAgentId === agent.id;
          return (
            React.createElement('div', {
              key: agent.id,
              className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-4 shadow-xl hover:border-amber-500/40 transition-all relative overflow-hidden"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}

              , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
                , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
                  , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-700/30"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
                    , React.createElement(Bot, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} )
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                    , React.createElement('h3', { className: "text-base font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, agent.name)
                    , React.createElement('span', { className: "text-[10px] font-mono text-amber-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, agent.id)
                  )
                )
                , React.createElement('span', { className: `text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  agent.status.includes("Executing") 
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse" 
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                  , agent.status
                )
              )

              , React.createElement('div', { className: "grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-center"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
                  , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, "SUCCESS RATE" )
                  , React.createElement('span', { className: "font-bold text-emerald-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}, agent.successRate)
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
                  , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, "TASKS DONE" )
                  , React.createElement('span', { className: "font-bold text-amber-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}, agent.tasksCompleted)
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
                  , React.createElement('span', { className: "text-[10px] text-slate-500 block"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}, "LAST RUN" )
                  , React.createElement('span', { className: "font-semibold text-slate-300 font-mono text-[10px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}, "Just now" )
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between pt-2 border-t border-rose-500/10"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                , React.createElement('span', { className: "text-[11px] text-slate-400 flex items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
                  , React.createElement(Cpu, { size: 14, className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}} ), " Autonomous Trigger Ready"
                )
                , React.createElement('button', {
                  onClick: () => handleRunAgentAction(agent.id, "Manual Trigger"),
                  disabled: isExecuting,
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#FF5349]/20 disabled:opacity-50"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}

                  , React.createElement(Play, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}} ), " " , isExecuting ? "Executing Agent..." : "Trigger Action"
                )
              )
            )
          );
        })
      )

      /* Agent Execution Logs Feed */
      , React.createElement('div', { className: "rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-4 shadow-xl"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}
        , React.createElement('div', { className: "flex items-center justify-between border-b border-rose-500/10 pb-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
          , React.createElement('h3', { className: "text-base font-bold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
            , React.createElement(Terminal, { size: 18, className: "text-amber-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}} ), " Multi-Agent Execution Audit Stream"
          )
          , React.createElement('span', { className: "text-xs font-mono text-emerald-400 flex items-center gap-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
            , React.createElement('span', { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}), " Live Stream"
          )
        )

        , React.createElement('div', { className: "space-y-2 max-h-80 overflow-y-auto pr-2 font-mono text-xs"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}
          , logs.map((log) => (
            React.createElement('div', { key: log.id, className: "p-3 rounded-xl bg-black/40 border border-amber-500/10 flex items-start gap-3 hover:border-amber-500/20 transition-all"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
              , React.createElement('span', { className: "text-[10px] text-amber-400 shrink-0 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}, "[", new Date(log.timestamp).toLocaleTimeString(), "]")
              , React.createElement('p', { className: "text-slate-200 leading-relaxed" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}, log.message)
            )
          ))
        )
      )
    )
  );
}

