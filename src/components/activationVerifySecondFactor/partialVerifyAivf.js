//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { PinChangeType } from '../../utils/changePinSource';
import actions from '../../actions/onRegistrationAivf/actionType';
import VerifySecondFactorContainer from './verifySecondFactorContainer';
import onRegistrationAivf from '../../actions/onRegistrationAivf';
import type { AivfType, ApiState } from '../../modelType';

type Props = {
  aivfType: AivfType,
  lenderName: string,
  initiateCreditLineState: ApiState,
  confirmCreditLineState: ApiState,
  errorMessage?: string,
  pageKey: string,
  onRegistrationAivf: Function,
};

class PartialVerifyAivf extends Component<Props> {
  verifyCreditLine = (aivfValue) => {
    this.props.onRegistrationAivf(
      PinChangeType.ACTIVATION,
      actions.verifyCreditLine,
      {
        aivfValue,
      },
    );
  };
  render() {
    const {
      aivfType,
      lenderName,
      initiateCreditLineState,
      confirmCreditLineState,
      errorMessage,
      pageKey,
    } = this.props;
    return (
      <VerifySecondFactorContainer
        pageKey={pageKey}
        apiStatus={initiateCreditLineState}
        errorMsg={errorMessage}
        aivfType={aivfType}
        lenderName={lenderName}
        confirmCreditLineState={confirmCreditLineState}
        onVerifyCreditLineCallBack={this.verifyCreditLine}
      />
    );
  }
}

const mapStateToProps = ({ config, registrationUserData, activationInit }) => {
  const { activationId } = config;
  const { aivfType, lenderName } = registrationUserData;
  const {
    initiateCreditLineState,
    confirmCreditLineState,
    errorMessage,
  } = activationInit;
  return {
    activationId,
    aivfType,
    lenderName,
    initiateCreditLineState,
    confirmCreditLineState,
    errorMessage,
  };
};

export default connect(
  mapStateToProps,
  { onRegistrationAivf },
)(PartialVerifyAivf);
