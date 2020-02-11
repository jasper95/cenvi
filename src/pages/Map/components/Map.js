import React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  WMSTileLayer,
} from 'react-leaflet';

export default function Map(props) {
  const { activeLayers } = props;
  return (
    <LeafletMap center={[10.9, 123.9]} zoom={10}>
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
  );
}
