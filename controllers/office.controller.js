var HashMap = require('hashmap');
// Constructor
function OfficeController() {
  this.usersInRoomOffice = new HashMap();
}

OfficeController.prototype.addUserInRoom = function(user,room) {
	this.removeUser(user.id) 
	var userInRoom = {
			user:user,
			room:room	
		};
	this.usersInRoomOffice.set(user.id,
		userInRoom	
	);

	return userInRoom;
};

OfficeController.prototype.removeUser = function(userId) {
	this.usersInRoomOffice.delete(userId);
};

OfficeController.prototype.signOut = function() {
	var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


OfficeController.prototype.getUsersInOffice = function() {
	return this.usersInRoomOffice;
};


module.exports = OfficeController;