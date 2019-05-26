import React, { Component } from 'react';
import ResearchFramework from './ResearchFramework.js';
import DataManager from '../../../utils/DataManager.js';
import Util from '../../../utils/Util.js';
import LoadingMask from '../../../components/LoadingMask.js';

export default class ResearchFrameworks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showEmptyMessage: false,
			loading: false,
			frameworks: []
		};

		this.closeEmptyMessage = this.closeEmptyMessage.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		DataManager.getObjects(
			'research_frameworks',
			[]).then(data => {
				if( !Util.isEmpty(data) ) {
					var frameworks = data;
					Util.eachInArray(data, (item, i, last) => {
						item.author.get().then(user => {
							frameworks[i]['author'] = user.data();
							if( last ) {
								this.setState({ frameworks: frameworks, loading: false, showEmptyMessage: false });
							}
						});
					});
				} else {
					console.log('[loadData] No data');
					this.setState({ loading: false, showEmptyMessage: true });
				}
			}, error => {
				console.log('[loadData] Error');
				this.setState({ loading: false, showEmptyMessage: true });
			});
	}

	closeEmptyMessage() {
		try {
			this.props.openEditFramework(true);
		} catch(e) {
			console.error(e);
		}

		this.setState({ showEmptyMessage: false });
	}

	render() {
		return (
			<div className="px-md-3">
				<h1 className="h4 font-600 text-curious-blue mb-3">Frameworks</h1>

				{this.state.showEmptyMessage === true &&
					<>
						<div className="jumbotron mb-3 py-4 text-center position-relative">
							<h2 className="h3 font-600">Do not yet have created Frameworks</h2>
							<p>A framework is a quick tool to collect and share content into your research spaces.</p>
							<button
								className="c-btn c-btn-round c-btn-animated"
								onClick={this.closeEmptyMessage}>
								Create new Framework
							</button>
						</div>
					</>
				}

				<div className="research-spaces-list">
					{ this.state.frameworks.map(t => <ResearchFramework key={t.id} data={t} />) }
				</div>

				{ this.state.loading ? <LoadingMask /> : null }
			</div>
		);
	}
}