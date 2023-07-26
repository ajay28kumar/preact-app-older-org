/** @jsx h */
import { h } from 'preact';
import style from '../style.css';

const NonLender = () => {
  return (
    <div className={style.errorMessageContainer}>
      <div className={`${style.errorHeader} font18 bold-text errorColor`}>
        Sorry!
      </div>
      <div className='font16'>We don't have any available lenders for you</div>
    </div>
  );
};

export default NonLender;
