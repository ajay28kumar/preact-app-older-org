import { connect } from 'react-redux';
import onPaymentInit from '../../actions/onPaymentInit';
import { PaymentInitTransaction } from '../../components/paymentInit/paymentInitTransaction';
import withBaseComponent from '../../HOC/withBaseComponent';
import onPaymentLenderList from '../../actions/onPaymentLenderList';

const mapStateToProps = ({ paymentDetails, config }) => {
  const {
    transactionInfoApiState,
    merchantId,
    mobile,
    transactionInfoPreSelectedApiState,
    errorMessage,
  } = paymentDetails || {};
  const { template } = config || {};
  return {
    transactionInfoApiState,
    merchantId,
    mobile,
    transactionInfoPreSelectedApiState,
    errorMessage,
    template,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentInit, onPaymentLenderList },
)(withBaseComponent(PaymentInitTransaction));
