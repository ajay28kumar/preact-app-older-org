//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import withBaseComponent from '../../HOC/withBaseComponent';
import Spinner from '../../components/spinner/spinner';
import { Content } from '../../components/offers/Content';
import style from './style.css';
import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';
import offerAction from '../../actions/offerAction';
import actionType from '../../actions/offerAction/actionType';
import { connect } from 'react-redux';
import { apiStatus } from '../../actionTypes';
import type { ApiState } from '../../modelType';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  apiState: ApiState,
  matches: Object,
  uiComponents: Array<string>,
  campaignId?: string,
};

class Offers extends Component<Props> {
  pageKey = 'Offers Screen';

  componentDidMount() {
    let { campaignId } = this.props || {};
    if (!campaignId && this.props.matches) {
      campaignId = this.props.matches.utm_campaign;
    }
    this.props.offerAction(actionType.initializeOfferScreen, { campaignId });
  }
  seeMoreOffer = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Explore Other Merchants',
      this.pageKey,
    );
    route(`${buyWithInstacredLandingRoute.path}${window.location.search}`);
  };

  render() {
    const { apiState, uiComponents } = this.props || {};

    return (
      <div class={style.fullWidthContainer}>
        {apiState === apiStatus.SUCCESS ? (
          <div class={style.mainContainer}>
            {uiComponents.map((item) => {
              return <Content contentType={item} pageKey={this.pageKey} />;
            })}
            <div
              class={`text-underline ${style.bottomNavigation} cursorPointer`}
              onClick={this.seeMoreOffer}>
              Explore other merchants on InstaCred
            </div>
          </div>
        ) : (
          <div className='loaderContainer'>
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ buyWithInstacred }) => {
  const { offers, home } = buyWithInstacred || {};
  const { apiState, uiComponents } = offers || {};
  const { campaignId } = home || {};
  return {
    apiState,
    uiComponents,
    campaignId,
  };
};

export default connect(
  mapStateToProps,
  { offerAction },
)(withBaseComponent(Offers));
