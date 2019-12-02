import React, { useState } from 'react';
import useQuery from 'shared/hooks/useQuery';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './style.scss';

export default function MapPage() {
  const [activeLayers, setLayers] = useState([]);
  return (
    <section className="section-map section">
      <div className="col-sidebar">
        <Sidebar activeLayers={activeLayers} onActivateLayer={onActivateLayer} />
      </div>
      <div className="col-map">
        <Map activeLayers={activeLayers} />
      </div>
    </section>
  );

  async function onActivateLayer(data) {
    setLayers(prev => prev.concat(data));
  }
}
