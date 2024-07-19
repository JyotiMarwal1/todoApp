// import messaging from '@react-native-firebase/messaging';
import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import { Strings } from '../localization/Strings';

// Files
// import { goBack } from './RouterServices';
// import { getCurrentLocation } from './locationManager';

export const checkCameraPermission = async () => {
    try {
        const permissionAvailable = await check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
        );
        if (permissionAvailable === 'granted') {
            return true;
        }
        console.log("permissionAvailable", permissionAvailable)

        const result = await request(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
        );
        if (
            result === 'denied' ||
            result === 'blocked' ||
            result === 'unavailable'
        ) {
            Alert.alert(Strings.cameraPermissionMessage, Strings.allowCameraGalleryPermission, [
                {
                    text: Strings.dontAllow,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: Strings.allow, onPress: () => Linking.openSettings() },
            ]);
        } else {
            // we have permission
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};


export const checkGalleryPermissions = async () => {
    try {
        const permissionAvailable = await check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : +Platform.Version >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permissionAvailable === 'granted') {
            return true;
        }
        const result = await request(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : +Platform.Version >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (
            result === 'denied' ||
            result === 'blocked' ||
            result === 'unavailable'
        ) {
            return Alert.alert(Strings.galleryPermission, Strings.allowPhotoGalleryPermission, [
                {
                    text: Strings.dontAllow,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: Strings.allow, onPress: () => Linking.openSettings() },
            ]);
        } else {
            // we have permission
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkCoarseLocationPermissions = async () => {
    try {
        const permissionAvailable = await check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
        if (permissionAvailable === 'granted') {
            getCurrentLocation();
        }
        const result = await request(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
        if (
            result === 'denied' ||
            result === 'blocked' ||
            result === 'unavailable'
        ) {
            // return Alert.alert(
            //   'Location Permission Denied',
            //   'Please provide access',
            //   [
            //     {
            //       text: 'Cancel',
            //       onPress: () => console.log('Cancel Pressed'),
            //       style: 'cancel',
            //     },
            //     {text: 'Open settings', onPress: () => Linking.openSettings()},
            //   ],
            // );
            // navigate(routes.LOCATION_DENIED, {});
        } else {
            getCurrentLocation();
        }
    } catch (error) {
        console.log(error);
    }
};

export const askForAndroidPreciseLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === 'denied' || result === 'blocked' || result === 'unavailable') {
        const coarseLocationResult = await request(
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
        if (
            coarseLocationResult === 'denied' ||
            coarseLocationResult === 'blocked' ||
            coarseLocationResult === 'unavailable'
        ) {
            // location has been denied
        } else {
            getCurrentLocation();
            goBack();
            return true
        }
    } else {
        getCurrentLocation();
        goBack();
        return true
    }
};

export const askForIOSLocationPermission = async () => {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result === 'denied' || result === 'blocked' || result === 'unavailable') {
        // navigate(routes.LOCATION_DENIED, {});
    } else {
        getCurrentLocation();
        return true
    }
};

export const checkPreciseLocationPermissions = async () => {
    try {
        const permissionAvailable = await check(
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionAvailable === 'granted') {
            getCurrentLocation();
            return true
        } else {
            if (Platform.OS === 'android') {
                // navigate(routes.LOCATION_DENIED, {});
            } else {
                return askForIOSLocationPermission();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkAndroidNotificationPermission = async () => {
    try {
        const permissionAvailable = await check(
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (permissionAvailable === 'granted') {
            return true;
        }
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (
            result === 'denied' ||
            result === 'blocked' ||
            result === 'unavailable'
        ) {
            return false;
        } else {
            // we have permission
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

// export const checkIOSNotificationPermission = async () => {
//     try {
//         const permissionAvailable = await messaging().hasPermission();
//         if (permissionAvailable !== 1) {
//             const authStatus = await messaging().requestPermission({
//                 alert: true,
//                 badge: false,
//                 sound: true,
//             });
//             if (authStatus === 1) {
//                 return true;
//             } else {
//                 return false;
//             }
//         } else {
//             return true;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
