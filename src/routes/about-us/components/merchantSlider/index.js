// @flow
/** @jsx h */
import { h } from 'preact';
import SlickSlider from '../../../../components/common/slickSlider';
import style from '../../style.css';

const merhchantSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  placeholders: false,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
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

const merchantArray = [
  {
    img: 'https://iccdn.in/img/merchant-desktop-flipkart.jpg',
    name: 'Flipkart',
  },
  {
    img: 'https://iccdn.in/img/merchant-desktop-amazon.jpg',
    name: 'Amazon',
  },
  {
    img: 'https://iccdn.in/img/merchant-desktop-myntra.jpg',
    name: 'Myntra',
  },
  {
    img: 'https://iccdn.in/img/merchant-desktop-tata-cliq.jpg',
    name: 'TATA Cliq',
  },
  {
    img: 'https://iccdn.in/img/merchant-royaloak.jpg',
    name: 'Royal Oak',
  },
  {
    img: 'https://iccdn.in/img/merchant-decathlon.jpg',
    name: 'Decathlon',
  },
  {
    img: 'https://iccdn.in/img/merchant-vijaysales.jpg',
    name: 'Vijay Sales',
  },
  {
    img: 'https://iccdn.in/img/merchant-sangeetha-mobiles.jpg',
    name: 'Sangeetha Mobiles',
  },
  {
    img: 'https://iccdn.in/img/merchant-urbanladder.jpg',
    name: 'Urban Ladder',
  },
  {
    img: 'https://iccdn.in/img/merchant-zefo.jpg',
    name: 'Zefo',
  },
];
const MerchantSlider = () => {
  return (
    <div
      className={`${style.aboutContents}  ${style.merchantSliderContainer} ${
        style.achievementsWrapper
      } font14`}>
      <div
        className={`${
          style.networkMerchantSubHeader
        } text-center font14 bold-text`}>
        Top Merchants
      </div>
      <SlickSlider setting={merhchantSliderSettings}>
        {merchantArray.map((itm, index) => {
          return (
            <div className={`${style.tileContainer} cursorPointer`}>
              <div className={style.imageContainer}>
                <div
                  style={{
                    backgroundImage: `url(${itm.img})`,
                  }}
                  className={`${style.image}`}
                />
              </div>
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default MerchantSlider;
