import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar.js';
import LoadingMask from '../../components/LoadingMask.js';
import CAvatar from '../../elements/CAvatar.js';
import ConAxLogo from '../../elements/ConAxLogo.js';
import DataManager from '../../utils/DataManager.js';
import Util from '../../utils/Util.js';
import { NavLink } from 'react-router-dom';

export default class UserProfile extends Component {
	_mount = false;
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			error: false,
			data: {}
		}
	}

  componentDidMount() {
  	this._mount = true;
  	if( !Util.isEmpty(this.props.id) ) {
  		DataManager.getObject(
  			'users', this.props.id)
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
								</div>

								<div className="col-lg-7 col-md-6 col-sm-12 pt-3 pt-md-4 px-3 px-md-4">
									<h1 className="h4 font-600 mb-2">{t.firstname} {t.lastname}</h1>
									<p>{t.email}</p>
								</div>

								<div className="col-lg-3 col-md-4 pt-3 pt-md-4 pb-4 col-sm-12 px-3 px-md-0">
								</div>
							</div>
						</div>
					:
						<>
							<h4>Userprofile is not found</h4>
							<NavLink to="/" className="text-curious-blue c-link">Go back to ConAx</NavLink>
						</>
					}

					{ this.state.loading ? <LoadingMask /> : null }
				</div>
			</>
		)
	}
}