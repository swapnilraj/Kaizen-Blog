import {
  combineReducers,
} from 'redux';

import {
  combineEpics,
} from 'redux-observable';

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
  AuthorState,
  AuthorActions,
  getAuthorEpic,
  setActiveAuthorEpic,
  authors,
} from './authors';

import {
  drafts,
  DraftsActions,
  DraftsState,
  saveDraftEpic,
  saveDraftOnlineEpic,
} from './drafts';

export type Actions =
  BlogsActions |
  RouterActions |
  AuthorActions |
  DraftsActions;

export interface State {
  blogs: BlogsState;
  router: RouterState;
  authors: AuthorState;
  drafts: DraftsState;
}

export const rootEpic = combineEpics<Actions, State>(
  getBlogEpic,
  getBlogsEpic,
  setActiveBlogEpic,
  routerEpic,
  getAuthorEpic,
  setActiveAuthorEpic,
  saveDraftEpic,
  saveDraftOnlineEpic,
);

export const rootReducer = combineReducers<State>({
  blogs,
  router,
  authors,
  drafts,
});