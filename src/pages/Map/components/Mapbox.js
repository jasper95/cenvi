import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYXNhbGJvcmVzIiwiYSI6ImNqaWptYm1yNDFiOXAzcXJ2Z3VhYWpsdm8ifQ.Qy1LHYXNKcbP2R1RDZO0zA',
});

export default function Mapbox(props) {
  const { activeLayers } = props;
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      zoom={[5]}
      center={[123.9, 10.9]}
    >
      <GeoJSONLayer
        fillPaint={{
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        }}
        data="/cdn/uploads/81979f4c-c806-4e05-acaa-2704d11ad9d7/data.geojson.gz"
      />
      {/* {activeLayers.map(e => (
      ))} */}
    </Map>
  );
}
