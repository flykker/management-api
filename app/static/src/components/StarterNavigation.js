import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Nav, {
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkSearchDrawer
} from "@atlaskit/navigation";
import DashboardIcon from "@atlaskit/icon/glyph/dashboard";
import GearIcon from "@atlaskit/icon/glyph/settings";
import SearchIcon from "@atlaskit/icon/glyph/search";
import CreateIcon from "@atlaskit/icon/glyph/add";
import AtlassianIcon from "@atlaskit/icon/glyph/atlassian";
import ArrowleftIcon from "@atlaskit/icon/glyph/arrow-left";

import CreateDrawer from "../components/CreateDrawer";
import SearchDrawer from "../components/SearchDrawer";
import HelpDropdownMenu from "../components/HelpDropdownMenu";
import AccountDropdownMenu from "../components/AccountDropdownMenu";
import atlaskitLogo from "../images/atlaskit.png";

export default class StarterNavigation extends React.Component {
  state = {
    navLinks: [],
    config: []
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object
  };

  openDrawer = openDrawer => {
    this.setState({ openDrawer });
  };

  shouldComponentUpdate(nextProps, nextContext) {
    return true;
  }

  componentDidMount() {
    this._asyncRequest = fetch("/app.json")
      .then(response => response.json())
      .then(data => {
        this._asyncRequest = null;
        let navLinks = data.plugins;
        console.log("Load config", data);
        this.setState({ navLinks: navLinks });
      });

    console.log(this.context.router);
  }

  navIcon = (Icon, title) => {
    const listIcon = {
      DashboardIcon: DashboardIcon,
      GearIcon: GearIcon
    };

    const NavIcon = listIcon[Icon];
    //console.log(NavIcon);
    return <NavIcon label={title} size="medium" />;
  };

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = (
      <AtlassianIcon label="Atlassian icon" size="xlarge" />
    );
    let width = 300;
    return (
      <Nav
        width={width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="/"
            icon={<img alt="atlaskit logo" src={atlaskitLogo} />}
            text="Чайка Телеком Хостинг"
          />
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="/"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        hasBlanket
        drawers={[
          <AkCreateDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === "create"}
            key="create"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <CreateDrawer onItemClicked={() => this.openDrawer(null)} />
          </AkCreateDrawer>
        ]}
        globalAccountItem={AccountDropdownMenu}
        globalCreateIcon={<CreateIcon label="Create icon" />}
        globalHelpItem={HelpDropdownMenu}
        onSearchDrawerOpen={() => this.openDrawer("search")}
        onCreateDrawerOpen={() => this.openDrawer("create")}
      >
        {this.state.navLinks.map(link => {
          const [url, title, Icon] = link;
          return (
            <Link key={url} to={url}>
              <AkNavigationItem icon={this.navIcon(Icon, title)} text={title} />
            </Link>
          );
        }, this)}
      </Nav>
    );
  }
}
