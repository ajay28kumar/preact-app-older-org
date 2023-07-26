export default class BeEndpoints {
  //general
  static BASE_BE_URL = process.env.PREACT_APP_BE_ENDPOINT_BASE_URL;
  static INITIATE_LOGIN = 'auth/initiate-login/';
  static COMPLETE_LOGIN = 'auth/verify-login';
  static LOGOUT = 'auth/logout';

  //activation endpoints
  static CAMPAIGN = 'app/campaign/get/';
  static GET_BIC = 'BIC';
  static GET_OFFERS = 'OFFERS';
  static MERCHANTS_LIST = 'app/campaign/merchants';
  static BRANDS_LIST = 'app/campaign/brands';
  static CATEGORY_LIST = 'app/campaign/categories';
  static INITIATE_REGISTRATION = 'app/registration/initiate';
  static INITIATE_TRANSACTION = 'app/transaction/initiate';
  static CONFIRM_REGISTRATION = 'app/registration/confirm';
  static INIT_CREDIT_LINE = 'app/credit-line/initiate-credit-line';
  static VERIFY_CREDIT_LINE = 'app/credit-line/verify-aivf';
  static SEND_OTP_RESET_PIN = 'auth/initiate-user-verification';

  //dashboard endpoints
  static TXN_HISTORY = 'txn/history/all';
  static VOUCHER_DETAIL = 'txn/getVoucherDetails';

  //transaction endpoints
  static TRANSACTION_EMI_CALCULATOR = 'app/transaction/emi-calculator';
  static DETECT_USER = 'v2/smartUserDetect';
  static GET_SUD = 'api/sud/v1';
  static CONFIRM_TRANSACTION = 'app/transaction/confirm';

  static RESEND_TRANSACTION_OTP = 'app/transaction/resend-otp';
  static INITIATE_SECOND_FACTOR = 'app/transaction/initiate-second-factor/';
  static VERIFY_SECOND_FACTOR = 'app/transaction/verify-second-factor/';
  static TRANSACTION_DETAILS = 'app/transaction/details';
  static CANCEL_TRANSACTION = 'app/transaction/cancel';
  static TRACKING_TRANSACTION = 'app/transaction/track-stage';

  //ab testing endpoints
  static GET_AB_TEST_VARIANT = 'app/experiments/user/variant';

  //e-mandate
  static E_MANDATE_REDIRECT_REQUEST = 'app/emandate/get-redirection-params/';

  //ntb-endpoints
  static SEND_OTP_NTB = 'app/ntb-user-acquisition/send-otp';
  static VERIFY_OTP_NTB = 'app/ntb-user-acquisition/verify-otp';
  static ELIGIBILITY_LIST = 'app/ntb-user-acquisition/eligibility';

  //widgets
  static POST_CHECK_USER_ELIGIBLE_EMI =
    '/app/widget/check-user-eligibility?v=1';
  static GET_EMI_INFO = '/app/widget/get-emi-info';
  static GET_HOW_TO_BUY_WIDGET = '/app/widget/how-to-buy';
  static WIDGET_SEND_APP_SMS = '/app/widget/download-app-sms';
}
