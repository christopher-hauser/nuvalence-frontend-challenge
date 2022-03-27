import React from 'react';
import { Provider } from 'react-redux';
import { mockStore, testState } from '../componentTestUtils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { mount, configure} from 'enzyme';
import FavoritesList from './FavoritesList'

configure({adapter: new Adapter()});
let initialState = testState;
let store = mockStore(initialState);

describe('Favorites List', () => {
    let wrapper = mount(<Provider store={store}><FavoritesList /></Provider>);

    it('should display a carousel', () => {
        expect(wrapper.find('div#favorites-carousel').exists()).toBe(true);
    })

    it('should display left and right carousel buttons', () => {
        expect(wrapper.find('button.carousel-button')).toHaveLength(2);
    })

    it('should display a default message if there are no favorites', () => {
        const favoritesTrack = wrapper.find('div#favorites-track');
        expect(favoritesTrack.childAt(0).text()).toBe('Tip: Favorite contacts for quick access.');
    })
})
