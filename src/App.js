import React, { Component } from 'react';
import {init as firebaseInit} from './config/firebase.js';
import DataManager from './utils/DataManager.js';
import Util from './utils/Util.js';
import WorkSpace from './pages/WorkSpace.js';
import LoginPage from './pages/LoginPage.js';
// import LoadPage from './pages/LoadPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false
    };

    this.handleUser = this.handleUser.bind(this);

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

  render() {
    return (
      <>
        {this.state.session ? (
            <WorkSpace handleUser={this.handleUser}/>
          ) : (
            <LoginPage handleUser={this.handleUser}/>
          )}
      </>
    );
  }
}

export default App;
