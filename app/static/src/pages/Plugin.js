import React, { Component } from "react";
import ContentWrapper from "../components/ContentWrapper";
import PropTypes from "prop-types";

import UmdLoader from "react-umd-loader-uni";

const PluginPage = ({ match, location }) => {
  console.log("match:", match, "location:", location);

  let path_arr = location.pathname.split("/").filter(function(e) {
    return e !== "";
  });

  let base_path = "/" + path_arr[0] + "/" + path_arr[1];

  let ModuleName = path_arr
    .splice(0, 2)
    .map(function(e) {
      return e.toLowerCase().replace(/^.|\s\S/g, function(a) {
        return a.toUpperCase();
      });
    })
    .join("");

  console.log(ModuleName, path_arr, base_path);

  return (
    <ContentWrapper>
      <Module module={ModuleName} path_arr={path_arr} base_path={base_path} />
    </ContentWrapper>
  );
};

class Module extends Component {
  render() {
    let Plugin = props => {
      return (
        <UmdLoader
          url={this.props.base_path + "/websites.min.js"}
          name={this.props.module}
          props={{ url: this.props.path_arr }}
        >
          <div></div>
        </UmdLoader>
      );
    };

    return (
      <ContentWrapper>
        <Plugin />
      </ContentWrapper>
    );
  }
}

export default PluginPage;
