import { useState } from 'preact/hooks';
import VisibilitySensor from 'react-visibility-sensor';
import UserEligible from './userEligible';
import style from './style.css';

const EligibilityPanel = ({ bicAction, hideEligiblePanel }) => {
  const [shouldCollapsePrompt, setCollapseValue] = useState(true);
  if (!shouldCollapsePrompt) {
    return null;
  }
  return (
    <VisibilitySensor onChange={hideEligiblePanel} partialVisibility={true}>
      <div className={style.eligibleContainer} id='eligible-panel'>
        <UserEligible
          bicAction={bicAction}
          setCollapseValue={setCollapseValue}
        />
      </div>
    </VisibilitySensor>
  );
};

export default EligibilityPanel;
