// @flow
import type { AivfType, CreditLineStatus, LenderTypes } from './index';

export type LenderDetails = {
  eligible: boolean,
  closedBenefitModel?: boolean,
  lenderId: number,
  logo: string,
  logoIcon: string,
  lenderName: string,
  lenderTncUrl: string,
  emiNotes: Array<string>,
  lenderType?: LenderTypes,
  creditLineStatus: CreditLineStatus,
  aivfType: AivfType,
  emiDetailsList?: Array<EmiDetails>,
  minInterestRate?: number,
};

export type EmiDetails = {
  isSubventionEnabled: boolean,
  loanDuration: number,
  interestRate: number,
  monthlyInstallment: number,
  totalInterest: number,
  effectiveInterestRate: number,
  effectiveMonthlyInstallment: number,
  effectiveTotalInterest: number,
  transactionSettlementAmount: number,
  transactionAmount: number,
  loanAmount: number,
  totalDiscountAmount: number,
  flexmoneyDiscountAmount: number,
  creditSchemeVariantId: number,
  tenureType: string,
  emiSchedule: { [number]: number },
};
