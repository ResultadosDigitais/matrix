const HashMap = require('hashmap');
// Constructor
function OfficeController() {
  this.usersInRoomOffice = new HashMap();
}

OfficeController.prototype.addUserInRoom = function (user, room) {
  this.removeUser(user.id);
  var userInRoom = {
    user,
    room,
  };
  this.usersInRoomOffice.set(user.id,
    userInRoom);
};

OfficeController.prototype.setUserInMeet = function (userId) {
  var userInRoom = this.getUserInRoom(userId);
  if(userInRoom){
    userInRoom.user.inMeet = true;
    this.addUserInRoom(userInRoom.user,userInRoom.room)
  }
};

OfficeController.prototype.removeUserInMeet = function (userId) {
  var userInRoom = this.getUserInRoom(userId);
  if(userInRoom){
    userInRoom.user.inMeet = false;
    this.addUserInRoom(userInRoom.user,userInRoom.room)
  }
};

OfficeController.prototype.getUserInRoom = function (userId) {
  return this.usersInRoomOffice.get(userId);;
}

OfficeController.prototype.removeUser = function (userId) {
  this.usersInRoomOffice.delete(userId);
};

OfficeController.prototype.getUsersInOffice = function () {
  return this.usersInRoomOffice;
};

OfficeController.prototype.getUsersInOfficeByMap = function () {
    var usersInOffice = new Map();
    this.getUsersInOffice().forEach((value, key) => {
        usersInOffice[key] = value;
    });
    return usersInOffice;
};


module.exports = OfficeController;
