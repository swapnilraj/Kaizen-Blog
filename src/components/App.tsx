import {
  h,
} from 'preact';
import {
  Provider,
} from 'preact-redux';
import Router from 'preact-router';
import configureStore from '../stores/index';

import BlogsContainer from '../containers/BlogsContainer';
import BlogPostContainer from '../containers/BlogPostContainer';
import AuthorContainer from '../containers/AuthorContainer';
import DraftsContainer from '../containers/DraftsContainer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <BlogsContainer path="/" />
      <BlogPostContainer path="/blogs/:id"/>
      <AuthorContainer path="/u/:id/:action?"/>
      <DraftsContainer path="/new" />
    </Router>
  </Provider>
);

export default App;