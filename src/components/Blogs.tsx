import { h } from 'preact';

import BlogCard from './BlogCard';

interface BlogsProps {
  path: string;
  blogs: Blog[];
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