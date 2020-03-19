import express from "express";
import RoomController from "./controllers/rooms.controller";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/office", (req, res) => res.render("office"));
router.get("/morpheus*", (req, res) => res.render("morpheus"));

router.get("/new", RoomController.create);
router.get("/remove", RoomController.remove);
router.get("/rooms", RoomController.list);

module.exports = router;
