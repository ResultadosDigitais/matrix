import { domainAuthorization, userAuthorization } from "./authorization";

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
describe(".userAuthorization()", () => {
  describe("when user whitelist is empty or not set", () => {
    const isAuthorized = userAuthorization([]);

    it("should return true with any email", () => {
      expect(isAuthorized({ email: "teste@teste.com" })).toBeTruthy();
    });

    it("should return true with an undefined email", () => {
      expect(isAuthorized({ email: undefined })).toBeTruthy();
    });

    it("should return true with an empty email", () => {
      expect(isAuthorized({ email: "" })).toBeTruthy();
    });
  });

  describe("when user list has values", () => {
    const isAuthorized = userAuthorization(["teste@gmail.com"]);

    it("should return true when the correct email is listed", () => {
      expect(isAuthorized({ email: "teste@gmail.com" })).toBeTruthy();
    });

    it("should return false when email isn't in the list", () => {
      expect(isAuthorized({ email: "teste2@gmail.com" })).toBeFalsy();
    });

    it("should return false when email is an empty string", () => {
      expect(isAuthorized({ email: "" })).toBeFalsy();
    });

    it("should return false when email is undefined", () => {
      expect(isAuthorized({ email: undefined })).toBeFalsy();
    });

    it("should return false when email is poorly formatted", () => {
      expect(isAuthorized({ email: " teste@gmail.com " })).toBeFalsy();
    });

  });
});
