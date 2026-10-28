import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, "../templates/testEmail.html");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 465 means that the email will be sent using a secure connection (SSL/TLS) on port 465, which is the standard port for secure SMTP communication.
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    // pass is the password or app-specific password for the email account used to send emails. It is stored in an environment variable (process.env.EMAIL_PASSWORD) for security reasons, so that it is not hardcoded in the codebase.
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    // const html = await fs.readFile(templatePath, "utf-8");
    const mailOptions = {
      from: `Saraha App <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    // console.log("Email sent successfully!");
    // console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const subjects = {
  WELCOME: "Welcome to Saraha App!",
  PASSWORD_RESET: "Password Reset Request",
  ACCOUNT_VERIFICATION: "Account Verification",
  NOTIFICATION: "New Notification",
  PROMOTION: "Exclusive Promotion",
};

export default sendEmail;
