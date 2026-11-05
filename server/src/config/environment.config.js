export const envConfig = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,

  CLIENT_URL: process.env.CLIENT_URL,

  NODE_ENV: process.env.NODE_ENV || "development",

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
};
