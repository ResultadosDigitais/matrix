import { expect } from "chai";

import { domainAuthorization } from "../../../app/services/auth/authorization";

describe(".domainAuthorization()", () => {
  describe("when allowed list is empty", () => {
    const isAuthorized = domainAuthorization([]);

    it("should return true with email", () => {
      expect(isAuthorized({ email: "teste@teste.com" })).to.be.true;
    });

    it("should return true without email", () => {
      expect(isAuthorized({ email: undefined })).to.be.true;
    });

    it("should return true with empty email", () => {
      expect(isAuthorized({ email: "" })).to.be.true;
    });
  });

  describe("when allowed list has values", () => {
    const isAuthorized = domainAuthorization(["gmail.com"]);

    it("should return true when email is valid", () => {
      expect(isAuthorized({ email: "teste@gmail.com" })).to.be.true;
    });

    it("should return false when email is invalid", () => {
      expect(isAuthorized({ email: "teste@teste.com" })).to.be.false;
    });

    it("should return false when email is empty string", () => {
      expect(isAuthorized({ email: "" })).to.be.false;
    });

    it("should return false when email is undefined", () => {
      expect(isAuthorized({ email: undefined })).to.be.false;
    });
  });
});
