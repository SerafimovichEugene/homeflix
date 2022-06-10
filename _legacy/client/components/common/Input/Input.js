import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autosize from 'autosize';

import './Input.scss';

class Input extends Component {
  static propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    isError: PropTypes.bool,
    isLongText: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
  }

  componentDidMount() {
    const { isLongText = false } = this.props;
    if (isLongText) {
      autosize(this.textAreaRef);
    }
  }

  render() {
    const {
      id, value, onChange, isError = false, isLongText = false, onFocus, className,
    } = this.props;
    return !isLongText
      ? (
        <input
          className={`dh-input ${isError ? 'error' : ''} ${className}`}
          type="input"
          id={id}
          onChange={e => onChange(e.target.value)}
          value={value}
          onFocus={onFocus}
        />
      )
      : (
        <textarea
          ref={(ref) => { this.textAreaRef = ref; }}
          className={`dh-input dh-textarea ${isError ? 'error' : ''}`}
          id={id}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          value={value}
        />
      );
  }
}

export default Input;
