// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { tracker, UserActionType } from '../../../tracking';
import { connect } from 'react-redux';
import { modalType } from '../../../actions/onModalAction/actionType';

type Props = {
  /**
   * optional field added to exitLayer to prevent browser back (optional)
   * default value is true
   * @property {boolean}
   */
  preventBrowserBack: boolean,
  /**
   * pageKey of component (optional)
   * @property {string}
   */
  pageKey?: string,
  /**
   * redirection url on exit the page (optional)
   * @property {string}
   */
  exitPath?: string,
};

class ExitLayer extends Component<Props> {
  pageKey = this.props.pageKey || 'Missing PageKey';
  componentDidMount() {
    if (this.props.preventBrowserBack) {
      window.onpopstate = () => this.handlePopState();
    }
    window.addEventListener('beforeunload', this.onUnload);
  }
  componentWillUnmount() {
    this.removeListener();
  }
  componentDidUpdate(prevProps) {
    //Adding this condition so that there won't be any popup to prevent page-leave
    const { template: prevTemplate } = prevProps || {};
    const { template } = this.props || {};
    if (
      template === modalType.cancelTransactionModal &&
      prevTemplate !== template
    ) {
      this.removeListener();
    }
  }
  removeListener = () => {
    window.removeEventListener('beforeunload', this.onUnload);
  };
  onUnload = (e: Object = {}) => {
    const confirmMessage = 'Your transaction will be cancelled.';
    e.preventDefault();
    e.returnValue = confirmMessage;
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Browser Refresh',
      this.pageKey,
      '',
    );

    return confirmMessage;
  };
  handlePopState = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Back Btn',
      this.pageKey,
      '',
    );

    const result = confirm(
      'Do not click Back, you will have to restart your session!',
    );
    if (result) {
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Confirm Back Btn',
        this.pageKey,
        '',
      );
    } else {
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Decline Back Btn',
        this.pageKey,
        '',
      );
      window.history.pushState(null, null, this.props.exitPath || '/');
    }
  };
  render() {
    return null;
  }
}

ExitLayer.defaultProps = {
  preventBrowserBack: true,
};

const mapStateToProps = ({ modal }) => {
  const { template } = modal || {};
  return {
    template,
  };
};

export default connect(mapStateToProps)(ExitLayer);
