import React from 'react';
import { TextField, Button } from 'react-md';
import cn from 'classnames';

import 'sass/components/mapSidebar/index';

function Sidebar(props) {
  const { categories, layers, onActivateLayer } = props;
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <h1 className="sidebar_header_title">
            Map Viewer
        </h1>
      </div>
      <div className="sidebar_body">
        <div className="row">
          <TextField
            id="name"
            label="Available Layers"
            className="iField"
            placeholder="Search For .."
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
          {layers.map(e => (
            <div className="row">
              <div>{e.name}</div>
              <button onClick={() => onActivateLayer(e.id)}>CLick</button>
            </div>
          ))}
        </div>
        <div className="row">
          <TextField
            id="loaded_layer"
            label="Loaded Layers"
            className="iField"
            rows={5}
          />
        </div>
        <div className="row">
          <TextField
            id="legend"
            label="Legend"
            className="iField"
            rows={5}
          />
        </div>
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
