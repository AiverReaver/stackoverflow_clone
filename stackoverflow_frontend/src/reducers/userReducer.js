import {
    USER_LOGGED_IN_SUCCESS,
    USER_LOGGED_IN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGGED_IN,
    USER_NOT_LOGGED_IN,
    USER_LOGOUT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    signed_in: false,
    access_token: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGGED_IN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                signed_in: true
            };

        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                signed_in: true
            };

        case USER_LOGGED_IN_FAIL:
            return {
                ...state,
                access_token: null,
                signed_in: false
            };

        case USER_REGISTER_FAIL:
            return {
                ...state,
                access_token: null,
                signed_in: false
            };

        case USER_LOGGED_IN:
            return {
                ...state,
                access_token: action.payload,
                signed_in: true
            };

        case USER_NOT_LOGGED_IN:
            return {
                ...state,
                access_token: null,
                signed_in: false
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                access_token: null,
                signed_in: false
            };

        default:
            return state;
    }
};
