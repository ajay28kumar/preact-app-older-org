import style from './style.css';
import MuiInput from '../material-ui/muiInput';
import { getNumericValue } from '../../utils/stringOperations';
import { tracker, UserActionType } from '../../tracking';

export const OTPBox = ({ authValue, pageKey, updateAuthValue }) => {
  return (
    <div>
      <div className={`${style.inputName} font14 text60 bold-text`}>
        Enter OTP
      </div>
      <MuiInput
        pageKey={pageKey}
        inputType='tel'
        minLength={5}
        maxLength={5}
        inputPlaceholder='5 digit OTP'
        inputID='authValue'
        inputValue={authValue}
        onChange={(e) => {
          const password = getNumericValue(e.target.value);
          updateAuthValue(password);
          if (password === 5) {
            tracker.trackUserInteraction(
              UserActionType.INPUT_ENTERED,
              'OTP',
              pageKey,
            );
          }
        }}
      />
    </div>
  );
};
