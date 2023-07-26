export default class Utils {
  static getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2)
      return parts
        .pop()
        .split(';')
        .shift();
  }

  static setCookie(key, value, expiry, domain, path) {
    document.cookie =
      key +
      '=' +
      value +
      ';expires=' +
      expiry +
      ';domain=' +
      domain +
      ';path=' +
      path;
  }

  /* Save and retrieve authToken */

  static saveAuthToken(authToken) {
    if (authToken) {
      let authExpiryTime = new Date();
      authExpiryTime.setTime(authExpiryTime.getTime() + 30 * 60 * 1000);
      document.cookie =
        'authToken=' +
        authToken +
        ';expires=' +
        authExpiryTime.toUTCString() +
        ';domain=.instacred.me; path=/';
    }
  }

  static savePinAuthToken(pinAuthToken) {
    if (pinAuthToken) {
      const authExpiryTime = new Date();
      authExpiryTime.setTime(authExpiryTime.getTime() + 30 * 60 * 1000);
      document.cookie =
        'pinAuthToken=' +
        pinAuthToken +
        ';expires=' +
        authExpiryTime.toUTCString() +
        ';domain=.instacred.me; path=/';
    }
  }

  static getAuthToken() {
    return Utils.getCookie('authToken');
  }
  static getPinAuthToken() {
    return Utils.getCookie('pinAuthToken');
  }

  static deleteAuthToken() {
    document.cookie =
      'authToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.instacred.me; path=/';
    this.deleteCookie('authToken'); //For backward compatibility. Can be removed one day after this code goes live.
  }

  static deletePinAuthToken() {
    document.cookie =
      'pinAuthToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.instacred.me; path=/';
    this.deleteCookie('pinAuthToken');
  }

  /* Save and retrieve session Cookie */

  static setSessionCookie(sessionId) {
    if (sessionId) {
      var now = new Date();
      var minutes = 30;
      now.setTime(now.getTime() + minutes * 60 * 1000);
      document.cookie =
        'sessionId=' + sessionId + ';expires=' + now.toUTCString() + '; path=/';
    }
  }

  static getSessionCookie() {
    return this.getCookie('sessionId');
  }

  /* Retrieve Unique Id */

  static getUniqueIdCookie() {
    return this.getCookie('uniqueId');
  }

  /* Retrieve UserUUId */

  static getUserUUIDCookie() {
    return this.getCookie('userUUID');
  }

  /* Save and retrieve user details */

  static storeUserId(userId) {
    if (Utils.isClientSideStorageEnabled() && userId) {
      setSessionStorage('uuId', userId);
    }
  }

  static getUserId() {
    return getSessionStorage('uuId');
  }

  static isClientSideStorageEnabled() {
    const uid = new Date();
    let result;
    try {
      setLocalStorage('uid', uid.toString());
      result = getLocalstorage('uid') === uid.toString();
      removeLocalStorage('uid');
      return result && localStorage;
    } catch (exception) {
      return false;
    }
  }

  static isSessionStorageEnabled() {
    let uid = new Date();
    let result;
    try {
      setSessionStorage('uid', uid.toString());
      result = getSessionStorage('uid') === uid.toString();
      removeSessionStorage('uid');
      return result && sessionStorage;
    } catch (exception) {
      return false;
    }
  }

  /* Save and retrieve Lender ID */

  static setLenderId(lenderId) {
    if (lenderId) {
      setLocalStorage('lenderId', lenderId);
    }
  }

  static getLenderId() {
    return getSessionStorage('lenderId');
  }

  static generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  static deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;Path=/;';
  }

  static getAmountInIndianFormat(x) {
    if (x == null) {
      return x;
    }
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  }

  copyToClipboard(elementID) {
    var temp = document.getElementById('copyContent');
    temp.value = document.getElementById(elementID).innerText;
    temp.select();
    document.execCommand('copy');
    temp.value = '';
    document.getElementById('voucher-toaster').style.display = 'block';
    setTimeout(function() {
      document.getElementById('voucher-toaster').style.display = 'none';
    }, 500);
  }

  disableBackButton() {
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
      history.go(1);
    };
  }

  applyNumericFilter(event) {
    var filteredValue = '';
    if (event && event.target.value) {
      filteredValue = event.target.value.replace(/[^0-9]/g, '');
    }
    return filteredValue;
  }

  createAndSubmitDynamicForm(jsonObj, returnUrl, timeout) {
    if (jsonObj && typeof jsonObj === 'object') {
      var form = document.createElement('form'); //create Form
      form.method = 'POST'; //Add Request Method
      form.action = returnUrl; // add Action URL
      var thisObj = this;

      for (var key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          form.appendChild(thisObj.createFormElements(key, jsonObj[key]));
        }
      }

      document.body.appendChild(form); //Adding Form to Document Body

      if (timeout && timeout > 0) {
        setTimeout(function() {
          form.submit(); //Submit Form
        }, timeout);
      } else {
        form.submit(); //Submit Form
      }
    }
  }

  createFormElements(key, value) {
    if (key) {
      var element = document.createElement('input');
      element.name = key;
      element.value = value ? value : '';
      element.type = 'hidden';
      return element;
    }
  }

  static applyLenderTheme(lenderTheme) {
    document.documentElement.setAttribute('data-theme', lenderTheme);
  }
  static removeTheme() {
    document.documentElement.setAttribute('data-theme', '');
  }

  /* Save and retrieve user registration status */

  static setUserRegistrationStatus(status) {
    setLocalStorage('isUserRegistered', status);
  }

  static setUserLoginMethod(method) {
    setLocalStorage('loginMethod', method);
  }

  static isUserRegistered() {
    return getLocalstorage('isUserRegistered') === 'true';
  }
  static getUserLoginMethod() {
    return getLocalstorage('loginMethod');
  }
}

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
};

export const getLocalstorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {}
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
};

export const clearLocalstorage = () => {
  try {
    localStorage.clear();
  } catch (e) {}
};

export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {}
};

export const getSessionStorage = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {}
};

export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {}
};

export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
  } catch (e) {}
};
