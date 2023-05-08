import { LOGIN, LOGOUT } from './types';
import { SERVER_IP } from '../../private'
import axios from 'axios';
const LOGIN_URL = `${SERVER_IP}/api/login`;

const finishLogin = (email, token) => {
    return {
        type: LOGIN,
        payload: {
            email,
            token,
        }
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        axios.post(LOGIN_URL, {
            email,
            password
        })
        .then(({data: response}) => {
            if (response.success) {
                dispatch(finishLogin(response.email, response.token));
            }
        })
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}