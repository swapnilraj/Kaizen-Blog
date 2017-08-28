import Router from 'preact-router';
import { h, render } from 'preact';

import Blogs from './components/Blogs';

const App = () => (
  <Router>
    <Blogs blogs={ [] } path="/"/>
  </Router>
);

render(App(), document.body);