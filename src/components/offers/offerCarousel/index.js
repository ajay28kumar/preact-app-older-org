//@flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import SlickSlider from '../../common/slickSlider';
import { CarouselBanner } from './carouselBanner';
import style from './style.css';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  banners: Array<Object>,
  pageKey: string,
};

const OfferCarousel = (props: Props) => {
  const bannerSliderSettings = {
    slidesToShow: 1,
    autoplay: true,
  };
  const { banners, pageKey } = props || {};
  return (
    <div>
      <div class={`${style.offerHeader} text-center ${style.textColor}`}>
        Offers and Discounts
      </div>
      <div class={style.carouselContainer}>
        <div class={`${style.carouselHeader} ${style.textColor}`}>
          Top Deals
        </div>
        <div class={style.carousel}>
          <SlickSlider setting={bannerSliderSettings}>
            {banners.map((item, i) => (
              <CarouselBanner
                key={`${item.id}-${i}`}
                {...item}
                onClick={() => {
                  tracker.trackUserInteraction(
                    UserActionType.CLICK,
                    'Offer Banner',
                    pageKey,
                    { name: `${item.name} Rank - ${i + 1}` },
                  );
                  return route(item.actionUrl);
                }}
              />
            ))}
          </SlickSlider>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { offers } = buyWithInstacred || {};
  const { banners } = offers || {};
  return {
    banners,
  };
};
export default connect(mapStateToProps)(OfferCarousel);
