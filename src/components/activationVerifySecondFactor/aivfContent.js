//@flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import { aivfPropsHelper } from './helper';
import MuiInput from '../material-ui/muiInput';
import RequestButton from '../requestButton';
import { apiStatus } from '../../actionTypes';
import { getNumericValue } from '../../utils/stringOperations';
import withBaseComponent from '../../HOC/withBaseComponent';
import ExitLayer from '../common/exitLayer';
import 'preact-material-components/Dialog/style.css';
import style from '../verificationSecondFactor/style.css';
import type { AivfType, ApiState } from '../../modelType';
import { tracker, UserActionType } from '../../tracking';

type Props = {
  pageKey: string,
  aivfType: AivfType,
  lenderName: string,
  errorMsg?: string,
  verificationStatus: ApiState,
  onVerifyCreditLineCallBack: Function,
};

type State = {
  aivfValue: string,
};

class AivfContent extends Component<Props, State> {
  pageKey = this.props.pageKey;
  state = {
    aivfValue: '',
  };
  setAivfValue = (aivfValue) => {
    this.setState({ aivfValue });
  };
  render() {
    const {
      pageKey,
      aivfType,
      lenderName,
      errorMsg,
      verificationStatus,
      onVerifyCreditLineCallBack,
    } = this.props;
    const {
      title,
      buttonText,
      aboutAivfText,
      dialogueHeader,
      dialogueBody,
    } = aivfPropsHelper({
      aivfType,
      lenderName,
    });
    return (
      <Fragment>
        <ExitLayer preventBrowserBack={false} pageKey={this.pageKey} />
        <div className={style.titleContainer}>
          <div className='font20 text80 bold-text text-center'>
            {' '}
            Verify Account
          </div>
        </div>
        <div className={style.inputContainer}>
          <div className={style.titleField}>
            <div className='font14 text60 bold-text'>{title}</div>
          </div>
          <div className={style.debitCardInput}>
            <MuiInput
              outlined
              autoFocus={true}
              isError={!!errorMsg}
              inputName='debitCardNumber'
              inputPlaceholder='Enter Last 4 digits'
              inputID='debit-card'
              inputValue={this.state.aivfValue}
              className='aivf-input'
              maxLength={4}
              minLength={4}
              pageKey={this.pageKey}
              elementName={'aivf_input_aivf'}
              onChange={(e) =>
                this.setAivfValue(getNumericValue(e.target.value))
              }
            />
          </div>
        </div>
        <div className='inputError' id='debitCardVerification'>
          {errorMsg}
        </div>
        <div
          className='font14 text-color cursorPointer'
          onClick={() => {
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              'help_text',
              pageKey,
            );
            this.dialogRef.MDComponent.show();
          }}>
          {aboutAivfText}
        </div>
        <div className={style.verifyMobileActionContainer}>
          <RequestButton
            loadingMsg='Please Wait..'
            buttonOnClick={() => {
              onVerifyCreditLineCallBack(this.state.aivfValue);
            }}
            buttonDisabled={this.state.aivfValue.length !== 4}
            pageKey={this.pageKey}
            elementName='aivf_confirm'
            buttonText={buttonText}
            requestStatus={verificationStatus === apiStatus.INITIATED}
          />
        </div>
        <Dialog
          ref={(dialogRef) => {
            this.dialogRef = dialogRef;
          }}>
          <Dialog.Header>
            <div className='font18 bold-text text-color'>{dialogueHeader}</div>
          </Dialog.Header>
          <Dialog.Body>
            <p>{dialogueBody}</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton
              cancel={true}
              onClick={() => this.dialogRef.MDComponent.destroy()}>
              <div className='primary-color bold-text'>Okay</div>
            </Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </Fragment>
    );
  }
}

export default withBaseComponent(AivfContent);
