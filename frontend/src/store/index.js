// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
// import loginReducer from './../reducers/loginReducer.js';
// import spotReducer from './../reducers/spotReducer.js';
// import groupReducer from './../reducers/groupReducer.js';
// import travelReducer from './../reducers/travelReducer.js';
// import userspotReducer from '../reducers/UserspotReducer.js';
import loginReducer from './../reducers/loginSlice.js';
import travelReducer from './../reducers/travelSlice.js';
import spotReducer from './../reducers/spotSlice.js';
import groupReducer from './../reducers/groupSlice.js';
import userspotReducer from '../reducers/UserspotSlice.js';

// const rootReducer = combineReducers({
//     loginReducer,
//     spotReducer,
//     groupReducer,
//     travelReducer,
//     userspotReducer
// });


// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware)
// );

const store = configureStore({
    reducer: {
        loginReducer,
        spotReducer,
        groupReducer,
        travelReducer,
        userspotReducer
    }
});

export default store;
