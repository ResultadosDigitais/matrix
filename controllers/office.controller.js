const HashMap = require('hashmap');
// Constructor
function OfficeController() {
  this.usersInRoomOffice = new HashMap();
}

OfficeController.prototype.addUserInRoom = function (user, room) {
  this.removeUser(user.id);
  const userInRoom = {
    user,
    room,
  };
  this.usersInRoomOffice.set(user.id,
    userInRoom);

  return userInRoom;
};

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
