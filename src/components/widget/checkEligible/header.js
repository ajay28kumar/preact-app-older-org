/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const Header = () => {
  return (
    <div className={style.headerContainer}>
      <div className='font16 bold-text' id='check-eligibility-header'>
        CHECK ELIGIBILITY
      </div>
    </div>
  );
};

export default Header;
