import React, {
  useState,
} from 'react';
import Link from 'react-router-dom/Link';
import ImageLoader from 'react-image';
import Button from 'react-md/lib/Buttons/Button';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import SelectMenuButton from 'components/SelectMenuButton';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';
import { useDispatch, useSelector } from 'react-redux';
import useMutation, { useUpdateNode } from 'shared/hooks/useMutation';
import cookie from 'js-cookie';
import withRouter from 'react-router-dom/withRouter';
import { UserSkeleton } from 'components/Skeletons';
import Navigation from 'components/Navigation';
import ReactResizeDetector from 'react-resize-detector';
import cn from 'classnames';
import 'sass/components/nav/index.scss';

function Header(props) {
  const {
    match,
    history,
  } = props;

  const dispatch = useDispatch();
  const user = null;
  // const { data: user, loading: authIsLoading } = useContext(AuthContext);
  const [showMobileNav, onShowMobileNav] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [, onLogout] = useMutation({ url: '/logout', onSuccess: onLogoutSucess });
  const [, onUpdateUser] = useUpdateNode({ node: 'user', message: 'Profile successfully updated' });
  const isAuthenticated = Boolean(user);

  const handleResize = (width, height) => {
    setIsMobileNav(width < 1025);
    onShowMobileNav(false);
  };

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={handleResize}
    >
      {({ width, height }) => (
        <nav className={cn('nav', { 'nav-isMobile': isMobileNav })}>
          <div className="nav_container">
            <Link to="/" className="nav_logo">
              CENVI
            </Link>
            { isMobileNav ? (
              <>
                <Button
                  icon
                  className="nav_mobile_burger"
                  children={showMobileNav ? 'close' : 'menu'}
                  onClick={() => onShowMobileNav(!showMobileNav)}
                />
                <div className={cn('nav_mobile_container', { 'nav_mobile_container-show': showMobileNav })}>
                  <Navigation user={user} currentPath={match.path} />
                  <div className="nav_actions">
                    <div className="nav_profile">
                      {renderProfileNav()}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Navigation user={user} currentPath={match.path} />
                <div className="nav_actions">
                  <div className="nav_profile">
                    {renderProfileNav()}
                  </div>
                </div>
              </>
            )}

          </div>
        </nav>
      )}
    </ReactResizeDetector>

  );

  function renderProfileNav() {
    if (false) {
      return (<UserSkeleton />);
    }
    return (
      <>
        <MenuButton
          id="nav_profile_avatar"
          className="nav_profile_avatar"
          menuItems={[
            {
              primaryText: 'Login',
              leftIcon: <i className="wtfr wtf-sign-in" />,
              onClick: editProfile,
            },
            {
              primaryText: 'Register',
              onClick: handleClickLogout,
              leftIcon: <i className="wtfr wtf-sign-out" />,
            },
          ]}
          anchor={{
            x: MenuButton.HorizontalAnchors.INNER_LEFT,
            y: MenuButton.VerticalAnchors.BOTTOM,
          }}
        >
          <>
            <span className="name">
              USER
            </span>
            <div className="avatar">
              <ImageLoader src="/static/img/default-avatar.png" />
            </div>
          </>
        </MenuButton>
      </>
    );
  }

  function handleClickLogout() {
    dispatch({
      type: 'SHOW_DIALOG',
      payload: {
        path: 'Confirm',
        props: {
          title: 'Confirm Logout',
          message: 'Do you really want to logout?',
          onValid: onLogout,
        },
      },
    });
  }

  function editProfile() {
    dispatch({
      type: 'SHOW_DIALOG',
      payload: {
        path: 'User',
        props: {
          title: 'Edit Profile',
          initialFields: user,
          onValid: data => onUpdateUser({ data }),
        },
      },
    });
  }

  function onLogoutSucess() {
    cookie.remove('token');
    dispatch({ type: 'SET_STATE', payload: { token: '', dialog: null, dialogProcessing: false } });
  }
}

export default withRouter(Header);
