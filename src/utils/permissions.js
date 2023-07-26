import * as Clevertap from '../clevertap-react';
import Utils, { getLocalstorage, setLocalStorage } from './index';
import { tracker, UserActionType } from '../tracking';

export default class Permissions {
  pageKey = null;
  pushPermissionAlreadyGranted = false;

  constructor(pageKey) {
    this.pageKey = pageKey;
  }

  askForPushNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      this.pushPermissionAlreadyGranted = true;
    }
    const currentTime = new Date().getTime();
    let shouldAskPermission = true;
    if (Utils.isClientSideStorageEnabled()) {
      const notificationStorage = getLocalstorage(this.pageKey);
      const { expiryTime } = JSON.parse(
        notificationStorage || JSON.stringify({ expiryTime: 0 }),
      );
      shouldAskPermission = currentTime > expiryTime;
    }
    if (shouldAskPermission) {
      Clevertap.pushNotificationPermission(
        'Never miss an offer to buy your favourite products',
        'We will only send you notifications for great offers and sales. These can be turned off anytime.',
        'Get Offers',
        'Later',
        '#60b260',
        '30',
        '/service-worker.js',
        this.trackCustomPushPermissionPopUpAllowed,
        this.trackCustomPushPermissionPopUpRejected,
        this.trackPushPermissionGranted,
      );
    }
  };

  trackCustomPushPermissionPopUpAllowed = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'CT Notification Pop-up Allowed',
      this.pageKey,
    );
  };

  trackCustomPushPermissionPopUpRejected = () => {
    const expiryTime = new Date().getTime() + 48 * 60 * 60 * 1000; //48 hrs of expiry period has been added
    if (Utils.isClientSideStorageEnabled()) {
      const notificationStorage = {
        notification: true,
        expiryTime,
      };
      setLocalStorage(this.pageKey, JSON.stringify(notificationStorage));
    }
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'CT Notification Pop-up Rejected',
      this.pageKey,
    );
  };

  trackPushPermissionGranted = () => {
    if (!this.pushPermissionAlreadyGranted) {
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Notification Permission Granted',
        this.pageKey,
      );
    }
  };
}
