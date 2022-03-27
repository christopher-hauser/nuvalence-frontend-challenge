import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { shallow, configure} from 'enzyme';
import Nav from './Nav';

configure({adapter: new Adapter()});

describe('Favorite Contact', () => {
    const wrapper = shallow(<Nav/>);

    it('should display a nav bar', () => {
        expect(wrapper.find('nav#nav').exists()).toBe(true);
    })
});
