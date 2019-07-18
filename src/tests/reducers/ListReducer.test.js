import listReducer from '../../reducers/listReducer';
import {defaultLists} from '../../constants';

const defaultState = {
    deleteMode: false,
    origLists: defaultLists,
    lists: defaultLists,
    nameError: false,
    activeList: defaultLists[0],
    displayTitle: 'All Tasks'
};

describe('List Reducer', () => {

    it('Default case', () => {
        const newState = listReducer(undefined, {type: '', payload: ''});
        expect(newState).toEqual(defaultState);
    });

    it('Toggle delete mode', () => {
        const prevState = {
            ...defaultState,
            deleteMode: false
        }
        const newState = listReducer(prevState, {type: 'TOGGLE_DELETE_MODE', payload: ''});
        expect(newState).toEqual({
            ...prevState,
            deleteMode: true
        });
    });

    it('Discard changes', () => {
        const prevState = {
            ...defaultState,
            deleteMode: true
        }
        const newState = listReducer(prevState, {type: 'DISCARD_CHANGES', payload: ''});
        expect(newState).toEqual({
            ...prevState,
            deleteMode: false,
            lists: [...prevState.origLists]
        });
    });

    it('Name error', () => {
        const payload = false;
        const newState = listReducer(defaultState, {type: 'NAME_ERROR', payload});
        expect(newState).toEqual({
            ...defaultState,
            nameError: payload
        });
    });

    it('Delete List', () => {
        const payload = 'work';
        const newState = listReducer(defaultState, {type: 'DELETE_LIST', payload});
        expect(newState).toEqual({
            ...defaultState,
            lists: [
                { id: "personal", title: "Personal"}, 
                { id: "grocery-list", title: "Grocery List"},
            ]
        });
    });

    it('Create List', () => {
        const newList = {id: "personal-food", title: "Eat lunch"};
        const newState = listReducer(defaultState, {
            type: 'CREATE_LIST', 
            payload: newList
        });
        expect(newState).toEqual({
            ...defaultState,
            lists: [...defaultState.origLists, newList],
            origLists: [...defaultState.origLists, newList]
        });
    });

    it('Save Changes', () => {
        const prevState = {
            ...defaultState,
            lists: [
                { id: "personal", title: "Personal"}, 
                {id: "personal-food", title: "Eat lunch"},
                { id: "grocery-list", title: "Grocery List"},
            ]
        }
        const newState = listReducer(prevState, {type: 'SAVE_CHANGES', payload: ''});
        expect(newState).toEqual({
            ...prevState,
            origLists: [...prevState.lists]
        });
    });

    it('Select list', () => {
        const payload = 'grocery-list';
        const newState = listReducer(defaultState, {type: 'SELECT_LIST', payload});
        expect(newState).toEqual({
            ...defaultState,
            activeList: { id: "grocery-list", title: "Grocery List"},
            displayTitle: 'Grocery List'
        });
    });

    it('Select all lists', () => {
        const newState = listReducer(defaultState, {type: 'SELECT_ALL_LISTS', payload: ''});
        expect(newState).toEqual({
            ...defaultState,
            activeList: { id: "personal", title: "Personal"},
            displayTitle: 'All Tasks'
        });
    });
});