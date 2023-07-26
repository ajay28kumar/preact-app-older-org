// @flow
/** @jsx h */
import { h, Component } from 'preact';
import PreApprovedUserTermsAndCondition from './preApprovedUserTermsAndCondition';
import ActiveUserTermsAndCondition from './activeUserTermsAndCondition';
import { connect } from 'react-redux';
import type { LenderDetails } from '../../modelType/transactionTypes';

type Props = {
  /**
   * @property {string} value in between PRE_APPROVED|ACTIVE
   */
  userStatus: string,
  /**
   * @param {LenderDetails} to pass props to registrationTnC and lenderTnC
   */
  lenderDetails: LenderDetails,
  metadata: Object,
  /**
   * @param {Function}
   * @callback final callback function value of isTncAccepted && isLenderTncAccepted
   */
  acceptLenderTncCallback: Function,
};

type State = {
  /**
   * @property {boolean} RegistrationTnC status
   */
  isTncAccepted: boolean,
};

class TermsAndConditions extends Component<Props, State> {
  state = {
    isTncAccepted: this.props.lenderDetails.lenderId === 202,
  };
  componentDidMount() {
    this.props.acceptLenderTncCallback(this.state.isTncAccepted);
  }
  tncCallback = () => {
    this.setState(
      (state) => {
        return {
          isTncAccepted: !state.isTncAccepted,
        };
      },
      () => this.props.acceptLenderTncCallback(this.state.isTncAccepted),
    );
  };

  render() {
    const { lenderDetails, pageKey, userStatus, metadata } = this.props;
    const { lenderId } = lenderDetails || {};
    if (lenderId === 202) {
      return null;
    }
    const { isTncAccepted } = this.state;
    return (
      <div>
        {userStatus === 'PRE_APPROVED' ? (
          <PreApprovedUserTermsAndCondition
            pageKey={pageKey}
            metadata={metadata}
            lenderDetails={lenderDetails}
            isTncAccepted={isTncAccepted}
            onTncClickCallback={this.tncCallback}
          />
        ) : (
          <ActiveUserTermsAndCondition
            pageKey={pageKey}
            metadata={metadata}
            lenderDetails={lenderDetails}
            isTncAccepted={isTncAccepted}
            onTncClickCallback={this.tncCallback}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ paymentDetails, paymentUserData }) => {
  const { userStatus } = paymentDetails || {};
  const { selectedLender } = paymentUserData;
  return {
    userStatus,
    lenderDetails: selectedLender,
  };
};

export default connect(mapStateToProps)(TermsAndConditions);
