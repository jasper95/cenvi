import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import draftToHtml from 'draftjs-to-html';
import htmlToReact from 'html-react-parser';
import 'sass/components/blogPage/index.scss';

function AlbumDetails(props) {
  const BCP = 'albumDetailPage'

  const [albumResponse, onQueryAlbum] = useQuery({}, { initialData: null, initialLoading: true });

  useEffect(() => {
    const { id } = props.match.params;
    onQueryAlbum({ url: `/album/${id}` })
  }, []);


  const { loading, data: album } = albumResponse;

  console.log('albumResponse ', albumResponse)

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
              {album.name}
              test
            </h1>
          </div>
        </div>
        <div className={`${BCP}_image`}>
          <img src="https://source.unsplash.com/random" alt=""/>
        </div>
      </div>
    </section>
  );
}

export default AlbumDetails;
