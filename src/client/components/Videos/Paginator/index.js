import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { createSelector } from 'reselect';

import { getVideosAsync } from '../../../actions/videosAction';

const mapStateToProps = state => ({
  page: state.strategyReducer.pageNumber + 1,
  number: state.strategyReducer.pageNumber,
  totalPages: state.strategyReducer.totalPages,
  totalElements: state.strategyReducer.totalVideos,
  size: state.strategyReducer.size,
  first: state.strategyReducer.first,
  last: state.strategyReducer.last,
});

const mapDispatchToProps = dispatch => ({
  onPage: (page) => {
    dispatch(getVideosAsync());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paginator));
