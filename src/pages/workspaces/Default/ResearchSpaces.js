import React, { Component } from 'react';
import DataManager from '../../../utils/DataManager.js';
import Util from '../../../utils/Util.js';
import LoadingMask from '../../../components/LoadingMask.js';
import ResearchTopic from './ResearchTopic.js';
import ResearchReport from './ResearchReport.js';

export default class ResearchSpaces extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showbadge: false,
			loading: true,
			topics: [],
			showReportModal: false
		};

		this.closeJumbotron = this.closeJumbotron.bind(this);
		this.topicAction = this.topicAction.bind(this);
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
			'research_topics',
			[]).then(data => {
				if( !Util.isEmpty(data) ) {
					var topics = data;
					Util.eachInArray(data, (topic, i, last) => {
						topic.author.get().then(user => {
							topics[i]['author'] = user.data();
							if( last ) {
								this.setState({ topics: topics, loading: false });
							}
						});
					});
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
			default:
		}
	}

	listData() {
		return this.state.topics.map(t => <ResearchTopic key={t.id} data={t} onAction={this.topicAction} />);
	}

	render() {
		return (
			<div className="px-md-3">
				{this.state.showbadge === true &&
					<>
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
					</>
				}

				<h1 className="h4 font-600 text-curious-blue mb-3">Research Spaces</h1>
				<div className="research-spaces-list">
					{ this.listData() }
				</div>

				{ this.state.loading ? <LoadingMask /> : null }
				{ this.state.showReportModal && <ResearchReport  ref={(reportModal) => {this._reportModal = reportModal;}} report={this.state.report} onReport={this.onReport} /> }
			</div>
		);
	}
}