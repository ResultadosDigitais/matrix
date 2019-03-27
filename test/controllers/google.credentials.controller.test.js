var assert = require('assert');
var GoogleCredentialController =  require('../../controllers/google.credentials.controller');

describe('Basic google credential Test', function () {
	it('should return false of credentials is not present', function () {

		var googleCredential = new GoogleCredentialController();
        assert.equal(googleCredential.isCredentialPresent(), false);
    });

    it('should return true of credentials is present', function () {
    	var googleCredential = new GoogleCredentialController('key');
        assert.equal(googleCredential.isCredentialPresent(), true);
    });
});

