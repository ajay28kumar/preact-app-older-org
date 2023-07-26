const LenderTnCText = ({ lenderId }) => {
  const lender = lenderId.toString();
  switch (lender) {
    case '1':
      return (
        <span className='text60'>
          {' '}
          of Instalend Bank InstaCred EMI facility.
        </span>
      );
    case '102':
      return (
        <span className='text60'>
          of Federal Bank InstaCred Cardless EMI facility.
        </span>
      );
    case '201':
      return (
        <span className='text60'>
          of IDFC First Bank InstaCred EMI facility.
        </span>
      );
    case '301':
      return (
        <span className='text60'>of Fullerton InstaCred EMI facility.</span>
      );
    case '401':
      return (
        <span className='text60'>
          of Kotak Mahindra Bank InstaCred EMI facility.
        </span>
      );
    case '501':
      return (
        <span className='text60'>of HDFC Bank InstaCred EMI facility.</span>
      );
    case '502':
      return (
        <span className='text60'>
          of Flexipay by HDFC Bank InstaCred facility.
        </span>
      );
    case '601':
      return (
        <span className='text60'>of Home Credit InstaCred EMI facility.</span>
      );
    case '701':
      return (
        <span className='text60'>
          of ICICI Bank Cardless EMI Instacred facility.
        </span>
      );
    default:
      return null;
  }
};

export default LenderTnCText;
