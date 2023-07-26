import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import onPaymentEmi from '../../actions/onPaymentEmi';
import showSnackBar from '../../actions/commonAction/showSnackBar';
import { PayLaterPlanSelection } from '../../components/paymentEmi/payLater/PayLaterPlanSelection';

const mapStateToProps = ({ paymentUserData, paymentDetails, config }) => {
  const { selectedLender } = paymentUserData || {};
  const { txnUuid } = config;
  const { merchantId, purchaseValue, isFlipkartOfferEligible } = paymentDetails;
  return {
    selectedLender,
    txnUuid,
    merchantId,
    purchaseValue,
    isFlipkartOfferEligible,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentEmi, showSnackBar },
)(withBaseComponent(PayLaterPlanSelection));
