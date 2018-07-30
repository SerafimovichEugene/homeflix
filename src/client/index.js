import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import App from './components/App';

// import reducers from './reducers/index';

import './styles/index.scss';

const history = createHistory({
  basename: process.env.BASE_HREF,
});
// const logger = createLogger({
//   collapsed: true,
// });
// const store = createStore(reducers, applyMiddleware(thunk, logger));

const Wrapp = () => (
  // <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  // </Provider>
);

render(<Wrapp />, document.getElementById('root'));
