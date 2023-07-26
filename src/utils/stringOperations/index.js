export const textTruncate = (str, len) =>
  str && str.length > len ? str.substring(0, len) + ' ' : str;

export const getNumericValue = (text) =>
  text ? text.replace(/[^0-9]/g, '') : '';

export const hashedMobileNumber = (mobileNumber) => {
  return mobileNumber.split('').reduce((accumulator, currentValue, index) => {
    if (index < 2 || index > 5) {
      return `${accumulator}${currentValue}`;
    } else {
      return `${accumulator}X`;
    }
  }, '');
};

export const getLenderNames = (lenderList = []) => {
  return lenderList.length
    ? lenderList.reduce((accumulator, currentValue, i) => {
        const lenderNames = accumulator + currentValue.lenderName;
        if (lenderList.length === i + 1) {
          return lenderNames;
        }
        return lenderNames + ',';
      }, '')
    : '';
};
