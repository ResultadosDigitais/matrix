require("mock-local-storage");
const assert = require("assert");
const MatrixProfile = require("../../frontend/profile").default;

function getProfileDataSample() {
  return {
    id: '111',
    name: 'Nome do fulano',
    imageUrl: 'http://localhost/img.jpg',
    email: 'Mail@mail.com',
  };
}

describe("Basic profile credential Test", () => {
  it("must return empty of credentials is not present", () => {
    const matrixProfile = new MatrixProfile();
    assert.equal(matrixProfile.loadStoredProfile(), null);
  });

  it("must return false if credentials is NOT present", () => {
    const matrixProfile = new MatrixProfile();
    assert.equal(matrixProfile.isProfileStored(), false);
  });

  it("must return true if user credentials is present", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.equal(matrixProfile.isProfileStored(), true);
  });

  it("must return data of credentials is present", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.equal(matrixProfile.loadStoredProfile().name, profileData.name);
  });

  it("must return last user name", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.equal(matrixProfile.userName(), profileData.name.split(" ").pop());
  });

  it("must return last user name null if profile data is not present", () => {
    const matrixProfile = new MatrixProfile();
    matrixProfile.terminate();

    assert.equal(matrixProfile.userName(), null);
  });

  it("must return stored profile data as String", () => {
    const profileData = getProfileDataSample();

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);

    assert.ok(typeof matrixProfile.loadStoredProfileAsString(), "String");
  });

  it("must return stored room", () => {
    const matrixProfile = new MatrixProfile();
    matrixProfile.storeRoom("room-1");
    
    assert.equal(matrixProfile.loadStoredRoom(), "room-1");
  });

});
