import nodemailer from "nodemailer";
import { envConfig } from "./environment.config.js";

export default nodemailer.createTransport({
  host: envConfig.SMTP_HOST,
  port: Number(envConfig.SMTP_PORT),
  secure: false,
  auth: {
    user: envConfig.SMTP_EMAIL,
    pass: envConfig.SMTP_PASS,
  },
});
