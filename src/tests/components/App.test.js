import React from 'react';
import App from '../../components/App';
import { shallow } from 'enzyme';
import {getByTestAttr} from '../../Utils';

describe('App component', () => {
    let component;
    beforeEach(() => {
        component = shallow(<App />);
    });

    it('should render header', () => {
        const header = getByTestAttr(component, 'headerComponent');
        expect(header.length).toBe(1);
    })

    it('should render left pane', () => {
        const leftPane = getByTestAttr(component, 'leftPaneComponent');
        expect(leftPane.length).toBe(1);
    })

    it('should render right pane', () => {
        const rightPane = getByTestAttr(component, 'rightPaneComponent');
        expect(rightPane.length).toBe(1);
    })
})