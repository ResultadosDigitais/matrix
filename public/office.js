$(function(){

	var enterRoom = $("[enter-room]")

	matrixProfile = new MatrixProfile()

   	//make connection
	var socket = io.connect('http://localhost:8080',{ query: "user="+matrixProfile.loadStoredProfileAsString() })

	enterRoom.on("click",function(e){
		var room = $(e.target).parent().attr("id");
		socket.emit('enter-room', {room : room,user:matrixProfile.loadStoredProfile()})
	})

	socket.on("enter-room", (data) => {
		showUserInRoom(data.user,data.room);
	})

	function logArrayElements(element, index, array) {
    	console.log("a[" + index + "] = " + element);
	}

	function showUserInRoom(user,room){
		console.log(user.id,room)
		var userView = $('#'+user.id).length;
		if(userView==0){
			userView = $('<img width="50px" id="'+user.id+'"src="'+user.imageUrl+'">');
		}else{
			userView = $('#'+user.id).detach();
		}	

		$("#"+room).append(userView);
	}

});