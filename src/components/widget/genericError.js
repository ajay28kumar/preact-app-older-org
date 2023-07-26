/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { Button } from 'preact-material-components';

const GenericError = () => {
  return (
    <div className={style.errorContainer}>
      <div className={style.errorBody}>
        <div className='font20'>Oops!</div>
        <div className='font16 text80'> Something Went Wrong</div>
        <Button
          outlined
          onClick={() => window.location.reload()}
          className={style.errorButton}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default GenericError;
