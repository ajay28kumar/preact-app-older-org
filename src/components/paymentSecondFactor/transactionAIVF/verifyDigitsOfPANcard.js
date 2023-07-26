// @flow
/** @jsx h */
import { Component, h } from 'preact';
import style from '../style.css';
import NumericTextBox from './numericTextBox';
import { apiStatus } from '../../../actionTypes';
import { tracker, UserActionType } from '../../../tracking';

class VerifyDigitsOfPANcard extends Component {
  state = {
    aivfValueFirstDigit: '',
    aivfValueSecondDigit: '',
    aivfValueThirdDigit: '',
    aivfValueFourthDigit: '',
  };
  componentDidMount() {
    const node = document.getElementById('aivfValueDigit1');
    node.focus();
  }

  updateAivfValue = () => {
    const { updateAivf } = this.props || {};
    const {
      aivfValueFirstDigit,
      aivfValueSecondDigit,
      aivfValueThirdDigit,
      aivfValueFourthDigit,
    } = this.state || {};
    const aivfValue = `${aivfValueFirstDigit}${aivfValueSecondDigit}${aivfValueThirdDigit}${aivfValueFourthDigit}`;
    if (aivfValue.length === 4) {
      this.inputTracking();
    }
    updateAivf(aivfValue);
  };

  inputTracking = () => {
    const { metadata, pageKey } = this.props || {};
    tracker.trackUserInteraction(
      UserActionType.INPUT_ENTERED,
      'aivf_input_aivf',
      pageKey,
      metadata,
    );
  };

  onKeyPress = (event, type) => {
    switch (type) {
      case '1':
        if (
          event.key === 'ArrowRight' ||
          (event.key && event.key.replace(/[^0-9]/g, '').length === 1)
        ) {
          const node = document.getElementById('aivfValueDigit2');
          node.focus();
        }
        break;
      case '2':
        if (
          event.key === 'ArrowRight' ||
          (event.key && event.key.replace(/[^0-9]/g, '').length === 1)
        ) {
          const node = document.getElementById('aivfValueDigit3');
          node.focus();
        } else if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
          const node = document.getElementById('aivfValueDigit1');
          node.focus();
        }
        break;
      case '3':
        if (
          event.key === 'ArrowRight' ||
          (event.key && event.key.replace(/[^0-9]/g, '').length === 1)
        ) {
          const node = document.getElementById('aivfValueDigit4');
          node.focus();
        } else if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
          const node = document.getElementById('aivfValueDigit2');
          node.focus();
        }
        break;
      case '4':
        if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
          const node = document.getElementById('aivfValueDigit3');
          node.focus();
        }
        break;
      default:
        console.info('missing type in verify pan card onKeyup : ', type);
        break;
    }
  };
  render() {
    const MAX_LENGTH = 1;
    const { pageKey, confirmAivfApiState, errorMessage } = this.props || {};
    const {
      aivfValueFirstDigit,
      aivfValueSecondDigit,
      aivfValueThirdDigit,
      aivfValueFourthDigit,
    } = this.state || {};
    const isError = confirmAivfApiState === apiStatus.ERROR && errorMessage;
    return (
      <div className={style.inputBox}>
        <div className={style.panContainer}>
          <div className={style.iconContainer}>
            <div className={style.loaderTop} />
            <img
              className={style.emblemOfIndia}
              src='https://iccdn.in/img/emblem-of-india-logo.png'
            />
            <div className={style.loaderTop} />
          </div>
          <div className={`${style.loaders} ${style.loaderMiddle}`} />
          <div className={`${style.loaders} ${style.loaderBottom}`} />
          <div className={style.panInputContainer}>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
            <div className={style.inputContainerArea}>
              <NumericTextBox
                isError={isError}
                maxLength={MAX_LENGTH}
                pageKey={pageKey}
                aivfValue={aivfValueFirstDigit}
                elementId='aivfValueDigit1'
                className={style.inputbox}
                onKeyPress={(e) => this.onKeyPress(e, '1')}
                updateAivf={(e) => {
                  const text = e.target.value;
                  const aivfText = text ? text.replace(/[^0-9]/g, '') : '';
                  this.setState({ aivfValueFirstDigit: aivfText }, () => {
                    this.updateAivfValue();
                  });
                }}
              />
              <NumericTextBox
                isError={isError}
                maxLength={MAX_LENGTH}
                pageKey={pageKey}
                aivfValue={aivfValueSecondDigit}
                elementId='aivfValueDigit2'
                className={style.inputbox}
                onKeyPress={(e) => this.onKeyPress(e, '2')}
                updateAivf={(e) => {
                  const text = e.target.value;
                  const aivfText = text ? text.replace(/[^0-9]/g, '') : '';
                  this.setState({ aivfValueSecondDigit: aivfText }, () => {
                    this.updateAivfValue();
                  });
                }}
              />
              <NumericTextBox
                isError={isError}
                maxLength={1}
                pageKey={pageKey}
                aivfValue={aivfValueThirdDigit}
                elementId='aivfValueDigit3'
                className={style.inputbox}
                onKeyPress={(e) => this.onKeyPress(e, '3')}
                updateAivf={(e) => {
                  const text = e.target.value;
                  const aivfText = text ? text.replace(/[^0-9]/g, '') : '';
                  this.setState({ aivfValueThirdDigit: aivfText }, () => {
                    this.updateAivfValue();
                  });
                }}
              />
              <NumericTextBox
                isError={isError}
                maxLength={1}
                pageKey={pageKey}
                aivfValue={aivfValueFourthDigit}
                elementId='aivfValueDigit4'
                className={style.inputbox}
                onKeyPress={(e) => this.onKeyPress(e, '4')}
                updateAivf={(e) => {
                  const text = e.target.value;
                  const aivfText = text ? text.replace(/[^0-9]/g, '') : '';
                  this.setState({ aivfValueFourthDigit: aivfText }, () =>
                    this.updateAivfValue(),
                  );
                }}
              />
            </div>
            <div
              className={`${style.panCardDummyText} font16 bold-text text40`}>
              X
            </div>
          </div>
        </div>
        {confirmAivfApiState === apiStatus.ERROR && errorMessage && (
          <div className='inputError' id='aivfVerification'>
            {errorMessage}
          </div>
        )}
        <div className={`font14 text80 ${style.panCardInfo}`}>
          <span className='text-color'>e.g. </span>
          If your PAN Card number is{' '}
          <span className='font16'>
            AZZPZ<span className='text-color'>1234</span>Z
          </span>
          , then type <span className='bold-text'>1234</span>
        </div>
      </div>
    );
  }
}
export default VerifyDigitsOfPANcard;
