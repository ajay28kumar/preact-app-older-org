/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import HomeHeader from '../../header/homeHeader';
import Menu from '../../header/menu';
import style from './style.css';
import { connect } from 'react-redux';

type Props = {
  isHeaderFixed: boolean,
  shouldShowBrandingHeader: boolean,
  shouldShowSearchBar: boolean,
  shouldShowFilterHeader: boolean,
  template: string,
};

const BICContainer = (props: Props) => {
  const {
    isHeaderFixed,
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
    template,
  } = props;
  const [menuState, changeMenuState] = useState(false);
  const shouldHeaderDisplay =
    shouldShowBrandingHeader || shouldShowSearchBar || shouldShowFilterHeader;
  return (
    <div
      className={`${style.container} ${
        template === 'neutral' ? style.backgroundBodyOverride : ''
      }`}
      style={{ marginTop: isHeaderFixed && shouldHeaderDisplay ? 60 : 0 }}>
      {shouldHeaderDisplay && (
        <HomeHeader menuState={menuState} changeMenuState={changeMenuState} />
      )}
      {menuState && (
        <Menu menuState={menuState} changeMenuState={changeMenuState} />
      )}
      <div className={style.bodyContainer}>{props.children}</div>
    </div>
  );
};

const mapStateToProps = ({ bicConfig, config }) => {
  const {
    isHeaderFixed,
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
  } = bicConfig;
  const { template } = config;
  return {
    isHeaderFixed,
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
    template,
  };
};

export default connect(mapStateToProps)(BICContainer);
