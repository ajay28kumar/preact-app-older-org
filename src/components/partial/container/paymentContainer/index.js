/** @jsx h */
import { h } from 'preact';
import Helmet from 'preact-helmet';
import PaymentHeader from '../../header/paymentHeader';
import style from '../../style.css';
import { connect } from 'react-redux';
import CountdownTimer from '../../layers/countdownTimer';
import onPaymentInit from '../../../../actions/onPaymentInit';

const PaymentContainer = (props) => {
  const {
    pageKey,
    lenderId,
    shouldShowHeader,
    shouldShowTransactionDetails,
    shouldShowTimer,
    remainingTimeSeconds,
    children,
    onPaymentInit,
  } = props || {};
  return (
    <div className={style.paymentContainer}>
      <Helmet
        title={lenderId === 502 ? 'FlexiPay' : 'Cardless EMI'}
        meta={[
          {
            name: 'description',
            content:
              'Shop with InstaCred on EMI your favourite Mobile phones, TV, Furniture, Flight tickets. These & many more from our merchants Amazon, Flipkart, Via and others.',
          },
        ]}
      />
      <div className={style.icContainer}>
        <img
          src='https://iccdn.in/img/inline-powered-by.svg'
          alt='Powered by InstaCred'
          className={style.icImage}
        />
      </div>
      <div className={style.paymentLayout}>
        {(shouldShowHeader || shouldShowTransactionDetails) && (
          <PaymentHeader />
        )}
        {remainingTimeSeconds && shouldShowTimer && (
          <CountdownTimer
            remainingTimeSeconds={remainingTimeSeconds}
            pageKey={pageKey}
            onPaymentInit={onPaymentInit}
          />
        )}
        <div className={style.paymentBody}>{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ config, paymentDetails, paymentUserData }) => {
  const { selectedLender } = paymentUserData || {};
  const { lenderId } = selectedLender || {};
  const {
    shouldShowHeader,
    shouldShowTransactionDetails,
    shouldShowTimer,
    pageKey,
  } = config || {};
  const { remainingTimeSeconds } = paymentDetails || {};
  return {
    pageKey,
    lenderId,
    shouldShowTransactionDetails,
    shouldShowHeader,
    shouldShowTimer,
    remainingTimeSeconds,
  };
};
export default connect(
  mapStateToProps,
  { onPaymentInit },
)(PaymentContainer);
