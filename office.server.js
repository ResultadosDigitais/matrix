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

    that.officeController.getUsersInOffice().forEach((value, key) => {
      addUserInRoom(value.user, value.room);
    });


    socket.on('disconnect', (socket) => {
      console.log('disconnect');
      io.sockets.emit('disconnect', currentUser.id);
      that.officeController.removeUser(currentUser.id);
    });

    socket.on('enter-room', (data) => {
      addUserInRoom(currentUser, data.room);
    });

    function addUserInRoom(user, room) {
      // console.log(user,room)
      const userInRoom = that.officeController.addUserInRoom(user, room);

      io.sockets.emit('enter-room', userInRoom);
    }
  });
}

module.exports = Office;
