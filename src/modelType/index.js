// @flow
import { apiStatus } from '../actionTypes';

export type ApiState =
  | apiStatus.NONE
  | apiStatus.INITIATED
  | apiStatus.SUCCESS
  | apiStatus.ERROR;

export type AivfType =
  | 'NONE'
  | 'LAST_DIGITS_OF_DEBIT_CARD'
  | 'ACCT_DIGITS'
  | 'OTP'
  | 'PIN';
export type CreditLineStatus = 'PRE_APPROVED' | 'ACTIVE';

export type LenderTypes = 'PAY_LATER' | 'EMI';
