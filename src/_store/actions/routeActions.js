import * as actionTypes from '../constants/actionTypes';
import axios from 'axios';

export const fetchRoute = (current_page, sorted_column, order, per_page, keyword = '') => {
	return dispatch => {
		return new Promise ((resolve, reject) => {
			const url = 'route/permissions';
			let fetchUrl = `${url}/?page=${current_page}&column=${sorted_column}&order=${order}&per_page=${per_page}&search=${keyword}`;
			axios.get(fetchUrl)
				.then(response => {
					resolve(response);
					dispatch({
						type: actionTypes.SUCCESS_FETCH_ROUTE,
						data: response.data,
						search: keyword,
						resp: response.statusText
					})
				})
				.catch(error => {
					const response = typeof(error.response !== 'object') ? {} : error.response;
					reject(response);
					dispatch({ type: actionTypes.FAIL_FETCH_ROUTE, response: response })
				});
		})
	}
}