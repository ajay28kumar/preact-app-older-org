const device = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPod|iPad/i);
  },
  OperaMini() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return !!(
      device.Android() ||
      device.BlackBerry() ||
      device.iOS() ||
      device.OperaMini() ||
      device.Windows()
    );
  },
};

export const isMobile = device.any();

//Source: https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};
