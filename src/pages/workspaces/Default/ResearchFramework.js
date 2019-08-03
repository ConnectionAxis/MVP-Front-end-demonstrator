import React, { Component } from 'react';
import ConAxLogo from '../../../elements/ConAxLogo.js';
import CAvatar from '../../../elements/CAvatar.js';
import Util from '../../../utils/Util.js';
import format from 'string-format';
import PopoverStickOnHover from '../../../utils/PopoverStickOnHover.js';
import Dropdown from 'react-bootstrap/Dropdown';
import CNavButton from '../../../elements/CNavButton.js';
import { NavLink } from 'react-router-dom';

export default class ResearchFramework extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data
		};

		this.handleAction = this.handleAction.bind(this);
	}

	setAvatarPrimary(src) {
		if( !Util.isEmpty(src) ) {
			return <CAvatar width="60" height="60" file={format("{0}.png", src)} alt={this.state.data.id} />
		} else {
			return <ConAxLogo type="logo" width="60" />
		}
	}

  handleAction(e, action) {
  	e.preventDefault();

  	console.log('[ResearchFramework:handleAction]', action);
  }

	getDate(dt) {
		return format("{0} days ago", Util.getDaysAgo(dt));
	}

	render() {
		const t = this.state.data;
		return (
			<div className="border px-3 pt-2 pb-3 mt-1 mb-3">
				<div className="d-flex align-items-start pt-1 pb-2">
					<div>
						{this.setAvatarPrimary(t.id)}
					</div>
					<div className="flex-fill pl-3">
						<h3 className="h5 font-600 mt-0 mb-2"><NavLink to={"/framework?id="+t.id} className="c-link">{t.title}</NavLink></h3>
						<p className="my-0">
							uploaded by <span className="c-link text-curious-blue">{t.author.name}</span> at {t.author.organization} - {this.getDate(t.created)}
						</p>
						<p className="my-0">at Research space - <span className="c-link text-curious-blue">{t.research}</span></p>
					</div>
				</div>
				<div>
					<span className="font-600 mr-2">Research stack:</span>
					<PopoverStickOnHover
						placement="bottom"
						content={
							<>
								{ t.areas_research.split(",").map((r, i) => <p className="my-1" key={i}><a href="#areas_research" className="text-curious-blue c-link">{r.trim()}</a></p>) }
							</>
						}>
						<span className="text-curious-blue c-link mr-3">+{t.areas_research.split(",").length} Research areas</span>
					</PopoverStickOnHover>
					<PopoverStickOnHover
						placement="bottom"
						content={
							<>
								{ t.areas_focus.split(",").map((r, i) => <p className="my-1" key={i}><a href="#areas_focus" className="text-curious-blue c-link">{r.trim()}</a></p>) }
							</>
						}>
						<span className="text-curious-blue c-link mr-3">+{t.areas_focus.split(",").length} Main focus areas</span>
					</PopoverStickOnHover>
					<PopoverStickOnHover
						placement="bottom"
						className="popover-wide"
						content={
							<>
								<p className="mb-2">
									<span className="font-600">Categories</span>:
									{ t.categories.split(",").map((c, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{c.trim()}</span>) }
								</p>
								<p className="mb-2">
									<span className="font-600">Topics</span>:
									{ t.topics.split(",").map((t, i) => <span className="mx-1 text-curious-blue c-link" key={i}>{t.trim()}</span>) }
								</p>
							</>
						}>
						<span className="text-curious-blue c-link">+{t.categories.split(",").length + t.topics.split(",").length} Categories & Topics</span>
					</PopoverStickOnHover>
				</div>
				<div>
					<span className="font-600 mr-2">Contribuitors:</span>+{t.contribuitors} <span className="text-curious-blue c-link">more</span>
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
								{ t.inspired_research.length > 0 ?
									<Dropdown.Item
										className="px-3 border-bottom d-block"
										href="#relatedresearch"
										onClick={(e) => this.handleAction(e, "relatedresearch")}
										style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}>
										This framework is inspired by your Research space - <span className="c-link text-curious-blue">{t.inspired_research}</span></Dropdown.Item> : null }
								{ t.inspired_framework.length > 0 ?
									<Dropdown.Item
										className="px-3 border-bottom d-block"
										href="#relatedframework"
										onClick={(e) => this.handleAction(e, "relatedframework")}
										style={{ whiteSpace: "inherit", fontSize: "0.8rem" }}>
										This framework is inspired by your Frameworks - <span className="c-link text-curious-blue">{t.inspired_framework}</span></Dropdown.Item> : null }
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
		);
	}
}