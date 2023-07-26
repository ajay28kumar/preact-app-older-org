// @flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import TilesContainer from '../tilesContainer';
import style from './style.css';
import Brand from '../../common/brand';
import { buyWithInstacredLandingSearch } from '../../../alias/homeRoutes';
import { connect } from 'react-redux';
import type { BrandType } from '../../../modelType/bicType';
import bicActionType from '../../../actions/bicAction/actionType';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  campaignId: string,
  pageKey: string,
  header: string,
  brands: Array<BrandType>,
  bicAction: Function,
  lenderId: string,
};

const Brands = (props: Props) => {
  return (
    <TilesContainer
      title='Top Brands'
      additionalButton='See More'
      additionalButtonAction={() => {
        tracker.trackUserInteraction(
          UserActionType.CLICK,
          'bic_top_brands_see_more',
          props.pageKey,
          {
            campaign_id: props.campaignId,
            lender_id: props.lenderId,
          },
        );
        props.bicAction(bicActionType.clickBrandsSeeMore);
        return route(
          `${buyWithInstacredLandingSearch.path}${window.location.search}`,
        );
      }}>
      <div className={style.imageContainer}>
        {props.brands.map((image, index) => {
          return (
            <Brand
              name={image.name}
              desktopImgUrl={image.desktopImgUrl}
              brandClick={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  'bic_brands_tile',
                  props.pageKey,
                  {
                    'Tile Name': image.name,
                    campaign_id: props.campaignId,
                    lender_id: props.lenderId,
                  },
                );
                return route(
                  `${buyWithInstacredLandingSearch.path}?b=${image.id}${
                    props.campaignId ? `&utm_campaign=${props.campaignId}` : ''
                  }`,
                );
              }}
            />
          );
        })}
      </div>
    </TilesContainer>
  );
};

const mapStateToProps = ({ buyWithInstacred, config }) => {
  const { home } = buyWithInstacred;
  const { campaignId, brands } = home;
  const { lenderDetails } = config;
  const { lenderId } = lenderDetails || {};
  const MAX_RESULT = 10;
  return {
    campaignId,
    lenderId,
    brands: brands.length > MAX_RESULT ? brands.slice(0, MAX_RESULT) : brands,
  };
};

export default connect(mapStateToProps)(Brands);
