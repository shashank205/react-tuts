import {createStore, combineReducers} from 'redux';
import dialogReducer from './reducers/dialogReducer';
import listReducer from './reducers/listReducer';
import taskReducer from './reducers/taskReducer';

export default createStore(
    combineReducers({dialogReducer, listReducer, taskReducer})
);