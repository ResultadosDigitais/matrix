function MatrixProfile() {}

MatrixProfile.prototype.loadStoredProfile = function loadStoredProfile() {
  return JSON.parse(localStorage.getItem("user"));
};

MatrixProfile.prototype.userName = function userName() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user.name.split(" ").pop();
  }

  return null;
};

MatrixProfile.prototype.loadStoredProfileAsString = function loadStoredProfileAsString() {
  return localStorage.getItem("user");
};

MatrixProfile.prototype.storeProfileData = function storeProfileData(
  profileData
) {
  localStorage.setItem("user", JSON.stringify(profileData));
};

MatrixProfile.prototype.storeRoom = function storeLastRoom(roomId) {
  localStorage.setItem("roomId", roomId);
};

MatrixProfile.prototype.loadStoredRoom = function loadStoredRoom() {
  return localStorage.getItem("roomId");
};

MatrixProfile.prototype.isProfileStored = function isProfileStored() {
  const item = localStorage.getItem("user");

  if (item) {
    const user = JSON.parse(item);

    if (user.id && user.name && user.email) {
      return true;
    }

    this.terminate();
  }

  return false;
};

MatrixProfile.prototype.terminate = function terminate() {
  localStorage.removeItem("user");
};

export default MatrixProfile;
