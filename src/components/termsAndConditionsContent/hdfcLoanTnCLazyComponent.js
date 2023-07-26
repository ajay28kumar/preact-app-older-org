import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';

const headingTitle = (tncType) => {
  switch (tncType) {
    case 'scheduleCharges':
      return 'Schedule of Charges';
    case 'mahindraFinanceTnc':
      return <span id='mahindra-finance-tnc-label'>TERMS OF USE</span>;
    default:
      return <span id='tnc-label'>Terms and conditions</span>;
  }
};

const HdfcLoanTncLazyComponent = ({ tncType, onCloseCallback }) => {
  return (
    <div>
      <Dialog.Header>
        {headingTitle(tncType)}
        <span className='dialogClose' onClick={onCloseCallback}>
          &times;
        </span>
      </Dialog.Header>
      <Dialog.Body scrollable={true}>
        {tncType === 'loanTnc' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/hdfcLoanTermsAndConditions.html'),
            }}
          />
        )}
        {tncType === 'scheduleCharges' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/hdfcScheduleOfCharges.html'),
            }}
          />
        )}
        {tncType === 'payLater' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/hdfcPayLaterTermsAndCondition.html'),
            }}
          />
        )}
        {tncType === 'federalTnc' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/federalBankTransactionTnc.html'),
            }}
          />
        )}
        {tncType === 'homeCredit' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/homeCreditTermsAndCondition.html'),
            }}
          />
        )}
        {tncType === 'iciciTnc' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/iciciTermsAndCondition.html'),
            }}
          />
        )}
        {tncType === 'mahindraFinanceTnc' && (
          <div
            dangerouslySetInnerHTML={{
              __html: require('./termsAndConditionHtml/mahindraFinanceTermsofUse.html'),
            }}
          />
        )}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.FooterButton onClick={onCloseCallback}>OK</Dialog.FooterButton>
      </Dialog.Footer>
    </div>
  );
};

export default HdfcLoanTncLazyComponent;
