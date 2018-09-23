import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropDownButton.scss';

class DropDownButton extends Component {
  static propTypes = {
    menuName: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    transparent: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleToogleMenu = (e) => {
    const { isOpen } = this.state;
    if (this.menuRef.contains(e.target)) {
      this.setState({ isOpen: !isOpen });
    }
  }

  handleOutsideClick = (e) => {
    if (!this.menuRef.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const {
      children,
      menuName,
      className,
      transparent = false,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={`dh-dropdown-button ${className}`}
        ref={(ref) => { this.menuRef = ref; }}
      >
        <button
          className={transparent ? 'transparent' : ''}
          onClick={this.handleToogleMenu}
          type="button"
        >
          <span className="dropdown-button-name">
            {menuName}
          </span>
          <div className="dropdown-button-arrow">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </div>
        </button>

        {isOpen
          ? (
            <div className="dropdown-button-items">
              {children}
            </div>
          )
          : null
        }

      </div>
    );
  }
}

export default DropDownButton;
