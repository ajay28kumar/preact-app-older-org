import { Component } from 'preact';
import Utils, { getSessionStorage } from '../../utils';
import style from './style';
import PaymentHeader from '../../components/payment/PaymentHeader';
import withBaseComponent from '../../HOC/withBaseComponent';

class RegistrationSuccess extends Component {
  utils = new Utils();

  state = {
    firstName: '',
  };

  componentDidMount() {
    this.initializeUserData();
  }

  initializeUserData() {
    if (getSessionStorage('firstName') != null) {
      this.setState({
        firstName: getSessionStorage('firstName'),
      });
    }
  }

  render() {
    return (
      <div class={`${style.registrationSuccess}`}>
        <PaymentHeader headerText={'Completed Successful'} />
        <div align='center' id='parent' class={`${style.debitCardContainer}`}>
          <div style='height: 100%;padding-top: 60px;'>
            <div class={`${style.header}`}>
              Congratulations {this.state.firstName}!
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withBaseComponent(RegistrationSuccess);
