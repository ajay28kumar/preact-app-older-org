import style from './style.css';

const NoResult = () => {
  return (
    <div className={style.noResultContainer}>
      <div className={`material-icons errorColor ${style.errorIcon}`}>
        sentiment_dissatisfied
      </div>
      <div className='font16 text-center bold-text'>
        Sorry, no results found!
      </div>
      <div className='font14 text60 text-center'>
        Please check the spelling or try searching for something else
      </div>
    </div>
  );
};

export default NoResult;
