import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlertPopUp.scss';

class AlertPopUp extends Component {
  static propTypes = {
    resetMessages: PropTypes.func,
    error: PropTypes.object,
    success: PropTypes.object,
  }

  handleCloseAlert = () => {
    const { resetMessages } = this.props;
    resetMessages();
  }

  render() {
    const { error, success } = this.props;
    let message = '';
    let color = '';
    if (error) {
      message = error.message;
      color = 'raspberry';
    } else if (success) {
      setTimeout(this.handleCloseAlert, 5000);
      message = success.message || 'success';
      color = 'lime-green';
    }

    return (
      <div>
        {(error || success) && (
          <div
            className={`alert-wrapper ${color}`}
            role="alert"
          >
            <div className="alert-message">
              {error && <i className="fa fa-exclamation-triangle" />}
              <span>
                { message }
              </span>
            </div>
            <div className="alert-close">
              <button
                className="transparent-button"
                onClick={this.handleCloseAlert}
                type="button"
              >
                <i className="fa fa-close" />
              </button>
            </div>
          </div>)
        }
      </div>
    );
  }
}

export default AlertPopUp;
