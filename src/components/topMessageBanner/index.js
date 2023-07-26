import style from './style.css';

const TopMessageBanner = (props) => {
  const { showBanner, bannerType, message } = props || {};
  const { successBanner, errorBanner } = style;
  return (
    <div className={showBanner ? 'show' : 'hidden'}>
      <div
        className={`${bannerType === 'success' ? successBanner : errorBanner}`}>
        {message}
      </div>
    </div>
  );
};

TopMessageBanner.defaultProps = {
  bannerType: 'error',
};

export default TopMessageBanner;
