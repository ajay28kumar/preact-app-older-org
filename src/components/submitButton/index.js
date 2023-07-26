/** @jsx h */
import { h } from 'preact';
import Button from 'preact-material-components/Button';
import Spinner from '../spinner/spinner';
import { tracker, UserActionType } from '../../tracking';
import 'preact-material-components/Button/style.css';
import style from './style.css';

type Props = {
  /**
   * @property {boolean} disable property of button in case of invalid input/selection
   */
  buttonDisabled?: boolean,
  /**
   * @property {boolean} is true for apiStatus is apiState.INITIATE
   */
  requestStatus?: boolean,

  /**
   * @property {boolean} is true for for tracking click event default: true
   */

  trackClickEvent: boolean,

  /**
   *@property {string} text on button
   */
  buttonText: string,
  /**
   * @property {string} css class property of react
   */
  className?: string,
  /**
   * @property {string}
   */
  pageKey?: string,
  /**
   * @property {string} to track element-name
   */
  elementName?: string,
  /**
   * @property {string} button-id
   */
  buttonId?: string,
  /**
   * @property {string} in case of apiStatus is apiState.INITIATE
   */
  loadingMsg?: string,
  /**
   * @property {Function}
   * @callback value from parent-component
   */
  buttonOnClick: Function,
};

const SubmitButton = ({
  requestStatus = false,
  buttonDisabled = false,
  buttonText,
  className,
  pageKey = 'Missing PageKey',
  elementName = 'Missing ElementName',
  buttonId = 'submitButton',
  loadingMsg = '',
  buttonOnClick,
  metadata = {},
  trackClickEvent = true,
}: Props) => {
  return (
    <div className={style.horizontalCenter}>
      {!requestStatus ? (
        <div className='genericButtonContainer'>
          <Button
            raised
            ripple
            className={`fpPrimaryButton ${className}`}
            id={buttonId}
            onClick={() => {
              if (trackClickEvent) {
                clickTracking({ pageKey, elementName, metadata });
              }
              buttonOnClick();
            }}
            disabled={buttonDisabled}
            primary={false}
            style={{
              backgroundColor: '#5bb556',
            }}>
            {buttonText}
          </Button>
        </div>
      ) : (
        <div style='text-align:center;'>
          <Spinner style='margin: 0 auto;' />
          <div className={style.loaderText}>{loadingMsg}</div>
        </div>
      )}
    </div>
  );
};

const clickTracking = ({ pageKey, elementName, metadata }) => {
  tracker.trackUserInteraction(
    UserActionType.CLICK,
    elementName,
    pageKey,
    metadata,
  );
};

export default SubmitButton;
