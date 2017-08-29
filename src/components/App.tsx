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

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <BlogsContainer path="/" />
      <BlogPostContainer path="/blogs/:id"/>
    </Router>
  </Provider>
);

export default App;