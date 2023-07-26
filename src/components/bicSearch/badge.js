/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const Badge = ({ count }) => {
  if (count === 0) {
    return null;
  }
  return (
    <div className={style.badgeContainer}>
      <div className={style.badgeCircle}>
        <div className={style.badgeCount}>{count}</div>
      </div>
    </div>
  );
};

export default Badge;
