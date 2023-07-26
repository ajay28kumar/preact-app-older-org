import style from '../../paymentEnterMobile/style.css';
import { h } from 'preact';

const BenefitList = () => {
  return (
    <div className={style.benefitsContainer}>
      <div className={style.benefits}>
        <div className={style.iconContainer}>
          <span className='material-icons primary-color bold-text font18'>
            done
          </span>
        </div>
        <span className='font14 text60 bold-text'>
          Attractive Interest Rates
        </span>
      </div>
      <div className={style.benefits}>
        <div className={style.iconContainer}>
          <span className='material-icons primary-color bold-text font18'>
            done
          </span>
        </div>
        <span className='font14 text60 bold-text'>
          No Additional fees to activate facility
        </span>
      </div>
    </div>
  );
};

export default BenefitList;
