const myLists = [ 
    { id: "personal", title: "Personal"}, 
    { id: "work", title: "Work"}, 
    { id: "grocery-list", title: "Grocery List"} 
];

export default(state={
    deleteMode: false,
    origLists: myLists,
    lists: myLists,
    nameError: false,
    activeList: myLists[0],
    displayTitle: 'All Tasks'
}, action) => {
    switch(action.type) {
        case 'TOGGLE_DELETE_MODE':
            state = {
                ...state,
                deleteMode: !state.deleteMode
            };
            break;
        case 'DISCARD_CHANGES':
            state = {
                ...state,
                deleteMode: !state.deleteMode,
                lists: [...state.origLists]
            };
            break;
        case 'NAME_ERROR':
            state = {
                ...state,
                nameError: action.payload
            };
            break;
        case 'DELETE_LIST':
            state = {
                ...state,
                lists: [...state.lists].filter(fList => fList.id !== action.payload)
            };
            break; 
        case 'CREATE_LIST':
            state = {
                ...state,
                lists: [...state.lists, action.payload],
                origLists: [...state.origLists, action.payload]
            };
            break;
        case 'SAVE_CHANGES':
            state = {
                ...state,
                origLists: [...state.lists]
            };
            break;
        case 'SELECT_LIST':
            state = {
                ...state,
                activeList: state.lists.find(list => list.id === action.payload),
                displayTitle: state.lists.find(list => list.id === action.payload).title

            }  
            break; 
        case 'SELECT_ALL_LISTS': 
            state = {
                ...state,
                activeList: state.lists[0],
                displayTitle: 'All Tasks'
            };
            break;                 
        default:
            break;    
    }
    return state;
}