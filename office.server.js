import ioClient from 'socket.io-client';

const DEFAULT_ROOM = 'room-1';
// Constructor
class Office {

  constuctor(officeController, server) {
    this.officeController = officeController;
    this.server = server;
    this.io = ioClient()
  }

  start() {
    this.io.use((socket, next) => {
      socket.user = JSON.parse(socket.handshake.query.user);
      //socket.user.

      console.log("socket.id:", socket.id)
      return next();
    });

    this.io.on('connection', (socket) => {
      var currentUser = socket.user;
      currentUser.socketId = socket.id;

      console.log('connected:', currentUser.id);

      const room_param = socket.handshake.query.room;
      const room = room_param || DEFAULT_ROOM;
      addUserInRoom(socket.user, room);

      socket.emit('sync-office', this.officeController.getUsersInOfficeByMap());

      socket.on('disconnect', (socket) => {

        if (canDisconnectUser(currentUser.id)) {
          console.log('disconect:', currentUser.id);
          this.io.sockets.emit('disconnect', currentUser.id);
          this.officeController.removeUser(currentUser.id);
        }
      });

      socket.on('enter-room', (data) => {
        addUserInRoom(currentUser, data.room);
      });

      socket.on('start-meet', (userId) => {
        updateUserMeetInformation(userId, 'start-meet', true);
      });

      socket.on('left-meet', (userId) => {
        updateUserMeetInformation(userId, 'left-meet', false);
      });

      socket.on('get-user-to-room', (data) => {
        const userInRoom = this.officeController.getUserInRoom(data.userId);
        if (userInRoom) {
          this.io.to(userInRoom.user.socketId).emit("get-user-to-room", data)
        }
      });
    });
  }

  updateUserMeetInformation(userId, meetEvent, isUserInMeet) {
    this.officeController.setUserInMeet(userId, isUserInMeet);

    const userInRoom = this.officeController.getUserInRoom(userId);
    this.io.sockets.emit(meetEvent, userInRoom);
  }

  addUserInRoom(user, room) {
    this.officeController.addUserInRoom(user, room);
    const userInRoom = that.officeController.getUserInRoom(user.id);
    
    this.io.sockets.emit('enter-room', userInRoom);
  }

  canDisconnectUser(userId) {
    var sockets = this.io.sockets.sockets;
    for (var socketId in sockets) {
      var loggedSocket = sockets[socketId];
      if (userId == loggedSocket.user.id) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Office;
