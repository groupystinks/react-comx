import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './App';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const Routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      <Route path="/" component={App} />
    </Route>
  </Router>
);


ReactDOM.render(Routes, document.getElementById('root'));
