/**
 * Reducer/Action for Authors
 */

import {
  State,
} from './root'

import {
  Epic,
} from 'redux-observable';

import Sync from '../sync/Firebase';

type GetAuthor = 'GET_AUTHOR';
const GET_AUTHOR: GetAuthor = 'GET_AUTHOR';
interface GetAuthorAction {
  type: GetAuthor;
  username: string;
}
export const getAuthor = (username: string): GetAuthorAction => ({
  type: GET_AUTHOR,
  username,
});

type GetAuthorSuccess = 'GET_AUTHOR_SUCCESS';
const GET_AUTHOR_SUCCESS: GetAuthorSuccess = 'GET_AUTHOR_SUCCESS';
interface GetAuthorSuccessAction {
  type: GetAuthorSuccess;
  author: Author;
  username: Author['username'];
}
export const getAuthorSuccess = (
  username: Author['username'],
  author: Author
): GetAuthorSuccessAction => ({
  type: GET_AUTHOR_SUCCESS,
  author,
  username,
});

interface SetActiveAuthorAction {
  type: 'SET_ACTIVE_AUTHOR';
  username: string;
}
const SET_ACTIVE_AUTHOR: SetActiveAuthorAction['type'] = 'SET_ACTIVE_AUTHOR';
export const setActiveAuthor = (username: string): SetActiveAuthorAction => ({
  type: SET_ACTIVE_AUTHOR,
  username,
});

export const setActiveAuthorEpic: Epic<AuthorActions, State> = action$ =>
  action$.ofType(SET_ACTIVE_AUTHOR)
    .map(action => getAuthor(action.username));

export const getAuthorEpic: Epic<AuthorActions, State> = (action$, state) =>
  action$.ofType(GET_AUTHOR)
    .mergeMap(async ({
      username,
    }: GetAuthorAction) => {
      const  {
        authors
      } = state.getState().authors;
      return getAuthorSuccess(
        username,
        authors[username] || await Sync.getService().getAuthor(username),
      );
    });

export type AuthorActions =
  GetAuthorAction |
  GetAuthorSuccessAction |
  SetActiveAuthorAction;

export interface AuthorState {
  authors: AuthorMap;
  loading: boolean;
  selectedAuthor: Author['id'] | null;
}

export const authors = (state: AuthorState = {
  authors: {},
  loading: false,
  selectedAuthor: null,
}, action: AuthorActions): AuthorState => {
  switch(action.type) {
    case GET_AUTHOR:
      return {...state, loading: true};
    case GET_AUTHOR_SUCCESS:
      return {...state, loading: false, authors: {
          ...state.authors,
          [action.username]: action.author || state.authors[action.username],
        }
      };
    case SET_ACTIVE_AUTHOR:
      return {...state, selectedAuthor: action.username};
    default:
      return state;
  }
};