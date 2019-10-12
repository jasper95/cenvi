import React, { useEffect } from 'react';
import SectionHeader from 'shared/components/Section';
import albums from 'shared/constants/albums';
import AlbumCard from './components/AlbumCard';

function AlbumsPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <section class="albumsSection section">
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
                {albums.map(member => (<AlbumCard {...member}/>))}
              </>
            ) : (
              <div className="noRecords">
                <h1 className='noRecords_label'>
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

export default AlbumsPage;
