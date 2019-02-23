import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import LoadingMask from '../components/LoadingMask.js';
import ModalDialog from '../components/ModalDialog.js';

import Default from './workspaces/Default.js';
import Networks from './workspaces/Networks.js';
import Analytics from './workspaces/Analytics.js';
import Privacy from './workspaces/Privacy.js';
import Settings from './workspaces/Settings.js';

class WorkSpace extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			page: "default",
			modal: false,
			modalType: ""
		}

		this.openModal = this.openModal.bind(this);
		this.switchPage = this.switchPage.bind(this);
		this.switchWorkspace = this.switchWorkspace.bind(this);
	}

	getStyles() {
		return { position: "relative" };
	}

	componentDidMount() {
		this._mount = true;
	}

	componentWillUnmount() {
  	this._mount = false;
  }

	switchPage(page) {
		switch(page) {
			case "logout":
				this.props.handleUser("logout");
				break;
			default:
				this.setState({ page: page });
		}
	}

	switchWorkspace() {
		switch(this.state.page) {
			case "settings":
				return <Settings />
			case "networks":
				return <Networks />
			case "analytics":
				return <Analytics />
			case "privacy":
				return <Privacy />
			default:
				return <Default />
		}
	}

	openModal(type) {
		this.setState({ modal: true, modalType: type }, () => {
			this._modal.show();
		});
	}

	render() {
		return (
			<>
				<NavigationBar
					switchPage={this.switchPage}
					openModal={this.openModal} />
				<div className="workspace --with-nav d-flex">
					<div className="container px-md-0">
						{this.switchWorkspace()}
					</div>
				</div>
				{this.state.modal && <ModalDialog ref={(modal) => {this._modal = modal;}} type={this.state.modalType} />}
			</>
		);
	}
}

export default WorkSpace;