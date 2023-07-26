import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import onPaymentEnterMobile from '../../actions/onPaymentEnterMobile';
import { PaymentEnterMobile } from '../../components/paymentEnterMobile/paymentEnterMobile';
import onPaymentLenderList from '../../actions/onPaymentLenderList';

const mapStateToProps = ({ paymentDetails, paymentUserData, config }) => {
  const { txnUuid } = config;
  const {
    purchaseValue,
    mobileNoError,
    transactionInfoApiState,
    lenderDetailsStatus,
    errorMessage,
    lenderDetailsList,
    merchantId,
  } = paymentDetails || {};
  const { selectedLender, selectedEmiDetails } = paymentUserData;
  const { loanDuration } = selectedEmiDetails || {};
  const { lenderId, logoIcon, lenderName } = selectedLender || {};
  return {
    lenderDetailsList,
    purchaseValue,
    transactionInfoApiState,
    errorMessage: mobileNoError || errorMessage,
    lenderDetailsStatus,
    txnUuid,
    preSelectedLenderId: lenderId && lenderId.toString(),
    logoIcon,
    merchantId,
    loanDuration,
    lenderId,
    lenderName,
  };
};
export default connect(
  mapStateToProps,
  { onPaymentEnterMobile, onPaymentLenderList },
)(withBaseComponent(PaymentEnterMobile));
