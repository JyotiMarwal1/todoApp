import { CommonActions } from '@react-navigation/native';
import type { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';


export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

// export const resetToHomeDrawerNav = () => {
//     if (navigationRef.current) {
//         // Perform navigation if the app has mounted
//         navigationRef.current.dispatch(CommonActions.reset({
//             index: 1,
//             routes: [{ name: "HomeDrawerNav" }]
//         }))
//     }
// }

export function getCurrentScreenName() {
    if (navigationRef.current) {
        return navigationRef.current.getCurrentRoute().name;
    }
    return null;
}

export const resetScreen = (screenName: string) => {
    if (navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.dispatch(CommonActions.reset({
            index: 1,
            routes: [{ name: screenName }]
        }))
    }
}

export const navigate = (screenName: string, params?: any) => {
    if (navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.dispatch(CommonActions.navigate({
            name: screenName,
            params: params
        }))
    }
}

export const goBack = () => {
    if (navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.dispatch(CommonActions.goBack())
    }
}

