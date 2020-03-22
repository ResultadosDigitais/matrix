import express from "express";
import auth from "./app.auth";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res) => {
  if (auth.isUserLoggedIn(req)) {
    return res.redirect("/morpheus");
  }

  return res.render("index", { error: req.query.error });
});

router.get("/new", auth.authenticate({ loginURL: "/" }), (req, res) => {
  const newRoom = {
    id: req.query.roomId,
    name: req.query.roomName,
    disableMeeting: false,
    temporary: true
  };

  const found = req.app.locals.roomsDetail.find(
    element => element.id == req.query.roomId
  );

  if (!found) {
    req.app.locals.roomsDetail.splice(1, 0, newRoom);
  }

  res.redirect(`/morpheus/room/${req.query.roomId}`);
});

router.get("/remove", auth.authenticate({ loginURL: "/ " }), (req, res) => {
  req.app.locals.roomsDetail = req.app.locals.roomsDetail.filter(
    value => value.id !== req.query.roomId || value.temporary !== true
  );

  res.redirect(`/morpheus/office/${req.app.locals.roomsDetail[0].id}`);
});

router.get("/rooms", auth.authenticate(), (req, res) => {
  res.json(req.app.locals.roomsDetail);
});

router.get("/morpheus*", auth.authenticate({ loginURL: "/" }), (req, res) => {
  const userString = JSON.stringify(auth.currentUser(req));

  res.render("morpheus", { userString });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, profile) => {
    if (err || !profile) {
      const message = (err && err.message) || "Unknown error";
      return res.redirect(`/?error=${encodeURIComponent(message)}`);
    }

    auth
      .login(req, profile)
      .then(user => res.redirect("/"))
      .catch(err => next(err));
  })(req, res, next);
});

router.post("/auth/logout", (req, res) => {
  auth.logout(req);
  res.redirect("/");
});

module.exports = router;
