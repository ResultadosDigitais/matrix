import express from "express";
import path from "path";
import favicon from "serve-favicon";
import GoogleCredentialController from "./controllers/google.credentials.controller";
import OfficeController from "./controllers/office.controller";
import fetchRooms from "./controllers/rooms.controller";
import Office from "./office.server";


const ROOMS_SOURCE = process.env.ROOMS_SOURCE;
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const GOOGLE_CREDENTIAL =
  process.env.GOOGLE_CREDENTIAL ||
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

// FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLE_CREDENTIAL);

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/office", (req, res) => {
  fetchRooms(ROOMS_SOURCE)
    .then(roomsData => {

      console.log(roomsData);

      app.locals.roomsDetail = roomsData;
      res.render("office");
    })
    .catch(err => {
      console.error(err);

      res.render("500", { status: 500 });
    });
});

// Listen on port 8080
const server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const officeControllerInstance = new OfficeController();
const office = new Office(officeControllerInstance, server);

office.start();

module.exports = server;
