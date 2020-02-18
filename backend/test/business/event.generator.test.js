import eventGenerator from "../../app/business/event.generator";

const { expect } = require("chai");

describe('Event Generator', () => {
    it('generate url for matrix', () => {
        const roomDetails = {
            name: "My New Room"
        }

        const eventUrl = eventGenerator.getNewMeetingUrl(roomDetails, 'http://matrixurl.com');
        expect(eventUrl).to.contain('http://matrixurl.com/new');
        expect(eventUrl).to.contain('roomName=My New Room');
        expect(eventUrl).to.contain('roomId=');
    })

    it('body text for meeting', () => {
        const roomDetails = {
            name: "My New Room"
        };
        const eventText = eventGenerator.getEventDetailsText(roomDetails);
                
        expect(eventText).to.contain(`Link for our Matrix meeting: ${encodeURIComponent('http://0.0.0.0:8080/new?')}`)
        expect(eventText).to.contain(encodeURIComponent('roomName=My New Room'));
        expect(eventText).to.contain(encodeURIComponent('roomId='));

       
    })
})