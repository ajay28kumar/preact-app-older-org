//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import onRegistrationAivf from '../../actions/onRegistrationAivf';
import { connect } from 'react-redux';
import actions from '../../actions/onRegistrationAivf/actionType';
import { PinChangeType } from '../../utils/changePinSource';

const PartialVerifyAivf = lazy(() =>
  import(/* webpackChunkName: "activation-partial-verify-aivf" */ '../../components/activationVerifySecondFactor/partialVerifyAivf'),
);

type Props = {
  activationId?: string,
  onRegistrationAivf: Function,
};

class ActivationVerifySecondFactor extends Component<Props> {
  pageKey = 'pv_aivf_page_aivf';
  metadata = {
    merchant_id: this.props.merchantId,
    txn_amount: this.props.amount,
  };
  componentDidMount() {
    this.initCreditLine();
  }
  initCreditLine = () => {
    this.props.onRegistrationAivf(
      PinChangeType.ACTIVATION,
      actions.initiateCreditLine,
    );
  };

  render() {
    return (
      <div className='activation-container'>
        <Suspense fallback={null}>
          <PartialVerifyAivf pageKey={this.pageKey} />
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = ({ config }) => {
  const { activationId } = config;
  return {
    activationId,
  };
};

export default connect(
  mapStateToProps,
  { onRegistrationAivf },
)(ActivationVerifySecondFactor);
