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
        expect(response.body.status).toBe("ok");
        expect(response.body['0']).toBeDefined();
        expect(response.body['0'].length).toBe(10);
      })
      .then(done);
  });
});
