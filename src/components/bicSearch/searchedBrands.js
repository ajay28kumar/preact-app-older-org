import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import Brand from '../common/brand';
import NoResult from '../buyWithInstacredLanding/noResult';
import style from './style.css';
import { apiStatus } from '../../actionTypes';
import GenericLoader from '../loader/GenericLoader';
import { tracker, UserActionType } from '../../tracking';

const SearchedBrands = ({ apiState, brandsData, brandIds, updateBrands }) => {
  if (apiState === apiStatus.INITIATED) {
    return <GenericLoader loadingMsg='Fetching Brands for you...' />;
  }
  const header = 'Brands';
  if (brandsData.length === 0) {
    return <NoResult headerName={header} />;
  }
  return (
    <div className={style.containWrapper}>
      {brandsData.map((tile, index) => {
        const { item } = tile || {};
        const active = brandIds.includes(item.id);
        return (
          <div
            className={`${active ? style.activeBrand : ''} ${
              style.brandContainer
            }`}>
            <Brand
              name={item.name}
              desktopImgUrl={item.desktopImgUrl}
              brandClick={() => {
                if (active) {
                  updateBrands(brandIds.filter((brand) => brand !== item.id));
                } else {
                  updateBrands([...brandIds, item.id]);
                }
                tracker.trackUserInteraction(
                  active ? UserActionType.DE_SELECT : UserActionType.SELECT,
                  `Brand_List_Item`,
                  'Merchant_Filter',
                  `VALUE: ${item.name}`,
                );
              }}
            />
            {active && (
              <div className={style.brandCheckBox}>
                <i className={`material-icons ${style.checkIcon}`}>done</i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const searchOptions = {
  isCaseSensitive: false,
  threshold: 0.4,
  keys: ['name'],
};

const mapStateToProps = ({ buyWithInstacred, config }, parentProps) => {
  const { searchBrandText: searchText } = parentProps || {};
  const { brands } = buyWithInstacred;
  const { data: brandsData, apiState } = brands || {};
  const brandsSearchList = new Fuse(brandsData, searchOptions);
  const shouldStartSearch = searchText && searchText.length >= 2;
  const defaultBrandLists = brandsData.map((merchant) => ({ item: merchant }));
  const brandsCategoryList = shouldStartSearch
    ? brandsSearchList.search(searchText.trim())
    : defaultBrandLists;
  const { lenderDetails } = config;
  const { lenderId } = lenderDetails || {};
  return {
    apiState,
    brandsData: brandsCategoryList,
    lenderId,
  };
};

export default connect(mapStateToProps)(SearchedBrands);
