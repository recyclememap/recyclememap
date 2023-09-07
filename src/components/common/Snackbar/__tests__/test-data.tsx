import { NotificationType } from '@root/store/domains/Notification/types';

export const MOCK_SUCCESS_NOTIFICATION = {
  message: 'testMessage',
  details: 'testDetails',
  type: NotificationType.Success
};

export const MOCK_ERROR_NOTIFICATION = {
  message: 'testMessage',
  details: 'testDetails',
  type: NotificationType.Error
};

export const CLOSE_BUTTON_TEST_ID = 'CloseIcon';
