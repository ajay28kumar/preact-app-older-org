import style from './style.css';

const LightBox = ({ videoUrl, hideVideoLightbox }) => {
  return (
    <div className={style.lightboxContainer} id='lightBox'>
      <div id={style.videoFrame}>
        <span className={style.closeAction} onClick={hideVideoLightbox}>
          &#10006;
        </span>
        <iframe src={videoUrl} allowFullScreen />
      </div>
    </div>
  );
};

export default LightBox;
