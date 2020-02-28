const assert = require("assert");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app/app.server");

describe("Unit testing the / route", () => {
  it("should return OK status", () => request(app)
    .get("/")
    .then((response) => {
      assert.equal(response.status, 200);
    }));

  it("should there is googleapi on rendering", () => request(app)
    .get("/")
    .then((response) => {
      expect(response.text).to.contain(
        "<script src=\"https://apis.google.com/js/platform.js\"></script>",
      );
    }));

  it("should there is <meta> google-signin-client_id on rendering", () => request(app)
    .get("/")
    .then((response) => {
      expect(response.text).to.contain(
        "<meta name=\"google-signin-client_id\" content=\"\">",
      );
    }));

  it("should there is an element with id='application' to render react app", () => request(app)
    .get("/")
    .then((response) => {
      expect(response.text).to.contain("<div id=\"application\"></div>");
    }));

  it("should there is login.js on rendering", () => request(app)
    .get("/")
    .then((response) => {
      expect(response.text).to.match(
        /<script src="\/dist\/login-.[a-z0-9]+\.js"><\/script>/,
      );
    }));
});
