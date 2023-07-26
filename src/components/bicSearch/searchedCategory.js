/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import Category from '../common/category';
import NoResult from '../buyWithInstacredLanding/noResult';
import GenericLoader from '../loader/GenericLoader';
import { apiStatus } from '../../actionTypes';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';

const SearchedCategory = ({
  apiState,
  categoriesData,
  categoryIds,
  lenderId,
  updateCategory,
}) => {
  if (apiState === apiStatus.INITIATED) {
    return <GenericLoader loadingMsg='Fetching Categories for you...' />;
  }
  const header = 'Category';
  if (categoriesData.length === 0) {
    return <NoResult headerName={header} />;
  }
  return (
    <div className={style.containWrapper}>
      {categoriesData.map((tile, index) => {
        const { item } = tile || {};
        const active = categoryIds.includes(item.id);
        return (
          <div
            className={`${style.categoryContainer} ${
              active ? `${style.activeCategory}` : ''
            }`}
            onClick={() => {
              if (active) {
                updateCategory(
                  categoryIds.filter((category) => category !== item.id),
                );
              } else {
                updateCategory([...categoryIds, item.id]);
              }
              tracker.trackUserInteraction(
                active ? UserActionType.DE_SELECT : UserActionType.SELECT,
                `Category_List_Item`,
                'Merchant_Filter',
                `VALUE: ${item.name}`,
              );
            }}>
            <div className={style.categoryWrapper}>
              <img
                src={item.desktopImgUrl}
                alt=''
                className={`${
                  lenderId !== 'instaCred' ? style.filterImage : ''
                } ${style.categoryImage}`}
              />
              <div className='font14 bold-text text80'>{item.name}</div>
            </div>
            {active && (
              <i
                className={`material-icons text-color ${
                  style.categoryCheckIcon
                }`}>
                done
              </i>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ buyWithInstacred, config }) => {
  const { categories, home } = buyWithInstacred;
  const { data: categoriesData, apiState } = categories || {};
  const { campaignId } = home || {};
  const defaultCategoryList = categoriesData.map((merchant) => ({
    item: merchant,
  }));
  const { lenderDetails } = config;
  const { lenderId } = lenderDetails || {};
  return {
    apiState,
    campaignId,
    categoriesData: defaultCategoryList,
    lenderId,
  };
};

export default connect(mapStateToProps)(SearchedCategory);
