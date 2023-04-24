import {notification} from 'antd';
import i18n from '@app/utils/i18n';
import {number, string} from 'yup';
import React from 'react';

export const URL_API = 'http://192.168.1.10:8080/api';

export const NotificationSuccess = (descriptions: string) => {
  notification.success({
    message: i18n.t('messagSuccess.successFull'),
    description: descriptions,
    placement: 'topRight',
    duration: 2
  });
};
export const NotificationError = (descriptions: string) => {
  notification.error({
    message: i18n.t('messagSuccess.notification'),
    description: descriptions,
    placement: 'topRight',
    duration: 2
  });
};

// Validation message
export const REQUIRED_MESSAGE = ' ';

// Data type validation
export const StringValidation = string()
  .trim()
  .required(REQUIRED_MESSAGE)
  .typeError(REQUIRED_MESSAGE);

export const NumberValidation = number()
  .required(REQUIRED_MESSAGE)
  .typeError(REQUIRED_MESSAGE)
  .min(0, REQUIRED_MESSAGE);
