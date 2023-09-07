import { makeObservable, action, observable, runInAction } from 'mobx';
import { NotificationModel } from './types';

const NOTIFICATION_TIMEOUT = 10000;

export class Notification {
  currentNotification: NotificationModel | null = null;
  private notificationTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeObservable(this, {
      currentNotification: observable,
      setCurrentNotification: action,
      clearNotification: action
    });
  }

  setCurrentNotification(notification: NotificationModel): void {
    this.notificationTimeout = setTimeout(
      () => runInAction(() => (this.currentNotification = null)),
      NOTIFICATION_TIMEOUT
    );

    this.currentNotification = notification;
  }

  clearNotification(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    this.currentNotification = null;
  }
}
