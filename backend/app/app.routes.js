import express from "express";
import authenticate from "./middlewares/authenticate";
import {
  authStrategy,
  authenticationHandler,
  authenticationCallbackHandler,
  currentUser,
  login,
  logout,
  isUserLoggedIn
} from "./services/auth";

const router = express.Router();

const routes = {
  loginPath: "/",
  logoutPath: "/auth/logout",
  createRoomPath: "/new",
  removeRoomPath: "/remove",
  listRoomsPath: "/rooms",
  officePath: id => `/morpheus/office/${id}`,
  roomPath: id => `/morpheus/room/${id}`,
  homePath: "/morpheus/",
  loginStrategyPath: `/auth/${authStrategy}`,
  loginStrategyCallbackPath: `/auth/${authStrategy}/callback`
};

router.get(routes.loginPath, (req, res) => {
  if (isUserLoggedIn(req)) {
    return res.redirect(routes.homePath);
  }

  return res.render("index", { error: req.query.error });
});

router.get(
  routes.createRoomPath,
  authenticate({ loginPath: routes.loginPath }),
  (req, res) => {
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

    res.redirect(routes.roomPath(req.query.roomId));
  }
);

router.get(
  routes.removeRoomPath,
  authenticate({ loginPath: routes.loginPath }),
  (req, res) => {
    req.app.locals.roomsDetail = req.app.locals.roomsDetail.filter(
      value => value.id !== req.query.roomId || value.temporary !== true
    );

    const defaultRoom = req.app.locals.roomsDetail[0].id;

    res.redirect(routes.officePath(defaultRoom));
  }
);

router.get(routes.listRoomsPath, authenticate(), (req, res) => {
  res.json(req.app.locals.roomsDetail);
});

router.get(
  `${routes.homePath}*`,
  authenticate({ loginPath: routes.loginPath }),
  (req, res) => {
    const userString = JSON.stringify(currentUser(req));

    res.render("morpheus", { userString });
  }
);

router.get(routes.loginStrategyPath, authenticationHandler());

router.get(
  routes.loginStrategyCallbackPath,
  authenticationCallbackHandler({
    successRedirect: routes.homePath,
    failureRedirect: routes.loginPath
  })
);

router.post(routes.logoutPath, (req, res) => {
  logout(req);
  res.redirect(routes.loginPath);
});

export default router;
