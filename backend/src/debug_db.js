require('dotenv').config();
const mongoose = require('mongoose');

async function debugDb() {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log("Connecting to MONGO_URI:", mongoUri ? "FOUND" : "NOT FOUND");
    await mongoose.connect(mongoUri, { dbName: "CRM", serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB!");

    const admin = mongoose.connection.client.db().admin();
    const dbs = await admin.listDatabases();
    console.log("Databases in cluster:", dbs.databases.map(d => d.name));

    for (const dbInfo of dbs.databases) {
      if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
      console.log(`\n=== Database: ${dbInfo.name} ===`);
      const db = mongoose.connection.client.db(dbInfo.name);
      const cols = await db.listCollections().toArray();
      for (const col of cols) {
        const count = await db.collection(col.name).countDocuments();
        console.log(`  Collection '${col.name}': ${count} documents`);
        if (count > 0) {
          const sample = await db.collection(col.name).find({}).limit(10).toArray();
          console.log(`    Sample IDs/Names:`, sample.map(s => ({ id: s.id || s._id, name: s.name || s.title || s.email, status: s.status })));
        }
      }
    }
  } catch (err) {
    console.error("DB Debug Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

debugDb();
