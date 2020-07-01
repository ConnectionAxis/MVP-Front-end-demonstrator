import React, { Component } from "react";
import DataManager from "../../../utils/DataManager.js";
import Form from "react-bootstrap/Form";
import PinCheckbox from "../../../elements/PinCheckbox.js";
import LoadingMask from "../../../components/LoadingMask.js";
import ModalConfirm from "../../../components/ModalConfirm.js";

class Account extends Component {
  _mount = false;
  constructor(props) {
    super(props);

    const user = DataManager.getCookieObject("conax-user");

    this.state = {
      erEmail: false,
      user: user,
      loading: true,
      modal: false,
      confirm: {},
    };

    this.inputChange = this.inputChange.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.confirmAction = this.confirmAction.bind(this);
  }

  componentDidMount() {
    this._mount = true;
    const me = this;
    setTimeout(() => {
      me.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    this._mount = false;
  }

  inputChange(e, field) {
    const value = e.target.value;
    e.preventDefault();

    switch (field) {
      case "input-email":
        var user = this.state.user.email;
        user.email = value;
        this.setState({ user: user });
        break;
      default:
    }
  }

  updateSettings(e, action) {
    const me = this;
    me.setState({ loading: true });
    setTimeout(() => {
      me.setState({ loading: false });
    }, 1000);
  }

  confirmAction(e, action) {
    var message = "";

    switch (action) {
      case "deactivate":
        message = "Are you sure - deactivate ConAx account?";
        break;
      case "delete":
        message =
          "Your ConAx account will be deleted, do you want to continue?";
        break;
      default:
    }

    this.setState(
      {
        modal: true,
        confirm: {
          action: action,
          title: "Account settings",
          message: message,
        },
      },
      () => {
        this._modal.show();
      }
    );
  }

  onConfirm(action, confirm) {
    console.log("[onConfirm]", action, confirm);
  }

  render() {
    return (
      <div className="input-form px-md-3">
        <h1 className="h4 font-600 mb-3">Account settings</h1>
        <div className="form-group mb-3">
          <label htmlFor="input-email">Email address</label>
          <label
            className={"input-label " + (this.state.erEmail ? "" : "hide")}
          >
            Required *
          </label>
          <Form.Control
            type="email"
            id="input-email"
            placeholder="Enter email"
            value={this.state.user.email}
            onChange={(e) => this.inputChange(e, "input-email")}
          />
        </div>
        <div className="form-group mb-2 py-3">
          <button
            className="c-btn c-btn-default c-btn-round c-btn-animated"
            onClick={(e) => this.inputChange(e, "change-password")}
          >
            Change your password
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control as="select">
                <option>Russian Federation</option>
                <option>Poland</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-6 col-sm-12">
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control as="select">
                <option>English</option>
                <option>Russian</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <Form.Group className="mb-4">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select">
            <option>Male</option>
            <option>Female</option>
            <option>Custom</option>
          </Form.Control>
        </Form.Group>
        <div>
          <h3 className="h5 font-600 mb-2">Login options</h3>
          <p className="mb-2">
            Use your third-party accounts to log in to ConAx
          </p>
          <PinCheckbox className="py-2" label="Facebook" />
          <PinCheckbox className="py-2" label="Google" />
          <PinCheckbox className="py-2" label="Slack" />
        </div>
        <hr className="my-4" />
        <div className="mb-1">
          <h3 className="h5 font-600 mb-2">Search history</h3>
          <PinCheckbox className="py-2" label="Clean Recent Searches" />
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="h5 font-600 mb-3">Account</h3>
          <div>
            <button
              className="c-btn c-btn-default c-btn-round c-btn-animated mr-3 mb-3"
              onClick={(e) => this.confirmAction(e, "deactivate")}
            >
              Deactivate account
            </button>
            <button
              className="c-btn c-btn-default c-btn-round c-btn-animated mb-3"
              onClick={(e) => this.confirmAction(e, "delete")}
            >
              Delete account
            </button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4 text-right">
          <button
            className="c-btn c-btn-default c-btn-round c-btn-animated mr-3 mb-3"
            onClick={(e) => this.updateSettings(e, "reset")}
          >
            Cancel
          </button>
          <button
            className="c-btn c-btn-round c-btn-animated mb-3"
            onClick={(e) => this.updateSettings(e, "save")}
          >
            Save Settings
          </button>
        </div>
        {this.state.loading && <LoadingMask />}
        {this.state.modal && (
          <ModalConfirm
            ref={(modal) => {
              this._modal = modal;
            }}
            confirm={this.state.confirm}
            onConfirm={this.onConfirm}
          />
        )}
      </div>
    );
  }
}

export default Account;
