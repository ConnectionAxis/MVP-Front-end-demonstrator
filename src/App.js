import React, { Component } from 'react';
import LoginPage from './pages/LoginPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false
    };
  }

  render() {
    return (
      <LoginPage />
    );
  }
}

export default App;
