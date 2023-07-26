// @flow
/** @jsx h */
import { h, Fragment } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import style from '../../style.css';
import RightContainer from '../activationHeader/rightContainer';
import { tracker, UserActionType } from '../../../../tracking';

type Props = {
  template: string,
  shouldShowMenu: boolean,
  lenderLogo: string,
  pageKey: string,
  menuState: boolean,
  changeMenuState: Function,
};

const BrandingBar = (props: Props) => {
  const {
    template,
    shouldShowMenu,
    lenderLogo,
    menuState,
    changeMenuState,
    pageKey,
  } = props;
  return (
    <Fragment>
      <TopAppBar.Row className={style.headerHeight}>
        <TopAppBar.Section align-start>
          {shouldShowMenu && (
            <TopAppBar.Icon
              navigation
              onClick={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  'pv_navigation_icon_bic',
                  pageKey,
                );
                changeMenuState(!menuState);
              }}>
              menu
            </TopAppBar.Icon>
          )}
          {template !== 'login' && template !== 'neutral' && lenderLogo && (
            <img
              src={lenderLogo}
              alt='lender-logo'
              className={style.lenderLogo}
            />
          )}
        </TopAppBar.Section>
        <TopAppBar.Section align-end>
          <RightContainer />
        </TopAppBar.Section>
      </TopAppBar.Row>
      {menuState && (
        <div
          className='fpDrawerBackdrop'
          onClick={() => changeMenuState(false)}
        />
      )}
    </Fragment>
  );
};

export default BrandingBar;
