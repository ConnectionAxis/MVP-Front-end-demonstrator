import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar.js';
import LoadingMask from '../../components/LoadingMask.js';
import CAvatar from '../../elements/CAvatar.js';
import ConAxLogo from '../../elements/ConAxLogo.js';
import DataManager from '../../utils/DataManager.js';
import Util from '../../utils/Util.js';
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import CNavButton from '../../elements/CNavButton.js';
import format from 'string-format';

export default class ResearchSpace extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			error: false,
			data: {
				author: {},
				inspired: [],
				frameworks: [],
				categories: '',
				topics: ''
			}
		}

		this.handleAction = this.handleAction.bind(this);
	}

  componentDidMount() {
	this._mount = true;
	if( !Util.isEmpty(this.props.id) ) {
		DataManager.getObject(
			'research_topics', this.props.id)
			.then(data => {
				this.setState({ data: data, loading: false, error: false });
			}, error => {
				this.setState({ error: true, loading: false });
			})
	} else {
		this.setState({ error: true, loading: false });
	}
	}

	getDate(dt) {
		if( !Util.isEmpty(dt) )
			return format("{0} days ago", Util.getDaysAgo(dt));
		else
			return "";
	}

  componentWillUnmount() {
	this._mount = false;
  }

  handleAction(e, action) {
	e.preventDefault();

	console.log('[ResearchSpace:handleAction]', action);
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
									{ !Util.isEmpty(t.image_profile) ?
										<CAvatar width="190" height="190" file={t.image_profile} alt={t.id} className="mx-auto" />
										:
										<ConAxLogo type="logo" width="190" />
									}

									<p className="h6 font-600 mt-3">Frameworks:</p>
									<ul className="pl-3">
										{ t.frameworks.map((f, i) => <li className="my-1 p-s" key={i}><NavLink className="c-link" to={"/framework?id="+f.ref}>{f.title}</NavLink></li>) }
									</ul>

									<p className="h6 font-600">Categories:</p>
									<ul className="pl-3">
										{ t.categories.split(",").map((c, i) => <li className="mx-1 p-s" key={i}>{c.trim()}</li>) }
									</ul>

									<p className="h6 font-600">Topics:</p>
									<ul className="pl-3">
										{ t.topics.split(",").map((t, i) => <li className="mx-1 p-s" key={i}>{t.trim()}</li>) }
									</ul>
								</div>

								<div className="col-lg-7 col-md-6 col-sm-12 pt-3 pt-md-4 px-3 px-md-4">
									<h1 className="h4 font-600 mb-2">{t.title}</h1>

									<p className="mb-3"><span className="text-curious-blue c-link">{t.author.organization}</span> - {t.author.type} - {this.getDate(t.created)}</p>

									<p className="mb-1">{t.caption}</p>
									<p className="mb-1">{t.caption_full}</p>

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
														href="#newframework"
														onClick={(e) => this.handleAction(e, "newframework")}>
														Edit new Framework</Dropdown.Item>
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#targeting&analytics"
														onClick={(e) => this.handleAction(e, "targeting&analytics")}>
														View Targeting & Analytics</Dropdown.Item>
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
													<Dropdown.Item
														className="text-curious-blue px-3 border-bottom d-block"
														href="#report"
														onClick={(e) => this.handleAction(e, "report")}>
														Report</Dropdown.Item>
													<Dropdown.Item
														className="px-3 border-bottom d-block"
														href="#guidelines"
														onClick={(e) => this.handleAction(e, "guidelines")}
														style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}>
														This goes against <span className="c-link text-curious-blue">ConAx</span> community guidelines</Dropdown.Item>
													</Dropdown.Menu>
											</Dropdown>

										</div>
									</div>
								</div>

								<div className="col-lg-3 col-md-4 pt-3 pt-md-4 pb-4 col-sm-12 px-3 px-md-0">
									<div className="d-flex mt-1">
										<div>
											{ !Util.isEmpty(t.image_author) ?
												<CAvatar width="60" height="60" file={t.image_author} alt={t.id} />
												:
												<ConAxLogo type="logo" width="60" />
											}
										</div>
										<div className="flex-fill pl-2">
											<h3 className="h5 font-600 my-0">{t.author.name}</h3>
											<p className="p-s mt-1 mb-1">{t.author.desc}</p>
										</div>
									</div>

									<div className="text-center my-3">
										<a href={"#add-" + t.id} className="c-link font-600">Add to my Research Networks</a>
									</div>

									<div className="border-top border-bottom mt-2 pt-3 pb-3">
										<div className="d-flex text-center">
											<div className="flex-grow-1">
												<p className="p-s mb-0">Connections</p>
												<span className="h6 font-600 mb-1">{Util.getNumbers()}</span>
											</div>
											<div className="flex-grow-1">
												<p className="p-s mb-0">Integrations</p>
												<span className="h6 font-600 mb-1">{Util.getNumbers()}</span>
											</div>
											<div className="flex-grow-1">
												<p className="p-s mb-0">Views</p>
												<span className="h6 font-600 mb-1">{Util.getNumbers()}</span>
											</div>
											<div className="flex-grow-1">
												<p className="p-s mb-0">Contributors</p>
												<span className="h6 font-600 mb-1">{Util.getNumbers()}</span>
											</div>
										</div>
									</div>

									<div className="my-3">
										{ t.inspired.map((inspire, i) => {
											let collection = '';
											if( inspire.collection === 'research' )
												collection = 'Research space';
											if( inspire.collection === 'framework' )
												collection = 'Framework';

											return <p>This Research space is inspired by your {collection} - <NavLink className="c-link" to={"/"+inspire.collection+"?id="+inspire.ref}>{inspire.title}</NavLink></p>
										}) }
									</div>
								</div>
							</div>
						</div>
					:
						<>
							<h4>Research Space is not found</h4>
							<NavLink to="/" className="text-curious-blue c-link">Go back to ConAx</NavLink>
						</>
					}

					{ this.state.loading ? <LoadingMask /> : null }
				</div>
			</>
		)
	}
}