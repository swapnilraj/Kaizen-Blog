import { h, Component } from 'preact';

interface AuthorProps {
  id: string;
  username: string;
  loading: boolean;
  authorsInfo: AuthorMap;
  setActiveAuthor: (username: string) => void;
};

class Author extends Component<AuthorProps, any> {
  componentDidMount() {
    const {
      username,
      setActiveAuthor,
      authorsInfo,
      loading,
      id,
    } = this.props;

    if (
      id !== username ||
      !(authorsInfo[id] || loading)
    ) {
      setActiveAuthor(id);
    }
  }

  render({
    authorsInfo,
    loading,
    username,
  }: AuthorProps) {

    const author = authorsInfo[username];

    if (loading || !author) {
      return (
        <div>loading</div>
      );
    }

    return ( <div>{author.blogs}</div> );
  }
}

export default Author;