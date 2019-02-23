import React, { Component } from 'react';
import LoadingMask from '../../components/LoadingMask.js';

export default class Analytics extends Component {
	_mount = false;
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this._mount = true;
	}

	componentWillUnmount() {
  	this._mount = false;
  }

  render() {
		return (
			<div className="row no-gutters h-100">
				<div className="col-lg-9 col-md-8 col-sm-12 border-right position-relative">
					<div className="p-3">
						<h1 className="h3 font-600 text-curious-blue mb-3">Targeting and analytics</h1>
						<p className="mb-2">Import from notification inbox</p>
						<p className="mb-2">You can receive messages about activities in your projects and channels, as well as from related in real time.</p>
						<h3 className="h5 font-600 mb-3">Project mapping</h3>
						<p className="mb-2">Get flexible control to the project progress and data-flow regulation.</p>
						<p className="mb-3">Connect with frameworks </p>
					</div>
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12 position-relative">
					<div className="p-3">
						<h1 className="h3 font-600 text-curious-blue mb-3">Side content</h1>
						<p className="mb-2">You can receive messages about activities in your projects and channels, as well as from related in real time.</p>
					</div>
					<LoadingMask />
				</div>
			</div>
		);
	}
}