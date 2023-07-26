// @flow
/** @jsx h */
import { h } from 'preact';
import SlickSlider from '../../../../components/common/slickSlider';
import style from '../../style.css';

const lenderSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  placeholders: false,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
      },
    },
  ],
};

const lenderArray = [
  {
    img: 'https://iccdn.in/img/lender-logo-2x/federal-bank-2x.png',
    name: 'Federal Bank',
  },
  {
    img: 'https://iccdn.in/img/lender-logo-2x/hdfc-bank-2x.png',
    name: 'HDFC',
  },
  {
    img: 'https://iccdn.in/img/lender-logo-2x/home-credit-2x.png',
    name: 'Home Credit',
  },
  {
    img: 'https://iccdn.in/img/lender-logo-2x/icici-bank-logo.png',
    name: 'ICICI',
  },
  {
    img: 'https://iccdn.in/img/lender-logo-2x/idfc-bank-2x.png',
    name: 'IDFC',
  },
  {
    img: 'https://iccdn.in/img/lender-logo-2x/kotak-2x.png',
    name: 'Kotak',
  },
];

const LenderSlider = () => {
  return (
    <div
      className={`${style.aboutContents}  ${style.achievementsWrapper} ${
        style.lenderSliderWrapper
      } font14`}>
      <div
        className={`${
          style.networkLenderSubHeader
        } text-center font14 bold-text`}>
        Our Lending Partners
      </div>
      <SlickSlider setting={lenderSliderSettings}>
        {lenderArray.map((itm) => {
          return (
            <div className={`${style.tileContainer} cursorPointer`}>
              <div>
                <div className={style.lenderImageWrapper}>
                  <img src={itm.img} className={style.lenderSliderImage} />
                </div>
              </div>
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default LenderSlider;
