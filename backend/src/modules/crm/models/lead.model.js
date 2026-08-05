const mongoose = require("mongoose");

if (mongoose.models.Lead) {
  delete mongoose.models.Lead;
}

const LeadSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    companyName: { type: String },
    email: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    interestedService: { type: String },
    expectedBudget: { type: Number, default: 0 },
    source: { type: String },
    status: { type: String, default: "New" },
    clientType: { type: String },
    assignedEmployee: { type: String },
    priority: { type: String },
    leadScore: { type: Number, default: 50 },
    nextFollowUpDate: { type: String },
    notes: { type: String },
    createdDate: { type: String }
  },
  { strict: false, timestamps: true, collection: "leads" }
);

module.exports = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
