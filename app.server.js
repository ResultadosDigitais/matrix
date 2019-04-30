import express from "express";
import fs from "fs";
import path from "path";
import favicon from "serve-favicon";
import GoogleCredentialController from "./controllers/google.credentials.controller";
import OfficeController from "./controllers/office.controller";
import Office from "./office.server";

const ROOMS_SOURCE = process.env.ROOMS_SOURCE;
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const GOOGLECREDENTIAL =
  process.env.googleCredential ||
  "990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com";
const app = express();

// favicon
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// set the template engine ejs
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

//css
app.use(
  "/css/bootstrap",
  express.static(`${__dirname}/node_modules/bootstrap/dist/css`)
);
app.use(
  "/css/font_awesome",
  express.static(`${__dirname}/node_modules/font-awesome/css`)
);

//js
app.use(
  "/js/bootstrap",
  express.static(`${__dirname}/node_modules/bootstrap/dist/js`)
);

// FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLECREDENTIAL);

const fetchRooms = strategy => {
  switch (strategy) {
    //TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

const fetchFromFile = async () => {
  const roomsData = fs.readFileSync("./file/default.room.web.json");
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve, reject) => resolve(roomsDetail));
};

const fetchFromEnvironment = async env => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise((resolve, reject) => resolve(roomsDetail));
};

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/office", async (req, res) => {
  const roomsData = await fetchRooms(ROOMS_SOURCE);

  console.log(roomsData);
  app.locals.roomsDetail = roomsData;

  res.render("office");
});

// Listen on port 8080
const server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const officeControllerInstance = new OfficeController();
const office = new Office(officeControllerInstance, server);

office.start();

module.exports = server;
