import { Component } from 'preact';
import withBaseComponent from '../../HOC/withBaseComponent';
import Utils, { getSessionStorage } from '../../utils';
import ActivationLender from '../../components/lenderHeader';

import style from './style';

class RegistrationFailure extends Component {
  pageKey = 'Registration Failure';
  utils = new Utils();

  state = {
    firstName: '',
  };

  componentDidMount() {
    this.initializeUserData();
  }

  initializeUserData = () => {
    if (getSessionStorage('firstName') != null) {
      this.setState({
        firstName: getSessionStorage('firstName'),
      });
    }
  };

  render() {
    return (
      <div class={`${style.registration}`}>
        <ActivationLender
          selectedRoute={this.state.currentUrl}
          showHeader={true}
          pageKey={this.pageKey}
        />
        <div align='center' id='parent' class={`${style.debitCardContainer}`}>
          <div style='height: 100%;padding-top: 60px;'>
            <div class={`${style.header}`}>
              Something Went Wrong {this.state.firstName}!
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withBaseComponent(RegistrationFailure);
