import express from "express";
import Room from "./controllers/rooms.controller";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/office", (req, res) => res.render("office"));
router.get("/morpheus*", (req, res) => res.render("morpheus"));

router.get("/new", Room.create);
router.get("/remove", Room.remove);
router.get("/rooms", Room.list);

module.exports = router;
