import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { createSelector } from 'reselect';

import { getVideosAsync } from '../../actions/videosAction';

import Videos from './Videos';

const getVideos = state => state.videosReducer.videos;

const mapStateToProps = state => ({
  videos: getVideos(state),
});

const mapDispatchToProps = dispatch => ({
  getVideos: () => {
    dispatch(getVideosAsync());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Videos));
