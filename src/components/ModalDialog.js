import React, { Component } from 'react';
import ConAxLogo from '../elements/ConAxLogo.js';
import Modal from 'react-bootstrap/Modal';

class ModalDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			title: ""
		};

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	show() {
		var title = "";
		switch(this.props.type) {
			case "new-project":
				title = "Create new Project";
				break;
			case "new-channel":
				title = "Create new Channel";
				break;
			case "user":
				title = "User Information";
				break;
			case "notification":
				title = "Notifications Information";
				break;
			default:
				title = "Modal Dialog";
		}

		this.setState({ showModal: true, title: title });
	}

	hide() {
		this.setState({ showModal: false })
	}

	render() {
		return (
			<>
				<Modal show={this.state.showModal} onHide={this.hide} size="lg">
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">{this.state.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="p-4">
							<div className="row">
								<div className="col-md-8 offset-md-2 col-10 offset-1 mb-4">
									<ConAxLogo type="logo+text" />
								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default ModalDialog;