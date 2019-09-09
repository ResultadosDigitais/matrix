import { expect } from "chai";
import deepFreeze from "deep-freeze";

import {
  addRooms,
  syncOffice,
} from "../../../src/morpheus/store/actions";
import reducers, {
  initialState,
} from "../../../src/morpheus/store/reducers";

describe("morpheus/store/reducers", () => {
  it("should reduce action ADD_ROOMS", () => {
    const stateBefore = { ...initialState };
    const stateAfter = {
      ...initialState,
      rooms: [{ id: 1, name: "room 1" }, { id: 2, name: "room 2" }],
      office: [
        {
          id: 1,
          name: "room 1",
          users: [],
        },
        {
          id: 2,
          name: "room 2",
          users: [],
        },
      ],
    };
    const action = addRooms([
      { id: 1, name: "room 1" },
      { id: 2, name: "room 2" },
    ]);

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it("should reduce action SYNC_OFFICE", () => {
    const stateBefore = { ...initialState };
    const stateAfter = {
      ...initialState,
      usersInRoom: [
        { user: { id: 100, name: "user 1", imageUrl: "image-url-1" } },
        {
          user: {
            id: 200,
            name: "user 2",
            imageUrl: "image-url-2",
            inMeet: true,
          },
        },
      ],
      users: [
        {
          id: 100,
          name: "user 1",
          avatar: "image-url-1",
          inMeet: false,
          roomId: "",
          roomName: "",
        },
        {
          id: 200,
          name: "user 2",
          avatar: "image-url-2",
          inMeet: true,
          roomId: "",
          roomName: "",
        },
      ],
    };
    const action = syncOffice([
      { user: { id: 100, name: "user 1", imageUrl: "image-url-1" } },
      {
        user: {
          id: 200,
          name: "user 2",
          imageUrl: "image-url-2",
          inMeet: true,
        },
      },
    ]);

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it("should reduce action SYNC_OFFICE and state has rooms", () => {
    const stateBefore = {
      ...initialState,
      rooms: [
        { id: "1", name: "room 1", users: [] },
        { id: "2", name: "room 2", users: [] },
      ],
    };
    const stateAfter = {
      ...initialState,
      rooms: [
        {
          id: "1",
          name: "room 1",
          users: [],
        },
        {
          id: "2",
          name: "room 2",
          users: [],
        },
      ],
      usersInRoom: [
        {
          room: "1",
          user: { id: 100, name: "user 1", imageUrl: "image-url-1" },
        },
        {
          room: "2",
          user: {
            id: 200,
            name: "user 2",
            imageUrl: "image-url-2",
            inMeet: true,
          },
        },
      ],
      office: [
        {
          id: "1",
          name: "room 1",
          users: [
            {
              id: 100,
              name: "user 1",
              imageUrl: "image-url-1",
            },
          ],
        },
        {
          id: "2",
          name: "room 2",
          users: [
            {
              id: 200,
              name: "user 2",
              imageUrl: "image-url-2",
              inMeet: true,
            },
          ],
        },
      ],
      users: [
        {
          id: 100,
          name: "user 1",
          avatar: "image-url-1",
          inMeet: false,
          roomId: "1",
          roomName: "room 1",
        },
        {
          id: 200,
          name: "user 2",
          avatar: "image-url-2",
          inMeet: true,
          roomId: "2",
          roomName: "room 2",
        },
      ],
    };
    const action = syncOffice({
      111: {
        room: "1",
        user: { id: 100, name: "user 1", imageUrl: "image-url-1" },
      },
      222: {
        room: "2",
        user: {
          id: 200,
          name: "user 2",
          imageUrl: "image-url-2",
          inMeet: true,
        },
      },
    });

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);
  });
});
