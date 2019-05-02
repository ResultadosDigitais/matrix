$(() => {
  Sentry.init({ dsn: 'https://cd95f03dd404470a8988fb776de774da@sentry.io/1441017' });
  const matrixProfile = new MatrixProfile();

  if (matrixProfile.isProfileStored()) {
    initOffice(matrixProfile);
  } else {
    redirectToHome();
  }

  function removeUser(userId) {
    $(`#${userId}`).remove();
  }

  function showUserInRoom(user, room) {
    let userView = $(`#${user.id}`);

    if (userView.length) {
      userView.detach();
    } else {
      userView = $(
        `<div id="${
          user.id
        }" class="thumbnail user-room rounded-circle"><img user-presence class="rounded-circle" style="margin:2px;display:flex;" user-id="${
          user.id
        }" title="${user.name}" width="50px" src="${user.imageUrl}"></div>`
      );
    }

    userInRoomDecorator(user, room);
    userInMeetDecorator(user, userView);

    $(`#${room}`).append(userView);
  }

  function initGetUserMenu(officeEvents) {
    $("[user-presence]").initialize(function() {
      $(this).contextMenu({
        menuSelector: "#getUserMenu",
        menuSelected: function(invokedOn, selectedMenu) {
          const userId = $(invokedOn).attr("user-id");
          const roomId = getLastRoom(matrixProfile);
          officeEvents.callUserForMyRoom(userId, roomId);
        }
      });
    });
  }

  function userInMeetDecorator(user, userView) {
    const userInMeet = user.inMeet === true;

    userView.toggleClass("user-in-call", userInMeet);
    userView.toggleClass("user-not-in-call", !userInMeet);
  }

  function userInRoomDecorator(user, room) {
    if (user.id === matrixProfile.loadStoredProfile().id) {
      setDefaultRoomStyles();
      const roomElement = $(`#room_card-${room}`);
      roomElement.attr("class", "card active-room");

      const btnElement = $(`#room_btn_enter-${room}`);
      btnElement.attr("class", "card-link btn-enter-in-room-active float-left");

      const roomTitle = $(`#room_card_title-${room}`);
      roomTitle.attr("class", "room-title-active float-left");
    }
  }

  function setDefaultRoomStyles() {
    const oldRoom = $(".active-room");
    if (oldRoom.length > 0 ) {
      oldRoom.attr("class", "card room");
    }

    let btnEnterInRoom;

    btnEnterInRoom = $(".btn-enter-in-room-active");
    if (btnEnterInRoom.length > 0 ) {
      btnEnterInRoom.attr("class", "card-link btn-enter-in-room float-left");
    }

    btnEnterInRoom = $(".room-title-active");
    if (btnEnterInRoom.length > 0 ) {
      btnEnterInRoom.attr("class", "room-title float-left");
    }
  }

  function redirectToHome() {
    window.location.href = './';
  }

  function getMeetingOptions(roomId) {
    return {
      roomName: roomId,
      width: "100%",
      height: "80%",
      parentNode: document.querySelector('#meet'),
      interfaceConfigOverwrite: { TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile',
           'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip',  'stats', 'shortcuts',
          'tileview', 'chat'
           //'recording', 'livestreaming', 'invite', 'feedback',
      ]}
    };
  }

  function isUserInVideoConference(){
    const dataModal = $("#exampleModalCenter").data("bs.modal");

    if(dataModal) { return dataModal._isShown; }

    return false;
  }

  function startVideoConference(roomId, name, officeEvents){
    setTimeout(() => {
      $("#exampleModalCenter").modal("hide");
      $("#exampleModalCenter").modal("dispose");
    	const domain = 'meet.jit.si';
  		const options = getMeetingOptions(roomId);
  		api = new JitsiMeetExternalAPI(domain, options);
  		api.executeCommand('displayName', matrixProfile.loadStoredProfile().name);
  		api.executeCommand('avatarUrl', matrixProfile.loadStoredProfile().imageUrl);

      officeEvents.startMeet();

      $("#exampleModalCenter").modal("show");
  		$("#exampleModalCenter").on("hidden.bs.modal", function () {
          officeEvents.leftMeet();
     			api.dispose();
      });

      $('#exampleModalCenter').on('shown.bs.modal', function () {
        const modal = $(this);
        modal.find('.modal-title').text(name);
      });
    }, 300);
  }

  function notifyRoomEnter(user,roomId) {
    const options = {
      icon: user.imageUrl,
    };

    const loggedUserId = matrixProfile.loadStoredProfile().id;
    const loggedUserRoomId = getLastRoom(matrixProfile);

    if (loggedUserRoomId === roomId && loggedUserId !== user.id) {
      const roomTitle = getRoomName(roomId);
      notify(`${user.name} entered into the room ${roomTitle}`, options);   
    }
  }

  function notify(text,options){
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      new Notification(text, options);
    }
  }

  function getRoomName(roomId){
    return $("[room-id="+roomId+"]").attr("room-name")
  }

  function getLastRoom(matrixProfile){
    let lastRoom = getUrlRoom();

    if(!isValidRoom(lastRoom)){
      lastRoom = matrixProfile.loadStoredRoom();

      if(!isValidRoom(lastRoom)){
        lastRoom = getDefaultRoom();
      }
    }

    console.log("lastRoom",lastRoom);

    return lastRoom;
  }

  function isValidRoom(room) {
    return !(room === null || room === undefined || room === "undefined")
  }

  function getDefaultRoom(){
    return $($('[enter-room]')[0]).attr("room-id");
  }

  function getUrlRoom(){
  	const currentRoom = location.hash;

    if(currentRoom === null || currentRoom === undefined){
  		return null;
  	} else {
  		return currentRoom.split("#")[1]
  	}
  }

  function syncOffice(usersInRoom){
    for (const key in usersInRoom) {
      userInroom = usersInRoom[key];
      showUserInRoom(userInroom.user, userInroom.room);
    }
  }

  function confirmRoomEnter(user,roomId, officeEvents){
    const options = {
      icon: user.imageUrl,
    };

    text = `${user.name} is calling you to join in ${getRoomName(roomId)}`;
    notify(text,options);
    setTimeout(() => {

    const isConfirmed = confirm(user.name +" is calling you to join in "+ getRoomName(roomId));
      if (isConfirmed) {
        officeEvents.enterInRoom(roomId);
        startVideoConference(roomId, getRoomName(roomId),officeEvents);
      }
    }, 300);  
  }

  function gerRoomName(roomId){
    return $("[room-id=${roomId}]").attr("room-name");
  }

  function initEnterRoomButton(officeEvents){
    const enterRoom = $('[enter-room]');
    enterRoom.on('click', (e) => {
      const roomId = $(e.target).attr('room-id');
      const roomName = $(e.target).attr('room-name');
      const disableMeeting = new Boolean($(e.target).attr('room-disable-meeting'));

      officeEvents.enterInRoom(roomId);
      matrixProfile.storeRoom(roomId);

      if (disableMeeting == true) return;

      startVideoConference(roomId, getRoomName(roomId),officeEvents);
    });
  }

  function initOffice(matrixProfile) {

    const domain = `${window.location.protocol}//${window.location.host}`;
    const currentUser = matrixProfile.loadStoredProfile();

    const officeEvents = new OfficeEvents({
        domain: domain,
        currentUser:currentUser,
        currentRoom: getLastRoom(matrixProfile)
    });

    initEnterRoomButton(officeEvents);
    initGetUserMenu(officeEvents);

    officeEvents.onParticipantStartedMeet(showUserInRoom);
    officeEvents.onParticipantLeftMeet(showUserInRoom);
    officeEvents.onDisconnect(removeUser);

    officeEvents.onParticipantJoined(function(user,roomId){
      showUserInRoom(user,roomId);
      notifyRoomEnter(user,roomId);
    });

    officeEvents.onSyncOffice(function (usersInRoom){
        syncOffice(usersInRoom);
        if(isUserInVideoConference()){
          officeEvents.startMeet();
        }
    });

    officeEvents.onParticipantIsCalled(function (user,roomId){
        confirmRoomEnter(user,roomId,officeEvents);
    });
  }
});

window.onload = function() {
  gapi.load('auth2', () => {
    gapi.auth2.init();
  });
}
