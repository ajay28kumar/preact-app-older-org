export const isMobileFormatValid = (mobileNumber) => {
  const mobileNumberValidationRegex = new RegExp('^[6-9][0-9]{9}$');
  return mobileNumberValidationRegex.test(mobileNumber);
};
