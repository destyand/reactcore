import * as actionTypes from '../constants/actionTypes';
import {decrypt} from '../../_config/generate';

const initState = {
		user: ((localStorage.getItem("token") !== null) && (localStorage.getItem("token"))) ? localStorage.getItem("token") : null,
		isAdmin: ( (localStorage.getItem("isAdmin") !== null) && decrypt((localStorage.getItem("isAdmin"))) ) ? decrypt(localStorage.getItem("isAdmin")) : 'NO'
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SUCCESS_LOGIN_ACTION:
            return {...state, user: action.token, isAdmin: action.isAdmin}
        case actionTypes.FAIL_LOGIN_ACTION:
            return {user: null, isAdmin: 'NO'}
        case actionTypes.SUCCESS_LOGOUT_ACTION:
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            return {...state, user: null, isAdmin: 'NO'}
        case actionTypes.FAIL_LOGOUT_ACTION:
            return state
        default:
            return state
    }
}

export default authReducer;