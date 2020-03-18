import SocketIO from "socket.io";
import WhiteListDomainController from "./controllers/white.list.domain.controller";
import { WHITELIST_DOMAINS } from "./app.config";

const DEFAULT_ROOM = "room-1";
const whiteListDomainController = new WhiteListDomainController(WHITELIST_DOMAINS);


// Constructor
class Office {
  constructor(officeController, server) {
    this.officeController = officeController;
    this.server = server;
    this.io = new SocketIO(server);
  }

  start() {
    this.io.use((socket, next) => {
      const serializedUser = socket.handshake.query.user;

      try {
        socket.user = JSON.parse(serializedUser);

        if(whiteListDomainController.isValidEmailInWhiteList(socket.user.email)){
          console.log("socket.id:", socket.id);
          next();  
        }else{
          console.error(`Invalid user email: '${serializedUser}'`, err);
          next(new Error("Invalid user email"));
        }

        
      } catch (err) {
        console.error(`Error on parse user: '${serializedUser}'`, err);

        next(new Error("Invalid user"));
      }
    });

    this.io.on("connection", socket => {
      const currentUser = socket.user;
      currentUser.socketId = socket.id;

      console.log("connected:", currentUser.id);

      const room_param = socket.handshake.query.room;
      const room = room_param || DEFAULT_ROOM;

      this.addUserInRoom(socket.user, room);

      socket.emit("sync-office", this.officeController.getUsersInOfficeByMap());

      socket.on("disconnect", socket => {
        if (this.canDisconnectUser(currentUser.id)) {
          console.log("disconect:", currentUser.id);
          this.io.sockets.emit("disconnect", currentUser.id);
          this.officeController.removeUser(currentUser.id);
        }
      });

      socket.on("enter-room", data => {
        this.addUserInRoom(currentUser, data.room);
      });

      socket.on("start-meet", userId => {
        this.updateUserMeetInformation(userId, "start-meet", true);
      });

      socket.on("left-meet", userId => {
        this.updateUserMeetInformation(userId, "left-meet", false);
      });

      socket.on("get-user-to-room", data => {
        const userInRoom = this.officeController.getUserInRoom(data.user);
        if (userInRoom) {
          this.io
            .to(userInRoom.user.socketId)
            .emit("get-user-to-room", { user: currentUser, room: data.room });
        }
      });
    });
  }

  updateUserMeetInformation(userId, meetEvent, isUserInMeet) {
    this.officeController.setUserInMeet(userId, isUserInMeet);

    const userInRoom = this.officeController.getUserInRoom(userId);
    this.io.sockets.emit(meetEvent, userInRoom);
  }

  addUserInRoom(user, room) {
    this.officeController.addUserInRoom(user, room);
    const userInRoom = this.officeController.getUserInRoom(user.id);

    this.io.sockets.emit("enter-room", userInRoom);
  }

  canDisconnectUser(userId) {
    const { sockets } = this.io.sockets;
    for (const socketId in sockets) {
      const loggedSocket = sockets[socketId];
      if (userId == loggedSocket.user.id) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Office;
