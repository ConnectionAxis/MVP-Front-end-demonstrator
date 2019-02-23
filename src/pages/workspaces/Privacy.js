import React, { Component } from 'react';
import LoadingMask from '../../components/LoadingMask.js';

export default class Privacy extends Component {
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
						<h1 className="h3 font-600 text-curious-blue mb-3">Privacy and Terms</h1>
						<p className="mb-2">Privacy and Terms content</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12 position-relative">
					<div className="p-3">
						<h1 className="h3 font-600 text-curious-blue mb-3">Side content</h1>
						<p className="mb-2">Privacy and Terms side content</p>
					</div>
					<LoadingMask />
				</div>
			</div>
		);
	}
}