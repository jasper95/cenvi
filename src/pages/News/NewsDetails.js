import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import ArticlePage from 'shared/components/article/articlePage';

function BlogDetails(props) {
  const BCP = 'blogPage';
  const [blogResponse, onQuery] = useQuery({}, { initialData: null, initialLoading: true });
  useEffect(() => {
    const { slug } = props.match.params;
    onQuery({ url: `/published_blog/${slug}` });
  }, []);
  const { loading, data: blog } = blogResponse;

  return (
    <section className={`${BCP}Section section`}>
      <ArticlePage
        data={blog}
        type="blog"
        isLoading={loading}
      />
    </section>
  );
}

export default BlogDetails;
