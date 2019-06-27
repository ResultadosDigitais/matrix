import OfficeController from "./controllers/office.controller";
import Office from "./office.socket";

module.exports = (server) => {
  const officeControllerInstance = new OfficeController();
  return new Office(officeControllerInstance, server);
};
