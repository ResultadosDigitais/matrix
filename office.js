var OfficeController =  require('./controllers/office.controller');

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

		addUserInRoom(socket.user,"room-1")

		that.officeController.getUsersInOffice().forEach(function(value, key) {
			addUserInRoom(value.user,value.room);
		});


		socket.on('disconnect', function(socket) {
    		console.log("disconnect");
    		io.sockets.emit('disconnect', currentUser.id);
    		that.officeController.removeUser(currentUser.id)

		});

		socket.on('enter-room', (data) => {
			addUserInRoom(currentUser,data.room);
    	})

    	function addUserInRoom(user,room){
    		//console.log(user,room)
    		var userInRoom = that.officeController.addUserInRoom(user,room)
        
            io.sockets.emit('enter-room', userInRoom);
    	}

	});

		
}

module.exports = Office;