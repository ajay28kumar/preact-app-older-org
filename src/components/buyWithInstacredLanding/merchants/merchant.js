// @flow
/** @jsx h */
import { Fragment, h } from 'preact';
import style from './style.css';
import { route } from 'preact-router';
import { textTruncate } from '../../../utils/stringOperations';
import { howToBuyRoute } from '../../../alias/homeRoutes';
import type { MerchantType } from '../../../modelType/bicType';
import { ComingSoonPill } from '../../common/merchant/comingSoonPill';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  campaignId?: string,
  index: number,
  pageKey: string,
  header: string,
  tile: MerchantType,
  seeMore?: Function,
  howToBuyClick: Function,
  lenderId: string,
};
export const Merchant = ({
  campaignId,
  tile,
  index,
  pageKey,
  header,
  seeMore,
  howToBuyClick,
  lenderId,
}: Props) => {
  return (
    <div
      onClick={() => {
        if (tile.bicStatus !== 'UPCOMING') {
          howToBuyClick();
          clickMerchant({
            campaignId,
            pageKey,
            header,
            tile_name: tile.name,
            handle: tile.handle,
            index,
            lenderId,
          });
        }
      }}
      className={style.tile}>
      <div>
        <a>
          {tile.bicStatus === 'UPCOMING' && <ComingSoonPill />}
          <div
            className={style.imageTile}
            style={{
              backgroundImage: `url(${tile.mobileImgUrl})`,
              height: 76,
            }}
          />
        </a>
      </div>
      <div className={style.tileDescription}>
        <h2
          className={`${style.tileDescriptionHeader} font14 bold-text margin0`}>
          {tile.name}
        </h2>
        <p className={`font12 margin0 ${style.tileDescriptionContent}`}>
          {!tile.description ? (
            ''
          ) : tile.description.length < 50 ? (
            <span className='text60'>{tile.description}</span>
          ) : (
            <Fragment>
              <span className='text60'>
                {textTruncate(tile.description, 50)}...&nbsp;
              </span>
              {seeMore && (
                <span
                  className='bold-text text-color cursorPointer'
                  onClick={(event) => seeMore(event, tile)}>
                  See More
                </span>
              )}
            </Fragment>
          )}
        </p>
      </div>
    </div>
  );
};
/**
 * @param pageKey
 * @param campaignId
 * @param header
 * @param name
 * @param handle
 * @param index
 * @return {boolean}
 */

const clickMerchant = ({
  pageKey,
  header,
  tile_name,
  handle,
  index,
  campaignId,
  lenderId,
}) => {
  tracker.trackUserInteraction(
    UserActionType.CLICK,
    'bic_merchants_tile',
    pageKey,
    {
      tile_name,
      campaign_id: campaignId,
      lender_id: lenderId,
    },
  );
  return route(
    `${howToBuyRoute.internalRoute}${handle}?${
      campaignId ? `utm_campaign=${campaignId}` : ''
    }`,
  );
};
