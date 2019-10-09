import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import BlogItem from './components/BlogItem';

function BlogList() {
  const [rowResponse, onQuery] = useQuery({ url: '/published_blog' }, { initialData: [], initialLoading: true });
  const { data: blogs, loading } = rowResponse;
  useEffect(() => {
    onQuery();
  }, []);
  return (
    <div>
      <div>Blogs</div>
      {loading ? (
        <div> blogs loading...</div>
      ) : (
        <div>
          {blogs.map(e => (
            <BlogItem key={e.id} blog={e} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
