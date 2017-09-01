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


interface GetBlogsAction {
  type: 'GET_BLOGS';
}
const GET_BLOGS: GetBlogsAction['type'] = 'GET_BLOGS';
export const getBlogs = (): GetBlogsAction => ({
  type: GET_BLOGS,
});

interface GetBlogsSuccessAction {
  type: 'GET_BLOGS_SUCCESS';
  blogPosts: BlogMap;
}
const GET_BLOGS_SUCCESS: GetBlogsSuccessAction['type'] = 'GET_BLOGS_SUCCESS';
export const getBlogsSuccess = (blogPosts: BlogMap): GetBlogsSuccessAction => ({
  type: GET_BLOGS_SUCCESS,
  blogPosts,
});

interface GetBlogAction {
  type: 'GET_BLOG';
  id: string;
}
const GET_BLOG: GetBlogAction['type'] = 'GET_BLOG';
export const getBlog = (id: string): GetBlogAction => ({
  type: GET_BLOG,
  id,
});

interface GetBlogSuccessAction {
  type: 'GET_BLOG_SUCCESS';
  id: string;
  blog: Blog | null;
}
const GET_BLOG_SUCCESS: GetBlogSuccessAction['type'] = 'GET_BLOG_SUCCESS';
const getBlogSuccess = (id: string, blog: Blog | null): GetBlogSuccessAction => ({
  type: GET_BLOG_SUCCESS,
  id,
  blog,
});

interface SetActivePostAction {
  type: 'SET_ACTIVE_POST';
  id: string;
}
const SET_ACTIVE_POST: SetActivePostAction['type'] = 'SET_ACTIVE_POST';
export const setActivePost = (id: string): SetActivePostAction => ({
  type: SET_ACTIVE_POST,
  id,
});

export interface BlogsState {
  blogPosts: BlogMap;
  loading: boolean;
  selectedPost: string | null;
}

export type BlogsActions =
  GetBlogsAction |
  GetBlogsSuccessAction |
  GetBlogAction |
  GetBlogSuccessAction |
  SetActivePostAction;

export const getBlogsEpic: Epic<BlogsActions, State> = action$ =>
  action$
    .ofType(GET_BLOGS)
    .mergeMap(async () => {
      const blogs: BlogMap = (await Sync.getService().getBlogs()) || {};
      return getBlogsSuccess(blogs);
    });

export const getBlogEpic: Epic<BlogsActions, State> = (action$, state) =>
  action$.ofType(GET_BLOG)
    .mergeMap(async (action: GetBlogAction) => {
      const {
        blogPosts,
      } = state.getState().blogs;

      return getBlogSuccess(
        action.id,
        blogPosts[action.id] || await Sync.getService().getBlog(action.id)
      );
    });

export const setActiveBlogEpic: Epic<BlogsActions, State> = action$ =>
  action$.ofType(SET_ACTIVE_POST)
    .map((action: SetActivePostAction) => getBlog(action.id));

export const blogs = (state: BlogsState = {
  blogPosts: {},
  loading: false,
  selectedPost: null,
}, action: BlogsActions): BlogsState => {
  switch(action.type) {
    case GET_BLOGS:
      return {...state, loading: true};
    case GET_BLOGS_SUCCESS:
      return {...state, blogPosts: action.blogPosts, loading: false};
    case GET_BLOG:
      return {...state, loading: true};
    case GET_BLOG_SUCCESS:
      return {...state, loading: false, blogPosts: {
        ...state.blogPosts,
        [action.id]: action.blog || state.blogPosts[action.id],
      }};
    case SET_ACTIVE_POST:
      return {...state, selectedPost: action.id};
    default:
      return state;
  }
}