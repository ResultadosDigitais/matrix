import passport from "passport";
import GooglePassport from "passport-google-oauth20";

import { authConfig, allowedDomains } from "../app.config";

import { domainAuthorization } from "./authorization";
import { buildAuthStrategy } from "./strategy";

const isAuthorized = domainAuthorization(allowedDomains);

passport.use(buildAuthStrategy(authConfig(), isAuthorized));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const auth = {
  initialize() {
    return passport.initialize();
  },

  session() {
    return passport.session();
  },

  isUserLoggedIn(req) {
    return !!this.currentUser(req);
  },

  currentUser(req) {
    return req.user;
  },

  authenticate(opts) {
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
  },

  login(req, user) {
    return new Promise((success, reject) => {
      req.login(user, err => {
        if (err) {
          return reject(err);
        }

        success(user);
      });
    });
  },

  logout(req) {
    req.logout();
  }
};

module.exports = auth;
