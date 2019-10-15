import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import draftToHtml from 'draftjs-to-html';
import htmlToReact from 'html-react-parser';
import Author from './components/Author';
import 'sass/components/blogPage/index.scss';

function BlogDetails(props) {
  const BCP = 'blogPage';
  const [blogResponse, onQuery] = useQuery({}, { initialData: null, initialLoading: true });
  useEffect(() => {
    const { slug } = props.match.params;
    onQuery({ url: `/published_blog/${slug}` });
  }, []);
  const { loading, data: blog } = blogResponse;

  console.log('blog', blog);

  if (loading) {
    return (
      <span>Loading...</span>
    );
  }
  return (
    <section className={`${BCP}Section section`}>
      <div className={BCP}>
        <div className={`${BCP}_textContainer`}>
          <div className={`${BCP}_header`}>
            <h1 className={`${BCP}_title`}>
              {blog.name}
            </h1>
            <Author
              className={`${BCP}_author`}
              name={`by ${blog.author}`}
            />
          </div>
        </div>
        <div className={`${BCP}_image`}>
          <img src="https://source.unsplash.com/random" alt="" />
        </div>
        <div className={`${BCP}_textContainer`}>
          <div className={`${BCP}_contents`}>
            {htmlToReact(draftToHtml(blog.content))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
