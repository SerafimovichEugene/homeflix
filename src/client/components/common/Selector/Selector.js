import React, { Component } from 'react';
import PropTypes from 'prop-types';

import arrow from './assets/selector-arrow.png';
import './Selector.scss';

class Selector extends Component {
  static propTypes = {
    options: PropTypes.array,
    onOptionChange: PropTypes.func,
    isError: PropTypes.bool,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (!this.selector.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleToogleSelector = (e) => {
    const { isOpen } = this.state;
    if (this.selector.contains(e.target)) {
      this.setState({ isOpen: !isOpen });
    }
  }

  handleSelectOption = (e, option) => {
    e.preventDefault();
    const { isOpen } = this.state;
    const { onOptionChange } = this.props;
    if (onOptionChange) { onOptionChange(option); }
    this.setState({ isOpen: !isOpen, selectedOption: option });
  }

  render() {
    const {
      options, isError = false, className,
    } = this.props;
    const { isOpen, selectedOption } = this.state;
    return (
      <div
        className={`dh-selector ${className}`}
        ref={(ref) => { this.selector = ref; }}
      >
        <button
          className={`${isError ? 'error' : ''}`}
          type="button"
          onClick={this.handleToogleSelector}
        >
          <span>
            {selectedOption || 'choose option'}
          </span>
          <div className={`arrow ${isOpen ? 'open' : ''}`}>
            <img src={arrow} alt="selector arrow" />
          </div>
        </button>
        {isOpen && (
          <div className="dh-selector-options">
            <ul>
              {options.map(option => (
                <li key={option}>
                  <a
                    href="#"
                    onClick={e => this.handleSelectOption(e, option)}
                    className={selectedOption === option ? 'active' : ''}
                  >
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </div>)
        }
      </div>
    );
  }
}

export default Selector;
