import React, { useEffect } from 'react';
import SectionHeader from 'shared/components/Section';
import useQuery from 'shared/hooks/useLazyQuery';
// import albums from 'shared/constants/albums';
import AlbumCard from './components/AlbumCard';

function AlbumsListPage(props) {
  const [queryState, onQuery] = useQuery({ url: '/published_album' }, { initialLoading: true, initialData: [] });
  console.log('queryState: ', queryState);
  useEffect(() => {
    window.scrollTo(0, 0);
    onQuery();
  }, []);
  const { data: albums } = queryState;
  // const

  return (
    <section className="albumsSection section">
      <SectionHeader
        withContainer
        headerLabel="ALBUMS"
        header="Showcasing our projects in Pictures"
      />
      <div className="container">
        <div className="row">
          { albums.length !== 0
            ? (
              <>
                {albums.map(album => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    history={props.history}
                  />
                ))}
              </>
            ) : (
              <div className="noRecords">
                <h1 className="noRecords_label">
                  No Records Found
                </h1>
              </div>
            )
          }

        </div>
      </div>
    </section>
  );
}

export default AlbumsListPage;
