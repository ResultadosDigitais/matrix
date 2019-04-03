var HashMap = require('hashmap');
// Constructor
function OfficeController() {
	this.usersInRoomOffice = new HashMap();
}

OfficeController.prototype.addUserInRoom = function (user, room) {
	this.removeUser(user.id)
	var userInRoom = {
		user: user,
		room: room
	};
	this.usersInRoomOffice.set(user.id,
		userInRoom
	);

	return userInRoom;
};

OfficeController.prototype.removeUser = function (userId) {
	this.usersInRoomOffice.delete(userId);
};

OfficeController.prototype.getUsersInOffice = function () {
	return this.usersInRoomOffice;
};


module.exports = OfficeController;
