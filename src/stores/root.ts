import {
  combineReducers,
} from 'redux';

import {
  BlogsActions,
  BlogsState,
  blogs,
  getBlogEpic,
  getBlogsEpic,
  setActiveBlogEpic,
} from './blogs';

import {
  RouterActions,
  RouterState,
  router,
  routerEpic,
} from './router';

import {
  combineEpics,
} from 'redux-observable';

import {
  AuthorState,
  AuthorActions,
  getAuthorEpic,
  setActiveAuthorEpic,
  authors,
} from './authors';

export type Actions = BlogsActions | RouterActions | AuthorActions;

export interface State {
  blogs: BlogsState;
  router: RouterState;
  authors: AuthorState;
}

export const rootEpic = combineEpics<Actions, State>(
  getBlogEpic,
  getBlogsEpic,
  setActiveBlogEpic,
  routerEpic,
  getAuthorEpic,
  setActiveAuthorEpic,
);

export const rootReducer = combineReducers<State>({
  blogs,
  router,
  authors,
});