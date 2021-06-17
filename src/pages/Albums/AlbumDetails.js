import React, { useState } from 'react';
import useQuery from 'shared/hooks/useQuery';
import { getPhotoUrl } from 'shared/utils/tools';
import 'sass/components/albumDetailsPage/index.scss';
import ImageLoader from 'react-image';
import { SpinnerSkeletonLoader } from 'shared/components/Skeletons';
import Button from 'react-md/lib/Buttons/Button';
import Carousel, { Modal, ModalGateway } from 'react-images';


function AlbumDetails(props) {
  const BCP = 'albumDetailPage';
  const { history } = props;
  const { id } = props.match.params;
  const [albumResponse] = useQuery({ url: `/published_album/${id}` }, { initialData: null, initialLoading: true, isBase: true });

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { loading, data: album } = albumResponse;
  if (loading) {
    return (
      <SpinnerSkeletonLoader />
    );
  }

  // mu null ang albums migo
  if (album === null) {
    history.push('/not-found');
    return false;
  }

  const { photos } = album;
  let hero = photos.find(e => e.is_cover);
  if (!hero) { ([hero] = photos); }

  return (
    <>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal
            onClose={onHideViewer}
            styles={{
              blanket: base => ({ ...base, zIndex: 99999 }),
              positioner: base => ({ ...base, zIndex: 99999 }),
              dialog: base => ({ ...base, zIndex: 99999 }),
            }}
          >
            <Carousel
              currentIndex={currentImage}
              modalProps={{
                allowFullscreen: true,
              }}
              views={photos.map(x => ({
                src: getPhotoUrl(x),
                caption: x.description,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
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
              <ImageLoader
                src={getPhotoUrl(hero)}
                alt=""
              />
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
              {album.photos.map((photo, index) => (
                <div className={`${BCP}_imageList_item`}>
                  <div className={`${BCP}_imageList_item_image`}>
                    <ImageLoader src={getPhotoUrl(photo)} alt="" />
                  </div>
                  <div className={`${BCP}_imageList_item_desc`}>
                    <h3 className="label"> Description </h3>
                    <p className="content">
                      {photo.description}
                    </p>
                    <Button
                      flat
                      onClick={() => onClickPreview(index)}
                      children="Preview"
                      iconEl={<i className="wtfr wtf-search-plus" />}
                      className="iBttn iBttn-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  function onClickPreview(index) {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }

  function onHideViewer() {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }
}

export default AlbumDetails;
