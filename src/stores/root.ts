import {
  combineReducers,
} from 'redux';

import {
  BlogsActions,
  BlogsState,
  blogs,
} from './blogs';

export type Actions = BlogsActions;

export interface State {
  blogs: BlogsState;
}

export const rootReducer = combineReducers<State>({
  blogs,
});