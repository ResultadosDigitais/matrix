import environment from "./helpers/environment";

module.exports = {
  ROOMS_SOURCE: process.env.ROOMS_SOURCE,
  ENVIRONMENT: process.env.NODE_ENV,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "XXXX",
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || "XXXX",
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    || "http://localhost:8080/auth/google/callback",
  COOKIE_SESSION_SECRET: process.env.COOKIE_SESSION_SECRET || "matrix-session",
  COOKIE_SESSION_MAX_AGE: environment.parseVariable(process.env.COOKIE_SESSION_MAX_AGE)
    || 30 * 24 * 60 * 60 * 1000, // 30 days
  ENFORCE_SSL: process.env.ENFORCE_SSL || "false",
  CUSTOM_STYLE: process.env.CUSTOM_STYLE || "",
  HOST: "0.0.0.0",
  PORT: process.env.PORT || 8080,
  WHITELIST_DOMAINS: environment.parseVariable(process.env.WHITELIST_DOMAINS) || [],
};
