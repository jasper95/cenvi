import React, { useState, useMemo } from 'react';
import { TextField, Button } from 'react-md';
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
        <div className="row">
          <div>
            <span>Active Layers</span>
          </div>
          <div>
            {selectedLayers.map(layer => (
              <div>
                <span>
                  {layer.name}
                </span>
                <br />
                <img
                  alt=""
                  src={`${process.env.GEOSERVER_URL}?${qs.stringify({
                    service: 'WMS',
                    request: 'GetLegendGraphic',
                    layer: `topp:${layer.id}`,
                    format: 'image/png',
                  })}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="row">
          <TextField
            id="legend"
            label="Legend"
            className="iField"
            rows={5}
          />
        </div> */}
      </div>
    </div>
  );
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
