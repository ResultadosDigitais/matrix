$(function(){

	var enterRoom = $("[enter-room]")
	var closeRoom = $("[close-room]")

	var matrixProfile = new MatrixProfile()

	if (matrixProfile.isProfileStored()) {
		enterInOffice(matrixProfile);
	}else{
		redirectToHome();
	}

	function removeUser(userId){
		$('#'+userId).remove();
	}

	function showUserInRoom(user,room){
		var userView = $('#'+user.id).length;

		if (userView==0) {
			userView = $('<img width="50px" id="'+user.id+'"src="'+user.imageUrl+'">');
		} else {
			userView = $('#'+user.id).detach();
		}	

		$("#"+room).append(userView);
	}

	function redirectToHome(){
		window.location.href = "./"
	}

	function goToMeet(externalMeetUrl){
		var r = confirm("Deseja entrar na call?");
		if (r == true) {
		  window.open(externalMeetUrl, '_blank');
		} else {
		  txt = "You pressed Cancel!";
		}
	}

	function saveLastRoom(data) {
		localStorage.setItem('last_room' + data.user.id, data.room);
	}

	function enterInOffice(matrixProfile){
		var lastRoom = localStorage.getItem('last_room' + matrixProfile.loadStoredProfile().id);
		console.log(window.location)
	   	//make connection
		var socket = io.connect(window.location.protocol + "//" + window.location.host, { 
			query: "user=" + matrixProfile.loadStoredProfileAsString() + (lastRoom ? "&room=" + lastRoom : "")
		})

		enterRoom.on("click",function(e) {
			var room = $(e.target).parent().attr("id");
			socket.emit('enter-room', {room: room, user: matrixProfile.loadStoredProfile()});
		})

		closeRoom.on("click", function(e) {
			var roomId = $(e.target).parent().attr("id");
			socket.emit('close-room', roomId)
		})

		socket.on("redirect-to-call", (room) => {
			setTimeout(function () {
				goToMeet(room.externalMeetUrl);
			}, 300);
		})

		socket.on("enter-room-all", (data) => {
			saveLastRoom(data);
			showUserInRoom(data.user,data.room);
		})

		socket.on("disconnect", (userId) => {
			removeUser(userId);
		})

		socket.on("enable-close", (roomId) => {
			var buttonId = roomId + '-close';
			$('#' + buttonId).prop('disabled', false);
		})

		socket.on("room-closed", (room) => {
			alert("Sala " + room.name + " está fechada!");
		})
	}

});