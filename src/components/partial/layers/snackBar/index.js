import { Component } from 'preact';
import { connect } from 'react-redux';
import style from './style.css';
import { HIDE_SNACKBAR } from '../../../../actionTypes';

class SnackBar extends Component {
  componentDidUpdate(previousProps) {
    const { showBanner, hideSnackBar, callBackAction } = this.props || {};
    if (showBanner && showBanner !== previousProps.showBanner) {
      setTimeout(() => {
        hideSnackBar();
        callBackAction && callBackAction();
      }, 3000);
    }
  }

  render() {
    const { showBanner, bannerType, message } = this.props || {};
    const { successBanner, errorBanner } = style;
    return (
      <div className={showBanner ? 'show' : 'hidden'}>
        {message && (
          <div
            id='snackbar-message'
            className={`${
              bannerType === 'success' ? successBanner : errorBanner
            }`}>
            {message}
          </div>
        )}
      </div>
    );
  }
}

SnackBar.defaultProps = {
  bannerType: 'error',
};

const mapStateToProps = ({ layers }) => {
  const { snackBar } = layers || {};
  const { showSnackBar, message, type, callBackAction } = snackBar || {};
  return {
    showBanner: showSnackBar,
    message,
    bannerType: type,
    callBackAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSnackBar: () => dispatch({ type: HIDE_SNACKBAR, payload: {} }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackBar);
