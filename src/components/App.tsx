import {
  h,
} from 'preact';
import {
  Provider,
} from 'preact-redux';
import Router from 'preact-router';
import configureStore from '../stores/index';

import BlogsContainer from '../containers/BlogsContainer';

import BlogPost from '../components/BlogPost';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <BlogsContainer path="/" />
      <BlogPost path="/blogs/:id"/>
    </Router>
  </Provider>
);

export default App;