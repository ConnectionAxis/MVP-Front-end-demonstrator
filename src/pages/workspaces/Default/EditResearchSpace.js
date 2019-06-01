import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Fields from '../../../config/Fields';
import Util from '../../../utils/Util.js';
import PinCheckbox from '../../../elements/PinCheckbox.js';
import Select from 'react-select';
import Social from '../../../components/Social.js';
import ModalConfirm from '../../../components/ModalConfirm.js';

export default class EditResearchSpace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			focus_areas: [],
			research_areas: [],
			categories_topics: [],
			framework: "",
			title: "",
			erTitle: false,
			author: "",
			erAuthor: false,
			institution: "",
			erInstitution: false,
			focusarea: "",
			researchareas: [],
			categoriestopics: [],
			delete: false,
			deleteConfirm: {}
		}

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	show() {
		this.setState({ showModal: true });
	}

	hide() {
		this.setState({ showModal: false })
	}

	componentDidMount() {
		// Load data for form fields
		this.setState({
			focus_areas: Fields.getField("focus_areas").map(v => ({label: v, value: v})),
			research_areas: Fields.getField("research_areas").map(v => ({label: v, value: v}))
		});

		var categories = [];
		Util.eachInArray(Fields.getField("categories"), c => {
			categories.push({ label: c, options: Fields.getField("topics", c).map(t => ({ label: t, value: t })) });
		});

		this.setState({ categories_topics: categories });
	}

	inputChange(field, value) {
		console.log('[inputChange]', field, value);

		switch(field) {
			case "title":
			case "desc":
			case "institution":
			case "author":
				value = value.target.value;
				this.setState({ [field]: value });
				break;
			default:
				this.setState({ [field]: value });
		}
	}

	action(action, arg) {
		console.log('[action]', action, arg);
		switch(action) {
			case 'cancel':
				this.hide();
				break;
			case 'delete':
				this.setState({
					delete: true,
					deleteConfirm: {
						action: 'delete',
						title: 'Delete Research Space',
						message: 'Are you sure want to delete Research Space?'
					}
				}, () => {
					this.deleteModal.show();
				});
				break;
			default:
		}
	}

	onDelete(action, confirm) {
		console.log('[onDelete]', action, confirm);
	}

	render() {
		return (
			<>
				<Modal show={this.state.showModal} onHide={this.hide} size="lg" centered>
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">Create a new Research Space</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="input-form text-base p-md-4">
							<div className="row">
								<div className="col-md-10 offset-md-1 col-12 offset-0 mb-4">
									{/* Owner/Institution input */}
									<div className="form-group">
										<div className="row">
											<div className="col-md-6 col-12">
												<label htmlFor="rspace-author" className="font-600">Owner</label>
												<div className="position-relative">
													<label htmlFor="framework-title" className={"input-label "+(this.state.erAuthor ? "" : "hide")}>Required *</label>
													<input
														value={this.state.author}
														onChange={ev => this.inputChange('author', ev)}
														id="rspace-author"
														type="text"
														name="author"
														placeholder="Owner"
														className="conax-sign-input form-control" />
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label htmlFor="rspace-institution" className="font-600">Institution</label>
												<div className="position-relative">
													<label htmlFor="framework-title" className={"input-label "+(this.state.erInstitution ? "" : "hide")}>Required *</label>
													<input
														value={this.state.institution}
														onChange={ev => this.inputChange('institution', ev)}
														id="rspace-institution"
														type="text"
														name="institution"
														placeholder="Institution"
														className="conax-sign-input form-control" />
												</div>
											</div>
										</div>
									</div>

									{/* Research Space name input */}
									<div className="form-group">
										<label htmlFor="rspace-title" className="font-600">Name of Research Space</label>
										<div className="position-relative">
											<label htmlFor="framework-title" className={"input-label "+(this.state.erTitle ? "" : "hide")}>Required *</label>
											<input
												value={this.state.title}
												onChange={ev => this.inputChange('title', ev)}
												id="rspace-title"
												type="text"
												name="title"
												placeholder="Name of Research Space"
												className="conax-sign-input form-control" />
										</div>
									</div>

									{/* Providers radio input */}
									<div className="form-group mb-1">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="rspace-providers" className="font-600 mb-0">Providers</label>
											</div>
											<div className="col-8 text-right">
												<Form.Check inline type="radio" id="rspace-providers-corporate" className="my-0">
													<Form.Check.Input
														name="rspace-providers"
														type="radio"
														defaultChecked={true}
														onChange={e => this.inputChange("providers", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="rspace-providers-corporate">Corporate</Form.Check.Label>
												</Form.Check>
												<Form.Check inline type="radio" id="rspace-providers-personal" className="my-0 ml-4 mr-0">
													<Form.Check.Input
														name="rspace-providers"
														type="radio"
														defaultChecked={false}
														onChange={e => this.inputChange("providers", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="rspace-providers-personal">Personal</Form.Check.Label>
												</Form.Check>
											</div>
										</div>
									</div>

									<p className="p-s mb-2 text-curious-blue">You can choose the role of a content provider in your channel or project, it can be a corporate partner or a person.</p>

									{/* Description textarea input */}
									<div className="form-group">
										<label htmlFor="rspace-desc" className="font-600">Description</label>
										<div className="position-relative">
											<label htmlFor="rspace-desc" className={"input-label "+(this.state.erDesc ? "" : "hide")}>Required *</label>
											<textarea
												value={this.state.desc}
												onChange={ev => this.inputChange('desc', ev)}
												id="rspace-desc"
												type="text"
												name="desc"
												rows={5}
												placeholder="Description for Research Space"
												className="conax-sign-input form-control" />
										</div>
									</div>

									{/* Open Source connect */}
									<div className="form-group mb-1">
										<label htmlFor="rspace-source"><span className="font-600">Open Source connect</span> (Optional)</label>
										<input
											value={this.state.source}
											onChange={ev => this.inputChange('source', ev)}
											id="rspace-source"
											type="text"
											name="source"
											placeholder="Name of Research Space"
											className="conax-sign-input form-control" />
									</div>

									<p className="p-s mb-3 text-curious-blue">Attach source link to your online sources or open access repositories.</p>

									{/* Call to Action, Open Call action buttons */}
									<div className="form-group">
										<button className="c-btn c-btn-round c-btn-animated mr-3" onClick={e => this.action("call-action", e)}>Call to Action</button>
										<button className="c-btn c-btn-round c-btn-animated" onClick={e => this.action("call-open", e)}>Open Call</button>
									</div>

									<p className="p-s mb-2 text-curious-blue">You can put a special mark as a full request for a quick search of your project to the users relevant to your sector.</p>

									<h4 className="h4 mt-3 mb-2 font-600">Moderation and Success</h4>

									{/* Quick Access control button */}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-collaborators" className="mb-0">Access Control</label>
											</div>
											<div className="col-8 text-right">
												<button className="c-btn c-btn-round c-btn-animated" onClick={e => this.action("access", e)}>Quick Access</button>
											</div>
										</div>
									</div>
									
									<p className="p-s mb-2 text-curious-blue">When creating a channel or project on ConAx using the Get in function, you can set third-connections control to your research spaces or frameworks.</p>

									{/* Moderators button */}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-collaborators" className="mb-0">Moderators</label>
											</div>
											<div className="col-8 text-right">
												<button className="c-btn c-btn-round c-btn-animated" onClick={e => this.action("moderators", e)}>Edit</button>
											</div>
										</div>
									</div>

									<h4 className="h4 mt-3 mb-2"><span className="font-600">Edit framework</span> (Optional)</h4>
									<p className="p-s mb-2 text-curious-blue">A framework is a quick tool to collect and share content into your research spaces.</p>

									{/* Name of Framework input field */}
									<div className="form-group">
										<label htmlFor="framework-title" className="font-600">Name of framework</label>
										<input
											value={this.state.title}
											onChange={ev => this.inputChange('title', ev)}
											id="framework-title"
											type="text"
											name="title"
											placeholder="Framework name"
											className="conax-sign-input form-control" />
									</div>


									<h4 className="h4 mb-0 font-600">Research stack</h4>
									<p className="p-s mb-2 text-curious-blue">You can apply main focus areas from the one specified your profile or any other for expansion connection targeting your channel.</p>

									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-md-4 col-12">
												<label htmlFor="framework-focus-area" className="font-600 mb-0">Main focus areas</label>
											</div>
											<div className="col-md-8 col-12">
												<Select
													className="c-select"
													value={this.state.focusarea}
													id="framework-focus-area"
													placeholder="Select main focus area"
													onChange={v => this.inputChange('focusarea', v)}
													options={this.state.focus_areas}
													isMulti={false}/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-md-4 col-12">
												<label htmlFor="framework-research-area" className="font-600 mb-0">Research areas</label>
											</div>
											<div className="col-md-8 col-12">
												<Select
													className="c-select"
													value={this.state.researchareas}
													id="framework-research-area"
													placeholder="Seclect research areas"
													onChange={v => this.inputChange('researchareas', v)}
													options={this.state.research_areas}
													isMulti={true}
													isSearchable={true}
													menuPlacement="top"/>
											</div>
										</div>
									</div>
									<div className="form-group mb-2">
										<div className="row align-items-center no-gutters">
											<div className="col-md-4 col-12">
												<label htmlFor="framework-categories-topics" className="font-600 mb-0">Categories & Topics</label>
											</div>
											<div className="col-md-8 col-12">
												<Select
													className="c-select"
													value={this.state.categoriestopics}
													id="framework-categories-topics"
													placeholder="Select categories and topics"
													onChange={v => this.inputChange('categoriestopics', v)}
													options={this.state.categories_topics}
													formatGroupLabel={data => ( <div className="my-0 py-0 font-600 text-curious-blue">{data.label}</div> )}
													isMulti={true}
													isSearchable={true}
													menuPlacement="top"/>
											</div>
										</div>
									</div>

									<p className="p-s mb-2 text-curious-blue">(You can add relative’s categories and topics to your research profile or activity sector)</p>

									<h4 className="h4 mt-3 mb-0 font-600">Research networking</h4>
									<p className="p-s mb-2 text-curious-blue">You can apply more connection points to optimize communication structure within and out your research spaces and frameworks.</p>

									{/* Collaborators Invite button */}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-collaborators" className="mb-0">Collaborators</label>
											</div>
											<div className="col-8 text-right">
												<button className="c-btn c-btn-round c-btn-animated" onClick={e => this.action("invite", e)}>invite</button>
											</div>
										</div>
									</div>

									{/* Integrations radio input */}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-integrations" className="mb-0">Integrations</label>
											</div>
											<div className="col-8 text-right">
												<Form.Check inline type="radio" id="framework-integrations-all" className="my-0">
													<Form.Check.Input
														name="framework-integrations"
														type="radio"
														defaultChecked={true}
														onChange={e => this.inputChange("framework-integrations", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-integrations-all">all</Form.Check.Label>
												</Form.Check>
												<Form.Check inline type="radio" id="framework-integrations-related" className="my-0 ml-4 mr-0">
													<Form.Check.Input
														name="framework-integrations"
														type="radio"
														defaultChecked={false}
														onChange={e => this.inputChange("framework-integrations", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-integrations-related">related</Form.Check.Label>
												</Form.Check>
											</div>
										</div>
									</div>

									{/* Connections radio input */}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-connections" className="mb-0">Connections</label>
											</div>
											<div className="col-8 text-right">
												<Form.Check inline type="radio" id="framework-connections-all" className="my-0">
													<Form.Check.Input
														name="framework-connections"
														type="radio"
														defaultChecked={true}
														onChange={e => this.inputChange("framework-connections", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-connections-all">all</Form.Check.Label>
												</Form.Check>
												<Form.Check inline type="radio" id="framework-connections-related" className="my-0 ml-4 mr-0">
													<Form.Check.Input
														name="framework-connections"
														type="radio"
														defaultChecked={false}
														onChange={e => this.inputChange("framework-connections", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-connections-related">related</Form.Check.Label>
												</Form.Check>
											</div>
										</div>
									</div>

									<p className="p-s mb-2 text-curious-blue">Your framework will be enhanced by integrating from others research areas, frameworks and stacks.</p>

									<h4 className="h4 mt-3 mb-0 font-600">Research mapping</h4>
									<p className="p-s mb-2 text-curious-blue">Get flexible control to the research progress and data-flow regulation. </p>

									<h4 className="h4 mt-3 mb-0 font-600">Content structure</h4>
									<p className="p-s mb-2 text-curious-blue">Mark required below</p>

									{/* Content structure checkboxes */}
									<div className="form-group">
										<Form.Check inline type="checkbox" id="framework-require-themes" className="my-1 mr-3">
											<Form.Check.Input
												name="framework-require-themes"
												type="checkbox"
												defaultChecked={true}
												onChange={e => this.inputChange("framework-require-themes", e)}/>
											<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-require-themes">Themes</Form.Check.Label>
										</Form.Check>
										<Form.Check inline type="checkbox" id="framework-require-issues" className="my-1 mr-3">
											<Form.Check.Input
												name="framework-require-issues"
												type="checkbox"
												defaultChecked={true}
												onChange={e => this.inputChange("framework-require-issues", e)}/>
											<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-require-issues">Issues</Form.Check.Label>
										</Form.Check>
										<Form.Check inline type="checkbox" id="framework-require-categories-topics" className="my-1 mr-3">
											<Form.Check.Input
												name="framework-require-categories-topics"
												type="checkbox"
												defaultChecked={true}
												onChange={e => this.inputChange("framework-require-categories-topics", e)}/>
											<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-require-categories-topics">Categories & Topics</Form.Check.Label>
										</Form.Check>
										<Form.Check inline type="checkbox" id="framework-require-sources" className="my-1 mr-3">
											<Form.Check.Input
												name="framework-require-sources"
												type="checkbox"
												defaultChecked={true}
												onChange={e => this.inputChange("framework-require-sources", e)}/>
											<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-require-sources">Sources</Form.Check.Label>
										</Form.Check>
										<Form.Check inline type="checkbox" id="framework-require-comments" className="my-1 mr-3">
											<Form.Check.Input
												name="framework-require-comments"
												type="checkbox"
												defaultChecked={true}
												onChange={e => this.inputChange("framework-require-comments", e)}/>
											<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-require-comments">Comments</Form.Check.Label>
										</Form.Check>
									</div>

									{/*Activity sectors radio group*/}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-activity-sectors" className="mb-0">Activity sectors</label>
											</div>
											<div className="col-8 text-right">
												<Form.Check inline type="radio" id="framework-activity-sectors-all" className="my-0">
													<Form.Check.Input
														name="framework-activity-sectors"
														type="radio"
														defaultChecked={true}
														onChange={e => this.inputChange("framework-activity-sectors", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-activity-sectors-all">all</Form.Check.Label>
												</Form.Check>
												<Form.Check inline type="radio" id="framework-activity-sectors-related" className="my-0 ml-4 mr-0">
													<Form.Check.Input
														name="framework-activity-sectors"
														type="radio"
														defaultChecked={false}
														onChange={e => this.inputChange("framework-activity-sectors", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-activity-sectors-related">related</Form.Check.Label>
												</Form.Check>
											</div>
										</div>
									</div>
									{/*Research stacks radio group*/}
									<div className="form-group">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label htmlFor="framework-research-stacks" className="mb-0">Research stacks</label>
											</div>
											<div className="col-8 text-right">
												<Form.Check inline type="radio" id="framework-research-stacks-all" className="my-0">
													<Form.Check.Input
														name="framework-research-stacks"
														type="radio"
														defaultChecked={true}
														onChange={e => this.inputChange("framework-research-stacks", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-research-stacks-all">all</Form.Check.Label>
												</Form.Check>
												<Form.Check inline type="radio" id="framework-research-stacks-related" className="my-0 ml-4 mr-0">
													<Form.Check.Input
														name="framework-research-stacks"
														type="radio"
														defaultChecked={false}
														onChange={e => this.inputChange("framework-research-stacks", e)}/>
													<Form.Check.Label className="text-curious-blue c-link font-600" htmlFor="framework-research-stacks-related">related</Form.Check.Label>
												</Form.Check>
											</div>
										</div>
									</div>

									{/*Add to Creative Networks checkbox*/}
									<PinCheckbox
										className="py-2"
										defaultChecked={true}
										onChange={e => this.inputChange("framework-creative-networks", e)}
										label="Add to Creative Networks" />

									<p className="p-s mb-2 text-curious-blue">Creative Networks will integrate related frameworks and structure your activities to the research data stack. <a href="#Creative Networks" className="c-link font-600">See more about Creative Networks.</a></p>

									{/*Connect Analytics and Targeting checkbox*/}
									<PinCheckbox
										className="py-2"
										defaultChecked={true}
										onChange={e => this.inputChange("framework-analytics-targeting", e)}
										label="Connect with Analytics and Targeting" />

									<div className="form-group mt-2">
										<div className="row align-items-center no-gutters">
											<div className="col-4">
												<label className="mb-0 text-curious-blue">Share</label>
											</div>
											<div className="col-8">
												<Social
													align="right"
													onClick={e => this.action("social", e)} />
											</div>
										</div>
									</div>

									<hr/>

									<div className="row align-items-center no-gutters mb-0">
										<div className="col-4">
											<button className="c-btn c-btn-round c-btn-default c-btn-animated" onClick={e => this.action("delete")}>Delete</button>
										</div>
										<div className="col-8 text-right">
											<button className="c-btn c-btn-round c-btn-default c-btn-animated mr-3" onClick={e => this.action("cancel")}>Cancel</button>
											<button className="c-btn c-btn-round c-btn-animated" onClick={e => this.action("save")}>Save</button>
										</div>
									</div>

								</div>
							</div>
						</div>
					</Modal.Body>
				</Modal>
				{ this.state.delete && <ModalConfirm ref={(modal) => {this.deleteModal = modal;}} confirm={this.state.deleteConfirm} onConfirm={this.onDelete} /> }
			</>
		);
	}
}