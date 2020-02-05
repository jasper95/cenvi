import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import SectionHeader from 'shared/components/Section';

import range from 'lodash/range';

import ArticleItemSkeleton from 'shared/components/Skeletons/ArticleItemSkeleton';
import ArticleItem from 'shared/components/Article/ArticleItem';


function NewsList() {
  const [rowResponse, onQuery] = useQuery({ url: '/published_news' }, { initialData: [], initialLoading: true });
  const { data: blogs, loading } = rowResponse;
  useEffect(() => {
    onQuery();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="newsSection section">
      <SectionHeader
        withContainer
        rowSize={10}
        position="left"
        headerLabel="News"
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
                      <ArticleItem type="news" key={e.id} data={e} />
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

function BlogSkeletons() {
  return (
    <>
      { range(0, 3).map(() => (
        <div className="col col-lg-4 col-md-6">
          <ArticleItemSkeleton />
        </div>
      ))}
    </>
  );
}

export default NewsList;
