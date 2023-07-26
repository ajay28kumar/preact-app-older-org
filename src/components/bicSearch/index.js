/** @jsx h */
import { h, Component, Fragment } from 'preact';
import style from './style.css';
import SearchContainer from './searchContainer';
import { connect } from 'react-redux';
import RequestButton from '../requestButton';
import merchantAction from '../../actions/merchantAction';
import actionType from '../../actions/merchantAction/actionType';
import { getStorageLenderId } from '../../utils/lenderTheme';
import Badge from './badge';
import TopAppBar from 'preact-material-components/TopAppBar';
import MuiInput, { inputTracking } from '../material-ui/muiInput';
import { debounce } from '../../utils/helper';
import { route } from 'preact-router';
import { buyWithInstacredLandingSearch } from '../../alias/homeRoutes';
import { tracker, UserActionType } from '../../tracking';

class BICSearch extends Component {
  pageKey = 'Merchant_Filter';
  state = {
    selected: this.props.selected,
    brandIds: this.props.brandIds,
    categoryIds: this.props.categoryIds,
    searchBrandText: '',
  };

  debounceTime = 300;
  updateText = debounce((e) => {
    const searchBrandText = e.target.value;
    this.setState({ searchBrandText });
    inputTracking({
      pageKey: this.pageKey,
      elementName: 'SearchBar-Brands',
      metadata: { searchedText: searchBrandText.trim() },
    });
  }, this.debounceTime);

  onChangeTab = (selected) => {
    this.setState({ selected });
  };

  updateBrands = (brandIds) => {
    this.setState({ brandIds });
  };
  updateCategory = (categoryIds) => {
    this.setState({ categoryIds });
  };
  closeFilter = () => {
    this.props.merchantAction(actionType.closeFilter);
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Filter_Dropdown-CLOSE',
      this.pageKey,
    );
  };
  render() {
    const { selected, brandIds, categoryIds, searchBrandText } =
      this.state || {};
    const { pageKey, campaignId } = this.props || {};
    return (
      <Fragment>
        <div className={style.headerWrapper}>
          <TopAppBar.Icon onClick={this.closeFilter}>close</TopAppBar.Icon>
          <div className={style.buttonWrapper}>
            <RequestButton
              pageKey={this.pageKey}
              buttonId='apply-filter'
              buttonOnClick={() =>
                this.setState({
                  brandIds: [],
                  categoryIds: [],
                })
              }
              buttonWrapperClass={`genericButtonContainer ${
                style.clearButton
              } ${style.headerButton}`}
              buttonText='Clear All'
              elementName='Clear-Filter'
            />
            <RequestButton
              pageKey={this.pageKey}
              buttonId='apply-filter'
              buttonOnClick={() => {
                let q = `?`;
                if (brandIds.length > 0) {
                  q = `${q}b=${brandIds.join(',')}&`;
                }
                if (categoryIds.length > 0) {
                  q = `${q}c=${categoryIds.join(',')}&`;
                }
                q = `${q}${campaignId ? `utm_campaign=${campaignId}` : ''}`;
                route(`${buyWithInstacredLandingSearch.path}${q}`, true);
                this.props.merchantAction(actionType.applyMerchantFilter, {
                  lenderId: getStorageLenderId(),
                  categoryIds: categoryIds || [],
                  brandIds: brandIds || [],
                });
              }}
              buttonWrapperClass={`genericButtonContainer ${
                style.headerButton
              }`}
              buttonText='Apply Filter'
              elementName='Done'
            />
          </div>
        </div>
        <div className={style.filterContainer}>
          <div className={style.filterHeaderContainer}>
            <div className={style.filterNameColumn}>
              <div
                className={`cursorPointer ${style.nameContainer}`}
                onClick={() => this.onChangeTab('brand')}>
                <Badge count={brandIds.length} />
                <div
                  className={`font14 bold-text ${
                    selected === 'brand' ? 'text-color' : ''
                  }`}>
                  By Brands
                </div>
                <div
                  className={`${
                    selected === 'brand' ? style.filterActive : ''
                  }`}
                />
              </div>
              <div
                className={`cursorPointer ${style.nameContainer}`}
                onClick={() => this.onChangeTab('category')}>
                <Badge count={categoryIds.length} />
                <div
                  className={`font14 bold-text ${
                    selected === 'category' ? 'text-color' : ''
                  }`}>
                  By Category
                </div>
                <div
                  className={`${
                    selected === 'category' ? style.filterActive : ''
                  }`}
                />
              </div>
            </div>
          </div>
          {selected === 'brand' && (
            <div className={style.searchContainer}>
              <MuiInput
                inputPlaceholder='Search Brands'
                pageKey={pageKey}
                leadingIcon='search'
                className={style.searchBox}
                onChange={this.updateText}
              />
            </div>
          )}
          <SearchContainer
            pageKey={pageKey}
            selected={selected}
            brandIds={brandIds}
            searchBrandText={searchBrandText}
            categoryIds={categoryIds}
            updateBrands={this.updateBrands}
            updateCategory={this.updateCategory}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ bicConfig }, otherProps) => {
  let { selected } = bicConfig;
  const { brandIds, categoryIds } = otherProps || {};
  if (
    categoryIds &&
    categoryIds.length > 0 &&
    (!brandIds || brandIds.length === 0)
  ) {
    selected = 'category';
  }
  return {
    selected,
    categoryIds: categoryIds ? categoryIds.split(',') : [],
    brandIds: brandIds ? brandIds.split(',') : [],
  };
};

export default connect(
  mapStateToProps,
  { merchantAction },
)(BICSearch);
