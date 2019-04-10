const OfficeController = require('./controllers/office.controller');

// Constructor
function Office(server) {
  this.officeController = new OfficeController();

  const io = require('socket.io')(server);

  io.use((socket, next) => {
    socket.user = JSON.parse(socket.handshake.query.user);

    return next();
  });

  io.on('connection', (socket) => {
    console.log('New user connected');
    const that = this;
    const currentUser = socket.user;


    const room_param = socket.handshake.query.room;
    const room = room_param || 'room-1';
    addUserInRoom(socket.user, room);

    socket.emit('sync-office', that.officeController.getUsersInOfficeByMap());

    socket.on('disconnect', (socket) => {
      io.sockets.emit('disconnect', currentUser.id);
      that.officeController.removeUser(currentUser.id);
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
  });
}

module.exports = Office;
