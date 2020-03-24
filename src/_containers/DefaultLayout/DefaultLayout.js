import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Card, CardHeader, CardFooter, CardBody,
	CardTitle, CardText } from 'reactstrap';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {logoutAction, logoutResponse} from '../../_store/actions/authActions';
import classNames from 'classnames';

// sidebar nav config
import navigation from '../../_hoc/Nav';
// routes config
import routes from '../../_config/routes';

const DefaultSidebar = React.lazy(() => import('./DefaultSidebar'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Breadcrumb = React.lazy(() => import('../../_components/main/breadcrumb/Breadcrumb'));

class DefaultLayout extends Component {
  state = {
    isOpen: true
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  toggle(){
    this.setState({isOpen: !this.state.isOpen})
  }

	handleClick(e){
		e.preventDefault();
		this.props.logoutAction().then(resp => {
			toastr.success('Logout');
			this.props.logoutResponse({type: true});
		}).catch(error => {
			this.props.logoutResponse({type: false});
		})
	}

  render() {
    return (
      <div className="App wrapper">
        <Suspense fallback={this.loading()}>
            <DefaultSidebar menus={navigation} toggle={() => {this.toggle()}} isOpen={this.state.isOpen} />
        </Suspense>
            <Container fluid className={classNames('content', {'is-open': this.props.isOpen})}>
              <Suspense fallback={this.loading()}>
                  <DefaultHeader toggle={() => {this.toggle()}} isOpen={this.state.isOpen} logout={e=>this.handleClick(e)} />
                  <Suspense fallback={this.loading()}>
                  </Suspense>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          parent={route.parent}
                          render={props => { 
                            const crumbs = routes
                            // Get all routes that contain the current one.
                            .filter(({ path }) => props.match.path.includes(path))
                            .map(({ path, ...rest }) => ({
                              path: Object.keys(props.match.params).length
                                ? Object.keys(props.match.params).reduce(
                                  (path, param) => path.replace(
                                    `:${param}`, props.match.params[param]
                                  ), path
                                  )
                                : path,
                              ...rest
                            }));
                          // console.log(`Generated crumbs for ${props.match.path}`);
                          let header_tittle = null;
                          crumbs.map(({ name, path, parent }) => {
                            header_tittle = name;
                          });
                            return (
                              <div>
                                <Breadcrumb crumbs={crumbs} />
                                <Card>
                                  <CardHeader>{header_tittle}</CardHeader>
                                  <CardBody>
                                    <route.component {...props} />
                                  </CardBody>
                                  <CardFooter>&nbsp;</CardFooter>
                                </Card>
                              </div>
                          )
                        }} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/home" />
                  </Switch>
              </Suspense>
            </Container>
      </div>
    );
  }
}

const stateToProps = state => {
	return {
		isAuth: state.auth.user
	}
}

const dispatchToProps = dispatch => {
	return {
		logoutAction: payload => dispatch(logoutAction(payload)),
		logoutResponse: data => dispatch(logoutResponse(data))
	}
}
export default connect(stateToProps, dispatchToProps)(DefaultLayout);
