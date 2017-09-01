import {
  connect,
} from 'preact-redux';

import {
  Dispatch,
  bindActionCreators,
} from 'redux';

import {
  setActiveAuthor,
} from '../stores/authors';

import {
  State,
} from '../stores/root';

import Author from '../components/Author';

const mapState = (state: State) => ({
  username: state.authors.selectedAuthor,
  loading: state.authors.loading,
  authorsInfo: state.authors.authors,
});

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  setActiveAuthor,
}, dispatch);

const AuthorContainer = connect(
  mapState,
  mapDispatch,
)(Author);

export default AuthorContainer;