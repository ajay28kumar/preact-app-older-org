//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import onRegistrationInit from '../../actions/onRegistrationInit';
import actionType from '../../actions/onRegistrationInit/actionType';
import Utils, { clearSessionStorage, setLocalStorage } from '../../utils';
import { storeLenderId } from '../../utils/lenderTheme';
import { PinChangeType } from '../../utils/changePinSource';
import { lazy } from 'preact/compat/src/suspense';
import { Suspense } from 'preact/compat';

const StepToRegisterContainer = lazy(() =>
  import(/* webpackChunkName: "partial-activation-init" */ '../../components/activationEnterMobile/stepToRegisterContainer'),
);

type Props = {
  matches: Object,
  onRegistrationInit: Function,
};

class StepsToRegister extends Component<Props> {
  componentDidMount() {
    Utils.deleteCookie('sessionId');
    clearSessionStorage();
    const {
      lender: lenderId,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
    } = this.props.matches;
    if (lenderId) storeLenderId(lenderId);

    const payload = {
      lenderId,
      utmSource,
      utmCampaign,
    };

    setLocalStorage('utmSource', utmSource || '');
    setLocalStorage('utmCampaign', utmCampaign || '');
    this.onRegistrationAction(actionType.initialize, payload);
  }

  onRegistrationAction = (actionType, ...rest) => {
    this.props.onRegistrationInit(
      PinChangeType.ACTIVATION,
      actionType,
      ...rest,
    );
  };

  render() {
    return (
      <Suspense fallback={null}>
        <StepToRegisterContainer />
      </Suspense>
    );
  }
}

export default connect(
  null,
  { onRegistrationInit },
)(StepsToRegister);
