import React, { Component } from 'react';
import Util from '../utils/Util.js';
import ConAxLogo from '../elements/ConAxLogo.js';
import Modal from 'react-bootstrap/Modal';
import DataManager from '../utils/DataManager.js';
import LoadingMask from '../components/LoadingMask.js';
import { NavLink } from 'react-router-dom';

class SignUpModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
      showModal: false,
			signEmail: '',
			erEmail: false,
			erMsg: '',
			formDisable: false,
			loading: false,
			welcome: false
    }

		this.formSubmit = this.formSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	componentWillUnmount() {
		this.setState = (state,callback)=>{ return; };
	}

	formSubmit(e) {
		e.preventDefault();

		this.formValidate(() => {
			this.setState({ 'formDisable': true, loading: true });
			DataManager.getObjects(
				'users',
				[
					['email', '==', this.state.signEmail]
				])
				.then(data => {
					if( data[0] ) {
						this.setState({ 'formDisable': false, erMsg: 'Already signed up, try to sign in', loading: false });
					} else {
						this.props.showSignUpDetails(e, this.state.signEmail);
						this.hide();
					}
				}, error => {
					this.setState({ 'formDisable': false, erMsg: 'Sign Up error', loading: false });
				});
		});
	}

	formValidate(callback) {
		var valid = true;
		// Sign Email
		if( this.state.signEmail.length > 0 ) {
			if( Util.validateEmail(this.state.signEmail) ) {
				this.setState({ 'erEmail': false });
			} else {
				this.setState({ 'erEmail': true, 'erMsg': 'Provide valid email address' });
				valid = false;
			}
		} else {
			this.setState({ 'erEmail': true });
			valid = false;
		}

		if( valid ) {
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
			erEmail: false,
			erMsg: '',
			formDisable: false,
			loading: false,
			welcome: false })
	}

	hide() {
		this.setState({ showModal: false })
	}

	render() {
		return (
			<>
				<Modal show={this.state.showModal} onHide={this.hide} size="sm" centered>
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">Sign Up</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-md-8 offset-md-2 col-10 offset-1 mb-4">
								<ConAxLogo type="logo+text" />
							</div>
						</div>
						{this.state.welcome ? (
								<div className="text-center py-5">
									<h3 className="text-curious-blue font-600">Welcome!</h3>
									<h3 className="text-curious-blue c-link font-600" onClick={this.hide}>Ready for Sign In</h3>
								</div>
							) : (
								<div className="input-form">
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
										<div id="sign-up-alert" className={"form-group text-center mb-1 "+(this.state.erMsg.length > 0 ? "" : "hide")}>
											<label className="text-curious-blue">{this.state.erMsg}</label>
										</div>
										<div className="form-group text-center mt-4">
											<button
												className="c-btn c-btn-lg c-btn-round c-btn-animated px-5"
												onClick={this.formSubmit}
												disabled={this.state.formDisable}>Sign Up</button>
										</div>
									</form>
									{ this.state.loading ? <LoadingMask /> : null }
								</div>
							)}
					</Modal.Body>
					<Modal.Footer>
						<div className="text-center">
							<p>By signing up you indicate that you have read and agree to
								&nbsp;<NavLink to="/terms" className="text-curious-blue c-link">ConAx Terms of Use</NavLink> and
								&nbsp;<NavLink to="/privacy" className="text-curious-blue c-link">Privacy Policy</NavLink>
							</p>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default SignUpModal;