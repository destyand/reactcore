import * as actionTypes from '../constants/actionTypes';

const initState = {
	routes: {},
	response: '',
	search: '',
}

const routesReducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.SUCCESS_FETCH_ROUTE: 
			return {...state, routes: action.data, search: action.search, response: action.resp}
		case actionTypes.FAIL_FETCH_ROUTE:
			return {...state, response: action.resp}
		default:
			return state
	}
}

export default routesReducer;