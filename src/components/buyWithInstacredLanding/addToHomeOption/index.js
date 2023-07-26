// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import RequestButton from '../../requestButton';
import { tracker, UserActionType } from '../../../tracking';
import { setLocalStorage } from '../../../utils';

type Props = {
  pageKey: string,
  onHideAddToScreenCallBack: Function,
};

const AddToHomeOption = ({ pageKey, onHideAddToScreenCallBack }: Props) => {
  return (
    <div className={style.addToHomeScreenPrompt}>
      <div className={style.addToHomeScreenTextContainer}>
        <div className={style.iconAndTextContainer}>
          <div className={style.iconContainer}>
            <img src='/assets/favicon.ico' className={style.appIcon} />
          </div>
          <div className={style.textContainer}>
            <div className='font18 text80 bold-text'>Add InstaCred to Home</div>
            <div className='font14 text60' style={{ textAlign: 'left' }}>
              Click to get Instant Access to{' '}
              <span className='bold-text'>EMI Offers </span> on your favourite
              products
            </div>
          </div>
        </div>
        <div className={style.actionContainer}>
          <div
            className='font14 text-color bold-text cursorPointer'
            onClick={() => {
              tracker.trackUserInteraction(
                UserActionType.CLICK,
                'NOT NOW',
                pageKey,
              );

              setLocalStorage('hideAddToHomeScreenPrompt', 'true');
              return onHideAddToScreenCallBack();
            }}>
            NOT NOW
          </div>
          <RequestButton
            buttonId='verifyOtpButton'
            buttonWrapperClass={style.addToHomeBtn}
            buttonOnClick={() => {
              const { prompt, userChoice } = window.addToHomeScreenObject || {};
              if (prompt) {
                window.addToHomeScreenObject.prompt();
                userChoice.then(({ outcome }) => {
                  if (outcome === 'accepted') {
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'Added App to Home Screen',
                      pageKey,
                    );
                  } else {
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'Rejected Add to Home Screen',
                      pageKey,
                    );
                  }
                });
              }
              window.addToHomeScreenObject = null;
              return onHideAddToScreenCallBack();
            }}
            buttonText='Add to Home Screen'
          />
        </div>
      </div>
    </div>
  );
};

export default AddToHomeOption;
