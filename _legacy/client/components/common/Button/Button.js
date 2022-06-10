import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

class Button extends Component {
  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    transparent: PropTypes.bool,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const { name, className, transparent = false } = this.props;
    return (
      <button
        className={`dh-button ${transparent ? 'transparent' : ''} ${className}`}
        type="button"
        onClick={this.handleClick}
      >
        {name}
      </button>
    );
  }
}

export default Button;
