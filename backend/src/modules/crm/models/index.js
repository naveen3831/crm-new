const mongoose = require("mongoose");

const Client = require("./client.model");
const Lead = require("./lead.model");
const Project = require("./project.model");
const OurProject = require("./ourproject.model");
const Quotation = require("./quotation.model");

const modelRegistry = {
  client: Client,
  clients: Client,
  lead: Lead,
  leads: Lead,
  project: Project,
  projects: Project,
  ourproject: OurProject,
  ourprojects: OurProject,
  "our-project": OurProject,
  "our-projects": OurProject,
  quotation: Quotation,
  quotations: Quotation,
};

const collectionNames = {
  client: "clients",
  lead: "leads",
  project: "projects",
  ourproject: "ourprojects",
  "our-project": "ourprojects",
  "our-projects": "ourprojects",
  call: "calls",
  quotation: "quotations",
  quotations: "quotations",
  feature: "features",
  innovation: "innovations",
  invoice: "invoices",
  clientdocument: "clientdocuments",
  clientdocuments: "clientdocuments",
  "client-document": "clientdocuments",
  "client-documents": "clientdocuments",
  payment: "payments",
  expense: "expenses",
  employee: "employees",
  team: "teams",
  agreement: "agreements",
  agreements: "agreements"
};

const getModel = (type) => {
  const normType = (type || "").toLowerCase().trim();
  if (modelRegistry[normType]) {
    return modelRegistry[normType];
  }

  const collectionName = collectionNames[normType] || (normType.endsWith("s") ? normType : `${normType}s`);
  const modelName = normType
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") || "CrmRecord";

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  const schema = new mongoose.Schema({ id: { type: String } }, { strict: false, timestamps: true, collection: collectionName });
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
};

module.exports = {
  getModel,
  Client,
  Lead,
  Project,
  OurProject,
  Quotation,
  collectionNames
};
