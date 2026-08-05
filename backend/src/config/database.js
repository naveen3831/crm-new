const mongoose = require("mongoose");
const dns = require("dns");

// Let the OS resolve DNS natively (Google/Cloudflare override is removed for maximum VPN/local ISP compatibility)

const connectDatabase = async () => {
  mongoose.set("bufferCommands", true);
  const primaryUri = process.env.MONGO_URI;

  // Direct Atlas Seed List URI bypasses SRV DNS resolution completely for immediate 0ms connection
  const directAtlasUri = "mongodb://crm:crm@ac-dixqdao-shard-00-00.usbbron.mongodb.net:27017,ac-dixqdao-shard-00-01.usbbron.mongodb.net:27017,ac-dixqdao-shard-00-02.usbbron.mongodb.net:27017/crm?ssl=true&replicaSet=atlas-2zhe54-shard-0&authSource=admin&retryWrites=true&w=majority";

  const fallbackUris = [
    directAtlasUri,
    primaryUri,
    "mongodb://127.0.0.1:27017/crm",
    "mongodb://localhost:27017/crm"
  ].filter((uri, idx, arr) => Boolean(uri) && arr.indexOf(uri) === idx);

  let connected = false;
  let lastError = null;

  for (const uri of fallbackUris) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 60000,
        heartbeatFrequencyMS: 10000,
        maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 100),
        minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || 10),
        maxIdleTimeMS: 60000,
        retryReads: true,
        retryWrites: true
      });

      console.log(`[Database] MongoDB Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name || 'crm'}`);
      connected = true;

      // Add resilient event listeners for socket reconnects
      mongoose.connection.on("disconnected", () => {
        console.warn("[Database Event] MongoDB disconnected. Attempting automatic background reconnection...");
      });
      mongoose.connection.on("reconnected", () => {
        console.log("[Database Event] MongoDB successfully reconnected!");
      });
      mongoose.connection.on("error", (err) => {
        console.warn("[Database Event Warning] Socket error:", err.message);
      });

      break;
    } catch (error) {
      lastError = error;
      console.warn(`[Database Warning] Could not connect to MongoDB URI (${uri.substring(0, 35)}...): ${error.message}`);
    }
  }

  if (!connected) {
    console.error(`[Database Error] Unable to connect to any MongoDB instance: ${lastError?.message}`);
  }
};

module.exports = connectDatabase;
