/** @jsx h */
import { h } from 'preact';
import RequestButton from '../../../../requestButton';
import { isMobile } from '../../../../../utils/helper';
import actionType from '../../../../../actions/widgetActivationAction/actionType';
import { apiStatus } from '../../../../../actionTypes';
import style from '../../style.css';
import NtbSuccessScreen from './ntbSuccessScreen';

const NtbDetails = (props) => {
  const {
    metadata,
    pageKey,
    contactNumber,
    sendNTBSmsState,
    checkEligibleAction,
    communicateDataToParent,
  } = props || {};
  if (sendNTBSmsState === apiStatus.SUCCESS) {
    return (
      <NtbSuccessScreen
        visibilityTimeUntilRedirect={5}
        submitFormCallback={() => {
          communicateDataToParent({
            actionType: 'CLICK',
            actionName: 'closeBottomPanel',
            contactNumber,
          });
        }}
      />
    );
  }
  return (
    <div className={style.ntbContainer}>
      <div className={`${style.textNTBInfo} line-height-20 font16`}>
        Get new Credit line approval in{' '}
        <span className='text-color bold-text'>5 minutes</span>
      </div>
      <RequestButton
        buttonId='sms-btn'
        buttonText={isMobile ? 'Download InstaCred App' : 'GET LINK ON SMS'}
        pageKey={pageKey}
        metadata={metadata}
        elementName='get_link_btn'
        buttonOnClick={() => {
          checkEligibleAction(actionType.sendSMSLink, {
            contactNumber,
          });
          if (isMobile) {
            window.open(
              'https://play.google.com/store/apps/details?id=me.instacred.instantcredit',
            );
          }
        }}
        requestStatus={sendNTBSmsState === apiStatus.INITIATED}
        buttonWrapperClass={style.ntbButton}
      />
    </div>
  );
};

export default NtbDetails;
