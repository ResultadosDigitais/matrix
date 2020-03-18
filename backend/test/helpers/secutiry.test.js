import { expect } from "chai";
import sinon from "sinon";
import config from "../../app/app.config";

import security from "../../app/helpers/security";

describe(".parseVariable()", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("when whitelist is empty", () => {
    it("should return true with email", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value([]);
      expect(security.hasValidEmailDomain("teste@teste.com")).to.be.true;
    });

    it("should return true without email", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value([]);
      expect(security.hasValidEmailDomain()).to.be.true;
    });

    it("should return true with empty email", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value([]);
      expect(security.hasValidEmailDomain("")).to.be.true;
    });
  });

  describe("when whitelist has one value", () => {
    it("should return true when email is valid", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value(["@gmail.com"]);
      expect(security.hasValidEmailDomain("teste@gmail.com")).to.be.true;
    });

    it("should return false when email is invalid", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value(["@gmail.com"]);
      expect(security.hasValidEmailDomain("teste@teste.com")).to.be.false;
    });

    it("should return false when email is empty string", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value(["@gmail.com"]);
      expect(security.hasValidEmailDomain("")).to.be.false;
    });

    it("should return false when email is undefined", () => {
      sandbox.stub(config, "WHITELIST_DOMAINS").value(["@gmail.com"]);
      expect(security.hasValidEmailDomain()).to.be.false;
    });
  });
});
