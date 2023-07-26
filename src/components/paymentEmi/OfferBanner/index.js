/** @jsx h */

import { h } from 'preact';
import style from './style.css';

const OfferBanner = () => {
  return (
    <div className={style.emiOffer__container}>
      <div className={style.emiOffer__wrapper}>
        <img
          src='https://iccdn.in/img/common/offer-green-fill.svg'
          width='32'
          height='32'
          alt='Offer'
        />
        <div className={style.emiOffer__info}>
          <p className={`${style.emiOffer__title} text80 font14`}>
            5% cashback on HDFC Flexipay
          </p>
          <a
            className={style.emiOffer__tnc}
            href='https://www.flipkart.com/pages/hdfc-flexi-pay-tnc'
            target='_blank'
            rel='noopener noreferrer'>
            *T&C apply
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
