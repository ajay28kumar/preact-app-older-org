import { OTPBox } from './otpBox';

export const PasswordContent = ({ authValue, pageKey, updateAuthValue }) => {
  return (
    <OTPBox
      authValue={authValue}
      pageKey={pageKey}
      updateAuthValue={updateAuthValue}
    />
  );
};
