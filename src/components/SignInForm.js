import React, { Component } from 'react';
import Util from '../utils/Util.js';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signEmail: '',
			signPassword: '',
			erEmail: false,
			erPassword: false,
			erMsg: ''
		};

		this.formSubmit = this.formSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();

		this.formValidate(() => {
			console.log('[Valid Form]', this.state);
		});
	}

	formValidate(callback) {
		// Sign Password
		this.setState({ 'erPassword': !(this.state.signPassword.length > 0) });

		// Sign Email
		if( this.state.signEmail.length > 0 ) {
			if( Util.validateEmail(this.state.signEmail) ) {
				this.setState({ 'erEmail': false });
			} else {
				this.setState({ 'erEmail': true, 'erMsg': 'Provide valid email address' });
			}
		} else {
			this.setState({ 'erEmail': true });
		}

		if( !this.state.erEmail && !this.state.erPassword ) {
			if( typeof(callback) === 'function' )
				callback();
		}
	}

	inputChange(name, ev) {
		const value = ev.target.value;

		switch(name) {
			case 'signEmail':
				this.setState({ 'erEmail': !(value.length > 0), 'erMsg': '' });
				break;
			case 'signPassword':
				this.setState({ 'erPassword': !(value.length > 0), 'erMsg': '' });
				break;
			default:
				break;
		}

		this.setState({ [name]: value });
	}

	render() {
		return (
			<div className="row">
				<div className="sign-form offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-10 offset-1">
					<form id="conax-sign-in">
						<div className="form-group">
							<label htmlFor="sign-in-email" className={"input-label "+(this.state.erEmail ? "" : "hide")}>Required *</label>
							<input
								value={this.state.signEmail}
								onChange={ev => this.inputChange('signEmail', ev)}
								id="sign-in-email"
								type="email"
								name="email"
								placeholder="Email"
								className="conax-sign-input form-control" />
						</div>
						<div className="form-group">
							<label htmlFor="sign-in-password" className={"input-label "+(this.state.erPassword ? "" : "hide")}>Required *</label>
							<input
								value={this.state.signPassword}
								onChange={ev => this.inputChange('signPassword', ev)}
								id="sign-in-password"
								type="password"
								name="password"
								placeholder="Password"
								className="conax-sign-input form-control" />
						</div>
						<div id="sign-in-alert" className={"form-group text-center mb-n1 "+(this.state.erMsg.length > 0 ? "" : "hide")}>
							<label className="text-curious-blue">{this.state.erMsg}</label>
						</div>
						<div className="form-group text-center">
							<button className="c-btn c-btn-lg c-btn-round c-btn-animated px-5" onClick={this.formSubmit}>Sign In</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignInForm;