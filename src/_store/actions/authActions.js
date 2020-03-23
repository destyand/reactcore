import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

export const loginAction = (payload) => {
	return dispatch => {
			return axios.post('login', payload)
	}
}

export const loginResponse = (response) => {
	return dispatch => {
			if(response.type) {
					dispatch({ type: actionTypes.SUCCESS_LOGIN_ACTION, token: response.authorization, isAdmin: response.keyIsAdmin });
					// window.location.reload();
			} else {
					dispatch({type: actionTypes.FAIL_LOGIN_ACTION});
			}
	}
}

export const logoutAction = (payload = {}) => {
	return dispatch => {
			return axios.post('logout', payload)
	}
}

export const logoutResponse = response => {
	return dispatch => {
			if(response.type) {
					dispatch({type: actionTypes.SUCCESS_LOGOUT_ACTION});
			} else {
					dispatch({type: actionTypes.FAIL_LOGOUT_ACTION});
			}
	}
}