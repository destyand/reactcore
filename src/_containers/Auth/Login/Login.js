import React from 'react';
import {connect} from 'react-redux'
import Aux from '../../../_hoc/Aux';
import {toastr} from 'react-redux-toastr';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import {loginAction, loginResponse} from '../../../_store/actions/authActions';
import {encrypt} from '../../../_config/generate';
// import { Link } from 'react-router-dom';

import './Login.css';

import LoginForm from './LoginForm/LoginForm';
import Background from '../../../_assets/images/2754227.jpg';
import favicon from '../../../_assets/images/logo.svg';


class Login extends React.Component {
	_isMounted = false;
	state = {
			username: null,
			password: null,
			error: false,
			errors: {},
			loading: false
	}

	handleChange = (e) => {
		if (this._isMounted) {
			if(this.state.errors[e.target.name]) {
					let errors = {...this.state.errors}
					delete errors[e.target.name];
					this.setState({
							[e.target.name] : e.target.value,
							errors
					})
			} else {
					this.setState({ [e.target.name] : e.target.value });
			}
		}
	}

	handleSubmit = (e) => {
			e.preventDefault();
			this.setState({loading: true});
			const payload = {username: this.state.username, password: this.state.password}
				this.props.loginAction(payload).then(response => {
						const {authorization} = response.headers;
						const isAdmin = response.data;
						var keyIsAdmin = '';
						// console.log(isAdmin);
						if(isAdmin.success === true) {
								keyIsAdmin = 'OK';
						} else {
								keyIsAdmin = 'NO';
						}
						localStorage.setItem('isAdmin', encrypt(keyIsAdmin));
						const dataDispatch = {type: true, authorization, keyIsAdmin};
						this.props.loginResponse(dataDispatch);
						if (this._isMounted) { 
							this.setState({loading: false});
						}
				}).catch(resp => {
						const dataDispatch = {type: false}
						const {message} = resp.response.data;
						if(typeof message === 'string') {
								toastr.warning('Login Failed', message);
						}
						this.props.loginResponse(dataDispatch);
						if (this._isMounted) {
							this.setState({
									error: true,
									errors: message  
							})
							this.setState({loading: false});
						}
				})
	}

	componentDidMount(){
		this._isMounted = true;
		if (this._isMounted) { 
			document.body.style.backgroundImage = `url(${Background})`;
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		document.body.style.backgroundImage = '';
  }

	render(){
		return (
			<Aux>
				<div className="app flex-row align-items-center">
					<Container>
						<Row className="justify-content-center">
							<Col md="8">
								<CardGroup>
									<Card className="p-4">
										<CardBody>
										<LoginForm 
											handleChange={this.handleChange}
											handleSubmit={this.handleSubmit}
											state={this.state}
										/>
										</CardBody>
									</Card>
									<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
										<CardBody className="text-center">
											<img src={favicon} alt="logo" />
											<div>
												<h2>Sign in</h2>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
													labore et dolore magna aliqua.</p>
											</div>
										</CardBody>
									</Card>
								</CardGroup>
							</Col>
						</Row>
					</Container>
				</div>
			</Aux>
		)
	}
}

const dispatchToProps = dispatch => {
	return {
		loginAction: (payload) => dispatch(loginAction(payload)),
		loginResponse: (data) => dispatch(loginResponse(data))
	}
}

export default connect(null, dispatchToProps)(Login);