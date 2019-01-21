import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Location } from 'history';
import Loadable from 'react-loadable';
import Menu from './menu/index';

const Loading = (): JSX.Element => (
  <span>Loading...</span>
);
const moviesListComponent = Loadable({ loader: () => import('./moviesList'), loading: Loading, delay: 150 });

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

function getMenu(): JSX.Element {
  document.title = '菜单选择';
  return <Menu/>;
}

const BasicRouter = () => (
  <Switch>
    <Route
      path="/menu"
      render={getMenu}
    />
    <Redirect exact from="/" to="/menu"/>
    <Route path="/movies" component={moviesListComponent}/>
    <Route path="*" component={NoMatch}/>
  </Switch>
);
export default BasicRouter;
