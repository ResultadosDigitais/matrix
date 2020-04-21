import passport from "passport";

import { getAuthConfig, getAllowedDomains } from "../../app.config";

import { domainAuthorization } from "./authorization";
import { buildAuthStrategy } from "./strategy";

const authConfig = getAuthConfig();
const isAuthorized = domainAuthorization(getAllowedDomains());

passport.use(buildAuthStrategy(authConfig, isAuthorized));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export const authStrategy = authConfig.authStrategy;

export function setupAppAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

export function authenticationHandler() {
  return passport.authenticate(authStrategy, { scope: ["profile", "email"] });
}

export function authenticationCallbackHandler({
  successRedirect,
  failureRedirect
}) {
  return function(req, resp, next) {
    const redirectToFailure = err => {
      const errorMessage = err || "";

      resp
        .status(401)
        .redirect(
          `${failureRedirect}?error=${encodeURIComponent(errorMessage)}`
        );
    };

    passport.authenticate(authStrategy, function(err, profile) {
      if (err) {
        return redirectToFailure(err);
      }
      if (!profile) {
        return redirectToFailure();
      }

      req.login(profile, err => {
        if (err) {
          return redirectToFailure(err);
        }

        resp.redirect(successRedirect);
      });
    })(req, resp, next);
  };
}

export function currentUser(req) {
  return req.user;
}

export function isUserLoggedIn(req) {
  return !!currentUser(req);
}

export function logout(req) {
  req.logout();
}
