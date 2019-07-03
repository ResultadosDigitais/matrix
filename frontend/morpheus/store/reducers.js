import {
  ADD_ERROR,
  SET_CURRENT_USER,
  ADD_ROOMS,
  SYNC_OFFICE,
  CHANGE_OFFICE_FILTER,
  CHANGE_USERS_FILTER,
  ADD_USER,
  REMOVE_USER
} from "./actions";

export const initialState = {
  currentUser: {},
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
  hasError: false,
  errorMessage: ""
};

const buildOfficeState = state => {
  const { rooms, usersInRoom, officeFilter } = state;

  let office = rooms.map((room, index) => ({
    id: room.id,
    name: room.name,
    isDefault: index === 0,
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

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
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
    case ADD_ERROR:
      return {
        hasError: true,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default reducers;
