import React, { Component } from 'react';
import ResearchSpaces from './Default/ResearchSpaces.js';
import ResearchFrameworks from './Default/ResearchFrameworks.js';
import EditFramework from './Default/EditFramework.js';

export default class Default extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			active: "spaces",
			editFramework: false
		};

		this.openEditFramework = this.openEditFramework.bind(this);
	}

	componentDidMount() {
		this._mount = true;

		// TEST
		this.openEditFramework(true);
	}

	componentWillUnmount() {
  	this._mount = false;
  }

  switchTab(e, active) {
  	e.preventDefault();
  	this.setState({ active: active });
  }

  openEditFramework(newframework) {
  	this.setState({ editFramework: true }, () => {
  		this._modal.show();
  	});
  }

  render() {
		return (
			<div className="row no-gutters h-100">
				<div className="col-lg-2 col-md-3 col-sm-12">
					<h1 className="h4 font-600 pt-3 px-3">Content</h1>
					<ul className="c-tab-nav --column nav flex-column">
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "spaces" ? "active" : "")} href="#spaces" onClick={(e) => this.switchTab(e, "spaces")}>My Research Spaces</a>
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "frameworks" ? "active" : "")} href="#frameworks" onClick={(e) => this.switchTab(e, "frameworks")}>My Frameworks</a>
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "call" ? "active" : "")} href="#call" onClick={(e) => this.switchTab(e, "call")}>Call to action</a>
					</ul>
				</div>
				<div className="col-lg-7 col-md-6 col-sm-12 pt-3 px-3 px-md-0">
					{this.state.active === "spaces" &&
						<ResearchSpaces openEditFramework={this.openEditFramework} />
					}
					{this.state.active === "frameworks" &&
						<ResearchFrameworks openEditFramework={this.openEditFramework} />
					}
					{this.state.active === "call" &&
						<>
							<div className="px-md-3">
								<h1 className="h4 font-600 text-curious-blue">Call to action</h1>
							</div>
						</>
					}
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12">
					<div className="pt-3 px-3 px-md-0">
						<h1 className="h4 font-600 text-curious-blue">Popular Frameworks</h1>
						<p className="mb-2">Discover and create research frameworks to empower operations research, stack and share your research activities.</p>
					</div>
				</div>
				{this.state.editFramework && <EditFramework ref={(modal) => {this._modal = modal;}} />}
			</div>
		);
	}
}