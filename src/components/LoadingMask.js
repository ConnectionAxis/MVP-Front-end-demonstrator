import React, { Component } from 'react';
import format from 'string-format';

class LoadingMask extends Component {
	constructor(props) {
		super(props);

		this.type = "mask";

		if( props.hasOwnProperty('type') )
			this.type = props.type;

		this.cls = format("c-loading-{0}", this.type);
	}

	renderMaskIcon() {
		return <svg
			className="c-loading-icon"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 16 16">
			<g>
				<path d="M2.083,9H0.062H0v5l1.481-1.361C2.932,14.673,5.311,16,8,16c4.08,0,7.446-3.054,7.938-7h-2.021 c-0.476,2.838-2.944,5-5.917,5c-2.106,0-3.96-1.086-5.03-2.729L5.441,9H2.083z"/>
				<path d="M8,0C3.92,0,0.554,3.054,0.062,7h2.021C2.559,4.162,5.027,2,8,2c2.169,0,4.07,1.151,5.124,2.876 L11,7h2h0.917h2.021H16V2l-1.432,1.432C13.123,1.357,10.72,0,8,0z"/>
			</g>
		</svg>;
	}

	render() {
		return (
			<div className={this.cls}>
				{this.renderMaskIcon()}
			</div>
		);
	}
}

export default LoadingMask;