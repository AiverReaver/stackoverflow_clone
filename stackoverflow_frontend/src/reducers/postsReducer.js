import {
    FETCH_POSTS,
    FETCH_POST_DETAILS,
    FETCH_POSTS_PENDING
} from '../actions/types';
const INITIAL_STATE = {
    posts: null,
    postDetail: null
};

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
                isQuery: false
            };

        case FETCH_POSTS_PENDING:
            return {
                ...state,
                isQuery: true
            };

        case FETCH_POST_DETAILS:
            return {
                ...state,
                postDetail: action.payload,
                isQuery: false
            };

        default:
            return state;
    }
};
