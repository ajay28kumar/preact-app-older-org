/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const Header = ({ removeSelectedLender }) => {
  return (
    <div className={style.headerContainer}>
      <img
        src='https://iccdn.in/img/widget-img/ic-widget-arrow-back.svg'
        alt='back'
        className={style.backArrow}
        onClick={() => removeSelectedLender('')}
      />
      <div className='font16 bold-text'>CHECK ELIGIBILITY</div>
    </div>
  );
};

export default Header;
