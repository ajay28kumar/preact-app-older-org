import Drawer from 'preact-material-components/Drawer';
import style from './style.css';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import {
  buyWithInstacredLandingRoute,
  faqRoute,
  loginRoute,
  transactionHistoryRoute,
  offersRoute,
} from '../../../../alias/homeRoutes';
import { tracker, UserActionType } from '../../../../tracking';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Drawer/style.css';
import { getStorageLenderId } from '../../../../utils/lenderTheme';
import { getSessionStorage } from '../../../../utils';

const MenuBody = ({ campaignId, closeDrawer }) => {
  const authDetails = getSessionStorage('authDetails');
  const lenderId = getStorageLenderId();
  const { login: isLoggedIn } = authDetails ? JSON.parse(authDetails) : {};
  const onClickEvents = ({ pathName, redirectRoute }) => {
    const NavPageKey = 'Navigation Sidebar';
    const additionalProperties = {
      lender_id: lenderId,
      campaign_id: campaignId,
    };
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      `${pathName}`,
      NavPageKey,
      additionalProperties,
    );
    closeDrawer();
    setTimeout(() => {
      const path = `${redirectRoute}${
        campaignId ? `?utm_campaign=${campaignId}` : ''
      }`;
      route(path);
    }, 300);
  };
  return (
    <Drawer.DrawerContent className={style.menuBodyList}>
      {!isLoggedIn && (
        <Drawer.DrawerItem
          className={style.menuList}
          onClick={() =>
            onClickEvents({
              pathName: 'nav_login',
              redirectRoute: loginRoute.path,
            })
          }>
          <div className={style.menuIcon}>
            <img
              src='https://iccdn.in/web-assets/app-drawer/login-icon.svg'
              alt='icon'
            />
          </div>
          <div className={`${style.menuText} font14 text60 `}>
            Login / Signup
          </div>
        </Drawer.DrawerItem>
      )}

      {isLoggedIn && (
        <Drawer.DrawerItem
          className={style.menuList}
          onClick={() =>
            onClickEvents({
              pathName: 'nav_purchase_history',
              redirectRoute: transactionHistoryRoute.path,
            })
          }>
          <div className={style.menuIcon}>
            <img
              src='https://iccdn.in/web-assets/app-drawer/transaction-history-icon.svg'
              alt='icon'
            />
          </div>
          <div className={`${style.menuText} font14 text60 bold-text`}>
            Purchase History
          </div>
        </Drawer.DrawerItem>
      )}
      <Drawer.DrawerItem
        className={style.menuList}
        onClick={() =>
          onClickEvents({
            pathName: 'nav_buy_with_instacred',
            redirectRoute: buyWithInstacredLandingRoute.path,
          })
        }>
        <div className={style.menuIcon}>
          <img
            src='https://iccdn.in/web-assets/app-drawer/ic_home.svg'
            alt='icon'
          />
        </div>
        <div className={`${style.menuText} font14 text60 `}>Home</div>
      </Drawer.DrawerItem>

      <Drawer.DrawerItem
        className={style.menuList}
        onClick={() =>
          onClickEvents({
            pathName: 'NAV- Purchase History',
            redirectRoute: transactionHistoryRoute.path,
          })
        }>
        <div className={style.menuIcon}>
          <img
            src='https://iccdn.in/web-assets/app-drawer/ic-transaction-history.svg'
            alt='icon'
          />
        </div>
        <div className={`${style.menuText} font14 text60 `}>
          Transaction History
        </div>
      </Drawer.DrawerItem>

      <Drawer.DrawerItem
        className={style.menuList}
        onClick={() =>
          onClickEvents({
            pathName: 'NAV- Offers',
            redirectRoute: offersRoute.path,
          })
        }>
        <div className={style.menuIcon}>
          <img
            src='https://iccdn.in/web-assets/app-drawer/ic-offers-icon.svg'
            alt='icon'
          />
        </div>
        <div className={`${style.menuText} font14 text60 `}>Offers</div>
      </Drawer.DrawerItem>

      <Drawer.DrawerItem
        className={style.menuList}
        onClick={() =>
          onClickEvents({
            pathName: 'nav_faqs',
            redirectRoute: faqRoute.path,
          })
        }>
        <div className={style.menuIcon}>
          <img
            src='https://iccdn.in/web-assets/app-drawer/ic-faq.svg'
            alt='icon'
          />
        </div>
        <div className={`${style.menuText} font14 text60 `}>FAQs</div>
      </Drawer.DrawerItem>

      {isLoggedIn && (
        <Drawer.DrawerItem
          className={style.menuList}
          onClick={() =>
            onClickEvents({
              pathName: 'nav_log_out',
              redirectRoute: loginRoute.path,
            })
          }>
          <div className={style.menuIcon}>
            <img
              src='https://iccdn.in/web-assets/app-drawer/login-icon.svg'
              alt='icon'
            />
          </div>
          <div className={`${style.menuText} font14 text60 `}>Logout</div>
        </Drawer.DrawerItem>
      )}
    </Drawer.DrawerContent>
  );
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { campaignId } = buyWithInstacred.home;
  return {
    campaignId,
  };
};

export default connect(mapStateToProps)(MenuBody);
