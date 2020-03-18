import config from "../app.config";

const security = {
  hasValidEmailDomain(email) {
    const whitelistDomains = config.WHITELIST_DOMAINS;

    if (whitelistDomains.length === 0) {
      // has no restriction to domains
      return true;
    }

    if (email) {
      for (let i = 0; i < whitelistDomains.length; i += 1) {
        if (email.endsWith(whitelistDomains[i])) {
          return true;
        }
      }
    }

    return false;
  },
};

module.exports = security;
