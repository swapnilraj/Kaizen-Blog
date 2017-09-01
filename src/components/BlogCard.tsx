import { h } from 'preact';

interface BlogCardProps {
  blog: Blog;
  showBlog: (id:string) => void;
  showAuthor: (id:string) => void;
}

const BlogCard = ({
  blog,
  showBlog,
  showAuthor,
}: BlogCardProps) => (
  <div>
    <div onClick={() => showBlog(`${blog.id}-${blog.slug}`)}>
      {blog.banner ? <img src={blog.banner} alt={blog.title} /> : null}
      <h2>{blog.title}</h2>
    </div>
    <h4 onClick={() => showAuthor(blog.authors[0])}>{blog.authors}</h4>
    {blog.salutes ? <p>{blog.salutes}</p> : null}
  </div>
);

export default BlogCard;