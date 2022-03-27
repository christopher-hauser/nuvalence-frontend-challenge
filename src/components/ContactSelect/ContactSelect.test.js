import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure} from 'enzyme';
import ContactSelect from './ContactSelect';

configure({adapter: new Adapter()});
let initialState = testState;
let contact = initialState.contacts.contacts[0];
let store = mockStore(initialState);

describe('Contact Select', () => {
    const wrapper = mount(<Provider store={store}><ContactSelect contact={contact}/></Provider>);

    it('displays first and last name correctly', () => {
        const name = wrapper.find('div.contact-block-info').childAt(0)
        expect(name.text()).toBe('brad gibson');
    })

    it('displays state and country correctly', () => {
        const location = wrapper.find('div.contact-block-info').childAt(1)
        expect(location.text()).toBe('waterford, ireland');
    })

    it('displays a favorite star', () => {
        const star = wrapper.find('div.favorite-block').childAt(0);
        expect(star.exists()).toBe(true);
    })
})
