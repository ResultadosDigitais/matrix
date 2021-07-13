export function domainAuthorization(allowedDomains) {
  const allowedDomainsSet = new Set(allowedDomains);

  return ({ email }) => {
    if (allowedDomainsSet.size === 0) {
      return true;
    }

    if (email === undefined) {
      return false
    }

    const [_, domain] = email.split("@");

    return allowedDomainsSet.has(domain);
  };
}

export function userAuthorization(allowedUsers) {
  const allowedUsersSet = new Set(allowedUsers);

  return ({ email }) => {
    if (allowedUsersSet.size === 0) {
      return true;
    }

    if (email === undefined) {
      return false
    }

    return allowedUsersSet.has(email);
  };
}
