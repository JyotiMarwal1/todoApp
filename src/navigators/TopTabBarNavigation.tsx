


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { BackButton, HeaderTitle } from '../../../components';


import PostListScreen from '../screens/PostListScreen';
import ToDoListScreen from '../screens/ToDoListScreen';
import { colors } from '../themes';
import { moderateScale } from '../utils';


function MyTabBar({ state, descriptors, navigation, position }) {

    return (
        <View style={[styles.tabBarStyle, {
            backgroundColor: colors.transparent,
            borderColor: colors.primaryIcon,

        }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
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
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1, backgroundColor: isFocused ? '#282D5A' : '#FFFFFF',
                            borderTopLeftRadius: index === 0 ? 50 : 0,
                            borderBottomLeftRadius: index === 0 ? 50 : 0,
                            borderTopRightRadius: index === 0 ? 0 : 50,
                            borderBottomRightRadius: index === 0 ? 0 : 50,
                        }}
                    >
                        <Text

                            style={[styles.tabText, {
                                color: isFocused ? '#FFFFFF' : '#282D5A',
                                alignSelf: 'center',
                            }]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const MyTabs = () => {

    return (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
            <Tab.Screen name="To Do List" component={ToDoListScreen} />
            <Tab.Screen name="Posts" component={PostListScreen} />
        </Tab.Navigator>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTabBarNavigation({ navigation }) {


    const onBackBtnPress = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteBackground }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFF' }}>
                <View style={styles.container}>
                    <Header
                        goBack={onBackBtnPress}
                    />
                    <MyTabs />
                </View>
            </SafeAreaView>
        </View>
    );
}

const Header = ({
    goBack = () => { },
    onFilterBtnPress = () => { }

}) => {

    return (
        <View style={[styles.headerContainer, { backgroundColor: colors.whiteBackground }]}>
            {/* <TouchableOpacity
                onPress={goBack}
                hitSlop={styles.filterBtnHitSlop}
            >
                <Image

                    source={Images.backIcon}
                    style={styles.backIcon}

                />
            </TouchableOpacity> */}
            <View></View>
            {/* <HeaderTitle title={'Applied jobs'} titleSty={{ color: colors.primaryText }} /> */}
            <Text style={{ color: colors.primaryText }}>{'Task'}</Text>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(20)
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: moderateScale(15),
    },
    filterBtnHitSlop: {
        width: moderateScale(8),
        height: moderateScale(8),
        left: moderateScale(8),
        right: moderateScale(8)
    },
    filter: {
        width: moderateScale(18),
        height: moderateScale(20),
        resizeMode: 'contain'
    },
    tabText: {
        fontSize: moderateScale(14),
        paddingVertical: moderateScale(13),
    },
    tabBarStyle: {
        flexDirection: 'row',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(50),
    },
    backIcon: {
        tintColor: 'black',
        width: 20,
        height: 20
    }
})