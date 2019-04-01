require('mock-local-storage') 
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
var MatrixProfile =  require('../../public/profile.web');



describe('Basic profile credential Test', function () {
	it('should return empty of credentials is not present', function () {

		var matrixProfile = new MatrixProfile();
        assert.equal(matrixProfile.loadStoredProfile(), null);
    });

    it('should return data of credentials is present', function () {

    	var profileData = {
    		id: '111',
    		name: 'Nome do fulano',
    		imageUrl: 'http://localhost/img.jpg',
    		email: 'Mail@mail.com' 
    	};

		var matrixProfile = new MatrixProfile();
		matrixProfile.storeProfileData(profileData);
        assert.equal(matrixProfile.loadStoredProfile().name, profileData.name);
    });
});