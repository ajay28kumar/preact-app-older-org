import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import onPaymentEmi from '../../actions/onPaymentEmi';
import showSnackBar from '../../actions/commonAction/showSnackBar';
import { PaymentEmiSelection } from '../../components/paymentEmi/paymentEmi/paymentEmiSelection';

const mapStateToProps = ({ paymentDetails, paymentUserData, config }) => {
  const { txnUuid } = config;
  const { selectedLender } = paymentUserData || {};
  const { merchantId, purchaseValue, isFlipkartOfferEligible } = paymentDetails;
  return {
    txnUuid,
    selectedLender,
    merchantId,
    purchaseValue,
    isFlipkartOfferEligible,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentEmi, showSnackBar },
)(withBaseComponent(PaymentEmiSelection));
