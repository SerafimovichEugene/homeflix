import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Panel.scss';

class Panel extends Component {
  static headerName = {
    isShowModal: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { headerName, className, children } = this.props;
    return (
      <div className={`dh-panel ${className}`}>
        <div className="header">
          <h4>{headerName}</h4>
        </div>
        <div className="body">
          {children}
        </div>
      </div>
    );
  }
}

export default Panel;
