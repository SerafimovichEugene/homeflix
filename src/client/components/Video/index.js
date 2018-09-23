import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Video from './Video';

const getVideos = state => state.videosReducer.videos;

const mapStateToProps = state => ({
  videos: getVideos(state),
});

export default withRouter(connect(mapStateToProps, null)(Video));
