function MatrixProfile() {}

function isUserValidEmail(user) {
  const validSuffixes = ["@resultadosdigitais.com.br", "@magrathealabs.com"];
  for (const suffix of validSuffixes) {
    if(user.email.endsWith(suffix)){
      return true;
    }
  }
  return false;
}

function getUserFromStorage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isUserValidEmail(user)) {
    return null;
  }

  return user;
}

MatrixProfile.prototype.loadStoredProfile = function loadStoredProfile() {
  return getUserFromStorage();
};

MatrixProfile.prototype.userName = function userName() {
  const user = getUserFromStorage();

  if (!user) {
    return null;
  }

  return user.name.split(" ").pop();
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

    if (user.id && user.name && user.email && isUserValidEmail(user)) {
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
