import React, { Component } from 'react';

class Settings extends Component {
	_mount = false;
	constructor(props) {
		super(props);
		this.state = { active: "account" };
	}

	componentDidMount() {
		this._mount = true;
	}

	componentWillUnmount() {
  	this._mount = false;
  }

  switchSettings(e, active) {
  	e.preventDefault();
  	this.setState({ active: active });
  }

  render() {
		return (
			<div className="row no-gutters h-100">
				<div className="col-lg-2 col-md-3 col-sm-12 border-right">
					<ul className="c-tab-nav --column nav flex-column mt-3">
						<a className={"nav-link font-600 " + (this.state.active === "account" ? "active" : "")} href="#account" onClick={(e) => this.switchSettings(e, "account")}>Account settings</a>
						<a className={"nav-link font-600 " + (this.state.active === "profile" ? "active" : "")} href="#profile" onClick={(e) => this.switchSettings(e, "profile")}>Edit Profile</a>
						<a className={"nav-link font-600 " + (this.state.active === "claim" ? "active" : "")} href="#claim" onClick={(e) => this.switchSettings(e, "claim")}>Claim ConAx</a>
						<a className={"nav-link font-600 " + (this.state.active === "notification" ? "active" : "")} href="#notification" onClick={(e) => this.switchSettings(e, "notification")}>Notification inbox</a>
					</ul>
				</div>
				<div className="col-lg-7 col-md-6 col-sm-12 border-right pt-3 px-3">
					{this.state.active === "account" &&
						<>
							<h1 className="h3 font-600 text-curious-blue mb-3">Account settings</h1>
							<p className="mb-2">Email</p>
							<p className="mb-2">Change your password</p>
						</>
					}
					{this.state.active === "profile" &&
						<>
							<h1 className="h3 font-600 text-curious-blue mb-3">Edit profile</h1>
							<p className="mb-2">Photo</p>
							<p className="mb-2">First name / Last name</p>
							<p className="mb-2">Username</p>
						</>
					}
					{this.state.active === "claim" &&
						<>
							<h1 className="h3 font-600 text-curious-blue mb-3">Claim ConAx</h1>
							<p className="mb-2">Claim your social networking</p>
							<p className="mb-2">Claim your website</p>
							<p className="mb-2">Claim your ConAx Channels</p>
							<p className="mb-2">Featured Logo</p>
							<p className="mb-2">Early access to tools</p>
						</>
					}
					{this.state.active === "notification" &&
						<>
							<h1 className="h3 font-600 text-curious-blue mb-3">Notification Inbox</h1>
							<p className="mb-2">On ConAx</p>
							<p className="mb-2">Connect with Creative Networks</p>
							<p className="mb-2">Integrate your social networks</p>
						</>
					}
				</div>
				<div className="col-lg-3 col-md-3 col-sm-12"></div>
			</div>
		);
	}
}

export default Settings;