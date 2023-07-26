import Card from 'preact-material-components/Card';
import { ComingSoonPill } from './comingSoonPill';
import 'preact-material-components/Card/style.css';
import { textTruncate } from '../../../utils/stringOperations';
import style from './style.css';

const Merchant = ({ tile, ...props }) => {
  return (
    <div
      onClick={() =>
        tile.bicStatus !== 'UPCOMING' ? props.clickMerchant() : ''
      }
      className={`${style.tile} ${style.inlineBlock}`}>
      <Card class={style.card}>
        <div>
          {tile.bicStatus === 'UPCOMING' && <ComingSoonPill />}
          <img src={tile.mobileImgUrl} class={style.merchantImage} />
        </div>
        <div>
          <div className={style.tileDescription}>
            <div className={style.tileDescriptionHeader}>{tile.name}</div>
            <div className={style.tileDescriptionContent}>
              <span className={style.descriptionFade}>
                {textTruncate(tile.description, 50)}
              </span>
              {tile.description.length > 50 && (
                <span
                  className={style.seeMoreWrapper}
                  onClick={(event) => props.seeMore(event, tile)}>
                  See More
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Merchant;
