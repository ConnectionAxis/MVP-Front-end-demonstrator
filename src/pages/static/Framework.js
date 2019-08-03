import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar.js';
import LoadingMask from '../../components/LoadingMask.js';
import CAvatar from '../../elements/CAvatar.js';
import ConAxLogo from '../../elements/ConAxLogo.js';
import DataManager from '../../utils/DataManager.js';
import Util from '../../utils/Util.js';
import format from 'string-format';
import Dropdown from 'react-bootstrap/Dropdown';
import CNavButton from '../../elements/CNavButton.js';
import { NavLink } from 'react-router-dom';

export default class Framework extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			error: false,
			data: {
				author: {},
				areas_research: '',
				areas_focus: '',
				categories: '',
				topics: '',
				inspired_research: '',
				inspired_framework: ''
			}
		}

		this.handleAction = this.handleAction.bind(this);
	}

  componentDidMount() {
  	this._mount = true;
  	if( !Util.isEmpty(this.props.id) ) {
  		DataManager.getObject(
  			'frameworks', this.props.id)
  			.then(data => {
  				console.log(data);
  				this.setState({ data: data, loading: false, error: false });
  			}, error => {
  				this.setState({ error: true, loading: false });
  			})
  	} else {
  		this.setState({ error: true, loading: false });
  	}
	}

  componentWillUnmount() {
  	this._mount = false;
  }

  handleAction(e, action) {
  	e.preventDefault();

  	console.log('[Framework:handleAction]', action);
  }

	getDate(dt) {
		if( !Util.isEmpty(dt) )
			return format("{0} days ago", Util.getDaysAgo(dt));
		else
			return "";
	}

	render() {
		const t = this.state.data;
		return (
			<>
				<NavigationBar
          staticPage={false}
					switchPath={this.props.switchPath} />
				<div className={`workspace --with-nav d-flex ${( this.state.error ) ? "align-items-center justify-content-center flex-column" : ""}`}>
					{ !this.state.error ?
						<div className="container px-0">
							<div className="row no-gutters h-100">
								<div className="col-lg-2 col-md-3 pt-3 pt-md-4 col-sm-12 px-3 px-md-0">
									{ !Util.isEmpty(t.id) ?
										<CAvatar width="190" height="190" file={format('{0}.png', t.id)} alt={t.id} className="mx-auto" />
										:
										<ConAxLogo type="logo" width="190" />
									}
									<p className="h6 font-600 mt-3">Research areas:</p>
									<ul className="pl-3">
										{ t.areas_research.split(",").map((f, i) => <li className="my-1 p-s" key={i}>{f}</li>) }
									</ul>

									<p className="h6 font-600 mt-3">Main focus areas:</p>
									<ul className="pl-3">
										{ t.areas_focus.split(",").map((f, i) => <li className="my-1 p-s" key={i}>{f}</li>) }
									</ul>

									<p className="h6 font-600 mt-3">Categories:</p>
									<ul className="pl-3">
										{ t.categories.split(",").map((f, i) => <li className="my-1 p-s" key={i}>{f}</li>) }
									</ul>
									<p className="h6 font-600 mt-3">Topics:</p>
									<ul className="pl-3">
										{ t.topics.split(",").map((f, i) => <li className="my-1 p-s" key={i}>{f}</li>) }
									</ul>
								</div>

								<div className="col-lg-7 col-md-6 col-sm-12 pt-3 pt-md-4 px-3 px-md-4">
									<h1 className="h4 font-600 mb-2">{t.title}</h1>
									<p className="my-0">
										uploaded by <span className="c-link text-curious-blue">{t.author.name}</span> at {t.author.organization} - {this.getDate(t.created)}
									</p>
									<p className="my-0">at Research space - <span className="c-link text-curious-blue">{t.research}</span></p>
									<div className="d-flex no-gutters align-items-center my-3">
										<div className="flex-fill">
											<div className="form-group my-0">
												<input
													type="text"
													placeholder="Add comment"
													className="form-control" />
											</div>
										</div>
										<div>
											<Dropdown className="conax-nav-dropdown">
												<Dropdown.Toggle variant="success" id="dropdown-basic">
													<CNavButton type="circle" icon="dots" className="ml-2" button={false}/>
												</Dropdown.Toggle>
												<Dropdown.Menu
													alignRight
													className="mt-2 py-0"
													style={{ minWidth: "250px", maxWidth: "300px" }}>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#addtoresearch"
														onClick={(e) => this.handleAction(e, "addtoresearch")}>
														Add to my Research Space</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#updateresearch"
														onClick={(e) => this.handleAction(e, "updateresearch")}>
														Update Research stack</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#mergeresearch"
														onClick={(e) => this.handleAction(e, "mergeresearch")}>
														Merge research stack</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#follow"
														onClick={(e) => this.handleAction(e, "follow")}>
														Follow</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#upvote"
														onClick={(e) => this.handleAction(e, "upvote")}>
														Upvote</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#share"
														onClick={(e) => this.handleAction(e, "share")}>
														Share</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#notify"
														onClick={(e) => this.handleAction(e, "notify")}>
														Notify about edits</Dropdown.Item>
													</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
								</div>

								<div className="col-lg-3 col-md-4 pt-3 pt-md-4 pb-4 col-sm-12 px-3 px-md-0">
									{ t.inspired_research.length > 0 ?
										<p>This framework is inspired by your Research space - <span className="c-link text-curious-blue">{t.inspired_research}</span></p> : null
									}
									{ t.inspired_framework.length > 0 ?
										<p>This framework is inspired by your Frameworks - <span className="c-link text-curious-blue">{t.inspired_framework}</span></p> : null
									}
								</div>
							</div>
						</div>
					:
						<>
							<h4>Framework is not found</h4>
							<NavLink to="/" className="text-curious-blue c-link">Go back to ConAx</NavLink>
						</>
					}

					{ this.state.loading ? <LoadingMask /> : null }
				</div>
			</>
		)
	}
}