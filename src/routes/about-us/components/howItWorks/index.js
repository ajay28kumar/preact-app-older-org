// @flow
/** @jsx h */
import { h } from 'preact';
import style from '../../style.css';

const HowItWorks = () => {
  return (
    <div
      className={`${style.aboutContents}  ${style.howItWorksWrapper} font14`}>
      <div className={`${style.howItWorksContent} font20 bold-text text80`}>
        How it works
      </div>
      <div className={style.stepsContainer}>
        <img
          src='https://iccdn.in/img/how-shop-with-cardless-emi-works-2.gif'
          className={style.howItWorksGif}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
