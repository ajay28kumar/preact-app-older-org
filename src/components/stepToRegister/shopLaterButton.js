import style from './style.css';
import Spinner from '../spinner/spinner';

const ShopLaterButton = ({ shopLaterStatus, shopLater }) => {
  return (
    <div>
      {!shopLaterStatus ? (
        <div
          className={style.shopLaterContainer}
          onClick={shopLater}
          id='shopLaterDiv'>
          <span className='cursorPointer'>I want to shop later</span>
        </div>
      ) : (
        <div>
          <Spinner />
          <div className={style.loaderText} style='margin:24px;'>
            Please wait...
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopLaterButton;
