// @flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import { buyWithInstacredLandingSearch } from '../../../alias/homeRoutes';
import bicActionType from '../../../actions/bicAction/actionType';
import TilesContainer from '../tilesContainer';
import SlickSlider from '../../common/slickSlider';
import Category from '../../common/category';
import type { CategoryType } from '../../../modelType/bicType';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  campaignId: string,
  header: string,
  pageKey: string,
  lenderId: string,
  data: Array<CategoryType>,
  bicAction: Function,
};

const CategorySlider = ({
  data,
  campaignId,
  header,
  lenderId,
  pageKey,
  bicAction,
}: Props) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 2,
    arrows: true,
    placeholders: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <TilesContainer
      title='TOP CATEGORIES'
      additionalButton={true}
      additionalButtonAction={() => {
        tracker.trackUserInteraction(
          UserActionType.CLICK,
          'bic_top_categories_see_more',
          pageKey,
          {
            campaign_id: campaignId,
            lender_id: lenderId,
          },
        );

        bicAction(bicActionType.clickCategorySeeMore);
        return route(
          `${buyWithInstacredLandingSearch.path}${window.location.search}`,
        );
      }}>
      <SlickSlider setting={sliderSettings}>
        {data.map((itm, index) => {
          return (
            <Category
              lenderId={lenderId}
              tile={itm}
              tileClickAction={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  'bic_category_tile',
                  pageKey,
                  {
                    tile_name: itm.name,
                    campaign_id: campaignId,
                    lender_id: lenderId,
                  },
                );
                return route(
                  `${buyWithInstacredLandingSearch.path}?c=${itm.id}${
                    campaignId ? `&utm_campaign=${campaignId}` : ''
                  }`,
                );
              }}
            />
          );
        })}
      </SlickSlider>
    </TilesContainer>
  );
};

export default CategorySlider;
