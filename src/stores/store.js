import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import mainReducer from '../reducers/reducer';

export default () => createStore(
    combineReducers({ data: mainReducer })
);