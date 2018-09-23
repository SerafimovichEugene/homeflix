import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paginator from '../../common/Paginator';
import { getVideosAsync } from '../../../actions/videosAction';

const mapStateToProps = state => ({
  page: state.videosReducer.pageNumber + 1,
  number: state.videosReducer.pageNumber,
  totalPages: state.videosReducer.totalPages,
  totalElements: state.videosReducer.totalVideos,
  size: state.videosReducer.size,
  first: false,
  last: false,
});

const mapDispatchToProps = dispatch => ({
  onPage: (page) => {
    console.log(page);
    dispatch(getVideosAsync({ page: +page - 1 }));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paginator));
