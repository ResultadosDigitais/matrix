import OfficeController from './controllers/office.controller';

// Constructor
function Office(server,defaultRoom) {
  this.officeController = new OfficeController();

  const io = require('socket.io')(server);

  io.use((socket, next) => {
    socket.user = JSON.parse(socket.handshake.query.user);
    //socket.user.

    console.log("socket.id:",socket.id)
    return next();
  });

  io.on('connection', (socket) => {
    
    const that = this;
    var currentUser = socket.user;
    currentUser.socketId = socket.id;


    console.log('connected:',currentUser.id);

    const room_param = socket.handshake.query.room;
    const room = room_param || defaultRoom;
    addUserInRoom(socket.user, room);

    socket.emit('sync-office', that.officeController.getUsersInOfficeByMap());

    socket.on('disconnect', (socket) => {

      if(canDisconnectUser(currentUser.id)){
        console.log('disconect:',currentUser.id);
        io.sockets.emit('disconnect', currentUser.id);
        that.officeController.removeUser(currentUser.id);
      }
    });

    socket.on('enter-room', (data) => {
      addUserInRoom(currentUser, data.room);
    });

    socket.on('start-meet', (userId) => {
      updateUserMeetInformation(userId,'start-meet',true);  
    });

    socket.on('left-meet', (userId) => {
      updateUserMeetInformation(userId,'left-meet',false);
    });

    socket.on('get-user-to-room', (data) => {
      const userInRoom = that.officeController.getUserInRoom(data.userId);
      if(userInRoom){
        io.to(userInRoom.user.socketId).emit("get-user-to-room",data)
      }
    });

    function updateUserMeetInformation(userId,meetEvent,isUserInMeet){
      that.officeController.setUserInMeet(userId,isUserInMeet);
      const userInRoom = that.officeController.getUserInRoom(userId);
      io.sockets.emit(meetEvent, userInRoom);
    }

    function addUserInRoom(user, room) {
      that.officeController.addUserInRoom(user, room);
      const userInRoom = that.officeController.getUserInRoom(user.id);
      io.sockets.emit('enter-room', userInRoom);
    }

    function canDisconnectUser(userId){
      var sockets = io.sockets.sockets;
      for(var socketId in sockets){
        var loggedSocket = sockets[socketId];
        if(userId==loggedSocket.user.id){
          return false;
        } 
      }
      return true;
    }

  });
}

module.exports = Office;
