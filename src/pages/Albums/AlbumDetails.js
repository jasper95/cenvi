import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useLazyQuery';
import { getPhotoUrl } from 'shared/utils/tools';
import 'sass/components/albumDetailsPage/index.scss';

function AlbumDetails(props) {
  const BCP = 'albumDetailPage';

  const [albumResponse, onQueryAlbum] = useQuery({}, { initialData: null, initialLoading: true });

  useEffect(() => {
    const { id } = props.match.params;
    onQueryAlbum({ url: `/published_album/${id}` });
  }, []);


  const { loading, data: album } = albumResponse;
  if (loading) {
    return (
      <span>Loading...</span>
    );
  }
  const { photos } = album;
  let hero = photos.find(e => e.is_cover);
  if (!hero) { ([hero] = photos); }

  return (
    <section className={`${BCP}Section section`}>
      <div className={BCP}>
        <div className={`${BCP}_heroBanner`}>
          <div className={`${BCP}_heroBanner_count`}>
            <div className="count">
              {photos.length}
            </div>
            <p className="text">
              images
            </p>
          </div>
          <div className={`${BCP}_heroBanner_img`}>
            <img src={getPhotoUrl(hero)} alt="" />
          </div>
        </div>
        <div className={`${BCP}_container`}>
          <div className={`${BCP}_heroDetails`}>
            <h1 className={`${BCP}_title`}>
              {album.name}
            </h1>
            <p className={`${BCP}_description`}>
              {album.excerpt}
            </p>
          </div>
          <p className={`${BCP}_imagesLabel`}>
            Photos
          </p>
          <div className={`${BCP}_imageList`}>
            {album.photos.map(photo => (
              <div className={`${BCP}_imageList_item`}>
                <img src={getPhotoUrl(photo)} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlbumDetails;
