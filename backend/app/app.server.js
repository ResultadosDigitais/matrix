import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan"

import assets from "./controllers/assets.controller";
import routes from "./app.routes";

import { setupAppAuth } from "./services/auth";
import fetchRooms from "./services/rooms";

import {
  getRoomsSource,
  getSessionConfig,
  getEnvironment,
  shouldEnforceSSL
} from "./app.config";

const app = express();

app.use(morgan("tiny"));
app.use(cookieSession(getSessionConfig()));
app.use(bodyParser.urlencoded({ extended: false }));

// set the template engine ejs
app.set("view engine", "ejs");
app.set("views", "./app/views");

// use authentication
setupAppAuth(app);

app.use("/", express.static(path.join(__dirname, "..", "..", "public")));

const assetsManifestFile = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "dist",
  "manifest.json"
);
const assetsManifestResolver =
  getEnvironment() === "production"
    ? assets.staticManifestResolver(assetsManifestFile)
    : assets.lazyManifestResolver(assetsManifestFile);

app.locals.assets = assets.createAssetsResolver(
  assetsManifestResolver,
  "/dist"
);

app.use((req, res, next) => {
  const isSecure = req.secure || req.header("x-forwarded-proto") === "https";

  if (shouldEnforceSSL() && !isSecure) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.use(routes);

fetchRooms(getRoomsSource())
  .then(roomsData => {
    console.log(roomsData);
    app.locals.roomsDetail = roomsData;
  })
  .catch(err => {
    console.error(err);
  });

module.exports = app;
