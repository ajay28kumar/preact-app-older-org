// @flow
/** @jsx h */
import { h, Component } from 'preact';
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
  benefitModel: boolean,
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
  onPaymentEmi: Function,

  isFlipkartOfferEligible: Boolean,
};

export class PaymentEmiSelection extends Component<Props, State> {
  pageKey = 'pv_tenure_selection_ten';
  metadata = {
    lender_name: this.props.selectedLender.lenderName,
    campaign_id: this.props.matches.utm_campaign,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
  };

  state = {
    benefitModel:
      this.props.selectedLender.creditLineStatus === 'PRE_APPROVED' &&
      this.props.selectedLender.lenderId !== 501 &&
      this.props.selectedLender.lenderId !== 801,
  };

  componentDidMount() {
    const { txnUuid } = this.props || {};
    if (!txnUuid) {
      return redirectToPaymentInit();
    }
    this.doEmiAction(paymentEmiAction.initialize);
    //TODO: temporary disabling benefit modal, will enable/remove it after getting final decision from Kunal/Vishal
    // this.openBenefitModals();
  }

  openBenefitModals = () => {
    const { selectedLender } = this.props;
    const { closedBenefitModel } = selectedLender || {};
    if (this.state.benefitModel && !closedBenefitModel) {
      this.lenderBenefitsDialog.MDComponent.show();
    }
  };

  lenderBenefitsDialogRef = (lenderBenefitsDialog: Object) =>
    (this.lenderBenefitsDialog = lenderBenefitsDialog);
  onCloseBenefitModel = () => {
    this.lenderBenefitsDialog.MDComponent.close();
    this.lenderBenefitsDialog.MDComponent.destroy();
    this.setState({ benefitModel: false });
    this.doEmiAction(paymentEmiAction.closeBenefitModel);
  };

  doEmiAction = (actionType: string, ...rest: any) => {
    this.props.onPaymentEmi(actionType, ...rest);
  };

  render() {
    const { selectedLender, txnUuid, isFlipkartOfferEligible } =
      this.props || {};

    const { emiDetailsList, lenderId, closedBenefitModel, emiNotes } =
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
        <div className='transaction-header font20 bold-text'>Select EMI</div>
        <div className={`${style.subHeader} bold-text font14 text-center`}>
          <span className='text60'>
            Choose the EMI tenure that is best for you
          </span>
          <HelpIcon
            transactionHelpTitle='EMI Plans'
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
        <ExitLayer pageKey={this.pageKey} exitPath={''} />
        <EmiList
          pageKey={this.pageKey}
          metadata={this.metadata}
          emiDetailsList={emiDetailsList}
          doEmiAction={this.doEmiAction}
          selectedLender={selectedLender}
        />
        {this.state.benefitModel && !closedBenefitModel && (
          <Dialog
            ref={this.lenderBenefitsDialogRef}
            onCancel={() => this.onCloseBenefitModel()}
            className='lenderBenefitsPopup'>
            <BenefitsModal
              lenderId={lenderId}
              closeFunc={this.onCloseBenefitModel}
            />
            <Dialog.Footer>
              <Dialog.FooterButton accept={true}>Accept</Dialog.FooterButton>
            </Dialog.Footer>
          </Dialog>
        )}
      </div>
    );
  }
}
