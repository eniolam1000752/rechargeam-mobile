import {getModel, getUniqueId} from 'react-native-device-info';

export const globals = {
  token: null,
  deviceId: getUniqueId(),
  deviceModel: getModel(),
  rootNavigator: null,
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
