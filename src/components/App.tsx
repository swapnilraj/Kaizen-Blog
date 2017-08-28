import {
  h,
} from 'preact';
import {
  Provider,
} from 'preact-redux';
import Router from 'preact-router';
import configureStore from '../stores/index';

import BlogsContainer from '../containers/BlogsContainer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <BlogsContainer path="/" />
    </Router>
  </Provider>
);

export default App;