// @flow
/** @jsx h */
import { h } from 'preact';
import style from '../../style.css';

const KeyHighlights = () => {
  return (
    <div>
      <div>
        <div className={`${style.shopImageContainer}`}>
          <div className={`${style.shopImages} text-center`}>
            <img src='https://iccdn.in/img/shop-now-pay-emi.jpg' />
          </div>
        </div>
        <div className={`${style.shopInfoWrapper}`}>
          <div className={`${style.shopInfoContainer}`}>
            <div className={`${style.infoIconContainer} text-center`}>
              <img
                src='https://iccdn.in/img/ic_noCard.svg'
                className={`${style.infoIcon}`}
              />
            </div>
            <div className={`${style.infoTextContainer} font14`}>
              <div className={`${style.infoHeader} bold-text text-center`}>
                No Card needed
              </div>
              <div className='text-center font14 bold-text text60'>
                Only mobile number required
              </div>
            </div>
          </div>
          <div className={`${style.shopInfoContainer}`}>
            <div className={`${style.infoIconContainer} text-center`}>
              <img
                src='https://iccdn.in/img/ic_preappproved.svg'
                className={`${style.infoIcon}`}
              />
            </div>
            <div className={`${style.infoTextContainer} font14`}>
              <div className={`${style.infoHeader} bold-text text-center`}>
                Pre-approved
              </div>
              <div className='text-center font14 bold-text text60'>
                No application needed
              </div>
            </div>
          </div>
          <div className={`${style.shopInfoContainer}`}>
            <div className={`${style.infoIconContainer} text-center`}>
              <img
                src='https://iccdn.in/img/ic_easy_autopayment.svg'
                className={`${style.infoIcon}`}
              />
            </div>
            <div className={`${style.infoTextContainer} font14`}>
              <div className={`${style.infoHeader} bold-text text-center`}>
                Easy Auto Repayments
              </div>
              <div className='text-center font14 bold-text text60'>
                Never miss a payment due date
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyHighlights;
