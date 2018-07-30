import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Videos from '../Videos';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>123</header>
        <main>
          <Switch>
            <Route exact path="/" component={Videos} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
