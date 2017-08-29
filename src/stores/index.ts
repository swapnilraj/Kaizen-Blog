/**
 * Application store configuration
 */

import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';

import {
  createEpicMiddleware,
} from 'redux-observable';

import {
  State,
  rootReducer,
  rootEpic,
} from './root';

import {
  preloadedState,
} from '../utils';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default function configureStore() {
  const store = createStore<State>(
    rootReducer,
    preloadedState(),
    composeEnhancers(
      applyMiddleware(
        createEpicMiddleware(rootEpic)
      )
    ),
  );

  return store;
}