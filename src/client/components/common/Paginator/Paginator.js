import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Paginator.scss';

class Paginator extends Component {
  static propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    first: PropTypes.bool,
    last: PropTypes.bool,
    number: PropTypes.number,
    size: PropTypes.number,
    totalElements: PropTypes.number,
    onPage: PropTypes.func,
  }

  static calcRange = (page, size, totalPages) => {
    const startRange = (size * page) + 1;
    let endRange;
    if (totalPages - startRange < size) {
      endRange = totalPages;
    } else {
      endRange = (page + 1) * size;
    }
    return `${startRange} - ${endRange}`;
  }

  static calcPagesStack = (currentPage, totalPages, stackSize) => {
    let start;
    if (currentPage <= 6) {
      start = 1;
    } else if (currentPage > 6 && (totalPages - currentPage) >= 6) {
      start = currentPage - 5;
    } else if ((totalPages - currentPage) < 6) {
      start = (totalPages - stackSize) + 1;
    }
    const arr = [];
    for (let i = start; i < stackSize + start; i++) {
      arr.push(i);
    }
    return arr;
  }

  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      totalPages: props.totalPages,
    };
  }

  static getDerivedStateFromProps(props) {
    const { page, totalPages } = props;
    return { page, totalPages };
  }

  handleClick = (event) => {
    event.preventDefault();
  }

  handleOnPage = (currentPage) => {
    const { page, totalPages } = this.state;
    if (currentPage === page) {
      return;
    }
    if (currentPage >= 1 && currentPage <= totalPages) {
      const { onPage } = this.props;
      this.setState({ page: +currentPage }, () => onPage(+currentPage));
    }
  }

  handleToStart = () => {
    const { page } = this.state;
    if (page > 1) {
      const { onPage } = this.props;
      this.setState({ page: 1 }, () => onPage(1));
    }
  }

  handleToEnd = () => {
    const { onPage } = this.props;
    const { page, totalPages } = this.state;
    if (page !== totalPages) {
      this.setState({ page: +totalPages }, () => onPage(+totalPages));
    }
  }

  render() {
    const {
      first,
      last,
      number,
      size,
      totalElements,
    } = this.props;
    const { page, totalPages } = this.state;
    const stackSize = totalPages > 11 ? 11 : totalPages;
    const pagesStack = Paginator.calcPagesStack(page, totalPages, stackSize);
    return (
      <div className="paginator">

        <div className="paginator-range">
          <span>
            {Paginator.calcRange(number, size, totalElements)}
            of
            {totalElements}
          </span>
        </div>

        <ul
          className="uui-pagination"
          onClick={this.handleClick}
          role="presentation"
        >
          <li className="actions-wrapper">
            <ul className="pagination-items">
              <li className={first && totalElements ? 'disable' : null}>
                <a
                  onClick={() => this.handleToStart()}
                  href="/"
                >
                  <i className="fa fa-angle-double-left" />
                </a>
              </li>
              <li className={first && totalElements ? 'disable' : null}>
                <a
                  onClick={() => this.handleOnPage(page - 1)}
                  href="/"
                >
                  <i className="fa fa-angle-left" />
                </a>
              </li>
            </ul>
          </li>

          <li className="pages-wrapper">
            <ul className="pagination-items">
              {pagesStack.map(num => (
                <li
                  key={num}
                  className={`${num == page ? 'active' : ''}`}
                >
                  <a
                    onClick={() => this.handleOnPage(num)}
                    href="/"
                  >
                    {num}
                  </a>
                </li>))
              }
            </ul>
          </li>

          <li className="actions-wrapper">
            <ul className="pagination-items">
              <li className={last && totalElements ? 'disable' : null}>
                <a
                  onClick={() => this.handleOnPage(page + 1)}
                  href="/"
                >
                  <i className="fa fa-angle-right" />
                </a>
              </li>
              <li className={last && totalElements ? 'disable' : null}>
                <a
                  onClick={() => this.handleToEnd()}
                  href="/"
                >
                  <i className="fa fa-angle-double-right" />
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    );
  }
}

export default Paginator;
