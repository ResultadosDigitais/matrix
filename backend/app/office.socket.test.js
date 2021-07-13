// eslint-disable-next-line import/no-extraneous-dependencies
const io = require("socket.io-client");

const app = require("../app/app.server");
const Office = require("../app/office.socket");

const SOCKET_HOST = "0.0.0.0";
const SOCKET_PORT = "3003";

describe("Office server", () => {
  const defaultUser = JSON.stringify({ id: 1 });
  let ioOptions;
  let officeController;
  let server;
  let office;
  let socketClient;

  beforeEach(() => {
    officeController = {
      addUserInRoom: jest.fn(),
      getUserInRoom: jest.fn(),
      getUsersInOfficeByMap: jest.fn(),
      removeUser: jest.fn(),
    };

    ioOptions = {
      transports: ["websocket"],
      forceNew: true,
      reconnection: false,
      query: `user=${defaultUser}`,
    };
  });

  afterEach(() => {
    if (socketClient) {
      socketClient.disconnect();
    }
    if (server) {
      server.close();
    }
  });

  const connectSocketServer = () => {
    // start express server
    server = app.listen(SOCKET_PORT, SOCKET_HOST);

    // start Office server
    office = new Office(officeController, server);
    office.start();

    // connect a client to Office server
    socketClient = io.connect(
      `http://${SOCKET_HOST}:${SOCKET_PORT}/`,
      ioOptions,
    );
  };

  it("should connect and disconnect with success", (done) => {
    connectSocketServer();

    socketClient.on("connect", () => {
      expect(officeController.addUserInRoom).toHaveBeenCalledTimes(1);
      expect(officeController.getUserInRoom).toHaveBeenCalledTimes(1);
      expect(officeController.getUsersInOfficeByMap).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should enter in default room on connect", (done) => {
    connectSocketServer();

    socketClient.on("connect", () => {
      socketClient.on("enter-room", () => {
        expect(officeController.addUserInRoom.mock.calls[0][1]).toBe("room-1");
        done();
      });
    });
  });

  it("should enter in query room on connect", (done) => {
    ioOptions.query = `user=${defaultUser}&room=Nebuchadnezzar`;

    connectSocketServer();

    socketClient.on("connect", () => {
      socketClient.on("enter-room", () => {
        expect(officeController.addUserInRoom.mock.calls[0][1]).toBe("Nebuchadnezzar");
        done();
      });
    });
  });

  it("should enter a room with success", (done) => {
    const payload = {
      room: "test-room",
    };

    connectSocketServer();

    socketClient.on("connect", () => {
      socketClient.on("enter-room", () => {
        // validates the second event when "enter-room" was emitted
        // because the first is triggered on connection
        if (officeController.addUserInRoom.mock.calls.length === 2) {
          expect(officeController.addUserInRoom.mock.calls[1][1]).toBe("test-room");
          done();
        }
      });

      socketClient.emit("enter-room", payload);
    });
  });

  it("should emit error when given user is an invalid json", (done) => {
    ioOptions.query = "user=invalid&room=Nebuchadnezzar";

    connectSocketServer();

    socketClient
      .on("connect", () => {
        done.fail("should not connect because user is invalid")();
      })
      .on("error", (err) => {
        expect(err).toEqual("Invalid user")
        done();
      });
  });
});
