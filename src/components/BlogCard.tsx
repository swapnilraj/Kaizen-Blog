import { h } from 'preact';

interface BlogCardProps {
  blog: Blog;
  showBlog: (id:string) => void;
}

const BlogCard = ({
  blog,
  showBlog,
}: BlogCardProps) => (
  <div onClick={() => showBlog(`${blog.id}-${blog.slug}`)}>
    {blog.banner ? <img src={blog.banner} alt={blog.title} /> : null}
    <h2>{blog.title}</h2>
    {blog.salutes ? <p>{blog.salutes}</p> : null}
  </div>
);

export default BlogCard;