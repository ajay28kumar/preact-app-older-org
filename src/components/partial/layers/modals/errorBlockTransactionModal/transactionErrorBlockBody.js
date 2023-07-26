/** @jsx h */
//@flow
import { Fragment, h } from 'preact';
import { useState, useEffect, useRef } from 'preact/compat';
import style from './style.css';
import { connect } from 'react-redux';
import SpinLoader from '../../../../spinLoader';
import Utils from '../../../../../utils';

import { visibilityTimeUntilRedirect } from './constant';
import { tracker, UserActionType } from '../../../../../tracking';

type Props = {
  helpText: String,
  title: String,
  message: String,
  cta: String,
  errorType: String,
  pageKey: String,
  returnUrl: String,
  pgData: Object,
  closeModal: Function,
};

const clickTracking = (
  pageKey = 'Missing PageKey',
  elementName = 'Missing ElementName',
  additionalProperties,
) => {
  tracker.trackUserInteraction(
    UserActionType.CLICK,
    elementName,
    pageKey,
    additionalProperties,
  );
};

const TransactionErrorBlockBody = (props: Props) => {
  const {
    helpText,
    title,
    message,
    cta,
    errorType,
    pageKey,
    closeModal,
    pgData,
    returnUrl,
    metadata,
  } = props || {};

  const interval = useRef();

  const [redirectTimer, setRedirectTimer] = useState(
    visibilityTimeUntilRedirect,
  );

  useEffect(() => {
    interval.current = setInterval(() => {
      setRedirectTimer((seconds) => (seconds ? seconds - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const submitReturnUrl = () => {
    if (returnUrl) {
      const utils = new Utils();
      utils.createAndSubmitDynamicForm(pgData, returnUrl);
    }
  };

  const handleButton = () => {
    clickTracking(pageKey, 'Error', {
      ...(errorType && { error_type: errorType }),
      ...(message && { error_message: message }),
      ...(title && { error_title: title }),
      ...metadata,
    });
    submitReturnUrl();
    closeModal();
  };

  useEffect(() => {
    if (redirectTimer === 0) {
      submitReturnUrl();
      clearInterval(interval.current);
    }
  }, [redirectTimer]);

  return (
    <Fragment>
      {title && (
        <div className={style.headerContainer}>
          <div className='font20 text80 bold-text text-center'>{title}</div>
        </div>
      )}
      {message && <p className='font14 text60'>{message}</p>}

      {cta && (
        <div className={style.buttonWrapper}>
          <button className={style.goBackButton} onClick={handleButton}>
            <span className={`material-icons`}>keyboard_arrow_left</span>
            {cta}
          </button>
        </div>
      )}

      {helpText && (
        <div className={`font12 text-center text60 ${style.helperText}`}>
          {helpText}
        </div>
      )}

      <div className={`${style.redirect__wrapper} block__modal--loader`}>
        <div className={style.loader}>
          <SpinLoader size='xsmall' />
        </div>
        <span className={style.redirect__text}>
          Redirecting in{' '}
          <span className={style.timer}>
            {redirectTimer} second{redirectTimer > 1 ? 's' : ''}
          </span>
        </span>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ modal, config, paymentUserData }) => {
  const { pgData, returnUrl } = paymentUserData || {};

  const { errorBlockTransaction } = modal || {};
  const { helpText, title, message, cta, errorType } =
    errorBlockTransaction || {};
  const { pageKey, metadata } = config;
  return {
    helpText,
    title,
    message,
    cta,
    errorType,
    pageKey,
    pgData,
    returnUrl,
    metadata,
  };
};

export default connect(mapStateToProps)(TransactionErrorBlockBody);
