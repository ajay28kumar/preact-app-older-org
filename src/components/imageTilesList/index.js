import { Component } from 'preact';
import { route } from 'preact-router';
import Merchant from '../common/merchant';
import Modal from '../common/modal';
import style from './style.css';
import TilesContainer from '../buyWithInstacredLanding/tilesContainer';
import { howToBuyRoute } from '../../alias/homeRoutes';
import { tracker, UserActionType } from '../../tracking';

export default class ImageTilesList extends Component {
  state = {
    seeMoreContent: '',
  };

  dialogRef = (dialog) => (this.dialog = dialog);

  showSeeMoreDailog = () => this.dialog.MDComponent.show();

  seeMore = (event, descriptionText) => {
    event.stopPropagation();
    this.setState({
      seeMoreContent: descriptionText,
    });
    this.showSeeMoreDailog();
  };

  clickAction = (tileObject, index) => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      `${this.props.header} Tile Rank - ${index + 1}`,
      this.props.pageKey,
      { name: tileObject.name },
    );
    const path = howToBuyRoute.path.replace(':handle', tileObject.handle);
    if (path && tileObject.type !== 'UPCOMING') {
      route(path);
    }
  };

  additionalButtonAction = (actionRoute) => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      `${this.props.title} See More`,
      this.props.pageKey,
      '',
    );
    return route(`${actionRoute}${window.location.search}`);
  };

  render(props) {
    return (
      <TilesContainer
        title={this.props.title || ''}
        additionalButton={props.additionalButton}
        additionalButtonAction={() =>
          this.additionalButtonAction(props.additionalButtonAction)
        }>
        <div className={style.tileImageContainer}>
          {this.props.content.map((tile, index) => {
            return (
              <Merchant
                tile={tile}
                clickMerchant={() => this.clickAction(tile, index)}
                seeMore={this.seeMore}
              />
            );
          })}
          {props.additionalLink ? (
            <div className='text-center' style={{ padding: 12 }}>
              <span className={style.showMoreLink}>{props.additionalLink}</span>
            </div>
          ) : null}
          <Modal
            dialogRef={this.dialogRef}
            header
            footer
            seeMoreContent={this.state.seeMoreContent}
          />
        </div>
      </TilesContainer>
    );
  }
}
