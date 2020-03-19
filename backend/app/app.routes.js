import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    isAuthenticated: !!req.session.currentUser,
    error: req.query.error,
  });
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

module.exports = router;
