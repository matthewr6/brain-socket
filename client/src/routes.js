import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/main';
import Home from './components/home';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
  </Route>
);
