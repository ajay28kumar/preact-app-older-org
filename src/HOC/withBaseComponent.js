/** @jsx h */
import { h, Component } from 'preact';
import { createRef } from 'preact/compat';
import { connect } from 'react-redux';
import { commonActionType } from '../actionTypes';
import { PageLoadType, tracker } from '../tracking';

const withBaseComponent = (WrappedComponent) => {
  const mapStateToProps = ({ config, registrationUserData }) => {
    const { template } = config || {};
    const { lenderId } = registrationUserData || {};
    return {
      template,
      lenderId,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      updatePageKey: ({ pageKey, metadata }) =>
        dispatch({
          type: commonActionType.UPDATE_PAGE_KEY,
          payload: { pageKey, metadata },
        }),
    };
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    class extends Component {
      ref = createRef();
      componentDidMount() {
        const { pageLoadType, pageKey, metadata } = this.ref.current || {};
        if (pageKey) {
          tracker.trackPageView(
            pageLoadType || PageLoadType.DYNAMIC,
            pageKey,
            metadata,
          );
          this.props.updatePageKey({ pageKey, metadata });
        }
      }
      render() {
        return <WrappedComponent {...this.props} ref={this.ref} />;
      }
    },
  );
};

export default withBaseComponent;
