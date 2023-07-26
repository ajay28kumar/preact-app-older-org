/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const PoweredBy = () => {
  return (
    <img
      id='powered-by-instacred-logo'
      src='https://iccdn.in/img/inline-powered-by.svg'
      alt='powered-by'
      className={style.poweredByImage}
      id='powered-by-img'
    />
  );
};

export default PoweredBy;
