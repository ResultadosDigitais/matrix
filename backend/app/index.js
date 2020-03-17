import app from "./app.server";
import officeFactory from "./office.factory";
import healthCheck from "./app.healthcheck";
import { HOST, PORT } from "./app.config";

const server = app.listen(PORT, HOST, undefined, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

healthCheck(server);
officeFactory(server).start();

module.exports = server;
