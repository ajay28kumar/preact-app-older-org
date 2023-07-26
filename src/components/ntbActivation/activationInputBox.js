import style from '../../routes/ntb-activation/style.css';
import MuiInput from '../material-ui/muiInput';
import { getNumericValue } from '../../utils/stringOperations';
import RequestButton from '../requestButton';
import actionType from '../../actions/ntbAction/actionType';

const ActivationInputBox = (props) => {
  const { pageKey, mobileNo, merchantId, onChange, ntbAction, channel } =
    props || {};

  return (
    <div className={style.inputContainer}>
      <MuiInput
        inputID='topMobile'
        inputPlaceholder='Enter Mobile No.'
        pageKey={pageKey}
        maxLength={10}
        minLength={10}
        inputValue={mobileNo}
        inputType='tel'
        className={`font14 ${style.inputBox}`}
        onChange={(e) => {
          const mobileNo = getNumericValue(e.target.value);
          return onChange(mobileNo);
        }}
      />
      <RequestButton
        buttonDisabled={mobileNo.length !== 10}
        buttonId='eligibility-button'
        loadingMsg='Verifying...'
        pageKey={pageKey}
        buttonWrapperClass={`font14 ${style.submitButton}`}
        elementName='Verify Mobile Number'
        buttonText='Start'
        buttonOnClick={() => {
          return ntbAction(actionType.sendOTP, {
            mobile: mobileNo,
            merchantId,
            channel,
          });
        }}
        requestStatus={false}
      />
    </div>
  );
};

export default ActivationInputBox;
