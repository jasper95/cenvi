import React from 'react';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
import Button from 'react-md/lib/Buttons/Button';

function ToolbarRenderer(props) {
  const {
    pageName, baseClass, selected, rows, onClickNew,
  } = props;
  return (
    <div className={`${baseClass} row`}>
      <div className={`${baseClass}_title`}>
        <h1 className="title">{pageName}</h1>
      </div>
      <div className={`${baseClass}_toolbar`}>
        <Toolbar>
          <Button
            flat
            children="New"
            iconChildren="add"
            className="iBttn iBttn-green"
            onClick={onClickNew}
          />
          {rows.length > 0 && (
            <Button
              flat
              iconChildren="archive"
              children="Export"
              className="iBttn iBttn-primary"
            />
          )}
          {selected.length > 0 && (
            <Button
              flat
              children="Delete"
              iconChildren="delete"
              className="iBttn iBttn-error"
            />
          )}
        </Toolbar>
      </div>
    </div>
  );
}

export default ToolbarRenderer;