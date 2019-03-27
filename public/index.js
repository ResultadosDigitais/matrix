var googleLoginButton = $("#googleLoginButton")

function onSignIn(googleUser){
	var profile = googleUser.getBasicProfile();

    var profileData = {
    		id: profile.getId(),
    		name: profile.getName(),
    		imageUrl: profile.getImageUrl(),
    		email: profile.getEmail() 
    };
    var matrixProfile = new MatrixProfile();
    matrixProfile.storeProfileData(profileData);
    goToOffice();
}

function goToOffice(){
	window .location.href = "./office"
}

