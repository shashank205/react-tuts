import { getByTestAttr } from "../../Utils";
import React from 'react';
import Header from '../../components/Header';
import {shallow} from 'enzyme';

describe('Header component', () => {
    it('should render add task', () => {
        const component = shallow(<Header />);
        const addTask = getByTestAttr(component, 'addTaskComponent');
        expect(addTask.length).toBe(1);
    })
})