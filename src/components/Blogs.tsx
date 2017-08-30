import { h, Component } from 'preact';

import BlogCard from './BlogCard';

interface BlogsProps {
  blogs: Blog[];
  loading: boolean;
  getBlogs: () => void;
  showBlog: (id:string) => void;
}

const renderBlog = (blog: Blog, showBlog:(id:string) => void) => (
  <BlogCard showBlog={showBlog} blog={blog} />
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
  }: BlogsProps) {
    return (
      <div>
        { loading ? <div>loading</div> : blogs.map(blog => renderBlog(blog, showBlog)) }
      </div>
    );
  }
}

export default Blogs;