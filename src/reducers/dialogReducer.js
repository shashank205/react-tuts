import {chipLabels} from '../constants';

export default(state = {
    openAdd: false,
    openList: false,
    selectedList: {},
    dateLabel: '',
    task: '',
    showDatePicker: false,
    customDate: new Date(),
    notes: ''
}, action) => {
    switch(action.type) {
        case 'TOGGLE_ADD_TASK': 
            state = {
                ...state,
                openAdd: !state.openAdd,
                selectedList: action.payload,
                dateLabel: '',
                task: ''
            };
            break;
        case 'CHANGE_LIST': 
            state = {
                ...state,
                selectedList: action.payload,
            };
            break;   
        case 'SET_DATE':
            state = {
                ...state,
                dateLabel: action.payload,
                showDatePicker: action.payload === chipLabels[4] ? true : false 
            };
            break;
        case 'CUSTOM_DATE':
            state = {
                ...state,
                customDate: action.payload,
                showDatePicker: false
            };
            break;
        case 'CLOSE_DATE_PICKER':
            state = {
                ...state,
                showDatePicker: false
            };
            break;
        case 'UPDATE_NOTES':
            state = {
                ...state,
                notes: action.payload
            };
            break;
        case 'UPDATE_TASK':
            state = {
                ...state,
                task: action.payload
            };
            break;                
        case 'TOGGLE_LIST_ITEMS': 
            state = {
                ...state,
                openList: !state.openList
            };
            break;    
        default:
            break;    
    }
    return state;
}