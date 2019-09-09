import { FETCH_TAGS, FETCH_TAGS_PENDING } from '../actions/types';

const INITIAL_STATE = {
    tags: null,
    isFetching: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TAGS:
            return {
                ...state,
                tags: action.payload.data,
                isFetching: false
            };

        case FETCH_TAGS_PENDING:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
};
