import { domainAuthorization } from "./authorization";

describe(".domainAuthorization()", () => {
  describe("when allowed list is empty", () => {
    const isAuthorized = domainAuthorization([]);

    it("should return true with email", () => {
      expect(isAuthorized({ email: "teste@teste.com" })).toBeTruthy();
    });

    it("should return true without email", () => {
      expect(isAuthorized({ email: undefined })).toBeTruthy();
    });

    it("should return true with empty email", () => {
      expect(isAuthorized({ email: "" })).toBeTruthy();
    });
  });

  describe("when allowed list has values", () => {
    const isAuthorized = domainAuthorization(["gmail.com"]);

    it("should return true when email is valid", () => {
      expect(isAuthorized({ email: "teste@gmail.com" })).toBeTruthy();
    });

    it("should return false when email is invalid", () => {
      expect(isAuthorized({ email: "teste@teste.com" })).toBeFalsy();
    });

    it("should return false when email is empty string", () => {
      expect(isAuthorized({ email: "" })).toBeFalsy();
    });

    it("should return false when email is undefined", () => {
      expect(isAuthorized({ email: undefined })).toBeFalsy();
    });
  });
});
