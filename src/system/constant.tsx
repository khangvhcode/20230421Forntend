import { notification } from 'antd';
import i18n from '@app/utils/i18n';

export const URL_API = "http://192.168.1.10:8080/api";

export const NotificationSuccess = (descriptions: string) => {
  notification.success({
    message: i18n.t('messagSuccess.successFull'),
    description: descriptions,
    placement: 'topRight',
    duration: 2,
  });
}
export const NotificationError = (descriptions: string) => {
  notification.error({
    message: i18n.t('messagSuccess.notification'),
    description: descriptions,
    placement: 'topRight',
    duration: 2,
  });
}