import express from "express";
import eventGenerator from "./business/event.generator";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/new", (req, res) => {
  const newRoom = {
    id: req.query.roomId,
    name: req.query.roomName,
    disableMeeting: false,
    temporary: true,
  };

  const found = req.app.locals.roomsDetail.find(
    element => element.id == req.query.roomId,
  );

  if (!found) {
    req.app.locals.roomsDetail.splice(1, 0, newRoom);
  }

  res.redirect(`/morpheus/room/${req.query.roomId}`);
});

router.get("/event", (req, res) => {
  const eventDetails = eventGenerator.getEventDetailsText();
  res.redirect(`https://www.google.com/calendar/render?action=TEMPLATE&text=Meeting in Matrix&details=${eventDetails}`);
});


router.get("/remove", (req, res) => {
  req.app.locals.roomsDetail = req.app.locals.roomsDetail.filter(
    value => value.id !== req.query.roomId || value.temporary !== true,
  );

  res.redirect(`/office#${req.app.locals.roomsDetail[0].id}`);
});

router.get("/office", (req, res) => {
  res.render("office");
});

router.get("/rooms", (req, res) => {
  res.json(req.app.locals.roomsDetail);
});

router.get("/morpheus*", (req, res) => {
  res.render("morpheus");
});

module.exports = router;
