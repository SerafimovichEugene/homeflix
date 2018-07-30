import React from 'react';
import { Route, Switch } from 'react-router';
// import PropTypes from 'prop-types';

import Videos from '../Videos';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Videos} />
        </Switch>
      </div>
    );
  }
}

export default App;
