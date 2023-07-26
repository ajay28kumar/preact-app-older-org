/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import UserEligible from '../eligibilityPanel/userEligible';
import style from './style.css';

const EligiblePrompt = (props) => {
  const { shouldOpenEligiblePanel, bicAction } = props;
  const [shouldCollapsePrompt, setCollapseValue] = useState(
    shouldOpenEligiblePanel,
  );
  if (!shouldOpenEligiblePanel || !shouldCollapsePrompt) {
    return null;
  }

  return (
    <div className={style.userEligiblePrompt}>
      <div
        className={style.closeButton}
        onClick={() => setCollapseValue(false)}>
        <span className='material-icons text-color bold-text'>
          {shouldCollapsePrompt && 'close'}
        </span>
      </div>
      <UserEligible
        bicAction={bicAction}
        shouldDisplayPrompt={!shouldCollapsePrompt}
        setCollapseValue={setCollapseValue}
      />
    </div>
  );
};

export default EligiblePrompt;
