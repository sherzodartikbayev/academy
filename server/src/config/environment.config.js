export const envConfig = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
