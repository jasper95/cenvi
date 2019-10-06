import React from 'react';
import { Switch, Route } from 'react-router';
import loadable from '@loadable/component';
import PageLayout from 'components/Layout/Page';
import NotFound from 'pages/NotFound';

const Login = loadable(() => import('pages/Login'));
// const Signup = loadable(() => import('pages/RegisterPage'));
const Home = loadable(() => import('pages/Home/index'));
const SubProjects = loadable(() => import('pages/SubProjects'));
const AdminBlogList = loadable(() => import('pages/Admin/Blog/BlogList'));
const AdminBlogForm = loadable(() => import('pages/Admin/Blog/BlogForm'));
const AlbumList = loadable(() => import('pages/Admin/Album/AlbumList'));
const User = loadable(() => import('pages/Admin/User'));
// const Team = loadable(() => import('pages/TeamPage'));
// const Blog = loadable(() => import('pages/BlogsPage'));
// const BlogDetails = loadable(() => import('pages/BlogPage'));
// const Album = loadable(() => import('pages/AlbumPage'));
// const FileUpload = loadable(() => import('pages/FileUploadPage'));
// const ShapefileUpload = loadable(() => import('pages/ShapefileUploadPage'));
// const SubProject = loadable(() => import('pages/SubProjectPage'));
// const Map = loadable(() => import('pages/MapPage'));


export default [
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
    key: 'admin-blog-list',
    component: AdminBlogList,
    path: '/admin/blog',
    exact: true,
    pageProps: {
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-edit-blog',
    component: AdminBlogForm,
    path: '/admin/blog/:id',
    exact: true,
    pageProps: {
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-list-album',
    component: AlbumList,
    path: '/admin/album',
    exact: true,
    pageProps: {
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  {
    key: 'admin-user',
    component: User,
    path: '/admin/user',
    exact: true,
    pageProps: {
      hasFooter: false,
      requireAuth: true,
      hasNavigation: false,
    },
  },
  // {
  //   key: 'resetpw',
  //   component: ResetPassword,
  //   path: '/activate',
  //   exact: true,
  //   pageProps: {
  //     hasFooter: false,
  //     hasNavigation: false,
  //     requireAuth: 'optional',
  //   },
  // },
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
  // {
  //   key: 'forgotpw',
  //   component: ForgotPassword,
  //   path: '/forgot-password',
  //   exact: true,
  //   pageProps: {
  //     hasFooter: false,
  //     hasNavigation: false,
  //     requireAuth: false,
  //   },
  // },
  // {
  //   key: 'signup',
  //   component: Signup,
  //   path: '/register',
  //   exact: true,
  //   pageProps: {
  //     requireAuth: true,
  //     pageTitle: 'Signup',
  //   },
  // },
  // {
  //   key: 'team',
  //   component: Team,
  //   path: '/team',
  //   exact: true,
  //   pageProps: {
  //     pageId: 'team',
  //     requireAuth: true,
  //     pageTitle: 'Team',
  //   },
  // },
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
