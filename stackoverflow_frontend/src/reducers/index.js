import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import userReducer from './userReducer';
import tagsReducer from './tagsReducer';

export default combineReducers({
    postsReducer,
    user: userReducer,
    tags: tagsReducer
});
