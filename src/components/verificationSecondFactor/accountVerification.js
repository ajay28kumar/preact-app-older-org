import { Component, Fragment } from 'preact';
import withBaseComponent from '../../HOC/withBaseComponent';
import RequestButton from '../requestButton';
import MuiInput from '../material-ui/muiInput';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';

class AccountVerification extends Component {
  pageKey = this.props.pageKey;
  state = {
    accountNumber: '',
    errorMsg: this.props.errorMsg,
  };
  componentDidUpdate(previousProps) {
    if (this.props.errorMsg !== previousProps.errorMsg) {
      this.setState({
        errorMsg: this.props.errorMsg,
      });
    }
  }

  updateAccountNumber = (event) => {
    const text = event.target.value;
    const accountNumber = text ? text.replace(/[^0-9]/g, '') : '';
    this.setState({
      accountNumber,
      errorMsg: '',
    });
    if (accountNumber.length === 4) {
      tracker.trackUserInteraction(
        UserActionType.INPUT_ENTERED,
        'aivf_input_aivf',
        this.props.pageKey,
        '',
      );
    }
  };
  onSubmit = () => {
    this.props.verifySecondFactor(this.state.accountNumber);
  };
  render() {
    return (
      <Fragment>
        <div style='object-fit: contain;margin-top: 45px;'>
          <i className='material-icons' style={{ fontSize: 100, opacity: 0.5 }}>
            account_balance
          </i>
        </div>
        <div class={style.singleDigitFieldsInput}>
          <p class={style.titleField}>Enter Last 4 digits of Account Number</p>
          <div class={style.inputContainer}>
            <div class={style.debitCardInput}>
              <MuiInput
                outlined
                autoFocus={true}
                inputName='accountNumberInput'
                inputLabel='Enter Last 4 Digits'
                inputID='account-number'
                inputValue={this.state.accountNumber}
                className='account-input'
                maxLength='4'
                minLength='4'
                leadingIcon='account_balance'
                onChange={this.updateAccountNumber}
                pageKey={this.props.pageKey}
              />
            </div>
          </div>
          <div className={style.errorText} id='accountNumberVerification'>
            {this.state.errorMsg}
          </div>
          <div className={style.verifyMobileActionContainer}>
            <RequestButton
              loadingMsg='Please Wait..'
              buttonOnClick={this.onSubmit}
              buttonDisabled={this.state.accountNumber.length !== 4}
              buttonText='Continue To Verify'
              pageKey={this.props.pageKey}
              elementName='aivf_confirm'
              requestStatus={this.props.verificationStatus === 'request'}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withBaseComponent(AccountVerification);
