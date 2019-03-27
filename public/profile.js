function MatrixProfile(){

}

MatrixProfile.prototype.loadStoredProfile = function (){
	return JSON.parse(localStorage.getItem('user'));
}

MatrixProfile.prototype.storeProfileData = function(profileData){
	localStorage.setItem('user', JSON.stringify(profileData))
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = MatrixProfile;
 }
