import { h } from 'preact';
import style from '../../paymentEnterMobile/style.css';
import LendersLogos from './lendersLogos';
const LenderBrands = ({ preSelectedLenderId = false, logoIcon }) => {
  return (
    <div className={style.lendingContainer}>
      <div className={`${style.textSpace} font12 text60 bold-text`}>
        OUR BANKING {preSelectedLenderId ? 'PARTNER' : 'PARTNERS'}
      </div>
      {preSelectedLenderId ? (
        <div className={style.lenderImages}>
          <img src={logoIcon} className={style.lenderIcon} />
        </div>
      ) : (
        <LendersLogos />
      )}
    </div>
  );
};

export default LenderBrands;
