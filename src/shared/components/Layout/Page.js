import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet as Head } from 'react-helmet';
import flowRight from 'lodash/flowRight';
import withAuth from 'shared/hocs/withAuth';
import { createSelector } from 'redux-starter-kit';
import { useSelector, useDispatch } from 'react-redux';
import useMutation from 'shared/hooks/useMutation';
import { showDialog, hideDialog } from 'shared/redux/app/reducer';
import { unauthorize } from 'shared/redux/auth/reducer';
import AdminPortal from 'container/AdminPortal';
import loadable from '@loadable/component';
import cn from 'classnames';
import DialogTitleWithBack from './DialogTitleWithBack';
import Footer from './Footer';
import Header from './Header';

const pageSelector = createSelector(
  state => state.app.toast,
  state => state.app.dialog,
  state => state.app.temporaryClosedDialogs,
  state => state.auth,
  (toast, dialog, temporaryClosedDialogs, auth) => (
    {
      toast, dialog, auth, hasTemporaryClosed: temporaryClosedDialogs.length > 0,
    }
  ),
);
const Confirm = loadable(() => import('shared/components/Dialogs/Confirm'));

function Page(props) {
  const {
    isAdmin,
    children,
    hasSidebar,
    hasNavigation, hasFooter,
    pageId, className, pageDescription,
  } = props;


  const [, onLogout] = useMutation({ url: '/logout', onSuccess: onLogoutSucess });
  const appData = useSelector(pageSelector);
  const dispatch = useDispatch();
  const { toast, dialog, auth } = appData;
  let DialogComponent;
  if (dialog && dialog.component) {
    ({ component: DialogComponent } = dialog);
  }

  let { pageTitle } = props;
  if (pageTitle) {
    pageTitle = `CENVI - ${pageTitle}`;
  } else {
    pageTitle = 'CENVI';
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta name="Description" content={pageDescription || 'Description here'} />
        <meta name="og:description" content={pageDescription || 'Description here'} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta property="og:image" content="/static/img/logo.png" />
        <meta property="og:site_name" content="Internlink" />
        <meta property="og:locale" content="en_US" />
        <meta name="robots" content="index, follow" />

        <meta name="theme-color" content="#000000" />

        <link rel="manifest" href="/static/manifest.json" />
        <link rel="shortcut icon" href="/static/icons/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="stylesheet" type="text/css" href="/static/css/react-md.indigo-pink.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/Draft.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/rafiIcons.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/wataphak.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/proxima.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/cenvi-icon.css" />
      </Head>
      {hasNavigation && (
        <Header auth={auth} onLogout={handleClickLogout} />
      )}
      {DialogComponent && (
        <DialogComponent
          {...dialog.props}
          dialogTitleRenderer={appData.hasTemporaryClosed ? DialogTitleWithBack : undefined}
        />
      )}
      <main className={cn(`page page-${pageId} ${className || ''}`, {
        'page-isAdmin': isAdmin,
        'page-hasNavigation': hasNavigation,
        'page-hasFooter': hasFooter,
        'page-hasSidebar': hasSidebar,
      })}
      >
        {isAdmin ? (
          <AdminPortal {...props} onLogout={handleClickLogout}>
            {children}
          </AdminPortal>
        ) : children}
      </main>
      {hasFooter && (
        <Footer />
      )}
    </>
  );

  function handleClickLogout() {
    dispatch(showDialog({
      component: Confirm,
      props: {
        title: 'Confirm Logout',
        message: 'Do you really want to logout?',
        onValid: onLogout,
      },
    }));
  }
  function onLogoutSucess() {
    dispatch(hideDialog());
    dispatch(unauthorize());
  }
}


const EnhancedPage = flowRight(
  withAuth,
)(Page);

Page.propTypes = {
  pageId: PropTypes.string,
  hasFooter: PropTypes.bool,
  hasNavigation: PropTypes.bool,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
};

Page.defaultProps = {
  hasNavigation: true,
  hasFooter: true,
  pageId: '',
  requiredRoles: [],
};

EnhancedPage.propTypes = Page.propTypes;
EnhancedPage.defaultProps = Page.defaultProps;

export default EnhancedPage;
