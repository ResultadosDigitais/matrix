// Constructor
function GoogleCredentialController(publicKey = '') {
  this.publicKey = publicKey;
}

GoogleCredentialController.prototype.isCredentialPresent = function () {
  if (this.publicKey.length > 0) {
    return true;
  }
  return false;
};

module.exports = GoogleCredentialController;
