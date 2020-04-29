import app from "./app.server";
import officeFactory from "./office.factory";
import healthCheck from "./app.healthcheck";
import { getServerConfig } from "./app.config";

const { host, port } = getServerConfig();
const server = app.listen(port, host, undefined, () => {
  console.log(`Running on http://${host}:${port}`);
});

healthCheck(server);
officeFactory(server).start();

module.exports = server;
