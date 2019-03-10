import React, { Component } from 'react';
// import LoadingMask from '../../components/LoadingMask.js';

export default class Networks extends Component {
	_mount = false;
	// constructor(props) {
	// 	super(props);
	// }

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
						<h1 className="h3 font-600 text-curious-blue mb-3">Creative Networks</h1>
						<p className="mb-2">Creative Networks will integrate related frameworks and structure your activities to the research data stack.</p>
						<h3 className="h5 font-600 mb-3">Networking on ConAx</h3>
						<p className="mb-2">Networking structures your target space from your interests, requests, posts, and other activities. Customizes and tooling collected content with ConAx to collaborative work.</p>
						<p className="mb-3">Source (see more <a className="c-link" href="#privacy">Privacy Policy</a>)</p>
						<hr className="my-4" />
						<h3 className="h5 font-600 mb-3">Main Focus Areas</h3>
						<ul className="list-group list-group-flush mx-md-3 mx-sm-1">
							<li className="list-group-item border-top-0 font-600">STEM-Science, Technology, Engineering and Mathematic</li>
							<li className="list-group-item font-600">Humanities, Social Science and Art</li>
							<li className="list-group-item font-600">Business, Management and Accounting</li>
							<li className="list-group-item font-600">Education</li>
						</ul>
						<h3 className="h5 font-600 mt-4 mb-3">Activity</h3>
						<ul className="list-group list-group-flush mx-md-3 mx-sm-1">
							<li className="list-group-item border-top-0 font-600">Academia (University, Institute, Think-tank)</li>
							<li className="list-group-item font-600">Tech-enterprise (Tech-company, SME’s)</li>
							<li className="list-group-item font-600">Startup</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12 position-relative">
					<div className="p-3">
						<h1 className="h3 font-600 text-curious-blue mb-3">Open Source</h1>
						<p className="mb-2">When creating a channel or project on ConAx using the Quick Access function, you can set third-connections control to your channels or projects.</p>
					</div>
				</div>
			</div>
		);
	}
}