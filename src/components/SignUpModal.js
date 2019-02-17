import React, { Component } from 'react';
import Util from '../utils/Util.js';
import ConAxLogo from '../elements/ConAxLogo.js';
import Modal from 'react-bootstrap/Modal';

class SignUpModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
      showModal: false,
			signEmail: '',
			signPassword: '',
			signPassword2: '',
			erEmail: false,
			erPassword: false,
			erPassword2: false,
			erMsg: ''
    }

		this.formSubmit = this.formSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	formSubmit(e) {
		e.preventDefault();

		this.formValidate(() => {
			console.log('[Valid Form]', this.state);
		});
	}

	formValidate(callback) {
		// Sign Password
		if( this.state.signPassword.length > 0 ) {
			if( this.state.signPassword.length > 8 ) {
				this.setState({ 'erPassword': false });
				if( this.state.signPassword2.length > 0 ) {
					if( this.state.signPassword === this.state.signPassword2 ) {
						this.setState({ 'erPassword2': false });
					} else {
						this.setState({ 'erPassword2': true, 'erMsg': 'Passwords didn\'t match' });
					}
				} else {
					this.setState({ 'erPassword2': true });
				}
			} else {
				this.setState({ 'erPassword': true, 'erMsg': 'Weak password' });
			}
		} else {
			this.setState({ 'erPassword': true });
		}

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
			case 'signPassword2':
				this.setState({ 'erPassword2': !(value.length > 0), 'erMsg': '' });
				break;
			default:
				break;
		}

		this.setState({ [name]: value });
	}

	show() {
		// Clean up form on show
		this.setState({
			showModal: true,
			signEmail: '',
			signPassword: '',
			signPassword2: '',
			erEmail: false,
			erPassword: false,
			erPassword2: false,
			erMsg: '' })
	}

	hide() {
		this.setState({ showModal: false })
	}

	render() {
		return (
			<>
				<Modal show={this.state.showModal} onHide={this.hide} size="sm">
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">Sign Up</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-md-8 offset-md-2 col-10 offset-1 mb-4">
								<ConAxLogo type="logo+text" />
							</div>
						</div>
						<div className="sign-form">
							<form id="conax-sign-up">
								<div className="form-group">
									<label htmlFor="sign-up-email" className={"input-label "+(this.state.erEmail ? "" : "hide")}>Required *</label>
									<input
										value={this.state.signEmail}
										onChange={ev => this.inputChange('signEmail', ev)}
										id="sign-up-email"
										type="email"
										name="email"
										placeholder="Email"
										className="conax-sign-input form-control" />
								</div>
								<div className="form-group">
									<label htmlFor="sign-up-password" className={"input-label "+(this.state.erPassword ? "" : "hide")}>Required *</label>
									<input
										value={this.state.signPassword}
										onChange={ev => this.inputChange('signPassword', ev)}
										id="sign-up-password"
										type="password"
										name="password"
										placeholder="Password"
										className="conax-sign-input form-control" />
								</div>
								<div className="form-group">
									<label htmlFor="sign-up-password2" className={"input-label "+(this.state.erPassword2 ? "" : "hide")}>Required *</label>
									<input
										value={this.state.signPassword2}
										onChange={ev => this.inputChange('signPassword2', ev)}
										id="sign-up-password2"
										type="password"
										name="password2"
										placeholder="Confirm password"
										className="conax-sign-input form-control" />
								</div>
								<div id="sign-up-alert" className={"form-group text-center mb-n1 "+(this.state.erMsg.length > 0 ? "" : "hide")}>
									<label className="text-curious-blue">{this.state.erMsg}</label>
								</div>
								<div className="form-group text-center">
									<button className="c-btn c-btn-lg c-btn-round c-btn-animated px-5" onClick={this.formSubmit}>Sign Up</button>
								</div>
							</form>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className="text-center">
							<p>By signing up you indicate that you have read and agree to <a href="#conax" className="text-curious-blue c-link">ConAx Terms of Use</a> and <a href="#conax" className="text-curious-blue c-link">Privacy Policy</a></p>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default SignUpModal;