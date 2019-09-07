import stackoverflow from '../api';

export const fetchposts = pageNum => async dispatch => {
    const res = await stackoverflow.get(`/posts?page=${pageNum}`);

    dispatch({
        type: 'FETCH_POSTS',
        payload: res.data
    });
};

export const fetchPostDetails = id => async dispatch => {
    const res = await stackoverflow.get(`/posts/${id}`);

    dispatch({
        type: 'FETCH_POST_DETAILS',
        payload: res.data
    });
};
