import React, { Component } from 'react';
import DataManager from '../../../utils/DataManager.js';
import Util from '../../../utils/Util.js';
import LoadingMask from '../../../components/LoadingMask.js';
import Dropdown from 'react-bootstrap/Dropdown';
import ResearchTopic from './ResearchTopic.js';
import ResearchReport from './ResearchReport.js';

export default class ResearchSpaces extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showbadge: false,
			loading: true,
			topics: [],
			show: 'All',
			showReportModal: false
		};

		this.closeJumbotron = this.closeJumbotron.bind(this);
		this.topicAction = this.topicAction.bind(this);
		this.switchShow = this.switchShow.bind(this);
	}

	componentDidMount() {
		const user = DataManager.getCookieObject('conax-user');
		if( !Util.isEmpty(user) ) {
			if( user.hasOwnProperty('show_badge') && user['show_badge'] ) {
				this.setState({ showbadge: true });
			}
		}
		this.loadData();
	}

	closeJumbotron() {
		this.setState({ showbadge: false });
		var user = DataManager.getCookieObject('conax-user');
		if( !Util.isEmpty(user) ) {
			DataManager.updateObject('users', user.id, { show_badge: false })
			.then(userId => {
				DataManager.updateCookieObject('conax-user', { show_badge: false });
			});
		}
	}

	loadData() {
		DataManager.getObjects(
			'research_topics', [])
			.then(data => {
				if( !Util.isEmpty(data) ) {
					if( this.state.show !== 'All' ) {
						data = data.filter(i => i.views >= 40);
					}

					this.setState({ topics: data, loading: false });
				} else {
					console.log('[loadData] No data');
					this.setState({ loading: false });
				}
			}, error => {
				console.log('[loadData] Error');
				this.setState({ loading: false });
			});
	}

	onReport(object, report) {
		console.log('[ResearchSpaces:onReport]', object.id, report.title);
	}

	topicAction(action, data) {
		switch( action ) {
			case 'report':
				this.setState({ showReportModal: true, report: data }, () => { this._reportModal.show() });
				break;
			case 'newframework':
				try {
					this.props.openEditFramework(false);
				} catch(e) {
					console.error(e);
				}
				break;
			default:
		}
	}

	switchShow(e, value) {
		e.preventDefault();

		this.setState({ show: value, loading: true }, this.loadData);
	}

	render() {
		return (
			<div className="px-md-4">
				{this.state.showbadge === true &&
					<div className="jumbotron mb-3 py-4 text-center position-relative">
						<button
							type="button"
							className="close position-absolute"
							aria-label="Close"
							style={{top: 10, right: 15}}
							onClick={this.closeJumbotron}>
							<span aria-hidden="true">&times;</span>
						</button>
						<h2 className="h2 font-600">Create new Research Space</h2>
						<p>A research space is interconnected framework that routes tools and activities from deferent research areas to build an end-to-end pipeline process on your project. Check out some already posted research spaces like the one below.</p>
						<button
							className="c-btn c-btn-round c-btn-animated"
							onClick={this.closeJumbotron}>
							Create new Research Space
						</button>
					</div>
				}
				<div className="d-flex flex-row align-items-center mb-3">
					<div className="flex-fill">
						<h1 className="h4 font-600 text-curious-blue">Research Spaces</h1>
					</div>
					<div>
						<Dropdown className="conax-nav-dropdown">
							<Dropdown.Toggle>
								<div className="p-m text-base font-600">Show: {this.state.show}</div>
							</Dropdown.Toggle>
							<Dropdown.Menu alignRight className="mt-1">
								<Dropdown.Item className="font-600 py-2 d-block" href="#" onClick={(e) => this.switchShow(e, "All")}>All</Dropdown.Item>
								<Dropdown.Item className="font-600 py-2 d-block" href="#" onClick={(e) => this.switchShow(e, "Related")}>Related</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<div className="research-spaces-list">
					{ this.state.topics.map(t => <ResearchTopic key={t.id} data={t} onAction={this.topicAction} />) }
				</div>

				{ this.state.loading ? <LoadingMask /> : null }
				{ this.state.showReportModal && <ResearchReport  ref={(reportModal) => {this._reportModal = reportModal;}} report={this.state.report} onReport={this.onReport} /> }
			</div>
		);
	}
}