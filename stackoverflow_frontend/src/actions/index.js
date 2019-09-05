import stackoverflow from '../api';

export const fetchposts = () => async dispatch => {
    const res = await stackoverflow.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: res.data
    });
};

export const fecthPostDetailsWithAnswerAndCommnets = id => async dispatch => {
    const res = await stackoverflow.get(`/posts/${id}`);

    dispatch({
        type: 'FETCH_POST_DETAILS',
        payload: res.data
    });
};
