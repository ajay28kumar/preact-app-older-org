/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import HelpIcon from '../payment/helpIcon';

export const aivfProps = ({
  aivfType,
  lenderName,
  cardName,
  aivfValue = '',
}) => {
  switch (aivfType) {
    case 'LAST_DIGITS_OF_DEBIT_CARD':
      return {
        header: 'Verify Your Account',
        SubHeader: () => (
          <div className={style.subHeaderText}>
            <span className={`text80`}>
              Enter last 4 digits of your {lenderName} {cardName}
            </span>
            <span>
              <HelpIcon
                transactionHelpTitle={`Why ${cardName}?`}
                helpText={() => (
                  <p className='font14 text60'>
                    {`As an additional security, the lender requires ${cardName}
                          information for verification purpose.`}
                    <br />
                    The information is passed to and verified by the lender.
                  </p>
                )}
              />
            </span>
          </div>
        ),
        subHeaderSuccess: `${cardName} ending with`,
        inputPlaceHolder: 'Enter Last 4 digits',
        submitText: `Verify ${cardName}`,
        aivfLength: 4,
        isValidAivf: true,
      };
    case 'PAN_CARD':
      return {
        header: 'PAN Card Verification',
        SubHeader: () => (
          <div className={style.subHeaderText}>
            <span className={`text80`}>Enter your PAN card number</span>
            <span>
              <HelpIcon
                transactionHelpTitle='Why PAN Card?'
                helpText={() => (
                  <p className='font14 text60'>
                    As an additional security, the lender requires PAN card
                    information for verification purpose.
                    <br />
                    The information is passed to and verified by the lender.
                  </p>
                )}
              />
            </span>
          </div>
        ),
        subHeaderSuccess: 'PAN ending with',
        submitText: 'Submit',
        aivfLength: 10,
        isValidAivf:
          aivfValue.search(/[A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/) !== -1,
      };
    case 'PAN_CARD_NUMBERS':
      return {
        header: 'PAN Card Verification',
        SubHeader: () => (
          <div className={style.subHeaderText}>
            <span className={`text80`}>
              Enter only the <span className='bold-text'>digits</span> of your
              PAN
            </span>
            <span>
              <HelpIcon
                transactionHelpTitle='Why PAN Card?'
                helpText={() => (
                  <p className='font14 text60'>
                    As an additional security, the lender requires PAN card
                    information for verification purpose.
                    <br />
                    The information is passed to and verified by the lender.
                  </p>
                )}
              />
            </span>
          </div>
        ),
        subHeaderSuccess: 'PAN ending with',
        submitText: 'Submit',
        aivfLength: 4,
        isValidAivf: true,
      };

    case 'NONE':
      return {};
    default:
      return {};
  }
};
