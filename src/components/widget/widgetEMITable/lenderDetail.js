import style from './style.css';
import { currencyFormat } from '../../directives/currencyFormat';

const LenderDetail = ({ amount, logoIcon, name }) => {
  return (
    <div className={style.lenderContainer}>
      <img src={logoIcon} className={style.logoIcon} alt='lender-logo' />
      <div>
        <div className='font16 bold-text'>{name}</div>
        <div className='font14'>
          <span className='bold-text'>EMI </span> for ₹{currencyFormat(amount)}
        </div>
      </div>
    </div>
  );
};

export default LenderDetail;
