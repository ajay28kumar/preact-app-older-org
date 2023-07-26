// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';

type Props = {
  name: string,
  desktopImgUrl: string,
  brandClick: Function,
};

const Brand = ({ name, desktopImgUrl, brandClick }: Props) => {
  return (
    <div onClick={brandClick} className={style.image}>
      <img
        src={desktopImgUrl}
        alt='Shop on EMI without credit card. InstaCred Cardless EMI, No Cost EMI, Flipkart EMI, Amazon EMI'
      />
    </div>
  );
};

export default Brand;
