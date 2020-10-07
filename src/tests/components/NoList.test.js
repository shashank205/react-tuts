import {checkProps, getByTestAttr} from '../../Utils';
import {shallow} from 'enzyme';
import React from 'react';
import NoList from '../../components/dialogs/NoList';

describe('NoList component', () => {
    let component;
    let onClickProp = jest.fn();

    beforeEach(() => {
        const props = {
            closeDialog: onClickProp 
        }
        component = shallow(<NoList {...props}/>);
    });

    describe('Should render components', () => {
        it('should render title', () => {
            const title = getByTestAttr(component, 'dialogTitle');
            expect(title.length).toBe(1);
        })
    
        it('should render content', () => {
            const content = getByTestAttr(component, 'dialogContent');
            expect(content.length).toBe(1);
        })
    
        it('should render close button', () => {
            const closeBtn = getByTestAttr(component, 'closeDialog');
            expect(closeBtn.length).toBe(1);
        })
    });

    it('PropTypes should not throw a warning', () => {
        const expectedProps = {
            open: false,
            closeDialog: () => {}
        };
        const warning = checkProps(NoList, expectedProps);
        expect(warning).toBeUndefined();
    })

    it('Close button should emit callback on click event', () => {
        const button = getByTestAttr(component, 'closeDialog');
        button.simulate('click');
        expect(onClickProp.mock.calls.length).toBe(1);
    });
})