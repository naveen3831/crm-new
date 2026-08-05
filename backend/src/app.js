const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const enquiryRoutes = require("./modules/enquiry/enquiry.routes");
const crmRoutes = require("./modules/crm/crm.routes");
const authRoutes = require("./modules/auth/auth.routes");
const authController = require("./modules/auth/auth.controller");

const app = express();

// Security Headers Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Cross-Origin Resource Sharing (CORS) Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive origin matching in development mode
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Body Parser Middleware (Expanded limit for base64 logo image uploads)
app.use(express.json({ limit: "50mb" }));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Request Logging Middleware
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  app.use(morgan("dev", {
    skip: (req, res) => {
      // Skip logging successful GET requests to the CRM collections to avoid terminal spam
      return req.method === "GET" && req.originalUrl.includes("/api/v1/crm") && res.statusCode < 400;
    }
  }));
}

// Health Check API
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CRM API server is active and healthy.",
    timestamp: new Date(),
  });
});

// Explicit Auth Endpoints (Direct route mapping for maximum compatibility)
app.post("/api/v1/auth/login", authController.login);
app.post("/api/v1/auth/register", authController.register);
app.post("/api/v1/auth/forgot-password", authController.forgotPassword);
app.post("/api/v1/auth/reset-password", authController.resetPassword);
// Dedicated Multi-Agent System Endpoints
app.get("/api/v1/crm/agents/status", (req, res, next) => require("./modules/crm/multiAgent.controller").getAgentsStatus(req, res, next));
app.post("/api/v1/crm/agents/run", (req, res, next) => require("./modules/crm/multiAgent.controller").runAgentAction(req, res, next));

// Mounting Module Routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/enquiries", enquiryRoutes);
app.use("/api/v1/crm", crmRoutes);

// Catch-all route handler for unknown resource paths
app.use((req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  res.status(404);
  next(error);
});

// Centralized Error Responder
app.use(errorHandler);

module.exports = app;
