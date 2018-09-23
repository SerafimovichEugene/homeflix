import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

class Loader extends Component {
  static propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
  }

  render() {
    const { type, color } = this.props;
    return (
      <div>
        <div className={`uui-loader ${type} ${color}`}>
          <div className="dot dot-1" />
          <div className="dot dot-2" />
          <div className="dot dot-3" />
          <div className="dot dot-4" />
          <div className="dot dot-5" />
          <div className="dot dot-6" />
          <div className="dot dot-7" />
          <div className="dot dot-8" />
          <div className="dot dot-9" />
          <div className="dot dot-10" />
          <div className="dot dot-11" />
          <div className="dot dot-12" />
        </div>
      </div>
    );
  }
}

export default Loader;
