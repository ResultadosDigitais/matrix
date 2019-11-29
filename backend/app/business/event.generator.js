import uuid from "uuid/v4";
import domainIdentify from "./domain.identify";


const getNewRandomMeetingUrl = (baseUrl) => {
    const roomId = uuid();
   return `${baseUrl}/new?roomName=meeting-${roomId}&roomId=${roomId}`
}

const getEventDetailsText = () => {
    const eventUrl = encodeURIComponent(getNewRandomMeetingUrl(domainIdentify()));

    return `
    
    Link for our Matrix meeting: ${eventUrl}

    See you
    `
}

module.exports = {
    getNewRandomMeetingUrl,
    getEventDetailsText
}