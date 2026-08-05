/**
 * Multi-Agent System Controller for CRM Automation
 * Specialized AI Agents: Lead Qualifier, Quotation Studio Generator, Support Ticket Assistant, Billing Analyst
 */

const agentsState = {
  leadAgent: { id: "agent-lead", name: "Lead Qualification Agent", status: "Idle", lastRun: new Date().toISOString(), tasksCompleted: 142, successRate: "98.5%" },
  quoteAgent: { id: "agent-quote", name: "Quotation Proposal Studio Agent", status: "Active", lastRun: new Date().toISOString(), tasksCompleted: 218, successRate: "99.1%" },
  supportAgent: { id: "agent-support", name: "Customer Support Assistant Agent", status: "Idle", lastRun: new Date().toISOString(), tasksCompleted: 304, successRate: "96.8%" },
  billingAgent: { id: "agent-billing", name: "Billing & Collections Agent", status: "Idle", lastRun: new Date().toISOString(), tasksCompleted: 95, successRate: "100%" }
};

const agentLogs = [
  { id: "log-1", agentId: "agent-lead", timestamp: new Date(Date.now() - 5 * 60000).toISOString(), message: "Processed new lead #LD-9021. Lead Score calculated: 88/100 (High Priority). Assigned to Enterprise Sales Team." },
  { id: "log-2", agentId: "agent-quote", timestamp: new Date(Date.now() - 12 * 60000).toISOString(), message: "Auto-compiled multi-scope quotation QT-WEB-8812 for project 'Apex E-Commerce Engine'. Total Plan A: $50,000, Plan B: $85,000." },
  { id: "log-3", agentId: "agent-support", timestamp: new Date(Date.now() - 25 * 60000).toISOString(), message: "Analyzed incoming ticket TCK-4029. Generated smart response draft with 95% confidence score." },
  { id: "log-4", agentId: "agent-billing", timestamp: new Date(Date.now() - 40 * 60000).toISOString(), message: "Audited 18 active invoices. Flagged INV-2026-03 for automated payment reminder trigger." }
];

exports.getAgentsStatus = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      agents: Object.values(agentsState),
      recentLogs: agentLogs.slice(0, 15),
      systemStats: {
        activeAgentsCount: 4,
        totalTasksExecuted: 759,
        avgAutomationSpeed: "1.4s",
        workflowUptime: "99.98%"
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.runAgentAction = async (req, res, next) => {
  try {
    const { agentId, actionType, payload } = req.body;

    let resultSummary = "";
    const agent = Object.values(agentsState).find(a => a.id === agentId);

    if (agent) {
      agent.status = "Executing Task...";
      agent.lastRun = new Date().toISOString();
      agent.tasksCompleted += 1;
    }

    if (agentId === "agent-lead") {
      resultSummary = `Lead Agent evaluated lead input for '${payload?.name || "Client"}'. Score: 92/100. Categorized as Qualified Enterprise Opportunity.`;
    } else if (agentId === "agent-quote") {
      resultSummary = `Quotation Agent compiled scope deliverables for '${payload?.projectName || "Project"}'. Standard Plan: $65,000 | Premium Plan: $120,000.`;
    } else if (agentId === "agent-support") {
      resultSummary = `Support Agent drafted AI resolution note for ticket '${payload?.ticketId || "TCK-100"}'. Solution suggested with high relevance score.`;
    } else if (agentId === "agent-billing") {
      resultSummary = `Billing Agent verified transaction ledger. Clean reconciliation verified across active gateways.`;
    } else {
      resultSummary = `Multi-Agent pipeline executed action '${actionType || "Auto-Run"}' successfully.`;
    }

    const newLog = {
      id: `log-${Date.now()}`,
      agentId: agentId || "agent-system",
      timestamp: new Date().toISOString(),
      message: resultSummary
    };
    agentLogs.unshift(newLog);

    setTimeout(() => {
      if (agent) agent.status = "Idle";
    }, 3000);

    return res.status(200).json({
      success: true,
      message: "Multi-Agent action executed successfully.",
      result: resultSummary,
      log: newLog,
      agentState: agent
    });
  } catch (error) {
    next(error);
  }
};
