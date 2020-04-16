import nock from "nock";
import fs from "fs";
import path from "path";
import fetchRooms from "./rooms";


describe(".fetchRooms", () => {
  const validRoomsData = [{ id: "afce3adc-00f0-4424-923c-d10cd72939b3", name: "Logos" }];
  describe("when strategy is ENVIRONMENT", () => {
    const strategy = "ENVIRONMENT";
    it("should load from env ROOMS_DATA", (done) => {
      process.env.ROOMS_DATA = JSON.stringify(validRoomsData);
      fetchRooms(strategy).then((rooms) => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });

    it("should reject the promise when invalid JSON defined", (done) => {
      process.env.ROOMS_DATA = "INVALID_JSON";
      fetchRooms(strategy).then((rooms) => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch((error) => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });
  });

  describe("when strategy is REMOTE", () => {
    const strategy = "REMOTE";
    const myUrlData = "http://minhaurl.com";
    beforeEach(() => {
      process.env.ROOMS_DATA = myUrlData;
    });

    it("should load from a URL", (done) => {
      nock(myUrlData)
        .get("/")
        .reply(200, validRoomsData);

      fetchRooms(strategy).then((rooms) => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });

    it("should reject the promise when invalid JSON defined", (done) => {
      nock(myUrlData)
        .get("/")
        .reply(200, "INVALID_JSON");

      fetchRooms(strategy).then((rooms) => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch((error) => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });

    it("should reject the promise when a error ocurred", (done) => {
      nock(myUrlData)
        .get("/")
        .replyWithError({
          message: "something awful happened",
          code: "AWFUL_ERROR",
        });
      fetchRooms(strategy).then((rooms) => {
        done.fail(`Need fail on make the request: ${rooms}`);
      }).catch((error) => {
        expect(error.message).toEqual("something awful happened");
        done();
      });
    });
  });

  describe("when strategy is not defined", () => {
    const filename = "../file/matrix.room.web.json";
    beforeEach(() => {
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.writeFileSync(filename, JSON.stringify(validRoomsData));
    });

    afterEach(() => {
      fs.unlinkSync(filename);
    });

    it("should load default when the file ../file/matrix.room.web.json is not defined", (done) => {
      fs.unlinkSync(filename);
      fetchRooms().then((rooms) => {
        expect(rooms).toBeDefined();
        expect(rooms.length).toBe(10);
      }).then(done);
    });

    it("should load from the file ../file/matrix.room.web.json", (done) => {
      fetchRooms().then((rooms) => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });

    it("should reject the promise when invalid JSON defined", (done) => {
      fs.writeFileSync(filename, "INVALID_JSON");
      fetchRooms().then((rooms) => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch((error) => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });
  });
});
