import {
  connect,
} from 'preact-redux';

import {
  Dispatch,
  bindActionCreators,
} from 'redux';

import {
  initDraft,
  saveDraft,
} from '../stores/drafts';

import {
  State,
} from '../stores/root';

import Draft from '../components/Draft';

const mapState = (state: State) => state.drafts;

const mapDispatch = (dispatch: Dispatch<State>) => bindActionCreators({
  initDraft,
  saveDraft,
}, dispatch);

const DraftContainer = connect(
  mapState,
  mapDispatch,
)(Draft);

export default DraftContainer;