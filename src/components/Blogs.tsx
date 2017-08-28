import { h } from 'preact';

import BlogCard from './BlogCard';

interface BlogsProps {
  blogs: Blog[];
  loading: boolean;
  getBlogs: () => void;
}

const renderBlog = (blog: Blog) => (
  <BlogCard blog={blog} />
);

const Blogs = ({
  blogs,
}: BlogsProps) => (
  <div>
    { blogs.map(renderBlog) }
  </div>
);

export default Blogs;