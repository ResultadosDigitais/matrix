import app from "./app.server";
import officeFactory from "./office.factory";
import { HOST, PORT } from "./app.config";

const server = app.listen(PORT, HOST, undefined, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

officeFactory(server).start();

module.exports = server;
