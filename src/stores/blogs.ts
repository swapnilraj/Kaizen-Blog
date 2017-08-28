/**
 * Reducer/Actions for Blogs
 */

type GetBlogs = 'GET_BLOGS';
const GET_BLOGS: GetBlogs = 'GET_BLOGS';
interface GetBlogsAction {
  type: GetBlogs;
}
export const getBlogs = () => ({
  type: GET_BLOGS,
});

export type BlogsActions = GetBlogsAction;

export interface BlogsState {
  blogs: BlogMap;
  loading: boolean;
}

export const blogs = (state: BlogsState = {
  blogs: {},
  loading: false,
}, action: BlogsActions): BlogsState => {
  switch(action.type) {
    case GET_BLOGS:
      return {...state, loading: true};
    default:
      return state;
  }
}
