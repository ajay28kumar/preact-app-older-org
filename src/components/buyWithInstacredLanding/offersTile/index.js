// @flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import SlickSlider from '../../common/slickSlider';
import TilesContainer from '../tilesContainer';
import { howToBuyRoute, offersRoute } from '../../../alias/homeRoutes';
import style from './style.css';
import type { OfferType } from '../../../modelType/bicType';
import howToBuyAction from '../../../actions/howToBuyActions';
import howToBuyActionType from '../../../actions/howToBuyActions/actionType';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  pageKey: string,
  offers: Array<OfferType>,
};

const OffersTile = (props: Props) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3.5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.75,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.35,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  };

  const { offers, pageKey } = props;

  return (
    <TilesContainer
      title='TOP OFFERS'
      additionalButton={true}
      additionalButtonAction={() => {
        tracker.trackUserInteraction(
          UserActionType.CLICK,
          'Top Offers See More',
          pageKey,
        );
        return route(`${offersRoute.path}${window.location.search}`);
      }}>
      <SlickSlider setting={sliderSettings}>
        {offers.map((item, i) => (
          <div className='offer-tiles' key={`${item.id}-${i}`}>
            <div
              style={{ backgroundImage: `url(${item.desktopImgUrl})` }}
              class={`${style.merchantName} cursorPointer`}
              onClick={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  `Top Offers Tile Rank - ${i + 1}`,
                  pageKey,
                  { name: item.handle },
                );
                props.howToBuyAction(howToBuyActionType.redirectToHTB, {
                  referralUrl: offersRoute.path,
                });
                return route(
                  howToBuyRoute.path.replace(':handle', item.handle),
                );
              }}
            />
          </div>
        ))}
      </SlickSlider>
    </TilesContainer>
  );
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { home } = buyWithInstacred || {};
  const { offers } = home;
  return {
    offers,
  };
};

export default connect(
  mapStateToProps,
  { howToBuyAction },
)(OffersTile);
