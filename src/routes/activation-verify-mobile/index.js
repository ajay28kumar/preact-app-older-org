/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import onRegistrationInit from '../../actions/onRegistrationInit';
import actionType from '../../actions/onRegistrationInit/actionType';
import ActivationVerifyMobile from '../../components/activationVerifyMobile';
import { PinChangeType } from '../../utils/changePinSource';
import type { ApiState } from '../../modelType';
import BenefitImage from '../../components/activationEnterMobile/benefitImage';
import style from './style.css';
import { apiStatus } from '../../actionTypes';
import { route } from 'preact-router';
import { activationStepsRoute } from '../../alias/activationRoutes';
import { getStorageLenderId } from '../../utils/lenderTheme';

type Props = {
  campaignId: string,
  activationId: string,
  initRegistrationApiState: ApiState,
  errorMessage?: string,
  lenderId: string,
  mobile: string,
  onRegistrationInit: Function,
};

class VerifyMobile extends Component<Props> {
  pageKey = 'pv_otp_page_ap';
  metadata = {
    campaign_id: this.props.campaignId || '',
    lender_id: this.props.lenderId,
  };

  componentDidMount() {
    if (this.props.initRegistrationApiState !== apiStatus.SUCCESS) {
      route(`${activationStepsRoute.path}${window.location.search}`);
    }
  }

  onVerifyMobileAction = (actionType, ...rest) => {
    this.props.onRegistrationInit(
      PinChangeType.ACTIVATION,
      actionType,
      ...rest,
    );
  };

  render() {
    const {
      initRegistrationApiState,
      errorMessage,
      lenderId,
      mobile,
    } = this.props;
    return (
      <div className={style.activationContainer}>
        <ActivationVerifyMobile
          isTncAccepted={false}
          pageKey={this.pageKey}
          metadata={this.metadata}
          apiStatus={initRegistrationApiState}
          errorMsg={errorMessage}
          resendOtp={() =>
            this.onVerifyMobileAction(actionType.initiateRegistration, {
              otpInitiate: 'manual',
            })
          }
          verifyNumberCallback={(otp) =>
            this.onVerifyMobileAction(actionType.verifyMobileNumber, {
              otp,
              lenderId,
              mobile,
            })
          }
        />
        <BenefitImage />
      </div>
    );
  }
}

const mapStateToProps = ({
  config,
  registrationUserData,
  activationInit,
  buyWithInstacred,
}) => {
  const { home } = buyWithInstacred;
  const { campaignId } = home || {};
  const { activationId } = config;
  const { initRegistrationApiState, errorMessage } = activationInit;
  const { lenderId, mobile } = registrationUserData;
  return {
    initRegistrationApiState,
    errorMessage,
    activationId,
    campaignId,
    lenderId,
    mobile,
  };
};

export default connect(
  mapStateToProps,
  { onRegistrationInit },
)(withBaseComponent(VerifyMobile));
