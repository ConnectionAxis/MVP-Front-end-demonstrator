import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ResearchSpaces from './Default/ResearchSpaces.js';
import ResearchFrameworks from './Default/ResearchFrameworks.js';
import EditFramework from './Default/EditFramework.js';
import EditResearchSpace from './Default/EditResearchSpace.js';
import PopularFrameworks from './Default/PopularFrameworks.js';

export default class Default extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			active: "spaces",
			frameworks: "Related",
			frameworksFilter: ["contribuitors"],
			editFramework: false,
			editResearchSpace: false
		};

		this.openEditFramework = this.openEditFramework.bind(this);
		this.openEditResearchSpace = this.openEditResearchSpace.bind(this);
		this.switchFrameworks = this.switchFrameworks.bind(this);
	}

	componentDidMount() {
		this._mount = true;

		// TEST
		// this.openEditResearchSpace(true);
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
  		this.editFrameworkModal.show();
  	});
  }

  openEditResearchSpace() {
  	this.setState({ editResearchSpace: true }, () => {
  		this.editResearchSpaceModal.show();
  	});
  }

  switchFrameworks(e, value) {
  	e.preventDefault();

  	this.setState({ frameworks: value, frameworksFilter: (value === 'Related') ? ['contribuitors'] : ['contribuitors', 'desc'] });
  }

  render() {
		return (
			<div className="row no-gutters h-100">
				<div className="col-lg-2 col-md-3 col-sm-12">
					<h1 className="h4 font-600 pt-3 pt-md-4 px-3">Content</h1>
					<ul className="c-tab-nav --column nav flex-column">
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "spaces" ? "active" : "")} href="#spaces" onClick={(e) => this.switchTab(e, "spaces")}>My Research Spaces</a>
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "frameworks" ? "active" : "")} href="#frameworks" onClick={(e) => this.switchTab(e, "frameworks")}>My Frameworks</a>
						<a className={"nav-link pr-0 font-600 " + (this.state.active === "call" ? "active" : "")} href="#call" onClick={(e) => this.switchTab(e, "call")}>Call to action</a>
					</ul>
				</div>
				<div className="col-lg-7 col-md-6 col-sm-12 pt-3 pt-md-4 px-3 px-md-0">
					{this.state.active === "spaces" &&
						<ResearchSpaces openEditFramework={this.openEditFramework} />
					}
					{this.state.active === "frameworks" &&
						<ResearchFrameworks openEditFramework={this.openEditFramework} />
					}
					{this.state.active === "call" &&
						<>
							<div className="px-md-4">
								<h1 className="h4 font-600 text-curious-blue">Call to action</h1>
							</div>
						</>
					}
				</div>
				<div className="col-lg-3 col-md-4 col-sm-12">
					<div className="pt-3 pt-md-4 px-3 px-md-0">
						{this.state.active === "spaces" &&
							<>
								<div className="d-flex flex-row align-items-center mb-3">
									<div className="flex-fill">
										<h1 className="h4 font-600 text-curious-blue">Frameworks</h1>
									</div>
									<div>
										<Dropdown className="conax-nav-dropdown">
											<Dropdown.Toggle>
												<div className="p-m text-base font-600">{this.state.frameworks}</div>
											</Dropdown.Toggle>
											<Dropdown.Menu alignRight className="mt-1">
												<Dropdown.Item className="font-600 py-2 d-block" href="#" onClick={(e) => this.switchFrameworks(e, "Related")}>Related</Dropdown.Item>
												<Dropdown.Item className="font-600 py-2 d-block" href="#" onClick={(e) => this.switchFrameworks(e, "Popular")}>Popular</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
								<PopularFrameworks filter={this.state.frameworksFilter} />
								<button className="c-btn c-btn-round c-btn-default mb-4" onClick={(e) => this.switchTab(e, "frameworks")}>Go to Explore</button>
							</>
						}
						{this.state.active === "frameworks" &&
							<>
								<h1 className="h4 font-600 text-curious-blue mb-3">Top Rated Frameworks</h1>
								<PopularFrameworks filter={["contribuitors", "desc"]} />
							</>
						}
						{this.state.active === "call" &&
							<>
								<h1 className="h4 font-600 text-curious-blue">Popular Frameworks</h1>
								<p className="mb-2">Discover and create research frameworks to empower operations research, stack and share your research activities.</p>
								<hr/>
								<div className="mb-3">
									<button className="c-btn c-btn-round c-btn-animated" onClick={this.openEditResearchSpace}>Create Research Space</button>
								</div>
								<div>
									<button className="c-btn c-btn-round c-btn-animated" onClick={this.openEditFramework}>Create Framework</button>
								</div>
							</>
						}
					</div>
				</div>
				{this.state.editFramework && <EditFramework ref={(modal) => {this.editFrameworkModal = modal;}} />}
				{this.state.editResearchSpace && <EditResearchSpace ref={(modal) => {this.editResearchSpaceModal = modal;}} />}
			</div>
		);
	}
}