import React, { useState, useMemo } from 'react';
import { Button, ExpansionPanel } from 'react-md';
import cn from 'classnames';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import qs from 'qs';
import omit from 'lodash/omit';

import 'sass/components/mapSidebar/index.scss';
import useQuery from 'shared/hooks/useQuery';
import { exportShapefile } from 'shared/utils/tools';

function Sidebar(props) {
  const { activeLayers, onActivateLayer, onRemoveLayer } = props;
  const [activeFilters, setActiveFilters] = useState({ all: true });
  const [shapefileQueryState] = useQuery({ url: '/shapefile' }, { initialData: [] });
  const [categoryQueryState] = useQuery({ url: '/category' }, { initialData: [] });
  const { data: categoryData } = categoryQueryState;
  const { data: shapefileData } = shapefileQueryState;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const selectedLayers = useMemo(getActiveLayers, [activeLayers, shapefileData]);
  const layersOptions = useMemo(getLayersOptions, [shapefileData, activeLayers]);
  const categoryOptions = useMemo(getCategoryOptions, [categoryData, activeFilters]);

  return (
    <div className={cn('sidebar', {
      'sidebar-open': sidebarOpen,
    })}
    >
      <Button
        icon
        iconClassName={cn('', {
          'wtfs wtf-chevron-left': sidebarOpen,
          'wtfs wtf-chevron-right': !sidebarOpen,
        })}
        className="sidebar_toggler"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="sidebar_header">
        <h1 className="sidebar_header_title">
          Map Viewer
        </h1>
      </div>
      <div className="sidebar_body">
        <div className="row">
          <SelectAutocomplete
            label="Available Layers"
            options={layersOptions}
            isLoading={shapefileQueryState.loading}
            onChange={layer => onActivateLayer(layer)}
          />
        </div>
        <div className="row row-filterCategories">
          <div className="col-12-guttered">
            <label className="iField_label">
              Filter Categories By:
            </label>
            <div className="categories">
              {categoryOptions.map(cat => (
                <Button
                  children={cat.label}
                  tooltipLabel={cat.label}
                  onClick={() => onSetActiveFilter(cat.value)}
                  tooltipPosition="top"
                  className={cn('iBttn', {
                    'iBttn-primary': cat.active,
                    'iBttn-second-prio': !cat.active,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row row-activeLayers">
          <label className="iField_label">
            Active Layers
          </label>
          {selectedLayers.map(layer => (
            <ActiveItemsLayers
              layer={layer}
              onRemoveLayer={() => onRemoveLayer(layer.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  function getActiveLayers() {
    return activeLayers.map(e => shapefileData.find(ee => ee.id === e));
  }

  function onSetActiveFilter(filter) {
    if (filter === 'all') {
      setActiveFilters({ all: true });
    } else {
      setActiveFilters(prevFilters => ({ ...omit(prevFilters, 'all'), [filter]: true }));
    }
  }

  function getLayersOptions() {
    const options = shapefileData
      .filter(e => !activeLayers.includes(e.id))
      .map(e => ({ label: e.name, value: e.id }));
    if (activeFilters.all) {
      return options;
    }
    return options.filter(e => activeFilters[e.value]);
  }

  function getCategoryOptions() {
    const catOptions = categoryData
      .map(e => ({ label: e.name, value: e.id, active: activeFilters[e.id] }));
    return [{ label: 'All', value: 'all', active: activeFilters.all }].concat(catOptions);
  }
}

function ActiveItemsLayers(props) {
  const { layer, onRemoveLayer } = props;
  const [isVisible, setVisibility] = useState(true);
  return (
    <div className="activeLayer">
      <div className="activeLayer_header">
        <Button
          icon
          children="remove"
          className="activeLayer_dragHandle"
          onClick={onRemoveLayer}
        />
        <Button
          icon
          children={isVisible ? 'visibility' : 'visibility_off'}
          className={cn('activeLayer_hideShow', {
            'activeLayer_hideShow-visible': isVisible,
            'activeLayer_hideShow-hidden': !isVisible,
          })}
          onClick={() => setVisibility(!isVisible)}
        />
        <p className="activeLayer_label">
          {layer.name}
        </p>
        {layer.is_public && (
          <Button icon children="import_export" tooltipLabel="Export" onClick={() => exportShapefile(layer)} />
        )}
      </div>
      <ExpansionPanel
        className="activeLayer_container"
        contentClassName="activeLayer_container_content"
        footer={null}
      >
        <img
          alt=""
          src={`${process.env.GEOSERVER_URL}/wms?${qs.stringify({
            service: 'WMS',
            request: 'GetLegendGraphic',
            layer: `cenvi:${layer.id}`,
            styles: `cenvi:${layer.id}`,
            format: 'image/png',
          })}`}
        />
      </ExpansionPanel>
    </div>
  );
}

Sidebar.defaultProps = {
};

export default Sidebar;
