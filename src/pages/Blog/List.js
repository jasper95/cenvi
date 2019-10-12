import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import SectionHeader from 'shared/components/Section';
import BlogItem from './components/BlogItem';

function BlogList() {
  const [rowResponse, onQuery] = useQuery({ url: '/published_blog' }, { initialData: [], initialLoading: true });
  const { data: blogs, loading } = rowResponse;
  useEffect(() => {
    onQuery();
  }, []);

  return (
    <section className="blogSection section">
      <SectionHeader
        withContainer
        rowSize={10}
        position="left"
        headerLabel="BLOGS"
        header="The Latest News from Cenvi"
        desc={`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Id culpa, mollitia suscipit nihil animi error. Veritatis
          aliquid at dolores fugit incidunt nihil quia quaerat!
          Eveniet dolorum enim corporis provident sit.
        `}
      />
      <div className="row row-content">
        <div className="container">
          {loading ? (
            <div> blogs loading...</div>
          ) : (
            <div className="row">
              {blogs.map(e => (
                <div className="col col-lg-4 col-md-6">
                  <BlogItem key={e.id} blog={e} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogList;
