import Router from 'preact-router';
import { h, render } from 'preact';

import Home from './components/Home';

const App = () => (
  <Router>
    <Home path="/"/>
  </Router>
);

render(App(), document.body);