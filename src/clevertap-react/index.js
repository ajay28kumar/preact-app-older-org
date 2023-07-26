var ClevertapReact = {
  initialize: function(accountId, region) {
    window.clevertap = {
      event: [],
      profile: [],
      region: region,
      account: [],
      onUserLogin: [],
      notifications: [],
      privacy: [],
    };
    window.clevertap.account.push({ id: accountId });
    window.clevertap.privacy.push({ optOut: false }); //set the flag to true, if the user of the device opts out of sharing their data
    window.clevertap.privacy.push({ useIP: false }); //set the flag to true, if the user agrees to share their IP data

    if (isSessionStorageEnable()) {
      (function() {
        var wzrk = document.createElement('script');
        wzrk.type = 'text/javascript';
        wzrk.rel = 'prefetch';
        wzrk.async = true;
        wzrk.src =
          ('https:' === document.location.protocol
            ? 'https://d2r1yp2w7bby2u.cloudfront.net'
            : 'http://static.clevertap.com') + '/js/a.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wzrk, s);
      })();
    }
  },

  event: function(name, payload) {
    if (payload) {
      window.clevertap.event.push(name, payload);
    } else {
      window.clevertap.event.push(name);
    }
  },

  profile: function(payload) {
    window.clevertap.profile.push(payload);
  },

  logout: function() {
    window.clevertap.logout();
  },

  pushNotificationPermission: function(
    titleText,
    bodyText,
    okButtonText,
    rejectButtonText,
    okButtonColor,
    askAgainTimeInSeconds,
    serviceWorkerPath,
    okCallback,
    rejectCallback,
    subscriptionCallback,
  ) {
    window.clevertap.notifications.push({
      titleText: titleText,
      bodyText: bodyText,
      okButtonText: okButtonText,
      rejectButtonText: rejectButtonText,
      okButtonColor: okButtonColor,
      askAgainTimeInSeconds: askAgainTimeInSeconds,
      serviceWorkerPath: serviceWorkerPath,
      okCallback: okCallback,
      rejectCallback: rejectCallback,
      subscriptionCallback: subscriptionCallback,
    });
  },
};

const isSessionStorageEnable = () => {
  let uid = new Date();
  let result;
  try {
    sessionStorage.setItem('uid', uid.toString());
    result = sessionStorage.getItem('uid') === uid.toString();
    sessionStorage.removeItem('uid');
    return result && sessionStorage;
  } catch (exception) {
    return false;
  }
};

module.exports = ClevertapReact;
