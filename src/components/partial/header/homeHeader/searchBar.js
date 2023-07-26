/** @jsx h */
import { Component, h } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import MuiInput from '../../../material-ui/muiInput';
import style from '../../style.css';
import bicActionType from '../../../../actions/bicAction/actionType';
import { route } from 'preact-router';
import {
  buyWithInstacredLandingRoute,
  buyWithInstacredLandingSearch,
} from '../../../../alias/homeRoutes';
import { connect } from 'react-redux';
import { debounce } from '../../../../utils/helper';
import merchantAction from '../../../../actions/merchantAction';
import merchantActionType from '../../../../actions/merchantAction/actionType';
import { tracker, UserActionType } from '../../../../tracking';

type Props = {
  filterOpen: boolean,
  searchText: string,
  pageKey: string,
  routeDetails: Object,
  bicAction: Function,
  lenderId: string,
};

type State = {
  searchText: string,
};

class SearchBar extends Component<Props, State> {
  state = {
    searchText: this.props.searchText,
  };
  debounceTime = 300;
  updateSearch = debounce(() => {
    this.updateSearchText();
  }, this.debounceTime);

  updateSearchText = () => {
    const { searchText } = this.state;
    this.props.bicAction(bicActionType.updateSearchText, { searchText });
  };

  clearText = () => {
    this.props.merchantAction(merchantActionType.clearText);
    this.updateSearchText();
  };

  render() {
    const {
      totalFilterCount,
      shouldDisplayBackButton,
      shouldShowFilter,
      campaignId,
      lenderId,
      pageKey,
      toggleFilter,
      routeDetails,
    } = this.props;
    const { path } = routeDetails || {};
    const { searchText } = this.state;
    const backUrl = `${buyWithInstacredLandingRoute.path}${
      campaignId ? `?utm_campaign=${campaignId}` : ''
    }`;
    return (
      <TopAppBar.Section
        className={`${style.searchWrapper} ${style.headerHeight}`}
        id='search-element'>
        {shouldDisplayBackButton && (
          <TopAppBar.Icon
            navigation
            onClick={() => {
              this.setState({ searchText: '' }, this.clearText);
              return route(backUrl);
            }}>
            arrow_back_ios
          </TopAppBar.Icon>
        )}
        <div className={style.searchContainer} id='search-bar'>
          <MuiInput
            onClick={() => {
              tracker.trackUserInteraction(
                UserActionType.CLICK,
                'bic_search',
                pageKey,
                {
                  campaign_id: campaignId,
                  lender_id: lenderId,
                },
              );

              if (path !== buyWithInstacredLandingSearch.path) {
                return route(
                  `${buyWithInstacredLandingSearch.path}?${
                    campaignId ? `utm_campaign=${campaignId}` : ''
                  }`,
                );
              }
            }}
            inputName='searchBar'
            id='bic-search-bar'
            value={searchText}
            inputPlaceholder='Search Brands, Merchants, Products'
            className={`${style.searchBar} ${
              searchText.length ? style.searchText : ''
            }`}
            onChange={(e) => {
              const value = e.target.value;
              this.setState({ searchText: value }, this.updateSearch);
            }}
            leadingIcon='search'
          />
          {searchText && (
            <div
              className={style.closeIconWrapper}
              onClick={() => this.setState({ searchText: '' }, this.clearText)}>
              <span className='material-icons'>close</span>
            </div>
          )}
        </div>
        {shouldShowFilter && (
          <div className={style.filterContainer} onClick={toggleFilter}>
            <div>
              <TopAppBar.Icon navigation className={style.filterIcon}>
                tune
              </TopAppBar.Icon>
              {totalFilterCount > 0 && (
                <div
                  className={`${
                    style.filterCount
                  } text-color font12 bold-text`}>
                  {totalFilterCount}
                </div>
              )}
            </div>
          </div>
        )}
      </TopAppBar.Section>
    );
  }
}

const mapStateToProps = ({ config, bicConfig, buyWithInstacred }) => {
  const { home, merchants } = buyWithInstacred;
  const { brandIds, categoryIds } = merchants || {};
  const totalFilterCount = brandIds.length + categoryIds.length;
  const { searchText, campaignId } = home || {};
  const { filterOpen } = bicConfig || {};
  const { routeDetails, pageKey, lenderDetails } = config || {};
  const { lenderId } = lenderDetails || {};
  return {
    pageKey,
    totalFilterCount,
    searchText,
    filterOpen,
    routeDetails,
    lenderId,
    campaignId,
  };
};

export default connect(
  mapStateToProps,
  { merchantAction },
)(SearchBar);
