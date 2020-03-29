import passport from "passport";

import { authConfig, allowedDomains } from "../app.config";

import { domainAuthorization } from "./authorization";
import { buildAuthStrategy } from "./strategy";

const isAuthorized = domainAuthorization(allowedDomains);

passport.use(buildAuthStrategy(authConfig(), isAuthorized));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export function setupAppAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

export function currentUser(req) {
  return req.user;
}

export function isUserLoggedIn(req) {
  return !!this.currentUser(req);
}

export function authenticate(opts) {
  const { loginURL = null } = opts || {};

  return (req, resp, next) => {
    if (this.isUserLoggedIn(req)) {
      return next();
    }

    if (loginURL) {
      return resp.status(401).redirect(loginURL);
    }

    resp.sendStatus(401);
  };
}

export function login(req, user) {
  return new Promise((success, reject) => {
    req.login(user, err => {
      if (err) {
        return reject(err);
      }

      success(user);
    });
  });
}

export function logout(req) {
  req.logout();
}
