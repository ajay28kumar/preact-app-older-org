/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/compat';
import style from '../../style.css';

const NtbSuccessScreen = (props) => {
  const { visibilityTimeUntilRedirect, submitFormCallback } = props || {};
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
    <div className={style.ntbSuccessScreenWrapper}>
      <div className='font16'>
        Successfully Sent SMS. Redirecting you on home screen in
        <span className='font18 text-color bold-text'>
          {' '}
          {redirectTimer} sec
        </span>
      </div>
    </div>
  );
};

export default NtbSuccessScreen;
