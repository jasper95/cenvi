import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import draftToHtml from 'draftjs-to-html';
import htmlToReact from 'html-react-parser';

function BlogDetails(props) {
  const [blogResponse, onQuery] = useQuery({}, { initialData: null, initialLoading: true });
  useEffect(() => {
    const { slug } = props.match.params;
    onQuery({ url: `/published_blog/${slug}` });
  }, []);
  const { loading, data: blog } = blogResponse;
  if (loading) {
    return (
      <span>Loading...</span>
    );
  }
  return (
    <div>
      <div>Blog Details</div>
      <span>{blog.name}</span>
      <div>
        {htmlToReact(draftToHtml(blog.content))}
      </div>
      <span>{blog.author}</span>
    </div>
  );
}

export default BlogDetails;
