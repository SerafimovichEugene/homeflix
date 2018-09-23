// import { connect } from 'react-redux';
// import qs from 'qs';
// import { withRouter } from 'react-router-dom';
// import { getSchemasAsync } from '../../../actions/schemasActions';
// import Paginator from './Paginator';

// const mapStateToProps = state => ({
//   page: state.schemasReducer.page,
//   totalPages: state.schemasReducer.totalPages,
//   number: state.schemasReducer.number,
//   numberOfElements: state.schemasReducer.numberOfElements,
//   totalElements: state.schemasReducer.totalElements,
//   size: state.schemasReducer.size,
//   first: state.schemasReducer.first,
//   last: state.schemasReducer.last,
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onPage: (page) => {
//     const { search } = ownProps.location;
//     const params = qs.parse(search, { ignoreQueryPrefix: true });
//     params.page = page;
//     dispatch(getSchemasAsync(params));
//   },
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Paginator));
import Paginator from './Paginator';

export default Paginator;
