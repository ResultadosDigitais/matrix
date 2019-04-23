function MatrixProfile() {}

MatrixProfile.prototype.loadStoredProfile = function loadStoredProfile() {
  return JSON.parse(localStorage.getItem('user'));
};

MatrixProfile.prototype.userName = function userName() {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user){
    return user.name.split(' ').pop();  
  }
  return "";
};

MatrixProfile.prototype.loadStoredProfileAsString = function loadStoredProfileAsString() {
  return localStorage.getItem('user');
};

MatrixProfile.prototype.storeProfileData = function storeProfileData(profileData) {
  localStorage.setItem('user', JSON.stringify(profileData));
};

MatrixProfile.prototype.storeRoom = function storeLastRoom(roomId) {
  localStorage.setItem('roomId', roomId);
};

MatrixProfile.prototype.loadStoredRoom = function loadStoredRoom() {
  localStorage.getItem('roomId');
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
