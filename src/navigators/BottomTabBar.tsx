import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../themes';
import { moderateScale } from '../utils/ScalingUtils';

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const activeTabWidth = isFocused
          ? moderateScale(115)
          : moderateScale(115);

        const activeTabColor = isFocused ? colors.greenF : colors.grayAo;
        const iconSource = isFocused
          ? options.tabBarActiveIcon
          : options.tabBarIcon;
        const tabIconWidth = moderateScale(24);
        const tabIconHeight = moderateScale(24);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            setActiveTab(index);
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, { width: activeTabWidth }]}>
            <Image
              source={iconSource}
              style={[
                styles.icon,
                { width: tabIconWidth, height: tabIconHeight },
              ]}
            />
            <Text style={[styles.label, { color: activeTabColor }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    borderTopColor: colors.grayD4,
    borderTopWidth: moderateScale(1)
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 5,
    width: moderateScale(30),
    height: moderateScale(20),
    // alignSelf: 'center'
  },
  label: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
});

export default BottomTabBar;
