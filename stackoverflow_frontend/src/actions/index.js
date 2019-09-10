import alertify from 'alertifyjs';
import jwt from 'jsonwebtoken';

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
    USER_REGISTER_FAIL,
    POST_CREATED,
    USER_LOGGED_IN,
    USER_NOT_LOGGED_IN,
    USER_LOGOUT_SUCCESS,
    POST_COMMENT_CREATED
} from './types';

export const createPost = ({ title, description, tags }) => async dispatch => {
    await stackoverflow.post('/posts', {
        title,
        description,
        tags
    });

    dispatch({
        type: POST_CREATED
    });
};

export const createPostComment = ({ id, body }) => async (
    dispatch,
    getState
) => {
    const res = await stackoverflow.post(`/posts/${id}/comments`, {
        body
    });

    const { postsReducer } = getState();

    postsReducer.postDetail.data.comments.push(res.data.data);

    dispatch({
        type: POST_COMMENT_CREATED,
        payload: { ...postsReducer.postDetail }
    });
};

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

export const isLognedIn = () => async dispatch => {
    let decodedToken;
    let token = localStorage.getItem('token');

    if (localStorage.getItem('token') !== '') {
        decodedToken = jwt.decode(token, {
            complete: true
        });
    }
    if (!decodedToken) {
        dispatch({
            type: USER_NOT_LOGGED_IN
        });
    } else if (decodedToken.payload.exp < new Date().getTime() / 1000) {
        dispatch({
            type: USER_NOT_LOGGED_IN
        });
    } else {
        dispatch({
            type: USER_LOGGED_IN,
            payload: token
        });
    }
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
        alertify.success('Successfull logged in');
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

export const logoutUser = () => async dispatch => {
    const res = await stackoverflow.post('/logout');

    localStorage.removeItem('token');
    alertify.success(res.data.message);

    dispatch({
        type: USER_LOGOUT_SUCCESS
    });
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
        alertify.success('Successfull signed up');
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        });
    } catch {
        alertify.error('Something went wrong');
        dispatch({
            type: USER_REGISTER_FAIL
        });
    }
};
