import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import App from "./App";

import Index from "../pages/Index";
import PagePlugin from "../pages/Plugin";

export default class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304
      }
    };
  }

  getChildContext() {
    return {
      navOpenState: this.state.navOpenState
    };
  }

  appWithPersistentNav = () => props => (
    <App onNavResize={this.onNavResize} {...props} />
  );

  onNavResize = navOpenState => {
    this.setState({
      navOpenState
    });
  };

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/module/websites">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <hr />
          <Switch>
            <Route path="/">
              <Index />
            </Route>
            <Route path="/module/:module">
              <PagePlugin />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object
};
