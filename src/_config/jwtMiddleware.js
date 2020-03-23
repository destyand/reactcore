import axios from 'axios';

export default {
    setupInterceptors: store => {
        axios.interceptors.request.use(function (payload) {
            if(localStorage.getItem('token')) {
                payload.headers.authorization = 'bearer '+localStorage.getItem('token')
            }
            return payload;
        }, (error) => {
            return Promise.reject(error);
        })
        axios.interceptors.response.use(function (response) {
            if(response.headers.authorization) {
                const {authorization} = response.headers;
                localStorage.setItem('token', authorization)
            }
            return response
        }, function (error) {
            if(error.response.status === 401) {
                localStorage.removeItem('token')
                store.dispatch({type: 'SUCCESS_LOGOUT_ACTION'})
            }
            return Promise.reject(error);
        });
    },
    refresh: (store) => {
        const token = localStorage.getItem('token');
        if(token !== null && token !== undefined) {
            axios.post('refresh').then(resp => null).catch(error => {
                if(error.response.data.status === 'fails') {
                    localStorage.removeItem('token')
                    store.dispatch({type: 'SUCCESS_LOGOUT_ACTION'})
                }
            });
        }
    }
}