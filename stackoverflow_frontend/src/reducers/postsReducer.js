export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: action.payload
            };

        case 'FETCH_POST_DETAILS':
            return {
                ...state,
                postDetail: action.payload
            };

        default:
            return state;
    }
};
