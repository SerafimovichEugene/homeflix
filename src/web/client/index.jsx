import React from 'react';
import { render } from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import logger from 'redux-logger';
import Root from './components/Root/Root';
// import reducer from './reducers/index';

// const store = createStore(
//   reducer,
//   // applyMiddleware(thunk),
//   applyMiddleware(logger),
// );

// const Wrapp = () => (
//   <Provider store={store}>
//     <Root />
//   </Provider>
// );
render(<Root />, document.getElementById('root'));
