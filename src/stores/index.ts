/**
 * Application store configuration
 */

import {
  createStore,
} from 'redux';

import {
  State,
  rootReducer,
} from './root';

import {
  preloadedState,
} from '../utils';

export default function configureStore() {
  const store = createStore<State>(
    rootReducer,
    preloadedState(),
  );

  return store;
}