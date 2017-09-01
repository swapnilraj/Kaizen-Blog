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
export const getBlogs = (): GetBlogsAction => ({
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

type GetBlog = 'GET_BLOG';
const GET_BLOG: GetBlog = 'GET_BLOG';
interface GetBlogAction {
  type: GetBlog;
  id: string;

}
export const getBlog = (id: string): GetBlogAction => ({
  type: GET_BLOG,
  id,
});

type GetBlogSuccess = 'GET_BLOG_SUCCESS';
export const GET_BLOG_SUCCESS: GetBlogSuccess = 'GET_BLOG_SUCCESS';
interface GetBlogSuccessAction {
  type: GetBlogSuccess;
  id: string;
  blog: Blog | null;
}
const getBlogSuccess = (id: string, blog: Blog | null): GetBlogSuccessAction => ({
  type: GET_BLOG_SUCCESS,
  id,
  blog,
});

type SetActivePost = 'SET_ACTIVE_POST';
const SET_ACTIVE_POST: SetActivePost = 'SET_ACTIVE_POST';
interface SetActivePostAction {
  type: SetActivePost;
  id: string;
}
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