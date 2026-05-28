import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loginReducer from './../reducers/loginReducer.js';
import spotReducer from './../reducers/spotReducer.js';
import groupReducer from './../reducers/groupReducer.js';
import travelReducer from './../reducers/travelReducer.js';
import userspotReducer from '../reducers/UserspotReducer.js';

const rootReducer = combineReducers({
    loginReducer,
    spotReducer,
    groupReducer,
    travelReducer,
    userspotReducer
});


const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
