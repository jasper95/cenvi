import React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  WMSTileLayer,
} from 'react-leaflet';
import chunk from 'lodash/chunk';
import ReactResizeDetector from 'react-resize-detector';

export default function Map(props) {
  const { activeLayers, bbox } = props;
  return (
    <ReactResizeDetector handleWidth handleHeight onResize={onResize}>
      {({ width, height }) => (
        <div className="map-container">
          <LeafletMap
            key={[width, height].join('')}
            style={{ height, width }}
            center={[10.9, 123.9]}
            zoom={10}
            {...bbox && {
              bounds: chunk(bbox.slice().reverse(), 2),
            }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeLayers.map(e => (
              <WMSTileLayer
                url={`${process.env.GEOSERVER_URL}/wms`}
                layers={`cenvi:${e}`}
                transparent
                format="image/png"
                srs={4326}
              />
            ))}
          </LeafletMap>
        </div>
      )}
    </ReactResizeDetector>
  );

  function onResize(a, b) {
    console.log('a, b: ', a, b);
  }
}
