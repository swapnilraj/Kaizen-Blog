import {
  connect,
} from 'preact-redux';

import {
  bindActionCreators,
  Dispatch,
 } from 'redux';

import {
  setActivePost,
} from '../stores/blogs';

import {
  State,
} from '../stores/root';

import BlogPost from '../components/BlogPost';

const mapState = (state: State) => ({
  blogs: state.blogs.blogPosts,
  loading: state.blogs.loading,
  selectedPost: state.blogs.selectedPost,
});

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  setActivePost,
}, dispatch);

const BlogPostContainer = connect(
  mapState,
  mapDispatch,
)(BlogPost);

export default BlogPostContainer;