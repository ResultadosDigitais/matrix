class GoogleCredentialController {
  constructor(publicKey) {
    this.publicKey = publicKey || "";
  }

  isCredentialPresent() {
    if (this.publicKey.length > 0) {
      return true;
    }

    return false;
  }
}

export default GoogleCredentialController;
