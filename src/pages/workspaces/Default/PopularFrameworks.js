import React, { Component } from 'react';
import LoadingMask from '../../../components/LoadingMask.js';
import CAvatar from '../../../elements/CAvatar.js';
import DataManager from '../../../utils/DataManager.js';
import PopoverStickOnHover from '../../../utils/PopoverStickOnHover.js';
import Util from '../../../utils/Util.js';
import { NavLink } from 'react-router-dom';
import format from 'string-format';

export default class PopularFrameworks extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			filter: null,
			data: []
		}
	}

  componentDidMount() {
  	this._mount = true;

  	if( this.props.hasOwnProperty('filter') ) {
  		this.setState({ filter: this.props.filter }, this.loadData)
  	} else {
  		this.loadData();
  	}
	}

  componentWillUnmount() {
  	this._mount = false;
	}

	componentWillReceiveProps(newProps) {
		if( newProps.hasOwnProperty('filter') ) {
			this.setState({ loading: true, filter: newProps.filter }, this.loadData);
		}
	}

	loadData() {
		let order = this.state.filter;

  	DataManager.getObjects(
  		'frameworks', [], 2, order)
  		.then(data => {
  			if( !Util.isEmpty(data) ) {
					this.setState({ data: data, loading: false });
				} else {
					console.log('[loadData] No data');
					this.setState({ loading: false });
				}
  		}, error => {
				console.log('[loadData] Error');
				this.setState({ loading: false });
			})
	}

	getDate(dt) {
		if( !Util.isEmpty(dt) )
			return format("{0} days ago", Util.getDaysAgo(dt));
		else
			return "";
	}

	render() {
		return (
			<div className="position-relative" style={{minHeight: "150px" }}>
				{ this.state.data.map((f, i) =>
						<div className="mb-4" key={i}>
							<div className="d-flex mt-1 mb-1">
								<div>
									<CAvatar width="40" height="40" file={format('{0}.png', f.id)} alt={f.id} className="mt-1" />
								</div>
								<div className="flex-fill pl-2">
									<h6 className="font-600"><NavLink className="c-link" to={"/framework?id="+f.id}>{f.title}</NavLink></h6>
								</div>
							</div>
							<p className="my-0 p-s">
								uploaded by <span className="c-link text-curious-blue">{f.author.name}</span> at {f.author.organization} - {this.getDate(f.created)}
							</p>
							<p className="my-0 p-s">at Research space - <span className="c-link text-curious-blue">{f.research}</span></p>
							<div className="mt-1">
								<PopoverStickOnHover
									placement="bottom"
									className="popover-wide"
									content={
										<>
											<p className="mb-2">
												<span className="font-600">Research areas</span>:
												{ f.areas_research.split(",").map((r, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{r.trim()}</span>) }
											</p>
											<p className="mb-2">
												<span className="font-600">Main focus areas</span>:
												{ f.areas_focus.split(",").map((r, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{r.trim()}</span>) }
											</p>
											<p className="mb-2">
												<span className="font-600">Categories</span>:
												{ f.categories.split(",").map((c, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{c.trim()}</span>) }
											</p>
											<p className="mb-2">
												<span className="font-600">Topics</span>:
												{ f.topics.split(",").map((t, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{t.trim()}</span>) }
											</p>
										</>
									}>
									<span className="font-600 my-0 text-curious-blue c-link">Research stack</span>
								</PopoverStickOnHover>
								<p className="font-600 my-0">Contribuitors: +{f.contribuitors} <span className="text-curious-blue c-link">more</span></p>
							</div>
						</div>
					)
				}
				{ this.state.loading ? <LoadingMask /> : null }
			</div>
		)
	}
}