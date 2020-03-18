class WhiteListDomainController {
  constructor(whiteListDomains) {
    if (whiteListDomains.length > 0) {
    	this.whitelistDomains = JSON.parse(whiteListDomains);
    }else{
    	this.whitelistDomains = "";
    }
  }

  isValidEmailInWhiteList(email){
    if(this.whitelistDomains==""){
    	return true;
    }

    for (const domain in this.whitelistDomains) {
      if(email.endsWith(this.whitelistDomains[domain])){
          return true;
      }
    }
    return false;
  }
}

export default WhiteListDomainController;
