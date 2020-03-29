import { expect } from "chai";

import { googleProfileToMatrixProfile } from "../../../app/services/auth/strategy";

describe("googleProfileToMatrixProfile()", () => {
  const defaultProfile = {
    id: "abc-123",
    emails: [{ value: "neo@matrix.com" }],
    displayName: "Neo",
    photos: [{ value: "neo-in-zion.png" }],
    provider: "google"
  };
  const defaultResult = {
    id: "abc-123",
    imageUrl: "neo-in-zion.png",
    provider: "google",
    name: "Neo",
    email: "neo@matrix.com"
  };

  it("should adapt google profile", () => {
    expect(googleProfileToMatrixProfile(defaultProfile)).to.be.deep.equal(
      defaultResult
    );
  });

  it("should adapt without email", () => {
    const profile = {
      ...defaultProfile,
      emails: undefined
    };

    expect(googleProfileToMatrixProfile(profile)).to.be.deep.equal({
      ...defaultResult,
      email: undefined
    });
  });

  it("should adapt with empty email", () => {
    const profile = {
      ...defaultProfile,
      emails: []
    };

    expect(googleProfileToMatrixProfile(profile)).to.be.deep.equal({
      ...defaultResult,
      email: undefined
    });
  });

  it("should adapt without photo", () => {
    const profile = {
      ...defaultProfile,
      photos: undefined
    };

    expect(googleProfileToMatrixProfile(profile)).to.be.deep.equal({
      ...defaultResult,
      imageUrl: undefined
    });
  });

  it("should adapt with empty photo", () => {
    const profile = {
      ...defaultProfile,
      photos: []
    };

    expect(googleProfileToMatrixProfile(profile)).to.be.deep.equal({
      ...defaultResult,
      imageUrl: undefined
    });
  });
});
