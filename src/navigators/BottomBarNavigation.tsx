import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import Images from '../assets/images';
import { Strings } from '../localization/Strings';
import PostListScreen from '../screens/PostListScreen';
import ToDoListScreen from '../screens/ToDoListScreen';
import BottomTabBar from './BottomTabBar';
import NavigationConstants from './NavigationConstant';

const Tab = createBottomTabNavigator();

const BottomBarNavigation = ({ navigation }: any) => {

  useFocusEffect(
    React.useCallback(() => {

    }, []),
  );









  return (
    <Tab.Navigator
      initialRouteName={NavigationConstants.ToDoListScreen}
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={NavigationConstants.ToDoListScreen}
        component={ToDoListScreen}
        options={{
          tabBarIcon: Images.home,
          tabBarActiveIcon: Images.homeActive,
        }}
      />
      <Tab.Screen
        name={NavigationConstants.PostListScreen}
        component={PostListScreen}
        options={{
          tabBarIcon: Images.bookingHistory,
          tabBarActiveIcon: Images.bookingHistoryActive,
          tabBarLabel: Strings.bookingHistory
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomBarNavigation;
