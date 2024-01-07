// reducers.js
import { combineReducers } from 'redux';
import menu from './menu';
import search from './search';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, search });

export default reducers;
