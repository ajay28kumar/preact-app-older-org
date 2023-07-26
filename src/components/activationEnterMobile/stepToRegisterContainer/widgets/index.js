import MobileNumberWidget from './mobileNumberWidget';
import OtpWidget from './OtpWidget';

const Widgets = (props) => {
  const {
    shouldDisplayOTPScreen,
    seeMoreClicked,
    campaignId,
    errorMsg,
    pageKey,
    mobileNumber,
    updateMobileNumber,
    activationActionCallBack,
  } = props;
  if (shouldDisplayOTPScreen) {
    return (
      <OtpWidget
        pageKey={pageKey}
        mobileNumber={mobileNumber}
        campaignId={campaignId}
      />
    );
  }
  return (
    <MobileNumberWidget
      seeMoreClicked={seeMoreClicked}
      campaignId={campaignId}
      errorMsg={errorMsg}
      pageKey={pageKey}
      mobileNumber={mobileNumber}
      updateMobileNumber={updateMobileNumber}
      activationActionCallBack={activationActionCallBack}
    />
  );
};

export default Widgets;
