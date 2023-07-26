import { Component } from 'preact';
import withBaseComponent from '../../HOC/withBaseComponent';
import { PasswordContent } from './passwordContent';
import { route } from 'preact-router';
import style from './style.css';
import { getStorageLenderId } from '../../utils/lenderTheme';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';
import RequestButton from '../requestButton';
import { connect } from 'react-redux';
import onLoginAction from '../../actions/onLogin';
import actionType from '../../actions/onLogin/actionType';
import { apiStatus } from '../../actionTypes';

class Password extends Component {
  pageKey = 'Login OTP';
  state = {
    password: '',
  };

  componentDidUpdate(previousProps) {
    const { loginAuthApiState: prevLoginAuthState } = previousProps;
    if (
      prevLoginAuthState !== this.props.loginAuthApiState &&
      this.props.loginAuthApiState === apiStatus.SUCCESS
    ) {
      route(
        getStorageLenderId()
          ? `${
              buyWithInstacredLandingRoute.path
            }?utm_campaign=${getStorageLenderId()}`
          : buyWithInstacredLandingRoute.path,
        true,
      );
    }
  }

  verifyPassword = () => {
    const { mobileNo, onLoginAction } = this.props || {};
    return onLoginAction(actionType.initiateAuth, {
      mobile: mobileNo,
      authValue: this.state.password,
      gatewayMerchantId: null,
    });
  };

  render() {
    const { loginAuthApiState, errorMessage } = this.props;
    const passwordLength = 5;
    return (
      <div className={style.loginContainer}>
        <PasswordContent
          authValue={this.state.password}
          pageKey={this.pageKey}
          updateAuthValue={(password) => {
            this.setState({ password });
          }}
        />
        {loginAuthApiState === apiStatus.ERROR && (
          <div className='inputError'>{errorMessage}</div>
        )}
        <div className={style.requestButtonContainer}>
          <RequestButton
            buttonDisabled={this.state.password.length !== passwordLength}
            buttonOnClick={this.verifyPassword}
            buttonId='verifyAuthButton'
            loadingMsg='Verifying Mobile Number'
            buttonText='Verify OTP'
            requestStatus={loginAuthApiState === apiStatus.INITIATED}
            pageKey={this.pageKey}
            elementName='Login Btn'
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userLogin, registrationUserData }) => {
  const { mobileNo, loginAuthApiState, errorMessage } = userLogin;
  const { lenderId } = registrationUserData;
  return {
    errorMessage,
    loginAuthApiState,
    mobileNo,
    lenderId,
  };
};

export default connect(
  mapStateToProps,
  { onLoginAction },
)(withBaseComponent(Password));
