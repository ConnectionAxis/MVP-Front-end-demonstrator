import React, { Component } from 'react';
import Util from '../utils/Util.js';

class PinCheckbox extends Component {
  constructor(props) {
		super(props);
		this.elId = "";
		this.elCls = "";

		this.state = {
			check: false
		};

		if( Util.isEmpty(this.props.label) )
			this.props.label = "PinCheckbox";

		if( !Util.isEmpty(this.props.className) )
			this.elCls = this.props.className;

		if( Util.isEmpty(this.props.id) )
			this.elId = Util.uniqueValue();
		else
			this.elId = this.props.id;

		this.checkChange = this.checkChange.bind(this);
	}

	componentDidMount() {
		if( !Util.isEmpty(this.props.defaultChecked) ) {
			this.setState({ check: this.props.defaultChecked });
		}
	}

	checkChange(e) {
		this.setState({
			check: !this.state.check
		}, () => {
			if( !Util.isEmpty(this.props.onChange) ) {
				this.props.onChange(this.state.check);
			}
		});
	}

  render() {
		return (
			<div className={this.elCls + " pin-check d-flex justify-content-between align-items-center " + (this.state.check ? "checked" : "")}>
				<label
					className="c-link m-0 font-600"
					htmlFor={this.elId}>{this.props.label}</label>
				<div className="pin-check-wrap" onClick={this.checkChange}>
					<div className="pin-check-in"></div>
				</div>
				<input
					className="d-none"
					id={this.elId}
					type="checkbox"
					checked={this.state.check}
					onChange={(e) => this.checkChange(e)} />
			</div>
		);
	}
}

export default PinCheckbox;