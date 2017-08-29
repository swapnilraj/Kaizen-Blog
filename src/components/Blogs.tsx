import { h, Component } from 'preact';

import BlogCard from './BlogCard';

interface BlogsProps {
  blogs: Blog[];
  loading: boolean;
  getBlogs: () => void;
}

const renderBlog = (blog: Blog) => (
  <BlogCard blog={blog} />
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
  }: BlogsProps) {
    return (
      <div>
        { loading ? <div>loading</div> : blogs.map(renderBlog) }
      </div>
    );
  }
}

export default Blogs;