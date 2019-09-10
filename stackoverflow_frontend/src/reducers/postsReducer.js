import {
    FETCH_POSTS,
    FETCH_POST_DETAILS,
    FETCH_POSTS_PENDING,
    POST_CREATED,
    POST_COMMENT_CREATED,
    POST_ANSWER_CREATED
} from '../actions/types';
const INITIAL_STATE = {
    posts: null,
    postDetail: null,
    isQuery: false
};

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
                isQuery: false,
                postCreated: false
            };

        case FETCH_POSTS_PENDING:
            return {
                ...state,
                isQuery: true
            };

        case POST_CREATED:
            return {
                ...state,
                postCreated: true
            };

        case FETCH_POST_DETAILS:
            return {
                ...state,
                postDetail: action.payload,
                isQuery: false
            };

        case POST_COMMENT_CREATED:
            return {
                ...state,
                postDetail: action.payload
            };

        case POST_ANSWER_CREATED:
            return {
                ...state,
                postDetail: action.payload
            };

        default:
            return state;
    }
};
