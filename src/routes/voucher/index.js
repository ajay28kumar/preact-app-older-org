import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import { currencyFormat } from '../../components/directives/currencyFormat';
import Utils, { setSessionStorage } from '../../utils';
import { getEmiCalculatedData } from '../../services/bl/emiCalculatorBL';
import TopMessageBanner from '../../components/topMessageBanner';
import withBaseComponent from '../../HOC/withBaseComponent';
import VoucherTnc from '../../components/voucherTnc';
import { getStorageLenderId } from '../../utils/lenderTheme';
import { lenderConfig } from '../../utils/lenderConfig';
import GenericLoader from '../../components/loader/GenericLoader';
import RequestButton from '../../components/requestButton';
import { pageNotFoundRoute } from '../../alias/commonRoutes';
import { isMobileFormatValid } from '../../utils/mobileNumberValidation';
import bicAction from '../../actions/bicAction';
import voucherAction from '../../actions/voucherAction';
import voucherActionType from '../../actions/voucherAction/actionType';
import actionType from '../../actions/bicAction/actionType';
import { GOOGLE_AD_TOKEN, tracker, UserActionType } from '../../tracking';
import 'preact-material-components/Dialog/style.css';
import style from './style.css';

class VoucherPage extends Component {
  pageKey = 'Voucher Page';

  utils = new Utils();
  minimumTransactionAmount = 10000;
  maximumTransactionAmount = 20000;
  AMOUNT_MULTIPLE = 500;
  isUserPreApproved = false;
  applicationId = '';
  lenderDetails = {
    lenderLogo: 'https://iccdn.in/lenders/kotak-consumer-v5.png',
  };
  trackingElement = {};
  state = {
    amount: null,
    bannerType: 'error',
    bannerMsg: null,
    mobileNo: '',
    customerName: '',
    ctaButtonName: 'SEND OTP',
    emiRecords: null,
    currentUrl: this.props.path,
    showEMISelectedText: 'SELECT EMI',
    showLoader: false,
    cachedUser: false,
    merchantConfig: {},
    amountError: null,
    incorrectAmount: false,
    incorrectMobileMsg: null,
    emiError: false,
    emiNotSelected: false,
    emiSelectedData: null,
    lenderId: null,
    isFlexmoneyDiscount: false,
    isSubventionEnabled: false,
    hasPreEmi: false,
    krtParameter: '',
    lenderConfig: null,
    voucherNextStep: 2,
    showFullLoader: false,
    showAmountSelectionPopup: false,
    amountSuggestionUI: null,
    radioSelected: null,
    selectedAmountSuggestionIndex: 0,
    showAmountError: false,
  };

  emiDialogRef = (emiDialog) => (this.emiDialog = emiDialog);
  voucherTncDialogRef = (voucherTncDialog) =>
    (this.voucherTncDialog = voucherTncDialog);

  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.bicAction(actionType.initializeVoucher, { campaignId });
    this.paintAmountSuggestionUI();
    if (!VoucherMerchantConfig[this.props.merchantName]) {
      return route(pageNotFoundRoute.path);
    }
    const merchantConfig = VoucherMerchantConfig[this.props.merchantName];
    this.setState({ merchantConfig });
    this.props.voucherAction(voucherActionType.checkUserEligible, {
      mobile: null,
      ignoreCookie: false,
      gatewayMerchantId: merchantConfig.gatewayMerchantId,
    });
  }
  componentDidUpdate(previousProps) {
    const { apiState: prevApiState } = previousProps;
    if (prevApiState !== this.props.apiState) {
      const { isEligible, mobile } = this.props;
      const lenderId = getStorageLenderId()
        ? parseInt(getStorageLenderId())
        : 0;
      this.isUserPreApproved = isEligible;
      this.setState(
        {
          mobileNo: mobile,
          cachedUser: isEligible,
          lenderId,
          lenderConfig: lenderConfig[lenderId],
          incorrectMobileMsg: !isEligible
            ? 'You are not eligible to use Instacred Cardless EMI at the moment.'
            : '',
        },
        () =>
          isEligible
            ? this.getEmiData()
            : this.toggleErrorAnimation('mobileNumberContainer'),
      );
    }
  }

  updateMobile = (event) => {
    const mobileInput = this.utils.applyNumericFilter(event);
    this.setState({
      mobileNo: mobileInput,
      amount: '',
      radioSelected: null,
      showEMISelectedText: 'SELECT EMI',
    });
    if (mobileInput && mobileInput.length === 10) {
      tracker.trackUserInteraction(
        UserActionType.INPUT_ENTERED,
        'User Mobile',
        this.pageKey,
        '',
      );
    }
  };

  sud = () => {
    if (this.validateAndHandleIncorrectMobile(this.state.mobileNo)) {
      this.props.voucherAction(voucherActionType.checkUserEligible, {
        mobile: this.state.mobileNo,
        ignoreCookie: !this.state.cachedUser,
        gatewayMerchantId: this.state.merchantConfig.gatewayMerchantId,
      });
    }
  };

  updateAmount = (event) => {
    const amount = this.utils.applyNumericFilter(event);
    this.setState({
      amount,
    });
    if (amount && amount.length === 1) {
      tracker.trackUserInteraction(
        UserActionType.INPUT_ENTERED,
        'Purchase Amount',
        this.pageKey,
        '',
      );
    }
  };

  validateAmountAndFetchEMI = () => {
    if (this.validateAndHandleVoucherAmount(this.state.amount)) {
      this.setState({ showEMISelectedText: 'SELECT EMI' });
      this.setEmiSelectedData(null);
      this.getEmiData();
    }
  };

  getEmiData = () => {
    if (this.state.lenderId && this.state.amount) {
      getEmiCalculatedData(
        this.state.amount,
        this.state.merchantConfig.merchantId,
        this.state.mobileNo,
      ).subscribe(
        (response) => {
          if (response.code != 0) {
            this.setState({
              emiError: true,
            });
            this.showErrorResponseBanner(response.data.message);
            return;
          }
          this.renderEmiDataResponse(response.data);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  renderEmiDataResponse = (response) => {
    this.applicationId = response.applicationId;
    if (
      response.discountType !== undefined &&
      response.discountType === 'FLEXMONEY_FLAT_DISCOUNT'
    ) {
      let discountAmount = response.amount - response.loanAmount;
      this.setState({
        isFlexmoneyDiscount: true,
        loanAmount: response.loanAmount,
        discountAmount: discountAmount,
      });
    }

    this.setState({ hasPreEmi: response.hasPreEmi });

    this.setState({
      emiRecords: response.emiInfo,
      emiError: false,
    });

    if (response.emiInfo && response.emiInfo.length > 0) {
      for (let i = 0; i < response.emiInfo.length; i++) {
        if (response.emiInfo[i].isSubventionEnabled) {
          this.setState({ isSubventionEnabled: true });
          break;
        }
      }
    }

    let emiItems = response.emiInfo.map(
      function(emiRecordObj, index) {
        return (
          <div
            class={`${style.emiRowContainer}`}
            id={`voucher-emi-panel-${index}`}
            onClick={() => this.selectEmiRecord(index, response.emiInfo)}>
            <div class={`${style.emiTenureContainer} ${style.emiColumn}`}>
              {emiRecordObj.loanDuration}
              <div class={`${style.emiTenureMonthContainer}`}>months</div>
            </div>
            <div
              class={`${style.monthlyInstallmentContainer} ${style.emiColumn}`}>
              <div class={`${style.emiLabel}`}>EMI</div>
              <div>
                <div class={`${style.monthlyInstallmentAmount}`}>
                  <span class={`${style.rupeeIcon}`}>&#8377;</span>{' '}
                  {currencyFormat(emiRecordObj.effectiveMonthlyInstallment)}
                </div>
                <div class={`${style.perMonthLabel}`}>per month</div>
              </div>
            </div>
            <div class={`${style.totalEMIContainer} ${style.emiColumn}`}>
              <div class={`${style.totalCost}`}>Total cost:</div>
              <div class={`${style.totalEmiAmountContainer}`}>
                <span class={`${style.rupeeIcon}`}> &#8377;</span>{' '}
                {currencyFormat(
                  emiRecordObj.loanDuration *
                    emiRecordObj.effectiveMonthlyInstallment,
                )}
                <div class={`${style.forwardIcon}`}>&#8250;</div>
              </div>
              {emiRecordObj.isSubventionEnabled && (
                <div
                  class={`${style.interestRateContainer} ${style.noCostLabel}`}>
                  NO COST
                </div>
              )}
              {!emiRecordObj.isSubventionEnabled && (
                <div class={`${style.interestRateContainer}`}>
                  @{emiRecordObj.effectiveInterestRate}% per annum
                </div>
              )}
            </div>
          </div>
        );
      }.bind(this),
    );
    this.setState({
      emiItems: emiItems,
    });
  };

  selectEmiRecord = (index, emiRecords) => {
    const tenure = emiRecords[index].loanDuration;
    const merchant = this.props.matches.merchantName;
    // window.gtag('event', 'select_emi', {
    //   send_to: GOOGLE_AD_TOKEN,
    //   value: tenure,
    //   items: [
    //     {
    //       id: 'T01',
    //       location_id: merchant,
    //       google_business_vertical: 'Txns',
    //     },
    //   ],
    // });
    this.setState(
      {
        radioSelected: index,
        showEMISelectedText:
          this.state.emiRecords[index].loanDuration +
          ' months | \u20B9 ' +
          currencyFormat(
            this.state.emiRecords[index].effectiveMonthlyInstallment,
          ) +
          '/mo',
      },
      () => {
        this.setEmiSelectedData(
          this.state.emiRecords[this.state.radioSelected],
        );
        this.validateAndHandleEmiSelection(
          this.state.emiRecords[this.state.radioSelected],
        );
      },
    );

    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Select EMI Tenure',
      this.pageKey,
      { tenure: this.state.emiRecords[index].loanDuration },
    );
    this.emiDialog.MDComponent.close();
  };

  setEmiSelectedData = (emiRecord) => {
    if (emiRecord) {
      setSessionStorage('emiSelectedData', JSON.stringify(emiRecord));
      this.setState({ emiSelectedData: emiRecord });
    } else {
      setSessionStorage('emiSelectedData', null);
      this.setState({ emiSelectedData: null });
    }
  };

  openEmi = () => {
    if (this.state.emiError) {
      return;
    }
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Select EMI',
      this.pageKey,
    );
    if (this.validateAndHandleVoucherAmount(this.state.amount)) {
      this.emiDialog.MDComponent.show();
      tracker.trackImpression('EMI Modal', this.pageKey);
    } else {
      this.setState({
        incorrectAmount: true,
      });
    }
  };

  dismissDialog = (elementName) => {
    this.emiDialog.MDComponent.close();
    tracker.trackUserInteraction(
      UserActionType.DISMISS,
      elementName,
      this.pageKey,
    );
  };

  notYouClick = () => {
    this.setState({
      cachedUser: false,
      mobileNo: '',
      customerName: '',
      amount: null,
    });

    this.setState({ showEMISelectedText: 'SELECT EMI' });
    this.setEmiSelectedData(null);

    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Not You',
      this.pageKey,
      '',
    );
  };

  showVoucherTncDialog = () => {
    let validMobile = this.validateUserEligibility(this.state.mobileNo);
    let validAmount = this.validateAndHandleVoucherAmount(this.state.amount);
    let validEmi = this.validateAndHandleEmiSelection(
      this.state.emiSelectedData,
    );

    if (validMobile && validAmount && validEmi) {
      this.voucherTncDialog.MDComponent.show();
      tracker.trackImpression('Voucher TnC', this.pageKey);
    }
  };

  redirectToInlineFlow = () => {
    let preEmi = '~preEmi:';
    if (this.state.hasPreEmi) {
      preEmi = preEmi + this.state.emiSelectedData.effectivePreEmi;
    } else {
      preEmi = preEmi + '0';
    }

    let krt =
      'lenderId:' +
      this.state.lenderId +
      '~purchaseAmount:' +
      this.state.amount +
      '~emiTenure:' +
      this.state.emiSelectedData.loanDuration +
      '~effectiveInterestRate:' +
      this.state.emiSelectedData.effectiveInterestRate +
      preEmi +
      '~isSubventionEnabled:' +
      this.state.emiSelectedData.isSubventionEnabled +
      '~merchantId:' +
      this.state.merchantConfig.merchantId;

    this.setState({ krtParameter: krt }, () => {
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Voucher TnC Accepted',
        this.pageKey,
        '',
      );
      document.getElementById('voucherForm').submit();
    });
  };

  validateAndHandleIncorrectMobile = (mobileNo) => {
    if (this.state.cachedUser) {
      return true;
    }

    if (
      mobileNo.length !== 10 ||
      isNaN(Number(mobileNo)) ||
      !isMobileFormatValid(mobileNo)
    ) {
      this.setState({
        incorrectMobileMsg: 'Please enter a valid mobile number',
      });
      this.toggleErrorAnimation('mobileNumberContainer');
      return false;
    } else {
      this.setState({
        incorrectMobileMsg: null,
      });
      return true;
    }
  };

  validateUserEligibility = (mobileNo) => {
    if (!this.isUserPreApproved) {
      return false;
    }

    return this.validateAndHandleIncorrectMobile(mobileNo);
  };

  validateAndHandleVoucherAmount = (amount) => {
    var minTxnAmt = this.state.lenderConfig
      ? this.state.lenderConfig.minimumLoanAmount
      : this.minimumTransactionAmount;
    if (!amount || amount < minTxnAmt) {
      this.setState({
        incorrectAmount: true,
        amountError:
          'Please select purchase amount. Minimum value \u20B9 ' +
          currencyFormat(minTxnAmt),
      });
      tracker.trackApplicationError('Less Than Min Amount', this.pageKey, '');
      this.toggleErrorAnimation('voucherAmountContainer');
      return false;
    }

    if (amount > this.maximumTransactionAmount) {
      this.setState({
        incorrectAmount: true,
        amountError:
          'Enter an amount less than \u20B9 ' +
          currencyFormat(this.maximumTransactionAmount),
      });
      this.toggleErrorAnimation('voucherAmountContainer');
      return false;
    }

    this.setState({
      incorrectAmount: false,
      amountError: null,
    });

    return true;
  };

  toggleErrorAnimation = (elementId) => {
    if (!this.state.mobileNo) {
      return false;
    }
    if (document.querySelector('#' + elementId + '.invalidInput') != null) {
      document.querySelector('#' + elementId).classList.remove('invalidInput');
    }
    setTimeout(function() {
      document.querySelector('#' + elementId).classList.add('invalidInput');
    }, 0);
  };

  validateAndHandleEmiSelection = (emi) => {
    if (emi === null) {
      this.setState({
        emiNotSelected: true,
      });
      return false;
    } else {
      this.setState({
        emiNotSelected: false,
      });
      return true;
    }
  };

  showAmountSelectionPrompt = () => {
    if (this.state.incorrectMobileMsg) {
      return;
    }
    this.setState({
      showAmountSelectionPopup: true,
    });
    tracker.trackImpression('Voucher Purchase Amount', this.pageKey);
  };

  hideAmountSelectionPrompt = (elementName) => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      elementName,
      this.pageKey,
      '',
    );
    this.setState({
      showAmountError: false,
    });
    if (
      (this.state.amount &&
        this.state.amount > 0 &&
        !this.isMultipleof500(this.state.amount)) ||
      this.state.amount > this.maximumTransactionAmount
    ) {
      this.setState({
        showAmountError: true,
      });
      tracker.trackApplicationError('Not Multiples Of 500', this.pageKey, '');
      this.createNewSuggestion(this.state.amount);
      return false;
    }

    this.validateAmountAndFetchEMI();
    this.setState({
      showAmountSelectionPopup: false,
    });
  };

  createNewSuggestion = (amount) => {
    if (!this.state.isEligible) {
      return this.setState({
        showAmountSelectionPopup: false,
      });
    }
    var voucherAmount = parseInt(amount);
    var divisibleAmount = amount / this.AMOUNT_MULTIPLE;
    if (divisibleAmount > 1) {
      var roundOffAmount = this.AMOUNT_MULTIPLE * Math.round(divisibleAmount);
      voucherAmount = roundOffAmount;
    }

    if (
      voucherAmount > this.AMOUNT_MULTIPLE &&
      voucherAmount < this.maximumTransactionAmount &&
      voucherAmount > this.state.lenderConfig.minimumLoanAmount
    ) {
      var newSuggestionArray = [voucherAmount];
      for (var i = 0; i < 5; i++) {
        voucherAmount = voucherAmount + this.AMOUNT_MULTIPLE;
        if (voucherAmount <= this.maximumTransactionAmount) {
          newSuggestionArray.push(voucherAmount);
        }
      }

      PurchaseAmountArray = newSuggestionArray;
    } else if (
      voucherAmount < this.minimumTransactionAmount ||
      voucherAmount == this.minimumTransactionAmount
    ) {
      PurchaseAmountArray = PurchaseAmountArray;
    } else {
      PurchaseAmountArray = [this.maximumTransactionAmount];
    }
    this.paintAmountSuggestionUI();
  };

  paintAmountSuggestionUI = () => {
    if (PurchaseAmountArray.length > 0) {
      var amountRow = [],
        thisObj = this;
      PurchaseAmountArray.map(function(amount, amountIndex) {
        amountRow.push(
          <span
            className={
              thisObj.state.selectedAmountSuggestionIndex === amountIndex
                ? 'amountActive'
                : ''
            }>
            <span
              class={`${style.amountBadge}`}
              onClick={() =>
                thisObj.inputSuggestedAmount(amount, amountIndex, event)
              }>
              ₹{currencyFormat(amount)}
            </span>
          </span>,
        );
      });
      this.setState({
        amountSuggestionUI: amountRow,
      });
    }
  };

  isMultipleof500 = (amount) => {
    return amount % this.AMOUNT_MULTIPLE == 0;
  };

  inputSuggestedAmount = (amountValue, amountIndex, event) => {
    if (amountValue) {
      this.setState({
        amount: amountValue,
        selectedAmountSuggestionIndex: amountIndex,
      });
      tracker.trackUserInteraction(
        UserActionType.INPUT_ENTERED,
        'Purchase Amount',
        this.pageKey,
        '',
      );
      var activeAmountSuggestionElement = document.getElementsByClassName(
        'amountSuggestionActive',
      );
      if (activeAmountSuggestionElement.length > 0) {
        activeAmountSuggestionElement[0].classList.remove(
          'amountSuggestionActive',
        );
      }
      event.target.classList.add('amountSuggestionActive');
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Voucher Purchase Amount Pill',
        this.pageKey,
        { Amount: amountValue },
      );
    }
  };

  showErrorResponseBanner = (bannerMsg) => {
    this.setState({ bannerMsg });

    setTimeout(() => {
      this.setState({ bannerMsg: null });
    }, 3000);
  };

  render() {
    return (
      <div>
        <TopMessageBanner
          bannerType={this.state.bannerType}
          showBanner={!!this.state.bannerMsg}
          message={this.state.bannerMsg}
        />
        <div className={`${style['lineSeparator']}`} />
        <div
          className={this.state.showAmountSelectionPopup ? 'hidden' : 'show'}>
          <div class={`${style.merchantInforContainer}`}>
            <div class={`${style.merchantLogoContainer}`}>
              <img src={this.state.merchantConfig.logo} alt='' />
            </div>
            <div
              className={`${style.merchantNameContainer} ${
                style.otherMerchantText
              }`}>
              <strong>{this.state.merchantConfig.merchantText}</strong>
              <div>with Instacred EMI</div>
            </div>
          </div>
        </div>
        <div
          className={this.state.showAmountSelectionPopup ? 'hidden' : 'show'}>
          <div class={`${style.voucherFormContainer}`}>
            <div class={`${style.voucherForm}`}>
              <div
                class={`${style.userMobileDisplaycontainer}`}
                style={
                  this.state.cachedUser ? 'display:block' : 'display:none'
                }>
                Hi{' '}
                {this.state.customerName
                  ? this.state.customerName
                  : this.state.mobileNo}
                &nbsp;&nbsp;
                <span class={`${style.linkText}`} onClick={this.notYouClick}>
                  Not you?
                </span>
              </div>
              <div class={`${style.voucherInputContainer}`}>
                <div>
                  <div
                    id='mobileNumberContainer'
                    className={
                      this.state.incorrectMobileMsg ? 'invalidInput' : ''
                    }>
                    <div
                      class={`${style.inputContainer}`}
                      style={
                        this.state.cachedUser ? 'display:none' : 'display:block'
                      }>
                      <img
                        src='https://iccdn.in/img/contact.svg'
                        class={`${style.inputIcon}`}
                      />

                      <input
                        class={`${style.fpFormControl} ${style.voucherInput}`}
                        ref={(input) => {
                          this.mobileNoInput = input;
                        }}
                        type='tel'
                        id='mobileNo'
                        name='mobileNo'
                        placeholder='Registered Mobile Number'
                        style='width:100%;'
                        maxLength='10'
                        minLength='10'
                        onInput={this.updateMobile}
                        onBlur={this.sud}
                        value={this.state.mobileNo}
                      />
                    </div>
                  </div>

                  <div
                    className={
                      this.state.incorrectMobileMsg !== null
                        ? 'inputError show'
                        : 'inputError hidden'
                    }
                    style={'margin-bottom:16px'}>
                    {this.state.incorrectMobileMsg}
                  </div>
                  <div
                    id='voucherAmountContainer'
                    className={
                      this.state.incorrectAmount ? 'invalidInput' : ''
                    }>
                    <div class={`${style.inputContainer}`}>
                      <img
                        src='https://iccdn.in/img/lock-icon.svg'
                        class={`${style.inputIcon}`}
                      />
                      <input
                        class={`${style.fpFormControl} ${style.voucherInput}`}
                        type='tel'
                        id='voucherAmount'
                        name='voucherAmount'
                        placeholder='Voucher Amount'
                        style='width:100%;'
                        onInput={this.updateAmount}
                        onFocus={() => this.showAmountSelectionPrompt()}
                        value={this.state.amount}
                        readOnly
                        onClick={() => this.showAmountSelectionPrompt()}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      this.state.incorrectAmount
                        ? 'inputError show'
                        : 'inputError hidden'
                    }
                    style={'margin-bottom:16px'}>
                    {this.state.amountError}
                  </div>

                  <div>
                    <div class={`${style.inputContainer}`}>
                      <img
                        src='https://iccdn.in/img/select-emi-icon.svg'
                        class={`${style.inputIcon}`}
                      />
                      <button
                        type='button'
                        class={`${style.fpFormControl}`}
                        id='selectEMIButton'
                        onClick={this.openEmi}>
                        {this.state.showEMISelectedText}
                      </button>
                    </div>
                  </div>

                  <div
                    className={
                      this.state.emiNotSelected && this.state.lenderId !== null
                        ? 'inputError show'
                        : 'inputError hidden'
                    }
                    style={'margin-bottom:16px'}>
                    Please select EMI tenure
                  </div>
                </div>
              </div>
              <div class={`${style.purchaseVoucher}`}>
                <div>
                  <RequestButton
                    buttonId='purchaseVoucherButton'
                    loadingMsg=''
                    buttonOnClick={this.showVoucherTncDialog}
                    buttonDisabled={
                      this.state.incorrectAmount ||
                      this.state.incorrectMobileMsg ||
                      (!this.state.mobileNo ||
                        this.state.mobileNo.length < 10) ||
                      (!this.state.amount ||
                        this.state.amount < this.minimumTransactionAmount) ||
                      this.state.emiSelectedData === null
                    }
                    buttonText='REVIEW & CONFIRM'
                    pageKey={this.pageKey}
                    elementName='Purchase Voucher Btn'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={this.state.showFullLoader ? 'show' : 'hidden'}
          id='loader'>
          <GenericLoader loadingMsg='Loading...' />
        </div>
        <form
          id='voucherForm'
          method='POST'
          action='/txn/voucher/redirect'
          style='display:none'>
          <input
            type='text'
            name='gatewayMerchantId'
            value={this.state.merchantConfig.gatewayMerchantId}
          />
          <input type='text' name='mobile' value={this.state.mobileNo} />
          <input type='text' name='applicationId' value={this.applicationId} />
          {this.state.emiSelectedData != null && (
            <input
              type='text'
              name='amount'
              value={this.state.emiSelectedData.transactionSettlementAmount}
            />
          )}
          <input type='text' name='krt' value={this.state.krtParameter} />
          <input
            type='text'
            name='creditSchemeVariantId'
            value={
              this.state.radioSelected !== null
                ? this.state.emiRecords[this.state.radioSelected]
                    .creditSchemeVariantId
                : 0
            }
          />
        </form>

        <div
          className={this.state.showAmountSelectionPopup ? 'show' : 'hidden'}>
          <div class={`${style.amountPopupContainer}`}>
            <div class={`${style.amountPopupHeader}`}>
              <img
                src='https://iccdn.in/img/close-icon.svg'
                class={`${style.amountPopupClose}`}
                onClick={() => this.hideAmountSelectionPrompt('Close Icon')}
              />
              Voucher Amount
            </div>
            <div class={`${style.amountPopupBody}`}>
              <div class={`${style.inputContainer}`}>
                <div className={this.state.showAmountError ? 'inputError' : ''}>
                  <span class={`${style.inputIcon} ${style.ruppeeIcon}`}>
                    ₹
                  </span>
                  <input
                    class={`${style.fpFormControl} ${style.popupInput} ${
                      style.voucherInput
                    }`}
                    type='tel'
                    id='voucherAmount'
                    name='voucherAmount'
                    placeholder='Voucher Amount'
                    style='width:100%;'
                    onInput={this.updateAmount}
                    value={this.state.amount}
                  />
                </div>
                {this.state.lenderConfig != null && (
                  <div>
                    <div>
                      <span class={`${style.bottomNoteText}`}>
                        Minimum amount is ₹
                        {currencyFormat(
                          this.state.lenderConfig.minimumLoanAmount,
                        )}
                      </span>
                    </div>
                    <div>
                      <span class={`${style.bottomNoteText}`}>
                        Please choose amount in Multiples of{' '}
                        {this.AMOUNT_MULTIPLE}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div class={`${style.amountSuggestionContainer}`}>
                {this.state.showAmountError && (
                  <div class={`${style.multiplesErrrorMsg}`}>
                    Please choose amount in Multiples of {this.AMOUNT_MULTIPLE}
                    <div>Or, choose from one below</div>
                  </div>
                )}
                {!this.state.showAmountError && (
                  <div class={`${style.sugguestionHeader}`}>
                    Or, choose from one below
                  </div>
                )}
                <div class={`${style.suggestionContainer}`}>
                  <div>{this.state.amountSuggestionUI}</div>
                </div>
              </div>
              <div className='text-center'>
                <Button
                  raised
                  ripple
                  onClick={() =>
                    this.hideAmountSelectionPrompt('Confirm Amount Btn')
                  }
                  id='purchaseVoucherButton'
                  class={`${style.amountConfirmButton}`}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog ref={this.emiDialogRef} className='emi-modal'>
          <Dialog.Header>
            <div class={`${style.emiHeader}`}>
              <img
                src='https://iccdn.in/img/close-icon.svg'
                class={`${style.emiModalClose}`}
                onClick={this.dismissDialog.bind('elementName', 'Dismiss Icon')}
              />
              Select EMI
              <div class={`${style.purchaseAmountHolder} ${style.emiAbHeader}`}>
                Purchase Amount{' '}
                <span class={`${style.amount}`}>
                  &#8377; {currencyFormat(this.state.amount)}
                </span>
              </div>
            </div>
          </Dialog.Header>
          <Dialog.Body>
            <div class={`${style.modalBody}`}>{this.state.emiItems}</div>
            <div className={`${style.emiRoundUpText}`}>
              *Loan & EMI amount will be rounded up to the closest rupee.
            </div>
            <div
              className={`${style.emiRoundUpText} ${
                style.subventionNoticeText
              }`}>
              {this.state.isSubventionEnabled && (
                <span className={`${style.highlightSubventionText}`}>
                  * No Cost EMI available on 3 Month Tenure Only.
                </span>
              )}
            </div>
          </Dialog.Body>
        </Dialog>

        <Dialog
          ref={this.voucherTncDialogRef}
          class={`${style.voucherTncModal}`}>
          <Dialog.Body class={`${style.modalBody}`}>
            <VoucherTnc lenderId={this.state.lenderId} />
            <div class={`${style.agreeTermsContainer}`}>
              <Button
                raised
                ripple
                onClick={this.redirectToInlineFlow}
                id='agreeTncButton'
                disabled={this.state.radioSelected < 0}
                accept={true}>
                Agree and Continue
              </Button>
            </div>
          </Dialog.Body>
        </Dialog>
      </div>
    );
  }
}

const VoucherMerchantConfig = Object.freeze({
  flipkart: {
    merchantId: '12',
    gatewayMerchantId: '6519487',
    displayName: 'Flipkart',
    logo: 'https://iccdn.in/merchant-resource/flipkart_logo.png',
    merchantText: 'Buy Flipkart Voucher',
  },

  amazon: {
    merchantId: '11',
    gatewayMerchantId: '4126406',
    displayName: 'Amazon',
    logo: 'https://iccdn.in/img/amazon_logo.png',
    merchantText: 'Buy Amazon gift card',
  },
});

let PurchaseAmountArray = ['10000', '12500', '15000', '18000', '20000'];

const mapStateToProps = ({ userDetails }) => {
  const { smartUserDetails } = userDetails;
  const { isEligible, mobile, userStatus, apiState } = smartUserDetails;
  return {
    isEligible,
    mobile,
    userStatus,
    apiState,
  };
};

export default connect(
  mapStateToProps,
  { bicAction, voucherAction },
)(withBaseComponent(VoucherPage));
