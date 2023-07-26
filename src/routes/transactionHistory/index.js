import { Component } from 'preact';
import { route } from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import { currencyFormat } from '../../components/directives/currencyFormat';
import Utils, { getLocalstorage } from '../../utils';
import {
  getDataForTransactionHistory,
  getVoucherDetail,
} from '../../services/bl/TransactionHistoryBL';
import GenericLoader from '../../components/loader/GenericLoader';
import { logout } from '../../services/bl/loginBL';
import { ErrorMessage } from '../../utils/errorMessage';
import withBaseComponent from '../../HOC/withBaseComponent';
import 'preact-material-components/Dialog/style.css';
import style from './TransactionHistoryStyle.css';
import {
  buyWithInstacredLandingRoute,
  loginRoute,
} from '../../alias/homeRoutes';
import RequestButton from '../../components/requestButton';
import bicAction from '../../actions/bicAction';
import actionType from '../../actions/bicAction/actionType';
import { connect } from 'react-redux';
import { ImpressionElementName, tracker, UserActionType } from '../../tracking';

class TransactionHistory extends Component {
  pageKey = 'Transaction History';
  currentTxnIndex;
  state = {
    currentUrl: this.props.path,
    showGenericStyling: false,
    showTransactionDetailPanel: false,
    txnDataUI: null,
    txnData: null,
    showFullLoader: false,
    message: 'No purchases yet!',
  };

  voucherTermsDialogRef = (voucherTermsDialog) =>
    (this.voucherTermsDialog = voucherTermsDialog);

  toggleVoucherListContainer = (txnRecordIndex) => {
    if (txnRecordIndex != null) {
      this.state.txnData[txnRecordIndex].showDetailView = !this.state.txnData[
        txnRecordIndex
      ].showDetailView;
      this.paintTxnHistoryUi(this.state.txnData);
    }
  };

  openVoucherTermsDialog = (txnIndex) => {
    this.currentTxnIndex = txnIndex;
    if (this.state.txnData[txnIndex].voucherStatus === 'UTILIZED') {
      this.getVoucherDetail();
    } else if (
      this.state.txnData[txnIndex].voucherStatus === 'SETTLED' &&
      !this.state.txnData[txnIndex].showDetailView
    ) {
      tracker.trackImpression(
        ImpressionElementName.MODAL,
        'Voucher Tnc Modal Displayed',
        this.pageKey,
      );
      this.voucherTermsDialog.MDComponent.show();
    } else if (
      this.state.txnData[txnIndex].voucherStatus === 'SETTLED' &&
      this.state.txnData[txnIndex].showDetailView
    ) {
      this.toggleVoucherListContainer(txnIndex);
    }
  };

  closeVoucherTermsDialog = () => {
    this.voucherTermsDialog.MDComponent.close();
  };

  toggleLoader = () => {
    this.setState({
      showFullLoader: !this.state.showFullLoader,
    });
  };

  redirectToMerchant = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Shop on Amazon',
      this.pageKey,
    );
    window.open('https://amzn.to/2GGbVPS', '_blank');
  };

  getAllTxnData = () => {
    let thisObject = this;
    this.toggleLoader();
    getDataForTransactionHistory().subscribe(
      (response) => {
        if (response.length > 0) {
          thisObject.paintTxnHistoryUi(response);
        }
        this.toggleLoader();
      },
      (error) => {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          logout().subscribe();
          return route(loginRoute.path);
        }
        this.setState(
          { message: ErrorMessage.GENERIC_ERROR_MESSAGE },
          this.toggleLoader(),
        );
      },
    );
  };

  paintTxnHistoryUi = (txnResponseData) => {
    let txnDataRow = [];
    let thisObject = this;
    this.setState({
      txnData: txnResponseData,
    });

    txnResponseData.map(function(txnData, txnIndex) {
      txnDataRow.push(
        <div class={`${style.card}`} align='center'>
          <table class={`${style.transactionRecordRow}`}>
            <tr
              onClick={() => thisObject.openVoucherTermsDialog(txnIndex)}
              style='cursor: pointer'>
              <td
                className={`${style.transactionMerchantColumn} ${
                  style.borderRightDotted
                }`}>
                <div class={`${style.merchantLogoTable}`}>
                  <div class={`${style.merchantLogoContainer}`}>
                    <img
                      src={txnData.merchantLogo}
                      alt={txnData.merchantName}
                    />
                  </div>
                </div>
              </td>

              <td
                class={`${style.voucherCountContainer} ${
                  style.borderRightDottedDesktopOnly
                }`}
                align='center'>
                {txnData.voucherAllocationId &&
                  (txnData.voucherStatus === 'SETTLED' ||
                    txnData.voucherStatus === 'UTILIZED') && (
                    <span>
                      <span class={`${style.voucherCounterLabel}`}>
                        View Voucher
                      </span>
                    </span>
                  )}
                {txnData.voucherStatus &&
                  (txnData.voucherStatus === 'PENDING' ||
                    txnData.voucherStatus === 'INITIATED') && (
                    <span>
                      <span
                        class={`${style.voucherCounterLabel} ${
                          style.voucherPending
                        }`}>
                        {txnData.voucherStatusDisplay}
                      </span>
                    </span>
                  )}
              </td>

              <td class={`${style.transactionAmount} ${style.rightAlign}`}>
                <div class={`${style.amountContainer}`}>
                  <span class={`${style.amountValue}`}>
                    &#8377; {currencyFormat(txnData.txnAmount)}
                  </span>
                  {(txnData.status === 'PENDING' ||
                    txnData.status === 'PENDING_REFUND') && (
                    <div class={`${style.transactionStatus}`}>
                      {txnData.displayStatus}
                    </div>
                  )}
                  {(txnData.status === 'REFUNDED' ||
                    txnData.status === 'PARTIALLY_REFUNDED') && (
                    <div
                      class={`${style.transactionStatus} ${style.refundedTxn}`}>
                      {txnData.displayStatus}
                    </div>
                  )}
                </div>
              </td>

              <td>
                {txnData.txnClass == 'VOUCHER' && (
                  <img
                    className='imgExpand'
                    src='https://iccdn.in/web-assets/expand-more.svg'
                  />
                )}
              </td>
            </tr>
          </table>
          {txnData.voucherDetails && (
            <div
              id={'voucherDetailContainer' + txnIndex}
              className={txnData.showDetailView ? 'show' : 'hidden'}>
              {txnData.voucherDetails.map(function(vouchers, index) {
                return (
                  <div>
                    <hr class={`${style.horizontalLine}`} />
                    <div class={`${style.detailTransactionPanel}`}>
                      {(vouchers.voucherStatus === 'SETTLED' ||
                        vouchers.voucherStatus === 'UTILIZED') && (
                        <div style='width:  100%'>
                          <div
                            class={`${style.voucherCode} ${
                              style.borderRightDottedDesktopOnly
                            } ${style.voucherCodeContainer}`}>
                            CODE:
                            <span id={txnIndex + '-' + index + '-voucher-code'}>
                              {vouchers.voucherCode}
                            </span>
                            <span
                              class={`${style.copyVoucherCodeBadge}`}
                              onClick={() =>
                                thisObject.copyVoucherCode(
                                  txnIndex + '-' + index + '-voucher-code',
                                )
                              }>
                              COPY
                            </span>
                          </div>
                          {vouchers.voucherPin && (
                            <div
                              class={`${style.voucherPin} ${
                                style.borderRightDottedDesktopOnly
                              } ${style.pinContainer}`}>
                              PIN: {vouchers.voucherPin}
                            </div>
                          )}
                          <div
                            class={`${style.expiry} ${
                              style.voucherCodeContainer
                            } ${style.expiryContainer}`}>
                            <span>Exp: </span>{' '}
                            <span class={`${style.expiryValue}`}>
                              {vouchers.voucherExipryDate}
                            </span>
                          </div>
                          <div class={`${style.expiryAmount}`} align='right'>
                            <div
                              class={`${style.rightAlign}`}
                              style={'padding-right:16px'}>
                              {' '}
                              &#8377; {currencyFormat(
                                vouchers.voucherAmount,
                              )}{' '}
                            </div>
                          </div>
                        </div>
                      )}
                      {vouchers.voucherStatus === 'PENDING' && (
                        <table class={`${style.voucherPendingTable}`}>
                          <tr>
                            <td>
                              <span>STATUS: </span> <span>VOUCHER PENDING</span>
                            </td>
                            <td>
                              <div
                                class={`${style.voucherPendingAmount} ${
                                  style.rightAlign
                                }`}
                                style={'padding-right:16px'}>
                                {' '}
                                &#8377; {currencyFormat(
                                  vouchers.voucherAmount,
                                )}{' '}
                              </div>
                            </td>
                          </tr>
                        </table>
                      )}
                      <div class={`${style.disclaimerContainer}`}>
                        Note: Please do not share your voucher code with anyone
                      </div>
                    </div>
                  </div>
                );
              })}
              {txnData.merchantName.toUpperCase() === 'AMAZON' && (
                <div>
                  <hr class={`${style.horizontalLine}`} />
                  <button
                    type='button'
                    className='fpPrimaryButton'
                    onclick={() => thisObject.redirectToMerchant()}
                    style='width: 100%;max-width: 320px; margin: 0 auto 10px 0;'>
                    Shop on Amazon
                  </button>
                </div>
              )}
            </div>
          )}

          <div class={`${style.transactionDetailContainer}`}>
            <div
              className={`${style.listDivider} ${
                style.transactionDetailColumn
              }`}>
              <div className={`${style.detailHeader}`}>INTEREST RATE</div>
              <div class='text-center'>
                {txnData.emiInterestRate > 0 && (
                  <div class={`${style.detailsValue}`}>
                    {txnData.emiInterestRate}%
                  </div>
                )}
                {txnData.emiInterestRate === 0 && (
                  <div class={`${style.detailsValue} ${style.noCost}`} style>
                    No Cost
                  </div>
                )}
              </div>
            </div>

            <div
              className={`${style.listDivider} ${
                style.transactionDetailColumn
              }`}>
              <div
                className={`${style.detailHeader}`}
                id={'tenureContainer-' + txnIndex}>
                {txnData.lenderType && txnData.lenderType !== 'PAY_LATER'
                  ? 'EMI '
                  : ''}
                Tenure
              </div>
              <div class='text-center'>
                <div class={`${style.detailsValue}`}>
                  {txnData.emiTenure} {txnData.tenureType}
                </div>
              </div>
            </div>

            <div
              className={`${style.transactionDetailColumn} ${
                style.monthlyInterestColumn
              }`}>
              <div
                className={`${style.detailHeader}`}
                id={'interestRateContainer-' + txnIndex}>
                MONTHLY{' '}
                {txnData.lenderType && txnData.lenderType === 'PAY_LATER'
                  ? 'INTEREST'
                  : 'EMI'}
              </div>
              <div class='text-center'>
                <div class={`${style.detailsValue}`}>
                  &#8377; {currencyFormat(txnData.emiAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    });

    this.setState({
      txnDataUI: txnDataRow,
    });
  };

  closeTncAndShowVoucherDetail = () => {
    this.voucherTermsDialog.MDComponent.close();
    this.getVoucherDetail();
  };

  getVoucherDetail = () => {
    const isVoucherTxn = !!(
      this.state.txnData &&
      this.state.txnData[this.currentTxnIndex].voucherAllocationId &&
      (this.state.txnData[this.currentTxnIndex].voucherStatus === 'SETTLED' ||
        this.state.txnData[this.currentTxnIndex].voucherStatus === 'UTILIZED')
    );
    if (!isVoucherTxn) {
      return;
    }

    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'View Vouchers',
      this.pageKey,
      { 'Transaction Id': this.state.txnData[this.currentTxnIndex].txId },
    );

    let thisObject = this;
    getVoucherDetail(this.state.txnData[this.currentTxnIndex].txId).subscribe(
      (response) => {
        if (response.length > 0) {
          this.state.txnData[this.currentTxnIndex].voucherDetails = response;
          this.state.txnData[this.currentTxnIndex].voucherStatus = 'UTILIZED';
          thisObject.toggleVoucherListContainer(thisObject.currentTxnIndex);
        }
      },
      (error) => {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          logout().subscribe();
          return route(loginRoute.path);
        }
        this.setState(
          { message: ErrorMessage.GENERIC_ERROR_MESSAGE },
          this.toggleLoader(),
        );
      },
    );
  };

  copyVoucherCode = (elementId) => {
    new Utils().copyToClipboard(elementId);
  };

  navigateToBIC = () => {
    const utmCampaign = getLocalstorage('utmCampaign');
    return route(
      buyWithInstacredLandingRoute.path + utmCampaign
        ? `?utm_campaign=${utmCampaign}`
        : '',
    );
  };

  componentDidMount = () => {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.bicAction(actionType.initializeTransactionHistory, {
      campaignId,
    });
    this.getAllTxnData();
  };

  render() {
    return (
      <div>
        <input type='text' id='copyContent' />
        <div
          className='toast-message-outer-wrapper'
          id='voucher-toaster'
          style='display: none;'>
          <div className='toast-message-container'>
            Voucher Code Copied to Clipboard
          </div>
        </div>
        <div className={this.state.showFullLoader ? 'show' : 'hidden'}>
          <GenericLoader
            loadingMsg={'… Please wait getting your Transaction List'}
          />
        </div>
        {!this.state.showFullLoader && (
          <div class={`${style.transactionHistoryWrapper}`}>
            <div className={this.state.txnDataUI ? 'show' : 'hidden'}>
              <div class={`${style.heading}`}>Transaction History</div>
              <div>{this.state.txnDataUI}</div>
            </div>
            <div className={!this.state.txnDataUI ? 'show' : 'hidden'}>
              <div class={`${style.emptyDataContainer}`}>
                <div class={`${style.emptyDataHeader}`}>
                  {this.state.message}
                </div>
                <div class={`${style.emptyDataSubtitle}`}>
                  Start shopping with InstaCred cardless EMI
                </div>
                <RequestButton
                  buttonOnClick={this.navigateToBIC}
                  buttonId='transaction-history'
                  buttonText='Buy with InstaCred'
                  requestStatus={false}
                  pageKey={this.pageKey}
                  elementName='Buy With InstaCred Btn'
                />
                <div />
              </div>
            </div>
          </div>
        )}
        <Dialog ref={this.voucherTermsDialogRef}>
          <Dialog.Header>
            Terms & Conditions
            <span
              class={`${style.closeDailog}`}
              onClick={() => this.closeVoucherTermsDialog()}>
              &times;
            </span>
          </Dialog.Header>
          <Dialog.Body>
            By clicking on <strong>'View Code'</strong>, I agree that I am using
            the voucher code with knowing it cannot be cancelled or refunded
          </Dialog.Body>
          <Dialog.Footer>
            <button
              type='button'
              className='fpPrimaryButton'
              onclick={() => this.closeTncAndShowVoucherDetail()}
              style='width: 100%;'>
              View Code
            </button>
            <Dialog.FooterButton accept={true} style='display:none;' />
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { bicAction },
)(withBaseComponent(TransactionHistory));
