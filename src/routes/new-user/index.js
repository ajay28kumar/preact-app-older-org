/** @jsx h */
import { h, Component } from 'preact';
import Redirect from '../../components/redirect';
import { activationStepsRoute } from '../../alias/activationRoutes';

class NewUserActivation extends Component {
  render() {
    const { lenderId, campaignId } = this.props.matches || {};
    const path = `${activationStepsRoute.path}?${
      lenderId ? `lender=${lenderId}&utm_source=${lenderId}&` : ''
    }${campaignId ? `utm_campaign=${campaignId}` : ''}`;
    return <Redirect to={path} replace={true} />;
  }
}

export default NewUserActivation;
