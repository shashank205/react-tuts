import dialogReducer from '../../reducers/dialogReducer'

const defaultState = {
    openAdd: false,
    openList: false,
    selectedList: {},
    dateLabel: '',
    task: '',
    showDatePicker: false,
    customDate: new Date(),
    notes: ''
}

describe('Dialog Reducer', () => {
    it('Default case', () => {
        const newState = dialogReducer(undefined, {type: '', payload: ''});
        expect(newState).toEqual({
            ...defaultState,
            customDate: newState.customDate
        });
    });

    it('Toggle add task', () => {
        const payload = ''
        const newState = dialogReducer(defaultState, {type: 'TOGGLE_ADD_TASK', payload});
        expect(newState).toEqual({
            ...defaultState,
            openAdd: true,
            selectedList: payload,
            dateLabel: '',
            task: ''
        });
    });

    it('Change list', () => {
        const payload = { id: "work", title: "Work"};
        const newState = dialogReducer(defaultState, {type: 'CHANGE_LIST', payload});
        expect(newState).toEqual({
            ...defaultState,
            selectedList: payload,
        });
    });

    it('Set date', () => {
        const payload = 'Custom'
        const newState = dialogReducer(defaultState, {type: 'SET_DATE', payload});
        expect(newState).toEqual({
            ...defaultState,
            dateLabel: payload,
            showDatePicker: true
        });
    });

    it('Custom date', () => {
        const payload = defaultState.customDate;
        const newState = dialogReducer(defaultState, {type: 'CUSTOM_DATE', payload});
        expect(newState).toEqual({
            ...defaultState,
            customDate: payload,
            showDatePicker: false
        });
    });

    it('Close date picker', () => {
        const newState = dialogReducer(defaultState, {type: 'CLOSE_DATE_PICKER', payload: ''});
        expect(newState).toEqual({
            ...defaultState,
            showDatePicker: false
        });
    });

    it('Update notes', () => {
        const payload = 'New notes';
        const newState = dialogReducer(defaultState, {type: 'UPDATE_NOTES', payload});
        expect(newState).toEqual({
            ...defaultState,
            notes: payload
        });
    });

    it('Update Task', () => {
        const payload = {};
        const newState = dialogReducer(defaultState, {type: 'UPDATE_TASK', payload});
        expect(newState).toEqual({
            ...defaultState,
            task: payload
        });
    });

    it('Toggle list items', () => {
        const newState = dialogReducer(defaultState, {type: 'TOGGLE_LIST_ITEMS', payload: ''});
        expect(newState).toEqual({
            ...defaultState,
            openList: true
        });
    });
});