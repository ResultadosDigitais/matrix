import { isUserLoggedIn } from "../services/auth";

export default function authenticate(opts) {
  const loginPath = opts?.loginPath;

  return (req, resp, next) => {
    if (isUserLoggedIn(req)) {
      return next();
    }

    if (loginPath) {
      return resp.status(401).redirect(loginPath);
    }

    resp.sendStatus(401);
  };
}
