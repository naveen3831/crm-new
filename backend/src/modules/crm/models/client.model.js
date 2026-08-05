const mongoose = require("mongoose");

if (mongoose.models.Client) {
  delete mongoose.models.Client;
}

const ClientSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    company: { type: String },
    email: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    address: { type: String },
    industry: { type: String },
    type: { type: String, default: "Potential" },
    assignedEmployee: { type: String },
    status: { type: String, default: "Active" },
    notes: { type: String },
    createdDate: { type: String },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: String },
    restoredAt: { type: Date, default: null }
  },
  { strict: false, timestamps: true, collection: "clients" }
);

module.exports = mongoose.models.Client || mongoose.model("Client", ClientSchema);
