import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure} from 'enzyme';
import AddressBook from './AddressBook';

configure({adapter: new Adapter()});
let initialState = testState;
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
