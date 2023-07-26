// @flow
/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import { buyWithInstacredLandingRoute } from '../../../alias/homeRoutes';
import { getStorageLenderId } from '../../../utils/lenderTheme';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  pageKey: string,
};

const DefaultBICLInk = ({ pageKey }: Props) => {
  return (
    <div
      onClick={() => {
        tracker.trackUserInteraction(
          UserActionType.CLICK,
          'Explore Other Merchants',
          pageKey,
        );

        const lenderId = getStorageLenderId();
        if (lenderId) {
          return route(
            `${buyWithInstacredLandingRoute.path}?utm_campaign=${lenderId}`,
          );
        }
        route(buyWithInstacredLandingRoute.path);
      }}
      className='linkColor font16 bold-text text-center'>
      Explore other merchants and offers
    </div>
  );
};

export default DefaultBICLInk;
