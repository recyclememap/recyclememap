import {
  NotificationModel,
  NotificationType
} from '@root/store/domains/Notification/types';

export function loader<T>(loaderName: string) {
  return function (
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const origin = descriptor.value;
    descriptor.value = async function (this: any, ...args: any[]) {
      if (!this.rootStore) {
        throw new Error('rootStore is not defined');
      }

      try {
        this.rootStore.loader.setLoader(loaderName);

        const result = await origin.apply(this, args);

        this.rootStore.loader.deleteLoader(loaderName);
        return result;
      } catch (e) {
        this.rootStore.loader.deleteLoader(loaderName);
        throw e;
      }
    };
    return descriptor;
  };
}

export function notify<T>(
  errorNotification: Omit<NotificationModel, 'type'>,
  successNotification?: Omit<NotificationModel, 'type'>
) {
  return function (
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const origin = descriptor.value;
    descriptor.value = async function (this: any, ...args: any[]) {
      if (!this.rootStore) {
        throw new Error('rootStore is not defined');
      }

      try {
        const result = await origin.apply(this, args);

        if (successNotification) {
          this.rootStore.notification.setCurrentNotification({
            type: NotificationType.Success,
            ...successNotification
          });
        }

        return result;
      } catch (e) {
        this.rootStore.notification.clearNotification();

        // TODO: extract error message from backend error first
        this.rootStore.notification.setCurrentNotification({
          type: NotificationType.Error,
          ...errorNotification
        });
        throw e;
      }
    };
    return descriptor;
  };
}
