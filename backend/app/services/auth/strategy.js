import { Strategy as GoogleOAuth } from "passport-google-oauth20";

export function googleProfileToMatrixProfile(profile) {
  const { id, emails, displayName: name, photos, provider } = profile;

  const email = emails?.[0]?.value;
  const imageUrl = photos?.[0]?.value;

  return {
    id,
    imageUrl,
    provider,
    name,
    email
  };
}

export function buildAuthStrategy(
  { clientID, clientSecret, callbackURL },
  isAuthorized
) {
  return new GoogleOAuth(
    { clientID, clientSecret, callbackURL },

    (accessToken, refreshToken, googleProfile, cb) => {
      const profile = googleProfileToMatrixProfile(googleProfile);

      if (!isAuthorized(profile)) {
        return cb(new Error(`E-mail ${profile.email} is not authorized`));
      }

      return cb(undefined, profile);
    }
  );
}
