/**
 * Reducer/Actions for Blogs
 */
import {
  Epic,
} from 'redux-observable';

import {
  State,
} from './root'

import Sync from '../sync/Firebase';

type GetBlogs = 'GET_BLOGS';
const GET_BLOGS: GetBlogs = 'GET_BLOGS';
interface GetBlogsAction {
  type: GetBlogs;
}
export const getBlogs = () => ({
  type: GET_BLOGS,
});

type GetBlogsSuccess = 'GET_BLOGS_SUCCESS';
export const GET_BLOGS_SUCCESS: GetBlogsSuccess = 'GET_BLOGS_SUCCESS';
interface GetBlogsSuccessAction {
  type: GetBlogsSuccess;
  blogPosts: BlogMap;
}
export const getBlogsSuccess = (blogPosts: BlogMap): GetBlogsSuccessAction => ({
  type: GET_BLOGS_SUCCESS,
  blogPosts,
});

export interface BlogsState {
  blogPosts: BlogMap;
  loading: boolean;
}

export type BlogsActions = GetBlogsAction | GetBlogsSuccessAction;

export const blogEpic: Epic<BlogsActions, State> = action$ =>
  action$
    .ofType(GET_BLOGS)
    .mergeMap(async () => {
      const blogs: BlogMap = (await Sync.getService().getBlogs()) || {};
      return getBlogsSuccess(blogs);
    });

export const blogs = (state: BlogsState = {
  blogPosts: {},
  loading: false,
}, action: BlogsActions): BlogsState => {
  switch(action.type) {
    case GET_BLOGS:
      return {...state, loading: true};
    case GET_BLOGS_SUCCESS:
      return {...state, blogPosts: action.blogPosts, loading: false};
    default:
      return state;
  }
}