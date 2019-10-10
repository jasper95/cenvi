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
        className={cn('adminPortal_sidebar', {
          'adminPortal_sidebar-open': isSidebarOpen
        })}
        menu={menu}
      />
      <div className='adminPortal_container'>
        {props.children}
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
        children={isSidebarOpen ? 'menu' : 'keyboard_arrow_right' }
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
  const { className, menu } = props
  return (
    <div className={`${className} sidebar`}>
      <div className='sidebar_logo'>
        <img src='/static/img/admin-logo.png'/>
      </div>
      <List className='sidebar_list'>
        {menu.map((item, index) => (
          <ListItem
            className={cn('sidebar_list_item',{ 'active' : index === 0 })}
            leftIcon={<FontIcon>{item.icon}</FontIcon>}
            primaryText={item.label}
          />
        ))}
      </List>
    </div>
  )
}

export default AdminPortal;