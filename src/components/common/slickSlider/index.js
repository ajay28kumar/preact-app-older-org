// @flow
/** @jsx h */
import { h, VNode } from 'preact';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  children: VNode,
  setting?: Object,
};

const SlickSlider = ({ children, setting = {} }: Props) => {
  const slideSetting = {
    lazyLoad: 'ondemand',
    dots: true,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 1,
    infinite: true,
    autoplaySpeed: 10000,
    ...setting,
  };
  return <Slider {...slideSetting}>{children}</Slider>;
};

export default SlickSlider;
