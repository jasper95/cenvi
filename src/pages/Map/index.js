import React, { useState } from 'react';
import difference from 'lodash/difference';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import './style.scss';

export default function MapPage() {
  const [activeLayers, setLayers] = useState([]);
  const [hiddenLayers, setHiddenLayers] = useState([]);
  return (
    <section className="section-map section">
      <div className="col-sidebar">
        <Sidebar
          onToggleHideLayer={onToggleHideLayer}
          activeLayers={activeLayers}
          onActivateLayer={onActivateLayer}
          onRemoveLayer={onRemoveLayer}
        />
      </div>
      <div className="col-map">
        <Map activeLayers={difference(activeLayers, hiddenLayers)} />
      </div>
    </section>
  );

  function onToggleHideLayer(data) {
    if (hiddenLayers.includes(data.id)) {
      setHiddenLayers(prev => prev.filter(e => e !== data.id));
    } else {
      setHiddenLayers(prev => prev.concat([data.id]));
    }
  }

  function onActivateLayer(data) {
    setLayers(prev => prev.concat(data));
  }
  function onRemoveLayer(id) {
    setLayers(prev => prev.filter(e => e !== id));
  }
}
