import { logos } from '../../../common/lenderBrands/lendersLogos.js';
import style from './style.css';

const BrandingLogos = () => {
  return (
    <div className={style.lenderContainer} id='lender-icons-container'>
      {logos.map((lender) => {
        return (
          <div>
            <img src={lender.lenderImage} className={style.lenderImage} />
          </div>
        );
      })}
    </div>
  );
};

export default BrandingLogos;
