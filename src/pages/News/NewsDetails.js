import React from 'react';
import useQuery from 'shared/hooks/useQuery';
import ArticlePage from 'shared/components/Article/ArticlePage';

function BlogDetails(props) {
  const BCP = 'blogPage';
  const { slug } = props.match.params;
  const [blogResponse] = useQuery({ url: `/published_news/${slug}` },
    { initialData: null, initialLoading: true, isBase: true });
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
