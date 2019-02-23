import React, { Component } from 'react';
import ConAxLogo from '../elements/ConAxLogo.js';
import CNavButton from '../elements/CNavButton.js';
import DataManager from '../utils/DataManager.js';
import Util from '../utils/Util.js';
import Dropdown from 'react-bootstrap/Dropdown';

class NavigationBar extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			counter: 1,
			user: { name: 'Conax' }
		};

		this.testCounterInterval = null;
		this.testCounter = this.testCounter.bind(this);

		this.handleAction = this.handleAction.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
	}

  componentDidMount() {
  	this._mount = true;
  	const user = DataManager.getCookieObject('conax-user');
  	if( !Util.isEmpty(user) ) {
  		if( Util.isEmpty(user.name) )
  			user.name = user.email;

  		this.setState({ user: user });
  	}

  	this.testCounter();
  }

  componentWillUnmount() {
  	this._mount = false;
  	clearInterval(this.testCounterInterval);
  }

	testCounter() {
		const me = this;
		this.testCounterInterval = setInterval(function() {
				me.state.counter += 1;
				if( me.state.counter >= 100 )
					me.state.counter = 1;
				me.setState({ counter: me.state.counter });
			}, 1000);
	}

	handleMenu(e, target) {
		e.preventDefault();
		this.props.switchPage(target);
	}

	handleAction(e, action) {
		e.preventDefault();
		this.props.openModal(action);
	}

	render() {
		return (
			<nav className="conax-nav --top">
				<div className="container py-2 px-0">
					<div className="row no-gutters align-items-center">
						<div className="col-md-1 col-2">
							<div className="pl-md-3 pl-sm-1">
								<ConAxLogo type="logo" width="46" cursor="pointer" onClick={(e) => this.handleMenu(e, "default")}/>
							</div>
						</div>
						<div className="col-md-4 col-8">
							<div className="form-group mb-0">
								<input
									id="conax-search-input"
									type="text"
									placeholder="Search"
									className="form-control" />
							</div>
						</div>
						<div className="col-md-7 text-right">
							<CNavButton type="text" text="Create new Project" onClick={(e) => this.handleAction(e, "new-project")} className="ml-1"/>
							<CNavButton type="text" text="Create new Channel" onClick={(e) => this.handleAction(e, "new-channel")} className="ml-1"/>
							<CNavButton type="user" text={this.state.user.name} onClick={(e) => this.handleAction(e, "user")} className="ml-1"/>
							<CNavButton type="circle" icon="bell" onClick={(e) => this.handleAction(e, "notification")} className="ml-1" counter={this.state.counter}/>
							<Dropdown className="conax-nav-dropdown">
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									<CNavButton type="circle" icon="dots" className="ml-2" button={false}/>
								</Dropdown.Toggle>
								<Dropdown.Menu alignRight className="mt-3">
									<Dropdown.Item className="font-600 py-2" href="#settings" onClick={(e) => this.handleMenu(e, "settings")}>ConAx Settings</Dropdown.Item>
									<Dropdown.Item className="font-600 py-2" href="#networks" onClick={(e) => this.handleMenu(e, "networks")}>Creative Networks</Dropdown.Item>
									<Dropdown.Item className="font-600 py-2" href="#analytics" onClick={(e) => this.handleMenu(e, "analytics")}>Targeting and analytics</Dropdown.Item>
									<Dropdown.Item className="font-600 py-2" href="#privacy" onClick={(e) => this.handleMenu(e, "privacy")}>Privacy and Terms</Dropdown.Item>
									<Dropdown.Item className="font-600 py-2" href="#logout" onClick={(e) => this.handleMenu(e, "logout")}>Log out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>

				</div>
			</nav>
		);
	}
}

export default NavigationBar;