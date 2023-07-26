import { Component, Fragment } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import RequestButton from '../requestButton';
import 'preact-material-components/Dialog/style.css';
import style from './style.css';
import withBaseComponent from '../../HOC/withBaseComponent';
import MuiInput from '../material-ui/muiInput';
import { tracker, UserActionType } from '../../tracking';

class DebitCardVerification extends Component {
  pageKey = this.props.pageKey;
  state = {
    debitCardNumber: '',
    errorMsg: this.props.errorMsg,
  };

  componentDidUpdate(previousProps) {
    if (this.props.errorMsg !== previousProps.errorMsg) {
      this.setState({
        errorMsg: this.props.errorMsg,
      });
    }
  }

  updateDebitCard = (event) => {
    const text = event.target.value;
    const debitCardNumber = text ? text.replace(/[^0-9]/g, '') : '';
    this.setState({
      debitCardNumber,
      errorMsg: '',
    });
  };
  onSubmit = () => {
    this.props.verifySecondFactor(this.state.debitCardNumber);
  };
  render() {
    return (
      <Fragment>
        <div style='object-fit: contain;margin-top: 45px;'>
          <img
            src='https://iccdn.in/img/debit-card-v3.svg'
            style='opacity: 0.5; width:100px;'
          />
        </div>
        <div class={style.singleDigitFieldsInput}>
          <p class={style.titleField}>Enter Last 4 digits of Debit Card</p>
          <div class={style.inputContainer}>
            <div class={style.debitCardInput}>
              <MuiInput
                outlined
                autoFocus={true}
                inputName='debitCardNumber'
                inputLabel='Enter Last 4 Digits'
                inputID='debit-card'
                inputValue={this.state.debitCardNumber}
                className='aivf-input'
                maxLength={4}
                minLength={4}
                pageKey={this.props.pageKey}
                elementName={'aivf_input_aivf'}
                leadingIcon='credit_card'
                onChange={this.updateDebitCard}
              />
            </div>
          </div>
          <div className='inputError' id='debitCardVerification'>
            {this.state.errorMsg}
          </div>
          <div
            className='text12 linkColor text-center cursorPointer'
            onClick={() => {
              tracker.trackUserInteraction(
                UserActionType.CLICK,
                'No Debit Card Btn',
                this.props.pageKey,
              );
              this.dialogRef.MDComponent.show();
            }}>
            Do not have a Debit card?
          </div>
          <div className={style.verifyMobileActionContainer}>
            <RequestButton
              loadingMsg='Please Wait..'
              buttonOnClick={this.onSubmit}
              buttonDisabled={this.state.debitCardNumber.length !== 4}
              buttonText='Verify Debit Card'
              pageKey={this.props.pageKey}
              elementName='aivf_confirm'
              requestStatus={this.props.verificationStatus === 'request'}
            />
          </div>
        </div>
        <Dialog
          ref={(dialogRef) => {
            this.dialogRef = dialogRef;
          }}>
          <Dialog.Header>
            <div
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: 'var(--primaryThemeColor)',
              }}>
              Don't have your Kotak Mahindra Debit Card?
            </div>
          </Dialog.Header>
          <Dialog.Body>
            <p className={style.dialogText}>
              Debit Card is required to activate InstaCred Cardless EMI
              facility. We confirm your identity with the debit card, please try
              again with any of your Kotak Mahindra Debit cards.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton
              cancel={true}
              onClick={() => this.dialogRef.MDComponent.destroy()}>
              <div style={{ color: 'var(--primaryThemeColor)' }}>Okay</div>
            </Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </Fragment>
    );
  }
}

export default withBaseComponent(DebitCardVerification);
