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

describe(".adaptGoogleUser()", () => {
  const defaultProfile = {
    id: "abc-123",
    emails: [{ value: "neo@matrix.com" }],
    displayName: "Neo",
    photos: [{ value: "neo-in-zion.png" }],
    provider: "google",
  };
  const defaultResult = {
    id: "abc-123",
    imageUrl: "neo-in-zion.png",
    provider: "google",
    name: "Neo",
    email: "neo@matrix.com",
  };

  it("should adapt google profile", () => {
    expect(security.adaptGoogleUser(defaultProfile)).to.be.deep.equal(defaultResult);
  });

  it("should adapt without email", () => {
    const profile = {
      ...defaultProfile,
      emails: undefined,
    };

    expect(security.adaptGoogleUser(profile)).to.be.deep.equal({
      ...defaultResult,
      email: undefined,
    });
  });

  it("should adapt with empty email", () => {
    const profile = {
      ...defaultProfile,
      emails: [],
    };

    expect(security.adaptGoogleUser(profile)).to.be.deep.equal({
      ...defaultResult,
      email: undefined,
    });
  });

  it("should adapt without photo", () => {
    const profile = {
      ...defaultProfile,
      photos: undefined,
    };

    expect(security.adaptGoogleUser(profile)).to.be.deep.equal({
      ...defaultResult,
      imageUrl: undefined,
    });
  });

  it("should adapt with empty photo", () => {
    const profile = {
      ...defaultProfile,
      photos: [],
    };

    expect(security.adaptGoogleUser(profile)).to.be.deep.equal({
      ...defaultResult,
      imageUrl: undefined,
    });
  });
});
