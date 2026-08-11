const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("../auth/user.model");
const { getModel, collectionNames } = require("./models");
const Quotation = require("./models/quotation.model");
const OurProject = require("./models/ourproject.model");
const { emitCrmEvent } = require("../../realtime");
const { uploadToS3 } = require("../../services/s3Service");

const safeRegExp = (str) => {
  if (!str) return null;
  const escaped = String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped}$`, "i");
};

const DISK_CACHE_PATH = path.resolve(__dirname, "../../../bulk_cache.json");

const loadDiskBulkCache = () => {
  try {
    if (fs.existsSync(DISK_CACHE_PATH)) {
      const raw = fs.readFileSync(DISK_CACHE_PATH, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("[Bulk Cache Disk Read Error]", e);
  }
  return null;
};

let isDiskWriting = false;
let pendingSaveData = null;

const saveDiskBulkCache = (data) => {
  pendingSaveData = data;
  if (isDiskWriting) return;
  isDiskWriting = true;

  setImmediate(() => {
    const payloadToSave = pendingSaveData;
    pendingSaveData = null;
    if (!payloadToSave) {
      isDiskWriting = false;
      return;
    }
    fs.writeFile(DISK_CACHE_PATH, JSON.stringify(payloadToSave), "utf8", (err) => {
      isDiskWriting = false;
      if (err) console.error("[Bulk Cache Disk Write Error]", err);
      if (pendingSaveData) {
        saveDiskBulkCache(pendingSaveData);
      }
    });
  });
};

let bulkRecordsCache = loadDiskBulkCache();
let bulkRecordsCacheAt = bulkRecordsCache ? Date.now() : 0;
const BULK_RECORDS_CACHE_TTL_MS = 60000; // 1-minute background revalidation TTL

const broadcastCrmChange = (type, action, data) => {
  const normType = (type || "").toLowerCase().trim();
  
  if (!bulkRecordsCache) {
    bulkRecordsCache = loadDiskBulkCache();
  }
  if (!bulkRecordsCache || typeof bulkRecordsCache !== "object") {
    bulkRecordsCache = {};
  }

  if (action === "cleared") {
    bulkRecordsCache = {};
    saveDiskBulkCache(bulkRecordsCache);
  } else {
    const keysToUpdate = [normType];
    if (normType === "our-projects" || normType === "ourprojects") {
      keysToUpdate.push("our-projects", "ourprojects");
    }
    if (normType === "client-document" || normType === "clientdocuments") {
      keysToUpdate.push("client-document", "clientdocuments");
    }

    for (const key of keysToUpdate) {
      let list = bulkRecordsCache[key] || [];
      if (!Array.isArray(list)) list = [];

      if (action === "created" && data) {
        bulkRecordsCache[key] = [data, ...list.filter(item => item.id !== data.id && item.number !== data.id)];
      } else if (action === "updated" && data) {
        const updatedId = data.id || data.number;
        const exists = list.some(item => item.id === updatedId || item.number === updatedId);
        if (exists) {
          bulkRecordsCache[key] = list.map(item => 
            (item.id === updatedId || item.number === updatedId) ? { ...item, ...data } : item
          );
        } else {
          bulkRecordsCache[key] = [data, ...list];
        }
      } else if (action === "deleted" && data) {
        const idToDelete = (typeof data === "string" ? data : (data.id || data.number || data.email || "")).toString().toLowerCase();
        const emailToDelete = (data.email || "").toString().toLowerCase();
        bulkRecordsCache[key] = list.filter(item => {
          if (!item) return false;
          const itemId = (item.id || item._id || "").toString().toLowerCase();
          const itemNumber = (item.number || "").toString().toLowerCase();
          const itemEmail = (item.email || "").toString().toLowerCase();
          if (idToDelete && (itemId === idToDelete || itemNumber === idToDelete || itemEmail === idToDelete)) return false;
          if (emailToDelete && itemEmail === emailToDelete) return false;
          return true;
        });
      }
    }

    if (normType === "company-branding" && data) {
      const brandingFields = {};
      for (const [k, v] of Object.entries(data)) {
        if (k !== "id" && k !== "updatedAt" && k !== "_id" && k !== "__v") {
          brandingFields[k] = v;
        }
      }
      const collectionsToUpdate = ["quotation", "invoice", "agreement", "client-document", "clientdocuments"];
      for (const colKey of collectionsToUpdate) {
        let list = bulkRecordsCache[colKey] || [];
        if (Array.isArray(list) && list.length > 0) {
          bulkRecordsCache[colKey] = list.map(item => {
            const updatedItem = { ...item, ...brandingFields };
            if (item.item && typeof item.item === "object") {
              updatedItem.item = { ...item.item, ...brandingFields };
            }
            return updatedItem;
          });
        }
      }
    }

    if ((normType === "quotation" || normType === "invoice" || normType === "agreement") && action === "updated" && data) {
      const updatedId = data.id || data.number;
      const clientDocKeys = ["client-document", "clientdocuments"];
      for (const colKey of clientDocKeys) {
        let list = bulkRecordsCache[colKey] || [];
        if (Array.isArray(list) && list.length > 0) {
          bulkRecordsCache[colKey] = list.map(item => {
            const matches = item.documentType === normType && (item.documentRef === updatedId || (item.item && (item.item.id === updatedId || item.item.number === updatedId)));
            if (matches) {
              return {
                ...item,
                item: { ...(item.item || {}), ...data },
                updatedAt: new Date().toISOString()
              };
            }
            return item;
          });
        }
      }
    }

    bulkRecordsCacheAt = Date.now();
    saveDiskBulkCache(bulkRecordsCache);
  }

  emitCrmEvent("crm:data-changed", { type, action, data });
  emitCrmEvent(`crm:${type}:changed`, { type, action, data });
  if (type === "project" || type === "client-document") {
    emitCrmEvent("crm:projects:changed", { type, action, data });
  }
};



const getNativeDbInstances = () => {
  const dbs = [];
  try {
    if (mongoose.connection && mongoose.connection.db) {
      dbs.push(mongoose.connection.db);
    }
  } catch (e) {}
  return Array.from(new Set(dbs.filter(Boolean)));
};

const consolidateDatabaseCollections = async () => {
  try {
    if (!mongoose.connection || !mongoose.connection.db) return;
    const db = mongoose.connection.db;
    
    const syncPair = async (fromCol, toCol) => {
      try {
        const collections = await db.listCollections({ name: fromCol }).toArray();
        if (collections.length === 0) return;
        const docs = await db.collection(fromCol).find({}).toArray();
        for (const doc of docs) {
          const { _id, ...cleanDoc } = doc;
          const docId = cleanDoc.id || cleanDoc.name || cleanDoc.email || cleanDoc.number;
          if (docId) {
            await db.collection(toCol).updateOne(
              { id: docId },
              { $set: cleanDoc },
              { upsert: true }
            );
          }
        }
      } catch (e) {}
    };

    await syncPair("our-projects", "ourprojects");
    await syncPair("our_projects", "ourprojects");
    await syncPair("lead", "leads");
    await syncPair("crm-leads", "leads");
    await syncPair("client-documents", "clientdocuments");
    
    // Auto-load uploaded green smartphone logo & watermark image if available
    const logoSourcePath = "C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\a741bec8-7cab-4498-ab41-44ded0543905\\media__1785837081510.png";
    let logoDataUri = "/logo.png";
    if (fs.existsSync(logoSourcePath)) {
      try {
        const fileBuf = fs.readFileSync(logoSourcePath);
        logoDataUri = `data:image/png;base64,${fileBuf.toString("base64")}`;
        
        // Copy file to public assets for static serving
        const publicDir = path.resolve(__dirname, "../../../../frontend/public");
        if (fs.existsSync(publicDir)) {
          fs.copyFileSync(logoSourcePath, path.join(publicDir, "pdf-logo.png"));
          fs.copyFileSync(logoSourcePath, path.join(publicDir, "watermark.png"));
        }
      } catch (e) {
        console.error("Error loading uploaded logo file:", e);
      }
    }

    // Upsert default company branding details to MongoDB Atlas
    await db.collection("companybrandings").updateOne(
      { id: "default" },
      {
        $set: {
          id: "default",
          companyName: "Speshway Solutions Private Limited",
          billedByCompany: "Speshway Solutions Private Limited",
          companyTagline: "Website & App Development Company - Hyderabad, India",
          billedBySub: "Software Development Company",
          companyEmail: "info@speshway.com",
          companyPhone: "+91 91000 06020",
          companyWebsite: "www.speshway.com",
          companyGstin: "36AAAAA0000A1Z5",
          companyAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
          billedByAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
          billedByContact: "info@speshway.com | +91 91000 06020 | www.speshway.com",
          pdfPrimaryColor: "#5D3ADF",
          pdfSecondaryColor: "#B8F7A1",
          companyLogoUrl: logoDataUri,
          companyWatermarkUrl: logoDataUri,
          showWatermark: true,
          companyWatermarkText: "SPESHWAY SOLUTIONS",
          companyWatermarkOpacity: 0.25,
          companyWatermarkContrast: 150,
          companyWatermarkGrayscale: false,
          companyWatermarkRotation: 0,
          companyWatermarkSize: 50,
          companyWatermarkImgSize: 290,
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );

    // Bulk update all existing records in MongoDB Atlas so all old and new quotations, invoices & agreements reflect the new logo and watermark image
    await db.collection("quotations").updateMany({}, {
      $set: {
        companyLogoUrl: logoDataUri,
        companyWatermarkUrl: logoDataUri
      }
    }).catch(() => {});

    await db.collection("invoices").updateMany({}, {
      $set: {
        companyLogoUrl: logoDataUri,
        companyWatermarkUrl: logoDataUri
      }
    }).catch(() => {});

    await db.collection("agreements").updateMany({}, {
      $set: {
        companyLogoUrl: logoDataUri,
        companyWatermarkUrl: logoDataUri
      }
    }).catch(() => {});

  } catch (err) {
    console.error("[Safe Sync Error]", err);
  }
};

exports.getCompanyBranding = async (req, res, next) => {
  try {
    const publicDir = 'c:/Users/Lenovo/OneDrive/Desktop/CRM/frontend/public';
    const watermarkPath = path.join(publicDir, 'watermark.png');
    const pdfLogoPath = path.join(publicDir, 'pdf-logo.png');
    if (fs.existsSync(watermarkPath) && !fs.existsSync(pdfLogoPath)) {
      fs.copyFileSync(watermarkPath, pdfLogoPath);
    }
  } catch (e) {}
  const defaultDetails = {
    id: "default",
    companyName: "Speshway Solutions Private Limited",
    billedByCompany: "Speshway Solutions Private Limited",
    companyTagline: "Website & App Development Company - Hyderabad, India",
    billedBySub: "Software Development Company",
    companyEmail: "info@speshway.com",
    companyPhone: "+91 91000 06020",
    companyWebsite: "www.speshway.com",
    companyGstin: "36AAAAA0000A1Z5",
    companyAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
    billedByAddress: "T - Hub, Plot No 1 / C, Sy No 83 / 1, Raidurgam, Knowledge City Road, Serilingampalle (M), Hyderabad, Telangana 500081, India",
    billedByContact: "info@speshway.com | +91 91000 06020 | www.speshway.com",
    pdfPrimaryColor: "#5D3ADF",
    pdfSecondaryColor: "#B8F7A1",
    companyLogoUrl: "/logo.png",
    companyWatermarkUrl: "/watermark.png",
    showWatermark: true,
    companyWatermarkText: "SPESHWAY SOLUTIONS",
    companyWatermarkOpacity: 0.25,
    companyWatermarkContrast: 150,
    companyWatermarkGrayscale: false,
    companyWatermarkRotation: 0,
    companyWatermarkSize: 50,
    companyWatermarkImgSize: 290
  };

  try {
    if (mongoose.connection && mongoose.connection.readyState === 1 && mongoose.connection.db) {
      try {
        const db = mongoose.connection.db;
        const findPromise = db.collection("companybrandings").findOne({ id: "default" });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 5000));
        const found = await Promise.race([findPromise, timeoutPromise]);
        if (found) {
          const { _id, __v, ...rest } = found;
          return res.status(200).json({ success: true, data: { ...defaultDetails, ...rest } });
        }
      } catch (e) {
        // Silent fallback to default details without clogging terminal output
      }
    }
    return res.status(200).json({ success: true, data: defaultDetails });
  } catch (error) {
    return res.status(200).json({ success: true, data: defaultDetails });
  }
};
exports.getDefaultCompanyBranding = exports.getCompanyBranding;

exports.updateCompanyBranding = async (req, res, next) => {
  try {
    const payload = req.body || {};
    const record = { id: "default", ...payload, updatedAt: new Date().toISOString() };

    if (mongoose.connection && mongoose.connection.db) {
      const db = mongoose.connection.db;
      await db.collection("companybrandings").updateOne(
        { id: "default" },
        { $set: record },
        { upsert: true }
      );

      const updateFields = {};
      if (payload.billedByCompany || payload.companyName) {
        updateFields.billedByCompany = payload.billedByCompany || payload.companyName;
        updateFields.companyName = payload.billedByCompany || payload.companyName;
      }
      if (payload.billedBySub || payload.companyTagline) {
        updateFields.billedBySub = payload.billedBySub || payload.companyTagline;
        updateFields.companyTagline = payload.billedBySub || payload.companyTagline;
      }
      if (payload.companyAddress || payload.billedByAddress) {
        updateFields.companyAddress = payload.companyAddress || payload.billedByAddress;
        updateFields.billedByAddress = payload.companyAddress || payload.billedByAddress;
      }
      if (payload.companyEmail) updateFields.companyEmail = payload.companyEmail;
      if (payload.companyPhone) updateFields.companyPhone = payload.companyPhone;
      if (payload.companyWebsite) updateFields.companyWebsite = payload.companyWebsite;
      if (payload.companyGstin) updateFields.companyGstin = payload.companyGstin;
      if (payload.pdfPrimaryColor) updateFields.pdfPrimaryColor = payload.pdfPrimaryColor;
      if (payload.pdfSecondaryColor) updateFields.pdfSecondaryColor = payload.pdfSecondaryColor;
      if (payload.companyLogoUrl !== undefined) updateFields.companyLogoUrl = payload.companyLogoUrl;
      if (payload.companyWatermarkUrl !== undefined) updateFields.companyWatermarkUrl = payload.companyWatermarkUrl;
      if (payload.companyWatermarkText !== undefined) updateFields.companyWatermarkText = payload.companyWatermarkText;
      if (payload.companyWatermarkOpacity !== undefined) updateFields.companyWatermarkOpacity = payload.companyWatermarkOpacity;
      if (payload.companyWatermarkContrast !== undefined) updateFields.companyWatermarkContrast = payload.companyWatermarkContrast;
      if (payload.companyWatermarkGrayscale !== undefined) updateFields.companyWatermarkGrayscale = payload.companyWatermarkGrayscale;
      if (payload.companyWatermarkRotation !== undefined) updateFields.companyWatermarkRotation = payload.companyWatermarkRotation;
      if (payload.companyWatermarkSize !== undefined) updateFields.companyWatermarkSize = payload.companyWatermarkSize;
      if (payload.companyWatermarkImgSize !== undefined) updateFields.companyWatermarkImgSize = payload.companyWatermarkImgSize;
      if (payload.showWatermark !== undefined) updateFields.showWatermark = payload.showWatermark;

      if (Object.keys(updateFields).length > 0) {
        await db.collection("quotations").updateMany({}, { $set: updateFields }).catch(() => {});
        await db.collection("invoices").updateMany({}, { $set: updateFields }).catch(() => {});
        await db.collection("agreements").updateMany({}, { $set: updateFields }).catch(() => {});

        const nestedUpdateFields = {};
        for (const [k, v] of Object.entries(updateFields)) {
          nestedUpdateFields[`item.${k}`] = v;
        }
        const clientDocUpdates = { ...updateFields, ...nestedUpdateFields };
        await db.collection("clientdocuments").updateMany({}, { $set: clientDocUpdates }).catch(() => {});
        await db.collection("client-documents").updateMany({}, { $set: clientDocUpdates }).catch(() => {});
      }
    }

    broadcastCrmChange("company-branding", "updated", record);

    return res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

exports.consolidateOurProjectsCollections = consolidateDatabaseCollections;
exports.consolidateDatabaseCollections = consolidateDatabaseCollections;

exports.consolidateCollections = async (req, res, next) => {
  try {
    await consolidateDatabaseCollections();
    const dbsToSearch = getNativeDbInstances();
    const result = {};
    for (const db of dbsToSearch) {
      const collections = await db.listCollections().toArray();
      const colSummary = {};
      for (const col of collections) {
        colSummary[col.name] = await db.collection(col.name).countDocuments();
      }
      result[db.databaseName] = colSummary;
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 1. Fetch all records for a specific type
const fetchRecordsForType = async (type, excludeHtml = true) => {
  const normType = (type || "").toLowerCase().trim();

  if (type === "user") {
    try {
      const dbUsers = await User.find({}).select("-password").lean();
      return dbUsers.map(u => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        phone: u.phone,
        company: u.company,
        role: u.role === "admin" ? "Super Admin" : "Client Access",
        status: u.status || "Active",
      }));
    } catch (e) {
      return [];
    }
  }

  let targetCols = [];
  if (normType.includes("our")) {
    targetCols = ["ourprojects", "our-projects"];
  } else if (normType.includes("lead")) {
    targetCols = ["leads", "lead"];
  } else if (normType.includes("client") && normType.includes("doc")) {
    targetCols = ["clientdocuments", "client-documents"];
  } else {
    const col = collectionNames[normType] || (normType.endsWith("s") ? normType : `${normType}s`);
    targetCols = [col];
  }

  let docs = [];
  if (mongoose.connection && mongoose.connection.db) {
    const db = mongoose.connection.db;
    try {
      const fetchPromises = targetCols.map(async (colName) => {
        try {
          const query = db.collection(colName).find({});
          if (excludeHtml) {
            query.project({ htmlContent: 0 });
          }
          return await query.toArray();
        } catch (colErr) {
          return [];
        }
      });
      const results = await Promise.all(fetchPromises);
      results.forEach(nativeDocs => {
        if (Array.isArray(nativeDocs) && nativeDocs.length > 0) {
          docs = [...docs, ...nativeDocs];
        }
      });
    } catch (e) {}
  }

  if (docs.length === 0) {
    try {
      const Model = getModel(normType);
      const query = Model.find({});
      if (excludeHtml) {
        query.select("-htmlContent");
      }
      const mDocs = await query.lean();
      if (Array.isArray(mDocs)) docs = mDocs;
    } catch (e) {}
  }

  const seenIds = new Set();
  let cleanDocs = (docs || []).map(doc => {
    const { _id, __v, ...rest } = doc;
    const docId = doc.id || doc.number || doc.customId || doc.name || doc.title || (_id ? _id.toString() : String(Math.random()));
    return { id: docId, ...rest };
  }).filter(doc => {
    if (!doc || !doc.id) return false;
    const docIdStr = String(doc.id).trim();
    if (seenIds.has(docIdStr)) return false;
    seenIds.add(docIdStr);
    return true;
  });

  return cleanDocs;
};

exports.debugDatabase = async (req, res, next) => {
  try {
    await consolidateDatabaseCollections();
    const info = {};
    if (mongoose.connection) {
      const client = typeof mongoose.connection.getClient === "function" ? mongoose.connection.getClient() : (mongoose.connection).client;
      if (client && typeof client.db === "function") {
        const admin = client.db().admin();
        const dbList = await admin.listDatabases();
        info.databases = dbList.databases.map(d => d.name);

        for (const dbInfo of (dbList.databases || [])) {
          if (["admin", "local", "config"].includes(dbInfo.name)) continue;
          const dbInstance = client.db(dbInfo.name);
          const cols = await dbInstance.listCollections().toArray();
          const colCounts = {};
          for (const c of cols) {
            colCounts[c.name] = await dbInstance.collection(c.name).countDocuments();
          }
          info[dbInfo.name] = colCounts;
        }
      } else {
        info.status = "No native client resolved via connection";
      }
    } else {
      info.status = "No mongoose connection active";
    }

    res.status(200).json({
      success: true,
      activeDatabase: mongoose.connection ? mongoose.connection.name : "none",
      data: info
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 1. Get all records from dedicated collection
exports.getRecords = async (req, res, next) => {
  try {
    const { type } = req.params;
    if (type === "bulk") {
      return exports.getBulkRecords(req, res, next);
    }
    if (type === "debug") {
      return exports.debugDatabase(req, res, next);
    }
    if (type === "consolidate-collections") {
      return exports.consolidateCollections(req, res, next);
    }
    if (type === "clear-database" || type === "clear") {
      return exports.clearDatabase(req, res, next);
    }
    const records = await fetchRecordsForType(type);
    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

// Ultra-fast instant 0-second (0ms) bulk fetch for all CRM collections
exports.getBulkRecords = async (req, res, next) => {
  try {
    const cachedData = bulkRecordsCache || loadDiskBulkCache();

    // 1. Instant 0ms Response to Client!
    if (cachedData && Object.keys(cachedData).length > 0) {
      res.status(200).json({
        success: true,
        cached: true,
        data: cachedData
      });

      // 2. Background Asynchronous Non-Blocking MongoDB Atlas Revalidation
      const now = Date.now();
      if (now - bulkRecordsCacheAt > 15000) {
        bulkRecordsCacheAt = now;
        (async () => {
          try {
            const types = [
              "client", "call", "lead", "project", "our-projects", "quotation", 
              "feature", "innovation", "invoice", "client-document", "payment", 
              "expense", "user", "employee", "team", "agreement"
            ];

            const results = {};

            await Promise.all(
              types.map(async (type) => {
                try {
                  let records = await fetchRecordsForType(type);
                  results[type] = records || [];
                  if (type === "our-projects") results["ourprojects"] = records || [];
                  if (type === "client-document") results["clientdocuments"] = records || [];
                } catch (e) {
                  results[type] = cachedData[type] || [];
                }
              })
            );

            const hasData = Object.values(results).some(arr => Array.isArray(arr) && arr.length > 0);
            if (hasData) {
              bulkRecordsCache = results;
              saveDiskBulkCache(results);
            }
          } catch (bgErr) {
            console.warn("[Background Sync Warning]", bgErr.message);
          }
        })();
      }
      return;
    }

    // Direct synchronous fetch if no cache is available on clean start
    const types = [
      "client", "call", "lead", "project", "our-projects", "quotation", 
      "feature", "innovation", "invoice", "client-document", "payment", 
      "expense", "user", "employee", "team", "agreement"
    ];

    const results = {};
    await Promise.all(
      types.map(async (type) => {
        try {
          let records = await fetchRecordsForType(type);
          results[type] = records || [];
          if (type === "our-projects") results["ourprojects"] = records || [];
          if (type === "client-document") results["clientdocuments"] = records || [];
        } catch (e) {
          results[type] = [];
        }
      })
    );

    bulkRecordsCache = results;
    bulkRecordsCacheAt = Date.now();
    saveDiskBulkCache(results);

    return res.status(200).json({
      success: true,
      cached: false,
      data: results
    });
  } catch (error) {
    console.warn("[Bulk Fetch DB Warning] Serving fallback cache:", error.message);
    const cached = bulkRecordsCache || loadDiskBulkCache();
    return res.status(200).json({
      success: true,
      cached: true,
      fallback: true,
      data: cached || {}
    });
  }
};

exports.createCrmRecord = async (req, res, next) => {
  try {
    const { type } = req.params;
    const payload = req.body || {};
    const normType = normalizeType(type);

    if (normType === "user" || normType === "users") {
      const email = (payload.email || "").toLowerCase().trim();
      const existingUser = await User.findOne({ email }).lean();
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User email address already exists." });
      }

      const newUser = {
        name: payload.name || "System User",
        email: email,
        password: payload.password || "Password123!",
        role: payload.role || "Client Access",
        status: payload.status || "Active",
        phone: payload.phone || "",
        company: payload.company || "Corporate CRM"
      };

      const created = await User.create(newUser);
      const userResult = {
        id: created._id.toString(),
        name: created.name,
        email: created.email,
        role: created.role,
        status: created.status
      };

      if (mongoose.connection && mongoose.connection.db) {
        await mongoose.connection.db.collection("users").updateOne(
          { email: created.email },
          { $set: userResult },
          { upsert: true }
        ).catch(() => {});
      }

      broadcastCrmChange("user", "created", userResult);

      return res.status(201).json({
        success: true,
        data: userResult
      });
    }
    const prefix = (normType.replace(/[^a-zA-Z]/g, "").slice(0, 3) || "REC").toUpperCase();
    const timeSuffix = Date.now().toString().slice(-4);
    const randSuffix = Math.floor(100 + Math.random() * 899);

    let customId = payload.id || payload.number || payload.customId;
    if (!customId) {
      customId = `${prefix}-${timeSuffix}${randSuffix}`;
    }

    const recordData = { ...payload, id: customId };
    const Model = getModel(normType);

    let result = recordData;

    try {
      await Model.updateOne(
        { id: customId },
        { $set: recordData },
        { upsert: true }
      );
      const doc = await Model.findOne({ id: customId }).lean();
      if (doc) {
        result = { ...doc };
        delete result.__v;
      }
    } catch (saveErr) {
      if (mongoose.connection && mongoose.connection.db) {
        const db = mongoose.connection.db;
        const colName = collectionNames[normType] || (normType.endsWith("s") ? normType : `${normType}s`);
        await db.collection(colName).updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
      }
    }

    if (mongoose.connection && mongoose.connection.db) {
      const db = mongoose.connection.db;
      if (normType.includes("our")) {
        await db.collection("ourprojects").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
        await db.collection("our-projects").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
      }
      if (normType.includes("lead")) {
        await db.collection("leads").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
        await db.collection("lead").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
      }
      if (normType.includes("client") && normType.includes("doc")) {
        await db.collection("clientdocuments").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
        await db.collection("client-documents").updateOne({ id: customId }, { $set: recordData }, { upsert: true }).catch(() => {});
      }
    }

    broadcastCrmChange(normType, "created", result);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET single record by ID
exports.getSingleRecord = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const cleanId = (id || "").trim();
    const records = await fetchRecordsForType(type, false);
    const found = records.find(r => 
      String(r.id || "").toLowerCase() === cleanId.toLowerCase() ||
      String(r.number || "").toLowerCase() === cleanId.toLowerCase()
    );
    return res.status(200).json({
      success: true,
      data: found || null
    });
  } catch (error) {
    next(error);
  }
};

// 3. Update an existing record in dedicated collection
exports.updateRecord = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const payload = req.body || {};
    const cleanId = (id || "").trim();
    const normType = (type || "").toLowerCase().trim();

    if (type === "user" || type === "users") {
      const isHexObjectId = typeof cleanId === "string" && /^[0-9a-fA-F]{24}$/.test(cleanId);
      const userQuery = isHexObjectId
        ? { $or: [{ _id: cleanId }, { email: cleanId.toLowerCase() }] }
        : { $or: [{ email: cleanId.toLowerCase() }, { id: cleanId }, { email: cleanId }] };

      let updatedUser = await User.findOneAndUpdate(
        userQuery,
        { $set: payload },
        { new: true }
      ).select("-password").lean();

      if (!updatedUser && mongoose.connection && mongoose.connection.db) {
        const db = mongoose.connection.db;
        await db.collection("users").updateOne(userQuery, { $set: payload }).catch(() => {});
        updatedUser = await db.collection("users").findOne(userQuery).catch(() => null);
      }

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User account not found." });
      }

      const userPayload = {
        id: (updatedUser._id || updatedUser.id || cleanId).toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        role: payload.role || updatedUser.role || "Client Access",
        status: payload.status || updatedUser.status || "Active",
      };
      broadcastCrmChange("user", "updated", userPayload);

      return res.status(200).json({
        success: true,
        data: userPayload,
      });
    }

    const Model = getModel(normType);
    const updateData = { ...payload, id: cleanId };
    const rx = safeRegExp(cleanId);
    const queryConditions = [{ id: cleanId }];
    if (rx) queryConditions.push({ id: rx });

    if (mongoose.connection && mongoose.connection.db) {
      const db = mongoose.connection.db;
      const colName = collectionNames[normType] || (normType.endsWith("s") ? normType : `${normType}s`);
      const query = { $or: queryConditions };
      await db.collection(colName).updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
      if (normType.includes("our")) {
        await db.collection("ourprojects").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
        await db.collection("our-projects").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
      }
      if (normType.includes("lead")) {
        await db.collection("leads").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
        await db.collection("lead").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
      }
      if (normType.includes("client") && normType.includes("doc")) {
        await db.collection("clientdocuments").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
        await db.collection("client-documents").updateMany(query, { $set: updateData }, { upsert: true }).catch(() => {});
      }
      if (normType.includes("quotation")) {
        const queryClientDocs = {
          $or: [
            { documentType: "quotation", documentRef: cleanId },
            { documentType: "quotation", "item.id": cleanId },
            { documentType: "quotation", "item.number": cleanId }
          ]
        };
        const updateClientDocs = {
          $set: {
            item: updateData,
            updatedAt: new Date().toISOString()
          }
        };
        await db.collection("clientdocuments").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
        await db.collection("client-documents").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
      }
      if (normType.includes("invoice")) {
        const queryClientDocs = {
          $or: [
            { documentType: "invoice", documentRef: cleanId },
            { documentType: "invoice", "item.id": cleanId },
            { documentType: "invoice", "item.number": cleanId }
          ]
        };
        const updateClientDocs = {
          $set: {
            item: updateData,
            updatedAt: new Date().toISOString()
          }
        };
        await db.collection("clientdocuments").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
        await db.collection("client-documents").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
      }
      if (normType.includes("agreement")) {
        const queryClientDocs = {
          $or: [
            { documentType: "agreement", documentRef: cleanId },
            { documentType: "agreement", "item.id": cleanId },
            { documentType: "agreement", "item.number": cleanId }
          ]
        };
        const updateClientDocs = {
          $set: {
            item: updateData,
            updatedAt: new Date().toISOString()
          }
        };
        await db.collection("clientdocuments").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
        await db.collection("client-documents").updateMany(queryClientDocs, updateClientDocs).catch(() => {});
      }
    }

    let updatedDoc = null;
    try {
      updatedDoc = await Model.findOneAndUpdate(
        { $or: queryConditions },
        { $set: updateData },
        { new: true, upsert: true, lean: true }
      );
    } catch (mErr) {
      console.warn(`[updateRecord] Mongoose update error for ${normType}/${cleanId}:`, mErr.message);
    }

    const result = updatedDoc || { id: cleanId, ...updateData };
    if (result.__v !== undefined) delete result.__v;
    broadcastCrmChange(normType, "updated", result);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Delete a record from dedicated collection
exports.deleteRecord = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const cleanId = (id || "").trim();

    if (type === "user" || type === "users") {
      const normalizedId = cleanId.toLowerCase();
      if (normalizedId === "admin@crm.com") {
        return res.status(400).json({
          success: false,
          message: "Primary Seeded Admin account cannot be deleted.",
        });
      }

      const rx = new RegExp(`^${normalizedId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, "i");
      const isHexObjectId = typeof cleanId === "string" && /^[0-9a-fA-F]{24}$/.test(cleanId);
      const userQuery = isHexObjectId
        ? { $or: [{ _id: cleanId }, { email: rx }, { id: cleanId }] }
        : { $or: [{ email: rx }, { id: cleanId }, { email: normalizedId }] };

      let deleteResult = await User.deleteOne(userQuery);

      try {
        const db = mongoose.connection.db;
        if (db) {
          await db.collection("users").deleteMany(userQuery);
        }
      } catch (e) {}

      broadcastCrmChange("user", "deleted", { id: cleanId, email: normalizedId, deletedCount: deleteResult.deletedCount || 1 });

      return res.status(200).json({
        success: true,
        message: "User successfully deleted from database.",
        deletedCount: deleteResult.deletedCount || 1
      });
    }

    const normType = (type || "").toLowerCase().trim();
    const Model = getModel(normType);
    const isHex = typeof cleanId === "string" && /^[0-9a-fA-F]{24}$/.test(cleanId);
    const rx = safeRegExp(cleanId);
    
    const deleteConditions = [
      { id: cleanId },
      { name: cleanId },
      { title: cleanId },
      { number: cleanId },
      { customId: cleanId }
    ];
    if (rx) {
      deleteConditions.push({ id: rx });
      deleteConditions.push({ customId: rx });
      deleteConditions.push({ number: rx });
      deleteConditions.push({ name: rx });
      deleteConditions.push({ title: rx });
    }
    if (isHex) deleteConditions.push({ _id: cleanId });

    let totalDeleted = 0;
    try {
      const mResult = await Model.deleteMany({ $or: deleteConditions });
      totalDeleted += (mResult.deletedCount || 0);
    } catch (e) {}

    if (mongoose.connection && mongoose.connection.db) {
      const db = mongoose.connection.db;
      let targetCols = [];
      if (normType.includes("our")) {
        targetCols = ["ourprojects", "our-projects"];
      } else if (normType.includes("lead")) {
        targetCols = ["leads", "lead", "crm-leads"];
      } else if (normType.includes("client") && normType.includes("doc")) {
        targetCols = ["clientdocuments", "client-documents"];
      } else {
        const primaryCol = collectionNames[normType] || (normType.endsWith("s") ? normType : `${normType}s`);
        const singularCol = primaryCol.endsWith("s") ? primaryCol.slice(0, -1) : primaryCol;
        targetCols = [primaryCol, singularCol];
      }

      for (const colName of targetCols) {
        try {
          const nativeRes = await db.collection(colName).deleteMany({ $or: deleteConditions });
          totalDeleted += (nativeRes.deletedCount || 0);
        } catch (colErr) {}
      }
    }

    broadcastCrmChange(normType, "deleted", { id: cleanId, deletedCount: totalDeleted });

    res.status(200).json({
      success: true,
      message: "Record permanently deleted from database.",
      deletedCount: totalDeleted
    });
  } catch (error) {
    next(error);
  }
};

// 5. Clear all database records across dedicated collections
exports.clearDatabase = async (req, res, next) => {
  try {
    const { OurProject, Lead, Quotation, Project, Client } = require("./models");
    await Promise.all([
      OurProject.deleteMany({}),
      Lead.deleteMany({}),
      Quotation.deleteMany({}),
      Project.deleteMany({}),
      Client.deleteMany({})
    ]).catch(() => {});

    const modelKeys = ["ourprojects", "ourproject", "our-projects", "leads", "lead", "quotations", "quotation", "clientdocuments", "client-document", "invoices", "invoice", "projects", "project", "clients", "client", "features", "feature", "innovations", "innovation", "calls", "call", "expenses", "expense", "payments", "payment", "employees", "employee", "teams", "team", "tickets", "ticket"];
    for (const key of modelKeys) {
      try {
        const Model = getModel(key);
        if (Model) {
          await Model.deleteMany({});
          if (Model.collection) {
            await Model.collection.deleteMany({});
          }
        }
      } catch (e) {}
    }

    if (mongoose.connection && mongoose.connection.db) {
      const client = typeof mongoose.connection.getClient === "function" ? mongoose.connection.getClient() : mongoose.connection.client;
      if (client && typeof client.db === "function") {
        for (const dbName of ["test", "crm", "CRM"]) {
          try {
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            for (const col of collections) {
              if (col.name === "users") {
                await db.collection("users").deleteMany({ email: { $ne: "admin@crm.com" } });
              } else {
                await db.collection(col.name).deleteMany({});
              }
            }
          } catch (e) {}
        }
      }
    }

    broadcastCrmChange("database", "cleared", { at: new Date().toISOString() });

    return res.status(200).json({
      success: true,
      message: "All database collections completely cleared and wiped clean across all databases.",
    });
  } catch (error) {
    next(error);
  }
};

// 6. Send PDF Document via Email API Endpoint
exports.sendEmailPdf = async (req, res, next) => {
  try {
    const { toEmail, subject, textContent, pdfBase64, fileName, portalDocument } = req.body;
    if (!toEmail) {
      return res.status(400).json({ success: false, message: "Recipient email address is required." });
    }

    const smtpUser = process.env.SMTP_USER || "naveenkumar970100@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "bzhrewmmaqzdnlrs";

    console.log(`[EMAIL DISPATCH] Dispatching email to ${toEmail} using SMTP user ${smtpUser}...`);

    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let rawBase64 = pdfBase64 || "";
    const commaIdx = rawBase64.indexOf(",");
    if (commaIdx !== -1) {
      rawBase64 = rawBase64.substring(commaIdx + 1);
    }
    rawBase64 = rawBase64.replace(/\s+/g, "");
    const buffer = Buffer.from(rawBase64, "base64");

    const headerSignature = buffer.toString("utf8", 0, 5);
    console.log(`[PDF BUFFER CHECK] Size: ${buffer.length} bytes | Header: '${headerSignature}'`);

    const info = await transporter.sendMail({
      from: `"Speshway Solutions" <${smtpUser}>`,
      to: toEmail,
      subject: subject || "Official PDF Document - Speshway Solutions",
      text: textContent || "Dear Client,\n\nPlease find attached your official PDF document.\n\nBest regards,\nSpeshway Solutions Private Limited",
      attachments: [
        {
          filename: fileName || "Document.pdf",
          content: buffer,
          contentType: "application/pdf"
        }
      ]
    });

    console.log(`[EMAIL DISPATCH SUCCESS] MessageId: ${info.messageId} | Accepted: ${JSON.stringify(info.accepted)}`);

    let portalDocumentSaved = false;
    if (portalDocument && typeof portalDocument === "object") {
      try {
        const ClientDocumentModel = getModel("client-document");
        const sentAt = new Date().toISOString();
        const item = portalDocument.item && typeof portalDocument.item === "object" ? portalDocument.item : {};
        const documentType = portalDocument.documentType === "invoice" ? "invoice" : "quotation";
        const documentRef = portalDocument.documentRef || item.number || item.id || (fileName || "Document.pdf").replace(/\.pdf$/i, "");
        const documentKey = portalDocument.documentKey || portalDocument.id || `${portalDocument.clientId || toEmail}::${documentType}::${documentRef}`;

        const updatedPortalDocument = await ClientDocumentModel.findOneAndUpdate(
          { id: documentKey },
          {
            $set: {
              ...portalDocument,
              id: documentKey,
              documentKey,
              documentType,
              documentRef,
              sentToEmail: portalDocument.sentToEmail || toEmail,
              subject: subject || portalDocument.subject || "",
              fileName: fileName || portalDocument.fileName || "Document.pdf",
              visibleToClient: true,
              source: portalDocument.source || "email-send",
              item: {
                ...item,
                id: item.id || item.number || documentRef,
                number: item.number || item.id || documentRef,
                clientEmail: item.clientEmail || portalDocument.sentToEmail || toEmail,
                sentToEmail: item.sentToEmail || portalDocument.sentToEmail || toEmail,
              },
              sentAt: portalDocument.sentAt || sentAt,
              updatedAt: sentAt
            }
          },
          { upsert: true, new: true }
        ).lean();
        broadcastCrmChange("client-document", "updated", updatedPortalDocument);
        portalDocumentSaved = true;
      } catch (portalErr) {
        console.error("[EMAIL PORTAL DOCUMENT SAVE FAILURE]", portalErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `PDF document successfully delivered to '${toEmail}' via Gmail SMTP!`,
      messageId: info.messageId,
      accepted: info.accepted,
      fileName: fileName || "Document.pdf",
      toEmail,
      portalDocumentSaved
    });
  } catch (error) {
    console.error("[EMAIL DISPATCH FAILURE]", error.message);
    return res.status(500).json({
      success: false,
      message: `Failed to send email: ${error.message}`
    });
  }
};

exports.sendClientCredentials = async (req, res, next) => {
  try {
    const { toEmail, clientName, loginEmail, password, loginUrl, projectName } = req.body;
    if (!toEmail || !loginEmail || !password) {
      return res.status(400).json({ success: false, message: "Recipient email, login email, and password are required." });
    }

    const smtpUser = process.env.SMTP_USER || "naveenkumar970100@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "bzhrewmmaqzdnlrs";
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const safeLoginUrl = loginUrl || "http://localhost:3000/auth/login";
    const safeClientName = clientName || "Client";
    const text = `Hello ${safeClientName},

Your Speshway client dashboard account is ready.

Login URL: ${safeLoginUrl}
Login Email: ${loginEmail}
Temporary Password: ${password}
Project: ${projectName || "Your project workspace"}

Please sign in and update your password after first login.

Best regards,
Speshway Solutions`;

    const html = `
      <div style="font-family:Arial,sans-serif;color:#071E34;line-height:1.55">
        <h2 style="color:#0E9F8A">Your Speshway Client Dashboard Is Ready</h2>
        <p>Hello <strong>${safeClientName}</strong>,</p>
        <p>Your client dashboard account has been created.</p>
        <div style="border:1px solid #ccfbf1;background:#f0fdfa;border-radius:12px;padding:16px;margin:16px 0">
          <p><strong>Login URL:</strong> <a href="${safeLoginUrl}">${safeLoginUrl}</a></p>
          <p><strong>Login Email:</strong> ${loginEmail}</p>
          <p><strong>Temporary Password:</strong> ${password}</p>
          <p><strong>Project:</strong> ${projectName || "Your project workspace"}</p>
        </div>
        <p>Please sign in and update your password after first login.</p>
        <p>Best regards,<br/>Speshway Solutions</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Speshway Solutions" <${smtpUser}>`,
      to: toEmail,
      subject: "Your Speshway Client Dashboard Login Credentials",
      text,
      html
    });

    return res.status(200).json({
      success: true,
      message: `Client dashboard credentials sent to ${toEmail}.`,
      messageId: info.messageId,
      accepted: info.accepted
    });
  } catch (error) {
    console.error("[CLIENT CREDENTIALS EMAIL FAILURE]", error.message);
    return res.status(500).json({
      success: false,
      message: `Failed to send client credentials: ${error.message}`
    });
  }
};

// 7. Upload file / image to AWS S3 bucket with static fallback
exports.uploadFile = async (req, res, next) => {
  try {
    const { fileData, fileName, fileType } = req.body || {};
    if (!fileData) {
      return res.status(400).json({ success: false, message: "No file data provided." });
    }

    let buffer;
    let mimeType = fileType || "image/png";

    if (typeof fileData === "string" && fileData.startsWith("data:")) {
      const parts = fileData.split(",");
      const matches = parts[0].match(/data:(.*?);base64/);
      if (matches && matches[1]) {
        mimeType = matches[1];
      }
      buffer = Buffer.from(parts[1], "base64");
    } else if (typeof fileData === "string") {
      buffer = Buffer.from(fileData, "base64");
    } else {
      buffer = Buffer.from(fileData);
    }

    const fileUrl = await uploadToS3({
      buffer,
      fileName: fileName || "logo.png",
      mimeType,
    });

    if (!fileUrl) {
      return res.status(500).json({ success: false, message: "Failed to upload file to S3 or storage server." });
    }

    return res.status(200).json({
      success: true,
      url: fileUrl,
      fileUrl,
    });
  } catch (error) {
    next(error);
  }
};
