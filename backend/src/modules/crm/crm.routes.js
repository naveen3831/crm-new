const express = require("express");
const router = express.Router();
const crmController = require("./crm.controller");

// Clear all database records endpoint
router.all("/clear-database", crmController.clearDatabase);

// Send PDF via Email & Credentials endpoints
router.post("/send-email-pdf", crmController.sendEmailPdf);
router.post("/send-client-credentials", crmController.sendClientCredentials);
router.post("/upload", crmController.uploadFile);

// Debug & Consolidation endpoints
router.get("/debug", crmController.debugDatabase);
router.all("/consolidate-collections", crmController.consolidateCollections);

// Company Branding & Default Details endpoints
router.get("/company-branding/default", crmController.getCompanyBranding);
router.put("/company-branding/default", crmController.updateCompanyBranding);

// Bulk fetch all CRM collections in one request
router.get("/bulk", crmController.getBulkRecords);

// Dynamic CRM collection endpoints mapping
router.route("/:type")
  .get(crmController.getRecords)
  .post(crmController.createRecord);

router.route("/:type/:id")
  .get(crmController.getSingleRecord)
  .put(crmController.updateRecord)
  .delete(crmController.deleteRecord);

module.exports = router;
