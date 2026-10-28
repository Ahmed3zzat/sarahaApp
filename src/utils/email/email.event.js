import { EventEmitter } from "events";
import sendEmail, { subjects } from "./sendEmailFile.js";
import { signUp } from "./generatorHtml.js";
import { generateToken } from "../token/token.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", async (emailData) => {
  // console.log("Email event triggered:", emailData);

  // Generate the verification URL for account activation

  const token = generateToken({ payload: emailData });
  const verificationUrl = `http://localhost:3000/auth/active_account/${token}`;

  await sendEmail({
    to: emailData.email,
    subject: subjects.WELCOME,
    html: signUp(verificationUrl),
  }).catch((error) => {
    console.error("Failed to send verification email:", error);
  });
});
