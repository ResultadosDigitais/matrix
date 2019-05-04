import MatrixProfile from "./profile";

function goToOffice() {
  window.location.href = "./office";
}

function onSignIn(googleUser) {
  // eslint-disable-line no-unused-vars
  const profile = googleUser.getBasicProfile();

  const profileData = {
    id: profile.getId(),
    name: profile.getName(),
    imageUrl: profile.getImageUrl(),
    email: profile.getEmail()
  };

  const matrixProfile = new MatrixProfile(); // eslint-disable-line no-undef
  matrixProfile.storeProfileData(profileData);

  goToOffice();
}

window.onSignIn = onSignIn;
