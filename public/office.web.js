$(function(){

	var enterRoom = $("[enter-room]")

	var matrixProfile = new MatrixProfile()

	if (matrixProfile.isProfileStored()) {
		enterInOffice(matrixProfile);
	}else{
		redirectToHome();
	}

	var logoutButton = $("#btnLogout");

	logoutButton.on("click",function(e){
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			matrixProfile.terminate();
			//Redirect
			window.location = "/";
		});
	})

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

	function enterInOffice(matrixProfile){
		console.log(window.location)
	   	//make connection
		var socket = io.connect(window.location.protocol+"//"+window.location.host,{ query: "user="+matrixProfile.loadStoredProfileAsString() })

		enterRoom.on("click",function(e){
			var room = $(e.target).parent().attr("id");
			socket.emit('enter-room', {room : room,user:matrixProfile.loadStoredProfile()})
			setTimeout(function () {
				goToMeet($(e.target).attr("external-meet-url"));
			},300);

		})

		socket.on("enter-room", (data) => {
			showUserInRoom(data.user,data.room);
		})

		socket.on("disconnect", (userId) => {
			removeUser(userId);
		})
	}

});

function onLoad() {
	gapi.load('auth2', function() {
		console.log("gapi");
		gapi.auth2.init();
	});
}