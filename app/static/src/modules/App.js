import PropTypes from "prop-types";
import React, { Component } from "react";
import Page from "@atlaskit/page";
import "@atlaskit/css-reset";

import { HashRouter, Switch, Route } from "react-router-dom";

import StarterNavigation from "../components/StarterNavigation";
import Index from "../pages/Index";

import PluginPage from "../pages/Plugin";

export default class App extends Component {
  state = {
    flags: [],
    isModalOpen: false
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object
  };

  static propTypes = {
    navOpenState: PropTypes.object,
    onNavResize: PropTypes.func
  };

  static childContextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func
  };

  getChildContext() {
    return {
      showModal: this.showModal,
      addFlag: this.addFlag
    };
  }

  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Page navigation={<StarterNavigation />}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/modules/:module" component={PluginPage} />
            </Switch>
          </Page>
        </div>
      </HashRouter>
    );
  }
}
