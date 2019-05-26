import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Fields from '../../../config/Fields';
import Util from '../../../utils/Util.js';
import PinCheckbox from '../../../elements/PinCheckbox.js';
import Select from 'react-select';
import Social from '../../../components/Social.js';

export default class EditFramework extends Component {
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
			focusarea: "",
			researchareas: [],
			categoriestopics: []
		}

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		this.formSubmit = this.formSubmit.bind(this);
		this.inputChange = this.inputChange.bind(this);
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
				value = value.target.value;
				this.setState({ [field]: value });
				break;
			default:
				this.setState({ [field]: value });
		}
	}

	action(action, arg) {
		console.log('[action]', action, arg);
	}

	formSubmit(e) {
		e.preventDefault();

	}

	render() {
		return (
			<>
				<Modal show={this.state.showModal} onHide={this.hide} size="lg" centered>
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">Edit Framework</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="input-form text-base p-md-4">
							<div className="row">
								<div className="col-md-10 offset-md-1 col-12 offset-0 mb-4">
									<div className="form-group">
										<h2 className="h3 font-600">Edit new framework</h2>
										<Select
											className="c-select"
											value={this.state.framework}
											onChange={v => this.inputChange('framework', v)}
											placeholder="Select framework for edit"
											options={[
												{value: "Academia", label: "Academia"},
												{value: "Enterprise", label: "Enterprise"},
												{value: "Startup", label: "Startup", },
												{value: "Organization/NCO", label: "Organization/NCO"}
											]}
										/>
									</div>

									<h2 className="h3 mb-0 font-600 text-curious-blue">Create new framework</h2>
									<p className="p-s mb-2 text-curious-blue">A framework is a quick tool to collect and share content into your research spaces.</p>

									<div className="form-group">
										<label htmlFor="framework-title" className="font-600">Name of framework</label>
										<div className="position-relative">
											<label htmlFor="framework-title" className={"input-label "+(this.state.erTitle ? "" : "hide")}>Required *</label>
											<input
												value={this.state.title}
												onChange={ev => this.inputChange('title', ev)}
												id="framework-title"
												type="text"
												name="title"
												placeholder="Framework name"
												className="conax-sign-input form-control" />
										</div>
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
			</>
		);
	}
}