import {combineReducers} from 'redux';

import authReducer from './reducers/authReducers';
import routesReducer from './reducers/routeReducers';
import {reducer as toastrReducer} from 'react-redux-toastr';


const rootReducer = combineReducers({
    auth: authReducer,
    routeMaster: routesReducer,
    toastr: toastrReducer,
});

export default rootReducer;