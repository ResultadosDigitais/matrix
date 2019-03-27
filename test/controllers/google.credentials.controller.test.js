var assert = require('assert');
var googleCredentialController =  require('../../controllers/google.credentials.controller');

describe('Basic google credential Test', function () {
	it('should return false of credentials is not present', function () {
        assert.equal(googleCredentialController.isCredentialPresent(), false);
    });
});

