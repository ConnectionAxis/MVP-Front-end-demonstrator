import React, { Component } from "react";
import ConAxLogo from "../elements/ConAxLogo.js";

class LoadPage extends Component {
  render() {
    return (
      <div className="screen bg-curious-blue d-flex align-items-center">
        <div className="mx-auto c-loading--fade">
          <ConAxLogo type="large" width="350" color="white" />
        </div>
      </div>
    );
  }
}

export default LoadPage;
