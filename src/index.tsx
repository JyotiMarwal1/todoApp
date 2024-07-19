
import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { FlashMessage, SpinnerLoader } from './components';
import setupStore from './data/store';
import RootNavigator from './navigators/StackNavigator';
import { colors } from './themes';
import { flashMessageRefObj } from './utils/FlashMessageRef';
import { navigationRef } from './utils/NavigationObject';
import { spinnerRef } from './utils/SpinnerRef';

const Index = () => {

  const store = setupStore();

  useEffect(() => {
    const initApp = () => {
      setStatusBar();

    };
    initApp();
    //unmounting effect
    return () => { };
  }, []);

  const setStatusBar = () => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.black);
    } else {
      StatusBar.setBarStyle("light-content")
      // StatusBar.setBarStyle('dark-content');
    }
  };



  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            SplashScreen.hide();
          }}>
          <RootNavigator />
          <SpinnerLoader ref={spinnerRef} />
          <FlashMessage ref={flashMessageRefObj} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default Index

const styles = StyleSheet.create({})

