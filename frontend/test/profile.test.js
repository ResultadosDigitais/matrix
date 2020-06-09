const assert = require("assert");
const MatrixProfile = require("../src/profile").default;

function getProfileDataSample() {
  return {
    id: "111",
    name: "Nome do fulano",
    imageUrl: "http://localhost/img.jpg",
    email: "Mail@mail.com"
  };
}

describe("Basic profile credential Test", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty of credentials is not present", () => {
    const matrixProfile = new MatrixProfile();
    assert.equal(matrixProfile.loadStoredProfile(), null);
  });

  describe("isProfileStored()", () => {
    it("should return false if credentials is NOT present", () => {
      const matrixProfile = new MatrixProfile();
      assert.equal(matrixProfile.isProfileStored(), false);
    });

    it("should return true if user credentials is present", () => {
      const profileData = getProfileDataSample();

      const matrixProfile = new MatrixProfile();
      matrixProfile.storeProfileData(profileData);

      assert.equal(matrixProfile.isProfileStored(), true);
    });

    it("should return false if profile data is invalid JSON", () => {
      const profileData = "invalid";

      const matrixProfile = new MatrixProfile();
      matrixProfile.storeProfileData(profileData);

      assert.equal(matrixProfile.isProfileStored(), false);
    });

    it("should return false if profile data not contain id", () => {
      const profileData = {
        ...getProfileDataSample(),
        id: undefined
      };

      const matrixProfile = new MatrixProfile();
      matrixProfile.storeProfileData(profileData);

      assert.equal(matrixProfile.isProfileStored(), false);
    });

    it("should return false if profile data not contain nme", () => {
      const profileData = {
        ...getProfileDataSample(),
        name: undefined
      };

      const matrixProfile = new MatrixProfile();
      matrixProfile.storeProfileData(profileData);

      assert.equal(matrixProfile.isProfileStored(), false);
    });

    it("should return false if profile data not contain email", () => {
      const profileData = {
        ...getProfileDataSample(),
        email: undefined
      };

      const matrixProfile = new MatrixProfile();
      matrixProfile.storeProfileData(profileData);

      assert.equal(matrixProfile.isProfileStored(), false);
    });
  });

  it("should return data of credentials is present", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.equal(matrixProfile.loadStoredProfile().name, profileData.name);
  });

  it("should return last user name", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.equal(matrixProfile.userName(), profileData.name.split(" ").pop());
  });

  it("should return last user name null if profile data is not present", () => {
    const matrixProfile = new MatrixProfile();
    matrixProfile.terminate();

    assert.equal(matrixProfile.userName(), null);
  });

  it("should return stored profile data as String", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.ok(typeof matrixProfile.loadStoredProfileAsString(), "String");
  });

  it("should return stored room", () => {
    const matrixProfile = new MatrixProfile();
    matrixProfile.storeRoom("room-1");

    assert.equal(matrixProfile.loadStoredRoom(), "room-1");
  });
});
