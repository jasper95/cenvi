import React from 'react';
import navMenus from 'lib/constants/navMenus';
import { filterRole } from 'lib/tools';
import Menu from './Menu';

function Navigation(props) {
  const { currentPath, user } = props;
  return (
    <div className="nav_menu">
      <ul className="nav_menu_list">
        {navMenus.map(menu => (
          <Menu
            menu={menu}
            currentPath={currentPath}
          />
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
