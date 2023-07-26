/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import style from './style.css';
import SearchedMerchant from '../../components/bicSearch/searchedMerchant';
import BICSearchContainer from '../../components/bicSearch';
import actionType from '../../actions/merchantAction/actionType';
import { getStorageLenderId } from '../../utils/lenderTheme';
import merchantAction from '../../actions/merchantAction';
import withBaseComponent from '../../HOC/withBaseComponent';

class BicSearch extends Component {
  pageKey = 'Buy with InstaCred Home Search';
  componentDidMount() {
    const { brandsData, categoryData } = this.props || {};
    if (brandsData.length === 0) {
      this.props.merchantAction(actionType.fetchBrands, {
        lenderId: getStorageLenderId(),
      });
    }
    if (categoryData.length === 0) {
      this.props.merchantAction(actionType.fetchCategory, {
        lenderId: getStorageLenderId(),
      });
    }
  }
  render() {
    const { filterOpen, matches } = this.props || {};
    const { utm_campaign: campaignId, b, c } = matches || {};
    return (
      <div className={style.container}>
        {filterOpen ? (
          <BICSearchContainer
            campaignId={campaignId}
            brandIds={b}
            categoryIds={c}
          />
        ) : (
          <SearchedMerchant
            campaignId={campaignId}
            brandIds={b}
            categoryIds={c}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ bicConfig, buyWithInstacred }) => {
  const { brands, categories } = buyWithInstacred || {};
  const { data: brandsData } = brands || {};
  const { data: categoryData } = categories || {};
  const { filterOpen } = bicConfig;
  return {
    brandsData,
    categoryData,
    filterOpen,
  };
};

export default connect(
  mapStateToProps,
  { merchantAction },
)(withBaseComponent(BicSearch));
