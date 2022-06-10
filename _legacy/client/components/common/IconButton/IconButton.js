import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';


class IconButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
  }

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const { children, className } = this.props;
    return (
      <button
        className={`dh-icon-button ${className}`}
        type="button"
        onClick={this.handleClick}
      >
        {children}
      </button>
    );
  }
}

export default IconButton;
