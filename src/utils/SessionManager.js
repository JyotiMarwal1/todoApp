import * as LocalAsyncStorage from './LocalAsyncStorage';

/**
 * user session maintain
 */


export const setLoginDataAsync = async data => {
  console.log('login data saving...', data);
  await LocalAsyncStorage.storeData('LOGIN_DATA', JSON.stringify(data));
  return;
};

export const getLoginDataAsync = async () => {
  const loginData = await LocalAsyncStorage.getData('LOGIN_DATA');
  // console.log('login data getting...', loginData);

  if (loginData != null) {
    const parsedData = JSON.parse(loginData);
    return parsedData;
  } else {
    return null;
  }
};

export const removeLoginDataAsync = async () => {
  await LocalAsyncStorage.removeData('LOGIN_DATA');
};

export const clearStorage = async () => {
  await LocalAsyncStorage.clearStorage();
};
// /**
//  * FCM token save
//  */

export const getFCMToken = async () => {
  const fcmToken = await LocalAsyncStorage.getData('@FCM_TOKEN');
  if (fcmToken !== null || fcmToken !== undefined) {
    return fcmToken;
  } else {
    console.log('fcmToken is null');
    return fcmToken;
  }
};

export const setExtraData = async data => {
  await LocalAsyncStorage.storeData('@EXTRA_DATA', data);
  return;
};

export const getExtraData = async () => {
  const data = await LocalAsyncStorage.getData('@EXTRA_DATA');
  return data;
};

export const setFCMToken = async data => {
  await LocalAsyncStorage.storeData('@FCM_TOKEN', data);
  return;
};
export const removeExtraData = async () => {
  await LocalAsyncStorage.removeData('@EXTRA_DATA');
};

export const removeFCMToken = async () => {
  await LocalAsyncStorage.removeData('@FCM_TOKEN');
};
