const assert = require("assert");
const io = require("socket.io-client");
const sinon = require("sinon");

const app = require("../backend/app.server");
const Office = require("../backend/office.server");

const SOCKET_HOST = "0.0.0.0";
const SOCKET_PORT = "3003";

describe("Office server", () => {
  const user = JSON.stringify({ id: 1 });
  const room = JSON.stringify({});
  const ioOptions = {
    transports: ["websocket"],
    forceNew: true,
    reconnection: false,
    query: `user=${user}&room=${room}`,
  };
  let officeController;
  let server;
  let office;
  let socketClient;

  beforeEach(() => {
    officeController = {
      addUserInRoom: sinon.fake(),
      getUserInRoom: sinon.fake(),
      getUsersInOfficeByMap: sinon.fake(),
      removeUser: sinon.fake(),
    };

    // start express server
    server = app.listen(SOCKET_PORT, SOCKET_HOST);

    // start Office server
    office = new Office(officeController, server);

    // connect a client to Office server
    socketClient = io.connect(`http://${SOCKET_HOST}:${SOCKET_PORT}/`, ioOptions);
  });

  afterEach(() => {
    if (socketClient) {
      socketClient.disconnect();
    }

    server.close();
  });

  it("should connect and disconnect with success", (done) => {
    office.start();

    socketClient.on("connect", () => {
      assert(officeController.addUserInRoom.calledOnce);
      assert(officeController.getUserInRoom.calledOnce);
      assert(officeController.getUsersInOfficeByMap.calledOnce);
      done();
    });
  });

  it("should enter a room with success", (done) => {
    const payload = {
      room: "test-room",
    };

    office.start();

    socketClient.on("connect", () => {
      socketClient.on("enter-room", () => {
        if (officeController.addUserInRoom.callCount === 2) {
          assert.equal(
            officeController.addUserInRoom.getCall(1).lastArg,
            "test-room",
          );
          done();
        }
      });

      socketClient.emit("enter-room", payload);
    });
  });
});
