import { h } from 'preact';
import style from './style.css';

const CloseIcon = ({ communicateDataToParent }) => {
  return (
    <img
      src='https://iccdn.in/img/widget-img/widget-close-overlay.svg'
      alt='back'
      id='close-button'
      className={style.backArrow}
      onClick={() =>
        communicateDataToParent({
          actionType: 'CLICK',
          actionName: 'closeBottomPanel',
        })
      }
    />
  );
};

export default CloseIcon;
