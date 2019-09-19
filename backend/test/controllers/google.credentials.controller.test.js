import GoogleCredentialController from "../../app/controllers/google.credentials.controller";

const assert = require("assert");

describe("Basic google credential Test", () => {
  it("should return false of credentials is not present", () => {
    const googleCredential = new GoogleCredentialController();
    assert.equal(googleCredential.isCredentialPresent(), false);
  });

  it("should return true of credentials is present", () => {
    const googleCredential = new GoogleCredentialController("key");
    assert.equal(googleCredential.isCredentialPresent(), true);
  });
});
