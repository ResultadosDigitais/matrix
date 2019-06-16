import OfficeController from "./controllers/office.controller";
import Office from "./office.server";
import app from "./app.server";

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST, undefined, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

const officeControllerInstance = new OfficeController();
const office = new Office(officeControllerInstance, server);

office.start();

module.exports = server;
