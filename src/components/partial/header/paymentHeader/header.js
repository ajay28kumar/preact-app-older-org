import { connect } from 'react-redux';
import style from './style.css';
import PurchaseAmount from '../../../paymentInit/purchaseAmount';
import MobileNumberDisplay from './mobileNumberDisplay';
import LenderHeader from './LenderHeader';

const PaymentHeader = (props) => {
  const {
    selectedEmiDetails,
    purchaseValue,
    shouldShowHeader,
    shouldShowTransactionDetails,
    backRoute,
  } = props || {};
  const { loanDuration, monthlyInstallment, lenderType, tenureType } =
    selectedEmiDetails || {};
  const emiSelected = loanDuration && monthlyInstallment;

  return (
    <div
      className={`${style.headerLayout} ${
        shouldShowTransactionDetails ? 'header-shadow' : ''
      }`}>
      {shouldShowTransactionDetails ? (
        <div className={style.paymentTopHeader}>
          <MobileNumberDisplay />
          <PurchaseAmount purchaseValue={purchaseValue} />
        </div>
      ) : (
        <div className={style.paymentEmptyHeader} />
      )}
      {shouldShowHeader && (
        <LenderHeader
          backRoute={backRoute}
          emiSelected={emiSelected}
          lenderType={lenderType}
          loanDuration={loanDuration}
          tenureType={tenureType}
          monthlyInstallment={monthlyInstallment}
        />
      )}
    </div>
  );
};
const mapStateToProps = ({ paymentDetails, config, paymentUserData }) => {
  const { selectedLender, selectedEmiDetails } = paymentUserData || {};
  const { logo, creditLineStatus, lenderId } = selectedLender || {};
  const { purchaseValue } = paymentDetails || {};
  const { shouldShowHeader, shouldShowTransactionDetails, backRoute } =
    config || {};

  return {
    shouldShowTransactionDetails,
    shouldShowHeader,
    backRoute,
    purchaseValue,
    selectedEmiDetails,
    logo,
    creditLineStatus,
    lenderId,
  };
};
export default connect(mapStateToProps)(PaymentHeader);
