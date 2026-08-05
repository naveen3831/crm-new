const dns = require("dns");
try { dns.setDefaultResultOrder("ipv4first"); } catch (e) {}
const path = require("path");
const fs = require("fs");

// Load backend/.env if present, otherwise load root .env
const backendEnvPath = path.resolve(__dirname, "../.env");
const rootEnvPath = path.resolve(__dirname, "../../.env");

if (fs.existsSync(backendEnvPath)) {
  require("dotenv").config({ path: backendEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  require("dotenv").config({ path: rootEnvPath });
} else {
  require("dotenv").config();
}

const app = require("./app");
const connectDatabase = require("./config/database");
const { initRealtime } = require("./realtime");

const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  // 1. Start TCP HTTP listener immediately for 0ms cold-start API readiness
  const server = app.listen(PORT, () => {
    console.log(`[Server] CRM API listening on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });

  initRealtime(server, [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean));

  // 2. Connect to MongoDB and seed in background
  connectDatabase().then(async () => {
    try {
      const { consolidateOurProjectsCollections } = require("./modules/crm/crm.controller");
      await consolidateOurProjectsCollections();
    } catch (seedErr) {
      console.error("[Startup Seed Error]", seedErr);
    }
  }).catch((err) => {
    console.error("[Async DB Connect Error]", err);
  });

  // Handle unhandled promise rejections safely
  process.on("unhandledRejection", (err) => {
    console.error(`[Fatal Error] Unhandled rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
