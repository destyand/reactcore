import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DefaultLayout from './_containers/DefaultLayout/DefaultLayout';
import Login from './_containers/Auth/Login/Login';
import Aux from './_hoc/Aux';
import {userIsNotAuthenticatedRedir, userIsAdminRedir} from './_config/auth';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './App.css';


const Home = userIsAdminRedir(DefaultLayout);
const Auth = userIsNotAuthenticatedRedir(Login);

const loading = () => (<div className="animate animated fadeIn pt-3 text-center">Please Wait</div>)

class App extends React.Component {
    render() {
        return (
            <Aux>
                <BrowserRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                        <Route exact path="/login" name="Login Page" label="Login Page" render={props => <Auth {...props}/>} />
                        <Route path="/" name="Home" render={props => <Home {...props}/>}></Route>
                        </Switch>
                    </React.Suspense>
                </BrowserRouter>
            </Aux>
        )
    }
}

const stateToProps = state => {
    return {
        isAuth: state.auth.user !== null
    }
}

export default connect(stateToProps, null)(App);
