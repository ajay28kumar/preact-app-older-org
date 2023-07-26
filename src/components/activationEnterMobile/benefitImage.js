import { connect } from 'react-redux';
import style from '../partial/style.css';

const BenefitImage = ({ backgroundDesktopImg }) => {
  return (
    <div className={style.benefitContainer}>
      {backgroundDesktopImg && (
        <img
          src={backgroundDesktopImg}
          className={style.benefitImage}
          alt='benefit-image'
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ activationInit }) => {
  const { backgroundDesktopImg } = activationInit;
  return {
    backgroundDesktopImg,
  };
};

export default connect(mapStateToProps)(BenefitImage);
