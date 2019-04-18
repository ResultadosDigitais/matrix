function MatrixProfile() {}

MatrixProfile.prototype.loadStoredProfile = function loadStoredProfile() {
  return JSON.parse(localStorage.getItem('user'));
};

MatrixProfile.prototype.userName = function userName() {
  const user = JSON.parse(localStorage.getItem('user')).name;
  return user.split(' ').pop();
};

MatrixProfile.prototype.loadStoredProfileAsString = function loadStoredProfileAsString() {
  return localStorage.getItem('user');
};

MatrixProfile.prototype.storeProfileData = function storeProfileData(profileData) {
  localStorage.setItem('user', JSON.stringify(profileData));
};

MatrixProfile.prototype.isProfileStored = function isProfileStored() {
  if (localStorage.getItem('user') != '' && localStorage.getItem('user') != null) {
    return true;
  }
  return false;
};

MatrixProfile.prototype.terminate = function terminate() {
  localStorage.removeItem('user');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = MatrixProfile;
}
