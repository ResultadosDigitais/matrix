const roomService = require('../services/room_service')

var HashMap = require('hashmap');
// Constructor
function OfficeController() {
  this.usersInRoomOffice = new HashMap();
}

OfficeController.prototype.addUserInRoom = function(user,roomId) {
	this.removeUser(user.id) 

	var userInRoom = {
		user: user,
		room: roomId	
	};
	this.usersInRoomOffice.set(user.id,
		userInRoom	
	);

	return userInRoom;
};

OfficeController.prototype.removeUser = function(userId) {
	this.usersInRoomOffice.delete(userId);
};

OfficeController.prototype.getUsersInOffice = function() {
	return this.usersInRoomOffice;
};

OfficeController.prototype.closeRoom = function(roomId) {
	roomService.closeRoom(roomId);
};

module.exports = OfficeController;
