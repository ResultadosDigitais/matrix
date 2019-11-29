import eventGenerator from "../../app/business/event.generator";
import { encode } from "punycode";

const { expect } = require("chai");

describe('Event Generator', () => {
    it('generate url for matrix', () => {
        const eventUrl = eventGenerator.getNewRandomMeetingUrl('http://matrixurl.com');
        expect(eventUrl).to.contain('http://matrixurl.com/new');
        expect(eventUrl).to.contain('roomName=');
        expect(eventUrl).to.contain('roomId=');
    })

    it('body text for meeting', () => {
        const eventText = eventGenerator.getEventDetailsText();

        // expect(eventText).to.contain(encodeURIComponent(`Link for our Matrix meeting: ${encodeURIComponent('http://0.0.0.0:8080/new?')}`));
        expect(eventText).to.contain(`Link for our Matrix meeting: ${encodeURIComponent('http://0.0.0.0:8080/new?')}`)
        expect(eventText).to.contain(encodeURIComponent('roomName='));
        expect(eventText).to.contain(encodeURIComponent('roomId='));

       
    })
})