$(function(){

	var enterRoom = $("[enter-room]")

	matrixProfile = new MatrixProfile()
	console.log(window.location)
   	//make connection
	var socket = io.connect(window.location.protocol+"//"+window.location.host,{ query: "user="+matrixProfile.loadStoredProfileAsString() })

	enterRoom.on("click",function(e){
		var room = $(e.target).parent().attr("id");
		socket.emit('enter-room', {room : room,user:matrixProfile.loadStoredProfile()})
	})

	socket.on("enter-room", (data) => {
		showUserInRoom(data.user,data.room);
	})

	socket.on("disconnect", (userId) => {
		removeUser(userId);
	})

	function logArrayElements(element, index, array) {
    	console.log("a[" + index + "] = " + element);
	}

	function removeUser(userId){
		$('#'+userId).remove();
	}

	function showUserInRoom(user,room){
		
		var userView = $('#'+user.id).length;
		if(userView==0){
			userView = $('<img width="50px" id="'+user.id+'"src="'+user.imageUrl+'">');
		}else{
			userView = $('#'+user.id).detach();
		}	

		$("#"+room).append(userView);
	}

});