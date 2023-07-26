//@flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import { LayoutColumn, Layout } from '../../common/layout';
import style from './style.css';
import HowToBuyImage from '../howToBuyImg';
import { howToBuyRoute } from '../../../alias/homeRoutes';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  offers: Array<Object>,
  pageKey: string,
};

const OfferCard = (props: Props) => {
  const { offers, pageKey } = props || {};
  const offerCardPosition = 4;
  return (
    <div class={style.allOfferContainer}>
      <div class={`${style.dealText} bold-text font18 text80`}>All Deals</div>
      <Layout>
        {offers.map((offer, index) => {
          return (
            <LayoutColumn
              tabletCols={4}
              desktopCols={6}
              phoneCols={4}
              order={index < offerCardPosition ? index + 1 : index + 2}>
              <img
                src={offer.desktopImgUrl}
                alt={offer.handle}
                className={`${style.merchantName} cursorPointer`}
                onClick={() => {
                  const url = howToBuyRoute.path.replace(
                    ':handle',
                    offer.handle,
                  );
                  return onClickTiles({
                    url,
                    name: offer.handle,
                    index,
                    pageKey,
                  });
                }}
              />
            </LayoutColumn>
          );
        })}
        {offers.length > 3 && (
          <HowToBuyImage pageKey={pageKey} order={offerCardPosition} />
        )}
      </Layout>
    </div>
  );
};

const onClickTiles = ({ url, name, pageKey, index }) => {
  tracker.trackUserInteraction(UserActionType.CLICK, 'Offer Tile', pageKey, {
    name: `${name}  Rank - ${index + 1}`,
  });
  return route(url);
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { offers } = buyWithInstacred || {};
  const { offers: data } = offers || {};
  return {
    offers: data,
  };
};

export default connect(mapStateToProps)(OfferCard);
