export default [
  {
    id: 1,
    path: '/',
    label: 'Home',

  },
  {
    id: 2,
    path: '/files',
    label: 'Files',
    submenu: [
      {
        id: 3,
        path: '/#section-downloads',
        label: 'Downloads',
      },
      {
        id: 4,
        path: '/upload/shapefile',
        label: 'Upload Shapefile',
      },
      {
        id: 5,
        path: '/upload/file',
        label: 'Upload File',
      },
    ],
  },
  {
    id: 6,
    path: '/sub-projects',
    label: 'Sub Projects',
  },
  {
    id: 7,
    path: '/map',
    label: 'Maps',
  },
  {
    id: 8,
    path: '/blogs',
    label: 'Blogs',
  },
  {
    id: 8,
    path: '/albums',
    label: 'Albums',
  },
  {
    id: 9,
    path: '/collaborators',
    label: 'Collaborators',
  },
  {
    id: 10,
    label: 'About',
    submenu: [
      {
        id: 11,
        path: '/#section-about',
        label: 'About Us',
      },
      {
        id: 12,
        path: '/team',
        label: 'Team',
      },
      {
        id: 13,
        path: '/#section-contact',
        label: 'Contact Us',
      },
    ],
  },
];
