const fs = require('fs');

class RoomService {
  constructor(rooms) {
    this.rooms = {};

    for (let room of rooms) {
      this.rooms[room.id] = room;
    }
  }

  getAll() {
    return Object.values(this.rooms);
  }

  get(roomId) {
    return Object.assign({}, this.rooms[roomId]);
  }

  openRoom(roomId) {
    let room = this.rooms[roomId];
    room.open = true;
  }

  closeRoom(roomId) {
  	let room = this.rooms[roomId];
  	room.open = false;
  }
}

let roomData = process.env.roomData || fs.readFileSync('./file/default.room.web.json');  
let roomsDetail = JSON.parse(roomData);

module.exports = new RoomService(roomsDetail);
