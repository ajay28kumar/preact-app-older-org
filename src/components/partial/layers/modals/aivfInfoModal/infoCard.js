/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const InfoCard = (props) => {
  const { leftImage, children } = props || {};
  return (
    <div className={style.cardInfoContainer}>
      <div>
        <img src={leftImage} className={style.leftImageContainer} />
      </div>
      <div className={style.cardInfoTextContainer}>{children}</div>
    </div>
  );
};

export default InfoCard;
