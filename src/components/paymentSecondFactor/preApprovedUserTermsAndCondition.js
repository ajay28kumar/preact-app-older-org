// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import 'preact-material-components/Checkbox/style.css';
import style from './style.css';
import Dialog from 'preact-material-components/Dialog';
import TermsAndConditionsContent from '../termsAndConditionsContent';
import FormField from 'preact-material-components/FormField';
import Checkbox from 'preact-material-components/Checkbox';
import LenderTermsHandler from './lenderTermsHandler';
import HdfcLoanTnc from '../termsAndConditionsContent/hdfcLoanTnc';
import type { LenderDetails } from '../../modelType/transactionTypes';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  /**
   * @property {boolean} flexmoney TnC status
   */
  isTncAccepted: boolean,
  /**
   * @property {string}
   */
  pageKey: string,
  /**
   * @param {LenderDetails} to get lenderId/lenderName
   */
  lenderDetails: LenderDetails,
  metadata: Object,
  /**
   * @property {Function}
   * @callback function on checkbox click
   */
  onTncClickCallback: Function,
};
type State = {
  tncType:
    | 'loanTnc'
    | 'payLater'
    | 'scheduleCharges'
    | 'federalTnc'
    | 'iciciTnc'
    | 'mahindraFinanceTnc',
  showTncModal: boolean,
  showLenderTncModal: boolean,
};

class PreApprovedUserTermsAndCondition extends Component<Props, State> {
  state = {
    tncType: 'loanTnc',
    showTncModal: false,
    showLenderTncModal: false,
  };

  showTncModal = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'aivf_view_ic_t&c',
      this.props.pageKey,
      this.props.metadata,
    );
    this.setState(
      {
        showTncModal: true,
      },
      () => this.tncDialog.MDComponent.show(),
    );
  };

  hideTncModal = () => {
    tracker.trackUserInteraction(
      UserActionType.DISMISS,
      'aivf_close_ic_t&c_modal',
      this.props.pageKey,
      this.props.metadata,
    );
    this.tncDialog.MDComponent.close();
    this.setState({
      showTncModal: false,
    });
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
    const { lenderId } = lenderDetails || {};

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
              <p id='tncText'>
                <span class='text60'>I agree to the&nbsp;</span>
                {lenderId === 501 ? (
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
                <span>&nbsp;</span>
                <span className='text60'>and of&nbsp;</span>
                <span
                  className='linkColor bold-text'
                  id='instacredTnCHref'
                  onClick={this.showTncModal}>
                  InstaCred
                </span>
              </p>
            </label>
          </FormField>
        </div>
        {this.state.showTncModal && (
          <Dialog
            ref={(tncDialog) => {
              this.tncDialog = tncDialog;
            }}
            onCancel={this.hideTncModal}
            className='tnc-modal'>
            <TermsAndConditionsContent
              lenderId={lenderId}
              onCloseCallback={this.hideTncModal}
            />
          </Dialog>
        )}
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

export default PreApprovedUserTermsAndCondition;
