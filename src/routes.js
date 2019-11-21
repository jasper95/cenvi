import React from 'react';
import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import PageLayout from 'shared/components/Layout/Page';
import NotFound from 'pages/NotFound';

const Login = loadable(() => import('pages/Login'));
const Signup = loadable(() => import('pages/Signup'));
const ForgotPassword = loadable(() => import('pages/ForgotPassword'));
const ResetPassword = loadable(() => import('pages/ResetPassword'));

const Home = loadable(() => import('pages/Home/index'));
const SubProjects = loadable(() => import('pages/SubProjects'));
const Team = loadable(() => import('pages/Team'));
const Albums = loadable(() => import('pages/Albums'));
const AlbumDetails = loadable(() => import('pages/Albums/AlbumDetails'));
const PublicBlogs = loadable(() => import('pages/Blog/List'));
const PublicBlogDetails = loadable(() => import('pages/Blog/BlogDetails'));

const User = loadable(() => import('pages/Admin/User/containers/UserPage'));

const AdminBlogList = loadable(() => import('pages/Admin/Blog/container/BlogList'));
const AdminBlogForm = loadable(() => import('pages/Admin/Blog/container/BlogForm'));

const AlbumList = loadable(() => import('pages/Admin/Album/containers/AlbumList'));
const EditAlbum = loadable(() => import('pages/Admin/Album/containers/EditAlbum'));

const AdminCategory = loadable(() => import('pages/Admin/Category/containers/Category'));
const AdminEditCategory = loadable(() => import('pages/Admin/Category/containers/EditCategory'));

const AdminShapefiles = loadable(() => import('pages/Admin/Shapefiles/containers/Shapefiles'));
const AdminCreateShapefile = loadable(() => import('pages/Admin/Shapefiles/containers/CreateShapefile'));
const AdminEditShapefile = loadable(() => import('pages/Admin/Shapefiles/containers/EditShapefile'));

// const FileUpload = loadable(() => import('pages/FileUploadPage'));
// const ShapefileUpload = loadable(() => import('pages/ShapefileUploadPage'));
// const SubProject = loadable(() => import('pages/SubProjectPage'));
const MapPage = loadable(() => import('pages/Map'));


const adminRoutes = [
  {
    key: 'admin-user',
    component: User,
    path: '/admin/users',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-blog-list',
    component: AdminBlogList,
    path: '/admin/blogs',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-edit-blog',
    component: AdminBlogForm,
    path: '/admin/blogs/:id',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-list-album',
    component: AlbumList,
    path: '/admin/albums',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'edit-admin-list-album',
    component: EditAlbum,
    path: '/admin/albums/:id',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-category',
    component: AdminCategory,
    path: '/admin/category',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'edit-admin-category',
    component: AdminEditCategory,
    path: '/admin/category/:id',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-shapefiles',
    component: AdminShapefiles,
    path: '/admin/shapefiles',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'new-admin-shapefiles',
    component: AdminCreateShapefile,
    path: '/admin/shapefiles/new',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
      isEdit: false,
    },
  },
  {
    key: 'edit-admin-shapefile',
    component: AdminEditShapefile,
    path: '/admin/shapefiles/:id',
    exact: true,
    pageProps: {
      isAdmin: true,
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
      isEdit: true,
    },
  },
];


export default [
  {
    key: 'resetpw',
    component: ResetPassword,
    path: '/activate',
    exact: true,
    pageProps: {
      hasFooter: false,
      hasNavigation: false,
      requireAuth: 'optional',
    },
  },
  {
    key: 'login',
    component: Login,
    path: '/login',
    exact: true,
    pageProps: {
      hasNavigation: false,
      hasFooter: false,
      requireAuth: false,
      pageTitle: 'Login',
      pageDescription: 'Login to CENVI',
    },
  },
  {
    key: 'forgotpw',
    component: ForgotPassword,
    path: '/forgot-password',
    exact: true,
    pageProps: {
      hasFooter: false,
      hasNavigation: false,
      requireAuth: false,
    },
  },
  {
    key: 'signup',
    component: Signup,
    path: '/register',
    exact: true,
    pageProps: {
      hasNavigation: false,
      hasFooter: false,
      requireAuth: false,
      pageTitle: 'Signup',
    },
  },
  {
    key: 'home',
    component: Home,
    path: '/',
    exact: true,
    pageProps: {
      requireAuth: 'optional',
    },
  },
  {
    key: 'subprojects',
    component: SubProjects,
    path: '/sub-projects',
    exact: true,
  },
  {
    key: 'team',
    component: Team,
    path: '/team',
    exact: true,
  },
  {
    key: 'albums',
    component: Albums,
    path: '/albums',
    exact: true,
  },
  {
    key: 'albums',
    component: AlbumDetails,
    path: '/albums/:id',
    exact: true,
  },
  {
    key: 'map',
    component: MapPage,
    path: '/map',
    exact: true,
  },
  {
    key: 'blogs',
    component: PublicBlogs,
    path: '/blogs',
    exact: true,
    pageProps: {
      hasFooter: true,
      requireAuth: 'optional',
      hasNavigation: true,
    },
  },
  {
    key: 'blogs',
    component: PublicBlogDetails,
    path: '/blogs/:slug',
    exact: true,
    pageProps: {
      hasFooter: true,
      requireAuth: 'optional',
      hasNavigation: true,
    },
  },
  ...adminRoutes,
  {
    key: 'not-found',
    path: '*',
    component: () => (<NotFound />),
    exact: true,
  },
];


export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const { pageProps = { }, key } = route;
            const {
              isAdmin,
              title, hasNavigation,
              hasFooter, requireAuth,
              pageId, pageDescription, requiredRoles,
            } = pageProps;
            return (
              <PageLayout
                key={key}
                pageId={pageId || key}
                title={title}
                hasNavigation={hasNavigation}
                isAdmin={isAdmin}
                hasFooter={hasFooter}
                requireAuth={requireAuth}
                pageDescription={pageDescription}
                requiredRoles={requiredRoles}
                {...props}
              >
                <route.component {...props} {...extraProps} route={route} />
              </PageLayout>
            );
          }}
        />
      ))}
    </Switch>
  ) : null;
}
