import security from "../helpers/security";

const authentication = ({ redirectOnSuccess, redirectOnFail }) => (
  req,
  res,
  next,
) => {
  let isAuthenticated = false;

  if (req.user) {
    req.isGoogleLoggedIn = true;

    const { emails } = req.user;
    let currentEmail;

    if (emails && emails.length > 0) {
      currentEmail = emails[0].value;
    }

    isAuthenticated = security.hasValidEmailDomain(currentEmail);
  }

  if (isAuthenticated) {
    if (redirectOnSuccess) {
      return res.redirect(redirectOnSuccess);
    }
  } else if (redirectOnFail) {
    let redirectURL = "/";

    if (typeof redirectOnFail === "string") {
      redirectURL = redirectOnFail;
    }

    return res.redirect(redirectURL);
  }

  return next();
};

module.exports = authentication;
