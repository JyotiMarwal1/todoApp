import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Images from '../assets/images';

import { colors } from '../themes';
import { moderateScale } from '../utils/ScalingUtils';

export default function DropDownPickerWithResetFunction({
    onItemChange,
    hedertitle,
    Data,
    placeholder,
    disable,
    style,
    require = true,
    clear = false

}: any) {
    const [show, setshow] = useState(false);
    const [select, setselect] = useState('');

    useEffect(() => {

        if (clear) {
            setselect('')
        }
    }, [clear])

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.renderConatiner}>
                <TouchableOpacity
                    onPress={() => {
                        disable ? null : onChange(item);
                    }}
                    style={{}}
                    disabled={disable}>
                    <Text
                        style={{ fontSize: moderateScale(14), padding: 10, color: 'black' }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    function onChange(item) {
        setselect(item.name), setshow(!show);
        onItemChange(item);
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    style={{
                        marginTop: moderateScale(10),
                        marginBottom: moderateScale(10),
                        fontSize: moderateScale(14),
                        color: colors.black,
                        fontWeight: '700',
                    }}>
                    {hedertitle}
                </Text>
                {require ? <Text
                    style={{
                        marginTop: moderateScale(12),
                        marginBottom: moderateScale(10),
                        fontSize: moderateScale(12),
                        color: colors.gray58,
                    }}>
                    (Required)
                </Text> : null}
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => setshow(!show)}
                    style={[
                        {
                            width: '100%',
                            height: moderateScale(6.5),
                            borderBottomColor: show ? colors.gray92 : null,
                            borderBottomWidth: show ? 1 : 0,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        },
                        style,
                    ]}
                    disabled={disable}>
                    <Text
                        style={{ fontSize: moderateScale(14), padding: 10, color: colors.gray77 }}>
                        {select ? select : placeholder}
                    </Text>
                    {show ? (
                        <Image
                            style={{ marginRight: moderateScale(2) }}
                            resizeMode="center"
                            source={Images.upArrow}
                        />
                    ) : (
                        <Image
                            style={{ marginRight: moderateScale(2) }}
                            source={Images.downArrow}
                            resizeMode="center"
                        />
                    )}
                </TouchableOpacity>
                {show ? (
                    <FlatList
                        data={Data}
                        extraData={Data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        horizontal={true}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    />
                ) : null}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: colors.grayCF,
        borderWidth: 1,
        //marginTop:10,
        borderRadius: 10,
        paddingBottom: 5,
        backgroundColor: colors.white,
    },
    renderConatiner: {
        width: '100%',
        backgroundColor: colors.white,
    },

    rowContainer: {
        alignItems: 'center',
        width: '100%',
        marginLeft: moderateScale(2),
        marginRight: moderateScale(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(2),
    },
});



