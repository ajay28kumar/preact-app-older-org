import BrandingBar from './brandingBar';
import FilterBar from './filterBar';
import { connect } from 'react-redux';
import Header from './header';
import bicAction from '../../../../actions/bicAction';
import bicActionType from '../../../../actions/bicAction/actionType';
import SearchBar from './searchBar';
import { tracker, UserActionType } from '../../../../tracking';

const HeaderContainer = (props) => {
  const {
    template,
    menuState,
    changeMenuState,
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
    shouldShowFilter,
    filterOpen,
    totalNumberOfFilters,
    shouldShowMenu,
    title,
    shouldDisplayBackButton,
    campaignId,
    pageKey,
    lenderDetails,
    bicAction,
  } = props;
  const { lenderLogo, lenderId: id } = lenderDetails;
  const lenderId = typeof id === Number ? id.toString() : id;
  return (
    <Header>
      {shouldShowBrandingHeader && (
        <BrandingBar
          template={template}
          shouldShowMenu={shouldShowMenu}
          lenderLogo={lenderLogo}
          lenderId={lenderId}
          menuState={menuState}
          changeMenuState={changeMenuState}
          pageKey={pageKey}
        />
      )}
      {shouldShowSearchBar && (
        <SearchBar
          shouldDisplayBackButton={shouldDisplayBackButton}
          shouldShowFilter={shouldShowFilter}
          campaignId={campaignId}
          pageKey={pageKey}
          lenderId={lenderId}
          bicAction={bicAction}
          toggleFilter={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              `Filter_Dropdown-OPEN`,
              'Merchant_Filter',
            );

            return bicAction(bicActionType.toggleFilter);
          }}
        />
      )}
      {shouldShowFilterHeader && (
        <FilterBar
          shouldShowFilter={shouldShowFilter}
          totalNumberOfFilters={totalNumberOfFilters}
          title={title}
          campaignId={campaignId}
          pageKey={pageKey}
          toggleFilter={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              `Filter_Dropdown-${filterOpen ? 'OPEN' : 'CLOSE'}`,
              'Merchant_Filter',
            );

            return bicAction(bicActionType.toggleFilter);
          }}
        />
      )}
    </Header>
  );
};

const mapStateToProps = ({ config, bicConfig, buyWithInstacred }) => {
  const { template, lenderDetails, pageKey } = config;
  const { campaignId } = buyWithInstacred.home;
  const {
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
    shouldShowFilter,
    filterOpen,
    totalNumberOfFilters,
    shouldShowMenu,
    title,
    shouldDisplayBackButton,
  } = bicConfig;
  return {
    template,
    shouldShowBrandingHeader,
    shouldShowSearchBar,
    shouldShowFilterHeader,
    shouldShowFilter,
    filterOpen,
    totalNumberOfFilters,
    shouldShowMenu,
    title,
    shouldDisplayBackButton,
    pageKey,
    lenderDetails,
    campaignId,
  };
};

export default connect(
  mapStateToProps,
  { bicAction },
)(HeaderContainer);
