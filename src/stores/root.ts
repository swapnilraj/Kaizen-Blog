import {
  combineReducers,
} from 'redux';

import {
  BlogsActions,
  BlogsState,
  blogs,
} from './blogs';

import {
  RouterActions,
  RouterState,
  router,
} from './router';

import {
  combineEpics,
} from 'redux-observable';

import {
  routerEpic,
} from './router';

import {
  getBlogEpic,
  getBlogsEpic,
  setActiveBlogEpic,
} from './blogs'

export type Actions = BlogsActions | RouterActions;

export interface State {
  blogs: BlogsState;
  router: RouterState;
}

export const rootEpic = combineEpics<Actions, State>(
  getBlogEpic,
  getBlogsEpic,
  setActiveBlogEpic,
  routerEpic,
);

export const rootReducer = combineReducers<State>({
  blogs,
  router,
});