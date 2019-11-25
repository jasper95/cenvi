import React, { useState } from 'react';
import useQuery from 'shared/hooks/useQuery';
import useLazyQuery from 'shared/hooks/useLazyQuery';
import Map from './components/Mapbox';
import Sidebar from './components/Sidebar';
import './style.scss';

export default function MapPage() {
  const [queryState] = useQuery({ url: '/shapefile' }, { initialData: [] });
  const [activeLayers, setLayers] = useState([]);
  const [, onQuery] = useLazyQuery({});
  return (
    <section className="section-map section">
      <div className="col-sidebar">
        <Sidebar layers={queryState.data} onActivateLayer={onActivateLayer} />
      </div>
      <div className="col-map">
        <Map activeLayers={activeLayers} />
      </div>
    </section>
  );

  async function onActivateLayer(id) {
    setLayers(prev => prev.concat(queryState.data.find(e => e.id === id)));
  }
}
