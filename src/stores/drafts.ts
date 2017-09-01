import {
  Epic,
} from 'redux-observable';

import {
  State,
} from './root';

import {
  newDraft,
} from '../utils';

import Sync from '../sync/Firebase';

interface InitDraftAction {
  type: 'INIT_DRAFT';
}
const INIT_DRAFT: InitDraftAction['type'] = 'INIT_DRAFT';
export const initDraft = () => ({
  type: INIT_DRAFT,
});

interface SaveDraftAction {
  type: 'SAVE_DRAFT';
  draft: Blog;
}
const SAVE_DRAFT: SaveDraftAction['type'] = 'SAVE_DRAFT';
export const saveDraft = (draft: Blog) => ({
  type: SAVE_DRAFT,
  draft,
});

interface SaveDraftOnlineAction {
  type: 'SAVE_DRAFT_ONLINE';
  draft: Blog;
}
const SAVE_DRAFT_ONLINE: SaveDraftOnlineAction['type'] = 'SAVE_DRAFT_ONLINE';
const saveDraftOnline = (draft: Blog) => ({
  type: SAVE_DRAFT_ONLINE,
  draft,
});

interface SaveDraftOnlineSuccessAction {
  type: 'SAVE_DRAFT_ONLINE_SUCCESS';
  draftId: Blog['id'];
}
const SAVE_DRAFT_ONLINE_SUCCESS: SaveDraftOnlineSuccessAction['type'] = 'SAVE_DRAFT_ONLINE_SUCCESS';
const saveDraftOnlineSuccess = (draftId: Blog['id']) => ({
  type: SAVE_DRAFT_ONLINE_SUCCESS,
  draftId,
});

export interface DraftsState {
  drafts: BlogMap;
  activeDraft: Blog['id'] | null;
}

export type DraftsActions =
  InitDraftAction |
  SaveDraftAction |
  SaveDraftOnlineAction |
  SaveDraftOnlineSuccessAction;

export const saveDraftEpic: Epic<DraftsActions, State> = action$ =>
  action$.ofType(SAVE_DRAFT)
    .map((action: SaveDraftAction) => saveDraftOnline(action.draft));

export const saveDraftOnlineEpic: Epic<DraftsActions, State> = action$ =>
  action$.ofType(SAVE_DRAFT_ONLINE)
    .mergeMap((action: SaveDraftOnlineAction) =>
        Sync.getService()
          .setBlog(action.draft.id, action.draft)
          .then(draft => draft.id)
    )
    .map(saveDraftOnlineSuccess);

export const drafts = (state: DraftsState = {
  drafts: {},
  activeDraft: null,
}, action: DraftsActions): DraftsState => {
  switch(action.type) {
    case INIT_DRAFT:
      const draft = newDraft();
      return {...state, activeDraft: draft.id, drafts: {
        ...state.drafts,
        [draft.id]: draft,
      }};
    case SAVE_DRAFT:
      return {...state, drafts: {
        ...state.drafts,
        [action.draft.id]: action.draft,
      }};
    default:
      return state;
  }
};