import style from './style.css';

export const CarouselBanner = ({ onClick, desktopImgUrl }) => (
  <div class={style.bannerContainer} onClick={onClick}>
    <div
      class={`${style.bannerImgContainer} cursorPointer`}
      style={{
        backgroundImage: `url(${desktopImgUrl})`,
      }}
    />
  </div>
);
