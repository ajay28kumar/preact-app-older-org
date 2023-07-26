// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { connect } from 'react-redux';
import type { BranchLocatorType } from '../../modelType/bicType';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  pageKey: string,
  branchLocator: BranchLocatorType,
};
const BranchLocator = ({ branchLocator, pageKey }: Props) => {
  const {
    title,
    buttonText,
    actionUrl,
    secondaryButtonText,
    secondaryActionUrl,
  } = branchLocator;
  return (
    <div class={style.branchLocatorContainer}>
      {title && <div class={style.branchLocatorTitleContainer}>{title}</div>}
      <div class={style.branchLocatorButtonContainer}>
        <button type='button' className='btn genericButtonFilled'>
          <a
            onClick={() => trackBranchLocatorClick('primary', pageKey)}
            href={actionUrl}
            target='_blank'>
            {buttonText}
          </a>
        </button>
      </div>
      {secondaryButtonText && secondaryActionUrl ? (
        <div class={style.secondaryLink}>
          <a
            onClick={() => trackBranchLocatorClick('secondary', pageKey)}
            href={secondaryActionUrl}
            target='_blank'>
            {secondaryButtonText}
          </a>
        </div>
      ) : null}
    </div>
  );
};

const trackBranchLocatorClick = (actionType, pageKey) => {
  tracker.trackUserInteraction(
    UserActionType.CLICK,
    'Branch Locator Click - ' + actionType,
    pageKey,
    '',
  );
};

const mapStateToProps = ({ buyWithInstacred }) => {
  const { home } = buyWithInstacred;
  const { branchLocator } = home;
  return {
    branchLocator,
  };
};

export default connect(mapStateToProps)(BranchLocator);
