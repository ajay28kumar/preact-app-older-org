/** @jsx h */
import { h } from 'preact';
import style from '../style.css';

const EmiHeaders = ({ emiInfo }) => {
  const { isPreApproved } = emiInfo;
  if (isPreApproved) {
    return (
      <div>
        <div className={style.successMessageContainer}>
          <img
            src='https://iccdn.in/img/widget-img/ic-widget-congratulation-icon.svg'
            className={style.successIcon}
            alt='congratulation'
          />
          <div
            className='font20 bold-text'
            id='pre-approved-emi-info-congratulation-header'>
            Congratulations!
          </div>
        </div>
        <div
          className='font14 text80 text-center'
          id='pre-approved-emi-info-sub-header'>
          You are approved* for <b>InstaCred Cardless EMI credit line</b> with
          following banks
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={style.successMessageContainer}>
        <div className='font20 bold-text' id='non-approved-emi-info-header'>
          InstaCred Cardless EMI Options
        </div>
      </div>
      <div
        className='font14 text80 text-center'
        id='non-approved-emi-info-sub-header'>
        You may be eligible for <b>Cardless EMI</b> from following lending
        partners
      </div>
    </div>
  );
};

export default EmiHeaders;
