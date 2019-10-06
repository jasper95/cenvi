import React from 'react';
import useQuery from 'shared/hooks/useQuery';

function BlogDetails(props) {
  const [blogResponse, onQuery] = useQuery({ url: '/blog?status=published' });
  return (
    <div />
  );
}

export default BlogDetails;
