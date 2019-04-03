function MatrixProfile() {

}

MatrixProfile.prototype.loadStoredProfile = function () {
  return JSON.parse(localStorage.getItem('user'));
};

MatrixProfile.prototype.loadStoredProfileAsString = function () {
  return localStorage.getItem('user');
};

MatrixProfile.prototype.storeProfileData = function (profileData) {
  localStorage.setItem('user', JSON.stringify(profileData));
};

MatrixProfile.prototype.isProfileStored = function () {
  if (localStorage.getItem('user') != '' && localStorage.getItem('user') != null) {
    return true;
  }
  return false;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = MatrixProfile;
}
