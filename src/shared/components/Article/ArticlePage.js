import React from 'react';
import draftToHtml from 'draftjs-to-html';
import htmlToReact from 'html-react-parser';
import { getPhotoUrl } from 'shared/utils/tools';
import ImageLoader from 'react-image';
import { Helmet as Head } from 'react-helmet';

import Author from './Author';
import ArticlePageSkeleton from '../Skeletons/ArticlePageSkeleton';

import 'sass/components/article/index.scss';


function ArticlePage(props) {
  const BCP = 'article';

  const {
    type = 'blog',
    data,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <ArticlePageSkeleton />
    );
  }

  return (
    <>
      <Head>
        <meta property="og:url" content={`${window.location.origin}/${data.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.excerpt} />
        <meta property="og:image" content={getPhotoUrl(data)} />
      </Head>
      <div className={`${BCP} ${BCP}-${type} `}>
        <div className={`${BCP}_textContainer`}>
          <div className={`${BCP}_header`}>
            <h1 className={`${BCP}_title`}>
              {data.name}
            </h1>
            <Author
              className={`${BCP}_author`}
              name={`by ${data.author}`}
            />
          </div>
        </div>
        <div className={`${BCP}_image`}>
          <ImageLoader src={getPhotoUrl(data)} alt="" />
        </div>
        <div className={`${BCP}_textContainer`}>
          <div className={`${BCP}_contents`}>
            {htmlToReact(draftToHtml(data.content))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticlePage;
