import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Menu from './menu';

const Loading = () => (
  <span>Loading...</span>
);
const moviesListComponent = Loadable({
  loader: () => import(/* webpackChunkName: "moviesList" */ './moviesList'),
  loading: Loading,
  delay: 15000,
});
const countComponent = Loadable({
  loader: () => import('./count'),
  loading: Loading,
  delay: 15000,
});
const AboutComponent = Loadable({ loader: () => import('./about'), loading: Loading, delay: 150 });
const DotComponent = Loadable({ loader: () => import('./insurance'), loading: Loading, delay: 150 });

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for
      {' '}
      <code>{location.pathname}</code>
    </h3>
  </div>
);

const BasicRouter = () => (
  <Switch>
    <Route
      path="/menu"
      component={Menu}
    />
    <Redirect exact from="/" to="/menu" />
    <Route path="/movies" component={moviesListComponent} />
    <Route path="/count" component={countComponent} />
    <Route path="/about" component={AboutComponent} />
    <Route path="/dot" component={DotComponent} />
    <Route path="/count" component={countComponent} />
    <Route path="*" component={NoMatch} />
  </Switch>
);
export default BasicRouter;
