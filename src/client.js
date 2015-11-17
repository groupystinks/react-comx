import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
  basename: '/react-comx',
});

const Routes = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
    </Route>
  </Router>
);


ReactDOM.render(Routes, document.getElementById('root'));
