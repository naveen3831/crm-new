const mongoose = require("mongoose");

if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    title: { type: String },
    clientName: { type: String },
    category: { type: String },
    manager: { type: String },
    budget: { type: Number, default: 0 },
    deadline: { type: String },
    status: { type: String, default: "Planning" },
    progress: { type: Number, default: 0 },
    description: { type: String }
  },
  { strict: false, timestamps: true, collection: "projects" }
);

module.exports = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
