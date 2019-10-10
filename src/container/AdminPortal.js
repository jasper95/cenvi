import React, { useState } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { List, ListItem, FontIcon } from 'react-md';
import cn from 'classnames';
import 'sass/components/adminPortal/index.scss';

const menu = [
  {
    label: 'users',
    icon: 'account_circle',
    route: '/admin/users'
  },
  {
    label: 'blogs',
    icon: 'book',
    route: '/admin/blogs'
  },
  {
    label: 'albums',
    icon: 'book',
    route: '/admin/albums'
  }
]

function AdminPortal(props) {
  const { history, location } = props
  const [isSidebarOpen, toggleSidebar] = useState(false)
  return(
    <div className={cn('adminPortal', {
      'adminPortal-sidebarOpen': isSidebarOpen
     })}>
      <TopNav
        className='adminPortal_topnav'
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={toggleSidebar}
      />
      <Sidebar
        history={history}
        location={location}
        className={cn('adminPortal_sidebar', {
          'adminPortal_sidebar-open': isSidebarOpen
        })}
        menu={menu}
      />
      <div className='adminPortal_container'>
        <div className="dbContainer">
          {props.children}
        </div>
      </div>
    </div>
  )
}


function TopNav(props) {
  const { 
    className, 
    handleToggleSidebar,
    isSidebarOpen 
  } = props
  return (
    <div className={`${className} topnav`}>
      <Button
        icon
        children={isSidebarOpen ? 'keyboard_arrow_right' : 'menu' }
        onClick={() => { handleToggleSidebar(!isSidebarOpen) }}
        className='topnav_toggle'
      />
      <Button
        flat
        secondary
        onClick={() => {}}
        children='Logout'
        iconEl={<i class='wtfr wtf-sign-out'/>}
        className='topnav_logout iBttn iBttn-second-prio'
      />
    </div>
  )
}

function Sidebar(props) {
  const { className, menu, history, location } = props
  return (
    <div className={`${className} sidebar`}>
      <div className='sidebar_logo'>
        <img src='/static/img/admin-logo.png'/>
      </div>
      <List className='sidebar_list'>
        {menu.map((item, index) => {
          const isActive = location.pathname === item.route
          return(
            <ListItem
              onClick={() => {history.push(item.route)}}
              className={cn('sidebar_list_item',{ 'active' : isActive })}
              leftIcon={<FontIcon>{item.icon}</FontIcon>}
              primaryText={item.label}
            />
          )
        })}
      </List>
    </div>
  )
}

export default AdminPortal;