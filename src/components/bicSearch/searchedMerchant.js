/** @jsx h */
import { h, Fragment, Component } from 'preact';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import VisibilitySensor from 'react-visibility-sensor';
import { Merchant } from '../buyWithInstacredLanding/merchants/merchant';
import NoResult from '../buyWithInstacredLanding/noResult';
import merchantAction from '../../actions/merchantAction';
import actionType from '../../actions/merchantAction/actionType';
import { getStorageLenderId } from '../../utils/lenderTheme';
import { apiStatus } from '../../actionTypes';
import GenericLoader from '../loader/GenericLoader';
import bicAction from '../../actions/bicAction';
import bicActionType from '../../actions/bicAction/actionType';
import { inputTracking } from '../material-ui/muiInput';
import style from './style.css';
import Modal from '../common/modal';
import Spinner from '../spinner/spinner';
import howToBuyAction from '../../actions/howToBuyActions';
import howToBuyActionType from '../../actions/howToBuyActions/actionType';
import { buyWithInstacredLandingSearch } from '../../alias/homeRoutes';

class SearchedMerchant extends Component {
  isDataFetching = false;
  pageKey = 'Buy with InstaCred Home';
  dialogRef = (dialog) => (this.dialog = dialog);

  showSeeMoreDailog = () => this.dialog.MDComponent.show();

  state = {
    tileDetails: {},
    updateNext: false,
  };

  componentDidMount() {
    this.props.bicAction(bicActionType.initializeBICSearch, {
      campaignId: this.props.campaignId,
    });
    this.fetchMerchant();
  }

  componentDidUpdate(previousProps) {
    const {
      brandIds,
      categoryIds,
      searchText,
      isBrandIdsUpdated,
      isCategoryIdsUpdated,
      apiState,
    } = this.props;
    const {
      apiState: prevApiState,
      brandIds: prevBrandIds,
      categoryIds: prevCategoryIds,
      searchText: prevSearchText,
    } = previousProps;

    if (
      !brandIds.equals(prevBrandIds) ||
      !categoryIds.equals(prevCategoryIds)
    ) {
      this.fetchMerchant();
      this.isDataFetching = true;
    } else {
      if (
        isBrandIdsUpdated &&
        isCategoryIdsUpdated &&
        prevSearchText !== searchText
      ) {
        this.fetchMerchant();
        this.isDataFetching = true;
      }
    }
    if (
      this.isDataFetching &&
      apiState !== prevApiState &&
      apiState === apiStatus.SUCCESS
    ) {
      this.updateSearchTracking(searchText);
      this.isDataFetching = false;
    }
    if (searchText !== prevSearchText && !this.isDataFetching) {
      this.updateSearchTracking(searchText);
    }
  }
  updateSearchTracking = (searchText) => {
    const { merchantData } = this.props || {};
    inputTracking({
      pageKey: this.pageKey,
      elementName: 'SearchResult-Merchants',
      metadata: {
        searchedText: searchText,
        result: merchantData.length > 0 ? 'yes' : 'no',
      },
    });
  };

  fetchMerchant = (overrideBrandIds, overrideCategoryIds) => {
    const { brandIds, categoryIds, apiState, campaignId } = this.props || {};
    if (apiState === apiStatus.INITIATED) {
      return;
    }
    const payload = {
      brandIds: overrideBrandIds || brandIds,
      categoryIds: overrideCategoryIds || categoryIds,
      lenderId: getStorageLenderId(),
      campaignId,
    };
    this.props.merchantAction(actionType.initializeSearchMerchants, payload);
  };

  seeMore = (event, tileDetails) => {
    event.stopPropagation();
    this.setState({
      tileDetails,
    });
    this.showSeeMoreDailog();
  };
  render() {
    const { merchantData, apiState, page, count, merchantAction } =
      this.props || {};
    if (apiState === apiStatus.INITIATED) {
      return <GenericLoader loadingMsg='Fetching Results...' />;
    }
    if (merchantData.length === 0) {
      return <NoResult headerName='Merchants' />;
    }
    return (
      <Fragment>
        <div className={style.merchantContainer}>
          {merchantData.map((tile, index) => {
            const { item } = tile || {};
            return (
              <div className={style.merchant}>
                <Merchant
                  tile={item}
                  index={index}
                  pageKey={this.pageKey}
                  campaignId={this.props.campaignId}
                  header='Merchants'
                  seeMore={this.seeMore}
                  howToBuyClick={() =>
                    this.props.howToBuyAction(
                      howToBuyActionType.redirectToHTB,
                      { referralUrl: buyWithInstacredLandingSearch.path },
                    )
                  }
                />
              </div>
            );
          })}
        </div>
        <VisibilitySensor
          onChange={(isVisible) => {
            if (isVisible && count > merchantData.length)
              merchantAction(actionType.loadNextPageOfMerchantsInSearch, {
                page: page + 1,
              });
          }}>
          {count > merchantData.length ? <Spinner /> : null}
        </VisibilitySensor>
        <Modal
          dialogRef={this.dialogRef}
          header
          footer
          seeMoreContent={this.state.tileDetails}
        />
      </Fragment>
    );
  }
}

const merchantSearchOptions = {
  isCaseSensitive: false,
  threshold: 0.3,
  includeScore: true,
  keys: ['name', 'description'],
};

const primarySearchOption = {
  isCaseSensitive: false,
  threshold: 0.1,
  keys: ['name'],
};

const secondarySearchOption = {
  isCaseSensitive: false,
  threshold: 0.05,
  keys: ['name'],
};

const mapStateToProps = ({ buyWithInstacred }, otherProps) => {
  const { merchants, home, brands, categories } = buyWithInstacred;
  const { data: merchantData, page, apiState } = merchants || {};
  const { categoryIds, brandIds } = otherProps || {};
  const { data: brandsData } = brands || {};
  const { data: categoryData } = categories || {};
  const merchantsSearchList = new Fuse(merchantData, merchantSearchOptions);
  const primaryBrandsSearchList = new Fuse(brandsData, primarySearchOption);
  const secondaryBrandsSearchList = new Fuse(brandsData, secondarySearchOption);
  const primaryCategorySearchList = new Fuse(categoryData, primarySearchOption);
  const secondaryCategorySearchList = new Fuse(
    categoryData,
    secondarySearchOption,
  );
  const searchText = (home.searchText || '').trim();
  const shouldStartSearch = searchText && searchText.length >= 2;
  const defaultMerchantLists = merchantData.map((merchant) => ({
    item: merchant,
  }));
  const originalSearchedMerchant = merchantsSearchList.search(searchText);
  let searchedMerchantList = shouldStartSearch
    ? originalSearchedMerchant
    : defaultMerchantLists;
  let searchedBrandsLists = [];
  const searchArray = searchText.split(' ');
  if (shouldStartSearch) {
    searchArray.forEach((text, index) => {
      if (index === 0) {
        searchedBrandsLists = [
          ...searchedBrandsLists,
          ...primaryBrandsSearchList.search(text),
        ];
      } else {
        searchedBrandsLists = [
          ...searchedBrandsLists,
          ...secondaryBrandsSearchList.search(text),
        ];
      }
    });
  }
  //Considering here to fetch all merchants
  let merchantBrandID = brandIds ? brandIds.split(',') : [];
  let merchantCategoryIds = categoryIds ? categoryIds.split(',') : [];
  //If got any specific IDs from brandList then assigning that IDs to fetch merchants
  let isBrandIdsUpdated = true;
  if (searchedBrandsLists.length > 0) {
    const brandId = searchedBrandsLists.map((searchedBrandsList) => {
      return searchedBrandsList.item.id;
    });
    const ids = Array.from(new Set(brandId));
    if (ids.equals(brandIds)) {
      isBrandIdsUpdated = false;
    }
    merchantBrandID = ids;
    searchedMerchantList = defaultMerchantLists;
  }
  let searchedCategoryLists = [];
  if (shouldStartSearch) {
    searchArray.forEach((text, index) => {
      if (index === 0) {
        searchedCategoryLists = [
          ...searchedCategoryLists,
          ...primaryCategorySearchList.search(text),
        ];
      } else {
        searchedCategoryLists = [
          ...searchedCategoryLists,
          ...secondaryCategorySearchList.search(text),
        ];
      }
    });
  }
  let isCategoryIdsUpdated = true;

  if (searchedCategoryLists.length > 0) {
    const ids = Array.from(
      new Set(
        searchedCategoryLists.map((searchedCategoryList) => {
          return searchedCategoryList.item.id;
        }),
      ),
    );
    if (ids.equals(categoryIds)) {
      isCategoryIdsUpdated = false;
    }
    merchantCategoryIds = ids;
    searchedMerchantList = defaultMerchantLists;
  }

  const MAX_RESULT = 25 * page;
  return {
    apiState,
    isBrandIdsUpdated,
    isCategoryIdsUpdated,
    page,
    brandIds: merchantBrandID,
    categoryIds: merchantCategoryIds,
    searchText,
    merchantData:
      searchedMerchantList.length > MAX_RESULT
        ? searchedMerchantList.slice(0, MAX_RESULT)
        : searchedMerchantList,
    count: searchedMerchantList.length,
  };
};

export default connect(
  mapStateToProps,
  { merchantAction, bicAction, howToBuyAction },
)(SearchedMerchant);
