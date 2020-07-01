import React, { Component } from "react";
import ConAxLogo from "../elements/ConAxLogo.js";
import { NavLink } from "react-router-dom";

class Page404 extends Component {
  constructor(props) {
    super(props);

    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="screen bg-curious-blue d-flex align-items-center">
        <div className="mx-auto text-center">
          <div className="c-loading--fade mb-2" onClick={this.goHome}>
            <ConAxLogo
              type="large"
              width="250"
              color="white"
              cursor="pointer"
            />
          </div>
          <NavLink to="/" className="h5 text-white font-600 c-link">
            No route, come back
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Page404;
