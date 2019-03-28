var assert = require('assert');
var OfficeController =  require('../../controllers/office.controller');


describe('Basic Office Test', function () {
	it('add user in office', function () {

		var officeController = new OfficeController();

		var profileData = {
    		id: '111',
    		name: 'Nome do fulano',
    		imageUrl: 'http://localhost/img.jpg',
    		email: 'Mail@mail.com' 
    	};

    	officeController.addUserInRoom(profileData,"room-1");

        assert.equal(officeController.getUsersInOffice().get("111").user.id, "111");
        assert.equal(officeController.getUsersInOffice().get("111").room, "room-1");
    });

    it('remove user in office', function () {

		var officeController = new OfficeController();

		var profileData = {
    		id: '111',
    		name: 'Nome do fulano',
    		imageUrl: 'http://localhost/img.jpg',
    		email: 'Mail@mail.com' 
    	};
    	officeController.addUserInRoom(profileData,"room-1");
    	officeController.removeUser(profileData.id);
        assert.equal(officeController.getUsersInOffice().get("111"), null);
    });

    it('should size user in office 1', function () {

		var officeController = new OfficeController();

		var profileData = {
    		id: '111',
    		name: 'Nome do fulano',
    		imageUrl: 'http://localhost/img.jpg',
    		email: 'Mail@mail.com' 
    	};
    	officeController.addUserInRoom(profileData,"room-1");
    	officeController.addUserInRoom(profileData,"room-2");

        assert.equal(officeController.getUsersInOffice().size, 1);
    });

    it('should user in room-2', function () {

		var officeController = new OfficeController();

		var profileData = {
    		id: '111',
    		name: 'Nome do fulano',
    		imageUrl: 'http://localhost/img.jpg',
    		email: 'Mail@mail.com' 
    	};
    	officeController.addUserInRoom(profileData,"room-1");
    	officeController.addUserInRoom(profileData,"room-2");

        assert.equal(officeController.getUsersInOffice().get("111").room, "room-2");
    });

});
