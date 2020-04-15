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
      .expect(200, {
        status: "ok",
      }, done);
  });
});
