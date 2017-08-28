import {
  connect,
} from 'preact-redux';

import {
  bindActionCreators,
  Dispatch,
} from 'redux';

import {
  getBlogs,
} from '../stores/blogs';

import {
  State,
} from '../stores/root';

import Blogs from '../components/Blogs';

const mapState = (state: State) => ({
  blogs: Object.keys(state.blogs.blogs).map(k => state.blogs.blogs[k]),
  loading: state.blogs.loading,
});

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  getBlogs,
}, dispatch);

const BlogsContainer = connect(
  mapState,
  mapDispatch,
)(Blogs);

export default BlogsContainer;