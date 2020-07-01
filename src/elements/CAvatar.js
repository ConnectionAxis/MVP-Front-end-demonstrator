import React, { Component } from "react";
import format from "string-format";
import DataManager from "../utils/DataManager.js";
import LoadingMask from "../components/LoadingMask.js";

export default class CAvatar extends Component {
  constructor(props) {
    super(props);

    this.cls = "conax-avatar position-relative ";
    this.url = props.file;
    this.alt = props.alt;

    if (props.hasOwnProperty("type")) this.cls += format("{0} ", props.type);

    if (props.className) this.cls += format("{0} ", props.className);

    this.state = {
      src: "",
      alt: this.alt,
      cls: this.cls,
      loading: true,
    };

    this.elStyle = {
      width: this.props.width ? this.props.width + "px" : "auto",
      height: this.props.height ? this.props.height + "px" : "auto",
      cursor: this.props.cursor ? this.props.cursor : "default",
    };

    this.renderCAvatar();
  }

  renderCAvatar() {
    DataManager.getFileRef("profile", this.url)
      .getDownloadURL()
      .then((url) => {
        this.setState({ src: url, loading: false });
      })
      .catch((er) => {
        console.error(er);
      });
  }

  render() {
    const { onClick } = this.props;

    return (
      <div className={this.state.cls} onClick={onClick} style={this.elStyle}>
        {!this.state.loading ? (
          <img src={this.state.src} alt={this.state.alt} />
        ) : null}
        {this.state.loading ? <LoadingMask type="inner" /> : null}
      </div>
    );
  }
}
