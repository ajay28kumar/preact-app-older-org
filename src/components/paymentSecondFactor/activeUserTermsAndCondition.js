// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import style from './style.css';
import Checkbox from 'preact-material-components/Checkbox';
import FormField from 'preact-material-components/FormField';
import type { LenderDetails } from '../../modelType/transactionTypes';
import LenderTermsHandler from './lenderTermsHandler';
import HdfcLoanTnc from '../termsAndConditionsContent/hdfcLoanTnc';
import Dialog from 'preact-material-components/Dialog';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  /**
   * @property {boolean} TnC checkbox status of LenderTnC
   */
  isTncAccepted: boolean,
  /**
   * @property {string}
   */
  pageKey: string,
  /**
   * @param {LenderDetails} to get lenderId
   */
  lenderDetails: LenderDetails,
  metadata: Object,
  /**
   * @property {Function} to click action of checkBox
   */
  onTncClickCallback: Function,
};

type State = {
  tncType:
    | 'loanTnc'
    | 'payLater'
    | 'scheduleCharges'
    | 'federalTnc'
    | 'mahindraFinanceTnc',
  showLenderTncModal: boolean,
};

class ActiveUserTermsAndCondition extends Component<Props, State> {
  state = {
    tncType: 'loanTnc',
    showLenderTncModal: false,
  };
  showLenderTncModal = (tncType) => {
    this.setState({
      tncType,
    });
    const tncEventName =
      tncType !== 'scheduleCharges'
        ? 'aivf_view_lender_t&c'
        : 'aivf_view_schedule_of_charges_url';
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      tncEventName,
      this.props.pageKey,
      this.props.metadata,
    );
    this.setState({ showLenderTncModal: true }, () =>
      this.lenderTncDialog.MDComponent.show(),
    );
  };

  hideLenderTncModal = () => {
    const { tncType } = this.state || {};
    const tncEventName =
      tncType !== 'scheduleCharges'
        ? 'aivf_view_lender_t&c'
        : 'aivf_view_schedule_of_charges_modal';
    tracker.trackUserInteraction(
      UserActionType.DISMISS,
      tncEventName,
      this.props.pageKey,
      this.props.metadata,
    );

    this.lenderTncDialog.MDComponent.close();
    this.setState({ showLenderTncModal: false });
  };
  render() {
    const {
      lenderDetails,
      onTncClickCallback,
      isTncAccepted,
      pageKey,
      metadata,
    } = this.props;

    return (
      <div>
        <div className={style.container}>
          <FormField className={style.checkbox}>
            <Checkbox
              id='instacredTncCheckbox'
              checked={isTncAccepted}
              onClick={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  'aivf_accept_t&c',
                  pageKey,
                  this.props.metadata,
                );
                return onTncClickCallback();
              }}
            />
            <label className={`font12 ${style.text}`}>
              <p id='instacredTncText'>
                <span className='text60'>I agree to the&nbsp;</span>
                {lenderDetails.lenderId === 501 ? (
                  <Fragment>
                    <span
                      className='linkColor bold-text'
                      onClick={() =>
                        this.showLenderTncModal('scheduleCharges')
                      }>
                      Schedule of Charges&nbsp;
                    </span>
                    <span className='text60'>
                      and Terms & Conditions of the&nbsp;
                    </span>
                  </Fragment>
                ) : (
                  <span className='text60'>
                    Terms & Conditions of the&nbsp;
                  </span>
                )}
                <LenderTermsHandler
                  pageKey={pageKey}
                  metadata={metadata}
                  lenderDetails={lenderDetails}
                  showLenderTncModal={this.showLenderTncModal}
                />
                <span className='text60'>.</span>
              </p>
            </label>
          </FormField>
        </div>
        {this.state.showLenderTncModal && (
          <Dialog
            ref={(lenderTncDialog) => {
              this.lenderTncDialog = lenderTncDialog;
            }}
            onCancel={this.hideLenderTncModal}
            className='tnc-modal lenderLoanAgreementModal'>
            <HdfcLoanTnc
              tncType={this.state.tncType}
              onCloseCallback={this.hideLenderTncModal}
            />
          </Dialog>
        )}
      </div>
    );
  }
}

export default ActiveUserTermsAndCondition;
