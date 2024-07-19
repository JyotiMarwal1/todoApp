
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomBarNavigation from './BottomBarNavigation';
import NavigationConstants from './NavigationConstant';
import TopTabBarNavigation from './TopTabBarNavigation';

const Stack = createStackNavigator();

const RootNavigator = () => {

  return (
    <Stack.Navigator
      // initialRouteName={NavigationConstants.AuthLoadingScreen}
      initialRouteName={NavigationConstants.TopTabBarNavigation}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>

      <Stack.Screen
        name={NavigationConstants.TopTabBarNavigation}
        component={TopTabBarNavigation}
      />
      <Stack.Screen
        name={NavigationConstants.BottomBarNavigation}
        component={BottomBarNavigation}
      />
      {/* <Stack.Screen
        name={NavigationConstants.MyProfile}
        component={MyProfile}
      /> */}

    </Stack.Navigator>
  );
};

export default RootNavigator;
