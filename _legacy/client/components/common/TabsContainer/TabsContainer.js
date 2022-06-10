import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TabsContainer.scss';

class TabsContainer extends Component {
  static propTypes = {
    tabs: PropTypes.string,
    selectedTab: PropTypes.string,
    children: PropTypes.node,
    onTabClick: PropTypes.func,
  }

  handleTabClick = (event, tabName) => {
    event.preventDefault();
    const { onTabClick } = this.props;
    onTabClick(tabName);
  }

  render() {
    const { tabs, selectedTab, children } = this.props;
    const tabsItems = tabs.map(tabName => (
      <li className={`tab ${selectedTab === tabName ? 'active' : ' '}`}>
        <a
          onClick={e => this.handleTabClick(e, tabName)}
          role="presentation"
        >
          {tabName}
        </a>
      </li>
    ));
    tabsItems.push((<li className="last-invisible-tab" />));
    return (
      <div className="dh-tabs-container">
        <ul className="tabs">
          {tabsItems}
        </ul>
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

export default TabsContainer;
