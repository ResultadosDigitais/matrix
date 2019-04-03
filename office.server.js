var OfficeController =  require('./controllers/office.controller');
const roomService = require('./services/room_service')

// Constructor
function Office(server) {
	this.officeController = new OfficeController();
	
	const io = require("socket.io")(server)
	
	io.use(function(socket, next){

		socket.user = JSON.parse(socket.handshake.query.user)
		
	    return next();
	});

	io.on('connection', (socket) => {
		console.log('New user connected')
		var that = this;
		var currentUser = socket.user; 

		
		var room_param = socket.handshake.query.room;
		var room = room_param ? room_param : "room-1";
		addUserInRoom(socket.user, room);

		that.officeController.getUsersInOffice().forEach(function(value, key) {
			if (currentUser.id == value.user.id) {
				io.sockets.emit('enable-close', value.room);
			}

			addUserInRoom(value.user,value.room);
		});


		socket.on('disconnect', function(socket) {
    		console.log("disconnect");
    		io.sockets.emit('disconnect', currentUser.id);
    		that.officeController.removeUser(currentUser.id)

		});

		socket.on('enter-room', (data) => {
			room = addUserInRoom(currentUser, data.room);

			if (room != null) {
				socket.emit('redirect-to-call', room);
			}
    	})

		socket.on('close-room', (roomId) => {
			that.officeController.closeRoom(roomId);
		})

    	function addUserInRoom(user, roomId) {
			room = roomService.get(roomId)

			if (!room.open) {
				socket.emit('room-closed', room);

				return;
			}

    		var userInRoom = that.officeController.addUserInRoom(user, roomId)

            io.sockets.emit('enter-room-all', userInRoom);

            return room;
    	}
	});

		
}

module.exports = Office;