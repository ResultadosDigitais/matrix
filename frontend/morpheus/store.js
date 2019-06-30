const CHANGE_USER_NAME = "CHANGE_USER_NAME";
const ADD_ROOMS = "ADD_ROOMS";
const SYNC_OFFICE = "SYNC_OFFICE";
const CHANGE_OFFICE_FILTER = "CHANGE_OFFICE_FILTER";
const CHANGE_USERS_FILTER = "CHANGE_USERS_FILTER";
const ADD_USER = "ADD_USER";

export const initialState = {
  userName: "",
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
  const { usersInRoom, usersFilter } = state;

  let users = usersInRoom.map(u => ({
    id: u.user.id,
    name: u.user.name,
    avatar: u.user.imageUrl
  }));

  if (usersFilter.search) {
    const search = usersFilter.search.toLowerCase();
    users = users.filter(u => u.name.toLowerCase().includes(search));
  }

  return {
    ...state,
    users
  };
};

const reducerLogic = (state, action) => {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return {
        ...state,
        userName: action.name
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
      const savedUser = state.usersInRoom.find(
        u => u.room === action.roomId && u.user.id === action.user.id
      );
      if (savedUser) {
        return state;
      }

      return buildUsersState(
        buildOfficeState({
          ...state,
          usersInRoom: [].concat(state.usersInRoom, {
            room: action.roomId,
            user: action.user
          })
        })
      );
    }
    default:
      return state;
  }
};

export const reducer = (state, action) => {
  const newState = reducerLogic(state, action);

  // debug store
  console.log(action.type, newState);

  return newState;
};

export const changeUserName = name => ({
  type: CHANGE_USER_NAME,
  name
});

export const addRooms = rooms => ({
  type: ADD_ROOMS,
  rooms
});

export const syncOffice = usersInRoom => ({
  type: SYNC_OFFICE,
  usersInRoom
});

export const changeOfficeFilter = (key, value) => ({
  type: CHANGE_OFFICE_FILTER,
  key,
  value
});

export const changeUsersFilter = (key, value) => ({
  type: CHANGE_USERS_FILTER,
  key,
  value
});

export const addUser = (user, roomId) => ({
  type: ADD_USER,
  user,
  roomId
});
