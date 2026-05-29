import {Platform} from 'react-native';
import FlashMessage, {
  MessageOptions,
  showMessage,
} from 'react-native-flash-message';
import {getModel, getSystemVersion} from 'react-native-device-info';
import {RefObject} from 'react';

export const prettyPrint = (...data: any) => {
  const replacer = (key: any, value: any) => {
    if (typeof value === 'undefined') {
      return 'undefined';
    }
    if (value == null) {
      return 'null';
    }
    return value;
  };
  console.log(
    JSON.stringify(data, replacer, 2)
      .replaceAll('"null"', 'null')
      .replaceAll('"undefined"', 'undefined'),
  );
};

export const showDangerMessage = (
  message: string = '',
  options?: Omit<MessageOptions, 'message'>,
  ref?: RefObject<FlashMessage | null>,
) => {
  if (ref?.current) {
    ref.current?.showMessage({
      type: 'danger',
      message: message ?? '',
      ...options,
    });
    return;
  }
  showMessage({
    type: 'danger',
    message: message ?? '',
    ...options,
  });
};

export const showSuccessMessage = (
  message: string,
  options?: Omit<MessageOptions, 'message'>,
  ref?: RefObject<FlashMessage | null>,
) => {
  if (ref?.current) {
    ref.current?.showMessage({
      type: 'success',
      message: message ?? '',
      ...options,
    });
    return;
  }
  showMessage({
    type: 'success',
    message: message ?? '',
    ...options,
  });
};

export const getDetailForAPI = () => ({
  device_type: Platform.OS, // for the platform
  device_os_version: getSystemVersion(), // os version
  device_info: getModel(), // device modal
});
