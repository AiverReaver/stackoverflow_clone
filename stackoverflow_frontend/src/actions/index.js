import stackoverflow from '../api';
import {
    FETCH_POSTS,
    FETCH_POST_DETAILS,
    USER_LOGGED_IN_SUCCESS,
    USER_LOGGED_IN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from './types';

export const fetchposts = page => async dispatch => {
    const res = await stackoverflow.get('/posts', {
        params: {
            page
        }
    });
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

export const loginUser = ({ email, password }) => async dispatch => {
    let res;
    try {
        res = await stackoverflow.post('/auth/login', {
            email,
            password
        });
        dispatch({
            type: USER_LOGGED_IN_SUCCESS,
            payload: res.data
        });
    } catch {
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
