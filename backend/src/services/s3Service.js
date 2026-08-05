const crypto = require("crypto");
const https = require("https");
const path = require("path");
const fs = require("fs");

function hmac(key, string) {
  return crypto.createHmac("sha256", key).update(string, "utf8").digest();
}

function hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = hmac("AWS4" + key, dateStamp);
  const kRegion = hmac(kDate, regionName);
  const kService = hmac(kRegion, serviceName);
  const kSigning = hmac(kService, "aws4_request");
  return kSigning;
}

/**
 * Upload buffer to AWS S3 bucket with fallback to local server static uploads
 */
exports.uploadToS3 = async ({ buffer, fileName, mimeType }) => {
  const accessKey = process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "ap-south-1";
  const bucket = process.env.AWS_S3_BUCKET || "crm-naveen-1";

  const ext = path.extname(fileName || "") || (mimeType.includes("png") ? ".png" : ".jpg");
  const s3Key = `uploads/logo-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}${ext}`;
  const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`;

  if (accessKey && secretKey && bucket) {
    try {
      const host = `${bucket}.s3.${region}.amazonaws.com`;
      const endpoint = `/${s3Key}`;
      const now = new Date();
      const amzDate = now.toISOString().replace(/[:-]/g, "").replace(/\.\d{3}/, "");
      const dateStamp = amzDate.substring(0, 8);

      const payloadHash = hash(buffer);
      const canonicalHeaders = `content-type:${mimeType}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
      const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

      const canonicalRequest = [
        "PUT",
        endpoint,
        "",
        canonicalHeaders,
        signedHeaders,
        payloadHash
      ].join("\n");

      const algorithm = "AWS4-HMAC-SHA256";
      const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
      const stringToSign = [
        algorithm,
        amzDate,
        credentialScope,
        hash(canonicalRequest)
      ].join("\n");

      const signingKey = getSignatureKey(secretKey, dateStamp, region, "s3");
      const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

      const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

      const s3Success = await new Promise((resolve, reject) => {
        const req = https.request({
          host,
          port: 443,
          path: endpoint,
          method: "PUT",
          headers: {
            "Content-Type": mimeType,
            "Host": host,
            "x-amz-content-sha256": payloadHash,
            "x-amz-date": amzDate,
            "Authorization": authorizationHeader,
            "Content-Length": buffer.length
          }
        }, (res) => {
          let body = "";
          res.on("data", chunk => body += chunk);
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(true);
            } else {
              console.warn("[S3 Upload Warning]", res.statusCode, body);
              resolve(false);
            }
          });
        });

        req.on("error", (err) => {
          console.warn("[S3 Connection Warning]", err.message);
          resolve(false);
        });
        req.write(buffer);
        req.end();
      });

      if (s3Success) {
        return s3Url;
      }
    } catch (s3Err) {
      console.warn("[S3 Upload Exception]", s3Err.message);
    }
  }

  // Local fallback server static file save
  try {
    const uploadDir = path.join(__dirname, "../../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const localFileName = `logo-${Date.now()}${ext}`;
    const localPath = path.join(uploadDir, localFileName);
    fs.writeFileSync(localPath, buffer);
    return `http://localhost:5000/uploads/${localFileName}`;
  } catch (localErr) {
    return null;
  }
};
