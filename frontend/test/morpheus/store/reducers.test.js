import { expect } from "chai";
import deepFreeze from "deep-freeze";
import sinon from "sinon";

import {
  addRooms,
  syncOffice,
  toggleTheme
} from "../../../src/morpheus/store/actions";
import reducers, { initialState } from "../../../src/morpheus/store/reducers";
import storage from "../../../src/morpheus/store/storage";

describe("morpheus/store/reducers", () => {
  it("should reduce action ADD_ROOMS", () => {
    const stateBefore = { ...initialState };
    const stateAfter = {
      ...initialState,
      rooms: [
        { id: 1, name: "room 1",externalMeetUrl:"http://externalMeetUrl-1" },
        { id: 2, name: "room 2",externalMeetUrl:"http://externalMeetUrl-2", description: "Hello", disableMeeting: true }
      ],
      office: [
        {
          id: 1,
          name: "room 1",
          meetingEnabled: true,
          externalMeetUrl:"http://externalMeetUrl-1",
          users: [],
          description: undefined,
        },
        {
          id: 2,
          name: "room 2",
          meetingEnabled: false,
          externalMeetUrl:"http://externalMeetUrl-2",
          users: [],
          description: "Hello",
        }
      ]
    };
    const action = addRooms([
      { id: 1, name: "room 1", externalMeetUrl:"http://externalMeetUrl-1" },
      { id: 2, name: "room 2", externalMeetUrl:"http://externalMeetUrl-2", description: "Hello", disableMeeting: true }
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
            inMeet: true
          }
        }
      ],
      users: [
        {
          id: 100,
          name: "user 1",
          avatar: "image-url-1",
          inMeet: false,
          roomId: "",
          roomName: ""
        },
        {
          id: 200,
          name: "user 2",
          avatar: "image-url-2",
          inMeet: true,
          roomId: "",
          roomName: ""
        }
      ]
    };
    const action = syncOffice([
      { user: { id: 100, name: "user 1", imageUrl: "image-url-1" } },
      {
        user: {
          id: 200,
          name: "user 2",
          imageUrl: "image-url-2",
          inMeet: true
        }
      }
    ]);

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);
  });

  it("should reduce action SYNC_OFFICE and state has rooms", () => {
    const stateBefore = {
      ...initialState,
      rooms: [
        { id: "1", name: "room 1", externalMeetUrl:"http://externalMeetUrl-1", users: [], disableMeeting: true },
        { id: "2", name: "room 2", externalMeetUrl:"http://externalMeetUrl-2", users: [], description: "Hello" }
      ]
    };
    const stateAfter = {
      ...initialState,
      rooms: [
        {
          id: "1",
          name: "room 1",
          externalMeetUrl:"http://externalMeetUrl-1",
          users: [],
          disableMeeting: true,
        },
        {
          id: "2",
          name: "room 2",
          externalMeetUrl:"http://externalMeetUrl-2",
          users: [],
          description: "Hello",
        }
      ],
      usersInRoom: [
        {
          room: "1",
          user: { id: 100, name: "user 1", imageUrl: "image-url-1" }
        },
        {
          room: "2",
          user: {
            id: 200,
            name: "user 2",
            imageUrl: "image-url-2",
            inMeet: true
          }
        }
      ],
      office: [
        {
          id: "1",
          name: "room 1",
          meetingEnabled: false,
          externalMeetUrl:"http://externalMeetUrl-1",
          description: undefined,
          users: [
            {
              id: 100,
              name: "user 1",
              imageUrl: "image-url-1"
            }
          ],
        },
        {
          id: "2",
          name: "room 2",
          meetingEnabled: true,
          externalMeetUrl:"http://externalMeetUrl-2",
          description: "Hello",
          users: [
            {
              id: 200,
              name: "user 2",
              imageUrl: "image-url-2",
              inMeet: true
            }
          ]
        }
      ],
      users: [
        {
          id: 100,
          name: "user 1",
          avatar: "image-url-1",
          inMeet: false,
          roomId: "1",
          roomName: "room 1"
        },
        {
          id: 200,
          name: "user 2",
          avatar: "image-url-2",
          inMeet: true,
          roomId: "2",
          roomName: "room 2"
        }
      ]
    };
    const action = syncOffice({
      111: {
        room: "1",
        user: { id: 100, name: "user 1", imageUrl: "image-url-1" }
      },
      222: {
        room: "2",
        user: {
          id: 200,
          name: "user 2",
          imageUrl: "image-url-2",
          inMeet: true
        }
      }
    });

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);
  });

  describe("action TOGGLE_THEME", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should toggle theme from dark to light", () => {
      const stateBefore = { ...initialState, theme: "dark" };
      const stateAfter = { ...initialState, theme: "light" };
      const action = toggleTheme();

      deepFreeze(stateBefore);
      deepFreeze(action);

      sinon.replace(storage, "setTheme", sinon.fake());

      expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);

      expect(storage.setTheme.calledWithMatch("light")).to.equal(true);
    });

    it("should toggle theme from light to dark", () => {
      const stateBefore = { ...initialState };
      const stateAfter = { ...initialState, theme: "dark" };
      const action = toggleTheme();

      deepFreeze(stateBefore);
      deepFreeze(action);

      sinon.replace(storage, "setTheme", sinon.fake());

      expect(reducers(stateBefore, action)).to.deep.equal(stateAfter);

      expect(storage.setTheme.calledWithMatch("dark")).to.equal(true);
    });
  });
});
