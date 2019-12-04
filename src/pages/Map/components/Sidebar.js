import React, { useState, useMemo } from 'react';
import { TextField, Button, ExpansionPanel } from 'react-md';
import cn from 'classnames';
import SelectAutocomplete from 'shared/components/SelectAutocomplete';
import qs from 'qs';

import 'sass/components/mapSidebar/index.scss';
import useQuery from 'shared/hooks/useQuery';

function Sidebar(props) {
  const { categories, activeLayers, onActivateLayer } = props;
  const [queryState] = useQuery({ url: '/shapefile' }, { initialData: [] });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const selectedLayers = useMemo(() => activeLayers.map(e => queryState.data.find(ee => ee.id === e)), [activeLayers, queryState.data]);
  const selectOptions = useMemo(() => queryState
    .data
    // .filter(e => )
    .map(e => ({ label: e.name, value: e.id })), [queryState.data]);
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
            options={selectOptions}
            isLoading={queryState.loading}
            onChange={layer => onActivateLayer(layer)}
          />
        </div>
        <div className="row row-filterCategories">
          <div className="col-12-guttered">
            <label className="iField_label">
              Filter Categories By:
            </label>
            <div className="categories">
              { categories && categories.map(cat => (
                <Button
                  children={cat.label}
                  tooltipLabel={cat.label}
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
          {
            selectedLayers.map(layer => (<ActiveItemsLayers layer={layer}/>))
          }
        </div>
      </div>
    </div>
  );
}

function ActiveItemsLayers(props) {
  const { layer } = props
  const [isVisible, setVisibility] = useState(true) 
  return(
    <div className="activeLayer">
      <div className="activeLayer_header">
        <Button 
          icon
          children='drag_handle'
          className='activeLayer_dragHandle'
        />
        <Button 
          icon
          children={isVisible ? 'visibility': 'visibility_off'}
          className={cn('activeLayer_hideShow', {
            'activeLayer_hideShow-visible':isVisible,
            'activeLayer_hideShow-hidden':!isVisible,
          })}
          onClick={() => setVisibility(!isVisible)}
        />
        <p className="activeLayer_label">
          {layer.name}
        </p>

      </div>
      <ExpansionPanel
        className="activeLayer_container"
        contentClassName="activeLayer_container_content"
        footer={null}
      >
        <img
          alt=""
          src={`${process.env.GEOSERVER_URL}?${qs.stringify({
            service: 'WMS',
            request: 'GetLegendGraphic',
            layer: `cenvi:postgis_${layer.id}`,
            format: 'image/png',
          })}`}
        />
      </ExpansionPanel>
    </div>
  )
}

Sidebar.defaultProps = {
  categories: [
    {
      id: 1,
      label: 'All',
      active: true,
    },
    {
      id: 2,
      label: 'Disaster Risk',
    },
    {
      id: 3,
      label: 'Social',
    },
    {
      id: 4,
      label: 'Political',
    },
    {
      id: 5,
      label: 'Economical',
    },
    {
      id: 6,
      label: 'Environmental',
    },
    {
      id: 7,
      label: 'Others',
    },
  ],
};

export default Sidebar;
