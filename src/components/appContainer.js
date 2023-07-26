/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import {
  getStorageLenderId,
  lenderTheme,
  storeLenderId,
} from '../utils/lenderTheme';
import { Container } from './partial';
import SnackBar from './partial/layers/snackBar';
import onAppInit from '../actions/onAppInit';
import actionType from '../actions/onAppInit/actionType';
import Utils from '../utils';
import Modal from './partial/layers/modals';

class AppContainer extends Component {
  pageKey = 'AppContainer';

  componentDidMount() {
    const url = window.location.hostname.split('.')[0];
    const lenderDetails = Object.keys(lenderTheme).filter((lenderId) => {
      return url.includes(lenderTheme[lenderId].subDomainName);
    });
    /**
     * getting lenderId here
     * priority is subDomain => lenderId from localstorage => default(instaCred)
     * @type {string | string}
     */
    const lenderId = lenderDetails[0] || getStorageLenderId() || '';
    storeLenderId(lenderId);
    const themeName = lenderTheme[lenderId];
    this.props.onAppInit(actionType.initialize, {
      lenderDetails: { ...themeName, id: lenderId },
    });
  }

  componentDidUpdate(previousProps) {
    const { template, lenderId } = this.props || {};
    const { template: prevTemplate, lenderId: prevLenderId } =
      previousProps || {};

    if (
      (lenderId && lenderId !== prevLenderId) ||
      (template && template !== prevTemplate)
    ) {
      if (lenderId && lenderId !== prevLenderId) {
        storeLenderId(lenderId);
      }
      this.onAction(actionType.updateTemplate, { template });
      if (lenderTheme[lenderId]) {
        this.updateTheme(lenderTheme[lenderId].theme);
      } else {
        this.updateTheme(lenderTheme['instaCred'].theme);
      }
    }
  }

  updateTheme = (theme) => {
    const { template } = this.props;
    if (
      template === 'payment' ||
      template === 'login' ||
      template === 'common' ||
      template === 'widget' ||
      template === 'neutral'
    ) {
      return Utils.applyLenderTheme('instaCred');
    }
    Utils.applyLenderTheme(theme || this.props.theme);
  };

  onAction = (actionType, ...rest) => {
    this.props.onAppInit(actionType, ...rest);
  };

  render() {
    return (
      <Fragment>
        <SnackBar />
        <Modal />
        <Container>{this.props.children}</Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ registrationUserData, config }) => {
  const { lenderDetails } = config;
  const { theme } = lenderDetails;
  const { lenderId } = registrationUserData;
  return {
    lenderId,
    theme,
  };
};

export default connect(
  mapStateToProps,
  { onAppInit },
)(AppContainer);
