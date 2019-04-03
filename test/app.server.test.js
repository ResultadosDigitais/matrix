const assert = require('assert');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app.server');

describe('Unit testing the / route', () => {
  it('should return OK status', () => request(app)
    .get('/')
    .then((response) => {
      assert.equal(response.status, 200);
    }));

  it('should return message "Hello Matrix" on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('Hello Matrix');
    }));

  it('should there is googleapi on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<script src="https://apis.google.com/js/platform.js" async defer></script>');
    }));

  it('should there is <meta> google-signin-client_id on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<meta name="google-signin-client_id" content="990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com">');
    }));

  it('should there is google login button on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<div id="googleLoginButton" class="g-signin2" data-onsuccess="onSignIn"></div>');
    }));

  it('should there is index.web.js on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<script src="index.web.js"></script>');
    }));

  it('should there is profile.js on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<script src="profile.web.js"></script>');
    }));

  it('should there is jquery on rendering', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.text).to.contain('<script src="https://code.jquery.com/jquery-latest.min.js"></script>');
    }));
});
