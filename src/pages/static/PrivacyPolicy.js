import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar.js';
import { NavLink } from 'react-router-dom';

export default class PrivacyPolicy extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<>
				<NavigationBar
          staticPage={true}
					switchPath={this.props.switchPath} />
				<div className="workspace --with-nav d-flex">
					<div className="container px-0">
						<div className="row no-gutters h-100">
							<div className="col-lg-9 col-md-8 col-sm-12 border-right position-relative">
								<div className="p-3">
									<h1 className="h4 font-600 text-curious-blue mb-3">ConAx Privacy Policy</h1>
									<p className="mb-2">Privacy and Terms content</p>
								</div>
							</div>
							<div className="col-lg-3 col-md-4 col-sm-12 position-relative">
								<div className="p-3">
									<p className="mb-2"><NavLink to="/terms" className="text-curious-blue c-link">ConAx Terms of Use</NavLink></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}