import store from '../../store';
import apiErrorType from '../apiErrorType';
import { tracker } from '../../tracking';

export const errorTracking = ({ errorName, code, errorData }) => {
  const state = store.getState();
  const { config } = state || {};
  const { pageKey, metadata } = config || {};
  const { errorType = '', message = '', title = '' } = errorData || {};
  const elementName =
    errorLists[errorName] || `Unhandled Error Response : ${code}`;

  const metaData = {
    error_type: errorType,
    error_message: message,
    error_title: title,
    ...metadata,
  };

  tracker.trackApplicationError(
    elementName,
    pageKey || 'Missing pageKey',
    metaData,
  );
};
export const errorCode = {
  widget: {
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4204': apiErrorType.ACTIVATION_MOBILE_NOT_PA, //user-not-eligible
    '4109': apiErrorType.ACTIVATION_USER_BLOCKED,
    '4102': apiErrorType.ACTIVATION_USER_NOT_PA,
    '4302': apiErrorType.ACTIVATION_INVALID_OTP,
    '4301': apiErrorType.ACTIVATION_EXHAUSTED,
    '4105': apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK, //24 HRS BLOCK
    '4303': apiErrorType.ACTIVATION_INVALID_AIVF,
    '4110': apiErrorType.ACTIVATION_BLOCKED_CREDIT_LINE,
    '4010': apiErrorType.ACTIVATION_SESSION_EXPIRED,
    '4001': apiErrorType.ACTIVATION_INVALID_REQUEST_PARAMETER,
    '4000': apiErrorType.ACTIVATION_GENERIC_ERROR,
  },
  payment: {
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4105': apiErrorType.PAYMENT_MULTIPLE_AIVF_BLOCK,
    '4104': apiErrorType.PAYMENT_MULTIPLE_PIN_BLOCK,
    '4303': apiErrorType.PAYMENT_INVALID_AIVF,
    '4302': apiErrorType.PAYMENT_INVALID_PIN,
    '4003': apiErrorType.PAYMENT_MULTIPLE_OTP_BLOCK,
    '4002': apiErrorType.PAYMENT_INVALID_OTP,
    '4005': apiErrorType.PAYMENT_MISSING_PIN,
    '4004': apiErrorType.PAYMENT_DUPLICATE_REQUEST,
    '4006': apiErrorType.PAYMENT_INSUFFICIENT_CREDIT,
    '4007': apiErrorType.PAYMENT_LENDER_SERVER_FAIL,
    '4100': apiErrorType.PAYMENT_INVALID_TRANSACTION,
    '4008': apiErrorType.PAYMENT_TRANSACTION_TIMEOUT,
    '4009': apiErrorType.PAYMENT_INVALID_AMOUNT,
    '4011': apiErrorType.PAYMENT_INVALID_TENURE,
    '4012': apiErrorType.PAYMENT_BLOCKED_USER,
    '4013': apiErrorType.PAYMENT_INSUFFICIENT_AMOUNT,
    '4014': apiErrorType.PAYMENT_MULTIPLE_PHONE_NUMBER_BLOCK,
    '4015': apiErrorType.PAYMENT_MAX_AMOUNT_LIMIT,
    '4016': apiErrorType.PAYMENT_MIN_AMOUNT_LIMIT,
    '4000': apiErrorType.PAYMENT_GENERIC_ERROR,
  },
  activation: {
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4204': apiErrorType.ACTIVATION_MOBILE_NOT_PA, //user-not-eligible
    '4109': apiErrorType.ACTIVATION_USER_BLOCKED,
    '4102': apiErrorType.ACTIVATION_USER_NOT_PA,
    '4302': apiErrorType.ACTIVATION_INVALID_OTP,
    '4301': apiErrorType.ACTIVATION_EXHAUSTED,
    '4105': apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK, //24 HRS BLOCK
    '4303': apiErrorType.ACTIVATION_INVALID_AIVF,
    '4110': apiErrorType.ACTIVATION_BLOCKED_CREDIT_LINE,
    '4010': apiErrorType.ACTIVATION_SESSION_EXPIRED,
    '4001': apiErrorType.ACTIVATION_INVALID_REQUEST_PARAMETER,
    '4000': apiErrorType.ACTIVATION_GENERIC_ERROR,
  },
  pinSetup: {
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4204': apiErrorType.ACTIVATION_MOBILE_NOT_PA, //user-not-eligible
    '4109': apiErrorType.ACTIVATION_USER_BLOCKED,
    '4102': apiErrorType.ACTIVATION_USER_NOT_PA,
    '4302': apiErrorType.ACTIVATION_INVALID_OTP,
    '4301': apiErrorType.ACTIVATION_EXHAUSTED,
    '4105': apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK, //24 HRS BLOCK
    '4303': apiErrorType.ACTIVATION_INVALID_AIVF,
    '4110': apiErrorType.ACTIVATION_BLOCKED_CREDIT_LINE,
    '4010': apiErrorType.ACTIVATION_SESSION_EXPIRED,
    '4001': apiErrorType.ACTIVATION_INVALID_REQUEST_PARAMETER,
    '4000': apiErrorType.ACTIVATION_GENERIC_ERROR,
  },
  home: {
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4001': apiErrorType.PIN_CHANGE_SAME_VALUE,
    '4303': apiErrorType.PIN_CHANGE_INVALID_VALUE,
  },
  login: {
    //TODO: Need to add single source for forbidden access
    '403': apiErrorType.ACCESS_FORBIDDEN,
    '4203': apiErrorType.USER_NOT_REGISTERED,
    '4301': apiErrorType.LOGIN_BLOCKED_MAX_ATTEMPTS,
    '4302': apiErrorType.LOGIN_INVALID_AUTH,
  },
  common: {
    '4302': apiErrorType.INVALID_OTP,
  },
};

const errorLists = {
  [apiErrorType.ACCESS_FORBIDDEN]: 'Access Forbidden',
  [apiErrorType.PAYMENT_MULTIPLE_AIVF_BLOCK]: 'Multiple AIVF Attempts Block',
  [apiErrorType.PAYMENT_MULTIPLE_PIN_BLOCK]: 'Multiple PIN Attempts Block',
  [apiErrorType.PAYMENT_INVALID_AIVF]: 'Invalid AIVF',
  [apiErrorType.PAYMENT_INVALID_PIN]: 'Invalid PIN',
  [apiErrorType.PAYMENT_INVALID_OTP]: 'Invalid OTP',
  [apiErrorType.PAYMENT_MISSING_PIN]: 'PIN not setup',
  [apiErrorType.PAYMENT_MULTIPLE_OTP_BLOCK]: 'Multiple OTP Attempts Block',
  [apiErrorType.PAYMENT_DUPLICATE_REQUEST]: 'Duplicate Request',
  [apiErrorType.PAYMENT_INSUFFICIENT_CREDIT]: 'Insufficient Credit Limit',
  [apiErrorType.PAYMENT_LENDER_SERVER_FAIL]: 'Lender Server Failure',
  [apiErrorType.PAYMENT_INVALID_TRANSACTION]: 'Invalid Transaction Attempt',
  [apiErrorType.PAYMENT_TRANSACTION_TIMEOUT]: 'Transaction Timeout',
  [apiErrorType.PAYMENT_INVALID_AMOUNT]: 'EMI Amount Greater Than Mandate',
  [apiErrorType.PAYMENT_INVALID_TENURE]: 'EMI Tenure Greater Than Mandate',
  [apiErrorType.PAYMENT_BLOCKED_USER]: 'User Blocked by Lender',
  [apiErrorType.PAYMENT_INSUFFICIENT_AMOUNT]: 'Purchase Amt Less Than Minimum',
  [apiErrorType.PAYMENT_MULTIPLE_PHONE_NUMBER_BLOCK]:
    'Eligibility Attempts Exhausted',
  [apiErrorType.PAYMENT_MAX_AMOUNT_LIMIT]: 'Purchase Amt More Than Max Limit',
  [apiErrorType.PAYMENT_MIN_AMOUNT_LIMIT]: 'Purchase Amt Less Than Min Limit',
  [apiErrorType.PAYMENT_GENERIC_ERROR]: 'Payment Generic Error',
  [apiErrorType.ACTIVATION_MOBILE_NOT_PA]: 'Mobile Not PA',
  [apiErrorType.ACTIVATION_USER_NOT_PA]: 'User Not Eligible',
  [apiErrorType.ACTIVATION_INVALID_OTP]: 'Invalid OTP',
  [apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK]: 'Multiple Attempts Block',
  [apiErrorType.ACTIVATION_EXHAUSTED]: 'Attempts Exhausted',
  [apiErrorType.ACTIVATION_INVALID_AIVF]: 'Invalid AIVF',
  [apiErrorType.PIN_CHANGE_SAME_VALUE]: 'Same As Current PIN',
  [apiErrorType.PIN_CHANGE_INVALID_VALUE]: 'Invalid Current PIN',

  [apiErrorType.USER_NOT_REGISTERED]: 'Mobile Not Registered',
  [apiErrorType.LOGIN_BLOCKED_MAX_ATTEMPTS]: 'Multiple Login Attempts',
  [apiErrorType.LOGIN_INVALID_AUTH]: 'Invalid Auth',
  [apiErrorType.INVALID_OTP]: 'Invalid OTP',
};
