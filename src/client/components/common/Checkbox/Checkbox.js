import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    onCheck: PropTypes.func,
  }

  handleCheck = (value, id) => {
    const { onCheck } = this.props;
    onCheck(value, id);
  }

  render() {
    const { id, isChecked } = this.props;
    return (
      <p className="dh-checkbox">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={e => this.handleCheck(e.target.checked, id)}
        />
        <label htmlFor={id} />
      </p>
    );
  }
}

export default Checkbox;
