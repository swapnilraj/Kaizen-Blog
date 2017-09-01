import { h, Component } from 'preact';

import BlogCard from './BlogCard';

interface BlogsProps {
  blogs: Blog[];
  loading: boolean;
  getBlogs: () => void;
  showBlog: (id:string) => void;
  showAuthor: (id:string) => void;
}

const renderBlog = (
  blog: Blog,
  showBlog: BlogsProps['showBlog'],
  showAuthor: BlogsProps['showAuthor'] ) => (
  <BlogCard blog={blog} showBlog={showBlog} showAuthor={showAuthor} />
);

class Blogs extends Component<BlogsProps, any> {

  componentDidMount() {
    const {
      loading,
      getBlogs,
      blogs,
    } = this.props;

    if (!loading && blogs.length === 0) {
      getBlogs();
    }
  }

  render({
    blogs,
    loading,
    showBlog,
    showAuthor,
  }: BlogsProps) {
    return (
      <div>
        { loading ? <div>loading</div> : blogs.map(blog => renderBlog(blog, showBlog, showAuthor)) }
      </div>
    );
  }
}

export default Blogs;