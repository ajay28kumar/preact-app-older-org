import Icon from 'preact-material-components/Icon';
import style from './style.css';

const NoResult = ({ message }) => {
  return (
    <div class={style.noResultContainer}>
      <div>
        <Icon class={style.noResultIcon}>not_interested</Icon>
        <div class={style.noResultText}>{message}</div>
      </div>
    </div>
  );
};

export default NoResult;
