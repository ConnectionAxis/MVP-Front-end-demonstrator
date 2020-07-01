import React, { Component } from "react";
import DataManager from "../../../utils/DataManager.js";
import Form from "react-bootstrap/Form";
import LoadingMask from "../../../components/LoadingMask.js";
import CAvatar from "../../../elements/CAvatar.js";

export default class Profile extends Component {
  _mount = false;
  constructor(props) {
    super(props);

    const user = DataManager.getCookieObject("conax-user");

    this.state = {
      loading: true,
      user: user,
      erFirstname: false,
      erLastname: false,
      erActivity: false,
      erCorporate: false,
    };

    this.updateSettings = this.updateSettings.bind(this);
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

  updateSettings(e, action) {
    const me = this;
    me.setState({ loading: true });
    setTimeout(() => {
      me.setState({ loading: false });
    }, 1000);
  }

  render() {
    return (
      <div className="px-md-3">
        <h1 className="h4 font-600 mb-3">Profile settings</h1>

        <div className="d-md-flex mt-1 mb-1">
          <div className="text-center">
            <div className="img-thumbnail d-inline-block">
              <CAvatar
                width="190"
                height="190"
                file={this.state.user.image_profile}
                alt={this.state.user.id}
              />
            </div>
            <div>
              <button className="c-btn c-btn-default c-btn-round c-btn-animated mt-3">
                Edit
              </button>
            </div>
          </div>
          <div className="flex-fill pl-md-4 input-form">
            <div className="form-group mb-3">
              <label htmlFor="input-firstname">First name</label>
              <label
                className={
                  "input-label " + (this.state.erFirstname ? "" : "hide")
                }
              >
                Required *
              </label>
              <Form.Control
                type="text"
                id="input-firstname"
                placeholder="Enter firstname"
                value={this.state.user.firstname}
                onChange={(e) => this.inputChange(e, "input-firstname")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="input-lastname">Last name</label>
              <label
                className={
                  "input-label " + (this.state.erLastname ? "" : "hide")
                }
              >
                Required *
              </label>
              <Form.Control
                type="text"
                id="input-lastname"
                placeholder="Enter lastname"
                value={this.state.user.lastname}
                onChange={(e) => this.inputChange(e, "input-lastname")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="input-activity">Activity</label>
              <label
                className={
                  "input-label " + (this.state.erActivity ? "" : "hide")
                }
              >
                Required *
              </label>
              <Form.Control
                type="text"
                id="input-activity"
                placeholder="Enter activity"
                value={this.state.user.activity}
                onChange={(e) => this.inputChange(e, "input-activity")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="input-corporate">Corporate</label>
              <label
                className={
                  "input-label " + (this.state.erCorporate ? "" : "hide")
                }
              >
                Required *
              </label>
              <Form.Control
                type="text"
                id="input-corporate"
                placeholder="Enter corporate"
                value={this.state.user.corporate}
                onChange={(e) => this.inputChange(e, "input-corporate")}
              />
            </div>
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
      </div>
    );
  }
}
