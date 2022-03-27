import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure } from 'enzyme';
import ContactList from './ContactList';

configure({adapter: new Adapter()});
let initialState = testState;
let store = mockStore(initialState);

describe('Contact List', () => {
    const wrapper = mount(<Provider store={store}><ContactList contacts={initialState.contacts.contacts} /></Provider>);

    it('renders list div correctly', () => {
        expect(wrapper.find('div#contact-list').exists()).toBe(true);
    })
})
