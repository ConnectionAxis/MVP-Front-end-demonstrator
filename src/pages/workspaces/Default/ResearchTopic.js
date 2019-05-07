import React, { Component } from 'react';
import CNavButton from '../../../elements/CNavButton.js';
import ConAxLogo from '../../../elements/ConAxLogo.js';
import DataManager from '../../../utils/DataManager.js';
import Util from '../../../utils/Util.js';
import PopoverStickOnHover from '../../../utils/PopoverStickOnHover.js';
import Dropdown from 'react-bootstrap/Dropdown';

export default class ResearchTopic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data,
			full: false
		}

		this.showMore = this.showMore.bind(this);
		this.handleAction = this.handleAction.bind(this);
	}

	showMore(e) {
		e.preventDefault();
		this.setState({ full: true });

		let views = this.state.data.views;
		this.setData({ views: ++views });
	}

	handleAction(e, action) {
		e.preventDefault();
		console.log('[ResearchTopic:handleAction]', action, this.state.data.id);
		switch(action) {
			case 'upvote':
				let upvotes = this.state.data.upvotes;
				this.setData({ upvotes: ++upvotes });
				break;
			default:
				if( typeof(this.props.onAction) === 'function' ) {
					this.props.onAction(action, this.state.data);
				}
		}
	}

	setData(data) {
		let state = this.state.data;
		Util.eachInObject(data, (key, value) => {
			if( state.hasOwnProperty(key) )
				state[key] = value;
		});
		this.setState({ data: state });

		DataManager.updateObject('research_topics', state.id, data);
	}

	render() {
		const t = this.state.data;
		return (
			<div className="border px-3 pt-1 pb-3 mt-1 mb-3">
				<div className="d-flex align-items-center pt-1 pb-2">
					<div>
						<ConAxLogo type="logo" width="60" />
					</div>
					<div className="flex-fill pl-3">
						<h3 className="h5 font-600 my-0">{t.author.firstname} {t.author.lastname}</h3>
						<p className="mb-0">
							<PopoverStickOnHover
								placement="bottom"
								className="popover-wide"
								content={
									<>
										<div className="d-flex">
											<div>
												<ConAxLogo type="logo" width="40" />
											</div>
											<div className="flex-fill pl-2">
												<h5 className="h5 font-600 my-0">{t.author.activity}</h5>
												<p className="p-s mt-1 mb-1">ConAx is a communicative platform to stack and share multi-modal research data. It’s a service for transformation and structural reconciliation of open research frameworks to create R&D and R&I projects.</p>
											</div>
										</div>
										<div className="text-center">
											<a href={"#add-" + t.id} className="c-link font-600">Add to my Research Networks</a>
										</div>
										<div className="border-top mt-2 pt-2">
											<div className="d-flex text-center">
												<div className="flex-grow-1">
													<p className="p-s mb-0">Connections</p>
													<span className="h6 font-600 mb-1">21</span>
												</div>
												<div className="flex-grow-1">
													<p className="p-s mb-0">Integrations</p>
													<span className="h6 font-600 mb-1">11</span>
												</div>
												<div className="flex-grow-1">
													<p className="p-s mb-0">Views</p>
													<span className="h6 font-600 mb-1">235</span>
												</div>
												<div className="flex-grow-1">
													<p className="p-s mb-0">Contributors</p>
													<span className="h6 font-600 mb-1">123</span>
												</div>
											</div>
										</div>
									</>
								}>
								<span className="text-curious-blue c-link">{t.author.activity} </span>
							</PopoverStickOnHover>
							 - Startup - 5 days ago
						</p>
					</div>
				</div>
				<h4 className="h5 font-600">{t.title}</h4>
				<p className="mb-1">{t.caption} { !this.state.full && <a href="#show" className="text-curious-blue c-link" onClick={this.showMore}>Show more..</a> }</p>
				{ this.state.full &&
					<p>{t.caption_full}</p>
				}
				<div>
					<PopoverStickOnHover
						placement="bottom"
						className="popover-wide"
						content={
							<>
								<p className="my-1"><a href="#frameworks" className="text-curious-blue c-link">Knowledge exchange- the restructure age of development of Thinks and Innovation</a></p>
								<p className="my-1"><a href="#frameworks" className="text-curious-blue c-link">The frames for innovation policy: R&D, systems of innovation and transformative change</a></p>
								<p className="my-1"><a href="#frameworks" className="text-curious-blue c-link">Deep transitions: Theorizing the long-term patterns of socio-technical change</a></p>
							</>
						}>
						<span className="text-curious-blue font-600 c-link mr-3">Frameworks 3</span>
					</PopoverStickOnHover>
					<PopoverStickOnHover
						placement="bottom"
						className="popover-wide"
						content={
							<>
								<p className="mb-2">
									<span className="font-600">Categories</span>:
									<span className="mx-1 text-curious-blue c-link">Data Mining</span>
									<span className="mx-1 text-curious-blue c-link">Artificial Neural Networks</span>
									<span className="mx-1 text-curious-blue c-link">Artificial Intelligence</span>
									<span className="mx-1 text-curious-blue c-link">Machine Learning</span>
								</p>
								<p className="mb-2">
									<span className="font-600">Topics</span>:
									<span className="mx-1 text-curious-blue c-link">open-data</span>
									<span className="mx-1 text-curious-blue c-link">open-source</span>
									<span className="mx-1 text-curious-blue c-link">research-and-development</span>
									<span className="mx-1 text-curious-blue c-link">data-driven-science</span>
								</p>
							</>
						}>
						<span className="text-curious-blue font-600 c-link">Categories & Topics</span>
					</PopoverStickOnHover>
				</div>
				<div>
					<span className="p-s mr-2">{t.upvotes} upvotes</span>
					<span className="p-s">{t.views} views</span>
				</div>
				<div className="d-flex no-gutters align-items-center mt-2">
					<div className="flex-fill">
						<div className="form-group mb-0">
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
									href="#getin"
									onClick={(e) => this.handleAction(e, "getin")}>
									Get in</Dropdown.Item>
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
								<Dropdown.Item
									className="px-3 border-bottom d-block"
									href="#relatedframework"
									onClick={(e) => this.handleAction(e, "relatedframework")}
									style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}>
									This Research space is inspired by your framework - <span className="c-link text-curious-blue">Knowledge exchange- the restructure age of development of Thinks and Innovation.</span></Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
		);
	}
}