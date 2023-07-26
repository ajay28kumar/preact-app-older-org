// @flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import TilesContainer from '../tilesContainer';
import SlickSlider from '../../common/slickSlider';
import { Merchant } from './merchant';
import {
  buyWithInstacredLandingRoute,
  buyWithInstacredLandingSearch,
} from '../../../alias/homeRoutes';
import type { MerchantType } from '../../../modelType/bicType';
import howToBuyAction from '../../../actions/howToBuyActions';
import howToBuyActionType from '../../../actions/howToBuyActions/actionType';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  campaignId: string,
  pageKey: string,
  header: string,
  merchants: Array<MerchantType>,
  lenderId: string,
};

const Merchants = ({
  merchants,
  pageKey,
  header,
  howToBuyAction,
  campaignId,
  lenderId,
}: Props) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 2,
    arrows: true,
    placeholders: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },

      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <TilesContainer
      title='TOP MERCHANTS'
      additionalButton='See More'
      additionalButtonAction={() =>
        additionalButtonClick({ pageKey, campaignId, lenderId })
      }>
      <SlickSlider setting={sliderSettings}>
        {merchants.map((tile, index) => {
          return (
            <Merchant
              campaignId={campaignId}
              tile={tile}
              index={index}
              pageKey={pageKey}
              header={header}
              lenderId={lenderId}
              howToBuyClick={() => {
                howToBuyAction(howToBuyActionType.redirectToHTB, {
                  referralUrl: buyWithInstacredLandingRoute.path,
                });
              }}
            />
          );
        })}
      </SlickSlider>
    </TilesContainer>
  );
};

const additionalButtonClick = ({ pageKey, campaignId, lenderId }) => {
  tracker.trackUserInteraction(
    UserActionType.CLICK,
    'bic_top_merchants_see_more',
    pageKey,
    {
      campaign_id: campaignId,
      lender_id: lenderId,
    },
  );
  return route(
    `${buyWithInstacredLandingSearch.path}${window.location.search}`,
  );
};

const mapStateToProps = ({ buyWithInstacred, config }) => {
  const { home } = buyWithInstacred || {};
  const { campaignId, merchants } = home || {};
  const { lenderDetails } = config;
  const { lenderId } = lenderDetails || {};
  return {
    merchants,
    campaignId,
    lenderId,
  };
};
export default connect(
  mapStateToProps,
  { howToBuyAction },
)(Merchants);
