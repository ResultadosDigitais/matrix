import app from "./app.server";
import officeFactory from "./office.factory";

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, undefined, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

officeFactory(server).start();

module.exports = server;
