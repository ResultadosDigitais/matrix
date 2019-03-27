function MatrixProfile(){

}

MatrixProfile.prototype.loadStoredProfile = function (){
	return JSON.parse(localStorage.getItem('user'));
}

MatrixProfile.prototype.storeProfileData = function(profileData){
	localStorage.setItem('user', JSON.stringify(profileData))
}