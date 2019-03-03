import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {init as firebaseInit} from './config/firebase.js';
import DataManager from './utils/DataManager.js';
import Util from './utils/Util.js';
import WorkSpace from './pages/WorkSpace.js';
import LoginPage from './pages/LoginPage.js';
import Page404 from './pages/404.js';
// import LoadPage from './pages/LoadPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false
    };

    this.handleUser = this.handleUser.bind(this);
    this.defaultPath = this.defaultPath.bind(this);

    firebaseInit();
  }

  componentDidMount() {
    const user = DataManager.getCookieObject('conax-user');
    if( !Util.isEmpty(user) ) {
      this.setState({ session: true });
    }
  }

  handleUser(action) {
    switch(action) {
      case "logout":
        const user = DataManager.getCookieObject('conax-user');
        if( !Util.isEmpty(user) )
          DataManager.removeCookieObject('conax-user');
        this.setState({ session: false });
        break;
      case "login":
        this.setState({ session: true });
        break;
      default:
    }
  }

  defaultPath() {
    if( this.state.session )
      return <WorkSpace handleUser={this.handleUser}/>;
    else
      return <LoginPage handleUser={this.handleUser}/>;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={this.defaultPath}/>
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
