// import ttiPolyfill from 'tti-polyfill';
import * as Clevertap from '../clevertap-react';
import store from '../store';
import Utils, { getLocalstorage, getSessionStorage } from '../utils';
import { USER_UUID_COOKIE_KEY } from './helper';
import { validateAndSetClientIdCookie } from './helper';
import { removeBlankKeys } from '../components/material-ui/helper';

export const GOOGLE_AD_TOKEN = process.env.PREACT_APP_GOOGLE_AD_TOKEN;
// const GA_TOKEN = process.env.PREACT_APP_GA_TOKEN;
// const GA_TOKEN_2 = process.env.PREACT_APP_GA_TOKEN_2;
const CLEVERTAP_TOKEN = process.env.PREACT_APP_CLEVERTAP_TOKEN;
const LAST_TOUCH_CAMPAIGN_ID_COOKIE_STORAGE_KEY = 'ltc';
// let prevTTI = 0;
const GTM_TOKEN = process.env.PREACT_APP_GTM_TAG;

class Tracking {
  constructor() {
    this.initTrackingLibrary();
    // if (process.env.PREACT_APP_ENV_NAME !== 'production') {
    //   this.initExternalLibrary();
    // }
    // try {
    //   const observer = new PerformanceObserver(this.navigationReport);
    //   observer.observe({ type: 'navigation', buffered: true });
    // } catch (e) {
    //   console.error('observer is not supported');
    // }
  }

  // initExternalLibrary = () => {
  //   //TODO: remove before going to production
  //   const script = document.createElement('script');
  //   script.rel = 'prefetch';
  //   script.src = `https://www.googleoptimize.com/optimize.js?id=OPT-WGT2HWD`;
  //   script.async = true;
  //   document.body.appendChild(script);
  // };

  initTrackingLibrary = () => {
    // this.initGtag();
    this.initGTMTag();

    Clevertap.initialize(CLEVERTAP_TOKEN, 'in');
  };

  // initGtag = () => {
  //   const script = document.createElement('script');
  //   script.rel = 'prefetch';
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TOKEN}`;
  //   script.async = true;
  //   document.body.appendChild(script);
  //   const gtagScript = `window.dataLayer = window.dataLayer || [];
  //             function gtag(){dataLayer.push(arguments);}
  //             gtag('js', new Date());
  //             gtag('config', '${GA_TOKEN}');
  //             gtag('config', '${GA_TOKEN_2}');
  //             gtag('config', '${GOOGLE_AD_TOKEN}');`;
  //   const createGtagScript = document.createElement('script');
  //   createGtagScript.textContent = gtagScript;
  //   document.body.appendChild(createGtagScript);
  // };

  initGTMTag = () => {
    const headGTMScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_TOKEN}');`;
    const headScript = document.createElement('script');
    headScript.textContent = headGTMScript;
    document.head.appendChild(headScript);
  };

  // navigationReport = (list) => {
  //   list.getEntries().forEach((entry) => {
  //     //https://media.prod.mdn.mozit.cloud/attachments/2019/05/03/16620/59192f44ebbb2bf3d8827e3a1e0934e2/Screen_Shot_2019-05-03_at_1.06.27_PM.png
  //     const timeToFirstByte = entry.responseStart - entry.requestStart;
  //     const contentDownload = entry.responseEnd - entry.responseStart;
  //     const clientRendering = entry.domComplete - entry.responseStart;

  //     gtag('event', 'timing_complete', {
  //       send_to: [GA_TOKEN, GA_TOKEN_2],
  //       name: 'Time to first Byte',
  //       event_category: 'Load Performance',
  //       value: timeToFirstByte,
  //     });
  //     gtag('event', 'timing_complete', {
  //       send_to: [GA_TOKEN, GA_TOKEN_2],
  //       name: 'Content Download',
  //       event_category: 'Load Performance',
  //       value: contentDownload,
  //     });
  //     gtag('event', 'timing_complete', {
  //       send_to: [GA_TOKEN, GA_TOKEN_2],
  //       name: 'Client Rendering',
  //       event_category: 'Load Performance',
  //       value: clientRendering,
  //     });
  //   });
  // };

  // networkReport = ({ path, loadTime }) => {
  //   gtag('event', 'timing_complete', {
  //     send_to: [GA_TOKEN, GA_TOKEN_2],
  //     name: path,
  //     event_category: 'Network Performance',
  //     value: loadTime,
  //   });
  // };

  trackPageView = (loadType, pageKey, additionalProperties = {}) => {
    const event = removeBlankKeys({
      eventType: pageKey,
      loadType: loadType,
      pageKey: pageKey,
      userAction: 'Page View',
      ...additionalProperties,
      ...this.addCommonProperties(),
    });
    this.sendEvent(event);
    // this.timeToInteractive(pageKey);
  };

  // timeToInteractive = (pageKey) => {
  //   ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  //     gtag('event', 'timing_complete', {
  //       send_to: [GA_TOKEN, GA_TOKEN_2],
  //       name: pageKey,
  //       event_category: 'Time to Interactive',
  //       value: tti - prevTTI,
  //     });

  //     prevTTI = tti;
  //   });
  // };

  trackImpression = (elementName, pageKey, metaData) => {
    const event = {
      eventType: 'Impression',
      elementName: elementName,
      pageKey: pageKey,
      metaData: metaData,
      userAction: 'Impression',
      ...this.addCommonProperties(),
    };
    this.sendEvent(event);
  };

  trackUserInteraction = (
    userAction,
    elementName,
    pageKey,
    additionalProperties,
  ) => {
    const event = {
      eventType: elementName,
      userAction: userAction,
      pageKey: pageKey,
      ...this.addCommonProperties(),
      ...additionalProperties,
    };
    this.sendEvent(removeBlankKeys(event));
  };

  trackApiError = (url, apiResponseCode, httpResponseCode) => {
    const event = {
      eventType: 'Api Response',
      url,
      apiResponseCode,
      httpResponseCode,
      ...this.addCommonProperties(),
    };
    this.sendEvent(removeBlankKeys(event));
  };

  trackApplicationError = (elementName, pageKey, metaData = {}) => {
    const event = {
      eventType: 'Error',
      elementName: elementName,
      pageKey: pageKey,
      ...metaData,
      ...this.addCommonProperties(),
    };
    this.sendEvent(removeBlankKeys(event));
  };

  pushUserProfile = () => {
    const userUUID =
      store.getState().config.userUUID ||
      Utils.getCookie(USER_UUID_COOKIE_KEY) ||
      getLocalstorage(USER_UUID_COOKIE_KEY);
    if (userUUID) {
      Clevertap.profile({ Site: { Identity: userUUID } });
    }
  };

  sendEvent = (event) => {
    const { eventType, userAction, ...others } = event || {};

    Clevertap.event(eventType, {
      ...(userAction && { userAction }),
      ...others,
    });

    // gtag('event', userAction || eventType, {
    //   send_to: [GA_TOKEN, GA_TOKEN_2],
    //   event_category: event.pageKey || eventType,
    //   event_label: event.elementName || eventType,
    // });
    dataLayer.push(
      removeBlankKeys({
        ...others,
        lender_id: others.lender_id || others.lender_name || '',
        merchant_name: others.merchant_name || others.merchant_id || '',
        eventType: eventType,
        event: userAction || eventType,
      }),
    );
  };

  addReferralProperty = () => {
    return {
      referralUrl: getSessionStorage('referralUrl'),
    };
  };

  addCommonProperties = () => {
    return {
      ...this.addUrlParams(),
      ...this.addTimestamp(),
      ...this.addPath(),
      ...this.addSubDomain(),
      ...this.addClientId(),
      ...this.addUserUuidIfPresent(),
      ...this.addLastTouchUtmCampaignParam(),
      ...this.addReferralProperty(),
    };
  };

  addUrlParams = () => {
    const urlParams = convertQueryStringParamsToJson(window.location.search);
    const { mobile, ...others } = urlParams || {};
    return others;
  };

  addTimestamp = () => {
    return {
      timestamp: new Date().valueOf(),
    };
  };

  addPath = () => {
    return {
      path: this.getUrlPath(),
    };
  };

  addSubDomain = () => {
    if (!window.location) {
      return {
        subDomain: undefined,
      };
    }

    const hostname = window.location.hostname;
    if (hostname.indexOf('localhost') !== -1) {
      return {
        subDomain: 'localhost',
      };
    } else {
      return {
        subDomain: hostname.substring(0, hostname.indexOf('.instacred.me')),
      };
    }
  };

  addClientId = () => {
    return {
      clientId: validateAndSetClientIdCookie(),
    };
  };

  addUserUuidIfPresent = () => {
    return {
      userUUID:
        Utils.getCookie(USER_UUID_COOKIE_KEY) ||
        getLocalstorage(USER_UUID_COOKIE_KEY),
    };
  };

  addLastTouchUtmCampaignParam = () => {
    let params = convertQueryStringParamsToJson(window.location.search);

    try {
      if (params.hasOwnProperty('utm_campaign')) {
        this.setLastTouchUtmCampaignToCookie(params['utm_campaign']);
      }
      let lastTouchUtmCampaign = Utils.getCookie(
        LAST_TOUCH_CAMPAIGN_ID_COOKIE_STORAGE_KEY,
      );
      return {
        lastTouchUtmCampaign: lastTouchUtmCampaign || 0,
      };
    } catch (e) {
      if (!(e instanceof DOMException)) {
        throw e;
      }
    }
  };

  getUrlPath = () => {
    if (window.location) {
      return window.location.pathname;
    }
    return 'undefined';
  };

  setLastTouchUtmCampaignToCookie = (lastTouchCampaign) => {
    const cookieExpiryTime = new Date();
    cookieExpiryTime.setTime(
      cookieExpiryTime.getTime() + 365 * 24 * 60 * 60 * 1000,
    );

    Utils.setCookie(
      LAST_TOUCH_CAMPAIGN_ID_COOKIE_STORAGE_KEY,
      lastTouchCampaign,
      cookieExpiryTime.toUTCString(),
      process.env.PREACT_APP_COOKIE_BASE_PATH,
      '/',
    );
  };
}

const convertQueryStringParamsToJson = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=');
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return params;
        }, {})
    : {};
};

export const tracker = new Tracking();

export const PageLoadType = Object.freeze({
  DYNAMIC: 'Dynamic',
  FULL: 'Full',
});

export const ImpressionElementName = Object.freeze({
  MODAL: 'Modal',
  PROMO: 'Promo',
});

export const UserActionType = Object.freeze({
  CLICK: 'Click',
  TAP: 'Tap',
  DISMISS: 'Dismiss',
  HOVER: 'Hover',
  SWIPE_LEFT: 'SwipeLeft',
  SWIPE_RIGHT: 'SwipeRight',
  INPUT_ENTERED: 'InputEntered',
  SELECT: 'Select',
  DE_SELECT: 'DeSelect',
  MODAL: 'modal',
});
