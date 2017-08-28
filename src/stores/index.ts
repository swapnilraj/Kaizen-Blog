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

export default function configureStore() {
  const store = createStore<State>(
    rootReducer,
  );

  return store;
}