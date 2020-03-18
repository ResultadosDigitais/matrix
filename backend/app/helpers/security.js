import config from "../app.config";

const security = {
  hasValidEmailDomain: (email) => {
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

  adaptGoogleUser: (profile) => {
    const {
      id,
      emails,
      displayName,
      photos,
      provider,
    } = profile;
    let currentEmail;
    let imageUrl;

    if (emails && emails.length > 0) {
      currentEmail = emails[0].value;
    }

    if (photos && photos.length > 0) {
      imageUrl = photos[0].value;
    }

    return {
      id,
      imageUrl,
      provider,
      name: displayName,
      email: currentEmail,
    };
  },
};

module.exports = security;
