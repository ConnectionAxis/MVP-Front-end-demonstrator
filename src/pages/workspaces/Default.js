import React, { Component } from 'react';
import LoadingMask from '../../components/LoadingMask.js';

export default class Default extends Component {
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
						<h1 className="h3 font-600 text-curious-blue">Default page main content</h1>
					</div>
					<LoadingMask />
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12 position-relative">
					<div className="p-3">
						<h1 className="h3 font-600 text-curious-blue">Side content</h1>
					</div>
					<LoadingMask />
				</div>
			</div>
		);
	}
}