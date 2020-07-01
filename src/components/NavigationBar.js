import React, { Component } from "react";
import ConAxLogo from "../elements/ConAxLogo.js";
import CNavButton from "../elements/CNavButton.js";
import CAvatar from "../elements/CAvatar.js";
import DataManager from "../utils/DataManager.js";
import Util from "../utils/Util.js";
import Dropdown from "react-bootstrap/Dropdown";
import format from "string-format";
import { NavLink } from "react-router-dom";

class NavigationBar extends Component {
  _mount = false;
  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
      user: { name: "Conax" },
    };

    this.full = true;

    if (this.props.staticPage) this.full = false;

    this.testCounterInterval = null;
    this.testCounter = this.testCounter.bind(this);

    this.handleAction = this.handleAction.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentDidMount() {
    this._mount = true;
    const user = DataManager.getCookieObject("conax-user");

    if (!Util.isEmpty(user)) {
      if (Util.isEmpty(user.firstname) && Util.isEmpty(user.lastname))
        user.name = user.email;
      else {
        user.name = format("{0} {1}", user.firstname, user.lastname);
      }

      this.setState({ user: user });
    }

    // this.testCounter();
  }

  componentWillUnmount() {
    this._mount = false;
    clearInterval(this.testCounterInterval);
  }

  testCounter() {
    const me = this;
    this.testCounterInterval = setInterval(function () {
      me.state.counter += 1;
      if (me.state.counter >= 100) me.state.counter = 1;
      me.setState({ counter: me.state.counter });
    }, 1000);
  }

  handleMenu(e, target) {
    e.preventDefault();
    switch (target) {
      case "default":
        this.props.switchPath(target);
        break;
      default:
        this.props.switchPage(target);
    }
  }

  handleAction(e, action) {
    e.preventDefault();

    if (this.props.hasOwnProperty("openModal")) this.props.openModal(action);
    else console.log("[NavigationBar:handleAction]", action);
  }

  renderUser() {
    if (this.state.user.hasOwnProperty("image_profile")) {
      return (
        <NavLink to={"/userprofile?id=" + this.state.user.id}>
          <CAvatar
            width="40"
            height="40"
            type="round"
            file={this.state.user["image_profile"]}
            alt={format(
              "{0} {1}",
              this.state.user.firstname,
              this.state.user.lastname
            )}
            className="ml-1 d-inline-block"
            cursor="pointer"
          />
        </NavLink>
      );
    } else {
      return (
        <CNavButton
          type="circle"
          icon="user"
          onClick={(e) => this.handleAction(e, "userprofile")}
          className="ml-1"
        />
      );
    }
  }

  render() {
    return (
      <nav className="conax-nav --top">
        <div className="container py-2 px-0">
          <div className="d-flex no-gutters align-items-center px-3">
            <div className="col-lg-2 col-md-3 col-sm-12">
              <div className="mr-2 d-sm-inline-block d-xl-none">
                <ConAxLogo
                  type="logo"
                  width="42"
                  cursor="pointer"
                  onClick={(e) => this.handleMenu(e, "default")}
                />
              </div>
              <div className="mr-2 d-xl-inline-block d-none">
                <ConAxLogo
                  type="logo+text"
                  width="130"
                  cursor="pointer"
                  onClick={(e) => this.handleMenu(e, "default")}
                />
              </div>
            </div>
            {this.full ? (
              <>
                <div className="flex-fill">
                  <CNavButton
                    type="text"
                    text="Targeting & Analytics"
                    onClick={(e) => this.handleAction(e, "targeting&analytics")}
                    className="ml-1 d-xl-inline-block d-none"
                  />
                  <CNavButton
                    type="text"
                    text="Creative Networks"
                    onClick={(e) => this.handleAction(e, "creative-networks")}
                    className="ml-1 d-xl-inline-block d-none"
                  />
                  <CNavButton
                    type="text"
                    text="Notifications"
                    onClick={(e) => this.handleAction(e, "notifications")}
                    className="ml-1 d-xl-inline-block d-none"
                  />
                </div>
                <div
                  className="flex-fill text-right"
                  style={{ minWidth: "100px" }}
                >
                  <div className="form-group d-inline-flex mb-0 mr-md-4 mr-2">
                    <input
                      id="conax-search-input"
                      type="text"
                      placeholder="Search"
                      className="form-control"
                    />
                  </div>
                  {this.renderUser()}
                  <Dropdown className="conax-nav-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <CNavButton
                        type="circle"
                        icon="dots"
                        className="ml-md-3 ml-2"
                        button={false}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight className="mt-3">
                      <Dropdown.Item
                        className="font-600 py-2 d-block d-md-none"
                        href="#new-project"
                        onClick={(e) => this.handleAction(e, "user")}
                      >
                        {this.state.user.name}
                      </Dropdown.Item>
                      <Dropdown.Divider className="d-block d-md-none" />
                      <Dropdown.Item
                        className="font-600 py-2 text-curious-blue d-block d-xl-none"
                        href="#targeting"
                        onClick={(e) =>
                          this.handleAction(e, "targeting&analytics")
                        }
                      >
                        Targeting & Analytics
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2 text-curious-blue d-block d-xl-none"
                        href="#creative-networks"
                        onClick={(e) =>
                          this.handleAction(e, "creative-networks")
                        }
                      >
                        Creative Networks
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2 text-curious-blue d-block d-xl-none"
                        href="#notifications"
                        onClick={(e) => this.handleAction(e, "notifications")}
                      >
                        Notifications
                      </Dropdown.Item>
                      <Dropdown.Divider className="d-block d-xl-none" />
                      <Dropdown.Item
                        className="font-600 py-2"
                        href="#settings"
                        onClick={(e) => this.handleMenu(e, "settings")}
                      >
                        ConAx Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2"
                        href="#networks"
                        onClick={(e) => this.handleMenu(e, "networks")}
                      >
                        Creative Networks
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2"
                        href="#analytics"
                        onClick={(e) => this.handleMenu(e, "analytics")}
                      >
                        Targeting and analytics
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2"
                        href="#privacy"
                        onClick={(e) => this.handleMenu(e, "privacy")}
                      >
                        Privacy and Terms
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="font-600 py-2"
                        href="#logout"
                        onClick={(e) => this.handleMenu(e, "logout")}
                      >
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
