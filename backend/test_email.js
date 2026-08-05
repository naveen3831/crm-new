const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const nodemailer = require("nodemailer");

async function testMail() {
  const smtpUser = process.env.SMTP_USER || "naveenkumar970100@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "bzhrewmmaqzdnlrs";

  console.log("Testing SMTP send with User:", smtpUser, "Pass:", smtpPass);

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

  try {
    const info = await transporter.sendMail({
      from: `"Speshway Solutions" <${smtpUser}>`,
      to: "naveenkumar970100@gmail.com",
      subject: "Test PDF Email - Speshway Solutions",
      text: "This is a test email sent to verify Gmail SMTP delivery.",
    });

    console.log("SUCCESS:", info);
  } catch (err) {
    console.error("ERROR SENDING MAIL:", err);
  }
}

testMail();
