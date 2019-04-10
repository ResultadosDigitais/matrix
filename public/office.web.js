$(() => {
  const enterRoom = $('[enter-room]');
  const matrixProfile = new MatrixProfile();

  if (matrixProfile.isProfileStored()) {
    enterInOffice(matrixProfile);
  } else {
    redirectToHome();
  }

  //set user name
  $("#userName").text("Whats'up " + matrixProfile.userName() + "!");

  const logoutButton = $('#btnLogout');

  logoutButton.on('click', (e) => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      matrixProfile.terminate();
      // Redirect
      window.location = '/';
    });
  });

  function removeUser(userId) {
    $(`#${userId}`).remove();
  }

  function showUserInRoom(user, room) {
    debugger;

    var userView = $(`#${user.id}`).length;
    if (userView == 0) {
      userView = $(`<div  id="${user.id}" class="thumbnail user-room"><img class="rounded-circle" style="margin:2px;display:flex;" title="${user.name}" width="50px" src="${user.imageUrl}"></div>`);
     } else {
       userView = $(`#${user.id}`).detach();
    }

    userInMeetDecorator(user,userView);
    
    $(`#${room}`).append(userView);
  }

  function userInMeetDecorator(user,userView){
    
    var userMeetClass = "rounded-circle user-not-in-call user-room"
    
    if(user.inMeet!=undefined && user.inMeet){
      userMeetClass = "rounded-circle user-in-call user-room";
    }
    
    userView.attr("class",userMeetClass);  
  }


  function redirectToHome() {
    window.location.href = './';
  }

  function goToMeet(roomId, roomName, socket) {
    //const r = confirm('Deseja entrar na call?');
    //if (r == true) {
    	startVideoConference(roomId,roomName, socket);    
      //window.open(externalMeetUrl, '_blank');
    //} else {
      txt = 'You pressed Cancel!';
    //}
  }

  function startVideoConference(roomId, name, socket){
  	const domain = 'meet.jit.si';
		const options = {
		    roomName: roomId,
		    width: "100%",
		    height: "80%",
		    parentNode: document.querySelector('#meet'),
		    interfaceConfigOverwrite: {TOOLBAR_BUTTONS: [
		        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
		        'fodeviceselection', 'hangup', 'profile', 
		         'etherpad', 'sharedvideo', 'settings', 'raisehand',
		        'videoquality', 'filmstrip',  'stats', 'shortcuts',
		        'tileview'
		        // 'chat', 'recording', 'livestreaming', 'invite', 'feedback',
    		]}
		};
		api = new JitsiMeetExternalAPI(domain, options);
		api.executeCommand('displayName', matrixProfile.loadStoredProfile().name);
		api.executeCommand('avatarUrl', matrixProfile.loadStoredProfile().imageUrl);
		$("#exampleModalCenter").modal("show");
    
    socket.emit('start-meet', matrixProfile.loadStoredProfile().id);

		$("#exampleModalCenter").on("hidden.bs.modal", function () {
        socket.emit('left-meet', matrixProfile.loadStoredProfile().id);
   			api.dispose();
    });
    
    $('#exampleModalCenter').on('shown.bs.modal', function () {
      var modal = $(this);
      modal.find('.modal-title').text(name);
    });
  }

  function saveLastRoom(data) {
    localStorage.setItem(`last_room${data.user.id}`, data.room);
  }

  function notify(data, title) {
    const options = {
      icon: data.user.imageUrl,
    };

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      const n = new Notification(title, options);
    }
  }

   function getLastRoom(matrixProfile){
  	var lastRoom = localStorage.getItem(`last_room${matrixProfile.loadStoredProfile().id}`);
    if(lastRoom==null || lastRoom==undefined || lastRoom== "undefined"){
    	lastRoom = "room-1"
    }	
  }

  function getUrlRoom(){
  	var currentRoom = location.hash;
  	if(currentRoom==null || currentRoom==undefined){
  		return null;
  	}else{
  		return currentRoom.split("#")[1]
  	}
  }

  function enterInOffice(matrixProfile) {

    var currentRoom = getUrlRoom();
    if(currentRoom==null || currentRoom==undefined || currentRoom== "undefined"){
    	currentRoom = getLastRoom(matrixProfile);
    }
    // make connection
    const socket = io.connect(`${window.location.protocol}//${window.location.host}`, {
      query: `user=${matrixProfile.loadStoredProfileAsString()}${currentRoom ? `&room=${currentRoom}` : ''}`,
    });

    enterRoom.on('click', (e) => {
      const roomId = $(e.target).attr('room-id');
      const roomName = $(e.target).attr('room-name');
      socket.emit('enter-room', { roomId, user: matrixProfile.loadStoredProfile() });
      setTimeout(() => {
        goToMeet(roomId, roomName, socket);
      }, 300);
    });

    socket.on('sync-office', (usersInRoom) => {
      for (var key in usersInRoom) {
        userInroom = usersInRoom[key];
        showUserInRoom(userInroom.user, userInroom.room);
      }
    });


    socket.on('start-meet', (data) => {
      showUserInRoom(data.user, data.room);  
    });

    socket.on('left-meet', (data) => {
      showUserInRoom(data.user, data.room);  
    });

    socket.on('enter-room', (data) => {
      saveLastRoom(data);
      showUserInRoom(data.user, data.room);

      const loggedUserId = JSON.parse(localStorage.getItem('user')).id;
      const loggedUserRoomId = localStorage.getItem(`last_room${loggedUserId}`);

      if (loggedUserRoomId == data.room && loggedUserId != data.user.id) {
        notify(data, `${data.user.name} entrou na sala`);
      }
    });

    socket.on('disconnect', (userId) => {
      console.log('disconnect',userId);
      removeUser(userId);
    });
  }
});


function onLoad() {
  gapi.load('auth2', () => {
    gapi.auth2.init();
  });
}
