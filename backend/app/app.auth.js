import passport from "passport";
import GooglePassport from "passport-google-oauth20";

import config from "./app.config";
import security from "./helpers/security";

passport.use(
  new GooglePassport.Strategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
      const user = security.adaptGoogleUser(profile);

      if (!security.hasValidEmailDomain(user.email)) {
        return cb(new Error(`E-mail "${user.email}" has invalid domain.`));
      }

      return cb(undefined, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const auth = {
  initialize() {
    return passport.initialize();
  },

  session() {
    return passport.session();
  },

  isUserLogged(req) {
    return !!this.currentUser(req);
  },

  currentUser(req) {
    return req.user;
  },

  authenticate() {
    return (req, resp, next) => {
      if (this.isUserLogged(req)) {
        return next();
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
