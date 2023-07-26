import {
  DebitCardVerification,
  NoneAIVF,
  AccountVerification,
} from '../verificationSecondFactor';

import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';

const Contents = ({
  aivfType,
  pageKey,
  errorMsg,
  verificationStatus,
  verifySecondFactor,
}) => {
  switch (aivfType) {
    case 'LAST_DIGITS_OF_DEBIT_CARD':
      return (
        <DebitCardVerification
          pageKey={pageKey}
          errorMsg={errorMsg}
          verificationStatus={verificationStatus}
          verifySecondFactor={verifySecondFactor}
        />
      );
    case 'ACCT_DIGITS':
      return (
        <AccountVerification
          pageKey={pageKey}
          errorMsg={errorMsg}
          verificationStatus={verificationStatus}
          verifySecondFactor={verifySecondFactor}
        />
      );
    case 'NONE':
      return (
        <NoneAIVF pageKey={pageKey} verifySecondFactor={verifySecondFactor} />
      );
    default:
      return null;
  }
};

export default withTerminalApiResponse(Contents);
