import Geolocation from '@react-native-community/geolocation';
import { Alert, Platform } from "react-native";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { Strings } from '../localization/Strings';

export const getCurrentLocation = (askAgain: any) => {
    return new Promise((resolve, reject) => {
        if (Platform.OS == 'android') {
            checkPermissionsForLocation(askAgain)
                .then(response => {
                    if (response === 'granted') {
                        resolve(gpsLocationEnable());
                    } else {
                        reject(response);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            checkPermissionsForLocation(askAgain)
                .then(response => {
                    // Alert.alert("okm")
                    console.log(" this is location response for ios ******* " + JSON.stringify(response))
                    if (response === 'granted') {
                        Geolocation.getCurrentPosition(
                            ({ coords }) => {
                                console.log(
                                    ' this is current location ***** ' + JSON.stringify(coords),
                                );
                                resolve(coords);
                            },
                            error => {
                                console.log('error is dfdsdds' + JSON.stringify(error));
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

export const checkPermissionsForLocation = async (askAgain: any) => {
    const response = await Permissions.check(
        Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        })
    );
    console.log("location check ************ " + response);

    if (response === 'denied') {
        console.log("Denied conditions", response);
        const permissionRequest = await Permissions.request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            })
        );

        return permissionRequest;
    } else if (response === 'blocked') {
        console.log("bfhjdbsfhjsbdfhjbshjbfg");

        if (Platform.OS === 'ios') {
            if (askAgain) {
                await AsyncAlert(
                    Strings.locationPermissionFirstMessage
                );
            } else {
                return response;
            }
        } else {
            console.log("hello blocked");
            const permissionRequest = await Permissions.request(
                Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                })
            );

            return permissionRequest;
        }
    } else if (response === 'unavailable') {
        if (Platform.OS === 'ios') {
            if (askAgain) {
                await AsyncAlert(
                    Strings.locationPermissionFirstMessage
                );
            } else {
                return response;
            }
        }

        console.log(
            'Device is not capable of getting location',
            JSON.stringify(response)
        );
    } else {
        return response;
    }
};

export const AsyncAlert = (permissionText: any) => {
    return new Promise((resolve, reject) => {
        Alert.alert(Strings.appName, permissionText, [
            // {
            //     text: 'No way',
            //     onPress: () => reject('Permission denied'),
            //     style: 'cancel',
            // },
            { text: 'Open Settings', onPress: Permissions.openSettings },
        ]);
    });
};

export async function gpsLocationEnable() {
    return new Promise((resolve, reject) => {
        if (Platform.OS == 'android') {
            checkLocationEnableInAndroid(async (value: any) => {
                console.log("Android value", value);
                if (value) {
                    Geolocation.getCurrentPosition(
                        ({ coords }) => {
                            console.log("coords-----", coords);
                            resolve(coords);
                        },
                        error => {
                            console.log('error is android ' + JSON.stringify(error));
                            if (error.PERMISSION_DENIED == 1) {
                                AsyncAlert(
                                    Strings.locationPermissionFirstMessage
                                );
                            }
                            reject(error);
                        },
                        { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 },
                    );
                }
            });
        }
    });
}

// find location permission for android
export const checkLocationEnableInAndroid = (callback: any) => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
    })
        .then(data => {
            console.log(
                ' this is location enable in android device ' + JSON.stringify(data),
            );
            callback(data);
        })
        .catch(err => {
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
            // codes :
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
            //  - ERR03 : Internal error
        });
};