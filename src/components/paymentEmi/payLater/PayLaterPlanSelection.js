// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { redirectToPaymentInit } from '../../../actions/redirectAction';
import paymentEmiAction from '../../../actions/onPaymentEmi/actionType';
import EmiList from '../emiList';
import Dialog from 'preact-material-components/Dialog';
import BenefitsModal from '../benefitsModal';
import ExitLayer from '../../common/exitLayer';
import 'preact-material-components/Dialog/style.css';
import style from './style.css';
import type { ApiState } from '../../../modelType';
import type { LenderDetails } from '../../../modelType/transactionTypes';
import Spinner from '../../spinner/spinner';
import HelpIcon from '../../payment/helpIcon';
import OfferBanner from '../OfferBanner';
type State = {
  /**
   * @property {boolean} react state for benefit-model display
   */
  benefitModal: boolean,
};

type Props = {
  merchantId: string,
  purchaseValue: string,
  matches: Object,
  /**
   * @param {ApiState} to just confirm that transaction-id is available in redux or not
   */
  transactionInfoApiState: ApiState,
  /**
   * @param {LenderDetails} is selected lenders to get emi-details for particular lender
   */
  selectedLender: LenderDetails,
  /**
   * @property {Function} to display snackbar dispatch function
   */
  showSnackBar: Function,
  /**
   * @property {Function} to dispatch payment-emi actions
   */
  onPaymentEmi: Function,
  isFlipkartOfferEligible: Boolean,
};

export class PayLaterPlanSelection extends Component<Props, State> {
  pageKey = 'pv_pay_later_tenure_selection_ten';
  metadata = {
    lender_name: this.props.selectedLender.lenderName,
    campaign_id: this.props.matches.utm_campaign,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
  };

  state = {
    benefitModal:
      this.props.selectedLender.creditLineStatus === 'PRE_APPROVED' &&
      this.props.selectedLender.lenderId !== 502,
  };

  componentDidMount() {
    const { txnUuid } = this.props || {};
    this.doEmiAction(paymentEmiAction.initialize);
    if (!txnUuid) {
      return redirectToPaymentInit();
    }
    this.openBenefitModals();
  }

  openBenefitModals = () => {
    const { selectedLender } = this.props;
    const { closedBenefitModal } = selectedLender || {};
    if (this.state.benefitModal && !closedBenefitModal) {
      this.lenderBenefitsDialog.MDComponent.show();
    }
  };

  lenderBenefitsDialogRef = (lenderBenefitsDialog: Object) =>
    (this.lenderBenefitsDialog = lenderBenefitsDialog);

  onClosebenefitModal = () => {
    this.lenderBenefitsDialog.MDComponent.close();
    this.lenderBenefitsDialog.MDComponent.destroy();
    this.setState({ benefitModal: false });
    this.doEmiAction(paymentEmiAction.closebenefitModal);
  };

  doEmiAction = (actionType: string, ...rest: any) => {
    this.props.onPaymentEmi(actionType, ...rest);
  };

  getDateMonthShort(timestamp: number) {
    if (timestamp) {
      const dateObj = new Date(timestamp);
      const monthNameObject = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return (
        dateObj.getDate() +
        ' ' +
        monthNameObject[dateObj.getMonth()].substr(0, 3)
      );
    } else {
      return console.error('Empty Timestamp');
    }
  }

  render() {
    const { selectedLender, txnUuid, isFlipkartOfferEligible } =
      this.props || {};
    const { emiDetailsList, lenderId, closedBenefitModal, emiNotes, emiDates } =
      selectedLender || {};

    if (!txnUuid) {
      return (
        <div className='loaderContainer'>
          <Spinner />
        </div>
      );
    }
    return (
      <div className={style.emiContainer}>
        {isFlipkartOfferEligible && <OfferBanner />}
        <div className='transaction-header'>
          <div className='text80 font20 bold-text'>Select Payment Scheme </div>
          <div className={style.helpIconContainer}>
            <HelpIcon
              transactionHelpTitle='Pay later plans'
              helpText={() => (
                <p className='font14 text60'>
                  The interest rates are as provided by the lender.
                  <br />
                  InstaCred does not levy any charges or additional fees for
                  availing EMI. All charges and fees, if any, are levied by the
                  lender.
                </p>
              )}
            />
          </div>
        </div>
        <ExitLayer pageKey={this.pageKey} exitPath={''} />
        <EmiList
          pageKey={this.pageKey}
          metadata={this.metadata}
          emiDetailsList={emiDetailsList}
          emiNotes={emiNotes}
          emiDates={emiDates}
          selectedLender={selectedLender}
          doEmiAction={this.doEmiAction}
        />
        {this.state.benefitModal && !closedBenefitModal && (
          <Dialog
            ref={this.lenderBenefitsDialogRef}
            onCancel={() => this.onClosebenefitModal()}
            className='lenderBenefitsPopup'>
            <BenefitsModal
              metadata={this.metadata}
              lenderId={lenderId}
              closeFunc={this.onClosebenefitModal}
            />
          </Dialog>
        )}
      </div>
    );
  }
}
