import { Component } from 'preact';
import Utils, { clearLocalstorage, clearSessionStorage } from '../../utils';
import Contents from '../../components/login/content';
import { connect } from 'react-redux';
import bicAction from '../../actions/bicAction';
import bicActionType from '../../actions/bicAction/actionType';
import style from '../../components/login/style.css';
import LenderBrands from '../../components/common/lenderBrands';
import BenefitList from '../../components/common/benefitList';

class Login extends Component {
  state = {
    initialScreenHeight: window.innerHeight,
    currentScreenHeight: window.innerHeight,
  };
  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.bicAction(bicActionType.initializeLogin, { campaignId });
    Utils.deleteAuthToken();
    clearSessionStorage();
    clearLocalstorage();
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState(
      {
        currentScreenHeight: window.innerHeight,
      },
      () => {
        const verticalScrollHeight =
          this.state.initialScreenHeight > this.state.currentScreenHeight
            ? 300
            : 0;
        scrollTo(0, verticalScrollHeight);
      },
    );
  };

  render() {
    return (
      <div className={style.mobileContainer}>
        <div
          className={`${
            style.loginHeader
          } font20 text80 bold-text text-center`}>
          Login to InstaCred
        </div>
        <Contents />
        <BenefitList />
        <LenderBrands />
      </div>
    );
  }
}

export default connect(
  null,
  { bicAction },
)(Login);
