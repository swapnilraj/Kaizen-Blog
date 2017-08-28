import { h } from 'preact';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({
  blog,
}: BlogCardProps) => (
  <div>
    {blog.banner ? <img src={blog.banner} alt={blog.title} /> : null}
    <h2>{blog.title}</h2>
    {blog.salutes ? <p>{blog.salutes}</p> : null}
  </div>
);

export default BlogCard;