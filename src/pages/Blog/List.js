import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import SectionHeader from 'shared/components/Section';
import BlogItem from './components/BlogItem';
import Author from './components/Author';
import range from 'lodash/range';


import BlogSkeleton from 'shared/components/Skeletons/BlogSkeleton'


function BlogList() {
  const [rowResponse, onQuery] = useQuery({ url: '/published_blog' }, { initialData: [], initialLoading: true });
  const { data: blogs, loading } = rowResponse;
  useEffect(() => {
    onQuery();
    window.scrollTo(0, 0);
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
            <div className="row">
              <BlogSkeletons />
            </div>
          ) : (
            <div className="row">
              {blogs.length > 0 ? (
                <>
                  {blogs.map(e => (
                    <div className="col col-lg-4 col-md-6">
                      <BlogItem key={e.id} blog={e} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="noRecords">
                  <h1 className="noRecords_label">
                    No Records Found
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function  BlogSkeletons() {
  return (
    <>
      { range(0, 3).map(() => (
        <div className="col col-lg-4 col-md-6">
          <BlogSkeleton />
        </div>
      ))}
    </>
  )
}

export default BlogList;
