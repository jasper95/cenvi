import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import SectionHeader from 'shared/components/Section';

import range from 'lodash/range';

import ArticleItemSkeleton from 'shared/components/Skeletons/ArticleItemSkeleton';
import ArticleItem from 'shared/components/Article/ArticleItem';


function NewsList() {
  const [rowResponse] = useQuery({ url: '/published_news' }, { initialData: [], isBase: true, initialLoading: true });
  const { data: blogs, loading } = rowResponse;
  useEffect(() => {
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
        desc={`The articles below have been selected from the media coverage of the Center for Environmental Informatics (CENVI) to give a glimpse of our work in research and in the communities.`}
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
