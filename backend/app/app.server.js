import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import path from "path";
import GoogleCredentialController from "./controllers/google.credentials.controller";
import fetchRooms from "./controllers/rooms.controller";
import assets from "./controllers/assets.controller";
import routes from "./app.routes";
import auth from "./app.auth";
import {
  ROOMS_SOURCE,
  ENVIRONMENT,
  GOOGLE_CREDENTIAL,
  ENFORCE_SSL,
  CUSTOM_STYLE,
  COOKIE_SESSION_SECRET,
  COOKIE_SESSION_MAX_AGE,
} from "./app.config";

const app = express();

app.locals.CUSTOM_STYLE = CUSTOM_STYLE;

app.use(cookieSession({
  name: "matrix-session",
  keys: [COOKIE_SESSION_SECRET],
  maxAge: COOKIE_SESSION_MAX_AGE,
}));
app.use(bodyParser.urlencoded({ extended: false }));

// set the template engine ejs
app.set("view engine", "ejs");
app.set("views", "./app/views");

// use passport session
app.use(auth.initialize());
app.use(auth.session());

app.use("/", express.static(path.join(__dirname, "..", "..", "public")));

// FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLE_CREDENTIAL);

const assetsManifestFile = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "dist",
  "manifest.json",
);
const assetsManifestResolver = ENVIRONMENT === "production"
  ? assets.staticManifestResolver(assetsManifestFile)
  : assets.lazyManifestResolver(assetsManifestFile);

app.locals.assets = assets.createAssetsResolver(
  assetsManifestResolver,
  "/dist",
);

app.use((req, res, next) => {
  const isSecure = req.secure || req.header("x-forwarded-proto") === "https";

  if (ENFORCE_SSL === "true" && !isSecure) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.use(routes);

fetchRooms(ROOMS_SOURCE)
  .then((roomsData) => {
    console.log(roomsData);
    app.locals.roomsDetail = roomsData;
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
