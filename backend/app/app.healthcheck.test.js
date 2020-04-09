const request = require("supertest");
const healthCheck = require("../app/app.healthcheck");
const app = require("../app/app.server");

describe("Unit testing the /healthz route", () => {
  let server;
  beforeEach(function () {
    server = app.listen();
  });
  afterEach(function () {
    server.close();
  });

  it("should return OK status", (done) => {
    healthCheck(server);
    request(server)
      .get("/healthz")
      .expect(200, {
        status: 'ok'
      }, done);
  });
});
