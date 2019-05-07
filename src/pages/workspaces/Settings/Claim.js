import React, { Component } from 'react';
import PinCheckbox from '../../../elements/PinCheckbox.js';
import LoadingMask from '../../../components/LoadingMask.js';

class Claim extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
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
			<div className="input-form px-md-3">
				<h1 className="h4 font-600 mb-3">Claim ConAx</h1>
				<div>
					<PinCheckbox
						className="py-2"
						label="Claim your social Networking" />
					<PinCheckbox
						className="py-2"
						label="Claim your ConAx Channels" />
					<PinCheckbox
						className="py-2"
						label="Featured Logo" />
					<PinCheckbox
						className="py-2"
						label="Early access to tools" />
				</div>
				<hr className="my-4" />
				<div className="mb-4 text-right">
					<button className="c-btn c-btn-default c-btn-round c-btn-animated mr-3 mb-3" onClick={(e) => this.updateSettings(e, "reset")}>Cancel</button>
					<button className="c-btn c-btn-round c-btn-animated mb-3" onClick={(e) => this.updateSettings(e, "save")}>Save Settings</button>
				</div>
				{ this.state.loading ? <LoadingMask /> : null }
			</div>
		);
	}
}

export default Claim;