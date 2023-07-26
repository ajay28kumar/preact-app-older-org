/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const BenefitImages = () => {
  return (
    <div className={style.imageContainer}>
      <div className={style.shopImages}>
        <div className={style.shopIcon} id='benefit-buy-now-container'>
          <img
            src='https://iccdn.in/img/widget-img/ic-widget-shop-now.svg'
            className={style.iconSize}
            alt='shop-now-icon'
          />
          <div className='font16 bold-text' style={{ marginTop: 4 }}>
            Buy Now
          </div>
        </div>
        <div className={style.arrowIcon}>
          <img
            id='benefit-arrow-icon'
            src='https://iccdn.in/img/widget-img/ic-img-arrow-right-v1.1.png'
            className={style.arrowImage}
            alt='arrow-icon'
          />
        </div>
        <div className={style.shopIcon} id='benefit-pay-later-container'>
          <img
            src='https://iccdn.in/img/widget-img/ic-widget-easy-repayment.svg'
            className={style.iconSize}
            style={{ marginTop: 5 }}
            alt='ic-widget-icon'
          />
          <div className='font16'>
            <b>Pay Later</b> <div className='font14'>with EMI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitImages;
