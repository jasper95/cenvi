import React, { useEffect } from 'react';
import useQuery from 'shared/hooks/useQuery';
import draftToHtml from 'draftjs-to-html';
import htmlToReact from 'html-react-parser';
import GalleryMasonry from 'shared/components/Gallery'
import 'sass/components/albumDetailsPage/index.scss';

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
        <div className={`${BCP}_heroBanner`}>
          <div className={`${BCP}_heroBanner_count`}>
            <div className="count">
              99
            </div>
            <p className="text">
              images
            </p>
          </div>
          <div className={`${BCP}_heroBanner_img`}>
            <img src="https://source.unsplash.com/random" alt=""/>
          </div>
        </div>
        <div className={`${BCP}_container`}>
          <div className={`${BCP}_heroDetails`}>
            <h1 className={`${BCP}_title`}>
              {/* {album.name} */}
              Example list of albums
            </h1>
            <p className={`${BCP}_description`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio temporibus
              numquam ad. Molestias maxime porro, doloribus mollitia, rerum facilis eum
              fugit aliquam. Nobis labore laborum, iusto dolor doloribus cumque quasi
              dolorem totam. Perspiciatis, necessitatibus beatae debitis repudiandae illo
              nihil commodi consequuntur ipsum iusto minus delectus unde similique itaque
              rerum illum fuga vel perferendis qui repellendus a quae? Illum omnis
              tenetur soluta ex dolorem labore voluptates consequuntur velit
              necessitatibus maiores fugiat eaque vitae, quas culpa. Laudantium 
              quisquam rem sed eaque magni tempore inventore soluta minus, dolore, 
              laborum id ex, distinctio suscipit rerum. Voluptatem facere rerum eveniet 
              labore alias molestias iusto praesentium, tempora adipisci facilis. 
              Nobis nam animi quibusdam alias, magni sed reiciendis optio, blanditiis nulla. 
              Sed vel sapiente modi et dolores quo consectetur similique veritatis consequuntur repudiandae
              illum excepturi eligendi aliquam vitae, est veniam dolore rerum, voluptatem
              id commodi exercitationem fuga totam minima. Consectetur incidunt, tempore
              repellendus quos, magni expedita vero?
            </p>
          </div>
          <p className={`${BCP}_imagesLabel`}>
            Photos
          </p>
          <div className={`${BCP}_imageList`}>
            {album.photos.map((photo,indx) => (
              <div className={`${BCP}_imageList_item`}>
                <img src="https://source.unsplash.com/random" alt=""/>
              </div>
            ))}
            {/* to be refactored */}
            {/* <GalleryMasonry photos={album.photos}/> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlbumDetails;
