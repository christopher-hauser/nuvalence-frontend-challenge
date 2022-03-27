import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure } from 'enzyme';
import ContactDetails from './ContactDetails';

let initialState = testState;
configure({adapter: new Adapter()});
let store = mockStore(initialState);


describe('Contact Details', () => {
    let wrapper = mount(<Provider store={store}><ContactDetails /></Provider>);
    it('renders all major divs', () => {
        expect(wrapper.find("div.contact-details-outer").exists()).toBe(true);
        expect(wrapper.find("div.contact-details-block").exists()).toBe(true);
        expect(wrapper.find("div.contact-details-top").exists()).toBe(true);
        expect(wrapper.find("div.contact-details-bottom").exists()).toBe(true);
    })

    it('fills out name correctly', () => {
        const name = wrapper.find('div.contact-details-top').childAt(1);
        expect(name.text()).toBe("brad gibson")
    })

    it('uses the correct photo', () => {
        const photo = wrapper.find('div.contact-details-top').childAt(0);
        const src = photo.prop('src');
        expect(src).toBe("https://randomuser.me/api/portraits/men/75.jpg");
    })

    it('fills out phone numbers correctly', () => {
        const cellPhoneContainer = wrapper.find('div.contact-detail-block.phone-container').childAt(0);
        const homePhoneContainer = wrapper.find('div.contact-detail-block.phone-container').childAt(1);
        const cell = cellPhoneContainer.childAt(1);
        const home = homePhoneContainer.childAt(1);
        expect(cell.text()).toBe("081-454-0666")
        expect(home.text()).toBe("011-962-7516")
    })

    it('fills out email correctly', () => {
        const email = wrapper.find('a.contact-email');
        expect(email.text()).toBe("brad.gibson@example.com")
    })

    it('fills out address correctly', () => {
        const addressBlockContainer = wrapper.find('div.contact-details-bottom').childAt(2);
        const addressBlock = addressBlockContainer.childAt(1)
        const streetAddress = addressBlock.childAt(0);
        const cityState = addressBlock.childAt(1);
        const country = addressBlock.childAt(2);
        expect(streetAddress.text()).toBe("9278 new road");
        expect(cityState.text()).toBe("kilcoole, waterford");
        expect(country.text()).toBe("ireland");
    })

    it('displays a default message if no contact is selected', () => {
        initialState = {pageNo: 0, contacts: {
            contacts: [],
            selectedContact: [],
            favoriteContacts: []
        }}
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><ContactDetails /></Provider>)

        const noUserDisplay = wrapper.find('div.no-user-selected');
        expect(noUserDisplay.exists()).toBe(true);
    })
})
