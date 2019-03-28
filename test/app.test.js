const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Unit testing the / route', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return message "Hello Matrix" on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('Hello Matrix');
        })
    });

    it('should there is googleapi on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<script src="https://apis.google.com/js/platform.js" async defer></script>');
        })
    });

    it('should there is <meta> google-signin-client_id on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<meta name="google-signin-client_id" content="1086925412710-eokas20k03k70dhf2rbi97jrtggntusb.apps.googleusercontent.com">');
        })
    });

    it('should there is google login button on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<div id="googleLoginButton" class="g-signin2" data-onsuccess="onSignIn"></div>');
        })
    });

    it('should there is index.js on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<script src="index.js"></script>');
        })
    });

    it('should there is profile.js on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<script src="profile.js"></script>');
        })
    });
    
    it('should there is jquery on rendering', function() {
      return request(app)
        .get('/')
        .then(function(response){
            expect(response.text).to.contain('<script src="http://code.jquery.com/jquery-latest.min.js"></script>');
        })
    });

});
