import taskReducer from '../../reducers/taskReducer';

const defaultState = {
    tasks: [],
    activeTasks: [],
    selectedTask: {},
    showTaskCard: false,
    checkboxes: []
};

const sampleTasks = [
    {id: 1, title: 'task1', notes: 'note1', list: {id:1}},
    {id: 3, title: 'task2', notes: 'note2', list: {id:2}},
    {id: 2, title: 'task3', notes: 'note3', list: {id:1}},
    {id: 4, title: 'task4', notes: 'note4', list: {id:2}}
];

describe('Task Reducer', () => {

    it('Default case', () => {
        const newState = taskReducer(undefined, {type: '', payload: ''});
        expect(newState).toEqual(defaultState);
    });

    it('Task Select List', () => {
        const prevState = {
            ...defaultState,
            tasks: sampleTasks 
        }
        const newState = taskReducer(prevState, {type: 'TASK_SELECT_LIST', payload: 1});
        expect(newState).toEqual({
            ...prevState,
            activeTasks: [
                {id: 1, title: 'task1', notes: 'note1', list: {id:1}},
                {id: 2, title: 'task3', notes: 'note3', list: {id:1}}
            ]
        });
    });

    it('Select all tasks', () => {
        const prevState = {
            ...defaultState,
            tasks: sampleTasks 
        }
        const newState = taskReducer(prevState, {type: 'SELECT_ALL_TASKS', payload: ''});
        expect(newState).toEqual({
            ...prevState,
            activeTasks: sampleTasks
        });
    });

    it('Create task', () => {
        const prevState = {
            ...defaultState,
            tasks: sampleTasks
        };
        const payload = {
            task: {id: 8, title: 'task01', notes: 'note10', list: {id:1}},
            id: 1
        }
        const newState = taskReducer(prevState, {type: 'CREATE_TASK', payload});
        expect(newState).toEqual({
            ...prevState,
            tasks: [...prevState.tasks, payload.task],
            activeTasks: [
                {id: 1, title: 'task1', notes: 'note1', list: {id:1}},
                {id: 2, title: 'task3', notes: 'note3', list: {id:1}},
                {id: 8, title: 'task01', notes: 'note10', list: {id:1}}
            ]
        });
    });

    it('Delete Task', () => {
        const prevState = {
            ...defaultState,
            tasks: sampleTasks,
            activeTasks: [
                {id: 1, title: 'task1', notes: 'note1', list: {id:1}},
                {id: 3, title: 'task2', notes: 'note2', list: {id:2}},
            ]
        };
        const newState = taskReducer(prevState, {type: 'DELETE_TASK', payload: 1});
        expect(newState).toEqual({
            ...prevState,
            tasks: [
                {id: 3, title: 'task2', notes: 'note2', list: {id:2}},
                {id: 2, title: 'task3', notes: 'note3', list: {id:1}},
                {id: 4, title: 'task4', notes: 'note4', list: {id:2}}
            ],
            activeTasks: [
                {id: 3, title: 'task2', notes: 'note2', list: {id:2}}
            ]
        });
    });

    it('Task update notes', () => {
        const prevState = {
            ...defaultState,
            selectedTask: {
                notes: 'OLd notes'
            }
        };
        const payload = 'This is the updated version.';
        const newState = taskReducer(prevState, {type: 'TASK_UPDATE_NOTES', payload});
        expect(newState).toEqual({
            ...prevState,
            selectedTask: {
                ...prevState.selectedTask,
                notes: payload
            }
        });
    });

    it('Set selected task', () => {
        const prevState = {
            ...defaultState,
            selectedTask: sampleTasks[1]
        };
        const payload = sampleTasks[2];
        const newState = taskReducer(prevState, {type: 'SET_SELECTED_TASK', payload});
        expect(newState).toEqual({
            ...prevState,
            selectedTask: payload
        });
    });

    it('Toggle show card', () => {
        const prevState = {
            ...defaultState,
            showTaskCard: true
        };
        const newState = taskReducer(prevState, {type: 'TOGGLE_SHOW_CARD', payload: ''});
        expect(newState).toEqual({
            ...prevState,
            showTaskCard: false
        });
    });

    it('Set check box', () => {
        const prevState = {
            ...defaultState,
            checkboxes: [false, true, true]
        };
        const payload = [false, true, true, false];
        const newState = taskReducer(prevState, {type: 'SET_CHECK_BOX', payload});
        expect(newState).toEqual({
            ...prevState,
            checkboxes: payload
        });
    })
});
