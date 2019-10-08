import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {init as firebaseInit} from './config/firebase.js';
import DataManager from './utils/DataManager.js';
import Util from './utils/Util.js';
import WorkSpace from './pages/WorkSpace.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import Page404 from './pages/404.js';
import PrivacyPolicy from './pages/static/PrivacyPolicy.js';
import TermsOfUse from './pages/static/TermsOfUse.js';
import ResearchSpace from './pages/static/ResearchSpace.js';
import Framework from './pages/static/Framework.js';
import UserProfile from './pages/static/UserProfile.js';
// import LoadPage from './pages/LoadPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false,
      state: 'login'
    };

    this.handleUser = this.handleUser.bind(this);
    this.defaultPath = this.defaultPath.bind(this);
    this.staticPage = this.staticPage.bind(this);
    this.switchPath = this.switchPath.bind(this);

    firebaseInit();
  }

  componentDidMount() {
    const user = DataManager.getCookieObject('conax-user');
    if( !Util.isEmpty(user) ) {
      this.setState({ session: true, state: 'active' });
    }
  }

  handleUser(action) {
    switch(action) {
      case "logout":
        const user = DataManager.getCookieObject('conax-user');
        if( !Util.isEmpty(user) )
          DataManager.removeCookieObject('conax-user');
        this.setState({ session: false, state: 'login' });
        break;
      case "login":
        this.setState({ session: true, state: 'active' });
        break;
      case "signup":
        this.setState({ session: false, state: 'signup' });
        break;
      default:
    }
  }

  defaultPath(e) {
    if( !Util.isEmpty(e.history) )
      this.history = e.history;

    if( this.state.session )
      return <WorkSpace
                handleUser={this.handleUser}
                switchPath={this.switchPath} />;
    else {
      switch( this.state.state ) {
        case 'signup':
          return <SignUpPage
                    handleUser={this.handleUser}
                    switchPath={this.switchPath} />;
        case 'login':
          return <LoginPage handleUser={this.handleUser}/>;
        default:
      }
    }
  }

  switchPath(path) {
    switch(path) {
      case "privacy":
        this.history.push("/privacy");
        break;
      case "default":
        this.history.push("/");
        break;
      default:
    }
  }

  staticPage(e) {
    if( !Util.isEmpty(e.history) )
      this.history = e.history;

    const parameters = new URLSearchParams(this.history.location.search);
    let id = parameters.get('id');

    switch(e.match.path) {
      case "/privacy":
        return <PrivacyPolicy switchPath={this.switchPath} />;
      case "/terms":
        return <TermsOfUse switchPath={this.switchPath} />;
      case "/research":
        return <ResearchSpace switchPath={this.switchPath} id={id} />;
      case "/framework":
        return <Framework switchPath={this.switchPath} id={id} />;
      case "/userprofile":
        return <UserProfile switchPath={this.switchPath} id={id} />;
      default:
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={this.defaultPath}/>
          <Route path="/privacy" exact component={this.staticPage}/>
          <Route path="/terms" exact component={this.staticPage}/>
          <Route path="/research" exact component={this.staticPage}/>
          <Route path="/framework" exact component={this.staticPage}/>
          <Route path="/userprofile" exact component={this.staticPage}/>
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
