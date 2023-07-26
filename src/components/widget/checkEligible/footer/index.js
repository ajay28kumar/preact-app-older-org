import style from './style.css';
import BrandingLogos from './brandingLogos';

const Footer = () => {
  return (
    <div className={style.footerContainer}>
      <div className={style.logoContainer}>
        <div className='text12 font80'>Leading Banks & NBFCs</div>
        <BrandingLogos />
      </div>
      <div className={style.verticalDivider} />
      <div className={style.poweredByContainer}>
        <div className='font10 text40'>POWERED BY</div>
        <img
          src='https://iccdn.in/img/instacred-v1.0.svg'
          className={style.icLogo}
          alt='instacred'
        />
      </div>
    </div>
  );
};

export default Footer;
