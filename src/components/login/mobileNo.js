/** @jsx h */
import { Component, h } from 'preact';
import { connect } from 'react-redux';
import MuiInput from '../material-ui/muiInput';
import withBaseComponent from '../../HOC/withBaseComponent';
import { getNumericValue } from '../../utils/stringOperations';
import { lenderNewUserRoute } from '../../alias/activationRoutes';
import RequestButton from '../requestButton';
import { apiStatus } from '../../actionTypes';
import onLoginAction from '../../actions/onLogin';
import style from './style.css';
import actions from '../../actions/onLogin/actionType';
import { tracker, UserActionType } from '../../tracking';
import { route } from 'preact-router';

class MobileNo extends Component {
  pageKey = 'Login';

  state = {
    mobileNo: this.props.mobileNo,
  };
  onSubmit = () => {
    this.props.onLoginAction(actions.initiateLogin, {
      mobileNo: this.state.mobileNo,
      gatewayMerchantId: null,
    });
  };

  render() {
    return (
      <div className={style.loginContainer}>
        <div className={`${style.inputName} font14 text60 bold-text`}>
          Enter mobile number
        </div>
        <MuiInput
          inputID='mobile'
          inputPlaceholder='Enter your 10 digit mobile number'
          pageKey={this.pageKey}
          maxLength={10}
          minLength={10}
          inputValue={this.state.mobileNo}
          inputType='tel'
          onChange={(e) => {
            const mobileNo = getNumericValue(e.target.value);
            if (mobileNo.length === 10) {
              tracker.trackUserInteraction(
                UserActionType.INPUT_ENTERED,
                'User Mobile',
                this.pageKey,
              );
            }
            this.props.onLoginAction(actions.resetErrorMessage);
            this.setState({ mobileNo });
          }}
        />
        {this.props.loginInitApiState === apiStatus.ERROR ? (
          <div>
            {' '}
            {this.props.sudApiState === apiStatus.SUCCESS &&
            this.props.isEligible === true ? (
              <div className='inputError'>
                You will receive an OTP on this number if you have registered with us. If You are not registered on our platform. Please click{' '}
                <span
                  className='bold-text linkColor'
                  id='clickHereToRegister'
                  onClick={() =>
                    route(
                      `${lenderNewUserRoute.path}?lenderId=${
                        this.props.lenderId
                      }`,
                    )
                  }>
                  here
                </span>{' '}
                to register.
              </div>
            ) : (
              <div className='inputError'>{this.props.errorMessage}</div>
            )}
          </div>
        ) : (
          <div className='font12 text60'>
            You will get an OTP on this number
          </div>
        )}
        <div className={style.requestButtonContainer}>
          <RequestButton
            buttonDisabled={this.state.mobileNo.length !== 10}
            buttonOnClick={this.onSubmit}
            buttonId='verifyMobileButton'
            loadingMsg='Verifying Mobile Number'
            buttonText='Next'
            pageKey={this.pageKey}
            elementName='Verify User Mobile Btn'
            requestStatus={this.props.loginInitApiState === apiStatus.INITIATED}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userDetails, userLogin, registrationUserData }) => {
  const { smartUserDetails } = userDetails;
  const { isEligible, userStatus, apiState: sudApiState } = smartUserDetails;
  const { loginInitApiState, errorMessage, mobileNo } = userLogin;
  const { lenderId } = registrationUserData;
  return {
    mobileNo,
    isEligible,
    userStatus,
    sudApiState,
    loginInitApiState,
    errorMessage,
    lenderId,
  };
};

export default connect(
  mapStateToProps,
  { onLoginAction },
)(withBaseComponent(MobileNo));
