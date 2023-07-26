// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { tracker, UserActionType } from '../../../tracking';
import { connect } from 'react-redux';
import { modalType } from '../../../actions/onModalAction/actionType';

type Props = {
  /**
   * pageKey of component (optional)
   * @property {string}
   */
  pageKey?: string,
  /**
   * elementName of component (optional)
   * @property {string}
   */
  elementName?: string,
};

class BrowserExitTracking extends Component<Props> {
  pageKey = this.props.pageKey || 'Missing PageKey';
  componentDidMount() {
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
    const elementName = this.props.elementName || 'Missing Element Name';
    e.preventDefault();
    return tracker.trackUserInteraction(
      UserActionType.CLICK,
      elementName,
      this.pageKey,
      '',
    );
  };

  render() {
    return null;
  }
}

const mapStateToProps = ({ modal }) => {
  const { template } = modal || {};
  return {
    template,
  };
};

export default connect(mapStateToProps)(BrowserExitTracking);
