import { envConfig } from "../config/environment.config.js";

export default function errorMiddleware(err, req, res, next) {
  res.status(400).json({
    message: err.message || "Internal Server Error",
    stack: envConfig.NODE_ENV === "production" ? null : err.stack,
  });
}
