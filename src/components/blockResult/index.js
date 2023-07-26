// @flow
/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/compat';
import style from './style.css';
import SpinLoader from '../spinLoader';

type Props = {
  /**
   * @property {number} initial timer to start countdown for redirection
   */
  visibilityTimeUntilRedirect: number,
  /**
   * @property {string} message to display in block before redirecting to the next screen
   */
  displayMessage: string,
  /**
   * @property {string} CTA text where user an click to redirect on next screen
   */
  buttonText: string,
  /**
   * @property {Function}
   * @callback to call redirect action for next screen
   */
  submitFormCallback: Function,
};

const BlockResult = (props: Props) => {
  const {
    visibilityTimeUntilRedirect,
    submitFormCallback,
    displayMessage,
    buttonText,
  } = props;
  const [redirectTimer, setRedirectTimer] = useState(
    visibilityTimeUntilRedirect,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectTimer((seconds) => seconds - 1);
    }, 1000);
    if (redirectTimer === 0) {
      submitFormCallback();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [redirectTimer]);

  return (
    <div>
      <div className={style.loaderContainer}>
        <div className={style.loader}>
          <SpinLoader size='small' />
        </div>
        <div className='bold-text text-center'>
          <span className='font14 text60' id='block-loader-text'>
            {displayMessage}
          </span>
          <span className='text-color bold-text' style={{ opacity: 1 }}>
            {redirectTimer} second{redirectTimer > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div className={style.redirectWrapper}>
        <div
          className={`${style.bottomLink} cursorPointer`}
          onClick={submitFormCallback}>
          <span className='linkColor bold-text font14' id='redirect-text'>
            {buttonText}{' '}
          </span>{' '}
          <span className='material-icons font18 text-color'>
            {' '}
            keyboard_arrow_right{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlockResult;
