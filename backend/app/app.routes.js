import express from "express";
import passport from "passport";

import Room from "./controllers/rooms.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    isAuthenticated: !!req.session.currentUser,
    error: req.query.error,
  });
});

router.get("/morpheus*", (req, res) => {
  const { currentUser } = req.session;
  const isAuthenticated = !!currentUser;
  let userString = "";

  if (isAuthenticated) {
    userString = JSON.stringify(currentUser);
  }

  res.render("morpheus", {
    isAuthenticated,
    userString,
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      if (err || !profile) {
        const message = (err && err.message) || "Unknown error";
        return res.redirect(`/?error=${encodeURIComponent(message)}`);
      }

      req.session.currentUser = profile;

      return res.redirect("/");
    })(req, res, next);
  },
);

router.post("/auth/logout", (req, res) => {
  req.session.currentUser = null;
  req.logout();
  res.redirect("/");
});

router.get("/office", (req, res) => res.render("office"));

router.get("/new", Room.create);
router.get("/remove", Room.remove);
router.get("/rooms", Room.list);

module.exports = router;
