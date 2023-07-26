//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import MuiInput from '../material-ui/muiInput';
import RequestButton from '../requestButton';
import actionType from '../../actions/onRegistrationInit/actionType';
import { apiStatus } from '../../actionTypes';
import withBaseComponent from '../../HOC/withBaseComponent';
import { isMobileFormatValid } from '../../utils/mobileNumberValidation';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';
import style from './style.css';
import type { ApiState } from '../../modelType';
import { tracker, UserActionType } from '../../tracking';
import { getLocalstorage } from '../../utils';

type State = {
  isMobileNumberValid: boolean,
  mobileNumber: string,
};
type Props = {
  lenderId: string,
  benefitImg: string,
  merchantLogo: string,
  errorMsg?: string,
  initRegistrationApiState: ApiState,
  activationActionCallBack: Function,
  campaignId: string,
  matches: Object,
};

class ActivationInitContainer extends Component<Props, State> {
  pageKey = 'pv_benefitspage_ap';
  metadata = {
    campaign_id: this.props.campaignId || '',
    lender_id: this.props.lenderId,
  };

  state = {
    mobileNumber: '',
    isMobileNumberValid: true,
  };
  render() {
    const {
      benefitImg,
      merchantLogo,
      errorMsg,
      initRegistrationApiState,
      activationActionCallBack,
      campaignId,
    } = this.props;

    const { mobileNumber } = this.state;
    return (
      <div className='activation-container'>
        <div>
          <img
            src={benefitImg}
            className={style.benefitImage}
            alt={`Use your Bank's Cardless EMI option to buy`}
          />
        </div>
        {merchantLogo && (
          <div className={style.merchantLogo} id='merchantLogoDiv'>
            <img src={merchantLogo} alt='merchant-logo' />
          </div>
        )}
        <MuiInput
          outlined
          isError={!!errorMsg}
          autoFocus={true}
          inputType='text'
          inputName='mobile'
          inputPlaceholder='Enter Mobile Number'
          inputID='mobile'
          inputValue={mobileNumber}
          className='mobile-input'
          maxLength={10}
          minLength={10}
          pageKey={this.pageKey}
          elementName='ap_enter_mobile'
          metadata={this.metadata}
          onChange={(event) => {
            const text = event.target.value;
            const mobileNumber = text ? text.replace(/[^0-9]/g, '') : '';
            this.setState({ mobileNumber });
          }}
        />
        <div className={style.otpDescription}>
          {errorMsg ? (
            <div className='inputError' id='error-mobile-input'>
              {errorMsg}
            </div>
          ) : (
            <div className='font12 text60'>
              You will get an OTP on this number
            </div>
          )}
        </div>
        <RequestButton
          elementName='ap_check_pa_status_btn'
          pageKey={this.pageKey}
          metadata={this.metadata}
          buttonId='sendOtpButton'
          loadingMsg='Please Wait..'
          buttonDisabled={!(mobileNumber.length === 10)}
          buttonOnClick={() => {
            !isMobileFormatValid(mobileNumber)
              ? activationActionCallBack(
                  actionType.dispatchActivationErrorMessage,
                  {
                    message: 'Mobile Number Invalid',
                  },
                )
              : activationActionCallBack(actionType.initiateRegistration, {
                  mobile: mobileNumber,
                  campaignId,
                });
          }}
          buttonText='VERIFY MOBILE TO START'
          requestStatus={initRegistrationApiState === apiStatus.INITIATED}
        />
        <div
          className={`${style.shopLaterText} bold-text text-color`}
          id='shopLaterDiv'
          onClick={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              'ap_explore_more',
              this.pageKey,
              this.metadata,
            );
            const campaignId = getLocalstorage('utmCampaign') || '';
            const path = `${buyWithInstacredLandingRoute.path}${
              campaignId ? `?utm_campaign=${campaignId}` : ''
            }`;
            return route(path);
          }}>
          Explore More
        </div>
      </div>
    );
  }
}

export default withTerminalApiResponse(
  withBaseComponent(ActivationInitContainer),
);
