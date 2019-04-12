function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();

  const profileData = {
    		id: profile.getId(),
    		name: profile.getName(),
    		imageUrl: profile.getImageUrl(),
    		email: profile.getEmail(),
  };
  const matrixProfile = new MatrixProfile();
  matrixProfile.storeProfileData(profileData);
  goToOffice();
}

function goToOffice() {
  window.location.href = './office';
}
