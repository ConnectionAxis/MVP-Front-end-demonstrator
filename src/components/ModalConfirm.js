import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Util from "../utils/Util.js";

/*
 	Base usage:

 	this.setState({
		modal: true,
		confirm: {
			action: action,
			title: 'Account settings',
			message: message
		}
	}, () => {
		this._modal.show();
	});

	onConfirm(action, confirm) {
		> action
		> confirm: true/false
	}

 	<ModalConfirm
 		ref={(modal) => {this._modal = modal;}}
 		confirm={this.state.confirm}
 		onConfirm={this.onConfirm} />
 */

class ModalConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      title: "",
      message: "",
      size: "sm",
      ok: "Ok",
      cancel: "Cancel",
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.procced = this.procced.bind(this);
  }

  show() {
    var title = "ConAx Confirm";
    var message = "Confirm message";
    var size = this.state.size;
    var btnOk = this.state.ok;
    var btnCancel = this.state.cancel;

    if (!Util.isEmpty(this.props.confirm.title))
      title = this.props.confirm.title;

    if (!Util.isEmpty(this.props.confirm.message))
      message = this.props.confirm.message;

    if (!Util.isEmpty(this.props.confirm.size)) size = this.props.confirm.size;

    if (!Util.isEmpty(this.props.confirm.ok)) btnOk = this.props.confirm.ok;

    if (!Util.isEmpty(this.props.confirm.cancel))
      btnCancel = this.props.confirm.cancel;

    this.setState({
      showModal: true,
      title: title,
      message: message,
      size: size,
      ok: btnOk,
      cancel: btnCancel,
    });
  }

  hide() {
    this.setState({ showModal: false }, () => {
      if (typeof this.props.onConfirm === "function") {
        this.props.onConfirm(this.props.confirm.action, false);
      }
    });
  }

  procced(e, action) {
    e.preventDefault();
    this.setState({ showModal: false }, () => {
      if (typeof this.props.onConfirm === "function") {
        this.props.onConfirm(this.props.confirm.action, action === "ok");
      }
    });
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.showModal}
          onHide={this.hide}
          size={this.state.size}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-curious-blue font-600">
              {this.state.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center p-4">
              <p>{this.state.message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-right">
              <button
                className="c-btn c-btn-default c-btn-round c-btn-animated mr-3"
                onClick={(e) => this.procced(e, "cancel")}
              >
                {this.state.cancel}
              </button>
              <button
                className="c-btn c-btn-round c-btn-animated"
                onClick={(e) => this.procced(e, "ok")}
              >
                {this.state.ok}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalConfirm;
