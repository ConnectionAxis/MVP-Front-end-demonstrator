import React, { Component } from 'react';
import ConAxLogo from '../elements/ConAxLogo.js';
import SignInForm from '../components/SignInForm.js';
import SignUpModal from '../components/SignUpModal.js';
import Social from '../components/Social.js';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.showSignUp = this.showSignUp.bind(this);
		this.userLogin = this.userLogin.bind(this);
	}

	showSignUp(e) {
		e.preventDefault();
		this._modal.show();
	}

	userLogin(user) {
		this.props.handleUser("login");
	}

	render() {
		return (
			<div className="screen bg-gray-1">
				<div className="hero-card container align-items-center py-4">
					<div className="hero-card_image hero-card_item px-2">
						<div className="conax-logo-float conax-logo-float--t conax-logo-float--l mb-4 mt-md-4 ml-md-4">
							<ConAxLogo type="logo+text" width="180" />
						</div>
						<h2 className="h1 conax-caption font-700 text-curious-blue mt-md-5 mx-sm-2">
							ConAx unify communication space and optimize digital landscape across your research activities to promote data-driven science toward innovation.
						</h2>
					</div>
					<div className="hero-card_text hero-card_item py-4 px-2 pl-md-5">
						<div className="row">
							<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 mb-4">
								<ConAxLogo type="large" />
							</div>
						</div>
						<div className="mb-4">
							<SignInForm
								userLogin={this.userLogin} />
							<div className="form-group text-center">
								<a href="#sign-up" className="c-link font-600 text-curious-blue" onClick={this.showSignUp}>Sign Up</a>
							</div>
							<Social />
						</div>
					</div>
				</div>
				<SignUpModal ref={(modal) => {this._modal = modal;}} />
			</div>
		);
	}
}

export default LoginPage;