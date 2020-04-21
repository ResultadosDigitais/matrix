const request = require("supertest");
const healthCheck = require("./app.healthcheck");
const app = require("./app.server");

describe("Unit testing the /healthz route", () => {
  let server;
  beforeEach(() => {
    server = app.listen();
  });
  afterEach(() => {
    server.close();
  });

  it("should return OK status", (done) => {
    healthCheck(server);
    request(server)
      .get("/healthz")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          {
            0: [
              {
                id: expect.any(String),
                name: "The Dock",
                disableMeeting: true,
              },
              {
                id: expect.any(String),
                name: "Nebuchadnezzar",
              },
              {
                id: expect.any(String),
                name: "Logos",
              },
              {
                id: expect.any(String),
                name: "Osiris",
              },
              {
                id: expect.any(String),
                name: "Icarus",
              },
              {
                id: expect.any(String),
                name: "Caduceus",
              },
              {
                id: expect.any(String),
                name: "Brahma",
              },
              {
                id: expect.any(String),
                name: "Novalis",
              },
              {
                id: expect.any(String),
                name: "Vigilant",
              },
              {
                id: expect.any(String),
                name: "Zion",
              },
            ],
            status: "ok",
          },
        );
      })
      .then(done);
  });
});
