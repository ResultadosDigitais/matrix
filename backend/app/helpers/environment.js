const environment = {
  parseVariable(envVar) {
    if (envVar) {
      try {
        return JSON.parse(envVar);
      // eslint-disable-next-line no-empty
      } catch (error) {}
    }

    return undefined;
  },
};

module.exports = environment;
