import style from './style.css';

export const ComingSoonPill = () => {
  return (
    <span className={style.comingSoonContainer}>
      <span className={style.comingSoonPill}>
        <img src='https://iccdn.in/web-assets/coming-soon.svg' />
      </span>
    </span>
  );
};
