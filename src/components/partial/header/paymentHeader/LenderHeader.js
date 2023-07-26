import style from './style.css';
import { route } from 'preact-router';
import { connect } from 'react-redux';
import PayLaterTenureContainer from './payLaterTenure';
import PaymentEMITenureContainer from './paymentEMITenure';
import { Fragment } from 'preact';

const LenderHeader = ({
  backRoute,
  logo,
  lenderName,
  emiSelected,
  lenderType,
  tenureType,
  loanDuration,
  monthlyInstallment,
}) => {
  return (
    <div
      className={style.lenderHeaderContainer}
      style={{
        padding: backRoute ? '0 8px' : '0 16px',
      }}>
      <div className={style.logoContainer}>
        {backRoute && (
          <i
            id='transaction-back'
            onClick={() => route(backRoute, true)}
            className={`${style.backButton} material-icons cursor-pointer`}>
            keyboard_arrow_left
          </i>
        )}
        <img src={logo} className={style.lenderLogo} alt='lender-logo' />
      </div>
      {emiSelected ? (
        <Fragment>
          {lenderType === 'PAY_LATER' ? (
            <PayLaterTenureContainer
              loanDuration={loanDuration}
              tenureType={tenureType}
            />
          ) : (
            <PaymentEMITenureContainer
              loanDuration={loanDuration}
              monthlyInstallment={monthlyInstallment}
            />
          )}
        </Fragment>
      ) : (
        <div className={`${style.lenderHeaderName} font16 bold-text`}>
          {lenderName}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ paymentUserData }) => {
  const { selectedLender } = paymentUserData;
  const { logo, lenderName } = selectedLender;
  return {
    logo,
    lenderName,
  };
};

export default connect(mapStateToProps)(LenderHeader);
