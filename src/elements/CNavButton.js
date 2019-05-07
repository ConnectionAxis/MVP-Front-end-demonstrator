import React, { Component } from 'react';
import format from 'string-format';

export default class CNavButton extends Component {
	constructor(props) {
		super(props);

		this.cls = 'c-nav-btn c-btn-animated';
		this.isButton = true;

		if( props.type )
			switch(props.type) {
				case 'circle':
					this.cls += ' --circle';
					break;
				case 'user':
					this.cls += ' --user';
					break;
				case 'text':
					this.cls += ' --text';
					break;
				default:
			}

		if( props.className )
			this.cls += format(' {0}', props.className);

		if( props.counter )
			this.cls += format(' {0}', 'c-nav-btn-counter');

		if( props.hasOwnProperty('button') )
			this.isButton = props.button;
	}

	renderCNavButton(params) {
		var output = [];

		if( params.icon )
			switch(params.icon) {
				case 'dots':
					output.push(
						<svg
							key="icon"
							className="c-nav-btn-icon"
							height="22"
							width="22"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path>
						</svg>
					);
					break;
				case 'bell':
					output.push(
						<svg
							key="icon"
							className="c-nav-btn-icon"
							width="24"
							height="24"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M8 16c-1.12 0-2.03-.9-2.03-2h4.06c0 1.1-.91 2-2.03 2zm4.72-6.92c1.02.95 1.74 2.19 2.03 3.59H1.25c.29-1.4 1.01-2.64 2.02-3.59V4.67C3.27 2.09 5.39 0 8 0c2.61 0 4.72 2.09 4.72 4.67v4.41z"></path>
						</svg>
					);
					break;
				case 'msg':
					output.push(
						<svg
							key="icon"
							className="c-nav-btn-icon"
							height="24"
							width="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M18 12.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18 12.5m-6 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 12 12.5m-6 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 6 12.5M12 0C5.925 0 1 4.925 1 11c0 2.653.94 5.086 2.504 6.986L2 24l5.336-3.049A10.93 10.93 0 0 0 12 22c6.075 0 11-4.925 11-11S18.075 0 12 0"></path>
						</svg>
					);
					break;
				case 'user':
					output.push(
						<svg
							key="icon"
							className="c-nav-btn-icon"
							height="24"
							width="24"
							viewBox="0 0 510 510"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,76.5 c43.35,0,76.5,33.15,76.5,76.5s-33.15,76.5-76.5,76.5c-43.35,0-76.5-33.15-76.5-76.5S211.65,76.5,255,76.5z M255,438.6 c-63.75,0-119.85-33.149-153-81.6c0-51,102-79.05,153-79.05S408,306,408,357C374.85,405.45,318.75,438.6,255,438.6z"/>
						</svg>
					);
					break;
				default:
			}

		if( params.counter ) {
			output.push(
				<span
					key="counter"
					className="c-counter">
					{params.counter}
				</span>
			);
		}

		if( params.type === 'user' ) {
			var tx = params.text;
			if( tx.length > 14 ) {
				tx = tx.substring(0, 15);
			}

			output.push(
				<span
					key="user"
					className="c-user-icon">
					{tx.split('')[0]}
				</span>
			);
		}

		if( params.text ) {
			output.push(params.text);
		}

		return output;
	}

	render() {
		const { onClick } = this.props;

		return (
			<>
				{this.isButton ? (
						<button
							className={this.cls}
							onClick={onClick}>
							{this.renderCNavButton(this.props)}
						</button>
					) : (
						<div
							className={this.cls}
							onClick={onClick}>
							{this.renderCNavButton(this.props)}
						</div>
					)}
			</>
		);
	}
}