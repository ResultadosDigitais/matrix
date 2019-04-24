function OfficeEvents(config){
	this.config = config;
	const user = JSON.stringify(config.currentUser);
	this.socketIO = io.connect(config.domain, {
      	query: `user=${user}&room=${config.currentRoom}`
    }); 
}

OfficeEvents.prototype.listenEvent = function(event,callback){
	this.socketIO.on(event, (data) => {
		if (data.user) {
			callback(data.user,data.room);
		}else{
			callback(data);	
		}
		
	});
}

OfficeEvents.prototype.emitEvent = function(event,data){
	this.socketIO.emit(event,data);
}

OfficeEvents.prototype.enterInRoom = function(roomId){
	this.emitEvent('enter-room', { room:roomId, user: this.config.currentUser });	
}

OfficeEvents.prototype.startMeet = function(){
	this.emitEvent('start-meet',this.config.currentUser.id);
}

OfficeEvents.prototype.leftMeet = function(){
	this.emitEvent('left-meet',this.config.currentUser.id);
}

OfficeEvents.prototype.callUserForMyRoom = function(userId,roomId){
	this.emitEvent('get-user-to-room', { room:roomId, user: userId});	
}

OfficeEvents.prototype.onParticipantJoined = function(callback){
	this.listenEvent('enter-room', callback);
}

OfficeEvents.prototype.onParticipantStartedMeet = function(callback){
	this.listenEvent('start-meet', callback);
}

OfficeEvents.prototype.onParticipantLeftMeet = function(callback){
	this.listenEvent('left-meet', callback);
}

OfficeEvents.prototype.onSyncOffice = function(callback){
	this.listenEvent('sync-office', callback);
}

OfficeEvents.prototype.onParticipantIsCalled = function(callback){
	this.listenEvent('get-user-to-room', callback);
}

OfficeEvents.prototype.onDisconnect = function(callback){
	this.listenEvent('disconnect', callback);
}

