export enum NotificationType {
  Error = 'error',
  Success = 'success'
}

export type NotificationModel = {
  type: NotificationType;
  message: string;
  details?: string;
};
