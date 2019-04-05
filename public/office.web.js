$(() => {
  const enterRoom = $('[enter-room]');

  const matrixProfile = new MatrixProfile();

  if (matrixProfile.isProfileStored()) {
    enterInOffice(matrixProfile);
  } else {
    redirectToHome();
  }

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
    
    var userView = $(`#${user.id}`).length;
    if (userView == 0) {
      userView = $(`<img class="rounded-circle" style="margin:2px;" title="${user.name}" width="50px" id="${user.id}"src="${user.imageUrl}">`);
    } else {
      userView = $(`#${user.id}`).detach();
    }

    $(`#${room}`).append(userView);
  }

  function redirectToHome() {
    window.location.href = './';
  }

  function goToMeet(externalMeetUrl) {
    const r = confirm('Deseja entrar na call?');
    if (r == true) {
      window.open(externalMeetUrl, '_blank');
    } else {
      txt = 'You pressed Cancel!';
    }
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

  function enterInOffice(matrixProfile) {
    var lastRoom = localStorage.getItem(`last_room${matrixProfile.loadStoredProfile().id}`);
    if(lastRoom==null || lastRoom==undefined || lastRoom== "undefined"){
    	lastRoom = "room-1"
    }
    // make connection
    const socket = io.connect(`${window.location.protocol}//${window.location.host}`, {
      query: `user=${matrixProfile.loadStoredProfileAsString()}${lastRoom ? `&room=${lastRoom}` : ''}`,
    });

    enterRoom.on('click', (e) => {
      const room = $(e.target).attr('room-id');
      socket.emit('enter-room', { room, user: matrixProfile.loadStoredProfile() });
      setTimeout(() => {
        goToMeet($(e.target).attr('external-meet-url'));
      }, 300);
    });

    socket.on('sync-office', (usersInRoom) => {
      for (var key in usersInRoom) {
        userInroom = usersInRoom[key];
        showUserInRoom(userInroom.user, userInroom.room);
      }
    });

    socket.on('enter-room', (data) => {;
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
    console.log('gapi');
    gapi.auth2.init();
  });
}
