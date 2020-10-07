export default (state={
    tasks: [],
    activeTasks: [],
    selectedTask: {},
    showTaskCard: false,
    checkboxes: []
}, action) => {
    switch(action.type) {
        case 'TASK_SELECT_LIST':
            state = {
                ...state,
                activeTasks: [...state.tasks].filter(task => task.list.id === action.payload)
            };
            break;
        case 'SELECT_ALL_TASKS': 
            state = {
                ...state,
                activeTasks: [...state.tasks]
            };
            break;
        case 'CREATE_TASK': 
            state = {
                ...state,
                tasks: [...state.tasks, action.payload.task],
                activeTasks: [...state.tasks, action.payload.task]
                                .filter(task => task.list.id === action.payload.id)
            };
            break;  
        case 'DELETE_TASK': 
            state = {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                activeTasks: state.activeTasks.filter(task => task.id !== action.payload)
            };
            break;
        case 'TASK_UPDATE_NOTES': 
            state = {
                ...state,
                selectedTask: {
                    ...state.selectedTask,
                    notes: action.payload
                }
            };
            //save tasks
            break; 
        case 'SET_SELECTED_TASK':
            state = {
                ...state,
                selectedTask: action.payload
            };
            break;     
        case 'TOGGLE_SHOW_CARD':
            state = {
                ...state,
                showTaskCard: !state.showTaskCard
            };
            break; 
        case 'SET_CHECK_BOX':
            state = {
                ...state,
                checkboxes: action.payload
            };
            break;    
        default:
            break;    
    }
    return state;
}