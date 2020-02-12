import React, { useEffect } from 'react';
import SectionHeader from 'shared/components/Section';
import useQuery from 'shared/hooks/useQuery';
import { AlbumItemSkeleton } from 'shared/components/Skeletons';
import AlbumCard from './components/AlbumCard';


function AlbumsListPage(props) {
  const [queryState] = useQuery({ url: '/published_album' }, { isBase: true, initialLoading: true, initialData: [] });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: albums, loading } = queryState;

  return (
    <section className="albumsSection section">
      <SectionHeader
        withContainer
        headerLabel="ALBUMS"
        header="Showcasing our projects in Pictures"
      />
      <div className="container">
        {loading ? (
          <AlbumItemSkeleton />
        ) : (
          <div className="row">
            {albums.length !== 0 ? (
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AlbumsListPage;
