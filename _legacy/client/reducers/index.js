import { combineReducers } from 'redux';

import videosReducer from './videosReducer';

const reducers = combineReducers({
  videosReducer,
});

export default reducers;
