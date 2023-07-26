/** @jsx h */
import { Component, h } from 'preact';
import Button from 'preact-material-components/Button';
import Header from '../../header';
import { hashedMobileNumber } from '../../../../../utils/stringOperations';
import CheckEligibleBenefit from '../verifyOTPScreen/checkEligibleBenefit';
import NtbDetails from './ntbDetails';
import style from '../../style.css';
import { isMobile } from '../../../../../utils/helper';
import withBaseComponent from '../../../../../HOC/withBaseComponent';

class NonApprovedScreen extends Component {
  pageKey = this.props.isNtbAllowed ? 'pv_not_PA_ntb' : 'pv_not_PA';
  metadata = this.props.metadata;
  render() {
    const {
      isNtbAllowed,
      contactNumber,
      initScreen,
      checkEligibleAction,
      sendNTBSmsState,
      communicateDataToParent,
      trackUserAction,
    } = this.props || {};
    return (
      <div className={style.nonApprovedInfo}>
        <div>
          <div className='bold-text' id='number-not-approved-header'>
            {hashedMobileNumber(contactNumber)} is not currently pre-approved
          </div>
          {!isNtbAllowed && (
            <div className={style.buttonContainer}>
              <Button
                id='ok-got-it-btn'
                outlined
                className={style.outLineButton}
                onClick={() => {
                  trackUserAction('ok_got_it', this.pageKey, {
                    ...this.metadata,
                  });
                  communicateDataToParent({
                    actionType: 'CLICK',
                    actionName: 'closeBottomPanel',
                    widgetState: 'NotApproved',
                  });
                }}>
                Ok, Got It
              </Button>
              <div className={style.nonApprovedText}>
                <div
                  className='text-color text14 semi-bold-text cursorPointer'
                  onClick={() => {
                    trackUserAction('try_different_mobile', this.pageKey, {
                      ...this.metadata,
                    });
                    initScreen();
                  }}
                  id='try-different-mobile'>
                  Try with a different number >
                </div>
              </div>
            </div>
          )}
          {isNtbAllowed && (
            <NtbDetails
              metadata={this.metadata}
              pageKey={this.pageKey}
              contactNumber={contactNumber}
              sendNTBSmsState={sendNTBSmsState}
              trackUserAction={trackUserAction}
              checkEligibleAction={checkEligibleAction}
              communicateDataToParent={communicateDataToParent}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withBaseComponent(NonApprovedScreen);
