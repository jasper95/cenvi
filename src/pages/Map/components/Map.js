import React from 'react';
import {
  Map as LeafletMap,
  GeoJSON,
  TileLayer,
  withLeaflet,
} from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';

const VectorGrid = withLeaflet(VectorGridDefault);

const options = {
  type: 'slicer',
  idField: 'OBJECTID',
  tooltip: 'NAME',
  popup: layer => `<div>${layer.properties.NAME}</div>`,
  style: {
    weight: 0.5,
    opacity: 1,
    color: '#ccc',
    fillColor: '#390870',
    fillOpacity: 0.6,
    fill: true,
    stroke: true,
  },
  hoverStyle: {
    fillColor: '#390870',
    fillOpacity: 1,
  },
  activeStyle: {
    fillColor: '#390870',
    fillOpacity: 1,
  },
  zIndex: 401,
};
export default function Map(props) {
  const { activeLayers } = props;
  return (
    <LeafletMap center={[10.9, 123.9]} zoom={10}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activeLayers.map(layer => (
        <VectorGrid {...options} data={layer} />
      ))}
    </LeafletMap>
  );
}
