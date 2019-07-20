import React, { Component } from 'react';

export default class ResearchFramework extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data
		};
	}

	render() {
		const t = this.state.data;
		return (
			<div className="border px-3 pt-1 pb-3 mt-1 mb-3">
				<h3 className="h5 font-600 my-0">{t.title}</h3>
				<h3 className="h5 font-600 my-0">{t.author.name}</h3>
			</div>
		);
	}
}