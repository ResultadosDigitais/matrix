import { createTerminus } from "@godaddy/terminus";

function onHealthCheck() {
    // checks if the system is healthy,
    // we can add the checks here as needed
    return Promise.resolve();
}

module.exports = (server) => {
  createTerminus(server, {
    healthChecks: {
      '/healthz': onHealthCheck,
      verbatim: true
    }
  });
};
