/** @jsx h */
import { h, Fragment } from 'preact';
const helper = ({ lenderId, lenderName }) => {
  switch (lenderId) {
    case '102':
      return {
        informationText: 'Just enter the 4 digits of your Debit card and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>0 downpayment. </span>
                  <span className='text80'>
                    No additional fee charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}.The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from your account.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };
    case '201':
    case '202':
      return {
        informationText: 'Just enter the 4 digits of your PAN card and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>0 downpayment. </span>
                  <span className='text80'>
                    No additional fee charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}. The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from account based on
                    existing mandate.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };

    case '401':
      return {
        informationText: 'Just enter the 4 digits of your Debit card and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>0 downpayment. </span>
                  <span className='text80'>
                    A nominal fee of ₹199 is charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          ,
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}. The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from your account.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };

    case '501':
      return {
        informationText: 'Just enter the 4 digits of your Debit card and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>0 downpayment. </span>
                  <span className='text80'>
                    A nominal fee of ₹199 + GST is charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}. The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from your account.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };

    case '601':
      return {
        informationText: 'Just enter the 4 digits of your Ujjwal card and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>Zero down payment. </span>
                  <span className='text80'>
                    No additional fee charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}. The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from your account.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };

    case '701':
      return {
        informationText: 'Just enter your PAN card number and OTP',
        infoDetails: [
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-pre-appproved.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Pre-approved
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    You are already pre-approved by {lenderName}.{' '}
                  </span>
                  <span className='bold-text'>No KYC required!</span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-low-interest-rate.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  No Hidden Charges
                </div>
                <div className='font14 line-height-20'>
                  <span className='bold-text'>Zero down payment. </span>
                  <span className='text80'>
                    No additional fee charged by {lenderName}.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-safe-and-secure.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Safe and Secure
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    OTP is verified by {lenderName}. The platform is PCI DSS
                    certified.
                  </span>
                </div>
              </Fragment>
            ),
          },
          {
            leftImage:
              'https://iccdn.in/img/transaction/ic-transaction-zero-effort.png',
            textElement: (
              <Fragment>
                <div className='font16 bold-text text80 line-height-20'>
                  Auto Repayment
                </div>
                <div className='font14 line-height-20'>
                  <span className='text80'>
                    EMI amount will be directly debited from your account.{' '}
                  </span>
                  <span className='bold-text'>No setup required.</span>
                </div>
              </Fragment>
            ),
          },
        ],
      };
    default:
      return {};
  }
};

export default helper;
