//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import { apiStatus } from '../../../actionTypes';
import { verifyMobileRoute } from '../../../alias/activationRoutes';
import { PinChangeType } from '../../../utils/changePinSource';
import onRegistrationInit from '../../../actions/onRegistrationInit';
import ActivationInitContainer from './../activationInitContainer';
import type { ApiState } from '../../../modelType';
import BenefitImage from '../benefitImage';
import style from '../style.css';

type Props = {
  lenderId: string,
  pageKey: string,
  benefitImg: string,
  merchantLogo: string,
  campaignApiState: ApiState,
  initRegistrationApiState: ApiState,
  errorMessage?: string,
};

class StepToRegisterContainer extends Component<Props> {
  componentDidUpdate(previousProps) {
    const {
      initRegistrationApiState: prevInitRegistrationApiState,
    } = previousProps;
    const { initRegistrationApiState } = this.props;
    if (
      prevInitRegistrationApiState !== initRegistrationApiState &&
      initRegistrationApiState === apiStatus.SUCCESS
    ) {
      return route(`${verifyMobileRoute.path}${window.location.search}`);
    }
  }

  onRegistrationAction = (actionType, ...rest) => {
    this.props.onRegistrationInit(
      PinChangeType.ACTIVATION,
      actionType,
      ...rest,
    );
  };

  render() {
    const {
      lenderId,
      benefitImg,
      merchantLogo,
      campaignApiState,
      initRegistrationApiState,
      errorMessage,
      campaignId,
    } = this.props;

    return (
      <div className={style.activationContainer}>
        <ActivationInitContainer
          lenderId={lenderId}
          apiStatus={campaignApiState}
          benefitImg={benefitImg}
          merchantLogo={merchantLogo}
          errorMsg={errorMessage}
          campaignId={campaignId}
          initRegistrationApiState={initRegistrationApiState}
          activationActionCallBack={this.onRegistrationAction}
        />
        <BenefitImage />
      </div>
    );
  }
}

const mapStateToProps = ({
  activationInit,
  buyWithInstacred,
  registrationUserData,
}) => {
  const { lenderId } = registrationUserData || {};
  const {
    benefitImg,
    merchantLogo,
    campaignApiState,
    initRegistrationApiState,
    errorMessage,
  } = activationInit;
  const { home } = buyWithInstacred;
  const { campaignId } = home;
  return {
    lenderId,
    benefitImg,
    merchantLogo,
    campaignApiState,
    initRegistrationApiState,
    errorMessage,
    campaignId,
  };
};

export default connect(
  mapStateToProps,
  { onRegistrationInit },
)(StepToRegisterContainer);
