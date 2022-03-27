import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure} from 'enzyme';
import FavoriteContact from './FavoriteContact'

configure({adapter: new Adapter()});
let initialState = testState;
let contact = initialState.contacts.contacts[0];
let store = mockStore(initialState);

describe('Favorite Contact', () => {
    const wrapper = mount(<Provider store={store}><FavoriteContact contact={contact}/></Provider>);

    it('should render containing div', () => {
        expect(wrapper.find('div.favorite-individual-block').exists()).toBe(true);
    })

    it('should display correct image', () => {
        const image = wrapper.find('img.contact-photo-favorites');
        const src = image.prop('src');
        expect(src).toBe("https://randomuser.me/api/portraits/men/75.jpg");
    })

    it('should display correct first name', () => {
        const firstName = wrapper.find('div.favorite-individual-block').childAt(1);
        expect(firstName.text()).toBe('brad')
    })
})
