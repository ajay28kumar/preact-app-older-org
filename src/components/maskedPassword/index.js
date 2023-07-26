import style from './style.css';

const MaskedIcon = ({ maskCallBack, maskedState }) => {
  return (
    <div
      className={style.maskedIcon}
      onClick={() => maskCallBack(!maskedState)}>
      <i className='material-icons'>
        {maskedState ? 'visibility' : 'visibility_off'}
      </i>
    </div>
  );
};

export default MaskedIcon;
