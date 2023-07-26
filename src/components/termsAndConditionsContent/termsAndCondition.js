import TermsAndConditionList from '../../components/privacyPolicyList/termsAndConditionList';

const TermsAndCondition = ({ lenderId }) => {
  const lender = lenderId.toString();
  switch (lender) {
    case '1':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/instalendTermsAndConditions.html'),
          }}
        />
      );
    case '102':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/federalBankTermsAndConditions.html'),
          }}
        />
      );
    case '201':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/termsAndConditionsContent.html'),
          }}
        />
      );
    case '301':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/fullertonTermsAndConditions.html'),
          }}
        />
      );
    case '401':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/kotakTermsAndCondition.html'),
          }}
        />
      );
    case '501':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/hdfcTermsAndCondition.html'),
          }}
        />
      );
    case '502':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/hdfcTermsAndCondition.html'),
          }}
        />
      );
    case '601':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/homeCreditInstacredTermsAndCondition.html'),
          }}
        />
      );
    case '701':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/iciciInstacredTermsAndCondition.html'),
          }}
        />
      );
    case '801':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: require('./termsAndConditionHtml/mahindraFinanceInstacredTermsAndCondition.html'),
          }}
        />
      );
    case 'instacred':
      return <TermsAndConditionList />;
    default:
      return null;
  }
};

export default TermsAndCondition;
