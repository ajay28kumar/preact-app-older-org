/** @jsx h */
import { h } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import style from '../../style.css';
import { buyWithInstacredLandingRoute } from '../../../../alias/homeRoutes';
import { route } from 'preact-router';
import { tracker, UserActionType } from '../../../../tracking';

const FilterBar = (props) => {
  const {
    shouldShowFilter,
    totalNumberOfFilters,
    pageKey,
    title,
    campaignId,
    toggleFilter,
  } = props;
  const backUrl = `${buyWithInstacredLandingRoute.path}${
    campaignId ? `?utm_campaign=${campaignId}` : ''
  }`;
  return (
    <TopAppBar.Row className={style.headerHeight}>
      <TopAppBar.Section align-start>
        <TopAppBar.Icon
          navigation
          onClick={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              'nav_back',
              this.pageKey,
              {
                campaign_id: campaignId,
                lender_id: lenderId,
              },
            );
            return route(backUrl);
          }}>
          arrow_back_ios
        </TopAppBar.Icon>
        <TopAppBar.Title className={style.title}>{title}</TopAppBar.Title>
      </TopAppBar.Section>
      <TopAppBar.Section align-end>
        {shouldShowFilter && (
          <div className={style.filterContainer} onClick={toggleFilter}>
            <div>
              <TopAppBar.Icon navigation className={style.filterIcon}>
                tune
              </TopAppBar.Icon>
            </div>
            {totalNumberOfFilters > 0 && (
              <div
                className={`${style.filterCount} text-color font12 bold-text`}>
                {totalNumberOfFilters}
              </div>
            )}
          </div>
        )}
      </TopAppBar.Section>
    </TopAppBar.Row>
  );
};

export default FilterBar;
