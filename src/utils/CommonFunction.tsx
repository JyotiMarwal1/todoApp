import Geolocation from '@react-native-community/geolocation';
import { Alert, Platform } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { Strings } from '../localization/Strings';
import Constants from './Constants';

export const checkPermissionsForLocation = async (askAgain: any, validatePermission: boolean) => {
  return await Permissions.check(
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }),
  ).then(async (response) => {
    // type PermissionStatus = 'unavailable' | 'denied' | 'blocked' | 'granted';
    console.log(response);
    if (response === 'denied') {
      console.log("thi is location desable call *********" + JSON.stringify(response))

      if (validatePermission) {
        return await Permissions.request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
        );
      }

      return AsyncAlert(
        Strings.locationPermissionFirstMessage,
      );
    } else if (response === 'blocked') {
      if (Platform.OS == 'ios') {
        if (askAgain) {
          return AsyncAlert(
            Strings.locationPermissionFirstMessage,
          );
        } else {
          return response;
        }
      } else {
        return Permissions.request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
        );
      }
    } else if (response === 'unavailable') {
      console.log(
        'Device is not capable of getting location',
        JSON.stringify(response),
      );
    } else {
      return response;
    }
  });
};

export const AsyncAlert = (permissionText: any) => {
  return new Promise((resolve, reject) => {
    Alert.alert(Constants.APP_NAME, permissionText, [
      { text: 'Open Settings', onPress: Permissions.openSettings },
    ]);
  });
};

export const getCurrentLocation = (askAgain: boolean, validatePermission: boolean) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS == 'android') {
      checkPermissionsForLocation(askAgain, validatePermission)
        .then(response => {
          if (response === 'granted') {
            resolve(gpsLocationEnable());
          } else if (response === 'already-enabled') {
            resolve(gpsLocationEnable());
          }
          else {
            reject(response);
          }
        })
        .catch(err => {
          // resolve(gpsLocationEnable());
          reject(err);
        });
    } else {
      checkPermissionsForLocation(askAgain, validatePermission)
        .then(response => {
          if (response === 'granted') {
            Geolocation.getCurrentPosition(
              ({ coords }) => {
                console.log(
                  ' this is current location ***** ' + JSON.stringify(coords),
                );
                resolve(coords);
              },
              error => {
                console.log('error is ' + JSON.stringify(error));
                reject(error);
              },
              { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 },
            );
          } else {
            reject(response);
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

// find location permission for android
const checkLocationEnableInAndroid = (callback: any) => {
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data: any) => {
      console.log(
        ' this is location enable in android device ' + JSON.stringify(data),
      );
      callback(data);
    })
    .catch((err: any) => {
      console.log(" this is data =========== " + JSON.stringify(err))
      if (err.code == "ERR00" && err.message == "denied") {
        // AsyncAlert(Strings.deviceLocationDesc)
      }
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
    });
};

export async function gpsLocationEnable() {
  return new Promise((resolve, reject) => {
    if (Platform.OS == 'android') {
      checkLocationEnableInAndroid(async (value: any) => {
        console.log(" this is value of location enable " + JSON.stringify(value))
        if (value == "already-enabled") {
          Geolocation.getCurrentPosition(
            ({ coords }) => {
              console.log(" this is lat long cords ************** " + JSON.stringify(coords))
              resolve(coords);
            },
            error => {
              console.log('error is ' + JSON.stringify(error));
              reject(error);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 },
          );
        } else {
          console.log(" this is value of location enable else part ******** " + JSON.stringify(value))
        }
      });
    }
  });
}
