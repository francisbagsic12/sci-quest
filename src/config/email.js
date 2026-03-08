import nodemailer from "nodemailer";

// Log email configuration for debugging
console.log("Email Config:", {
  host: "smtp.gmail.com",
  port: "587",
  user: "bagsicfrancis3@gmail.com",
});

const emailPort = parseInt("587");
const isSecure = emailPort === 465;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: emailPort,
  secure: isSecure,
  auth: {
    user: "bagsicfrancis3@gmail.com",
    pass: "xsqgfbxfjlrmhdhs",
  },
  tls: {
    rejectUnauthorized: false, // For development/testing with Gmail
  },
});

// Verify transporter configuration only if credentials are set
if ("bagsicfrancis3@gmail.com" && "xsqgfbxfjlrmhdhs") {
  transporter.verify((error, success) => {
    if (error) {
      console.log(
        "⚠️  Email configuration error. Check your Gmail App Password:",
        error.message,
      );
    } else {
      console.log("✓ Email server is ready to send messages");
    }
  });
} else {
  console.log(
    "⚠️  Email not configured. Verification tokens will be logged in console.",
  );
}

export default transporter;
