module.exports = {
  ROOMS_SOURCE: process.env.ROOMS_SOURCE,
  ENVIRONMENT: process.env.NODE_ENV,
  GOOGLE_CREDENTIAL:
    process.env.GOOGLE_CREDENTIAL
    || "990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com",
  ENFORCE_SSL: process.env.ENFORCE_SSL || "false",
  CUSTOM_STYLE: process.env.CUSTOM_STYLE || "",
  HOST: process.env.HOST ||"0.0.0.0",
  PORT: process.env.PORT || 8080,
};
