import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure} from 'enzyme';
import AddressBook from './AddressBook';

configure({adapter: new Adapter()});

let initialState = {
    pageNo: 3,
    contacts: {
        contacts: [{
            "name": {
                "title": "mr",
                "first": "brad",
                "last": "gibson"
            },
            "location": {
                "street": "9278 new road",
                "city": "kilcoole",
                "state": "waterford",
            },
            "email": "brad.gibson@example.com",
            "phone": "011-962-7516",
            "cell": "081-454-0666",
            "id": {
                "name": "PPS",
                "value": "0390511T"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/75.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            },
            "nat": "IE"
        }],
        selectedContact: {
            "name": {
                "title": "mr",
                "first": "brad",
                "last": "gibson"
            },
            "location": {
                "street": "9278 new road",
                "city": "kilcoole",
                "state": "waterford",
            },
            "email": "brad.gibson@example.com",
            "phone": "011-962-7516",
            "cell": "081-454-0666",
            "id": {
                "name": "PPS",
                "value": "0390511T"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/75.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            },
            "nat": "IE"
        },
        favoriteContacts: [],
    }
}

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
let store = mockStore(initialState);

describe('Address Book', () => {
    const wrapper = mount(<Provider store={store}><AddressBook /></Provider>);
    it('renders all major divs', () => {
        expect(wrapper.find("div#address-book-container").exists()).toBe(true);
        expect(wrapper.find("div#list-details-container").exists()).toBe(true);
        expect(wrapper.find("div#contact-sidebar").exists()).toBe(true);
        expect(wrapper.find("div#pagination-container").exists()).toBe(true);
        expect(wrapper.find("div#details-sidebar").exists()).toBe(true);
    })

    describe('buttons', () => {
        it('should render pagination buttons', () => {
            expect(wrapper.find('button.left-arrow').exists()).toBe(true);
            expect(wrapper.find('button.right-arrow').exists()).toBe(true);
            expect(wrapper.find('button.page-selected').exists()).toBe(true);
        })

        it('should increment and decrement pages correctly', () => {
            const leftArrowButton = wrapper.find('button.left-arrow');
            const rightArrowButton = wrapper.find('button.right-arrow');
            let currentSelectedPage = wrapper.find('button.page-selected');

            // Should not decrement with left arrow if on page 1
            expect(currentSelectedPage.text()).toBe("1");
            leftArrowButton.simulate('click');
            currentSelectedPage = wrapper.find('button.page-selected');
            expect(currentSelectedPage.text()).toBe("1");


            // Should increment on right arrow
            rightArrowButton.simulate('click');
            currentSelectedPage = wrapper.find('button.page-selected');
            expect(currentSelectedPage.text()).toBe("2");

            // Should decrement on left arrow and not on page 1
            leftArrowButton.simulate('click');
            currentSelectedPage = wrapper.find('button.page-selected');
            expect(currentSelectedPage.text()).toBe("1");
        })
    })
})
