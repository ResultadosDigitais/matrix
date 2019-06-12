import express from "express";
import path from "path";
import GoogleCredentialController from "./controllers/google.credentials.controller";
import OfficeController from "./controllers/office.controller";
import fetchRooms from "./controllers/rooms.controller";
import Office from "./office.server";
import assets from "./controllers/assets.controller.js";

const ROOMS_SOURCE = process.env.ROOMS_SOURCE;
const ENVIRONMENT = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const GOOGLE_CREDENTIAL =
  process.env.GOOGLE_CREDENTIAL ||
  "990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com";
const ENFORCE_SSL = process.env.ENFORCE_SSL || "false";

const app = express();

// set the template engine ejs
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "..", "public")));

// FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLE_CREDENTIAL);

const assetsManifestFile = path.join(
  __dirname,
  "..",
  "public",
  "dist",
  "manifest.json"
);
const assetsManifestResolver =
  ENVIRONMENT === "production"
    ? assets.staticManifestResolver(assetsManifestFile)
    : assets.lazyManifestResolver(assetsManifestFile);

app.locals.assets = assets.createAssetsResolver(
  assetsManifestResolver,
  "/dist"
);

app.use((req, res, next) => {
  let isSecure = req.secure || req.header("x-forwarded-proto") === "https";

  if (ENFORCE_SSL === "true" && !isSecure) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

// routes
app.get("/", (req, res) => {
  res.render("index");
});

// routes
app.get("/new", (req, res) => {

  const newRoom = {
    "id": req.query.roomId,
    "name": req.query.roomName,
    "disableMeeting": false,
    "temporary":true
  }

  let found = app.locals.roomsDetail.find(element => element.id == req.query.roomId);

  if(!found){
      app.locals.roomsDetail.splice( 1, 0, newRoom);
  }

  res.redirect(`/office#${req.query.roomId}`);
});


app.get("/remove", (req, res) => {


    app.locals.roomsDetail = app.locals.roomsDetail.filter(function(value, index, arr){

    return (value.id !=req.query.roomId) && value.temporary!=true;

  });

  res.redirect(`/office#${app.locals.roomsDetail[0].id}`);
});


app.get("/office", (req, res) => {
  res.render("office");
});


fetchRooms(ROOMS_SOURCE)
    .then(roomsData => {
      console.log(roomsData);

      app.locals.roomsDetail = roomsData;
      
    })
    .catch(err => {
      console.error(err);
});


// Listen on port 8080
const server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const officeControllerInstance = new OfficeController();
const office = new Office(officeControllerInstance, server);

office.start();

module.exports = server;
