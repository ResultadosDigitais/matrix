import { createTerminus } from "@godaddy/terminus";
import fetchRooms from "./services/rooms";
import { getRoomsSource } from "./app.config";

function onHealthCheck() {
  // checks if the system is healthy,
  // we can add the checks here as needed
  return Promise.all(
    [fetchRooms(getRoomsSource())],
  );
}

module.exports = (server) => {
  createTerminus(server, {
    healthChecks: {
      "/healthz": onHealthCheck,
      verbatim: true,
    },
  });
};
