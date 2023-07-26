//@flow
/** @jsx h */
import { h } from 'preact';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import AivfContent from './aivfContent';
import { NoneAIVF } from '../verificationSecondFactor';
import type { AivfType, ApiState } from '../../modelType';

type Props = {
  aivfType: AivfType,
  lenderName: string,
  pageKey: string,
  confirmCreditLineState: ApiState,
  errorMsg?: string,
  onVerifyCreditLineCallBack: Function,
};

const VerifySecondFactorContainer = (props: Props) => {
  const {
    aivfType,
    lenderName,
    pageKey,
    confirmCreditLineState,
    errorMsg,
    onVerifyCreditLineCallBack,
  } = props;
  if (aivfType === 'NONE') {
    return (
      <NoneAIVF
        pageKey={pageKey}
        verifySecondFactor={onVerifyCreditLineCallBack}
      />
    );
  }
  return (
    <AivfContent
      pageKey={pageKey}
      aivfType={aivfType}
      lenderName={lenderName}
      verificationStatus={confirmCreditLineState}
      errorMsg={errorMsg}
      onVerifyCreditLineCallBack={onVerifyCreditLineCallBack}
    />
  );
};

export default withTerminalApiResponse(VerifySecondFactorContainer);
