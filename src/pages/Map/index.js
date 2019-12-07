import React, { useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './style.scss';

export default function MapPage() {
  const [activeLayers, setLayers] = useState([]);
  return (
    <section className="section-map section">
      <div className="col-sidebar">
        <Sidebar activeLayers={activeLayers} onActivateLayer={onActivateLayer} onRemoveLayer={onRemoveLayer} />
      </div>
      <div className="col-map">
        <Map activeLayers={activeLayers} />
      </div>
    </section>
  );

  function onActivateLayer(data) {
    setLayers(prev => prev.concat(data));
  }
  function onRemoveLayer(id) {
    setLayers(prev => prev.filter(e => e !== id));
  }
}
