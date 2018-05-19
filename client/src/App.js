import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import AuthSuccess from './components/AuthSuccess';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    this.setState({ isAuthenticated: localStorage.getItem("auth_token") !== null })
  }

  clickHandler = () => {
    localStorage.removeItem("auth_token");
    this.setState({ isAuthenticated: false });
  }
  render() {
    let loginComponent = (
      <div>
        {
           this.state.isAuthenticated ? 
            (<div>
              <h2>YOU ARE AUTHENTICATED</h2>
              <button onClick={this.clickHandler}>Logout</button>
            </div>
              ) : 
            <LoginButton />
        }
      </div>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {loginComponent}
        <Switch>
          <Route path="/google/success" component={AuthSuccess} />
        </Switch>
      </div>
    );
  }
}

export default App;
