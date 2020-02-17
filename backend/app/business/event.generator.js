import uuid from "uuid/v4";
import domainIdentify from "./domain.identify";


const getNewMeetingUrl = (roomDetails, baseUrl) => {
    const roomId = roomDetails.id ? roomDetails.id : uuid();
    
    const url = [baseUrl];
    url.push('/new?')
    url.push(`roomId=${roomId}`)
    
    if(roomDetails.name) {
        url.push(`&roomName=${roomDetails.name}`)
    }
    
   return url.join('');
}

const getEventDetailsText = (roomDetails) => {
    const eventUrl = encodeURIComponent(getNewMeetingUrl(roomDetails, domainIdentify()));

    return `
    
    Link for our Matrix meeting: ${eventUrl}

    See you
    `
}

module.exports = {
    getNewMeetingUrl,
    getEventDetailsText
}