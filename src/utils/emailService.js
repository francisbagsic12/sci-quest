import crypto from "crypto";
import transporter from "../config/email.js";

// Generate verification token
export const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Send verification email
export const sendVerificationEmail = async (
  userEmail,
  verificationToken,
  username,
) => {
  // Skip email if not configured (development mode)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log(
      `📧 Email skipped (not configured). Verification token for ${username}: ${verificationToken}`,
    );
    return true;
  }

  const verificationUrl = `${process.env.APP_BASE_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Scie-Quest - Email Verification",
    html: `
      <h1>Welcome to Scie-Quest, ${username}!</h1>
      <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Verify Email
      </a>
      <p>Or copy this link: ${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't sign up for this account, please ignore this email.</p>
      <p>Best regards,<br>Scie-Quest Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✓ Verification email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    console.log(
      `⚠️  Using fallback: Verification token for ${username}: ${verificationToken}`,
    );
    // Return true anyway so user can verify using token from console
    return true;
  }
};

// Send password reset email (optional, for future use)
export const sendPasswordResetEmail = async (
  userEmail,
  resetToken,
  username,
) => {
  const resetUrl = `${process.env.APP_BASE_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Scie-Quest - Password Reset",
    html: `
      <h1>Password Reset Request</h1>
      <p>Hi ${username},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>Scie-Quest Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✓ Password reset email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    console.log(
      `⚠️  Using fallback: Password reset token for ${username}: ${resetToken}`,
    );
    return true;
  }
};
