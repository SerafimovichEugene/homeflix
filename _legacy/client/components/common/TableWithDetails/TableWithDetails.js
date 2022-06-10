import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './TableWithDetails.scss';
import Iconbutton from '../IconButton';
import closeIcon from '../assets/Close.svg';
import expandIcon from '../assets/expand.svg';

class TableWithDetails extends Component {
  static prepareDataForRender(headers, body) {
    if (!headers || !body) {
      return null;
    }
    const arr = body.map((item, index) => {
      const weights = headers.map(header => header.weight || 1);
      const headerKeys = headers.map(header => header.key);
      const values = headerKeys.map(key => item[key]);
      return {
        id: index,
        values,
        weights,
      };
    });
    return arr;
  }

  static propTypes = {
    children: PropTypes.node,
    body: PropTypes.array.isRequired,
    headers: PropTypes.array,
    hoverableRow: PropTypes.bool,
    onRowClick: PropTypes.func,
    onCloseDetails: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.rowHeight = parseInt(style.rowHeight, 10);
    this.state = {
      numberOfRows: 10,
      selectedRowIndex: null,
    };
  }

  handleRowClick = (e, rowIndex) => {
    const { onRowClick } = this.props;
    if (onRowClick) {
      onRowClick(rowIndex);
      this.setState({ selectedRowIndex: rowIndex });
    }
  }

  handleRowKeyDown = () => {
    this.keyDownTime = new Date().getTime();
  }

  handleRowKeyUp = (e, rowIndex) => {
    const time = new Date().getTime();
    if ((time - this.keyDownTime) < 500) {
      this.handleRowClick(e, rowIndex);
    }
  }

  handleCloseDetails = () => {
    const { onCloseDetails } = this.props;
    onCloseDetails();
    this.setState({ selectedRowIndex: null });
  }

  handleExpand = () => {
    throw Error('hadle Exapnde is not implemented');
  }

  render() {
    const {
      children, body, headers, hoverableRow,
    } = this.props;
    const { numberOfRows, selectedRowIndex } = this.state;
    const tableHeight = (numberOfRows + 1) * this.rowHeight;
    const isHaveDetails = !!React.Children.count(children);
    const tableData = TableWithDetails.prepareDataForRender(headers, body);
    const firstColumnWeight = tableData[0] ? tableData[0].weights[0] : 1;
    const detailsContainerWeight = tableData[0] ? tableData[0].weights.slice(1)
      .reduce((acc, cur) => acc + cur) : 1;

    return (
      <div className="table-with-details">

        <div
          className="table"
          style={{ minHeight: tableHeight }}
        >

          <div className="row header">
            {
              headers.map(header => (
                <div key={header.key} className={`cell w${header.weight}`}>
                  {header.alias || header.key}
                </div>
              ))
            }
          </div>

          {
            tableData.map((rowItem, rowIndex) => (
              <div
                key={rowItem.id}
                role="presentation"
                className={
                  `row
                  ${selectedRowIndex === rowIndex ? 'selected' : ' '}
                  ${hoverableRow ? 'hoverable-row' : ' '}
                  ${rowIndex % 2 === 0 ? 'odd' : ' '}
                  `
                }
                onMouseDown={this.handleRowKeyDown}
                onMouseUp={e => this.handleRowKeyUp(e, rowIndex)}
              >
                {
                  rowItem.values.map((value, index) => (
                    <div
                      key={rowItem.id + headers[index].key}
                      className={`cell w${rowItem.weights[index]}`}
                    >
                      {value}
                    </div>
                  ))
                }
              </div>
            ))
          }

        </div>


        {
          isHaveDetails && (
            <div className="details">
              <div className={`w${firstColumnWeight}`} />
              <div className={`details-container w${detailsContainerWeight}`}>
                <div className="details-container-header">
                  <Iconbutton
                    onClick={this.handleExpand}
                  >
                    {/* <i style={{ fontSize: '18px' }} className="fa fa-expand" /> */}
                    <img src={expandIcon} alt="" />
                  </Iconbutton>

                  <Iconbutton
                    className="close-button"
                    onClick={this.handleCloseDetails}
                  >
                    {/* <i style={{ fontSize: '18px' }} className="fa fa-close" /> */}
                    <img src={closeIcon} alt="" />
                  </Iconbutton>
                </div>
                <div className="details-container-body">
                  {children}
                </div>
              </div>
            </div>
          )
        }


      </div>
    );
  }
}

export default TableWithDetails;
