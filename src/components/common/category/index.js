// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { textTruncate } from '../../../utils/stringOperations';
import type { CategoryType } from '../../../modelType/bicType';
import { getStorageLenderId } from '../../../utils/lenderTheme';

type Props = {
  lenderId: string,
  tile: CategoryType,
  tileClickAction: Function,
};

const Category = ({
  lenderId = getStorageLenderId(),
  tile,
  tileClickAction,
}: Props) => {
  return (
    <div
      onClick={tileClickAction}
      className={`${style.tileContainer} cursorPointer`}>
      <div className={style.imageContainer}>
        <div
          style={{
            backgroundImage: `url(${tile.desktopImgUrl})`,
          }}
          className={`${style.image} ${
            lenderId && lenderId !== 'instaCred' ? style.filterImage : ''
          }`}
        />
      </div>
      <div className={style.tileDescription}>
        <h2 className='font14 text80 text-center margin0'>{tile.name}</h2>
        {tile.description && (
          <p className={`margin0 ${style.tileDescriptionContent} `}>
            {!tile.description
              ? ''
              : tile.description.length < 27
              ? tile.description
              : `${textTruncate(tile.description, 25)}..`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
