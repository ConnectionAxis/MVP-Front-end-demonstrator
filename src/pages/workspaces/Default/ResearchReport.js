import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default class ResearchReport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			cancel: 'Cancel',
			ok: 'Submit',
			active: 0,
			reports: [{
				title: 'Inncorrect Sector/Activity',
				subtitle: 'Does not meet my research network'
			}, {
				title: 'Inncorrect research content',
				subtitle: 'Frameworks and categories&topics are irrelevant to the content of my interests'
			}, {
				title: 'Insincere',
				subtitle: 'Not seeking genine content'
			}, {
				title: 'Harassment',
				subtitle: 'Disparaging or adverserial towards a person or institution'
			}, {
				title: 'Spam',
				subtitle: 'Undiscolsed promotion for a link or project'
			}, {
				title: 'Do not show me related',
				subtitle: ''
			}]
		}

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.checkChange = this.checkChange.bind(this);
	}

	show() {
		this.setState({ show: true });
	}

	hide() {
		this.setState({ show: false });
	}

	procced(e, action) {
		e.preventDefault();
		this.setState({ show: false }, () => {
			if( typeof(this.props.onReport) === 'function' && (action === 'ok') ) {
				this.props.onReport(this.props.report, this.state.reports[this.state.active]);
			}
		});
	}

	checkChange(i) {
		this.setState({ active: i });
	}

	render() {
		return (
			<>
				<Modal show={this.state.show} onHide={this.hide} centered>
					<Modal.Header closeButton>
						<Modal.Title className="text-curious-blue font-600">Report Research Space</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="px-4 pt-4 pb-2">
							<Form>
								{this.state.reports.map((r, i) => (
									<div className="form-group" key={i}>
										<Form.Check type="radio" id={"research-report-"+i}>
											<Form.Check.Input
												name="research-report"
												type="radio" isValid
												defaultChecked={( i === 0 )}
												onChange={(e) => this.checkChange(i)} />
											<Form.Check.Label className="text-curious-blue c-link" htmlFor={"research-report-"+i}>{r.title}</Form.Check.Label>
											<Form.Control.Feedback type="valid" className="mt-0 p-s text-base">{r.subtitle}</Form.Control.Feedback>
										</Form.Check>
									</div>
								))}
							</Form>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className="text-right">
							<button className="c-btn c-btn-default c-btn-round c-btn-animated mr-3" onClick={(e) => this.procced(e, "cancel")}>{this.state.cancel}</button>
							<button className="c-btn c-btn-round c-btn-animated" onClick={(e) => this.procced(e, "ok")}>{this.state.ok}</button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}