import { useState } from 'preact/hooks';
import MuiInput from '../../material-ui/muiInput';
import RequestButton from '../../requestButton';
import { getNumericValue } from '../../../utils/stringOperations';
import { Fragment } from 'preact';
import actionType from '../../../actions/bicAction/actionType';
import { connect } from 'react-redux';
import { apiStatus } from '../../../actionTypes';
import Spinner from '../../spinner/spinner';
import style from './style.css';
import { route } from 'preact-router';
import { loginRoute } from '../../../alias/homeRoutes';
import { getLocalstorage } from '../../../utils';

const UserEligible = (props) => {
  const {
    apiState,
    isEligible,
    userStatus,
    errorMessage,
    pageKey,
    shouldDisplayPrompt,
    bicAction,
    setCollapseValue,
  } = props;
  const attemptsRemaining = getLocalstorage('attemptsRemaining')
    ? parseInt(getLocalstorage('attemptsRemaining'), 10)
    : 2;
  if (attemptsRemaining === 0) {
    setCollapseValue && setCollapseValue(false);
    return null;
  }

  if (apiState === apiStatus.INITIATED) {
    return (
      <div className={style.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  if (apiState === apiStatus.ERROR) {
    return <div className='font16 errorColor bold-text'>{errorMessage}</div>;
  }

  if (apiState === apiStatus.SUCCESS && isEligible) {
    if (userStatus === 'ACTIVE') {
      return (
        <div className='font14 text60'>
          You are eligible to use InstaCred across 1000+ merchants. To login,
          click{' '}
          <span className='text-color' onClick={() => route(loginRoute.path)}>
            here
          </span>
        </div>
      );
    } else {
      return (
        <div className={style.spinnerWrapper}>
          <Spinner />
        </div>
      );
    }
  }
  if (shouldDisplayPrompt) {
    return (
      <h2 className='font20 text80 bold-text margin0'>
        Eligible for InstaCred?
      </h2>
    );
  }
  const [mobileNumber, setMobileNumber] = useState('');
  return (
    <Fragment>
      <h2 className='font20 text80 bold-text margin0'>
        Eligible for InstaCred?
      </h2>
      <p className='font14 text60 margin0'>Check eligibility in 1 easy step</p>
      <div className={style.inputContainer}>
        <MuiInput
          pageKey={pageKey}
          className={style.inputBox}
          inputPlaceholder='Enter Mobile Number'
          elementName='eligible-text'
          maxLength={10}
          minLength={10}
          inputValue={mobileNumber}
          autoFocus={false}
          onChange={(e) => setMobileNumber(getNumericValue(e.target.value))}
        />
        <RequestButton
          buttonDisabled={mobileNumber.length !== 10}
          buttonId='eligibility-button'
          loadingMsg='Verifying...'
          pageKey={pageKey}
          buttonWrapperClass={style.submitButton}
          elementName='Verify Eligible Number'
          buttonText='Check'
          buttonOnClick={() => {
            return bicAction(actionType.checkUserEligible, {
              mobile: mobileNumber,
            });
          }}
          requestStatus={false}
        />
      </div>
      <div className={`${style.aboutInputText} font12 text60`}>
        You will get an OTP on this number
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ userDetails }) => {
  const { smartUserDetails } = userDetails;
  const { apiState, isEligible, userStatus, errorMessage } = smartUserDetails;
  return {
    errorMessage,
    apiState,
    isEligible,
    userStatus,
  };
};

export default connect(mapStateToProps)(UserEligible);
