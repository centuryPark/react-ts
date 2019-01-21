import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { History } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import * as reducers from './reducers';

const w: any = window;

export default (history: History, initialState: any) => {
  // redux 调试插件配置
  let composeEnhancer: any;
  if (process.env.NODE_ENV !== 'production' && w.devToolsExtension) {
    composeEnhancer = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  } else {
    composeEnhancer = compose;
  }
  return createStore(
    combineReducers(
      {
        ...reducers,
        router: connectRouter(history),
      },
    ),
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
      ),
    ),
  );
};
