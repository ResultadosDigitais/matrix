import passport from "passport";
import GooglePassport from "passport-google-oauth20";

import config from "./app.config";
import security from "./helpers/security";

passport.use(
  new GooglePassport.Strategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      const { emails } = profile;
      let currentEmail;

      if (emails && emails.length > 0) {
        currentEmail = emails[0].value;
      }

      if (!security.hasValidEmailDomain(currentEmail)) {
        return cb(new Error(`E-mail "${currentEmail}" has invalid domain.`));
      }

      return cb(undefined, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const auth = {
  initialize: () => passport.initialize(),
  session: () => passport.session(),
};

module.exports = auth;
