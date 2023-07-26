import { LayoutColumn } from '../../common/layout';
import style from './style.css';
import { tracker, UserActionType } from '../../../tracking';

const HowToBuyImage = ({ pageKey = '', order }) => (
  <LayoutColumn cols={12} class={style.htbImage} order={order}>
    <img
      class={`${style.image} cursorPointer`}
      src='https://iccdn.in/img/instacred-offers/offer-htb-icon.png'
      alt='howToBuyImage'
      onClick={() => onClickAction(pageKey)}
    />
  </LayoutColumn>
);

const onClickAction = (pageKey) => {
  tracker.trackUserInteraction(UserActionType.CLICK, `HTB video icon`, pageKey);
  window.open('https://youtu.be/Vr30Sr1XoAs', '_blank');
};

export default HowToBuyImage;
