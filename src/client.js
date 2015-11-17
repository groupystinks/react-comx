import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const Routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
    </Route>
  </Router>
);


ReactDOM.render(Routes, document.getElementById('root'));
