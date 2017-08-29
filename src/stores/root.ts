import {
  combineReducers,
} from 'redux';

import {
  BlogsActions,
  BlogsState,
  blogs,
} from './blogs';

import {
  combineEpics,
} from 'redux-observable';

import {
  blogEpic,
} from './blogs'

export type Actions = BlogsActions;

export interface State {
  blogs: BlogsState;
}

export const rootEpic = combineEpics<Actions, State>(
  blogEpic,
);

export const rootReducer = combineReducers<State>({
  blogs,
});