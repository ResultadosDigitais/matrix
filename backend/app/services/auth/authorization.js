export function domainAuthorization(allowedDomains) {
  const allowedDomainsSet = new Set(allowedDomains);

  return ({ email }) => {
    if (allowedDomainsSet.size === 0) {
      return true;
    }

    const [_, domain] = email.split("@");

    return allowedDomains.has(domain);
  };
}
