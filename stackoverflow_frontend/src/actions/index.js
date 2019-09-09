import alertify from 'alertifyjs';

import stackoverflow from '../api';
import {
    FETCH_POSTS,
    FETCH_POSTS_PENDING,
    FETCH_POST_DETAILS,
    FETCH_TAGS_PENDING,
    FETCH_TAGS,
    USER_LOGGED_IN_SUCCESS,
    USER_LOGGED_IN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from './types';

export const fetchposts = (page, searchQuery) => async dispatch => {
    let res;

    if (searchQuery) {
        dispatch({
            type: FETCH_POSTS_PENDING
        });
    }

    res = await stackoverflow.get('/posts', {
        params: {
            page,
            searchQuery
        }
    });

    res.data.searchQuery = searchQuery;
    dispatch({
        type: FETCH_POSTS,
        payload: res.data
    });
};

export const fetchPostDetails = id => async dispatch => {
    const res = await stackoverflow.get(`/posts/${id}`);

    dispatch({
        type: FETCH_POST_DETAILS,
        payload: res.data
    });
};

export const fetchTags = searchQuery => async dispatch => {
    dispatch({
        type: FETCH_TAGS_PENDING
    });

    const res = await stackoverflow.get('/tags', {
        params: {
            searchQuery
        }
    });

    dispatch({
        type: FETCH_TAGS,
        payload: res.data
    });
};

export const loginUser = ({ email, password }) => async dispatch => {
    let res;
    try {
        res = await stackoverflow.post('/auth/login', {
            email,
            password
        });
        localStorage.setItem('token', res.data.access_token);
        stackoverflow.defaults.headers[
            'Authorization'
        ] = `Bearer ${res.data.access_token}`;
        dispatch({
            type: USER_LOGGED_IN_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        alertify.error(error);
        dispatch({
            type: USER_LOGGED_IN_FAIL
        });
    }
};

export const registerUser = ({ email, name, password }) => async dispatch => {
    let res;

    try {
        res = await stackoverflow.post('/register', {
            email,
            name,
            password
        });
        localStorage.setItem('token', res.data.access_token);
        stackoverflow.defaults.headers[
            'Authorization'
        ] = `Bearer ${res.data.access_token}`;
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        });
    } catch {
        dispatch({
            type: USER_REGISTER_FAIL
        });
    }
};
