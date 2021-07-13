import OfficeController from "./office.controller";

const assert = require("assert");

function getProfileDataSample() {
  return {
    id: "111",
    name: "Nome do fulano",
    imageUrl: "http://localhost/img.jpg",
    email: "Mail@mail.com",
  };
}

describe("Basic Office Test", () => {
  it("add user in office", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom.user.id, profileData.id);
    assert.equal(userInRoom.room, "room-1");
  });

  it("remove user in office", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.removeUser(profileData.id);

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom, null);
  });

  it("must return size of users in in office = 1", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.addUserInRoom(profileData, "room-2");

    assert.equal(officeController.getUsersInOffice().size, 1);
  });

  it("must return users in office = map", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.addUserInRoom(profileData, "room-2");

    assert.ok(typeof officeController.getUsersInOfficeByMap(), "Map");
  });

  it("must user be in room-2", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.addUserInRoom(profileData, "room-2");

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom.room, "room-2");
  });

  it("must user in meet is true", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.setUserInMeet(profileData.id, true);

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom.user.inMeet, true);
  });

  it("must user in meet is false", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.setUserInMeet(profileData.id, true);
    officeController.setUserInMeet(profileData.id, false);

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom.user.inMeet, false);
  });

  it("must prevent broke if try to set user in meet and the user is not logged yet", () => {
    const officeController = new OfficeController();
    const profileData = getProfileDataSample();

    officeController.addUserInRoom(profileData, "room-1");
    officeController.removeUser(profileData.id);

    officeController.setUserInMeet(profileData.id, true);

    const userInRoom = officeController.getUserInRoom(profileData.id);
    assert.equal(userInRoom, null);
  });
});
