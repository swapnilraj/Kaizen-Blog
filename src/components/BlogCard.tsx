import { h } from 'preact';
import { route } from 'preact-router';

interface BlogCardProps {
  blog: Blog;
}

const openBlog = ({id, slug}: Blog) => () => route(`/blogs/${id}-${slug}`);

const BlogCard = ({
  blog,
}: BlogCardProps) => (
  <div onClick={openBlog(blog)}>
    {blog.banner ? <img src={blog.banner} alt={blog.title} /> : null}
    <h2>{blog.title}</h2>
    {blog.salutes ? <p>{blog.salutes}</p> : null}
  </div>
);

export default BlogCard;