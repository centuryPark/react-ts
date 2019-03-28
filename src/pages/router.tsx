import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Location } from 'history';
import Loadable from 'react-loadable';

const Loading = (): JSX.Element => (
  <span>Loading...</span>
);
const moviesListComponent = Loadable({ loader: () => import('./moviesList'), loading: Loading, delay: 150 });
const menuComponent = Loadable({ loader: () => import('./menu'), loading: Loading, delay: 150 });
// @ts-ignore
const aboutComponent = Loadable({ loader: () => import('./about'), loading: Loading, delay: 150 });

interface NoMatchProps {
  location: Location;
}

const NoMatch = ({ location }: NoMatchProps) => (
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
      component={menuComponent}
    />
    <Redirect exact from="/" to="/menu" />
    <Route path="/movies" component={moviesListComponent} />
    <Route path="/about" component={aboutComponent} />
    <Route path="*" component={NoMatch} />
  </Switch>
);
export default BasicRouter;
