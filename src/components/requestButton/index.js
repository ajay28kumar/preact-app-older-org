import Button from 'preact-material-components/Button';
import Spinner from '../spinner/spinner';
import 'preact-material-components/Button/style.css';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';

const RequestButton = ({
  buttonId = 'submitButton',
  loadingMsg = '',
  buttonOnClick,
  buttonWrapperClass = 'genericButtonContainer',
  buttonDisabled = false,
  buttonText,
  requestStatus = false,
  pageKey = '',
  elementName = '',
  metadata = {},
}) => {
  if (!requestStatus) {
    return (
      <div className={buttonWrapperClass}>
        <Button
          id='check-eligibility-button'
          raised
          ripple
          className={`fpPrimaryButton ${style.buttonOpacity}`}
          id={buttonId}
          onClick={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              elementName,
              pageKey,
              metadata,
            );
            return buttonOnClick();
          }}
          disabled={buttonDisabled}>
          {buttonText}
        </Button>
      </div>
    );
  }
  return (
    <div style='text-align:center;'>
      <Spinner style='margin: 0 auto;' />
      <div className={style.loaderText}>{loadingMsg}</div>
    </div>
  );
};

export default RequestButton;
