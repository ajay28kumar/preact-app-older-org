import { h } from 'preact';
import style from './style.css';
import { connect } from 'react-redux';
import PaymentError from './paymentError';
import ActivationError from './activationError';

const ErrorScreen = ({ template, errorMessage }) => {
  switch (template) {
    case 'payment':
      return <PaymentError />;
    case 'activation':
    case 'pinSetup':
      return <ActivationError errorMessage={errorMessage} />;
    default:
      return (
        <div className={style.errorContainer}>
          <img
            src='https://iccdn.in/img/gray-error-icon.png'
            style={{ width: 100 }}
          />
          <div className={`${style.errorText} font16`}>{errorMessage}</div>
        </div>
      );
  }
};

const mapStateToProps = ({ config }) => {
  const { template } = config;
  return {
    template,
  };
};
export default connect(mapStateToProps)(ErrorScreen);
