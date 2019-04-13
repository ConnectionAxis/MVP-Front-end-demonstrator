import React, { Component } from 'react';
import Util from '../utils/Util.js';
import ConAxLogo from '../elements/ConAxLogo.js';
import CNavButton from '../elements/CNavButton.js';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import DataManager from '../utils/DataManager.js';
import LoadingMask from '../components/LoadingMask.js';
import Social from '../components/Social.js';
import { NavLink } from 'react-router-dom';

export default class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			erFirstName: false,
			lastName: '',
			erLastName: false,
			corporate: '',
			erCorpoarate: false,
			activity: '',
			signEmail: '',
			erEmail: false,
			corporateEmail: '',
			erCorpoarateEmail: false,
			signPassword: '',
			signPassword2: '',
			erPassword: false,
			erPassword2: false,
			erMsg: '',
			accept: false,
			formDisable: false,
			loading: false,
			welcome: false
		}

		this.formSubmit = this.formSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);

		this.goHome = this.goHome.bind(this);
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
						const userData = {
							email: this.state.signEmail,
							hash: Util.getHash(this.state.signEmail, this.state.signPassword),
							admin: false,
							firstname: this.state.firstName,
							lastname: this.state.lastName,
							corporate: this.state.corporate,
							corporateemail: this.state.corporateEmail,
							activity: this.state.activity
						};
						DataManager.addObject('users', userData)
						.then(user => {
							this.setState({ 'loading': false, welcome: true });
							// Add new user and process to workspace
							DataManager.setCookieObject('conax-user', userData);
							setTimeout(() => {
								this.props.handleUser("login");
							}, 1000);
							console.log('[new user]', user, userData);
						}, error => {
							this.setState({ 'formDisable': false, erMsg: 'Sign Up server error', loading: false });
						});
					}
				}, error => {
					this.setState({ 'formDisable': false, erMsg: 'Sign Up error', loading: false });
				});
		});
	}

	formValidate(callback) {
		var valid = true;

		this.setState({ 'erMsg': '' });

		// Accept Terms & Privacy
		if( !this.state.accept ) {
			this.setState({ 'erMsg': 'Please, accept the Terms & Privacy policies' });
			valid = false;
		}

		// Sign Personal information
		if( this.state.firstName.length > 0 ) {
			this.setState({ 'erFirstName': false });
		} else {
			this.setState({ 'erFirstName': true });
			valid = false;
		}
		if( this.state.lastName.length > 0 ) {
			this.setState({ 'erLastName': false });
		} else {
			this.setState({ 'erLastName': true });
			valid = false;
		}

		// Sign Password
		if( this.state.signPassword.length > 0 ) {
			if( this.state.signPassword.length > 7 ) {
				this.setState({ 'erPassword': false });
				if( this.state.signPassword2.length > 0 ) {
					if( this.state.signPassword === this.state.signPassword2 ) {
						this.setState({ 'erPassword2': false });
					} else {
						this.setState({ 'erPassword2': true, 'erMsg': 'Passwords didn\'t match' });
						valid = false;
					}
				} else {
					this.setState({ 'erPassword2': true });
					valid = false;
				}
			} else {
				this.setState({ 'erPassword': true, 'erMsg': 'Weak password' });
				valid = false;
			}
		} else {
			this.setState({ 'erPassword': true });
			valid = false;
		}

		// Sign Email
		if( this.state.corporateEmail.length > 0 ) {
			if( Util.validateEmail(this.state.corporateEmail) ) {
				this.setState({ 'erCorpoarateEmail': false });
			} else {
				this.setState({ 'erCorpoarateEmail': true, 'erMsg': 'Provide valid Corporate Email address' });
				valid = false;
			}
		}

		if( this.state.signEmail.length > 0 ) {
			if( Util.validateEmail(this.state.signEmail) ) {
				this.setState({ 'erEmail': false });
			} else {
				this.setState({ 'erEmail': true, 'erMsg': 'Provide valid Email address' });
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
			case 'firstName':
				this.setState({ 'erFirstName': !(value.length > 0), 'erMsg': '' });
				break;
			case 'lastName':
				this.setState({ 'erLastName': !(value.length > 0), 'erMsg': '' });
				break;
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
		}

		if( name === 'accept' ) {
			this.setState({ [name]: ev.target.checked });
		} else {
			this.setState({ [name]: value });
		}
	}

	goHome(e) {
		e.preventDefault();
		this.props.handleUser("logout");
	}

	render() {
		return (
			<>
				<nav className="conax-nav --top">
					<div className="container py-2 px-0 position-relative">
						<div className="d-flex no-gutters align-items-center px-3">
							<div className="flex-fill text-center">
								<div className="text-sm-left text-md-center">
									<ConAxLogo className="d-inline-block" type="logo+text" width="160" cursor="pointer" onClick={(e) => this.goHome(e)}/>
								</div>
							</div>
							<div className="position-absolute pr-3" style={{ right: 0 }}>
								<CNavButton type="text" text="Sign In" onClick={(e) => this.goHome(e)} className="ml-1"/>
							</div>
						</div>
					</div>
				</nav>
				<div className="workspace --with-nav">
					<div className="container py-4">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-12 offset-0">
								<h1 className="h4 font-700 text-base text-center mt-3 mb-4">Create your profile on ConAx to quick connection with sustable frameworks.</h1>
								{this.state.welcome ? (
										<div className="text-center py-5">
											<h3 className="text-curious-blue font-600">Welcome!</h3>
											<h3 className="text-curious-blue c-link font-600" onClick={(e) => this.goHome(e)}>Ready for Sign In</h3>
										</div>
									) : (
										<div className="input-form text-base">
											<form id="conax-sign-up">
												<div className="form-group mb-1">
													<div className="row align-items-end no-gutters">
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<label htmlFor="sign-up-firstname" className="font-600">Personal</label>
															<div className="position-relative">
																<label htmlFor="sign-up-firstname" className={"input-label "+(this.state.erFirstName ? "" : "hide")}>Required *</label>
																<input
																	value={this.state.firstName}
																	onChange={ev => this.inputChange('firstName', ev)}
																	id="sign-up-firstname"
																	type="text"
																	name="firstname"
																	placeholder="First Name"
																	className="conax-sign-input form-control" />
															</div>
														</div>
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<label htmlFor="sign-up-lastname" className={"input-label "+(this.state.erLastName ? "" : "hide")}>Required *</label>
															<input
																value={this.state.lastName}
																onChange={ev => this.inputChange('lastName', ev)}
																id="sign-up-lastname"
																type="text"
																name="lastname"
																placeholder="Last Name"
																className="conax-sign-input form-control" />
														</div>
													</div>
												</div>
												<div className="form-group mb-1">
													<div className="row align-items-end no-gutters">
														<div className="col-12 px-2">
															<label htmlFor="sign-up-corporate" className="font-600 mr-1">Corporate</label>
															<OverlayTrigger placement="right" overlay={<Popover>Please enter your institutional details to optimisation search of your activities</Popover>}>
															  <span className="badge badge-info bg-curious-blue c-link px-2">i</span>
															</OverlayTrigger>
															<div className="position-relative">
																<label htmlFor="sign-up-corporate" className={"input-label "+(this.state.erCorpoarate ? "" : "hide")}>Required *</label>
																<input
																	value={this.state.corporate}
																	onChange={ev => this.inputChange('corporate', ev)}
																	id="sign-up-corporate"
																	type="text"
																	name="corporate"
																	placeholder="Name of Institute"
																	className="conax-sign-input form-control" />
															</div>
														</div>
													</div>
												</div>
												<div className="form-group mb-0">
													<div className="row align-items-end no-gutters">
														<div className="col-12 p-2">
															<label htmlFor="sign-up-activity" className="font-600">Activity/Sector</label>
															<select
																className="custom-select conax-sign-input form-control"
																value={this.state.activity}
																onChange={ev => this.inputChange('activity', ev)}>
																<option value="Academia">Academia</option>
																<option value="Enterprise">Enterprise</option>
																<option value="Startup">Startup</option>
																<option value="Organization/NCO">Organization/NCO</option>
															</select>
														</div>
													</div>
												</div>
												<div className="form-group mb-0">
													<div className="row align-items-end no-gutters">
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<label htmlFor="sign-up-email" className="font-600">Personal Email</label>
															<div className="position-relative">
																<label htmlFor="sign-up-email" className={"input-label "+(this.state.erEmail ? "" : "hide")}>Required *</label>
																<input
																	value={this.state.signEmail}
																	onChange={ev => this.inputChange('signEmail', ev)}
																	id="sign-up-email"
																	type="email"
																	name="email"
																	placeholder="Email Address"
																	className="conax-sign-input form-control" />
															</div>
														</div>
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<label htmlFor="sign-up-corporateemail" className="font-600 mr-1">Corporate Email</label>
															<OverlayTrigger placement="right" overlay={<Popover>Please use your corporate email as a quick way for us to verify that you're affilated with</Popover>}>
															  <span className="badge badge-info bg-curious-blue c-link px-2">i</span>
															</OverlayTrigger>
															<div className="position-relative">
																<label htmlFor="sign-up-corporateemail" className={"input-label "+(this.state.erCorpoarateEmail ? "" : "hide")}>Required *</label>
																<input
																	value={this.state.corporateEmail}
																	onChange={ev => this.inputChange('corporateEmail', ev)}
																	id="sign-up-corporateemail"
																	type="email"
																	name="corporateemail"
																	placeholder="Email Address"
																	className="conax-sign-input form-control" />
															</div>
														</div>
													</div>
												</div>
												<div className="form-group mb-1">
													<div className="row align-items-end no-gutters">
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<label htmlFor="sign-up-firstname" className="font-600">Password</label>
															<div className="position-relative">
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
														</div>
														<div className="col-md-6 offset-md-0 col-12 offset-0 p-2">
															<div className="position-relative">
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
														</div>
													</div>
												</div>
												<div className="form-group mt-2 mb-4">
													<div className="row align-items-end no-gutters">
														<div className="col-12 px-2">
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	checked={this.state.accept}
																	onChange={ev => this.inputChange('accept', ev)}
																	id="accept" />
																<label className="form-check-label" htmlFor="accept">
																	I agree to the <NavLink to="/terms" target="_blank" className="text-curious-blue c-link">Terms of use</NavLink> and acknowledge the <NavLink to="/privacy" target="_blank" className="text-curious-blue c-link">Privacy policy</NavLink>
																</label>
															</div>
														</div>
													</div>
												</div>

												<div id="sign-up-alert" className={"form-group text-center mb-1 "+(this.state.erMsg.length > 0 ? "" : "hide")}>
													<label className="text-curious-blue">{this.state.erMsg}</label>
												</div>
												<div className="form-group text-center">
													<button
														className="c-btn c-btn-lg c-btn-round c-btn-animated px-5"
														onClick={this.formSubmit}
														disabled={this.state.formDisable}>Continue</button>
												</div>
											</form>
											{ this.state.loading ? <LoadingMask /> : null }
										</div>
									)}
							</div>
						</div>
					</div>

					<footer className="conax-footer">
						<div className="bg-alto bd-silver bd-top bd-bottom py-4">
							<div className="container">
								<div className="row align-items-end">
									<div className="col-md-4 col-sm-12 text-sm-center text-md-left px-md-0">
										<div className="mb-3">
											<ConAxLogo type="conax" width="110" cursor="pointer" onClick={(e) => this.goHome(e)} />
										</div>
										<a href="#log-in" className="c-btn c-btn-round c-btn-animated" onClick={(e) => this.goHome(e)}>Request Demo ConAx</a>
									</div>
									<div className="col-md-5 col-sm-12 pt-4">
										<div className="row">
											<div className="col-6">
												<div className="text-sm-right text-md-left">
													<NavLink to="/privacy" className="text-base font-600">About ConAx</NavLink>
												</div>
												<div className="text-sm-right text-md-left">
													<NavLink to="/privacy" className="text-base font-600">Privacy Policy</NavLink>
												</div>
											</div>
											<div className="col-6">
												<div>
													<NavLink to="/terms" className="text-base font-600">Terms of Use</NavLink>
												</div>
												<div>
													<NavLink to="/terms" className="text-base font-600">Contact Us</NavLink>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-3 col-sm-12 pt-4 pb-md-2">
										<Social color="--white" />
									</div>
								</div>
							</div>
						</div>
						<div className="text-center py-3" style={{ fontSize: ".85rem" }}>Copyright © 2018 ConAx</div>
					</footer>
				</div>

			</>
		)
	}
}