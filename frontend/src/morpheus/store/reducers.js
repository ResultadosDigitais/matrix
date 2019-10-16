import {
  ADD_ERROR,
  SET_CURRENT_USER,
  SET_CURRENT_ROOM,
  ADD_ROOMS,
  SYNC_OFFICE,
  CHANGE_OFFICE_FILTER,
  CHANGE_USERS_FILTER,
  ADD_USER,
  REMOVE_USER,
  USER_ENTER_MEETING,
  USER_LEFT_MEETING,
  CHANGE_SETTINGS,
  TOGGLE_MESSAGE_DIALOG,
  OPEN_LOGOUT_CONFIRM_DIALOG,
  CLOSE_LOGOUT_CONFIRM_DIALOG
} from "./actions";

export const initialState = {
  currentUser: {},
  currentRoom: {},
  rooms: [],
  usersInRoom: [],
  users: [],
  usersFilter: {
    search: ""
  },
  office: [],
  officeFilter: {
    onlyFullRoom: false,
    search: ""
  },
  settings: {
    notificationDisabled: false
  },
  error: null,
  messageDialog: {
    isOpen: false,
    title: undefined,
    message: undefined
  },
  logoutDialog: {
    isOpen: false
  }
};

const buildOfficeState = state => {
  const { rooms, usersInRoom, officeFilter } = state;

  let office = rooms.map(room => ({
    id: room.id,
    name: room.name,
    users: usersInRoom.filter(u => u.room === room.id).map(u => u.user)
  }));

  if (officeFilter.onlyFullRoom) {
    office = office.filter(o => o.users.length > 0);
  }
  if (officeFilter.search) {
    const search = officeFilter.search.toLowerCase();
    office = office.filter(o => o.name.toLowerCase().includes(search));
  }

  return {
    ...state,
    office
  };
};

const buildUsersState = state => {
  const { usersInRoom, usersFilter, rooms } = state;

  let users = usersInRoom.map(u => {
    const room = rooms.find(r => r.id === u.room);

    return {
      id: u.user.id,
      name: u.user.name,
      avatar: u.user.imageUrl,
      inMeet: !!u.user.inMeet,
      roomId: room ? room.id : "",
      roomName: room ? room.name : ""
    };
  });

  if (usersFilter.search) {
    const search = usersFilter.search.toLowerCase();
    users = users.filter(u => u.name.toLowerCase().includes(search));
  }

  return {
    ...state,
    users
  };
};

const buildInMeetState = (state, action, inMeet) => {
  const { id } = action.user;
  const currentUser = { ...state.currentUser };

  if (currentUser.id === id) {
    currentUser.inMeet = inMeet;
  }

  const usersInRoom = state.usersInRoom.map(item => {
    if (item.user.id === id) {
      return {
        ...item,
        user: {
          ...item.user,
          inMeet
        }
      };
    }

    return item;
  });

  return buildUsersState(
    buildOfficeState({
      ...state,
      currentUser,
      usersInRoom
    })
  );
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.room
      };
    case ADD_ROOMS:
      return buildOfficeState({
        ...state,
        rooms: action.rooms
      });
    case CHANGE_OFFICE_FILTER:
      return buildOfficeState({
        ...state,
        officeFilter: {
          ...state.officeFilter,
          [action.key]: action.value
        }
      });
    case SYNC_OFFICE:
      return buildUsersState(
        buildOfficeState({
          ...state,
          usersInRoom: Object.values(action.usersInRoom)
        })
      );
    case CHANGE_USERS_FILTER:
      return buildUsersState({
        ...state,
        usersFilter: {
          ...state.usersFilter,
          [action.key]: action.value
        }
      });
    case CHANGE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.key]: action.value
        }
      };
    case ADD_USER: {
      const index = state.usersInRoom.findIndex(
        u => u.user.id === action.user.id
      );
      let usersInRoom;

      if (index === -1) {
        usersInRoom = [].concat(state.usersInRoom, {
          room: action.roomId,
          user: action.user
        });
      } else {
        usersInRoom = state.usersInRoom.slice(0);
        usersInRoom[index].room = action.roomId;
      }

      return buildUsersState(
        buildOfficeState({
          ...state,
          usersInRoom
        })
      );
    }
    case REMOVE_USER:
      return buildUsersState(
        buildOfficeState({
          ...state,
          usersInRoom: state.usersInRoom.filter(
            x => x.user.id !== action.userId
          )
        })
      );
    case USER_ENTER_MEETING:
      return buildInMeetState(state, action, true);
    case USER_LEFT_MEETING:
      return buildInMeetState(state, action, false);
    case ADD_ERROR:
      return {
        ...state,
        error: {
          message: action.message
        }
      };
    case TOGGLE_MESSAGE_DIALOG:
      return {
        ...state,
        messageDialog: action.props
      };
    case OPEN_LOGOUT_CONFIRM_DIALOG:
      return {
        ...state,
        logoutDialog: {
          isOpen: true
        }
      };
    case CLOSE_LOGOUT_CONFIRM_DIALOG:
      return {
        ...state,
        logoutDialog: {
          isOpen: false
        }
      };
    default:
      return state;
  }
};

export default reducers;
