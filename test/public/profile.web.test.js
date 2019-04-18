require('mock-local-storage');
const assert = require('assert');
const MatrixProfile = require('../../public/js/profile.web');


describe('Basic profile credential Test', () => {
  it('should return empty of credentials is not present', () => {
    const matrixProfile = new MatrixProfile();
    assert.equal(matrixProfile.loadStoredProfile(), null);
  });

  it('should return data of credentials is present', () => {
    const profileData = {
      id: '111',
      name: 'Nome do fulano',
      imageUrl: 'http://localhost/img.jpg',
      email: 'Mail@mail.com',
    };

    const matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);
    assert.equal(matrixProfile.loadStoredProfile().name, profileData.name);
  });
});
