import React from 'react';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const LoginForm = props => {
	return (
		<Form onSubmit={ (e) => props.handleSubmit(e) }>
			<h1>Login</h1>
			<p className="text-muted">Sign In to your account</p>
			<InputGroup className="mb-3">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
						<i className="fa fa-user"></i>
					</InputGroupText>
				</InputGroupAddon>
				<Input type="text" placeholder="Username" name="username" autoComplete="username" onChange={(e) => props.handleChange(e)} />
			</InputGroup>
			<InputGroup className="mb-4">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
						<i className="fa fa-lock"></i>
					</InputGroupText>
				</InputGroupAddon>
				<Input type="password" placeholder="Password" name="password" autoComplete="current-password" onChange={(e) => props.handleChange(e)} />
			</InputGroup>
			<Row>
				<Col xs="6">
					<Button color="primary" className="px-4">
						<i className={ props.state.loading === false ? "ft-unlock" : "fa fa-spin fa-refresh" }></i>
						Login
					</Button>
				</Col>
				<Col xs="6" className="text-right">
					<Button color="link" className="px-0">Forgot password?</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default LoginForm;