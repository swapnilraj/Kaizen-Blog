import { h, Component } from 'preact';
import {
  DraftsState,
} from '../stores/drafts';

interface DraftProps extends DraftsState {
  initDraft: () => void;
  saveDraft: (draft: Blog) => void;
}

class Draft extends Component<DraftProps, any> {

  saveDraft = (e: Event) => {
    e.preventDefault();

    const {
      activeDraft,
      drafts,
      saveDraft,
    } = this.props;

    if (activeDraft) {
      saveDraft(drafts[activeDraft]);
    }
  }

  componentDidMount() {
    const {
      initDraft,
      activeDraft,
      drafts,
    } = this.props;

    if (!activeDraft || !drafts[activeDraft]) {
      initDraft();
    }
  }

  render({
    activeDraft,
    drafts,
  }: DraftProps) {

    if (!activeDraft) {
      return ( <div>loading</div> )
    }

    const draft = drafts[activeDraft];
    console.log(draft);

    return (
      <div>
        <form>
          <div>
            <label for="blog-title">Title</label>
            <input id="blog-title"></input>
          </div>
          <div>
            <label for="blog-status">Status</label>
            <input id="blog-status"></input>
          </div>
          <div>
            <label for="blog-banner">Banner</label>
            <input id="blog-banner"></input>
          </div>
          <div>
            <label for="blog-body">Body</label>
            <textarea id="blog-body"></textarea>
          </div>
          <div>
            <label for="blog-tags">Tags</label>
            <input id="blog-tags"></input>
          </div>
          <button onClick={this.saveDraft}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Draft;